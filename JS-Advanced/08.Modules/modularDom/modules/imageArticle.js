let Article = require('./article')
class ImageArticle extends Article{
    constructor(title, content, image){
        super(title, content)
        this.image = image
    }
    getElementString(){
            let html = $('<div>').addClass('article')
            .append($('<div>').addClass('article-title').text(this.title))
            .append($('<div>').addClass('image')
                .append($('<img>').attr('src', this.image)))
            .append($('<p>').text(this.content))
            return html
    }
    // getElementString() {
    //     let obj = $(super.getElementString());
    //     obj.find('.article-title')
    //         .after($('<div>')
    //             .addClass('image')
    //             .append($('<img>')
    //                 .attr('src', this.image)));

    //     return obj;
    // }
}
module.exports = ImageArticle