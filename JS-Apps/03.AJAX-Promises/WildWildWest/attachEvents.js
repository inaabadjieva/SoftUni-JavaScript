function attachEvents() {
	const baseUrl = 'https://baas.kinvey.com/appdata/kid_B1UP7ALMx/players/'
	const authHeaders = {
		'Authorization': 'Basic ' + btoa('guest:guest'),
		'Content-Type': 'application/json'
	}
	const addBtn = $('#addPlayer')
	let resultPlayer = ''

	loadPlayers()
	addBtn.on('click', addPlayer)

	function loadPlayers() {
		$.get({
				url: baseUrl,
				headers: authHeaders
			})
			.then(function(res) {
				$('#players').empty()
				for (let player of res) {
					$('#players')
						.append($('<div>').addClass('player').attr('data-id', player._id)
							.append($('<div>').addClass('row')
								.append($('<label>').text('Name:'))
								.append($('<label>').addClass('name').text(player.name)))
							.append($('<div>').addClass('row')
								.append($('<label>').text('Money:'))
								.append($('<label>').addClass('money').text(player.money)))
							.append($('<div>').addClass('row')
								.append($('<label>').text('Bullets:'))
								.append($('<label>').addClass('bullets').text(player.bullets)))
							.append($('<button>')
								.addClass('play')
								.text('Play')
								.on('click', function(){
									play(player._id)
								}))
							.append($('<button>')
								.addClass('delete')
								.text('Delete')
								.on('click', deletePlayer)))
				}
			})
			.catch(displayError)
	}

	function addPlayer() {
		let postData = {
			name: $('#addName').val(),
			money: 500,
			bullets: 6
		}
		$('#addName').val('')
		$.post({
				url: baseUrl,
				headers: authHeaders,
				data: JSON.stringify(postData)
			})
			.then(loadPlayers)
			.catch(displayError)
	}

	function deletePlayer() {
		let id = $(this).parent().attr('data-id')
		$.ajax({
				method: 'DELETE',
				url: baseUrl + id,
				headers: authHeaders,
			})
			.then(loadPlayers)
			.catch(displayError)
	}

	function play(id) {
		getCurrentPlayer(id)
			.then(function(player) {
				save(player)
				$('canvas').css('display','block')
				$('#save').css('display','block')
				$('#reload').css('display','block')
				let resultPlayer = loadCanvas({
					_id: player._id,
					name: player.name,
					money: player.money,
					bullets: player.bullets
				})
				$('#save').on('click', function(){
					save(resultPlayer)
				})
				$('#reload').on('click', function(){
					reload(resultPlayer)
				})
			})
			.catch(displayError)
	}

	function getCurrentPlayer(id) {
		return $.get({
			url: baseUrl + id,
			headers: authHeaders
		})
	}

	function save(player, canvas) {
		let putData = {
			name: player.name,
			money: player.money,
			bullets: player.bullets
		}
		$.ajax({
				method: 'PUT',
				url: baseUrl + player._id,
				headers: authHeaders,
				data: JSON.stringify(putData)
			})
			.then(loadPlayers)
			.catch(displayError)
		$('canvas').css('display','none')
		$('#save').css('display','none')
		$('#reload').css('display','none')
		clearInterval(interval)
	}

	function reload(player) {
		let putData = {
			name: player.name,
			money: player.money - 60,
			bullets: 6
		}
		$.ajax({
				method: 'PUT',
				url: baseUrl + player._id,
				headers: authHeaders,
				data: JSON.stringify(putData)
			})
			.then(function(){
				loadPlayers()
				play(player._id)
			})
			.catch(displayError)
	}

	function displayError(err) {
		console.log(err);
	}
}
