// backend/database.js
// Configura e inicializa o banco de dados SQLite.

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados 'database.db'.");
        // Habilita chaves estrangeiras
        db.run("PRAGMA foreign_keys = ON;", (err) => {
            if (err) console.error("Erro ao habilitar chaves estrangeiras:", err.message);
        });
        // Chama a função de inicialização
        initializeDb();
    }
});

/**
 * Inicializa as tabelas do banco de dados se elas não existirem.
 */
function initializeDb() {
    // SQL para criar a tabela de usuários (SEM username)
    const createUserTableSql = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar TEXT DEFAULT 'code',
        role TEXT NOT NULL DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`;

    // SQL para criar a tabela de progresso do usuário
    const createProgressTableSql = `
    CREATE TABLE IF NOT EXISTS progresso_usuario (
        id_progresso INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        topic_id INTEGER NOT NULL,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        UNIQUE(user_id, topic_id)
    );`;

    // SQL para criar a tabela de tópicos da trilha
    const createTopicsTableSql = `
    CREATE TABLE IF NOT EXISTS topicos_trilha (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        semester INTEGER NOT NULL
    );`;

    db.serialize(() => {
        db.run(createUserTableSql, (err) => {
            if (err) {
                console.error("Erro ao criar tabela 'users':", err.message);
            } else {
                console.log("Tabela 'users' verificada/criada.");
                // Cria Admin Padrão se não existir
                const adminEmail = "admin@bsi.com";
                db.get("SELECT * FROM users WHERE email = ?", [adminEmail], (err, row) => {
                    if (!row) {
                        const bcrypt = require('bcryptjs');
                        const hash = bcrypt.hashSync("admin123", 10);
                        db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                            ['Administrador', adminEmail, hash, 'admin'],
                            (err) => { if (!err) console.log("Admin padrão criado."); }
                        );
                    }
                });
            }
        });

        db.run(createTopicsTableSql, (err) => {
            if (err) console.error("Erro ao criar tabela 'topicos_trilha':", err.message);
            else console.log("Tabela 'topicos_trilha' verificada/criada.");
        });

        db.run(createProgressTableSql, (err) => {
            if (err) console.error("Erro ao criar tabela 'progresso_usuario':", err.message);
            else console.log("Tabela 'progresso_usuario' verificada/criada.");
        });
    });
}

module.exports = db;