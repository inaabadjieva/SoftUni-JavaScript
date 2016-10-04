function average(input){
	let num = input[0]
	let average = getAverage(num.toString())
	if(average > 5){
		console.log(num) 
	} else {
			while(average <= 5){
				num += '9'
				average = getAverage(num)
			}	
			console.log(num)	
	}
	function getAverage(input){
		let sum = 0
		for(let i = 0; i < input.length; i++){
			sum += Number(input[i]) 
		}
		let result = sum/input.length
		return result
	}
}
average([101101])