// script.js - Login Corrigido e Simplificado

console.log("Script carregado.");

// --- 1. LIMPEZA DE SEGURANÇA ---
// Se o site achar que está logado mas não tiver o ID, ele limpa tudo para evitar travamento.
try {
    const u = JSON.parse(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('isLoggedIn') && (!u || !u.id)) {
        console.warn("Sessão inválida. Resetando.");
        sessionStorage.clear();
    }
} catch (e) { sessionStorage.clear(); }


// --- 2. DADOS VISUAIS (Avatares) ---
const presetAvatars = {
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 18L22 12L16 6"/><path d="M8 6L2 12L8 18"/></svg>`,
    // (Adicione outros se quiser, mas este básico garante que não dê erro)
};

function loadHeaderAvatar() {
    const disp = document.getElementById('header-avatar-display');
    if (!disp) return;
    disp.innerHTML = '';
    try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user && user.avatar) {
            if (user.avatar.startsWith('uploads/')) {
                disp.innerHTML = `<img src="http://localhost:3000/${user.avatar}?${Date.now()}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
            } else {
                disp.innerHTML = presetAvatars.code; // Padrão seguro
            }
        }
    } catch (e) {}
}

// --- 3. INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Verificar Login (Atualiza o Topo)
    const isLogged = sessionStorage.getItem('isLoggedIn') === 'true';
    const user = isLogged ? JSON.parse(sessionStorage.getItem('user')) : null;

    if (document.querySelector('.login-link-nav')) 
        document.querySelector('.login-link-nav').style.display = isLogged ? 'none' : 'inline-block';
    
    if (document.querySelector('.profile-link-nav')) 
        document.querySelector('.profile-link-nav').style.display = isLogged ? 'inline-block' : 'none';
    
    if (document.getElementById('logout-btn')) 
        document.getElementById('logout-btn').style.display = isLogged ? 'inline-block' : 'none';
    
    if (document.getElementById('admin-link-nav')) 
        document.getElementById('admin-link-nav').style.display = (isLogged && user?.role === 'admin') ? 'inline-block' : 'none';

    if (isLogged) loadHeaderAvatar();

    // B. Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('http://localhost:3000/api/logout', { method: 'POST' }).finally(() => {
                sessionStorage.clear();
                window.location.href = 'index.html';
            });
        });
    }

    // C. LOGIN E CADASTRO (A Parte Importante)
    const loginForm = document.querySelector('.auth-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Detecta se é login ou cadastro baseado na existência do campo 'name'
            const isCadastro = document.getElementById('name') !== null;
            
            const endpoint = isCadastro ? '/api/cadastro' : '/api/login';
            const bodyData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            if (isCadastro) {
                bodyData.name = document.getElementById('name').value;
                const confirmPass = document.getElementById('confirm-password')?.value;
                if (bodyData.password !== confirmPass) return alert("Senhas não conferem.");
            }

            // Faz a requisição
            fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            })
            .then(r => r.json())
            .then(data => {
                if (data.user) {
                    // SUCESSO! Salva e Redireciona
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    alert(isCadastro ? "Conta criada!" : "Login realizado!");
                    
                    // Se for admin, vai pro painel, senão vai pro perfil
                    if (data.user.role === 'admin') window.location.href = 'admin.html';
                    else window.location.href = 'perfil.html';
                } else {
                    alert(data.message || "Erro ao entrar.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Erro de conexão com o servidor.");
            });
        });
    }

    // D. PÁGINA DE PERFIL (Preenchimento)
    const profCont = document.querySelector('.profile-container');
    if (profCont) {
        if (!isLogged || !user) {
            window.location.href = 'login.html';
            return;
        }

        // Preenche os textos
        profCont.querySelector('#profile-name').textContent = user.name;
        profCont.querySelector('#profile-email').textContent = user.email;
        const date = new Date(user.created_at);
        profCont.querySelector('#member-since').textContent = `Desde: ${date.toLocaleDateString('pt-BR')}`;

        // Avatar Principal
        const avDiv = profCont.querySelector('.profile-avatar');
        // Se tiver upload, mostra imagem. Se não, mostra SVG padrão.
        if (user.avatar && user.avatar.startsWith('uploads/')) {
             avDiv.style.backgroundImage = `url(http://localhost:3000/${user.avatar}?${Date.now()})`;
             avDiv.style.backgroundSize = 'cover';
             avDiv.innerHTML = `<div class="avatar-interactive-overlay" onclick="document.getElementById('avatar-upload').click()"><span>Trocar</span></div>`;
        } else {
             avDiv.innerHTML = presetAvatars.code + `<div class="avatar-interactive-overlay" onclick="document.getElementById('avatar-upload').click()"><span>Trocar</span></div>`;
        }

        // Progresso
        fetch(`http://localhost:3000/api/progresso/${user.id}`)
            .then(r => r.json())
            .then(d => profCont.querySelector('.stat-number').textContent = `${d.percentage}%`)
            .catch(() => profCont.querySelector('.stat-number').textContent = '0%');

        // Listener de Upload
        const upInput = document.getElementById('avatar-upload');
        if(upInput) {
            upInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if(!file) return;
                const fd = new FormData(); fd.append('avatarFile', file);
                fetch('http://localhost:3000/api/perfil/upload-avatar', { method: 'POST', body: fd })
                .then(r=>r.json()).then(d=>{
                    user.avatar = d.avatar;
                    sessionStorage.setItem('user', JSON.stringify(user));
                    window.location.reload();
                });
            });
        }
        
        // Listeners de Modais (Edição e Senha)
        const setupModal = (btnId, modalId, formId, endpoint) => {
            const btn = document.getElementById(btnId);
            const modal = document.getElementById(modalId);
            if(btn && modal) {
                btn.addEventListener('click', () => {
                    // Pre-preenche nome/email se for edição
                    if (btnId === 'open-edit-modal-btn') {
                        document.getElementById('edit-name').value = user.name;
                        document.getElementById('edit-email').value = user.email;
                    }
                    modal.classList.add('active');
                });
                
                modal.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('active'));
                
                document.getElementById(formId).addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Pega dados do form dinamicamente
                    const formData = {};
                    new FormData(e.target).forEach((v, k) => formData[k] = v);
                    
                    // Monta body específico
                    let body = {};
                    if (endpoint.includes('senha')) {
                        body = { currentPassword: document.getElementById('current-password').value, newPassword: document.getElementById('new-password').value };
                    } else {
                        body = { name: document.getElementById('edit-name').value, email: document.getElementById('edit-email').value };
                    }

                    fetch(`http://localhost:3000${endpoint}`, {
                        method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)
                    })
                    .then(r => r.json())
                    .then(d => {
                        alert(d.message);
                        if(d.user) { // Se retornou user atualizado (perfil)
                            sessionStorage.setItem('user', JSON.stringify({...user, ...d.user}));
                            window.location.reload();
                        } else {
                            modal.classList.remove('active');
                        }
                    });
                });
            }
        };

        setupModal('open-edit-modal-btn', 'edit-profile-modal', 'edit-profile-form', '/api/perfil');
        setupModal('open-change-password-modal-btn', 'change-password-modal', 'change-password-form', '/api/perfil/senha');

        // Deletar
        const delBtn = document.getElementById('delete-account-btn');
        if(delBtn) {
            delBtn.addEventListener('click', () => {
                if(confirm("Tem certeza?")) {
                    fetch(`http://localhost:3000/api/perfil/${user.id}`, { method: 'DELETE' })
                    .then(() => { sessionStorage.clear(); window.location.href = 'index.html'; });
                }
            });
        }
    }

    // E. TEMA e MENU
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    }
    const mob = document.getElementById('mobile-nav-toggle');
    if (mob) mob.addEventListener('click', () => document.querySelector('header nav').classList.toggle('active'));


    
});