import express from 'express'
import bodyParser from 'body-parser'
import * as config from './config.mjs'
import path from 'path'
import connection from './db_connection.mjs'
import * as authViews from './views/auth.mjs'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(config.APP_DIR, 'templates'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Homepage' })
})

app
  .route('/sign-up')
  .get(authViews.signUp.get)
  .post(authViews.signUp.post);

(async () => {
  await connection.sync()

  app.listen(
    config.APP_PORT,
    () => console.log('Listening on %s', config.APP_PORT)
  )
})()
