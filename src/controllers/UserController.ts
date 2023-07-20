import { Request, Response } from "express"
import { getUsers } from "../services/UserService"

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtener los parámetros de busqueda y paginacion
    const { page, pageSize, search, isVerified } = req.query

    const isVerifiedBoolean =
      isVerified === "true" ? true : isVerified === "false" ? false : undefined

    const users = await getUsers({
      page: Number(page),
      pageSize: Number(pageSize),
      search: search as string,
      isVerified: isVerifiedBoolean
    })

    res.status(200).json(users)
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error al obtener los usuarios" })
  }
}
