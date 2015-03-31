Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var qualityTemplateMainPanel = {
	modelEdit : true
}

qualityTemplateMainPanel.init = function() {
	Ext.QuickTips.init();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), sm, {
			//header : ''+getResource('resourceParam1139')+'',
			header : '质量表模板',
			dataIndex : 'datatypeName',
			renderer : function(value, p, r) {
				return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
						+ value + '</a>'
			},
			editor : new Ext.form.TextField({
						allowBlank : false,
						validator : function(value) {
							if (Ext.util.Format.trim(value).length == 0) {
								this.invalidText = ""+getResource('resourceParam1089')+"";
								return false;
							}
							if (value.length > 50) {
								this.invalidText = ''+getResource('resourceParam1271')+'';
								return false;
							}
							var reg = /^.*[/\\:\*\?\"<>\|]+.*$/;
							if (reg.test(value)) {
								this.invalidText = ""+getResource('resourceParam1087')+"";
								return false;
							} else {
								return true;
							}
						}
					})
		}]
	})
	qualityTemplateMainPanel.ds = new Ext.data.JsonStore({
				url : '../JSON/qualityMgm_qualityTemplate.getDataTypeList?datatypeRank=6',
				method : 'GET',
				fields : [{
							name : 'datatypeName',
							mapping : 'datatypeName',
							type : 'string'
						}, {
							name : 'datatype',
							mapping : 'datatype',
							type : 'string'
						}, {
							name : 'basetypeName',
							mapping : 'basetypeName',
							type : 'string'
						}, {
							name : 'datatypeId',
							mapping : 'datatypeId',
							type : 'string'
						}, {
							name : 'datatypeDiscription',
							mapping : 'datatypeDiscription',
							type : 'string'
						}]
			})

	qualityTemplateMainPanel.grid = new Ext.grid.EditorGridPanel({
				store : qualityTemplateMainPanel.ds,
				cm : cm,
				sm : sm,
				clicksToEdit : 2,
				viewConfig : {
					forceFit : true
				}
			})
	var physicsTypeColumnTree = physicTypeTreeGridPanel.init(0);
	var mainPanel = new Ext.Panel({
		layout : 'fit',
		region : 'west',
		width : 300,
		tbar : [{
					text : ''+getResource('resourceParam483')+'',
					iconCls : 'add1',
					id : 'physicsTypeGridPanelAdd',
					handler : function() {
						var Plant = qualityTemplateMainPanel.grid.getStore().recordType;
						var p = new Plant({
									//datatypeName : ''+getResource('resourceParam1278')+'',
									datatypeName : '新建质量表模板',
									basetypeName : ''+getResource('resourceParam1079')+'',
									datatype : 'string',
									datatypeDiscription : ''
								});
						qualityTemplateMainPanel.grid.stopEditing();
						p.markDirty()
						qualityTemplateMainPanel.ds.insert(
								qualityTemplateMainPanel.ds.getCount(), p);
						sm.selectLastRow();
					}

				}, {
					text : ''+getResource('resourceParam475')+'',
					iconCls : 'del1',
					id : 'physicsTypeGridPanelDel',
					disabled : true,
					handler : function() {
						if (sm.getSelections().length > 0) {
							Ext.MessageBox.confirm(''+getResource('resourceParam596')+'', ''+getResource('resourceParam1274')+'?', function(
									btn) {
								if (btn == 'yes') {
									var DataTypeVos = Seam.Remoting
											.createType("com.sysware.customize.cac.tc.qualityMgm.QualityTemplateVo");
									var list = new Array();
									var list1 = new Array();
									for (var i = 0; i < sm.getSelections().length; i++) {
										if (sm.getSelections()[i]
												.get("datatypeId") != undefined) {
											var DataTypeVo = Seam.Remoting
													.createType("com.sysware.customize.cac.tc.qualityMgm.QualityTemplateVo");
											DataTypeVo.setDatatypeId(sm
													.getSelections()[i]
													.get("datatypeId"))
											list.push(DataTypeVo);
										} else {
											list1.push(sm.getSelections()[i]);
										}
									}
									if (list.length > 0) {
										DataTypeVos.setDataTypeVoList(list);
										Seam.Component
												.getInstance("qualityMgm_qualityTemplate")
												.delDataType(DataTypeVos,
														function(result) {
															if (result === "[true]") {
																qualityTemplateMainPanel.ds
																		.clearModified();
																Ext
																		.getCmp("physicsTypeGridPanelDel")
																		.disable();
																qualityTemplateMainPanel.ds
																		.reload(
																				{
																					'callback' : function() {
																						sm
																								.selectFirstRow();
																						Ext.example
																								.msg(
																										""+getResource('resourceParam575')+"",
																										""+getResource('resourceParam1275')+"");
																					}
																				});
															} else {
																Ext.MessageBox
																		.show({
																			title : ''+getResource('resourceParam638')+'',
																			msg : ''+getResource('resourceParam1273')+'!',
																			buttons : Ext.MessageBox.OK,
																			icon : Ext.MessageBox.ERROR
																		});
															}
														});
									}
									for (var j = 0; j < list1.length; j++) {
										qualityTemplateMainPanel.ds.remove(list1[j])
									}

								}
							});
						} else {
							Ext.MessageBox.show({
										title : ""+getResource('resourceParam575')+"",
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR,
										msg : ""+getResource('resourceParam1277')+""
									})
						}
					}
				}, {
					text : '保存',
					iconCls : 'save1',
					id : 'physicsTypeGridPanelSave',
					disabled : true,
					handler : function() {
						var addlist = new Array();
						qualityTemplateMainPanel.ds.findBy(function(record, id) {
									if (record.get("datatypeId") === undefined) {
										addlist.push(record)
									}
								}, qualityTemplateMainPanel.ds)
						var DataTypeVos = Seam.Remoting
								.createType("com.sysware.customize.cac.tc.qualityMgm.QualityTemplateVo");
						var list = new Array();
						for (var i = 0; i < qualityTemplateMainPanel.ds
								.getModifiedRecords().length; i++) {
							var DataTypeVo = Seam.Remoting
									.createType("com.sysware.customize.cac.tc.qualityMgm.QualityTemplateVo");
							if (qualityTemplateMainPanel.ds.getModifiedRecords()[i]
									.get("datatypeId") !== undefined) {
								DataTypeVo.setDatatype("dataset")
								DataTypeVo.setDatatypeName(qualityTemplateMainPanel.ds
										.getModifiedRecords()[i]
										.get("datatypeName"))
								DataTypeVo.setDatatypeId(qualityTemplateMainPanel.ds
										.getModifiedRecords()[i]
										.get("datatypeId"))
								DataTypeVo.setDatatypeRank(6);
								list.push(DataTypeVo);
							}
						}
						for (var j = 0; j < addlist.length; j++) {
							var DataTypeVo = Seam.Remoting
									.createType("com.sysware.customize.cac.tc.qualityMgm.QualityTemplateVo");
							DataTypeVo.setDatatype("dataset")
							DataTypeVo.setDatatypeName(addlist[j]
									.get("datatypeName"))
							DataTypeVo.setDatatypeRank(6);
							list.push(DataTypeVo);
						}
						if(list.length < 1){
							return false;
						}
						DataTypeVos.setDataTypeVoList(list);
						Seam.Component.getInstance("qualityMgm_qualityTemplate")
								.insertOrUpdateDataTypes(DataTypeVos,
										function(result) {
											if (result === '[true]') {
												qualityTemplateMainPanel.ds.reload();
												qualityTemplateMainPanel.ds
														.clearModified();
												qualityTemplateMainPanel.ds.modified = [];
												Ext.example.msg(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1072')+"");
											} else {
												Ext.MessageBox.show({
													title : ''+getResource('resourceParam651')+'',
													msg : ''+getResource('resourceParam1272')+'!',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
											}
										});
					}
				}],
		items : [qualityTemplateMainPanel.grid],
		listeners : {
			'afterlayout' : function(panel){
				Ext.Ajax.request({
					url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges',
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON
								.decode(response.responseText);
						if(obj.modelEdit==false){
							qualityTemplateMainPanel.modelEdit = false;
							Ext.getCmp("physicsTypeGridPanelAdd").disable();
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						privilegename : "{'modelEdit':''}"
					}
				});
			}
		}
	})
	// 加载store数据
	function loadPhysicTypeTreeGrid(r) {
		physicTypeTreeGridPanel.grid.stopEditing();
		physicTypeTreeGridPanel.grid.getSelectionModel().clearSelections();
		physicTypeTreeGridPanel.store.clearModified();
		physicTypeTreeGridPanel.store.on('beforeload',
				function(store, options) {
					options.params = Ext.apply(options.params, {
								dataCenterID : r.get("datatypeId"),
								parentDataEntityID : "0",
								disableCheck : false
							});
				});
		physicTypeTreeGridPanel.store.load({
			callback : function(rs){
				if(rs.length > 0){
					physicTypeTreeGridPanel.orderNumber = rs[rs.length-1].get("orderNumber")+1;
				}else{
					physicTypeTreeGridPanel.orderNumber = 0;
				}
			}
		});
	}
	// 是否有未保存的数据
	function hasUnSavedRecords() {
		var flag = qualityTemplateMainPanel.ds.findBy(function(record, id) {
					if (record.get("datatypeId") === undefined) {
						return true;
					}
				}, qualityTemplateMainPanel.ds) >= 0
		flag |= qualityTemplateMainPanel.ds.getModifiedRecords().length > 0;
		return flag;
	}
	sm.on("selectionchange", function(selection) {
		if(qualityTemplateMainPanel.modelEdit==false){
			if (selection.getSelections().length > 0) {
				if (sm.getSelections().length == 1) {
					var selectedRow = selection.getSelected();
					qualityTemplateMainPanel.dataCenterId = selectedRow
							.get("datatypeId");
					if (qualityTemplateMainPanel.dataCenterId != undefined) {
						Ext.getCmp("physicTypeTreeGridPanel").enable();
						loadPhysicTypeTreeGrid(selectedRow);
					}
				} else {
					Ext.getCmp("physicTypeTreeGridPanel").disable();
				}
			}
		}else{
			if (selection.getSelections().length > 0) {
				Ext.getCmp("physicsTypeGridPanelDel").enable();
				Ext.getCmp("physicsTypeGridPanelSave").enable();
				if (sm.getSelections().length == 1) {
					var selectedRow = selection.getSelected();
					qualityTemplateMainPanel.dataCenterId = selectedRow
							.get("datatypeId");
					if (qualityTemplateMainPanel.dataCenterId != undefined) {
						Ext.getCmp("physicTypeTreeGridPanel").enable();
						loadPhysicTypeTreeGrid(selectedRow);
						Ext.getCmp("physicsTypeColumnTreeAdd").enable();
						Ext.getCmp("physicsTypeColumnTreeRefresh").enable();
						Ext.getCmp("physicsTypeColumnTreeSave").enable();
					} else {
						Ext.getCmp("physicsTypeColumnTreeAdd").disable();
						Ext.getCmp("physicsTypeColumnTreeSave").disable();
						Ext.getCmp("physicsTypeColumnTreeRefresh")
								.disable();
					}
				} else {
					Ext.getCmp("physicTypeTreeGridPanel").disable();
				}
			} else {
				Ext.getCmp("physicsTypeGridPanelDel").disable();
				Ext.getCmp("physicsTypeGridPanelSave").disable();
				Ext.getCmp("physicsTypeColumnTreeAdd").disable();
				Ext.getCmp("physicsTypeColumnTreeRefresh").disable();
				Ext.getCmp("physicsTypeColumnTreeSave").disable();
				Ext.getCmp("physicTypeTreeGridPanel").disable();
				if (hasUnSavedRecords()) {
					Ext.getCmp("physicsTypeGridPanelSave").enable();
				}
			}
		}
	})
	var viewport = new Ext.Viewport({ // 页面布局
		items : [mainPanel, physicsTypeColumnTree],
		layout : 'border'
	});
	qualityTemplateMainPanel.ds.load();
}

Ext.onReady(qualityTemplateMainPanel.init, qualityTemplateMainPanel)
