
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

// --- PORTA DINÂMICA (IMPORTANTE PARA ONLINE) ---
// Usa a porta que o servidor (Render/Vercel) mandar, ou 3000 se for local
const port = process.env.PORT || 3000;

const ADMIN_EMAIL_SUFFIX = '@admin.bsi';

// Configuração CORS para aceitar requisições do seu site
app.use(cors({
    origin: '*', // Em produção, idealmente troque pelo seu domínio (ex: https://meu-site.vercel.app)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'chave-secreta-do-projeto-bsi', // Troque por algo complexo em produção
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Mude para true se estiver usando HTTPS (Render/Vercel usam)
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
}));

// --- PASTA DE UPLOADS (ATENÇÃO) ---
// Nota: Em servidores gratuitos (Render/Vercel), arquivos salvos aqui somem quando o servidor reinicia.
// Para produção real, usaria-se AWS S3 ou Cloudinary. Para este projeto escolar, mantemos local.
const uploadsDir = path.join(__dirname, '..', 'uploads'); // Sobe um nível para a raiz
if (!fs.existsSync(uploadsDir)) {
    // Tenta criar a pasta se não existir (pode falhar em alguns servidores sem permissão de escrita)
    try { fs.mkdirSync(uploadsDir); } catch(e) { console.error("Erro ao criar pasta uploads:", e); }
}
app.use('/uploads', express.static(uploadsDir));

// --- MIDDLEWARES ---
function isLoggedIn(req, res, next) {
    if (req.session.user) next();
    else res.status(401).json({ message: "Sessão expirada ou inválida." });
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') next();
    else res.status(403).json({ message: "Acesso restrito a administradores." });
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadsDir),
        filename: (req, file, cb) => {
            const userId = req.session.user?.id;
            if (!userId) return cb(new Error("Login necessário."), null);
            const ext = path.extname(file.originalname);
            const filename = `avatar-${userId}${ext}`;
            // Tenta limpar avatar antigo
            try {
                fs.readdirSync(uploadsDir).filter(f => f.startsWith(`avatar-${userId}.`) && f !== filename)
                  .forEach(f => fs.unlinkSync(path.join(uploadsDir, f)));
            } catch(e) {}
            cb(null, filename);
        }
    })
});

// --- ROTAS ---

// Auth
app.post('/api/cadastro', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Preencha todos os campos." });

    const role = email.endsWith(ADMIN_EMAIL_SUFFIX) ? 'admin' : 'user';
    const hash = bcrypt.hashSync(password, 10);

    db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hash, role], function(err) {
        if (err) {
            if (err.message.includes("UNIQUE")) return res.status(409).json({ message: "Email já cadastrado." });
            return res.status(500).json({ message: "Erro no servidor." });
        }
        db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (e, user) => {
            req.session.user = user;
            res.status(201).json({ message: "Conta criada com sucesso!", user });
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
        res.json({ message: "Login realizado!", user });
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => res.json({ message: "Logout realizado." }));
});

// Perfil
app.put('/api/perfil', isLoggedIn, (req, res) => {
    const { name, email } = req.body;
    db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.session.user.id], (err) => {
        if (err) return res.status(500).json({ message: "Erro ao atualizar." });
        req.session.user.name = name; req.session.user.email = email;
        res.json({ message: "Perfil atualizado!", user: req.session.user });
    });
});

app.put('/api/perfil/senha', isLoggedIn, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    db.get("SELECT password FROM users WHERE id = ?", [req.session.user.id], (err, user) => {
        if (!bcrypt.compareSync(currentPassword, user.password)) return res.status(401).json({ message: "Senha atual incorreta." });
        const hash = bcrypt.hashSync(newPassword, 10);
        db.run("UPDATE users SET password = ? WHERE id = ?", [hash, req.session.user.id], () => res.json({ message: "Senha alterada!" }));
    });
});

app.delete('/api/perfil/:id', isLoggedIn, (req, res) => {
    if (req.session.user.id != req.params.id) return res.status(403).send();
    db.run("DELETE FROM users WHERE id = ?", [req.params.id], () => {
        req.session.destroy(() => res.json({ message: "Conta excluída." }));
    });
});

// Avatar
app.put('/api/perfil/avatar', isLoggedIn, (req, res) => {
    db.run("UPDATE users SET avatar = ? WHERE id = ?", [req.body.avatarKey, req.session.user.id], () => {
        req.session.user.avatar = req.body.avatarKey;
        res.json({ message: "Avatar salvo!", avatar: req.body.avatarKey });
    });
});

app.post('/api/perfil/upload-avatar', isLoggedIn, upload.single('avatarFile'), (req, res) => {
    if(!req.file) return res.status(400).json({message: "Nenhum arquivo enviado."});
    const path = `uploads/${req.file.filename}`;
    db.run("UPDATE users SET avatar = ? WHERE id = ?", [path, req.session.user.id], () => {
        req.session.user.avatar = path;
        res.json({ message: "Upload realizado!", avatar: path });
    });
});

app.get('/api/perfil/check-avatar/:id', isLoggedIn, (req, res) => {
    db.get("SELECT avatar FROM users WHERE id = ?", [req.params.id], (e, r) => res.json({ avatar: r ? r.avatar : 'code' }));
});

// Trilha
app.get('/api/trilha/:userId', isLoggedIn, (req, res) => {
    if (req.session.user.id != req.params.userId) return res.status(403).send();
    db.all(`SELECT t.id, t.name, t.category, t.type, IFNULL(pu.completed, 0) as completed 
            FROM topicos_trilha t LEFT JOIN progresso_usuario pu ON t.id = pu.topic_id AND pu.user_id = ? 
            ORDER BY t.type, t.category, t.id`, [req.params.userId], (e, r) => res.json(r));
});

app.post('/api/trilha/complete', isLoggedIn, (req, res) => {
    db.run(`INSERT INTO progresso_usuario (user_id, topic_id, completed) VALUES (?, ?, ?) 
            ON CONFLICT(user_id, topic_id) DO UPDATE SET completed = excluded.completed`, 
            [req.session.user.id, req.body.topicId, req.body.completed ? 1 : 0], 
            () => res.json({ message: "Progresso salvo." }));
});

app.get('/api/progresso/:userId', isLoggedIn, (req, res) => {
    db.get("SELECT COUNT(*) as c FROM progresso_usuario WHERE user_id = ? AND completed = 1", [req.params.userId], (e, r1) => {
        db.get("SELECT COUNT(*) as c FROM topicos_trilha", (e, r2) => {
            res.json({ percentage: r2.c ? Math.round((r1.c / r2.c) * 100) : 0 });
        });
    });
});

app.get('/api/topic-data/:id', isLoggedIn, (req, res) => {
    const c = topicContents[req.params.id];
    c ? res.json({ ...c, svg: svgIcons[c.svgKey] }) : res.status(404).send();
});

// Admin
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const uid = req.session.user ? req.session.user.id : null;
    db.run("INSERT INTO contact_messages (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)", [uid, name, email, subject, message], () => res.json({message: "Mensagem enviada!"}));
});

app.get('/api/admin/users', isLoggedIn, isAdmin, (req, res) => {
    db.all("SELECT id, name, email, role, created_at FROM users WHERE id != ? ORDER BY created_at DESC", [req.session.user.id], (e, r) => res.json(r));
});
// ... (outras rotas admin mantidas)

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});