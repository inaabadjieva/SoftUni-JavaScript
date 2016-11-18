function moviePrice(input){
	let title = input[0].toLowerCase()
	let day = input[1].toLowerCase()
	if(title === 'the godfather') {
		switch (day) {
			case 'monday': return 12
				break;
			case 'tuesday': return 10
				break;
			case 'wednesday': return 15
				break;
			case 'thursday': return 12.50
				break;
				case 'friday': return 15
				break;
			case 'saturday': return 25
				break;
			case 'sunday': return 30
				break;
			default: 
				return 'error'
				break
		}
	} else if (title === "schindler's list") {
		switch (day) {
			case 'monday': 
			case 'tuesday': 
			case 'wednesday': 
			case 'thursday': 
			case 'friday': 
				return 8.50.toFixed(2)
				break;
			case 'saturday': 
			case 'sunday': 
				return 15
				break;
			default: 
				return 'error'
				break
		}
	} else if (title === 'casablanca') {
		switch (day) {
			case 'monday': 
			case 'tuesday': 
			case 'wednesday': 
			case 'thursday': 
			case 'friday': 
				return 8
				break;
			case 'saturday': 
			case 'sunday': 
				return 10
				break;
			default: 
				return 'error'
				break
		} 
	} else if (title === 'the wizard of oz') {
		switch (day) {
			case 'monday': 
			case 'tuesday': 
			case 'wednesday': 
			case 'thursday': 
			case 'friday': 
				return 10
				break;
			case 'saturday': 
			case 'sunday': 
				return 15
				break;
			default: 
				return 'error'
				break
		} 
	} else {
			return 'error'
		}
}
console.log(moviePrice(["shindler's LIST", 'thursday']))