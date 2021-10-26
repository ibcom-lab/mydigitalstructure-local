app.add(
{
	name:	'setup-user-dashboard',
	code: function (param, response)
	{
		var data = app._util.data.get(
		{
			controller: 'setup-user-dashboard',
			valueDefault: {}
		});

		var filters = [];

		if (!_.isEmpty(data.search))
		{
			filters.push(
			{	
				field: 'username',
				comparison: 'TEXT_IS_LIKE',
				value1: data.search
			});
		}

		app.invoke('util-view-table',
		{
			object: 'setup_user',
			controller: 'setup-user',
			container: 'setup-user-dashboard-view',
			context: 'setup-user-dashboard',
			onComplete: undefined,
			filters: filters,
			customOptions: undefined,
			options:
			{
				noDataText: 'There are no users that match this search.',
				rows: 20,
				orientation: 'vertical',
				progressive: true,
				class: 'table-condensed'
			},
			format:
			{
				row:
				{
					class: undefined,
					data: 'data-id="{{id}}"'
				},

				columns:
				[
					{
						caption: 'Username',
						field: 'username',
						sortBy: true,
						defaultSort: true,
						defaultSortDirection: 'asc',
						class: 'col-9 myds-navigate',
						data: 'id="contact-edit-{{id}}" data-context="{{id}}" data-id="{{id}}" data-controller="setup-user-edit"'
					},
					{
						html: '<button class="btn btn-primary btn-outline btn-sm myds-navigate" ' +
	               			' id="contact-edit-{{id}}" data-context="{{id}}" data-id="{{id}}" data-controller="setup-user-edit"><i class="fa fa-pencil"></i></button>',
						caption: '&nbsp;',
						class: 'col-sm-3 text-right'
					},
					{
						fields:
						[]	
					}
				]
			}
		});
	}
});

app.add(
{
	name: 'setup-user-edit',
	code: function (param, response)
	{	
		var data = app.find(
		{
			dataController: 'setup-user-dashboard',
			dataContext: 'all',
			controller: 'setup-user-edit',
			context: 'id'
		});

		if (_.isUndefined(data))
		{
			data =
			{
				id: '',
				username: ''
			}
		}

		app.view.refresh(
		{
			scope: 'setup-user-edit',
			selector: '#setup-user-edit',
			data: data
		});
	}	
});

app.add(
{
	name: 'setup-user-edit-save',
	code: function (param, response)
	{	
		var id = app.get(
		{
			scope: 'setup-user-edit',
			context: 'id',
			valueDefault: ''
		});

		var data = app.get(
		{
			scope: 'setup-user-edit-' + id,
			clean: true,
			valueDefault: {}
		});

		data.id = id;

		if (response == undefined)
		{
			mydigitalstructure.cloud.save(
			{
				object: 'setup_user',
				data: data,
				callback: 'setup-user-edit-save'
			});
		}
		else
		{	
			if (response.status == 'OK')
			{
				if (data.id == '')
				{
					app.notify('User has been added.');
				}
				else
				{
					app.notify('User has been updated.');
				}
				
				app.set(
				{
					controller: 'setup-user-edit',
					context: 'id',
					value: response.id
				});

				data.id = response.id;

				app.refresh(
				{
					scope: 'setup-user-edit',
					data: data,
					routeTo: 'setup-user-dashboard',
					dataScope: 'setup-user-dashboard'
				});
			}
		}
	}
});



