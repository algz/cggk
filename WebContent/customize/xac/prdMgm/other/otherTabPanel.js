var otherTabPanel = {
	nodeId : null,
	bomType : 'PBOM',
	rootID : '0'
};

otherTabPanel.init = function() {

	otherTabPanel.colorFieldForm = new Ext.form.FormPanel( {
		title : '分包商列表',
		labelAlign : 'right',
		labelWidth : 200,
		width : 500,
		frame : true,
		buttons : [ {
			id : 'submit',
			text : '保存',
			handler : function() {
				var values = otherTabPanel.colorFieldForm.form.getValues();
				var res = "";
				for ( var i in values) {
					res = res + i + "!" + values[i]+",";
				}
				callSeam("XacCommon_CommonRemote", "setColor", [ res ],
						function(result) {
							if(result == 'success'){
								Ext.Msg.alert('提示','保存成功！ ');
								otherMain.westPanel.doLayout();
							}
						});
			}
		} ]
	});

	otherTabPanel.T1 = new Ext.Panel( {
		id : 'gytab1',
		title : '分包商颜色设置',
		closable : false,
		layout : 'fit',
		items : [ otherTabPanel.colorFieldForm ]
	});

	otherTabPanel.tabpanel = new Ext.TabPanel( {
		activeTab : 0,
		id : 'otherTabPanel',
		minTabWidth : 300,
		resizeTabs : false,
		boder : false,
		hidden : false,
		items : [ otherTabPanel.T1 ]
	});

	return otherTabPanel.tabpanel;
};

otherTabPanel.addNode = function(nodeName, nodeId) {
	otherTabPanel.cf = new Ext.form.ColorField( {
		fieldLabel : nodeName,
		id : nodeId,
		width : 150,
		showHexValue : false
	});
	otherTabPanel.colorFieldForm.add(otherTabPanel.cf);
};

otherTabPanel.removeNode = function(nodeId) {
	otherTabPanel.colorFieldForm.remove(nodeId);
};

otherTabPanel.removeAllNode = function() {
	otherTabPanel.colorFieldForm.removeAll();
};