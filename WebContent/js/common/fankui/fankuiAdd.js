var fankuiAdd = {
	win:null,
	form:null,
	tabpanel:null
}

fankuiAdd.initWin = function() {
	fankuiAdd.win = new Ext.Window({
		title:''+getResource('resourceParam967')+'',
		width:550,
	   	height:300,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam968')+'',
			handler:fankuiAdd.submit
		},{
			text:''+getResource('resourceParam484')+'',
			handler:function() {
				fankuiAdd.submit();
			}	
		},{
			text:'取消',
			handler:fankuiAdd.closeWin
		}]
	});
	fankuiAdd.win.on('hide',fankuiAdd.closeWin);
}
	
fankuiAdd.closeWin = function() {
	if(fankuiAdd.win != null) {
		fankuiAdd.win.close();
	}
}

fankuiAdd.submit = function() {
	if(!fankuiAdd.form.form.isValid()) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam967')+'',
           msg:''+getResource('resourceParam966')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		fankuiAjax.sava(fankuiAdd.form.form);
		fankuiAdd.win.close();
	}
	
}

fankuiAdd.initForm = function(glianId, fankuilx) {
	Ext.form.Field.prototype.msgTarget='side';
	fankuiAdd.form = {
		xtype:'form',
		height:45,
		region:'north',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:60,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[{
			xtype:'textfield',
			fieldLabel:''+getResource('resourceParam601')+'',
			name:'fankuibt',
			anchor:'70%'
		}, {
			xtype:'textfield',
			labelSeparator:'',
			hidden:true,
			name:'glianId',
			value:glianId
		}, {
			xtype:'textfield',
			labelSeparator:'',
			hidden:true,
			name:'fankuilx',
			value:fankuilx
		}]
	}
}

fankuiAdd.initTabpanel = function() {
	fankuiAdd.tabpanel =  {
		xtype:'tabpanel',
		region:'center',
		deferredRender:false,
		activeTab:0,
		items:[{
			title:''+getResource('resourceParam595')+'',
			layout:'border',
			items:[{
				xtype:'panel',
				region:'center',
				layout:'fit',
				items:[{
					xtype:'htmleditor',
					id:'fankuinr',
					name:'fankuinr'
				}]
			}]
		}]
	}
}

fankuiAdd.init = function(glianId, fankuilx) {
	fankuiAdd.initWin();
	fankuiAdd.initForm(glianId, fankuilx);
	fankuiAdd.initTabpanel();
	fankuiAdd.form = fankuiAdd.win.add(fankuiAdd.form);
	fankuiAdd.tabpanel = fankuiAdd.win.add(fankuiAdd.tabpanel);
	fankuiAdd.win.show();
}
