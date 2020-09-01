import { fileURLToPath } from 'url'
import { dirname } from 'path'
import env from 'env-var'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const APP_DIR = __dirname

export const APP_DEBUG = env.get('DEBUG')
  .default('false').asBoolStrict()

export const APP_PORT = env.get('PORT')
  .default(8000).asPortNumber()

export const APP_DB_URI = env.get('DB_URI')
  .required().asString()
