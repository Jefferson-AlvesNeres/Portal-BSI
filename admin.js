// admin.js
// Lógica específica para a página admin.html

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado. Iniciando admin.js...");

    // --- Elementos DOM ---
    const adminMain = document.querySelector('.admin-main');
    if (!adminMain) return; // Sai se não estiver na página admin

    const statsUsers = document.getElementById('stat-total-users');
    const statsTopics = document.getElementById('stat-total-topics');
    const statsCompletions = document.getElementById('stat-total-completions');
    const userTableBody = document.getElementById('user-table-body');
    const searchInput = document.getElementById('user-search-input');
    const confirmModal = document.getElementById('admin-confirm-modal');
    const closeModalBtn = document.getElementById('close-confirm-modal');
    const confirmModalTitle = document.getElementById('confirm-modal-title');
    const confirmModalText = document.getElementById('confirm-modal-text');
    const confirmBtn = document.getElementById('confirm-modal-confirm');
    const cancelBtn = document.getElementById('confirm-modal-cancel');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    const adminWelcome = document.getElementById('admin-welcome');

    // --- Estado ---
    let user = null; // Usuário admin logado
    let allUsersData = []; // Cache dos usuários gerenciados
    let actionQueue = { action: null, userId: null, data: null }; // Fila para modal

    // --- Verificação de Admin ---
    try {
        user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || sessionStorage.getItem('isLoggedIn') !== 'true' || user.role !== 'admin') {
            throw new Error("Acesso negado.");
        }
        if (adminWelcome) adminWelcome.textContent = `Olá, ${user.name}!`;
        console.log("Admin autenticado:", user.email);
    } catch (e) {
        console.error("Erro na autenticação do admin:", e);
        alert("Acesso negado. Você precisa ser um administrador.");
        window.location.href = 'index.html'; // Redireciona se não for admin
        return; // Interrompe execução
    }

    // --- Funções API ---
    const fetchStats = () => {
        fetch('http://localhost:3000/api/admin/stats')
            .then(res => res.ok ? res.json() : Promise.reject('Erro API Stats'))
            .then(data => {
                if(statsUsers) statsUsers.textContent = data.totalUsers;
                if(statsTopics) statsTopics.textContent = data.totalTopics;
                if(statsCompletions) statsCompletions.textContent = data.totalCompletions;
            }).catch(err => console.error("Erro ao buscar stats:", err));
    };

    const fetchUsers = () => {
        if (!userTableBody) return;
        userTableBody.innerHTML = `<tr><td colspan="7" class="loading-users">Carregando usuários...</td></tr>`; // Feedback visual
        fetch('http://localhost:3000/api/admin/users')
            .then(res => res.ok ? res.json() : Promise.reject('Erro API Users'))
            .then(data => {
                allUsersData = data;
                renderUserTable(data);
            }).catch(err => {
                userTableBody.innerHTML = `<tr><td colspan="7" style="color: var(--admin-danger);">Erro ao carregar usuários.</td></tr>`;
                console.error("Erro ao buscar usuários:", err);
            });
    };

    // --- Funções UI ---
    const renderUserTable = (usersToRender) => {
        if (!userTableBody) return;
        userTableBody.innerHTML = '';
        if (usersToRender.length === 0) {
            userTableBody.innerHTML = `<tr><td colspan="7" class="loading-users">Nenhum usuário encontrado.</td></tr>`;
            return;
        }
        usersToRender.forEach(u => {
            const row = document.createElement('tr'); row.dataset.userId = u.id;
            // SVGs para ícones de ação
            const roleIcon = u.role === 'user' 
                ? `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>` // Ícone admin
                : `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path></svg>`; // Ícone usuário
            const deleteIcon = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`; // Ícone deletar
            
            const roleTitle = u.role === 'user' ? 'Promover para Admin' : 'Rebaixar para Usuário';

            row.innerHTML = `
                <td>${u.id}</td> 
                <td>${u.name}</td> 
                <td>${u.email}</td> 
                <td>${u.username || '---'}</td> 
                <td>${u.progressCount || 0} Tópicos</td> 
                <td data-role="${u.role}">${u.role}</td> 
                <td class="user-actions"> 
                    <button class="admin-action-btn role-toggle" data-role="${u.role}" data-action="role" title="${roleTitle}"> 
                        ${roleIcon} 
                    </button> 
                    <button class="admin-action-btn delete" data-action="delete" title="Deletar Usuário"> 
                        ${deleteIcon} 
                    </button> 
                </td>`;
            userTableBody.appendChild(row);
        });
    };

    const openConfirmModal = (action, userId) => {
        const user = allUsersData.find(u => u.id === userId);
        if (!user || !confirmModal) return;

        actionQueue = { action, userId, data: null }; // Reseta a fila

        if (action === 'delete') {
            confirmModalTitle.textContent = "Deletar Usuário?";
            confirmModalText.innerHTML = `Tem certeza que deseja deletar permanentemente o usuário <strong>${user.name}</strong> (ID: ${user.id})? <br>Isso não pode ser desfeito.`;
            confirmBtn.className = "button-danger";
            confirmBtn.textContent = "Deletar";
        } else if (action === 'role') {
            const newRole = user.role === 'admin' ? 'user' : 'admin';
            actionQueue.data = { role: newRole }; // Adiciona dados à fila
            confirmModalTitle.textContent = "Mudar Função?";
            confirmModalText.innerHTML = `Tem certeza que deseja alterar a função de <strong>${user.name}</strong> de <strong>${user.role}</strong> para <strong>${newRole}</strong>?`;
            confirmBtn.className = newRole === 'admin' ? "button-primary" : "button-danger"; // Verde para promover, vermelho para rebaixar
            confirmBtn.textContent = `Mudar para ${newRole}`;
        }
        confirmModal.classList.add('active');
    };
    
    const closeConfirmModal = () => {
        if(confirmModal) confirmModal.classList.remove('active');
        actionQueue = { action: null, userId: null, data: null }; // Limpa fila
    };

    // --- Event Listeners ---

    // Logout Admin
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('http://localhost:3000/api/logout', { method: 'POST' })
                .then(() => { sessionStorage.clear(); window.location.href = 'index.html'; })
                .catch(() => { sessionStorage.clear(); window.location.href = 'index.html'; });
        });
    }

    // Busca/Filtro
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filteredUsers = allUsersData.filter(u => {
                return u.name.toLowerCase().includes(query) ||
                       u.email.toLowerCase().includes(query) ||
                       (u.username || '').toLowerCase().includes(query); // <<< CORREÇÃO (Erro 20)
            });
            renderUserTable(filteredUsers);
        });
    }

    // Modal de Confirmação
    if (confirmModal && closeModalBtn && cancelBtn && confirmBtn) {
        closeModalBtn.addEventListener('click', closeConfirmModal);
        cancelBtn.addEventListener('click', closeConfirmModal);
        confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) closeConfirmModal(); });

        confirmBtn.addEventListener('click', () => {
            const { action, userId, data } = actionQueue;
            if (!action || !userId) return closeConfirmModal();
            
            let url, method, body;
            
            if (action === 'delete') { 
                url = `http://localhost:3000/api/admin/user/${userId}`; 
                method = 'DELETE'; 
            }
            else if (action === 'role') { 
                url = `http://localhost:3000/api/admin/user/${userId}`; 
                method = 'PUT'; 
                body = JSON.stringify(data); 
            }
            else { 
                return closeConfirmModal(); // Ação desconhecida
            }

            confirmBtn.disabled = true; // Desabilita durante a requisição

            fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: body })
                .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
                .then(data => { 
                    console.log(data.message); 
                    fetchUsers(); // Atualiza dados da tabela
                    fetchStats(); // Atualiza estatísticas (total de usuários)
                })
                .catch(err => { 
                    alert(`Erro: ${err.message || 'Erro desconhecido'}`); 
                })
                .finally(() => { 
                    confirmBtn.disabled = false; 
                    closeConfirmModal(); 
                });
        });
    }

    // Delegação de Eventos na Tabela
    if (userTableBody) {
        userTableBody.addEventListener('click', (e) => {
            const button = e.target.closest('.admin-action-btn');
            if (!button) return;
            const action = button.dataset.action;
            const userId = parseInt(button.closest('tr').dataset.userId, 10);
            if (action && userId) { 
                openConfirmModal(action, userId); 
            }
        });
    }

    // --- Carregamento Inicial ---
    console.log("Carregando dados do Admin...");
    fetchStats();
    fetchUsers();
    

}); // Fim DOMContentLoaded