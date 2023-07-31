import mongoose, { Schema, Types } from 'mongoose'

interface IComment {
  comment: string
  date: Date
  commenter: string
  commenterId: Types.ObjectId
}

interface IStory {
  author: string
  authorId: Types.ObjectId
  content: string
  title: string
  subTitle: string
  createdAt: Date
  comments: Types.DocumentArray<IComment>
  tags: Types.Array<string>
}

const storySchema = new Schema<IStory>({
  author: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  title: { type: String, required: true },
  subTitle: { type: String },
  createdAt: { type: Date, default: Date.now, required: true },
  comments: [
    {
      comment: { type: String, required: true },
      date: { type: Date, required: true },
      commenter: { type: String, required: true },
      commenterId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  tags: [{ type: String }],
})

export default mongoose.model<IStory>('Story', storySchema)
