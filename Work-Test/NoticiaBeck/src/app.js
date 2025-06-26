
const express = require('express');
const app = express();

// Middleware para permitir o uso de req.body com JSON
app.use(express.json());

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../src/docs/swagger.js');

//banco 
const db = require('./database/db.js');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec )); // SWAGGER

//Rotas
const noticiaController = require('./controllers/noticiaController.js');
app.use('/',noticiaController);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação Swagger http://localhost:3000/api-docs')
});


