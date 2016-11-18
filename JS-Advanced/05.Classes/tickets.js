function tickets(arr, sortMethod){
	let all = []
	class Ticket {
		constructor(destination, price, status){
			this.destination = destination,
			this.price = price,
			this.status = status
		}
		 static sort(tickets, criteria) {
            switch (criteria) {
                case 'destination':
                    return tickets.sort((a, b) => a.destination.localeCompare(b.destination));
                case 'price':
                    return tickets.sort((a, b) => a.price - b.price);
                default:
                    return tickets.sort((a, b) => a.status.localeCompare(b.status));
            }
        }
	} 

	for(let item of arr){
		let params = item.split('|')
		all.push(new Ticket(params[0], Number(params[1]), params[2]))
	}
	all = Ticket.sort(all, sortMethod)

	return all
}
console.log(tickets(['Philadelphia|94.20|available',
				 'New York City|95.99|available',
				 'New York City|95.99|sold',
				 'Boston|126.20|departed'],
				'destination'));