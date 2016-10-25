function solve(arr, sort){
	let asc = (a,b) => a - b
	let desc = (a,b) => b - a
	let sorting = {
		'asc' : asc,
		'desc' : desc
	}
	return arr.sort(sorting[sort])
}
console.log(solve([14, 7, 17, 6, 8], 'asc'));