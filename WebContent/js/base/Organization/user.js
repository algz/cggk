Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var user = {
	grid : null,
	colModel : null,
	ds : null,
	tb : null,
	baseargs : null,
	depid : null
};
// 生成列表
user.getColModel = function() {
	user.sm = new Ext.grid.CheckboxSelectionModel();
	user.colModel = new Ext.grid.ColumnModel([user.sm,
			// {
			// header : "用户ID",
			// width : 100,
			// dataIndex : 'userid'
			// },
			{
		header : "" + getResource('resourceParam887') + "",
		width : 80,
		dataIndex : 'loginname'
	}, {
		header : "" + getResource('resourceParam878') + "",
		width : 100,
		dataIndex : 'truename'
	}, {
		header : "" + getResource('resourceParam874') + "",
		width : 80,
		dataIndex : 'professional'
	}, {
		header : "" + getResource('resourceParam797') + "",
		width : 100,
		dataIndex : 'rolename'
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
				dataIndex : 'ginstitutename'
			}, {
				header : "" + getResource('resourceParam3018') + "",
				width : 70,
				dataIndex : 'securityDegreeName'
			}]);
};
user.getDataStore = function(id) {

	var url = "../JSON/base_user_UserSerivce.queryUser";// ByDepid

	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'GET'
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
				'-', {
					text : '' + getResource('resourceParam926') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam919') + '',
						text : '' + getResource('resourceParam913') + ''
					},
					handler : function() {
						user.baseargs = {
							depid:null,
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
						newUsersRole.getdialog(reslut);
					}
				}, '-', {
					text : '' + getResource('resourceParam835') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam835') + '',
						text : '' + getResource('resourceParam7058') + ''
					},
					handler : function() {
						var ids = user.useridall();
						if (ids == "false") {
							Ext.MessageBox.alert(''
											+ getResource('resourceParam508') + '',
									'' + getResource('resourceParam886') + '');
							return false;
						}
						if (ids == "admin") {
							Ext.MessageBox.alert(''
											+ getResource('resourceParam508') + '',
									'' + getResource('resourceParam7059') + '');
							return false;
						} else {
							userAddprivtree.getdialog(ids);
						}
	
					}
				}, '-', {
					text : '' + getResource('resourceParam7060') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam7060') + '',
						text : '' + getResource('resourceParam7061') + ''
					},
					handler : function() {
						user.baseargs = {
							sign : true,
							depid : user.depid
						}
						myGrid.loadvalue(user.grid.store, {
									start : 0,
									limit : 25
								}, user.baseargs);
						user.baseargs.sign = false;
						user.baseargs.depid = null;
					}
				}, '-'];
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
					text : '' + getResource('resourceParam925') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam925') + '',
						text : '' + getResource('resourceParam925') + ''
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
							depid:null,
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
					text : getResource('resourceParam7063'),// '分配部门',
					iconCls : 'user-password',
					tooltip : {
						title : getResource('resourceParam7063'),// '分配部门',
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
				}, '-', {
					text : '' + getResource('resourceParam7060') + '',
					iconCls : 'user-password',
					tooltip : {
						title : '' + getResource('resourceParam7060') + '',
						text : '' + getResource('resourceParam7061') + ''
					},
					handler : function() {
						user.baseargs = {
							sign : true,
							depid : user.depid
						}
						myGrid.loadvalue(user.grid.store, {
									start : 0,
									limit : 25
								}, user.baseargs);
						user.baseargs.sign = false;
						user.baseargs.depid = null;
					}
				}, '-'];		
	}
};
user.addgrid = function() {
	user.getColModel();
	user.getDataStore();
	user.gettb();
	// user.getpanel();

	// var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	user.colModel.defaultSortable = true;
	// user.grid = myGrid.init(user.ds,user.colModel,user.tb,sm);
	user.grid = myGrid.initBox(user.ds, user.colModel, user.tb, user.sm);
	user.loadvalue();
};

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

// user.getpanel = function() {
Ext.QuickTips.init();
user.panel = new Ext.Panel({ // 定义panel面板中显示的信息
	id : 'userpanel',
	region : 'east',
	minSize : 300,
	maxSize : 700,
	layout : 'fit',
	width : 530,
	// height : 540,
	split : true
		// ,
		// height : 540,
		// split : true

});
// };
user.loadvalue = function(id) {

	if (id == null || id == '') {
		user.panel.add(user.grid);
		user.panel.doLayout();
		myGrid.loadvalue(user.grid.store, {
					start : 0,
					limit : 25
				}, user.baseargs);
	} else {
		user.baseargs = {
			findloginname :null,
			findtruename : null,
			findinstcode : null,
			depid : id
		}
		myGrid.loadvalue(user.grid.store, {
					start : 0,
					limit : 25
				}, user.baseargs);
	}
};
