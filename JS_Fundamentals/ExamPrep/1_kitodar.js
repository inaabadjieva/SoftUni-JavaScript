function kitodar(input){
	let silver = 0
	let gold = 0
	let diamonds = 0
	for(let line of input){
		let pattern = /mine\s+(\S*)?\s*\-\s+([a-zA-Z]+)\s*\:\s+([0-9]+)/g
		let match = pattern.exec(line)
		if(match != null){
			if(match[2] == 'gold'){
				gold+= Number(match[3])
			} else if(match[2] == 'silver'){
				silver+= Number(match[3])
			} else if(match[2] == 'diamonds'){
				diamonds += Number(match[3])
			}
		}
	}
	console.log(`*Silver: ${silver}`);
	console.log(`*Gold: ${gold}`);
	console.log(`*Diamonds: ${diamonds}`);
}
kitodar(['mine bobovdol - gold: 10',
'mine - diamonds: 5',
'mine colas - wood: 10',
'mine myMine - silver:  14',
'mine silver:14 - silver: 14'])
kitodar(['mine bobovDol - gold: 10"',
'mine medenRudnik - silver: 22"',
'mine chernoMore - shrimps : 24"',
'gold: 50'])