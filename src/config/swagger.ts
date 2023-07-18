import { SwaggerOptions } from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

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
    ]
  },
  apis: ["./dist/routes/api/*.js", "./dist/models/*.js"]
}

const uiOpts = {
  customSiteTitle: "Conexa API",
  customfavIcon: "/assets/favicon.ico",
  customCss: ".swagger-ui .topbar { display: none }"
}

const specs = swaggerJsDoc(swaggerOptions)

export { specs, uiOpts }
