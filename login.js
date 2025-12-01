// login.js
// Lógica específica para a página login.html

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado. Iniciando login.js...");

    // Helpers (duplicados para independência)
    const showError = (input, errorElement, message) => { if (input) input.classList.add('invalid'); if (errorElement) { errorElement.textContent = message; errorElement.classList.add('active'); }};
    const clearError = (input, errorElement) => { if (input) input.classList.remove('invalid'); if (errorElement) { errorElement.classList.remove('active'); errorElement.textContent = ''; }};

    const loginForm = document.querySelector('.auth-form:not(#registration-form)');

    if (loginForm) {
         console.log("Form Login encontrado em login.js.");
         const emailInput = document.getElementById('email');
         const passwordInput = document.getElementById('password');
         const submitButton = loginForm.querySelector('.auth-button'); // Botão de submit

         // Adiciona validação simples de campos vazios no frontend
         const validateLoginForm = () => {
            let isValid = true;
            if (!emailInput?.value.trim()) {
                // showError(emailInput, /* precisa de um span de erro no HTML */, "Email obrigatório");
                isValid = false;
                 console.warn("Email vazio no login"); // Log temporário
            } else {
                 // clearError(emailInput, /* span de erro */);
            }
            if (!passwordInput?.value.trim()) {
                // showError(passwordInput, /* span de erro */, "Senha obrigatória");
                isValid = false;
                 console.warn("Senha vazia no login"); // Log temporário
            } else {
                 // clearError(passwordInput, /* span de erro */);
            }
            return isValid;
         };

         loginForm.addEventListener('submit', (e) => {
             console.log("Submit Login interceptado em login.js.");
             e.preventDefault();

             if (!emailInput || !passwordInput) {
                 console.error("Inputs de login não encontrados no submit.");
                 alert("Erro interno, tente recarregar a página.");
                 return;
             }

             // Desabilita botão durante o envio
             if(submitButton) submitButton.disabled = true;

             const loginData = { email: emailInput.value, password: passwordInput.value };

             fetch('http://localhost:3000/api/login', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(loginData)
             })
             .then(response => {
                 // Lê o JSON da resposta independentemente do status
                 return response.json().then(data => ({ ok: response.ok, status: response.status, data }));
             })
             .then(({ ok, status, data }) => {
                 if (!ok) {
                     // Lança um erro com a mensagem da API
                     throw new Error(data.message || `Erro ${status}`);
                 }
                 // Sucesso
                 console.log("Login OK, redirecionando...");
                 alert('Login efetuado com sucesso!');
                 sessionStorage.setItem('isLoggedIn', 'true');
                 sessionStorage.setItem('user', JSON.stringify(data.user)); // API retorna user completo

                 // Redireciona com base na role e username
                 if (data.user.role === 'admin') window.location.href = 'admin.html';
                 else if (!data.user.username && data.user.username_edited === 0) window.location.href = 'username.html';
                 else window.location.href = 'perfil.html';
             })
             .catch(error => {
                 console.error('Erro no fetch de login:', error);
                 alert(`Erro no login: ${error.message}`);
                 // Reabilita o botão em caso de erro
                 if(submitButton) submitButton.disabled = false;
             });
         });
    } else {
         console.warn("Formulário de login não encontrado em login.js (normal se não estiver na página de login).");
    }
    console.log("Fim da execução de login.js.");
});