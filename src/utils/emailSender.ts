import nodemailer, { TransportOptions } from "nodemailer"
import { MailOptions, MailResponse } from "../interfaces/global"

/**
 * The function `sendMail` is an asynchronous function that sends an email using nodemailer and logs
 * the message ID if successful.
 * @param {MailOptions} options - The `options` parameter is an object that contains the following
 * properties:
 */
const sendMail = async (options: MailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "",
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASSWORD || ""
    }
  } as TransportOptions)

  const mailOptions = {
    from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
    ...options
  }

  try {
    const info = (await transporter.sendMail(mailOptions)) as MailResponse
    console.log(`Message sent to ${mailOptions.to}: ${info.messageId}`)
  } catch (error) {
    console.error(error)
  }
}

export { sendMail, MailOptions }
