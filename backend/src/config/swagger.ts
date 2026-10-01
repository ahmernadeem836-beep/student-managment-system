import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Student Management API',
      version: '1.0.0',
      description: 'REST API for the Student Management System'
    },

    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },

  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts'
  ]
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);