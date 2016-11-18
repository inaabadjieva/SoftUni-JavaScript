function chainDNA(num) {
	let str = ['A', 'T', 'C', 'G', 'T', 'T', 'A', 'G', 'G', 'G']
	let x = 0
	for(let row = 0; row < num; row++){		
		if(row % 4 == 0) console.log(`**${str[x]}${str[x+1]}**`)
		if(row % 4 == 1) console.log(`*${str[x]}--${str[x+1]}*`)
		if(row % 4 == 2) console.log(`${str[x]}----${str[x+1]}`)
		if(row % 4 == 3) console.log(`*${str[x]}--${str[x+1]}*`)
		x+=2
		if(x > 9) x = 0	
	}
}
chainDNA(10)