/* 
mydigitalstructure Local Connector -- http interface for local development
Runs on node
node mydigitalstructure-local.js
sudo killall -9 node
*/

var _ = require('lodash');
var mydigitalstructure = require('mydigitalstructure');

var app = {_util: {}, data: {}, http: {port: 3000, host: '127.0.0.1'}, version: '1.0.10'};

app.http.startExpress = function ()
{
    const https = require("http");
    const express = require("express");
    app.http.server = express();
    const fs = require("fs");
    const bodyParser = require("body-parser");

    app.http.server.use(bodyParser.urlencoded({ extended: false }));
    app.http.server.use(bodyParser.json());

    app.http.server.get("*", function (httpRequest, httpResponse)
    {
        var url = httpRequest.url;
        console.log('GET ' + url);
        if (url == '') {url = '/index.html'}

		if (url != '')
		{
			if (_.startsWith(url, '/rpc/'))
			{
				app.http.mydigitalstructure(
				{
					httpRequest: httpRequest,
					httpResponse: httpResponse
				});
			}
			else
			{
                if (_.endsWith(url, '/'))
			    {
                    url = _.trimEnd(url, '/') + '.html'
                }
                else if (!_.includes(url, '.'))
                {
                    url = url + '.html'
                }

                var settings = mydigitalstructure.get({scope: '_settings'})

                if (_.has(settings, 'local.layout'))
                {
                    const layoutHTML = fs.readFileSync(settings.local.layout, {encoding:'utf8', flag:'r'});
                    const pageHTML = fs.readFileSync(__dirname + url, {encoding:'utf8', flag:'r'});

                    console.log(layoutHTML);
                    console.log(pageHTML);

                    var responseHTML = _.replace(layoutHTML, '<-mydigitalstructure:content->', pageHTML);
                    httpResponse.write(responseHTML);
                    httpResponse.end()
                }
                else
                {
                    httpResponse.sendFile(__dirname + url);
                }
			}
		}
    });

    app.http.server.post("*", function (httpRequest, httpResponse)
    {
        app.http.mydigitalstructure(
        {
            httpRequest: httpRequest,
            httpResponse: httpResponse
        });
    });

    var settings = mydigitalstructure.get({scope: '_settings'});
    console.log(settings);

    if (_.has(settings, 'local.port'))
    {
        app.http.port = settings.local.port;
    }

	if (_.has(settings, 'local.host'))
    {
        app.http.host = settings.local.host;
    }

    https.createServer(app.http.server)
        .listen(app.http.port, app.http.host, function (req, res) {
        console.log('mydigitalstructure-local http server running on ' + app.http.host + ':' + app.http.port);
    });
}

app.http.mydigitalstructure = function (param, response)
{
    if (_.isUndefined(response))
    {
        console.log(param.httpRequest.url);
        console.log(param.httpRequest.body);
        
        var url = param.httpRequest.url;
        if (!_.includes(url, '&advanced=1'))
        {
            url = url + '&advanced=1'
        }

        var sendOptions = 
        {
            url: url
        };

        mydigitalstructure.send(sendOptions,
            param.httpRequest.body,
            app.http.mydigitalstructure,
            param);
    }
    else
    {
        param.httpResponse.writeHead(200,
        {
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
            'access-control-allow-headers': '*'
        });
        param.httpResponse.write(JSON.stringify(response));
        param.httpResponse.end()
    }
}

mydigitalstructure.init(main)

function main(err, data)
{ 
	if (mydigitalstructure.data.session.status == "OK")
	{
		app.http.startExpress()
	}	
}

