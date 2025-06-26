// Importa o pacote 'swagger-jsdoc', que permite gerar a especificação do Swagger a partir de comentários JSDoc
const swaggerJsDoc = require('swagger-jsdoc');

// Define as opções de configuração para gerar a documentação Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info:{
            title: 'Api de Cadastro de Noticias',
            version: '1.0.0',
            description: 'Documentação com Swagger', // Descrição que aparecerá no topo da documentação
        }
    },
     apis: [__dirname + '/../controllers/*.js'], // caminho ABSOLUTO resolvido corretamente
      // Exemplo de comentário esperado nos arquivos: 
      // /**
      //  * @swagger
      //  * /noticias:
      //  *   get:
      //  *     summary: Lista todas as notícias
      //  *     responses:
      //  *       200:
      //  *         description: Lista retornada com sucesso
      //  */

};  

// Gera a especificação Swagger com base nas opções definidas acima
const swaggerSpec = swaggerJsDoc(options);

// Exporta o objeto 'swaggerSpec' para que possa ser usado na configuração do Swagger UI no seu app
module.exports = swaggerSpec;
