import express from "express"
import {
  loginController,
  verifyUserController,
  signUpController,
  getUsersAuthController
} from "../controllers/AuthController"
import authenticateMiddleware from "../middlewares/authenticate"
import verifyAccessFromEndpoint3 from "../middlewares/verifyAccessEndpoint"

const router = express.Router()

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Email y contraseña son requeridos
 *       401:
 *         description: Usuario ya existente
 *     tags:
 *       - Auth
 */

router.post("/signup", signUpController)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, con JWT de respuesta
 *       400:
 *         description: Email y contraseña son requeridos
 *       401:
 *         description: Credenciales inválidas o email no verificado
 *       500:
 *         description: Error interno del servidor
 *     tags:
 *       - Auth
 */

router.post("/login", loginController)

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verificar email
 *     parameters:
 *      - token: "Verification token"
 *        in: "query"
 *        name: token
 *        description: "Verification token"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: Usuario verificado
 *       400:
 *         description: Token inválido o ha expirado
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 *     tags:
 *       - Auth
 */
router.get("/verify", verifyUserController)

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Obtener usuarios con opciones de paginación, búsqueda y verificación
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página para paginación
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Tamaño de la página para paginación
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para búsqueda de usuarios por email (búsqueda no sensible a mayúsculas)
 *       - in: query
 *         name: isVerified
 *         schema:
 *           type: boolean
 *         description: Filtrar usuarios por estado de verificación (true o false)
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuarios no encontrados
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 */
router.get("/users", authenticateMiddleware, getUsersAuthController)

export default router
