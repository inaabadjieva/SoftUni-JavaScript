class TitleBar {
	constructor(title){
		this.title = title
		this.menu = []
	}

	addLink(href, name){
		this.menu.push($(`<a class="menu-link" href="${href}">${name}</a>`))
	}

	appendTo(selector){
		let html = this.generate()
		$(selector).append(html)

		let button = html.find('.button')
		button.on('click', function(){
			if($('.drawer').css('display') == 'none'){
				$('.drawer').css('display', 'block')
			} else {
				$('.drawer').css('display', 'none')
			}
		})
	}

	generate(){
		let html = $(`<header class="header">
  <div class="header-row">
    <a class="button">&#9776;</a>
    <span class="title">${this.title}</span>
  </div>
  <div class="drawer">
    <nav class="menu">
    </nav>
  </div>
</header>`)
		let menu = html.find('.menu')
		for(let item of this.menu){
			menu.append(item)
		}

		return html
	}
}