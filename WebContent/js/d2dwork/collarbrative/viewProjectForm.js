var collarbViewForm = {

};
collarbViewForm.init = function() {
	collarbViewForm.myform = new Ext.form.FormPanel({
				hideMode : 'visibility',
				bodyStyle : 'padding:10px 0px 10px 10px',
				autoScroll : true,
				split : true,
				border : false,
				autoWidth : true,
				height:800,
				/*
				 vname
				 vtype
				 vdepart
				 vuser
				 vcreate
				 vstatus
				 vstart
				 vend
				 vrealstart
				 vrealend
				 vdesc
				 */
				items : [{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam480')+'',
							name : 'vname',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam481')+'',
							name : 'vtype',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam689')+'',
							name : 'vdepart',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam731')+'',
							name : 'vuser',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam858')+'',
							name : 'vcreate',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam739')+'',
							name : 'vstatus',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam991')+'',
							name : 'vstart',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1032')+'',
							name : 'vend',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam856')+'',
							name : 'vrealstart',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
						{
							xtype : 'textfield',
							fieldLabel : ''+getResource('resourceParam1033')+'',
							name : 'vrealend',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						},
//						{
//							xtype : 'textfield',
//							fieldLabel : '数据中心',
//							name : 'vdatacenternames',
//							anchor : '65%',
//							style : 'margin-bottom: 5px;',
//							width : 350,
//							readOnly:true
//						},
						{
							xtype : 'textarea',
							fieldLabel : ''+getResource('resourceParam648')+'',
							name : 'vdesc',
							anchor : '65%',
							style : 'margin-bottom: 5px;',
							width : 350,
							readOnly:true
						}]
			})

	return collarbViewForm.myform;
}
