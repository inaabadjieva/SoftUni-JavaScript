function argumentInfo(){
	let sum = {} 
	for(let i = 0; i < arguments.length; i++){
		let obj = arguments[i]
		let type = typeof obj
		if(!sum[type]){
			sum[type] = 1
		} else {
			sum[type] += 1
		}
		console.log(`${type}: ${obj}`);
	}
	let sorted = []
	for(let item in sum){
		sorted.push([item, sum[item]])
	}

	let result = sorted.sort((a,b) => b[1] - a[1])
	for(let arr of result){
		console.log(arr[0] + ' = ' + arr[1]);
	}	
}
argumentInfo([{ name: 'bob'}, 3.333, 9.999]);
argumentInfo(['cat', 42, function () { console.log('Hello world!'); }]);