import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
require('module-alias/register') // Required for module aliasing
const app = express()

/* Not sure if this is needed but too scared to remove it */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

/* Use this when running on docker */
mongoose
  .connect('mongodb://mongo:27017/CitizenMediaDB', {
    authSource: 'admin',
    user: 'root',
    pass: 'rootpassword',
  })
  .then(() => console.log('Connecting to MongoDB'))
  .catch((e) => {
    console.log(e)
  })

/* Use this when running on localhost */
/* mongoose */
/*   .connect('mongodb://127.0.0.1:27017/CitizenMediaDB') */
/*   .then(() => console.log('Connecting to MongoDB')) */
/*   .catch((e) => { */
/*     console.log(e) */
/*   }) */

/* Get the JWT_SECRET from the .env file and export it */
import 'dotenv/config'
export const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET || JWT_SECRET == '') {
  throw new Error('JWT_SECRET not defined')
}

app.get('/', (_req, res) => {
  res.send('Hello World')
})

import axios from 'axios'
app.get('/check-image-service', async (_req, res) => {
  const response = await axios.get('http://image-service:80')
  res.send(response.data)
})

import { authRoute } from './routes'
app.use('/auth', authRoute)

import { storyRoute } from './routes'
app.use('/story', storyRoute)

import { userRoute } from './routes'
app.use('/user', userRoute)

app.listen(8080, () => {
  console.log('Listening on port 8080')
})
