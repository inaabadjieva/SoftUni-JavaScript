function townsToJSON(input){
	let townArr = []
	for(let town of input.slice(1)){
		let [empty, townName, lat, lng] = town.split(/\s*\|\s*/)
		let townObj = {
			Town: townName, 
			Latitude: Number(lat),
			Longitude: Number(lng)}
		townArr.push(townObj)	
	}
	return JSON.stringify(townArr)
}
townsToJSON(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |'])