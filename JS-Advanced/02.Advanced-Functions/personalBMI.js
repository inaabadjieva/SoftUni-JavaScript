function solve(name, age, weight, height){
	let obj = {
		name: name,
		personalInfo: {
			age: age,
			weight: weight,
			height: height
		},
	}
	obj['BMI'] = Math.round(obj.personalInfo.weight / ((obj.personalInfo.height/100)*(obj.personalInfo.height/100))) 
	obj['status'] = ''
	if(obj['BMI'] < 18.5){
		obj['status'] = 'underweight'
	} else if(obj['BMI'] >= 18.5 &&  obj['BMI'] < 25){
		obj['status'] = 'normal'
	} else if(obj['BMI'] >= 25 &&  obj['BMI'] < 30){
		obj['status'] = 'overweight'
	} else if(obj['BMI'] >= 30){
		obj['status'] = 'obese'
	}
	if(obj['status'] === 'obese'){
		obj['recommendation'] = 'admission required'
	}		
	return obj
}
solve(['Peter', 29, 75, 182])