var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var yelp = require('yelp-fusion');
var ejsLint = require('ejs-lint');


//Create yelp client with API key
var client = yelp.client('ezVut3lGqFJ7HXBTot9_Y8Nv2lcAwbVucOjwhk-g2iAwiyG5gnZ0NBm9U0D7X5bxAhRI4RhJ9DHVfg37r_32BRvg2Ys0jHSZvPoW5IymJq3DyPI9bVzz8Oa3lEkxXHYx');

var app = express(); 

// Set port
var port = process.env.PORT || 8080

var urlencodedParser = bodyParser.urlencoded({ extended: false })


// allow static variables to live
app.use(express.static(__dirname));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//routes 
app.get("/", function(req, res) {
	res.render('index');
})

app.post('/suggest', urlencodedParser, function(req, res){
	// yelp search query
	 client.search({
	  term: req.body.term,
	  location: req.body.location
	}).then(response => {
	  console.log(response.jsonBody);
	  // store json result in local variable
	  var results = response.jsonBody;
 	  res.render('results', {data: response.jsonBody});
	}).catch(e => {
	  console.log(e);
	});

	  


	
});

app.listen(port, function() {
	console.log("app running");
})

