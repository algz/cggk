var gongzuojdUpdate = {
	win:null,
	form:null,
	row:null
};

gongzuojdUpdate.initWin = function() {
	gongzuojdUpdate.win = new Ext.Window({
		title:''+getResource('resourceParam478')+'工作进度',
		width:300,
	   	height:230,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:gongzuojdUpdate.submit
		},{
			text:'取消',
			handler:gongzuojdUpdate.closeWin
		}]
	});
	gongzuojdUpdate.win.on('hide',gongzuojdUpdate.closeWin);
}

gongzuojdUpdate.closeWin = function() {
	if(gongzuojdUpdate.win != null) {
		gongzuojdUpdate.win.close();
	}
}

gongzuojdUpdate.submit = function() {
	gongzuoapAjax.jdUpdate(gongzuojdUpdate.form.form);
	gongzuojdUpdate.closeWin();
}

gongzuojdUpdate.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	gongzuojdUpdate.form = {
		xtype:'form',
		region:'center',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:110,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[{
			xtype:'textfield',
			fieldLabel:'工作'+getResource('resourceParam504')+'',
			name:'anpbiaot',
			width:140,
			value:gongzuojdUpdate.row.get('anpbiaot'),
			disabled:true
		}, {
			xtype:'datefield',
			fieldLabel:'工作'+getResource('resourceParam856')+'',
			name:'kaishisj',
			width:140,
			value:gongzuojdUpdate.row.get('shijkssj')
		}, {
			xtype:'datefield',
			fieldLabel:'工作'+getResource('resourceParam992')+'',
			name:'jiesushj',
			width:140,
			value:gongzuojdUpdate.row.get('shijjssj')
		}, {
			xtype:'textfield',
			fieldLabel:''+getResource('resourceParam997')+'',
			name:'wanchjdu',
			width:140,
			value:gongzuojdUpdate.row.get('wanchjdu')
		}, {
			xtype:'combo',
			fieldLabel:""+getResource('resourceParam1335')+"",
			name:"chulizht",					
			anchor:"90%",
			store:new Ext.data.SimpleStore({
				fields: ['chulizht', 'name'],
				data:[
					['0',''+getResource('resourceParam1337')+''],
					['1',''+getResource('resourceParam1338')+''],
					['2',''+getResource('resourceParam1339')+'']
				]	
			}),
			mode:'local',
			triggerAction:'all',
			displayField:'name',
			hiddenName:'chulizht',
			valueField:'chulizht',
			selectOnFocus:true,
			forceSelection:true,
			editable:false,
			emptyText:'Select ...',
			allowBlank:false,
			width:140,
			value:gongzuojdUpdate.row.get('chulizht')
		}, {
			xtype:'textfield',
			hidden:true,
			name:'cyurybId',
			value:gongzuojdUpdate.row.get('cyurybId'),
			labelSeparator:''
		}]
			
	}
	
}

gongzuojdUpdate.init = function(row) {
	gongzuojdUpdate.row = row;
	gongzuojdUpdate.initWin();
	gongzuojdUpdate.initForm();
	gongzuojdUpdate.form = gongzuojdUpdate.win.add(gongzuojdUpdate.form);
	gongzuojdUpdate.win.show();
}
