function attachEvents() {
	const serviceUrl = 'https://baas.kinvey.com/appdata/kid_HJG4tgGzx'
	const base64auth = btoa('peter:p')
	const authHeaders = { 'Authorization': 'Basic ' + base64auth };

	$('#btnLoadPosts').on('click', loadPosts)
	$('#btnViewPost').on('click', viewPost)

	function loadPosts() {
		$('#posts').empty()
		let request = {
			url: serviceUrl + '/posts',
			headers: authHeaders
		}
		$.ajax(request)
			.then(displayPosts)
			.catch(displayError)
	}

	function displayPosts(res) {
		for (let obj of res) {
			$('#posts').append($('<option>').text(obj.title).val(obj._id))
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

	function viewPost() {
		let selectedPostId = $('#posts').val();
		if (!selectedPostId) return;
		let requestPosts = $.ajax({
			url: serviceUrl + "/posts/" + selectedPostId,
			headers: authHeaders
		});
		let requestComments = $.ajax({
			url: serviceUrl + `/comments/?query={"post_Id":"${selectedPostId}"}`,
			headers: authHeaders
		});
		Promise.all([requestPosts, requestComments])
			.then(displayPostWithComments)
			.catch(displayError);
	}

	function displayPostWithComments([post, comments]) {
		$('#post-title').text(post.title)
		$('#post-body').text(post.body)
		$('#comments').empty()
		for (let comment of comments) {
			console.log(comment);
			$('#post-comments').append($('<li>').text(comment.text))
		}
	}
}
