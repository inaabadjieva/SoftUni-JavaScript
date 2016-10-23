function student(input){
	let result = {}
	for(let line of input){
		let pattern = /[-:]/g
	   	let data = line.split(pattern)
	   	let exam = data[1].trim()
	   	let name = data[0].trim()
	   	let score = Number(data[2].trim())
	    if(score >= 0 && score <= 400){
	    	if(!result[exam]){
		       	result[exam] = new Array({
		       		name: name,
					result: score,
					makeUpExams: 0
		       	})
			} else{
				let isAdded = false;
				for(let student of result[exam]){
					if(student.name == name){
						student.result = Math.max(student.result, score)
						student.makeUpExams++
						isAdded = true;
					} 
				}
				if(!isAdded){
					result[exam].push({
			   		name: name,
			   		result: score,
			   		makeUpExams: 0
			   		});
				}
			}
		} else {
			continue
		}
	} 
	for(let course in result){
		result[course].sort(function(a, b){
			let result = b.result - a.result
			if(result == 0){
				result = a.makeUpExams - b.makeUpExams
				if(result == 0){
					result = a.name.localeCompare(b.name)
				}
			}
			return result
		})
	}	
	console.log(JSON.stringify(result));
}
student(['Samuel Jackson-JavaScript:100',
'Samuel Jackson-JavaScript:100',
'Samuel Jackson-JavaScript:110',
'Samuel Jackson-JavaScript:100',
'Samuel Jackson-JavaScript:190',
'Samuel Jackson-JavaScript:500',
'Samuel Jackson-JavaScript:	401',
'Samuel Jackson-JavaScript:0'])
