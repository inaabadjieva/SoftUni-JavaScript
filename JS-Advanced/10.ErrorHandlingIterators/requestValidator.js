function validateRequest(obj) {
	let methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
	if(!obj.hasOwnProperty('method') || !methods.includes(obj.method)) {
		throw new Error(`Invalid request header: Invalid Method`)
	}
	let uriRegex = /^([a-zA-Z0-9.]+)$|^(\*)$/g
	if(!obj.hasOwnProperty('uri') || !uriRegex.test(obj.uri)) {
		throw new Error(`Invalid request header: Invalid URI`)
	}
	let versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
	if(!obj.hasOwnProperty('version') || !versions.includes(obj.version)) {
		throw new Error(`Invalid request header: Invalid Version`)
	}
	let msgRegex = /^[^<>\\&'"']*$/g
	if(!obj.hasOwnProperty('message') || !msgRegex.test(obj.message)) {
		throw new Error(`Invalid request header: Invalid Message`)
	}
	return obj
}
let result = validateRequest({
  method: 'POST',
  uri: 'home.bash',
  message: 'rm -rf /*'
});
console.log(result);