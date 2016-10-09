var express = require('express')
var fs = require('fs')

var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index')
});

/* GET form. */
router.get('/create', function(req, res, next) {	
  	res.render('form', { message: '' })
});

/* POST form. */
router.post('/create', function(req, res, next) {
	let filename = "";
	req.pipe(req.busboy);
	req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
	  	req.body[key]=value;
	  });

	 req.busboy.on('file', function (fieldname, file, name) {
	  		filename = 'public/images/'+ new Date().valueOf()
	        console.log("Uploading: " + filename);
	        let fstream = fs.createWriteStream(filename);
	        file.pipe(fstream);

    });


    req.busboy.on('finish', function(field){
	    if(!req.body.title || !req.body.description ) {
			console.log("missing Fields");
			return res.render('form', { message: 'Please fill out all fields.'});
		} else{
			console.log("BisBoy");
	        let data = {
		  		id: new Date().valueOf(),
		  		title: req.body.title,
		  		description: req.body.description,
		  		file: filename,
		  		state: 'pending',
		  		comments: []
		  	}
	  		addToJSONFile(data)
	  		res.render('form', { message: '' });
	  	}
	}); 	
});

router.get('/form', function(req, res, next) {	
  	res.render('test')
});

// /* POST form. */
router.post('/form', function(req, res, next) {

     req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
    	
        console.log("Uploading: " + filename);
        let fstream = fs.createWriteStream('public/images/test5');
        file.pipe(fstream);
    });
});

/* GET all. */
router.get('/all', function(req, res, next) {	
	let todos = readJSONFile()
	let html = buildHtml(todos)
	res.send(html)
});

/* GET one todo. */
router.get('/details/:id', function(req, res, next) {	
	let todo = readJSONFile().find((todo) => todo.id == req.params.id)
	let buttonText = changeBtn(todo.state)
	let comments = renderComments(todo)
	res.render('details', { todo : todo, buttonText : buttonText, comments: comments});
});

/* EDIT a todo. */
router.post('/details/:id', function(req, res, next) {	
	editJSONFile(req.params.id)
	let todo = readJSONFile().find((todo) => todo.id == req.params.id)
	let buttonText = changeBtn(todo.state)
	let comments = renderComments(todo)
	res.render('details', { todo : todo, buttonText : buttonText, comments: comments});
});

/* POST a comment. */
router.post('/details/:id/comment', function(req, res, next) {
	addComment(req.params.id, req.body.comment)
	let todo = readJSONFile().find((todo) => todo.id == req.params.id)
	let buttonText = changeBtn(todo.state)
	let comments = renderComments(todo)
	res.render('details', { todo : todo, buttonText : buttonText, comments: comments});
});

router.get('/static',function(req,res,next){
	if(req.header.)


})

function renderComments(todo){
	let comments = ''
	todo.comments.forEach((comment) => comments += `<li>${comment.body}</li>`)
	return comments
}

function addComment(id, comment){
	let database = readJSONFile()
	let todo = database.find((todo) => todo.id == id)
	let data = {body: comment,
  		date: new Date().valueOf() 
  		}
	todo.comments.push(data)
	database = JSON.stringify(database)
	fs.writeFileSync('data.json', database)
}

function changeBtn(state){
	if(state === 'pending')
		state = 'Done'
	else 
		state = 'Pending'
	return state
}
function readJSONFile() {
	let data = JSON.parse(fs.readFileSync('data.json', 'utf8')) 	 
  	return data
}

function addToJSONFile(data) {
	let database = readJSONFile()
		database.push(data)
		database = JSON.stringify(database)
		fs.writeFile('data.json', database, function (err, data) {
		if (err) { 
			return console.log(err)
		}
	})
}

function editJSONFile(id) {
	let database = readJSONFile()
	let toBeEdit = database.find((todo) => todo.id == id)
	if(toBeEdit.state === 'pending') {
		toBeEdit.state = "done"
	} else {
		toBeEdit.state = "pending"	
	}	 
	database = JSON.stringify(database)
	fs.writeFileSync('data.json', database)
}

function buildHtml(arr) {
	var body = '<ul>'
	arr = arr.sort((a,b) => a.id - b.id)
	let pending = arr.filter((a) => a.state === 'pending')
	let done = arr.filter((a) => a.state === 'done')
	pending.forEach(function(entry) {
		body += `<li>${entry.title} - ${entry.description} (${entry.state}) <a href='/details/${entry.id}'>Details</a></li>`
	});
	done.forEach(function(entry) {
		body += `<li>${entry.title} - ${entry.description} (${entry.state}) <a href='/details/${entry.id}'>Details</a></li>`
	});
	body += '</ul>'
  	var html = '<!DOCTYPE html>'
       + '<html><head></head><body>' + body + '</body></html>'
  	return html
}

module.exports = router
