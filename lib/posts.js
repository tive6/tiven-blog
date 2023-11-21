import dayjs from 'dayjs'
import fs from 'fs'
import { readJsonSync } from 'fs-extra'
import matter from 'gray-matter'
import hljs from 'highlight.js'
// import { remark } from "remark";
// import html from "remark-html";
import MarkdownIt from 'markdown-it'
import path from 'path'

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // use external default escaping
  },
})

const postsDirectory = path.join(process.cwd(), 'posts')
const dataJsonPath = path.join(process.cwd(), 'data/blog_list.json')

export function getSortedPostsData() {
  const json = readJsonSync(dataJsonPath)
  return json.list
}

export function getAllPostIds() {
  const json = readJsonSync(dataJsonPath)
  return json.list.map(({ id }) => ({
    params: {
      id,
    },
  }))
}

export async function getPostData(id) {
  const json = readJsonSync(dataJsonPath)
  const fileName = json.map[id]
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  const { data, content } = matterResult

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //     .use(html)
  //     .process(matterResult.content)
  // const contentHtml = processedContent.toString()

  const contentHtml = md.render(content)

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...data,
    date: dayjs(data.date).toISOString(),
  }
}
