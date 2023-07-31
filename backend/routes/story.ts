import express from 'express'
import { User, Story } from '@/models'
const router = express.Router()

router.use((_req, _res, next) => {
  console.log('Story route')
  next()
})

router.post('/create', async (req, res) => {
  /*
   * req.body = {
   *  email: string,
   *  content: string,
   *  title: string,
   *  subTitle: string,
   *  tags: string[],
   * }
   */
  const email = req.body.email
  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).send('User not found')
  const newStory = new Story({
    author: user.username,
    authorId: user._id,
    content: req.body.content,
    title: req.body.title,
    subTitle: req.body.subTitle,
    createdAt: Date.now(),
    comments: [],
    tags: req.body.tags,
  })

  try {
    await newStory.save()
  } catch (err) {
    return res.status(500).send(err)
  }

  return res.status(200).send('Story created')
})

router.post('/comment', async (req, res) => {
  /*
   * req.body = {
   * id: Types.ObjectId, // The id of the story
   * comment: string,
   * email: string, // The email of the commenter
   * }
   */
  const email = req.body.email
  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).send('User not found')

  const id = req.body.id
  const story = await Story.findOne({ _id: id })
  if (!story) return res.status(400).send('Story not found')
  const comment_body = {
    comment: req.body.comment,
    date: Date.now(),
    commenter: user.username,
    commenterId: user._id,
  }
  try {
    await story.updateOne({ $push: { comments: comment_body } })
  } catch (err) {
    console.log(err)
  }
  return res.status(200).send('Comment added')
})

export default router
