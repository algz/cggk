var addOpt={
	optWin:null,
	optForm:null,
	sysMenuData:null
};

addOpt.initWindow = function(title) {
	addOpt.optWin = new Ext.Window({
		title:title,
		width:350,
	   	height:220,
		modal:true,
		resizable:false,
		plain:false,
		layout:'fit'
	});	
	addOpt.optWin.on('hide',addOpt.closeWin);
};

addOpt.closeWin = function(){
	if(addOpt.optWin != null) {
		addOpt.optWin.close();
		addOpt.optWin.destroy();
	}
};

addOpt.submit = function() {
	if(!addOpt.optForm.form.isValid()) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam661')+'',
           msg:''+getResource('resourceParam660')+'',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		var optVO = Seam.Remoting.createType("com.luck.itumserv.base.operation.OperationVO");
		optVO.setSign(false);
		Ext.apply(optVO, addOpt.optForm.form.getValues());
		Seam.Component.getInstance("base_operation_OperationService").addOperation(optVO, function(result){
			if(result == true) {
				Ext.MessageBox.show({
		           title: ''+getResource('resourceParam623')+'',
		           msg: '成功'+getResource('resourceParam647')+'业务'+getResource('resourceParam508')+'!',
		           buttons: Ext.MessageBox.OK,
		           icon: Ext.MessageBox.INFO
		       	});
				myGrid.loadvalue(operation.ds,operation.args,operation.baseargs);
			} else {
				Ext.MessageBox.show({
		           title: ''+getResource('resourceParam594')+'',
		           msg: ''+getResource('resourceParam647')+'业务'+getResource('resourceParam508')+'失败!',
		           buttons: Ext.MessageBox.OK,
		           icon: Ext.MessageBox.ERROR
		       	});
			}
		});
		addOpt.closeWin();
	}	
}

addOpt.initForm = function() {
	Ext.form.Field.prototype.msgTarget='side';
	addOpt.optForm = {
		xtype:'form',
		labelAlign: "left",
		labelSeparator: ':',
		labelWidth:70,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:addOpt.submit
		}, {
			text:'取消',
			handler:addOpt.closeWin
		}],
		
		items:[{
			xtype:'textfield',
			id:'name',
			minLength:6,
			maxLength:50,
			fieldLabel:"业务"+getResource('resourceParam480')+"",
			name:"name",
			anchor:"90%",
			allowBlank:false
		}, {
			xtype:'textarea',
			id:'descr',
			minLength:6,
			maxLength:160,
			fieldLabel:"业务"+getResource('resourceParam648')+"",
			name:"descr",
			anchor:"90%"
		}, {
			xtype:'combo',
			fieldLabel:"子"+getResource('resourceParam559')+"",
			name:"subSysId",					
			anchor:"90%",
			store:new Ext.data.SimpleStore({
				fields:['subSysId','name'],
				data:addOpt.sysMenuData
			}),
			mode:'local',
			triggerAction:'all',
			displayField:'name',
			hiddenName:'subSysId',
			valueField:'subSysId',
			selectOnFocus:true,
			forceSelection:true,
			editable:false,
			emptyText:'Select ...',
			anchor:"90%",
			allowBlank:false
		}]
	}
	
	return addOpt.optForm
};

addOpt.getSysMenu = function() {
	
}

addOpt.init = function(title) {
	addOpt.initWindow(title);
	Seam.Component.getInstance("base_subsystem_SubSystemSerivce").getSystemList(function(result) {
		addOpt.sysMenuData = result;		
		addOpt.optForm = addOpt.optWin.add(addOpt.initForm());
		addOpt.optWin.show(this);
	});
};
