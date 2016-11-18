class Numberbox {
	constructor(label, selector, minValue, maxValue){
		this._label = label
		this._elements = $(selector)
		this._minValue = minValue
		this._maxValue = maxValue
		this._value = this._elements.val()

		let that = this
		this._elements.on('change', function(){
			that.value = $(this).val()
		})
	}
	get label(){
		return this._label
	}
	get elements(){
		return this._elements
	}
	get value(){
		return this._value
	}
	set value(value){
		if(value <= this._minValue || value >= this._maxValue){
			throw new Error
		}
		this._value = value
		this._elements.each(function(index, elem){	
			$(elem).val(value)	
		}) 
	}
}
module.exports = Numberbox
