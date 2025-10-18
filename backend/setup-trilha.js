// backend/setup-trilha.js (Versão Correta e Completa)

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// A lista completa com os 25 tópicos da graduação
const topics = [
    { id: 1, name: 'Introdução à Computação' },
    { id: 2, name: 'Lógica de Programação e Algoritmos' },
    { id: 3, name: 'Matemática Discreta' },
    { id: 4, name: 'Programação Estruturada (com C)' },
    { id: 5, name: 'Fundamentos de Sistemas de Informação' },
    { id: 6, name: 'Cálculo I' },
    { id: 7, name: 'Programação Orientada a Objetos (com Java)' },
    { id: 8, name: 'Estrutura de Dados I' },
    { id: 9, name: 'Modelagem de Banco de Dados' },
    { id: 10, name: 'Banco de Dados (SQL)' },
    { id: 11, name: 'Engenharia de Software I' },
    { id: 12, name: 'Sistemas Operacionais' },
    { id: 13, name: 'Redes de Computadores I' },
    { id: 14, name: 'Desenvolvimento Web: Frontend (HTML, CSS, JS)' },
    { id: 15, name: 'Análise e Projeto de Sistemas' },
    { id: 16, name: 'Gestão de Projetos de TI (PMBOK)' },
    { id: 17, name: 'Desenvolvimento Web: Backend (Node.js/Express)' },
    { id: 18, name: 'Fundamentos de Segurança da Informação' },
    { id: 19, name: 'Interação Humano-Computador (IHC/UX)' },
    { id: 20, name: 'Inteligência Artificial e Machine Learning' },
    { id: 21, name: 'Computação em Nuvem (Cloud Computing)' },
    { id: 22, name: 'Projeto de TCC I' },
    { id: 23, name: 'DevOps e Implantação Contínua' },
    { id: 24, name: 'Soft Skills e Preparação para Entrevistas' },
    { id: 25, name: 'Projeto de TCC II e Apresentação' }
];

// O código abaixo continua o mesmo, agora usando a lista completa.
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) return console.error("Erro ao criar tabela 'users':", err.message);
        console.log("Tabela 'users' verificada/criada.");

        db.run(`
            CREATE TABLE IF NOT EXISTS topics (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL
            )
        `, (err) => {
            if (err) return console.error("Erro ao criar tabela 'topics':", err.message);
            console.log("Tabela 'topics' verificada/criada.");

            const stmt = db.prepare("INSERT OR IGNORE INTO topics (id, name) VALUES (?, ?)");
            topics.forEach(topic => stmt.run(topic.id, topic.name));
            stmt.finalize((err) => {
                if (err) return console.error("Erro ao inserir tópicos:", err.message);
                console.log("Todos os 25 tópicos da trilha inseridos.");

                db.run(`
                    CREATE TABLE IF NOT EXISTS user_progress (
                        user_id INTEGER NOT NULL,
                        topic_id INTEGER NOT NULL,
                        PRIMARY KEY (user_id, topic_id),
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                        FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
                    )
                `, (err) => {
                    if (err) return console.error("Erro ao criar tabela 'user_progress':", err.message);
                    console.log("Tabela 'user_progress' verificada/criada.");

                    db.close((err) => {
                        if (err) return console.error("Erro ao fechar o banco de dados:", err.message);
                        console.log('Script finalizado com sucesso. Conexão fechada.');
                    });
                });
            });
        });
    });
});