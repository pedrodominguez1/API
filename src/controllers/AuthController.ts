import { Request, Response } from "express"
import { signUp, login, verify } from "../services/AuthService"
import axios from "axios"

export const signUpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body
  try {
    const user = await signUp(email, password)
    res.status(201).json(user)
  } catch (error: any) {
    // console.error(error)
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al crear el usuario" })
  }
}

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body
  try {
    const userJWT = await login(email, password)
    res
      .status(201)
      .json({ token: userJWT, message: "Usuario logueado correctamente" })
  } catch (error: any) {
    console.error(error)
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al loguear el usuario" })
  }
}

export const verifyUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query
  try {
    const response = await verify(token as string)
    res.status(200).json({ response })
  } catch (error: any) {
    console.error(error)
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al verificar el usuario" })
  }
}

export const getUsersAuthController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtener el token JWT del header de la request
    const token = req.header("Authorization")?.replace("Bearer ", "")

    // Convertir req.query en un objeto plano con claves y valores
    const queryParams = Object.entries(req.query).reduce(
      (params, [key, value]) => {
        params.append(key, value as string)
        return params
      },
      new URLSearchParams()
    )

    const users = await axios.get(
      `http://localhost:${process.env.PORT}/api/business/users?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Origin: `Endpoint_3`
        }
      }
    )
    if (users.data.length > 0) {
      res.status(200).json(users.data)
    } else {
      res.status(404).json({ message: "No se encontraron usuarios" })
    }
  } catch (error: any) {
    console.error(error)
    res
      .status(error.statusCode || 500)
      .json({ error: error.messsage || "Error al obtener los usuarios" })
  }
}
