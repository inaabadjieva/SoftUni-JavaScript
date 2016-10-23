function domSearch(selector, casing) {
   let content = $('#root')
   let addControls = $('<div>').addClass('add-controls')
								   			.append($('<label>Enter text: </label>')
								   				.append($('<input>')))
								   			.append($('<a>Add</a>').addClass('button').css('display', 'inline-block'))
   	let searchControls = $('<div>').addClass('search-controls')
   													.append($('<label>Search: </label>')
										   				.append($('<input>')))
	let resultControls = $('<div>').addClass('result-controls')
   													.append($('<ul>').addClass('items-list'))

 	content.append(addControls).append(searchControls).append(resultControls)
   	
   	$('.add-controls .button').on('click', function(){
   		let text = $('.add-controls input').val()
   		$('.result-controls ul')
   			.append($('<li>').addClass('list-item')
   				.append($('<a>X</a>').addClass('button'))
   				.append($('<strong>').text(text)))
   		$('.add-controls input').val('') 
   	})

   	$('ul').on('click', 'a',  function(){
   		$(this).parent().remove()
   	})
   	
	$('.search-controls input').on('input', function(){
		let searched = $('.search-controls input').val()
		if(casing === true){
			$('.items-list li').each((index, item) => {
				let str = item.textContent.slice(1) 
		   		if(str.includes(searched)){
		   			$(item).removeAttr('style')
		   		} else {
		   			$(item).attr('style', 'display: none')
		   		}
		   	})
		} else {
			searched = searched.toLowerCase()
			$('.items-list li').each((index, item) => {
				let str = item.textContent.slice(1).toLowerCase()
		   		if(str.includes(searched)){
		   			$(item).removeAttr('style')
		   		} else {
		   			$(item).attr('style', 'display: none')
		   		}
		   	})
		}  	
	})
}