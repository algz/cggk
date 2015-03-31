//采购计划审批查看明细
ProcurementPlanApprovalObjectPanel = {};
ProcurementPlanApprovalObjectPanel.init = function(id){  
	if(id.substring(id)=="1")
		return purchasePlanGrid.fixGridPanel(id);
	else{
		return purchasePlanGrid.threeGrid(id);
	}
}