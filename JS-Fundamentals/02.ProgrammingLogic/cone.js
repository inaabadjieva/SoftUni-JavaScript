'use strict'
function cone (input) {
	let r = Number(input[0]);
	let h = Number(input[1]);
	let volume =  Math.PI * r * r * h / 3;
	let area = Math.PI * r * (r + Math.sqrt(r * r + h * h));
	console.log('volume = ' + volume.toFixed(4));
	console.log('area = ' + area.toFixed(4));
}
cone([3, 5]);