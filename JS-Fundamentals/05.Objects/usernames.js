function usernames(input){
	let usernames = new Set()
	for (let line of input){
		usernames.add(line)
	}
	console.log([...usernames].sort((a,b) => a.length - b.length || a.localeCompare(b)).join('\n'));
}
usernames(['Denise',
'Ignatius',
'Iris',
'Isacc',
'Indie',
'Dean',
'Donatello',
'Enfuego',
'Benjamin',
'Biser',
'Bounty',
'Renard',
'Rot'])