function solve() {
	// return function(){
		let usernameBool = false
		let passwordBool = false
		let confirmPasswordBool = false
		let emailBool = false
		let companyCheckBool = false
		let companyNumBool = false

		$("#registerForm").submit(function(e) {
            e.preventDefault();
        })

		//checkbox
		$('#company').on('change', function() {
			if($('#company').prop('checked') === true){
				$('#companyInfo').css('display', 'inline')
				companyCheckBool = true
			} else {
				$('#companyInfo').css('display', 'none')
			}
		})
		
		$('#submit').on('click', function(event){
			let username = $('#username').val()
			let password = $('#password').val()
			let confirmPassword = $('#confirm-password').val()
			let email = $('#email').val()
			let regexUsername = /^[a-zA-Z0-9]{3,20}$/gm
			let regexPassword = /^[a-zA-Z0-9_]{5,15}$/g
			let regexEmail = /(.)*@(.)*\.(.)*/g

			//check username
			if(regexUsername.test(username) === true){
				usernameBool = true
			}

			//check password && comfirmPassword
			if(regexPassword.test(password) === true && 
				password === confirmPassword) {
					passwordBool = true
					confirmPasswordBool = true
			}

			//check email
			if(regexEmail.test(email) === true) {
				emailBool = true
			}

			//check companyNum
			if (companyCheckBool === true) {
            	let companyNum = $('#companyNumber').val();
	           if (companyNum >= 1000 && companyNum <= 9999) {
	               companyNumBool = true;
	           }
          	}

           if (usernameBool === true && 
           		emailBool === true && 
           		passwordBool === true && 
           		confirmPasswordBool === true) {
            	if (companyCheckBool === true) {
                	if (companyNumBool === true) {
                    	$('#valid').css('display', 'inherit');
                	} else {
                    	$('#companyNumber').css('border-color', 'red')
                	}
            	} else {
                	$('#valid').css('display', 'inherit');
            	}
        	} else {
            	$('#valid').css('display', 'none');
        	}
 
	       if (usernameBool === false) {
	           $('#username').css('border-color', 'red')
	       }
	       if (emailBool === false) {
	           $('#email').css('border-color', 'red')
	       }
	       if (passwordBool === false) {
	           $('#password').css('border-color', 'red')
	       }
	       if (confirmPasswordBool === false) {
	           $('#confirm-password').css('border-color', 'red')
	       }
	       if (companyCheckBool === true) {
	           if (companyNumBool === false) {
	               $('#companyNumber').css('border-color', 'red')
	           }
	       }
	       event.preventDefault();
		})
}
