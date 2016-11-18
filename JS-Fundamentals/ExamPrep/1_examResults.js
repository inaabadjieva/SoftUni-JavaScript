function results(input){
	let courseAverage = input.pop().trim()
	let sum = 0
	let count = 0
	for(let line of input){
		let data = line.trim().split(/\s+/)
		let student = data[0].trim()
		let course = data[1].trim()
		let examPoints = Number(data[2].trim())
		let bonus = Number(data[3].trim())
		if(course === courseAverage){
			sum += examPoints
			count++
		}
		let coursePoints = parseFloat((examPoints*0.2 + bonus).toFixed(2))
		let grade = ((coursePoints / 80) * 4 + 2).toFixed(2) 
		if(grade >= 6) {
			grade = '6.00'
		}				
		if(examPoints < 100){
			console.log(`${student} failed at "${course}"`)
			continue
		} else {	
			console.log(`${student}: Exam - "${course}"; Points - ${coursePoints}; Grade - ${grade}`)
		}
	}
	sum = (sum / count).toFixed(2)
	console.log(`"${courseAverage}" average points -> ${parseFloat(sum)}`);
}
results(['Pesho C#-Advanced 100 3',
'   Gosho    Java-Basics 157 3',
'Tosho    HTML&CSS 317 12',
'Minka    C#-Advanced 57 15',
'Stanka C#-Advanced 157 15',
'Kircho C#-Advanced    300 0',
'Niki C#-Advanced 400 10',
' C#-Advanced '])