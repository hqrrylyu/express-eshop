import util from 'util'
import { Category } from '../models/index.mjs'

export const addCategory = {
  async get (req, res) {
    if (!req.user) return res.redirect('/')
    res.render('category/add', { req, pageTitle: 'Add category' })
  },

  async post (req, res) {
    try {
      const category = await Category.create(req.body)
      console.log(`Category "${util.inspect(category)}" has been added.`)
      return res.redirect('/')
    } catch (error) {
      console.log(error)
      return res.render(
        'category/add',
        { req, pageTitle: 'Add category', errors: error.errors.map(e => e.message) }
      )
    }
  }
}
