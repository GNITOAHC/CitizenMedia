import mongoose from 'mongoose'
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI as string

const db = mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connecting to MongoDB'))
  .catch((e) => {
    console.log(e)
  })

/* const db = mongoose */
/*   .connect('mongodb://127.0.0.1:27017/CitizenMediaDB') */
/*   .then(() => console.log('Connecting to MongoDB')) */
/*   .catch((e) => { */
/*     console.log(e) */
/*   }) */

export default db
