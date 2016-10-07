function sumByTown(input){
	let sums = {}
	for(let i=0; i<input.length; i+=2){
		let [town, income] = [input[i], Number(input[i+1])]
		if(sums[town] === undefined)
			sums[town] = income
		else
			sums[town] += income
	}
	console.log(JSON.stringify(sums))
}
sumByTown(['Sofia',
'20',
'Varna',
'3',
'Sofia',
'5',
'Varna',
'4'])