let url = require('url')
let query = require('querystring')
let home = require('./home')
let details = require('./details')

module.exports = function(req, res) {
	req.pathname = req.pathname || url.parse(req.url).pathname
	if(req.pathname === '/'){
		home(req, res)
	} else if(req.pathname.indexOf('/images') > -1) {
		details(req, res)
	}
}