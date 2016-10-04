let http = require('http')
let handlers = require('./handlers/handlers')

http.createServer(function(req, res) {
	for(let handler of handlers) {
        	var next = handler(req, res)
        	if(!next) {
        		break
        	}
	}
}).listen(3000);
console.log("server listening on 3000");
