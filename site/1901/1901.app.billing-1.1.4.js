app.add(
{
	name:	'invoice-dashboard',
	code: function (param, response)
	{
		var data = app._util.data.get(
		{
			controller: 'invoice-dashboard',
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

		if (data.status == undefined) {data.status = -1}

		if (data.status == -1)
		{
			filters.push(
			{	
				field: 'outstandingamount',
				comparison: 'NOT_EQUAL_TO',
				value: '0'
			});
		}	

		app.invoke('util-view-table',
		{
			object: 'financial_invoice',
			controller: 'invoice-dashboard',
			container: 'invoice-dashboard-view',
			context: 'invoice-dashboard',
			onComplete: undefined,
			filters: filters,
			customOptions: undefined,
			options:
			{
				noDataText: 'There are no invoices that match this search.',
				rows: 20,
				orientation: 'vertical',
				progressive: true,
				class: 'table-condensed',
				deleteConfirm:
				{
					text: 'Are you sure you want to delete this invoice?',
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
						caption: '#',
						field: 'reference',
						sortBy: true,
						defaultSort: true,
						defaultSortDirection: 'asc',
						class: 'col-2 text-left',
						data: 'data-context="{{id}}" data-id="{{id}}"'
					},
					{
						caption: 'Date',
						field: 'duedate',
						sortBy: true,
						class: 'col-2 text-left'
					},
					{
						caption: 'Contact',
						field: 'contactbusinesssenttotext',
						sortBy: true,
						class: 'col-4 text-left'
					},
					{
						caption: '$',
						field: 'amount',
						sortBy: true,
						class: 'col-2 text-right'
					},
					{
						caption: '$ Outstanding',
						field: 'outstandingamount',
						class: 'col-2 text-right'
					},
					{
						fields: []	
					}
				]
			}
		});
	}
});

