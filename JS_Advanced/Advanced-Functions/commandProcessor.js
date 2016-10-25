function processCommands(commands){
	let commandProcessor = (function(){
		let text = ''
		return {
			append: (newText) => text += newText,
			removeStart: (count) => text = text.slice(count),
			removeEnd: (count) => text = text.slice(0, text.length - count),
			print: () => console.log(text)
		}
	})()
	for(let command of commands){
		let [commandName, arg] = command.split(' ')
		commandProcessor[commandName](arg)
	}	
}
processCommands(['append 123', 'append 45', 'removeStart 2', 'removeEnd 1', 'print']); 