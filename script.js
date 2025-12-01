// script.js (Principal - Comum a todas as páginas)
// SEM LÓGICA DE USERNAME

// --- Auto-Correção de Sessão ---
try {
    const storedUser = sessionStorage.getItem('user');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        if (!storedUser) sessionStorage.clear();
        else {
            const u = JSON.parse(storedUser);
            if (!u || !u.id) sessionStorage.clear();
        }
    }
} catch (e) { sessionStorage.clear(); }

// --- Helpers Globais ---
function showError(input, errorElement, message) {
    if (input) input.classList.add('invalid');
    if (errorElement) { errorElement.textContent = message; errorElement.classList.add('active'); }
}
function clearError(input, errorElement) {
    if (input) input.classList.remove('invalid');
    if (errorElement) { errorElement.classList.remove('active'); errorElement.textContent = ''; }
}

// --- Avatares Pré-definidos ---
const presetAvatars = {
    solaris: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" stroke="#F59E0B" stroke-width="5"/><path d="M50 15 V35 M50 65 V85 M15 50 H35 M65 50 H85 M25 25 L40 40 M60 60 L75 75 M25 75 L40 60 M60 40 L75 25" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/></svg>`,
    circuit: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="90" rx="10" stroke="#C4B5FD" stroke-width="4"/><path d="M30 30 H70 V70 H30 Z M30 50 H50 M50 30 V50 M50 70 V50 M70 50 H50" stroke="#8F81A3" stroke-width="3"/><circle cx="50" cy="50" r="5" fill="#FDE047"/></svg>`,
    code: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 30 L15 50 L30 70 M70 30 L85 50 L70 70" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M55 25 L45 75" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`,
    atom: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="10" fill="currentColor"/><ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" stroke-width="4"/><ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" stroke-width="4" transform="rotate(45 50 50)"/><ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" stroke-width="4" transform="rotate(-45 50 50)"/></svg>`,
    database: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="25" rx="35" ry="10" stroke="currentColor" stroke-width="4"/><path d="M15 25 V 75 C 15 80.5228 30.4315 85 50 85 C 69.5685 85 85 80.5228 85 75 V 25" stroke="currentColor" stroke-width="4"/><ellipse cx="50" cy="50" rx="35" ry="10" stroke="currentColor" stroke-width="4"/></svg>`,
    network: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="12" stroke="currentColor" stroke-width="4"/><circle cx="20" cy="25" r="8" stroke="currentColor" stroke-width="4"/><circle cx="80" cy="25" r="8" stroke="currentColor" stroke-width="4"/><circle cx="35" cy="80" r="8" stroke="currentColor" stroke-width="4"/><circle cx="65" cy="80" r="8" stroke="currentColor" stroke-width="4"/><path d="M45 40 L 25 29 M75 29 L 55 40 M 40 75 L 47 59 M 53 59 L 60 75" stroke="currentColor" stroke-width="3"/></svg>`,
    bug: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="25" width="40" height="50" rx="20" stroke="currentColor" stroke-width="4" fill="currentColor"/><path d="M50 25 V 10 M 20 20 L 35 30 M 80 20 L 65 30 M 20 50 L 30 50 M 80 50 L 70 50 M 20 80 L 35 70 M 80 80 L 65 70" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
    terminal: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 30 L 40 50 L 20 70" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M45 70 H 80" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`,
    star: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L 61.2257 39.1117 H 97.5528 L 68.1636 60.3883 L 79.3893 94.5 L 50 73.2233 L 20.6107 94.5 L 31.8364 60.3883 L 2.44717 39.1117 H 38.7743 L 50 5 Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" fill="currentColor"/></svg>`,
    gear: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="15" stroke="currentColor" stroke-width="4"/><path d="M50 15 V 5 M 50 95 V 85 M 85 50 H 95 M 5 50 H 15 M 75.25 24.75 L 82.32 17.68 M 17.68 82.32 L 24.75 75.25 M 75.25 75.25 L 82.32 82.32 M 17.68 17.68 L 24.75 24.75" stroke="currentColor" stroke-width="12" stroke-linecap="round"/><path d="M50 15 V 5 M 50 95 V 85 M 85 50 H 95 M 5 50 H 15 M 75.25 24.75 L 82.32 17.68 M 17.68 82.32 L 24.75 75.25 M 75.25 75.25 L 82.32 82.32 M 17.68 17.68 L 24.75 24.75" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>`,
    cloud: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 30 70 C 10 70 10 50 30 50 C 30 30 50 30 50 40 C 60 20 80 25 80 50 C 95 50 95 70 80 70 L 30 70 Z" stroke="currentColor" stroke-width="5" fill="currentColor" opacity="0.8"/></svg>`,
    shield: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 L 90 30 V 60 C 90 80 70 90 50 90 C 30 90 10 80 10 60 V 30 L 50 10 Z" stroke="currentColor" stroke-width="5" fill="currentColor" opacity="0.8"/></svg>`,
    rocket: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M70 15 L 50 10 L 30 15 V 50 H 70 V 15 Z" stroke="currentColor" stroke-width="4"/><path d="M30 50 C 20 60 20 80 30 80 L 40 70 H 60 L 70 80 C 80 80 80 60 70 50 H 30 Z" stroke="currentColor" stroke-width="4" fill="currentColor"/><circle cx="50" cy="35" r="7" stroke="currentColor" stroke-width="4"/><path d="M 40 80 L 35 90 M 50 80 L 50 95 M 60 80 L 65 90" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`
};

function placeholderSvgFragment() {
    const div = document.createElement('div');
    div.innerHTML = `<svg id="header-avatar-placeholder" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
    return div.firstChild;
}

function updatePresetAvatarColors() {
    try {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        document.querySelectorAll('.profile-avatar > svg, .avatar-option svg, .header-avatar > svg').forEach(svgElement => {
            if (!svgElement) return;
            if (svgElement.id === 'header-avatar-placeholder' || svgElement.id === 'profile-avatar-placeholder') {
                svgElement.style.stroke = isDarkMode ? 'var(--secondary-color-dark)' : 'var(--secondary-color-light)';
                return;
            }
            const key = svgElement.closest('[data-avatar-key]')?.dataset.avatarKey || 
                        (presetAvatars && Object.keys(presetAvatars).find(k => presetAvatars[k] && svgElement.outerHTML.includes(presetAvatars[k].substring(0, 50))));

            if (!key) return;
            svgElement.style.fill = 'none'; svgElement.style.stroke = 'currentColor';
            // (Lógica simplificada de cores para brevidade, mas funcional)
            if(['code', 'solaris'].includes(key)) { svgElement.style.stroke = isDarkMode ? '#A78BFA' : '#F59E0B'; }
            else { svgElement.style.stroke = isDarkMode ? 'var(--primary-color-dark)' : 'var(--primary-color-light)'; }
        });
    } catch (e) {}
}

function loadHeaderAvatar() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const disp = document.getElementById('header-avatar-display');
    if (!disp) return;
    disp.innerHTML = '';
    if (user && user.avatar) {
        if (presetAvatars[user.avatar]) disp.innerHTML = presetAvatars[user.avatar];
        else if (user.avatar.startsWith('uploads/')) disp.innerHTML = `<img src="http://localhost:3000/${user.avatar}?${Date.now()}">`;
        else disp.appendChild(placeholderSvgFragment());
    } else {
        disp.appendChild(placeholderSvgFragment());
    }
    updatePresetAvatarColors();
}

// --- DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado.");

    // Tema
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const apply = (t) => {
            document.documentElement.classList.toggle('dark-mode', t==='dark');
            themeBtn.textContent = t==='dark' ? 'Modo Claro' : 'Modo Escuro';
            updatePresetAvatarColors();
        };
        apply(localStorage.getItem('theme')||'light');
        themeBtn.addEventListener('click', () => {
            const nt = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', nt); apply(nt);
        });
    }

    // Login State
    const checkLogin = () => {
        const isLogged = sessionStorage.getItem('isLoggedIn') === 'true';
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        const els = {
            login: document.querySelector('.login-link-nav'),
            profile: document.querySelector('.profile-link-nav'),
            logout: document.getElementById('logout-btn'),
            admin: document.getElementById('admin-link-nav')
        };
        
        if(els.login) els.login.style.display = isLogged ? 'none' : 'inline-block';
        if(els.profile) els.profile.style.display = isLogged ? 'inline-block' : 'none';
        if(els.logout) els.logout.style.display = isLogged ? 'inline-block' : 'none';
        if(els.admin) els.admin.style.display = (isLogged && user?.role === 'admin') ? 'inline-block' : 'none';
        
        if (isLogged) loadHeaderAvatar();
    };
    checkLogin();

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('http://localhost:3000/api/logout', { method: 'POST' })
            .finally(() => { sessionStorage.clear(); window.location.href = 'index.html'; });
        });
    }

    // Cadastro
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            
            fetch('http://localhost:3000/api/cadastro', {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name, email, password: pass})
            })
            .then(r => r.json())
            .then(d => {
                if (d.user) {
                    alert('Cadastro OK!');
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('user', JSON.stringify(d.user));
                    window.location.href = 'perfil.html';
                } else { alert(d.message); }
            });
        });
    }

    // Login
    const logForm = document.querySelector('.auth-form:not(#registration-form)');
    if (logForm && window.location.pathname.includes('login.html')) {
        logForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            fetch('http://localhost:3000/api/login', {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email, password: pass})
            })
            .then(r => r.json())
            .then(d => {
                if (d.user) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('user', JSON.stringify(d.user));
                    window.location.href = 'perfil.html';
                } else { alert(d.message); }
            });
        });
    }

    // Menu
    const mob = document.getElementById('mobile-nav-toggle');
    if (mob) mob.addEventListener('click', () => document.body.classList.toggle('nav-open'));
});