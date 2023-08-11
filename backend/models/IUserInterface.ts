import mongoose from 'mongoose'
import { Model } from 'mongoose'

export enum LoginType {
  CREDENTIALS = 'credentials',
  GOOGLE = 'google',
}

export interface IProfileLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  website?: string
}

export interface IUser extends mongoose.Document {
  username: string
  email: string
  password: string
  avatar: string
  loginTypes: LoginType
  myStories: mongoose.Types.ObjectId[]
  likedStories: mongoose.Types.ObjectId[]
  profileLinks: IProfileLinks
  date: Date
}

export interface IUserMethods extends Model<IUser> {
  comparePassword(password: string, callback: Function): Promise<Function>
}
