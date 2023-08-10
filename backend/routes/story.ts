import express from 'express'
import { User, Story } from '@/models'
import { jwt_protect } from './auth.utils' // Require Headers Authorization
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/index'
const router = express.Router()

router.use((_req, _res, next) => {
  console.log('Story route')
  next()
})

router.post('/retrieveById', async (req, res) => {
  /*
   * req.body = {
   *  id: string, // The id of the Story
   * }
   */
  const story = await Story.findOne({ _id: req.body.id })
  console.log(story)
  if (!story) return res.status(400).send('Story not found')
  return res.status(200).send(story)
})

router.post('/retrieve', jwt_protect, async (req, res) => {
  /*
   * req.body = {
   *  id: string, // The id of the user
   * }
   */
  console.log('Retrieving stories')
  console.log(req.body)
  const user = await User.findOne({ _id: req.body.id })
  if (!user) return res.status(400).send('User not found')
  console.log(user)
  const stories = await Story.find({ _id: { $in: user.myStories } })
  console.log(stories)
  res.status(200).send(stories)
})

router.post('/create', jwt_protect, async (req, res) => {
  /*
   * req.body = {
   *  id: string,
   *  content: string,
   *  title: string,
   *  subTitle: string,
   *  tags: string[],
   * }
   */
  const user = await User.findOne({ _id: req.body.id })
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

  user.myStories.push(newStory._id)
  await user.save()
  try {
    await newStory.save()
  } catch (err) {
    return res.status(500).send(err)
  }

  return res.status(200).send('Story created')
})

router.post('/comment', jwt_protect, async (req, res) => {
  /*
   * req.body = {
   * id: Types.ObjectId, // The id of the story
   * comment: string,
   * commenter_id: string, // The id of the commenter
   * }
   */
  const user = await User.findOne({ _id: req.body.commenter_id })
  if (!user) return res.status(400).send('User not found')

  const id = req.body.id
  const story = await Story.findOne({ _id: id })
  if (!story) return res.status(400).send('Story not found')
  const comment_body = {
    comment: req.body.comment,
    date: Date.now(),
    commenter: user.username,
    commenterId: req.body.commenter_id,
  }
  try {
    await story.updateOne({ $push: { comments: comment_body } })
  } catch (err) {
    console.log(err)
  }
  return res.status(200).send('Comment added')
})

export default router
