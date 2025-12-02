const svgIcons = {
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    // ... (mantenha os outros ícones anteriores)
    lab: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2h4v4h-4zM9 22h6M6 22h12M2 17l3-8h14l3 8"/><path d="M12 6v12"/></svg>`
};

const topicContents = {
    // Exemplo básico, o resto será carregado via setup-trilha
    1: { title: "Introdução à Computação", description: "Conceitos básicos.", svgKey: "code" },
    // ... (Você pode adicionar o resto depois)
};

module.exports = { svgIcons, topicContents };
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
    circuit: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="90" rx="10" stroke="#C4B5FD" stroke-width="4"/><path d="M30 30 H70 V70 H30 Z M30 50 H50 M50 30 V50 M50 70 V50 M70 50 H50" stroke="#8F81A3" stroke-width="3"/><circle cx="50" cy="50" r="5" fill="#FDE047"/></svg>',



// --- CONTEÚDO DE CÓDIGO (IDs 101+) ---
    101: {
        title: "Algoritmos de Ordenação",
        description: "Especificações e implementações de Bubble Sort, Quick Sort e Merge Sort.",
        svgKey: "code",
        pratico: {
            problema: "Ordenar um array de números desordenados [5, 3, 8, 1].",
            solucao: "<p>O QuickSort é eficiente (O(n log n)) usando um pivô para dividir e conquistar.</p>",
            codigo: "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = arr.slice(1).filter(x => x < pivot);\n  const right = arr.slice(1).filter(x => x >= pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}"
        },
        importancia: "Fundamental para otimização de performance em sistemas.",
        conceitos: ["Complexidade O(n)", "Recursão", "Divisão e Conquista"],
        carreiras: ["Engenheiro de Software", "Cientista de Dados"]
    },
    104: {
        title: "Clean Code (Código Limpo)",
        description: "Guia de estilo e boas práticas para escrever código legível e manutenível.",
        svgKey: "lab",
        pratico: {
            problema: "Variáveis com nomes ruins.",
            solucao: "<p>Use nomes descritivos que revelam a intenção.</p>",
            codigo: "// Ruim\nconst d = 10; // dias\n\n// Bom\nconst daysSinceLastLogin = 10;"
        },
        importancia: "Código é lido muito mais vezes do que é escrito. Clareza é poder.",
        conceitos: ["Nomes Significativos", "Funções Pequenas", "DRY (Don't Repeat Yourself)"]
    }
    // Adicione os outros conforme necessário
};

module.exports = { svgIcons, topicContents };