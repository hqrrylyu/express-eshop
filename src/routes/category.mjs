import express from 'express'
import { addCategory } from '../views/category.mjs'

const router = new express.Router()

router
  .route('/add')
  .get(addCategory.get)
  .post(addCategory.post)

export default router
