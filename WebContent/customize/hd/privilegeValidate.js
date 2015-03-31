/**
 * 权限验证
 */
var privilegeValidate = {
	
    addCode : null,//计划新建 
	updateCode : null,//计划修改 
	updateBCode : null,//比价修改 
	updateTCode : null,//台账修改 
	updateHCode : null,//合同修改 
	delCode : null,//计划删除 
	delBCode : null,//比价删除 
	delHCode : null,//合同删除 
	delTCode : null,//合同台帐删除  
	queryCode : null,//查询 
	importCode : null,//导入 
	addVendorBCode : null,//比价指定供应商 
	addVendorZCode : null,//招标指定供应商
	sendCCode : null,//采购计划送审
	sendBCode : null,//比价送审
	sendZCode : null,//招标送审
	sendHCode : null,//合同送审
	addBContractCode : null,//比价生成合同 
	addZContractCode : null,//招标生成合同

	addDisable : false,//计划新建 
	updateDisable: false,//计划修改 
	updateBDisable: false,//比价修改 
	updateTDisable: false,//台账修改 
	updateHDisable: false,//合同修改 
	delDisable: false,//计划删除 
	delBDisable: false,//比价删除 
	delHDisable: false,//合同删除 
	delTDisable: false,//合同台帐删除  
	queryDisable: false,//查询 
	importDisable: false,//导入 
	addVendorBDisable: false,//比价指定供应商 
	addVendorZDisable: false,//招标指定供应商
	sendCDisable: false,//采购计划送审
	sendBDisable: false,//比价送审
	sendZDisable: false,//招标送审
	sendHDisable: false,//合同送审
	addBContractDisable: false,//比价生成合同 
	addZContractDisable: false,//招标生成合同 
//
/*********************************下面是新添加的权限**************************************/
//	申报记录权限
	addDCode : null,//申报记录新建
	delDCode : null,//申报记录删除
	sendDCode : null,//申报记录提交审批
	exportDCode : null,//申报记录导出
	importDCode : null,//申报记录历史计划与合同导入
//	申报计划权限
	addDpCode : null,//申报计划新建
	updateDpCode : null,//申报计划修改
	delDpCode : null,//申报计划删除
	sendDpCode : null,//申报计划审批
	submitDpCode : null,//申报申报计划提交
	newDpCode : null,//申报计划生成
//	采购计划权限添加
	rollPCode : null,//计划退回
	exportPCode : null,//计划导出
	newPCode : null,//生成采购计划
	submitCpCode : null,//详细信息提交
	newCpCode : null,//详细信息生成数据
//	采购合同权限添加
	importHCode : null,//合同导入
	newTcode : null,//合同生成台账
	confirmMCode : null,//合同物资确认入库
	addHmCode : null,//新增合同物资
	delHmCode : null,//删除合同物资
//	申报明细权限添加
	addDdCode : null,//申报明细新建
	updateDdCode : null,//申报明细修改
	delDdCode : null,//申报明细删除
	changeDdCode : null,//申报明细变更
//	协议采购权限
	addVendorXyCode: null,//协议指定供应商 
	sendXyCode: null,//协议送审
	addXyContractCode : null,//协议生成合同 
//	直接采购权限
	addVendorZjCode: null,//直接采购指定供应商 
	sendZjCode: null,//直接采购送审
	addZjContractCode : null,//直接采购生成合同 
//	----------------------------------------------------------------------------
//	 申报记录权限
	addDDisable : false,//申报记录新建
	delDDisable : false,//申报记录删除
	sendDDisable : false,//申报记录提交审批
	exportDDisable : false,//申报记录导出
	importDDisable : false,//申报记录历史计划与合同导入
//	申报计划权限
	addDpDisable : false,//申报计划新建
	updateDpDisable : false,//申报计划修改
	delDpDisable : false,//申报计划删除
	sendDpDisable : false,//申报计划审批
	submitDpDisable : false,//申报申报计划提交	
	newDpDisable : false,//申报计划生成
//	采购计划权限添加
	rollPDisable : false,//计划退回
	exportPDisable : false,//计划导出
	newPDisable : false,//生成采购计划
	submitCpDisable : false,//详细信息提交
	newCpDisable : false,//详细信息生成数据
//	采购合同权限添加
	importHDisable : false,//合同导入
	newTDisable : false,//合同生成台账
	confirmMDisable : false,//合同物资确认入库
	addHmDisable : false,//新增合同物资
	delHmDisable : false,//删除合同物资
//	申报明细权限添加
	addDdDisable : false,//申报明细新建
	updateDdDisable : false,//申报明细修改
	delDdDisable : false,//申报明细删除
	changeDdDisable : false,//申报明细变更
//	协议采购权限
	addVendorXyDisable: false,//协议指定供应商 
	sendXyDisable: false,//协议送审
	addXyContractDisable : false,//协议生成合同 
//	直接采购权限
	addVendorZjDisable: false,//协议指定供应商 
	sendZjDisable: false,//协议送审
	addZjContractDisable : false//协议生成合同 

};
//通过角色和业务类型获得流程ID
privilegeValidate.getFlowID = function(type){
	var url = "../seam/resource/approvalRoleServlet";
	var conn = synchronize.createXhrObject();
	conn.open('POST', url, false);
	conn.send(null);
	var value = Ext.util.JSON.decode(conn.responseText); 
	var roleName = value.result;  
//	if(roleName.indexOf("金属标准件计划员")!=-1 || roleName.indexOf("铝材计划员")!=-1 || roleName.indexOf("有色金属元素计划员")!=-1 ||
//		roleName.indexOf("有色金属制品计划员")!=-1 || roleName.indexOf("钢材计划员")!=-1 || roleName.indexOf("黑色金属元素计划员")!=-1 ||
//		roleName.indexOf("黑色金属制品计划员")!=-1 || roleName.indexOf("锻件计划员")!=-1 || roleName.indexOf("铸件计划员")!=-1 || roleName.indexOf("有色金属计划员")!=-1){
		if(type=="1")//采购清单
			return "477612";//477612
		else if(type=="2")//比价
			return "422704";
		else if(type=="3")//合同
			return "422707";
		else if(type=="4"){//协议采购
			return "492700";
		}else if(type=="5"){//其它采购(已废弃)改成直接采购
			return "492701";
		}else if(type=="6"){//招投标采购
			return "492701"
		}
//	}else
//		return "";
} 
privilegeValidate.privilegeValidate=function (addCode,updateCode,updateBCode,updateTCode,updateHCode,
		delCode,delBCode,delHCode,delTCode,queryCode,
		importCode,addVendorBCode,addVendorZCode,sendCCode,sendBCode,
		sendZCode,sendHCode,addBContractCode,addZContractCode,addDCode,
		delDCode,sendDCode,exportDCode,importDCode,addDpCode,
		updateDpCode,delDpCode,sendDpCode,submitDpCode,rollPCode,
		exportPCode,newPCode,importHCode,newTcode,confirmMCode,
		newDpCode,addHmCode,delHmCode,addDdCode,updateDdCode,
		delDdCode,changeDdCode,submitCpCode,newCpCode,addVendorXyCode,
		sendXyCode,addXyContractCode,addVendorZjCode,sendZjCode,addZjContractCode)
	{ 
		privilegeValidate.addCode  = addCode;//计划新建 
		privilegeValidate.updateCode = updateCode;//计划修改 
		privilegeValidate.updateBCode = updateBCode;//比价修改 
		privilegeValidate.updateTCode = updateTCode;//台账修改 
		privilegeValidate.updateHCode = updateHCode;//合同修改 
		privilegeValidate.delCode = delCode;//计划删除 
		privilegeValidate.delBCode = delBCode;//比价删除 
		privilegeValidate.delHCode = delHCode;//合同删除 
		privilegeValidate.delTCode = delTCode;//合同台帐删除  
		privilegeValidate.queryCode = queryCode;//查询 
		privilegeValidate.importCode = importCode;//导入 
		privilegeValidate.addVendorBCode = addVendorBCode;//比价指定供应商 
		privilegeValidate.addVendorZCode = addVendorZCode;//招标指定供应商
		privilegeValidate.sendCCode = sendCCode;//采购计划送审
		privilegeValidate.sendBCode = sendBCode;//比价送审
		privilegeValidate.sendZCode = sendZCode;//招标送审
		privilegeValidate.sendHCode = sendHCode;//合同送审
		privilegeValidate.addBContractCode = addBContractCode;//比价生成合同 
		privilegeValidate.addZContractCode = addZContractCode;//招标生成合同 
//		-------------------------------------------------------------------------
		privilegeValidate.addDCode = addDCode;//申报记录新建
		privilegeValidate.delDCode = delDCode,//申报记录删除
		privilegeValidate.sendDCode = sendDCode;//申报记录提交审批
		privilegeValidate.exportDCode = exportDCode;//申报记录导出
		privilegeValidate.importDCode = importDCode;//申报记录历史计划与合同导入
		privilegeValidate.addDpCode = addDpCode;//申报计划新建
		privilegeValidate.updateDpCode = updateDpCode,//申报计划修改
		privilegeValidate.delDpCode = delDpCode;//申报计划删除
		privilegeValidate.sendDpCode = sendDpCode;//申报计划审批
		privilegeValidate.submitDpCode = submitDpCode;//申报计划提交		
		privilegeValidate.rollPCode = rollPCode;//计划退回
		privilegeValidate.exportPCode = exportPCode;//计划导出
		privilegeValidate.newPCode = newPCode;//申报计划编辑
		privilegeValidate.importHCode = importHCode;//合同导入
		privilegeValidate.newTcode = newTcode;//合同生成台账
		privilegeValidate.confirmMCode = confirmMCode;//合同物资确认入库
		privilegeValidate.newDpCode = newDpCode;//申报计划生成
		privilegeValidate.addHmCode = addHmCode;//新增合同物资
		privilegeValidate.delHmCode = delHmCode;//删除合同物资
		privilegeValidate.addDdCode = addDdCode;//申报明细新建
		privilegeValidate.updateDdCode = updateDdCode;//申报明细修改
		privilegeValidate.delDdCode = delDdCode;//申报明细删除
		privilegeValidate.changeDdCode = changeDdCode;//申报明细变更
		privilegeValidate.submitCpCode = submitCpCode;//采购计划详细信息提交
		privilegeValidate.newCpCode = newCpCode;//采购计划详细信息生成数据
		privilegeValidate.addVendorXyCode = addVendorXyCode;//协议采购添加供应商
		privilegeValidate.sendXyCode = sendXyCode;//协议采购审批
		privilegeValidate.addXyContractCode = addXyContractCode;//协议采购生成合同
		privilegeValidate.addVendorZjCode = addVendorZjCode;//直接采购添加供应商
		privilegeValidate.sendZjCode = sendZjCode;//直接采购审批
		privilegeValidate.addZjContractCode = addZjContractCode;//直接采购生成合同
	}

privilegeValidate.check = function () { 
	var url = "../seam/resource/privilegeServlet";
	var conn = synchronize.createXhrObject();
	conn.open('POST', url, false);
	conn.send(null);
	
	var value = Ext.util.JSON.decode(conn.responseText);
	if (value.success){
			//privilegeValidate.addDisable=true;
		    //验证权限
			
				var res = value.result.split(',');
		    	for(var i=0;i<res.length;i++)
		    	{
		    	
		    		//修改按钮
		    		if(privilegeValidate.addCode==res[i])
		    		{
		    			privilegeValidate.addDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.updateCode==res[i])//计划修改 
		    		{ 
		    			privilegeValidate.updateDisable = true;
		    			continue;
		    		} 
		    		if(privilegeValidate.updateBCode==res[i])//比价修改 
		    		{
		    			privilegeValidate.updateBDisable = true;
		    			continue;
		    		}  
		    		if(privilegeValidate.updateTCode==res[i])//台账修改 
		    		{
		    			privilegeValidate.updateTDisable = true;
		    			continue;
		    		}   
		    		if(privilegeValidate.updateHCode==res[i])//合同修改 
		    		{
		    			privilegeValidate.updateHDisable = true;
		    			continue;
		    		}    
		    		if(privilegeValidate.delCode==res[i])//计划删除
		    		{
		    			privilegeValidate.delDisable = true;
		    			continue;
		    		}     
		    		if(privilegeValidate.delBCode==res[i])//比价删除 
		    		{
		    			privilegeValidate.delBDisable = true;
		    			continue;
		    		}     
		    		if(privilegeValidate.delHCode==res[i])//合同删除 
		    		{
		    			privilegeValidate.delHDisable = true;
		    			continue;
		    		}      
		    		if(privilegeValidate.delTCode==res[i])//合同台帐删除
		    		{
		    			privilegeValidate.delTDisable = true;
		    			continue;
		    		}   
		    		if(privilegeValidate.delTCode==res[i])//合同台帐删除
		    		{
		    			privilegeValidate.delTDisable = true;
		    			continue;
		    		}      
		    		if(privilegeValidate.queryCode==res[i])//查询 
		    		{
		    			privilegeValidate.queryDisable = true;
		    			continue;
		    		}     
		    		if(privilegeValidate.importCode==res[i])//导入 
		    		{
		    			privilegeValidate.importDisable = true;
		    			continue;
		    		}   
		    		if(privilegeValidate.addVendorBCode==res[i])//比价指定供应商 
		    		{
		    			privilegeValidate.addVendorBDisable = true;
		    			continue;
		    		}    
		    		if(privilegeValidate.addVendorZCode==res[i])//招标指定供应商 
		    		{
		    			privilegeValidate.addVendorZDisable = true;
		    			continue;
		    		}     
		    		if(privilegeValidate.sendCCode==res[i])//采购计划送审
		    		{
		    			privilegeValidate.sendCDisable = true;
		    			continue;
		    		}     
		    		if(privilegeValidate.sendBCode==res[i])//比价送审
		    		{
		    			privilegeValidate.sendBDisable = true;
		    			continue;
		    		}    
		    		if(privilegeValidate.sendZCode==res[i])//招标送审
		    		{
		    			privilegeValidate.sendZDisable = true;
		    			continue;
		    		}   
		    		if(privilegeValidate.sendHCode==res[i])//合同送审
		    		{
		    			privilegeValidate.sendHDisable = true;
		    			continue;
		    		}    
		    		if(privilegeValidate.addBContractCode==res[i])//比价生成合同 
		    		{
		    			privilegeValidate.addBContractDisable = true;
		    			continue;
		    		}     
		    		if(privilegeValidate.addZContractCode==res[i])//招标生成合同  
		    		{
		    			privilegeValidate.addZContractDisable = true;
		    			continue;
		    		}  
//-----------------------------------------------------------------------------------   addDCode,delDCode,sendDCode,exportDCode,importDCode
		    		if(privilegeValidate.addDCode==res[i])//申报记录新建  
		    		{
		    			privilegeValidate.addDDisable = true;
		    			continue;
		    		} 
		    		if(privilegeValidate.delDCode==res[i])//申报记录删除
		    		{
		    			privilegeValidate.delDDisable = true;
		    			continue;
		    		} 
		    		if(privilegeValidate.sendDCode==res[i])//申报记录审批 
		    		{
		    			privilegeValidate.sendDDisable = true;
		    			continue;
		    		} 
		    		if(privilegeValidate.exportDCode==res[i])//申报记录导出 
		    		{
		    			privilegeValidate.exportDDisable = true;
		    			continue;
		    		} 
		    		if(privilegeValidate.importDCode==res[i])//申报记录历史计划与合同导入  
		    		{
		    			privilegeValidate.importDDisable = true;
		    			continue;
		    		} 
		    		if(privilegeValidate.addDpCode==res[i])//申报计划新建  
		    		{
		    			privilegeValidate.addDpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.updateDpCode==res[i])//申报计划修改
		    		{
		    			privilegeValidate.updateDpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.delDpCode==res[i])//申报计划删除  
		    		{
		    			privilegeValidate.delDpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.sendDpCode==res[i])//申报计划审批  
		    		{
		    			privilegeValidate.sendDpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.submitDpCode==res[i])//申报计划提交  
		    		{
		    			privilegeValidate.submitDpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.rollPCode==res[i])//申报计划审批  
		    		{
		    			privilegeValidate.rollPDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.exportPCode==res[i])//申报计划提交  
		    		{
		    			privilegeValidate.exportPDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.newPCode==res[i])//生成采购计划
		    		{
		    			privilegeValidate.newPDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.importHCode==res[i])//合同导入
		    		{
		    			privilegeValidate.importHDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.newTcode==res[i])//合同生成台账
		    		{
		    			privilegeValidate.newTDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.confirmMCode==res[i])//合同物资确认入库
		    		{
		    			privilegeValidate.confirmMDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.newDpCode==res[i])//申报计划生成
		    		{
		    			privilegeValidate.newDpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.addHmCode==res[i])//合同新增物资
		    		{
		    			privilegeValidate.addHmDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.delHmCode==res[i])//合同删除物资
		    		{
		    			privilegeValidate.delHmDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.addDdCode==res[i])//申报明细新建
		    		{
		    			privilegeValidate.addDdDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.updateDdCode==res[i])//申报明细修改
		    		{
		    			privilegeValidate.updateDdDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.delDdCode==res[i])//申报明细删除
		    		{
		    			privilegeValidate.delDdDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.changeDdCode==res[i])//申报明细变更
		    		{
		    			privilegeValidate.changeDdDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.submitCpCode==res[i])//采购计划详细信息提交
		    		{
		    			privilegeValidate.submitCpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.newCpCode==res[i])//采购计划详细信息生成数据
		    		{
		    			privilegeValidate.newCpDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.addVendorXyCode==res[i])//协议采购添加供应商
		    		{
		    			privilegeValidate.addVendorXyDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.sendXyCode==res[i])//协议采购审批
		    		{
		    			privilegeValidate.sendXyDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.addXyContractCode==res[i])//协议采购生成合同
		    		{
		    			privilegeValidate.addXyContractDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.addVendorZjCode==res[i])//直接采购添加供应商
		    		{
		    			privilegeValidate.addVendorZjDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.sendZjCode==res[i])//直接采购审批
		    		{
		    			privilegeValidate.sendZjDisable = true;
		    			continue;
		    		}
		    		if(privilegeValidate.addZjContractCode==res[i])//直接采购生成合同
		    		{
		    			privilegeValidate.addZjContractDisable = true;
		    			continue;
		    		}
		    	}
		 
			return true;
	}else{
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam499')+'',
				msg: ''+"您没有此权限，请联系系统管理员"+'!',
				buttons: Ext.MessageBox.OK,
		   		icon: Ext.MessageBox.ERROR 
			});
			return false;
	}	
}


privilegeValidate.privileges=new Array();
/**
 * 公共权限检验
 * @param {} privilegeCode 权限ID
 * @return {Boolean} true有权限;false没权限
 */
privilegeValidate.checkPrivilege = function (privilegeCode) {
	var value={success:true};
	if (privilegeValidate.privileges.length == 0) {
		var conn = synchronize.createXhrObject();
		//conn.open中的参数false同步,true异步.
		conn.open('POST', "../seam/resource/privilegeServlet", false);
		conn.send(null);
		value = Ext.util.JSON.decode(conn.responseText);
		privilegeValidate.privileges = value.result.split(',');
	}
	if (value.success){
		var res = privilegeValidate.privileges;
		for (var i = 0; i < res.length; i++) {
			if (privilegeCode == res[i]) {
				return true;
			}
		}
		return false;
	}else{
		Ext.Msg.alert('提示','权限控制模块返回错误!')
		return false;
	}	
}







