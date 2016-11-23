function attachEvents() {
	$('#submit').on('click', getWeather)

	function getWeather() {
		let code = ''
		let requestCode = $.get('https://judgetests.firebaseio.com/locations.json')
			.then(function(res) {
				for (let town of res) {
					if (town.name === $('#location').val()) {
						code = town.code
						getForecast(code)
					}
				}
			})
			.catch(displayError)
	}

	function getForecast(code) {
		let requestToday = $.get(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
		let requestUpcoming = $.get(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
		Promise.all([requestToday, requestUpcoming])
			.then(displayForecast)
			.catch(displayError)
	}

	function displayForecast([today, upcoming]) {
		$('#forecast').removeAttr('style')
		$('#current')
			.append($('<span>').addClass('condition symbol').html(getSymbol(today.forecast.condition)))
			.append($('<span>').addClass('condition')
				.append($('<span>').addClass('forecast-data').text(today.name))
				.append($('<span>').addClass('forecast-data').html(`${today.forecast.low}&#176;/${today.forecast.high}&#176;`))
				.append($('<span>').addClass('forecast-data').text(today.forecast.condition)))
			console.log(upcoming);
		for(let day of upcoming.forecast){
			$('#upcoming')
				.append($('<span>').addClass('upcoming')
					.append($('<span>').addClass('symbol').html(getSymbol(day.condition))
					.append($('<span>').addClass('forecast-data').html(`${day.low}&#176;/${day.high}&#176;`))
					.append($('<span>').addClass('forecast-data').text(day.condition))))
		}	
	}

	function displayError(err) {
		$('#forecast').removeAttr('style')
		$('#forecast').text('Error')
	}

	function getSymbol(str) {
		let symbol = ''
		switch (str) {
			case 'Sunny':
				symbol = '&#x2600;'
				break;
			case 'Partly sunny':
				symbol = '&#x26C5;'
				break;
			case 'Overcast':
				symbol = '&#x2601;'
				break;
			case 'Rain':
				symbol = '&#x2614;'
				break;	
		}
		return symbol
	}
}
