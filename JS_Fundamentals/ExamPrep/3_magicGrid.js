function magicGrid(input){
	let message = input.shift()
	let sum = Number(input.shift())
	let matrix = input.map(row => row.split(' ').map(Number))
	let key = 0
	for(let row=0; row < matrix.length -1; row++){
		for(let col=0; col < matrix[row].length; col++){
			let current = matrix[row][col]
			if(current + matrix[row][col+1] == sum){
				key = row + col + row + col +1;
				break;	
			}
			 for(let rowCheck=row; rowCheck < matrix.length-1; rowCheck++){
				for(let colCheck=0; colCheck < matrix[row].length; colCheck++){
					let currentCheck = matrix[rowCheck+1][colCheck]
					if(current + currentCheck == sum){
						key = row + col + rowCheck + 1 + colCheck;
						break;				
					}
				}
			}
		}
	}
	let result = ''
	for(let i=0; i<message.length; i++){
		if(i % 2 == 0){
			result += String.fromCharCode(message[i].charCodeAt(0) + key)
		} else {
			result += String.fromCharCode(message[i].charCodeAt(0) - key) 
		}
	}
	console.log(result);
}
magicGrid(['Usq$krh}peza$kr_i',
'10',
'200 100 120 300',
'100 9 300 100',
'1 290 370 100',
'10 11 100 100'])
