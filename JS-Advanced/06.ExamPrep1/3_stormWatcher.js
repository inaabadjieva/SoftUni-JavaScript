(function report(){
	let uniqueId = 0
	return class Report {
		constructor (temperature, humidity, pressure, windSpeed){
			this.id = uniqueId++
			this.temperature = temperature
			this.humidity = humidity
			this.pressure = pressure
			this.windSpeed = windSpeed
		}
		toString(){
			let weather = 'Not stormy'
			if(this.temperature < 20 && (this.pressure < 700 || this.pressure > 900) && this.windSpeed > 25){
				weather = 'Stormy'
			}
			return `Reading ID: ${this.id}
			Temperature: ${this.temperature}*C
			Relative Humidity: ${this.humidity}%
			Pressure: ${this.pressure}hpa
			Wind Speed: ${this.windSpeed}m/s
			Weather: ${weather}`
		}
	}
})()
let report = report()
let record1 = new Report(32, 66, 760, 12);
console.log(record1.toString());

// OR

class Report {
	constructor (temperature, humidity, pressure, windSpeed){
		this.id = Report.getId()
		this.temperature = temperature
		this.humidity = humidity
		this.pressure = pressure
		this.windSpeed = windSpeed
	}
	toString(){
		let weather = 'Not stormy'
		if(this.temperature < 20 && (this.pressure < 700 || this.pressure > 900) && this.windSpeed > 25){
			weather = 'Stormy'
		}
		return `Reading ID: ${this.id}
Temperature: ${this.temperature}*C
Relative Humidity: ${this.humidity}%
Pressure: ${this.pressure}hpa
Wind Speed: ${this.windSpeed}m/s
Weather: ${weather}`
	}
	static getId(){
		if(!Report.nextId){
			Report.nextId = 0
		} 
		return Report.nextId++
	}
}
let record1 = new Report(32, 66, 760, 12);
console.log(record1.toString());