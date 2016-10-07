var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  res.render('form');
});

// router.post('/create', function(req, res, next) {
// 	let id = new Date().valueOf()
// 	let title = req.body.title
// 	let description = req.body.description
// 	let state = 'pending'
//   	let data = {
//   		id: new Date().valueOf(),
//   		title: req.body.title,
//   		description: req.body.description,
//   		state: 'pending'
//   	}
//   	let info = JSON.stringify(data)
//   	console.log(info)
//   	fs.writeFile('./data.json', info, function (err,data) {
// 	  if (err) {
// 	    return console.log(err);
// 	  }
// 	  console.log(data);
// 	});
// });


module.exports = router;
