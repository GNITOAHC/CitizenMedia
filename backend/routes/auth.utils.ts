import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import { User, Token } from '@/models'

const MAIL_HOST = process.env.MAIL_HOST
const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS = process.env.MAIL_PASS

export async function sendMail(email: string, content: string): Promise<void> {
  const config = {
    service: MAIL_HOST,
    port: 465,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  }
  const transporter = nodemailer.createTransport(config)
  const options = () => {
    return {
      from: 'virtualbazaar.22.08@gmail.com',
      to: email,
      subject: 'Hello ✔',
      html: `<p>${content}</p>`,
    }
  }
  transporter.sendMail(options(), (error, _info) => {
    if (error) {
      console.log(error)
    } else {
      /* console.log(info) */
      /* console.log('Email sent: ' + info.response) */
    }
  })

  return
}

export async function resetPassword(
  id: string,
  password: string,
  token: string
) {
  const user = await Token.findOne({ userId: id })
  if (!user) return { error: 'User not found' }

  const isValid = await bcrypt.compare(token, user.token as string)
  if (!isValid) return { error: 'Token is invalid' }

  password = await bcrypt.hash(password, 10)
  await User.updateOne({ _id: id }, { $set: { password: password } })

  console.log(user)
  await sendMail(user.email, 'Your password has been reset')
  await user.deleteOne()

  return { message: 'Password reset successfully' }
}

import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/index'
export function jwt_protect(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log('Checking JWT')
  if (!req.headers.authorization)
    return res.send({ message: 'No token provided', verified: false })

  const token = (req.headers.authorization as string).split(' ')[1]
  jwt.verify(token, JWT_SECRET, (err, _decoded) => {
    if (err) {
      /* console.log(err) */
      if (err.name == 'TokenExpiredError') {
        console.log('Token expired')
      }
      return res.send({ verified: false })
    } else {
      next()
    }
  })
}
