let BaseElement = require('./baseElement')
class Footer extends BaseElement{
    constructor(message){
        super()
        this.message = message
    }
    getElementString(){
        let html = $('<footer>').html('Copyright &copy; ' + this.message)
        return html
    }
}

module.exports = Footer