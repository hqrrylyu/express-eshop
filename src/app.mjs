import express from 'express'
import bodyParser from 'body-parser'
import * as config from './config.mjs'
import path from 'path'
import connection from './db_connection.mjs'
import session from 'express-session'
import SequelizeSessionInit from 'connect-session-sequelize'
import userMiddleware from './middleware/user.mjs'
import { authRoutes } from './routes/index.mjs'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(config.APP_DIR, 'templates'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const SequelizeStore = SequelizeSessionInit(session.Store)
app.use(session({
  secret: config.APP_SECRET_KEY,
  store: new SequelizeStore({ db: connection }),
  resave: false,
  proxy: true
}))
app.use(userMiddleware)

app.get('/', (req, res) => {
  res.render('index', { req, pageTitle: 'Homepage' })
})

app.use('/', authRoutes);

(async () => {
  const syncOptions = config.APP_DEBUG ? { alter: true } : undefined
  await connection.sync(syncOptions)

  app.listen(
    config.APP_PORT,
    () => console.log('Listening on %s', config.APP_PORT)
  )
})()
