// topicdata.js
// CONTEÚDO COMPLETO GERADO PELA IA (VERSÃO LIMPA)
// Baseado em grades curriculares comuns de BSI

// Helper para buscar SVGs (ícones já definidos em script.js)
const svgs = {
    code: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 30 L15 50 L30 70 M70 30 L85 50 L70 70" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M55 25 L45 75" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
    atom: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="10" fill="currentColor"/><ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" stroke-width="4"/><ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" stroke-width="4" transform="rotate(45 50 50)"/><ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" stroke-width="4" transform="rotate(-45 50 50)"/></svg>',
    database: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="25" rx="35" ry="10" stroke="currentColor" stroke-width="4"/><path d="M15 25 V 75 C 15 80.5228 30.4315 85 50 85 C 69.5685 85 85 80.5228 85 75 V 25" stroke="currentColor" stroke-width="4"/><ellipse cx="50" cy="50" rx="35" ry="10" stroke="currentColor" stroke-width="4"/></svg>',
    network: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="12" stroke="currentColor" stroke-width="4"/><circle cx="20" cy="25" r="8" stroke="currentColor" stroke-width="4"/><circle cx="80" cy="25" r="8" stroke="currentColor" stroke-width="4"/><circle cx="35" cy="80" r="8" stroke="currentColor" stroke-width="4"/><circle cx="65" cy="80" r="8" stroke="currentColor" stroke-width="4"/><path d="M45 40 L 25 29 M75 29 L 55 40 M 40 75 L 47 59 M 53 59 L 60 75" stroke="currentColor" stroke-width="3"/></svg>',
    bug: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="25" width="40" height="50" rx="20" stroke="currentColor" stroke-width="4" fill="currentColor"/><path d="M50 25 V 10 M 20 20 L 35 30 M 80 20 L 65 30 M 20 50 L 30 50 M 80 50 L 70 50 M 20 80 L 35 70 M 80 80 L 65 70" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    terminal: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 30 L 40 50 L 20 70" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M45 70 H 80" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>',
    star: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L 61.2257 39.1117 H 97.5528 L 68.1636 60.3883 L 79.3893 94.5 L 50 73.2233 L 20.6107 94.5 L 31.8364 60.3883 L 2.44717 39.1117 H 38.7743 L 50 5 Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" fill="currentColor"/></svg>',
    gear: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="15" stroke="currentColor" stroke-width="4"/><path d="M50 15 V 5 M 50 95 V 85 M 85 50 H 95 M 5 50 H 15 M 75.25 24.75 L 82.32 17.68 M 17.68 82.32 L 24.75 75.25 M 75.25 75.25 L 82.32 82.32 M 17.68 17.68 L 24.75 24.75" stroke="currentColor" stroke-width="12" stroke-linecap="round"/><path d="M50 15 V 5 M 50 95 V 85 M 85 50 H 95 M 5 50 H 15 M 75.25 24.75 L 82.32 17.68 M 17.68 82.32 L 24.75 75.25 M 75.25 75.25 L 82.32 82.32 M 17.68 17.68 L 24.75 24.75" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>',
    cloud: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 30 70 C 10 70 10 50 30 50 C 30 30 50 30 50 40 C 60 20 80 25 80 50 C 95 50 95 70 80 70 L 30 70 Z" stroke="currentColor" stroke-width="5" fill="currentColor" opacity="0.8"/></svg>',
    shield: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 L 90 30 V 60 C 90 80 70 90 50 90 C 30 90 10 80 10 60 V 30 L 50 10 Z" stroke="currentColor" stroke-width="5" fill="currentColor" opacity="0.8"/></svg>',
    rocket: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M70 15 L 50 10 L 30 15 V 50 H 70 V 15 Z" stroke="currentColor" stroke-width="4"/><path d="M30 50 C 20 60 20 80 30 80 L 40 70 H 60 L 70 80 C 80 80 80 60 70 50 H 30 Z" stroke="currentColor" stroke-width="4" fill="currentColor"/><circle cx="50" cy="35" r="7" stroke="currentColor" stroke-width="4"/><path d="M 40 80 L 35 90 M 50 80 L 50 95 M 60 80 L 65 90" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
    solaris: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" stroke="#F59E0B" stroke-width="5"/><path d="M50 15 V35 M50 65 V85 M15 50 H35 M65 50 H85 M25 25 L40 40 M60 60 L75 75 M25 75 L40 60 M60 40 L75 25" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/></svg>',
    circuit: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="90" rx="10" stroke="#C4B5FD" stroke-width="4"/><path d="M30 30 H70 V70 H30 Z M30 50 H50 M50 30 V50 M50 70 V50 M70 50 H50" stroke="#8F81A3" stroke-width="3"/><circle cx="50" cy="50" r="5" fill="#FDE047"/></svg>'
};


const topicData = {
    // --- SEMESTRE 1 ---
    "1": {
        "title": "Lógica de Programação",
        "description": "O pilar do pensamento computacional.",
        "importancia": "É a base fundamental para aprender a programar. Ensina como quebrar problemas complexos em passos pequenos, lógicos e sequenciais que o computador pode entender. Sem lógica, é impossível programar.",
        "conceitos": [
            "O que são Algoritmos",
            "Pseudocódigo e Fluxogramas",
            "Variáveis e Tipos de Dados (Inteiro, Real, Caractere, Lógico)",
            "Operadores Aritméticos e Lógicos (E, OU, NÃO)",
            "Estruturas Condicionais (SE, SENAO, CASO)",
            "Estruturas de Repetição (PARA, ENQUANTO, FAÇA-ENQUANTO)"
        ],
        "pratico": {
            "problema": "Problema Prático: Decidir se um aluno é aprovado com base na média (>= 7.0) E frequência (>= 75%).",
            "solucao": "Solução: Precisamos verificar AMBAS as condições usando o operador 'E' (AND). Se as duas forem verdadeiras, o aluno está aprovado; caso contrário, está reprovado.",
            "codigo": "media = 8.5\nfrequencia = 0.80 // (80%)\n\nSE (media >= 7.0) E (frequencia >= 0.75) ENTAO\n    Escreva(\"Aluno Aprovado!\")\nSENAO\n    Escreva(\"Aluno Reprovado.\")\nFIMSE"
        },
        "svg": svgs.code,
        "carreiras": ["Desenvolvedor (Qualquer)", "Analista de Sistemas", "Cientista de Dados"],
        "recursos": [
            { "text": "Curso de Lógica de Programação - Curso em Vídeo", "url": "https://www.cursoemvideo.com/curso/curso-de-logica-de-programacao/" }
        ]
    },
    "2": {
        "title": "Arquitetura de Computadores",
        "description": "Como o computador funciona por dentro, do bit ao processador.",
        "importancia": "Entender a arquitetura ajuda a escrever códigos mais eficientes, sabendo como o software interage com o hardware (CPU, Memória RAM, Disco).",
        "conceitos": [
            "Sistemas de Numeração (Binário, Hexadecimal)",
            "Portas Lógicas (AND, OR, NOT, XOR)",
            "Componentes de Hardware (CPU, RAM, ROM, HD/SSD)",
            "Barramentos e Hierarquia de Memória (Cache, Principal, Secundária)"
        ],
        "pratico": {
            "problema": "Problema: Por que um programa fica lento quando 'falta memória'?",
            "solucao": "Solução: A Memória RAM é muito rápida, mas volátil. Quando ela enche, o Sistema Operacional usa o SSD/HD (que é muito mais lento) como uma 'extensão' (memória virtual ou swap). O tempo de acesso ao disco é milhares de vezes maior que o da RAM, causando a lentidão.",
            "codigo": "// Exemplo Conceitual\n\n// Acesso rápido (nanossegundos)\nvariavel_na_ram = 10\n\n// Acesso lento (milissegundos)\n// (Quando a RAM acaba)\narquivo_no_disco.escrever(variavel_na_ram)"
        },
        "svg": svgs.circuit,
        "carreiras": ["Engenheiro de Hardware", "Desenvolvedor de Firmware", "Infraestrutura"],
        "recursos": [
            { "text": "Curso de Arquitetura - Bóson Treinamentos", "url": "https://www.youtube.com/playlist?list=PLucm8g_ezqNrM9g8H2o2e-g_g3K23G3R1" }
        ]
    },
    "3": {
        "title": "Matemática Discreta",
        "description": "A base matemática da computação.",
        "importancia": "É a fundação teórica para banco de dados (conjuntos), algoritmos (grafos) e segurança (teoria dos números). Essencial para o raciocínio lógico.",
        "conceitos": ["Teoria dos Conjuntos", "Relações e Funções", "Lógica Proposicional", "Teoria dos Grafos e Árvores"],
        "pratico": {
            "problema": "Problema: Como o Facebook sugere 'amigos em comum'?",
            "solucao": "Solução: Usando Teoria dos Grafos. Cada pessoa é um 'nó' (vértice) e cada amizade é uma 'linha' (aresta). O sistema procura por nós que estão a 2 passos de distância de você (amigos dos seus amigos).",
            "codigo": "// Conceito de Grafo (Adj = Adjacente)\n\nVoce.Adj = [AmigoA, AmigoB]\nAmigoA.Adj = [Voce, AmigoC, AmigoD]\nAmigoB.Adj = [Voce, AmigoC]\n\n// Amigos em comum com Voce:\n// (Amigos de AmigoA) INTERSECÇÃO (Amigos de AmigoB)\n// Resultado: AmigoC"
        },
        "svg": svgs.atom,
        "carreiras": ["Cientista de Dados", "Acadêmico", "Desenvolvedor de IA"],
        "recursos": [
            { "text": "Matemática Discreta - UNIVESP", "url": "https://www.youtube.com/playlist?list=PLxI8Can9yAHf8ee22a28I8g_GMS16J1p_" }
        ]
    },
    "100": {
        "title": "Comunicação e Expressão",
        "description": "A 'Soft Skill' mais importante: saber se comunicar.",
        "importancia": "De nada adianta ter uma ideia genial se você não consegue explicá-la para seu time, seu chefe ou seu cliente. A comunicação clara evita bugs, atrasos e frustrações.",
        "conceitos": ["Comunicação Oral e Escrita", "Redação Técnica (Documentação)", "Apresentações Eficazes", "Escuta Ativa"],
        "pratico": {
            "problema": "Um cliente diz: 'Quero um botão azul'. O dev faz. O cliente reclama: 'Não era esse azul!'.",
            "solucao": "O profissional com boa comunicação perguntaria antes: 'Claro. Qual tom de azul? Você tem o código hexadecimal (ex: #005A9C)? Este botão é a ação principal da tela?' (Escuta Ativa e Validação de Requisitos).",
            "codigo": "// Código Ruim (Sem comunicação)\n<button style=\"background-color: blue;\">OK</button>\n\n// Código Bom (Após validação)\n<button class=\"btn-primary-action\">Salvar</button>\n// CSS: .btn-primary-action { background-color: #005A9C; }"
        },
        "svg": svgs.terminal, // Usando terminal como placeholder de "texto"
        "carreiras": ["Todas", "Gerente de Projetos", "Tech Lead", "Analista de Negócios"],
        "recursos": []
    },

    // --- SEMESTRE 2 ---
    "4": {
        "title": "Cálculo I",
        "description": "Entendendo limites, derivadas e integrais.",
        "importancia": "Fundamental para áreas como Ciência de Dados, IA e Computação Gráfica. Desenvolve o raciocínio analítico para otimizar algoritmos.",
        "conceitos": ["Funções e Limites", "Derivadas (Regra da Cadeia)", "Integrais (Básicas)"],
        "pratico": {
            "problema": "Problema: Como encontrar a taxa de crescimento de usuários de um app (a 'velocidade') em um instante específico?",
            "solucao": "Solução: Usando Derivadas. Se a curva de usuários é U(t), a derivada U'(t) nos dá a velocidade de crescimento instantânea.",
            "codigo": "// Conceito: U(t) = t^2 (crescimento quadrático)\n// Derivada: U'(t) = 2*t (velocidade linear)"
        },
        "svg": svgs.solaris, // Usando sol como placeholder
        "carreiras": ["Cientista de Dados", "Desenvolvedor de Jogos", "Pesquisador em IA"],
        "recursos": [
             { "text": "Khan Academy - Cálculo", "url": "https://pt.khanacademy.org/math/calculus-1" }
        ]
    },
    "5": {
        "title": "Algoritmos e Estrutura de Dados I",
        "description": "Como organizar e manipular dados de forma eficiente.",
        "importancia": "É o núcleo da ciência da computação. Define se seu programa será rápido e escalável ou lento e problemático. Essencial para entrevistas técnicas.",
        "conceitos": ["Complexidade de Algoritmos (Big O)", "Arrays e Matrizes", "Listas, Pilhas e Filas", "Algoritmos de Ordenação (Bubble, Insertion, QuickSort)"],
        "pratico": {
            "problema": "Problema: Você tem 1 milhão de itens e precisa achar um. Você usa uma Lista ou um Array?",
            "solucao": "Solução: Se você sabe o índice, um Array acessa em O(1) (instantâneo). Se você não sabe, terá que procurar um por um (O(n)). A escolha da estrutura de dados correta é crucial.",
            "codigo": "// Acesso rápido em Array (O(1))\nitem = meu_array[500000]\n\n// Acesso lento em Lista (O(n))\nitem = minha_lista.procurar(500000)"
        },
        "svg": svgs.gear,
        "carreiras": ["Desenvolvedor (Qualquer)", "Engenheiro de Software", "Arquiteto de Soluções"],
        "recursos": [
            { "text": "CS50 - Harvard (Legendado)", "url": "https://www.youtube.com/playlist?list=PLrOyM49ctTw_Ig-E-Jp6YJ0A24-wZt9p_" }
        ]
    },
    "6": {
        "title": "Programação I (Imperativa)",
        "description": "Sua primeira linguagem de programação.",
        "importancia": "Traduz a lógica dos algoritmos para uma linguagem que o computador entende (como Python, Java ou C). É onde você aprende a sintaxe básica.",
        "conceitos": ["Sintaxe da Linguagem", "Variáveis e Constantes", "Funções e Procedimentos", "Manipulação de Arquivos (Leitura/Escrita)"],
        "pratico": {
            "problema": "Problema: Criar uma função que recebe dois números e retorna a soma.",
            "solucao": "Definir uma função (ou método) que aceita dois parâmetros (a, b) e usa o operador '+' para retornar o resultado.",
            "codigo": "// Exemplo em Python\ndef somar(a, b):\n    resultado = a + b\n    return resultado\n\nprint( somar(5, 10) ) // Saída: 15"
        },
        "svg": svgs.code,
        "carreiras": ["Desenvolvedor"],
        "recursos": [
            { "text": "Curso de Python - Curso em Vídeo", "url": "https://www.cursoemvideo.com/curso/curso-python-3-mundo-1/" }
        ]
    },
    "101": {
        "title": "Metodologia Científica",
        "description": "Aprendendo a pesquisar e escrever trabalhos acadêmicos.",
        "importancia": "Essencial para formatar seu TCC e outros trabalhos nas normas ABNT. Ensina a pesquisar fontes confiáveis e a estruturar um argumento científico.",
        "conceitos": ["Normas ABNT", "Tipos de Pesquisa (Qualitativa, Quantitativa)", "Estrutura de um Artigo", "Busca em Bases Científicas (Scielo, IEEE)"],
        "pratico": {
            "problema": "Problema: Como citar este site no meu TCC?",
            "solucao": "Solução: Usando a norma ABNT NBR 6023 para referências. Ex: SOBRENOME, Nome. Título do artigo. Nome do Site, ano. Disponível em: <url>. Acesso em: data.",
            "codigo": "// Exemplo de Referência ABNT\n\nGOOGLE. Guia BSI. Formosa, 2025. \nDisponível em: http://127.0.0.1:5500/index.html. \nAcesso em: 27 out. 2025."
        },
        "svg": svgs.terminal,
        "carreiras": ["Acadêmico", "Pesquisador", "Qualquer estudante (para TCC)"],
        "recursos": []
    },

    // --- SEMESTRE 3 ---
    "7": {
        "title": "Programação II (Orientada a Objetos)",
        "description": "Aprendendo o paradigma de Programação Orientada a Objetos (POO).",
        "importancia": "POO é o paradigma dominante no mercado (Java, C#, Python, PHP). Ensina a organizar códigos complexos em 'Objetos' (como 'Carro', 'Cliente', 'Produto'), tornando o software mais reutilizável e fácil de manter.",
        "conceitos": ["Classes e Objetos", "Atributos e Métodos", "Pilares: Encapsulamento, Herança, Polimorfismo", "Construtores e Destrutores"],
        "pratico": {
            "problema": "Problema: Como representar 10 tipos diferentes de veículos (Carro, Moto, Caminhão) no sistema?",
            "solucao": "Solução: Criar uma classe 'Veiculo' (com atributos 'placa', 'cor') e fazer 'Carro' e 'Moto' herdarem dela, adicionando seus atributos específicos ('portaMalas', 'cilindradas').",
            "codigo": "// Exemplo em Java/C# (Conceitual)\nclass Veiculo {\n  public string placa;\n  public void acelerar() { /*...*/ }\n}\n\nclass Carro extends Veiculo {\n  public int numPortas;\n}\n\nCarro meuCarro = new Carro();\nmeuCarro.placa = \"ABC-1234\";\nmeuCarro.acelerar();"
        },
        "svg": svgs.code,
        "carreiras": ["Desenvolvedor de Software", "Engenheiro de Software"],
        "recursos": [
            { "text": "Curso de POO - Curso em Vídeo", "url": "https://www.cursoemvideo.com/curso/curso-de-programacao-orientada-a-objetos/" }
        ]
    },
    "8": {
        "title": "Estrutura de Dados II",
        "description": "Estruturas avançadas como Árvores e Grafos.",
        "importancia": "Permite resolver problemas muito mais complexos, como encontrar o caminho mais curto (GPS), organizar dados para buscas rápidas (árvores) ou entender redes sociais (grafos).",
        "conceitos": ["Recursividade", "Árvores Binárias de Busca", "Árvores Balanceadas (AVL, Rubro-Negra)", "Grafos (Busca em Largura e Profundidade)", "Tabelas Hash (Hashmaps)"],
        "pratico": {
            "problema": "Problema: Como um GPS (Google Maps) acha o caminho mais curto entre dois pontos?",
            "solucao": "Solução: Usando um Grafo onde cidades são 'nós' e estradas são 'arestas' com pesos (distância). O app usa um algoritmo como o 'Dijkstra' para encontrar o caminho com a menor soma de pesos.",
            "codigo": "// Conceito de Grafo (Mapa)\n\nGrafo mapa = new Grafo();\nmapa.addAresta(\"Goiania\", \"Brasilia\", 209); // Peso = 209km\nmapa.addAresta(\"Goiania\", \"Uberlandia\", 323);\n\n// Algoritmo\nDijkstra.encontrarCaminho(mapa, \"Goiania\", \"Brasilia\");"
        },
        "svg": svgs.network,
        "carreiras": ["Desenvolvedor Sênior", "Cientista de Dados", "Arquiteto de Software"],
        "recursos": []
    },
    "9": {
        "title": "Sistemas Operacionais",
        "description": "Entendendo o 'cérebro' do computador (Windows, Linux, macOS).",
        "importancia": "Ajuda a entender como seus programas competem por recursos (CPU, memória), o que são 'threads' (multitarefa) e como o sistema gerencia arquivos.",
        "conceitos": ["Gerenciamento de Processos e Threads", "Escalonamento de CPU", "Gerenciamento de Memória (Paginação, Segmentação)", "Sistemas de Arquivos (FAT32, NTFS, ext4)"],
        "pratico": {
            "problema": "Problema: Por que o PC trava quando abro 50 abas no Chrome?",
            "solucao": "Solução: O S.O. (Sistema Operacional) é responsável por alocar Memória RAM. Cada aba é um processo que consome RAM. Quando a RAM física acaba, o S.O. usa o 'swap' (disco), que é lentíssimo. Se nem isso for suficiente, o S.O. pode 'matar' processos ou travar.",
            "codigo": "// Comando Linux para ver processos\n$ top\n\n// Comando Linux para ver uso de memória\n$ free -h"
        },
        "svg": svgs.terminal,
        "carreiras": ["Desenvolvedor Backend", "DevOps", "Infraestrutura"],
        "recursos": [
            { "text": "Curso de S.O. - Bóson Treinamentos", "url": "https://www.youtube.com/playlist?list=PLucm8g_ezqNp0-Y-wAGiI7S-QY0om0N3v" }
        ]
    },
    "10": {
        "title": "Banco de Dados I",
        "description": "Aprendendo a modelar e consultar dados (SQL).",
        "importancia": "Todo sistema precisa guardar dados (usuários, produtos, posts). Esta matéria ensina a projetar um banco de dados de forma lógica (MER/DER) e a manipular dados usando SQL, a linguagem universal dos bancos.",
        "conceitos": ["Modelo Entidade-Relacionamento (MER)", "Diagrama Entidade-Relacionamento (DER)", "Normalização (1FN, 2FN, 3FN)", "Linguagem SQL (SELECT, INSERT, UPDATE, DELETE, JOIN)"],
        "pratico": {
            "problema": "Problema: Como listar todos os 'Produtos' (tabela A) e suas respectivas 'Categorias' (tabela B)?",
            "solucao": "Solução: Usando o comando SQL 'JOIN', que 'cruza' as duas tabelas usando uma chave comum (ex: categoria_id).",
            "codigo": "SELECT \n    Produto.nome, \n    Categoria.nome\nFROM \n    Produto\nJOIN \n    Categoria ON Produto.categoria_id = Categoria.id;"
        },
        "svg": svgs.database,
        "carreiras": ["Desenvolvedor Backend", "Administrador de BD (DBA)", "Analista de Dados"],
        "recursos": [
            { "text": "Curso de SQL - Curso em Vídeo", "url": "https://www.cursoemvideo.com/curso/curso-de-sql/" }
        ]
    },
    "102": {
        "title": "Administração Geral",
        "description": "Entendendo como as empresas funcionam.",
        "importancia": "Profissionais de BSI criam sistemas para empresas. Entender o básico de Administração (Planejamento, Organização, Direção, Controle - PODC) ajuda a dialogar com gestores e a criar soluções que realmente agregam valor ao negócio.",
        "conceitos": ["Teorias da Administração (Taylor, Fayol)", "Funções Administrativas (PODC)", "Estrutura Organizacional (Departamentos)", "Planejamento Estratégico (SWOT)"],
        "pratico": {
            "problema": "Problema: O 'setor de Vendas' e o 'setor de Estoque' não se conversam, gerando vendas de produtos que não existem.",
            "solucao": "Solução (em BSI): O problema é de 'Organização' (processos). A solução é um Sistema de Informação (ERP) que integre os dois departamentos, dando baixa automática do estoque a cada venda realizada.",
            "codigo": "// Conceito de Integração de Processos\n\nfuncao realizarVenda(produtoId, qtd):\n    SE Estoque.verificar(produtoId, qtd) == TRUE:\n        Estoque.darBaixa(produtoId, qtd)\n        Vendas.registrar(produtoId, qtd)\n        return \"Venda OK\"\n    SENAO:\n        return \"Produto sem estoque\""
        },
        "svg": svgs.gear,
        "carreiras": ["Analista de Negócios", "Gerente de Projetos", "Consultor de TI"],
        "recursos": []
    },

    // --- SEMESTRE 4 ---
    "11": {
        "title": "Engenharia de Software I",
        "description": "Processos e métodos para construir software de qualidade.",
        "importancia": "Programar é fácil, construir um software gigante (como o Nubank) que não quebra e que pode ser atualizado por 500 pessoas é difícil. A Engenharia de Software ensina os 'processos' para isso.",
        "conceitos": ["Ciclo de Vida de Software", "Metodologias (Cascata vs. Ágil - Scrum, Kanban)", "Levantamento de Requisitos (Funcionais e Não-Funcionais)", "Diagramas UML"],
        "pratico": {
            "problema": "Problema: Como construir um App em 6 meses sem que o cliente mude tudo no final?",
            "solucao": "Solução: Usando 'Scrum' (Metodologia Ágil). Em vez de entregar tudo em 6 meses (Cascata), você faz 'Sprints' de 2 semanas, entregando pequenas partes funcionais (ex: o Login). O cliente valida, dá feedback, e o time ajusta o rumo.",
            "codigo": "// Conceito de Requisito Funcional (O que faz)\nRF-001: O sistema DEVE permitir ao usuário fazer login com email e senha.\n\n// Requisito Não-Funcional (Como faz)\nRNF-001: O tempo de resposta do login DEVE ser inferior a 2 segundos."
        },
        "svg": svgs.gear,
        "carreiras": ["Engenheiro de Software", "Tech Lead", "Gerente de Projetos"],
        "recursos": [
            { "text": "O que é Scrum? - BrazilJS", "url": "https://www.youtube.com/watch?v=s_F-NqHfDkE" }
        ]
    },
    "12": {
        "title": "Redes de Computadores I",
        "description": "Como a Internet funciona (Cabos, Wi-Fi, Roteadores).",
        "importancia": "Todo sistema moderno é conectado. Entender de redes permite diagnosticar por que uma aplicação está lenta, como configurar um servidor ou como proteger um sistema de acessos indevidos.",
        "conceitos": ["Modelo OSI e TCP/IP", "Endereçamento IP (IPv4, IPv6)", "Protocolos (HTTP, HTTPS, TCP, UDP, DNS)", "Equipamentos (Roteador, Switch, Modem)"],
        "pratico": {
            "problema": "Problema: Por que quando digito 'google.com' no navegador, ele acha o servidor certo do outro lado do mundo?",
            "solucao": "Solução: Graças ao 'DNS' (Domain Name System). Seu PC pergunta a um servidor DNS: 'Quem é google.com?'. O DNS responde: 'É o IP 142.250.218.110'. Então seu navegador se conecta a esse IP.",
            "codigo": "// Comando no Terminal para ver o IP\n$ ping google.com\n\n// RESPOSTA:\n// DISPARANDO contra google.com [142.250.218.110]..."
        },
        "svg": svgs.network,
        "carreiras": ["Analista de Infraestrutura", "DevOps", "Analista de Segurança", "Desenvolvedor Backend"],
        "recursos": [
            { "text": "Curso de Redes - Curso em Vídeo", "url": "https://www.cursoemvideo.com/curso/curso-de-redes/" }
        ]
    },
    "13": {
        "title": "Estatística e Probabilidade",
        "description": "Coletando, analisando e interpretando dados.",
        "importancia": "É a base matemática da Análise de Dados e Inteligência Artificial. Ensina a extrair conclusões significativas de grandes volumes de informação.",
        "conceitos": ["Média, Mediana e Moda", "Desvio Padrão e Variância", "Distribuição Normal (Curva do Sino)", "Probabilidade e Teste de Hipóteses"],
        "pratico": {
            "problema": "Problema: O novo design do botão 'Comprar' (verde) aumentou as vendas ou foi só sorte?",
            "solucao": "Solução: Usando 'Teste de Hipóteses' (Teste A/B). Você mostra o botão antigo (A) para 50% dos usuários e o novo (B) para 50%. A estatística calcula a probabilidade (p-valor) do resultado ser apenas sorte. Se for baixa, o botão verde é realmente melhor.",
            "codigo": "// Conceito (Python com biblioteca)\n\nimport scipy.stats as stats\n\n// Vendas: [versao_A, versao_B]\nteste_ab = stats.ttest_ind(vendas_A, vendas_B)\n\nSE (teste_ab.pvalue < 0.05): // 95% de confiança\n    print(\"O botão novo é melhor!\")"
        },
        "svg": svgs.atom,
        "carreiras": ["Cientista de Dados", "Analista de BI", "Pesquisador em IA"],
        "recursos": [
            { "text": "Khan Academy - Estatística", "url": "https://pt.khanacademy.org/math/statistics-probability" }
        ]
    },
    "14": {
        "title": "Programação Web I (Frontend)",
        "description": "Construindo a parte visual de sites (HTML, CSS, JS).",
        "importancia": "Ensina a 'tríade' do desenvolvimento web. É a porta de entrada mais rápida para o mercado, pois toda empresa precisa de um site ou sistema web.",
        "conceitos": ["HTML5 (Estrutura e Semântica)", "CSS3 (Estilização, Flexbox, Grid)", "JavaScript Básico (Manipulação de DOM, Eventos)"],
        "pratico": {
            "problema": "Problema: Como fazer um botão mudar de cor quando o mouse passa por cima?",
            "solucao": "Solução: Usando a pseudo-classe ':hover' no CSS.",
            "codigo": "/* CSS */\n.meu-botao {\n    background-color: blue;\n    transition: background-color 0.3s;\n}\n\n.meu-botao:hover {\n    background-color: darkblue;\n}"
        },
        "svg": svgs.code,
        "carreiras": ["Desenvolvedor Frontend", "Desenvolvedor Fullstack", "Web Designer"],
        "recursos": [
            { "text": "Curso de HTML/CSS/JS - Curso em Vídeo", "url": "https://www.cursoemvideo.com/curso/curso-html5-css3-modulo1-de-5-40-horas/" },
            { "text": "MDN Web Docs (A 'Bíblia' do Web)", "url": "https://developer.mozilla.org/pt-BR/" }
        ]
    },
    "103": {
        "title": "Economia e Finanças",
        "description": "Entendendo o impacto do dinheiro nos negócios.",
        "importancia": "Ajuda a entender por que uma empresa investe em um projeto de TI (ROI - Retorno sobre Investimento) e como o sistema que você constrói pode reduzir custos ou aumentar receitas.",
        "conceitos": ["Micro e Macroeconomia", "Lei da Oferta e Procura", "Conceitos de Custo, Preço e Valor", "Análise de Viabilidade (ROI, Payback)"],
        "pratico": {
            "problema": "Problema: O chefe pergunta: 'Por que devo gastar R$ 100.000 num software novo?'",
            "solucao": "Solução (BSI): 'Porque este software automatiza X tarefas, economizando R$ 5.000 por mês em horas extras. O ROI (Retorno) é alcançado em 20 meses (Payback), e depois disso é só lucro.'",
            "codigo": "// Cálculo de Payback Simples\n\nInvestimento = 100000\nEconomiaMensal = 5000\n\nPaybackMeses = Investimento / EconomiaMensal\n// Resultado: 20 meses"
        },
        "svg": svgs.solaris,
        "carreiras": ["Consultor de TI", "Analista de Negócios", "Empreendedor"],
        "recursos": []
    },

    // --- SEMESTRE 5 ---
    "15": {
        "title": "Banco de Dados II (Avançado)",
        "description": "Tópicos avançados de SQL, NoSQL e Otimização.",
        "importancia": "Quando o volume de dados cresce, consultas simples ficam lentas. Esta matéria ensina a otimizar (tuning) o banco para performance e a explorar outros modelos (NoSQL) para dados não estruturados.",
        "conceitos": ["Otimização de Consultas (Indexes, Explain)", "Transações (ACID)", "Stored Procedures e Triggers", "Bancos NoSQL (Documento - MongoDB, Chave-Valor - Redis)"],
        "pratico": {
            "problema": "Problema: Uma busca (SELECT) em uma tabela com 50 milhões de usuários está demorando 1 minuto.",
            "solucao": "Solução: Criando um 'Índice' (INDEX) na coluna de busca (ex: 'email'). O índice funciona como o índice de um livro: em vez de procurar página por página (Full Scan), o banco vai direto ao local do dado.",
            "codigo": "// Comando SQL para criar um índice\n\nCREATE INDEX idx_email_usuario\nON Usuarios (email);"
        },
        "svg": svgs.database,
        "carreiras": ["Administrador de BD (DBA)", "Engenheiro de Dados", "Arquiteto de Software"],
        "recursos": [
            { "text": "O que é NoSQL? - MongoDB", "url": "https://www.mongodb.com/nosql-explained" }
        ]
    },
    "16": {
        "title": "Engenharia de Software II",
        "description": "Qualidade, Testes e Manutenção de Software.",
        "importancia": "Ensina que software não é só 'escrever', mas também 'garantir que funcione'. Aprende-se a criar testes automatizados para evitar que uma nova função quebre o sistema antigo (regressão).",
        "conceitos": ["Tipos de Teste (Unitário, Integração, Funcional)", "TDD (Test-Driven Development)", "Qualidade de Software (ISO 9126)", "Padrões de Projeto (Design Patterns - Singleton, Factory)"],
        "pratico": {
            "problema": "Problema: Você corrige um bug no login e, sem querer, quebra o sistema de recuperação de senha.",
            "solucao": "Solução: Testes Automatizados. Antes de enviar a correção, você roda a suíte de testes. O 'teste_recuperar_senha' falha, avisando da regressão. Você corrige antes do cliente ver.",
            "codigo": "// Exemplo de Teste Unitário (conceitual)\n\n// Teste da função somar()\n\nfuncao test_soma_positivos():\n    Assert.Equals(5, somar(2, 3))\n\nfuncao test_soma_negativos():\n    Assert.Equals(-5, somar(-2, -3))"
        },
        "svg": svgs.bug,
        "carreiras": ["Engenheiro de Software", "Analista de QA (Quality Assurance)", "Tech Lead"],
        "recursos": [
            { "text": "Padrões de Projeto - Refactoring Guru", "url": "https://refactoring.guru/pt-br/design-patterns" }
        ]
    },
    "17": {
        "title": "Redes de Computadores II",
        "description": "Gerenciamento e Segurança de Redes.",
        "importancia": "Foca em como configurar e proteger redes corporativas. Essencial para entender como funcionam VPNs, Firewalls e como garantir a disponibilidade de um sistema.",
        "conceitos": ["Gerenciamento de Redes (SNMP)", "Serviços de Rede (DHCP, NAT)", "Segurança de Rede (Firewall, VPN, ACLs)", "Redes Sem Fio (Wi-Fi) e Segurança (WPA2/3)"],
        "pratico": {
            "problema": "Problema: Como impedir que acessem o Banco de Dados diretamente pela internet?",
            "solucao": "Solução: Configurando um 'Firewall' (Muro de Fogo). Você cria uma regra que só permite que o 'Servidor da Aplicação' acesse a porta do banco (ex: 5432). Qualquer outra tentativa de conexão externa é bloqueada.",
            "codigo": "// Regra de Firewall (Conceitual)\n\n// PERMITIR Origem: [IP_APLICACAO] -> Destino: [IP_BANCO] Porta: 5432\n// NEGAR   Origem: [QUALQUER]     -> Destino: [IP_BANCO] Porta: 5432"
        },
        "svg": svgs.shield,
        "carreiras": ["Analista de Infraestrutura", "Analista de Segurança", "DevOps"],
        "recursos": []
    },
    "18": {
        "title": "Programação Web II (Backend)",
        "description": "Construindo o 'cérebro' do sistema (APIs).",
        "importancia": "O Frontend (site) precisa buscar dados em algum lugar. O Backend é o sistema que roda no servidor, acessa o banco de dados e entrega os dados para o frontend (geralmente via uma API).",
        "conceitos": ["Arquitetura Cliente-Servidor", "Criação de APIs REST/RESTful", "Protocolo HTTP (Verbos GET, POST, PUT, DELETE)", "Conexão com Banco de Dados", "Autenticação (Sessões, JWT - JSON Web Tokens)"],
        "pratico": {
            "problema": "Problema: Como o app do iFood (cliente) pega a lista de restaurantes (servidor)?",
            "solucao": "Solução: O app faz uma requisição 'GET' para uma API do backend (ex: api.ifood.com/restaurantes). O backend (servidor) recebe, busca os dados no banco de dados e os retorna no formato JSON.",
            "codigo": "// Exemplo de API (Node.js/Express)\n\napp.get('/api/restaurantes', (req, res) => {\n    // busca 'lista' no banco de dados...\n    const lista = db.restaurantes.buscarTodos();\n    \n    // envia a lista como JSON\n    res.json(lista);\n});"
        },
        "svg": svgs.code,
        "carreiras": ["Desenvolvedor Backend", "Desenvolvedor Fullstack", "Arquiteto de Software"],
        "recursos": [
            { "text": "O que é uma API REST? - AWS", "url": "https://aws.amazon.com/pt/what-is/restful-api/" }
        ]
    },
    "104": {
        "title": "Sociologia e Impacto da TI",
        "description": "Analisando o impacto da tecnologia na sociedade.",
        "importancia": "Discute as implicações éticas e sociais do seu trabalho. Vício em redes sociais, privacidade de dados (LGPD), desigualdade digital e o futuro do trabalho com IAs.",
        "conceitos": ["Ética na Computação", "Lei Geral de Proteção de Dados (LGPD)", "Inclusão e Acessibilidade Digital", "Impacto da IA no Trabalho"],
        "pratico": {
            "problema": "Problema: O sistema pode armazenar o CPF do cliente de qualquer jeito?",
            "solucao": "Solução: Não. A LGPD (Lei Geral de Proteção de Dados) exige que dados sensíveis sejam armazenados com segurança (criptografia) e que a empresa tenha uma justificativa clara para coletar e usar esse dado, além de garantir ao usuário o direito de apagá-lo.",
            "codigo": "// Conceito - LGPD\n\n// NÃO FAÇA (texto plano)\nSalvarUsuario(\"nome\", \"email\", \"123.456.789-00\");\n\n// FAÇA (com criptografia)\nhash_cpf = criptografar(\"123.456.789-00\");\nSalvarUsuario(\"nome\", \"email\", hash_cpf);"
        },
        "svg": svgs.atom,
        "carreiras": ["Todas", "Gestor de TI", "Encarregado de Dados (DPO)"],
        "recursos": [
            { "text": "Guia da LGPD - Governo Federal", "url": "https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd" }
        ]
    },

    // --- SEMESTRE 6 ---
    "19": {
        "title": "Segurança da Informação",
        "description": "Protegendo sistemas contra ataques (Hackers).",
        "importancia": "Um vazamento de dados pode destruir a reputação de uma empresa. Esta matéria ensina a pensar como um invasor para encontrar e corrigir falhas antes que elas sejam exploradas.",
        "conceitos": ["Pilares da Segurança (CID - Confidencialidade, Integridade, Disponibilidade)", "Tipos de Ataque (SQL Injection, XSS, DDoS)", "Criptografia (Simétrica e Assimétrica)", "Políticas de Segurança"],
        "pratico": {
            "problema": "Problema: Um hacker digita ' OR 1=1 -- no campo de senha e entra no sistema.",
            "solucao": "Solução: Isso é um 'SQL Injection'. Ocorre quando o sistema junta o texto do usuário direto no comando SQL. A correção é usar 'Prepared Statements', que separam o comando dos dados, impedindo o ataque.",
            "codigo": "// VULNERÁVEL (NÃO FAÇA!)\nquery = \"SELECT * FROM users WHERE user='\" + user + \"' AND pass='\" + pass + \"';\";\n\n// SEGURO (Prepared Statement)\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?;\";\ndb.execute(query, user, pass);"
        },
        "svg": svgs.shield,
        "carreiras": ["Analista de Segurança (Cybersecurity)", "Pentester (Ethical Hacker)", "DevSecOps"],
        "recursos": [
            { "text": "OWASP Top 10 (Principais Riscos Web)", "url": "https://owasp.org/www-project-top-ten/" }
        ]
    },
    "20": {
        "title": "Inteligência Artificial",
        "description": "Ensinando máquinas a 'pensar' e aprender.",
        "importancia": "É a fronteira da tecnologia. BSI foca nas aplicações práticas de IA: Machine Learning para prever tendências, Redes Neurais para reconhecer imagens, ou Processamento de Linguagem Natural (PLN) para criar chatbots.",
        "conceitos": ["O que é IA vs. Machine Learning vs. Deep Learning", "Tipos de Aprendizado (Supervisionado, Não Supervisionado)", "Redes Neurais Artificiais (RNA)", "Processamento de Linguagem Natural (PLN)"],
        "pratico": {
            "problema": "Problema: Como um filtro de Spam sabe que um email é 'Spam'?",
            "solucao": "Solução: Aprendizado Supervisionado. Você 'treina' um modelo de Machine Learning com milhares de emails, rotulando ('spam' ou 'não-spam'). O modelo aprende padrões (ex: palavras 'promoção', 'grátis') e usa isso para classificar emails novos.",
            "codigo": "// Conceito (Python com Scikit-Learn)\n\nfrom sklearn.naive_bayes import MultinomialNB\n\n// 1. Treinar modelo\nmodelo = MultinomialNB()\nmodelo.fit(emails_treino, labels_treino)\n\n// 2. Usar modelo\nprevisao = modelo.predict(\"email novo aqui\")\n// Saída: [\"spam\"]"
        },
        "svg": svgs.atom,
        "carreiras": ["Cientista de Dados", "Engenheiro de Machine Learning", "Analista de BI"],
        "recursos": [
            { "text": "O que é IA? - IBM", "url": "https://www.ibm.com/br-pt/cloud/learn/what-is-artificial-intelligence" }
        ]
    },
    "21": {
        "title": "Computação em Nuvem (Cloud)",
        "description": "Usando a infraestrutura da Amazon (AWS), Google (GCP) e Microsoft (Azure).",
        "importancia": "Hoje, quase nenhuma empresa compra servidores físicos; elas 'alugam' da nuvem. BSI ensina a usar esses serviços para hospedar aplicações com alta disponibilidade e escalabilidade.",
        "conceitos": ["Modelos (IaaS, PaaS, SaaS)", "Serviços (EC2, S3, Lambda - AWS)", "Contêineres (Docker, Kubernetes)", "Escalabilidade (Vertical vs. Horizontal)"],
        "pratico": {
            "problema": "Problema: Meu site de e-commerce cai toda Black Friday por excesso de acessos.",
            "solucao": "Solução: Usar a Nuvem com Auto-Scaling. Você configura o sistema (ex: AWS) para, automaticamente, 'ligar' mais servidores quando os acessos aumentarem e 'desligá-los' quando diminuírem. Você só paga pelo que usa.",
            "codigo": "// Conceito de Escalabilidade Horizontal\n\n// Tráfego Normal:\n[ Servidor 1 ] <-- Usuários\n\n// Black Friday (Auto-Scaling):\n[ Servidor 1 ] <--|\n[ Servidor 2 ] <--|-- Usuários\n[ Servidor 3 ] <--|"
        },
        "svg": svgs.cloud,
        "carreiras": ["DevOps", "Arquiteto de Soluções Cloud", "Engenheiro de Infraestrutura"],
        "recursos": [
            { "text": "O que é AWS? - Amazon", "url": "https://aws.amazon.com/pt/what-is-aws/" }
        ]
    },
    "22": {
        "title": "Gestão de Projetos de TI",
        "description": "Planejando, executando e entregando projetos no prazo e custo.",
        "importancia": "Conecta a área técnica com a gestão. Ensina a usar metodologias (Scrum, PMBOK) para gerenciar o 'triângulo de ferro': Escopo, Custo e Tempo.",
        "conceitos": ["Metodologias (Ágil vs. Preditivo/PMBOK)", "Framework Scrum (Sprints, Dailys, Retrospectivas)", "Gerenciamento de Escopo, Custo e Risco", "Ferramentas (Jira, Trello, MS Project)"],
        "pratico": {
            "problema": "Problema: O projeto de software está há 1 ano em desenvolvimento, custou o dobro e ainda não funciona.",
            "solucao": "Solução: Falha na Gestão de Projetos (provavelmente Escopo). Um Gerente de Projetos (GP) teria usado Scrum para quebrar o projeto em entregas menores (MVPs), validando o escopo e controlando os custos a cada Sprint (ciclo).",
            "codigo": "// Conceito de Quadro Kanban (Trello/Jira)\n\n// A Fazer (Backlog)   | Em Andamento     | Feito\n// ---------------------------------------------------\n// [ ] Tela de Login    | [ ] API de Pagto | [x] Banco de Dados\n// [ ] Tela de Perfil   |                  |"
        },
        "svg": svgs.gear,
        "carreiras": ["Gerente de Projetos (GP/PM)", "Scrum Master", "Product Owner (PO)", "Tech Lead"],
        "recursos": [
            { "text": "Guia Scrum (Oficial)", "url": "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Portuguese-Brazilian.pdf" }
        ]
    },
    "105": {
        "title": "Empreendedorismo e Inovação",
        "description": "Transformando uma ideia de TI em um negócio (Startup).",
        "importancia": "BSI é um curso perfeito para fundadores de startups. Esta matéria ensina o 'lado do negócio': como validar uma ideia, encontrar clientes e criar um modelo de negócio sustentável.",
        "conceitos": ["Modelo de Negócio (Canvas)", "Startup (Lean Startup, MVP)", "Validação de Ideia (Product-Market Fit)", "Captação de Investimento (Pitch, Anjo, VC)"],
        "pratico": {
            "problema": "Problema: Tive uma ideia genial de app! Vou gastar R$ 200.000 para construir e depois vender.",
            "solucao": "Solução (Lean Startup): Não! Crie um 'MVP' (Produto Mínimo Viável), que é a versão mais simples possível da sua ideia (ex: um formulário no Google Forms). Mostre para 10 clientes. Se eles usarem, você valida a ideia antes de gastar R$ 200.000.",
            "codigo": "// Conceito de MVP (Produto Mínimo Viável)\n\n// Ideia: Um 'Uber' de Passeador de Cães.\n\n// MVP: Um grupo de WhatsApp onde você conecta \n// manualmente donos de cães e passeadores.\n\n// Se o grupo bombar, você provou que \n// existe demanda (Product-Market Fit)."
        },
        "svg": svgs.rocket,
        "carreiras": ["Empreendedor (Founder)", "Gerente de Produto (PM)", "Consultor"],
        "recursos": [
            { "text": "O que é Lean Startup (Sebrae)", "url": "https://www.sebrae.com.br/sites/PortalSebrae/artigos/o-que-e-uma-startup,d3e1c074a3b04410VgnVCM1000003b74010aRCRD" }
        ]
    },

    // --- SEMESTRE 7 ---
    "23": {
        "title": "Desenvolvimento Mobile",
        "description": "Criando aplicativos para Android e iOS.",
        "importancia": "O mundo é mobile. Esta disciplina (muitas vezes eletiva) foca em como construir apps que rodam no celular, seja de forma nativa ou híbrida.",
        "conceitos": ["Nativo (Kotlin/Java para Android, Swift para iOS)", "Híbrido (React Native, Flutter)", "Ciclo de Vida de um App", "Consumo de APIs e Armazenamento Local"],
        "pratico": {
            "problema": "Problema: Quero criar um app para Android e iOS, mas só sei JavaScript.",
            "solucao": "Solução: Usar um framework Híbrido como o 'React Native'. Você escreve o código (quase todo) em JavaScript/React, e ele 'compila' para um app nativo em ambas as plataformas, economizando muito tempo.",
            "codigo": "// Exemplo de React Native (Conceitual)\n\nimport { View, Text, Button } from 'react-native';\n\nfunction MeuApp() {\n  // O <View> vira uma View nativa no Android\n  // e uma UIView no iOS.\n  return (\n    <View>\n      <Text>Olá, Mundo Mobile!</Text>\n      <Button title=\"Clique\" />\n    </View>\n  );\n}"
        },
        "svg": svgs.code,
        "carreiras": ["Desenvolvedor Mobile (Android/iOS)", "Desenvolvedor React Native/Flutter"],
        "recursos": [
            { "text": "Flutter - Documentação Oficial", "url": "https://flutter.dev/" },
            { "text": "React Native - Documentação Oficial", "url": "https://reactnative.dev/" }
        ]
    },
    "24": {
        "title": "Business Intelligence (BI) e Big Data",
        "description": "Transformando dados brutos em decisões estratégicas.",
        "importancia": "Empresas coletam terabytes de dados (Big Data). O BI usa ferramentas para analisar esses dados e criar 'Dashboards' (painéis visuais) que ajudam gestores a tomar decisões.",
        "conceitos": ["O que é Big Data (Volume, Velocidade, Variedade)", "ETL (Extração, Transformação, Carga)", "Data Warehouse e Data Marts", "Visualização de Dados (Power BI, Tableau)"],
        "pratico": {
            "problema": "Problema: O diretor pergunta: 'Quais são nossos 5 produtos mais vendidos no último trimestre na região Nordeste?'",
            "solucao": "Solução: Um Analista de BI usa ferramentas (Power BI) que se conectam ao 'Data Warehouse' da empresa. Ele arrasta e solta elementos visuais para criar um gráfico de barras que filtra as vendas por data e região, respondendo à pergunta em minutos.",
            "codigo": "// Conceito de ETL\n\n// 1. Extração (Puxa dados de 3 sistemas)\ndados_vendas = API.getVendas()\ndados_estoque = DB.getEstoque()\ndados_clientes = CRM.getClientes()\n\n// 2. Transformação (Limpa e junta os dados)\ndados_consolidados = { /*...*/ }\n\n// 3. Carga (Salva no Data Warehouse)\nDW.salvar(dados_consolidados)"
        },
        "svg": svgs.database,
        "carreiras": ["Analista de BI", "Engenheiro de Dados", "Cientista de Dados"],
        "recursos": [
            { "text": "O que é Power BI? - Microsoft", "url": "https://powerbi.microsoft.com/pt-br/what-is-power-bi/" }
        ]
    },
    "25": {
        "title": "Direito e Legislação de TI",
        "description": "Entendendo as leis que afetam a tecnologia.",
        "importancia": "Cobre os aspectos legais do seu trabalho: privacidade (LGPD), propriedade intelectual (software é patenteável?), e o que define um contrato de software.",
        "conceitos": ["Lei Geral de Proteção de Dados (LGPD)", "Marco Civil da Internet", "Propriedade Intelectual (Direito Autoral vs. Patente)", "Contratos de Software (Licenciamento, SLA)"],
        "pratico": {
            "problema": "Problema: Você criou um software para a Empresa X. Você pode vender esse mesmo software para a Empresa Y?",
            "solucao": "Solução: Depende do 'Contrato'. Se a 'Propriedade Intelectual' do código-fonte foi transferida para a Empresa X, você não pode. Se foi apenas uma 'Licença de Uso', você (dono do código) pode licenciar para quantos clientes quiser.",
            "codigo": "// Conceito de Contrato (Propriedade Intelectual)\n\n// Cláusula 1: PROPRIEDADE (Comum em CLT)\n// O CONTRATADO cede integralmente os direitos \n// patrimoniais e autorais do software à CONTRATANTE.\n\n// Cláusula 2: LICENCIAMENTO (Comum em SaaS)\n// O CONTRATANTE recebe uma licença de uso, \n// não exclusiva e intransferível, do software."
        },
        "svg": svgs.terminal,
        "carreiras": ["Todas", "Gestor de TI", "Consultor Jurídico de TI", "DPO"],
        "recursos": []
    },
    "26": {
        "title": "Trabalho de Conclusão I (TCC)",
        "description": "O projeto da sua monografia ou sistema.",
        "importancia": "É a fase de planejamento do seu projeto final. Você escolhe o tema, encontra um professor orientador e escreve o 'Projeto de Pesquisa', que define o que você fará, por que (justificativa) e como (metodologia).",
        "conceitos": ["Escolha do Tema e Problema de Pesquisa", "Revisão Bibliográfica (Estado da Arte)", "Definição de Objetivos (Geral e Específicos)", "Metodologia e Cronograma"],
        "pratico": {
            "problema": "Problema: 'Quero fazer um TCC sobre IA.' (Muito vago!)",
            "solucao": "Solução (Delimitação do Tema): 'Meu TCC será um *sistema web* (produto) que usa *Machine Learning* (método) para *prever a evasão de alunos* (problema) no *Curso de BSI do IESGO* (contexto).' (Específico e viável).",
            "codigo": "// Estrutura de um Projeto de Pesquisa (TCC I)\n\n1. Introdução (Problema + Justificativa)\n2. Objetivos (Geral e Específicos)\n3. Referencial Teórico (Revisão Bibliográfica)\n4. Metodologia (Como será feito)\n5. Cronograma (Quando será feito)"
        },
        "svg": svgs.gear,
        "carreiras": ["Formando"],
        "recursos": []
    },
    "106": {
        "title": "Libras (Opcional)",
        "description": "Língua Brasileira de Sinais.",
        "importancia": "É uma disciplina focada em inclusão. Ensina o básico da comunicação com a comunidade surda, um aspecto importante da acessibilidade digital.",
        "conceitos": ["Alfabeto Manual", "Sinais Básicos (Saudações)", "Cultura Surda", "Acessibilidade em Sistemas"],
        "pratico": {
            "problema": "Problema: Como tornar um sistema de helpdesk acessível para um usuário surdo?",
            "solucao": "Solução: Garantir que o sistema não dependa *apenas* de áudio. Oferecer atendimento via chat (texto) é a solução mais comum. Acessibilidade também é incluir intérpretes de Libras (como a 'Maya') em vídeos.",
            "codigo": "// Conceito de Acessibilidade (HTML)\n\n// NÃO FAÇA (Vídeo sem legenda/libras)\n<video src=\"tutorial.mp4\"></video>\n\n// FAÇA (com trilha de legenda/descrição)\n<video src=\"tutorial.mp4\">\n  <track kind=\"captions\" src=\"legenda_ptbr.vtt\" srclang=\"pt-br\" label=\"Português\">\n</video>"
        },
        "svg": svgs.atom,
        "carreiras": ["Todas (Cidadania)"],
        "recursos": []
    },

    // --- SEMESTRE 8 ---
    "27": {
        "title": "Trabalho de Conclusão II (TCC)",
        "description": "Desenvolvimento e defesa do projeto final.",
        "importancia": "A fase de 'mão na massa'. Você executa o que planejou no TCC I (desenvolve o software ou escreve a monografia) e, ao final, apresenta e defende seu trabalho perante uma banca de professores.",
        "conceitos": ["Desenvolvimento do Protótipo/Software", "Coleta e Análise de Resultados", "Escrita da Monografia (Resultados e Conclusão)", "Defesa Oral (Apresentação para a Banca)"],
        "pratico": {
            "problema": "Problema: 'A Banca vai destruir meu trabalho!' (Medo da defesa).",
            "solucao": "Solução: A Banca quer ajudar. Foque em 3 pontos: 1) Qual problema você resolveu? 2) Como você resolveu (método)? 3) Você atingiu os objetivos que propôs no TCC I? Treine sua apresentação, domine seu conteúdo e seja honesto sobre as limitações.",
            "codigo": "// Estrutura da Apresentação (15-20 min)\n\n1. Slide 1: Título, Autor, Orientador\n2. Slide 2: O Problema (Justificativa)\n3. Slide 3: Objetivos\n4. Slide 4: Metodologia (Como foi feito)\n5. Slide 5-7: O Software (DEMO!) / Resultados\n6. Slide 8: Conclusão (Objetivos atingidos?)\n7. Slide 9: Obrigado + Contato"
        },
        "svg": svgs.star,
        "carreiras": ["Formando"],
        "recursos": []
    },
    "28": {
        "title": "Estágio Supervisionado",
        "description": "A experiência prática no mercado de trabalho.",
        "importancia": "Onde você aplica todo o conhecimento da faculdade em um ambiente real. É a principal porta de entrada para o seu primeiro emprego (efetivação).",
        "conceitos": ["Busca por Vagas (LinkedIn, CIEE)", "Processo Seletivo (Entrevista Técnica e Comportamental)", "Relatório de Estágio (Documentação)", "Networking (Conexões na empresa)"],
        "pratico": {
            "problema": "Problema: 'Não tenho experiência, como consigo um estágio?'",
            "solucao": "Solução: Seu 'Portfólio' é sua experiência. Tenha projetos (da faculdade ou pessoais) no seu GitHub. Mostre que você é proativo, sabe a base (Lógica, POO, SQL) e tem vontade de aprender. O estágio é para aprender.",
            "codigo": "// O que recrutadores buscam em estágio:\n\n1. Conhecimento Sólido em Fundamentos (Lógica, POO, SQL).\n2. Proatividade (Projetos no GitHub).\n3. Soft Skills (Comunicação, Vontade de aprender).\n4. Conhecimento Básico na vaga (ex: Básico de React para vaga de React)."
        },
        "svg": svgs.rocket,
        "carreiras": ["Estagiário"],
        "recursos": []
    },
    "29": {
        "title": "Tópicos Avançados em SI",
        "description": "Uma visão das tendências e do futuro da área.",
        "importancia": "Prepara o aluno para o que está surgindo no mercado, como IoT, Computação Quântica ou Blockchain, garantindo que a formação não esteja defasada.",
        "conceitos": ["Internet das Coisas (IoT)", "Blockchain e Criptomoedas", "Computação Quântica (Conceitos)", "Realidade Virtual (VR) e Aumentada (AR)"],
        "pratico": {
            "problema": "Problema: O que é 'IoT' (Internet das Coisas) na prática?",
            "solucao": "Solução: É a conexão de objetos físicos à internet. Pense na sua 'Smart Lâmpada' (ex: Alexa). Ela é um dispositivo (hardware) conectado à sua rede (redes) que recebe comandos de um servidor na nuvem (backend) e é controlado por um app (mobile).",
            "codigo": "// Conceito de IoT (Ex: Arduino/Raspberry Pi)\n\n// Sensor (Hardware) lê a temperatura\ntemperatura = sensor.read()\n\n// Envia o dado para a Nuvem (Backend)\nAPI.post(\"/api/clima/sala1\", { temp: temperatura });"
        },
        "svg": svgs.atom,
        "carreiras": ["Pesquisador", "Especialista em Inovação"],
        "recursos": []
    },
    "30": {
        "title": "Gestão de Infraestrutura de TI",
        "description": "Gerenciando servidores, redes e serviços (ITIL).",
        "importancia": "Foca em garantir que a 'base' da tecnologia da empresa (servidores, redes, data centers) funcione sem parar, com segurança e eficiência.",
        "conceitos": ["ITIL (Biblioteca de boas práticas)", "Gerenciamento de Serviços (Catálogo, SLA)", "Data Center (Físico vs. Cloud)", "Alta Disponibilidade e Contingência"],
        "pratico": {
            "problema": "Problema: O servidor principal da empresa queimou. O site está fora do ar. E agora?",
            "solucao": "Solução (Gestão de Contingência): Um bom gestor de infra já teria um plano. 1) 'Failover': Um servidor secundário (backup) assume automaticamente. 2) 'Backup': Os dados são restaurados do backup da noite anterior. 3) 'SLA': O contrato (SLA) diz que o sistema volta em 15 minutos.",
            "codigo": "// Conceito de Alta Disponibilidade (Load Balancer)\n\n// Usuário -> [ Load Balancer ] -> Servidor 1 (Ativo)\n//                            -> Servidor 2 (Standby)\n\n// SE Servidor 1 falhar:\n// Usuário -> [ Load Balancer ] -> Servidor 2 (Assume)"
        },
        "svg": svgs.network,
        "carreiras": ["Analista de Infraestrutura", "Gerente de TI", "DevOps"],
        "recursos": [
            { "text": "O que é ITIL? - Alura", "url": "https://www.alura.com.br/artigos/itil-o-que-e-conceitos-certificacao" }
        ]
    }
};

module.exports = topicData;