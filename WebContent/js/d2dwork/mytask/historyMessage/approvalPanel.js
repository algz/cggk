var approvalPanel = {

}
approvalPanel.init = function() {
	var config = {
		layout : 'fit',
		height:800,
		autoScroll : true,
		items : [approveFlowSteps.getGrid()]
	};
	approvalPanel.panel = new Ext.Panel(config);
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/approval_ApprovalRemote.getApproalFlowInfosByObjId'
			});
	approveFlowSteps.grid.getStore().proxy = proxy;
	return approvalPanel.panel;
}