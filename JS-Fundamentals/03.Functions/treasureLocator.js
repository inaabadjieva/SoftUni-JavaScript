function treasure(input) {
	for(let i=0; i<input.length;  i+=2){
		let x = input[i]
		let y = input[i+1]
		getIsland(x, y)
	}

	function getIsland(x, y) {
		let island = ''
		if(x>=1 && x<=3 && y>=1 && y<=3) island = 'Tuvalu'
		else if(x>=8 && x<=9 && y>=0 && y<=1) island = 'Tokelau'
		else if(x>=5 && x<=7 && y>=3 && y<=6) island = 'Samoa'
		else if(x>=0 && x<=2 && y>=6 && y<=8) island = 'Tonga'
		else if(x>=4 && x<=9 && y>=7 && y<=8) island = 'Cook'
		else island =  'On the bottom of the ocean'
		console.log(island)		
	}
}
treasure([4, 2, 1.5, 6.5, 1, 3])