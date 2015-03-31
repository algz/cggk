//合同审批查看明细
ContractApprovalObjectPanel = {};
ContractApprovalObjectPanel.init = function(id){ 
	var panel = contractData.tabCard03();
	panel.getTopToolbar().hide();
	
	var contractForm = Ext.getCmp('contractFormId2');
	contractForm.form.doAction('load',{
		waitTitle : '加载编辑数据',
		waitMsg : '正在加载编辑数据',
		url : '../JSON/contract_ProcurementContractRemote.getProcurementContractById?d=' + new Date(),
		method : 'post',
		params : {procurementContractId : id },
		success : function (form,action){
			form.loadRecord(action.result);
			var auditCode = contractForm.form.findField('auditCode').getValue();
			var type = auditCode.substring(1,2);
			var card = Ext.getCmp('card03');
			type == 'N' ? card.getLayout().setActiveItem(0) : card.getLayout().setActiveItem(1);
			var store = (type == 'N') ? Ext.getCmp('procurementDetailGridId21').getStore() 
						: Ext.getCmp('procurementDetailGridId22').getStore();
			store.baseParams = {start:0, limit:20, contractId:id};
			store.load();
		}
	});
		
	return panel;
}