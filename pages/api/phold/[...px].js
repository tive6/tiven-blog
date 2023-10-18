import sharp from 'sharp'
const colorString = require('color-string')

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'

export default async function GET(req, res) {
  try {
    let { px, text, bg, color, size } = req.query
    console.log(req.query)
    let [w, h] = px?.length >= 2 ? px : [200, 200]
    text = text || `${w} x ${h}`
    bg = bg || 'ccc'
    color = color || '666'
    size = size || 32
    const bgRes = colorString.get(bg) || colorString.get(`#${bg}`)
    let bgStr = bgRes ? colorString.to.hex(bgRes.value) : '#ccc'
    const colorRes = colorString.get(color) || colorString.get(`#${color}`)
    let colorStr = colorRes ? colorString.to.hex(colorRes.value) : '#666'
    let buffer = getSvgBuffer({ w, h, bg: bgStr, color: colorStr, size, text })
    const img = await sharp(buffer, {
      density: 1000,
    })
      .png({
        palette: true,
        quality: 100,
      })
      .resize({
        width: +w,
        height: +h,
        fit: 'contain',
        background: bgStr,
      })
      .toBuffer()
    res.end(img)
  } catch (e) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    })
    let basePath = process.env.BASE_PATH
    console.log(basePath)
    res.end(`
    <div>
      <h1>Not Found</h1>
      <p>${e.toString()}</p>
      <p>URL格式如下：</p>
      <ol>
      <li>
        默认：<a href="${basePath}/api/phold/200/200">/api/phold/200/200</a> 
      </li>
      <li>
        自定义：<a href="${basePath}/api/phold/400/200?bg=fff&color=red&text=hello&size=30">/api/phold/400/200?bg=fff&color=red&text=hello&size=30</a> 
      </li>
      </ol>
    </div>
    `)
  }
}

function getSvgBuffer({ w, h, bg, color, size, text }) {
  let textY = (+h + size / 2) / 2
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1"
     width="${w}" height="${h}">
    <rect width="${w}" height="${h}"
    fill="${bg}" style="fill:${bg};"/>
    <text x="50%" y="${textY}" 
    dominant-baseline="alphabetic" text-anchor="middle" 
    fill="none" stroke="${color}" font-size="${size}" 
    style="font-family:Verdana, Arial, Helvetica,fantasy,fangsong,monospace,emoji,'Gill Sans',system-ui,serif,Georgia,Times,'Times New Roman','黑体','STXingkai';" 
    fill-opacity="1">${text}</text>
</svg>`
  return new Buffer(svg)
}
