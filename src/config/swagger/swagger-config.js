import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "GMS User service API",
          version: "0.1.0",
          description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
          termsOfService: "http://swagger.io/terms/",
          license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
          },
          version: "1.0.0",
          externalDocs: {
            description: "Find out more about Swagger",
            url: "http://swagger.io",
            },
          contact: {
            name: "Shadrach Adamu",
            url: "app.gamestar.exchange",
            email: "shadrach@gamestar.exchange",
          },
        },
        servers: [
          {
            url: "http://localhost:3003",
          },
        ],
        securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            scheme: "bearer",
            in: "header",
        },
    }
      },
    apis: [`${path.join(__dirname)}/../../../routes/*.js`],
  };

  export default options;