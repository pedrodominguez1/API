interface IUser {
  email: string
  password: string
  verificationToken: string
  isVerified: boolean
  createdAt: Date

  generateHash: (password: string) => string
  validPassword: (password: string) => boolean
}

export { IUser }
