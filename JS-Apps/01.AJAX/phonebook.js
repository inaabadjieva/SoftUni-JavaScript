function attachEvents() {
	$('#btnLoad').on('click', loadContacts)
	$('#btnCreate').on('click', createContact)

	function loadContacts() {
		$('#phonebook').empty()
		$.get('https://phonebook-nakov.firebaseio.com/phonebook.json')
			.then(displayContacts)
			.catch(displayError)
	}

	function createContact() {
		let contact = {
			'person': $('#person').val(),
			'phone': $('#phone').val()
		}
		$.post('https://phonebook-nakov.firebaseio.com/phonebook.json', JSON.stringify(contact))
			.then(loadContacts)
			.catch(displayError)
		$('#person').val('')
		$('#phone').val('')
	}

	function displayContacts(res) {
		for (let key in res) {
			$('#phonebook')
				.append($('<li>').text(`${res[key]['person']}: ${res[key]['phone']} `)
					.append($('<button>[Delete]</button>').on('click', function(){
						deleteContact(key)	
					})))
		}
	}

	function displayError() {
		$('#phonebook').append($('<li>').text('Error'))
	}

	function deleteContact(key) {
		let request = {
			method: 'DELETE',
			url: `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`
		}
		$.ajax(request)
			.then(loadContacts)
			.catch(displayError)
	}
}
