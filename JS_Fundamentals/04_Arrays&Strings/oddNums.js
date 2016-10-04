function oddNums(arr){
	let result = []
	for(let i in arr)
		if(i % 2 != 0)
			result.push(arr[i]*2)
	result.reverse()	
	console.log(result.join(' '))	
}
oddNums(['10', '15', '20', '25'])