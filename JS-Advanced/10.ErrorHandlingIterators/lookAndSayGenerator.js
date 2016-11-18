function* lookAndSay(seq) {
	let str = '' + seq
	while (true) {
		str = generateNext(str)
		yield str
	}

	function generateNext(str) {
		let res = '';
		for (let i = 0; i < str.length; i++) {
			let count = 1;
			for (let j = i + 1; j < str.length; j++) {
				if (str[i] === str[j]) {
					count++;
				} else {
					i = j - 1;
					break;
				}
				i = j
			}
			res += `${count}${str[i]}`;
		}
		return res;
	}
}

let lookSequence = lookAndSay(1);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
