import mongoose from 'mongoose'
import { Model } from 'mongoose'

export enum LoginType {
  CREDENTIALS = 'credentials',
  GOOGLE = 'google',
}

export interface IUser extends mongoose.Document {
  username: string
  email: string
  password: string
  loginTypes: LoginType
  myStories: mongoose.Types.ObjectId[]
  likedStories: mongoose.Types.ObjectId[]
  date: Date
}

export interface IUserMethods extends Model<IUser> {
  comparePassword(password: string, callback: Function): Promise<Function>
}
