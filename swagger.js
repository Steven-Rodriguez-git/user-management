import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json'; 
const endpointsFiles = ['./src/index.js']; 

const doc = {
  info: {
    version: "1.0.0",
    title: "Mi API",
    description: "Documentación generada automáticamente con swagger-autogen."
  },
  host: "localhost:4000",
  basePath: "/",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

const swaggerAutogenExec = swaggerAutogen();
swaggerAutogenExec(outputFile, endpointsFiles, doc).then(() => {
  console.log('Documento Swagger generado!');
});