var cateInstanceEditTab = {

}
function getCheckData(data) {
	alert(cateInstanceEditTab.checkDataVer + ','
			+ cateInstanceEditTab.checkDataId);
	return cateInstanceEditTab.checkDataVer + ','
			+ cateInstanceEditTab.checkDataId;
}
cateInstanceEditTab.activeTab = null;
cateInstanceEditTab.init = function(title, id, i, datacenterid, revision) {
	var dataObjectTree = dataObjectTreeGrid.init(id, i, datacenterid, revision,
			false);
	// alert(revision + window.parent.historyViewModel);
	var temp = {

	};
	var anodeNull = false;
	temp.id = id;
	temp.datacenterid = datacenterid;
	var disableEdit = function() {
		return false;
	};
	var label_cateHistoryVersion = new Ext.form.Label({
				style : 'color:red;',
				text : ''
			});
	var tab1 = new Ext.Panel({
		id : id + i,
		title : '<span ext:qtip="' + title + '">' + title + '</span>',
		closable : true,
		closeAction : 'hide',
		autoDestroy : false,
		listeners : {
			'activate' : function(panel) {
				dataObjectTree.getSelectionModel().clearSelections();
				if (window.parent.customHistoryViewModel) {
					dataObjectTree.on('beforeedit', disableEdit);
					tab1.getTopToolbar().disable();
				} else {
					revision = -1;
					var opertationVo = Seam.Remoting
							.createType("com.luck.itumserv.base.privilege.OperationVo");
					opertationVo.setDataId(id);
					opertationVo.setIsPermitted(false);
					opertationVo.setIsRefused(false);
					opertationVo.setFlag(false);
					opertationVo.setCompulsory(false);
					callSeam("privilege_DataPrivilegeRemote",
							"getDataCenterDataManipultations", [opertationVo],
							function(result) {
								var obj = Ext.util.JSON.decode(result);
								if (obj.view == false) {
									dataObjectTree.setVisible(false);
									panel.getTopToolbar().setVisible(false);
									if (!panel.items.get(1)) {
										panel.add(new Ext.Panel({
											html : ''+getResource('resourceParam7001')+''//没有
													+ getResource('resourceParam582')
													+ ''
										}));
										panel.doLayout();
										return;
									}
								} else {
									dataObjectTree.setVisible(true);
									panel.getTopToolbar().setVisible(true);
								}
								if (obj.del == false) {
									Ext.getCmp('dataObjectColumnTreeDel' + i)
											.disable();
								} else {
									Ext.getCmp('dataObjectColumnTreeDel' + i)
											.enable();
								}
								if (obj.modifydata == false) {
									dataObjectTree
											.on('beforeedit', disableEdit);

									Ext.getCmp('dataObjectColumnTreeAdd' + i)
											.disable();
									Ext.getCmp('dataObjectColumnTreeSave' + i)
											.disable();
									Ext.getCmp('dataObjectColumnTreeRefresh'
											+ i).enable();
									Ext.getCmp('history_button' + i).enable();
								} else {
									dataObjectTree
											.un('beforeedit', disableEdit);

									Ext.getCmp('dataObjectColumnTreeAdd' + i)
											.enable();
									Ext.getCmp('dataObjectColumnTreeSave' + i)
											.enable();
									Ext.getCmp('dataObjectColumnTreeRefresh'
											+ i).enable();
									Ext.getCmp('history_button' + i).enable();
								}
								// if(obj.modify==false){
								// dataObjectTree.on('beforeedit',disableEdit);
								// Ext.getCmp('dataObjectColumnTreeAdd').disable();
								// Ext.getCmp('dataObjectColumnTreeSave').disable();
								// Ext.getCmp('dataObjectColumnTreeRefresh').enable();
								// Ext.getCmp('history_button').enable();
								// }else{
								// dataObjectTree.un('beforeedit',disableEdit);
								// Ext.getCmp('dataObjectColumnTreeAdd').enable();
								// Ext.getCmp('dataObjectColumnTreeSave').enable();
								// Ext.getCmp('dataObjectColumnTreeRefresh').enable();
								// Ext.getCmp('history_button').enable();
								// }
							});
				}
				dataObjectTree.getStore().on('beforeload',
						function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
							})
							if (anodeNull) {
								options.params = Ext.apply(options.params, {
											dataCenterID : temp.datacenterid,
											anode : null,
											parentDataEntityID : temp.id,
											fixedRevision : revision
										});
								anodeNull = false;
							} else {
								options.params = Ext.apply(options.params, {
											dataCenterID : temp.datacenterid,
											parentDataEntityID : temp.id,
											fixedRevision : revision
										});
							}
						});
				dataObjectTree.getStore().load();
				dataObjectTree.setHeight(tab1.getHeight() - 25);
				dataObjectTree.setWidth(tab1.getWidth());
				tab1.doLayout();
			},
			'bodyresize' : function() {
				dataObjectTree.setHeight(tab1.getHeight() - 25);
				dataObjectTree.setWidth(tab1.getWidth());
			}

		},
		tbar : [{
			id : 'dataObjectColumnTreeAdd' + i,
			text : '' + getResource('resourceParam647') + '',
			iconCls : 'add1',
			handler : function() {
				var Plant = dataObjectTree.getStore().recordType;
				Ext.Ajax.request({
					url : '../JSON/datacenter_DataCenterRemote.getDefaultType',
					method : 'POST',
					success : function(response, options) {
						var p = null;
						if ("none" != response.responseText) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							p = new Plant({
										text : ''
												+ getResource('resourceParam1075')
												+ '',
										dataEntityTypeName : obj.dataTypeName,
										dataEntityType : obj.dataTypeId,
										inout : '0',
										leaf : true,
										parent : null,
										isRef : obj.rank,
										dimension : '1',
										value : '',
										isArray : false,
										extendsTypeRealName : obj.dataType,
										realIsRef : obj.rank
									});
						} else {

							p = new Plant({
								text : '' + getResource('resourceParam1075')
										+ '',
								dataEntityTypeName : ''
										+ getResource('resourceParam1079') + '',
								dataEntityType : 'string',
								inout : '0',
								leaf : true,
								parent : null,
								isRef : '0',
								value : '',
								dimension : '1',
								isArray : false
							});

						}
						dataObjectTree.stopEditing();
						p.markDirty()
						dataObjectTree.getStore().insert(
								dataObjectTree.getStore().getCount(), p);
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						classid : temp.id
					}
				});

			}
		}, {
			id : 'dataObjectColumnTreeDel' + i,
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'del1',
			handler : function() {
				var delNodes = dataObjectTree.getEnableCheckNodes();
				var hasDelNodes = false;
				if (delNodes.length < 1) {
					Ext.Msg.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : '' + getResource('resourceParam1701')
										+ '',
								buttons : Ext.Msg.OK,
								animEl : 'elId',
								icon : Ext.MessageBox.ERROR
							});
				}
				for (s = 0; s < delNodes.length; s++) {
					dataObjectTree.getStore().removeRecord(delNodes[s]);
					hasDelNodes = true;
					var childNodes = dataObjectTree.getStore()
							.getNodeChildren(delNodes[s]);
					for (var i = 0; i < childNodes.length; i++) {
						dataObjectTree.getStore().remove(childNodes[i]);
					}
				}
				var dels = dataObjectTree.getSelectionModel().getSelections();
				for (k = 0; k < dels.length; k++) {
					if (dels[k].get("id") == undefined) {
						dataObjectTree.getStore().remove(dels[k]);
						hasDelNodes = true;
					}
				}
				if (!hasDelNodes) {
					Ext.Msg.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : '' + getResource('resourceParam1067')
										+ '！',
								buttons : Ext.Msg.OK,
								animEl : 'elId',
								icon : Ext.MessageBox.ERROR
							});
				}
			}
		}, {
			id : 'dataObjectColumnTreeSave' + i,
			text : ''+getResource('resourceParam7002')+'',//保存
			iconCls : 'save1',
			handler : function(button) {
				button.disable();
				var addlist = new Array();
				var store = dataObjectTree.getStore();
				store.findBy(function(record, id) {
					if (record.get("dataEntityID") === undefined) {
						addlist.push(record)
					}
				}, store)
				var DataEntitys = Seam.Component.newInstance("DataEntity");
				DataEntitys.setDataCenterID(temp.datacenterid);
				var list = new Array();
				for (var i = 0; i < store.getModifiedRecords().length; i++) {
					var dataEntity = Seam.Component.newInstance("DataEntity");
					var modifiedRecord = store.getModifiedRecords()[i];
					if (modifiedRecord.get("dataEntityID") != undefined) {
						dataEntity.setDataEntityType(modifiedRecord.get('dataEntityType'));
						dataEntity.setDataEntityName(modifiedRecord.get('text'));
						if (modifiedRecord.get('isArray')) {
							dataEntity.setIsRef(2);
						} else {
							dataEntity.setIsRef(modifiedRecord.get('isRef'));
						}
						dataEntity.setDataCenterID(temp.datacenterid);
						dataEntity.setDimension(modifiedRecord.get('dimension'));
						dataEntity.setValue(modifiedRecord.get('value'));
						dataEntity.setDataEntityID(modifiedRecord.get('dataEntityID'));
						dataEntity.setParentDataEntityID(modifiedRecord.get('parentDataEntityID'));
						dataEntity.setCustomTypeItemID(modifiedRecord.get('customTypeItemID'));
						dataEntity.setCustomTypeParentID(modifiedRecord.get('customTypeParentID'));
						dataEntity.setInout(modifiedRecord.get('inout'));
						dataEntity.setFileID(modifiedRecord.get('fileID'));
						dataEntity.setUpdateStatus("1");
						dataEntity.setIsArray(modifiedRecord.get('isArray'));
						dataEntity.setDcategoryinstanceid(temp.id);
						list.push(dataEntity);
					}
				}
				for (var j = 0; j < addlist.length; j++) {
					var dataEntity = Seam.Component.newInstance("DataEntity");
					dataEntity.setDataEntityType(addlist[j].get('dataEntityType'));
					dataEntity.setDataEntityName(addlist[j].get('text'));
					if (addlist[j].get('isArray')) {
						dataEntity.setIsRef(2);
					} else {
						dataEntity.setIsRef(addlist[j].get('isRef'));
					}
					dataEntity.setDataCenterID(temp.datacenterid);
					dataEntity.setDimension(addlist[j].get('dimension') == undefined ? "1" : addlist[j].get('dimension'));
					dataEntity.setValue(addlist[j].get('value') != undefined ? addlist[j].get('value') : "");
					dataEntity.setParentDataEntityID("0");
					dataEntity.setCustomTypeItemID("0");
					dataEntity.setCustomTypeParentID("0");
					dataEntity.setUpdateStatus("0");
					dataEntity.setInout(addlist[j].get('inout'));
					dataEntity.setDcategoryinstanceid(temp.id);
					dataEntity.setIsArray(addlist[j].get('isArray'));
					dataEntity.setFileID(addlist[j].get('fileID'));
					list.push(dataEntity);
				}
				var removedRecords = store.removedRecords;
				for (var k = 0; k < removedRecords.length; k++) {
					if (removedRecords[k].get('dataEntityID') != undefined
							&& removedRecords[k].get('dataEntityID') != "") {
						var dataEntity = Seam.Component.newInstance("DataEntity");
						dataEntity.setDataEntityID(removedRecords[k].get('dataEntityID'));
						dataEntity.setDataCenterID(temp.datacenterid);
						dataEntity.setUpdateStatus("2");
						dataEntity.setDcategoryinstanceid(temp.id);
						list.push(dataEntity);
					}
				}
				DataEntitys.setDelist(list);
				if (list.length == 0) {
					button.enable();
					return;
				}
				Seam.Component.getInstance("dataEntity_DataEntityRemote").createDataEntities(DataEntitys, function(result) {
					dataObjectTree.getSelectionModel().clearSelections();
					store.removedRecords = [];
					// store.clearModified();
					// store.modified = [];
					if (!window.parent.customHistoryViewModel) {
						result = -1;
					}
					// store.on('beforeload',function(store,options){
					// options.params = Ext.apply(options.params, {
					// dataCenterID : temp.datacenterid,
					// parentDataEntityID : temp.id,
					// fixedRevision : result
					// });
					// });
					store.reload();
					dataObjectTree.getView().refresh();
					if (result != 'false') {
						Ext.example.msg( "" + getResource('resourceParam575') + "", "" + getResource('resourceParam1072') + "");
						// store.load();
						var nodeid = window.parent.getCustomCheckNode().id;
						if (cateInstanceTree.checkinstancenode != null && cateInstanceTree.root.id == cateInstanceTree.checkinstancenode.id) {
							cateInstanceTree.root.attributes.revision = result;
						}
						window.parent.customReload(function() {
							cateInstanceTree.root.reload(function() {
								var nodetext = window.parent.getCustomNodeById(nodeid).text;
								cateInstanceTree.root.setText(nodetext);
								cateInstanceTree.root.expand(true);
								window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = nodetext;
								button.enable();
							});
						});
					}
					store.commitChanges();
				});
			}

		}, '-', {
			text : '' + getResource('resourceParam1081') + '',
			iconCls : 'refresh1',
			id : 'dataObjectColumnTreeRefresh' + i,
			handler : function() {
				var rc = dataObjectTree.getSelectionModel().getSelected();
				dataObjectTree.getStore().on('beforeload',
						function(store, options) {
							if (rc == undefined) {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
								})
								options.params = Ext.apply(options.params, {
											// disableCheck : true,
											dataCenterID : temp.datacenterid,
											parentDataEntityID : temp.id
										});
							} else {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
								})
								options.params = Ext.apply(options.params, {
									// disableCheck : true,
									dataCenterID : rc.get('dataCenterID'),
									dataEntityID : rc.get('dataEntityID'),
									parentDataEntityID : rc
											.get('parentDataEntityID'),
									dataEntityType : rc.get('dataEntityType'),
									customTypeParentID : rc
											.get('customTypeParentID'),
									customTypeItemID : rc
											.get('customTypeItemID'),
									isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
											.get("dimension")) > 1) ? 2 : rc
											.get('isRef'),
									inout : rc.get("inout"),
									dcategoryinstanceid : rc
											.get("dcategoryinstanceid")
								});
							}
						});
				var loadObject = {};
				if (rc != undefined) {
					loadObject = {
						add : true,
						callback : function() {
							dataObjectTree.getStore().expandNode(rc);
							dataObjectTree.getSelectionModel()
									.clearSelections();
						}
					}
				} else {
					loadObject = {
						callback : function() {
							dataObjectTree.getSelectionModel()
									.clearSelections();
						}
					}
				}
				dataObjectTree.getStore().load(loadObject);
				dataObjectTree.getStore().commitChanges();
				dataObjectTree.getStore().removedRecords = [];
			}
		}, '-', {
			id : 'dataTagApproveMenu' + i,
			text : '' + getResource('resourceParam1375')
					+ getResource('resourceParam1062') + '',
			hidden : true,
			menu : [new Ext.Action({
				id : 'dataTagApprovePass' + i,
				text : '' + getResource('resourceParam1365') + '',
				handler : function() {
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"' + getResource('resourceParam479') + '？？？", function(btn) {//确定
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : "../JSON/datacenter_DataCenterRemote.approve",
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
										},
										disableCaching : true,
										autoAbort : true,
										params : {}
									});
								}
							});
				}
			}), new Ext.Action({
						id : 'dataTagApproveSubmit' + i,
						text : '' + getResource('resourceParam1550') + '...',
						handler : function() {
							dataObjectTree.hide();
							tab1.setAutoScroll(true);
							tab1.getTopToolbar().disable();
							Ext.getCmp('cateInstanceAttriTab_tabPanel').on(
									'beforetabchange', disableEdit);
							var callback = function() {
								tab1.setAutoScroll(false);
								Ext.getCmp('cateInstanceAttriTab_tabPanel').un(
										'beforetabchange', disableEdit);
								Ext.getCmp('approvePanel' + temp.id).hide();
								dataObjectTree.show();
								tab1.getTopToolbar().enable();
							};
							if (Ext.getCmp('approvePanel' + temp.id)) {
								Ext.getCmp('approvePanel' + temp.id).show();
							} else {
								approvePanel.init(tab1, temp.id,
										'DataTagDataType', callback,
										'' + getResource('resourceParam1989')
												+ '', callback);
							}
							tab1.doLayout();
						}
					}), new Ext.Action({
				id : 'dataTagApproveComment' + i,
				text : '' + getResource('resourceParam1448') + '',
				handler : function() {
					dataObjectTree.hide();
					tab1.setAutoScroll(true);
					tab1.getTopToolbar().disable();
					Ext.getCmp('cateInstanceAttriTab_tabPanel').on(
							'beforetabchange', disableEdit);
					if (Ext.getCmp('commentGrid' + temp.id)) {
						Ext.getCmp('commentGrid' + temp.id).show();
					} else {
						examApproval.getCommentGrid(tab1, temp.id,
								'DataTagDataType', function() {
									tab1.setAutoScroll(false);
									Ext.getCmp('cateInstanceAttriTab_tabPanel')
											.un('beforetabchange', disableEdit);
									Ext.getCmp('commentGrid' + temp.id).hide();
									dataObjectTree.show();
									tab1.getTopToolbar().enable();
								});
					}
					tab1.doLayout();
				}
			})]
		}, {
			id : 'dataEntityApproveMenu' + i,
			text : '' + getResource('resourceParam474')
					+ getResource('resourceParam1062') + '',
			hidden : true,
			menu : [new Ext.Action({
				id : 'dataEntityApprovePass' + i,
				text : '' + getResource('resourceParam1365') + '',
				handler : function() {
					var sm = dataObjectTree.getSelectionModel();
					var selections = sm.getSelections();
					var ucount = 0;
					for (var i = 0; i < selections.length; i++) {
						var pNode = dataObjectTree.getStore()
								.getNodeParent(selections[i]);
						if (!pNode) {
							ucount = ucount + 1;
						}
					}
					if (ucount > 1) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : ''+getResource('resourceParam7003')+''//一次只能
											+ getResource('resourceParam503')
											+ ''+getResource('resourceParam7004')+''//一
											+ getResource('resourceParam455')
											+ ''
											+ getResource('resourceParam474')
											+ '！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					if (sm.getCount() == 0) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '' + getResource('resourceParam459')
											+ ''+getResource('resourceParam7004')+''
											+ getResource('resourceParam455')
											+ ''
											+ getResource('resourceParam474')
											+ '！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"' + getResource('resourceParam479') + '？？？", function(btn) {//确定
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : "../JSON/datacenter_DataCenterRemote.approve",
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
										},
										disableCaching : true,
										autoAbort : true,
										params : {}
									});
								}
							});
				}
			}), new Ext.Action({
						id : 'dataEntityApproveSubmit' + i,
						text : '' + getResource('resourceParam1550') + '...',
						handler : function() {
							var sm = dataObjectTree.getSelectionModel();
							var selections = sm.getSelections();
							var ucount = 0;
							for (var i = 0; i < selections.length; i++) {
								var pNode = dataObjectTree.getStore()
										.getNodeParent(selections[i]);
								if (!pNode) {
									ucount = ucount + 1;
								}
							}
							if (ucount > 1) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam596')
													+ '!',
											msg : ''
													+ getResource('resourceParam7003')
													+ ''//一次只能
													+ getResource('resourceParam503')
													+ ''
													+ getResource('resourceParam7004')
													+ ''//一
													+ getResource('resourceParam455')
													+ ''
													+ getResource('resourceParam474')
													+ '！',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								return;
							}
							if (sm.getCount() == 0) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam596')
													+ '!',
											msg : ''
													+ getResource('resourceParam459')
													+ ''
													+ getResource('resourceParam7004')
													+ ''//一
													+ getResource('resourceParam455')
													+ ''
													+ getResource('resourceParam474')
													+ '！',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								return;
							}
							dataObjectTree.hide();
							tab1.setAutoScroll(true);
							tab1.getTopToolbar().disable();
							Ext.getCmp('cateInstanceAttriTab_tabPanel').on(
									'beforetabchange', disableEdit);
							var callback = function() {
								tab1.setAutoScroll(false);
								Ext.getCmp('cateInstanceAttriTab_tabPanel').un(
										'beforetabchange', disableEdit);
								Ext.getCmp('approvePanel'
										+ sm.getSelected().get('dataEntityID'))
										.hide();
								dataObjectTree.show();
								tab1.getTopToolbar().enable();
							};
							if (Ext.getCmp('approvePanel'
									+ sm.getSelected().get('dataEntityID'))) {
								Ext.getCmp('approvePanel'
										+ sm.getSelected().get('dataEntityID'))
										.show();
							} else {
								approvePanel.init(tab1, sm.getSelected()
												.get('dataEntityID'),
										'DataEntityDataType', callback,
										'' + getResource('resourceParam1988')
												+ '', callback);
							}
							tab1.doLayout();
						}
					}), new Ext.Action({
				id : 'dataEntityApproveComment' + i,
				text : '' + getResource('resourceParam1448') + '',
				hidden : true,
				handler : function() {
					var sm = dataObjectTree.getSelectionModel();
					var selections = sm.getSelections();
					var ucount = 0;
					for (var i = 0; i < selections.length; i++) {
						var pNode = dataObjectTree.getStore()
								.getNodeParent(selections[i]);
						if (!pNode) {
							ucount = ucount + 1;
						}
					}
					if (ucount > 1) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : ''
											+ getResource('resourceParam7003')
											+ ''//一次只能
											+ getResource('resourceParam503')
											+ ''
											+ getResource('resourceParam7004')
											+ ''//一
											+ getResource('resourceParam455')
											+ ''
											+ getResource('resourceParam474')
											+ '！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					if (sm.getCount() == 0) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '' + getResource('resourceParam459')
											+ ''
											+ getResource('resourceParam7004')
											+ ''//一
											+ getResource('resourceParam455')
											+ ''
											+ getResource('resourceParam474')
											+ '！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					dataObjectTree.hide();
					tab1.setAutoScroll(true);
					tab1.getTopToolbar().disable();
					Ext.getCmp('cateInstanceAttriTab_tabPanel').on(
							'beforetabchange', disableEdit);
					if (Ext.getCmp('commentGrid'
							+ sm.getSelected().get('dataEntityID'))) {
						Ext.getCmp('commentGrid'
								+ sm.getSelected().get('dataEntityID')).show();
					} else {
						examApproval.getCommentGrid(tab1, sm.getSelected()
										.get('dataEntityID'),
								'DataEntityDataType', function() {
									tab1.setAutoScroll(false);
									Ext.getCmp('cateInstanceAttriTab_tabPanel')
											.un('beforetabchange', disableEdit);
									Ext.getCmp('commentGrid'
											+ sm.getSelected()
													.get('dataEntityID'))
											.hide();
									dataObjectTree.show();
									tab1.getTopToolbar().enable();
								});
					}
					tab1.doLayout();
				}
			})]
		}, '->', label_cateHistoryVersion, '-', {
			id : 'history_button' + i,
			text : '' + getResource('resourceParam1702') + '',
			handler : function() {
				var self = this;
				var win = new Ext.Window({
					width : 650,
					height : 400,
					title : '' + getResource('resourceParam1704') + '',
					modal : true,
					autoScroll : true,
					items : [historyVersionsMain.init(temp.id)],
					bbar : ['->', {
						text : '' + getResource('resourceParam479') + '',
						handler : function() {
							if (win.items.get(0).get(0).getSelectionModel()
									.getSelections().length == 0) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam596')
													+ '!',
											msg : ''
													+ getResource('resourceParam1703')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										})
								return;
							}
							window.parent.setCustomEnable(false);
							cateInstanceTree.setEnable(false);
							if (Ext.getCmp('cateInstance_mainPanel')) {
								Ext.getCmp('cateInstance_mainPanel')
										.getTopToolbar().disable();
							}
							window.parent.customHistoryViewModel = true;
							var r = win.items.get(0).get(0).getSelectionModel()
									.getSelected();
							revision = r.get('fixedRevision');
							anodeNull = true;
							tab1.fireEvent('activate');
							cateInstanceEditTab.activeTab = tab1;
							Ext.getCmp('cateInstanceAttriTab_tabPanel').on(
									'beforetabchange', disableEdit);
							var items = Ext
									.getCmp('cateInstanceAttriTab_tabPanel').items;
							for (var i = 0; i < items.length; i++) {
								items.get(i).on('beforeclose', disableEdit);
							}
							label_cateHistoryVersion.enable();
							label_cateHistoryVersion.setText(''
									+ getResource('resourceParam1706') + ':'
									+ r.get('version'));

							self.setHandler(function() {

								label_cateHistoryVersion.setText('');
								window.parent.customHistoryViewModel = false;
								window.parent.setCustomEnable(true);
								Ext.getCmp('cateInstance_mainPanel')
										.getTopToolbar().enable();
								Ext.getCmp('cateInstanceAttriTab_tabPanel').un(
										'beforetabchange', disableEdit);
								var items = Ext
										.getCmp('cateInstanceAttriTab_tabPanel').items;
								for (var i = 0; i < items.length; i++) {
									items.get(i).un('beforeclose', disableEdit);
								}
								self
										.setText(''
												+ getResource('resourceParam1702')
												+ '');
								cateInstanceTree.setEnable(true);

							});
							self.enable();
							self.setText('' + getResource('resourceParam1705')
									+ '');
							win.close();
						}
					}, {
						text : '' + getResource('resourceParam506') + '',
						handler : function() {
							win.close();
						}
					}]
				});
				win.show();
			}
		}],
		items : [dataObjectTree]

	});

	return tab1;
}
