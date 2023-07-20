import { User } from "../models/schemas/UserSchema"
import { IUser } from "../models/interfaces/User"
import jwt from "jsonwebtoken"
import { sendMail } from "../utils/emailSender"
import { CustomError } from "../interfaces/global"

export const signUp = async (
  email: string,
  password: string
): Promise<IUser> => {
  try {
    if (!email || !password) {
      const error: CustomError = {
        statusCode: 400,
        message: "Email y contraseña requeridos."
      }
      throw error
    }
    const trimmedEmail = email.trim().toLowerCase()

    const user = await User.findOne({
      email: trimmedEmail
    })
    if (user) {
      const error: CustomError = {
        statusCode: 401,
        message: "Una cuenta con este email ya existe."
      }
      throw error
    } else {
      // Generate verification token
      const verificationToken = jwt.sign(
        { email: trimmedEmail },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h"
        }
      )

      // Save the new user
      const newUser = new User()
      newUser.email = email
      newUser.password = newUser.generateHash(password)
      newUser.verificationToken = verificationToken

      await newUser.save()

      // Send verification email
      const mailOptions = {
        to: trimmedEmail,
        subject: "Verifique su email",
        text: `Por favor acceda al siguiente enlace para verificar su cuenta de correo: 
          ${process.env.API_URL}/api/auth/verify?token=${verificationToken}
          `
      }

      await sendMail(mailOptions)

      return newUser
    }
  } catch (error) {
    throw error
  }
}

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    // Check if email and password are provided
    if (!email || !password) {
      const error: CustomError = {
        statusCode: 400,
        message: "Email y contraseña requeridos."
      }
      throw error
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase().trim() })

    if (!user) {
      const error: CustomError = {
        statusCode: 401,
        message: "Email o contraseña invalidos."
      }
      throw error
    }

    // Compare hashed password
    const isPasswordValid = user.validPassword(password)
    if (!isPasswordValid) {
      const error: CustomError = {
        statusCode: 401,
        message: "Email o contraseña invalidos."
      }
      throw error
    }

    // Check if user has a verification token
    if (user.verificationToken) {
      const error: CustomError = {
        statusCode: 401,
        message: "Por favor verifica tu direccion de email."
      }
      throw error
    }

    const tokenJWT = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    )

    return tokenJWT
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const verify = async (token: string): Promise<string> => {
  try {
    const user = await User.findOne({ verificationToken: token })

    if (user && !user.isVerified) {
      user.isVerified = true
      user.verificationToken = ""
      await user.save()
      return "Email verificado, ahora podrás loguearte"
    }
    if (!user) {
      const error: CustomError = {
        statusCode: 400,
        message: "Token inválido o ha expirado."
      }
      throw error
    }

    return "Email no verificado. Por favor intente más tarde..."
  } catch (error) {
    throw error
  }
}
