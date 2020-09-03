import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: '/uploads',

  filename (req, file, cb) {
    const ext = path.extname(file.originalname)
    const str = crypto.randomBytes(10).toString('hex')
    const filename_ = `${str}__${Date.now()}${ext}`
    cb(null, filename_)
  }
})

export default multer({ storage })
