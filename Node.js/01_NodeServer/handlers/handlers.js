let favicon = require('./favicon')
let router = require('./router')
let staticFiles = require('./static-files')
console.log('got here')
module.exports = [
	favicon,
  	router,
  	staticFiles
]