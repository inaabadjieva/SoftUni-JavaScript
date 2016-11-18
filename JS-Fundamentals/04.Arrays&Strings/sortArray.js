function sort(input){
	input.sort(function(a, b){
	    if (a.length != b.length){
	    	return a.length - b.length;
	    }
	    else {
	    	return a.localeCompare(b)
	    }   
	})
	console.log(input.join('\n'))
}
sort(['test',
	'Deny',
	'omen',
	'Default'])