export default swaggerDef = {
    info: {
    title: 'API Documentation', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'API documentation description', // Description (optional)
    },
    apis: ['./src/routes/*.js'] //change this according to path where your code lies
    };