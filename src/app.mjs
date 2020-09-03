import express from 'express'
import bodyParser from 'body-parser'
import * as config from './config.mjs'
import path from 'path'
import connection from './db_connection.mjs'
import session from 'express-session'
import SequelizeSessionInit from 'connect-session-sequelize'
import userMiddleware from './middleware/user.mjs'
import { productList } from './views/product.mjs'
import { authRoutes, categoryRoutes, productRoutes } from './routes/index.mjs'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(config.APP_DIR, 'templates'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const SequelizeStore = SequelizeSessionInit(session.Store)
app.use(session({
  secret: config.APP_SECRET_KEY,
  store: new SequelizeStore({ db: connection }),
  saveUninitialized: false,
  resave: false,
  proxy: true
}))
app.use(userMiddleware)
app.use('/uploads', express.static(config.APP_UPLOADS_DIR))

app.get('/', productList.get)
app.use('/', authRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productRoutes);

(async () => {
  const syncOptions = config.APP_DEBUG ? { alter: true } : undefined
  await connection.sync(syncOptions)

  app.listen(
    config.APP_PORT,
    () => console.log('Listening on %s', config.APP_PORT)
  )
})()
