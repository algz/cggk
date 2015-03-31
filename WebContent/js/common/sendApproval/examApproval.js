var examApproval = {};

examApproval.getGrid = function(container, dataId, dataType) {
	var conn = synchronize.createXhrObject();
	var myurl = "../JSON/approval_ApprovalRemote.getFlowinstanceId?objectId="
			+ dataId + "&objectType=" + dataType+"&approvalType=StepByStep";
	conn.open("GET", myurl, false);
	conn.send(null);
	examApproval.mainpanel = new Ext.Panel({
				layout : 'fit',
				items : [approveFlowSteps.getGrid()]
			});
	container.add(examApproval.mainpanel);
	approveFlowSteps.refreshGrid(conn.responseText);
	return examApproval.mainpanel;
}

examApproval.getCommentGrid = function(container,dataId,dataType,callback){
	var config = {
				layout : 'fit',
				items : [approveFlowSteps.getGrid()]
			};
	if(callback){
		config = {
				title : '审批记录',
				id : 'commentGrid'+dataId,
				layout : 'fit',
				items : [approveFlowSteps.getGrid()],
				buttons : [{
					text : '返回',
					handler : callback
				}]
			};
	}
	examApproval.mainpanel = new Ext.Panel(config);
	container.add(examApproval.mainpanel);
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/approval_ApprovalRemote.getApproalFlowInfosByObjId?objectID='
						+ dataId+"&approvalType=StepByStep&objectType="+dataType
			});
	approveFlowSteps.grid.getStore().proxy = proxy;
	approveFlowSteps.grid.getStore().load();
	return examApproval.mainpanel;
}
