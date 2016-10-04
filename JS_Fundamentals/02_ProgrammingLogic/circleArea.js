'use strict'
function circleArea (input) {
	let radius = Number(input[0]);
	let area = Math.PI * radius * radius;
	console.log(area);
	console.log(area.toFixed(2));
}
circleArea([5]);