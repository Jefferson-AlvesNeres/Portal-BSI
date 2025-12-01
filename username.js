// username.js
// Lógica específica para a página username.html

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado. Iniciando username.js...");

    // Helpers (duplicados para independência)
    const showError = (input, errorElement, message) => { if (input) input.classList.add('invalid'); if (errorElement) { errorElement.textContent = message; errorElement.classList.add('active'); }};
    const clearError = (input, errorElement) => { if (input) input.classList.remove('invalid'); if (errorElement) { errorElement.classList.remove('active'); errorElement.textContent = ''; }};

    const usernameForm = document.getElementById('username-form');

    if (usernameForm) {
        console.log("Lógica Username Ativada em username.js.");
        const userInput = document.getElementById('username-input');
        const errorMsg = document.getElementById('username-error');
        const submitBtn = document.getElementById('username-submit-btn');
        let user = null;

        // 1. Verifica se usuário pode estar nesta página
        try {
            user = JSON.parse(sessionStorage.getItem('user'));
            if (!user || sessionStorage.getItem('isLoggedIn') !== 'true') {
                throw new Error("Não logado.");
            }
            // Redireciona se já definiu ou se já tentou e falhou (username_edited === 1)
            if ((user.username && user.username_edited === 1) || (!user.username && user.username_edited === 1)) {
                 console.log("Usuário já definiu/bloqueou username, redirecionando para perfil...");
                 alert(user.username ? "Username já definido." : "Username bloqueado para edição.");
                 window.location.href = 'perfil.html';
                 return; // Interrompe a execução deste script
            }
             console.log("Usuário precisa definir username:", user.email);
        } catch (e) {
            console.error("Erro na verificação inicial de username.js:", e);
            alert("Login necessário para definir username.");
            window.location.href = 'login.html';
            return; // Interrompe a execução
        }

        // 2. Adiciona listener ao formulário
        if (usernameForm && userInput && errorMsg && submitBtn) {
            usernameForm.addEventListener('submit', (e) => {
                 console.log("Submit formulário Username.");
                 e.preventDefault();
                 const username = userInput.value.trim();

                 // Validações Frontend
                 if (username.length < 3) return showError(userInput, errorMsg, "Pelo menos 3 caracteres.");
                 if (username.length > 20) return showError(userInput, errorMsg, "Máximo 20 caracteres.");
                 if (!/^[a-zA-Z0-9_]+$/.test(username)) return showError(userInput, errorMsg, "Apenas letras (sem acento), números e _.");

                 clearError(userInput, errorMsg);
                 submitBtn.disabled = true;
                 submitBtn.textContent = "Salvando...";

                 // 3. Envia para a API
                 console.log("Enviando username para API:", username);
                 fetch('http://localhost:3000/api/perfil/username', {
                     method: 'PUT',
                     headers: {'Content-Type':'application/json'},
                     body: JSON.stringify({ username: username }) // Backend pega ID da sessão
                 })
                 .then(response => {
                     // Lê JSON independentemente do status
                     return response.json().then(data => ({ ok: response.ok, status: response.status, data }));
                 })
                 .then(({ ok, status, data }) => {
                     if (!ok) {
                         // Lança erro com mensagem da API
                         throw new Error(data.message || `Erro ${status}`);
                     }
                     // Sucesso
                     console.log("Username salvo com sucesso:", data);
                     alert(data.message);

                     // 4. Atualiza sessionStorage com os dados retornados
                     user.username = data.username;
                     user.username_edited = data.username_edited;
                     sessionStorage.setItem('user', JSON.stringify(user));

                     // 5. Redireciona para o perfil
                     window.location.href = 'perfil.html';
                 })
                 .catch(err => {
                     console.error("Erro fetch username:", err);
                     showError(userInput, errorMsg, err.message); // Mostra erro da API (ex: duplicado)
                     submitBtn.disabled = false; // Reabilita botão
                     submitBtn.textContent = "Salvar Username";
                 });
            });
        } else {
             console.error("Elementos do formulário username não encontrados para adicionar listener.");
        }
    } else {
        console.warn("Formulário username não encontrado em username.js (normal se não estiver na página username).");
    }
     console.log("Fim da execução de username.js.");
});