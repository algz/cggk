var contractExecuteAction = {};

//列表视图
contractExecuteAction.gridView = function(procurementContractId){
	var win = contractExecuteMain.window;
	if (win == null){
		win = contractExecuteMain.init(procurementContractId,0,400);
	}else{
		win.getLayout().setActiveItem(0);
		win.setHeight(400);
	}
	win.setTitle('&nbsp;合同执行情况');		
	win.show();
}

//新增视图
contractExecuteAction.addView = function(procurementContractId){
	var win = contractExecuteMain.window;
	if (win == null){
		win = contractExecuteMain.init(procurementContractId,1,490);
		contractExecuteMain.isDirectAdd = true;
	}else{
		win.getLayout().setActiveItem(1);
		win.setHeight(400);
	}
	win.setTitle('&nbsp;新增合同执行情况');	
	win.show();
}

//修改视图
contractExecuteAction.editView = function(){
	var records = contractExecuteGrid.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length > 1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	}
	var win = contractExecuteMain.window;
	win.getLayout().setActiveItem(1);
	win.setHeight(400);
	Ext.getCmp('contractExecuteFrom').getForm().loadRecord(records[0]);
	win.setTitle('&nbsp;编辑合同执行情况');	
	win.show();
}

//删除
contractExecuteAction.del = function(){
	var records = contractExecuteGrid.selectObj;
	if(records == null || records.length < 1){
		Ext.Msg.alert('提示','请选择你要删除的数据！');
		return ;
	}
	Ext.MessageBox.confirm('删除合同执行情况信息', 
			'删除的合同执行情况信息无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			var arr = new Array();
			for(var i=0;i<records.length;i++){
				arr.push(records[i].get('contractExecuteId'));
			}
			callSeam("contractExecute_ContractExecuteRemote", "deleteContractExecute", [arr], contractExecuteAction.delCallBack);
		}
	}); 
	
}

//回调
contractExecuteAction.delCallBack = function(r){
	if(r){
		var grid = Ext.getCmp('contractExecuteGridId');
		grid.getStore().baseParams = null;
		grid.getStore().load({params:{start:0,limit:20,procurementContractId:contractExecuteMain.contractId}});
	} else {
		Ext.Msg.alert('提示','服务器忙，请稍候重试！');
	}
}
