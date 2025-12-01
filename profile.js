// profile.js
// Lógica específica para a página perfil.html (SEM USERNAME)

document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;

    console.log("DOM Carregado. Iniciando profile.js...");

    // Seleção Elementos Perfil
    const profileNameElement = profileContainer.querySelector('.profile-details h1');
    const profileEmailElement = profileContainer.querySelector('.profile-details .user-email');
    const profileAvatarContainer = profileContainer.querySelector('.profile-avatar');
    const memberSinceElement = profileContainer.querySelector('#member-since');
    const progressCardNumber = profileContainer.querySelector('.stat-card:nth-child(1) .stat-number');
    const avatarUploadInput = profileContainer.querySelector('#avatar-upload');
    const avatarChoiceModal = document.getElementById('avatar-choice-modal');
    const closeAvatarChoiceModalBtn = document.getElementById('close-avatar-modal-btn');
    const avatarOptionsContainer = document.querySelector('.avatar-options-container');
    const openEditModalBtn = profileContainer.querySelector('#open-edit-modal-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const openPasswordModalBtn = profileContainer.querySelector('#open-change-password-modal-btn');
    const passwordModal = document.getElementById('change-password-modal');
    const deleteBtn = profileContainer.querySelector('#delete-account-btn');

    // Funções Perfil
    const displayAvatar = (avatarKeyOrPath) => {
         if (typeof presetAvatars === 'undefined') return null; // Depende de script.js
         if (!profileAvatarContainer) return null;
         
         profileAvatarContainer.innerHTML = ''; 
         let newElement;
         if (presetAvatars[avatarKeyOrPath]) { newElement = document.createRange().createContextualFragment(presetAvatars[avatarKeyOrPath]).firstChild; }
         else if (avatarKeyOrPath?.startsWith('uploads/')) { newElement = document.createElement('img'); newElement.src = `http://localhost:3000/${avatarKeyOrPath}?${Date.now()}`; newElement.style.display = 'block'; }
         else { newElement = placeholderSvgFragment().firstChild; }
         
         if (newElement) profileAvatarContainer.appendChild(newElement);
         
         // Overlay
         let overlay = document.createElement('div'); overlay.className = 'avatar-interactive-overlay';
         overlay.innerHTML = `<button class="avatar-action-icon" id="trigger-upload-icon-inner" title="Carregar"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg></button><button class="avatar-action-icon" id="trigger-preset-icon-inner" title="Escolher"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></button>`;
         profileAvatarContainer.appendChild(overlay);
         
         if (typeof updatePresetAvatarColors === 'function') updatePresetAvatarColors();
    };

    const handleImageUpload = (event) => {
         const file = event.target.files[0]; if(!file) return; 
         const formData = new FormData(); formData.append('avatarFile', file);
         fetch('http://localhost:3000/api/perfil/upload-avatar', { method: 'POST', body: formData })
         .then(r => r.json())
         .then(d => {
             const user = JSON.parse(sessionStorage.getItem('user'));
             user.avatar = d.avatar; sessionStorage.setItem('user', JSON.stringify(user));
             displayAvatar(user.avatar);
             if(typeof loadHeaderAvatar === 'function') loadHeaderAvatar();
         })
         .catch(err => alert(err.message));
    };

    const saveAvatarChoice = (key) => {
         fetch('http://localhost:3000/api/perfil/avatar', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ avatarKey: key }) })
         .then(r => r.json())
         .then(d => {
             const user = JSON.parse(sessionStorage.getItem('user'));
             user.avatar = d.avatar; sessionStorage.setItem('user', JSON.stringify(user));
             displayAvatar(user.avatar);
             if(typeof loadHeaderAvatar === 'function') loadHeaderAvatar();
         })
         .catch(err => alert(err.message));
    };

    const populateProfileData = (user) => {
        if (!user) return;
        if (profileNameElement) profileNameElement.textContent = user.name;
        if (profileEmailElement) profileEmailElement.textContent = user.email;
        if (memberSinceElement) memberSinceElement.textContent = `Membro desde: ${new Date(user.created_at).toLocaleDateString('pt-BR')}`;
        displayAvatar(user.avatar);
    };

    // Carregamento Inicial
    const userDataString = sessionStorage.getItem('user');
    if (userDataString && sessionStorage.getItem('isLoggedIn') === 'true') {
        const user = JSON.parse(userDataString);
        populateProfileData(user);
        
        // Progresso
        if (progressCardNumber) {
            fetch(`http://localhost:3000/api/progresso/${user.id}`)
            .then(r => r.json())
            .then(d => progressCardNumber.textContent = `${d.percentage}%`)
            .catch(() => progressCardNumber.textContent = 'N/A');
        }
    } else {
        if (window.location.pathname.includes('perfil.html')) {
            alert("Sessão não encontrada."); window.location.href = 'login.html';
        }
    }

    // Listeners
    if(avatarUploadInput) avatarUploadInput.addEventListener('change', handleImageUpload);
    
    if(profileAvatarContainer) {
        profileAvatarContainer.addEventListener('click', (e) => {
            if(e.target.closest('#trigger-upload-icon-inner') && avatarUploadInput) avatarUploadInput.click();
            else if(e.target.closest('#trigger-preset-icon-inner')) {
                 if(avatarOptionsContainer) {
                     avatarOptionsContainer.innerHTML = '';
                     Object.keys(presetAvatars).forEach(key => {
                         const d = document.createElement('div'); d.className='avatar-option'; d.innerHTML=presetAvatars[key];
                         d.addEventListener('click', () => { saveAvatarChoice(key); avatarChoiceModal.classList.remove('active'); });
                         avatarOptionsContainer.appendChild(d);
                     });
                     if(typeof updatePresetAvatarColors === 'function') updatePresetAvatarColors();
                     avatarChoiceModal.classList.add('active');
                 }
            }
        });
    }

    if(closeAvatarChoiceModalBtn) closeAvatarChoiceModalBtn.addEventListener('click', () => avatarChoiceModal.classList.remove('active'));

    // Modal Edição
    if (openEditModalBtn && editProfileModal) {
        openEditModalBtn.addEventListener('click', () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            document.getElementById('edit-name').value = user.name;
            document.getElementById('edit-email').value = user.email;
            editProfileModal.classList.add('active');
        });
        const closeBtn = editProfileModal.querySelector('#close-modal-btn');
        if (closeBtn) closeBtn.addEventListener('click', () => editProfileModal.classList.remove('active'));
        const form = editProfileModal.querySelector('form');
        if (form) form.addEventListener('submit', (e) => {
            e.preventDefault();
            const n = document.getElementById('edit-name').value;
            const em = document.getElementById('edit-email').value;
            fetch('http://localhost:3000/api/perfil', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name:n, email:em}) })
            .then(r => r.json())
            .then(d => {
                alert(d.message);
                const user = JSON.parse(sessionStorage.getItem('user'));
                user.name = n; user.email = em; sessionStorage.setItem('user', JSON.stringify(user));
                populateProfileData(user);
                editProfileModal.classList.remove('active');
            });
        });
    }

    // Modal Senha
    if (openPasswordModalBtn && passwordModal) {
        openPasswordModalBtn.addEventListener('click', () => passwordModal.classList.add('active'));
        const closeBtn = passwordModal.querySelector('#close-password-modal-btn');
        if (closeBtn) closeBtn.addEventListener('click', () => passwordModal.classList.remove('active'));
        const form = passwordModal.querySelector('form');
        if (form) form.addEventListener('submit', (e) => {
            e.preventDefault();
            const cp = document.getElementById('current-password').value;
            const np = document.getElementById('new-password').value;
            fetch('http://localhost:3000/api/perfil/senha', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({currentPassword:cp, newPassword:np}) })
            .then(r => r.json()).then(d => { alert(d.message); passwordModal.classList.remove('active'); form.reset(); });
        });
    }

    // Delete
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if(confirm("Tem certeza?")) {
                const user = JSON.parse(sessionStorage.getItem('user'));
                fetch(`http://localhost:3000/api/perfil/${user.id}`, { method: 'DELETE' })
                .then(() => { sessionStorage.clear(); window.location.href = 'index.html'; });
            }
        });
    }
});