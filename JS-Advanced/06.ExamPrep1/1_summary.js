 function summary (selector){
    $(selector).on('click', function() {
        let text = $('#content').find('strong').text()
        //OR
        // let summary = []
        // $('#content p strong').each(function(index, element){
        //     summary.push($(element).text())
        // })
        // let sumText = summary.join(' ')
        $('#content').parent()
            .append($('<div>').attr('id', 'summary')
               .append($('<h2>').text('Summary'))
               .append($('<p>').text(text)))    
    })  
}