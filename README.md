# Dashboard Auth with JWT Front

> Front de autenticação para Dashboard utilizando JWT (JSON Web Tokens)

## Sobre o Projeto

Dashboard com sistema de autenticação seguro que consome a API backend para autenticar usuários e gerenciar tokens JWT.

## Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **[TypeScript](https://www.typescriptlang.org/)**
- **[React](https://react.dev/)** 
- **[TailwindCSS](https://tailwindcss.com/)**
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação

## Objetivo

Gerar o front da aplicação https://github.com/leonDenizard/auth-dashboard-back para visualizar a geração do JWT

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Backend em execução](https://github.com/leonDenizard/auth-dashboard-back)

## Instalação

```bash
# Clone este repositório
git clone https://github.com/leonDenizard/auth-dashboard-front.git

# Acesse a pasta do projeto
cd auth-dashboard-front

# Instale as dependências
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# API Backend
REACT_APP_API_URL=http://localhost:3000

# Ambiente
MODE=development
```

## Executando o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build
npm run build

# Preview da build
npm run preview
```

## Estrutura do Projeto

```
auth-dashboard-front/
├── src/
│   ├── components/      # Componentes React
│   ├── pages/          # Páginas da aplicação
│   ├── hooks/          # Hooks customizados
│   ├── contexts/       # Contextos (Auth, etc)
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Arquivo de entrada
├── public/             # Arquivos estáticos
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Funcionalidades

- Tela de login com validação React hook forms
- Armazenamento do token JWT (localStorage)
- Proteção de rotas privadas
- Redirecionamento automático
- Logout e limpeza de sessão
- Visualização do dashboard
- Interface responsiva com TailwindCSS

## Integração com Backend

Este frontend consome a API desenvolvida em: [link](https://github.com/leonDenizard/auth-dashboard-back)

### Endpoints Utilizados

**POST** `/login`

Autentica o usuário e recebe o token JWT.

**Request:**
```json
{
  "username": "dev",
  "password": "123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "101",
    "username": "dev"
  }
}
```

**GET** `/profile`

Retorna os dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer {seu_token}
```

**Response:**
```json
{
  "id": "101",
  "username": "dev",
  "email": "dev@example.com"
}
```

## Fluxo de Autenticação

1. Usuário acessa a tela de login
2. Insere credenciais (username e password)
3. Frontend envia requisição POST para `/auth/login`
4. Backend valida e retorna token JWT
5. Usuário acessa o dashboard
