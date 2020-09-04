import express from 'express'
import { addProduct, productDetail } from '../views/product.mjs'

const router = new express.Router()

router
  .route('/add')
  .get(addProduct.get)
  .post(addProduct.post)

router.get('/:id', productDetail)

export default router
