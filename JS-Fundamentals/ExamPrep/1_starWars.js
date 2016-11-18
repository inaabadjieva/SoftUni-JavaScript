function starWars(input){
	let whiteDamage = 0
	let darkDamage = 0
	let whiteConsAttacks = 0
	let darkConsAttacks = 0
	let whitePreviousDamage = Number.NEGATIVE_INFINITY
	let darkPreviousDamage = Number.NEGATIVE_INFINITY

	for(let i = 0; i < input.length; i++){
		let count = Number(input[i].split(' ')[0])
		let color = input[i].split(' ')[1]
		if(color == 'white'){
			let medenkaDamage = count*60
			if(medenkaDamage == whitePreviousDamage)
				whiteConsAttacks++
			else
				whiteConsAttacks = 1
			if(whiteConsAttacks == 2){
				whiteDamage += medenkaDamage *2.75
				whitePreviousDamage = medenkaDamage *2.75
				whiteConsAttacks = 0
			} else{
				whiteDamage += medenkaDamage 
				whitePreviousDamage = medenkaDamage 
			}
		} else {
			let medenkaDamage = count*60
			if(medenkaDamage == darkPreviousDamage)
				darkConsAttacks++
			else
				darkConsAttacks = 1
			if(darkConsAttacks == 5){
				darkDamage += medenkaDamage *4.5
				darkPreviousDamage = medenkaDamage * 4.5
				darkAttacks = 1
			} else{
				darkDamage += medenkaDamage 
				darkPreviousDamage = medenkaDamage 
			}
		}
	}
	if(whiteDamage > darkDamage){
		console.log('Winner - Vitkor');
		console.log('Damage - ' + whiteDamage);
	} else {
		console.log('Winner - Naskor');
		console.log('Damage - ' + darkDamage);
	}
}
starWars(['2 dark medenkas',
'1 white medenkas',
'2 dark medenkas',
'2 dark medenkas',
'15 white medenkas',
'2 dark medenkas',
'2 dark medenkas'])