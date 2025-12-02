// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function initializeDb() {
    db.serialize(() => {
        db.run("PRAGMA foreign_keys = ON;");

        // Tabela Users
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            avatar TEXT DEFAULT 'code',
            role TEXT NOT NULL DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Tabela de Progresso
        db.run(`CREATE TABLE IF NOT EXISTS progresso_usuario (
            id_progresso INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            topic_id INTEGER NOT NULL,
            completed INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            UNIQUE(user_id, topic_id)
        )`);

        // Tabela de Tópicos (ALTERADA: semester -> category, adicionado type)
        db.run(`CREATE TABLE IF NOT EXISTS topicos_trilha (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL, -- Ex: 'dev', 'data', 'infra'
            type TEXT NOT NULL DEFAULT 'learning' -- 'learning' ou 'code'
        )`);

        // Tabela Contato
        db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT, email TEXT, subject TEXT, message TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Admin
        const email = "admin@bsi.com";
        db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => {
            if (!row) {
                const bcrypt = require('bcryptjs');
                const hash = bcrypt.hashSync("admin123", 10);
                db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", ["Admin", email, hash, "admin"]);
            }
        });
    });
}
initializeDb();
module.exports = db;