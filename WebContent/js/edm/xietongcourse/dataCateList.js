var dataCateList = {
	grid : null,
	start : 0,
	checkrecord : null,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
}
dataCateList.init = function() {
	var strurl = '../JSON/datacenter_DataCenterRemote.getDataCateList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'categoryinstanceid', 'categoryinstancename',
					'categorytype', 'truename', 'departmentname', 'createtime',
					'description', 'version', 'revision']);
	var ascid = 'id';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners : {
			selectionchange : function(sm) {
				if (sm.getCount()) {
					// Ext.getCmp('delete').enable();
				} else {
					// Ext.getCmp('delete').disable();
				}
				if (sm.getCount() == 1) {
					var sm = dataCateList.grid.getSelectionModel();
					var count = sm.getCount();
					var records = sm.getSelections();
					var record;

					var opertationVo = Seam.Remoting
							.createType("com.luck.itumserv.base.privilege.OperationVo");
					opertationVo
							.setDataId(records[0].get('categoryinstanceid'));
					opertationVo.setIsPermitted(false);
					opertationVo.setIsRefused(false);
					opertationVo.setFlag(false);
					opertationVo.setCompulsory(false);
					callSeam("privilege_DataPrivilegeRemote",
							"getDataCenterDataManipultations", [opertationVo],
							function(result) {
								var obj = Ext.util.JSON.decode(result);
								if (obj.del == false) {
									Ext.getCmp('delcat').disable();
								}
							});

					for (var i = 0; i < count; i++) {
						record = records[i];
						dataCateList.checkrecord = record;
					}
					//
					// Ext.getCmp('update').enable();
				} else {
					// s Ext.getCmp('update').disable();
				}
			},
			rowselect : function(sm, rowIndex, record) {
				if (sm.getCount() == 1) {

				} else {
				}
			}
		}

	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : "" + getResource('resourceParam480') + "",
			dataIndex : 'categoryinstancename',
			width : 150,
			renderer : function(value, p, record) {
				return '<a href="javascript:void(0);" style="color:blue;text-decoration:underline;" onclick=window.parent.clickNode(\''
						+ record.get('categoryinstanceid')
						+ '\')>'
						+ value
						+ '</a>';
			}
		}, {
			header : "" + getResource('resourceParam1248') + "",
			dataIndex : 'truename',
			width : 300
		}, {
			header : "" + getResource('resourceParam1292') + "",
			dataIndex : 'departmentname',
			width : 300
		}, {
			header : "" + getResource('resourceParam981') + "",
			dataIndex : 'createtime',
			width : 300,
			renderer : function(value, p, record) {
				var dataTime = new Date(value.time.time);
				return dataTime.format('Y-m-d');
			}
		}, {
			header : "" + getResource('resourceParam648') + "",
			dataIndex : 'description',
			width : 300
		}]
	});
	var addmenu = new Ext.menu.Menu({
				id : 'addmenu',
				items : [{
							text : '' + getResource('resourceParam1725') + '',
							listeners : {
								'click' : function() {
									dateCateAddFri.init();
								}
							}
						}]

			});
	var tb = [{
		text : '' + getResource('resourceParam483') + '',
		id : 'addNew',
		iconCls : 'priv-add',
		menu : addmenu,
		listeners : {
			'afterrender' : function(btn) {
				var privVo = Seam.Remoting
						.createType("com.luck.itumserv.base.privilege.PrivVo");
				privVo.setPrivilegename("{'AddDataCenter':''}");
				callSeam("privilege_PrivilegeRemote", "getPagePrivileges",
						[privVo], function(result) {
							var obj = Ext.util.JSON.decode(result);
							if (obj.AddDataCenter == false) {
								btn.disable();
							}
						});
			}
		}

	}, '-',
			// {
			// text : '编辑',
			// id : 'updateNew',
			// iconCls : 'priv-add',
			// listeners : {
			// 'click' : function() {
			// dataInstanceUpdate.init(dataCateList.checkrecord
			// .get("categoryinstanceid"),
			// dataCateList.checkrecord
			// .get("categoryinstancename"),
			// dataCateList.checkrecord.get("description"),1);
			// }
			// }
			//
			// }, '-',
			{
				text : '' + getResource('resourceParam475') + '',
				id : 'delcat',
				iconCls : 'priv-add',
				listeners : {
					'click' : function() {
						var sm = dataCateList.grid.getSelectionModel();
						var count = sm.getCount();
						var records = sm.getSelections();
						var record;

						var idSequence = '';
						for (var i = 0; i < count; i++) {
							record = records[i];
							idSequence += record.get('categoryinstanceid')
									+ ',';

						}
						Ext.Msg.confirm('' + getResource('resourceParam1724')
										+ '', ""
										+ getResource('resourceParam1720')
										+ "?", function(btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
											url : '../JSON/datacenter_DataCenterRemote.delDataCateInstance',
											method : 'POST',
											success : function(response,
													options) {
												var obj = Ext.util.JSON
														.decode(response.responseText);
												if (obj.success == true) {
													window.parent
															.removenode(idSequence);
												} else {
													Ext.MessageBox.show({
														title : ''
																+ getResource('resourceParam1724')
																+ '',
														msg : ''
																+ getResource('resourceParam651')
																+ '',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													})

												}
												myGrid
														.loadvalue(
																dataCateList.grid.store,
																dataCateList.args,
																dataCateList.baseargs);
											},
											disableCaching : true,
											autoAbort : true,
											params : {
												idSequence : idSequence
											}
										});
									}
								});
					}
				}

			}, '-', {
				text : '' + getResource('resourceParam652') + '',
				id : 'querycat',
				iconCls : 'priv-add',
				listeners : {
					'click' : function() {
						// dataObjectAdd.init();
					}
				}

			}, '-', {
				text : '' + getResource('resourceParam582') + '',
				id : 'privcontrol',
				iconCls : 'priv-add',
				listeners : {
					'click' : function() {
						dataCenterLocation.init();
					}
				}

			}];
	dataCateList.grid = myGrid.init(ds, cm, tb, sm);
	myGrid.loadvalue(dataCateList.grid.store, dataCateList.args,
			dataCateList.baseargs);
	return dataCateList.grid;
}
