var main ={
	tabs : null,
	leaderRole : false,
	directorRole:false,
	init : function(){
		Ext.QuickTips.init();
		main.tabs = new Ext.TabPanel({
			activeTab : 0,
			region: 'center',
			//[1].土建采购计划 [2].设备采购计划
			items : [civilPurchasePlan.getPanel(),equipPurchasePlan.getPanel(),
				civilRepairPlan.getPanel(),equipRepairPlan.getPanel()]
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
		main.leaderRole = check_roles(obj.data,"4664052")//领导角色
		main.directorRole=check_roles(obj.data,"4664301")//室主任角色
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
