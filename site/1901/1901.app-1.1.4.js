"use strict";

$(function()
{
	if (app.options.httpsOnly && window.location.protocol == 'http:')
	{
		window.location.href = window.location.href.replace('http', 'https')
	}
	else
	{
		mydigitalstructure._util.controller.invoke(
		{
			name: 'app-init'
		})
	}	
});

var app =
{
	build:
	{
		name: 'Quick Start webapp',
		version: '1.1.4',
		description: "Quick Start webapp",
		prefix: 'quickStart',
		author: 'ibCom',
		repository:
		{
		    type: 'git',
		    url: 'https://github.com/ibcom/apps.git'
		},
		docs:
		[
			''
		],
		dependancies:
		{
			mydigitalstructure: '3.6.4',
			lodash: '4.17.15',
			moment: '*'
		},
		help:
		{
			user: 'https://learn.mydigitalstructure.cloud'
		}
	},

	controller: mydigitalstructure._util.controller.code
};

app.options = 
{
	httpsOnly: false,
	container: '#main',
	assistWithBehavior: false,
	objects: false,
	registerDocument: undefined,
	startURI: '/app',
	startURIContext: '#dashboard',
	authURIIsHome: true,
	authURI: '/auth',
	authURIContext: '#auth',
	spinner: '/site/1901/1901.working.gif',
	working: '<div class="m-a-md text-center"><img src="/site/1901/1901.working.gif" style="height:25px;"></div>',
	rows: 50,
	namespace: 'app',
	styles:
	{
		button: 'btn btn-primary btn-outline btn-sm'
	},
	password:
	{
		minimumLength: 6
	},
	routing:
	{
		toURI:
		[
			{
				uri: '/app',
				uriContext:
				[
					'#dashboard'
				],
				onlyApplyIfURIDataContextNotEmpty: false,
				applyEvenIfReload: true
			},
			{
				uri: '/util-import',
				uriContext:
				[
					'#util-import-dashboard'
				],
				onlyApplyIfURIDataContextNotEmpty: false,
				applyEvenIfReload: true
			}
		],

		toStart:
		[
			{
				uri: '*',
				uriContext:
				[
					'*'
				]
			}
		]	
	}
}

$.fn.tooltip.Constructor.Default.whiteList.button = [];

app._util = mydigitalstructure._util;

app.invoke = app._util.controller.invoke;
app.add = app._util.controller.add;
app.view = app._util.view;
app.find = app._util.data.find;
app.set = app._util.data.set;
app.get = app._util.data.get;
app.refresh = app._util.view.refresh;
app.vq = app._util.view.queue;
app.show = app.vq.show;

app.views =
[
	{
		uri: '/auth',
		controller: 'auth'
	}
]

app.add(
[
	{
		name: 'app-init',
		code: function ()
		{	
			if (mydigitalstructure.compatible)
			{
				mydigitalstructure.init(
				{
					viewStart: app.controller['app-start'],
					viewUpdate: app.controller['app-update'],
					viewNavigation: app.controller['app-navigation'],
					viewStarted: app.controller['app-started'],
					options: app.options,
					views: app.views,
					viewAssemblySupport: true,
				});
			}
			else
			{
				window.location.href = '/compatiblilty'
			}
		}
	},
	{
		name: 'app-start',
		code: function (param, response)
		{
			if (!_.isEmpty(param))
			{
				delete param.logon;
				delete param.password;

				app._util.data.set(
				{
					controller: 'app-start',
					context: '_param',
					value: param
				});
			}
			else
			{
				param = app._util.data.get(
				{
					controller: 'app-start',
					context: '_param'
				});
			}
			
			if (param.isLoggedOn == false)
			{
				mydigitalstructure._scope.user = undefined;
				app.controller['app-router'](param);
			}
			else
			{	
				if (param.passwordstatus == 'EXPIRED' && $('#auth-password').length != 0)
				{
					$('#auth-password').modal('show')
				}
				else
				{
					app.controller['app-router'](param);

					$('.metismenu').find('li').not($(this).parents('li')).removeClass('active');
					$('.metismenu [href="' + location.pathname  + location.hash + '"]').parent().addClass('active');
					$('.metismenu [href="' + location.pathname  + location.hash + '"]').parent().siblings().find('ul').removeClass('in');

					$('.myds-logon-first-name').html(mydigitalstructure._scope.user.firstname);
					$('.myds-logon-surname').html(mydigitalstructure._scope.user.surname)
					$('.myds-logon-name').html(mydigitalstructure._scope.user.userlogonname)
					$('.myds-logon-space').html(mydigitalstructure._scope.user.contactbusinesstext)
				}	
			}	
		}
	},
	{
		name: 'app-started',
		code: function (param)
		{
			app._util.notify = app.controller['app-notify'];
		}
	},
	{
		name: 'app-update',
		code:	function (data)
		{
			if (data)
			{
				if (data.from == 'myds-logon-init')
				{
					if (data.status == 'start')
					{	
						$('#app-auth-message').html('');
						$('#myds-logoncode-view').addClass('hidden d-none');
					}

					if (data.status == 'need-code')
					{	
						$('#myds-logoncode-view').removeClass('hidden d-none');
						$('#app-auth-message').html('A code has been sent to you via ' + data.message + '.');
						$('#myds-logoncode').focus();
					}

					if (data.status == 'need-totp-code')
					{	
						$('tr.ns1blankspacePasswordTOTPCodeContainer').show();
						$('#ns1blankspaceLogonStatus').html('');

						var logonTOTPName = 'your TOTP client (eg Google Authenticator)';

						if (_.has(mydigitalstructure.options, 'logonTOTP'))
						{
							if (mydigitalstructure.options.logonTOTP.name != undefined)
							{
								logonTOTPName = mydigitalstructure.options.logonTOTP.name;
							}
						}

						$('#myds-logoncode-view').removeClass('hidden d-none');
						$('#app-auth-message').html('Please enter the code from ' + logonTOTPName + ' and then press Logon again.');
						$('#myds-logoncode').focus();
					}
				}

				if (data.from == 'myds-logon-send')
				{
					if (data.status == 'error')
					{	
						$('#myds-logon-status').html(data.message)
					}
					else
					{
						$('#myds-logon-status').html('');
					}	
				}

				if (data.from == 'myds-core')
				{
					if (data.status == 'error')
					{	
						if (data.message != 'invalid passwordhash' && data.message != 'INVALID_LOGON')
						{
							app.controller['app-notify'](
							{
								message: data.message,
								class: 'danger'
							});
						}
					}

					if (data.status == 'notify')
					{	
						app.controller['app-notify'](
						{
							message: data.message
						});
					}
				}

				if (data.from == 'myds-auth')
				{
					if (data.status == 'error')
					{	
						var options = mydigitalstructure._scope.app.options;
						options.notify = {message: 'You need to log on again.', class: 'danger'};
						mydigitalstructure._util.init(mydigitalstructure._scope.app)
					}
				}

				if (data.from == 'myds-send')
				{
					$('#app-working')[(data.status=='start'?'remove':'add') + 'Class']('hidden d-none');
				}

				if (data.from == 'myds-init')
				{
					if (data.status == 'uri-changed')
					{	
						mydigitalstructure._util.controller.invoke(
						{
							name: 'app-route-to'
						},
						{
							uri: mydigitalstructure._scope.app.uri,
							uriContext: data.message
						});

						window.scrollTo(0, 0);
					}	
				}

				if (data.from == 'myds-logon-send')
				{
					if (data.status == 'error')
					{
						$('#app-auth-message').html(data.message);
					}

					if (data.status == 'start')
					{
						$('#app-auth-message').html('<span class="spinner"><i class="icon-spin icon-refresh"></i></span>');
					}
				}

				if (data.from == 'myds-view-access')
				{
					if (data.status == 'context-changed')
					{
						$(data.message.hide.join(',')).addClass('hidden d-none');
						$(data.message.show.join(',')).removeClass('hidden d-none');
					}
				}
			}
		}
	},
	{
		name: 'app-navigation',
		code:	function (param)
		{
			if (mydigitalstructure._scope.user != undefined)
			{
				app.invoke('app-notifications');
			}

			app.invoke('util-view-menu-set-active', param);
		}
	}
]);

