var collarbViewTaskForm = {

};
collarbViewTaskForm.init = function() {
	collarbViewTaskForm.myform = new Ext.form.FormPanel({
		hideMode : 'visibility',
		bodyStyle : 'padding:10px 0px 10px 10px',
		autoScroll : true,
		split : true,
		border : false,
		// autoWidth : true,
		//设置为auto，processbar显示不正确
		width : 400,

		height :350,

		/*
		 * tname ttype tdepart tuser tcomplete tstatus tstart tend trealstart
		 * trealend tdesc vissue vlandmark
		 */

		items : [


		{
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam998')+'',
			name : 'tname',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1043')+'',
			name : 'ttype',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam986')+'',
			name : 'tdepart',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam731')+'',
			name : 'tuser',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, 
//			{
//			xtype : 'textfield',
//			id : 'vcomplete',
//			fieldLabel : '完成情况',
//			name : 'tcomplete',
////			 anchor : '95%',
//			style : 'margin-bottom: 5px;',
//			width : 250,
//			disabled : true,
//			hidden:true,
//			hideLabel:true
//		},
		//在taskTree中setTaskForm(obj)设置progressbar值
		//在tabpanel的removeTaskTree(tab)中每次更新为0
		{
			layout : 'column',
			border : false,
//			anchor : '95%',
			items : [{
						border : false,
						columnWidth : .2,
						layout : 'form',
						items : [{
									xtype : 'label',
									
									border : false,
									text : ''+getResource('resourceParam1040')+''						
								}]
					}, {
						border : false,
						columnWidth : .8,
						layout : 'form',
						items : [new Ext.ProgressBar({
									id : 'progressbar',
									width : 250,
						
									style : 'margin-bottom: 10px;margin-left: 31px;',
									value : 0
								})]
					}]
		},

		{
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam739')+'',
			name : 'tstatus',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam991')+'',
			name : 'tstart',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1032')+'',
			name : 'tend',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam856')+'',
			name : 'trealstart',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1033')+'',
			name : 'trealend',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textarea',
			fieldLabel : ''+getResource('resourceParam648')+'',
			name : 'tdesc',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1202')+'',
			name : 'vissue',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}, {
			xtype : 'textfield',
			fieldLabel : ''+getResource('resourceParam1203')+'',
			name : 'vlandmark',
//			 anchor : '95%',
			style : 'margin-bottom: 5px;',
			width : 250,
			readOnly:true
		}]
	})

	return collarbViewTaskForm.myform;
}
