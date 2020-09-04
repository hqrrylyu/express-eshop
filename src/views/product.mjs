import fs from 'fs'
import util from 'util'
import Sequelize from 'sequelize'
import { Product, Category, Brand } from '../models/index.mjs'
import { PRODUCT_COLORS, PRODUCT_SIZES } from '../models/product.mjs'
import Upload from '../upload.mjs'
import { ProductFilters } from '../utils.mjs'

const { and } = Sequelize.Op

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

const PRODUCT_ORDERINGS = {
  newFirst: ['createdAt', 'DESC'],
  oldFirst: ['createdAt', 'ASC'],
  cheapFirst: ['price', 'ASC'],
  expensiveFirst: ['price', 'DESC']
}

export async function listProducts (req, res) {
  const categories = await Category.findAll()
  const brands = await Brand.findAll()
  const maxPrice = await Product.aggregate('price', 'max')
  const context = {
    req,
    pageTitle: 'Products',
    maxPrice,
    categories,
    brands,
    PRODUCT_COLORS,
    PRODUCT_SIZES,
    PRODUCT_ORDERINGS: Object.keys(PRODUCT_ORDERINGS)
  }

  const order = PRODUCT_ORDERINGS[req.query.order || 'newFirst']
  const opts = {
    include: [
      { model: Category, required: true },
      { model: Brand, required: true }
    ],

    order: [order]
  }
  let filters = new ProductFilters(req.query)
  filters = filters.getFilters()
  console.log('Product filters: %s', util.inspect(filters))
  if (filters.length) opts.where = { [and]: filters }
  try {
    const { count, rows: products } = await Product.findAndCountAll(opts)
    return res.render(
      'product/list', { ...context, maxPrice, categories, brands, count, products }
    )
  } catch (error) {
    console.log(error)
    return res.render(
      'product/list',
      { ...context, errors: error.errors.map(e => e.message) }
    )
  }
}
