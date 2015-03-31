//采购比价审批，查看明细
ParityAuditApprovalObjectPanel = {};
ParityAuditApprovalObjectPanel.init = function(id){ 
	var panel =procurementProcessData.parityDetailReadOnlyPanel();
	panel.getTopToolbar().hide();
	var contractForm = Ext.getCmp('parityDetailReadOnlyFormId');
	contractForm.form.doAction('load',{
		waitTitle : '加载编辑数据',
		waitMsg : '正在加载编辑数据',
		url : '../JSON/parityDetailRemote.getParityDetailApprovelData?d=' + new Date(),
		method : 'post',
		params : {start : 0,limit : 20 , parityId : id },
		success : function (form,action){
			form.loadRecord(action.result);
			
			comparePriceReadOnlyForm.parityDetailId = action.result.data.parityDetailId;
			
			if(typeof(comparePriceReadOnlyForm.parityDetailId)!='undefined'){
				
				var parityVendorGrid = Ext.getCmp('parityVendorReadOnlyGrid');
				
				parityVendorGrid.getStore().baseParams={start:0,limit:20,parityDetailId:comparePriceReadOnlyForm.parityDetailId};
				
				parityVendorGrid.getStore().load();
			}
		},
		failure : function(form,action){
			
		}
	});
	return panel;
}