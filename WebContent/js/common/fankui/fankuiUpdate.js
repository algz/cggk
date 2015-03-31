var fankuiUpdate = {
	win:null,
	form:null,
	tabpanel:null,
	row:null
}

fankuiUpdate.initWin = function() {
	fankuiUpdate.win = new Ext.Window({
		title:''+getResource('resourceParam973')+'',
		width:550,
	   	height:300,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam968')+'',
			handler:fankuiUpdate.submit
		},{
			text:''+getResource('resourceParam484')+'',
			handler:function() {
				fankuiUpdate.submit(); 
			}
		},{
			text:'取消',
			handler:fankuiUpdate.closeWin
		}]
	});
	fankuiUpdate.win.on('hide',fankuiUpdate.closeWin);
}
	
fankuiUpdate.closeWin = function() {
	if(fankuiUpdate.win != null) {
		fankuiUpdate.win.close();
	}
}

fankuiUpdate.submit = function() {
	if(!fankuiUpdate.form.form.isValid()) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam973')+'',
           msg:''+getResource('resourceParam966')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		fankuiAjax.update(fankuiUpdate.form.form);
		fankuiUpdate.win.close();
	}	
}

fankuiUpdate.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	fankuiUpdate.form = {
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
			value:fankuiUpdate.row.get('fankuibt'),
			anchor:'70%'
		}]
	}
}

fankuiUpdate.initTabpanel = function() {
	fankuiUpdate.tabpanel =  {
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
					name:'baogaonr',
					value:fankuiUpdate.row.get('fankuinr')
				}, {
					xtype:'textfield',
					labelSeparator:'',
					hidden:true,
					name:'fankuiId',
					value:fankuiUpdate.row.get('fankuiId')
				}]
			}]
		}]
	}
}

fankuiUpdate.init = function(row) {
	fankuiUpdate.row = row;
	fankuiUpdate.initWin();
	fankuiUpdate.initForm();
	fankuiUpdate.initTabpanel();
	fankuiUpdate.form = fankuiUpdate.win.add(fankuiUpdate.form);
	fankuiUpdate.tabpanel = fankuiUpdate.win.add(fankuiUpdate.tabpanel);
	fankuiUpdate.win.show();
}
