import util from 'util'
import { Brand } from '../models/index.mjs'

export const addBrand = {
  async get (req, res) {
    if (!req.user) return res.redirect('/')
    res.render('brand/add', { req, pageTitle: 'Add brand' })
  },

  async post (req, res) {
    try {
      const brand = await Brand.create(req.body)
      console.log(`Brand "${util.inspect(brand)}" has been added.`)
      return res.redirect('/')
    } catch (error) {
      console.log(error)
      return res.render(
        'brand/add',
        { req, pageTitle: 'Add brand', errors: error.errors.map(e => e.message) }
      )
    }
  }
}
