function fourSquares(n){
	let length = 2*n-1
	let evenLine = '+' + '-'.repeat((length-3)/2) + '+' + '-'.repeat((length-3)/2) + '+' 
	let oddLine = '|' + ' '.repeat((length-3)/2) + '|' + ' '.repeat((length-3)/2) + '|'
	if(n % 2 != 0){
		for(let row = 0; row < n; row++){
			if(row == 0 || row == Math.round(n/2) - 1 || row == n-1) console.log(evenLine)
			else console.log(oddLine)
		}
	} else {
		for(let row = 0; row < n-1; row++){	
			if(row == 0 || row == Math.round(n/2) - 1 || row == n-2) console.log(evenLine)
			else console.log(oddLine)
		}
	}
}
fourSquares([7])