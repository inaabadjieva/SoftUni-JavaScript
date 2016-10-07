function population(input){
	let result = new Map()
	for(let line of input){
		let data = line.split(' <-> ')
		let town = data[0]
		let pop =  Number(data[1])
		if(result.has(town))
			result.set(town, result.get(town) + pop)
		else
			result.set(town, pop)
	}
	for(let [k,v] of result){
		console.log(k + ' : ' + v)
	}
}
population(['Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000'])