var declarePlanForm = {
};
declarePlanForm.combo = function(){
	
	 
	var combox = new Ext.form.ComboBox({
		id:'propertyTypeId',
		hiddenId : 'propertyType',
		hiddenName:'propertyType',
		fieldLabel : '资产类别',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '2', '非固定资产' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		allowBlank : false,
		anchor : '90%',
		value : '2'
	})
	return combox;
}
declarePlanForm.getForm = function(declareDetailId,rd,departmentId,use,declareplanID,id,type,status) {
	var items = [ {
		xtype : 'hidden',
		name : 'declareplanID'
	}, {
		xtype : "textfield",
		fieldLabel : '申报计划名称',
		lableWidth : 150,
		id : 'declareplanName',
		allowBlank : false,
		maxLength : 50,
		maxLengthText : '不能超过50个字符，请重新输入！',
		anchor : '90%'
	}, {
		xtype : "hidden",
		fieldLabel : '申报计划编号',
		lableWidth : 150,
		id : 'declareplanCode', 
		disabled : true,
		maxLength : 100,
		maxLengthText : '不能超过100个字符，请重新输入！',
		anchor : '90%'
	}, declarePlanForm.combo()];

	var inform = new Ext.FormPanel( {
		id : 'declarePlanForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		autoHeight : true,
		lableWidth : 150,
		padding:8,
		width : 300,
		height : 100,
		frame : false,
		border : false,
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);
		//Ext.getCmp('propertyTypeId').disable();
	}
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			if (inform.form.isValid()) {
//				Ext.getCmp("productcode").enable();
				inform.form.doAction('submit', {
					waitMsg : '正在保存数据，请稍候...',
					waitTitle : '提示',
					url : '../JSON/declarePlan_DeclarePlanRemote.saveDeclarePlan?d=' + new Date(),
					method : 'post',
					params:{
						declareIds:declareDetailId,
						status:status
					},
					success : function(form, action) {
						var result = action.result.info;
						if(result=="name"){
							Ext.Msg.alert('提示', '型号已经存在，请重新输入！'); 
						} 
						else{
							Ext.Msg.alert('提示', '保存数据成功！');
							form.reset();
							window.close(); 
							if(declareplanID!=""){
								Ext.getCmp("declarePlanGrid").store.baseParams = {start :0,limit:20};
								Ext.getCmp("declarePlanGrid").store.load();
							}else{
								Ext.getCmp(id).store.baseParams={start:0,limit:20,departmentId:departmentId,use:use,declareplanID:declareplanID,declareplanType:type};
								Ext.getCmp(id).store.reload();//更新列表
							}
						}
					}
				
				})
			}

		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "declarePlanAddWind",
	    layout : 'fit',
		autoScroll : true,
		title : '申报计划-新增',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		width : 300, 
		closeAction :'close'
	});
	return window;

} 
