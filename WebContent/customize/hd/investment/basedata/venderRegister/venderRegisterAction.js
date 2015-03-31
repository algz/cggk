/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderRegisterAction = {name:null};  
venderRegisterAction.seach = function(){
	venderRegisterQuery.getSearchForm().show();
}
/**
 * 导出过期供应商资质
 */
venderRegisterAction.exprot = function(name){
	var records = Ext.getCmp(name).getSelectionModel().getSelections();
	if(records==null || records.length==0){
		Ext.Msg.alert('提示', '请选择供应商信息！');
		return;
	}
	var id = "";
	for(var i=0;i<records.length;i++){ 
			//现有程序逻辑已经去掉了供应商登记的送审
			if(records[i].get('mark')=="0"){
				Ext.Msg.alert('提示', '请选择编号为红色的供应商信息！');
				return;
			} 
			if(id.length>0)
			   id+=","
			id+="'"+records[i].get('vendorID')+"'";  
	} 
	   var inputs = '<input type="hidden" name="className" value="vendorQualificationRemote"/>'
				+ '<input type="hidden" name="methodName" value="getVendorQualificationList"/>'
				+ '<input type="hidden" name="vendorId" value="'+id+'"/>'
				+ '<input type="hidden" name="fileName" value="过期供应商资质信息"/>'; 
				$('<form action="../exportExcelServlet" method="post">'+inputs+'</form>')
					.appendTo('body').submit().remove();
}
venderRegisterAction.send = function(name){
		venderRegisterAction.name = name;
		var grid = Ext.getCmp(name); 
		var records = grid.getSelectionModel().getSelections();
		if(records==null || records.length==0){
				Ext.Msg.alert('提示', '请选择要送审的信息！');
				return;
		}
		var id = "";
		
		var flowId = "460750";//流程Id
		var type = "VenderRegister";//审批对象
		var flowName = "供应商初选登记"//审批对象名称
		var venderType = "1";
		var vendorID="";//供应商ID
		var vendorType="";//供应商类别
		if(name == "venderEvaluationGridPanelId"){
			flowId = "460751";
			type = "VenderEvaluation";
			flowName = "供应商评价考核";
			venderType = "2";
		}
		for(var i=0;i<records.length;i++){ 
			//现有程序逻辑已经去掉了供应商登记的送审
//			if((venderType==1 && records[i].get('trial_status')!=0) || (venderType==2 && records[i].get('evaluation_status')!=0)){
			if(venderType==2 && (records[i].get('evaluation_status')=='1'||records[i].get('evaluation_status')=='2')){
				Ext.Msg.alert('提示', '请选择要编制中的信息！');
				return;
			}else if(records[i].get('type')==""){
				Ext.Msg.alert("提示","请选择类别!")
				return ;
			}
			id+=records[i].get('vendorID')+venderType+","; 
			if(records[i].dirty){
			vendorID+=(vendorID!=""?",":"")+records[i].get('vendorID');
			vendorType+=(vendorType!=""?",":"")+records[i].get('type');
			}
		} 
		if(vendorID!=""){
			
		Ext.Ajax.request({  
            url:'../JSON/vendor_VendorRemote.updateBatchVendor',  
            method:'post',  
            waitMsg:'数据加载中，请稍后....',  
            params:{
            vendorID:vendorID,
            type:vendorType},
            success:function(response,opts){ //服务器响应状态值为200.即表示服务器成功响应
                var obj=Ext.decode(response.responseText);  
                if(obj.success == true) {//如果你处理的JSON串中true不是字符串，就obj.success == true
                     //你后台返回success 为 false时执行的代码
		approvePanel.submit(flowId, flowName, flowName, id.substring(0,id.length-1), 
					type, true, approvePanelSuccess, approvePanelFailure);                 	
                } else {
                     //你后台返回success 为 false时执行的代码
                }
//                console.dir(obj);
            },  
            failure:function(response,opts){//表示服务器响应失败.
                var obj=Ext.decode(response.responseText);  
                alert(obj.result); 
//                console.log('server-side failure with status code '+ response.status); 
                  
            }})
		}else{
			approvePanel.submit(flowId, flowName, flowName, id.substring(0,id.length-1), 
					type, true, approvePanelSuccess, approvePanelFailure);   
		}
		

}
function approvePanelSuccess(){
	var remote = Seam.Component.getInstance("vendor_VendorRemote");
	var rows = Ext.getCmp(venderRegisterAction.name).getSelectionModel().getSelections();
	var arr = new Array();
	
	var type = "1";
	var name = "trial_status"; 
	if(venderRegisterAction.name=="venderEvaluationGridPanelId"){
	   type = "2";
	   name = "evaluation_status"; 
	}
	 for(var i=0;i<rows.length;i++)
		arr.push(rows[i].get('vendorID')+type);
	remote.updateVendorStatus(arr,type,'1', function(result){
		for(i=0;i<rows.length;i++){
			rows[i].set(name,'1');
		} 
	});
}

function approvePanelFailure(){
	Ext.Msg.alert('提示', '没有送审权限！');
}
