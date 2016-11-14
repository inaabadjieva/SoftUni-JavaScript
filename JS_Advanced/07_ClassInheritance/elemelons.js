function solve(){
	class Melon{
		constructor(weight, melonSort){
			if(new.target === Melon){
				throw new Error('Error')
			}
			this.weight = weight
			this.melonSort = melonSort
			this.element = ''
		}
		get elementIndex(){
			return this.weight * this.melonSort.length
		}	
		toString(){
			return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
		}
	}
	class Watermelon extends Melon{
		constructor(weight, melonSort){
			super(weight, melonSort)
			this.element = 'Water'
		}
	}
	class Firemelon extends Melon{
		constructor(weight, melonSort){
			super(weight, melonSort)
			this.element = 'Fire'
		}
	}
	class Earthmelon extends Melon{
		constructor(weight, melonSort){
			super(weight, melonSort)
			this.element = 'Earth'
		}
	}
	class Airmelon extends Melon{
		constructor(weight, melonSort){
			super(weight, melonSort)
			this.element = 'Air'
		}
	}
	class Melolemonmelon extends Watermelon{
		constructor(weight, melonSort){
			super(weight, melonSort)
			this.elements = ['Water', 'Fire', 'Earth', 'Air']
			this.morph()
		}
		morph(){
			let current = this.elements.shift()
			this.element = current
			this.elements.push(current)
		}
	}
	return{Melon, Watermelon, Earthmelon, Airmelon, Firemelon, Melolemonmelon}
}
let result = solve()
 //let test = new result.Melon(100, "Test");
//Throws error

let watermelon = new result.Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());

// Element: Water
// Sort: Kingsize
// Element Index: 100

let melo = new result.Melolemonmelon(12.5, "Kingsize");
console.log(melo.toString());

