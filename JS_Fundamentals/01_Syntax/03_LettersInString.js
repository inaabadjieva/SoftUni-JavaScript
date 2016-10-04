'use strict'
function countLetter ([str, letter]) {
	let count = 0;
	for(let l of str) {
		if(l==letter)
			count ++;
	}
	return count;
}
countLetter(['hello','l']);