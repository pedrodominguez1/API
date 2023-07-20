import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

/**
 * The `authenticateMiddleware` function is a TypeScript middleware that verifies the presence and
 * validity of an authentication token in the request header.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to send the response data, set response headers, and control the
 * response status code.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns The middleware function returns a response with an error message if certain conditions are
 * not met. If the token is not provided in the request headers, it returns a 401 status code with an
 * error message indicating that the authentication token was not provided. If the token is provided
 * but is invalid or expired, it returns a 401 status code with an error message indicating that the
 * authentication token is invalid or expired.
 */
const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verificar si el token esta en el header
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res
        .status(401)
        .json({ error: "Token de autenticación no proporcionado." })
    }

    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)

    if (decodedToken) next()
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token de autenticación inválido." })
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token de autenticación expirado." })
    } else {
      return res.status(500).json({ error: "Error de autenticación." })
    }
  }
}

export default authenticateMiddleware
