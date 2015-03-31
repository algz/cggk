var gongzuoapQuery = {
	win:null,
	form:null
}
gongzuoapQuery.initWin = function(chakanlx) {
	if(chakanlx == '0') {
		gongzuoapQuery.win = new Ext.Window({
			title:''+getResource('resourceParam652')+'工作安排',
			width:320,
		   	height:230,
			modal:true,
			resizable:false,
			plain:false,
			layout:'fit'
		});	
	} else {
		gongzuoapQuery.win = new Ext.Window({
			title:''+getResource('resourceParam652')+'工作安排',
			width:320,
		   	height:150,
			modal:true,
			resizable:false,
			plain:false,
			layout:'fit'
		});	
	}
	gongzuoapQuery.win.on('hide',gongzuoapQuery.closeWin);
}

gongzuoapQuery.closeWin = function() {
	if(gongzuoapQuery.win != null) {
		gongzuoapQuery.win.close();
	}
}

gongzuoapQuery.submit = function(chakanlx) {
	var values = gongzuoapQuery.form.form.getValues();
	if(chakanlx == '0') {
		gongzuoapUI.baseargs = {
			anpbiaot:values['anpbiaot'],
			chulizht:values['chulizht'],
			chuanjsj:values['chuanjsj'],
			yonghuId:values['yonghuId'],
			instcode:values['instcode'],
			chakanxj:values['chakanxj']
		}
		myGrid.loadvalue(gongzuoapUI.apds,gongzuoapUI.args,gongzuoapUI.baseargs);
	} else {
		gongzuoapUI.baseargs = {
			anpbiaot:values['anpbiaot'],
			chulizht:values['chulizht']
		}	
		myGrid.loadvalue(gongzuoapUI.jsds,gongzuoapUI.args,gongzuoapUI.baseargs);
	}
	gongzuoapQuery.closeWin();
}

gongzuoapQuery.getItem = function(chakanlx) {
	if(chakanlx == '0') {
		return [{
			fieldLabel:"工作"+getResource('resourceParam504')+"",
			name:'anpbiaot',
			anchor:'90%'
		}, userSelectUI.getCombo(''+getResource('resourceParam1334')+'','yonghuId', -1)
		,  instSelectUI.getCombo(""+getResource('resourceParam1268')+"", "instcode"), {
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
			anchor:"90%"
		}, {
			xtype:'combo',
			fieldLabel:""+getResource('resourceParam1332')+"",
			name:"chakanxj",					
			anchor:"90%",
			store:new Ext.data.SimpleStore({
				fields: ['chakanxj', 'name'],
				data:[
					['0',''+getResource('resourceParam1336')+''],
					['1',''+getResource('resourceParam1333')+'']
				]	
			}),
			mode:'local',
			triggerAction:'all',
			displayField:'name',
			hiddenName:'chakanxj',
			valueField:'chakanxj',
			selectOnFocus:true,
			forceSelection:true,
			editable:false,
			emptyText:''+getResource('resourceParam1331')+'',
			anchor:"90%"
		}]
	} else {
		return [{
			id:'anpbiaot',
			fieldLabel:"工作"+getResource('resourceParam504')+"",
			name:'anpbiaot',
			anchor:'90%'
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
			anchor:"90%",
			allowBlank:false
		}]
	}
}

gongzuoapQuery.initForm = function(chakanlx) {
	gongzuoapQuery.form = {
		xtype:'form',
		labelAlign: "left",
		labelSeparator:':',
		labelWidth:90,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:function() {
				gongzuoapQuery.submit(chakanlx);
			}
		}, {
			text:'取消',
			handler:gongzuoapQuery.closeWin
		}],
		defaultType:'textfield',
		items:gongzuoapQuery.getItem(chakanlx)
	}
	return gongzuoapQuery.form;
}

//chakanlx为0时为安排工作者进行的查询。chakanlx为1时为接受工作者进行的查询
gongzuoapQuery.init = function(chakanlx) {
	gongzuoapQuery.initWin(chakanlx);
	gongzuoapQuery.form = gongzuoapQuery.win.add(gongzuoapQuery.initForm(chakanlx));
	gongzuoapQuery.win.show();
}
