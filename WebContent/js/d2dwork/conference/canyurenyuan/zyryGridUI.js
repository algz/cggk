// 该类实现初始化参与人员界面功能
var zyryGridUI = {
	grid : null,
	ds : null
}
// 初始化表格
zyryGridUI.initGrid = function(flag) {
	var url = '../JSON/attendPeopleSvr.getList';
	zyryGridUI.ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : url,
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, [{
									name : 'userid'
								}, {
									name : 'depid'
								}, {
									name : 'depname'
								}, {
									name : 'username'
								}, {
									name : 'meetingid'
								}, {
									name : 'id'
								}, {
									name : 'flag'
								}]),
				sortInfo : {
					field : 'id',
					direction : 'ASC'
				}
			});
	// var sm = new Ext.grid.RowSelectionModel( {
	// singleSelect : true
	// });
	var sm = new Ext.grid.CheckboxSelectionModel({});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, {
			header : getResource('resourceParam942') + "", // 姓名
			dataIndex : 'username'
		}, {
			header : getResource('resourceParam685') + "",
			dataIndex : 'depname'
		}]
	});
	var tb = null;
	// chakanlx为2时为查看状态则不显示工具条
	if (flag != '2') {
		var tb = ['-', {
					text : getResource('resourceParam1206') + '',
					iconCls : 'news-add',
					handler : function() {
						// zyryadd.init(getResource('resourceParam1206') + '',
						// zyryGridUI.ds);
						userMultiselect.init(zyryGridUI.selectUserCallback);
						myGrid.postLoad(zyryGridUI.ds, zyryMain.baseargs);
					}
				}, '-', {
					text : getResource('resourceParam1207') + '',// 删除参会人员
					iconCls : 'news-delete',
					listeners : {
						'click' : function() {
							var sm = zyryGridUI.grid.getSelectionModel();
							var count = sm.getCount();
							if(count == 0 || zyryGridUI.grid.getSelectionModel().getSelections() == null){
								Ext.example
								.msg(
										getResource('resourceParam1724'),// 警告!
										getResource('resourceParam7124')+'')// 请至少选择一条信息进行操作
										return false;
							}
							var records = sm.getSelections();
							var ids = '';
							for (i = 0; i < count; i++) {
								if (i != count - 1) {
									ids += records[i].get('id') + ",";

								} else {
									ids += records[i].get('id');
								}
							}
							Ext.Msg.confirm(''
											+ getResource('resourceParam1724')
											+ '', // 警告
									""
											+ getResource('resourceParam475')
											+ "的" // 删除
											+ getResource('resourceParam474')
											+ "无法恢复，" // 数据
											+ getResource('resourceParam512')
											+ "" // 是
											+ getResource('resourceParam510')
											+ "继续?", function(btn) {
										if (btn == 'yes') {
											var uid = ids;
											Ext.Ajax.request({
												url : '../JSON/attendPeopleSvr.peopleDel?uid='
														+ uid,
												method : 'GET',
												disableCaching : true,
												autoAbort : true,
												success : function(response,
														options) {
													if (response.responseText == 'true') {
														Ext.example
																.msg(
																		getResource('resourceParam1724'),// 警告!
																		getResource('resourceParam637'))// 删除成功
														zyryGridUI.ds.reload();
													} else {
														Ext.example
																.msg(
																		getResource('resourceParam1724'),
																		getResource('resourceParam651'))// 操作失败!
													}
												}
											});
											zyryGridUI.ds.reload();
										}

									}).getDialog().setWidth(280);

						}
					}

					// handler : function() {
					// if (!zyryUtil.isNull(sm.getSelected()))
					// return;
					// zyryDel.init(zyryGridUI.ds, sm.getSelected());
					// }
				}];
	}
	zyryGridUI.grid = myGrid.initNobr(zyryGridUI.ds, cm, tb, sm, null);
	zyryGridUI.grid.autoScroll = true;
	return zyryGridUI.grid;
}

zyryGridUI.selectUserCallback = function() {
	var dataStore = userMultiselect.usersore;
	var toDataStore = zyryGridUI.grid.getStore();
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
		// var temp = zyryadd.getusers();
		userids = userids.substring(0, userids.length - 1);
		Seam.Component.getInstance("attendPeopleSvr").saveUsers(
				zyryMain.meetingid,userids, zyryadd.saveusers);
//		var ocmvo = Seam.Remoting
//				.createType("com.luck.itumserv.base.organization.orgchargeman.OrgChargeManVo");
//		ocmvo.setChargemanids(userids);
//		ocmvo.setInstcode(orgManage.baseargs.instcode);
//		Seam.Component
//				.getInstance("organization_orgchargeman_OrgChargeManRemote")
//				.addChargeManByDepid(ocmvo, depchargemanPanel.addYN);
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