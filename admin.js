// admin.js (Versão Final - Sem Username)

document.addEventListener('DOMContentLoaded', () => {
    console.log("Admin JS iniciado.");
    
    // 1. Verifica se é Admin mesmo (Segurança Frontend)
    try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            alert("Acesso restrito a administradores.");
            window.location.href = 'index.html';
            return;
        }
        const welcome = document.getElementById('admin-welcome');
        if (welcome) welcome.textContent = `Olá, ${user.name}`;
    } catch (e) {
        window.location.href = 'index.html';
        return;
    }

    // Carrega dados iniciais
    fetchStats();
    fetchUsers();
    fetchMessages();

    // --- FUNÇÕES DE DADOS ---

    // Buscar Estatísticas
    function fetchStats() {
        fetch('http://localhost:3000/api/admin/stats')
            .then(r => r.json())
            .then(d => {
                const u = document.getElementById('stat-total-users');
                const m = document.getElementById('stat-total-messages');
                if (u) u.textContent = d.totalUsers || 0;
                if (m) m.textContent = d.totalMessages || 0;
            })
            .catch(e => console.error("Erro stats:", e));
    }

    // Buscar Mensagens
    function fetchMessages() {
        const container = document.getElementById('messages-list-body');
        if (!container) return;
        
        fetch('http://localhost:3000/api/admin/messages')
            .then(r => r.json())
            .then(msgs => {
                container.innerHTML = '';
                if (!msgs || msgs.length === 0) {
                    container.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:1rem;">Nenhuma mensagem.</td></tr>';
                    return;
                }
                msgs.forEach(m => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${m.id}</td>
                        <td>${m.name}<br><small style="opacity:0.7">${m.email}</small></td>
                        <td>${m.subject || 'Sem assunto'}</td>
                        <td title="${m.message}">${m.message.substring(0, 50)}${m.message.length > 50 ? '...' : ''}</td>
                        <td><button class="admin-action-btn delete" onclick="deleteMessage(${m.id})" title="Apagar">🗑️</button></td>
                    `;
                    container.appendChild(tr);
                });
            })
            .catch(e => console.error("Erro mensagens:", e));
    }

    // Buscar Usuários
    function fetchUsers() {
        const table = document.getElementById('user-table-body');
        if (!table) return;

        fetch('http://localhost:3000/api/admin/users')
            .then(r => r.json())
            .then(users => {
                table.innerHTML = '';
                if (!users || users.length === 0) {
                    table.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:1rem;">Nenhum usuário encontrado.</td></tr>';
                    return;
                }
                users.forEach(u => {
                    const tr = document.createElement('tr');
                    // REMOVIDO: Referência a ${u.username}
                    tr.innerHTML = `
                        <td>${u.id}</td>
                        <td>${u.name}</td>
                        <td>${u.email}</td>
                        <td>${u.role}</td>
                        <td class="user-actions">
                            <button class="admin-action-btn delete" onclick="deleteUser(${u.id})" title="Deletar Usuário">🗑️</button>
                        </td>
                    `;
                    table.appendChild(tr);
                });
            })
            .catch(e => console.error("Erro usuários:", e));
    }

    // --- AÇÕES GLOBAIS (Para funcionar no onclick) ---

    window.deleteMessage = (id) => {
        if(confirm("Tem certeza que deseja apagar esta mensagem?")) {
            fetch(`http://localhost:3000/api/admin/messages/${id}`, { method: 'DELETE' })
                .then(() => fetchMessages());
        }
    };
    
    window.deleteUser = (id) => {
         if(confirm("Tem certeza que deseja deletar este usuário? Esta ação é irreversível.")) {
            fetch(`http://localhost:3000/api/admin/user/${id}`, { method: 'DELETE' })
                .then(() => {
                    fetchUsers();
                    fetchStats(); // Atualiza contagem
                });
        }
    };

    // Logout
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('http://localhost:3000/api/logout', { method: 'POST' }).finally(() => {
                sessionStorage.clear();
                window.location.href = 'index.html';
            });
        });
    }
    
    // Filtro de busca simples
    const searchInput = document.getElementById('user-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#user-table-body tr');
            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(term) ? '' : 'none';
            });
        });
    }
});