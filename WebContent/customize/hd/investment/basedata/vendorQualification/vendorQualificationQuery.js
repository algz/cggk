var vendorQualificationQuery = {

};

vendorQualificationQuery.getSearchForm = function(vendorId) {
	var buttons = [{
				text : ' 查询 ',
				handler : function() {
					var name = Ext.getCmp("vendor_name").getValue();
					var content = Ext.getCmp("vendor_content").getValue();
					var issuingauthority = Ext.getCmp("issuingauthority")
							.getValue();
					var license = Ext.getCmp("license").getValue();
					var grid = Ext.getCmp('vendorQualificationGridPanelId');
					grid.store.baseParams = {
						vendorId : vendorId,
						start : 0,
						limit : 20,
						name : name,
						content : content,
						issuingauthority : issuingauthority,
						license : license
					};
					grid.store.load();

					vendorQualificationQuerySearchForm.getForm().reset();
					window.close();
				}
			}, {
				text : '关闭',
				handler : function() {
					vendorQualificationQuerySearchForm.getForm().reset();
					window.close();
				}
			}];;

	var item = [{
				layout : 'column',
				xtype : 'container',
				defaults : {
					border : false,
					labelWidth : 85
				},
				items : [{
							columnWidth : .49,
							width : 700,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '名称',
										xtype : 'textfield',
										id : 'vendor_name',
										anchor : '90%'
									}]
						}, {
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '内容',
										xtype : 'textfield',
										id : 'vendor_content',
										anchor : '90%'
									}]
						}]
			}, {

				layout : 'column',
				width : 700,
				xtype : 'container',
				defaults : {
					border : false,
					labelWidth : 85
				},
				items : [{
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '发证机关',
										xtype : 'textfield',
										id : 'issuingauthority',
										anchor : '90%'
									}]
						}, {
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										xtype : 'textfield',
										fieldLabel : '证书编号',
										lableWidth : 150,
										id : 'license',
										anchor : '90%'
									}]
						}]

			}];

	// 表单
	var vendorQualificationQuerySearchForm = new Ext.form.FormPanel({
				padding : 5,
				buttonAlign : 'center',
				layout : 'column',
				autoScroll : true,
				width : 700,
				autoHeight : true,
				items : [item]
			});

	var window = new Ext.Window({
				id : "vendorQualificationQuerywind",
				buttons : buttons,
				layout : 'fit',
				width : 700,
				autoHeight : true,
				autoScroll : true,
				title : '查询',
				modal : true,
				items : vendorQualificationQuerySearchForm,
				border : true,
				closeAction : 'close'
			});
	return window;

}