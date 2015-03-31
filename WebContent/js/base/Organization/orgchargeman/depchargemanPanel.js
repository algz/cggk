/*
 * ! Ext JS Library 3.0.3 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
 //返回按钮代码具体实现
function back(instcode, name) {
	orgManage.leftPanel.getLayout().setActiveItem(0);
	window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''
			+ getResource('resourceParam699') + '';
}
depchargemanPanel = {
	grid : null
};
depchargemanPanel.init = function() {
	Ext.QuickTips.init();
	var record = Ext.data.Record.create([{
				name : 'chargemanname'
			}, {
				name : 'depname'
			}, {
				name : 'chargemanid'
			}, {
				name : 'loginname'
			}]);

	var url = "../JSON/organization_orgchargeman_OrgChargeManRemote.queryChargeManByDepid";
	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'GET'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'chargemanid'
			}, record);

	var store = new Ext.data.GroupingStore({
				proxy : proxy,
				reader : reader
			});
	depchargemanPanel.sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [depchargemanPanel.sm, {
				header : "" + getResource('resourceParam887') + "",
				width : 150,
				dataIndex : 'loginname'
			}, {
				header : "" + getResource('resourceParam878') + "",
				width : 150,
				dataIndex : 'chargemanname'
			}, {
				header : "" + getResource('resourceParam882') + "",
				width : 150,
				dataIndex : 'depname'
			}]
	});
	var tb = [{
		iconCls : 'priv-add',
		id : 'addchargeman',
		text : '' + getResource('resourceParam647') + '',
		handler : function() {
			userMultiselect.init(depchargemanPanel.selectUserCallback);
//			,
//					depchargemanPanel.grid.getStore(), "chargemanname"
		}
	}, {
		iconCls : 'priv-del',
		id : 'delchargeman',
		text : '' + getResource('resourceParam475') + '',
		disabled : true,
		handler : function() {
			Ext.MessageBox.confirm('警告！', '' + getResource('resourceParam636')
							+ '', function(btn, text) {
						if (btn == 'yes') {
							var ocmvo = Seam.Remoting
									.createType("com.luck.itumserv.base.organization.orgchargeman.OrgChargeManVo");
							ocmvo.setInstcode(orgManage.baseargs.instcode);
							var chargemanids = depchargemanPanel.grid
									.getSelectionModel().getSelections();
							var chargemanid = '';
							for (var i = 0, r; r = chargemanids[i]; i++) {
								chargemanid += r.get('chargemanid') + ",";
							}
							chargemanid = chargemanid.substring(0,
									chargemanid.length - 1);
							ocmvo.setChargemanids(chargemanid);
							Seam.Component
									.getInstance("organization_orgchargeman_OrgChargeManRemote")
									.deleteChargeManByDepid(ocmvo,
											depchargemanPanel.deleteYN);
						}
					})

		}
	},{
		iconCls : 'priv-add',
		id : 'backMain',
		text : '' + getResource('resourceParam944') + '',
		handler : function() {
			back(chargemanPanel.instcode, chargemanPanel.name)
		}
	}];
	depchargemanPanel.sm.on("selectionchange", function(selection) {
				if (selection.getSelections().length != 0) {
					Ext.getCmp("delchargeman").enable();
				} else {
					Ext.getCmp("delchargeman").disable();
				}
			})
	depchargemanPanel.grid = new Ext.grid.GridPanel({
				store : store,
				height : 500,
				region : 'center',
				cm : cm,
				sm : depchargemanPanel.sm,
				viewConfig: {
			        forceFit: true
			    },
				tbar : tb,
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')
									+ ""
						})
			});
	return depchargemanPanel.grid;
};
//删除部门负责人后执行的方法
depchargemanPanel.deleteYN = function(value) {
	if (value) {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam649') + "");
		depchargemanPanel.sm.clearSelections();
		myGrid.loadvalue(depchargemanPanel.grid.store, {
					start : 0,
					limit : 25
				}, orgManage.baseargs);
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam638') + '',
					msg : '' + getResource('resourceParam885') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}

//增加部门负责人的回调方法
depchargemanPanel.selectUserCallback = function() {
	var dataStore = userMultiselect.usersore;
	var toDataStore = depchargemanPanel.grid.getStore();
	var userids = '';
	var count = 0;
	for (i = 0; i < dataStore.getCount(); i++) {
		var userid = dataStore.getAt(i).get('userid');
		var truename = dataStore.getAt(i).get('truename');

		var record = dataStore.getAt(i);
		if (toDataStore.getById(userid) == null) {// 加入未被选择的用户
			if (!isRep(record)) {
				count++;
				// toDataStore.add(record);
				userids += record.get('userid') + ',';
			}
		}
	}
	if (count != 0) {
		userids = userids.substring(0, userids.length - 1);
		var ocmvo = Seam.Remoting
				.createType("com.luck.itumserv.base.organization.orgchargeman.OrgChargeManVo");
		ocmvo.setChargemanids(userids);
		ocmvo.setInstcode(orgManage.baseargs.instcode);
		Seam.Component
				.getInstance("organization_orgchargeman_OrgChargeManRemote")
				.addChargeManByDepid(ocmvo, depchargemanPanel.addYN);
	}
	function isRep(record) {
		for (var j = 0; j < toDataStore.getCount(); j++) {
			if (record.get('userid') == toDataStore.getAt(j).get("userid")) {
				return true;
			}
		}
		return false;
	}
}

//增加部门负责人后执行的方法
depchargemanPanel.addYN = function(value) {
	if (value) {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam1072') + "");
		depchargemanPanel.sm.clearSelections();
		myGrid.loadvalue(depchargemanPanel.grid.store, {
					start : 0,
					limit : 25
				}, orgManage.baseargs);
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : '' + getResource('resourceParam567') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
