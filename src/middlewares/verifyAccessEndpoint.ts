import { Request, Response, NextFunction } from "express"

/**
 * The function verifies if the request originates from Endpoint 3 and allows access to the next
 * middleware function, otherwise it returns a 403 error.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to set the response status code, headers, and body. In this code
 * snippet, it is used to send a 403 Forbidden response with a JSON body containing an error message if
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 */
const verifyAccessFromEndpoint3 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.origin == "Endpoint_3") {
    next()
  } else {
    // Si no proviene del Endpoint 3, prohibimos el acceso al endpoint 4
    res.status(403).json({ error: "Acceso prohibido a este endpoint" })
  }
}

export default verifyAccessFromEndpoint3
