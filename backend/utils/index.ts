import multer from 'multer'
import fs from 'fs'

export const upload = multer({
  dest: 'upload/',
  fileFilter: (_req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/svg+xml'
    ) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  storage: multer.diskStorage({
    filename: function (_req, file, callback) {
      callback(null, file.fieldname)
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
})

export function generateForm(filePath: string, fileType: string, fileName: string) {
  const form = new FormData()
  const buff = Buffer.from(fs.readFileSync(filePath))
  const blob = new Blob([buff], { type: fileType })
  form.append('image', blob, fileName)
  return form
}

/* import { upload, generateForm } from './utils' */
/* import axios from 'axios' */

/* app.post('/test/upload', upload.single('image'), async (req, res) => { */
/*   if (!req.file) { */
/*     res.status(400).send('No file uploaded.') */
/*     return */
/*   } */
/*   const form = generateForm( */
/*     req.file.path, */
/*     req.file.mimetype, */
/*     req.file.originalname */
/*   ) */
/*   const response = await axios.post('http://localhost:80/upload', form, { */
/*     headers: { 'Content-Type': 'multipart/form-data' }, */
/*     params: { collection: req.body.collection }, */
/*   }) */
/**/
/*   return res.send(response.data) */
/* }) */

/* app.delete('/test/delete', async (req, res) => { */
/*   const response = await axios.delete('http://localhost:80/delete', { */
/*     params: { _id: req.body._id, collection: req.body.collection }, */
/*   }) */
/**/
/*   return res.send(response.data) */
/* }) */

/* app.get('/test/display', async (req, res) => { */
/*   res.redirect( */
/*     `http://localhost:80/display?_id=${req.query._id}&collection=${req.query.collection}` */
/*   ) */
/* }) */
