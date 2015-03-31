//采购计划审批查看明细
DeclarePlanApprovalObjectPanel = {};
DeclarePlanApprovalObjectPanel.init = function(id){  
	var grid = declare_query.gridPanel('','','');
	grid.store.baseParams = {start:0,limit:20,declareplanID:id};
	grid.store.load(); 
	var bar = grid.getTopToolbar().hide(); 
		 
	return grid;
}