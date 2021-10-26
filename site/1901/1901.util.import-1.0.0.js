app.add(
{
	name: 'util-import-dashboard',
	code: function ()
	{	
		app.set(
		{
			scope: 'util-import',
			context: 'imports',
			value:
			[
				{
					name: 'people',
					initialiseController: 'util-import-people-initialise',
					validateController: 'util-import-people-validate',
					processController: 'util-import-people-process',
					completedController: 'util-import-people-completed',
					statusTemplate: '{{firstname}} {{lastname}}' ,
					fields:
					[
						{
							name: 'Firstname'
						},
						{
							name: 'Lastname'
						},
						{
							name: 'Email'
						}
					]
				}
			]
		});

		app.set(
		{
			scope: 'util-import-sheet-process',
			context: 'people',
			name: 'import-format',
			value:
			[
				{
					name: 'firstname',
					caption: 'First Name',
					_sheet: 'Person',
					_cell: 'B1' 
				},
				{
					name: 'surname',
					caption: 'Last Name',
					sheet: 'Person',
					cell: 'B2' 
				},
				{
					name: 'email',
					caption: 'Email',
					parent: 'person',
					sheet: 'Contact Details',
					cell: 'B1' 
				},
				{
					name: 'homephone',
					caption: 'Phone',
					sheet: 'Contact Details',
					cell: 'B2' 
				}
			]
		});

		//FOR HARPS
		app.set(
		{
			scope: 'util-import-sheet-process',
			context: 'audit',
			name: 'import-format',
			value:
			[
				{
					caption: 'Audit Start Date',
					name: 'auditstartdate',
					sheet: 'HARPS Summary',
					cell: 'J1',
					format:
					{
						date: 
						{ 
							in: 'DD/MM/YY',
							out: 'DD MMM YYYY'
						}
					}
				},
				{
					caption: 'Audit Finish Date',
					name: 'auditfinishdate',
					sheet: 'HARPS Summary',
					cell: 'J2',
					defaultValue: '',
					format:
					{
						date: 
						{ 
							in: 'DD/MM/YY',
							out: 'DD MMM YYYY'
						}
					}
				},
				{
					caption: 'Total Hours on Site',
					defaultValue: '0'
				},
				{
					caption: 'Duration Site Inspection (Hrs)'
				},
				{
					caption: 'Base Program On-site time (Hrs)',
					name: 'base_program_onsite_time_hrs'
				},
				{
					caption: 'Base Program Off-site time (Hrs)',
					name: 'base_program_offsite_time_hrs'
				},
				{
					caption: 'HARPS On-site time (Hrs)',
					name: 'harps_on_site_time_hrs'
				},
				{
					caption: 'HARPS Off-site time (Hrs)',
					name: 'harps_off_site_time_hrs'
				},
				{
					caption: 'Notification of Audit Completed (OPEN CARs)',
					name: 'notification_of_audit_completed_open_cars'
				},
				{
					caption: 'Notification of Non-conformances Completed',
					name: 'notification_of_non_conformances_completed'
				},
				{
					caption: 'Company Name'
				},
				{
					caption: 'Trading Name'
				},
				{
					caption: 'Site Street Address'
				},
				{
					caption: 'Site Town'
				},
				{
					caption: 'Site State'
				},
				{
					caption: 'Site Postcode'
				},
				{
					caption: 'Postal Address'
				},
				{
					caption: 'Postal Town'
				},
				{
					caption: 'Postal State'
				},
				{
					caption: 'Postal Postcode'
				},
				{
					caption: 'Site Contact Name'
				},
				{
					caption: 'Site Contact Email',
					validate: 
					{
						mandatory: true,
						email: true,
						maximumLength: 10,
						controller: 'util-import-sheet-process-validate'
					}
				},
				{
					caption: 'Site Contact Phone'
				},
				{
					caption: 'Site Contact Mobile'
				},
				{
					caption: 'Site Contact Position'
				},
				{
					caption: 'Supplier Type Grower'
				},
				{
					caption: 'Supplier Type Packer'
				},
				{
					caption: 'Supplier Type Grower Packer'
				},
				{
					caption: 'Supplier Type Ripening Warehouse'
				},
				{
					caption: 'Supplier Type Distributor'
				},
				{
					caption: 'Supplier Type Agent Broker'
				},
				{
					caption: 'HARPS Customers Aldi'
				},
				{
					caption: 'HARPS Customers Coles'
				},
				{
					caption: 'HARPS Customers Costco'
				},
				{
					caption: 'HARPS Customers Metcash'
				},
				{
					caption: 'HARPS Customers Woolworths'
				},
				{
					caption: 'Retailer Tier Aldi'
				},
				{
					caption: 'Retailer Tier Coles'
				},
				{
					caption: 'Retailer Tier Costco'
				},
				{
					caption: 'Retailer Tier Metcash'
				},
				{
					caption: 'Retailer Tier Woolworths'
				},
				{
					caption: 'Scope of Audit'
				},
				{
					caption: 'Product Lines covered by Scope'
				},
				{
					caption: 'Certification Body'
				},
				{
					caption: 'Auditor Name'
				},
				{
					caption: 'GFSI Scheme'
				},
				{
					caption: 'Type of Audit'
				},
				{
					caption: 'Audit Grade'
				},
				{
					caption: 'Month And Year of next Audit'
				},
				{
					caption: 'Certification Suspended'
				},
				{
					caption: 'Date of review Visit if required SQF'
				},
				{
					caption: 'HARPS CARs Critical'
				},
				{
					caption: 'HARPS CARs Major'
				},
				{
					caption: 'HARPS CARs Minor'
				},
				{
					caption: 'GFSI Scheme Critical'
				},
				{
					caption: 'GFSI Scheme Major'
				},
				{
					caption: 'GFSI Scheme Minor'
				},
				{
					caption: 'Does the site require a Hard Copy of the HARPS Certificate'
				},
				{
					caption: 'Dates/s of GFSI Scheme Audit',
					name: 'Dates_of_GFSI_Scheme_Audit',
					format:
					{
						date: 
						{ 
							in: 'DD/MM/YY',
							out: 'DD MMM YYYY'
						}
					}
				},
				{
					caption: 'GFSI Scheme 2',
					name: 'GFSI_Scheme_2'
				},
				{
					caption: 'GFSI Scheme Auditor/s',
					name: 'GFSI_Scheme_Auditors'
				},
				{
					caption: 'GFSI Non-Conformances',
					name: 'gfsi_non_conformances',
					sheet: 'HARPS Summary',
					range: 
					{
						header:
						{
							name: 'gfsi_non_conformances_header'
						},
						footer:
						{
							name: 'gfsi_non_conformances_footer'
						},
						fields:
						[
							{
								name: 'ifrequired',
								column: 'A'
							},
							{
								name: 'elementnumber',
								column: 'B',
								validate:
								{
									mandatory: true
								}
							},
							{
								name: 'critical',
								column: 'F'
							},
							{
								name: 'major',
								column: 'G'
							},
							{
								name: 'minor',
								column: 'H'
							},
							{
								name: 'datedueforclosure',
								column: 'I',
								format:
								{
									date: 
									{ 
										in: 'DD/MM/YY',
										out: 'DD MMM YYYY'
									}
								}
							},
							{
								name: 'dateclosedout',
								column: 'J',
								format:
								{
									date: 
									{ 
										in: 'DD/MM/YY',
										out: 'DD MMM YYYY'
									}
								}
							}
						]
					}
				},
				{
					caption: 'HARPS Non-Conformances',
					name: 'harps_non_conformances',
					sheet: 'HARPS Summary',
					range: 
					{
						header:
						{
							name: 'harps_non_conformances_header'
						},
						footer:
						{
							name: 'harps_non_conformances_footer'
						},
						fields:
						[
							{
								name: 'ifrequired',
								column: 'A'
							},
							{
								name: 'elementnumber',
								column: 'B'
							},
							{
								name: 'critical',
								column: 'F'
							},
							{
								name: 'major',
								column: 'G'
							},
							{
								name: 'minor',
								column: 'H'
							},
							{
								name: 'datedueforclosure',
								column: 'I',
								format:
								{
									date: 
									{ 
										in: 'DD/MM/YY',
										out: 'DD MMM YYYY'
									}
								}
							},
							{
								name: 'dateclosedout',
								column: 'J',
								format:
								{
									date: 
									{ 
										in: 'DD/MM/YY',
										out: 'DD MMM YYYY'
									}
								}
							}
						]
					}
				},
				{
					caption: 'HARPS Non-Conformances Report',
					name: 'harps_non_conformances_report',
					sheet: 'NC Report',
					range: 
					{
						header:
						{
							name: 'harps_non_conformances_report_header'
						},
						footer:
						{
							lastRow: true,
							lastRowColumn: 'A'
						},
						fields:
						[
							{
								name: 'number',
								column: 'A'
							},
							{
								name: 'elementnumber',
								column: 'B'
							},
							{
								name: 'grade',
								column: 'C'
							},
							{
								name: 'actionpoint',
								column: 'D'
							},
							{
								name: 'correction',
								column: 'E'
							},
							{
								name: 'correctionplan',
								column: 'K'
							},
							{
								name: 'duedate',
								column: 'N',
								format:
								{
									date: 
									{ 
										in: 'DD/MM/YY',
										out: 'DD MMM YYYY'
									}
								}
							},
							{
								name: 'daterectified',
								column: 'O',
								format:
								{
									date: 
									{ 
										in: 'DD/MM/YY',
										out: 'DD MMM YYYY'
									}
								}
							},
							{
								name: 'reviewedby',
								column: 'P'
							}
						]
					}
				}
			]
		});

		app.set(
		{
			scope: 'util-import-sheet-process',
			context: 'audit',
			name: 'import-format-template',
			value:
			[
				{
					caption: 'Checklist Element {{name}} Conforms',
					sheet: 'Checklist',
					prefix: 'harps_checklist',
					names: ['1-1', '2-1', '2-2', '3-1', '3-2', '3-3', '3-4', '4-1', '4-2', '4-3', '5-1', '5-2',
								'6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11', '6-12', '6-13', '6-14', '6-15', '6-16',
								'7-1', '7-2', '7-3', '7-4', '7-5', '7-6',
								'8-1', '8-2', '8-3', '9-1', '9-2', '10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8']
				},
				{
					caption: 'Checklist Element {{name}} Evidence',
					sheet: 'Checklist',
					prefix: 'harps_checklist',
					names: ['1-1', '2-1', '2-2', '3-1']
				}
			]
		});
	}
});

app.add(
{
	name: 'util-import-people-initialise',
	code: function (param)
	{	
		app.show('#util-import-status', 'Initialising...');

		mydigitalstructure.cloud.retrieve(
		{
			object: 'contact_person',
			data:
			{
				criteria:
				{
					fields:
					[
						{"name" : "firstname"},
						{"name" : "surname"},
						{"name" : "email"}
					]
				}
			},
			set:
			{
				scope: 'util-import',
				context: 'people'
			},
			options: {rows: 99999},
			callback: 'util-import-process'
		});
	}
});

app.add(
{
	name: 'util-import-people-validate',
	code: function (param, importPerson)
	{
		console.log(importPerson);
		app.invoke('util-import-process', param);
	}
});

app.add(
{
	name: 'util-import-people-process',
	code: function (param, importPerson)
	{	
		// Check if person exists
		// Assumes the initialseController loaded the existing people in to the local data store
		var people = app.get(
		{
			scope: 'util-import',
			context: 'people'
		})

		var person = _.find(people, function (person)
		{
			var match = 
			(
				_.lowerCase(importPerson.firstname) == _.lowerCase(person.firstname)
				&& _.lowerCase(importPerson.lastname) == _.lowerCase(person.surname)
				&& _.lowerCase(importPerson.email) == _.lowerCase(person.email)
			)

			return match
		});

		importPerson._match = person;

		if (person == undefined)
		{	
			var data = 
			{	
				firstname: importPerson.firstname,
				surname: importPerson.lastname,
				email: importPerson.email
			}

			param.processing.data = data;

			mydigitalstructure.cloud.save(
			{
				object: 'contact_person',
				data: data,
				callback: 'util-import-process'
			});
		}
		else
		{
			app.invoke('util-import-process', param);
		}
	}
});

app.add(
{
	name: 'util-import-people-completed',
	code: function (param, importData)
	{	
		//if validate and not errors enable the Import button which invokes 'util-import-process'
		var validate = app.data["util-import"].validate;
		
		console.log(importData);

		if (validate)
		{
			app.show('#util-import-status', '<h2 class="my-4 text-muted">' + importData.raw.length + ' validated.</h2>');
		}
		else
		{
			app.show('#util-import-status', '<h2 class="my-4 text-muted">' + importData.raw.length + ' processed (imported).</h2>');
		}
	}
});

app.add(
{
	name: 'util-import-sheet-process',
	code: function (param, importData)
	{	
		//Format for the data import from Excel file is set up in the contoller util-import-dashboard

		var validate = importData.validate;

		if (validate)
		{
			app.vq.init()
			app.vq.add(
			[
				'<table class="table">',
				'<thead>',
					'<tr>',
						'<th>Caption</th>',
						'<th>Value</th>',
						'<th>Sheet</th>',
						'<th>Name</th>',
						'<th>Cell</th>',
						'<th>Comments</th>',
					'</tr>',
				'</thead>'
			]);

			var value;

			_.each(importData.format, function (format)
			{
				var name = '';

				if (format._processing.name != undefined)
				{
					name = format._processing.name
			
					if (format._processing.notes.cell == 'based-on-name' || format._processing.notes.cell == 'based-on-name-as-exists')
					{
						name = name + '<i class="fa fa-asterisk text-success ml-2"></i>'
					}
				}
				else if (format._processing.notes.cell == 'not-set')
				{
					name = '<div class="text-muted"><em>' + format.namebasedoncaption + '</em></div>' +
								'<div class="text-muted"><em>' + format.namebasedoncaption_ + '</em></div>';
				}

				if (format._processing.name!=undefined?format._processing.name:'') +
									(format._processing.notes.cell=='based-on-name'||format._processing.notes.cell=='based-on-name-as-exists'?'<i class="fa fa-asterisk text-success ml-2"></i>':'')

				value = format.value;

				if (_.isObject(value))
				{
					value = '<div class="form-group"><textarea class="form-control" style="width:300px; height:500px;">' + JSON.stringify(value) + '</textarea></div>';
				}

				app.vq.add(
				[
					'<tr>',
						'<td><div>' + format.caption,
							((format._processing.notes.cell=='based-on-name-based-on-caption'||format._processing.notes.cell=='based-on-name-based-on-caption-underscore')?'<i class="fa fa-asterisk text-success ml-2"></i>':''),
							'</div>',
							(format._processing.validate.errors?'<div class="text-danger">' + _.join(format._processing.validate._errorsList, ', ') + '</div>':''),
						'</td>',
						'<td>' + (value!=undefined?value:'<span class="text-muted"><em>Not Set</em></span>') + '</td>',
						'<td class="text-muted">' + format.sheet + '</td>',
						'<td class="text-muted">' + name + '</td>',
						'<td class="text-muted">' + (format.cell!=undefined?format.cell:'<span class="text-muted"><em>Not Set</em></span><i class="fa fa-asterisk text-danger ml-2"></i>') + (format._processing.notes.cell == 'as-set'?'<i class="fa fa-asterisk text-success ml-2"></i>':'') + '</td>',
						'<td>' + _.join(_.map(format._comments, function (comment) {return '<div class="text-muted">' + comment + "</div>"}), '') + '</td>',
					'</tr>'
				]);
			});

			app.vq.add('</table>')

			app.vq.render('#myds-util-import-sheet-status');
		}
		else
		{
			var data = importData.processed;

			mydigitalstructure.cloud.save(
			{
				object: 'contact_person',
				data: data,
				callback: 'util-import-sheet-process-completed'
			});
		}
	}
});

app.add(
{
	name: 'util-import-sheet-process-validate',
	code: function (format, formattedData)
	{	
		var errors = {};

		if (format.caption == 'Site Contact Email')
		{
			if (formattedData != undefined)
			{
				if (!_.contains(formattedData, '@email.com'))
				{
					errors.emaildomain = true
				}
			}
		}
		
		return errors;
	}
});

app.add(
{
	name: 'util-import-sheet-process-completed',
	code: function (param, response)
	{	
		if (response.status == 'ER')
		{
			app.show('#myds-util-import-sheet-status', '<h2 class="my-4 text-muted">Could not save the contact to mydigitalstructure.cloud (' + response.error.errornotes + ')</h2>');
		}
		else
		{
			app.show('#myds-util-import-sheet-status', '<h2 class="my-4 text-muted">' + param.data.firstname + ' saved to mydigitalstructure.cloud.</h2>');
		}
	}
});

/*

app.add(
{
	name: 'util-import-sheet-process-no-preformatting',
	code: function (param, importData)
	{	
		// Example of working with the workbook object directly.
		// Not format set up so mydigitalstructure passes the workbook object only.
		// Better to do as controller util-import-sheet-process does it.
		
		var importFormat =
		[
			{
				name: 'firstname',
				caption: 'First Name',
				sheet: 'Person',
				cell: 'B1' 
			},
			{
				name: 'surname',
				caption: 'Last Name',
				sheet: 'Person',
				cell: 'B2' 
			},
			{
				name: 'email',
				caption: 'Email',
				sheet: 'Contact Details',
				cell: 'B1' 
			},
			{
				name: 'homephone',
				caption: 'Phone',
				sheet: 'Contact Details',
				cell: 'B2' 
			}
		]

		console.log(importData);

		var formattedData = {};
		var worksheet;

		_.each(importFormat, function (format)
		{
			worksheet = importData.workbook.Sheets[format.sheet];
			value = undefined;

			if (worksheet != undefined)
			{
				cell = worksheet[format.cell];

				if (cell != undefined)
				{
					value = (cell ? cell.v : undefined);
				}
			}

			format.value = value;
			formattedData[format.name] = value;
		});

		console.log(importFormat);
		console.log(formattedData);

		app.vq.init()
		app.vq.add('<table class="table">')

		_.each(importFormat, function (format)
		{
			app.vq.add(
			[
				'<tr>',
					'<td>' + format.caption + '</td>' +
					'<td>' + format.value + '</td>' +
				'</tr>'
			]);
		});

		app.vq.add('</table>')

		app.vq.render('#myds-util-import-sheet-view');
	}
});

*/


