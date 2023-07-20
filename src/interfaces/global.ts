export interface CustomError {
  statusCode: number
  message: string
}

export interface MailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

export interface MailResponse {
  messageId: string
  envelope: { from: string; to: string[] }
  accepted: string[]
  rejected: string[]
  pending: string[]
  response: string
}

export interface UserQuery {
  email?: RegExp
  isVerified?: boolean
}
