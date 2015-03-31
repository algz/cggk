var pingjiaUpdate = {
	win:null,
	form:null,
	row:null
}

pingjiaUpdate.initWin = function(title, chakanlx, pinjialx) {
	pingjiaUpdate.win = new Ext.Window({
		title:title,
		width:450,
	   	height:280,
		modal:true,
		resizable:false,
		plain:false,
		layout:'border',
		buttons:[{
			text:''+getResource('resourceParam968')+'',
			handler:pingjiaUpdate.submit
		}, {
			text:''+getResource('resourceParam484')+'',
			handler:function(chakanlx, pinjialx) {
				pingjiaUpdate.submit(chakanlx, pinjialx);
			}
		}, {
			text:'取消',
			handler:pingjiaUpdate.closeWin
		}]
	});
	pingjiaUpdate.win.on('hide',pingjiaUpdate.closeWin);
}
	
pingjiaUpdate.closeWin = function() {
	if(pingjiaUpdate.win != null) {
		pingjiaUpdate.win.close();
	}
}

pingjiaUpdate.submit = function() {
	
}

pingjiaUpdate.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	
	var radio1 = new Ext.form.Radio({
		id:'shuzhi',
		fieldLabel:'非常好(100分)',
		style:'margin:5px 0px 0;',
		labelStyle:'margin:0px 0px 0px 40px;'
	});
	
	var radio2 = new Ext.form.Radio({
		id:'shuzhi',
		fieldLabel:'很好(80分)',
		style:'margin:5px 0px 0;',
		labelStyle:'margin:0px 0px 0px 40px;'
	});
	
	var radio3 = new Ext.form.Radio({
		id:'shuzhi',
		fieldLabel:'一般(60分)',
		style:'margin:5px 0px 0;',
		labelStyle:'margin:0px 0px 0px 40px;'
	});
	
	var radio4 = new Ext.form.Radio({
		id:'shuzhi',
		fieldLabel:'差(40分)',
		style:'margin:5px 0px 0;',
		labelStyle:'margin:0px 0px 0px 40px;'
	});
	
	var text = new Ext.form.TextField({
		id:'shuzhipj',
		fieldLabel:'数'+getResource('resourceParam511')+'评价(分)',
		name:'shuzhipj',
		width:60,
		value:pingjiaUpdate.row.get('shuzhipj')
	});
	
	radio1.on('focus', function() {
		text.setValue('100');
	})
	radio2.on('focus', function() {
		text.setValue('80');
	})
	radio3.on('focus', function() {
		text.setValue('60');
	})
	radio4.on('focus', function() {
		text.setValue('40');
	})
	
	
	pingjiaUpdate.form = {
		region:'center',
		xtype:'form',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:100,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[text, { 
			layout:'column',
			items:[{
				columnWidth:.5,
				items:[{
					layout:'form',
					items:radio1
				}]
			}, {
				columnWidth:.5,
				items:[{
					layout:'form',
					items:radio2
				}]
			}, {
				columnWidth:.5,
				items:[{
					layout:'form',
					items:radio3
				}]
			}, {
				columnWidth:.5,
				items:[{
					layout:'form',
					items:radio4
				}]
			}]
		}, {
			xtype:'textarea',
			fieldLabel:'文字评价',
			name:'wenzipj',
			style:'margin:30px 0px 0px -20px;',
			labelStyle:'margin:30px 0px 0px 0px;',
			anchor:'90%',
			value:pingjiaUpdate.row.get('wenzipj')
		}]
	}
}

pingjiaUpdate.init = function(title, row, chakanlx, pinjialx) {
	pingjiaUpdate.row = row
	pingjiaUpdate.initWin(title, chakanlx, pinjialx);
	pingjiaUpdate.initForm();
	pingjiaUpdate.win.add(pingjiaUpdate.form);
	pingjiaUpdate.win.show();
}
