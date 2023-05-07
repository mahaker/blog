const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')

const CONTENT_TYPE = {
  '.html': 'text/html',
  '.ico': 'image/x-icon',
}

const server = http.createServer()

server.on('request', (request, res) => {
  const url = request.url
  const next = url === '/' ? 'index.html' : url.replace(/^\//, '')

  console.log(next)

  try {
    const entry = fs.readFileSync(path.resolve(__dirname, '../dist', next), { encoding: 'utf8' })
    res.writeHead(200, { 'Content-Type': CONTENT_TYPE[path.extname(next)] })
    res.end(entry)
  } catch(e) {
    console.error(e)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end('error occured')
  }
})
server.listen(50000)
console.log('preview is available on http://localhost:50000')
