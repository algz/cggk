var main ={
	IMPLEMENT : false,
	EXECUTE : false,
	CONTRACT : false,
	CHECK : false,
	PAYMENT :false,
	APPOINT : false,
	PLANER : false,
	MAINER : false,
	HEADER : false
}

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
		
		/**
 * 设备工程项目执行－－设备项目执行管理
 */
		Ext.onReady(function() {
					Ext.QuickTips.init();
					new Ext.Viewport({
						layout:'fit',
								items : [{
											xtype : 'tabpanel',
											activeItem:0,
											items : [new implementationPlan.mainGrid(),//实施计划
											new executiveManagement.mainGrid(),//执行管理
											new contractManagement.mainGrid(),//合同管理
											acceptTask.init(0,20,1),
											paymentTask.init(0,20,1)
											]
										}]
		
							})
				}, this);
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
