import express from 'express'
import { User } from '@/models'
import { jwt_protect } from './auth.utils' // Require Headers Authorization
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/index'
const router = express.Router()

interface DecodedToken {
  id: string
}
router.get('/profile-links', jwt_protect, async (req, res) => {
  const token = (req.headers.authorization as string).split(' ')[1]
  console.log('hitted')
  return jwt.verify(token, JWT_SECRET, async (_err, decoded) => {
    decoded = decoded as DecodedToken
    const user = await User.findOne({ _id: decoded.id })
    if (!user) return res.status(200).send({ error: 'User not found' })
    console.log(user.profileLinks)
    return res.status(200).send({ profileLinks: user.profileLinks })
  })
})

router.post('/profile-links', jwt_protect, async (req, res) => {
  /*
   * req.body = {
   *  facebook: 'https://facebook.com/username',
   *  twitter: 'https://twitter.com/username',
   *  instagram: 'https://instagram.com/username',
   *  linkedin: '', // Empty string to remove the link
   * }
   */
  const token = (req.headers.authorization as string).split(' ')[1]
  return jwt.verify(token, JWT_SECRET, async (_err, decoded) => {
    decoded = decoded as DecodedToken
    const user = await User.findOne({ _id: decoded.id })
    if (!user) return res.status(200).send({ error: 'User not found' })
    console.log(req.body)
    user.profileLinks = { ...user.profileLinks, ...req.body }

    let k: keyof typeof user.profileLinks
    for (k in user.profileLinks)
      if (user.profileLinks[k] === '') user.profileLinks[k] = undefined

    await user.save()
    return res.status(200).send({ profileLinks: user.profileLinks })
  })
})

export default router
