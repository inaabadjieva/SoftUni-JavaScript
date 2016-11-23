function attachEvents() {
	const serviceUrl = 'https://baas.kinvey.com/appdata/kid_ry5GkZmfg/biggestCatches/'
	const base64auth = btoa('guest:guest')
	const authHeaders = { 'Authorization': 'Basic ' + base64auth };

	$('.add').on('click', addCatch)
	$('.load').on('click', loadCatches)

	function addCatch() {
		let requestData = {
			'angler': $('#addForm .angler').val(),
			'weight': Number($('#addForm .weight').val()),
			'species': $('#addForm .species').val(),
			'location': $('#addForm .location').val(),
			'bait': $('#addForm .bait').val(),
			'captureTime': Number($('#addForm .captureTime').val())
		}
		$.ajax({
			method:"POST",
			url: serviceUrl,
			headers: authHeaders,
			data: JSON.stringify(requestData),
			contentType: 'application/json'
		})
			.then(loadCatches)
			.catch(displayError)
	}

	function loadCatches() {
		$.get({
			url: serviceUrl,
			headers: authHeaders
		})
			.then(displayCatches)
			.catch(displayError)
	}
	function updateCatch(id) {
		//let id = $(this).parent().attr('data-id')
		let requestData = {
				'angler': $('[data-id=' + id + '] .angler').val(),
				'weight': Number($('[data-id=' + id + '] .weight').val()),
				'species': $('[data-id=' + id + '] .species').val(),
				'location': $('[data-id=' + id + '] .location').val(),
				'bait': $('[data-id=' + id + '] .bait').val(),
				'captureTime': Number($('[data-id=' + id + '] .captureTime').val())
			}
		$.ajax({
			method: 'PUT',
			url: serviceUrl + id,
			headers: authHeaders,
			data: JSON.stringify(requestData),
			contentType: 'application/json'
		})
			.then(loadCatches)
			.catch(displayError)
	}

	function deleteCatch(id) {
		//let id = $(this).parent().attr('data-id')
		let request = {
			method: 'DELETE',
			url: serviceUrl + id,
			headers: authHeaders
		}
		$.ajax(request)
			.then(loadCatches)
			.catch(displayError)
	}

	function displayCatches(res) {
		$('#catches').empty()
		for (let obj of res) {
			$('#catches')
				.append($('<div>').attr('class', 'catch').attr('data-id', obj._id)
					.append($('<label>').text('Angler'))
					.append($('<input>')
						.attr('type', 'text')
						.attr('class', 'angler')
						.val(obj.angler))
					.append($('<label>').text('Weight'))
					.append($('<input>')
						.attr('type', 'number')
						.attr('class', 'weight').val(obj.weight))
					.append($('<label>').text('Species'))
					.append($('<input>')
						.attr('type', 'text')
						.attr('class', 'species')
						.val(obj.species))
					.append($('<label>').text('Location'))
					.append($('<input>')
						.attr('type', 'text')
						.attr('class', 'location')
						.val(obj.location))
					.append($('<label>').text('Bait'))
					.append($('<input>')
						.attr('type', 'text')
						.attr('class', 'bait')
						.val(obj.bait))
					.append($('<label>').text('Capture Time'))
					.append($('<input>')
						.attr('type', 'number')
						.attr('class', 'captureTime')
						.val(obj.captureTime))
					.append($('<button>')
						.attr('class', 'update')
						.text('Update')
						.on('click', function() {
							updateCatch(obj._id)
						}))
					.append($('<button>')
						.attr('class', 'delete')
						.text('Delete')
						.on('click', function() {
							deleteCatch(obj._id)
						})))
		}
	}
	function displayError() {
		console.log('Error');
	}
}
