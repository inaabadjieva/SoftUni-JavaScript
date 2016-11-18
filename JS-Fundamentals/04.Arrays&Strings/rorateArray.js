function rotateArray(input) {
	let times = Number(input.pop())
	for(let i = 0; i < times%input.length; i++){
		  input.unshift(input.pop());
	}
	console.log(input.join(' '))
}
rotateArray(['banana',
'orange',
'cocnut',
'apple',
'15'])
rotateArray(['1',
'2',
'3',
'4',
'2'])