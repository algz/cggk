//供应商登记审批查看明细
VenderRegisterApprovalObjectPanel = {};
VenderRegisterApprovalObjectPanel.init = function(id){  
	var grid = venderRegisterGrid.gridPanel();
	grid.store.baseParams = {start:0,limit:20,vendorID:id.substring(0,id.length-1)};
	grid.store.load(); 
	var bar = grid.getTopToolbar().hide(); 
	return grid;
}