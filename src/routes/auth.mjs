import express from 'express'
import { signUp, signIn, logout } from '../views/auth.mjs'

const router = new express.Router()

router
  .route('/sign-up')
  .get(signUp.get)
  .post(signUp.post)

router
  .route('/sign-in')
  .get(signIn.get)
  .post(signIn.post)

router
  .post('/logout', logout)

export default router
