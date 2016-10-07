function lowestPrices(input){
	let result = new Map()
	for(let line of input){
		let town = line.split(' | ')[0]
		let product = line.split(' | ')[1]
		let price = Number(line.split(' | ')[2])

		if(result.has(product)){						
				for(let [key, value] of result.get(product)){
					if(value === town){
						key = price
						result.get(product).set(price, town)
						console.log(price + ' -> ' + town)		
						console.log(result)
					} else {
	    				if(key > price)
	    					result.get(product).set(price, town)
	    				else 
	    					continue
	    			} 
				}
		} else{
			result.set(product, new Map())
			result.get(product).set(price, town)
		}
	}
		let str = ''
		for(let [product, map] of result){
			let finalP = Number.POSITIVE_INFINITY
			let finalT = ''
			for(let [price, town] of map){
				if(price<finalP) {
					finalP = price
				}			 
			}
			str += product + ' -> ' + result.get(product)[0] + ' (' + result.get(product)[1] + ')\n' 
		}
		//console.log(str)
}
lowestPrices(['Sofia City | Audi | 100000',
'Sofia City | BMW | 100000',
'Sofia City | Mitsubishi | 10000',
'Sofia City | Mercedes | 10000',
'Sofia City | NoOffenseToCarLovers | 0',
'Mexico City | Audi | 1000',
'Mexico City | BMW | 99999',
'New York City | Mitsubishi | 10000',
'New York City | Mitsubishi | 1000',
'Mexico City | Audi | 100000',
'Washington City | Mercedes | 1000'])