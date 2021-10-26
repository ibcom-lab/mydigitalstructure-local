app.add(
[
	{
		name: 'auth-reset',
		code: function (param)
		{
			$('#auth-reset-2').addClass('hidden d-none');
			$('#auth-reset-1').removeClass('hidden d-none');
			$('#auth-reset-username').val($('#myds-logonname').val());
			app.controller['auth-reset-1']();
		}
	},	
	{
		name: 'auth-reset-1',
		code: function (param)
		{
			var validated = false;

			var data = app._util.data.get(
			{
				controller: 'auth-reset-1'
			});

			if (data)
			{
				validated = true;
				validated = validated && !_.isEmpty(data.username);
			}

			$('#auth-reset-send:visible')[(validated?'remove':'add') + 'Class']('disabled');
		}
	},
	{
		name: 'auth-reset-send',
		code: function (param, response)
		{
			if (_.isUndefined(response))
			{
				$('#auth-reset-1').addClass('hidden d-none');
				$('#auth-reset-2').removeClass('hidden d-none');

				var username = $('#auth-reset-username').val();
			
				var data =
				{
					document: '92962',
					logon: username,
					template_logon: username
				}

				$.ajax(
				{
					type: 'POST',
					url: '/rpc/site/?method=SITE_SEND_PASSWORD',
					data: data,
					dataType: 'json',
					global: false,
					success: function(response)
					{
						app.controller['auth-reset-send'](param, response)
					}
				});	
			}
			else
			{	
				$('#auth-reset-1').addClass('hidden d-none');
				$('#auth-reset-2').removeClass('hidden d-none');
			}
		}
	}
]);

app.add(
[
	{
		name: 'auth-password',
		code: function (param, response)
		{
			$('.auth-password').addClass('hidden d-none');
			$('#auth-password-1').removeClass('hidden d-none');
		}
	},
	{
		name: 'auth-password-change',
		code: function (param, response)
		{
			if (response == undefined)
			{
				var existingpassword = $('#auth-password-existing').val();
				var newpassword = $('#auth-password-new').val();
				var newpasswordconfirm = $('#auth-password-new-confirm').val();

				if (newpassword != newpasswordconfirm)
				{	
					app._util.notify(
					{
						message: 'New passwords do not match!',
						class: 'danger'
					});
				}
				else if (newpassword == '' || newpasswordconfirm == '' || existingpassword == '')
				{
					app._util.notify(
					{
						message: 'Can not have a blank password.',
						class: 'danger'
					});
				}
				else
				{
					mydigitalstructure.cloud.invoke(
					{
						method: 'site_user_password_manage',
						data:
						{
							expiredays: 3650,
							site: mydigitalstructure._scope.app.site,
							currentpassword: existingpassword,
							newpassword: newpassword
						},
						callback: app.controller['auth-password-change']
					});
				}
			}
			else
			{		
				if (response.status == 'ER')
				{
					app._util.notify(
					{
						message: 'Existing password is not correct.',
						class: 'danger'
					});
				}
				else
				{
					$('#auth-password-1').addClass('hidden d-none');
					$('#auth-password-2').removeClass('hidden d-none');
				}
			}
		}
	},	
	{
		name: 'auth-password-final',
		code: function (param, response)
		{
			var dataContext = app._util.data.get(
			{
				controller: 'auth-password',
				context: 'dataContext'
			});

			if (dataContext != undefined)
			{
				if (dataContext.source == 'expired')
				{
					app.invoke('app-route-to', {uri: '/app', uriContext: '#dashboard'})

					//app.invoke('app-router', {isLoggedOn: true});
				}
			}
			else
			{
				$('#auth-password').modal('close');
			}
		}
	}
]);
