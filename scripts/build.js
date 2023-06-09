const fs = require('node:fs')
const path = require('node:path')
const stream = require('node:stream')
const fm = require('front-matter')
const { marked } = require('marked')

const dist = path.resolve(__dirname, '../dist/')
const entry = path.resolve(__dirname, '../index.html')

const postsMatch = new RegExp('.md$')

function main() {
  fs.rmSync(dist, { force: true, recursive: true })
  fs.mkdirSync(path.resolve(dist, 'posts/'), { recursive: true })

  // fs.createReadStream(entry, { highWaterMark: 100 })
  fs.createReadStream(entry)
    .pipe(new stream.Transform({
      transform(chunk, encoding, done) {
        const postsMatch = new RegExp('__POSTS__', 'g')
        this.push(chunk.toString().replace(postsMatch, JSON.stringify(getPosts())))
        done()
      }
    }))
    .pipe(fs.createWriteStream(path.resolve(dist, 'index.html')))

  renderPosts()

  // NOTE fs.cp is experimental feature
  fs.cpSync(path.resolve(__dirname, '../images'), path.resolve(dist, 'images'), { recursive: true }) 
  // fs.cpSync(path.resolve(__dirname, '../favicon.png'), path.resolve(dist, 'favicon.png')) 
}

/**
 * @returns {{ title: string, publishedAt: string, location: string }[]} - posts
 */
function getPosts() {
  const stats = fs.readdirSync(path.resolve(__dirname, '../posts'), { withFileTypes: true })

  return stats
    .filter(s => s.isFile() && postsMatch.test(s.name))
    .map(s => {
      const meta = fm(fs.readFileSync(path.resolve(__dirname, '../posts', s.name), 'utf8')).attributes
      return { title: meta.title, publishedAt: meta.publishedAt, location: `/posts/${s.name.replace(postsMatch, '.html')}` }
    })
    .sort((p1, p2) => {
      if (p1.publishedAt > p2.publishedAt) return -1
      if (p1.publishedAt < p2.publishedAt) return 1
      return 0
    })
}

function renderPosts() {
  const stats = fs.readdirSync(path.resolve(__dirname, '../posts'), { withFileTypes: true })
  const layout = fs.readFileSync(path.resolve(__dirname, '../layout/base.html'), 'utf8')
  const contentMatch = new RegExp('<!-- __CONTENT__ -->', 'g')

  stats.forEach(s => {
    if (s.isDirectory()) return
    if (!postsMatch.test(s.name)) return

    const frontmatter = fm(fs.readFileSync(path.resolve(__dirname, '../posts', s.name), 'utf8'))
    const parsed = marked.parse(frontmatter.body, { silent: true })
    const html = s.name.replace(postsMatch, '.html')
    const rendered = layout.replace(contentMatch, parsed)
    fs.writeFileSync(path.resolve(dist, 'posts/', html), rendered)
  })
}

main()
