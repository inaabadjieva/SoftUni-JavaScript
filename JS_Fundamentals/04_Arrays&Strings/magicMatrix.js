function matrix(input){
	let matrix = input.map(row => row.split(' ').map(Number))
	let sum = input[0].split(' ').map(Number).reduce((a, b) => a+ b, 0)
	for(let row in input){
		let rowSum = input[row].split(' ').map(Number).reduce((a, b) => a+ b, 0)
		if(rowSum != sum){
			return false
		}
	}
	let calcSum = function(arr) {
      return arr.reduce((a, b) => a + b, 0);
   }
    let colSums = matrix.map(function(row, i) {
      return calcSum(matrix.map((row) => row[i]));
    })
	for(let s of colSums){
		if(s != sum){
			return false
		}
	}
	return true
}
console.log(matrix(['4 5 6',
'6 5 4',
'5 5 5']))
console.log(matrix(['7 5 6',
'6 5 4',
'5 5 5']))