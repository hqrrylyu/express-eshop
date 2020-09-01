import User from '../models/user.mjs'

export const signUp = {
  async get (req, res) {
    res.render('auth/signUp', { req, pageTitle: 'Sign Up' })
  },

  async post (req, res) {
    const userData = { ...req.body, passwordHash: req.body.password }
    try {
      const user = await User.create(userData)
      console.log('User "%s" has been created.', user)
      return res.redirect('/')
    } catch (error) {
      console.error(error)
      return res.render(
        'auth/signUp',
        { req, pageTitle: 'Sign Up', errors: error.errors.map(e => e.message) }
      )
    }
  }
}

export const signIn = {
  async get (req, res) {
    res.render('auth/signIn', { req, pageTitle: 'Sign In' })
  },

  async post (req, res) {
    let errors
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      errors = [`User with "${email}" email does not exist.`]
    }
    if (!(await user.isValidPassword(password))) {
      errors = ['Invalid password']
    }
    if (errors) return res.render('auth/signIn', { req, errors })

    req.session.userId = user.id
    console.log('"%s" logged in.')
    return res.redirect('/')
  }
}

export async function logout (req, res) {
  if (!req.user) {
    console.error('No user on logout')
  }

  delete req.session.userId
  res.redirect('/')
}
