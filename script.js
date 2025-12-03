// script.js - VERSÃO FINAL COMPLETA (SEM ABREVIAÇÕES)

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado. Iniciando script.js...");

    // =================================================================
    // 1. LIMPEZA E VALIDAÇÃO DE SESSÃO
    // =================================================================
    try {
        const storedUser = sessionStorage.getItem('user');
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
            // Se diz que está logado, mas não tem usuário ou o usuário não tem ID, limpa tudo.
            if (!storedUser || storedUser === "undefined" || storedUser === "null") {
                console.warn("Sessão corrompida (sem objeto user). Limpando...");
                sessionStorage.clear();
            } else {
                const u = JSON.parse(storedUser);
                if (!u || !u.id) {
                    console.warn("Sessão corrompida (user sem ID). Limpando...");
                    sessionStorage.clear();
                }
            }
        }
    } catch (e) {
        console.error("Erro crítico na verificação de sessão. Resetando...", e);
        sessionStorage.clear();
    }

    // =================================================================
    // 2. DADOS E FUNÇÕES AUXILIARES (DEFINIDOS NO TOPO)
    // =================================================================

    // Helpers de Formulário
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

    // Coleção Completa de Avatares SVG
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

    // Cria o placeholder do avatar quando não há imagem
    function placeholderSvgFragment() {
        const div = document.createElement('div');
        div.innerHTML = `<svg id="header-avatar-placeholder" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        return div.firstChild;
    }

    // Atualiza as cores dos avatares baseado no tema atual
    function updatePresetAvatarColors() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const isDark = theme === 'dark' || theme === 'cyber';
        
        document.querySelectorAll('.profile-avatar > svg, .avatar-option svg, .header-avatar > svg').forEach(svgElement => {
            if (!svgElement) return;
            if (svgElement.id === 'header-avatar-placeholder' || svgElement.id === 'profile-avatar-placeholder') {
                svgElement.style.stroke = isDark ? '#aaa' : '#555';
                return;
            }

            // Tenta descobrir a chave do avatar
            const key = svgElement.closest('[data-avatar-key]')?.dataset.avatarKey || 
                        (presetAvatars && Object.keys(presetAvatars).find(k => presetAvatars[k] && svgElement.outerHTML.includes(presetAvatars[k].substring(0, 50))));

            if (!key) return;

            svgElement.style.fill = 'none';
            svgElement.style.stroke = 'currentColor';

            // Cores Específicas do Tema
            if (theme === 'cyber') {
                svgElement.style.stroke = '#00f3ff'; // Ciano
                if(key === 'solaris') svgElement.style.stroke = '#ff00ff'; // Rosa
            } else {
                // Modos Claro/Escuro (Vermelho)
                if (key === 'code') { 
                    svgElement.style.stroke = isDark ? '#F0F0F0' : '#573A2E'; 
                } else if (key === 'solaris') { 
                    svgElement.style.stroke = isDark ? '#FF3333' : '#F59E0B'; 
                } else {
                    const color = isDark ? '#FF3333' : '#F59E0B'; // Vermelho no escuro, Laranja no claro
                    svgElement.style.stroke = color;
                    if (!['database', 'network', 'terminal', 'gear', 'atom'].includes(key)) { svgElement.style.fill = color; }
                }
            }
        });
    }

    // Carrega o avatar no canto superior direito
    function loadHeaderAvatar() {
        const headerAvatarDisplay = document.getElementById('header-avatar-display');
        if (!headerAvatarDisplay) return;

        headerAvatarDisplay.innerHTML = '';
        try {
            const userString = sessionStorage.getItem('user');
            let user = null;
            if (userString) { user = JSON.parse(userString); }

            if (user && user.avatar) {
                const avatarKeyOrPath = user.avatar;
                if (presetAvatars[avatarKeyOrPath]) {
                    headerAvatarDisplay.innerHTML = presetAvatars[avatarKeyOrPath];
                } else if (avatarKeyOrPath.startsWith('uploads/')) {
                    headerAvatarDisplay.innerHTML = `<img src="http://localhost:3000/${avatarKeyOrPath}?${Date.now()}" alt="Avatar">`;
                } else {
                    headerAvatarDisplay.appendChild(placeholderSvgFragment());
                }
            } else {
                headerAvatarDisplay.appendChild(placeholderSvgFragment());
            }
            updatePresetAvatarColors();
        } catch (e) { console.error(e); }
    }

    // =================================================================
    // 3. INICIALIZAÇÃO DE INTERFACE
    // =================================================================

    // Lógica de Tema (3 Estados: Claro, Escuro, Cyber)
    const themeBtn = document.getElementById('theme-toggle');
    const themes = ['light', 'dark', 'cyber'];

    if (themeBtn) {
        const apply = (t) => {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.setAttribute('data-theme', t);
            
            if (t === 'dark') {
                document.documentElement.classList.add('dark-mode'); // Ativa o vermelho
                themeBtn.textContent = 'Tema: Alerta';
            } else if (t === 'cyber') {
                themeBtn.textContent = 'Tema: Cyber';
            } else {
                themeBtn.textContent = 'Tema: Claro';
            }
            updatePresetAvatarColors();
        };

        // Carrega tema salvo
        let saved = localStorage.getItem('theme');
        if (!themes.includes(saved)) saved = 'light';
        apply(saved);

        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            let index = themes.indexOf(current);
            index = (index + 1) % themes.length;
            const nextTheme = themes[index];
            localStorage.setItem('theme', nextTheme);
            apply(nextTheme);
        });
    }

    // Verifica Login e Atualiza Header
    const checkLoginState = () => {
        let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        let user = null;
        try { user = JSON.parse(sessionStorage.getItem('user')); } catch (e) {}

        const els = {
            login: document.querySelector('.login-link-nav'),
            profile: document.querySelector('.profile-link-nav'),
            logout: document.getElementById('logout-btn'),
            cta: document.getElementById('cta-section'),
            admin: document.getElementById('admin-link-nav')
        };

        if (els.login) els.login.style.display = isLoggedIn ? 'none' : 'inline-block';
        if (els.profile) els.profile.style.display = isLoggedIn ? 'inline-block' : 'none';
        if (els.logout) els.logout.style.display = isLoggedIn ? 'inline-block' : 'none';
        if (els.cta) els.cta.style.display = isLoggedIn ? 'block' : 'none';
        if (els.admin) els.admin.style.display = (isLoggedIn && user?.role === 'admin') ? 'inline-block' : 'none';

        if (isLoggedIn) loadHeaderAvatar();
    };
    checkLoginState();

    // Botão de Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('http://localhost:3000/api/logout', { method: 'POST' })
                .finally(() => {
                    sessionStorage.clear();
                    alert('Você saiu da conta.');
                    window.location.href = 'index.html';
                });
        });
    }

    // =================================================================
    // 4. LÓGICA ESPECÍFICA DE PÁGINAS (Protegida por verificação)
    // =================================================================

    // --- CADASTRO ---
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const confirmPasswordError = document.getElementById('confirm-password-error');

        const validateName = () => { if (!nameInput.value.trim()) { showError(nameInput, nameError, 'Nome obrigatório.'); return false; } clearError(nameInput, nameError); return true; };
        const validateEmail = () => { const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (!regex.test(emailInput.value.trim())) { showError(emailInput, emailError, 'Email inválido.'); return false; } clearError(emailInput, emailError); return true; };
        const validatePassword = () => { if (passwordInput.value.length < 8) { showError(passwordInput, passwordError, 'Mínimo 8 caracteres.'); return false; } clearError(passwordInput, passwordError); return true; };
        const validateConfirm = () => { if (passwordInput.value !== confirmPasswordInput.value) { showError(confirmPasswordInput, confirmPasswordError, 'Senhas não conferem.'); return false; } clearError(confirmPasswordInput, confirmPasswordError); return true; };

        if (nameInput) nameInput.addEventListener('input', validateName);
        if (emailInput) emailInput.addEventListener('input', validateEmail);
        if (passwordInput) passwordInput.addEventListener('input', () => { validatePassword(); if(confirmPasswordInput.value) validateConfirm(); });
        if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', validateConfirm);

        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateName() && validateEmail() && validatePassword() && validateConfirm()) {
                const userData = { name: nameInput.value, email: emailInput.value, password: passwordInput.value };
                fetch('http://localhost:3000/api/cadastro', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData)
                })
                .then(r => r.json())
                .then(data => {
                    if (data.user) {
                        alert('Cadastro realizado com sucesso!');
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        window.location.href = 'perfil.html';
                    } else {
                        alert(data.message || 'Erro no cadastro.');
                    }
                })
                .catch(err => alert("Erro de conexão: " + err.message));
            }
        });
    }

    // --- LOGIN ---
    const logForm = document.querySelector('.auth-form:not(#registration-form)');
    if (logForm && window.location.pathname.includes('login.html')) {
        logForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            fetch('http://localhost:3000/api/login', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: pass })
            })
            .then(r => r.json())
            .then(data => {
                if (data.user) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = data.user.role === 'admin' ? 'admin.html' : 'perfil.html';
                } else {
                    alert(data.message || 'Login falhou.');
                }
            })
            .catch(err => alert("Erro de conexão: " + err.message));
        });
    }

    // --- PERFIL (Somente se o container existir na página) ---
    const profCont = document.querySelector('.profile-container');
    if (profCont) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        // Redireciona se não tiver usuário
        if (!user || sessionStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'login.html';
            return;
        }

        // Preencher Dados
        profCont.querySelector('#profile-name').textContent = user.name;
        profCont.querySelector('#profile-email').textContent = user.email;
        profCont.querySelector('#member-since').textContent = `Membro desde: ${new Date(user.created_at).toLocaleDateString('pt-BR')}`;

        // Exibir Avatar e Overlay
        const showAv = () => {
            const c = profCont.querySelector('.profile-avatar');
            c.innerHTML = '';
            if (presetAvatars[user.avatar]) c.innerHTML = presetAvatars[user.avatar];
            else if (user.avatar.startsWith('uploads/')) c.innerHTML = `<img src="http://localhost:3000/${user.avatar}?${Date.now()}" alt="Avatar">`;
            else c.appendChild(placeholderSvgFragment());
            
            const ov = document.createElement('div'); ov.className = 'avatar-interactive-overlay';
            ov.innerHTML = `<button id="btn-upload" title="Upload">UP</button><button id="btn-preset" title="Escolher">PIC</button>`;
            c.appendChild(ov);
            updatePresetAvatarColors();
        };
        showAv();

        // Listeners de Avatar
        profCont.querySelector('.profile-avatar').addEventListener('click', (e) => {
            if (e.target.id === 'btn-upload') document.getElementById('avatar-upload').click();
            if (e.target.id === 'btn-preset') {
                const modal = document.getElementById('avatar-choice-modal');
                const cont = modal.querySelector('.avatar-options-container');
                cont.innerHTML = '';
                Object.keys(presetAvatars).forEach(k => {
                    const d = document.createElement('div'); d.className = 'avatar-option'; d.innerHTML = presetAvatars[k]; d.dataset.key = k;
                    d.addEventListener('click', () => {
                        fetch('http://localhost:3000/api/perfil/avatar', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({avatarKey: k})})
                        .then(r=>r.json()).then(d=>{ user.avatar=d.avatar; sessionStorage.setItem('user', JSON.stringify(user)); showAv(); loadHeaderAvatar(); modal.classList.remove('active'); });
                    });
                    cont.appendChild(d);
                });
                updatePresetAvatarColors();
                modal.classList.add('active');
            }
        });
        
        document.getElementById('avatar-upload').addEventListener('change', (e) => {
            const file = e.target.files[0]; if (!file) return;
            const fd = new FormData(); fd.append('avatarFile', file);
            fetch('http://localhost:3000/api/perfil/upload-avatar', { method: 'POST', body: fd })
            .then(r=>r.json()).then(d=>{ user.avatar=d.avatar; sessionStorage.setItem('user', JSON.stringify(user)); showAv(); loadHeaderAvatar(); });
        });

        // Botões de Fechar Modal
        document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        }));

        // Botão Editar Perfil (Nome/Email)
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

        // Botão Senha
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
                if (confirm("Tem certeza?")) {
                    fetch(`http://localhost:3000/api/perfil/${user.id}`, { method: 'DELETE' })
                    .then(() => { sessionStorage.clear(); window.location.href = 'index.html'; });
                }
            });
        }

        // Progresso
        fetch(`http://localhost:3000/api/progresso/${user.id}`)
            .then(r=>r.json()).then(d=>profCont.querySelector('.stat-number').textContent = `${d.percentage}%`)
            .catch(()=>profCont.querySelector('.stat-number').textContent = '0%');
    }

    // Menu Mobile
    const mob = document.getElementById('mobile-nav-toggle');
    if (mob) mob.addEventListener('click', () => {
        document.querySelector('header nav').classList.toggle('active');
        mob.classList.toggle('active');
    });
});