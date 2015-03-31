var selectedUserAndRole = {
	url : '../JSON/privilege_DataPrivilegeRemote.getDataPrivilegeVoList',
	baseargs : {
		privileged : true,
		mutiFirst : setDataPrivilege.mutiFirst
	}
}
// 针对某个条数据，指定哪些用户和角色
selectedUserAndRole.init = function() {
	Ext.grid.CheckboxSelectionModel.prototype.header = '<div id="hd-joe" class="x-grid3-hd-checker">&#160;</div>';
	var strurl = selectedUserAndRole.url + '?a=' + new Date();

	selectedUserAndRole.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'GET'
			});
	selectedUserAndRole.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				messageProperty : 'msg',
				id : 'dataPrivilegeID'
			}, ['dataPrivilegeID', 'dataID', 'dataType', 'operatorID',
					'operatorType', 'privilege', 'dataDetail', 'operatorName',
					'operatorTypeName', 'dataTypeName']);

	selectedUserAndRole.ds = new Ext.data.Store({
				proxy : selectedUserAndRole.proxy,
				reader : selectedUserAndRole.reader
			});
	selectedUserAndRole.ds.on('load', function(store) {
				if (store.reader.jsonData.msg != '') {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam499')
										+ '',
								msg : store.reader.jsonData.msg,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				};
				if (Ext.get('hd-joe')) {
					if (Ext.get('hd-joe')) {
						if (Ext.fly(Ext.get('hd-joe').dom.parentNode)
								.hasClass('x-grid3-hd-checker-on')) {
							Ext.fly(Ext.get('hd-joe').dom.parentNode)
									.removeClass('x-grid3-hd-checker-on');
						}
					}
				}
			})
	var addUserBt = {
		text : '' + getResource('resourceParam588') + '',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			userMultiselect.init(selectedUserAndRole.selectUserCallback,
					selectedUserAndRole.grid.getStore(), "operatorName");
			// chooseUserView.init(selectedUserAndRole.selectUserCallback);
		}
	};
	var addRoleBt = {
		text : '' + getResource('resourceParam589') + '',
		iconCls : 'add1',
		handler : function() {
			checkRole.init(selectedUserAndRole.selectRoleCallback,
					setDataPrivilege.mainpanel.dataId,
					setDataPrivilege.mainpanel.dataType);
			// chooseRoleView.init(selectedUserAndRole.selectRoleCallback);
		}
	};
	var delBt = {
		text : '' + getResource('resourceParam475') + '',
		iconCls : 'del1',
		handler : selectedUserAndRole.deleteOperator
	};

	var tb = ['-', addUserBt, '-', addRoleBt, '-', delBt, '-'];
	selectedUserAndRole.setcm1();
	selectedUserAndRole.cm.defaultSortable = false;
	selectedUserAndRole.cm.menuDisabled = true;
	selectedUserAndRole.grid = myGrid.initBox(selectedUserAndRole.ds,
			selectedUserAndRole.cm, tb, selectedUserAndRole.sm);

	// 相应行单击事件，刷新权限界面
	selectedUserAndRole.grid.on('rowclick', function(thisgrid) {
				// if (thisgrid.selModel.getSelected() != null) {
				// var dataPrivilegeID = thisgrid.selModel.getSelected()
				// .get('dataPrivilegeID');
				// alert(dataPrivilegeID);
				// dataPrivilege.refreshGrid(dataPrivilegeID);
				// }
			});

	selectedUserAndRole.listpanel = new Ext.Panel({
				region : 'center',
				title : '' + getResource('resourceParam586') + '',
				id : 'selectedUserAndRoleListpanel',
				layout : 'fit',
				resizable : true,
				autoScroll : 'true',
				split : true,
				items : [selectedUserAndRole.grid],
				listeners : {
					bodyresize : function(panel, width, height) {
						// if (height < 150) {
						// panel.setHeight(150);
						// }
					},
					afterrender : function() {
					}
				}
			});

	myGrid.loadvalue(selectedUserAndRole.grid.store, {
				start : 0,
				limit : 25
			}, selectedUserAndRole.baseargs);
	return selectedUserAndRole.listpanel;

}
// 选择用户以后的回调函数
selectedUserAndRole.selectUserCallback = function() {
	var dataStore = userMultiselect.usersore;
	var idObj = new Object();
	idObj['privileged'] = selectedUserAndRole.baseargs.privileged;
	idObj['mutiFirst'] = setDataPrivilege.mutiFirst;
	idObj['dataid'] = setDataPrivilege.mainpanel.dataId;
	idObj['datatype'] = setDataPrivilege.mainpanel.dataType;
	for (i = 0; i < dataStore.getCount(); i++) {
		var userid = dataStore.getAt(i).get('userid');
		idObj[userid] = userid;
	}
	// 保存到数据库，已经存在的用户不加入
	var strValue = Ext.util.JSON.encode(idObj);
	callSeam("privilege_DataPrivilegeRemote", "addDataPrivilegeUsers",
			[strValue], function(result) {
				var obj = Ext.util.JSON.decode(result);
				setDataPrivilege.mutiFirst = obj.mutiFirst;
				if (obj.success) {
					selectedUserAndRole.refreshGrid();
				} else {
					selectedUserAndRole.refreshGrid();
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam499')
										+ '',
								msg : obj.message,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			});

}
// 选择角色以后的回调函数
selectedUserAndRole.selectRoleCallback = function() {
	var dataStore = checkRole.rolecheck;
	var idObj = new Object();
	idObj['privileged'] = selectedUserAndRole.baseargs.privileged;
	idObj['mutiFirst'] = setDataPrivilege.mutiFirst;
	idObj['dataid'] = setDataPrivilege.mainpanel.dataId;
	idObj['datatype'] = setDataPrivilege.mainpanel.dataType;
	for (i = 0; i < dataStore.getCount(); i++) {
		var roleid = dataStore.getAt(i).get('roleid');
		idObj[roleid] = roleid;
	}
	// 保存到数据库，已经存在的角色不加入
	var strValue = Ext.util.JSON.encode(idObj);
	callSeam("privilege_DataPrivilegeRemote", "addDataPrivilegeRoles",
			[strValue], function(result) {
				var obj = Ext.util.JSON.decode(result);
				setDataPrivilege.mutiFirst = obj.mutiFirst;
				if (obj.success) {
					selectedUserAndRole.refreshGrid();
				} else {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam499')
										+ '',
								msg : obj.message,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}

			});
}

selectedUserAndRole.setcm1 = function() {
	selectedUserAndRole.sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {

					},
					rowselect : function(sm, rowIndex, record) {
						if (selectedUserAndRole.ds.getCount() == sm.getCount()) {
							if (Ext.get('hd-joe')) {
								Ext.fly(Ext.get('hd-joe').dom.parentNode)
										.addClass('x-grid3-hd-checker-on');
							}
						} else {
							if (Ext.get('hd-joe')) {
								Ext.fly(Ext.get('hd-joe').dom.parentNode)
										.removeClass('x-grid3-hd-checker-on');
							}
						}
						if (sm.getCount() == 0) {
							dataPrivilege.flag = false;
							dataPrivilege.refreshNullGrid();

						} else if (sm.getCount() == 1) {
							var dataPrivilegeID = sm.getSelected()
									.get('dataPrivilegeID');
							dataPrivilege.flag = false;
							dataPrivilege.refreshGrid(dataPrivilegeID);

						} else if (sm.getCount() > 1) {
							var dataPrivilegeID = sm.getSelected()
									.get('dataPrivilegeID');
							dataPrivilege.flag = true;// 当check多个数据权限修改时，
							dataPrivilege.refreshGrid(dataPrivilegeID, 0);
						}
					}
				}
			});
	selectedUserAndRole.cm = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(), selectedUserAndRole.sm, {
				header : "" + getResource('resourceParam480') + "",
				width : 80,
				dataIndex : 'operatorName'
			}, {
				header : "" + getResource('resourceParam481') + "",
				width : 40,
				dataIndex : 'operatorTypeName'
			}]);
}
// 删除操作者
selectedUserAndRole.deleteOperator = function() {
	var result = new Array();
	myGrid.rows = selectedUserAndRole.sm.getSelections();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',
						msg : '' + getResource('resourceParam584') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}
		Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
						+ getResource('resourceParam585') + "", function(btn) {
					if (btn == 'yes') {
						for (var i = 0; i < size; i++) {
							result[i] = myGrid.rows[i].get('dataPrivilegeID');
						}
						var idObj = new Object();
						idObj['result'] = result;
						idObj['privileged'] = selectedUserAndRole.baseargs.privileged;
						idObj['mutiFirst'] = setDataPrivilege.mutiFirst;
						idObj['dataid'] = setDataPrivilege.mainpanel.dataId;
						idObj['datatype'] = setDataPrivilege.mainpanel.dataType;
						var strValue = Ext.util.JSON.encode(idObj);
						callSeam("privilege_DataPrivilegeRemote",
								"deleteDataPrivileges", [strValue],
								selectedUserAndRole.deleteResult);
					}
				});
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',
					msg : '' + getResource('resourceParam584') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}

selectedUserAndRole.deleteResult = function(result) {
	var obj = Ext.util.JSON.decode(result);
	setDataPrivilege.mutiFirst = obj.mutiFirst;
	if (obj.success) {// 删除成功以后无需提示
		selectedUserAndRole.refreshGrid();// 刷新操作者grid
		dataPrivilege.refreshNullGrid();// 权限grid刷为空
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam499') + '',
					msg : obj.message,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}

selectedUserAndRole.refreshGrid = function() {// 刷新操作者grid，刷新当前页
	// 需要加入分页
	var proxy = new Ext.data.HttpProxy({
				url : selectedUserAndRole.url + '?dataID='
						+ setDataPrivilege.mainpanel.dataId + '&dataType='
						+ setDataPrivilege.mainpanel.dataType + '&a='
						+ new Date()
			});
	selectedUserAndRole.grid.getStore().proxy = proxy;
	var lastOptions = selectedUserAndRole.grid.store.lastOptions;
	var pageStart = 0;
	var pageLimit = 25;
	if (lastOptions && lastOptions.params) {// 设置刷新当前页
		pageStart = lastOptions.params.start;
		pageLimit = lastOptions.params.limit;
	}
	selectedUserAndRole.baseargs.mutiFirst=setDataPrivilege.mutiFirst;
	myGrid.loadvalue(selectedUserAndRole.grid.store, {
				start : pageStart,
				limit : pageLimit
			}, selectedUserAndRole.baseargs);
}
