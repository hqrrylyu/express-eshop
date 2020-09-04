import { fileURLToPath } from 'url'
import path from 'path'
import env from 'env-var'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const APP_DIR = __dirname

export const APP_DEBUG = env.get('DEBUG')
  .default('false').asBoolStrict()

export const APP_SECRET_KEY = env.get('SECRET_KEY')
  .required().asString()

export const APP_PORT = env.get('PORT')
  .default(8000).asPortNumber()

export const APP_DB_URI = env.get('DB_URI')
  .required().asString()

export const APP_STATICFILES_DIR = path.join(APP_DIR, 'static')

export const APP_UPLOADS_DIR = '/uploads'
