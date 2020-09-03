import path from 'path'
import crypto from 'crypto'
import multer from 'multer'
import * as config from './config.mjs'

const storage = multer.diskStorage({
  destination: config.APP_UPLOADS_DIR,

  filename (req, file, cb) {
    const ext = path.extname(file.originalname)
    const str = crypto.randomBytes(10).toString('hex')
    const filename_ = `${str}__${Date.now()}${ext}`
    cb(null, filename_)
  }
})

export default multer({ storage })
