// Import a module
const http = require('http')
const url = require('url')
const qs = require('querystring')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'

const serverHandle = function (req, res) {

  const queryParams = qs.parse(url.parse(req.url).query)
  console.log(queryParams)

  const path = url.parse(req.url).pathname
  console.log(queryParams)

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(content)
  res.write(path)
  res.end()
}

http
.createServer(serverHandle)
.listen(5000)