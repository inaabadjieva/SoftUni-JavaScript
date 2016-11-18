function systemComponents(input){
	let result = new Map()
	
	for(let line of input){
		let system = line.split(' | ')[0]
		let component = line.split(' | ')[1]
		let subComponent = line.split(' | ')[2]
		
		if(!result.get(system)){
			result.set(system, new Map())
		}
		if(!result.get(system).get(component)){
			result.get(system).set(component, new Array(subComponent))
		} else {
			result.get(system).get(component).push(subComponent)
		}
	}

	let sortedSystems = [...result.keys()].sort(function(a, b){
		let sorted = result.get(b).size - result.get(a).size
		if(sorted === 0){
			sorted = a.toLowerCase().localeCompare(b.toLowerCase())
		}
		return sorted
	})
	for(let system of sortedSystems) {
        console.log(system);
        let componentsSorted = Array.from(result.get(system).keys()).sort((c1, c2) => result.get(system).get(c2).length - result.get(system).get(c1).length)

        for(let component of componentsSorted) {
            console.log(`|||${component}`);
            result.get(system).get(component).forEach(sc => console.log(`||||||${sc}`))
        }
    }
}
systemComponents(['SULS | Main Site | Home Page',
'SULS | Main Site | Login Page',
'SULS | Main Site | Register Page',
'SULS | Judge Site | Login Page',
'SULS | Judge Site | Submittion Page',
'Lambda | CoreA | A23',
'SULS | Digital Site | Login Page',
'Lambda | CoreB | B24',
'Lambda | CoreA | A24',
'Lambda | CoreA | A25',
'Lambda | CoreC | C4',
'Indice | Session | Default Storage',
'Indice | Session | Default Security'])