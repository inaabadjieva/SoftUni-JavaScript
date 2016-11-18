function smallest2Nums(arr){
	arr.sort((a, b) => a-b)
	let result = arr.slice(0, 2)
	return result.join(' ')
}