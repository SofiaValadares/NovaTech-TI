(() => {
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const senhaConfirmarInput = document.getElementById("senha-confirmar");

    const btnTrocar = document.getElementById("btn-password");
    const btnLimpar = document.getElementById("btn-limpar");

    const messageEl = document.getElementById("trocarsenha-message");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const allowedSpecialRegex = /[@#$%&*!?\/\\|_\-\+\.=]/;
    // caracteres não permitidos na senha (lista do PDF)
    const disallowedSpecialRegex = /[¨{}[\]´`~^:;<>,"“‘]/;

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
        const senha = senhaInput?.value || "";
        const confirm = senhaConfirmarInput?.value || "";

        if (!email) {
            setMessage("Informe o e-mail.", "error");
            emailInput?.focus?.();
            return { ok: false, message: "Informe o e-mail." };
        }

        if (!emailRegex.test(email)) {
            setMessage("Informe um e-mail válido.", "error");
            emailInput?.focus?.();
            return { ok: false, message: "Informe um e-mail válido." };
        }

        if (!senha.trim()) {
            setMessage("Informe a senha.", "error");
            senhaInput?.focus?.();
            return { ok: false, message: "Informe a senha." };
        }

        if (!confirm.trim()) {
            setMessage("Informe a confirmação de senha.", "error");
            senhaConfirmarInput?.focus?.();
            return { ok: false, message: "Informe a confirmação de senha." };
        }

        if (!/^\S+$/.test(senha) && /\s/.test(senha)) {
            // não exigido no PDF; mantemos apenas para não permitir espaços em branco
            // sem bloquear digitadores comuns.
        }

        if (senha.length < 6) {
            const msg = "A senha deve ter pelo menos 6 caracteres.";
            setMessage(msg, "error");
            senhaInput?.focus?.();
            return { ok: false, message: msg };
        }

        if (!/\d/.test(senha)) {
            const msg = "A senha deve conter ao menos 1 número.";
            setMessage(msg, "error");
            senhaInput?.focus?.();
            return { ok: false, message: msg };
        }

        if (!/[A-Z]/.test(senha)) {
            const msg = "A senha deve conter ao menos 1 letra maiúscula.";
            setMessage(msg, "error");
            senhaInput?.focus?.();
            return { ok: false, message: msg };
        }

        if (!allowedSpecialRegex.test(senha)) {
            const msg = "A senha deve conter ao menos 1 caractere especial permitido.";
            setMessage(msg, "error");
            senhaInput?.focus?.();
            return { ok: false, message: msg };
        }

        if (disallowedSpecialRegex.test(senha)) {
            const msg = "A senha contém caracteres não permitidos.";
            setMessage(msg, "error");
            senhaInput?.focus?.();
            return { ok: false, message: msg };
        }

        // Confirmação igual à senha (regra implícita e comum para telas de troca de senha)
        if (confirm !== senha) {
            const msg = "A confirmação de senha deve ser igual à senha.";
            setMessage(msg, "error");
            senhaConfirmarInput?.focus?.();
            return { ok: false, message: msg };
        }

        return { ok: true, message: "" };
    }

    function handleTrocar() {
        if (!emailInput || !senhaInput || !senhaConfirmarInput) return;
        clearMessage();

        const result = validate();
        if (!result.ok) {
            alert(result.message);
            return;
        }

        const successText = "Validação realizada com sucesso";
        setMessage(successText, "success");
        alert(successText);

        // Navega para a página anterior após sucesso.
        window.history.back();
    }

    function handleClear() {
        if (!emailInput || !senhaInput || !senhaConfirmarInput) return;

        emailInput.value = "";
        senhaInput.value = "";
        senhaConfirmarInput.value = "";

        clearMessage();
        emailInput.focus();
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (!emailInput || !senhaInput || !senhaConfirmarInput) return;
        if (!btnTrocar || !btnLimpar) return;

        clearMessage();
        emailInput.focus();

        btnTrocar.addEventListener("click", (e) => {
            e.preventDefault?.();
            handleTrocar();
        });

        btnLimpar.addEventListener("click", (e) => {
            e.preventDefault?.();
            handleClear();
        });

        emailInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") btnTrocar.click();
        });
        senhaInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") btnTrocar.click();
        });
        senhaConfirmarInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") btnTrocar.click();
        });
    });
})();

