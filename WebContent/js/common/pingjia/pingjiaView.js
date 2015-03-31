var pingjiaView = {
	win:null,
	form:null,
	row:null
}

pingjiaView.initWin = function(title) {
	pingjiaView.win = new Ext.Window({
		title:title,
		width:450,
	   	height:200,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam982')+'',
			handler:pingjiaView.submit
		}, {
			text:''+getResource('resourceParam969')+'',
			handler:pingjiaView.closeWin
		}]
	});
	pingjiaView.win.on('hide',pingjiaView.closeWin);
}
	
pingjiaView.closeWin = function() {
	if(pingjiaView.win != null) {
		pingjiaView.win.close();
	}
}

pingjiaView.submit = function() {
	
}

pingjiaView.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	
	pingjiaView.form = {
		region:'center',
		xtype:'form',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:100,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[{
			xtype:'textfield',
			fieldLabel:'数'+getResource('resourceParam511')+'评价(分)',
			width:60,
			value:pingjiaView.row.get('shuzhipj'),
			readOnly:true,
			cls:'readonly'
		}, {
			xtype:'textarea',
			fieldLabel:'文字评价',
			anchor:'90%',
			value:pingjiaView.row.get('wenzipj'),
			style:'border:0px;background:transparent;',
			readOnly:true,
			anchor:'90%'
		}]
	}
}

pingjiaView.init = function(title, row) {
	pingjiaView.row = row
	pingjiaView.initWin(title);
	pingjiaView.initForm();
	pingjiaView.win.add(pingjiaView.form);
	pingjiaView.win.show();
}
