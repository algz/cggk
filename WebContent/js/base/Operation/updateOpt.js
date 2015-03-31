var updateOpt={
	optWin:null,
	optForm:null,
	sysMenuData:null
};

updateOpt.initWindow = function(title) {
	updateOpt.optWin = new Ext.Window({
		title:title,
		width:350,
	   	height:260,
		modal:true,
		resizable:false,
		plain:false,
		layout:'fit'
	});	
	updateOpt.optWin.on('hide',updateOpt.closeWin);
};

updateOpt.closeWin = function(){ 
	if(updateOpt.optWin != null) {
		updateOpt.optWin.close();
		updateOpt.optWin.destroy();
	}
};

updateOpt.submit = function() {
	if(!updateOpt.optForm.form.isValid()) {
		Ext.MessageBox.alert(''+getResource('resourceParam661')+'',''+getResource('resourceParam676')+'');
	} else {
		var optVO = Seam.Remoting.createType("com.luck.itumserv.base.operation.OperationVO");
		optVO.setSign(false);
		Ext.apply(optVO, updateOpt.optForm.form.getValues());
		Seam.Component.getInstance("base_operation_OperationService").updateOperation(optVO, function(result){
			if(result == true) {
				Ext.MessageBox.show({
		           title: ''+getResource('resourceParam677')+'',
		           msg: ''+getResource('resourceParam478')+'业务'+getResource('resourceParam508')+'成功!',
		           buttons: Ext.MessageBox.OK,
		           icon: Ext.MessageBox.INFO
		       	});
				myGrid.loadvalue(operation.ds,operation.args,operation.baseargs);
			} else {
				Ext.MessageBox.show({
		           title: ''+getResource('resourceParam572')+'',
		           msg:''+getResource('resourceParam478')+'业务'+getResource('resourceParam508')+'失败!',
		           buttons: Ext.MessageBox.OK,
		           icon: Ext.MessageBox.ERROR
		       	});
			}
		});
		updateOpt.closeWin();
	}	
}

updateOpt.initForm = function(row) {
	Ext.form.Field.prototype.msgTarget='side';
	updateOpt.optForm = {
		xtype:'form',
		labelAlign: "left",
		labelSeparator: ':',
		labelWidth:70,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:updateOpt.submit
		}, {
			text:'取消',
			handler:updateOpt.closeWin
		}],
		
		items:[{
			xtype:'textfield',
			minLength:3,
			maxLength:50,
			fieldLabel:"业务"+getResource('resourceParam461')+"",
			anchor:"90%",
			value:row.get('id'),
			disabled:true
		},{
			xtype:'textfield',
			minLength:3,
			maxLength:50,
			fieldLabel:"业务"+getResource('resourceParam480')+"",
			anchor:"90%",
			value:row.get('name'),
			allowBlank:false,
			disabled:true
		}, {
			xtype:'combo',
			fieldLabel:"子"+getResource('resourceParam559')+"",
			name:"subSysId",					
			anchor:"90%",
			store:new Ext.data.SimpleStore({
				fields:['subSysId','name'],
				data:updateOpt.sysMenuData
			}),
			mode:'local',
			triggerAction:'all',
			valueField:'subSysId',
			displayField:'name',
			hiddenName:'subSysId',
			selectOnFocus:true,
			forceSelection:true,
			editable:false,
			emptyText:'Select ...',
			anchor:"90%",
			allowBlank:false,
			value:[row.get('subSysId')]
		}, {
			xtype:'textarea',
			id:'descr',
			minLength:6,
			maxLength:160,
			fieldLabel:"业务"+getResource('resourceParam648')+"",
			name:"descr",
			anchor:"90%",
			value:row.get('descr')
		}, {
			xtype:'textfield',
			name:'id',
			value:row.get('id'),
			labelSeparator:'',
			hidden:true
		}, {
			xtype:'textfield',
			value:row.get('name'),
			name:'name',
			labelSeparator:'',
			hidden:true
		}]
	}
	
	return updateOpt.optForm
};

updateOpt.init = function(title, row) {
	if(row == null) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam662')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		updateOpt.initWindow(title);
		Seam.Component.getInstance("base_subsystem_SubSystemSerivce").getSystemList(function(result) {
			updateOpt.sysMenuData = result;	
			updateOpt.optForm = updateOpt.optWin.add(updateOpt.initForm(row));
			updateOpt.optWin.show(this);
		});
		
	}			
};
