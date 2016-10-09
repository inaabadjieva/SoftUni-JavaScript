let express = require('express');
let fs = require('fs');
let dateFormat = require('dateformat');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET form page. */
router.get('/create', function(req, res, next) {
  res.render('form');
});

/* POST form.  */
router.post('/create', function(req, res, next) {
	let filename = '';
	req.pipe(req.busboy);
	console.log(req.busboy)
	req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
	  	req.body[key] = value;
	});

	 req.busboy.on('file', function (fieldname, file, name) {
	  		filename = 'public/images/' + new Date().valueOf();
	  		console.log(filename)
	        let fstream = fs.createWriteStream(filename);
	        file.pipe(fstream);
    });

    req.busboy.on('finish', function(field){
	 //    if(!req.body.title || !req.body.description ) {
		// 	return res.render('form', { message: 'Please fill out all fields.'});
		// } else{
	        let data = {
		  		id: new Date().valueOf(),
		  		title: req.body.title,
		  		body: req.body.body,
		  		image: filename,
		  		state: 'posted',
		  		views: 0, 
		  		comments: []
		  	};
	  		addToJSONFile(data);
	  		res.render('form');
	  	//}
	}); 	
});

/* GET all posts.  */
router.get('/all', function(req, res, next) {
  	let posts = readJSONFile();
	let html = buildHtml(posts);
	res.send(html);
});

/* GET one post. */
router.get('/details/:id', function(req, res, next) {	
	editViews(req.params.id);
	let post = readJSONFile().find((post) => post.id == req.params.id);
	let buttonText = changeBtn(post.state);
	let comments = renderComments(post);
	console.log(post);
	res.render('details', { post : post, buttonText : buttonText, comments: comments});
});

/* EDIT state. */
router.post('/details/:id', function(req, res, next) {	
	editState(req.params.id);
	let post = readJSONFile().find((post) => post.id == req.params.id);
	let buttonText = changeBtn(post.state);
	let comments = renderComments(post);
	res.render('details', { post : post, buttonText : buttonText, comments: comments});
});

/* POST a comment. */
router.post('/details/:id/comment', function(req, res, next) {
	addComment(req.params.id, req.body.username, req.body.comment);
	let post = readJSONFile().find((post) => post.id == req.params.id);
	let buttonText = changeBtn(post.state);
	let comments = renderComments(post);
	res.render('details', { post : post, buttonText : buttonText, comments: comments});
});

// router.get('/static',function(req,res,next){
// 	if(req.header.)

// })

function readJSONFile() {
	let data = JSON.parse(fs.readFileSync('data.json', 'utf8')) 	 ;
  	return data;
}

function addToJSONFile(data) {
	let database = readJSONFile();
		database.push(data);
		database = JSON.stringify(database);
		fs.writeFile('data.json', database, function (err, data) {
		if (err) { 
			return console.log(err);
		}
	});
}

function editViews(id){
	let database = readJSONFile();
	let toBeEdited = database.find((post) => post.id == id);
	toBeEdited.views += 1;
	database = JSON.stringify(database);
	fs.writeFileSync('data.json', database);
}

function editState(id) {
	let database = readJSONFile();
	let toBeEdit = database.find((post) => post.id == id);
	if(toBeEdit.state === 'posted') {
		toBeEdit.state = 'deleted';
	} else {
		toBeEdit.state = 'posted';
	}	 
	database = JSON.stringify(database);
	fs.writeFileSync('data.json', database);
}

function buildHtml(arr) {
	var body = '<ul>';
	arr = arr.sort((a,b) => a.id - b.id);
	arr.forEach(function(entry) {
		if(entry.state != 'deleted')
			body += `<li>${entry.title} - ${formatDate(entry.id)} <a href='/details/${entry.id}'>Details</a></li>`;
	});
	body += '</ul>';
  	var html = '<!DOCTYPE html>'
       + '<html><head></head><body>' + body + '</body></html>';
  	return html;
}

function formatDate(time){
	let date = dateFormat(time, 'mmmm dS, yyyy, h:MM TT');
	return date;
}

function renderComments(post){
	let comments = '';
	post.comments.forEach((comment) => comments += `<li>${comment.user} posted ${comment.body}</li>`);
	return comments;
}

function addComment(id, username, comment){
	let database = readJSONFile();
	let post = database.find((post) => post.id == id);
	let data = {
		user: username,
		body: comment,
  		date: new Date().valueOf() 
  	};
	post.comments.push(data);
	database = JSON.stringify(database);
	fs.writeFileSync('data.json', database);
}

function changeBtn(state){
	if(state === 'deleted')
		state = 'Post';
	else 
		state = 'Delete';
	return state;
}

module.exports = router;
