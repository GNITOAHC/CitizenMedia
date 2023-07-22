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
  date: Date
}

export interface IUserMethods extends Model<IUser> {
  comparePassword(password: string, callback: Function): Promise<Function>
}
