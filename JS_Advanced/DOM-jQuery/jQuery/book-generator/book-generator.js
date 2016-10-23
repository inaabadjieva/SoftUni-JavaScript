let createBook = (function createBook(){
   	let id = 1
   	return function(selector, title, author, isbn){
   		let fragment = document.createDocumentFragment()
   		let container = $(selector)
   		let bookContainer = $('<div>').attr('id', 'book' + id)
   		let selectBtn = $('<button>Select</button>')
   		let deselectBtn = $('<button>Deselect</button>')
    	
    	id++	
  	
    	selectBtn.on('click', function() {
    		bookContainer.css('border', '2px solid blue')
    	})	
    		
    	deselectBtn.on('click', function() {
    		bookContainer.css('border', 'none')
    	})		

    	bookContainer
    			.append($('<p>').text(title).addClass('title'))
    			.append($('<p>').text(author).addClass('author'))
    			.append($('<p>').text(isbn).addClass('isbn'))
    			.append(selectBtn)	
    			.append(deselectBtn)	
    			
    	bookContainer.appendTo(fragment)		
    	container.append(fragment)    		
    }
}())