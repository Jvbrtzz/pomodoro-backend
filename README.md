# Pomodoro Backend

Back-end do aplicativo **Pomodoro**, desenvolvido em **Node.js + TypeScript** utilizando **Fastify**. Este projeto serve como base de estudos e evolução técnica, com foco em boas práticas de back-end, arquitetura, autenticação e integração com o front-end.

---

##  Objetivos do Projeto

Este projeto está **em desenvolvimento** e tem como principais objetivos:

* **Implementar Swagger**

  * Documentar todas as rotas da API
  * Facilitar testes e integração com o front-end

* **Adicionar um Chatbot**

  * Explorar integrações com IA ou fluxos automatizados
  * Usar como apoio ao usuário ou controle do Pomodoro

* **Sistema de Autenticação**

  * Autenticação baseada em **Access Token (JWT)**
  * Proteção de rotas

* **OIDC com GitHub (futuro)**
  * Login social utilizando GitHub (OpenID Connect)
  * Objetivo de aprendizado e evolução técnica

* **Aprendizado contínuo**

  * Aplicar conceitos de validação (Zod)
  * Organização de código
  * Boas práticas com TypeScript

---

## Stack Utilizada

* **Node.js**
* **TypeScript**
* **Fastify**
* **MySQL**
* **Zod** (validação de dados)
* **dotenv** (variáveis de ambiente)

---

## Estrutura do Projeto (resumida)

```bash
pomodoro-backend/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── interface/   
│   └── model/
│   └── settings/

├── dist/
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---

## Pré-requisitos

Antes de iniciar, você precisa ter instalado:

* **Node.js** (versão 18+ recomendada)
* **npm** ou **yarn**
* **MySQL**

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=pomodoro
JWT_SECRET=sua_chave_secreta
```

> Não versionar o `.env`. Certifique-se de adicioná-lo ao `.gitignore`.

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

---

### 2️⃣ Rodar em modo desenvolvimento

Compila o TypeScript em modo watch e executa o servidor:

```bash
npm run dev
```

---

### 3️⃣ Build do projeto

```bash
npm run build
```

---

### 4️⃣ Rodar em produção

```bash
npm run start
```

---

### 5️⃣ Rodar em ambiente de QA

```bash
npm run start-qa
```

---

## Scripts Disponíveis

| Script     | Descrição                 |
| ---------- | ------------------------- |
| `dev`      | Desenvolvimento com watch |
| `build`    | Compila o TypeScript      |
| `start`    | Executa o build           |
| `start-qa` | Build + execução          |

---

## Status do Projeto
 **Em desenvolvimento**

Funcionalidades ainda estão sendo implementadas e podem sofrer mudanças frequentes.

---

## Próximos Passos

* [ ] Swagger (Fastify Swagger)
* [ ] Autenticação JWT
* [ ] Refresh Token
* [ ] Login com GitHub (OIDC)
* [ ] Chatbot integrado
* [ ] Testes automatizados

---

Se quiser contribuir, sugerir melhorias ou trocar ideia sobre arquitetura, fique à vontade! 
