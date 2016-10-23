function scrooge(input){
	let sum = 0
	for(let item of input){
		let type = item.split(' ')[0].toLowerCase()
		let count = Number(item.split(' ')[1], 10)
		if(type === 'coin'){
			if(!isNaN(count) && count == parseInt(count, 10) && count >= 0)
				sum += count
		}
	}

	let gold = Math.floor(sum/100)
	let silver = Math.floor((sum%100)/10)
	let bronze = Math.floor(sum%10)
	console.log(`gold : ${gold}`);
	console.log(`silver : ${silver}`);
	console.log(`bronze : ${bronze}`);
}
scrooge(['coin 1','coin 2', 'coin 5', 'coin 10', 'coin 20', 'coin 50', 'coin 100', 'coin 200', 'coin 500','cigars 1'])
scrooge(['coin one', 'coin two', 'coin five', 'coin ten', 'coin twenty', 'coin fifty', 'coin hundred', 'cigars 1'])
