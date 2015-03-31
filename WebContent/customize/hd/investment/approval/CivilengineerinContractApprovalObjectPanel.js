//合同审批查看明细
CivilengineerinContractApprovalObjectPanel = {};
/**
 * 
 * @param {} id 合同id 
 * @return panel 为合同的编辑页面内容，附件能下载
 */
CivilengineerinContractApprovalObjectPanel.init = function(id){  
	var panel =contractGrid.approvalForm(id.substring(0,id.length-1),id.substring(id.length-1));
 
	var form3 = Ext.getCmp('form3');
	form3.form.doAction('load',{
		waitTitle : '加载编辑数据',
		waitMsg : '正在加载编辑数据',
		url : '../JSON/contract_Remote.getContractForApprovalById?contractId='
						+ id.substring(0,id.length-1),
		method : 'post', 
		success : function (form,action){ 
	document.getElementById("down").href = 
			"../FILEDOWN/?ID="+action.result.data.fileId+ "&ORIGINALNAME="
							+ encodeURI(encodeURI(action.result.trueFileName)) 
			 
		}
	}); 
 	return panel;
}