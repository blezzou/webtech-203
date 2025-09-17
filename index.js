// Import a module
const http = require('http')

const url = require('url')

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

const qs = require('querystring')

const serverHandle = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(content)
    res.end()
    
    // Retrieve and print the queryParams 
    const queryParams = qs.parse(url.parse(req.url).query)
    console.log(queryParams)
    
    // Retrieve and print the current path
    const path = url.parse(req.url).pathname
    console.log(path)
}

http
.createServer(serverHandle)
.listen(5000)



