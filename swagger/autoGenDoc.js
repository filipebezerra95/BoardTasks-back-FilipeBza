const mongooseToSwagger = require('mongoose-to-swagger');
//const EsquemaTarefa = require('../src/models/tarefa.js');
//const EsquemaUsuario = require('../src/models/usuario.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-br',
});

const outputFile = './swagger_output.json';
const endpointsFiles = ['../index.js', '../src/routes.js'];

let doc = {
    info: {
        version: "1.0.0",
        title: "API do BoardTasks",
        description: "Documentação da APÌ do BoardTasks."
    },
    servers: [
        {
            url: "http://localhost:4000/",
            description: "servidor localhost."
        },
        {
            url: "https://boardtasks-back.vercel.app",
            descripption: "Servidor de Produção."
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    /*components: {
        schemas: {
            Usuario: mongooseToSwagger(EsquemaUsuario),
            Tarefa: mongooseToSwagger(EsquemaTarefa),
        }
    }*/
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: "+ outputFile);
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
})