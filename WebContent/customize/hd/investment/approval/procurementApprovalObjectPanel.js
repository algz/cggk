//采购需求审批查看明细
procurementApprovalObjectPanel = {};
procurementApprovalObjectPanel.init = function(id){ 
	procurementSporadicData.rightPanel();
	var grid = Ext.getCmp('procurementSporadicDataGrid');
	grid.getStore().baseParams = {start:0, limit:20, procurementId:id , type:'2'};
	grid.store.load();
	return grid;
}