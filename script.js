// --- NOVA FUNCIONALIDADE: SCROLL SUAVE PARA O TOPO NO INDEX ---
document.addEventListener('DOMContentLoaded', () => {
    // Procura pelo link só na página que o tem
    const backToTopLink = document.getElementById('back-to-top-link');

    if (backToTopLink) {
        // Adiciona o evento de clique
        backToTopLink.addEventListener('click', (event) => {
            // Previne o comportamento padrão do link (que não funciona)
            event.preventDefault();

            // Encontra o container que realmente rola
            const scrollContainer = document.querySelector('.scroll-container');

            // Manda ele rolar para o topo com animação suave
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Espera o conteúdo da página carregar completamente UMA ÚNICA VEZ
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO SELETOR DE TEMA ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark-mode');
            themeToggleButton.textContent = 'Modo Claro';
        } else {
            htmlElement.classList.remove('dark-mode');
            themeToggleButton.textContent = 'Modo Escuro';
        }
    };
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { applyTheme(savedTheme); }
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = htmlElement.classList.contains('dark-mode');
        if (isDarkMode) {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- CÉREBRO E CONTROLES DO CHATBOT DE IA ---
    const chatButton = document.getElementById('ai-chat-button');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeChatButton = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    let lastTopicDiscussed = null;

    const toggleChat = () => {
        const isOpen = chatWindow.style.display === 'flex';
        if (isOpen) {
            chatWindow.style.display = 'none';
            sessionStorage.setItem('chatState', 'closed'); // Salva o estado fechado
        } else {
            chatWindow.style.display = 'flex';
            sessionStorage.setItem('chatState', 'open'); // Salva o estado aberto
        }
    };

    chatButton.addEventListener('click', toggleChat);
    closeChatButton.addEventListener('click', toggleChat);

    const addMessageToChat = (message, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // --- MODIFICAÇÃO 1: SALVAR MENSAGEM NO HISTÓRICO ---
        // Pega o histórico atual ou cria um array vazio se não existir
        const history = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
        // Adiciona a nova mensagem
        history.push({ sender, message });
        // Salva o histórico atualizado de volta no sessionStorage
        sessionStorage.setItem('chatHistory', JSON.stringify(history));
    };

    // --- BASE DE CONHECIMENTO (MASTER) ---
    const knowledgeBase = [
        // ... (TODA A SUA BASE DE CONHECIMENTO FICA AQUI, SEM ALTERAÇÕES) ...
        // Tópicos Fundamentais
        {
            name: "what_is_bsi",
            keywords: ['o que é bsi', 'o que e bsi', 'sigla bsi', 'significa bsi', 'definição de bsi', 'explique bsi', 'bsi é o que', 'sistemas de informação é o que'],
            priority: 11,
            answer: `<h4>O que é BSI?</h4>BSI é a sigla para <strong>Bacharelado em Sistemas de Informação</strong>.
            <br><br>
            É um curso superior que forma profissionais para analisar, projetar, desenvolver e gerenciar sistemas de software que resolvem problemas e otimizam processos em empresas e organizações. É a área que conecta o mundo da tecnologia com o mundo dos negócios.`,
            more_info: `Aprofundando: O profissional de BSI não é apenas um programador. Ele aprende a entender as necessidades de um cliente, a planejar um projeto, a liderar uma equipe e a garantir que a tecnologia entregue valor real para a empresa. É uma das formações mais completas e versáteis da área de TI.`
        },
        {
            name: "why_choose_bsi",
            keywords: ['por que escolher', 'porque escolher', 'pq escolher', 'motivos para fazer', 'razões para cursar', 'porque devo fazer'],
            priority: 11,
            answer: `<h4>Por que escolher Sistemas de Informação?</h4>Escolher BSI é uma decisão estratégica para quem gosta de tecnologia e quer uma carreira com muitas oportunidades. Os principais motivos são:
            <br><br>
            1. <strong>Versatilidade:</strong> Você não fica preso a uma única função.
            <br>
            2. <strong>Foco no Mercado:</strong> O curso é voltado para resolver problemas reais de empresas, o que garante uma altíssima empregabilidade.
            <br>
            3. <strong>Visão Ampla:</strong> Você aprende não só a parte técnica, mas também a parte de gestão e negócios, o que te prepara para cargos de liderança.`,
            more_info: `Além disso, é uma área que te permite ser criativo e inovador. Se você é uma pessoa curiosa, que gosta de aprender e de construir soluções, BSI é o caminho perfeito para transformar essa paixão em uma profissão de sucesso.`
        },
        // Tópicos de Carreira
        {
            name: "salary",
            keywords: ['salário', 'salario', 'salaro', 'ganha', 'remuneração', 'remuneracao', 'dinheiro', 'pagamento', 'ganhar', 'faixa salarial', 'quanto paga', 'paga bem', 'vencimentos', 'compensação', 'grana', 'salariais', 'renda', 'proventos', 'holerite', 'média salarial', 'qual a base', 'quanto tira', 'como é o pagamento', 'valor', 'valores'],
            priority: 10,
            answer: `<h4>Sobre Salário e Remuneração:</h4>A remuneração em BSI é um grande atrativo! Os valores dependem da sua experiência, especialização e da região.
            <br><br>
            - <strong>Júnior:</strong> R$ 3.500 a R$ 6.000.
            <br>
            - <strong>Pleno:</strong> R$ 6.000 a R$ 12.000.
            <br>
            - <strong>Sênior/Especialista:</strong> Acima de R$ 12.000, podendo ultrapassar R$ 20.000.`,
            more_info: `Aprofundando sobre salários: A <strong>especialização</strong> conta muito. Profissionais de Cloud, Segurança e Dados costumam ter salários acima da média. A <strong>localização</strong> também influencia. Falar inglês fluente pode aumentar seu salário em até 50%.
            <br><br>
            <em>(Fonte: <a href="https://www.glassdoor.com.br/Sal%C3%A1rios/analista-de-sistemas-sal%C3%A1rio-SRCH_KO0,21.htm" target="_blank">Glassdoor Brasil</a>)</em>`
        },
        {
            name: "job_market",
            keywords: ['mercado', 'nercado', 'trabalho', 'emprego', 'carreira', 'vagas', 'oportunidades', 'profissões', 'profissoes', 'área de atuação', 'atuacao', 'saídas', 'empregabilidade', 'onde trabalhar', 'setores', 'campo de trabalho', 'cenário profissional', 'perspectivas', 'arrumar emprego', 'conseguir trampo'],
            priority: 9,
            answer: `<h4>Sobre Mercado de Trabalho:</h4>O mercado para formados em BSI está extremamente aquecido. As principais áreas são: Desenvolvimento de Software, Análise de Dados, Segurança da Informação, Infraestrutura e Cloud, e Gestão de Projetos e Produtos de TI.`,
            more_info: `Além dessas áreas, novas carreiras estão surgindo, como <strong>Engenheiro de DevOps</strong> e <strong>Arquiteto de Soluções</strong>. Uma dica valiosa: construa um <strong>portfólio</strong> no GitHub.
            <br><br>
            <em>(Fonte: <a href="https://roadmap.sh/" target="_blank">Roadmap.sh - Guias de Carreira em TI</a>)</em>`
        },
        // ... E O RESTO DA SUA knowledgeBase ...
         {
            name: "who_are_you",
            keywords: ['quem é você', 'quem e voce', 'vc é um robo', 'é uma ia', 'como você funciona', 'qual seu nome'],
            priority: 1,
            answer: 'Eu sou um assistente virtual programado para fornecer informações sobre o curso e a carreira de Sistemas de Informação.'
        },
        // Tópicos Fundamentais
        {
            name: "what_is_bsi",
            keywords: ['o que é bsi', 'o que e bsi', 'sigla bsi', 'significa bsi', 'definição de bsi', 'explique bsi', 'bsi é o que', 'sistemas de informação é o que'],
            priority: 11,
            answer: `<h4>O que é BSI?</h4>BSI é a sigla para <strong>Bacharelado em Sistemas de Informação</strong>.
            <br><br>
            É um curso superior que forma profissionais para analisar, projetar, desenvolver e gerenciar sistemas de software que resolvem problemas e otimizam processos em empresas e organizações. É a área que conecta o mundo da tecnologia com o mundo dos negócios.`,
            more_info: `Aprofundando: O profissional de BSI não é apenas um programador. Ele aprende a entender as necessidades de um cliente, a planejar um projeto, a liderar uma equipe e a garantir que a tecnologia entregue valor real para a empresa. É uma das formações mais completas e versáteis da área de TI.`
        },
        {
            name: "why_choose_bsi",
            keywords: ['por que escolher', 'porque escolher', 'pq escolher', 'motivos para fazer', 'razões para cursar', 'porque devo fazer'],
            priority: 11,
            answer: `<h4>Por que escolher Sistemas de Informação?</h4>Escolher BSI é uma decisão estratégica para quem gosta de tecnologia e quer uma carreira com muitas oportunidades. Os principais motivos são:
            <br><br>
            1. <strong>Versatilidade:</strong> Você não fica preso a uma única função.
            <br>
            2. <strong>Foco no Mercado:</strong> O curso é voltado para resolver problemas reais de empresas, o que garante uma altíssima empregabilidade.
            <br>
            3. <strong>Visão Ampla:</strong> Você aprende não só a parte técnica, mas também a parte de gestão e negócios, o que te prepara para cargos de liderança.`,
            more_info: `Além disso, é uma área que te permite ser criativo e inovador. Se você é uma pessoa curiosa, que gosta de aprender e de construir soluções, BSI é o caminho perfeito para transformar essa paixão em uma profissão de sucesso.`
        },
        // Tópicos de Carreira
        {
            name: "salary",
            keywords: ['salário', 'salario', 'salaro', 'ganha', 'remuneração', 'remuneracao', 'dinheiro', 'pagamento', 'ganhar', 'faixa salarial', 'quanto paga', 'paga bem', 'vencimentos', 'compensação', 'grana', 'salariais', 'renda', 'proventos', 'holerite', 'média salarial', 'qual a base', 'quanto tira', 'como é o pagamento', 'valor', 'valores'],
            priority: 10,
            answer: `<h4>Sobre Salário e Remuneração:</h4>A remuneração em BSI é um grande atrativo! Os valores dependem da sua experiência, especialização e da região.
            <br><br>
            - <strong>Júnior:</strong> R$ 3.500 a R$ 6.000.
            <br>
            - <strong>Pleno:</strong> R$ 6.000 a R$ 12.000.
            <br>
            - <strong>Sênior/Especialista:</strong> Acima de R$ 12.000, podendo ultrapassar R$ 20.000.`,
            more_info: `Aprofundando sobre salários: A <strong>especialização</strong> conta muito. Profissionais de Cloud, Segurança e Dados costumam ter salários acima da média. A <strong>localização</strong> também influencia. Falar inglês fluente pode aumentar seu salário em até 50%.
            <br><br>
            <em>(Fonte: <a href="https://www.glassdoor.com.br/Sal%C3%A1rios/analista-de-sistemas-sal%C3%A1rio-SRCH_KO0,21.htm" target="_blank">Glassdoor Brasil</a>)</em>`
        },
        {
            name: "job_market",
            keywords: ['mercado', 'nercado', 'trabalho', 'emprego', 'carreira', 'vagas', 'oportunidades', 'profissões', 'profissoes', 'área de atuação', 'atuacao', 'saídas', 'empregabilidade', 'onde trabalhar', 'setores', 'campo de trabalho', 'cenário profissional', 'perspectivas', 'arrumar emprego', 'conseguir trampo'],
            priority: 9,
            answer: `<h4>Sobre Mercado de Trabalho:</h4>O mercado para formados em BSI está extremamente aquecido. As principais áreas são: Desenvolvimento de Software, Análise de Dados, Segurança da Informação, Infraestrutura e Cloud, e Gestão de Projetos e Produtos de TI.`,
            more_info: `Além dessas áreas, novas carreiras estão surgindo, como <strong>Engenheiro de DevOps</strong> e <strong>Arquiteto de Soluções</strong>. Uma dica valiosa: construa um <strong>portfólio</strong> no GitHub.
            <br><br>
            <em>(Fonte: <a href="https://roadmap.sh/" target="_blank">Roadmap.sh - Guias de Carreira em TI</a>)</em>`
        },
        {
            name: "internship",
            keywords: ['estágio', 'estagio', 'primeiro emprego', 'iniciar a carreira', 'como começar', 'sem experiência', 'experiencia', 'primeira vaga'],
            priority: 8.5,
            answer: `<h4>Sobre Estágio:</h4>Conseguir um estágio é crucial! Alunos começam a procurar a partir do <strong>3º ou 4º semestre</strong>.
            <br><br>
            <strong>Onde procurar:</strong> Portais da faculdade, LinkedIn, CIEE e NUBE.
            <br><br>
            <strong>Dica de ouro:</strong> Crie um perfil no GitHub e coloque lá seus projetos. Um portfólio ativo impressiona mais que um currículo vazio.`,
            more_info: `Para se destacar, foque em <strong>Lógica de Programação e Estrutura de Dados</strong>. Participe de eventos e hackathons para fazer networking.
            <br><br>
            <em>(Fonte: <a href="https://www.ciee.org.br/" target="_blank">CIEE - Centro de Integração Empresa-Escola</a>)</em>`
        },
        {
            name: "portfolio",
            keywords: ['portfólio', 'portfolio', 'github', 'projetos', 'mostrar meu trabalho', 'como montar', 'o que colocar nos projetos'],
            priority: 8.5,
            answer: `<h4>Sobre Portfólio:</h4>Ter um portfólio é <strong>essencial</strong>. É a sua vitrine profissional. A melhor forma de começar é usando o <strong>GitHub</strong>.
            <br><br>
            <strong>O que incluir:</strong> Projetos da faculdade (com código limpo e um bom README.md), e projetos pessoais (um site, um script, etc.).`,
            more_info: `Um bom README no GitHub deve conter: O nome do projeto, uma breve descrição, quais tecnologias foram usadas e como rodá-lo. Incluir um GIF do projeto funcionando é um grande diferencial!
            <br><br>
            <em>(Fonte: <a href="https://docs.github.com/pt/get-started" target="_blank">Documentação Oficial do GitHub</a>)</em>`
        },
        {
            name: "dev_levels",
            keywords: ['júnior', 'junior', 'pleno', 'sênior', 'senior', 'níveis de carreira', 'nível de desenvolvedor', 'diferença entre junior e pleno'],
            priority: 8.5,
            answer: `<h4>Sobre os Níveis de Carreira:</h4>Esses são os níveis de senioridade na área de TI.
            <br><br>
            - <strong>Júnior (Jr):</strong> O iniciante. Precisa de supervisão e foca em aprender.
            <br>- <strong>Pleno (Pl):</strong> Já tem autonomia. Consegue tocar projetos sozinho.
            <br>- <strong>Sênior (Sr):</strong> É uma referência técnica. Tem visão arquitetural e mentora a equipe.`,
            more_info: `A transição não é só sobre tempo, mas sobre <strong>impacto e responsabilidade</strong>. Um pleno propõe soluções. Um sênior garante a qualidade e a escalabilidade do projeto a longo prazo.`
        },
        {
            name: "dev_types",
            keywords: ['fullstack', 'full-stack', 'frontend', 'front-end', 'backend', 'back-end', 'tipos de desenvolvedor', 'tipos de dev'],
            priority: 8.5,
            answer: `<h4>Sobre os Tipos de Desenvolvedor:</h4>As três áreas mais comuns no desenvolvimento web são:
            <br><br>
            - <strong>Frontend:</strong> Trabalha com a parte visual, o que o usuário vê (HTML, CSS, JavaScript, React).
            <br>- <strong>Backend:</strong> Trabalha com a "lógica por trás": servidores, bancos de dados, APIs (Java, Python, C#, Node.js).
            <br>- <strong>Full-Stack:</strong> O profissional versátil que atua tanto no Frontend quanto no Backend.`,
            more_info: `Ninguém começa sendo Full-Stack. Geralmente, você se especializa em uma área e, com o tempo, aprende sobre a outra. Ambos os caminhos são excelentes e têm muita demanda.
            <br><br>
            <em>(Fonte: <a href="https://developer.mozilla.org/pt-BR/docs/Learn" target="_blank">MDN Web Docs - Mozilla</a>)</em>`
        },
        {
            name: "soft_skills",
            keywords: ['soft skills', 'habilidades comportamentais', 'comportamento', 'comunicação', 'trabalho em equipe', 'importante saber', 'competências', 'perfil profissional'],
            priority: 7.5,
            answer: `<h4>Sobre Soft Skills:</h4>Suas habilidades comportamentais (Soft Skills) são tão importantes quanto as técnicas. As mais valorizadas são:
            <br><br>
            - <strong>Resolução de Problemas</strong>
            <br>- <strong>Comunicação Clara</strong>
            <br>- <strong>Trabalho em Equipe</strong>
            <br>- <strong>Aprendizado Contínuo (Learnability)</strong>`,
            more_info: `Outras soft skills cruciais são: <strong>Pensamento Crítico</strong>, <strong>Adaptabilidade</strong> e <strong>Inteligência Emocional</strong>. Muitas empresas, como o Google, valorizam mais essas habilidades em entrevistas do que o conhecimento em uma linguagem específica.
            <br><br>
            <em>(Fonte: <a href="https://rework.withgoogle.com/" target="_blank">re:Work - Práticas do Google</a>)</em>`
        },
        {
            name: "certifications",
            keywords: ['certificação', 'certificacao', 'certificado', 'vale a pena tirar certificação', 'quais certificações'],
            priority: 7.5,
            answer: `<h4>Sobre Certificações:</h4>Certificações são um grande diferencial! Elas comprovam seu conhecimento em uma tecnologia específica e podem aumentar seu salário.
            <br><br>
            <strong>Algumas populares:</strong>
            <br>- <strong>Cloud:</strong> AWS Cloud Practitioner, Microsoft Azure Fundamentals (AZ-900).
            <br>- <strong>Segurança:</strong> CompTIA Security+.
            <br>- <strong>Projetos:</strong> Scrum Master (CSM).`,
            more_info: `A dica é: escolha uma área que você goste (Cloud, Segurança, etc.) e comece a estudar para a certificação de entrada dela ainda na faculdade.
            <br><br>
            <em>(Fonte: <a href="https://www.comptia.org/certifications" target="_blank">CompTIA Certifications</a>)</em>`
        },
        {
            name: "english",
            keywords: ['inglês', 'ingles', 'english', 'precisa de inglês', 'idioma', 'falar inglês'],
            priority: 7.5,
            answer: `<h4>Sobre a Importância do Inglês:</h4>Sim, o inglês é <strong>extremamente importante</strong> na área de TI.
            <br><br>
            <strong>Por quê?</strong>
            <br>1. A maior parte da documentação técnica e dos melhores cursos está em inglês.
            <br>2. Permite trabalhar para empresas estrangeiras ganhando em dólar ou euro.`,
            more_info: `Você não precisa ser fluente da noite para o dia. Comece com o "inglês técnico", focando em ler a documentação. Consumir conteúdo em inglês (filmes, vídeos no YouTube sobre programação) ajuda muito.
            <br><br>
            <em>(Fonte: <a href="https://www.ef.com.br/epi/" target="_blank">EF English Proficiency Index</a>)</em>`
        },
        {
            name: "remote_work",
            keywords: ['home office', 'remoto', 'trabalhar de casa', 'trabalho a distância'],
            priority: 7.5,
            answer: `<h4>Sobre Trabalho Remoto:</h4>A área de TI é uma das que mais oferece oportunidades de trabalho remoto (home office). Após a pandemia, muitas empresas adotaram modelos remotos ou híbridos permanentemente.`,
            more_info: `Para ter sucesso no trabalho remoto, é preciso ter muita <strong>disciplina e boa comunicação</strong>. Ferramentas como Slack, Jira e Git se tornam suas melhores amigas.`
        },
        {
            name: "networking",
            keywords: ['networking', 'contatos', 'conhecer pessoas', 'rede de contatos', 'fazer networking'],
            priority: 7.5,
            answer: `<h4>Sobre Networking:</h4>Networking é fundamental! Muitas das melhores vagas não são anunciadas publicamente, elas chegam por indicação.
            <br><br>
            <strong>Como fazer na faculdade:</strong> Converse com professores, participe de eventos e use o LinkedIn para se conectar com profissionais da área.`,
            more_info: `Não pense em networking como "pedir emprego". Pense como "construir relacionamentos". Ofereça ajuda, troque ideias, participe de discussões em grupos. Um bom networking é construído com o tempo.`
        },
        {
            name: "burnout",
            keywords: ['burnout', 'saúde mental', 'muito estresse', 'pressão', 'ansiedade', 'cansaço'],
            priority: 7.5,
            answer: `<h4>Sobre Saúde Mental e Burnout:</h4>É um tópico muito importante. A área de TI pode ser exigente, o que pode levar ao estresse e, em casos extremos, ao burnout (esgotamento profissional).
            <br><br>
            <strong>Como se prevenir:</strong> Defina horários claros, faça pausas regulares, tenha hobbies fora da tecnologia e pratique exercícios físicos.`,
            more_info: `É crucial aprender a dizer "não" e a comunicar seus limites. Cuidar da sua saúde mental não é um luxo, é uma necessidade para ter uma carreira longa e sustentável.
            <br><br>
            <em>(Fonte: <a href="https://www.who.int/mental_health/evidence/burn-out/en/" target="_blank">Organização Mundial da Saúde - Burnout</a>)</em>`
        },
        {
            name: "entrepreneurship",
            keywords: ['empreender', 'abrir empresa', 'meu próprio negócio', 'startup', 'criar uma startup'],
            priority: 6.5,
            answer: `<h4>Sobre Empreendedorismo:</h4>Sim, BSI é uma excelente base para quem sonha em empreender! O curso te dá a visão técnica para construir um produto digital e a visão de negócios para entender o mercado e gerenciar o projeto.`,
            more_info: `Muitas startups de sucesso foram fundadas por pessoas com perfil técnico. Durante a faculdade, participe de hackathons e eventos de empreendedorismo. São ótimos lugares para conhecer pessoas com ideias complementares e encontrar um futuro sócio.`
        },
        // Tópicos de Curso
        {
            name: "course_structure",
            keywords: ['quantas matérias', 'quantas materias', 'disciplinas por semestre', 'estrutura do curso', 'grade por semestre', 'período', 'matérias por período', 'quantas no semestre', 'quantas por semestre', 'são quantas no semestre'],
            priority: 9.6,
            answer: `<h4>Sobre a Estrutura do Curso:</h4>Geralmente, um semestre em BSI tem entre <strong>5 e 7 disciplinas</strong>. Os primeiros semestres focam em matérias de base (Cálculo, Lógica), enquanto os mais avançados focam em projetos práticos.`,
            more_info: `A carga horária total do curso costuma girar em torno de 3.000 horas. Isso inclui as aulas, atividades complementares, estágio e o TCC. Você pode sempre consultar a grade curricular específica no site da universidade que tem interesse.`
        },
        {
            name: "course_comparison",
            keywords: ['diferença', 'diferenca', 'diferensa', 'ciência da computação', 'ciencia', 'engenharia', 'engenaria', 'ads', 'cc', 'ec', 'comparar', 'outro curso', 'qual escolher', 'vs', 'versus', 'análise e desenvolvimento', 'melhor que'],
            priority: 8,
            answer: `<h4>Sobre a Comparação de Cursos:</h4>- <strong>BSI:</strong> Foco na <strong>APLICAÇÃO</strong> da tecnologia nos negócios.
            <br>- <strong>CC:</strong> Foco na <strong>TEORIA</strong> e ciência.
            <br>- <strong>EC:</strong> Foco no <strong>HARDWARE</strong> e sua integração com software.`,
            more_info: `Um Analista de Sistemas (BSI) adapta um sistema para uma empresa. Um Cientista da Computação (CC) cria um novo algoritmo. Um Engenheiro de Computação (EC) projeta o hardware de um smartphone. Todos podem programar, mas as ênfases do curso direcionam a carreira.<br><br><em>(Fonte: <a href="https://emec.mec.gov.br/" target="_blank">Portal e-MEC</a>)</em>`
        },
        {
            name: "is_it_worth_it",
            keywords: ['vale a pena', 'é uma boa', 'bom curso', 'futuro', 'investimento', 'vantagens', 'benefícios', 'compensa', 'é um bom caminho', 'prós e contras', 'é promissor'],
            priority: 7,
            answer: `<h4>Sobre Valer a Pena:</h4>Sim, BSI é um dos melhores investimentos de carreira atualmente devido à alta empregabilidade, salários atrativos, versatilidade de atuação e por ser uma carreira à prova de futuro.`,
            more_info: `A área de BSI te posiciona para trabalhar com as tecnologias mais disruptivas do mercado, como <strong>Inteligência Artificial, Internet das Coisas (IoT) e Computação Quântica</strong>. É uma formação que não fica obsoleta.`
        },
        {
            name: "is_it_hard",
            keywords: ['é difícil', 'dificuldade', 'muita matemática', 'complicado', 'exatas', 'matemática', 'matematica', 'cálculo', 'calculo', 'puxado', 'exige muito', 'precisa ser gênio', 'tenho dificuldade com números', 'é osso'],
            priority: 7,
            answer: `<h4>Sobre a Dificuldade:</h4>O curso é desafiador, mas recompensador. Ele exige <strong>raciocínio lógico</strong>, que é desenvolvido em matérias como Cálculo e Lógica. Não é preciso ser um gênio, mas é preciso gostar de resolver problemas.`,
            more_info: `O maior desafio não é a matemática em si, mas a <strong>abstração</strong>. Aprender a pensar como um computador e a estruturar soluções em código é uma habilidade nova. Com dedicação nas matérias iniciais, o resto do curso flui muito bem.`
        },
        {
            name: "prerequisites",
            keywords: ['preciso saber', 'pré-requisito', 'pre-requisito', 'antes de começar', 'programar antes', 'saber programar', 'conhecimento prévio', 'começar do zero'],
            priority: 7,
            answer: `<h4>Sobre Pré-Requisitos:</h4><strong>Não, você não precisa saber programar antes de entrar no curso.</strong> A graduação em BSI é estruturada para ensinar tudo do zero.`,
            more_info: `Se você quiser chegar um pouco mais preparado, pode explorar o <a href="https://www.freecodecamp.org/" target="_blank">freeCodeCamp</a> ou o <a href="https://www.cursoemvideo.com/" target="_blank">Curso em Vídeo</a> para ter um primeiro contato com Lógica de Programação. Mas, reforçando, isso é um bônus e não uma necessidade.`
        },
        {
            name: "course_content",
            keywords: ['matéria', 'materia', 'disciplina', 'estuda', 'grade', 'aprende', 'conteúdo', 'o que faz', 'faculdade', 'graduação', 'graduacao', 'currículo', 'curriculo', 'aula'],
            priority: 5,
            answer: `<h4>Sobre o Conteúdo do Curso:</h4>Você aprenderá a programar (Java, Python, JS), gerenciar Banco de Dados, construir Sistemas Web, entender de Redes, Segurança da Informação e também a gerenciar projetos com métodos ágeis como Scrum.`,
            more_info: `Além do núcleo técnico, muitos cursos de BSI modernos incluem trilhas de especialização nos últimos semestres, permitindo que você aprofunde em temas como <strong>Desenvolvimento Mobile, Business Intelligence (BI) ou Computação em Nuvem</strong>.`
        },
        {
            name: "tcc",
            keywords: ['tcc', 'trabalho de conclusão', 'projeto final', 'monografia', 'como é o tcc'],
            priority: 6,
            answer: `<h4>Sobre o TCC:</h4>O Trabalho de Conclusão de Curso em BSI geralmente é um projeto prático. Em vez de uma monografia, a maioria das faculdades pede que você desenvolva um <strong>sistema ou software funcional</strong> para resolver um problema real.`,
            more_info: `A escolha do tema do TCC é muito importante. Tente escolher um problema que te motive e que esteja alinhado com a área que você quer seguir. Comece a pensar no tema e a procurar um professor orientador por volta do 6º semestre.`
        },
        {
            name: "computer_needed",
            keywords: ['computador', 'pc', 'notebook', 'máquina', 'qual computador comprar', 'preciso de um pc bom'],
            priority: 6,
            answer: `<h4>Sobre o Computador para Estudar:</h4>Você não precisa de um supercomputador para começar!
            <br><br>
            <strong>Recomendação básica:</strong>
            <br>- Processador: Core i5 ou Ryzen 5.
            <br>- Memória RAM: No mínimo 8GB (16GB é o ideal).
            <br>- Armazenamento: SSD de 256GB ou mais. O SSD faz uma diferença enorme na velocidade.`,
            more_info: `Sistemas Operacionais como Linux (Ubuntu, Mint) são muito populares entre desenvolvedores e podem dar um desempenho melhor em máquinas mais antigas. Não se preocupe em ter o computador mais caro.`
        },
        // Tópicos de Tecnologia
        {
            name: "languages_how_many",
            keywords: ['quantas linguagens', 'número de linguagens', 'total de linguagens', 'existem no mundo', 'quantos tipos', 'todas as linguagens', 'só essas', 'apenas essas'],
            priority: 9.5,
            answer: `<h4>Sobre o Número de Linguagens:</h4>É impossível dar um número exato! Existem <strong>centenas, talvez milhares</strong> de linguagens. Mas para o mercado, o que importa é dominar algumas das <strong>20 a 30 mais relevantes</strong>.`,
            more_info: `A lista é vasta. Algumas são históricas (COBOL), outras de propósito geral (Python), e outras super específicas (R para estatística). O importante não é a quantidade, mas sim ter profundidade.<br><br><em>(Fonte: <a href="https://pt.wikipedia.org/wiki/Lista_de_linguagens_de_programa%C3%A7%C3%A3o" target="_blank">Wikipedia</a>)</em>`
        },
        {
            name: "languages_in_course",
            keywords: ['linguagens', 'linguagem', 'programação', 'programacao', 'programar', 'java', 'python', 'javascript', 'js', 'c#', 'php', 'ruby', 'swift', 'kotlin', 'quais linguagens', 'aprende a programar', 'c++'],
            priority: 9,
            answer: `<h4>Sobre Linguagens de Programação:</h4>O curso de BSI te dará uma base sólida em lógica que permite aprender <strong>qualquer</strong> linguagem. Normalmente, a faculdade foca em linguagens didáticas como <strong>Java, Python e C</strong>.`,
            more_info: `A melhor linguagem para começar é um debate clássico! <strong>Python</strong> é recomendado por sua sintaxe limpa. <strong>JavaScript</strong> é ótimo para resultados visuais rápidos na web. <strong>Java/C#</strong> são robustos e ensinam Orientação a Objetos de forma sólida.<br><br><em>(Fonte: <a href="https://www.tiobe.com/tiobe-index/" target="_blank">TIOBE Index de Popularidade</a>)</em>`
        },
        {
            name: "ai_types",
            keywords: ['tipos de ia', 'tipos de machine learning', 'quais os tipos de ia'],
            priority: 8.5,
            answer: `<h4>Sobre Tipos de IA e Machine Learning:</h4>Existem várias formas de classificar a IA. Uma comum é por capacidade:
            <br>- <strong>IA Fraca (ANI):</strong> Especializada em uma tarefa (assistentes de voz).
            <br>- <strong>IA Forte (AGI):</strong> Com inteligência humana (Ainda teórica).
            <br><br>
            No Machine Learning, as principais categorias são:
            <br>- <strong>Aprendizado Supervisionado:</strong> Aprende com dados rotulados.
            <br>- <strong>Aprendizado Não Supervisionado:</strong> Encontra padrões em dados não rotulados.
            <br>- <strong>Aprendizado por Reforço:</strong> Aprende por tentativa e erro.`,
            more_info: `O profissional de BSI geralmente começa trabalhando com Aprendizado Supervisionado e Não Supervisionado, que têm aplicações mais diretas no mundo dos negócios, como análise de crédito, previsão de vendas e segmentação de clientes.`
        },
        { name: "ai", keywords: ['inteligência artificial', 'ia', 'ai', 'machine learning', 'aprendizado de máquina', 'chatgpt'], priority: 8, answer: `<h4>Sobre Inteligência Artificial (IA):</h4>Sim, BSI é uma porta de entrada fantástica para a área de IA! O curso te dá a base de programação (Python) e matemática/estatística necessária para se especializar em <strong>Machine Learning</strong>.`, more_info: `As aplicações de IA são imensas: sistemas de recomendação, chatbots, análise preditiva, reconhecimento de imagens e muito mais.<br><br><em>(Fonte: <a href="https://www.ibm.com/br-pt/cloud/learn/what-is-artificial-intelligence" target="_blank">IBM - O que é IA?</a>)</em>` },
        { name: "cloud", keywords: ['cloud', 'nuvem', 'aws', 'azure', 'google cloud', 'computação em nuvem'], priority: 8, answer: `<h4>Sobre Computação em Nuvem (Cloud):</h4>Cloud é fundamental na tecnologia hoje. Você aprenderá sobre redes, servidores e sistemas distribuídos na faculdade, que são a base para a nuvem.`, more_info: `Trabalhar com Cloud significa usar a infraestrutura de gigantes como <strong>Amazon (AWS), Microsoft (Azure) e Google (GCP)</strong>. Tirar certificações nessas plataformas pode multiplicar suas oportunidades de emprego.<br><br><em>(Fonte: <a href="https://aws.amazon.com/pt/what-is-cloud-computing/" target="_blank">Amazon AWS</a>)</em>` },
        {
            name: "database",
            keywords: ['banco de dados', 'database', 'sql', 'nosql', 'mysql', 'mongodb'],
            priority: 6,
            answer: `<h4>Sobre Banco de Dados:</h4>Banco de Dados é o "coração" de quase todo sistema. É onde as informações são guardadas de forma organizada. No curso, você terá matérias dedicadas a isso, aprendendo sobre bancos <strong>SQL</strong> (relacionais, ex: MySQL) e <strong>NoSQL</strong> (não relacionais, ex: MongoDB).`,
            more_info: `Aprender SQL é uma das habilidades mais valiosas e universais da área de TI. Saber fazer consultas (queries) para extrair informações é um requisito em quase todas as vagas, de desenvolvedor a analista de dados.<br><br><em>(Fonte: <a href="https://www.mongodb.com/nosql-explained/nosql-vs-sql" target="_blank">MongoDB: NoSQL vs SQL</a>)</em>`
        },
        {
            name: "ux_ui",
            keywords: ['ux', 'ui', 'user experience', 'user interface', 'design', 'designer'],
            priority: 6,
            answer: `<h4>Sobre UX/UI Design:</h4>UX (Experiência do Usuário) e UI (Interface do Usuário) são áreas de design focadas em tornar um sistema fácil e agradável de usar. Um profissional de BSI não precisa ser um designer, mas precisa entender os princípios de usabilidade para construir sistemas que as pessoas consigam usar.`,
            more_info: `Muitos desenvolvedores acabam se especializando em Frontend e trabalham em colaboração direta com designers de UX/UI. Ter um bom olho para design e entender os conceitos básicos de UX/UI é um grande diferencial para qualquer programador.<br><br><em>(Fonte: <a href="https://brasil.uxdesign.cc/" target="_blank">UX Collective Brasil</a>)</em>`
        },
        {
            name: "api",
            keywords: ['api', 'apis', 'o que é uma api'],
            priority: 6,
            answer: `<h4>O que é uma API?</h4>API significa "Application Programming Interface". Pense nela como um <strong>"cardápio"</strong> que um sistema oferece para que outros sistemas possam conversar com ele de forma padronizada.`,
            more_info: `Quando você usa um app que mostra a previsão do tempo, ele está usando a API de um serviço de meteorologia para pedir e receber os dados. No curso, você aprenderá a consumir e a construir APIs.`
        },
        {
            name: "framework",
            keywords: ['framework', 'frameworks', 'o que é um framework'],
            priority: 6,
            answer: `<h4>O que é um Framework?</h4>Um framework é como uma <strong>"caixa de ferramentas"</strong> ou um "esqueleto" pré-pronto para construir um software. Ele oferece códigos e soluções para problemas comuns, permitindo que você desenvolva de forma muito mais rápida.`,
            more_info: `Por exemplo, em vez de criar um sistema de login do zero, você pode usar um framework que já te oferece isso pronto. Exemplos famosos são <strong>React e Angular</strong> (frontend), <strong>Spring</strong> (Java/backend) e <strong>Django</strong> (Python/backend).`
        },
        {
            name: "git_github",
            keywords: ['git', 'github', 'diferença entre git e github', 'versionamento'],
            priority: 6,
            answer: `<h4>Sobre Git e GitHub:</h4>- <strong>Git:</strong> É a <strong>ferramenta</strong>, um sistema de controle de versão que roda no seu computador. Ele permite que você salve "fotos" (commits) do seu código ao longo do tempo.
            <br><br>
            - <strong>GitHub:</strong> É a <strong>plataforma online</strong>, um site que "hospeda" seus projetos Git. É como uma rede social para programadores.`,
            more_info: `Aprender Git é uma das habilidades mais essenciais para qualquer desenvolvedor. É a primeira coisa que você vai usar em qualquer trabalho ou projeto em equipe. GitHub, GitLab e Bitbucket são as plataformas mais famosas que usam Git.`
        },
        // Tópicos Gerais
        {
            name: "duration",
            keywords: ['duração', 'duracao', 'tempo', 'anos', 'semestres', 'quanto dura', 'termina em', 'período', 'quanto tempo leva'],
            priority: 5,
            answer: '<h4>Sobre a Duração:</h4>O Bacharelado em Sistemas de Informação tem uma duração padrão de <strong>4 anos</strong> (8 semestres).'
        },
        {
            name: "greeting",
            keywords: ['oi', 'olá', 'ola', 'e aí', 'eae', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'tudo bem', 'saudações', 'saudacoes', 'bão', 'blz', 'começar'],
            priority: 1,
            answer: 'Olá! Sou o assistente virtual do Portal BSI. Em que posso ajudar?'
        },
        {
            name: "thanks",
            keywords: ['obrigado', 'obg', 'valeu', 'vlw', 'agradecido', 'grato', 'show', 'entendi', 'beleza', 'certo', 'ok', 'ajudou muito'],
            priority: 1,
            answer: 'De nada! Fico feliz em ajudar. Se tiver qualquer outra dúvida, pode me chamar!'
        },
        {
            name: "who_are_you",
            keywords: ['quem é você', 'quem e voce', 'vc é um robo', 'é uma ia', 'como você funciona', 'qual seu nome'],
            priority: 1,
            answer: 'Eu sou um assistente virtual programado para fornecer informações sobre o curso e a carreira de Sistemas de Informação.'
        }
    ];

    // LÓGICA DA IA ... (sem alterações aqui)
    const getAiResponse = (userInput) => {
        const input = userInput.toLowerCase().trim().replace(/[?.,!]/g, '');
        const words = input.split(' ').length;
        let matches = [];

        const followupKeywords = ['mais sobre', 'detalhe', 'aprofundar', 'e sobre isso', 'explique melhor', 'detalhes', 'fale mais', 'como assim'];
        const contextualInterrogatives = ['quantas', 'quantos', 'por que', 'onde', 'como', 'quais são', 'quais os', 'e o', 'e a', 'e as', 'e os', 'só essas', 'apenas essas'];
        
        knowledgeBase.forEach(intent => {
            const hasKeyword = intent.keywords.some(kw => {
                const regex = new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                return regex.test(input);
            });
            if (hasKeyword) { matches.push(intent); }
        });
        
        if (matches.length > 0) {
            const uniqueMatches = [...new Map(matches.map(item => [item.name, item])).values()];
            uniqueMatches.sort((a, b) => b.priority - a.priority);
            lastTopicDiscussed = uniqueMatches[0].name;
            if (['greeting', 'thanks', 'who_are_you'].includes(lastTopicDiscussed)) { lastTopicDiscussed = null; }
            if (uniqueMatches.length > 1 && !['greeting', 'thanks', 'who_are_you'].includes(lastTopicDiscussed)) {
                let combinedResponse = "Ótima pergunta! Você mencionou mais de um tópico. Aqui estão as informações que encontrei:<br><br>";
                uniqueMatches.forEach((match, index) => {
                    combinedResponse += match.answer;
                    if (index < uniqueMatches.length - 1) { combinedResponse += "<br><hr style='border-color: rgba(128,128,128,0.2); border-top: none;'><br>"; }
                });
                return combinedResponse;
            }
            return uniqueMatches[0].answer;
        }
        
        if ( (words <= 4 && contextualInterrogatives.some(kw => input.includes(kw))) || (followupKeywords.some(kw => input.includes(kw))) ) {
            if (lastTopicDiscussed) {
                if (lastTopicDiscussed.includes('languages') && (input.includes('quantas') || input.includes('só essas'))) {
                    const specificIntent = knowledgeBase.find(i => i.name === 'languages_how_many');
                    if(specificIntent) { lastTopicDiscussed = 'languages_how_many'; return specificIntent.answer; }
                }
                if (lastTopicDiscussed.includes('ai') && (input.includes('quantas') || input.includes('tipos'))) {
                    const specificIntent = knowledgeBase.find(i => i.name === 'ai_types');
                     if(specificIntent) { lastTopicDiscussed = 'ai_types'; return specificIntent.answer; }
                }
                const lastIntent = knowledgeBase.find(i => i.name === lastTopicDiscussed);
                if (lastIntent && lastIntent.more_info) { return lastIntent.more_info; }
            }
        }
        
        lastTopicDiscussed = null;
        return `Desculpe, não consegui compreender sua pergunta.<br><br>Tente perguntar sobre:<br>- "Qual o <strong>salário</strong> de um dev sênior?"<br>- "Como conseguir <strong>estágio</strong>?"<br>- "O curso tem muito <strong>cálculo</strong>?"`;
    };

    const handleUserInput = () => {
        const message = chatInput.value;
        if (message.trim() === '') return;

        addMessageToChat(message, 'user');
        chatInput.value = '';

        // --- NOVO: Adiciona o indicador de "digitando..." ---
        const typingIndicator = document.createElement('div');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.className = 'message ai-message typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        // --- FIM DA ADIÇÃO ---

        setTimeout(() => {
            // --- NOVO: Remove o indicador antes de mostrar a resposta ---
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
            // --- FIM DA REMOÇÃO ---

            const aiResponse = getAiResponse(message);
            addMessageToChat(aiResponse, 'ai');
        }, 1200);
    };

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // --- MODIFICAÇÃO 2: CARREGAR O HISTÓRICO E ESTADO DO CHAT AO INICIAR ---
    const loadChatHistory = () => {
        // Carrega o estado da janela (aberta/fechada)
        const chatState = sessionStorage.getItem('chatState');
        if (chatState === 'open') {
            chatWindow.style.display = 'flex';
        }

        // Carrega o histórico de mensagens
        const history = JSON.parse(sessionStorage.getItem('chatHistory'));
        if (history && history.length > 0) {
            // Limpa a mensagem padrão de "Olá!" para não duplicar
            chatMessages.innerHTML = ''; 
            history.forEach(item => {
                // Recria as mensagens sem salvar de novo (apenas visualmente)
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${item.sender}-message`;
                messageDiv.innerHTML = item.message;
                chatMessages.appendChild(messageDiv);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            // Se não houver histórico, limpa para garantir que não haja nada salvo
            sessionStorage.removeItem('chatHistory');
        }
    };
    
    loadChatHistory(); // Executa a função assim que a página carrega

});

// --- NOVA FUNCIONALIDADE: SCROLL SUAVE PARA O TOPO NO INDEX ---
document.addEventListener('DOMContentLoaded', () => {
    // Procura pelo link só na página que o tem
    const backToTopLink = document.getElementById('back-to-top-link');

    if (backToTopLink) {
        // Adiciona o evento de clique
        backToTopLink.addEventListener('click', (event) => {
            // Previne o comportamento padrão do link (que não funciona)
            event.preventDefault();

            // Encontra o container que realmente rola
            const scrollContainer = document.querySelector('.scroll-container');

            // Manda ele rolar para o topo com animação suave
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// --- LÓGICA DE VALIDAÇÃO DO FORMULÁRIO DE CADASTRO ---

// Espera o DOM carregar para rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // Procura pelo formulário de cadastro na página. Se não achar, não faz nada.
    const form = document.getElementById('registration-form');
    if (!form) {
        return;
    }

    // Pega todos os campos e spans de erro que vamos usar
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // Função para mostrar erro
    const showError = (input, errorElement, message) => {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('active');
    };

    // Função para limpar erro
    const clearError = (input, errorElement) => {
        input.classList.remove('invalid');
        errorElement.classList.remove('active');
        errorElement.textContent = '';
    };
    
    // Funções de validação para cada campo
    const validateName = () => {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'O campo nome é obrigatório.');
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Por favor, insira um email válido.');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    };

    const validatePassword = () => {
        if (passwordInput.value.length < 8) {
            showError(passwordInput, passwordError, 'A senha deve ter no mínimo 8 caracteres.');
            return false;
        }
        clearError(passwordInput, passwordError);
        return true;
    };

    const validateConfirmPassword = () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, confirmPasswordError, 'As senhas não coincidem.');
            return false;
        }
        if (confirmPasswordInput.value.trim() === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Confirme sua senha.');
            return false;
        }
        clearError(confirmPasswordInput, confirmPasswordError);
        return true;
    };

    // Validação em tempo real enquanto o usuário digita
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    // Também valida a confirmação quando a senha principal muda
    passwordInput.addEventListener('input', validateConfirmPassword);


    // Validação final quando o formulário é enviado
    form.addEventListener('submit', (event) => {
        // Impede o envio do formulário para o servidor
        event.preventDefault();

        // Roda todas as validações
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

       // Se tudo estiver correto, podemos prosseguir
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            // SUBSTITUÍMOS O ALERT PELA LINHA ABAIXO:
            window.location.href = 'perfil.html'; // Redireciona o usuário para a página de perfil

            // No futuro, o envio para o backend viria antes do redirecionamento.
            form.reset(); 
        }
    });
});

// --- LÓGICA DO MODAL DE EDIÇÃO DE PERFIL ---

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const modal = document.getElementById('edit-profile-modal');
    const openModalBtn = document.getElementById('open-edit-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const editForm = document.getElementById('edit-profile-form');

    // Se os botões não existirem nesta página, o script para aqui.
    if (!modal || !openModalBtn || !closeModalBtn) {
        return;
    }

    // Função para abrir o modal
    const openModal = () => {
        modal.classList.add('active');
    };

    // Função para fechar o modal
    const closeModal = () => {
        modal.classList.remove('active');
    };

    // Event Listeners
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Fecha o modal se o usuário clicar no fundo (overlay)
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Lida com o envio do formulário
    editForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        alert('Informações salvas com sucesso! (Simulação)');
        closeModal();
    });
});

// --- LÓGICA DE ESTADO DE LOGIN (FAKE AUTH) ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. LÓGICA PARA SIMULAR O LOGIN
    // --- Na página de cadastro ---
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            // A validação já ocorre em outro script, aqui apenas simulamos o login
            if (e.defaultPrevented) { // Se o formulário for válido
                sessionStorage.setItem('isLoggedIn', 'true');
                // O redirecionamento para 'perfil.html' já acontece no outro script
            }
        });
    }

    // --- Na página de login (simulação simples) ---
    const loginForm = document.querySelector('.auth-form:not(#registration-form)');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'perfil.html';
        });
    }

    // 2. LÓGICA PARA ATUALIZAR O HEADER
    const checkLoginState = () => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

        const loginLink = document.querySelector('.login-link-nav');
        const profileLink = document.querySelector('.profile-link-nav');
        const logoutBtn = document.getElementById('logout-btn');

        if (isLoggedIn) {
            if (loginLink) loginLink.style.display = 'none';
            if (profileLink) profileLink.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
        } else {
            if (loginLink) loginLink.style.display = 'inline-block';
            if (profileLink) profileLink.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    };

    // 3. LÓGICA DE LOGOUT
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            alert('Você saiu da sua conta.');
            window.location.href = 'index.html';
        });
    }

    // Roda a verificação em TODAS as páginas assim que carregam
    checkLoginState();
});

// --- LÓGICA DO MODAL DE ALTERAR SENHA ---

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos específicos deste modal
    const passwordModal = document.getElementById('change-password-modal');
    const openPasswordModalBtn = document.getElementById('open-change-password-modal-btn');
    const closePasswordModalBtn = document.getElementById('close-password-modal-btn');
    const changePasswordForm = document.getElementById('change-password-form');

    // Se os elementos não existirem nesta página, o script para.
    if (!passwordModal || !openPasswordModalBtn || !closePasswordModalBtn) {
        return;
    }

    // Função para abrir o modal de senha
    const openPasswordModal = () => {
        passwordModal.classList.add('active');
    };

    // Função para fechar o modal de senha
    const closePasswordModal = () => {
        passwordModal.classList.remove('active');
    };

    // Event Listeners
    openPasswordModalBtn.addEventListener('click', openPasswordModal);
    closePasswordModalBtn.addEventListener('click', closePasswordModal);

    // Fecha o modal se o usuário clicar no fundo (overlay)
    passwordModal.addEventListener('click', (event) => {
        if (event.target === passwordModal) {
            closePasswordModal();
        }
    });

    // Lida com o envio do formulário de alteração de senha
    changePasswordForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Simples validação para o exemplo
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;

        if (newPassword !== confirmNewPassword) {
            alert('Erro: As novas senhas não coincidem!');
            return;
 L       }
        if (newPassword.length < 8) {
            alert('Erro: A nova senha deve ter no mínimo 8 caracteres.');
            return;
        }

        alert('Senha alterada com sucesso! (Simulação)');
        changePasswordForm.reset(); // Limpa o formulário
        closePasswordModal(); // Fecha o modal
    });
});