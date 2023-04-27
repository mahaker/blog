const fs = require('node:fs')
const path = require('node:path')
const stream = require('node:stream')

const dist = path.resolve(__dirname, '../dist/')
const entry = path.resolve(__dirname, '../index.html')

const postsMatch = new RegExp('(.html|.md)$')

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

/**
 * @returns {{ title: string, location: string }[]} - posts
 */
function getPosts() {
  const stats = fs.readdirSync(path.resolve(__dirname, '../posts'), { withFileTypes: true })

  return stats
    .filter(s => s.isFile() && postsMatch.test(s.name))
    .map(s => ({ title: s.name, location: `/posts/${s.name}` }))
}

function renderPosts() {
  const stats = fs.readdirSync(path.resolve(__dirname, '../posts'), { withFileTypes: true })
  const layout = fs.readFileSync(path.resolve(__dirname, '../layout/base.html')).toString()
  const contentMatch = new RegExp('<!-- __CONTENT__ -->', 'g')

  stats.forEach(s => {
    if (s.isDirectory()) return
    if (!postsMatch.test(s.name)) return

    const rendered = layout.replace(contentMatch, fs.readFileSync(path.resolve(__dirname, '../posts', s.name)))
    fs.writeFileSync(path.resolve(dist, 'posts/', s.name), rendered)
  })
}
