var venderAppraisalAction = {};
venderAppraisalAction.showUser = function(departmentId,rowIndex){
	venderAppraisalForm.userGridPanel(departmentId,rowIndex).show();
}
venderAppraisalAction.appraisalScore = function(){
	var records = Ext.getCmp("venderAppraisalGridPanelId").getSelectionModel().getSelections();
	appraisalScoreForm.getForm(records[0],records[0].get("vendorAppraisalId")).show();
}
venderAppraisalAction.appraisalContext = function(){
	var records = Ext.getCmp("venderAppraisalGridPanelId").getSelectionModel().getSelections();
	
	Ext.Ajax.request({  
            url:'../JSON/vendorAppraisalRemote.isPass?d='+new Date(),  
            method:'post',  
            waitMsg:'数据加载中，请稍后....',  
            params:{vendorAppraisalId:records[0].get("vendorAppraisalId"),isExaminer:0},
            success:function(response,opts){ //服务器响应状态值为200.即表示服务器成功响应
                var obj=Ext.decode(response.responseText);  
                if(obj.success == true) {//如果你处理的JSON串中true不是字符串，就obj.success == true
                     //你后台返回success 为 false时执行的代码
                     
	appraisalContextForm.getForm(records[0],records[0].get("vendorAppraisalId")).show();
                } else {
                     //你后台返回success 为 false时执行的代码
                     Ext.Msg.alert("提示","评分没有完成!");
                }
//                console.dir(obj);
            },  
            failure:function(response,opts){//表示服务器响应失败.
                var obj=Ext.decode(response.responseText);  
                alert(obj.result); 
//                console.log('server-side failure with status code '+ response.status); 
                  
            }  
        })  
}