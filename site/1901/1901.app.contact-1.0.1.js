/*
	[Learn Comment #1]

	This code is adding the functions to your app that will allow the user
	to interact with contact data stored on mydigitalstructure.cloud.
*/

app.add(
{
	name: 'contact-dashboard',
	code: function (param, response)
	{
		/*
			[Learn Comment #2]

			Check to see if there is any app data eg has something been typed into the search box.
		*/

		var data = app._util.data.get(
		{
			controller: 'contact-dashboard',
			valueDefault: {}
		});

		var filters = [];

		/*
			[Learn Comment #3]

			If something has been typed into the search box it will be set in the search field.
			If it is not empty ie equal to "" then add it to the filters that will be sent to 
			mydigitalstructure.cloud to retrieve the data.
		*/

		if (!_.isEmpty(data.search))
		{
			filters.push(
			{	
				field: 'firstname',
				comparison: 'TEXT_IS_LIKE',
				value: data.search
			});
		}

		/*
			[Learn Comment #4]

			The mydigitalstructure.cloud JavaScript Framework includes some helpers functions
			that you can use to help build your app - the functions are added to your app space and can be
			invoked using app.invoke().

			In this case we are using a function to create a table call "util-view-table".

			Key options:

			# object; 		This is the mydigitalstructure object that holds the data you want to display.
									You can find more about the objects available @ https://learn.mydigitalstructure.cloud/schema
			
			# container: 	The ID of the element in the HTML that the table will be displayed in, typically a "div".

			# filters: 		Any filters that need to be applied to the data by mydigitalstructure.cloud.
									You can find about filters @ https://learn.mydigitalstructure.cloud/learn-function-storage-language

			# format: 		General it describes how you want the table formatted.						
		*/

		app.invoke('util-view-table',
		{
			object: 'contact_person',
			controller: 'contact-dashboard',
			container: 'contact-dashboard-view',
			context: 'contact-dashboard',
			filters: filters,
			options:
			{
				noDataText: 'There are no contacts that match this search.',
				rows: 20,
				orientation: 'vertical',
				progressive: true,
				class: 'table-condensed',
				deleteConfirm:
				{
					text: 'Are you sure you want to delete this contact?',
					position: 'left'
				}
			},
			format:
			{
				header:
				{
					class: 'd-flex'
				},

				row:
				{
					data: 'data-id="{{id}}"',
					class: 'd-flex'
				},

				columns:
				[
					{
						caption: 'First name',
						field: 'firstname',
						sortBy: true,
						defaultSort: true,
						defaultSortDirection: 'asc',
						class: 'col-sm-4 myds-navigate',
						data: 'id="contact-edit-{{id}}" data-context="{{id}}" data-id="{{id}}" data-controller="contact-edit"'
					},
					{
						caption: 'Surname',
						field: 'surname',
						sortBy: true,
						class: 'col-sm-4 myds-navigate',
						data: 'id="contact-edit-{{id}}" data-context="{{id}}" data-id="{{id}}" data-controller="contact-edit"'
					},
					{
						html: '<button class="btn btn-danger btn-outline btn-sm myds-delete"' +
	               			' id="contact-edit-pages-delete-{{id}}" data-id="{{id}}"><i class="fa fa-trash"></i></button>' +
	               			' <button class="btn btn-primary btn-outline btn-sm myds-navigate" ' +
	               			' id="contact-edit-{{id}}" data-context="{{id}}" data-id="{{id}}" data-controller="contact-edit"><i class="fa fa-pencil"></i></button>',
						caption: '&nbsp;',
						class: 'col-sm-4 text-right'
					}
				]
			}
		});
	}
});

/*
	[Learn Comment #5]

	The 'contact-dashboard-delete-ok' function below is invoked when a user
	clicks the Delete button in the table.

	Flow:

	# 	The first time it is called the "param" variable contains the context of the data that the user is deleting,
		the "response" variable is undefined as no request has been sent to mydigitalstructure.cloud.

	# 	mydigitalstructure.cloud.delete is then called, which sends the request to mydigitalstructure.cloud.
		While this request is being processed by mydigitalstructure.cloud user interactions and other JavaScript code can
		continue as the request to mydigitalstructure.cloud ie it is asynchronous

	#	Then once the data has been retrieved from mydigitalstructure.cloud the function
		is invoked again (as set by the "callback" option, this time with the "response" from mydigitalstructure.cloud.

	# 	The "response" includes a "status" field; "OK" means mydigitalstructure.cloud processed the request
		without any errors.  If there was an error the "status" field is set to "ER"
		and the error details are stored in response.error.errornotes.
*/

app.add(
{
	name: 'contact-dashboard-delete-ok',
	code: function (param, response)
	{
		if (_.isUndefined(response))
		{
			if (!_.isUndefined(param.dataContext))
			{
				mydigitalstructure.cloud.delete(
				{
					object: 'contact_person',
					data:
					{
						id: param.dataContext.id,
					},
					callback: 'contact-dashboard-delete-ok'
				});
			}	
		}
		else
		{
			if (response.status == 'OK')
			{
				app.notify('Contact deleted.');
				app.invoke('contact-dashboard');
			}
			else if (response.status == 'ER')
			{
				app.notify('Contact could not be deleted. (' + response.error.errornotes + ')');
			}
		}
	}
});

/*
	[Learn Comment #6]

	The 'contact-edit' function below is invoked when a user
	clicks the Edit button in the table.

	It finds the data for the specific contact from the data that was used to
	create the table using the util-view-table function.

	If no data is found, ie it is a new contact being added it sets some defaults.

	It then refreshes the view (what the user sees) with data.
*/

app.add(
{
	name: 'contact-edit',
	code: function (param, response)
	{	
		var data = app.find(
		{
			dataController: 'contact-dashboard',
			dataContext: 'all',
			controller: 'contact-edit',
			context: 'id'
		});

		if (_.isUndefined(data))
		{
			data =
			{
				id: '',
				firstname: '',
				surname: '',
				mobile: ''
			}
		}

		app.view.refresh(
		{
			scope: 'contact-edit',
			selector: '#contact-edit',
			data: data
		});
	}	
});

/*
	[Learn Comment #5]

	The 'contact-edit-save' function below is invoked when a user
	clicks the Save button after editing a contact.

	The mydigitalstructure JavaScript Framework automatically stores changed input
	data by the user into the data space from you app eg app.data.

	The code then gets the "contact-edit" data and saves it to the mydigitalstructure.cloud storage.

	Tip: To see the app data, open the Chrome Developer Tools and then click Console, type app.data and press enter.
*/

app.add(
{
	name: 'contact-edit-save',
	code: function (param, response)
	{	
		var id = app.get(
		{
			scope: 'contact-edit',
			context: 'id',
			valueDefault: ''
		});

		var data = app.get(
		{
			scope: 'contact-edit-' + id,
			clean: true,
			valueDefault: {}
		});

		data.id = id;

		if (response == undefined)
		{
			mydigitalstructure.cloud.save(
			{
				object: 'contact_person',
				data: data,
				callback: 'contact-edit-save'
			});
		}
		else
		{	
			if (response.status == 'OK')
			{
				if (data.id == '')
				{
					app.notify('Contact has been added.');
				}
				else
				{
					app.notify('Contact has been updated.');
				}
				
				app.set(
				{
					controller: 'contact-edit',
					context: 'id',
					value: response.id
				});

				data.id = response.id;

				app.refresh(
				{
					scope: 'contact-edit',
					data: data,
					routeTo: 'contact-dashboard',
					dataScope: 'contact-dashboard'
				});
			}
		}
	}
});



