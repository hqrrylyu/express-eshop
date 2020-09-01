import express from 'express'
import * as config from './config.mjs'
import path from 'path'
import connection from './db_connection.mjs'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(config.APP_DIR, 'templates'))

app.get('/', (req, res) => {
  res.render('index', { title: 'Hello world' })
});

(async () => {
  await connection.authenticate()

  app.listen(
    config.APP_PORT,
    () => console.log('Listening on %s', config.APP_PORT)
  )
})()
