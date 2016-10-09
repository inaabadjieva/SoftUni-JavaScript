let express = require('express');
let fs = require('fs');
let dateFormat = require('dateformat');
let path = require('path');
let formidable = require('formidable');

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let posts = readJSONFile();
	let listPosts = '';
	let bestSix = posts.sort((a, b) => b.views - a.views).slice(0,6)
	bestSix.forEach(function(post) {
		listPosts += `<li><h2>${post.title}</h2><div>${post.body}</div></li>`;
	}); 
  res.render('index', {listPosts: listPosts});
});

/* GET form page. */
router.get('/create', function(req, res, next) {
  res.render('form');
});

/* POST form page. */
router.post('/create', function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname, '../public/images');

	let title= '';
	let body = '';
	form.on('field', function(key, value) {
		if(key == 'title') {
			title = value
		} else if(key == 'body') {
			body = value
		}
	});
	let filename = '';
	form.on('file', function(field, file) {
		filename = new Date().valueOf().toString() + '.jpeg';
		fs.rename(file.path, path.join(form.uploadDir, filename));
	  	filename = '/images/' +  filename;
	});

	form.on('error', function(err) {
	  console.log('An error has occured: \n' + err);
	});

	form.on('end', function() {
		let data = {
		id: new Date().valueOf(),
		title: title,
		body: body,
		image: filename,
		state: 'posted',
		views: 0, 
		comments: []
		};
		console.log(data)
		addToJSONFile(data);
		res.render('form');
	});

	form.parse(req);
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

/* Static Authentication. */
router.get('/static',function(req, res, next){
	if (!req.header.authorization || req.header.authorization != 'Admin') {
 		res.send(404)
	} else {
		let posts = readJSONFile();
		let listPosts = '';
		posts.forEach((post) => listPosts += `<li><h3>${post.title}:</h3>Total comments: ${post.comments.length}<br>Total views: ${post.views}</li>`);
		res.render('admin', { listPosts : listPosts });
	}
});

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
