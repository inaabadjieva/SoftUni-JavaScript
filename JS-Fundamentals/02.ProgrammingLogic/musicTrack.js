function track (input){
	let name = input[0]
	let artist = input[1]
	let minutes = input[2]
	console.log(`Now Playing: ${artist} - ${name} [${minutes}]`)
}
track(['Number One', 'Nelly', '4:09'])