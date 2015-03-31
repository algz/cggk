tenderFileAction = { 
	id : null
}; 
//定向/委托/比价
tenderFileAction.tenderFileView  = function(tenderId,procurementPlanDetilName,tenderFileType,obj,type){  
	var win;
	tenderFileAction.id = obj.tenderFileId;
	var fileName = obj.fileName;
	if(fileName.indexOf("\\")!=-1)
	   fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
								
	if(tenderFileType=="8")//定向
	{
		win = tenderFileDirectionalForm.getTenderFileDirectionalForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode, 
		obj.agreementdepartment,obj.selecteddepartment,obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status);
	}else if(tenderFileType=="9"){//委托
		win = tenderFileCommissionForm.getTenderFileCommissionForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,obj.agreementdepartment,obj.plenipotentiary,
		obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status);
	}
	else if(tenderFileType=="10"){//比价
		win = tenderFileParityForm.getTenderFileParityForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,obj.amount,obj.selecteddepartment,
		obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status);
	}
    else if(tenderFileType=="7"){//谈判记录
   	    win = tenderNegotiationForm.getNegotiationForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,obj.plenipotentiary,
		obj.selecteddepartment,obj.createdate,obj.syndic,fileName,obj.fileId,obj.tenderFileId,obj.status);
    }else if(tenderFileType=="3"){//招标文件 
   	    win = tenderTenderForm.getForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,obj.plenipotentiary,
		obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status);
    }else if(tenderFileType=="5")//招标评审
    {
    	win = tenderAppraForm.getForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,obj.selecteddepartment,
		obj.syndic,obj.plenipotentiary,obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status,obj.amount);
    }
   	else if(tenderFileType=="6")//招标通知
   	{
   		win = tenderMessageForm.getForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,
   		obj.plenipotentiary,obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status,type);
   	}
   	else if(tenderFileType=="1")//委托审签
   	{
   		win = tenderFileForm.getTenderFileForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,
		obj.efficiency,obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status);
   	}
    else if(tenderFileType=="2")//委托文件
    {
    	win = tenderEntrusForm.getEntrustFileForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,
		obj.agreementdepartment,obj.plenipotentiary,obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status);
    }
   	else if(tenderFileType=="4")//招标管理登记
   	{
   		win = tenderRegisterForm.getForm(tenderId,procurementPlanDetilName,tenderFileType,obj.tenderFileCode,
		obj.plenipotentiary,obj.createdate,fileName,obj.fileId,obj.tenderFileId,obj.status);
    }
	win.show();
}
tenderFileAction.getContent =function(tenderId,procurementPlanDetilName,tenderFileType,type){
	Ext.Ajax.request( {
		url : '../JSON/tenderFileRemote.getTenderFile?d=' + new Date(),
		method : 'POST',
		params : { 
				  tenderId:tenderId, 
				  tenderFileType:tenderFileType
				},
		success : function(response,options) { 
			var obj = Ext.util.JSON.decode(response.responseText); 
			tenderFileAction.tenderFileView(tenderId,procurementPlanDetilName,tenderFileType,obj,type);
		},
		failure : function() {
			Ext.Msg.alert('提示',"服务器正忙");
		}
	});
}

tenderFileAction.submitTenderFile = function(flowId,name,id){ 
	Ext.MessageBox.confirm('送审', 
			'送审以后不能再编辑，是否继续？　', function(btn, text){
		if(btn == 'yes'){ 
			approvePanel.submit(flowId, name, name, id, 
					"TenderFile", true, approvePanelSuccess, approvePanelFailure); 
		}
	});
}

function approvePanelSuccess(){ 
   tenderFileAction.updateStatus();
}
tenderFileAction.updateStatus = function(){
	var remote = Seam.Component.getInstance("tenderFileRemote");  
	remote.updateStatus(tenderFileAction.id, function(result){ 
 
		 Ext.getCmp("send").disable(); 
	  	 Ext.getCmp("save").disable(); 
	  	 if(Ext.getCmp("fixTenderGrid")!=null)
	  	 Ext.getCmp("fixTenderGrid").store.reload();
	  	  if(Ext.getCmp("tenderPlanGrid")!=null)
	  	 Ext.getCmp("tenderPlanGrid").store.reload();
	});
}
function approvePanelFailure(){
	Ext.Msg.alert('提示', '没有送审权限！');
} 