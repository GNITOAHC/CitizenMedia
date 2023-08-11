import mongoose, { Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, IUserMethods, LoginType } from './IUserInterface'

type UserModel = Model<IUser, {}, IUserMethods>

/* Remember to modify the interface in './IUserInterface.ts' */
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
  loginTypes: {
    type: String,
    required: true,
    enum: Object.values(LoginType),
  },
  myStories: {
    type: [Schema.Types.ObjectId],
    ref: 'Story',
  },
  likedStories: {
    type: [Schema.Types.ObjectId],
    ref: 'Story',
  },
  profileLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    website: { type: String },
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

userSchema.pre('save', async function (next: Function): Promise<void> {
  /* `this` represents the user document */
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10
    if (this.password !== undefined) {
      // Check if password is undefined
      const hashedPassword = await bcrypt.hash(this.password, saltRounds)
      this.password = hashedPassword
    }
  }
  next()
})

/* callback = (err: Error, isMatch: any) => {} */
userSchema.methods.comparePassword = async function (
  password: string,
  callback: Function
): Promise<Function> {
  let result
  try {
    result = await bcrypt.compare(password, this.password)
    return callback(null, result)
  } catch (err) {
    return callback(err, result)
  }
}

export default mongoose.model<IUser, UserModel>('User', userSchema)
