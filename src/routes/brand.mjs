import express from 'express'
import { addBrand } from '../views/brand.mjs'

const router = new express.Router()

router
  .route('/add')
  .get(addBrand.get)
  .post(addBrand.post)

export default router
