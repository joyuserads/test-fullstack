# Projeto Notícias
*Teste desenvolvedor fullstack*
- criar uma aplicação backend API Restfull (nodejs + express + SQLite) de cadastro de notícias (título, subtítulo, texto, URL da imagem)


- criar aplicação frontend (Nextjs ou reactjs) que costuma a lista de notícias exibido na tela principal (título, subtítulo e imagem) e na tela de detalhes (título, subtítulo, imagem e texto)
- documentar a API usando Swagger



Editor: VISUAL STUDIO CODE

Node Express
bibliotecas:
Nodemon

Ferramenta para ajudar nos testes de requisições
SWAGGER / POSTMAN

BANCO DADOS
SQLite


## Como rodar:

### Backend
1. Vá até a pasta `NoticiaBeck`
2. Rode `npm install`
3. Rode `npm run dev`

### Frontend
1. Vá até a pasta `Noticiafront`
2. Rode `npm install`
3. Rode `npm start`

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação Swagger http://localhost:3000/api-docs')
});

Eu criei um PORT 3001 para rodar FRONT 
