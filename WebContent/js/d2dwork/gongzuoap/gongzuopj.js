var gongzuopj = {
	win:null,
	form:null,
	tabPanel:null,
	row:null
};

gongzuopj.initWin = function() {
	gongzuopj.win = new Ext.Window({
		title:'评价工作',
		width:580,
	   	height:510,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam969')+'',
			handler:gongzuopj.closeWin
		}]
	});
	gongzuopj.win.on('hide',gongzuopj.closeWin);
}

gongzuopj.closeWin = function() {
	if(gongzuopj.win != null) {
		gongzuopj.win.close();
		gongzuopj.win.destroy();
	}
}

gongzuopj.submit = function() {
	alert(''+getResource('resourceParam980')+'');
}

gongzuopj.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	gongzuopj.form = {
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
					value:gongzuopj.row.get('gzuoapId'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1341')+'',
					value:gongzuopj.row.get('yonghuxm'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1268')+'',
					value:gongzuopj.row.get('instname'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'工作'+getResource('resourceParam504')+'',
					value:gongzuopj.row.get('anpbiaot'),
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
					value:gongzuopj.row.get('zhubanry'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1328')+'',
					value:gongzuopj.row.get('xiebanry'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam858')+'',
					value:gongzuopj.row.get('chuanjsj'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1329')+'',
					value:gongzuopj.row.get('tixingrq'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1325')+'',
					value:gongzuopj.row.get('kaishisj'),
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
					value:gongzuopj.row.get('jiesushj'),
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
					value:gongzuopj.row.get('wanchjdu'),
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
					value:gongzuopj.row.get('chulizht'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam970')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					value:gongzuopj.row.get('fankuikj'),
					readOnly:true,
					cls:'readonly'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'评价'+getResource('resourceParam508')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					value:gongzuopj.row.get('pinjiakj'),
					readOnly:true,
					cls:'readonly'
				}]
			}]
		}]
	}
	
}

gongzuopj.initTabpanel = function() {
	gongzuopj.tabPanel = new Ext.TabPanel({
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
				html:gongzuopj.row.get('anpnrong'),
				frame:true,
				bodyStyle:'padding:5px 5px 0;background:transparent'
			}
		}, {
			title:'人员评价',
			layout:'fit',
			autoScroll:true,
			items:pingjiaryMain.init(0, gongzuopj.row.get('gondanId'), 0)
		}, {
			title:''+getResource('resourceParam882')+'评价',
			layout:'fit',
			autoScroll:true,
			items:pingjiajgMain.init(0, gongzuopj.row.get('gondanId'), 0)
		}]
	});
}

gongzuopj.init = function(row) {
	gongzuopj.row = row;
	gongzuopj.initWin();
	gongzuopj.initTabpanel();
	gongzuopj.initForm();
	gongzuopj.form = gongzuopj.win.add(gongzuopj.form);
	gongzuopj.tabPanel = gongzuopj.win.add(gongzuopj.tabPanel);
	gongzuopj.win.show();
}
