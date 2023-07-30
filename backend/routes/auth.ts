import express from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import crypto from 'crypto'
import { User, LoginType, Token } from '@/models'
import { sendMail, resetPassword } from './auth.utils'

const router = express.Router()

/* foundUser = {
 * username: string,
 * email: string,
 * password: string,
 * loginTypes: LoginType
 * }
 */

// Check for environment variables
const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET || JWT_SECRET == '') {
  throw new Error('JWT_SECRET not defined')
}

router.post('/google', async (req, res) => {
  async function check(id_token: string) {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`
      )
      if (data['email_verified'] == 'true') {
        console.log('Email verified')
        const foundUser = await User.findOne({ email: data['email'] })
        if (!foundUser) {
          /* Create new user if not found */
          try {
            const newUser = new User({
              username: data['name'],
              email: data['email'],
              loginTypes: LoginType.GOOGLE,
            })
            newUser.save()
          } catch (err) {
            console.log(err)
          }
        }

        const jwt_token = jwt.sign(
          {
            name: data['name'],
            email: data['email'],
            image: data['picture'],
          },
          JWT_SECRET,
          { expiresIn: '180d' } // 180 days
        )
        return {
          user: {
            email: data['email'],
            name: data['name'],
            image: data['picture'],
            jwt_token: jwt_token,
          },
        }
      } else {
        /* console.log('Email not verified') */
        return null
      }
    } catch (error) {
      /* console.log(error) */
      return null
    }
  }

  check(req.body.id_token).then((resp) => res.status(200).send(resp))
})

router.post('/credentials', async (req, res) => {
  /* Check if user exists in database */
  let foundUser = await User.findOne({ email: req.body.email })

  if (!foundUser) {
    return res.status(401).send({ message: 'User does not exist' })
  }
  foundUser = foundUser! // Make foundUser not-null explicitly (Prevent TS error)

  /* Check if password matches */
  foundUser.comparePassword(req.body.password, (err: Error, isMatch: any) => {
    if (err) {
      return res.status(500).send({ message: 'Error comparing password' })
    }
    if (!isMatch) {
      return res.status(401).send({ message: 'Password does not match' })
    }

    /* Create JWT token */
    const jwt_token = jwt.sign(
      { name: foundUser?.username, email: foundUser?.email },
      JWT_SECRET,
      { expiresIn: '180d' } // 180 days
    )
    return res.status(200).send({
      name: foundUser?.username,
      email: foundUser?.email,
      jwt_token: jwt_token,
    })
  })
})

router.post('/register', async (req, res) => {
  /* Check if user exists in database */
  let foundUser = await User.findOne({ email: req.body.email })
  if (foundUser) {
    return res.status(401).send({ message: 'User already exists' })
  }
  foundUser = foundUser! // Make foundUser not-null explicitly (Prevent TS error)

  /* Create new user */
  /*
   * req.body = {
   *  username: string,
   *  email: string,
   *  password: string
   * }
   */
  try {
    const newUser = new User({ ...req.body, loginTypes: LoginType.CREDENTIALS })
    newUser.save()
    return res.status(200).send({ message: 'User created' })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Error creating user' })
  }
})

router.get('/verify', (req, res) => {
  const token = (req.headers.authorization as string).split(' ')[1]
  jwt.verify(token, JWT_SECRET, (err, _decoded) => {
    if (err) {
      /* console.log(err) */
      if (err.name == 'TokenExpiredError') {
        console.log('Token expired')
      }
      return res.send({ verified: false })
    } else {
      return res.send({ verified: true })
    }
  })
})

router.post('/forget-password', async (req, res) => {
  /*
   * req.body = {
   * email: string
   * }
   */
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(404).send({ message: 'User not found' })
  let token = await Token.findOne({ userId: user._id })
  if (token) await token.deleteOne() // Delete existing token if exists

  let resetToken = crypto.randomBytes(32).toString('hex')
  await new Token({
    userId: user._id,
    email: user.email,
    token: resetToken,
    createdAt: Date.now(),
  }).save()
  const link = `http://localhost:3000/reset-pass?token=${resetToken}&id=${user._id}`
  await sendMail(user.email, `Please reset your password here ${link}`)
  return res.status(200).send({ resetToken: resetToken, id: user._id })
})

router.post('/reset-password', async (req, res) => {
  /* resetPassword(id, password, token) */
  const result = await resetPassword(
    req.body.id,
    req.body.password,
    req.body.token
  )
  if (result.error) return res.status(500).send({ message: result.error })
  res.status(200).send({ message: result.message })
})

export default router
