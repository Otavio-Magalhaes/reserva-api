import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Reservation API',
    description: 'API documentation for managing reservations and tables',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './src/interfaces/routes/index.ts', 
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);

