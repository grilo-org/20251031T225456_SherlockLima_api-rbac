```markdown
# RBAC API – Node.js + TypeScript + Prisma + SQLite

API RESTful com controle de acesso baseado em funções (RBAC – Role-Based Access Control), desenvolvida com Node.js, TypeScript, Prisma ORM e SQLite. Focada em **boas práticas de arquitetura**, segurança com **JWT**, **SOLID**, e organização modular para escalabilidade.

---

## 📌 Funcionalidades

- ✅ Autenticação com JWT
- ✅ Controle de acesso com RBAC (roles e permissões)
- ✅ Criação e listagem de usuários
- ✅ Middleware de autenticação e autorização
- ✅ Prisma + SQLite para persistência
- ✅ Estrutura limpa: controller, service, repository, DTO, middleware

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

## 📁 Estrutura de Pastas

```

src/
├── modules/
│   ├── auth/
│   ├── users/  
├── shared/
│   ├── middlewares/
│   └── routes/
├── database/
│   └── connection.ts
├── server.ts
@types/
└── express/
└── index.d.ts

````

---

## ⚙️ Configuração

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/rbac-api.git
cd rbac-api
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=uma_senha_muito_segura
PORT=3333
```

### 4. Gere o client do Prisma

```bash
npx prisma generate
```

### 5. Execute as migrações (ou configure seed manual)

```bash
npx prisma migrate dev --name init
```

### 6. Inicie a API

```bash
npm run dev
```

---

## 🔐 Autenticação

Faça login com:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "senha123"
}
```

O token JWT deve ser usado nos endpoints protegidos:

```http
Authorization: Bearer <token>
```

---

## 🧪 Exemplos de Rotas

| Método | Rota            | Protegida | Descrição                      |
| ------ | --------------- | --------- | -------------------------------|
| POST   | /api/auth/login | ❌        | Login e geração de token JWT   |
| POST   | /api/users      | ❌        | Criação de novo usuário        |
| GET    | /api/users      | ✅        | Listagem (requer `list_users`) |

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

```
