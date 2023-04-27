const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')

const server = http.createServer()

server.on('request', (request, res) => {
  const entry = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), { encoding: 'utf8' })
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(entry)
})
server.listen(50000)
console.log('preview is available on http://localhost:50000')

