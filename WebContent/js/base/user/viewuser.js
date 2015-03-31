Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var viewuser = {viewdialog:null,viewform:null,user:null,cs:null};
viewuser.viewuser = function(){	
	if(myGrid.row == null){
	  	return false;
	}
	Seam.Component.getInstance("base_user_UserSerivce").getCsVo(viewuser.getviewdialog); 
};

viewuser.getviewform = function(){
	viewuser.viewform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        plain: false,
		frame:true,
		bodyStyle:'padding:5px 5px 0',
		labelWidth:80,
		items:[{
            layout:'column',
			items:[{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam869')+'',
						width:175,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('loginname')],
						anchor:'95%'
				}]			
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam872')+'',
						name: 'truename',
						width:175,
						minLength:1,
						maxLength:20,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('truename')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[
//					{
//						xtype:'combo',
//						store: new Ext.data.SimpleStore({
//							fields: ["sex", "name"],
//							data:[[1,'男'],[0,'女']]
//						}),	
//						valueField :"sex",
//						displayField: "name",
//						mode: 'local',
//						forceSelection: true,
//						blankText:'请选择性别',
//						emptyText:'选择性别',
//						hiddenName:'sex',
//						editable: false,
//						triggerAction: 'all',
//						allowBlank:false,
//						disabled:true,
//						fieldLabel: '性别',
//						name: 'sex',
//						value:[myGrid.row.get('sex')],
//						anchor:'95%'
//				}
			{ 
						fieldLabel: ''+getResource('resourceParam936')+'',
						name: 'sex',
						width:175,
                        xtype:'textfield',
						minLength:1,
						maxLength:2,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('sex')],
						anchor:'95%'
				}
				]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{ 
						fieldLabel: ''+getResource('resourceParam937')+'',
						name: 'age',
						width:175,
                        xtype:'numberfield',
						minLength:1,
						maxLength:2,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('age')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{ 
						fieldLabel: ''+getResource('resourceParam497')+'',
						name: 'address',
						width:175,
						minLength:1,
						maxLength:200,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('address')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{ 
						fieldLabel: ''+getResource('resourceParam938')+'',
						name: 'postcode',
						width:175,
                        xtype:'numberfield',
						minLength:1,
						maxLength:10,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('postcode')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: '电话1',
						name: 'tel1',
						width:175,
						minLength:1,
						maxLength:20,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('tel1')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: '电话2',
						name: 'tel2',
						width:175,
						minLength:1,
						maxLength:20,
						allowBlank:false,
						disabled:true,
						value:[myGrid.row.get('tel2')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["instcode", "name"],
							data:viewuser.cs.instcodelist
						}),	
						valueField :"instcode",
						displayField: "name",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam929')+'',
						emptyText:''+getResource('resourceParam934')+'',
						hiddenName:'instcode',
						editable: false,
						triggerAction: 'all',
						allowBlank:false,
						disabled:true,
						fieldLabel: ''+getResource('resourceParam873')+'',
						name: 'instcode',
						value:[myGrid.row.get('instcode')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						anchor:'95%',
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["judgeman", "name"],
							data:[[1,''+getResource('resourceParam512')+''],[0,''+getResource('resourceParam510')+'']]
						}),	
						valueField :"judgeman",
						displayField: "name",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'为决策组成员',
						emptyText:''+getResource('resourceParam503')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'为决策组成员',
						hiddenName:'judgeman',
						editable: false,
						triggerAction: 'all',
						allowBlank:false,
						disabled:true,
						fieldLabel: '决策组成员',
						name: 'judgeman',
						value:[myGrid.row.get('judgeman')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						anchor:'95%',
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["viewLevel", "name"],
							data:viewuser.cs.viewlevellist
						}),	
						valueField :"viewLevel",
						displayField: "name",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam930')+'',
						emptyText:''+getResource('resourceParam931')+'',
						hiddenName:'viewLevel',
						editable: false,
						triggerAction: 'all',
						allowBlank:false,
						disabled:true,
						fieldLabel: ''+getResource('resourceParam935')+'',
						name: 'viewLevel',
						value:[myGrid.row.get('viewLevel')],
						anchor:'95%'
				}]
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{ 
						anchor:'95%',
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["logLevel", "name"],
							data:viewuser.cs.loglevellist
						}),	
						valueField :"logLevel",
						displayField: "name",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam927')+'',
						emptyText:''+getResource('resourceParam928')+'',
						hiddenName:'logLevel',
						editable: false,
						triggerAction: 'all',
						allowBlank:false,
						disabled:true,
						fieldLabel: ''+getResource('resourceParam932')+'',
						name: 'logLevel',
						value:[myGrid.row.get('logLevel')],
						anchor:'95%'
				}]
			}]
		}],									
		buttons: [
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){
					viewuser.viewdialog.hide();	
			}
		}]	
	});				
	return viewuser.viewform;
};
viewuser.getviewdialog = function(value){
	viewuser.cs = value;
	tlework.addHtml(tlework.divHtml,'viewuser');	
	if (!viewuser.viewdialog){		
		viewuser.viewdialog = new Ext.Window({ 
			el:'viewuser',
			title: ''+getResource('resourceParam933')+'',
           	layout:'fit',
			modal:true,
           	width:700,
           	height:280,
           	closeAction:'hide',
           	plain: false,
			items:viewuser.getviewform()						
		});
		viewuser.viewdialog.on('hide',viewuser.close);
	}
	viewuser.viewdialog.show();
};
viewuser.close = function(){
	viewuser.viewform.form.reset();									
	viewuser.viewdialog.destroy();
	viewuser.viewform = null;					
	viewuser.viewdialog = null;
};
