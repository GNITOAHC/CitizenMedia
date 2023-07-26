import mongoose, { Schema, Types } from 'mongoose'
import bcrypt from 'bcrypt'

interface IToken {
  userId: Types.ObjectId
  email: string
  token: string
  createdAt: Date
}

const tokenSchema = new Schema<IToken>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 1800 }, // Expires in 30 minutes
})

tokenSchema.pre('save', async function (next: Function): Promise<void> {
  if (this.isNew) {
    const saltRounds = 10
    const hashedToken = await bcrypt.hash(this.token, saltRounds)
    this.token = hashedToken
  }
  next()
})

export default mongoose.model<IToken>('Token', tokenSchema)
