var huiyijiyView = {win:null,form:null,tabPanel:null};

huiyijiyView.initWin = function() {
	huiyijiyView.win = new Ext.Window({
		title:''+getResource('resourceParam576')+''+getResource('resourceParam736')+'纪要',
		width:580,
	   	height:440,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam506')+'',
			handler:huiyijiyView.closeWin
		}]
	});
	huiyijiyView.win.on('hide',huiyijiyView.closeWin);
}

huiyijiyView.closeWin = function() {
	if(huiyijiyView.win != null) {
		huiyijiyView.win.close();
		huiyijiyView.win.destroy();
	}
}


huiyijiyView.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	huiyijiyView.form = {
		height:150,
		xtype:'form',
		region:'north',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:90,
		frame:true,	
		labelAlign:"right",
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[{
			layout:'column',
			items:[{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1352')+'',
					name:'huiyzhut',
					value : myGrid.row.get('huiyzhut'),
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam458')+'',
					value : myGrid.row.get('hyguanjz'),
					name:'hyguanjz',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1269')+'',
					value : myGrid.row.get('kaisriqi'),
					name:'kaisriqi',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1270')+'',
					value : myGrid.row.get('jiesriqi'),
					name:'jiesriqi',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'主持人',
					value : myGrid.row.get('zhuchren'),
					name:'zhuchren',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1359')+'',
					value : myGrid.row.get('canjreny'),
					name:'canjreny',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			}, {
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1360')+'ID',
					value : myGrid.row.get('tianzhId'),
					name:'tianzhId',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			},{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam1354')+'',
					value : myGrid.row.get('tianzhrq'),
					name:'tianzhrq',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			},{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam976')+'',
					value : myGrid.row.get('fujiangs'),
					name:'fujiangs',
					cls:'readonly',
					readOnly:true,
					anchor:'90%',
					width:140
				}]
			}]
		}]
	}
}

huiyijiyView.initTabpanel = function() {
	huiyijiyView.tabPanel = new Ext.TabPanel({
		region:'center',
		autoScroll:true,
		activeTab:0,
    	deferredRender:false,
    	autoTabs:true,
		items:[{
			id:'hyneirng',
			title:'纪要内容',
			layout:'border',
			items:[{
				xtype:'panel',
				region:'center',
				layout:'fit',
				items:[{
					xtype:'htmleditor',
					value : myGrid.row.get('hyneirng'),
					name:'hyneirng'
				}]
			}]
		}]
	});
}


huiyijiyView.init = function() {
	if (myGrid.row == null){
		Ext.MessageBox.show({
			title:''+getResource('resourceParam744')+'',
			msg:''+getResource('resourceParam1358')+'',
			buttons:Ext.MessageBox.OK
		});
	}else{
	huiyijiyView.initWin();
	huiyijiyView.initTabpanel();
	huiyijiyView.initForm();
	huiyijiyView.form = huiyijiyView.win.add(huiyijiyView.form);
	huiyijiyView.tabPanel = huiyijiyView.win.add(huiyijiyView.tabPanel);
	huiyijiyView.win.show();
	}
}
