var collarbViewProjectForm = {};
collarbViewProjectForm.init = function() {
	collarbViewProjectForm.link = new Ext.form.Label({
		html : "<div style='padding-left:302px;'><a href='javascript:void(0);'  onClick='collarbViewProjectForm.nextPage()'   style='text-decoration:underline;color:blue;width:100px;white-space:nowrap;'>"+getResource('resourceParam1036')+"</a></div>"
	});
	collarbViewProjectForm.link.setVisible(false);
	collarbViewProjectForm.myform = new Ext.form.FormPanel({
				bodyStyle : 'padding:10px 0px 10px 10px',
				autoScroll : true,
				split : true,
				border : false,
				/*
				 * vname vtype vdepart vuser vcreate vstatus vstart vend
				 * vrealstart vrealend vdesc
				 */
				items : [{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1035')+'',
							name : 'vname',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1037')+'',
							name : 'vtype',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : '密级',
							name : 'securityDegreeName',
							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly:true
						},{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam986')+'',
							name : 'vdepart',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1034')+'',
							name : 'vuser',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : '项目编制人',
							name : 'issuedManName',
							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam858')+'',
							name : 'vcreate',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1038')+'',
							name : 'vstatus',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam991')+'',
							name : 'vstart',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1032')+'',
							name : 'vend',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam856')+'',
							name : 'vrealstart',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1033')+'',
							name : 'vrealend',

							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}
//						, {
//							xtype : 'textfield',
//							fieldLabel : '数据中心',
//							name : 'vdatacenternames',
//							style : 'margin-bottom: 5px;',
//							width : 250,
//							readOnly:true
//						}
						, {
							xtype : 'textfield',
							fieldLabel : '理由',
							name : 'whyname',
							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly:true
						},
						{
							xtype : 'textarea',
							fieldLabel : ''+getResource('resourceParam1039')+'',
							name : 'vdesc',

							style : 'margin-bottom: 5px;',
							width : 250,
							height:50,
							grow : true,
							growMin : 50,
							preventScrollbars : true,
							readOnly : true
						}, collarbViewProjectForm.link]
			})
	
	return collarbViewProjectForm.myform;
}
