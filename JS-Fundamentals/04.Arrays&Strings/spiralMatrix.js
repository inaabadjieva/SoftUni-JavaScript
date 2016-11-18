function matrix(input){
	let rows = input[0].split(' ')[0]
	let cols = input[0].split(' ')[1]

	let matrix = []
	for(let i = 0; i < cols; i++) {
    	matrix[i] = []; 
	}

	let row = 0
	let col = 0
	let direction = 'right'
	let max = rows*cols
	
	for(let i = 1; i <=max; i++){
		if (direction === 'right' && (col > cols - 1 || matrix[row][col] != undefined)){
			direction = 'down'
			row++
			col--
		} 
		if (direction === 'down' && (row > rows - 1 || matrix[row][col] != undefined)){
			direction = 'left'
           row--
           col--
		} 
		if(direction === 'left' && (col < 0 || matrix[row][col] != undefined)){
			direction = 'up'
           row--
           col++
		} 
		if(direction === 'up' &&  (row < 0 || matrix[row][col] != undefined)){
			direction = 'right'
           row++
           col++
		}

		matrix[row][col] = i

		if(direction === 'right') col++
		if(direction === 'down') row++
		if(direction === 'left') col--
		if(direction === 'up') row--

	}
	console.log(matrix.map(row => row.join(' ')).join('\n'));
}
matrix(['5 5'])