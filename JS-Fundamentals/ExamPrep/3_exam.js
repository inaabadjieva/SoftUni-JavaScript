function solve(input){
	let specialKey = input.shift();
    let messagePattern = "((?: |^)";
    for(let i = 0; i < specialKey.length; i++){
        messagePattern += "[" + specialKey[i].toLowerCase() + specialKey.toUpperCase() + "]";
    }

    messagePattern += "[ ]+)([!#$%A-Z]{8,})( |\\.|,|$)";
    let messageRegex = new RegExp(messagePattern,'g');

    for(let i = 0; i < input.length; i++){
        let line = input[i].replace(messageRegex,replacer);
        console.log(line);
    }

    function replacer(match,group1,group2,group3){
        group2 = group2.replace(/!/g,'1')
            .replace(/%/g, '2')
            .replace(/\#/g,'3')
            .replace(/\$/g,'4')
            .replace(/[A-Z]/g,x=>x.toLowerCase());
        return group1 + group2 + group3;
    }


	// let key = input.shift()
	// for(let line of input){
	// 	let regex = new RegExp('\\s*' + key + '\\b', 'gi')
	// 	let matches = line.match(regex)
	// 	if(matches != null){
	// 		for(let match of matches){
	// 			let pattern = new RegExp(match.trim() + '\\s+([A-Z!%$#]{8,})[.|,|\\s*|\\b]', 'g')
	// 			let result = pattern.exec(line)
	// 			//console.log(result);
	// 			if(result != null){
	// 				let word = result[1].toLowerCase()
	// 				word = word.replace(/!/g, '1').replace(/%/g, '2').replace(/#/g, '3').replace(/\$/g, '4')
	// 				line = line.replace(result[1], word)
	// 			}	
	// 		}
	// 	}		
	// 	console.log(line);	
	// }
}
solve(['specialKey',
'In this text the specialKey HELLOWORLD! is correct, but',
'the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while SPECIALKEY ##$$##$$.',
'SpeCIaLkeY   SOM%%ETH$IN and SPECIALKEY ##$$##$$ are!'])