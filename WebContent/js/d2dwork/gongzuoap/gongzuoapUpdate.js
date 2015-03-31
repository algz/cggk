var gongzuoapUpdate = {
	win:null,
	form:null,
	tabPanel:null,
	row:null
};

gongzuoapUpdate.initWin = function() {
	
	gongzuoapUpdate.win = new Ext.Window({
		title:''+getResource('resourceParam478')+'工作安排',
		width:580,
	   	height:440,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam968')+'',
			handler:gongzuoapUpdate.submit
		},{
			text:''+getResource('resourceParam505')+'',
			handler:gongzuoapUpdate.submit
		},{
			text:'取消',
			handler:gongzuoapUpdate.closeWin
		}]
	});
	gongzuoapUpdate.win.on('hide',gongzuoapUpdate.closeWin);
}

gongzuoapUpdate.closeWin = function() {
	if(gongzuoapUpdate.win != null) {
		gongzuoapUpdate.win.close();
		gongzuoapUpdate.win.destroy();
	}
}

gongzuoapUpdate.submit = function() {
	if(!gongzuoapUpdate.form.form.isValid()) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam478')+'工作安排',
           msg:'请'+getResource('resourceParam494')+'完整的工作安排'+getResource('resourceParam508')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		gongzuoapAjax.apUpdate(gongzuoapUpdate.form.form);
		gongzuoapUpdate.closeWin();
	}	
}

gongzuoapUpdate.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	var zhubanry = userSelectUI.getCombo(''+getResource('resourceParam1327')+'','zhubanry', 0, null, 0);
	zhubanry.value = gongzuoapUpdate.row.get('zhubanry');
	var xiebanry = userSelectUI.getCombo(''+getResource('resourceParam1328')+'','xiebanry', 0, null, 0)
	xiebanry.value = gongzuoapUpdate.row.get('xiebanry');
	gongzuoapUpdate.form = {
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
					value:gongzuoapUpdate.row.get('anpbiaot'),
					allowBlank:false,
					anchor:'90%'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:zhubanry
			}, {
				columnWidth:.5,
				layout:"form",
				items:xiebanry
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'datefield',
					fieldLabel:''+getResource('resourceParam1329')+'',
					name:'tixingrq',
					value:gongzuoapUpdate.row.get('tixingrq'),
					anchor:'90%'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'datefield',
					fieldLabel:''+getResource('resourceParam1325')+'',
					name:'kaishisj',
					value:gongzuoapUpdate.row.get('kaishisj'),
					allowBlank:false,
					anchor:'90%'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'datefield',
					fieldLabel:''+getResource('resourceParam1326')+'',
					name:'jiesushj',
					value:gongzuoapUpdate.row.get('jiesushj'),
					allowBlank:false,
					anchor:'90%'
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'checkbox',
					fieldLabel:''+getResource('resourceParam970')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					style:'margin:15px 0px 0px 10px',
					name:'fankuikj',
					checked:gongzuoapUpdate.row.get('fankuikj') == ''+getResource('resourceParam1330')+'' ? true : false,
					value:gongzuoapUpdate.row.get('fankuikj')
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'checkbox',
					fieldLabel:'评价'+getResource('resourceParam508')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'对非创建'+getResource('resourceParam1330')+'',
					style:'margin:15px 0px 0px 10px',
					name:'pinjiakj',
					checked:gongzuoapUpdate.row.get('pinjiakj') == ''+getResource('resourceParam1330')+'' ? true : false,
					value:gongzuoapUpdate.row.get('pinjiakj')
				}]
			}, {
				xtype:'textfield',
				labelSeparator:'',
				hidden:true,
				name:'gzuoapId',
				value:gongzuoapUpdate.row.get('gzuoapId')
			}]
		}]
	}
}

gongzuoapUpdate.initTabpanel = function() {
	gongzuoapUpdate.tabPanel = new Ext.TabPanel({
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
					name:'anpnrong',
					value:gongzuoapUpdate.row.get('anpnrong')
				}]
			}]
		}, {
			id:'xiebreny',
			title:''+getResource('resourceParam1113')+'',
			layout:'fit',
			autoScroll:true,
			items:renyuanMain.init(1, gongzuoapUpdate.row.get('gzuoapId'), 0)
		}]
	});
}

gongzuoapUpdate.init = function(row) {
	gongzuoapUpdate.row = row;
	gongzuoapUpdate.initWin();
	gongzuoapUpdate.initTabpanel();
	gongzuoapUpdate.initForm();
	gongzuoapUpdate.form = gongzuoapUpdate.win.add(gongzuoapUpdate.form);
	gongzuoapUpdate.tabPanel = gongzuoapUpdate.win.add(gongzuoapUpdate.tabPanel);
	gongzuoapUpdate.win.show();
}
