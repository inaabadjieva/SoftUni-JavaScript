class Stringer {
	constructor(string, length){
		this.innerString = string,
		this.innerLength = length
	}
	increase(length){
		return this.innerLength += Number(length)
	}
	decrease(length){
		if(this.innerLength - Number(length) < 3)
			return this.innerLength = 0
		this.innerLength -= Number(length)
		return this.innerLength
	}
	toString(){
		if(this.innerString.length > this.innerLength){
			return this.innerString.slice(0, this.innerLength) + '...'
		} else if(this.innerLength === 0){
			return '...'
		}
		return this.innerString
	}
}
let str = new Stringer('pesho', 5)
str.decrease(2)
console.log(str.toString());