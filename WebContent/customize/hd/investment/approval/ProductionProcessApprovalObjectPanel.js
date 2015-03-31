//采购计划审批，查看明细
ProductionProcessApprovalObjectPanel = {type : ''};
ProductionProcessApprovalObjectPanel.init = function(id){ 
	
		var url = "../seam/resource/productionProcessServlet?id="+id;
		var conn = synchronize.createXhrObject();
		conn.open('POST', url, false);
		conn.send(null);
		var value = Ext.util.JSON.decode(conn.responseText); 
		var type = value.result; 

		
	var panel;

	var grid ;
	if(type=='2'){//零星需求
		panel = purchaseDetailReadOnlyData.card5ReadOnlyPanel();
		grid = Ext.getCmp('card5ReadOnlyPanelDataGrid');
		
	}else{//年度需求
		panel = purchaseDetailReadOnlyData.card4ReadOnlyPanel();
		grid = Ext.getCmp('card4ReadOnlyPanelDataGrid');
		
	}
	panel.getTopToolbar().hide();
	
	grid.getStore().baseParams = {start:0,limit:20,purchaseId:id,purchaseType:type,isAuthorityControl:2};
	
	grid.store.load();
	
	return panel;
}
//回调
ProductionProcessApprovalObjectPanel.callBack = function(r){
	ProductionProcessApprovalObjectPanel.type = r;
}