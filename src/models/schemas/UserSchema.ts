import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { IUser } from "../interfaces/User"

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "jane.doe@example.com"
 *         password:
 *           type: string
 *           description: User's password
 *           example: "myPassword123"
 *         verificationToken:
 *           type: string
 *           description: Token for verifying the user email
 *           example: "abc1234"
 *         isVerified:
 *           type: boolean
 *           description: User is verified
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created
 *           example: "2023-04-19T15:45:00.000Z"
 */

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  verificationToken: {
    type: String,
    default: ""
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.methods.generateHash = function (password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

UserSchema.methods.validPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}

export const User = mongoose.model<IUser>("User", UserSchema)
