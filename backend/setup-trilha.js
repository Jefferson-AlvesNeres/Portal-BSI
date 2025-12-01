// setup-trilha.js
// Script para popular a tabela 'topicos_trilha'. Execute uma vez: node setup-trilha.js

const db = require('./database.js');

const constellationData = {
    1: { topics: [ { id: 1, name: 'Intro. à Computação' }, { id: 2, name: 'Lógica e Algoritmos' }, { id: 3, name: 'Mat. Discreta' }, { id: 100, name: 'Metodologia Científica' } ] },
    2: { topics: [ { id: 4, name: 'Prog. Estruturada' }, { id: 5, name: 'Fundamentos de SI' }, { id: 6, name: 'Cálculo I' }, { id: 101, name: 'Comunicação e Expressão' } ] },
    3: { topics: [ { id: 7, name: 'Prog. Orientada a Objetos' }, { id: 8, name: 'Estrutura de Dados I' }, { id: 9, name: 'Teoria dos Grafos' }, { id: 10, name: 'Sistemas Operacionais I' }, { id: 102, name: 'Contabilidade' } ] },
    4: { topics: [ { id: 11, name: 'Estrutura de Dados II' }, { id: 12, name: 'Banco de Dados I' }, { id: 13, name: 'Engenharia de Software I' }, { id: 14, name: 'Estatística e Probabilidade' }, { id: 103, name: 'Teoria da Computação' } ] },
    5: { topics: [ { id: 15, name: 'Banco de Dados II' }, { id: 16, name: 'Redes de Computadores I' }, { id: 17, name: 'Engenharia de Software II' }, { id: 18, name: 'Programação Web I (Front)' }, { id: 104, name: 'Economia' } ] },
    6: { topics: [ { id: 19, name: 'Redes de Computadores II' }, { id: 20, name: 'Segurança da Informação' }, { id: 21, name: 'Inteligência Artificial' }, { id: 22, name: 'Programação Web II (Back)' }, { id: 105, name: 'Administração' } ] },
    7: { topics: [ { id: 23, name: 'Gestão de Projetos de TI' }, { id: 24, name: 'Empreendedorismo em TI' }, { id: 25, name: 'Programação Mobile' }, { id: 26, name: 'TCC I' }, { id: 106, name: 'Tópicos Avançados (Cloud)' } ] },
    8: { topics: [ { id: 27, name: 'Estágio Supervisionado' }, { id: 28, name: 'TCC II' }, { id: 29, name: 'Ética e Direito em TI' }, { id: 30, name: 'Governança de TI' } ] }
};

function popularTabelaTopicos() {
    console.log("Populando 'topicos_trilha'...");
    const sqlInsert = `INSERT OR IGNORE INTO topicos_trilha (id, name, semester) VALUES (?, ?, ?)`; // Usa IGNORE para não dar erro se já existir
    db.serialize(() => {
        const stmt = db.prepare(sqlInsert);
        let count = 0;
        for (const semesterId in constellationData) {
            const semester = constellationData[semesterId];
            semester.topics.forEach(topic => {
                stmt.run(topic.id, topic.name, parseInt(semesterId), function(err) {
                     if (err) { console.error(`Erro inserir ${topic.id}:`, err.message); }
                     else if (this.changes > 0) { count++; } // Conta só os inseridos
                });
            });
        }
        stmt.finalize((err) => {
            if (err) { console.error("Erro finalizar:", err.message); }
            else { console.log(`Concluído. ${count} novos tópicos adicionados.`); }
            db.close((err) => { if (err) console.error("Erro fechar DB:", err.message); else console.log("DB fechado."); });
        });
    });
}
popularTabelaTopicos();