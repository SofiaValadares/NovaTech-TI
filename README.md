# 🚀 NovaTech TI - Plataforma Web de Soluções Tecnológicas

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📋 Sobre o Projeto

**NovaTech TI** é uma plataforma web moderna desenvolvida como projeto acadêmico (AV1) que oferece soluções tecnológicas para usuários. O sistema inclui autenticação completa, gerenciamento de solicitações de serviços, e uma interface responsiva e intuitiva.

### ✨ Principais Características

- ✅ **Sistema de Autenticação Completo** - Login, cadastro e troca de senha
- ✅ **Gerenciamento de Solicitações** - Criar, visualizar e deletar solicitações de serviço
- ✅ **Persistência de Dados** - Armazenamento local com localStorage
- ✅ **Interface Responsiva** - Design adaptável para diferentes tamanhos de tela
- ✅ **Design Moderno** - Componentes reutilizáveis e estilos padronizados
- ✅ **Segurança Básica** - Hash de senhas com btoa() e proteção de rotas

---

## 📁 Estrutura do Projeto

```
novatech-ti/
├── index.html                 # Página inicial (pública)
├── login.html                 # Página de login (pública)
├── cadastro.html              # Página de cadastro (pública)
├── trocarsenha.html           # Página de troca de senha (pública)
├── servicos.html              # Página de solicitações (protegida)
│
├── components/
│   ├── header.html            # Componente do cabeçalho
│   └── footer.html            # Componente do rodapé
│
├── css/
│   ├── variables.css          # Variáveis CSS globais
│   ├── global.css             # Estilos globais
│   └── components/
│       ├── header.css         # Estilos do header
│       └── footer.css         # Estilos do footer
│   └── pages/
│       ├── home.css           # Estilos da página inicial
│       ├── login.css          # Estilos da página de login
│       ├── cadastro.css       # Estilos da página de cadastro
│       ├── trocarsenha.css    # Estilos da página de troca de senha
│       └── servicos.css       # Estilos da página de serviços
│
├── js/
│   ├── auth.js                # Módulo de autenticação
│   ├── main.js                # Script principal
│   └── pages/
│       ├── login.js           # Lógica da página de login
│       ├── cadastro.js        # Lógica da página de cadastro
│       ├── trocarsenha.js     # Lógica da página de troca de senha
│       └── servicos.js        # Lógica da página de serviços
│
└── assets/
    ├── imagens/               # Imagens do projeto
    └── logo/                  # Logo da empresa
```

---

## 🔐 Autenticação

### Usuário Padrão (Testes)

```
Email: admin@novatech.com
Senha: Admin@123
```

### Como Funciona

1. **localStorage** armazena dados de usuários em JSON
2. **Senhas** são criptografadas com `btoa()` (Base64)
3. **Sessão** é mantida com flags: `isLoggedIn`, `userEmail`
4. **Rotas protegidas** redirecionam para login se não autenticado

### Fluxo de Autenticação

```
Página -> Verifica isLoggedIn() -> Não? -> Redireciona para login.html
                              ↓ Sim
                    Carrega dados do usuário
```

---

## 📄 Páginas do Projeto

### 1️⃣ **index.html** - Página Inicial
- **Status**: Pública
- **Conteúdo**:
  - Apresentação da empresa NovaTech TI
  - Carrossel de imagens
  - Video do YouTube
  - Seção de serviços oferecidos
- **Arquivos associados**: `css/pages/home.css`, logo no header

### 2️⃣ **login.html** - Login
- **Status**: Pública
- **Funcionalidade**:
  - Campo de email (validação)
  - Campo de senha
  - Botões: Entrar, Limpar
  - Mensagens de erro/sucesso
- **Arquivo associado**: `js/pages/login.js`
- **Validações**:
  - Email válido (regex)
  - Senha não vazia
  - Credenciais corretas

### 3️⃣ **cadastro.html** - Cadastro de Usuário
- **Status**: Pública
- **Campos Obrigatórios**:
  - ✓ Nome completo
  - ✓ CPF (com validação de dígito verificador)
  - ✓ Email (com regex)
  - ✓ Senha (com requisitos: 6+ caracteres, número, maiúscula, caractere especial)
  - ✓ Confirmação de senha
  - ✓ Data de nascimento (validação de maioria de idade: 18+)
  - ✓ Telefone (formatação automática)
  - ✓ Estado civil
  - ✓ Escolaridade
- **Arquivo associado**: `js/pages/cadastro.js`
- **Validações**: Extensas (CPF, email, senha, idade, etc.)

### 4️⃣ **trocarsenha.html** - Troca de Senha
- **Status**: Pública
- **Funcionalidade**:
  - Campo de email
  - Campo de nova senha (com requisitos)
  - Campo de confirmação de senha
  - Botões: Trocar, Limpar
  - Validações de senha idênticas ao cadastro
- **Arquivo associado**: `js/pages/trocarsenha.js`

### 5️⃣ **servicos.html** - Solicitações de Serviço
- **Status**: **PROTEGIDA** (apenas usuários logados)
- **Seções**:
  - 👤 **Informações do Usuário**: Nome e email exibidos
  - 📋 **Histórico de Solicitações**: Tabela com 7 colunas
    - Data
    - ID da solicitação
    - Tipo de serviço
    - Status
    - Preço
    - Prazo de conclusão
    - Ação (deletar)
  - ➕ **Nova Solicitação**: Formulário para criar solicitação
    - Dropdown de seleção de serviço
    - Preço atualizado dinamicamente
    - Prazo calculado automaticamente
    - Status sempre "EM ELABORAÇÃO"
- **Arquivo associado**: `js/pages/servicos.js`

---

## 💰 Serviços Disponíveis

| Serviço | Preço | Prazo |
|---------|-------|-------|
| 🛠️ Suporte Técnico | R$ 150,00 | 1 dia |
| 💻 Desenvolvimento de Sistemas | R$ 2.500,00 | 14 dias |
| 📊 Consultoria em TI | R$ 800,00 | 5 dias |
| 🔧 Manutenção Preventiva | R$ 300,00 | 3 dias |
| 🔒 Segurança da Informação | R$ 1.200,00 | 7 dias |

---

## 🎨 Design System

### Cores Principais

```css
--primary-color:      #1E3A5F   /* Azul escuro */
--secondary-color:    #4DA8DA   /* Azul claro */
--accent-color:       #66D9E8   /* Ciano */
--text-dark:          #333333   /* Texto escuro */
--text-light:         #FFFFFF   /* Texto claro */
--background-dark:    #1E3A5F   /* Fundo escuro */
--border-color:       #E0E0E0   /* Borda cinza */
```

### Espaçamentos

```css
--spacing-xs:    4px
--spacing-sm:    8px
--spacing-md:    16px
--spacing-lg:    24px
--spacing-xl:    32px
```

### Tipografia

```css
--font-main:     Arial, sans-serif
--font-title:    Poppins, sans-serif
```

---

## 🔧 Tecnologias Utilizadas

### Frontend
- **HTML5** - Markup semântico
- **CSS3** - Grid, Flexbox, Custom Properties
- **JavaScript (Vanilla)** - Sem frameworks
- **Material Icons** - Ícones vetoriais

### Armazenamento
- **localStorage** - Persistência local
- **JSON** - Serialização de dados

### Segurança (Básica)
- **btoa()** - Hash de senhas em Base64
- **Input validation** - Validação no cliente
- **Route guarding** - Proteção de rotas

---

## 📱 Responsividade

O projeto é responsivo e se adapta a diferentes tamanhos de tela:

- 📱 **Mobile** (< 768px)
- 💻 **Tablet** (768px - 1024px)
- 🖥️ **Desktop** (> 1024px)

---

## 🚀 Como Usar

### 1. Abrir o Projeto
```bash
# Abrir index.html em um navegador
# Ou usar um servidor local (Live Server, Python, etc.)
```

### 2. Primeiros Passos

**Para testar com usuário padrão:**
1. Vá para a página de login
2. Use: `admin@novatech.com` / `Admin@123`
3. Clique em "Entrar"
4. Você será redirecionado para a home (logado)
5. Clique em "Solicitar Serviços" para acessar a página protegida

**Para criar novo usuário:**
1. Vá para a página de "Cadastro"
2. Preencha todos os campos (validações automáticas)
3. Clique em "Cadastrar"
4. Você será automaticamente logado

### 3. Alterar Senha
1. Vá para "Trocar Senha"
2. Digite seu email
3. Digite a nova senha (com requisitos)
4. Confirme a senha
5. Clique em "Trocar"

### 4. Solicitar Serviços (Logado)
1. Clique em "Solicitar Serviços" no menu
2. Visualize suas informações pessoais
3. Selecione um serviço no dropdown
4. O preço e prazo são atualizados automaticamente
5. Clique em "Adicionar Solicitação"
6. Sua solicitação aparece na tabela
7. Você pode deletar clicando em "Deletar"

---

## 🔍 Validações Implementadas

### Email
- ✓ Formato válido (regex)
- ✓ Unicidade (não pode repetir)

### Senha
- ✓ Mínimo 6 caracteres
- ✓ Pelo menos 1 número
- ✓ Pelo menos 1 letra maiúscula
- ✓ Pelo menos 1 caractere especial permitido
- ✓ Sem caracteres especiais proibidos

### CPF
- ✓ Formato correto (XXX.XXX.XXX-XX)
- ✓ Dígitos verificadores válidos
- ✓ Sem sequências repetidas (111.111.111-11)

### Data de Nascimento
- ✓ Usuário deve ter 18 anos ou mais

### Telefone
- ✓ Formatação automática (XX) XXXXX-XXXX

---

## 📝 Comentários no Código

Todo o código foi documentado com comentários explicativos:

### JavaScript
```javascript
/**
 * ============================================================================
 *  MÓDULO DE AUTENTICAÇÃO - NOVATECH TI
 * ============================================================================
 * [Descrição do módulo]
 */
```

### CSS
```css
/**
 * ============================================================================
 *  ESTILOS DO HEADER - NOVATECH TI
 * ============================================================================
 * [Descrição dos estilos]
 */
```

### Seções
```javascript
// ========== DESCRIÇÃO DA SEÇÃO ==========
// Comentários explicativos
```

---

## 🐛 Debugging

### localStorage

Para inspecionar dados armazenados, abra o DevTools (F12) e execute:

```javascript
// Ver todos os usuários
JSON.parse(localStorage.getItem('novatech_users'))

// Ver usuário atual
localStorage.getItem('novatech_current_user')

// Verificar se está logado
localStorage.getItem('isLoggedIn')

// Limpar tudo (cuidado!)
localStorage.clear()
```

### Console

Para testar funções no console:

```javascript
// Buscar usuário
Auth.findUserByEmail('admin@novatech.com')

// Verificar login
Auth.isLoggedIn()

// Obter usuário atual
Auth.getCurrentUser()
```

---

## 🎓 Aprendizados Técnicos

Este projeto demonstra:

- ✔️ **Validação de formulários** - Regex, validação de CPF, idade
- ✔️ **Autenticação local** - Login, logout, proteção de rotas
- ✔️ **Manipulação do DOM** - Seleção, inserção, remoção de elementos
- ✔️ **Armazenamento persistente** - localStorage, JSON
- ✔️ **Componentes reutilizáveis** - Header, Footer dinâmicos
- ✔️ **Design responsivo** - Mobile-first, media queries
- ✔️ **Variáveis CSS** - Tema consistente, fácil manutenção
- ✔️ **Eventos de entrada** - Keypress, click, change
- ✔️ **Formatação de dados** - Números, datas, CPF, telefone

---

## 📊 Fluxo de Navegação

```
index.html (Home)
├── Não logado:
│   ├── → login.html (Login)
│   └── → cadastro.html (Cadastro)
│
├── Logado:
│   ├── → index.html (Home - pode deslogar)
│   └── → servicos.html (Solicitações)
│
trocarsenha.html (Sempre acessível)
└── Usuários logados ou não logados
```

---

## 🔒 Segurança

⚠️ **Nota Importante**: Este é um projeto educacional. Para produção:

- Use hashing apropriado (bcrypt, Argon2)
- Implemente HTTPS
- Use backend seguro para autenticação
- Valide no servidor (não apenas cliente)
- Implemente CSRF protection
- Use JWT ou session cookies

---

## 📞 Contato e Suporte

**NovaTech TI**
- 📧 Email: contato@novatech.com
- 📱 WhatsApp: (11) 91234-5678
- 📍 Endereço: São Paulo, SP - Brasil

---

## 📄 Licença

Este projeto é fornecido como está para fins educacionais.

---

## ✅ Checklist de Implementação

- ✅ 5 páginas HTML funcionais
- ✅ Sistema de autenticação completo
- ✅ Validação de formulários extensiva
- ✅ Gerenciamento de solicitações de serviço
- ✅ Componentes reutilizáveis (header, footer)
- ✅ CSS modularizado e organizado
- ✅ Variáveis CSS para tema consistente
- ✅ localStorage para persistência
- ✅ Design responsivo
- ✅ Material Icons para UI
- ✅ Comentários em todo o código
- ✅ README completo

---

**Desenvolvido com ❤️ para AV1 - 2026**
