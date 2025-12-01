// trilha.js
// Gerencia 'trilha.html' e 'topico.html'.

document.addEventListener('DOMContentLoaded', () => {
    let user = null;
    try { user = JSON.parse(sessionStorage.getItem('user')); } catch (e) {}
    if (sessionStorage.getItem('isLoggedIn') !== 'true' || !user || !user.id) {
        alert("Login necessário."); window.location.href = 'login.html'; return;
    }
    const userId = user.id;

    // --- LÓGICA PÁGINA 'topico.html' ---
    const topicoMainContent = document.getElementById('topico-main-content');
    if (topicoMainContent) {
        const params = new URLSearchParams(window.location.search);
        const topicId = params.get('id');
        if (!topicId) { /* ... (Trata erro ID não encontrado) ... */ return; }

        fetch(`http://localhost:3000/api/topic-data/${topicId}`)
            .then(res => { if (!res.ok) throw new Error('Tópico não encontrado.'); return res.json(); })
            .then(data => {
                document.title = `${data.title} - Guia BSI`;
                document.getElementById('topico-titulo').textContent = data.title;
                document.getElementById('topico-descricao').textContent = data.description;
                let contentHTML = '<div class="topico-coluna-esquerda">';
                // Constrói HTML dinamicamente com base nos dados recebidos (importancia, conceitos, etc.)
                // ... (código que monta o HTML omitido por brevidade) ...
                 contentHTML += '</div><div class="topico-coluna-direita">';
                // ... (resto do HTML) ...
                 contentHTML += '</div>';
                topicoMainContent.innerHTML = contentHTML;
                // Colore o SVG
                const svgElement = document.querySelector('#topico-svg-container svg');
                if (svgElement) { /* ... (lógica de colorir SVG) ... */ }
            })
            .catch(err => { /* ... (Trata erro fetch) ... */ });

        // Lógica Tema Específico Guia/Tópico
        const guiaThemeToggle = document.getElementById('guia-theme-toggle');
        if (guiaThemeToggle) { /* ... (lógica do botão de tema guia.css) ... */ }
        return; // Fim da lógica da página de tópico
    }

    // --- LÓGICA PÁGINA 'trilha.html' ---
    const map = document.getElementById('constellation-map');
    const semesterNavButtons = document.querySelectorAll('.semester-button');
    const totalProgressBar = document.getElementById('total-progress-bar');
    const totalProgressText = document.getElementById('total-progress-text');
    if (!map) return; // Sai se não for a página da trilha

    let userProgress = {}; let allTopics = []; let totalTopicsCount = 0;
    const constellationLayout = { /* ... (Dados de 'pos' e 'lines' - omitido) ... */ };

    // Lógica Tema Específico Trilha
    const themeToggle = document.getElementById('theme-toggle'); // Botão diferente
    if (themeToggle) { /* ... (lógica do botão de tema trilha.css) ... */ }

    // Funções de Renderização (renderConstellation, createStar, createLine)
    function renderConstellation(semesterId) { /* ... (código sem alterações) ... */ }
    function createStar(id, name, pos, isCompleted) {
        /* ... (código sem alterações, mas o addEventListener agora redireciona) ... */
        star.addEventListener('click', () => { window.location.href = `topico.html?id=${id}`; });
        /* ... */
     }
    function createLine(pos1, pos2, isCompleted) { /* ... (código sem alterações) ... */ }

    // Funções de Lógica Geral (handleSemesterNavClick, updateTotalProgress)
    function handleSemesterNavClick(event) { /* ... (código sem alterações) ... */ }
    function updateTotalProgress() { /* ... (código sem alterações) ... */ }

    // Inicialização da Trilha (Busca dados da API)
    async function initTrilha() {
        try {
            const response = await fetch(`http://localhost:3000/api/trilha/${userId}`);
            if (!response.ok) { /* ... (Trata erro fetch/sessão expirada) ... */ throw new Error("Falha API"); }
            const topics = await response.json();
            allTopics = topics; totalTopicsCount = topics.length;
            userProgress = {}; topics.forEach(t => { if (t.completed === 1) userProgress[t.id] = true; });
            renderConstellation('1'); updateTotalProgress();
        } catch (error) { console.error('Erro initTrilha:', error); }
        semesterNavButtons.forEach(btn => btn.addEventListener('click', handleSemesterNavClick));
        window.addEventListener('resize', () => { /* ... (re-renderiza) ... */ });
    }
    initTrilha();

}); // Fim DOMContentLoaded