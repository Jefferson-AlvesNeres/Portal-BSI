 document.addEventListener('DOMContentLoaded', () => {
    const nextStepBtn = document.getElementById('next-step-btn');
    // --- VERIFICAÇÃO DE LOGIN ---
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert("Você precisa estar logado para acessar a trilha de estudos.");
        window.location.href = 'login.html';
        return;
    }

    // --- SELEÇÃO DOS ELEMENTOS DO DOM ---
    const progressBar = document.getElementById('total-progress-bar');
    const progressText = document.getElementById('total-progress-text');
    const missionItems = document.querySelectorAll('.mission-item');
    const totalTopics = missionItems.length;

    // --- CONTEÚDO DE APRENDIZADO DETALHADO ---
    const topicContents = {
        1: {
            title: 'Missão: Entender Algoritmos',
            concept: 'Um algoritmo é uma sequência de passos, como uma receita de bolo, que ensina o computador a realizar uma tarefa. É a base de toda a programação.',
            steps: [
                'Pense em um problema simples do dia a dia (Ex: Fazer café).',
                'Escreva cada passo necessário em uma lista ordenada.',
                'Verifique se os passos são claros, sem ambiguidade.',
                'Parabéns, você criou um algoritmo!'
            ],
            svg: `<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2">
                    <path d="M50 20C50 14.4772 54.4772 10 60 10H140C145.523 10 150 14.4772 150 20V40C150 45.5228 145.523 50 140 50H60C54.4772 50 50 45.5228 50 40V20Z"/>
                    <text x="100" y="33" text-anchor="middle" font-size="12" fill="currentColor">Início</text>
                    <path d="M100 50V70"/>
                    <path d="M25 80H175V100H25V80Z"/>
                    <text x="100" y="93" text-anchor="middle" font-size="12" fill="currentColor">Processo (Ex: Somar A+B)</text>
                    <path d="M100 100V120"/>
                    <path d="M50 130L100 150L150 130L100 110L50 130Z"/>
                    <text x="100" y="133" text-anchor="middle" font-size="12" fill="currentColor">Fim</text>
                  </svg>`,
            tip: 'O melhor algoritmo não é o mais complexo, mas sim o mais simples e eficiente para resolver um problema.'
        },
        2: {
            title: 'Missão: Dominar Variáveis',
            concept: 'Variáveis são "caixas" na memória do computador onde guardamos informações. Cada caixa tem um nome e guarda um tipo de dado, como um número, um texto ou um valor verdadeiro/falso.',
            steps: [
                'Imagine que você precisa guardar a idade de uma pessoa.',
                'Declare uma variável (caixa) com um nome, por exemplo: <code>idade</code>.',
                'Atribua um valor a ela: <code>idade = 25</code>.',
                'Agora você pode usar o nome <code>idade</code> em qualquer lugar do seu código para se referir ao valor 25.'
            ],
            svg: `<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <rect x="50" y="50" width="80" height="50" stroke-width="2"/>
                    <text x="90" y="40" text-anchor="middle" font-size="12" fill="currentColor">idade</text>
                    <text x="90" y="78" text-anchor="middle" font-size="20" font-weight="bold" fill="currentColor">25</text>
                    <path d="M150 75 L180 75" stroke-width="2" marker-end="url(#arrowhead)"/>
                    <text x="210" y="78" text-anchor="middle" font-size="12" fill="currentColor">é o valor</text>
                    <defs><marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs>
                  </svg>`,
            tip: 'Escolha nomes de variáveis que sejam descritivos. Em vez de <code>x</code>, use <code>nomeDoUsuario</code>. Isso torna seu código muito mais fácil de ler.'
        },
        3: {
            title: 'Missão: Estruturar com HTML',
            concept: 'HTML (HyperText Markup Language) é o esqueleto de toda página web. Ele usa "tags" para definir os elementos da página, como títulos, parágrafos e imagens.',
            steps: [
                'Crie um arquivo chamado <code>index.html</code>.',
                'Adicione a estrutura básica: <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, e <code>&lt;body&gt;</code>.',
                'Dentro do <code>&lt;body&gt;</code>, adicione um título com <code>&lt;h1&gt;Meu Primeiro Site&lt;/h1&gt;</code>.',
                'Abra o arquivo no navegador e veja seu título!'
            ],
            svg: `<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1">
                    <rect x="10" y="10" width="280" height="130" rx="5"/>
                    <text x="20" y="25" font-size="10" fill="currentColor">&lt;html&gt;</text>
                    <rect x="20" y="35" width="260" height="40" rx="3" stroke-dasharray="2 2"/>
                    <text x="30" y="50" font-size="10" fill="currentColor">&lt;head&gt; (metadados)</text>
                    <rect x="20" y="85" width="260" height="45" rx="3"/>
                    <text x="30" y="100" font-size="10" fill="currentColor">&lt;body&gt; (conteúdo visível)</text>
                    <rect x="40" y="105" width="100" height="20" rx="2" fill="currentColor" fill-opacity="0.1"/>
                    <text x="50" y="118" font-size="10" fill="currentColor">&lt;h1&gt;Título&lt;/h1&gt;</text>
                  </svg>`,
            tip: 'Use as tags HTML de forma semântica. Por exemplo, use <code>&lt;nav&gt;</code> para navegação e <code>&lt;footer&gt;</code> para o rodapé. Isso ajuda na acessibilidade e no SEO.'
        },
         4: {
            title: 'Missão: Estilizar com CSS',
            concept: 'CSS (Cascading Style Sheets) é a linguagem que usamos para dar estilo e aparência às nossas páginas HTML. Com CSS, você controla cores, fontes, espaçamentos e layouts.',
            steps: [
                'Crie um arquivo chamado <code>style.css</code>.',
                'No seu <code>index.html</code>, adicione dentro do <code>&lt;head&gt;</code> a linha: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>.',
                'No <code>style.css</code>, adicione uma regra para mudar a cor do seu título: <code>h1 { color: blue; }</code>.',
                'Recarregue a página e veja seu título ficar azul!'
            ],
            svg: `<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <rect x="20" y="30" width="100" height="90" rx="5" stroke-width="2"/>
                    <text x="70" y="20" text-anchor="middle" font-size="12" fill="currentColor">index.html</text>
                    <text x="30" y="60" font-size="10" fill="currentColor">&lt;h1&gt;Título&lt;/h1&gt;</text>
                    <rect x="180" y="30" width="100" height="90" rx="5" stroke-width="2"/>
                    <text x="230" y="20" text-anchor="middle" font-size="12" fill="currentColor">style.css</text>
                    <text x="190" y="60" font-size="10" fill="currentColor">h1 { color: blue; }</text>
                    <path d="M125 75 C 140 60, 160 90, 175 75" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrowhead)"/>
                  </svg>`,
            tip: 'Comece usando classes para estilizar seus elementos. É uma forma organizada de aplicar estilos a múltiplos elementos sem repetir código.'
        },
        5: {
            title: 'Missão: Entender o DOM',
            concept: 'O DOM (Document Object Model) é a representação do seu HTML em formato de árvore. O JavaScript usa o DOM para "ver" e "modificar" qualquer elemento da sua página.',
            steps: ['Abra o console do navegador (F12).', 'Digite <code>document.body</code> e pressione Enter.', 'O navegador mostrará o objeto que representa o <code>&lt;body&gt;</code>.', 'Você acabou de interagir com o DOM!'],
            svg: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><text x="150" y="20" text-anchor="middle">document</text><path d="M150 25 V45"/><circle cx="150" cy="50" r="15" fill="var(--glass-bg-light)"/><text x="150" y="54" text-anchor="middle" font-size="10">html</text><path d="M150 65 V85"/><path d="M120 90 H180"/><circle cx="110" cy="90" r="15" fill="var(--glass-bg-light)"/><text x="110" y="94" text-anchor="middle" font-size="10">head</text><circle cx="190" cy="90" r="15" fill="var(--glass-bg-light)"/><text x="190" y="94" text-anchor="middle" font-size="10">body</text></svg>`,
            tip: 'Use <code>document.getElementById("seu-id")</code> ou <code>document.querySelector(".sua-classe")</code> para selecionar qualquer elemento da página e manipulá-lo.'
        },
   
        1: { title: 'Introdução à Computação', content: '<p>Esta matéria é a base de tudo. Você aprenderá a história do computador, como ele funciona em nível fundamental (hardware, software, sistemas binários) e qual o papel de um profissional de TI no mundo.</p>' },
        2: { title: 'Lógica de Programação e Algoritmos', content: '<p>A habilidade mais importante que você vai aprender. Lógica de Programação é a arte de ensinar o computador a resolver problemas passo a passo. Você aprenderá a criar algoritmos usando fluxogramas e pseudocódigo (como "Portugol").</p>' },
        3: { title: 'Matemática Discreta', content: '<p>A matemática dos computadores. Estuda conjuntos, lógica proposicional, relações e grafos. É a base teórica que sustenta a estrutura de dados, bancos de dados e a própria lógica de programação.</p>' },
        4: { title: 'Programação Estruturada (com C)', content: '<p>Seu primeiro contato com uma linguagem de programação real. A linguagem C é poderosa e te ensina a gerenciar memória e entender como o código interage com o hardware. É uma base sólida para aprender qualquer outra linguagem.</p>' },
        5: { title: 'Fundamentos de Sistemas de Informação', content: '<p>Aqui você entende a diferença entre dado, informação e conhecimento, e como os sistemas de informação (SI) são usados nas empresas para apoiar a tomada de decisão e otimizar processos.</p>' },
        6: { title: 'Cálculo I', content: '<p>O estudo de limites, derivadas e integrais. Embora não seja usado diretamente no dia a dia da programação web, o Cálculo desenvolve o raciocínio abstrato e a capacidade de resolver problemas complexos, essenciais na carreira de TI.</p>' },
        7: { title: 'Programação Orientada a Objetos (com Java)', content: '<p>Uma nova forma de pensar e organizar o código. Em vez de uma sequência de passos, você modela o mundo real usando "Objetos" que têm características (atributos) e ações (métodos). Java é uma das linguagens mais usadas no mundo corporativo.</p>' },
        8: { title: 'Estrutura de Dados I', content: '<p>Como organizar a informação na memória do computador de forma eficiente? Você aprenderá sobre listas, filas, pilhas e árvores. Dominar estruturas de dados é o que diferencia um programador júnior de um pleno.</p>' },
        9: { title: 'Modelagem de Banco de Dados', content: '<p>Antes de criar um banco de dados, você precisa planejá-lo. Esta matéria ensina a criar diagramas (Modelo Entidade-Relacionamento) que representam a estrutura dos dados e como eles se relacionam, garantindo a integridade e a eficiência do sistema.</p>' },
        10: { title: 'Banco de Dados (SQL)', content: '<p>Mão na massa! Você aprenderá SQL (Structured Query Language), a linguagem universal para conversar com bancos de dados relacionais. Aprender a inserir, buscar, atualizar e deletar dados é uma habilidade fundamental para qualquer profissional de TI.</p>' },
        11: { title: 'Engenharia de Software I', content: '<p>Construir software não é só codificar. É um processo de engenharia. Você aprenderá sobre o ciclo de vida do software e metodologias de desenvolvimento, como o modelo Cascata e os primeiros conceitos de modelos Ágeis.</p>' },
        12: { title: 'Sistemas Operacionais', content: '<p>Como o Windows, Linux ou macOS gerenciam os recursos do seu computador (processador, memória, disco)? Você estudará os conceitos de processos, threads, escalonamento e gerenciamento de memória.</p>' },
        13: { title: 'Redes de Computadores I', content: '<p>Como a internet funciona? Você aprenderá sobre o modelo OSI/TCP-IP, protocolos como HTTP, TCP, UDP e como os dados viajam de um computador para outro através da rede mundial.</p>' },
        14: { title: 'Desenvolvimento Web: Frontend (HTML, CSS, JS)', content: '<p>A porta de entrada para o desenvolvimento web. Você aprenderá a tríade fundamental: HTML para estruturar o conteúdo, CSS para estilizar, e JavaScript para criar interatividade e dinamismo nas páginas.</p>' },
        15: { title: 'Análise e Projeto de Sistemas', content: '<p>Como traduzir a necessidade de um cliente em um projeto de software? Você aprenderá técnicas para levantar requisitos, analisar o problema e projetar uma solução usando diagramas UML (Unified Modeling Language).</p>' },
        16: { title: 'Gestão de Projetos de TI (PMBOK)', content: '<p>Aprenda a gerenciar um projeto de TI do início ao fim. O PMBOK é um guia de boas práticas que aborda o gerenciamento de escopo, tempo, custo, qualidade, riscos e comunicação.</p>' },
        17: { title: 'Desenvolvimento Web: Backend (Node.js/Express)', content: '<p>Aprenda a construir o "cérebro" das aplicações web. Usando Node.js e o framework Express, você criará APIs, se conectará a bancos de dados e implementará as regras de negócio do sistema.</p>' },
        18: { title: 'Fundamentos de Segurança da Informação', content: '<p>Como proteger os sistemas contra ataques? Você aprenderá os pilares da segurança (Confidencialidade, Integridade, Disponibilidade), tipos de ataques comuns (SQL Injection, XSS) e como se defender deles.</p>' },
        19: { title: 'Interação Humano-Computador (IHC/UX)', content: '<p>O foco aqui é o usuário. Aprenda os princípios de usabilidade, acessibilidade e design de interfaces para criar sistemas que sejam não apenas funcionais, mas também fáceis e agradáveis de usar.</p>' },
        20: { title: 'Inteligência Artificial e Machine Learning', content: '<p>Uma introdução ao campo que está mudando o mundo. Você entenderá os conceitos de redes neurais, aprendizado supervisionado e não supervisionado, e construirá seus primeiros modelos preditivos, geralmente usando Python.</p>' },
        21: { title: 'Computação em Nuvem (Cloud Computing)', content: '<p>Entenda os modelos de serviço (IaaS, PaaS, SaaS) e como usar as plataformas dos grandes provedores (AWS, Azure, Google Cloud) para hospedar e escalar suas aplicações sem precisar de servidores físicos.</p>' },
        22: { title: 'Projeto de TCC I', content: '<p>A fase de planejamento do seu projeto final. Você escolherá um tema, definirá o problema a ser resolvido, fará a pesquisa bibliográfica e escreverá a proposta do projeto para ser aprovada por um professor orientador.</p>' },
        23: { title: 'DevOps e Implantação Contínua', content: '<p>Aprenda a cultura e as ferramentas que unem o desenvolvimento (Dev) e as operações de TI (Ops). Você verá como automatizar o processo de build, teste e implantação de software usando Git, Docker e esteiras de CI/CD.</p>' },
        24: { title: 'Soft Skills e Preparação para Entrevistas', content: '<p>O mercado de TI não busca apenas conhecimento técnico. Esta etapa foca em desenvolver comunicação, trabalho em equipe, resolução de problemas e como se destacar em entrevistas técnicas e comportamentais.</p>' },
        25: { title: 'Projeto de TCC II e Apresentação', content: '<p>Mão na massa! A fase de desenvolvimento e escrita do seu Trabalho de Conclusão de Curso. Ao final, você defenderá seu projeto para uma banca de professores, concluindo sua jornada na graduação.</p>' }
    };

    // --- FUNÇÕES PRINCIPAIS ---

    const updateProgress = () => {
        const checkedTopics = document.querySelectorAll('.mission-item input[type="checkbox"]:checked').length;
        const percentage = totalTopics > 0 ? Math.round((checkedTopics / totalTopics) * 100) : 0;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Concluído`;
    };

    const loadTrailData = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || !user.id) {
            console.error("ID do usuário não encontrado na sessão.");
            return;
        }
        
        fetch(`http://localhost:3000/api/trilha/${user.id}`)
            .then(response => response.json())
            .then(topics => {
                topics.forEach(topic => {
                    const checkbox = document.querySelector(`input[data-topic-id="${topic.id}"]`);
                    if (checkbox) {
                        checkbox.checked = topic.completed === 1;
                    }
                });
                updateProgress();
            })
            .catch(error => console.error('Erro ao carregar dados da trilha:', error));
    };

    const handleTopicChange = (topicId, isCompleted) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        fetch('http://localhost:3000/api/trilha/progresso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, topicId: topicId, completed: isCompleted })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            updateProgress();
        })
        .catch(error => console.error('Erro ao salvar progresso:', error));
    };

    // --- LÓGICA DO MODAL DE APRENDIZADO ---
    const topicModal = document.getElementById('topic-info-modal');
    const closeModalBtn = document.getElementById('close-topic-modal-btn');

    const openTopicModal = (topicId) => {
        const topicData = topicContents[topicId];
        if (topicData) {
            document.getElementById('modal-topic-title').textContent = topicData.title;
            document.getElementById('modal-topic-concept').textContent = topicData.concept;
            document.getElementById('modal-topic-steps').innerHTML = `<ol>${topicData.steps.map(step => `<li>${step}</li>`).join('')}</ol>`;
            document.getElementById('modal-topic-svg').innerHTML = topicData.svg;
            document.getElementById('modal-topic-tip').textContent = topicData.tip;
            topicModal.classList.add('active');
        }
    };
    const closeTopicModal = () => topicModal.classList.remove('active');

    // --- INICIALIZAÇÃO E EVENTOS ---

    missionItems.forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target.type !== 'checkbox') {
                const topicId = item.dataset.topicId;
                openTopicModal(topicId);
            }
        });

        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            const topicId = item.dataset.topicId;
            const isCompleted = checkbox.checked;
            handleTopicChange(topicId, isCompleted);
        });
    });

    closeModalBtn.addEventListener('click', closeTopicModal);
    topicModal.addEventListener('click', (e) => { if (e.target === topicModal) closeTopicModal(); });

    // Inicia tudo carregando os dados da trilha
    loadTrailData();
    // FUNCIONALIDADE DO BOTÃO "PRÓXIMOS PASSOS"
    if(nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            alert("Ótimo trabalho! Em breve, adicionaremos mais jornadas para você continuar seus estudos, cobrindo Backend, Banco de Dados Avançado e muito mais!");
        });
    }
});