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

// --- Configurações ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'chave-super-secreta-do-projeto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Pasta de Uploads (um nível acima do backend)
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(uploadsDir));

// --- Middlewares ---
const isLoggedIn = (req, res, next) => {
    if (req.session.user) next();
    else res.status(401).json({ message: "Faça login novamente." });
};

const isAdmin = (req, res, next) => {
    if (req.session.user?.role === 'admin') next();
    else res.status(403).json({ message: "Acesso negado." });
};

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadsDir),
        filename: (req, file, cb) => {
            const userId = req.session.user?.id;
            if (!userId) return cb(new Error("Sem usuário."), null);
            // Limpa avatar antigo
            const ext = path.extname(file.originalname);
            const filename = `avatar-${userId}${ext}`;
            try {
                fs.readdirSync(uploadsDir).forEach(f => {
                    if (f.startsWith(`avatar-${userId}.`) && f !== filename) fs.unlinkSync(path.join(uploadsDir, f));
                });
            } catch (e) {}
            cb(null, filename);
        }
    })
});

// --- ROTAS ---

// Auth
app.post('/api/cadastro', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Preencha tudo." });
    
    const role = email.endsWith(ADMIN_EMAIL_SUFFIX) ? 'admin' : 'user';
    const hash = bcrypt.hashSync(password, 10);

    db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hash, role], function(err) {
        if (err) return res.status(500).json({ message: "Email já cadastrado." });
        
        db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (e, user) => {
            req.session.user = user;
            res.json({ message: "Bem-vindo!", user });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Email ou senha incorretos." });
        }
        req.session.user = user;
        res.json({ message: "Login OK!", user });
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => res.json({ message: "Saiu." }));
});

// Perfil
app.put('/api/perfil', isLoggedIn, (req, res) => {
    const { name, email } = req.body;
    db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.session.user.id], (err) => {
        if (err) return res.status(500).json({ message: "Erro ao atualizar." });
        req.session.user.name = name;
        req.session.user.email = email;
        res.json({ message: "Atualizado!", user: req.session.user });
    });
});

app.put('/api/perfil/senha', isLoggedIn, (req, res) => {
    const { newPassword } = req.body; // Simplificado
    if (!newPassword || newPassword.length < 8) return res.status(400).json({message: "Senha curta."});
    const hash = bcrypt.hashSync(newPassword, 10);
    db.run("UPDATE users SET password = ? WHERE id = ?", [hash, req.session.user.id], () => res.json({ message: "Senha alterada!" }));
});

app.delete('/api/perfil/:id', isLoggedIn, (req, res) => {
    if (req.session.user.id != req.params.id) return res.status(403).send();
    db.run("DELETE FROM users WHERE id = ?", [req.params.id], () => {
        req.session.destroy(() => res.json({ message: "Conta deletada." }));
    });
});

// Avatar
app.post('/api/perfil/upload-avatar', isLoggedIn, upload.single('avatarFile'), (req, res) => {
    if (!req.file) return res.status(400).send();
    const path = `uploads/${req.file.filename}`;
    db.run("UPDATE users SET avatar = ? WHERE id = ?", [path, req.session.user.id], () => {
        req.session.user.avatar = path;
        res.json({ message: "Avatar atualizado!", avatar: path });
    });
});
app.put('/api/perfil/avatar', isLoggedIn, (req, res) => {
    const { avatarKey } = req.body;
    db.run("UPDATE users SET avatar = ? WHERE id = ?", [avatarKey, req.session.user.id], () => {
        req.session.user.avatar = avatarKey;
        res.json({ message: "Avatar salvo!", avatar: avatarKey });
    });
});
app.get('/api/perfil/check-avatar/:id', isLoggedIn, (req, res) => {
    db.get("SELECT avatar FROM users WHERE id = ?", [req.params.id], (e, r) => res.json({ avatar: r ? r.avatar : 'code' }));
});


app.get('/api/trilha/:userId', isLoggedIn, (req, res) => {
    if (req.session.user.id != req.params.userId) return res.status(403).send();
    
    // Agora seleciona category e type em vez de semester
    const sql = `
        SELECT t.id, t.name, t.category, t.type, IFNULL(pu.completed, 0) as completed 
        FROM topicos_trilha t 
        LEFT JOIN progresso_usuario pu ON t.id = pu.topic_id AND pu.user_id = ? 
        ORDER BY t.type, t.category, t.id
    `;
    
    db.all(sql, [req.params.userId], (err, rows) => {
        if (err) { console.error(err); return res.status(500).send(); }
        res.json(rows);
    });
});


// Admin & Contato
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const uid = req.session.user ? req.session.user.id : null;
    db.run("INSERT INTO contact_messages (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)", [uid, name, email, subject, message], () => res.json({message: "Enviado!"}));
});
app.get('/api/admin/stats', isLoggedIn, isAdmin, (req, res) => {
    db.get("SELECT COUNT(*) as u FROM users", (e, r1) => {
        db.get("SELECT COUNT(*) as m FROM contact_messages", (e, r2) => res.json({ totalUsers: r1.u, totalMessages: r2.m }));
    });
});
app.get('/api/admin/users', isLoggedIn, isAdmin, (req, res) => {
    db.all("SELECT id, name, email, role FROM users", (e, r) => res.json(r));
});
app.get('/api/admin/messages', isLoggedIn, isAdmin, (req, res) => {
    db.all("SELECT * FROM contact_messages ORDER BY created_at DESC", (e, r) => res.json(r));
});
app.delete('/api/admin/messages/:id', isLoggedIn, isAdmin, (req, res) => {
    db.run("DELETE FROM contact_messages WHERE id = ?", [req.params.id], () => res.json({message: "Apagado"}));
});
app.delete('/api/admin/user/:id', isLoggedIn, isAdmin, (req, res) => {
    db.run("DELETE FROM users WHERE id = ?", [req.params.id], () => res.json({message: "Deletado"}));
});

app.listen(port, () => console.log(`Servidor backend rodando em http://localhost:${port}`));