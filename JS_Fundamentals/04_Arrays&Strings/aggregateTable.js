function aggregateTable(lines) {
	let sum = 0
	let list = []
	for(let line of lines){
		let town = line.split('|')[1].trim()
		let income = Number(line.split('|')[2].trim())
		list.push(town)
		sum += income
	}
	console.log(list.join(', ') + '\n' + sum)
}
aggregateTable(['| Sofia           | 300',
 '| Veliko Tarnovo  | 500',
 '| Yambol          | 275'])