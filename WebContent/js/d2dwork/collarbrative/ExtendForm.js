var collarbExtendForm = {};
collarbExtendForm.init = function() {

	collarbExtendForm.myform = new Ext.form.FormPanel({
				height : '600',
				hidden : false,
				hideMode : 'visibility',
				bodyStyle : 'padding:10px 0px 10px 10px',
				buttonAlign : 'right',
				items : [{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1036')+'',
							hidden:true,
							hideLabel:true
						}]

			});
	return collarbExtendForm.myform;
}
