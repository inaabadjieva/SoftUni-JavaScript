function bunnyKill(input){
	let bombs = input.pop().split(' ')
	let matrix = input.map(row => row.split(' ').map(Number))

	let damaged = 0
	let killed = 0

	for(let bomb of bombs){
		let bombRow = Number(bomb.split(',')[0])
		let bombCol = Number(bomb.split(',')[1])
		let bombDamage = matrix[bombRow][bombCol]
		if(bombDamage > 0){
			damaged += bombDamage
			killed++
			matrix = explode(matrix, bombRow, bombCol, bombDamage)
		}	
	}

	for(let row = 0; row < matrix.length; row++){
		for(let col = 0; col < matrix[row].length; col++){
			let currentCell = matrix[row][col]
			if(currentCell > 0){
				damaged += currentCell
				killed++
			}
		}
	}

	console.log(damaged);
	console.log(killed);

	function isInMatrix(matrix, row, col){
		if((row >= 0 && row < matrix.length) && (col >= 0 && col < matrix[row].length))
			return true
		return false	
	}

	function explode(matrix, bombRow, bombCol, bombDamage){
		for(let row = bombRow - 1; row <= bombRow + 1; row++){
			for(let col=bombCol - 1; col <= bombCol + 1; col++){
				if(isInMatrix(matrix, row, col)){
					matrix[row][col] -= bombDamage
				}			
			}
		}
		return matrix
	}
}
bunnyKill(['5 10 15 20',
					'10 10 10 10',
					'10 15 10 10',
					'10 10 10 10',
					'2,2 0,1'])