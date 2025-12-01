// backend/server.js
// Ponto de entrada principal do backend.

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const db = require('./database.js');
const { topicContents, svgIcons } = require('./topicData.js');

const app = express();
const port = 3000;
const ADMIN_EMAIL_SUFFIX = '@admin.bsi';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'segredo-super-forte-bsi-portal',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(uploadsDir));

// Middlewares
function isLoggedIn(req, res, next) {
    if (req.session.user) next();
    else res.status(401).json({ message: "Não autorizado." });
}
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') next();
    else res.status(403).json({ message: "Acesso negado." });
}

// Configuração Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const userId = req.session.user?.id;
        if (!userId) return cb(new Error("Sem usuário."), null);
        const extension = path.extname(file.originalname);
        const filename = `avatar-${userId}${extension}`;
        // Limpa avatar antigo
        fs.readdirSync(uploadsDir)
          .filter(f => f.startsWith(`avatar-${userId}.`) && f !== filename)
          .forEach(f => { try { fs.unlinkSync(path.join(uploadsDir, f)); } catch(e){} });
        cb(null, filename);
    }
});
const upload = multer({ storage });

// --- ROTAS DE AUTENTICAÇÃO ---

app.post('/api/cadastro', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
        return res.status(400).json({ message: "Dados inválidos." });
    }

    const role = email.toLowerCase().endsWith(ADMIN_EMAIL_SUFFIX) ? 'admin' : 'user';
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, email, hash, role], function(err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed: users.email")) {
                return res.status(409).json({ message: "Email já cadastrado." });
            }
            return res.status(500).json({ message: "Erro interno." });
        }
        // Login automático após cadastro
        const userId = this.lastID;
        db.get("SELECT id, name, email, avatar, role, created_at FROM users WHERE id = ?", [userId], (err, user) => {
            if (err || !user) return res.status(500).json({ message: "Erro ao logar." });
            req.session.user = user;
            res.status(201).json({ message: "Cadastro OK!", user });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).json({ message: "Erro interno." });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Email ou senha inválidos." });
        }
        const userSessionData = {
            id: user.id, name: user.name, email: user.email,
            avatar: user.avatar, role: user.role, created_at: user.created_at
        };
        req.session.user = userSessionData;
        res.status(200).json({ message: "Login OK!", user: userSessionData });
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Saiu." });
    });
});

// --- ROTAS DE PERFIL ---

app.put('/api/perfil', isLoggedIn, (req, res) => {
    const { name, email } = req.body;
    const userId = req.session.user.id;
    if (!name || !email) return res.status(400).json({ message: "Dados incompletos." });

    const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.run(sql, [name, email, userId], function(err) {
        if (err) {
            if (err.message.includes("UNIQUE")) return res.status(409).json({ message: "Email em uso." });
            return res.status(500).json({ message: "Erro ao atualizar." });
        }
        req.session.user.name = name;
        req.session.user.email = email;
        res.json({ message: "Perfil atualizado!", user: { name, email } });
    });
});

app.put('/api/perfil/senha', isLoggedIn, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.session.user.id;
    if (!currentPassword || !newPassword || newPassword.length < 8) return res.status(400).json({ message: "Dados inválidos." });

    db.get("SELECT password FROM users WHERE id = ?", [userId], (err, user) => {
        if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(401).json({ message: "Senha atual incorreta." });
        }
        const hash = bcrypt.hashSync(newPassword, 10);
        db.run("UPDATE users SET password = ? WHERE id = ?", [hash, userId], (err) => {
            if (err) return res.status(500).json({ message: "Erro ao salvar senha." });
            res.json({ message: "Senha alterada!" });
        });
    });
});

app.delete('/api/perfil/:id', isLoggedIn, (req, res) => {
    const id = parseInt(req.params.id);
    if (req.session.user.id !== id) return res.status(403).json({ message: "Proibido." });
    
    // Limpa avatar
    fs.readdirSync(uploadsDir).filter(f => f.startsWith(`avatar-${id}.`))
      .forEach(f => { try { fs.unlinkSync(path.join(uploadsDir, f)); } catch(e){} });

    db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ message: "Erro ao deletar." });
        req.session.destroy(() => res.json({ message: "Conta deletada." }));
    });
});

// --- ROTAS DE AVATAR ---

app.put('/api/perfil/avatar', isLoggedIn, (req, res) => {
    const { avatarKey } = req.body;
    const userId = req.session.user.id;
    // Limpa avatar customizado
    fs.readdirSync(uploadsDir).filter(f => f.startsWith(`avatar-${userId}.`))
      .forEach(f => { try { fs.unlinkSync(path.join(uploadsDir, f)); } catch(e){} });
      
    db.run("UPDATE users SET avatar = ? WHERE id = ?", [avatarKey, userId], (err) => {
        if (err) return res.status(500).json({ message: "Erro ao salvar avatar." });
        req.session.user.avatar = avatarKey;
        res.json({ message: "Avatar salvo!", avatar: avatarKey });
    });
});

app.post('/api/perfil/upload-avatar', isLoggedIn, upload.single('avatarFile'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Erro no upload." });
    const userId = req.session.user.id;
    const path = `uploads/${req.file.filename}`;
    
    db.run("UPDATE users SET avatar = ? WHERE id = ?", [path, userId], (err) => {
        if (err) return res.status(500).json({ message: "Erro ao salvar caminho." });
        req.session.user.avatar = path;
        res.json({ message: "Upload OK!", avatar: path });
    });
});

app.get('/api/perfil/check-avatar/:id', isLoggedIn, (req, res) => {
    if (req.session.user.id != req.params.id) return res.status(403).send();
    db.get("SELECT avatar FROM users WHERE id = ?", [req.params.id], (err, row) => {
        if (row) res.json({ avatar: row.avatar });
        else res.status(404).send();
    });
});

// --- ROTAS DA TRILHA ---

app.get('/api/trilha/:userId', isLoggedIn, (req, res) => {
    if (req.session.user.id != req.params.userId) return res.status(403).send();
    const sql = `SELECT t.id, t.name, t.semester, IFNULL(pu.completed, 0) as completed 
                 FROM topicos_trilha t LEFT JOIN progresso_usuario pu ON t.id = pu.topic_id AND pu.user_id = ? 
                 ORDER BY t.semester, t.id`;
    db.all(sql, [req.params.userId], (err, rows) => {
        if (err) return res.status(500).send();
        res.json(rows);
    });
});

app.post('/api/trilha/complete', isLoggedIn, (req, res) => {
    const { topicId, completed } = req.body;
    const userId = req.session.user.id;
    const sql = `INSERT INTO progresso_usuario (user_id, topic_id, completed) VALUES (?, ?, ?)
                 ON CONFLICT(user_id, topic_id) DO UPDATE SET completed = excluded.completed`;
    db.run(sql, [userId, topicId, completed ? 1 : 0], (err) => {
        if (err) return res.status(500).send();
        res.json({ message: "OK" });
    });
});

app.get('/api/progresso/:userId', isLoggedIn, (req, res) => {
    if (req.session.user.id != req.params.userId) return res.status(403).send();
    db.get("SELECT COUNT(*) as c FROM progresso_usuario WHERE user_id = ? AND completed = 1", [req.params.userId], (e, r1) => {
        db.get("SELECT COUNT(*) as c FROM topicos_trilha", (e, r2) => {
            const pct = r2.c ? Math.round((r1.c / r2.c) * 100) : 0;
            res.json({ percentage: pct });
        });
    });
});

app.get('/api/topic-data/:id', isLoggedIn, (req, res) => {
    const content = topicContents[req.params.id];
    if (content) res.json({ ...content, svg: svgIcons[content.svgKey] });
    else res.status(404).send();
});

// --- ROTAS ADMIN ---
app.get('/api/admin/users', isLoggedIn, isAdmin, (req, res) => {
    db.all("SELECT id, name, email, role, created_at FROM users WHERE id != ? ORDER BY created_at DESC", [req.session.user.id], (err, rows) => {
        if (err) return res.status(500).send();
        res.json(rows);
    });
});
// (Outras rotas admin simplificadas se necessário, mas o foco era remover username)

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));