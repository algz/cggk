var declareAction={
		declareId : null,
		title_success : null,
		title_failed : null 
}

// 显示指定申报表明细
declareAction.showDetail = function(declareId,status,amountSource,costNum){
	DeclarationMaterial.param1 = amountSource;
	DeclarationMaterial.param2 = costNum;
	declareAction.declareId = declareId;
	Ext.getCmp('declareOnReadyPanel').getLayout().setActiveItem(1);//激活第二张card
	var grid = Ext.getCmp('declareDetailGridPanel'); 
	var declareDetailStatus = '2';
	if(status!="编制中"){
		Ext.getCmp("add").disable();
		if(declareGrid.status==null){
			Ext.getCmp("update").disable(); 
			Ext.getCmp("del").disable();
		}
	}else{
		
		Ext.getCmp("add").enable();
		Ext.getCmp("update").enable();
		Ext.getCmp("del").enable();
		if(privilegeValidate.addDdDisable){
			Ext.getCmp("add").disable();
		}
		if(privilegeValidate.updateDdDisable){
			Ext.getCmp("update").disable();
		}
		if(privilegeValidate.delDdDisable){
			Ext.getCmp("del").disable();
		}
//			Ext.getCmp("add").disable();
//			Ext.getCmp("update").disable(); 
//			Ext.getCmp("del").disable();
//			Ext.getCmp('change').disable();
	}
	declareDetailStatus = "1";
//	if(declareGrid.status==null){
//		grid.getColumnModel().setHidden(12, true);//隐藏 "未通过原因" 列
//		declareDetailStatus = "1";
//	}else{
//		//grid.getColumnModel().setHidden(12, false);// 不隐藏 "未通过原因" 列
//		grid.getColumnModel().setHidden(12, true); //业务变更,需要隐藏
//	}
	grid.store.baseParams = {declareId:declareId, start:0, limit:20,declareDetailStatus:declareDetailStatus};
	grid.store.load();
		
}
 

//删除
declareAction.remove = function(){ 
	if(declareGrid.status!=null){
		Ext.Msg.alert('提示', '未通过申报的不能使用删除功能！');
		return;
	}
	var records = Ext.getCmp('PurchaseRequestDeclareGridPanel').selectObj;
	
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要删除的记录！');
		return;
	}
	var arr = new Array();
	for ( var i = 0; i < records.length; i++) {
		arr.push(records[i].get('declareId'));
		if(records[i].get('status')!="编制中"){
			Ext.Msg.alert('提示', '请选择编制中的信息！');
				return;
		}
	}
	Ext.MessageBox.confirm('删除申报记录', 
			'删除的申报记录无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){ 
			callSeam("declare_DeclareRemote", "deleteDeclareByIds", [ arr ],
					declareAction.deleteCallBack);
			declareAction.title_success = "删除成功！";
			declareAction.title_failed = "删除失败！";
		}
	});

}

//删除回调
declareAction.deleteCallBack = function(r){
	if (r) {
		var result = Ext.util.JSON.decode(r);
		if(result.success == false){
			Ext.Msg.alert('提示', declareAction.title_failed);
		} else {
			var grid;	
			if(declareGrid.status !=null ){
				grid = Ext.getCmp('PurchaseRequestDeclareNotThroughGridPanel');
			}else{
				grid = Ext.getCmp('PurchaseRequestDeclareGridPanel');
			}
			grid.store.load();
			Ext.Msg.alert('提示', declareAction.title_success);
		}		
	} else {
		Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
	}
}

//提交窗口
declareAction.submission = function() {
	var records = null;
	if(declareGrid.status ==null ){
		 records = Ext.getCmp('PurchaseRequestDeclareGridPanel').selectObj;
	}else{
		 records = Ext.getCmp('PurchaseRequestDeclareNotThroughGridPanel').selectObj;
	}
		
		
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要提交的信息！');
		return;
	}
	
	if (records.length > 1) {
		Ext.Msg.alert('提示', '请选择一条你要提交的信息！');
		return;
	}
	
	var arr ="";
	for ( var i = 0; i < records.length; i++) {
		if(records[i].get('quantity')=="0"){
			return Ext.Msg.alert("提示","不能提交项数为0的记录!");
		}
		if(i!=0){
			arr+=",";
		}
		arr+=records[i].get('declareId');
		if(records[i].get('status')!="编制中" && declareGrid.status ==null){
			Ext.Msg.alert('提示', '请选择编制中的信息！');
				return;
		}
	}

	var amountSource = records[0].data.amountSource;
	Ext.MessageBox.confirm('提交申报记录', 
					'提交的申报记录无法编辑，是否继续？　', function(btn, text){
		if(btn == 'yes'){
//				if(declareGrid.status==null)
//					arr.push("0");
//				else
//					arr.push("2");
//		分开提交？按照资金来源分别提交不同 的审批流程
			declareAction.title_success = "提交成功！";
			declareAction.title_failed = "提交失败！";
			if(amountSource=="自有费用"){
				approvePanel.submit('488701', "需求登记自有费用审批", "需求登记自有费用审批", arr, "RegistrationDeclaration2", true, 
					function() {
						Ext.Msg.alert('提示', '送审成功!');
						var store=Ext.getCmp('PurchaseRequestDeclareGridPanel').store
						store.load();
					}, function() {
						 Ext.Msg.alert('提示', '提交失败!');
				});
			}else if(amountSource=="项目费用"){
				approvePanel.submit('488701', "需求登记项目费用审批", "需求登记项目费用审批", arr, "RegistrationDeclaration", true, 
					function() {
						Ext.Msg.alert('提示', '送审成功!');
						var store=Ext.getCmp('PurchaseRequestDeclareGridPanel').store
						store.load();
					}, function() {
						 Ext.Msg.alert('提示', '提交失败!');
				});
			}else if(amountSource=="公用笺"){
//			直接提交通过审批declare_DeclareRemote
				var remote = Seam.Component.getInstance("declare_DeclareRemote");
				remote.updateDeclareById(records[0].get('declareId'),function(result){
					Ext.Msg.alert('提示','送审成功');
					var store = Ext.getCmp('PurchaseRequestDeclareGridPanel').store;
					store.load();
				});
			}
			
			
		}
	}); 
}
//查询窗口
declareAction.showQueryForm = function(){
	declare_query_form.getSearchForm().show();
}

