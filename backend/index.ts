import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
require('module-alias/register') // Required for module aliasing
const app = express()

/* Not sure if this is needed but too scared to remove it */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

mongoose
  .connect('mongodb://127.0.0.1:27017/CitizenMediaDB')
  .then(() => console.log('Connecting to MongoDB'))
  .catch((e) => {
    console.log(e)
  })

app.get('/', (_req, res) => {
  res.send('Hello World')
})

import { authRoute } from './routes'
app.use('/auth', authRoute)

import { storyRoute } from './routes'
import {jwt_protect} from './routes' // Require Headers Authorization
app.use('/story', jwt_protect, storyRoute)

app.listen(8080, () => {
  console.log('Listening on port 8080')
})