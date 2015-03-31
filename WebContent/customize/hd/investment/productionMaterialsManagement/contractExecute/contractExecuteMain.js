var contractExecuteMain = {
	window:null,
	isDirectAdd:false,
	contractId:null
};

contractExecuteMain.init = function(contractId, cardItem, height) {
	contractExecuteMain.contractId = contractId;	
	contractExecuteMain.gridCard = contractExecuteGrid.gridPanel();//列表
	contractExecuteMain.formCard = contractExecuteForm.getForm();//表单
		
	//页面总布局
	var window = new Ext.Window({
		width : 800,
		height : height,
		layout : 'card',
		activeItem : cardItem,
		items : [contractExecuteMain.gridCard, contractExecuteMain.formCard],
		listeners : {
			'beforeclose' : function(){
				contractExecuteMain.window = null;
				contractExecuteMain.contractId = null;
				contractExecuteMain.isDirectAdd = false;
			}
		}
	});

	contractExecuteMain.window = window;	
	return window;
}
