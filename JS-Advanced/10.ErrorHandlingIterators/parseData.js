function makeCandy(input) {
	class Candy {
		constructor(topping, filling, spice) {
			this.setTopping = topping
			this.setFilling = filling
			this.setSpice = spice
		}
		set setTopping(value) {
			let toppings = ['milk chocolate', 'white chocolate', 'dark chocolate']
			if (!toppings.includes(value) || value == '') {
				throw new TypeError
			}
			this.topping = value
		}
		set setFilling(value) {
			let fillings = ['hazelnut', 'caramel', 'strawberry', 'blueberry', 'yogurt', 'fudge']
			let params = value.split(',')
			if (params.length > 3) {
				throw new TypeError
			}
			if (value.length == 0) {
				value = null
			} else {
				for (let param of params) {
					if (!fillings.includes(param)) {
						throw new TypeError
					}
				}
			}
			this.filling = value
		}
		set setSpice(value) {
			if (value === 'poison' || value === 'asbestos') {
				throw new TypeError
			}
			if (value.length == 0) {
				value = null
			}
			this.spice = value
		}
	}

	let result = []
	for (let recipe of input) {
		if(!/^[^:]+:[^:]*:[^:]*$/g.test(recipe)){
			continue
		}
		let tokens = recipe.split(':')
		let topping = tokens[0]
		let filling = tokens[1]
		let spice = tokens[2]
		try {
			let candy = new Candy(topping, filling, spice)
			result.push(candy)
		} catch (err) {
	
		}
	}
	return result
}

let candies = makeCandy([
	'milk chocolate:hazelnut,caramel:pumpkin',
	'dark chocolate::chips',
	'white chocolate::poison', // invalid
	'white chocolate:fudge:',
	'frosting:yogurt:frosting', // invalid
	'dark chocolate:blueberry:rock crystals',
])
console.log(candies)