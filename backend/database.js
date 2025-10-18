

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        createUsersTable();
    }
});

const createUsersTable = () => {
    const createTableSql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            -- NOVA LINHA ADICIONADA AQUI --
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(createTableSql, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Tabela 'users' criada com a coluna 'created_at'.");
        }
    })
    db.close();
};