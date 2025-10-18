// server.js (Versão Final com Banco de Dados)

// 1. Importa os pacotes
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); // Driver do banco de dados
const bcrypt = require('bcrypt'); // Ferramenta de criptografia

const app = express();
const PORT = 3000;

// 2. Conecta ao arquivo do banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite com sucesso.');
    }
});

// 3. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Rota de Cadastro (AGORA COM LÓGICA REAL)
app.post('/api/cadastro', (req, res) => {
    const { name, email, password } = req.body;

    // Validação simples para garantir que todos os campos foram enviados
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Primeiro, verifica se o email já existe no banco
    const checkEmailSql = `SELECT * FROM users WHERE email = ?`;
    db.get(checkEmailSql, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor ao verificar email.', error: err.message });
        }
        if (row) {
            // Se 'row' existir, o email já está cadastrado.
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }

        // Se o email não existe, criptografa a senha antes de salvar
        // O número 10 é o "custo" da criptografia, um valor padrão e seguro.
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao criptografar a senha.', error: err.message });
            }

            // Insere o novo usuário no banco de dados com a senha já criptografada
            const insertSql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
            db.run(insertSql, [name, email, hashedPassword], function(err) {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: err.message });
                }
                // Se tudo deu certo, envia uma resposta de sucesso
                res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: this.lastID });
            });
        });
    });
});




// ... (todo o seu código da rota de cadastro vem antes) ...

// --- ROTA DE LOGIN ATUALIZADA ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const findUserSql = `SELECT * FROM users WHERE email = ?`;
    db.get(findUserSql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor.', error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: 'Email ou senha incorretos.' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao comparar senhas.', error: err.message });
            }
            if (isMatch) {
                // MUDANÇA AQUI: Enviamos também o 'created_at'
                res.status(200).json({ 
                    message: 'Login bem-sucedido!', 
                    user: { 
                        id: user.id, 
                        name: user.name, 
                        email: user.email, 
                        created_at: user.created_at // Envia a data de criação
                    } 
                });
            } else {
                res.status(401).json({ message: 'Email ou senha incorretos.' });
            }
        });
    });
});


// ... (código da rota de login vem antes) ...

// --- NOVA ROTA PARA EDITAR PERFIL ---
app.put('/api/perfil', (req, res) => {
    // Pegamos o ID, nome e email do corpo da requisição
    const { id, name, email } = req.body;

    // 1. Validação básica dos dados recebidos
    if (!id || !name || !email) {
        return res.status(400).json({ message: 'Dados incompletos para atualização.' });
    }

    // 2. Verifica se o novo email já está sendo usado por OUTRO usuário
    const checkEmailSql = `SELECT * FROM users WHERE email = ? AND id != ?`;
    db.get(checkEmailSql, [email, id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor ao verificar email.', error: err.message });
        }
        if (row) {
            // Se encontrou uma linha, o email já pertence a outro usuário
            return res.status(409).json({ message: 'Este email já está em uso por outra conta.' });
        }

        // 3. Se o email estiver livre, atualiza os dados do usuário no banco
        const updateSql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
        db.run(updateSql, [name, email, id], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Erro ao atualizar o perfil.', error: err.message });
            }
            // Se a atualização foi bem-sucedida, envia os novos dados de volta
            res.status(200).json({ 
                message: 'Perfil atualizado com sucesso!',
                user: { id, name, email } 
            });
        });
    });
});

// ... (código da rota de editar perfil vem antes) ...

// --- NOVA ROTA PARA ALTERAR A SENHA ---
app.put('/api/perfil/senha', (req, res) => {
    const { id, currentPassword, newPassword } = req.body;

    // 1. Validação básica
    if (!id || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // 2. Encontra o usuário no banco de dados
    const findUserSql = `SELECT * FROM users WHERE id = ?`;
    db.get(findUserSql, [id], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor.', error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // 3. Verifica se a "senha atual" fornecida está correta
        bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao verificar senha.', error: err.message });
            }
            if (!isMatch) {
                // Se as senhas não batem, retorna um erro de não autorizado
                return res.status(401).json({ message: 'Senha atual incorreta.' });
            }

            // 4. Se a senha atual estiver correta, criptografa a NOVA senha
            bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao criptografar nova senha.', error: err.message });
                }

                // 5. Atualiza o banco de dados com a nova senha criptografada
                const updatePasswordSql = `UPDATE users SET password = ? WHERE id = ?`;
                db.run(updatePasswordSql, [hashedPassword, id], function(err) {
                    if (err) {
                        return res.status(500).json({ message: 'Erro ao atualizar a senha.', error: err.message });
                    }
                    res.status(200).json({ message: 'Senha alterada com sucesso!' });
                });
            });
        });
    });
});

// ... (código da rota de alterar senha vem antes) ...

// --- NOVA ROTA PARA DELETAR A CONTA ---
// Usamos o método DELETE e esperamos um ID na URL (ex: /api/perfil/12)
app.delete('/api/perfil/:id', (req, res) => {
    const { id } = req.params; // Pega o ID dos parâmetros da URL

    const deleteSql = `DELETE FROM users WHERE id = ?`;

    db.run(deleteSql, [id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor ao deletar a conta.', error: err.message });
        }
        // this.changes retorna o número de linhas afetadas. Se for 0, o usuário não foi encontrado.
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        // Se a exclusão foi bem-sucedida
        res.status(200).json({ message: 'Conta deletada com sucesso!' });
    });
});

// ... (código da rota de deletar a conta vem antes) ...

// --- NOVAS ROTAS PARA A TRILHA DE ESTUDOS ---

// ROTA 1: BUSCAR A TRILHA E O PROGRESSO DO USUÁRIO
// GET /api/trilha/:userId -> Retorna todos os tópicos e marca quais estão completos para o usuário.
app.get('/api/trilha/:userId', (req, res) => {
    const { userId } = req.params;

    // Este comando SQL é mais avançado. Ele busca todos os tópicos e, usando um LEFT JOIN,
    // verifica na tabela user_progress se aquele usuário completou aquele tópico.
    // O resultado é uma lista de todos os tópicos com um campo extra 'completed' (1 para sim, 0 para não).
    const sql = `
        SELECT
            t.id,
            t.name,
            CASE WHEN up.user_id IS NOT NULL THEN 1 ELSE 0 END as completed
        FROM
            topics t
        LEFT JOIN
            user_progress up ON t.id = up.topic_id AND up.user_id = ?
    `;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar a trilha de estudos.', error: err.message });
        }
        res.status(200).json(rows);
    });
});


// ROTA 2: ATUALIZAR O PROGRESSO DE UM TÓPICO
// POST /api/trilha/progresso -> Recebe o ID do usuário, o ID do tópico e se ele foi completado.
app.post('/api/trilha/progresso', (req, res) => {
    const { userId, topicId, completed } = req.body;

    if (completed) {
        // Se o tópico foi marcado como completo, insere o registro na tabela.
        // "INSERT OR IGNORE" previne erros se o registro já existir.
        const sql = `INSERT OR IGNORE INTO user_progress (user_id, topic_id) VALUES (?, ?)`;
        db.run(sql, [userId, topicId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar progresso.', error: err.message });
            }
            res.status(200).json({ message: 'Progresso salvo!' });
        });
    } else {
        // Se o tópico foi desmarcado, remove o registro da tabela.
        const sql = `DELETE FROM user_progress WHERE user_id = ? AND topic_id = ?`;
        db.run(sql, [userId, topicId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Erro ao remover progresso.', error: err.message });
            }
            res.status(200).json({ message: 'Progresso removido!' });
        });
    }
});

// ... (código da rota de deletar a conta vem antes) ...

// --- NOVAS ROTAS PARA A TRILHA DE ESTUDOS ---

// ROTA 1: BUSCAR A TRILHA E O PROGRESSO DO USUÁRIO
// GET /api/trilha/:userId -> Retorna todos os tópicos e marca quais estão completos para o usuário.
app.get('/api/trilha/:userId', (req, res) => {
    const { userId } = req.params;

    // Este comando SQL busca todos os tópicos e, usando um LEFT JOIN,
    // verifica na tabela user_progress se aquele usuário completou aquele tópico.
    const sql = `
        SELECT
            t.id,
            t.name,
            CASE WHEN up.user_id IS NOT NULL THEN 1 ELSE 0 END as completed
        FROM
            topics t
        LEFT JOIN
            user_progress up ON t.id = up.topic_id AND up.user_id = ?
        ORDER BY
            t.id
    `;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar a trilha de estudos.', error: err.message });
        }
        res.status(200).json(rows);
    });
});


// ROTA 2: ATUALIZAR O PROGRESSO DE UM TÓPICO
// POST /api/trilha/progresso -> Recebe o ID do usuário, o ID do tópico e se ele foi completado.
app.post('/api/trilha/progresso', (req, res) => {
    const { userId, topicId, completed } = req.body;

    if (completed) {
        // Se o tópico foi marcado como completo, insere o registro na tabela.
        const sql = `INSERT OR IGNORE INTO user_progress (user_id, topic_id) VALUES (?, ?)`;
        db.run(sql, [userId, topicId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar progresso.', error: err.message });
            }
            res.status(200).json({ message: 'Progresso salvo!' });
        });
    } else {
        // Se o tópico foi desmarcado, remove o registro da tabela.
        const sql = `DELETE FROM user_progress WHERE user_id = ? AND topic_id = ?`;
        db.run(sql, [userId, topicId], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Erro ao remover progresso.', error: err.message });
            }
            res.status(200).json({ message: 'Progresso removido!' });
        });
    }
});


// 5. Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});

// Em server.js, antes do app.listen

// --- NOVA ROTA PARA BUSCAR O PROGRESSO GERAL ---
app.get('/api/progresso/:userId', (req, res) => {
    const { userId } = req.params;
    let totalTopics = 0;
    let completedTopics = 0;

    // 1. Conta o total de tópicos
    db.get(`SELECT COUNT(*) as total FROM topics`, [], (err, row) => {
        if (err) return res.status(500).json({ message: "Erro ao contar tópicos." });
        totalTopics = row.total;

        // 2. Conta os tópicos completos do usuário
        db.get(`SELECT COUNT(*) as completed FROM user_progress WHERE user_id = ?`, [userId], (err, row) => {
            if (err) return res.status(500).json({ message: "Erro ao contar progresso." });
            completedTopics = row.completed;

            // 3. Calcula e retorna a porcentagem
            const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
            res.status(200).json({ percentage });
        });
    });
});