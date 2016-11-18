function solve(obj){
	let car = {} 
	car['model'] = obj.model
	if(obj.power <= 90){
		car['engine'] = {power: 90, volume: 1800}	
	} else if(obj.power > 90 && obj.power <=120){
		car['engine'] = {power: 120, volume: 2400}
	} else if(obj.power > 90){
		car['engine'] = {power: 200, volume: 3500}
	}
	if(obj.carriage === 'hatchback'){
		car['carriage'] = {type: 'hatchback', color: obj.color}
	} else {
		car['carriage'] = {type: 'coupe', color: obj.color}
	}
	let wheels = Number(obj.wheelsize) % 2 == 0 ? Number(obj.wheelsize)-1 : Number(obj.wheelsize) 
	car['wheels'] = Array(4).fill(wheels) 
	return car
}
solve({ model: 'Opel Vectra',
  power: 110,
  color: 'grey',
  carriage: 'coupe',
  wheelsize: 17 })