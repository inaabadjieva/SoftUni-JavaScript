function solve(input){
	let result = new Map()
	for(let line of input){
		let color = line.split('|')[0]
		if(!result.get(color)) result.set(color, new Map())
		if(!result.get(color).get('opponents')) result.get(color).set('opponents', [])
		if(!result.get(color).get('wins')) result.get(color).set('wins', 0)
		if(!result.get(color).get('loss')) result.get(color).set('loss', 0)
	
		if(line.split('|')[1] === 'name'){
			result.get(color).set('name', line.split('|')[2])
		} else if(line.split('|')[1] === 'age'){
			result.get(color).set('age', line.split('|')[2])
		} else if(line.split('|')[1] === 'win'){
			let wins = result.get(color).get('wins')
			wins++
			result.get(color).set('wins', wins)
			result.get(color).get('opponents').push(line.split('|')[2])
		} else if(line.split('|')[1] === 'loss'){
			let loss = result.get(color).get('loss')
			loss++
			result.get(color).set('loss', loss)
			result.get(color).get('opponents').push(line.split('|')[2])
		}
	}
	for(let [key, value] of result){
		if(!value.get('name') || !value.get('age')){
				result.delete(key)
		}
		let rank = ((value.get('wins') + 1) / (value.get('loss') + 1)).toFixed(2)
		value.set('rank', rank)

		let sorted = value.get('opponents').sort()
		value.set('opponents', sorted)
		
		for(let [k, v] of value){
			if(k === 'wins' || k === 'loss'){
				value.delete(k)
			}
		}
	}
	result = [...result].sort((a,b) => a[0].localeCompare(b[0]))
	let final = {}
	for(let [key, value] of result){
		final[key] = {
			'age': value.get('age'),
			'name': value.get('name'),
			'opponents': value.get('opponents'),
			'rank': value.get('rank'),
		}
	}
	sortedKeys = Object.keys(final).sort((a,b) => a.localeCompare(b))
	console.log(JSON.stringify(final));
}
solve(['red|name|kiko',
'red|win|Vladko',
'blue|age|12',
'green|age|13',
'green|win|gosho',
'red|age|12',
'green|name|Pesho',
'green|win|ico',
'green|win|Gosho',
'green|win|qfkata',
'green|win|stamat',
'green|win|petko',
'green|win|mariya'])

// function solve (input) {
//    	let arr = {};
//    	for (let line of input) {
//        let currentData = dataRows[i].split('|');
//        let color = currentData[0];
//        if (!(color in arr)) {
//             arr[color] = {};
//             arr[color]['opponents'] = [];
//             arr[color]['wins'] = 0;
//             arr[color]['losses'] = 0;
//         }

//        if (currentData[1] === 'name' || currentData[1] === 'age') {
//            arr[color][currentData[1]] = currentData[2];
//        } else {
//            if (currentData[1] === 'win') {
//                arr[color]['wins'] += 1;
//            } else {
//                arr[color]['losses'] +=1;
//            }

//            arr[color]['opponents'].push(currentData[2]);
//        }
//    }

//     let formatedResults = {};
//     Object.keys(arr).sort().forEach(function (key, index) {
//        if (arr[key]['name'] && arr[key]['age']) {
//            arr[key]['opponents'].sort();
//            let rank = (arr[key]['wins'] + 1) / (arr[key]['losses'] + 1);
//            arr[key]['rank'] = rank.toFixed(2);
//            delete arr[key]['wins'];
//            delete arr[key]['losses'];
//            //add at specific order;
//            formatedResults[key] = {};
//            Object.keys(arr[key]).sort().forEach(function (innerKey, index) {
//                formatedResults[key][innerKey] = arr[key][innerKey];
//            });
//        } else {
//            delete arr[key];
//        }
//    });
//    console.log(JSON.stringify(formatedResults));
// }