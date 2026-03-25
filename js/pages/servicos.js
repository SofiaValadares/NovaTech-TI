(() => {
    const serviceSelect = document.getElementById('service-select');
    const servicePriceOutput = document.getElementById('service-price');
    const serviceDeadlineOutput = document.getElementById('service-deadline');
    const serviceDateOutput = document.getElementById('service-date');
    const serviceStatusOutput = document.getElementById('service-status');
    const btnAddRequest = document.getElementById('btn-add-request');
    const requestsTable = document.getElementById('requests-tbody');
    const userNameOutput = document.getElementById('user-name');
    const userEmailOutput = document.getElementById('user-email');
    const messageEl = document.getElementById('servicos-message');

    const services = {
        suporte: { name: 'Suporte Técnico', price: 150, deadline: 1 },
        desenvolvimento: { name: 'Desenvolvimento de Sistemas', price: 2500, deadline: 14 },
        consultoria: { name: 'Consultoria em TI', price: 800, deadline: 5 },
        manutencao: { name: 'Manutenção Preventiva', price: 300, deadline: 3 },
        seguranca: { name: 'Segurança da Informação', price: 1200, deadline: 7 }
    };

    let requestCounter = 3;  // começa a contar a partir de 003

    function setMessage(text, kind) {
        if (!messageEl) return;
        messageEl.textContent = text || '';
        if (kind) messageEl.dataset.kind = kind;
        else delete messageEl.dataset.kind;
    }

    function clearMessage() {
        setMessage('', '');
    }

    function loadUserInfo() {
        const currentUser = window.Auth?.getCurrentUser?.();
        if (currentUser) {
            userNameOutput.textContent = currentUser.nome || 'Usuário';
            userEmailOutput.textContent = currentUser.email || '';
        }
    }

    function formatDate(days) {
        const d = new Date();
        d.setDate(d.getDate() + days);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function updateServiceDetails() {
        const selected = serviceSelect.value;
        if (!selected || !services[selected]) {
            servicePriceOutput.textContent = 'R$ 0,00';
            serviceDeadlineOutput.textContent = '-- dias';
            serviceDateOutput.textContent = '--/--/----';
            return;
        }

        const service = services[selected];
        servicePriceOutput.textContent = `R$ ${service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        serviceDeadlineOutput.textContent = `${service.deadline} dia${service.deadline > 1 ? 's' : ''}`;
        serviceDateOutput.textContent = formatDate(service.deadline);
    }

    function formatPrice(price) {
        return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function addRequestToTable() {
        const selected = serviceSelect.value;
        if (!selected || !services[selected]) {
            setMessage('Selecione um serviço válido', 'error');
            alert('Selecione um serviço válido');
            return;
        }

        const service = services[selected];
        requestCounter++;
        const rowNum = String(requestCounter).padStart(3, '0');
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const todayFormatted = `${day}/${month}/${year}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${todayFormatted}</td>
            <td>${rowNum}</td>
            <td>${service.name}</td>
            <td>EM ELABORAÇÃO</td>
            <td>${formatPrice(service.price)}</td>
            <td>${formatDate(service.deadline)}</td>
            <td><button class="btn-delete" data-row="${rowNum}">Deletar</button></td>
        `;

        requestsTable.appendChild(tr);

        setMessage('Solicitação adicionada com sucesso!', 'success');

        // reset form
        serviceSelect.value = '';
        updateServiceDetails();
        clearMessage();
        setTimeout(() => clearMessage(), 3000);
    }

    function deleteRow(event) {
        if (event.target.classList.contains('btn-delete')) {
            const row = event.target.closest('tr');
            if (row) {
                row.remove();
                setMessage('Solicitação deletada com sucesso!', 'success');
                setTimeout(() => clearMessage(), 3000);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadUserInfo();
        serviceStatusOutput.textContent = 'EM ELABORAÇÃO';

        if (serviceSelect) {
            serviceSelect.addEventListener('change', updateServiceDetails);
        }

        if (btnAddRequest) {
            btnAddRequest.addEventListener('click', (e) => {
                e.preventDefault?.();
                addRequestToTable();
            });
        }

        if (requestsTable) {
            requestsTable.addEventListener('click', deleteRow);
        }
    });
})();
