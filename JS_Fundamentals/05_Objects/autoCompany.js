function autoCompany(input){
	let result = new Map()
	for(let line of input){
		let brand = line.split(' | ')[0]
		let model = line.split(' | ')[1]
		let count = Number(line.split(' | ')[2])
		if(!result.get(brand))
			result.set(brand, new Map())
		if(!result.get(brand).get(model)){
			result.get(brand).set(model, count)
		}	else {
			let old = result.get(brand).get(model)
			result.get(brand).set(model, old+count)
		}
	}
	for(let [key, val] of result){
		console.log(key)
		for(let [k, v] of val){
			console.log(`###${k} -> ${v}`)
		}
	}
}
autoCompany(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10'])