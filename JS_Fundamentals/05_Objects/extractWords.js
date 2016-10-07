function extractWords(input){
	let wordPattern = /\b[a-zA-Z0-9_]+\b/g
  	let words = new Set()
  	for (let line of input) {
    	let matches = line.match(wordPattern)
    	matches.forEach(x=>words.add(x.toLowerCase()))
  }
  console.log([...words.values()].join(", "));
}
extractWords(['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.', 
'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
'Vestibulum dolor diam, dignissi\'m quis varius non, fermentum non felis.', 
'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.', 
'Morbi in ipsum varius, pharetra diam vel, mattis arcu.', 
'Integer ac turpis commodo, varius nulla sed, elementum lectus.',
'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.'])