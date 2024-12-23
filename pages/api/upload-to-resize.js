import busboy from 'busboy'
import { parse } from 'path'
import sharp from 'sharp'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function POST(req, res) {
  try {
    const data = await formDataToBuffer(req)
    console.log(data.params)
    let { filename } = data.metadata
    let { width, height, prefix } = data.params
    let suffix = width || height || 'resized'
    let { name, ext } = parse(filename)
    let filePrefix = prefix || name + '-'
    console.log({ name, ext })
    let transformedBuffer = await transform(res, data)
    res.setHeader(
      'content-disposition',
      `attachment; filename=${filePrefix}${suffix}${ext}`
    )
    res.end(transformedBuffer)
  } catch (e) {
    res.status(500).end(JSON.stringify(e))
  }
}

async function formDataToBuffer(req) {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers })
    let fileBuffer = null
    let params = {}
    let metadata = {}
    bb.on('file', (name, file, info) => {
      // console.log(name, file, info)
      console.log(info)
      metadata = info
      const chunks = []
      file.on('data', (chunk) => {
        // console.log('file data', chunk)
        chunks.push(chunk)
      })
      file.on('close', () => {
        console.log('file done')
        fileBuffer = Buffer.concat(chunks)
      })
    })
    bb.on('field', (name, val, info) => {
      params[name] = val
    })
    bb.on('close', () => {
      resolve({ fileBuffer, params, metadata })
    })
    req.pipe(bb)
  })
}

async function transform(res, { fileBuffer, params }) {
  try {
    let { width, height } = params
    return await sharp(fileBuffer)
      .resize({
        width: width ? +width : undefined,
        height: height ? +height : undefined,
        fit: sharp.fit.cover,
        // position: sharp.strategy.entropy,
      })
      .toBuffer()
  } catch (e) {
    console.log(e)
  }
}
