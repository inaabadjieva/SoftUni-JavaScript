function addRemove(input) {
	let arr = []
	let num = 1
	for(let command of input){
		if(command === 'add'){
			arr.push(num)
		} else {
			arr.pop()
		} 
		num++
	}
	if(arr.length === 0) console.log('Empty')
	else console.log(arr.join('\n')); 
}
addRemove(['add',
'add',
'remove',
'add',
'add'])