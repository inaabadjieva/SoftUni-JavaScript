function catchNumsRegex(input){
	let text = input.join(' ')
	let regex = /\d+/g
	let nums = text.match(regex)
	console.log(nums.join(' '))
}
catchNumsRegex(['123a456',
'789b987',
'654c321',
'0'])