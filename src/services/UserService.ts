import { User } from "../models/schemas/UserSchema"
import { IUser } from "../models/interfaces/User"
import { UserQuery } from "../interfaces/global"

interface GetUsersOptions {
  page?: number
  pageSize?: number
  search?: string
  isVerified?: boolean
}

export const getUsers = async (options: GetUsersOptions): Promise<IUser[]> => {
  try {
    const { page, pageSize, search, isVerified } = options

    const query: UserQuery = {}
    if (search) {
      const searchRegex = new RegExp(search, "i") // Busqueda no sensitiva
      query.email = searchRegex
    }

    //Se agrega la opcion de buscar los usuarios verificado o no verificados
    if (typeof isVerified !== "undefined") {
      query.isVerified = isVerified
    }

    // Si 'page' y 'pageSize' están definidos, aplicamos paginación
    if (page && pageSize) {
      const skip = (page - 1) * pageSize
      const users = await User.find(query, {
        email: 1,
        isVerified: 1,
        _id: 0,
        createdAt: 1
      })
        .skip(skip)
        .limit(pageSize)

      return users
    } else {
      const users = await User.find(query, {
        email: 1,
        isVerified: 1,
        _id: 0,
        createdAt: 1
      })

      return users
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
