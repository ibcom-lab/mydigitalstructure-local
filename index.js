/* 
mydigitalstructure Local Connector -- http interface for local development
Runs on node
nodejs index.js

*/

var _ = require('lodash');
var moment = require('moment');
var mydigitalstructure = require('mydigitalstructure');
const http = require('http')
var event = undefined;

var app = {_util: {}, data: {event: event}, http: {port: 3000}, version: '1.0.10'};

app.http.requestHandler = function (httpRequest, httpResponse)
{
	httpResponse.setHeader('Access-Control-Allow-Origin', '*');
	httpResponse.setHeader('Access-Control-Allow-Headers', '*');

	app.http.request({httpRequest: httpRequest, httpResponse: httpResponse});
}

app.http.requestHandlerEnd = function (response, message)
{
	mydigitalstructure._util.testing.data(message, 'http-response');
	if (_.isObject(message)) {message = JSON.stringify(message)}
	response.end(message)
}

app.http.start = function ()
{
	app.http.server = http.createServer(app.http.requestHandler);

	app.http.server.listen(app.http.port, function (err)
	{
	  if (err)
	  {
			return console.log('Server can not not start!!', err)
	  }

	  mydigitalstructure._util.testing.message('Server has started and is listening on ' + app.http.port + '. (' + app.version + ')')
	})

	/*
		http.createServer((r, s) => {
		console.log(r.method, r.url, r.headers);
		let body = '';
		r.on('data', (chunk) => {
			body += chunk;
		});
		r.on('end', () => {
			console.log(body);
			s.write('OK'); 
			s.end(); 
		});
	}).listen(42646); 
	*/

	//https://www.geeksforgeeks.org/how-to-create-https-server-with-node-js/
}

app.http.startExpress = function ()
{
/*
// Requiring in-built https for creating
// https server
const https = require("https");

// Express for handling GET and POST request
const express = require("express");
const app = express();

// Requiring file system to use local files
const fs = require("fs");

// Parsing the form of body to take
// input from forms
const bodyParser = require("body-parser");

// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get request for root of the app
app.get("/", function (req, res) {

// Sending index.html to the browser
res.sendFile(__dirname + "/index.html");
});

// Post request for geetting input from
// the form
app.post("/mssg", function (req, res) {

// Logging the form body
console.log(req.body);

// Redirecting to the root
res.redirect("/");
});

// Creating object of key and certificate
// for SSL
const options = {
key: fs.readFileSync("server.key"),
cert: fs.readFileSync("server.cert"),
};

// Creating https server by passing
// options and app object
https.createServer(options, app)
.listen(3000, function (req, res) {
console.log("Server started at port 3000");
});
*/
}

app.http.request = function (options, response)
{
	if (_.startsWith(options.httpRequest.url, '_', 1))
	{
		if (_.isUndefined(response))
		{
			var sendOptions = 
			{
				url: '/rpc/core/?method=CORE_SPACE_SEARCH&advanced=1'
			};

			mydigitalstructure.send(sendOptions,
				'criteria={"fields":[{"name":"space"},{"name":"etag"}],"options":{"rows":1000}}',
				app.http.accessCheck,
				options);
		}
		else
		{
			app.data.destination.spaces = JSON.parse(response).data.rows;
			mydigitalstructure._util.testing.data(JSON.stringify(app.data.destination.spaces), 'app.http.spaces::app.data.destination.spaces');
		}
	}		
	else
	{
		app.http.requestHandlerEnd(options.httpResponse, 'OK (' + app.version + ')');
	}	
}

mydigitalstructure.init(main)

function main(err, data)
{
	if (mydigitalstructure.data.session.status == "OK")
	{
		app.http.start()
	}	
}



