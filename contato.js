// contato.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    
    // Auto-preencher se estiver logado
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.name) nameInput.value = user.name;
            if (user.email) emailInput.value = user.email;
        } catch (e) {}
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button');
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";

            const data = {
                name: nameInput.value,
                email: emailInput.value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };

            fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(r => r.json())
            .then(res => {
                alert(res.message);
                form.reset();
                // Re-preencher se estiver logado
                if (userStr) {
                    const user = JSON.parse(userStr);
                    nameInput.value = user.name;
                    emailInput.value = user.email;
                }
            })
            .catch(err => alert("Erro ao enviar."))
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Mensagem";
            });
        });
    }
});