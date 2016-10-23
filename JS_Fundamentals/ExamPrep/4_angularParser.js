function parser(input){
	let data = new Map();
	let cacheData = new Map();

	for(let line of input){
		let modulePattern = /^\$app\=\'(.+)\'$/g;
		let controllerPattern = /^\$controller\=\'(.+)\'\&app\=\'(.+)\'$/g;
		let modelPattern = /^\$model\=\'(.+)\'\&app\=\'(.+)\'$/g;
		let viewPattern = /^\$view\=\'(.+)\'\&app\=\'(.+)\'$/g;

		let moduleMatch = modulePattern.exec(line)
		let controllerMatch = controllerPattern.exec(line)
		let modelMatch = modelPattern.exec(line)
		let viewMatch = viewPattern.exec(line)

		if(moduleMatch){
			let module = moduleMatch[1]
			if(cacheData.has(module)){
				data.set(module, cacheData.get(module))
			} else{
				data.set(module, new Map())
				data.get(module).set('controllers', [])
				data.get(module).set('models', [])
				data.get(module).set('views', [])
			}		
		} else if(controllerMatch){
			let controller = controllerMatch[1]
			let module = controllerMatch [2]

			if(data.has(module)){
				data.get(module).get('controllers').push(controller)
			} else {
				if(!cacheData.has(module)){
					cacheData.set(module, new Map())
					cacheData.get(module).set('controllers', [])
					cacheData.get(module).set('models', [])
					cacheData.get(module).set('views', [])
				}
				cacheData.get(module).get('controllers').push(controller)
			}
		} else if(modelMatch){
			let model = modelMatch[1]
			let module = modelMatch[2]

			if(data.has(module)){
				data.get(module).get('models').push(model)
			} else {
				if(!cacheData.has(module)){
					cacheData.set(module, new Map())
					cacheData.get(module).set('controllers', [])
					cacheData.get(module).set('models', [])
					cacheData.get(module).set('views', [])
				}
				cacheData.get(module).get('models').push(model)
			}
		} else if(viewMatch){
			let view = viewMatch[1]
			let module = viewMatch[2]

			if(data.has(module)){
				data.get(module).get('views').push(view)
			} else {
				if(!cacheData.has(module)){
					cacheData.set(module, new Map())
					cacheData.get(module).set('controllers', [])
					cacheData.get(module).set('models', [])
					cacheData.get(module).set('views', [])
				}
				cacheData.get(module).get('views').push(view)
			}
		}
	}
	
	let sortedMap = new Map(Array.from(data.entries()).sort(function(a, b){
		let firstContr = a[1].get('controllers').length
		let secondContr = b[1].get('controllers').length

		let result = secondContr - firstContr
		if(result == 0){
			let firstModel = a[1].get('models').length
			let secondModel = b[1].get('models').length

			result = firstModel - secondModel
		}
		return result
	}));
	
	let sortedObj = {}
	sortedMap.forEach( function(value, key) {
		let controllers = value.get('controllers').sort()
		let models = value.get('models').sort()
		let views = value.get('views').sort()
		sortedObj[key] = {
			'controllers': controllers,
			'models': models,
			'views': views
		}
	});
	console.log(JSON.stringify(sortedObj));

}

parser(["$app='MyApp'",
				"$controller='My Controller'&app='MyApp'",
				"$model='My Model'&app='MyApp'",
				"$view='My View'&app='MyApp'"
				])

// parser(["$controller='PHPController'&app='Language Parser'",
// "$controller='JavaController'&app='Language Parser'",
// "$controller='C#Controller'&app='Language Parser'",
// "$controller='C++Controller'&app='Language Parser'",
// "$app='Garbage Collector'",
// "$controller='GarbageController'&app='Garbage Collector'",
// "$controller='SpamController'&app='Garbage Collector'",
// "$app='Language Parser'"])