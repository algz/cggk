Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var user = {
	grid : null,
	colModel : null,
	ds : null,
	tb : null,
	baseargs : null
};
// 生成列表
user.getColModel = function() {
	Ext.QuickTips.init();
	user.sm = new Ext.grid.CheckboxSelectionModel();
	user.colModel = new Ext.grid.ColumnModel([user.sm,
			// {
			// header : "用户ID",
			// width : 100,
			// dataIndex : 'userid'
			// },
			{
		header : "" + getResource('resourceParam887') + "",
		width : 100,
		dataIndex : 'loginname',
		sortable : true
	}, {
		header : "" + getResource('resourceParam878') + "",
		width : 100,
		dataIndex : 'truename',
		sortable : true,
		/**
		 * bug编号1017 wangyf
		 * bug信息：在用户管理界面如果用户名称和职位的内容太长，建议鼠标放置时悬浮显示内容
		 * 2011-06-07 14：45
		 */
		renderer : function(v, p, record) {
			return '<div ext:qtip='+v+'>'+v+'</div>';
		}
	}, {
		header : "" + getResource('resourceParam874') + "",
		width : 100,
		dataIndex : 'professional',
		sortable : true,
		/**
		 * bug编号1017 wangyf
		 * bug信息：在用户管理界面如果用户名称和职位的内容太长，建议鼠标放置时悬浮显示内容
		 * 2011-06-07 14：45
		 */
		renderer : function(v, p, record) {
			return '<div ext:qtip='+v+'>'+v+'</div>';
		}
	}, {
		header : "" + getResource('resourceParam797') + "",
		width : 100,
		dataIndex : 'rolename',
		sortable : true
	},
			// {
			// header: "性别",
			// width: 100,
			// dataIndex: 'strsex'} ,
			// {
			// header: "用户状态",
			// width: 100,
			// dataIndex: 'straccountstate'} ,
			{
				header : "" + getResource('resourceParam882') + "",
				width : 100,
				dataIndex : 'ginstitutename',
				sortable : true
			}, {
				header : getResource('resourceParam3018'),// "用户密级",
				width : 100,
				dataIndex : 'securityDegreeName',
				sortable : true
			}]);
};
//得到存储数据
user.getDataStore = function() {
	var url = "../JSON/base_user_UserSerivce.getGrid";
	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'userid'
			}, ['userid', 'loginname', 'truename', 'strsex', 'sex',
					'accountstate', 'straccountstate', 'instcode',
					'ginstitutename', 'password', 'age', 'address', 'postcode',
					'tel1', 'tel2', 'judgeman', 'viewLevel', 'rolename',
					'logLevel', 'professional', 'securityDegreeName',
					'securityDegree', 'email']);
	var ascid = 'userid';
	var ascstr = 'desc';
	user.ds = new data.Store(proxy, reader, ascid, ascstr);
	user.ds.on('datachanged', function(ds) {
				if (finduser.sel && ds.getCount() == 0) {
					Ext.MessageBox.alert('' + getResource('resourceParam508')
									+ '', "" + getResource('resourceParam765')
									+ "");
				}
			});
};
user.gettb = function() {
	if(window.parent.Index.user.getUserid()==1)
	{
		user.tb = ['-', {
					text : '' + getResource('resourceParam923') + '',
					iconCls : 'user-select',
					tooltip : {
						title : '' + getResource('resourceParam923') + '',
						text : '' + getResource('resourceParam7065') + ''
					},
					handler : finduser.findeuser
				},
				 {
					text : '' + getResource('resourceParam926') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam919') + '',
						text : '' + getResource('resourceParam913') + ''
					},
					handler : function() {
						user.baseargs = {
							findloginname : null,
							findtruename : null,
							findinstcode : null
						}
						user.sm.clearSelections();
						myGrid.loadvalue(user.grid.store, {
									start : 0,
									limit : 25
								}, user.baseargs);
	
					}
				}, '-', {
					text : '' + getResource('resourceParam924') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam924') + '',
						text : '' + getResource('resourceParam915') + ''
					},
					handler : function() {
						var reslut = user.useridall();
						if (reslut == "false") { // 如未选中任何一行，则不执行操作
							Ext.MessageBox.alert(''
											+ getResource('resourceParam508') + '',
									'' + getResource('resourceParam912') + '');
							return false;
						}
						if (reslut == "admin") {
							Ext.MessageBox.alert(''
											+ getResource('resourceParam508') + '',
									'' + getResource('resourceParam911') + '');
							return false;
						}
						if (reslut.length > 1) {
							newUsersRole.getdialog(reslut);
						}
						if (reslut.length == 1) {
							updatarole.getdialog();
						}
					}
				}, '-', {
				text : '指定物资种类',
				tooltip : {
					title : '指定物资种类',
					text : '为选定的用户指定物资种类'
				},
				iconCls : 'role-addpriv',
				handler : function() {
					var reslut = user.useridall();
					if (reslut == "false" || reslut.length>1) { // 如未选中任何一行，则不执行操作
						Ext.MessageBox.show({
							title : '' + getResource('resourceParam663') + '',
							msg : '请选择一条用户信息！',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
						return false;
					}
					var window = user.setMaterialCatalog();
					window.show();
				}
			},{
				text : '用户导入',
				iconCls : 'user-select',
				tooltip : {
					title : '' + getResource('resourceParam923') + '',
					text : '' + getResource('resourceParam7065') + ''
				},
				handler : importUser.importuser
			
			}
				];
			}else if(window.parent.Index.user.getUserid()==2)
			{
						user.tb = ['-', {
					text : '' + getResource('resourceParam920') + '',
					iconCls : 'user-add',
					tooltip : {
						title : '' + getResource('resourceParam920') + '',
						text : '' + getResource('resourceParam916') + ''
					},
					handler : adduser.adduser
				}, '-', {
					text : '' + getResource('resourceParam921') + '',
					iconCls : 'user-edit',
					tooltip : {
						title : '' + getResource('resourceParam921') + '',
						text : '' + getResource('resourceParam917') + ''
					},
					handler : updatauser.updatauser
				}, '-', {
					text : '' + getResource('resourceParam922') + '',
					iconCls : 'user-del',
					tooltip : {
						title : '' + getResource('resourceParam922') + '',
						text : '' + getResource('resourceParam7066') + ''
					},
					handler : deleteuser.deleteuser
				}, '-', {
					text : '' + getResource('resourceParam923') + '',
					iconCls : 'user-select',
					tooltip : {
						title : '' + getResource('resourceParam923') + '',
						text : '' + getResource('resourceParam7065') + ''
					},
					handler : finduser.findeuser
				},
				{
					text : '' + getResource('resourceParam780') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam780') + '',
						text : '' + getResource('resourceParam780') + ''
					},
					handler : updatapassword.updatapassword
				}, '-', {
					text : '' + getResource('resourceParam926') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam919') + '',
						text : '' + getResource('resourceParam913') + ''
					},
					handler : function() {
						user.baseargs = {
							findloginname : null,
							findtruename : null,
							findinstcode : null
						}
						user.sm.clearSelections();
						myGrid.loadvalue(user.grid.store, {
									start : 0,
									limit : 25
								}, user.baseargs);
	
					}
				}, '-', {
					text : getResource('resourceParam7063'),// '多个用户分配部门',
					iconCls : 'user-password',
					tooltip : {
						title : getResource('resourceParam7063'),// '多个用户分配部门',
						text : getResource('resourceParam3005')
						// '多个用户分配部门'
					},
					handler : function() {
						var result = user.useridall();
						if (result == "false") { // 如未选中任何一行，则不执行操作
							Ext.MessageBox.alert(''
											+ getResource('resourceParam508') + '',
									'' + getResource('resourceParam912') + '');
							return false;
						}
						if (result == "admin") {
							Ext.MessageBox
									.alert(	'' + getResource('resourceParam508')
													+ '',
											getResource('resourceParam3004')/* '不能为系统管理员分配部门' */);
							return false;
						}
						userUpdateOrg.getOrgGrid(result);
					}
				}, '-',
				{
					text : '用户更新',
					iconCls : 'user-add',
					tooltip : {
						title : '用户更新',
						text : '用户更新'
					}, 
					 handler:function(){
						user.HrInUser()
					 } 
				
				},'-',
				{
					text : '导入用户',
					menu : new Ext.menu.Menu({
						style : {
							overflow : 'visible'
						},
						items : [{
							text : '下载模板文件',
							handler : function() {
								 window.location.href="../downloadImportUserTemple.download";
							}
						},{
							id : 'importOfficeId',
							text :  '导入用户信息',
							handler : importUser.importuser
						}]
					})
				},{
				xtype : 'tbfill'
				}
				];
			}
};
user.HrInUser = function(){
	Ext.Ajax.request( {
		url : '../JSON/hrInUserRemote.importUser?d=' + new Date(),
		method : 'POST', 
		success : function(response,options) { 
			Ext.Msg.alert('提示',"导入成功");
			user.grid.store.reload();
		},
		failure : function() {
			Ext.Msg.alert('提示',"服务器正忙");
		}
	});
}

/**
 * 为所选角色指定物资类别
 */
user.setMaterialCatalog = function(){
		
	var buttons = [{
		text : ' 确定 ',
		handler : function(){
			var msg;
			if(materialCatalogTree.catalogIDs.length <= 1 
				&& materialCatalogTree.uncheckedCatalogIDs.length <= 1 ){
				Ext.Msg.alert('提示', '未选择任何叶节点，不能进行操作！');
				return false;
			}
			var result = user.useridall();
			if (result == "false") { // 如未选中任何一行，则不执行操作
							Ext.MessageBox.alert(''
											+ getResource('resourceParam508') + '',
									'' + getResource('resourceParam912') + '');
							return false;
			}else
			if (result == "admin") {
				Ext.MessageBox.alert('' + getResource('resourceParam508') + '',
						getResource('resourceParam3004')/* '不能为系统管理员分配部门' */);
				return false;
			}else if (result.length>1) { // 如未选中多行，则不执行操作
							Ext.MessageBox.alert('提示',
									'请选择一条数据！');
							return false;
			}
			var materialCatalogRemote = Seam.Component.getInstance("materialCatalogRemote");
			materialCatalogRemote.setMaterialCatalogUser(
				materialCatalogTree.catalogIDs,
				materialCatalogTree.uncheckedCatalogIDs,
				result[0], 
				function(result) {
					var success = Ext.util.JSON.decode(result).success;
					if(success){
						Ext.Msg.alert('提示', '设置成功！');
					}else{
						Ext.Msg.alert('提示', '设置失败！');
					}					
			});
			window.close();
		}		
	}, {
		text : '取消',
		handler : function() {
			window.close();
		}
	}]
	
	var window = new Ext.Window({
		id : 'setMaterialCatalogWindow',
		width : 200,
		height : 400,
		autoScroll : true, 
		layout: 'fit',
		title : '&nbsp;指定物资类别',
		modal : true,
		items : materialCatalogTree.init(),
		buttons : buttons
	});
	
	return window;
}
//创建面板并加载
user.addgrid = function() {
	user.getColModel();
	user.getDataStore();
	user.gettb();
	user.getpanel();

	// var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	user.colModel.defaultSortable = true;
	// user.grid = myGrid.init(user.ds,user.colModel,user.tb,sm);
	user.grid = myGrid.initBox(user.ds, user.colModel, user.tb, user.sm);
	user.loadvalue();
};
//获取选取的复选框数据
user.useridall = function() {
	var result = new Array();
	var count = 0;
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return "false";
		}
		for (var i = 0; i < size; i++) {
			result[i] = myGrid.rows[i].id;
			if (result[i] == 1) {
				count = 1;
				break;
			}
		}
		if (count == 1) {
			return "admin";
		}
		return result;
	}
	return "false";
}
//得到用户面板
user.getpanel = function() {
	Ext.QuickTips.init();
	user.panel = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'userpanel',
		region : 'center',
		layout : 'fit',
		// height : 540,
		split : true,
		margins : '0 5 5 0'
	});
};
//为user panel加载数据
user.loadvalue = function() {
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [user.panel]

	});
	
	myGrid.rows = null;
	user.panel.add(user.grid);
	user.panel.doLayout();
	myGrid.loadvalue(user.grid.store, {
				start : 0,
				limit : 25
			}, user.baseargs);
};
Ext.onReady(user.addgrid, user, true);
