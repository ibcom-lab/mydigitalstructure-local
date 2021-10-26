app.add(
[
	{
		name: 'dashboard',
		code: function ()
		{
			app.invoke('util-dashboard',
			{
				dashboards:
				[
					{
						name: 'dashboard-hello-contacts',
						containerSelector: '#dashboard-hello-contacts',
						template: '<strong>{{count}}</strong>',
						storage:
						{
							object: 'contact_person',
							fields:
							[
								{name: 'count(id) count'}
							]
						}
					},
					{
						name: 'dashboard-hello-actions',
						containerSelector: '#dashboard-hello-actions',
						template: '<strong>{{count}}</strong>',
						storage:
						{
							object: 'action',
							fields:
							[
								{name: 'count(id) count'}
							]
						}
					}
				]
			});
		}
	},
	{
		name: 'dashboard-popover',
		code: function ()
		{
			console.log('popover')

			$('.popover-body').html('This is content')
		}
	}
]);
