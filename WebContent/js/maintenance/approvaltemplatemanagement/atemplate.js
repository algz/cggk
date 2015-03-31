var atemplate = {
	parentId : -1,
	privilege : false,
	templateId : null
};
atemplate.init = function() {
	// 创建form面板，包括模板名称和模板说明
	atemplate.form_panel = new Ext.form.FormPanel({
		bodyStyle : 'padding:10px 0px 10px 10px',
		width : 500,
		height : 250,
		frame : false,
		boder : false,
		defaults : {
			anchor : '90%'
		},
		items : [{
			xtype : 'textfield',
			name : 'temppri',
			value : config.template_privilege,
			hidden : true
		},{
			xtype : 'textfield',
			name : 'flowName',
			fieldLabel : '名称',
			style : 'margin-bottom: 5px;',
			allowBlank : false,
			blankText : '不能为空',
			maxLength : 50,
			maxLengthText : '不能超过50个字符'
		}, {
			xtype : 'textarea',
			name : 'description',
			fieldLabel : '描述',
			allowBlank : true,
			maxLength : 300,
			maxLengthText : '不能超过300个字符'
		}],
		buttons : [{
			text : ''+getResource('resourceParam1151')+'',
			handler : function() {
				var name = atemplate.form_panel.getForm().findField('flowName').getValue();
				var description = atemplate.form_panel.getForm().findField('description').getValue();
				var temppriv = atemplate.form_panel.getForm().findField('temppri').getValue();
				Ext.Ajax.request({
					url : "../JSON/approval_templetRemote.addFlowTemplet",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							atMain.mainPanel.getLayout().setActiveItem(5);
							atMain.designerPanel.getFlowGraph().loadFlow(obj.flowid);
						} else {
							Ext.MessageBox.show({
								title : '' + getResource('resourceParam499') + '',
								msg : '保存失败！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
						}
					},
					disableCaching : true,
					params : {
						flowid : atemplate.templateId,
						flowName : name,
						flowDescription : description,
						parentTypeid : atemplate.parentId,
						templateprivilege:temppriv
					}
				});
			}
		}, {
			text : ''+getResource('resourceParam7007')+'',
			handler : function() {
				Ext.getCmp('statusW').enable();
				Ext.getCmp('view1_issue').enable();
				Ext.getCmp('view1_delete').enable();
				atMain.mainPanel.getLayout().setActiveItem(0);
			}
		}]
	});

	atemplate.reset = function() { // 重置所有数据
		atemplate.form_panel.getForm().reset();
	}

	atemplate.panel = new Ext.Panel({
		items : [atemplate.form_panel]
	})
	return atemplate.panel;
}

atemplate.update = function(templateId) {
	atemplate.templateId = templateId;
	Ext.Ajax.request({
		url : "../JSON/approval_templetRemote.getFlowTemplet",
		method : 'POST',
		success : function(response, options) {
			var obj = Ext.util.JSON.decode(response.responseText);
			if (obj.success == true) {
				atemplate.form_panel.getForm().findField('flowName').setValue(obj.flowname);
				atemplate.form_panel.getForm().findField('description').setValue(obj.flowdescription);
			} else {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam499') + '',
					msg : '获取流程模板信息失败！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		},
		disableCaching : true,
		params : {
			flowid : atemplate.templateId
		}
	});
}