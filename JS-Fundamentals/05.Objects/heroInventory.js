function heroes(input){
	let heroes = []
	for(let line of input){
		let name = line.split(' / ')[0]
		let level = Number(line.split(' / ')[1])
		let items = []
		if(line.split(' / ').length > 2)
			items = line.split(' / ')[2].split(', ')
		let heroObj = {
			name: name,
			level: level,
			items: items
		}
		heroes.push(heroObj)	
	}
	console.log(JSON.stringify(heroes))
}
heroes(['Isacc / 25',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara'])