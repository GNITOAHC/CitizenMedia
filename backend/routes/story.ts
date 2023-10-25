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

router.post('/retrieve-by-id', async (req, res) => {
  /*
   * req.body = {
   *  _id: string, // The id of the Story
   * }
   */
  try {
    const story = await Story.findOne({ _id: req.body._id })
    if (!story) return res.status(400).send('Story not found')
    return res.status(200).send(story)
  } catch (err) {
    console.log(err)
    return res.status(200).send('Story not found')
  }
})

interface DecodedToken {
  id: string
}
router.get('/retrieve', jwt_protect, async (req, res) => {
  const token = (req.headers.authorization as string).split(' ')[1]
  return jwt.verify(token, JWT_SECRET, async (_err, decoded) => {
    decoded = decoded as DecodedToken
    const id = decoded.id
    const user = await User.findOne({ _id: id })
    if (!user) return res.status(400).send('User not found')
    const stories = await Story.find({ _id: { $in: user.myStories } })
    return res.status(200).send(stories)
  })
})

router.post('/like', jwt_protect, async (req, res) => {
  /*
   * req.body = {
   *  storyId: string, // The id of the Story
   *  userId: string, // The id of the User
   * }
   */
  const likedBefore = await User.countDocuments({
    _id: req.body.userId,
    likedStories: { $in: [req.body.storyId] },
  })
  if (likedBefore === 1) {
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { likedStories: req.body.storyId } },
      { returnOriginal: false }
    )
    res.status(200).send('Unlike success')
  } else {
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { likedStories: req.body.storyId } },
      { returnOriginal: false }
    )
    res.status(200).send('Like success')
  }
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

  return res
    .status(200)
    .send({ message: 'Story created', newStoryId: newStory._id })
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

router.get('/retrieve-eight', async (_req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 }).limit(8)
  if (!stories) return res.status(200).send({ message: 'Stories not found' })
  /* console.log(stories) */
  return res.status(200).send(stories)
})

export default router
