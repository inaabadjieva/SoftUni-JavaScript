function attachEvents(){
	const appKey = 'kid_BJ_Ke8hZg'
	const baseUrl = 'https://baas.kinvey.com/'
	const authHeaders = {
		'Authorization': 'Basic ' + btoa('guest:pass'),
		'Content-Type': 'application/json'
	}

	$('#getVenues').on('click', postData)

	function postData(){
		$('#venue-info').empty()
		let date = $('#venueDate').val()
		$.post({
			url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`,
			headers: authHeaders
		})
			.then(function(res){
				loadVenues(res)
			})
			.catch(function(err){
				console.log(err);
			})
	}

	function loadVenues(res){
		for(let id of res){
			$.get({
				url: baseUrl + `appdata/kid_BJ_Ke8hZg/venues/${id}`,
				headers: authHeaders
			})
				.then(function(res){
					displayVenues(res)
				})
				.catch(function(err){
					console.log(err);
				})
		}
	}

	function displayVenues(venue){
		let result = `<div class="venue" id="${venue._id}">
  <span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>
  <div class="venue-details" style="display: none;">
    <table>
      <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
      <tr>
        <td class="venue-price">${venue.price} lv</td>
        <td><select class="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select></td>
        <td><input class="purchase" type="button" value="Purchase"></td>
      </tr>
    </table>
    <span class="head">Venue description:</span>
    <p class="description">${venue.description}</p>
    <p class="description">Starting time: ${venue.startingHour}</p>
  </div>
</div>`
			$('#venue-info').append(result)

			let currentElem = $("#" + venue._id)
			currentElem.find('.info').on('click', function(){
				$('#venue-info').find('.venue-details').css('display', 'none')				
				currentElem.find('.venue-details').css('display', 'block')
			})
			currentElem.find('.purchase').on('click', function(){
				confirmPayment(venue)
			})
	}

	function confirmPayment(venue){
		let quantity = $('.quantity').val() 
		let html = `<span class="head">Confirm purchase</span>
<div class="purchase-info">
  <span>${venue.name}</span>
  <span>${quantity} x ${venue.price}</span>
  <span>Total: ${quantity * venue.price} lv</span>
  <input type="button" value="Confirm">
</div>`
		$('#venue-info').empty()
		$('#venue-info').append(html)

		$('[type="button"]').on('click', function(){
			purchase(venue._id, quantity)
		})
	}

	function purchase(id, quantity){
		$.post({
			url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${quantity}`,
			headers: authHeaders
		})
			.then(function(res){
				$('#venue-info').empty()
				$('#venue-info').append($('<p>').text('You may print this page as your ticket'))
				$('#venue-info').append(res.html)	
			})
			.catch(function(err){
				console.log(err);
			})
	}
}