/**
 * ============================================================================
 *  MÓDULO DE LOGIN - NOVATECH TI
 * ============================================================================
 * Gerencia o formulário de login
 * - Validação de email e senha
 * - Autenticação de usuário
 * - Mensagens de feedback
 * - Redirecionamento após login
 * ============================================================================
 */

(() => {
    // ========== ELEMENTOS DO DOM ==========
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const btnLogin = document.getElementById("btn-login");
    const btnLimpar = document.getElementById("btn-limpar");
    const messageEl = document.getElementById("login-message");

    // ========== REGEX PARA VALIDAÇÃO ==========
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Define mensagem de feedback para o usuário
     * @param {string} text - Texto da mensagem
     * @param {string} kind - Tipo: 'error' ou 'success'
     */
    function setMessage(text, kind) {
        if (!messageEl) return;
        messageEl.textContent = text || "";
        if (kind) messageEl.dataset.kind = kind;
        else delete messageEl.dataset.kind;
    }

    function clearMessage() {
        setMessage("", "");
    }

    function validate() {
        const email = (emailInput?.value || "").trim();
        const senha = (senhaInput?.value || "").trim();

        if (!email) {
            setMessage("Informe o e-mail.", "error");
            return false;
        }

        if (!emailRegex.test(email)) {
            setMessage("Informe um e-mail válido.", "error");
            return false;
        }

        if (!senha) {
            setMessage("Informe a senha.", "error");
            return false;
        }

        return true;
    }

    function handleLogin() {
        if (!emailInput || !senhaInput || !btnLogin) return;

        if (!validate()) return;

        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        const result = window.Auth?.authenticate?.(email, senha);

        if (!result || !result.success) {
            setMessage(result?.message || 'E-mail ou senha inválidos.', 'error');
            return;
        }

        window.Auth?.login?.(email);

        const successText = 'Login realizado com sucesso.';
        setMessage(successText, 'success');
        alert(successText);

        window.location.href = 'index.html';
    }

    function handleClear() {
        if (!emailInput || !senhaInput) return;
        emailInput.value = "";
        senhaInput.value = "";
        clearMessage();
        emailInput.focus();
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (!emailInput || !senhaInput || !btnLogin || !btnLimpar) return;

        clearMessage();
        emailInput.focus();

        btnLogin.addEventListener("click", (e) => {
            e.preventDefault?.();
            handleLogin();
        });

        btnLimpar.addEventListener("click", (e) => {
            e.preventDefault?.();
            handleClear();
        });

        // Permite pressionar Enter para submeter.
        emailInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") btnLogin.click();
        });
        senhaInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") btnLogin.click();
        });
    });
})();

