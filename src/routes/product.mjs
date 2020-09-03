import express from 'express'
import { addProduct } from '../views/product.mjs'

const router = new express.Router()

router
  .route('/add')
  .get(addProduct.get)
  .post(addProduct.post)

export default router
