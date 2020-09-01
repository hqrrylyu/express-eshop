import User from '../models/user.mjs'

export default async function user (req, res, next) {
  if (req.session && req.session.userId) {
    req.user = await User.findByPk(req.session.userId)
  }
  next()
}
