var gongzuoapAdd = {
	win:null,
	form:null,
	tabPanel:null
};

gongzuoapAdd.initWin = function() {
	gongzuoapAdd.win = new Ext.Window({
		title:''+getResource('resourceParam647')+'工作安排',
		width:580,
	   	height:440,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam968')+'',
			handler:gongzuoapAdd.submit
		},{
			text:''+getResource('resourceParam505')+'',
			handler:gongzuoapAdd.submit
		},{
			text:'取消',
			handler:gongzuoapAdd.closeWin
		}]
	});
	gongzuoapAdd.win.on('hide',gongzuoapAdd.closeWin);
}

gongzuoapAdd.closeWin = function() {
	if(gongzuoapAdd.win != null) {
		gongzuoapAdd.win.close();
		gongzuoapAdd.win.destroy();
	}
}

gongzuoapAdd.submit = function() {
	if(!gongzuoapAdd.form.form.isValid()) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam647')+'工作安排',
           msg:'请'+getResource('resourceParam494')+'完整的工作安排'+getResource('resourceParam508')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		gongzuoapAjax.save(gongzuoapAdd.form.form, renyuanUI.ds);
		gongzuoapAdd.closeWin();
	}
	
}

gongzuoapAdd.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	
	gongzuoapAdd.form = {
		height:140,
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
					fieldLabel:'工作'+getResource('resourceParam504')+'',
					name:'anpbiaot',
					allowBlank:false,
					anchor:"90%"
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:userSelectUI.getCombo(''+getResource('resourceParam1327')+'','zhubanry', 0, null, 0)
			}, {
				columnWidth:.5,
				layout:"form",
				items:userSelectUI.getCombo(''+getResource('resourceParam1328')+'','xiebanry', 1, null, 0)
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'datefield',
					fieldLabel:''+getResource('resourceParam1329')+'',
					name:'tixingrq',
					anchor:"90%"
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'datefield',
					fieldLabel:''+getResource('resourceParam1325')+'',
					name:'kaishisj',
					allowBlank:false,
					anchor:"90%"
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'datefield',
					fieldLabel:''+getResource('resourceParam1326')+'',
					name:'jiesushj',
					allowBlank:false,
					anchor:"90%"
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'checkbox',
					fieldLabel:''+getResource('resourceParam970')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					style:'margin:15px 0px 0px 10px',
					name:'fankuikj'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'checkbox',
					fieldLabel:'评价'+getResource('resourceParam508')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					style:'margin:15px 0px 0px 10px',
					name:'pinjiakj'
				}]
			}]
		}]
	}
	
}

gongzuoapAdd.initTabpanel = function() {
	gongzuoapAdd.tabPanel = new Ext.TabPanel({
		region:'center',
		autoScroll:true,
		activeTab:0,
    	deferredRender:false,
    	autoTabs:true,
		items:[{
			id:'anpnrong',
			title:'工作内容',
			layout:'border',
			items:[{
				xtype:'panel',
				region:'center',
				layout:'fit',
				items:[{
					xtype:'htmleditor',
					name:'anpnrong'
				}]
			}]
		}, {
			id:'xiebreny',
			title:''+getResource('resourceParam1113')+'',
			layout:'fit',
			autoScroll:true,
			items:renyuanMain.init(0, null, 0)
		}]
	});
}


gongzuoapAdd.init = function() {
	gongzuoapAdd.initWin();
	gongzuoapAdd.initTabpanel();
	gongzuoapAdd.initForm();
	gongzuoapAdd.form = gongzuoapAdd.win.add(gongzuoapAdd.form);
	gongzuoapAdd.tabPanel = gongzuoapAdd.win.add(gongzuoapAdd.tabPanel);
	gongzuoapAdd.win.show();
}
