import MarkdownIt from 'markdown-it'
import { readFileSync } from 'fs'

const md = new MarkdownIt()

const file = readFileSync('./posts/ssg-ssr.md', 'utf-8')
// console.log(file)
// 3. 解析markdown语法
const parse = (data) => {
  // setHtmlString(md.render(data.explanation))
  md.render(data)
};

console.log(md.render(file))