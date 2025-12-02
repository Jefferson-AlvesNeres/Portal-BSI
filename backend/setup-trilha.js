// backend/setup-trilha.js
const db = require('./database.js');

const topics = [
    // --- ÁREA: DESENVOLVIMENTO (learning) ---
    { id: 1, name: 'Lógica de Programação', category: 'dev', type: 'learning' },
    { id: 2, name: 'Frontend (HTML/CSS/JS)', category: 'dev', type: 'learning' },
    { id: 3, name: 'Backend (Node/Java)', category: 'dev', type: 'learning' },
    { id: 4, name: 'Mobile (Android/iOS)', category: 'dev', type: 'learning' },
    
    // --- ÁREA: DADOS (learning) ---
    { id: 5, name: 'Modelagem de Dados', category: 'data', type: 'learning' },
    { id: 6, name: 'SQL Avançado', category: 'data', type: 'learning' },
    { id: 7, name: 'Big Data & Analytics', category: 'data', type: 'learning' },

    // --- ÁREA: INFRAESTRUTURA (learning) ---
    { id: 8, name: 'Redes de Computadores', category: 'infra', type: 'learning' },
    { id: 9, name: 'Linux & Servidores', category: 'infra', type: 'learning' },
    { id: 10, name: 'Cloud Computing (AWS)', category: 'infra', type: 'learning' },

    // --- ÁREA: GESTÃO (learning) ---
    { id: 11, name: 'Metodologias Ágeis', category: 'management', type: 'learning' },
    { id: 12, name: 'Gestão de Projetos', category: 'management', type: 'learning' },
    { id: 13, name: 'Empreendedorismo', category: 'management', type: 'learning' },

    // --- ABA: LABORATÓRIO DE CÓDIGO (code) ---
    { id: 101, name: 'Algoritmos de Ordenação', category: 'algorithms', type: 'code' },
    { id: 102, name: 'Estruturas de Dados', category: 'structures', type: 'code' },
    { id: 103, name: 'Padrões de Projeto (Design Patterns)', category: 'patterns', type: 'code' },
    { id: 104, name: 'Clean Code', category: 'best_practices', type: 'code' },
    { id: 105, name: 'Segurança em Código', category: 'security', type: 'code' }
];

console.log("Populando nova estrutura de trilha...");
db.serialize(() => {
    const stmt = db.prepare("INSERT OR IGNORE INTO topicos_trilha (id, name, category, type) VALUES (?, ?, ?, ?)");
    let count = 0;
    topics.forEach(t => {
        stmt.run(t.id, t.name, t.category, t.type, function(err) {
            if(!err && this.changes > 0) count++;
        });
    });
    stmt.finalize(() => {
        console.log(`Concluído. ${count} tópicos inseridos.`);
        // db.close(); // Deixe comentado se o server estiver rodando junto
    });
});