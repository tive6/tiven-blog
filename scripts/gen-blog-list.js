const { outputJsonSync, readJsonSync } = require('fs-extra')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const dayjs = require('dayjs')

const postsDirectory = path.join(process.cwd(), 'posts')
const dataJsonPath = path.join(process.cwd(), 'data/blog_list.json')

const fileNames = fs.readdirSync(postsDirectory)
const allPostsData = fileNames.map((fileName) => {
  console.log('fileName: ', fileName)

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  return { ...matterResult.data, fileName }
})

const blogList = []
const blogMap = {}
allPostsData.forEach((item) => {
  let { date, abbrlink, fileName } = item
  let dateStr = dayjs(date).toISOString()
  blogList.push({
    ...item,
    abbrlink: `${abbrlink}`,
    id: `${abbrlink}`,
    date: dateStr,
  })
  blogMap[abbrlink] = fileName
})

const list = blogList.sort((a, b) => {
  if (a.date < b.date) {
    return 1
  } else {
    return -1
  }
})

outputJsonSync(
  dataJsonPath,
  {
    list,
    map: blogMap,
  },
  { spaces: 2 }
)

// const json = readJsonSync(dataJsonPath)
// console.log(json)
