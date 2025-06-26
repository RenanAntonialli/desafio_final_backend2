# Servidor Express SQL

## Requisitos

- Node.js 18+
- MySQL

## Instalação

```bash
git clone <repo>
cd Servidor-Express-SQL
cp .env.example .env
npm install
```

Preencha o `.env` conforme seu ambiente.

## Banco de Dados

Crie o banco e execute o script `models/schema.sql` no MySQL.

## Rodar Projeto

```bash
npm start
```

Acesse [http://localhost:3000](http://localhost:3000)

## Endpoints

- `GET /` - Mensagem de boas-vindas
- CRUD `/clientes` (autenticado)
- CRUD `/produtos` (público)
- POST `/usuarios` - cria usuário
- GET `/usuarios` - lista usuários (autenticado)
- POST `/login` - retorna token JWT
- POST `/logout` - invalida token

## Testes

Execute:

```bash
npm test
```

## Observações

- Cache de clientes: 30s, com logs no terminal.
- Usuários precisam de JWT para acessar `/clientes`.
- Senhas são hasheadas (bcrypt).
- Veja o código em `controllers/`, `services/`, etc.