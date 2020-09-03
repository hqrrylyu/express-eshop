import fs from 'fs'
import util from 'util'
import { Product, Category, Brand } from '../models/index.mjs'
import { PRODUCT_COLORS, PRODUCT_SIZES } from '../models/product.mjs'
import Upload from '../upload.mjs'

const upload = Upload.single('image')

export const addProduct = {
  async get (req, res) {
    if (!req.user) return res.redirect('/')
    const categories = await Category.findAll()
    const brands = await Brand.findAll()
    res.render(
      'product/add',
      { req, pageTitle: 'Add product', categories, brands, PRODUCT_COLORS, PRODUCT_SIZES }
    )
  },

  post (req, res) {
    upload(req, res, error => {
      const context = { req, pageTitle: 'Add product', PRODUCT_COLORS, PRODUCT_SIZES }
      if (error) {
        return res.render('product/add', context)
      }

      const imagePath = req.file.path
      console.log('Image path: "%s"', imagePath)

      const productData = { ...req.body, imagePath, ownerId: req.user.id }
      console.log(`Product data: "${util.inspect(productData)}"`)
      Product.create(productData)
        .then(product => {
          console.log(`Product "${util.inspect(product)}" has been created.`)
          res.redirect('/')
        })
        .catch(error => {
          console.error(error)
          fs.unlink(imagePath, err => {
            if (err) throw err
            console.log(`"${util.inspect(imagePath)}" has been deleted.`)
          })

          Promise.all([Category.findAll(), Brand.findAll()])
            .then(([categories, brands]) =>
              res.render(
                'product/add',
                { ...context, categories, brands, errors: error.errors.map(e => e.message) }
              ))
        })
    })
  }
}

export const productList = {
  async get (req, res) {
    const context = { req, pageTitle: 'Products' }
    try {
      const products = await Product.findAll({
        include: [
          { model: Category, required: true },
          { model: Brand, required: true }
        ]
      })
      return res.render('product/list', { ...context, products })
    } catch (error) {
      console.log(error)
      return res.render(
        'product/list',
        { ...context, errors: error.errors.map(e => e.message) }
      )
    }
  }
}
