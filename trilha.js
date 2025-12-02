// trilha.js - Hub de Conhecimento

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user.id;

    // Elementos
    const map = document.getElementById('constellation-map');
    const codeGrid = document.getElementById('code-grid-container');
    const tabs = document.querySelectorAll('.hub-tab');
    const views = document.querySelectorAll('.hub-view');
    const catBtns = document.querySelectorAll('.cat-btn');
    
    let allData = [];
    let userProgress = {};

    // Configuração de Posições Fixas para o Mapa (Exemplo)
    // Em produção, você poderia calcular isso matematicamente
    const positions = [
        {x: 20, y: 20}, {x: 50, y: 20}, {x: 80, y: 20},
        {x: 35, y: 50}, {x: 65, y: 50},
        {x: 20, y: 80}, {x: 50, y: 80}, {x: 80, y: 80},
        {x: 10, y: 40}, {x: 90, y: 40}, {x: 30, y: 30}, {x: 70, y: 30}
    ];

    // --- INICIALIZAÇÃO ---
    fetch(`http://localhost:3000/api/trilha/${userId}`)
        .then(r => r.json())
        .then(data => {
            allData = data;
            // Mapeia progresso
            data.forEach(t => { if(t.completed) userProgress[t.id] = true; });
            
            renderLearningMap('all'); // Renderiza aba padrão
            renderCodeGrid(); // Prepara aba de código
            updateProgress();
        });

    // --- RENDERIZAÇÃO MAPA (Aprendizado) ---
    function renderLearningMap(categoryFilter) {
        map.innerHTML = '';
        // Filtra por tipo 'learning' e pela categoria selecionada
        const items = allData.filter(t => t.type === 'learning' && (categoryFilter === 'all' || t.category === categoryFilter));
        
        items.forEach((item, index) => {
            const pos = positions[index % positions.length]; // Usa posições ciclicamente
            
            const star = document.createElement('div');
            star.className = `star ${userProgress[item.id] ? 'completed' : ''}`;
            star.style.left = `${pos.x}%`;
            star.style.top = `${pos.y}%`;
            star.title = item.name;
            star.addEventListener('click', () => window.location.href = `topico.html?id=${item.id}`);

            const label = document.createElement('span');
            label.className = 'star-label';
            label.style.left = `${pos.x}%`;
            label.style.top = `${pos.y}%`;
            label.textContent = item.name;

            map.appendChild(star);
            map.appendChild(label);
        });
    }

    // --- RENDERIZAÇÃO GRID (Código) ---
    function renderCodeGrid() {
        codeGrid.innerHTML = '';
        const items = allData.filter(t => t.type === 'code');

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = `code-card ${userProgress[item.id] ? 'completed' : ''}`;
            card.innerHTML = `
                <h3>${item.name}</h3>
                <p>Categoria: ${item.category}</p>
                <small>${userProgress[item.id] ? '✅ Concluído' : '⭕ Pendente'}</small>
            `;
            card.addEventListener('click', () => window.location.href = `topico.html?id=${item.id}`);
            codeGrid.appendChild(card);
        });
    }

    // --- INTERAÇÃO ---
    
    // Troca de Abas (Trilha vs Código)
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.style.display = 'none');
            
            tab.classList.add('active');
            const targetId = `view-${tab.dataset.target}`;
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // Filtro de Categorias (Dentro da aba Trilha)
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLearningMap(btn.dataset.cat);
        });
    });

    function updateProgress() {
        const total = allData.length;
        const completed = Object.keys(userProgress).length;
        const pct = total ? Math.round((completed/total)*100) : 0;
        document.getElementById('total-progress-bar').style.width = `${pct}%`;
        document.getElementById('total-progress-text').textContent = `${pct}%`;
    }
});