class CheckingAccount {
	constructor(clientId, email, firstName, lastName) {
		this.clientId = clientId
		this.email = email
		this.firstName = firstName
		this.lastName = lastName
	}
	set clientId(value) {
		CheckingAccount.validate(value, /^[0-9]{6}$/g, 'Client ID must be a 6-digit number')
		this._clientId = value
	}
	set email(value) {
		CheckingAccount.validate(value, /^[a-zA-Z]+@[a-zA-Z.]+$/g, 'Invalid e-mail')
		this._email = value
	}
	set firstName(value) {
		CheckingAccount.validate(value, /.{3,20}/g, 'First name must be between 3 and 20 characters long');
		CheckingAccount.validate(value, /^[a-zA-Z]+$/g, 'First name must contain only Latin characters');
		this._firstName = value;
	}
	set lastName(value) {
		CheckingAccount.validate(value, /.{3,20}/g, 'Last name must be between 3 and 20 characters long');
		CheckingAccount.validate(value, /^[a-zA-Z]+$/g, 'Last name must contain only Latin characters');
		this._lastName = value;
	}
	static validate(value, regex, errorMsg) {
		if(!regex.test(value)){
			throw new TypeError(errorMsg)
		}
	}
}
try {
    let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov')
} catch (err) {
    console.log(err.message);
}