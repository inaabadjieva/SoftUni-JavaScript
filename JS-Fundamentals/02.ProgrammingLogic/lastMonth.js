function lastDay (input){
	let day = Number(input[0])
	let month = Number(input[1])
	let year = Number(input[2])
	let date = new Date(year, month-1, 0);
	console.log(date.getDate())
}
lastDay(['13','12','2004'])