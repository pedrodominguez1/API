import express from "express"
import authRoutes from "./authRoutes"
import businessRoutes from "./businessRoutes"

const router = express.Router()

// Rutas para el servicio de Autenticación
router.use("/auth", authRoutes)

// Rutas para el servicio de Negocio
router.use("/business", businessRoutes)

export default router
