/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var registrationMain = {
user:{}
};


registrationMain.init = function(){
	Ext.QuickTips.init();
	
	
	var centerPanel = new Ext.TabPanel({
		id : 'registrationMainPanel',
		activeTab : 0,
		region: 'center',
		items :[registrationView.tabs()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'registrationMainViewPanel',
		layout : 'fit',
		items : centerPanel
	});

	viewport.doLayout();
};
Ext.Ajax.timeout=90000;
//先查询登陆用户
	Ext.Ajax.request({
				url : '../JSON/untilsRemote.getRolesByUser?d='+(Math.random()).toFixed(5),
				method : 'post',
				success : function(response, opts) {
					var obj = Ext.decode(response.responseText);
					registrationGrid.ckeck_instcode=check_roles(obj.data,"4651750")//入厂登记
					admissionTestGrid.ckeck_instcode=check_roles(obj.data,"4651751")//入厂检验
					Ext.onReady(registrationMain.init, registrationMain, true);
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