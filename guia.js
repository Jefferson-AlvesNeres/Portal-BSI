// guia.js
// Gerencia lógica comum de guias.

document.addEventListener('DOMContentLoaded', () => {
    // --- TEMA ESPECÍFICO GUIA (Se houver botão) ---
    const guiaThemeToggle = document.getElementById('guia-theme-toggle');
    if (guiaThemeToggle) {
        const docElement = document.documentElement;
        const applyGuiaTheme = (theme) => {
            docElement.setAttribute('data-theme', theme);
            guiaThemeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
            const svgElement = document.querySelector('#topico-svg-container svg');
            if (svgElement) svgElement.style.fill = (theme === 'light') ? 'var(--guia-primary)' : 'var(--guia-primary)';
        };
        const savedTheme = localStorage.getItem('guiaTheme') || 'dark';
        applyGuiaTheme(savedTheme);

        guiaThemeToggle.addEventListener('click', () => {
            let newTheme = docElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('guiaTheme', newTheme);
            applyGuiaTheme(newTheme);
        });
    }

    // --- LÓGICA DE TÓPICO (Só executa se estiver na página de tópico) ---
    // --- LÓGICA PÁGINA 'topico.html' ---
    const topicoMainContent = document.getElementById('topico-main-content');
    if (topicoMainContent) {
        console.log("Lógica Tópico Ativada.");
        const params = new URLSearchParams(window.location.search);
        const topicId = params.get('id');
        const tituloEl = document.getElementById('topico-titulo');
        const descEl = document.getElementById('topico-descricao');

        if (!topicId) {
            if(tituloEl) tituloEl.textContent = "Erro";
            if(descEl) descEl.textContent = "ID do tópico não fornecido.";
            topicoMainContent.innerHTML = '<p style="color: red;">ID inválido na URL.</p>';
            return;
        }

        console.log("Buscando dados para tópico ID:", topicId);
        fetch(`http://localhost:3000/api/topic-data/${topicId}`) // Usa a API
            .then(res => {
                if (!res.ok) { return res.json().then(err => Promise.reject(err)); }
                return res.json();
            })
            .then(data => {
                console.log("Dados do tópico recebidos:", data);
                document.title = `${data.title} - Guia BSI`;
                if(tituloEl) tituloEl.textContent = data.title;
                if(descEl) descEl.textContent = data.description;

                // Constrói o HTML dinamicamente
                let contentHTML = '<div class="topico-coluna-esquerda">';
                if (data.importancia) { contentHTML += `<section class="guia-card glass-panel"><h2>Por que é Importante?</h2><p>${data.importancia}</p></section>`; }
                if (data.conceitos && data.conceitos.length > 0) { contentHTML += `<section class="guia-card glass-panel"><h2>O que aprender?</h2><ul class="guia-list">${data.conceitos.map(c => `<li>${c}</li>`).join('')}</ul></section>`; }
                contentHTML += '</div><div class="topico-coluna-direita">';
                if (data.pratico && data.pratico.problema) { contentHTML += `<section class="guia-card glass-panel"><h2>Exemplo Prático</h2><p class="problema">${data.pratico.problema}</p><div>${data.pratico.solucao || ''}</div>${data.pratico.codigo ? `<pre><code>${data.pratico.codigo}</code></pre>` : ''}</section>`; }
                if (data.svg) { contentHTML += `<section class="guia-card glass-panel"><div class="guia-card-icon" id="topico-svg-container">${data.svg}</div></section>`; }
                if (data.carreiras && data.carreiras.length > 0) { contentHTML += `<section class="guia-card glass-panel"><h2>Carreiras Relacionadas</h2><div class="guia-tags">${data.carreiras.map(c => `<span>${c}</span>`).join('')}</div></section>`; }
                if (data.recursos && data.recursos.length > 0) { contentHTML += `<section class="guia-card glass-panel"><h2>Aprofunde</h2><ul class="guia-list links">${data.recursos.map(r => `<li><a href="${r.url || '#'}" target="_blank">${r.text}</a></li>`).join('')}</ul></section>`; }
                contentHTML += '</div>';

                topicoMainContent.innerHTML = contentHTML;

                // Aplica a cor do tema ao SVG após inseri-lo
                // ESTA CHAMADA AGORA VAI FUNCIONAR
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                applyGuiaTheme(currentTheme); 

            })
            .catch(err => {
                console.error("Erro ao buscar dados do tópico:", err);
                if(tituloEl) tituloEl.textContent = "Erro 404";
                if(descEl) descEl.textContent = "Não foi possível carregar este tópico.";
                topicoMainContent.innerHTML = `<p style="color: red;">${err.message || 'Erro ao carregar.'}</p>`;
            });

        return; // Fim da lógica da página de tópico
    }


    // --- LÓGICA PÁGINA 'trilha.html' ---
    const map = document.getElementById('constellation-map');
    const semesterNavButtons = document.querySelectorAll('.semester-button');
    const totalProgressBar = document.getElementById('total-progress-bar');
    const totalProgressText = document.getElementById('total-progress-text');
    // Verifica se os elementos da trilha existem
    if (map && semesterNavButtons.length > 0 && totalProgressBar && totalProgressText) {
        console.log("Lógica Trilha Ativada.");

        let userProgress = {}; let allTopics = []; let totalTopicsCount = 0;
        // Layout das constelações (posições e linhas)
        const constellationLayout = {
             1: { topics: [ { id: 1, pos: { x: 20, y: 50 } }, { id: 2, pos: { x: 50, y: 30 } }, { id: 3, pos: { x: 80, y: 50 } }, { id: 100, pos: { x: 50, y: 70 } } ], lines: [ [1, 2], [2, 3], [2, 100] ] },
             2: { topics: [ { id: 4, pos: { x: 25, y: 30 } }, { id: 5, pos: { x: 50, y: 60 } }, { id: 6, pos: { x: 75, y: 30 } }, { id: 101, pos: { x: 50, y: 20 } } ], lines: [ [4, 5], [5, 6], [4, 101] ] },
             3: { topics: [ { id: 7, pos: { x: 20, y: 30 } }, { id: 8, pos: { x: 40, y: 60 } }, { id: 9, pos: { x: 60, y: 60 } }, { id: 10, pos: { x: 80, y: 30 } }, { id: 102, pos: { x: 40, y: 15 } } ], lines: [ [7, 8], [8, 9], [9, 10], [7, 102] ] },
             4: { topics: [ { id: 11, pos: { x: 20, y: 40 } }, { id: 12, pos: { x: 40, y: 70 } }, { id: 13, pos: { x: 60, y: 70 } }, { id: 14, pos: { x: 80, y: 40 } }, { id: 103, pos: { x: 50, y: 20 } } ], lines: [ [11, 12], [12, 13], [13, 14], [11, 103], [14, 103] ] },
             5: { topics: [ { id: 15, pos: { x: 20, y: 60 } }, { id: 16, pos: { x: 40, y: 30 } }, { id: 17, pos: { x: 60, y: 30 } }, { id: 18, pos: { x: 80, y: 60 } }, { id: 104, pos: { x: 50, y: 80 } } ], lines: [ [16, 17], [15, 18], [16, 18], [15, 104] ] },
             6: { topics: [ { id: 19, pos: { x: 20, y: 40 } }, { id: 20, pos: { x: 50, y: 20 } }, { id: 21, pos: { x: 50, y: 70 } }, { id: 22, pos: { x: 80, y: 40 } }, { id: 105, pos: { x: 20, y: 70 } } ], lines: [ [19, 20], [20, 22], [22, 21], [21, 105], [19, 105] ] }, 
             7: { topics: [ { id: 23, pos: { x: 20, y: 30 } }, { id: 24, pos: { x: 40, y: 70 } }, { id: 25, pos: { x: 60, y: 30 } }, { id: 26, pos: { x: 80, y: 70 } }, { id: 106, pos: { x: 50, y: 50 } } ], lines: [ [23, 24], [23, 25], [25, 106], [24, 106], [106, 26] ] },
             8: { topics: [ { id: 27, pos: { x: 50, y: 20 } }, { id: 28, pos: { x: 50, y: 80 } }, { id: 29, pos: { x: 20, y: 50 } }, { id: 30, pos: { x: 80, y: 50 } } ], lines: [ [27, 29], [27, 30], [29, 28], [30, 28] ] }
        };

        // Lógica Tema Trilha (Botão diferente - #theme-toggle)
        // Esta é uma lógica de tema SEPARADA, que usa o 'trilha.css'
        const trilhaThemeToggle = document.getElementById('theme-toggle'); 
        if (trilhaThemeToggle) {
             const docElement = document.documentElement;
             const applyTrilhaTheme = (theme) => {
                 docElement.setAttribute('data-theme', theme); // Usa data-theme do trilha.css
                 trilhaThemeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
             };
             const savedTrilhaTheme = localStorage.getItem('trilhaTheme') || 'dark';
             applyTrilhaTheme(savedTrilhaTheme);
             trilhaThemeToggle.addEventListener('click', () => {
                 let newTheme = docElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                 localStorage.setItem('trilhaTheme', newTheme);
                 applyTrilhaTheme(newTheme);
                 // Re-renderiza para aplicar cores
                 const activeBtn = document.querySelector('.semester-button.active');
                 if (activeBtn) renderConstellation(activeBtn.dataset.semesterId);
             });
        }

        // Funções de Renderização
        function renderConstellation(semesterId) {
             console.log("Renderizando semestre:", semesterId);
             map.innerHTML = '';
             const semesterTopicsData = allTopics.filter(t => t.semester == semesterId);
             const layout = constellationLayout[semesterId];
             if (!layout || semesterTopicsData.length === 0) { console.warn(`Layout ou dados não encontrados para semestre ${semesterId}`); return; }

             const topicsToRender = layout.topics.map(layoutTopic => {
                 const topicData = semesterTopicsData.find(t => t.id === layoutTopic.id);
                 return { ...(topicData || {}), pos: layoutTopic.pos, isCompleted: userProgress[layoutTopic.id] || false };
             }).filter(t => t.id); // Filtra caso algum tópico do layout não exista nos dados

             const topicMap = new Map(topicsToRender.map(t => [t.id, t]));

             // Renderiza linhas primeiro
             if (layout.lines) {
                 layout.lines.forEach(line => {
                     const startTopic = topicMap.get(line[0]);
                     const endTopic = topicMap.get(line[1]);
                     if (startTopic && endTopic) {
                         // Lógica de desenhar linha (calcula ângulo e comprimento)
                         const pos1 = startTopic.pos;
                         const pos2 = endTopic.pos;
                         const isCompleted = startTopic.isCompleted && endTopic.isCompleted;
                         
                         const lineEl = document.createElement('div');
                         lineEl.className = `constellation-line ${isCompleted ? 'completed' : ''}`;
                         
                         const mapWidth = map.offsetWidth;
                         const mapHeight = map.offsetHeight;
                         
                         const x1 = (pos1.x / 100) * mapWidth;
                         const y1 = (pos1.y / 100) * mapHeight;
                         const x2 = (pos2.x / 100) * mapWidth;
                         const y2 = (pos2.y / 100) * mapHeight;
                         
                         const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                         const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
                         
                         lineEl.style.width = `${length}px`;
                         lineEl.style.transform = `rotate(${angle}deg)`;
                         lineEl.style.left = `${(pos1.x / 100) * mapWidth}px`;
                         lineEl.style.top = `${(pos1.y / 100) * mapHeight}px`;
                         
                         map.appendChild(lineEl);
                     }
                 });
             }
             // Renderiza estrelas depois (para ficarem por cima)
             topicsToRender.forEach(topic => { createStar(topic.id, topic.name, topic.pos, topic.isCompleted); });
        }
        function createStar(id, name, pos, isCompleted) {
             const star = document.createElement('div');
             star.className = `star ${isCompleted ? 'completed' : ''}`;
             star.style.left = `${pos.x}%`; star.style.top = `${pos.y}%`; star.dataset.topicId = id;
             star.addEventListener('click', () => { window.location.href = `topico.html?id=${id}`; }); // Redireciona
             
             const label = document.createElement('span');
             label.className = 'star-label'; label.textContent = name || `Tópico ${id}`;
             label.style.left = `${pos.x}%`; label.style.top = `${pos.y}%`;
             
             map.appendChild(star); 
             map.appendChild(label);
        }

        // Funções de Lógica Geral
        function handleSemesterNavClick(event) {
             const button = event.target.closest('.semester-button');
             if(!button) return;
             semesterNavButtons.forEach(btn => btn.classList.remove('active'));
             button.classList.add('active');
             renderConstellation(button.dataset.semesterId);
        }
        function updateTotalProgress() {
             if (totalTopicsCount === 0) return;
             const completedTopics = Object.values(userProgress).filter(Boolean).length;
             const percentage = Math.round((completedTopics / totalTopicsCount) * 100);
             totalProgressBar.style.width = `${percentage}%`;
             totalProgressText.textContent = `${percentage}% Concluído`;
        }

        // Inicialização da Trilha
        async function initTrilha() {
             console.log("Iniciando Trilha...");
             if (!userId) { 
                 console.error("ID do usuário não encontrado para carregar trilha."); 
                 alert("Login necessário para ver a trilha.");
                 window.location.href = 'login.html';
                 return; 
             }
             try {
                 console.log("Buscando dados da trilha para usuário:", userId);
                 const response = await fetch(`http://localhost:3000/api/trilha/${userId}`); // Usa API
                 if (!response.ok) {
                     if (response.status === 401) { alert("Sessão expirada."); window.location.href = 'login.html'; return; }
                     throw new Error(`Falha API Trilha: ${response.statusText}`);
                 }
                 const topics = await response.json();
                 console.log("Dados da trilha recebidos:", topics);
                 allTopics = topics; 
                 totalTopicsCount = topics.filter(t => t.id < 100).length; // Conta apenas os tópicos principais (ID < 100) para o progresso
                 
                 userProgress = {}; 
                 topics.forEach(t => { if (t.completed === 1) userProgress[t.id] = true; });
                 
                 renderConstellation('1'); // Renderiza o primeiro semestre
                 updateTotalProgress(); // Atualiza a barra de progresso total
             } catch (error) { console.error('Erro ao carregar dados da trilha:', error); map.innerHTML = '<p style="color:red;">Erro ao carregar a jornada.</p>';}
             
             semesterNavButtons.forEach(btn => btn.addEventListener('click', handleSemesterNavClick));
             
             // Re-renderiza no resize para ajustar as linhas
             window.addEventListener('resize', () => { 
                 const activeBtn = document.querySelector('.semester-button.active'); 
                 if (activeBtn) {
                     renderConstellation(activeBtn.dataset.semesterId); 
                 }
             });
        }
        
        // Garante que o botão do semestre 1 esteja ativo no início
        const firstButton = document.querySelector('.semester-button[data-semester-id="1"]');
        if(firstButton) firstButton.classList.add('active');

        initTrilha(); // Inicia o carregamento
    }

}); // Fim DOMContentLoaded