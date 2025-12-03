// script.js - VERSÃO FINAL (CORREÇÃO DE ERRO UNDEFINED + REMOÇÃO DE USERNAME)

// --- 1. AUTO-CORREÇÃO DE SESSÃO (Executa antes de tudo) ---
// Isso detecta o erro da sua imagem e limpa a memória automaticamente
try {
    const storedUser = sessionStorage.getItem('user');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // Se diz que está logado, mas o usuário não existe ou não tem ID
    if (isLoggedIn === 'true') {
        if (!storedUser || storedUser === "undefined") {
            console.warn("Sessão corrompida encontrada. Limpando.");
            sessionStorage.clear();
        } else {
            const u = JSON.parse(storedUser);
            if (!u || !u.id) {
                console.warn("Usuário sem ID encontrado. Limpando.");
                sessionStorage.clear();
            }
        }
    }
} catch (e) {
    console.error("Erro na verificação de sessão. Resetando.", e);
    sessionStorage.clear();
}

// --- 2. DADOS E FUNÇÕES GLOBAIS ---

function showError(input, errorElement, message) {
    if (input) input.classList.add('invalid');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
}

function clearError(input, errorElement) {
    if (input) input.classList.remove('invalid');
    if (errorElement) {
        errorElement.classList.remove('active');
        errorElement.textContent = '';
    }
}

// Avatares SVG
const presetAvatars = {
    solaris: `<svg viewBox="0 0 100 100" fill="none" stroke="#F59E0B" stroke-width="5"><circle cx="50" cy="50" r="45"/><path d="M50 15V35M50 65V85M15 50H35M65 50H85M25 25L40 40M60 60L75 75M25 75L40 60M60 40L75 25" stroke-width="4"/></svg>`,
    circuit: `<svg viewBox="0 0 100 100" fill="none" stroke="#C4B5FD" stroke-width="4"><rect x="5" y="5" width="90" height="90" rx="10"/><path d="M30 30H70V70H30Z M30 50H50 M50 30V50 M50 70V50 M70 50H50" stroke-width="3"/><circle cx="50" cy="50" r="5" fill="#FDE047" stroke="none"/></svg>`,
    code: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6"><path d="M30 30L15 50L30 70M70 30L85 50L70 70M55 25L45 75" stroke-width="5"/></svg>`,
    atom: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><circle cx="50" cy="50" r="10" fill="currentColor"/><ellipse cx="50" cy="50" rx="45" ry="15"/><ellipse cx="50" cy="50" rx="15" ry="45" transform="rotate(45 50 50)"/><ellipse cx="50" cy="50" rx="15" ry="45" transform="rotate(-45 50 50)"/></svg>`,
    database: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><ellipse cx="50" cy="25" rx="35" ry="10"/><path d="M15 25V75C15 80.5 30.4 85 50 85C69.6 85 85 80.5 85 75V25"/><ellipse cx="50" cy="50" rx="35" ry="10"/></svg>`,
    network: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><circle cx="50" cy="50" r="12"/><circle cx="20" cy="25" r="8"/><circle cx="80" cy="25" r="8"/><circle cx="35" cy="80" r="8"/><circle cx="65" cy="80" r="8"/><path d="M45 40L25 29 M75 29L55 40 M40 75L47 59 M53 59L60 75" stroke-width="3"/></svg>`,
    bug: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><rect x="30" y="25" width="40" height="50" rx="20"/><path d="M50 25V10 M20 20L35 30 M80 20L65 30 M20 50L30 50 M80 50L70 50 M20 80L35 70 M80 80L65 70"/></svg>`,
    terminal: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6"><path d="M20 30L40 50L20 70"/><path d="M45 70H80"/></svg>`,
    star: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M50 5L61.2 39.1H97.5L68.1 60.4L79.4 94.5L50 73.2L20.6 94.5L31.8 60.4L2.4 39.1H38.8L50 5Z"/></svg>`,
    gear: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><circle cx="50" cy="50" r="15"/><path d="M50 15V5 M50 95V85 M85 50H95 M5 50H15 M75.2 24.7L82.3 17.7 M17.7 82.3L24.7 75.2 M75.2 75.2L82.3 82.3 M17.7 17.7L24.7 24.7" stroke-width="12"/></svg>`,
    cloud: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5"><path d="M30 70C10 70 10 50 30 50C30 30 50 30 50 40C60 20 80 25 80 50C95 50 95 70 80 70L30 70Z"/></svg>`,
    shield: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5"><path d="M50 10L90 30V60C90 80 70 90 50 90C30 90 10 80 10 60V30L50 10Z"/></svg>`,
    rocket: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4"><path d="M70 15L50 10L30 15V50H70V15Z"/><path d="M30 50C20 60 20 80 30 80L40 70H60L70 80C80 80 80 60 70 50H30Z"/><circle cx="50" cy="35" r="7"/><path d="M40 80L35 90 M50 80L50 95 M60 80L65 90" stroke-width="5"/></svg>`
};

function placeholderSvgFragment() {
    const div = document.createElement('div');
    div.innerHTML = `<svg id="header-avatar-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
    return div.firstChild;
}

function updatePresetAvatarColors() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    document.querySelectorAll('.profile-avatar > svg, .avatar-option svg, .header-avatar > svg').forEach(svg => {
        if(svg.id.includes('placeholder')) { svg.style.stroke = isDark ? '#aaa' : '#555'; return; }
        
        const key = svg.closest('[data-key]')?.dataset.key; 
        svg.style.stroke = 'currentColor';
        svg.style.fill = 'none';

        // Cores específicas para Cyberpunk
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'cyber') {
             svg.style.stroke = '#00f3ff'; 
             if(key === 'solaris') svg.style.stroke = '#ff00ff';
             return;
        }

        // Cores padrões
        if(key === 'solaris') svg.style.stroke = isDark ? '#A78BFA' : '#F59E0B';
        else if(key === 'circuit') {
            svg.style.stroke = isDark ? '#C4B5FD' : '#0891b2';
            const c = svg.querySelector('circle'); if(c) { c.style.fill = isDark ? '#FDE047' : '#F59E0B'; c.style.stroke='none'; }
        }
    });
}

function loadHeaderAvatar() {
    const disp = document.getElementById('header-avatar-display');
    if (!disp) return;
    disp.innerHTML = '';
    try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user && user.avatar) {
            if (presetAvatars[user.avatar]) disp.innerHTML = presetAvatars[user.avatar];
            else if (user.avatar.startsWith('uploads/')) disp.innerHTML = `<img src="http://localhost:3000/${user.avatar}?${Date.now()}">`;
            else disp.appendChild(placeholderSvgFragment());
        } else {
            disp.appendChild(placeholderSvgFragment());
        }
        updatePresetAvatarColors();
    } catch (e) { console.error(e); }
}

// --- 3. INICIALIZAÇÃO (DOM READY) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Pronto.");

    // TEMA (Claro, Escuro, Cyber)
    const themeBtn = document.getElementById('theme-toggle');
    const themes = ['light', 'dark', 'cyber'];
    if (themeBtn) {
        const set = (t) => {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.setAttribute('data-theme', t);
            if(t === 'dark') document.documentElement.classList.add('dark-mode');
            
            if(t==='light') themeBtn.textContent = 'Tema: Claro';
            else if(t==='dark') themeBtn.textContent = 'Tema: Alerta';
            else themeBtn.textContent = 'Tema: Cyber';
            
            updatePresetAvatarColors();
        };
        let saved = localStorage.getItem('theme');
        if(!themes.includes(saved)) saved = 'light';
        set(saved);

        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            let index = themes.indexOf(current);
            index = (index + 1) % themes.length;
            localStorage.setItem('theme', themes[index]);
            set(themes[index]);
        });
    }

    // ESTADO DE LOGIN
    const checkLogin = () => {
        const isLogged = sessionStorage.getItem('isLoggedIn') === 'true';
        let user = null;
        try { user = JSON.parse(sessionStorage.getItem('user')); } catch(e){}
        
        if(document.querySelector('.login-link-nav')) document.querySelector('.login-link-nav').style.display = isLogged ? 'none' : 'inline-block';
        if(document.querySelector('.profile-link-nav')) document.querySelector('.profile-link-nav').style.display = isLogged ? 'inline-block' : 'none';
        if(document.getElementById('logout-btn')) document.getElementById('logout-btn').style.display = isLogged ? 'inline-block' : 'none';
        if(document.getElementById('admin-link-nav')) document.getElementById('admin-link-nav').style.display = (isLogged && user?.role === 'admin') ? 'inline-block' : 'none';
        
        if (isLogged) loadHeaderAvatar();
    };
    checkLogin();

    // LOGOUT
    const logout = document.getElementById('logout-btn');
    if (logout) {
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('http://localhost:3000/api/logout', { method: 'POST' })
            .finally(() => {
                sessionStorage.clear();
                window.location.href = 'index.html';
            });
        });
    }

    // CADASTRO
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
                    alert("Cadastro OK!");
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('user', JSON.stringify(d.user));
                    window.location.href = 'perfil.html';
                } else { alert(d.message); }
            });
        });
    }

    // LOGIN
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
                    if(d.user.role === 'admin') window.location.href = 'admin.html';
                    else window.location.href = 'perfil.html';
                } else { alert(d.message); }
            });
        });
    }

    // --- LÓGICA DO PERFIL (SEM USERNAME) ---
    const profCont = document.querySelector('.profile-container');
    if (profCont) {
        console.log("Carregando perfil...");
        
        // Verificação Dupla: Se chegou aqui mas o Auto-Correção lá em cima limpou a sessão
        // ou se o ID não existe, redireciona.
        let user = null;
        try { user = JSON.parse(sessionStorage.getItem('user')); } catch(e){}
        
        if (!user || !user.id) {
            console.warn("Perfil acessado sem usuário válido. Redirecionando.");
            window.location.href = 'login.html';
            return;
        }

        // Preencher dados visuais
        profCont.querySelector('#profile-name').textContent = user.name;
        profCont.querySelector('#profile-email').textContent = user.email;
        profCont.querySelector('#member-since').textContent = `Membro desde: ${new Date(user.created_at).toLocaleDateString()}`;

        // Exibir Avatar
        const showAv = () => {
            const c = profCont.querySelector('.profile-avatar');
            c.innerHTML = '';
            if (presetAvatars[user.avatar]) c.innerHTML = presetAvatars[user.avatar];
            else if (user.avatar.startsWith('uploads/')) c.innerHTML = `<img src="http://localhost:3000/${user.avatar}?${Date.now()}">`;
            else c.appendChild(placeholderSvgFragment());
            
            const ov = document.createElement('div'); ov.className = 'avatar-interactive-overlay';
            ov.innerHTML = `<button id="btn-upload">Upload</button><button id="btn-preset">Escolher</button>`;
            c.appendChild(ov);
            updatePresetAvatarColors();
        };
        showAv();

        // --- Listeners do Perfil (Só adiciona se os elementos existirem) ---
        
        // Clique no Avatar (Upload ou Preset)
        profCont.querySelector('.profile-avatar').addEventListener('click', (e) => {
            if (e.target.closest('#btn-upload')) document.getElementById('avatar-upload').click();
            if (e.target.closest('#btn-preset')) {
                const modal = document.getElementById('avatar-choice-modal');
                const cont = modal.querySelector('.avatar-options-container');
                cont.innerHTML = '';
                Object.keys(presetAvatars).forEach(k => {
                    const d = document.createElement('div'); d.className = 'avatar-option'; d.innerHTML = presetAvatars[k]; d.dataset.key = k;
                    d.addEventListener('click', () => {
                        fetch('http://localhost:3000/api/perfil/avatar', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ avatarKey: k }) })
                            .then(r => r.json()).then(d => {
                                user.avatar = d.avatar; sessionStorage.setItem('user', JSON.stringify(user)); showAv(); loadHeaderAvatar(); modal.classList.remove('active');
                            });
                    });
                    cont.appendChild(d);
                });
                updatePresetAvatarColors();
                modal.classList.add('active');
            }
        });
        
        // Input de Upload
        const upInput = document.getElementById('avatar-upload');
        if(upInput) {
            upInput.addEventListener('change', (e) => {
                const file = e.target.files[0]; if(!file) return;
                const fd = new FormData(); fd.append('avatarFile', file);
                fetch('http://localhost:3000/api/perfil/upload-avatar', { method: 'POST', body: fd })
                .then(r => r.json()).then(d => {
                    user.avatar = d.avatar; sessionStorage.setItem('user', JSON.stringify(user)); showAv(); loadHeaderAvatar();
                })
                .catch(err => alert(err.message));
            });
        }

        // Fechar Modais
        document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        }));

        // Botão Editar Nome/Email
        const editBtn = document.getElementById('open-edit-modal-btn');
        const editModal = document.getElementById('edit-profile-modal');
        if (editBtn && editModal) {
            editBtn.addEventListener('click', () => {
                document.getElementById('edit-name').value = user.name;
                document.getElementById('edit-email').value = user.email;
                editModal.classList.add('active');
            });
            document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const n = document.getElementById('edit-name').value;
                const em = document.getElementById('edit-email').value;
                fetch('http://localhost:3000/api/perfil', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name:n, email:em}) })
                .then(r=>r.json()).then(d=>{ 
                    alert(d.message); user.name=n; user.email=em; sessionStorage.setItem('user', JSON.stringify(user));
                    profCont.querySelector('#profile-name').textContent = n;
                    profCont.querySelector('#profile-email').textContent = em;
                    editModal.classList.remove('active'); 
                });
            });
        }
        
        // Botão Alterar Senha
        const passBtn = document.getElementById('open-change-password-modal-btn');
        const passModal = document.getElementById('change-password-modal');
        if (passBtn && passModal) {
            passBtn.addEventListener('click', () => passModal.classList.add('active'));
            document.getElementById('change-password-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const cp = document.getElementById('current-password').value;
                const np = document.getElementById('new-password').value;
                fetch('http://localhost:3000/api/perfil/senha', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({currentPassword:cp, newPassword:np}) })
                .then(r=>r.json()).then(d=>{ alert(d.message); passModal.classList.remove('active'); });
            });
        }

        // Botão Deletar
        const delBtn = document.getElementById('delete-account-btn');
        if (delBtn) {
            delBtn.addEventListener('click', () => {
                if(confirm("Certeza?")) {
                    fetch(`http://localhost:3000/api/perfil/${user.id}`, { method: 'DELETE' })
                    .then(() => { sessionStorage.clear(); window.location.href = 'index.html'; });
                }
            });
        }

        // Progresso (Tratamento de erro robusto)
        if (user.id) {
            fetch(`http://localhost:3000/api/progresso/${user.id}`)
                .then(r => r.json())
                .then(d => {
                     const statNum = profCont.querySelector('.stat-number');
                     if(statNum) statNum.textContent = `${d.percentage}%`;
                })
                .catch(() => { 
                    const statNum = profCont.querySelector('.stat-number');
                    if(statNum) statNum.textContent = '0%';
                });
        }
    }

    // Menu Mobile
    const mob = document.getElementById('mobile-nav-toggle');
    if (mob) mob.addEventListener('click', () => document.querySelector('header nav').classList.toggle('active'));
});