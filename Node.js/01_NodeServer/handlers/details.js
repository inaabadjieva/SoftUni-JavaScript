let fs = require('fs')
let url = require('url')
let data = require('./home')

module.exports = function(req, res){
	let index = req.pathname.split('/').pop()
	console.log(index)
	console.log(data)
	res.writeHead(400, {'Content-Type': 'text/html'})
	//res.write(image)
	res.end()
}

