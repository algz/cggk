var orgView={
	orgWin:null,
	orgForm:null,
	data:null
};

orgView.initWindow = function(title) {
	orgView.orgWin = new Ext.Window({
		title:title,
		width:550,
	   	height:150,
		modal:true,
		resizable:false,
		plain:false,
		layout:'fit'
		
	});	
	orgView.orgWin.on('hide',orgView.closeWin);
};

orgView.closeWin = function(){
	if(orgView.orgWin != null) {
		orgView.orgWin.close();
		orgView.orgWin.destroy();
	}
}


orgView.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	orgView.orgForm = {
		xtype:'form',
		bodyStyle:'padding:5px 5px 0;background:transparent',
		labelAlign: "left",
		labelSeparator: ':',
		labelWidth:95,
		buttonAlign:'right',
		frame:true,	
		buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:orgView.closeWin
		}],
		
		items:[{
			layout:"column",
			items:[{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:""+getResource('resourceParam688')+"",//机构编码
					disabled:true,
					anchor:"90%",
					value:orgView.data.instcode,
					disabled:true
				}]				
			}, {
				columnWidth: .5,
				layout:"form",
				items:[{
					xtype:'textfield',
					id:'name',
					minLength:1,
					maxLength:100,
					fieldLabel:""+getResource('resourceParam685')+"",//机构名称
					name:"name",
					anchor:"90%",
					allowBlank:false,
					value:orgView.data.name,
					disabled:true
				}]
			}, {	
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'combo',
					anchor:"90%",
					store:new Ext.data.Store({
						proxy : new Ext.data.HttpProxy( {
							url : '../JSON/maintenance_deptype_deptypeService.getDeptypeNames'
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'typename'
						},{
							name : 'deptypeid'		
						}])
					}),
					valueField :"deptypeid",
					displayField: "typename",
					mode: 'remote',
					forceSelection: true,
					hiddenName:'deptypeid',
					editable: false,
					triggerAction: 'all',
					fieldLabel: ''+getResource('resourceParam686')+'',//机构类别
					blankText:''+getResource('resourceParam683')+'',
					name: 'deptypeid',
					emptyText:''+getResource('resourceParam684')+'',
					value:orgView.data.kindname,
					disabled:true
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					minlength:1,
					maxLength:10,
					allowNegative:false,
					allowDecimals:false,
					id:'parentcode',
					fieldLabel:"上级管理行编码",
					disabled:true,
					name:"parentcode",
					anchor:"90%",
					value:orgView.data.parentcode,
					disabled:true
				}]
			}]
		}]
	}
	
	return orgView.orgForm;
}

orgView.addFormData = function(instcode) {
	Ext.Ajax.request({
		url: "../JSON/base_organization_OrganizationService.getOrgByInstcode",
		params: {"instcode":instcode},
		success: function(response, opt) {
			orgView.data = Ext.util.JSON.decode(response.responseText);
			orgView.initForm();
			orgView.orgWin.add(orgView.orgForm);	
			orgView.orgWin.show();
		},
		disableCaching: true,
		autoAbort: true
	});
}

orgView.init = function(title, nodeInf) {
	if(nodeInf == null) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam662')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		orgView.initWindow(title);
		orgView.addFormData(nodeInf.get("instcode"));
	}	
};
