export default function Api(req, res) {
  res.status(200).json({ text: 'Hello' })
  // res.send(img)

  // res.writeHead(200, {
  //   // 'Content-Type': 'image/png', // 'image/svg+xml',
  //   // 'Content-Length': img.toString().length,
  // })

  // return new Response(img, {
  //   // status: 200,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'image/png',
  //   },
  // })
}

// const img = await sharp({
//   text: {
//     // text: 'Hello!',
//     text: `<span font-family="sans" size="small" foreground="#${color}" background="#${bg}"> ${text} </span>`,
//     // width: +w, // max width
//     // height: +h, // max height
//     align: 'center',
//     channels: 4,
//     background: 'red',
//     font: 'serif',
//     spacing: 20,
//     rgba: true,
//     dpi: +w,
//   },
// })
//   .png()
//   .resize({
//     width: +w,
//     height: +h,
//     fit: 'contain',
//     background: `#${bg}`,
//   })
//   .toBuffer()

// Simplified Chinese
