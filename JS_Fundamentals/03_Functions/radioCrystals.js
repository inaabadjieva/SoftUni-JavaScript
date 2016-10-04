function crystals(input) {
	let wanted = Number(input[0])
	for(let i=1; i<input.length; i++){
		let size = Number(input[i])
		console.log(`Processing chunk ${size} microns`)
		//cut
		let op = 'Cut'
		let count = 0
		let cutSize = cut(size)	
		while(cutSize >= wanted ||  parseInt(wanted - cutSize)  === 1){
			size = cutSize
			count++
			cutSize = cut(size)
		}
		check(size, op, count)
		//lap
		op = 'Lap'
		count = 0
		let lapSize = lap(size)	
		while(lapSize >= wanted ||  parseInt(wanted - lapSize)  === 1){
			size = lapSize
			count++
			lapSize = lap(size)
		}
		check(size, op, count)
		//grind
		op = 'Grind'
		count = 0
		let grindSize = grind(size)	
		while(grindSize >= wanted ||  parseInt(wanted - grindSize)  === 1){
			size = grindSize
			count++
			grindSize = grind(size)
		}
		check(size, op, count)
		//etch
		op = 'Etch'
		count = 0
		let etchSize = etch(size)	
		while(etchSize >= wanted ||  parseInt(wanted - etchSize)  === 1){
			size = etchSize
			count++
			etchSize = etch(size)
		}
		check(size, op, count)

		if(wanted - size === 1){
			size = size + 1
			console.log('X-ray x1')
		}
		console.log(`Finished crystal ${size} microns`)
	}
	function check(size, op, count){
		if(count>0){
			console.log(`${op} x${count}`)
			size = wash(size)
		}
	}
	function cut(num) {
		return num/4
	}
	function lap(num) {
		return num*=0.8
	}
	function grind(num) {
		return num-=20
	}
	function etch(num) {
		return num-=2
	}
	function xray(num) {
		return num+=1
	}
	function wash(num) {
		console.log('Transporting and washing')
		return Math.floor(num)
	}
}
crystals([1000, 4000, 8100])
	