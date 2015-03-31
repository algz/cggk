/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var registrationAction = {
	flag : true
};
registrationAction.seach = function(gridName){
	registrationQuery.getSearchForm(gridName).show();
}
registrationAction.showLineCard = function(){
	var records = Ext.getCmp('registrationGridPanelId').getSelectionModel().getSelections();
	lineCard.getForm(records[0]).show();
}
registrationAction.updateRegistration= function(){
	var records = Ext.getCmp('registrationGridPanelId').getSelectionModel().getSelections(); 
	var checkStatus = records[0].get("checkStatus");
//	if(checkStatus == 0){
//		registrationAction.flag = false;
//	}
	var records = Ext.getCmp('registrationGridPanelId').getSelectionModel().getSelections(); 
//	if(records[0].get("contractId")=="" && records[0].get("contractName")==""){
//		createRegistrationForm.getForm(records[0],records[0].get("checkStatus"),records[0].get("itemId"),records[0].get("itemCode"),records[0].get("itemName")).show()
//	}else{  
		registrationAction.getRegistrationWindow(records[0],records[0].get("checkStatus"),records[0].get("materialType")).show();
//	}
}
registrationAction.getMaterialInfo = function(itemCode){
	Ext.Ajax.request( {
		url : '../JSON/registrationRemote.getMaterialInfo?d=' + new Date(),
		method : 'POST',
		params : {  
				  itemCode:itemCode
		},
		success : function(response,options) { 
			var obj = Ext.util.JSON.decode(response.responseText); 
			if(obj.data.itemCode!="")
			{
				Ext.getCmp("registrationForm").getForm().findField('itemName').setRawValue(obj.data.itemName);
				Ext.getCmp("registrationForm").getForm().findField('itemId').setRawValue(obj.data.itemId);
			}
			else
			{
				Ext.getCmp("registrationForm").getForm().findField('itemName').setRawValue('');
				Ext.getCmp("registrationForm").getForm().findField('itemId').setRawValue('');
				Ext.getCmp("registrationForm").getForm().findField('itemCode').setRawValue('');
				Ext.Msg.alert('提示',"没有该编码的物资");
			}
		},
		failure : function() {
			Ext.Msg.alert('提示',"服务器正忙");
		}
	});
}

/**
 * 到货验收--入厂登记--登记窗口
 * @param {} rd
 * @param {} checkStatus
 * @param {} materialType 无效
 * @return {}
 */
registrationAction.getRegistrationWindow = function(rd, checkStatus, materialType) {
	
	var window=Ext.getCmp('registrationFormAddWind');
	if(window==null){
	window= new Ext.Window({
				id : "registrationFormAddWind",
				width : 500,
				layout : 'fit',
				autoScroll : true,
				title : '入厂登记',
				modal : true,
				items : registrationFormView.getTab(rd, checkStatus, 1),//materialType
				border : true,
				buttons : [{
							text : ' 确定 ',
							id : 'submit',
							hidden : checkStatus!="0"&&checkStatus!='-10'&&checkStatus!=null?true:false,//registrationAction.flag,
							handler : function() {
								var inform=Ext.getCmp('registrationForm');
								if (inform.form.isValid()) {
									inform.form.doAction('submit', {
												waitMsg : '正在保存数据，请稍候...',
												waitTitle : '提示',
												url : '../JSON/registrationRemote.saveRegistration?d=' + new Date(),
												method : 'post',
												success : function(form, action) {// 在这处理逻辑。
													inform.getForm().reset();
													Ext.Msg.alert('提示', "保存成功");
													var grid = Ext.getCmp('registrationGridPanelId');
													grid.store.baseParams = {
														start : 0,
														limit : 20
													};
													grid.store.load();
													Ext.getCmp("registrationFormAddWind").close();
												},
												failure : function(form, action) {
													Ext.Msg.alert('提示', action.result.msg);// 保存失败
												}
											});
								}

							}
						}, {
							text : '关闭',
							handler : function() {
								window.close();
							}
						}]
			});
	}
//		if(checkStatus!="0" && checkStatus!=null){ 
//		Ext.getCmp("submit").disable();
//	}
	return window;
}
registrationAction.getSearchForm = function(name,inputMaterialType,contractId){
	//name =  MaterialGridPanelId
	//createRegistrationForm.js
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var materialItemName = Ext.getCmp("materialItemName").getValue();
			var materialitemcode = Ext.getCmp("materialitemcode").getValue();
			var materialStandard = Ext.getCmp("materialStandard").getValue();
			var demension = Ext.getCmp("demension").getValue();
			var technicCondition = Ext.getCmp("technicCondition").getValue();
			var　materialcatalogName =  Ext.getCmp("materialcatalogName_childid").getValue();
			var　parentidName = Ext.getCmp("materialcatalogName_parentid").getValue();
			var desingnation=Ext.getCmp('desingnation').getValue();
		 	Ext.getCmp(name).store.baseParams={start:0,limit:20,materialItemName:materialItemName,
		 	                                   materialitemcode:materialitemcode,
		 	                                   materialStandard:materialStandard,
		 	                                   demension:demension,
		 	                                   desingnation:desingnation,
		 	                                   technicCondition:technicCondition,
		 	                                  // materialType : inputMaterialType, //新增的条件,后续会用到
		 	                                   materialcatalogName : materialcatalogName,
		 	                                   parentidName:parentidName,
		 	                                   contractId:contractId //合同ID
		 	                                   };
			Ext.getCmp(name).store.load(); 
			materialItemForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			materialItemForm.getForm().reset();
			window.close();
		}
	} ];;
	
	
	
	
	var item = [
	{
		layout : 'column',
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
				columnWidth : .49,
				width : 700,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '物资编号',
					xtype : 'textfield',
					id : 'materialitemcode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '物资名称',
					xtype : 'textfield',
					id : 'materialItemName',
					anchor : '90%'
				} ]
		}]
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '物资规格',
				xtype : 'textfield',
				id : 'materialStandard',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {fieldLabel : '单位',
				xtype : 'textfield',
				id : 'demension',
				anchor : '90%'}
		 ]
	}]
	
	},{
		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '牌号',
					xtype : 'textfield',
					id : 'desingnation',
					anchor : '90%'
				}]
		},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [{
					fieldLabel : '技术条件',
					xtype : 'textfield',
					id : 'technicCondition',
					anchor : '90%'
				} ]
		}]
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
//		hidden:true,
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [new Ext.form.ComboBox({
										fieldLabel : '物资大类',
										id : 'materialcatalogName_parentid',
										anchor : '90%',
										// name : 'identity',
										// //与hiddenname最好不要重名,不然form.findField('identity')找不到数据.
										// 远程comboBox提交时,需指定hiddenName参数,否则传输的值不是value,而是text.
										hiddenName : 'identity',// form提交时的参数名称,并id!=hiddenName
										allowBlank : false, // 是否允许为空
										mode : "remote", // 数据模式为远程模式,也可不设置,即默认值也为remote
										triggerAction : 'all', // 显示所有下列数.必须指定为'all'
										typeAhead: true,
										emptyText : '请选择...', // 没有默认值时,显示的字符串
										store : new Ext.data.JsonStore({ // 填充的数据
											url : "../JSON/materialCatalogRemote.getMaterialCatalogComboBox?parentid=0",
											fields : new Ext.data.Record.create(['catalogid', 'catalogname',"catalogcode"]), // 也可直接为["text","value"]
											root : "materialcatalog"
										}),
										valueField : 'catalogid', // 传送的值
										displayField : 'catalogname', // UI列表显示的文本,
										    listeners:{
         'select' : function(combo, record, index) {
												var child = Ext.getCmp('materialcatalogName_childid');
												var store = child.getStore();
												child.clearValue();
												store.load({
															params : {
																parentid : record.get('catalogid')
															}
														});
											}
    }
									})]
						}, {
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [new Ext.form.ComboBox({
										fieldLabel : '物资小类',
										id : 'materialcatalogName_childid',
										anchor : '90%',
										// name : 'identity',
										// //与hiddenname最好不要重名,不然form.findField('identity')找不到数据.
										// 远程comboBox提交时,需指定hiddenName参数,否则传输的值不是value,而是text.
										//hiddenName : 'identity',// form提交时的参数名称,并id!=hiddenName
										allowBlank : false, // 是否允许为空
										mode : "local", // 数据模式为远程模式,也可不设置,即默认值也为remote
										triggerAction : 'all', // 显示所有下列数.必须指定为'all'
										typeAhead: true,
										emptyText : '请选择...', // 没有默认值时,显示的字符串
										store : new Ext.data.JsonStore({ // 填充的数据
											url : "../JSON/materialCatalogRemote.getMaterialCatalogComboBox?",
											fields : new Ext.data.Record.create(['catalogid', 'catalogname',"catalogcode"]), // 也可直接为["text","value"]
											root : "materialcatalog"
										}),
										valueField : 'catalogid', // 传送的值
										displayField : 'catalogname' // UI列表显示的文本
									})]
						}]
	
	}
	];

	
	//表单
	var materialItemForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "materialItemwind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : materialItemForm,
		border : true,
		closeAction : 'close'
	});
	return window;



}

registrationAction.del = function(){
	var grid = Ext.getCmp('registrationGridPanelId');
	var id = "";
	var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
	if(rows.length == 0){
	 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
		return;
	}
	
	for(var i = 0;i < rows.length;i++){   
		id = id + rows[i].get('registrationId') + ",";
		var checkStatus = rows[i].get('checkStatus');
		if(checkStatus != '0' ){
			Ext.MessageBox.alert('提示', "只能删除状态为<font color = 'red'>已登记</font>的记录!"); 
			return;
		}
	}
	Ext.Msg.confirm("提示","是否确定删除?",function(btn){
		if(btn == 'yes'){
//			var vo = Seam.Remoting.createType("vo");remote.fun(vo,function(result){})
			var remote = Seam.Component.getInstance("registrationRemote");
			
			remote.delRegistration(id,function(result){
				Ext.Msg.alert('提示', '数据保存成功！');  
					var grid = Ext.getCmp('registrationGridPanelId'); 
					grid.store.reload();
			})
		}
		
	});
}