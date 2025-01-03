import MD5 from 'crypto-js/md5'

export const genUUID = () => {
  return crypto.randomUUID()
}

export const md5 = async (str) => {
  const msgUint8 = new TextEncoder().encode(str) // 编码为（utf-8）Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8) // 计算消息的哈希值
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // 将缓冲区转换为字节数组
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // 将字节数组转换为十六进制字符串
  return hashHex.slice(0, 32)
}

// export const genMd5 = async () => {
//   return await md5(Math.random().toString(36))
// }

export const genMd5 = () => {
  return MD5(genUUID()).toString()
}

export const downloadFile = (res) => {
  let { headers, data } = res
  let disposition = headers['content-disposition']
  let filename = disposition.split('=')[1].replace(/\\\\"/g, '')
  // let blob = new Blob([res.data], {
  //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  // })
  filename = decodeURIComponent(filename)
  let url = window.URL.createObjectURL(data)
  let link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
