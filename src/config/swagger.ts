import { SwaggerOptions } from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

/* The `swaggerOptions` constant is an object that defines the configuration options for generating the
Swagger documentation. */
const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Conexa API",
      version: "1.0",
      contact: {
        name: "Pedro Dominguez",
        url: "https://example.com/",
        email: "pedrodominguez50@gmail.com"
      }
    },
    servers: [
      {
        url:
          process.env.API_ENV === "production"
            ? "https://productionServer.com"
            : `http://localhost:${process.env.PORT || "8080"}/`,
        description:
          process.env.API_ENV === "production"
            ? "Production server"
            : "Local server"
      }
    ],
    // Agrega el objeto "components" para configurar la seguridad con JWT
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./dist/routes/*.js", "./dist/models/schemas/*.js"]
}

const uiOpts = {
  customSiteTitle: "Conexa API",
  customfavIcon: "/assets/favicon.ico",
  customCss: ".swagger-ui .topbar { display: none }"
}

const specs = swaggerJsDoc(swaggerOptions)

export { specs, uiOpts }
