function module(){
	let parrent = ''
	let id = 0
	let reports = []

	let result = {
		report: report,
		setStatus: setStatus,
		remove: remove,
		sort: sort,
		output: output
	}

	function report(author, description, reproducible, severity){
		reports.push({ 
			ID: id,
		  	author: author,
		  	description: description,
		  	reproducible: reproducible,
		  	severity: severity,
		  	status: 'Open' 
		})
		id++
		buildHTML(reports)
	}

	function buildHTML(reports){
		reports.forEach(function(report){
			let bug = $('<div>').attr('id', `report_${report.ID}`).addClass('report')
			.append($('<div>').addClass('body')
				.append($('<p>').text(report.description)))
			.append($('<div>').addClass('title')
				.append($('<span>').addClass('author').text('Submitted by: ' + report.author))
				.append($('<span>').addClass('status'). text(report.status + ' | ' + report.severity)))	

		parent.append(bug)
		})
	}

	function setStatus(id, newStatus){
		$(parent).empty()
		reports.forEach( function(element) {
			if(element.ID === id){
				element.status = newStatus
			}
		});
		buildHTML(reports)
	}

	function remove(id){
		$(parent).empty()
		reports.forEach(function(element, index){
			if(element.ID === id){
				reports.splice(index, 1)
			}
		})
		buildHTML(reports)
	}

	function sort(method){
		$(parent).empty()
		switch (method) {
			case 'author':
				reports.sort((a, b) => a.author.localeCompare(b.author))
				break;
			case 'severity':
				reports.sort((a, b) => Number(a.severity) - Number(b.severity))
				break;
			default:
				reports.sort((a, b) => a.ID - b.ID)
				break;
		}
		console.log(reports);
		buildHTML(reports)
	}

	function output(selector){
		parent = $(selector)
	}

	return result
}

let tracker = module();

tracker.output('#content');
tracker.report('kiwi', 'judge rip', true, 5);
// tracker.report('guy', 'report content', true, 5);
// tracker.report('second guy', 'report content 2', true, 3);
// tracker.report('abv', 'report content three', true, 4);
// tracker.setStatus(0, 'Closed');
// tracker.remove(1);

// tracker.sort('author');

// let reports = $('.report');