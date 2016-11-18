function units (input){
	let foots = Math.floor(input/12)
	let inches = input % 12
	console.log(`${foots}'-${inches}"`)
}
units([11])