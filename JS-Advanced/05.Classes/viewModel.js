class Textbox {
	constructor(selector, regex) {
		this._elements = $(selector)
		this._invalidSymbols = regex

		let that = this
       this.elements.on('input', function (event) {
           that.value = $(this).val()
       });
	}
	get value() { 
		return this._value
	}
	set value(text) {
		this.elements.val(text)
		this._value = text
	}
	get elements(){
		return this._elements
	}

	isValid(){
		if(this._invalidSymbols.test(this.value))
			return false
		return true
	}
}
let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input',function(){console.log(textbox.value);});