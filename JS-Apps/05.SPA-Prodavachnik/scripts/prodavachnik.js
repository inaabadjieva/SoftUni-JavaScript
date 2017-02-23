function startApp() {
	const baseUrl = "https://baas.kinvey.com/";
	const appKey = "kid_SJ6RMudfe";
	const appSecret = "c5dada14bae6477f9c727a1df5ea3e37";
	const authHeaders = {
		"Authorization": "Basic " + btoa(appKey + ":" + appSecret),
		"Content-Type": "application/json"
	};

	sessionStorage.clear();
	showHideMenuLinks();
	showView('viewHome');

	// Bind the navigation menu links
	$("#linkHome").click(showHomeView);
	$("#linkLogin").click(showLoginView);
	$("#linkRegister").click(showRegisterView);
	$("#linkListAds").click(listAds);
	$("#linkCreateAd").click(showCreateAdView);
	$("#linkLogout").click(logoutUser);

	// Bind the form submit buttons
	$("#buttonLoginUser").click(loginUser);
	$("#buttonRegisterUser").click(registerUser);
	$("#buttonCreateAd").click(createAd);
	$("#buttonEditAd").click(editAd)

	// Bind the info / error boxes: hide on click
	$("#infoBox, #errorBox").click(function() {
		$(this).fadeOut();
	})

	// Attach AJAX "loading" event listener
	$(document).on({
		ajaxStart: function() { $("#loadingBox").show() },
		ajaxStop: function() { $("#loadingBox").hide() }
	})

	function showHideMenuLinks() {
		$("#linkHome").show();
		if (sessionStorage.getItem('authToken')) {
			// We have logged in user
			$("#linkLogin").hide();
			$("#linkRegister").hide();
			$("#linkListAds").show();
			$("#linkCreateAd").show();
			$("#linkLogout").show();
		} else {
			// No logged in user
			$("#linkLogin").show();
			$("#linkRegister").show();
			$("#linkListAds").hide();
			$("#linkCreateAd").hide();
			$("#linkLogout").hide();
		}
	}

	function showView(viewName) {
		// Hide all views and show the selected view only
		$('main > section').hide();
		$('#' + viewName).show()
	}

	function showHomeView() {
		showView('viewHome')
	}

	function showLoginView(event) {
		showView('viewLogin')
		$('#formLogin').trigger('reset')
	}

	function showRegisterView() {
		$('#formRegister').trigger('reset')
		showView('viewRegister')
	}

	function showCreateAdView() {
		$('#formCreateAd').trigger('reset');
		showView('viewCreateAd')
	}

	function registerUser() {
		let username = $('#formRegister input[name=username]').val()
		let password = $('#formRegister input[name=passwd]').val()
		let userData = {}
		if (username != '' && password != '') {
			userData = {
				username: username,
				password: password
			};
		} else {
			showError('Please fill in all fields')
		}
		$.ajax({
			method: "POST",
			url: baseUrl + "user/" + appKey + "/",
			headers: authHeaders,
			data: JSON.stringify(userData),
			success: registerSuccess,
			error: handleAjaxError
		})

		function registerSuccess(userInfo) {
			saveAuthInSession(userInfo);
			showHideMenuLinks();
			listAds();
			showInfo('User registration successful.');
		}
	}

	function loginUser() {
		let userData = {
			username: $('#formLogin input[name=username]').val(),
			password: $('#formLogin input[name=passwd]').val()
		};
		$.ajax({
			method: "POST",
			url: baseUrl + "user/" + appKey + "/login",
			headers: authHeaders,
			data: JSON.stringify(userData),
			success: loginSuccess,
			error: handleAjaxError
		})

		function loginSuccess(userInfo) {
			saveAuthInSession(userInfo);
			showHideMenuLinks();
			listAds();
			showInfo('Login successful.');
		}
	}

	function saveAuthInSession(user) {
		let userAuth = user._kmd.authtoken;
		sessionStorage.setItem('authToken', userAuth);
		let userId = user._id;
		sessionStorage.setItem('userId', userId);
		let username = user.username;
		$('#loggedInUser').text(
			"Welcome, " + username + "!");
	}

	function logoutUser() {
		sessionStorage.clear();
		$('#loggedInUser').text("");
		showHideMenuLinks();
		showView('viewHome');
		showInfo('Logout successful.');
	}

	function handleAjaxError(response) {
		let errorMsg = JSON.stringify(response);
		if (response.readyState === 0)
			errorMsg = "Cannot connect due to network error.";
		if (response.responseJSON &&
			response.responseJSON.description)
			errorMsg = response.responseJSON.description;
		showError(errorMsg);
	}

	function showInfo(message) {
		$('#infoBox').text(message);
		$('#infoBox').show();
		setTimeout(function() {
			$('#infoBox').fadeOut();
		}, 3000);
	}

	function showError(errorMsg) {
		$('#errorBox').text("Error: " + errorMsg);
		$('#errorBox').show();
	}

	function listAds() {
		$('#ads').empty();
		showView('viewAds');
		$.ajax({
			method: "GET",
			url: baseUrl + "appdata/" + appKey + "/ads",
			headers: getUserAuthHeaders(),
			success: loadAdsSuccess,
			error: handleAjaxError
		});

		function loadAdsSuccess(ads) {
			showInfo('Ads loaded.');
			if (ads.length == 0) {
				$('#ads').text('No ads in the moment.');
			} else {
				let adsTable = $('<table>')
					.append(`<tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Publisher</th>
                    <th>Date Published</th>
                    <th>Price</th>
                    <th>Views</th>
                    <th>Actions</th>
                </tr>`);
				for (let ad of ads) {
					let links = [];
					if (ad._acl.creator === sessionStorage.userId) {
						let deleteLink = $('<a href="#">[Delete]</a>')
							.click(function() { deleteAd(ad) });
						let editLink = $('<a href="#">[Edit]</a>')
							.click(function() { loadAdForEdit(ad) });
						let readMoreLink = $('<a href="#">[Read more]</a>')
							.click(function() { readMore(ad) });	
						links = [readMoreLink ,' ', deleteLink, ' ', editLink];
					}
					let publisher = ''
					$.get({
						url: baseUrl + 'user/' + appKey + '/' + ad.publisher,
						headers: getUserAuthHeaders(),
						success: buildTable,
						error: handleAjaxError
					})

					function buildTable(res) {
						adsTable.append($('<tr>').append(
							$('<td>').text(ad.title),
							$('<td>').text(ad.description),
							$('<td>').text(res.username),
							$('<td>').text(ad.date),
							$('<td>').text(ad.price),
							$('<td>').text(ad.views),
							$('<td>').append(links)
						));
					}
				}
				$('#ads').append(adsTable);
			}
		}
	}

	function getUserAuthHeaders() {
		return {
			"Authorization": "Kinvey " +
				sessionStorage.getItem('authToken'),
		};
	}

	function createAd() {
		let adData = {
			title: $('#formCreateAd input[name=title]').val(),
			publisher: sessionStorage.userId,
			description: $('#formCreateAd textarea[name=description]').val(),
			date: $('#formCreateAd input[name=datePublished]').val(),
			price: $('#formCreateAd input[name=price]').val(),
			image: $('#formCreateAd input[name=image]').val(),
			views: 0
		};
		$.ajax({
			method: "POST",
			url: baseUrl + "appdata/" + appKey + "/ads",
			headers: getUserAuthHeaders(),
			data: adData,
			success: createAdSuccess,
			error: handleAjaxError
		})

		function createAdSuccess(response) {
			listAds();
			showInfo('Ad created.');
		}
	}

	function loadAdForEdit(ad) {
		$.ajax({
			method: "GET",
			url: baseUrl + "appdata/" + appKey + "/ads/" + ad._id,
			headers: getUserAuthHeaders(),
			success: loadAdForEditSuccess,
			error: handleAjaxError
		});

		function loadAdForEditSuccess(ad) {
			$('#formEditAd input[name=id]').val(ad._id);
			$('#formEditAd input[name=title]').val(ad.title);
			$('#formEditAd input[name=publisher]').val(ad.publisher);
			$('#formEditAd input[name=views]').val(ad.views);
			$('#formEditAd textarea[name=description]').val(ad.description);
			$('#formEditAd input[name=datePublished]').val(ad.date);
			$('#formEditAd input[name=price]').val(ad.price);
			$('#formEditAd input[name=image]').val(ad.image);
			showView('viewEditAd');
		}
	}

	function editAd() {
		let adData = {
			title: $('#formEditAd input[name=title]').val(),
			publisher: $('#formEditAd input[name=publisher]').val(),
			description: $('#formEditAd textarea[name=description]').val(),
			date: $('#formEditAd input[name=datePublished]').val(),
			price: $('#formEditAd input[name=price]').val(),
			image: $('#formEditAd input[name=image]').val(),
			views:  $('#formEditAd input[name=views]').val()
		};
		$.ajax({
			method: "PUT",
			url: baseUrl + "appdata/" + appKey +
				"/ads/" + $('#formEditAd input[name=id]').val(),
			headers: getUserAuthHeaders(),
			data: adData,
			success: editAdSuccess,
			error: handleAjaxError
		});

		function editAdSuccess(response) {
			listAds();
			showInfo('Ad edited.');
		}
	}

	function deleteAd(ad) {
		$.ajax({
			method: "DELETE",
			url: baseUrl + "appdata/" + appKey + "/ads/" + ad._id,
			headers: getUserAuthHeaders(),
			success: deleteAdSuccess,
			error: handleAjaxError
		});

		function deleteAdSuccess(response) {
			listAds();
			showInfo('Ad deleted.');
		}
	}

	function readMore(ad) {
		//incrementViews(ad)
		$.ajax({
			method: "GET",
			url: baseUrl + "appdata/" + appKey + "/ads/" + ad._id,
			headers: getUserAuthHeaders(),
			success: loadSingleAdSuccess,
			error: handleAjaxError
		});
		function loadSingleAdSuccess(ad) {
			$('#viewSingleAd img').attr('src', ad.image);
			$('#viewSingleAd h3[name=price]').text(ad.price + '$');
			$('#viewSingleAd h3[name=title]').text(ad.title);
			$('#viewSingleAd h3[name=description]').text(ad.description);
			$('#viewSingleAd h3[name=datePublished]').text(ad.date);
			$('#viewSingleAd h3[name=views]').text(ad.views);
			showView('viewSingleAd');
		}
	}
	// function incrementViews(ad){
	// 		let adData = {
	// 		title: ad.title,
	// 		publisher: ad.publisher,
	// 		description: ad.description,
	// 		date: ad.date,
	// 		price: ad.price,
	// 		image: ad.image,
	// 		views:  ad.views++
	// 	};
	// 	$.ajax({
	// 		method: "PUT",
	// 		url: baseUrl + "appdata/" + appKey + "/ads/" + ad._id,
	// 		headers: getUserAuthHeaders(),
	// 		data: adData,
	// 		error: handleAjaxError
	// 	});
	//}
}
