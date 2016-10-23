function solve(input){
	let letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	let length = Number(input.shift())
	let matrixData = []
	for(let i=0; i<length; i++){
		matrixData.push(input.shift())
	}
	
	let templateMatrix = matrixData.map(row => row.split(' ').map(Number))
	let templateRows = templateMatrix.length
	let templateCols = templateMatrix[0].length

	let matrix = input.map(row => row.split(' ').map(Number))

	for(let row = 0; row < matrix.length; row++){
		for(let col = 0; col < matrix[row].length; col++){
			let r = row % templateRows
			let c = col % templateCols
			
			let sum = matrix[row][col] + templateMatrix[r][c]
			let letter = letters[sum % 27]
			matrix[row][col] = letter
			c++
		}
	}
	let result = ''
	for(let row = 0; row < matrix.length; row++){
		for(let col = 0; col < matrix[row].length; col++){
			result += matrix[row][col]
		}
	}
	console.log(result);
}
solve([ '1',
'1 3 13',
'12 22 14 13 25 0 4 24 23',
'18 24 2 25 22 0 0 11 18',
'8 25 6 26 8 23 13 4 14',
'14 3 14 10 6 1 6 16 14',
'11 12 2 10 24 2 13 24 0',
'24 24 10 14 15 25 18 24 12',
'4 24 0 8 4 22 19 22 14',
'0 11 18 26 1 19 18 13 15',
'8 15 14 26 24 14 26 24 14' ])