function table(n){
	console.log("<table border='1'>")
	let row = '<tr><th>x<th>'
	for(let i = 1; i <= n; i++){
		row += `<th>${i}<th>`
	}
	row += '<tr>'
	console.log(row)
	for(let r = 1; r <= n; r++){
		row = `<tr><th>${r}<th>`
		let num = r
		for(let c = 1; c <= n; c++){			
			row += `<td>${num}<td>`
			num += r
		}
		row += '<tr>'
		console.log(row)
	}
	console.log('<table>')
}
table([5])