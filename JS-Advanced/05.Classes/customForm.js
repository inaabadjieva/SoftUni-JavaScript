let result = (function(){
	class Textbox {
		constructor(selector, regex) {
			this.selector = selector
			this._elements = $(selector)
			this._invalidSymbols = regex
			this.value = this._elements.val()
			let that = this;
	        $(this.selector).on('input', function () {
	            that.value = $(this).val();
	        });
		}
		get value() { 
			return $(this.selector).val()
		}
		set value(value) {
			$(this.selector).val(value)
		}
		get elements(){
			return this._elements
		}
		isValid(){
			if(this._invalidSymbols.test($(this.selector).val()))
				return false
			return true
		}
	}

	class Form {
		constructor(){
			for (let textbox of arguments) {
               if (!textbox instanceof Textbox) {
                   throw new Error("Invalid parameter type")
               } 
           }
			this._element = $('<div>').addClass('form')
			this._textboxes = textboxes

			for (let textbox of textboxes) {
               this._element.append(textbox.elements);
           }
		}

		submit() {
            let allValid = true;
            for (let textbox of this._textboxes) {
                if (textbox.isValid()) {
                    textbox.elements.css('border', '2px solid green');
                } else {
                    textbox.elements.css('border', '2px solid red');
                    allValid = false;
                }
            }
            return allValid;
        }

        attach(selector) {
            $(selector).append(this._element);
        }
	}

	return {
		Textbox: Textbox,
		Form: Form
	}
})()

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#root");