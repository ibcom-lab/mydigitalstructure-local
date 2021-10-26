app.add(
{
	name:	'action-dashboard',
	code: function (param, response)
	{
		var data = app._util.data.get(
		{
			controller: 'action-dashboard',
			valueDefault: {}
		});

		var filters = [];

		if (!_.isEmpty(data.search))
		{
			filters.push(
			{	
				field: 'subject',
				comparison: 'TEXT_IS_LIKE',
				value: data.search
			});
		}

		app.invoke('util-view-table',
		{
			object: 'action',
			controller: 'action-dashboard',
			container: 'action-dashboard-view',
			context: 'action-dashboard',
			onComplete: undefined,
			filters: filters,
			customOptions: undefined,
			options:
			{
				noDataText: 'There are no actions that match this search.',
				rows: 20,
				orientation: 'vertical',
				progressive: true,
				class: 'table-condensed',
				deleteConfirm:
				{
					text: 'Are you sure you want to delete this action?',
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
					class: 'd-flex',
					data: 'data-id="{{id}}"'
				},

				columns:
				[
					{
						caption: 'Subject',
						param: 'subject',
						sortBy: true,
						defaultSort: true,
						defaultSortDirection: 'asc',
						class: 'col-4 text-left myds-navigate',
						data: 'id="action-edit-{{id}}" data-context="{{id}}" data-id="{{id}}" data-controller="action-edit"'
					},
					{
						caption: 'Date',
						param: 'date',
						sortBy: true,
						class: 'col-3 text-left'
					},
					{
						caption: 'Status',
						param: 'statustext',
						sortBy: true,
						class: 'col-3 text-left'
					},
					{
						html: '<button class="btn btn-danger btn-outline btn-sm myds-delete"' +
	               			' id="action-edit-pages-delete-{{id}}" data-id="{{id}}"><i class="fa fa-trash"></i></button>' +
	               			' <button class="btn btn-primary btn-outline btn-sm myds-navigate" ' +
	               			' id="action-edit-{{id}}" data-context="{{id}}" data-id="{{id}}" data-controller="action-edit"><i class="fa fa-pencil"></i></button>',
						caption: '&nbsp;',
						class: 'col-2 text-right'
					},
					{
						paramList: ['actiontype', 'actiontypetext']	
					}
				]
			}
		});
	}
});

app.add(
{
	name: 'action-dashboard-delete-ok',
	code: function (param, response)
	{
		if (_.isUndefined(response))
		{
			if (!_.isUndefined(param.dataContext))
			{
				mydigitalstructure.cloud.delete(
				{
					object: 'action',
					data:
					{
						id: param.dataContext.id,
					},
					callback: 'action-dashboard-delete-ok'
				});
			}	
		}
		else
		{
			if (response.status == 'OK')
			{
				app.notify('Action deleted.');
				app.invoke('action-dashboard');
			}
		}
	}
});

app.add(
{
	name: 'action-edit',
	code: function (param, response)
	{	
		var data = app.find(
		{
			dataController: 'action-dashboard',
			dataContext: 'all',
			controller: 'action-edit',
			context: 'id'
		});

		if (_.isUndefined(data))
		{
			data =
			{
				id: '',
				subject: '',
				date: '',
				statustext: '',
				actiontypetext: '',
				actiontype: ''
			}
		}

		app.view.refresh(
		{
			scope: 'action-edit',
			selector: '#action-edit',
			data: data,
			includeDates: true
		});

		// Refresh will include auto util-view-select invoke - need many element support.

		/* [LEARN]

			Using select2
			https://select2.org/

			Options @ https://select2.org/configuration/options-api can be set using options: as part of
			util-view-select invoke.

			eg 
			app.invoke('util-view-select',
			{
				container: 'action-edit-type',
				options: 
				{
					disabled: true
				}
			});

			To hide search box use: option minimumResultsForSearch: Infinity 

			Dependancies:
				https://github.com/ibcom/mydigitalstructure-sdk-js/blob/master/mydigitalstructure-3.3.7.js
				https://github.com/ibcom/mydigitalstructure-sdk-js/blob/master/mydigitalstructure.util-3.8.3.js
				/site/1929/select2.js
				/site/1929/select2.css
				/site/1901/1901.style.inspinia-1.0.0.css
				/site/1987/select2-bootstrap4.min.css

			Set "mode" below to use data source types
		*/

		var mode = 1;

		if (mode == 1)
		{
			/* 1: Looks at element with id="" matching container and uses data-object=""
					to retrieve data from mydigitalstructure.cloud as the user types
					Defaults to field equal to 'title', else set using data-field or pass as field:

			 	<div class="form-group">
	          	<h4><label class="text-muted mb-0 mt-1" for="action-edit-type-{{id}}">Type</label></h4>
	          	<select class="form-control input-lg myds-text-select text-center" style="width:100%;" id="action-edit-type-{{id}}"
	          			data-object="setup_action_type" data-scope="action-edit-{{id}}" data-context="actiontype">
	          	</select>
	        	</div>
			*/

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id
			});
		}

		if (mode == 2)
		{
			// 2: Uses the data passed

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				data:
				[
					{
						id: 1,
						text: 'Phone Call'
					},
					{
						id: 3,
						text: 'Meeting'
					}
				]
			});
		}

		if (mode == 3)
		{
			// 3: Uses the data from controller, must be synchronise

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				sourceController: 'action-edit-types'
			});
		}

		if (mode == 4)
		{
			// 4: Uses the data previously set in a sourceScope / context / name
			//		Scope can be passed to the util-view-select controller, else as data-source-scope="" etc on element

			app.set(
			{
				scope: 'action-edit-types',
				value:
				[
					{
						id: 1,
						text: 'Phone Call'
					},
					{
						id: 2,
						text: 'Site Visit'
					}
				]
			})

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				sourceScope: 'action-edit-types'
			});
		}

		if (mode == 5)
		{
			// 5: Uses options set with the existing HTML

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				optionsExist: true
			});
		}

		if (mode == 6)
		{
			// 6: Passes a filter
			//		Can be object filter or array of filter objects

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				filter: {name: 'id', comparison: 'EQUAL_TO', value: 1}
			});
		}

		if (mode == 7)
		{
			// 7: Passes a filter using local data store for value
			//		valueScope:, valueContext:, valueName:
			//		Can be object filter or array of filter objects

			app.set(
			{
				scope: 'action-edit-types',
				value: 1
			})

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				filter:
				[
					{name: 'id', comparison: 'EQUAL_TO', valueScope: 'action-edit-types'},
					{name: 'title', comparison: 'TEXT_IS_LIKE', value: 'Ph'}
				]
			});
		}

		if (mode == 8)
		{
			// 8: Use response controller to format response 
			// 	For select2 must have id & text
			//		Can also use select2 Templating ie .options.templateSelection:
			//		https://select2.org/selections#templating
			// 	AND shows setting of fields and sorts.

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				fields: [{name: 'title', sortBy: true}, {name: 'displayorder'}],
				responseController: 'action-edit-types-response'
			});
		}

		if (mode == 9)
		{
			// 9: Use query controller to create search
			//		& response controller to format response 
			// 	For select2 must have id & text
			//		Can also use select2 Templating ie .options.templateSelection:
			//		https://select2.org/selections#templating
			// 	AND shows setting of fields and sorts.

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				queryController: 'action-edit-types-query',
				responseController: 'action-edit-types-response'
			});
		}

		if (mode == 10)
		{
			// 10: Use query controller to create search with filters
			//		& response controller to format response 
			// 	For select2 must have id & text
			//		Can also use select2 Templating ie .options.templateSelection:
			//		https://select2.org/selections#templating
			// 	AND shows setting of fields and sorts.

			app.invoke('util-view-select',
			{
				container: 'action-edit-type-' + data.id,
				queryController: 'action-edit-types-query',
				responseController: 'action-edit-types-response',
				filters: [{name: 'title', comparison: 'TEXT_IS_LIKE', value: 'M'}]
			});
		}
		
	}	
});

app.add(
{
	name: 'action-edit-types',
	code: function (param, response)
	{
		var data = 
		[
			{
				id: 1,
				text: 'Phone Call'
			},
			{
				id: 2,
				text: 'Site Visit'
			},
			{
				id: 3,
				text: 'Meeting'
			}
		]

		return data;
	}
});

app.add(
{
	name: 'action-edit-types-query',
	code: function (param)
	{
		var query = 
		{
			"fields":
			[
				{
					"name":"title"
				},
				{
					"name":"fixed"
				},
				{
					"name":"displayorder"
				}
			],
			"filters":
			[],
			"sorts":
			[
				{
					"name":"displayorder",
					"direction":"asc"
				}
			]
		}

		if (param.search != undefined)
    	{
    		//Can be many filters with or etc
    		query.filters.push({name: 'title', comparison: 'TEXT_IS_LIKE', value1: param.search});
    	}

		return query;
	}
});

app.add(
{
	name: 'action-edit-types-response',
	code: function (param, response)
	{
		var data = _.map(response.data.rows, function (row)
      {
        return {id: row['id'], text: row['title'] + ' (' + row['displayorder'] + ')'};
      });

		return data;
	}
});

app.add(
{
	name: 'action-edit-save',
	code: function (param, response)
	{	
		var id = app.get(
		{
			scope: 'action-edit',
			context: 'id',
			valueDefault: ''
		});

		var data = app.get(
		{
			scope: 'action-edit-' + id,
			clean: true,
			valueDefault: {}
		});

		data.id = id;

		if (response == undefined)
		{
			mydigitalstructure.cloud.save(
			{
				object: 'action',
				data: data,
				callback: 'action-edit-save'
			});
		}
		else
		{	
			if (response.status == 'OK')
			{
				if (data.id == '')
				{
					app.notify('Action has been added.');
				}
				else
				{
					app.notify('Action has been updated.');
				}
				
				app.set(
				{
					controller: 'action-edit',
					context: 'id',
					value: response.id
				});

				data.id = response.id;

				app.refresh(
				{
					scope: 'action-edit',
					data: data,
					routeTo: 'action-dashboard',
					dataScope: 'action-dashboard'
				});
			}
		}
	}
});



