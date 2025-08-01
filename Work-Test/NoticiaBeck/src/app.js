
const express = require('express');

const app = express();

require('dotenv').config()

// Middleware para permitir o uso de req.body com JSON
app.use(express.json());

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../src/docs/swagger.js');
const port = process.env.PORT || 3000;


//banco 
const db = require('./database/db.js');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec )); // SWAGGER

//Rotas
const noticiaController = require('./controllers/noticiaController.js');
const usuarioController = require('./controllers/usuarioController.js');



app.use((req, res, next) => {
  req.db = db; // passa o banco para uso em qualquer rota
  next();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('Documentação Swagger http://localhost:3000/api-docs')
});


