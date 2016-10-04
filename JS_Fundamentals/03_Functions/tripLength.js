function trip([x1, y1, x2, y2, x3, y3]) {
	let distance1 = getDistance(x1, y1, x2, y2)
	let distance2 = getDistance(x2, y2, x3, y3)
	let distance3 = getDistance(x1, y1, x3, y3)
	
	let minDist = Math.min(distance1+ distance2, distance2+distance3, distance3+distance1)
	if(minDist == distance1+ distance2){
		console.log(`1->2->3: ${minDist}`)
	} else if(minDist == distance2+distance3){
		console.log(`1->3->2: ${minDist}`)
	} else if(minDist == distance3+distance1){
		console.log(`2->1->3: ${minDist}`)
	}
	function getDistance(x, y, x1, y1) {
		let distance = Math.sqrt((x-x1)*(x-x1) + (y-y1)*(y-y1))
		return distance	
	}
}
trip([0, 0, 2, 0, 4, 0])
trip([5, 1, 1, 1, 5, 4])
trip([-1, -2, 3.5, 0, 0, 2])