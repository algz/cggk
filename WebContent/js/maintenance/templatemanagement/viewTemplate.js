var viewTemplate = {}
viewTemplate.init = function() {
	var form = new Ext.form.FormPanel({
				bodyStyle : 'padding:10px 0px 10px 10px',
				autoScroll : true,
				split : true,
				border : false,
				autoWidth : true,
				items : [{
							xtype : 'textfield',
							fieldLabel : '模板名称',
							name : 'name',
							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : '模板分类',
							name : 'cate',
							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}, {
							xtype : 'textfield',
							fieldLabel : '模板描述',
							name : 'note',
							style : 'margin-bottom: 5px;',
							width : 250,
							readOnly : true
						}]
			});
	viewTemplate.setBasic = function(id, callback) {
		form.getForm().reset();
		Ext.Ajax.request({
					url : "../JSON/wbstemplate_TemplateRemote.getWBSTemplateInfo",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success) {
							form.getForm().findField('name')
									.setValue(obj.wbstemplatename);
							form.getForm().findField('cate').setValue(obj.cate);
							form.getForm().findField('note')
									.setValue(obj.wbstemplatenote);
						} else {
							form.getForm().findField('name').setValue('');
							form.getForm().findField('cate').setValue('');
							form.getForm().findField('note').setValue('');
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : obj.message,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});

						}
					},
					params : {
						id : id
					}
				});
	}
	viewTemplate.panel = new Ext.Panel({
				layout : 'fit',
				border : false,
				items : [form]
			});
	return viewTemplate.panel;
}
