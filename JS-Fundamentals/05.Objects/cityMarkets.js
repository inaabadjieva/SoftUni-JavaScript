function cityMarkets(input){
	let result = new Map()
	for(let line of input){
		let town = line.split(' -> ')[0]
		let product = line.split(' -> ')[1]
		let prices = line.split(' -> ')[2]
		let income = Number(prices.split(' : ')[0])*Number(prices.split(' : ')[1])

		if(!result.has(town))
			result.set(town, new Map())
		let oldIncome = result.get(town).get(product)
		if(oldIncome)
			income +=oldIncome
		result.get(town).set(product, income)
	}
	for(let [town,product] of result){
		console.log('Town - ' + town)
		for(let [product, income] of result.get(town)){
			console.log('$$$'+product + ' : ' + income)
		}
	}
}
cityMarkets(['Sofia -> Laptops HP -> 200 : 2000',
'Sofia -> Raspberry -> 200000 : 1500',
'Sofia -> Audi Q7 -> 200 : 100000',
'Montana -> Portokals -> 200000 : 1',
'Montana -> Qgodas -> 20000 : 0.2',
'Montana -> Chereshas -> 1000 : 0.3'])