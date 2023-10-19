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
    res.end(getErrorHtml())
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

function getErrorHtml() {
  let basePath = process.env.BASE_PATH
  console.log(basePath)
  let publicPath = `${basePath}/api/g`
  let backHome =
    process.env.NODE_ENV === 'development'
      ? `<a style="font-size: 16px;" href="/">← 返回首页</a>`
      : ''
  return `
    <head>
      <link rel="icon" href="${basePath}/favicon.ico">
      <title>自定义占位图</title>
      <style>
      code {
        color: #98c379;
      }
      table {
        border-collapse: collapse;
        width: 600px;
      }
      th, td {
        padding: 5px 10px;
        text-align: left;
      }
      .back {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      </style>
    </head>
    <div>
      <h1 class="back">
        URL 地址异常
        ${backHome}
      </h1>
      <p>URL格式参考如下：</p>
      <ol>
      <li>
        默认：<a href="${publicPath}/200/200">${publicPath}/200/200</a>
        <br>
        <img src="${publicPath}/200/200" alt="tiven-img"> 
      </li>
      <li>
        自定义大小：<a href="${publicPath}/640/320">${publicPath}/640/320</a>
        <br>
        <img src="${publicPath}/640/320" alt="tiven-img"> 
      </li>
      <li>
        自定义内容：<a href="${publicPath}/400/200?bg=palevioletred&color=purple&text=React&size=30">${publicPath}/400/200?bg=palevioletred&color=purple&text=React&size=30</a>
        <br>
        <img src="${publicPath}/400/200?bg=palevioletred&color=purple&text=React&size=30" alt="tiven-img">  
      </li>
      </ol>
      <table border="1" borderColor="#ddd">
      <tr>
      <th>参数</th>
      <th>作用</th>
      </tr>
      <tr>
      <td>bg</td>
      <td>背景色，默认：<code>#ccc</code></td>
      </tr>
      <tr>
      <td>color</td>
      <td>文字颜色，默认：<code>#666</code></td>
      </tr>
      <tr>
      <td>text</td>
      <td>文字，默认：<code>200x200</code> ( width x height )</td>
      </tr>
      <tr>
      <td>size</td>
      <td>文字大小，默认：<code>32</code></td>
      </tr>
      </table>
      <p><b>bg</b>，<b>color</b> 颜色参数可以传 <u>hex类型</u> 的值：<code>50A6EE</code>，<code>f00</code>；</p>
      <p>也可以传表示颜色的 <u>英文单词</u> ：<code>red</code>、<code>pink</code>、<code>red</code>等。</p>
    </div>
    `
}
