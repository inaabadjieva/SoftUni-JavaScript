let Article = require('./article')
class TableArticle extends Article{
    constructor(title, content){
        super(title, content)
        this.headings = null
        this.data = null
    }
    loadData(headings, data){
        this.headings = headings
        this.data = data
    }
    getElementString(){
        let headRow = $('<tr>')
        this.headings.forEach(function(e) {
            headRow.append($('<th>').text(e))
        })

        let table = $('<table>').addClass('data')
            .append(headRow)

        for(let obj of this.data) {
            let row = $('<tr>')
            for(let key in obj){
                row.append($('<td>').text(obj[key]))    
            }
            table.append(row)
        }
        
        let html = $(super.getElementString())
            .append($('<div>').addClass('table')
                .append(table))
       return html
    }
}
module.exports = TableArticle