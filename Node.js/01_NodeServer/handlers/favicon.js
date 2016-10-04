let fs = require('fs')
let url = require('url')

module.exports = function(req, res) {
	req.pathname = req.pathname || url.parse(req.url).pathname
	if(req.pathname === '/favicon.ico') {
		fs.readFile('./content/favicon.ico', function(err,data) {
	    	if (err) console.log(err)

	    	res.writeHead(200, {'Content-Type': 'text/plain'})
	    	res.write(data)
	    	res.end()	
    	})
	} else {
		return true
	}	
}