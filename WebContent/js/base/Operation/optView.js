var optView={
	optWin:null,
	optForm:null
};

optView.initWindow = function(title) {
	optView.optWin = new Ext.Window({
		title:title,
		width:350,
	   	height:260,
		modal:true,
		resizable:false,
		plain:false,
		layout:'fit'
	});	
	optView.optWin.on('hide',optView.closeWin);
};

optView.closeWin = function(){ 
	if(optView.optWin != null) {
		optView.optWin.close();
		optView.optWin.destroy();
	}
};

optView.initForm = function(row) {
	Ext.form.Field.prototype.msgTarget='side';
	optView.optForm = {
		xtype:'form',
		labelAlign: "left",
		labelSeparator: ':',
		buttonAlign:'right',
		labelWidth:70,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:optView.closeWin
		}],
		
		items:[{
			xtype:'textfield',
			minLength:3,
			maxLength:50,
			name:'id',
			fieldLabel:"业务"+getResource('resourceParam461')+"",
			anchor:"90%",
			value:row.get('id'),
			disabled:true
		},{
			xtype:'textfield',
			id:'name',
			minLength:3,
			maxLength:50,
			fieldLabel:"业务"+getResource('resourceParam480')+"",
			name:"name",
			anchor:"90%",
			value:row.get('name'),
			disabled:true
		}, {
			xtype:'combo',
			fieldLabel:"子"+getResource('resourceParam559')+"",
			name:"subSysId",					
			anchor:"90%",
			store:new Ext.data.SimpleStore({
				fields:['subSysId','name'],
				data:[
					['1','子'+getResource('resourceParam559')+'1'],
					['2','子'+getResource('resourceParam559')+'2'],
					['3','子'+getResource('resourceParam559')+'3'],
					['4','子'+getResource('resourceParam559')+'4']
				]
			}),
			mode:'local',
			triggerAction:'all',
			valueField:'subSysId',
			displayField:'name',
			hiddenName:'subSysId',
			selectOnFocus:true,
			emptyText:'Select ...',
			anchor:"90%",
			value:[row.get('subSysId')],
			disabled:true
		}, {
			xtype:'textarea',
			id:'descr',
			minLength:6,
			maxLength:160,
			fieldLabel:"业务"+getResource('resourceParam648')+"",
			name:"descr",
			anchor:"90%",
			value:row.get('descr'),
			disabled:true
		}]
	}
	
	return optView.optForm
};

optView.init = function(title, row) {
	if(row == null) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam662')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		optView.initWindow(title);
		optView.optWin.add(optView.initForm(row));
		optView.optWin.show();
	}			
};
