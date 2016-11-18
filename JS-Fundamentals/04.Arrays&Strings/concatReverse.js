function concatReverse(arr){
	let chars = Array.from(arr.join(''))
	let revStr = chars.reverse().join('')
	console.log(revStr)
}
concatReverse(['I', 'am', 'student'])