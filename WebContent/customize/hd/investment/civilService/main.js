var main = {
	
	tabs : null,
	IMPLEMENT : false,
	EXECUTE : false,
	CONTRACT : false,
	CHECK : false,
	PAYMENT :false,
	APPOINT : false,
	PLANER : false,
	MAINER : false,
	HEADER : false,
	init : function(){
		Ext.QuickTips.init();
		main.tabs = new Ext.TabPanel({
			activeTab : 0,
			region: 'center',
			//[1].实施计划 [2].执行管理 [3].合同管理
			items : [civilServiceImplPlan.getPanel()
				,civilServiceExecute.getPanel()
				,civilServiceContract.getPanel(),
				paymentTask.init(0,20,4)]
		});
		var viewPort = new Ext.Viewport({
			layout : 'fit',
			items : [main.tabs]
		});
	}
};
//先查询登陆用户
Ext.Ajax.request({
	url : '../JSON/untilsRemote.getRolesByUser?d='+new Date(),
	method : 'post',
	success : function(response, opts) {
		var obj = Ext.decode(response.responseText);
		main.IMPLEMENT = !check_roles(obj.data,"4664053")//实施计划
		main.PLANER = check_roles(obj.data,"4666000")//计划员
		main.MAINER = check_roles(obj.data,"4664301")//室主任
		main.HEADER = check_roles(obj.data,"4664304")//业务主管
		
		if(main.PLANER || main.MAINER){
			main.APPOINT = false;
		}else{
			main.APPOINT = true;
		}
		if(main.HEADER){
			main.HEADER = false;
		}else{
			main.HEADER = true;
		}
		main.EXECUTE = !check_roles(obj.data,"4664054")//执行管理
		main.CONTRACT = !check_roles(obj.data,"4664055")//合同管理
		main.CHECK = !check_roles(obj.data,"4664056")//资产验收
		main.PAYMENT = !check_roles(obj.data,"4664057")//支付任务
		
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