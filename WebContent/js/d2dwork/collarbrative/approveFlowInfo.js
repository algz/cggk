var approveFlowInfo = {
};

approveFlowInfo.init = function() {	//界面布局需要重新调整一下
	
approveFlowInfo.stepGrid = approveFlowSteps.getGrid();
	
		approveFlowInfo.enpanel = new Ext.Panel({		
		 autoScroll:true,
		title :''+getResource('resourceParam1143')+'',
		region:'center',
		autoScroll : true,
		items : [approveFlowInfo.stepGrid]
	});	
	
	
		approveFlowInfo.tab = new Ext.TabPanel({
				activeTab : 0,
				height : 700,
//				hidden:true,
//				autoScroll:true,
				plain : true,
				defaults : {
					autoScroll : true
				},
				items : [
				     approveFlowInfo.enpanel
				      ]
			});	

	return approveFlowInfo.enpanel; //可用tab方式，也可以用窗口方式
}

