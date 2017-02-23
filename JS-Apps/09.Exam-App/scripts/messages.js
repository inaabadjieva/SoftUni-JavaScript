function startApp() {
	const baseUrl = "https://baas.kinvey.com/";
	const appKey = "kid_Hycfpu9mg";
	const appSecret = "fffba61a5d414213b9b8761415aa7998";
	const authHeaders = {
		"Authorization": "Basic " + btoa(appKey + ":" + appSecret),
		"Content-Type": "application/json"
	};

	$('#spanMenuLoggedInUser').css("display","none");
	sessionStorage.clear();
	showHideMenuLinks();

	//links
	$("#linkMenuAppHome").click(showAppHome);
	$("#linkMenuUserHome").click(showUserHome);

	$("#linkMenuLogin").click(showLoginView);
	$("#linkMenuRegister").click(showRegisterView);

	$("#linkMenuMyMessages").click(listMyMessages);
	$("#linkUserHomeMyMessages").click(listMyMessages);

	$("#linkMenuArchiveSent").click(listSentMessages);
	$("#linkUserHomeArchiveSent").click(listSentMessages);

	$("#linkMenuSendMessage").click(showSendMessage);
	$("#linkUserHomeSendMessage").click(showSendMessage);

	$("#linkMenuLogout").click(logoutUser);

	//buttons
	$("#formLogin").submit(loginUser);
	$("#formRegister").submit(registerUser);
	$("#formSendMessage").submit(sendMessage);

	$("#infoBox, #errorBox").click(function() {
		$(this).fadeOut();
	})

	$(document).on({
		ajaxStart: function() { $("#loadingBox").show() },
		ajaxStop: function() { $("#loadingBox").hide() }
	})

	function showHideMenuLinks() {
		if (sessionStorage.getItem('authToken')) {
			showView('viewUserHome');
			$("#linkMenuUserHome").show();
			$("#linkMenuAppHome").hide();
			$("#linkMenuLogin").hide();
			$("#linkMenuRegister").hide();
			$("#linkMenuMyMessages").show();
			$("#linkMenuArchiveSent").show();
			$("#linkMenuSendMessage").show();
			$("#linkMenuLogout").show();
		} else {
			showView('viewAppHome');
			$("#linkMenuUserHome").hide();
			$("#linkMenuAppHome").show();
			$("#linkMenuLogin").show();
			$("#linkMenuRegister").show();
			$("#linkMenuMyMessages").hide();
			$("#linkMenuArchiveSent").hide();
			$("#linkMenuSendMessage").hide();
			$("#linkMenuLogout").hide();
		}
	}

	function showView(viewName) {
		$('main > div').hide();
		$('main > section').hide();
		$('#' + viewName).show();
	}

	function showAppHome() {
		showView('viewAppHome')
	}

	function showLoginView(event) {
		showView('viewLogin')
		$('#formLogin').trigger('reset')
	}

	function showRegisterView() {
		showView('viewRegister')
		$('#formRegister').trigger('reset')
	}

	function showUserHome() {
		showView('viewUserHome');
	}

	function showSendMessage() {
		$('#formSendMessage').trigger('reset');
		$.ajax({
			method: "GET",
			url: baseUrl + "user/" + appKey + "/",
			headers: getUserAuthHeaders(),
			success: loadUsersSuccess,
			error: handleAjaxError
		})

		function loadUsersSuccess(users) {
			$('#msgRecipientUsername').find('option').remove();
			for(let key in users) {
				$('#msgRecipientUsername')
					.append($('<option>').text(formatSender(users[key].name, users[key].username)));
			}
			showView('viewSendMessage')
		}
	}

	function registerUser() {
		event.preventDefault()
		let username = $('#registerUsername').val()
		let password = $('#registerPasswd').val()
		let name = $('#registerName').val()
		let userData = {}
		if (username != '' && password != '' && name != '') {
			userData = {
				username: username,
				password: password,
				name: name
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
			showInfo('User registration successful.');
		}
	}

	function loginUser() {
		event.preventDefault()
		let userData = {
			username: $('#loginUsername').val(),
			password: $('#loginPasswd').val()
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
			showUserHome();
			showInfo('Login successful.');
		}
	}

	function saveAuthInSession(user) {
		sessionStorage.setItem('authToken', user._kmd.authtoken);
		sessionStorage.setItem('userId', user._id);
		sessionStorage.setItem('username', user.username);
		sessionStorage.setItem('name', user.name);
		$('#spanMenuLoggedInUser').css("display","");
		$('#spanMenuLoggedInUser').text(
			"Welcome, " + user.username + "!");
		$('#viewUserHomeHeading').text(
			"Welcome, " + sessionStorage.getItem("username") + "!");
	}

	function logoutUser() {
       $.ajax({
          	method: "POST",
          	url: baseUrl + "user/" + appKey + "/_logout",
          	headers: getUserAuthHeaders(),
          	success: logoutSuccess,
			error: handleAjaxError
       });

		function logoutSuccess() {
			sessionStorage.clear();
			$('#spanMenuLoggedInUser').text("");
			showHideMenuLinks();
			showView('viewAppHome');
			showInfo('Logout successful.');
		}
	}

	function getUserAuthHeaders() {
		return {
			"Authorization": "Kinvey " +
				sessionStorage.getItem('authToken'),
		};
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

	function listMyMessages() {
		$('#myMessages').empty();
		showView('viewMyMessages');
		$.ajax({
			method: "GET",
			url: baseUrl + "appdata/" + appKey + `/messages?query={"recipient_username":"${sessionStorage.getItem('username')}"}`,
			headers: getUserAuthHeaders(),
			success: loadMessagesSuccess,
			error: handleAjaxError
		});

		function loadMessagesSuccess(messages) {
			showInfo('Messages loaded.');
			let myMessagesTable = $('<table>')
					.append($('<tr>')
						.append('<th>From</th><th>Message</th><th>Data Received</th>'));
			if (messages.length == 0) {
				$('#myMessages').append(myMessagesTable);
			} else {
				for (let message of messages) {
					myMessagesTable.append($('<tr>').append(
						$('<td>').text(formatSender(message.sender_username, message.sender_name)),
						$('<td>').text(message.text),
						$('<td>').text(formatDate(message._kmd.lmt))
						));
				}
				$('#myMessages').append(myMessagesTable);
			}
		}
	}

	function listSentMessages() {
		$('#sentMessages').empty();
		showView('viewArchiveSent');
		$.ajax({
			method: "GET",
			url: baseUrl + "appdata/" + appKey + `/messages?query={"sender_username":"${sessionStorage.getItem('username')}"}`,
			headers: getUserAuthHeaders(),
			success: loadMessagesSuccess,
			error: handleAjaxError
		});

		function loadMessagesSuccess(messages) {
			showInfo('Messages loaded.');
			let sentMessagesTable = $('<table>')
					.append($('<tr>')
						.append('<th>To</th><th>Message</th><th>Data Sent</th><th>Actions</th>'));
			if (messages.length == 0) {
				$('#sentMessages').append(sentMessagesTable);
			} else {
				for (let message of messages) {
					let deleteLink = $('<a href="#">[Delete]</a>')
							.click(function() { deleteMessage(message) });
					sentMessagesTable.append($('<tr>').append(
						$('<td>').text(message.recipient_username),
						$('<td>').text(message.text),
						$('<td>').text(formatDate(message._kmd.lmt)),
						$('<td>').append(deleteLink)
						));
				}
				$('#sentMessages').append(sentMessagesTable);
			}
		}
	}

	function formatDate(dateISO8601) {
	    let date = new Date(dateISO8601);
	    if (Number.isNaN(date.getDate()))
	        return '';
	    return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
	        "." + date.getFullYear() + ' ' + date.getHours() + ':' +
	        padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

	    function padZeros(num) {
	        return ('0' + num).slice(-2);
	    }
	}

	function formatSender(name, username) {
	    if (!name)
	        return username;
	    else
	        return username + ' (' + name + ')';
	}
	
	function sendMessage() {
		event.preventDefault()
		let recipient = $('#msgRecipientUsername')
			.find(":selected")
			.text()
			.split(' ')[0];

		let messageData = {
			sender_username: sessionStorage.getItem("username"),
			sender_name: sessionStorage.getItem("name") || null,
			recipient_username: recipient,
			text: $('#msgText').val()
		};

		$.ajax({
			method: "POST",
			url: baseUrl + "appdata/" + appKey + "/messages",
			headers: getUserAuthHeaders(),
			data: messageData,
			success: sendMessageSuccess,
			error: handleAjaxError
		})

		function sendMessageSuccess(response) {
			showInfo('Message sent.');
			listSentMessages()
		}
	}

	function deleteMessage(message) {
	$.ajax({
		method: "DELETE",
		url: baseUrl + "appdata/" + appKey + "/messages/" + message._id,
		headers: getUserAuthHeaders(),
		success: deleteMessageSuccess,
		error: handleAjaxError
	});

		function deleteMessageSuccess(response) {
			showInfo('Message deleted.');
			listSentMessages();
		}
	}
}
