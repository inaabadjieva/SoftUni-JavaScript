function matrix(input){
	let matrix = input.map(row => row.split(' ').map(Number))
	let sum = input[0].split(' ').map(Number).reduce((a, b) => a+ b, 0)

	for(let row = 0; row < matrix[0].length; row++){
		let rowSum = matrix[row].map(Number).reduce((a, b) => a+ b, 0)
		if(sum != rowSum) 
			return false
		let colSum = 0
		for(let col = 0; col < matrix[1].length; col++){
			colSum += matrix[row][col]
		}
		if(sum != colSum) 
			return false
	}
	return true
}
console.log(matrix(['4 5 6',
'6 5 4',
'5 5 5']))