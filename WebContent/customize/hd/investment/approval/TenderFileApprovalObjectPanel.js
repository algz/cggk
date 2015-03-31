//合同审批查看明细
TenderFileApprovalObjectPanel = {};
TenderFileApprovalObjectPanel.init = function(id){  
	var panel; 
	var type = id.substring(id.length-1);
	if(type=="3"){
		panel = tenderFileApprovalForm.tenderTenderPanel();//招标文件
	} else if(type=="5"){
		panel = tenderFileApprovalForm.tenderAppraPanel();//招标评审
	} else if(type=="1"){
		panel = tenderFileApprovalForm.tenderFilePanel();//委托审签
	}else if(type == "6" || type == "4"){
		panel = tenderFileApprovalForm.tenderMessagePanel();//招标通知或者招标管理登记
	} else if(type == "8"){
		panel = tenderFileApprovalForm.tenderFileDirectionalPanel();//定向
	} else if(type == "7"){
		panel = tenderFileApprovalForm.tenderNegotiationPanel();//谈判记录
	}else if (type =="9"){
		panel = tenderFileApprovalForm.tenderFileCommissionPanel();//委托协议
	}else if (type =="a"){//类型为a的为类型10的
		panel = tenderFileApprovalForm.tenderFileParityPanel();//自行比价
	}
	var tenderFileForm = Ext.getCmp('tenderFileForm2');
	tenderFileForm.form.doAction('load',{
		waitTitle : '加载编辑数据',
		waitMsg : '正在加载编辑数据',
		url : '../JSON/tenderFileRemote.getTenderFileByTenderFileId?d=' + new Date(),
		method : 'post',
		params : {tenderFileId : id.substring(0,id.length-1) },
		success : function (form,action){  
			document.getElementById("down").href = 
			"../FILEDOWN/?ID="+action.result.data.fileId+ "&ORIGINALNAME="
							+ encodeURI(encodeURI(action.result.trueFileName)) 
			
		}
	}); 
	return panel;
}