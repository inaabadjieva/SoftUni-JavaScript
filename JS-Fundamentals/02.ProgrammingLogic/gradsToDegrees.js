function degrees (grads){
	let degrees = 0.9 * grads;
	let result = degrees % 360;
	 if(result<0) result=360+result;
	 console.log(result);
	}
degrees([-50])