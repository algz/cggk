var moneyPaymentAction = {
};
//详细信息展示
moneyPaymentAction.gridView = function(procurementContractId){
	var win = moneyPaymentMain.window;
	if(win == null){
		win = moneyPaymentMain.init(procurementContractId,0,400,990);
	}else{
		win.getLayout().setActiveItem(0);
		win.setHeight(400);
		win.setWidth(990);
	}
	win.setTitle('&nbsp;货款支付信息');
	win.show();
}
//新增货款支付信息
moneyPaymentAction.addView = function(procurementContractId){
	var win = moneyPaymentMain.window;
	if (win == null){
		win = moneyPaymentMain.init(procurementContractId,1,400,990);
		moneyPaymentMain.isDirectAdd = true;
	}else{
		win.getLayout().setActiveItem(1);
		win.setHeight(360);
		win.setWidth(560);
	}
	win.setTitle('&nbsp;新增货款支付信息');	
	win.show();
}
//编辑货款支付信息
moneyPaymentAction.editView = function(){
	var records = moneyPaymentGrid.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length>1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	}
	var win = moneyPaymentMain.window;
	win.getLayout().setActiveItem(1);
	win.setHeight(360);
	win.setWidth(560);
	Ext.getCmp('moneyPaymentForm').getForm().loadRecord(records[0]);
	win.setTitle('&nbsp;货款支付信息-编辑');
	win.show();
}
//删除货款支付信息
moneyPaymentAction.delView = function(){
	var records = moneyPaymentGrid.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要删除的数据！');
		return;
	}	
	Ext.MessageBox.confirm('删除货款支付信息', 
			'删除的货款支付信息无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			var arr = new Array();
			for ( var i = 0; i < records.length; i++) {
				arr.push(records[i].get('moneyPaymentId'));
			}

			callSeam("moneyPayment_MoneyPaymentRemote", "deleteMoneyPayments", [arr],
					moneyPaymentAction.callBack);
		}
	});
}
//回调
moneyPaymentAction.callBack = function(r){
	if (r) {
		var result = Ext.util.JSON.decode(r);
		if(result.success == false){
			Ext.Msg.alert('提示', '删除失败');
		} else {
			var grid = Ext.getCmp('moneyPaymentGridPanelId');
			grid.getStore().baseParams = {
				start : 0,
				limit : 20,
				procurementContractId:moneyPaymentMain.contractId
			};
			grid.store.load();
		}		
	} else {
		Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
	}
}