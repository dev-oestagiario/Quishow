# QuiShow

Plataforma para aprender Química de forma divertida e prática.

## Tecnologias
 - Node.js (Express)
 - MySQL (pool de conexões)
 - JavaScript puro (frontend)
 - EJS (views)
 - Padrão MVC

## Como rodar

1. Instale as dependências:
	```bash
	npm install
	```
2. Configure o banco de dados MySQL e ajuste o arquivo `.env`.
3. Inicie o servidor:
	```bash
	npm run dev
	```
4. Acesse: http://localhost:3000

## Estrutura inicial
 - `src/app.js`: app principal Express
 - `src/config/db.js`: conexão pool MySQL
 - `src/controllers/`: lógica de cada página
 - `src/models/`: acesso ao banco
 - `src/routes/`: rotas Express
 - `src/views/`: templates EJS
 - `src/public/`: arquivos estáticos (css, js, imagens)

## Próximos passos
 - Implementar rotas e controllers para as páginas do wireframe
 - Criar models para usuários, experimentos, posts, etc.
 - Adicionar autenticação e gamificação

---

Wireframe completo no briefing do projeto.
# Quishow