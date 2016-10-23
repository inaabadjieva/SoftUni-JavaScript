function solve(input){
	let result = new Map()
	for(let line of input){
		let patternQuery =/[\S]+\=[\S ]+/g 
		line = line.replace(/.+?(?=\?)(\?)+/g, '').replace(/%20|\+/g, ' ').replace(/[\s]+/g, ' ')
		let matches = line.match(patternQuery)
		if(matches != null){
			for(let match of matches){
				let keyValue = match.split('&')
				let key = ''
				let value = ''
				for(let pair of keyValue){
					key = pair.split('=')[0].trim()
					value = pair.split('=')[1].trim()
					if(!result.get(key)){
						result.set(key, new Array(value))	
					} else {
						result.get(key).push(value)
					}
				}
			}
		}
		let str = ''
		for(let [key, value] of result){
			let values = value.join(', ')
			str += `${key}=[${values}]`
		}
		console.log(str);
		result = new Map()
	}
}
solve(['first=this+is+a+field&second=was_it_already*',
'workshop=canvas_in_js&lecture=flow+++++++control',
'++++++and-there_should=be+one-&stup=id&id=line_of_&sy=Mb0l3Z++++++++',
'l@nguag3-z=english&language=csharp&language=php&language=shliok@vica'])

// function solve(queryStrings) {
//     var result = [];

//     queryStrings.forEach(function (line) {
//         var keys = {};

//         line.replace(/.+?(?=\?)(\?)+/g, '') // Remove url and '?' symbol
//             .replace(/([^=&]+)=([^&]*)/g,   // Regex to match key/value pairs
//             function (full, key, value) {
//                 key = key
//                     .split('%20').join(' ')  // Replace '%20' with empty space
//                     .replace(/[\+]+/g, ' ')  // Replace '+' with empty space
//                     .replace(/\s{2,}/g, ' ') // Replace multiple (2 or more) whitespaces with one
//                     .trim();                 // Trim whitespaces at the beginning and at the end of the string

//                 value = value
//                     .split('%20').join(' ')
//                     .replace(/[\+]+/g, ' ')
//                     .replace(/\s{2,}/g, ' ')
//                     .trim();

//                 keys[key] = (keys[key] ? keys[key] + ', ' : '[') + value;
//                 return '';
//             });

//         for (var key in keys) {
//             result.push(key + '=' + keys[key] + ']');
//         }
//         result.push('\r\n');
//     });

//     return result.join('').trim();
// }