import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

const swaggerDocument = yaml.load("./src/docs/api.yaml");
const swaggerSetup = [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];

export default swaggerSetup;

// Another Method of configuring Swagger
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "API Документація",
//       version: "1.0.0",
//       description: "Автоматично згенерована документація API",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//         description: "Для розробників",
//       },
//     ],
//   },
//   apis: [path.resolve("src/docs/*.yaml")],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// const swaggerSetup = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];

// export default swaggerSetup;
