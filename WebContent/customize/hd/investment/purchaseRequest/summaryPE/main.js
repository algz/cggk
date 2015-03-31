var main ={
	tabs : null,
	leaderRole : false,//领导权限
	directorRole : false,//室主任权限 
	
	init : function(){
		Ext.QuickTips.init();
		main.tabs = new Ext.TabPanel({
			activeTab : 0,
			enableTabScroll:true,
			region: 'center',
//			[1].320厂工艺设备实施计划及资金需求计划(专项) 
//			[2].洪都航空固定资产投资计划土建项目明细表
//			[3].洪都航空固定资产投资设备项目计划表 
//			[4].洪都航空固定资产土建大修明细表(股份、集团)
//			[5].洪都公司固定资产设备大修明细表(股份、集团)
//			[6].洪都固定资产投资预算汇总表
			items : [
//			demandPlan320.getPanel(),
					civilDetails.getPanel(),
					equipPlan.getPanel(),
					civilRepair.getPanel(),
					equipRepair.getPanel(),
					stockSummary.getPanel()]
		
		});
		var viewPort = new Ext.Viewport({
			layout : 'fit',
			items : [main.tabs]
		});
	}
}
//先查询登陆用户
Ext.Ajax.request({
	url : '../JSON/untilsRemote.getRolesByUser?d='+new Date(),
	method : 'post',
	success : function(response, opts) {
		var obj = Ext.decode(response.responseText);
		main.leaderRole = check_roles(obj.data,"4664052");//领导角色
		main.directorRole = check_roles(obj.data,"4664301");//室主任角色
		Ext.onReady(main.init, main, true);
	}
});

function check_roles(roles,dep_role){
	for(var i=0;i<roles.length;i++){
		if(roles[i]==dep_role){
			return true;
		}
	}
	return false;
}
