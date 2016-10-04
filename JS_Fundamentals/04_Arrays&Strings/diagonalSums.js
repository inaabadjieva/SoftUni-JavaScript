function diagonaSums(input) {
	let matrix = input.map(row => row.split(' ').map(Number))
	let mainSum = 0
	let secSum = 0
	for(let row = 0; row < matrix.length; row++){
		mainSum +=matrix[row][row]
		secSum += matrix[row][matrix.length-row-1]
	}
	console.log(mainSum + ' ' + secSum)
}