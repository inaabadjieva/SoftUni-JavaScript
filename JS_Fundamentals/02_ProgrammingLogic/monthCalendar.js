function calendar(input){
	let day = Number(input[0])
	let month = Number(input[1])
	let year = Number(input[2])

	let html ='';
	let startDay = 1
	let dayFirstPosition = new Date(year,month-1,1).getDay()
	let dayLastPosition = new Date(year, month, 0).getDay()
	let today = new Date(year, month-1, day).getDate()
	let totalCurrentMonth = new Date(year, month, 0).getDate()
	let firstDayLastRow = totalCurrentMonth - dayLastPosition
	
	let lastDayPrevMonth = new Date(year, month-1, 0).getDate()
	let firstCalendarDay = lastDayPrevMonth - dayFirstPosition + 1
	let totalPrevMonth = lastDayPrevMonth - firstCalendarDay + 1

	let dayNextMonth = 1
	let totalNextMonth = 6 - dayLastPosition

	let total = totalPrevMonth + totalCurrentMonth + totalNextMonth

	html+= '<table>\n'
	html+='<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n'
	
	for(let row = 0; row < total/7; row++){
		let line = '<tr>'
		if(row == 0){
			for (let i = 0; i <=6; i++) {
				if(i < dayFirstPosition){
					line += `<td class="prev-month">${firstCalendarDay}</td>`
					firstCalendarDay += 1
				} else {
					if(startDay === today) line += `<td class="today">${startDay}</td>`
					else line += `<td>${startDay}</td>`
					startDay += 1 
				}
			}
		} else if (row == total/7-1){
			for (let i = 0; i <=6; i++) {
				if(i <= dayLastPosition){
					if(firstDayLastRow === today) line += `<td class="today">${firstDayLastRow}</td>`
					else line += `<td>${firstDayLastRow}</td>`
					firstDayLastRow += 1
				} else {
					line += `<td class="next-month">${dayNextMonth}</td>`
					dayNextMonth += 1 
				}
			}
		} else {
			for (let i = 0; i <=6; i++) {
				if(startDay === today) line += `<td class="today">${startDay}</td>`
				else line += `<td>${startDay}</td>`
				startDay += 1 
			}
		}
		line+='</tr>'
		html+= line
	}	
	html+= '</table>'
	return html
}
calendar([24,12,2012])
//calendar([4,9,2016])
