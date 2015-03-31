var TaskExtendForm = {};
TaskExtendForm.init = function() {

	TaskExtendForm.form = new Ext.form.FormPanel({
				width : 400,
				height : 200,
				hidden : false,
				border : false,
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

	return TaskExtendForm.form;
}
