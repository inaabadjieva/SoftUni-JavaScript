function orbit(input){
	let rows = Number(input[0].split(' ')[0])
	let cols = Number(input[0].split(' ')[1])
	let starR = Number(input[1].split(' ')[0])
	let starC = Number(input[1].split(' ')[1])

	let matrix = new Array(rows).fill(0).map(row => new Array(cols).fill(0))
    matrix[starR][starC] = 1
   
   	for(let row = 0; row < rows; row++){
   		for(let col = 0; col < cols; col++){
   			let diffCol = Math.abs(col-starC)
			let difRow = Math.abs(row-starR)
			let diff = Math.max(difRow, diffCol) 
			matrix[row][col] = diff+1
   		}
  	}
    console.log(matrix.map(row => row.join(' ')).join('\n'));
}
orbit(['4 4',
'0 0'])
console.log('\n')
orbit(['5 5',
'2 2'])