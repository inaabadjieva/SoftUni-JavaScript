function orbit(input){
	let rows = Number(input[0].split(' ')[0])
	let cols = Number(input[0].split(' ')[1])
	let starR = Number(input[1].split(' ')[0])
	let starC = Number(input[1].split(' ')[1])

	let matrix = new Array(rows).fill(0).map(row => new Array(cols).fill(0))
    matrix[starR][starC] = 1
    num = 2
   
   	for(let row = starR; row < rows-2; row++){
   		for(let col = starC; col < cols-1; col++){
   			matrix[row][row+1] = num
   			matrix[row+1][row+1] = num
   			matrix[row+1][row] = num
   		}
   		num++ 
   		matrix[row+2][row] = num
   		matrix[row][row+2] = num
   	}
    

    console.log(matrix.map(row => row.join(' ')).join('\n'));
}
orbit(['4 4',
'0 0'])
console.log('\n')
orbit(['5 5',
'2 2'])