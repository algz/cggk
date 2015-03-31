Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var gongzuoapView = {
	win:null,
	form:null,
	tabPanel:null,
	row:null
};

gongzuoapView.initWin = function() {
	gongzuoapView.win = new Ext.Window({
		title:''+getResource('resourceParam576')+'工作安排'+getResource('resourceParam857')+'',
		width:580,
	   	height:480,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam982')+'',
			handler:gongzuoapView.submit
		},{
			text:''+getResource('resourceParam969')+'',
			handler:gongzuoapView.closeWin
		}]
	});
	gongzuoapView.win.on('hide',gongzuoapView.closeWin);
}

gongzuoapView.closeWin = function() {
	if(gongzuoapView.win != null) {
		gongzuoapView.win.close();
		gongzuoapView.win.destroy();
	}
}

gongzuoapView.submit = function() {
	alert(''+getResource('resourceParam980')+'');
}

gongzuoapView.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	gongzuoapView.form = {
		height:220,
		xtype:'form',
		region:'north',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:90,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[{
			layout:'column',
			items:[{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'工作安排ID',
					value:gongzuoapView.row.get('gzuoapId'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1341')+'',
					value:gongzuoapView.row.get('yonghuxm'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1268')+'',
					value:gongzuoapView.row.get('instname'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'工作'+getResource('resourceParam504')+'',
					value:gongzuoapView.row.get('anpbiaot'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1327')+'',
					editable:false,
					value:gongzuoapView.row.get('zhubanry'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1328')+'',
					value:gongzuoapView.row.get('xiebanry'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam858')+'',
					value:gongzuoapView.row.get('chuanjsj'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1329')+'',
					value:gongzuoapView.row.get('tixingrq'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1325')+'',
					value:gongzuoapView.row.get('kaishisj'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1326')+'',
					editable:false,
					value:gongzuoapView.row.get('jiesushj'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam997')+'',
					editable:false,
					value:gongzuoapView.row.get('wanchjdu'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1335')+'',
					editable:false,
					value:gongzuoapView.row.get('chulizht'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam970')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					value:gongzuoapView.row.get('fankuikj'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'评价'+getResource('resourceParam508')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					value:gongzuoapView.row.get('pinjiakj'),
					readOnly:true,
					cls:'readonly'
				}]
			}]
		}]
	}
	
}

gongzuoapView.initTabpanel = function(flag) {
	if(flag == '0') {
		
	}
	gongzuoapView.tabPanel = new Ext.TabPanel({
		region:'center',
		autoScroll:true,
		activeTab:0,
    	deferredRender:false,
    	autoTabs:true,
		items:[{
			id:'anpnrong',
			title:'工作内容',
			layout:'fit',
			items:{
				xtype:'panel',
				frame:true,
				bodyStyle:'padding:5px 5px 0;background:transparent',
				html:gongzuoapView.row.get('anpnrong'),
				autoScroll:true
			}
		}, {
			id:'canyury',
			title:''+getResource('resourceParam1113')+'',
			layout:'fit',
			autoScroll:true,
			items:renyuanMain.init(2, gongzuoapView.row.get('gzuoapId'), 0)
		}]
	});
	if(flag == '1') {
		gongzuoapView.tabPanel.add(new Ext.Panel({
			title:'工作评价',
			layout:'fit',
			items:[{
				xtype:'panel',
				frame:true,	
				bodyStyle:'padding:5px 5px 0;background:transparent',
				html:gongzuoapView.row.get('wenzipj'),
				autoScroll:true
			}]
		}));
	}
}

gongzuoapView.init = function(row, flag) {
	gongzuoapView.row = row;
	gongzuoapView.initWin();
	gongzuoapView.initTabpanel(flag);
	gongzuoapView.initForm();
	gongzuoapView.form = gongzuoapView.win.add(gongzuoapView.form);
	gongzuoapView.tabPanel = gongzuoapView.win.add(gongzuoapView.tabPanel);
	gongzuoapView.win.show();
}
