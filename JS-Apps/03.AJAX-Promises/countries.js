function attachEvents() {
	const baseUrl = 'https://baas.kinvey.com/appdata/kid_ByezbzwMe/'
	const base64auth = btoa('guest:guest')
	const authHeaders = {
		'Authorization': 'Basic ' + base64auth,
		'Content-Type': 'application/json'
	}

	$('#loadCountries').on('click', loadCountries)
	$('#addCountry').on('click', addCountry)

	function addCountry() {
		let name = $('#country').val()
		$('#country').val('')
		$.post({
				url: baseUrl + 'countries',
				headers: authHeaders,
				data: JSON.stringify({ name: name })
			})
			.then(loadCountries)
			.catch(() => console.log('error'))
	}

	function loadCountries() {
		$('#countries').empty()
		$.get({
				url: baseUrl + 'countries',
				headers: authHeaders
			})
			.then(displayCountries)
			.catch(displayError)
	}

	function displayCountries(res) {
		$('#countries').empty()
		for (let country of res) {
			$('#countries')
				.append($('<li>').attr('country-id', country._id).addClass('countryList').text(country.name)
					.append($('<input type="text">').attr('id', `edited${country._id}`))
					.append($('<button>')
						.addClass('edit')
						.text('Edit')
						.on('click', editCountry))
					.append($('<button>')
						.addClass('delete')
						.text('Delete')
						.on('click', deleteCountry))
					.append($('<div>')
						.append($('<input type="text">').attr('id', `newTown${country._id}`))
						.append($('<button>')
							.text('Add town')
							.attr('value', country._id)
							.on('click', addTown))
						.append($('<button>')
							.text('Show towns')
							.attr('value', country._id)
							.on('click', function() {
								loadTowns(country._id)
							}))
						.append($('<div>')
							.append($('<ul>').attr('id', 'towns' + country._id)))))
		}
	}

	function editCountry() {
		let id = $(this).parent().attr('country-id')
		let newName = $('#edited' + id).val()
		if (newName != '') {
			$(this).parent().text(newName)
		}
		$.ajax({
				method: 'PUT',
				url: baseUrl + 'countries/' + id,
				headers: authHeaders,
				data: JSON.stringify({ name: newName })
			})
			.then(loadCountries)
			.catch(displayError)

		$('#edited' + id).val('')
	}

	function deleteCountry() {
		let id = $(this).parent().attr('country-id')
		$(this).parent().remove()
		$.ajax({
				method: 'DELETE',
				url: baseUrl + 'countries/' + id,
				headers: authHeaders,
			})
			.then(loadCountries)
			.catch(displayError)
	}

	function addTown() {
		let id = $(this).val()
		let newTown = $(this).parent().find('input').val()
		let postData = {}
		if (newTown != '') {
			postData = {
				name: newTown,
				country: id
			}
		}
		console.log(postData);
		$.post({
				url: baseUrl + 'towns',
				headers: authHeaders,
				data: JSON.stringify(postData)
			})
			.then(function() {
				loadTowns(id)
			})
			.catch(() => console.log('error'))

		$(this).parent().find('input').val('')
	}

	function loadTowns(id) {
		$.get({
				url: baseUrl + `towns?query={"country":"${id}"}`,
				headers: authHeaders
			})
			.then(function(res) {
				displayTowns(id, res)
			})
			.catch(displayError)
	}

	function displayTowns(id, res) {
		$('ul#towns' + id).empty()
		for (let town of res) {
			$('ul#towns' + id)
				.append($('<li>').text(town.name))
		}
	}

	function displayError(res) {
		let errorDiv = $("<div>").text("Error: " +
			err.status + ' (' + err.statusText + ')');
		$(document.body).prepend(errorDiv);
		setTimeout(function() {
			$(errorDiv).fadeOut(function() {
				$(errorDiv).remove();
			});
		}, 3000);
	}
}
