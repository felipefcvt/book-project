# Books Project

Este é um projeto de busca e gerenciamento de livros favoritos, dividida em back-end (Node.js com TypeScript e Prisma ORM) e front-end (Next.js e TypeScript).

## Estrutura do Projeto

### Back-End (Node.js)

Linguagem: TypeScript

Servidor: Express.js

ORM: Prisma

API Externa: Google Books API

### Front-End (Next.js)

Linguagem: TypeScript

Framework: Next.js

Requisições HTTP: Axios

## Como usar

Clonar o Repositório: https://github.com/felipefcvt/book-project.git

## Instalação Backend

1. Navegue até a pasta do back-end: cd backend

2. Instale as dependências: npm install

3. Rode o comando npx prisma init.

3. crie o schema do prisma neste padrão:

model FavoriteBook {
  id          String   @id @default(uuid())
  title       String
  description String
  imageUrl    String
  createdAt   DateTime @default(now())
}

4. Configure o banco de dados no arquivo .env gerado pelo Prisma. .

5. Inicie o servidor de desenvolvimento: npm run dev

## Instalação Frontend

1. Navegue até a pasta do front-end: cd frontend

2. Instale as dependências: npm install

3. Inicie o servidor web de desenvolvimento: npm run dev

