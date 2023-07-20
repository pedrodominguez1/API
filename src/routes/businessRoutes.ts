import express from "express"
import { getUsersController } from "../controllers/UserController"
import authenticateMiddleware from "../middlewares/authenticate"
import verifyAccessFromEndpoint3 from "../middlewares/verifyAccessEndpoint"

const router = express.Router()

router.get(
  "/users",
  authenticateMiddleware,
  verifyAccessFromEndpoint3,
  getUsersController
)

export default router
