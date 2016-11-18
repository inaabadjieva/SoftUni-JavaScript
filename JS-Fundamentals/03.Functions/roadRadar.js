function radar(input){
	let speed = Number(input[0])
	let area = input[1]

	let limit = getLimit(area)
	let infraction = getInfraction(speed, limit)
	if(infraction) {
		console.log(infraction)
	}

	function getLimit(zone){
		switch(area){
		case 'motorway': return 130
			break
		case 'interstate': return 90
			break
		case 'city': return 50
			break
		case 'residential': return 20
			break			
		}
	}
	
	function getInfraction(speed, limit){
		let overSpeed = speed - limit
		let infraction = ''
		if(overSpeed <= 0){
			return false
		} else if(overSpeed > 0 && overSpeed <= 20){
			infraction = 'speeding' 
			return infraction
		} else if(overSpeed > 20 && overSpeed <= 40){
			infraction = 'excessive speeding'
			return infraction
		} else {
			infraction = 'reckless driving' 
			return infraction
		}
	}
}
radar(['120', 'interstate'])