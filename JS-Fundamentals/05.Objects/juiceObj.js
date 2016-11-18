function juice(input){
	let obj = {}
	let result = {} 
	for(let line of input) {
		let juice = line.split(' => ')[0]
		let quantity = Number(line.split(' => ')[1])
		if(obj[juice]) obj[juice] 
			+= quantity
		else 
			obj[juice] = quantity

		if(obj[juice] >= 1000){
			if(result[juice])
				result[juice] += Math.floor(obj[juice]/1000)
			else
				result[juice] = Math.floor(obj[juice]/1000)
			obj[juice] = obj[juice]%1000
		}	
	}
	for(let key of Object.keys(result)){
		console.log(`${key} => ${result[key]}`);
	}
}
juice(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789'])
	