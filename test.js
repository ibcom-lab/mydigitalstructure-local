/*
	This is an example app to use as starting point for building a mydigitalstucture.cloud based nodejs app ... 
	Once nodejs has been installed; run 'node learn.js' using the OS terminal/console command prompt

	If you plan to host the app using AWS lambda then check out index.js

	Help @ https://learn-next.mydigitalstructure.cloud/learn-function-automation
*/

var mydigitalstructure = require('mydigitalstructure')
var _ = require('lodash')
var moment = require('moment');

/*
	var settings = mydigitalstructure.get(
	{
		scope: '_settings'
	});
*/

mydigitalstructure.init(main);

function main(err, data)
{
	mydigitalstructure.add(
	[
		{
			name: 'test-1',
			code: function (param, response)
			{
                if (response == undefined)
                {
                    /*
                    var data =
                    {
                        criteria:
                        {
                            fields:
                            [
                                {name: 'firstname'},
                                {name: 'surname'}
                            ]
                        }
                    }
                    */

                    var data =
                    {
                        fields:
                        [
                            {name: 'firstname'},
                            {name: 'surname'}
                        ]
                    }

                    mydigitalstructure.send(
                    {
                        type: 'POST',
                        url: '/rpc/contact/?method=CONTACT_PERSON_SEARCH',
                        all: false,
                        rows: 1,
                        contentType: 'application/json'
                    },
                    data,
                    'test-1');
                }
                else
                {
                    console.log(response)
                }
			}
		}
	]);

	mydigitalstructure.invoke('test-1');
}