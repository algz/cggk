//供应商登记审批查看明细
RegistrationDeclaration2ApprovalObjectPanel = {};
RegistrationDeclaration2ApprovalObjectPanel.init = function(id){  
	var grid = new hd.investment.purchaseRequest.declareDetail.grid.gridPanel();
	grid.store.baseParams = {declareId:id, start:0, limit:20,declareDetailStatus:"1"};
	grid.store.load();
	grid.getTopToolbar().hide();
	return grid;
} 