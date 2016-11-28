function solve() {
	//const appKey = 'kid_BJXTsSi-e'
	const appSecret = '447b8e7046f048039d95610c1b039390'
	const baseUrl = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students'
	const authHeaders = {
		'Authorization': 'Basic ' + btoa('guest:guest'),
		'Content-Type': 'application/json'
	}

	loadStudents()
	$('#add').on('click', addStudent)

	function loadStudents() {
		$('#results').find('tr#body').remove();
		$.get({
				url: baseUrl,
				headers: authHeaders
			})
			.then(function(res) {
				let students = res.sort((a, b) => a.ID - b.ID)
				for (let student of students) {
					$('#results')
						.append($('<tr id="body">')
							.append($('<td>').text(student.ID))
							.append($('<td>').text(student.FirstName))
							.append($('<td>').text(student.LastName))
							.append($('<td>').text(student.FacultyNumber))
							.append($('<td>').text(student.Grade)))
				}
			})
			.catch(function(err) {
				console.log(err)
			})
	}

	function addStudent() {
		let id = Number($('#ID').val())
		let firstName = $('#firstName').val()
		let lastName = $('#lastName').val()
		let facultyNumber = $('#facultyNumber').val()
		let grade = Number($('#grade').val())

		let facultyRegex = /^\d+$/g
		let postData = {}
		if (id != '' && 
			firstName != '' &&
			lastName != '' &&
			facultyRegex.test(facultyNumber) &&
			grade != '' ) {
			postData = {
				ID: id,
				FirstName: firstName,
				LastName: lastName,
				FacultyNumber: facultyNumber,
				Grade: grade,
			}
		}
		$('#ID').val('')
		$('#firstName').val('')
		$('#lastName').val('')
		$('#facultyNumber').val('')
		$('#grade').val('')

		$.post({
				url: baseUrl,
				headers: authHeaders,
				data: JSON.stringify(postData)
			})
			.then(loadStudents)
			.catch(() => console.log('error'))
	}
}
