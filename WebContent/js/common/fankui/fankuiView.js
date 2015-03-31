var fankuiView = {
	win:null,
	form:null,
	tabpanel:null,
	row:null
}

fankuiView.initWin = function() {
	fankuiView.win = new Ext.Window({
		title:''+getResource('resourceParam974')+'',
		width:550,
	   	height:340,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam982')+'',
			handler:fankuiView.submit
		},{
			text:'取消',
			handler:fankuiView.closeWin
		}]
	});
	fankuiView.win.on('hide',fankuiView.closeWin);
}
	
fankuiView.closeWin = function() {
	if(fankuiView.win != null) {
		fankuiView.win.close();
	}
}

fankuiView.submit = function() {
	alert(''+getResource('resourceParam980')+'');
}

fankuiView.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	fankuiView.form = {
		xtype:'form',
		height:80,
		region:'north',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:90,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[{
			layout:'column',
			items:[{
				columnWidth:0.5,
				layout:'form',
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam601')+'',
					name:'baogaobt',
					value:fankuiView.row.get('fankuibt'),
					cls:'readonly',
					readOnly:true,
					anchor:'90%'
				}]
			}, {
				columnWidth:0.5,
				layout:'form',
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam977')+'',
					name:'yonghuId',
					value:fankuiView.row.get('yonghuxm'),
					cls:'readonly',
					readOnly:true,
					anchor:'90%'
				}]
			}, {
				columnWidth:0.5,
				layout:'form',
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam981')+'',
					value:fankuiView.row.get('fankuisj'),
					cls:'readonly',
					readOnly:true,
					anchor:'90%'
				}]
			}, {
				columnWidth:0.5,
				layout:'form',
				items:[{
					xtype:'textfield',
					fieldLabel:''+getResource('resourceParam975')+'',
					value:fankuiView.row.get('shifliul'),
					cls:'readonly',
					readOnly:true,
					anchor:"90%"
				}]
			}]
		}]
	}
}

fankuiView.initTabpanel = function() {
	fankuiView.tabpanel =  {
		xtype:'tabpanel',
		region:'center',
		deferredRender:false,
		activeTab:0,
		items:[{
			title:''+getResource('resourceParam595')+'',
			layout:'fit',
			items:[{
				xtype:'panel',
				frame:true,
				bodyStyle:'padding:5px 5px 0;background:transparent',
				html:fankuiView.row.get('fankuinr'),
				autoScroll:true
			}]
		}]
	}
}

//chakanlx为0时为工作安排者查看反馈信息，需要更新反馈状态
//chakanlx为1时为工作安排者查看自己或别人的反馈信息，不需要更新反馈状态
fankuiView.updateState = function(chakanlx) {
	if(chakanlx == '0' && fankuiView.row.get('shifliul') == ''+getResource('resourceParam983')+'') {
		fankuiAjax.updateState(fankuiView.row.get('fankuiId'));
	}
}

fankuiView.init = function(row, chakanlx) {
	fankuiView.row = row
	fankuiView.updateState(chakanlx);
	fankuiView.initWin();
	fankuiView.initForm();
	fankuiView.initTabpanel();
	fankuiView.form = fankuiView.win.add(fankuiView.form);
	fankuiView.tabpanel = fankuiView.win.add(fankuiView.tabpanel);
	fankuiView.win.show();
}
