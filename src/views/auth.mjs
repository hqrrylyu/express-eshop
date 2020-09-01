import User from '../models/user.mjs'

export const signUp = {
  async get (req, res) {
    res.render('signUp', { pageTitle: 'Sign Up' })
  },

  async post (req, res) {
    const userData = { ...req.body, passwordHash: req.body.password }
    try {
      const user = await User.create(userData)
      console.log('User "%s" has been created.', user)
      return res.redirect('/')
    } catch (error) {
      console.error(error)
      return res.render('signUp', { pageTitle: 'Sign Up', error })
    }
  }
}
