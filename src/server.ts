import express from "express"
import cors from "cors"
import { serve, setup } from "swagger-ui-express"
import connectToDatabase from "./config/database"
import { specs, uiOpts } from "./config/swagger"
import router from "./routes"
const app = express()
const port = parseInt(process.env.PORT ?? "8080", 10)

connectToDatabase()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", router)
app.use("/assets", express.static("assets"))
app.use("/", serve, setup(specs, uiOpts))

app.listen(port, "0.0.0.0", () => {
  console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", port)
})
