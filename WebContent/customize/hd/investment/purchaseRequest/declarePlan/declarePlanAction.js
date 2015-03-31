var declarePlanAction={  
}
declarePlanAction.submitDeclarePlan = function(){ 
	var records = Ext.getCmp("declarePlanGrid").getSelectionModel().getSelections();
	if(records == null || records.length==0){
		Ext.Msg.alert('提示','请选择你要送审的申报计划！');
		return ;
	}
	var declareplanType = "";
	var status;
	for(var i=0;i<records.length;i++){
		status = records[i].get('status');
		generator = records[i].get('generator');
		if(declareplanType=="")
			declareplanType = records[i].get('declareplanType');
		else if(declareplanType!=records[i].get('declareplanType')){
			Ext.Msg.alert('提示','只能选择采购类型相同的申报计划！');
			return ;
		}
		if(status != '编制中'&&status != '已退回'){
			Ext.Msg.alert('提示','只能选择待审批状态的申报计划！');
			return ;
		}
		if(generator==1){
			Ext.Msg.alert('提示','只能选择汇总数据的申报计划！');
			return ;
		}
	}
	
	Ext.MessageBox.confirm('申报计划送审', 
			'申报计划送审，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			
			var arr = new Array();
			var id = "";
			for(var i=0;i<records.length;i++){
				arr.push(records[i].get('declareplanID'));
				id+=records[i].get('declareplanID')+",";
			} 
			var flowID = '440753';//应急
			if(declareplanType="计划内")
				flowID = '440750';//计划内
			else if(declareplanType="非应急")
				flowID = '440754';//非应急
			approvePanel.submit(flowID, "申报计划审批", "申报计划审批", id.substring(0,id.length-1), 
					"DeclarePlan", true, approvePanelSuccess, approvePanelFailure); 
		}
	});
}

declarePlanAction.submitDeclarePlan2 = function(){
	var records = Ext.getCmp("declarePlanGrid").getSelectionModel().getSelections();
	if(records == null || records.length==0){
		Ext.Msg.alert('提示','请选择你要送审的申报计划！');
		return ;
	}
	var declareplanType = "";
	var status;
	for(var i=0;i<records.length;i++){
		status = records[i].get('status');
		generator = records[i].get('generator');
		quantity = records[i].get('quantity');
		if(declareplanType=="")
			declareplanType = records[i].get('declareplanType');
		else if(declareplanType!=records[i].get('declareplanType')){
			Ext.Msg.alert('提示','只能选择采购类型相同的申报计划！');
			return ;
		}
		if(status != '编制中'&&status != '已退回'){
			Ext.Msg.alert('提示','只能选择待审批状态的申报计划！');
			return ;
		}
		if(generator!=1){
			Ext.Msg.alert('提示','只能选择新建数据的申报计划！');
			return ;
		}
		if(quantity==0){
			Ext.Msg.alert('提示','只能选择项数大于0的申报计划！');
			return ;
		}
	}
	var arr = new Array();
	var id = "";
	for(var i=0;i<records.length;i++){
		arr.push(records[i].get('declareplanID'));
		id+=records[i].get('declareplanID')+",";
	} 
	
	callSeam("declarePlan_DeclarePlanRemote", "submitDeclarePlan", [ arr ],
			function(r){
				if (r) {
					var result = Ext.util.JSON.decode(r);
					if(result.success == false){
						Ext.Msg.alert('提示', '操作失败！');
					} else {
						var grid = Ext.getCmp('declarePlanGrid');				
						grid.store.reload(); 
						Ext.Msg.alert('提示', '操作成功！');
					}		
				} else {
					Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
				}
	});
};

function approvePanelSuccess(){
	var remote = Seam.Component.getInstance("declarePlan_DeclarePlanRemote");
	var rows = Ext.getCmp("declarePlanGrid").getSelectionModel().getSelections();
	var arr = new Array();
	for(var i=0;i<rows.length;i++){
		arr.push(rows[i].get('declareplanID'));
	}
	remote.updateProperties(arr, function(result){
		for(i=0;i<rows.length;i++){
			rows[i].set('status','已送审');
		} 
	});
}

function approvePanelFailure(){
	Ext.Msg.alert('提示', '没有送审权限！');
}
declarePlanAction.addWin = function(){
	var window = new Ext.Window( {
		id : "declare_win",
		title : "新建申报计划",
		width : 300,
		height : 200,
		autoScroll : true, 
		modal : true,
		autoDestory : true,
		layout : 'fit',
		items : [{
			id : 'declarePlanForm',
			xtype : 'form',
			defaultType: 'textfield',
			bodyStyle:'padding:5px 5px 0',
			items : [{
				fieldLabel : '申报计划名称',
				id : 'declareplanName',
				allowBlank : false,
				blankText : '不能为空!'
			},{
				id :'declareplanType',
				xtype : 'combo',
				fieldLabel : '采购类型',
				triggerAction : 'all',
				emptyText : '请选择',
				editable : false,
				width : 125,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					id : 0,
					fields : ['value','text'],
					data : [['1','计划内'], ['2', '应急'],['3', '非应急']]
				}),
				valueField : 'value',
				displayField : 'text',
				allowBlank : false,
				blankText : '不能为空!'
			},{
				id :'propertyType',
				xtype : 'combo',
				fieldLabel : '资产类别',
				triggerAction : 'all',
				emptyText : '请选择',
				editable : false,
				width : 125,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					id : 1,
					fields : ['value','text'],
					data : [['2','非固定资产']]
				}),
				valueField : 'value',
				displayField : 'text',
				allowBlank : false,
				blankText : '不能为空!',
				value:2
			}]
		}], 
		buttons : [{
			text : '保存',
			handler : function(){
				var form = Ext.getCmp('declarePlanForm');
				if (!form.getForm().isValid()) {
					return false;
				}else{
					//保存新添加的申报计划
					var data = form.getForm().getValues();
					Ext.Ajax.request({
						url : '../JSON/declarePlan_DeclarePlanRemote.createDeclarePlan?d=' + new Date(),
						method : 'post',
						waitMsg : '数据加载中，请稍后....',
						params : {
							propertyType : Ext.getCmp('propertyType').getValue(),
							declareplanType : Ext.getCmp('declareplanType').getValue(),
							declareplanName : data.declareplanName
							
						},
						success : function(response, opts){
							var obj = Ext.decode(response.responseText);
							if (obj.success == true) {
								Ext.getCmp('declarePlanGrid').getStore().load();
								window.close();
							} else {

							}
						},failure : function(response, opts) {
							window.close();
						}
					});
				}
			}
		},{
			text : '关闭',
			handler : function(){window.close();}
		}]
	}); 
	window.show();
}

declarePlanAction.showPanel=function(departmentId,use,declareplanID,id,declareplanType,status,generator){ 

	var buttons = [ {
		text : '关闭 ',
		handler : function() {  
			window.close();
			Ext.getCmp('declarePlanGrid').getStore().reload();
		}
	} ]

	var grid = declare_query.gridPanel(departmentId,use,declareplanID,id,declareplanType,status,generator);
	grid.store.baseParams = {start:0,limit:20,departmentId:departmentId,use:use,declareplanID:declareplanID};
	grid.store.load();
 	var bar = grid.getTopToolbar();
	if(use!=""){
		if(privilegeValidate.newDpDisable){
			bar.items.items[4].hide(); 
			bar.items.items[5].hide(); 
		}else{
			bar.items.items[4].show(); 
			bar.items.items[5].show();
		}
	} else if(declareplanID!=""){
			bar.items.items[2].hide(); 
			bar.items.items[3].hide(); 
	}

	var window = new Ext.Window( {
		id : "declare_win",
		title : "查询页面",
		width : 1080,
		height : 400,
		autoScroll : true, 
		modal : true,
		items : grid,
		buttons : buttons,
		autoDestory : true,
		closeAction :'close',
		listeners:{'close':function(){
			Ext.getCmp('declare_useGrid').getStore().load();
		}}
	}); 
	window.setPosition(5,30);
	window.show();
}
declarePlanAction.update= function(){
	var records = Ext.getCmp('declarePlanGrid').getSelectionModel().getSelections(); 
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length>1) {
		Ext.Msg.alert('提示', '只能选择一条记录进行编辑！');
		return;
	} 
	 if(records[0].get("status")!="编制中" && records[0].get("status")!="已退回"){
			 Ext.Msg.alert('提示', '请选择编制中的信息！');
			 return;
	}
	declarePlanForm.getForm(null,records[0],null,null,null,null,null,records[0].get("status")).show();
}
declarePlanAction.callBack=function(arr,id){ 
	callSeam("declarePlan_DeclarePlanRemote", "callBack", [ arr ],
			function(r){
				if (r) {
					var result = Ext.util.JSON.decode(r);
					if(result.success == false){
						Ext.Msg.alert('提示', '操作失败！');
					} else {
						var grid = Ext.getCmp(id);				
						grid.store.load(); 
						Ext.Msg.alert('提示', '操作成功！');
					}		
				} else {
					Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
				}
	});
}
declarePlanAction.deleteDeclarePlan = function(){ 
	var records = Ext.getCmp('declarePlanGrid').getSelectionModel().getSelections(); 
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要删除的记录！');
		return;
	}
	var declareplanID = new Array();//正常生成的申报计划数据
	var declarePlanId = new Array();//补充的申报计划数据
	for (i=0;i<records.length;i++) {
		  if(records[i].get("status")!="编制中" && records[i].get("status")!="已退回"){
			 Ext.Msg.alert('提示', '请选择编制中的信息！');
			 return;
		 }else{
		 	if(records[i].get("status")=="已退回"&&records[i].get('generator')==1){
		 		Ext.Msg.alert('提示','只能删除编制中的新建数据!');
		 		return;
		 	}
			 if(records[i].get('generator')==1){
			 	declarePlanId.push(records[i].id)
			 }else{
			 	declareplanID.push(records[i].id);
			 }
		 }
	} 
	if(declareplanID.length != 0){
		callSeam("declarePlan_DeclarePlanRemote", "deleteDeclarePlan", [ declareplanID ],
			function(r){
				if (r) {
					var result = Ext.util.JSON.decode(r);
					if(result.success == false){
						Ext.Msg.alert('提示', '操作失败！');
					} else {
						var grid = Ext.getCmp('declarePlanGrid');				
						grid.store.reload(); 
						Ext.Msg.alert('提示', '操作成功！');
					}		
				} else {
					Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
				}
		});
	}
	if(declarePlanId.length != 0){
		callSeam("declarePlan_DeclarePlanRemote", "deleteDeclarePlan2", [ declarePlanId ],
			function(r){
				if (r) {
					var result = Ext.util.JSON.decode(r);
					if(result.success == false){
						Ext.Msg.alert('提示', '操作失败！');
					} else {
						var grid = Ext.getCmp('declarePlanGrid');				
						grid.store.reload(); 
						Ext.Msg.alert('提示', '操作成功！');
					}		
				} else {
					Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
				}
		});
	}
	
}
declarePlanAction.exportExcel=function(departmentId,use1,declareplanID){
	 var name = "申报计划";
	 if(departmentId!="")
	 	name = "申报单位";
	 else if(use1!="")
	 {
	 	name = "采购用途"; 
	 }
	 var inputs = '<input type="hidden" name="className" value="declareDetail_DeclareDetailRemote"/>'
				+ '<input type="hidden" name="methodName" value="getGridDataByCondition"/>'
				+ '<input type="hidden" name="para1" value="'+departmentId+'"/>'
				+ '<input type="hidden" name="para2" value="'+use1+'"/>'
				+ '<input type="hidden" name="para3" value="'+declareplanID+'"/>'
				+ '<input type="hidden" name="fileName" value="'+name+'"/>';
				$('<form action="../exportExcelServlet" method="post">'+inputs+'</form>')
					.appendTo('body').submit().remove();
}
 