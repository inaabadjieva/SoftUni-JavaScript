function tableBuilder(selector){
	let selector = selector
	let table = $('<table>').append($('<tr>'))
	function createTable(columnNames){
		columnNames.forEach(e => table.append($('<th>').text(name)))
		table.append($('<th>').text('Action'))
		selector.append(table)
	}
	function fillData(dataRows){
		for(let dataRow of dataRows){
			let row = table.append($('<tr>'))	
			for(let data of dataRow){
				row.append($('<tr>').text(data))
			}
		}
		return table
	}
	return {
		createTable,
		fillData
	}
}