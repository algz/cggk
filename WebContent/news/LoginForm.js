var LoginForm = null;

Ext.onReady(function() {
   // Seam.Component.getInstance("auth").Logout();
	Ext.QuickTips.init();
	
	
	
	function doLogin(){
		if(LoginForm.form.isValid()){
		  /*var name = LoginForm.getForm().getValues().name;
		  var password = LoginForm.getForm().getValues().password;
		  Seam.Component.getInstance("auth").doLogin(name,password,callback);*/
		  LoginForm.getForm().submit();
		

		}
	  
	}
	
	LoginForm = new Ext.FormPanel( {
		labelWidth : 40, 
		frame : true,
		title : ''+getResource('resourceParam1929')+'',
		bodyStyle : 'padding:0px 0px 0',
		width : 170,
		defaults : {
			width : 100
		},
		shadow:false,
		defaultType : 'textfield',
        onSubmit: Ext.emptyFn,  
        submit: function() {  
         this.getEl().dom.action = '../base/login.seam';
         this.getEl().dom.method = "POST";
         this.getEl().dom.submit();  
        },
		items : [ {
			fieldLabel : ''+getResource('resourceParam1927')+'',
			id:'loginName',
			name : 'username',
			allowBlank : false
		}, {
			fieldLabel : ''+getResource('resourceParam1928')+'',
			inputType : 'password',
			name : 'password',
			allowBlank : false
		}],

		buttons : [ {
			text : ''+getResource('resourceParam1929')+'',
			minWidth:40,
			handler:doLogin
		}, {
			text : ''+getResource('resourceParam1930')+'',
			minWidth:40
		}]
	});
	new Ext.KeyMap(document, {
        key: Ext.EventObject.ENTER,
        fn: doLogin,
        scope: this
	});
	
	if (Ext.get("loginForm"))
	{
		LoginForm.render(Ext.get("loginForm"));
		var loginName = Ext.get('loginName');
		loginName.focus();
	}
});
