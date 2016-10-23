function solve(input){
	let arr = []
	for(let line of input){
		arr.push(Number(line))	
	}
	let product = 1
	let max = Number.NEGATIVE_INFINITY
	for(let i = 0; i < arr.length; i++){
		if(arr[i] >= 0 && arr[i] < 10){
			let num = arr[i]
			product = 1
			for(let j = i + 1; j <= Math.min(i + num, arr.length-1); j++){
					product *= arr[j] 
			}
			if(product > max){
				max = product
			}
		}
	}
	console.log(max);
	function isNumber(n) {
	  	return !isNaN(parseFloat(n)) && isFinite(n);
	}	
}
solve(['10',
'20',
'2',
'30',
'44',
'123',
'3',
'56',
'20',
'24'])
solve(['100',
'200',
'2',
'3',
'2',
'3',
'2',
'1',
'1'])