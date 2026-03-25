(function(window){
    const STORAGE_USERS = 'novatech_users';
    const STORAGE_CURRENT = 'novatech_current_user';

    const DEFAULT_USER = {
        nome: 'Usuário Padrão',
        email: 'admin@novatech.com',
        senhaHash: btoa('Admin@123'),
        cpf: '000.000.000-00',
        dataNascimento: '1990-01-01',
        telefone: '(11) 91234-5678',
        estadoCivil: 'solteiro(a)',
        escolaridade: '2º grau completo'
    };

    function hashPassword(password) {
        return btoa(String(password));
    }

    function loadUsers() {
        try {
            const json = localStorage.getItem(STORAGE_USERS);
            if (!json) {
                return [];
            }
            const parsed = JSON.parse(json);
            if (!Array.isArray(parsed)) return [];
            return parsed;
        } catch {
            return [];
        }
    }

    function saveUsers(users) {
        try {
            localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
            return true;
        } catch {
            return false;
        }
    }

    function ensureDefaultUser() {
        const users = loadUsers();
        if (users.length === 0) {
            saveUsers([DEFAULT_USER]);
        } else {
            const found = users.some(u => String(u.email).toLowerCase() === String(DEFAULT_USER.email).toLowerCase());
            if (!found) {
                users.unshift(DEFAULT_USER);
                saveUsers(users);
            }
        }
    }

    function findUserByEmail(email) {
        if (!email) return null;
        const users = loadUsers();
        const normalized = String(email).trim().toLowerCase();
        return users.find(u => String(u.email).trim().toLowerCase() === normalized) || null;
    }

    function registerUser(user) {
        const email = String(user.email || '').trim().toLowerCase();
        const senha = String(user.senha || '');
        if (!email || !senha) {
            return { success: false, message: 'Email e senha são obrigatórios.' };
        }

        if (findUserByEmail(email)) {
            return { success: false, message: 'Já existe um usuário com esse email.' };
        }

        const users = loadUsers();
        const newUser = {
            nome: user.nome ? String(user.nome).trim() : '',
            email: email,
            senhaHash: hashPassword(senha),
            cpf: user.cpf || '',
            dataNascimento: user.dataNascimento || '',
            telefone: user.telefone || '',
            estadoCivil: user.estadoCivil || '',
            escolaridade: user.escolaridade || ''
        };
        users.push(newUser);
        if (!saveUsers(users)) {
            return { success: false, message: 'Não foi possível salvar usuário. Verifique o armazenamento local.' };
        }

        login(email);
        return { success: true, message: 'Cadastro realizado com sucesso.' };
    }

    function authenticate(email, senha) {
        const user = findUserByEmail(email);
        if (!user) return { success: false, message: 'Usuário não encontrado.' };

        const hashed = hashPassword(senha);
        if (user.senhaHash !== hashed) {
            return { success: false, message: 'Senha incorreta.' };
        }

        return { success: true, user };
    }

    function login(email) {
        try {
            localStorage.setItem(STORAGE_CURRENT, String(email).trim().toLowerCase());
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', String(email).trim().toLowerCase());
        } catch {
        }
    }

    function logout() {
        try {
            localStorage.removeItem(STORAGE_CURRENT);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
        } catch {
        }
    }

    function getCurrentUser() {
        const email = localStorage.getItem(STORAGE_CURRENT) || localStorage.getItem('userEmail');
        if (!email) return null;
        return findUserByEmail(email);
    }

    function isLoggedIn() {
        try {
            if (localStorage.getItem('isLoggedIn') === 'true' && getCurrentUser()) return true;
            return false;
        } catch {
            return false;
        }
    }

    function changePassword(email, newPassword) {
        const user = findUserByEmail(email);
        if (!user) return { success: false, message: 'Usuário não encontrado.' };
        if (!newPassword || newPassword.length < 6) return { success: false, message: 'Senha deve ter pelo menos 6 caracteres.' };

        const users = loadUsers();
        const index = users.findIndex(u => String(u.email).trim().toLowerCase() === String(email).trim().toLowerCase());
        if (index < 0) return { success: false, message: 'Usuário não encontrado.' };

        users[index].senhaHash = hashPassword(newPassword);
        saveUsers(users);
        return { success: true, message: 'Senha alterada com sucesso.' };
    }

    function guardRoutes() {
        const publicPages = ['index.html', 'login.html', 'cadastro.html', 'trocarsenha.html', ''];
        const page = window.location.pathname.split('/').pop().toLowerCase();

        if (isLoggedIn()) {
            if (page === 'login.html' || page === 'cadastro.html') {
                window.location.href = 'index.html';
            }
            return;
        }

        if (!publicPages.includes(page) && page !== 'servicos.html') {
            window.location.href = 'login.html';
        }
        
        if (page === 'servicos.html' && !isLoggedIn()) {
            window.location.href = 'login.html';
        }
    }

    function setupHeaderAuth(nav) {
        if (!nav) return;

        let logoutLink = nav.querySelector('#logout-link');
        if (!logoutLink) {
            logoutLink = document.createElement('a');
            logoutLink.id = 'logout-link';
            logoutLink.href = '#';
            logoutLink.innerHTML = '<span class="material-icons">logout</span>Sair';
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault();
                logout();
                window.location.href = 'login.html';
            });
            nav.appendChild(logoutLink);
        }

        if (isLoggedIn()) {
            logoutLink.style.display = '';
        } else {
            logoutLink.style.display = 'none';
        }
    }

    window.Auth = {
        ensureDefaultUser,
        registerUser,
        authenticate,
        login,
        logout,
        getCurrentUser,
        isLoggedIn,
        guardRoutes,
        setupHeaderAuth,
        changePassword
    };

    ensureDefaultUser();
})(window);
