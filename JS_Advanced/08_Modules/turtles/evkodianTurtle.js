let Turtle = require('./turtle')

class EvkodianTurtle extends Turtle {
	constructor(name, age, gender, evkodiumValue){
		super(name, age, gender)
		this._evkodium = evkodiumValue
	}
    get evkodium() {
        return {
            value: this._evkodium,
            density: this._calcDensity()
        }
    }
    _calcDensity() {
        if (this._gender == 'male') {
            return this._age * 3;
        }
        return this._age * 2;
    }
	toString(){
		let output = super.toString()
		output += `\nEvkodium: ${this._evkodium * this._calcDensity()}`
		return output
	}
}
module.exports = EvkodianTurtle