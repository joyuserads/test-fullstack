
const express = require('express');
const usuarioRoutes = require('./routers/usuarioRoutes');

const app = express();

require('dotenv').config()

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

app.use('/api/usuarios', usuarioRoutes);

app.use((req, res, next) => {
  req.db = db; // passa o banco para uso em qualquer rota
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    console.log('Documentação Swagger http://localhost:3000/api-docs')
});


