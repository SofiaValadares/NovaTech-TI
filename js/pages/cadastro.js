(() => {
    const nomeInput = document.getElementById("nome");
    const cpfInput = document.getElementById("cpf");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const senhaConfirmarInput = document.getElementById("senha-confirmar");
    const dataNascimentoInput = document.getElementById("data-nascimento");
    const telefoneInput = document.getElementById("telefone");
    const estadoCivilEls = document.querySelectorAll('input[name="estado-civil"]');
    const escolaridadeSelect = document.getElementById("escolaridade");

    const btnCadastrar = document.getElementById("btn-cadastrar");
    const btnLimpar = document.getElementById("btn-limpar");
    const btnVoltar = document.getElementById("btn-voltar");

    const messageEl = document.getElementById("cadastro-message");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const allowedSpecialChars = ["@", "#", "$", "%", "&", "*", "!", "?", "/", "\\", "|", "-", "_", "+", ".", "="];
    const disallowedSpecialChars = ["¨", "{", "}", "[", "]", "´", "`", "~", "^", ":", ";", "<", ">", ",", "“", "‘"];

    const allowedSpecialRegex = /[@#$%&*!?\/\\|_\-\+\.=]/;
    const disallowedSpecialRegex = /[¨{}[\]´`~^:;<>,"“‘]/;

    const defaultEstadoCivil = "solteiro(a)";
    const defaultEscolaridade = "2º grau completo";

    function setMessage(text, kind) {
        if (!messageEl) return;
        messageEl.textContent = text || "";
        if (kind) messageEl.dataset.kind = kind;
        else delete messageEl.dataset.kind;
    }

    function alertAndSetMessage(text, kind) {
        setMessage(text, kind);
        alert(text);
    }

    function clearMessage() {
        setMessage("", "");
    }

    function getEstadoCivilSelecionado() {
        for (const el of estadoCivilEls) {
            if (el.checked) return el.value;
        }
        return "";
    }

    function setErrorOnInputs(inputs) {
        const list = Array.isArray(inputs) ? inputs : [inputs].filter(Boolean);
        for (const input of list) {
            const inputEl = input;
            if (!inputEl || !inputEl.classList) continue;
            inputEl.classList.add("error");
        }
    }

    function clearErrorOnInputs() {
        const list = [nomeInput, cpfInput, emailInput, senhaInput, senhaConfirmarInput, dataNascimentoInput, telefoneInput, escolaridadeSelect];
        for (const el of list) {
            if (el && el.classList) el.classList.remove("error");
        }
    }

    function formatCpf(value) {
        const digits = (value || "").replace(/\D/g, "").slice(0, 11);
        const part1 = digits.slice(0, 3);
        const part2 = digits.slice(3, 6);
        const part3 = digits.slice(6, 9);
        const part4 = digits.slice(9, 11);

        if (digits.length <= 3) return part1;
        if (digits.length <= 6) return `${part1}.${part2}`;
        if (digits.length <= 9) return `${part1}.${part2}.${part3}`;
        return `${part1}.${part2}.${part3}-${part4}`;
    }

    function formatPhone(value) {
        const digits = (value || "").replace(/\D/g, "").slice(0, 11);

        const ddd = digits.slice(0, 2);
        const rest = digits.slice(2);

        if (!ddd) return "";
        if (digits.length <= 2) return `(${ddd}`;

        if (digits.length === 10) {
            // (DD) XXXX-XXXX
            const p1 = rest.slice(0, 4);
            const p2 = rest.slice(4, 8);
            return `(${ddd}) ${p1}-${p2}`;
        }

        if (digits.length >= 11) {
            // (DD) XXXXX-XXXX
            const p1 = rest.slice(0, 5);
            const p2 = rest.slice(5, 9);
            return `(${ddd}) ${p1}-${p2}`;
        }

        // Parciais (ainda não completou 10/11 dígitos)
        return `(${ddd}) ${rest}`;
    }

    function validateCpf(value) {
        const raw = (value || "").trim();
        const maskRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!maskRegex.test(raw)) return false;

        const digits = raw.replace(/\D/g, "");
        if (digits.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(digits)) return false; // evita CPF com todos dígitos iguais

        const calcDigit = (baseDigits, weights) => {
            let sum = 0;
            for (let i = 0; i < baseDigits.length; i++) {
                sum += Number(baseDigits[i]) * weights[i];
            }
            const remainder = (sum * 10) % 11;
            return remainder === 10 ? 0 : remainder;
        };

        const base1 = digits.slice(0, 9);
        const d1 = calcDigit(base1, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
        if (d1 !== Number(digits[9])) return false;

        const base2 = digits.slice(0, 10);
        const d2 = calcDigit(base2, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
        return d2 === Number(digits[10]);
    }

    function parseDateFromInput(value) {
        if (!value) return null;
        // Input type="date" => YYYY-MM-DD. Fixamos em "T00:00:00" para reduzir problemas de TZ.
        const d = new Date(`${value}T00:00:00`);
        return Number.isNaN(d.getTime()) ? null : d;
    }

    function validateAdult(ageBirthDate) {
        const birth = ageBirthDate;
        if (!birth) return false;
        const now = new Date();
        const adultDate = new Date(birth);
        adultDate.setFullYear(adultDate.getFullYear() + 18);
        return now >= adultDate;
    }

    function validatePhone(phone) {
        const raw = (phone || "").trim();
        if (!raw) return true; // opcional

        const digits = raw.replace(/\D/g, "");
        // aceita DDD + 8 ou 9 dígitos (10 ou 11 dígitos)
        return digits.length === 10 || digits.length === 11;
    }

    function validatePasswordComposition(password) {
        const pw = (password || "").trim();
        if (!pw) return { ok: false, message: "Informe a senha." };
        if (pw.length < 6) return { ok: false, message: "A senha deve ter pelo menos 6 caracteres." };
        if (!/\d/.test(pw)) return { ok: false, message: "A senha deve conter ao menos 1 número." };
        if (!/[A-Z]/.test(pw)) return { ok: false, message: "A senha deve conter ao menos 1 letra maiúscula." };
        if (!allowedSpecialRegex.test(pw)) return { ok: false, message: "A senha deve conter ao menos 1 caractere especial permitido." };
        if (disallowedSpecialRegex.test(pw)) return { ok: false, message: "A senha contém caracteres não permitidos." };
        return { ok: true, message: "" };
    }

    function validatePasswordConfirmation(password, confirmation) {
        const pwRaw = password ?? "";
        const confirmRaw = confirmation ?? "";
        const confirmTrim = String(confirmRaw).trim();

        if (!confirmTrim) return { ok: false, message: "Informe a confirmação de senha." };

        // Comparar exatamente o que foi digitado (sem trim),
        // para evitar falso "match" por espaços no começo/fim.
        if (String(confirmRaw) !== String(pwRaw)) {
            return { ok: false, message: "A confirmação de senha deve ser igual à senha." };
        }

        return { ok: true, message: "" };
    }

    function validateName(name) {
        const n = (name || "").trim();
        if (!n) return { ok: false, message: "Informe o nome." };

        const words = n.split(/\s+/).filter(Boolean);
        if (words.length < 2) return { ok: false, message: "O nome deve ter pelo menos duas palavras." };
        if (words[0].length < 2) return { ok: false, message: "A primeira palavra do nome deve ter pelo menos 2 caracteres." };

        const specialSet = new Set([...allowedSpecialChars, ...disallowedSpecialChars]);
        for (const ch of n) {
            if (specialSet.has(ch)) {
                return { ok: false, message: "O nome não pode conter caracteres especiais." };
            }
        }

        return { ok: true, message: "" };
    }

    function validateEmail(email) {
        const e = (email || "").trim();
        if (!e) return { ok: false, message: "Informe o e-mail." };
        if (!emailRegex.test(e)) return { ok: false, message: "Informe um e-mail válido." };
        return { ok: true, message: "" };
    }

    function validateAll() {
        clearErrorOnInputs();
        clearMessage();

        const nome = nomeInput?.value;
        const cpf = cpfInput?.value;
        const email = emailInput?.value;
        const senha = senhaInput?.value;
        const senhaConfirmar = senhaConfirmarInput?.value;
        const dataNascimento = dataNascimentoInput?.value;
        const telefone = telefoneInput?.value;
        const estadoCivil = getEstadoCivilSelecionado();
        const escolaridade = escolaridadeSelect?.value;

        // Nome
        const nomeVal = validateName(nome);
        if (!nomeVal.ok) {
            setErrorOnInputs(nomeInput);
            return nomeVal.message;
        }

        // CPF
        if (!cpf) {
            setErrorOnInputs(cpfInput);
            return "Informe o CPF.";
        }
        if (!validateCpf(cpf)) {
            setErrorOnInputs(cpfInput);
            return "Informe um CPF válido no formato NNN.NNN.NNN-NN.";
        }

        // Email
        const emailVal = validateEmail(email);
        if (!emailVal.ok) {
            setErrorOnInputs(emailInput);
            return emailVal.message;
        }

        // Senha (regras)
        const senhaVal = validatePasswordComposition(senha);
        if (!senhaVal.ok) {
            setErrorOnInputs(senhaInput);
            return senhaVal.message;
        }

        // Confirmação
        const confirmVal = validatePasswordConfirmation(senha, senhaConfirmar);
        if (!confirmVal.ok) {
            setErrorOnInputs(senhaConfirmarInput);
            senhaConfirmarInput?.focus?.();
            return confirmVal.message;
        }

        // Data de nascimento / maioridade
        const birthDate = parseDateFromInput(dataNascimento);
        if (!birthDate) {
            setErrorOnInputs(dataNascimentoInput);
            return "Informe a data de nascimento.";
        }
        if (!validateAdult(birthDate)) {
            setErrorOnInputs(dataNascimentoInput);
            return "O cliente deve ser maior de idade (>= 18 anos).";
        }

        // Telefone (opcional)
        if (!validatePhone(telefone)) {
            setErrorOnInputs(telefoneInput);
            return "Informe um telefone nacional válido (DDD + número).";
        }

        // Estado civil (sempre haverá default, mas validamos)
        if (!estadoCivil) {
            return "Selecione o estado civil.";
        }

        // Escolaridade (sempre haverá default, mas validamos)
        if (!escolaridade) {
            return "Selecione a escolaridade.";
        }

        return "";
    }

    function handleClear() {
        if (!emailInput || !senhaInput || !senhaConfirmarInput) return;

        nomeInput.value = "";
        cpfInput.value = "";
        emailInput.value = "";
        senhaInput.value = "";
        senhaConfirmarInput.value = "";
        dataNascimentoInput.value = "";
        telefoneInput.value = "";

        // Reseta radio e select para defaults
        for (const el of estadoCivilEls) {
            el.checked = el.value === defaultEstadoCivil;
        }
        if (escolaridadeSelect) escolaridadeSelect.value = defaultEscolaridade;

        clearMessage();
        clearErrorOnInputs();
        emailInput.focus();
    }

    function handleCadastrar() {
        if (!btnCadastrar) return;
        const errorMessage = validateAll();
        if (errorMessage) {
            setMessage(errorMessage, "error");
            alert(errorMessage);
            return;
        }

        const userData = {
            nome: nomeInput.value.trim(),
            cpf: cpfInput.value.trim(),
            email: emailInput.value.trim(),
            senha: senhaInput.value,
            dataNascimento: dataNascimentoInput.value,
            telefone: telefoneInput.value.trim(),
            estadoCivil: getEstadoCivilSelecionado(),
            escolaridade: escolaridadeSelect.value
        };

        const result = window.Auth?.registerUser?.(userData);
        if (!result || !result.success) {
            setMessage(result?.message || 'Falha no cadastro.', 'error');
            alert(result?.message || 'Falha no cadastro.');
            return;
        }

        setMessage(result.message, 'success');
        alert(result.message);

        window.location.href = 'index.html';
    }

    function handleBack() {
        window.history.back();
    }

    function attachMaskCpf() {
        if (!cpfInput) return;
        cpfInput.addEventListener("input", () => {
            cpfInput.value = formatCpf(cpfInput.value);
        });
        cpfInput.addEventListener("blur", () => {
            // se usuário deixou incompleto, mantém valor mas valida depois
            cpfInput.value = formatCpf(cpfInput.value);
        });
        cpfInput.addEventListener("keydown", (e) => {
            // Mantém o usuário apenas com digitos/básicos para reduzir sujeira
            const isControlKey = e.ctrlKey || e.metaKey || e.altKey;
            if (isControlKey) return;

            const allowedKeys = [
                "Backspace",
                "Delete",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "End"
            ];
            if (allowedKeys.includes(e.key)) return;

            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });
    }

    function attachMaskPhone() {
        if (!telefoneInput) return;

        telefoneInput.addEventListener("input", () => {
            telefoneInput.value = formatPhone(telefoneInput.value);
        });

        telefoneInput.addEventListener("keydown", (e) => {
            const isControlKey = e.ctrlKey || e.metaKey || e.altKey;
            if (isControlKey) return;

            const allowedKeys = [
                "Backspace",
                "Delete",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "End"
            ];
            if (allowedKeys.includes(e.key)) return;

            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });

        telefoneInput.addEventListener("blur", () => {
            telefoneInput.value = formatPhone(telefoneInput.value);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (!nomeInput || !cpfInput || !emailInput || !senhaInput || !senhaConfirmarInput) return;

        clearMessage();
        clearErrorOnInputs();
        emailInput.focus();

        attachMaskCpf();
        attachMaskPhone();

        if (btnCadastrar) btnCadastrar.addEventListener("click", (e) => {
            e.preventDefault?.();
            handleCadastrar();
        });

        if (btnLimpar) btnLimpar.addEventListener("click", (e) => {
            e.preventDefault?.();
            handleClear();
        });

        if (btnVoltar) btnVoltar.addEventListener("click", (e) => {
            e.preventDefault?.();
            handleBack();
        });
    });
})();

