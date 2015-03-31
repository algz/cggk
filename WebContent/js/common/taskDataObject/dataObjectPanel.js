/**
 * 数据面板，公用
 */
var dataObjectPanel = function() {
	
	var self = this;
	/**
	 * 上传回调函数
	 */
	function fileUploadCallback(winDia, form, resp, flag) {
		var record = self.dataObjectTree.getSelectionModel().getSelected();
		if (flag) {
			winDia.window.close();
			record.set("fileID", resp.result.fileId);
			var strFileName = resp.result.fileName;
			strFileName = strFileName.substring(strFileName.lastIndexOf('\\') + 1);
			record.set("value", strFileName);
			// record.set("value", resp.result.fileName);
			return;
		} else {
			Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
							+ getResource('resourceParam1073') + "");
		}
	}
	/**
	 * 设置映射回调函数
	 */
	function setDataRelationCallback(winDia, node, parentType, nodeRelationType) {
		// 获得编辑数据
		var selectedRecord = self.dataObjectTree.getSelectionModel()
				.getSelected();
		if (node.get('isArrayItemChild')
				|| selectedRecord.get('isArrayItemChild')) {// 数组元素或者数组元素下级元素，不可以建立映射
			Ext.Msg.show({
						title : '' + getResource('resourceParam575') + '',
						msg : getResource('resourceParam3020'),
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.ERROR
					});
			return false;
		}

		if (node.get("dataEntityType") != selectedRecord.get("dataEntityType")
				|| node.get("isArray") != selectedRecord.get("isArray")
				|| node.get("dimension") != selectedRecord.get("dimension")) {// 类型，维度，数组化必须相同
			Ext.Msg.show({
						title : '' + getResource('resourceParam575') + '',
						msg : '' + getResource('resourceParam474') + '的'
								+ getResource('resourceParam481') + '或者'
								+ getResource('resourceParam853') + '不同！',
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.ERROR
					});
			return false;
		}
		if (parentType != "dataCenter") {// 项目任务数据相互映射
			if (node.get("inout") == "0" && nodeRelationType == "brother") {
				Ext.Msg.show({
							title : '' + getResource('resourceParam575') + '',
							msg : "兄弟" + getResource('resourceParam733') + "的"
									+ getResource('resourceParam1076')
									+ "不能作为映射源"
									+ getResource('resourceParam474') + "！",
							buttons : Ext.Msg.OK,
							icon : Ext.MessageBox.ERROR
						});
				return false;
			} else if (node.get("inout") == "1" && nodeRelationType == "parent") {
				Ext.Msg.show({
							title : '' + getResource('resourceParam575') + '',
							msg : "" + getResource('resourceParam1080') + "（"
									+ getResource('resourceParam463') + "）的"
									+ getResource('resourceParam1077')
									+ "不能作为子" + getResource('resourceParam733')
									+ "映射源" + getResource('resourceParam474')
									+ "！",
							buttons : Ext.Msg.OK,
							icon : Ext.MessageBox.ERROR
						});
				return false;
			}
		}
		function createDataEntity(record, callback) {// 创建数据实体
			var dataEntity = Seam.Remoting
					.createType("com.sysware.edm.dataentity.DataEntity");
			dataEntity.setDataEntityType(record.get('dataEntityType'));
			dataEntity.setDataEntityName(record.get('text'));
			dataEntity.setIsRef(record.get('isRef'));
			dataEntity.setDataCenterID(record.get('dataCenterID'));
			dataEntity.setDimension(record.get('dimension'));
			dataEntity.setParentDataEntityID(record.get('parentDataEntityID'));
			dataEntity.setCustomTypeItemID(record.get('customTypeItemID'));
			dataEntity.setCustomTypeParentID(record.get('customTypeParentID'));
			dataEntity.setFileID(record.get('fileID'));
			dataEntity.setInout(record.get('inout'));
			dataEntity.setDataEntityCategoryTag(record
					.get('dataEntityCategoryTag'));
			dataEntity.setDataEntityCategoryTagName(record
					.get('dataEntityCategoryTagName'));
			dataEntity.setDataEntityCategoryTagCenterID(record
					.get('dataEntityCategoryTagCenterID'));
			dataEntity.setUpdateStatus("1");
			dataEntity
					.setDcategoryinstanceid(record.get('dcategoryinstanceid'));
			Seam.Component.getInstance("dataEntity_DataEntityRemote")
					.createDataEntity(dataEntity, function(result) {
								callback(result);
							})

		}

		if ("" == node.get('dataEntityID')
				&& "" != selectedRecord.get('dataEntityID')) {// 源数据为引用节点（虚拟节点），目标数据为实节点
			function callback(node) {
				var dataRelationType = parentType == "dataCenter" ? 22 : 1;
				var dataRelation = Seam.Remoting
						.createType("com.sysware.edm.dataentity.DataRelation");
				dataRelation.setSourceDataCenterID(node.get("dataCenterID"));
				dataRelation.setSourceCategoryInsID(node
						.get("dcategoryinstanceid"));
				dataRelation.setSourceDataID(node.get('dataEntityID'));
				dataRelation.setSourceDataRevision(node.get("revision"));
				dataRelation.setSourceDataType(0);
				dataRelation.setDataRelationType(dataRelationType);
				dataRelation.setDestinationCategoryInsID(selectedRecord
						.get("dcategoryinstanceid"));
				dataRelation.setDestinationDataCenterID(selectedRecord
						.get("dataCenterID"));
				dataRelation.setDestinationDataID(selectedRecord
						.get("dataEntityID"));
				dataRelation.setDestinationDataRevision(selectedRecord
						.get("revision"));

				Seam.Component.getInstance("dataEntity_DataEntityRemote")
						.setDataEnityAndRelationByRelation(dataRelation,
								function(result) {
									winDia.close();
									self.dataObjectTree.getSelectionModel()
											.clearSelections();
									self.dataObjectTree.getStore().removedRecords = [];
									self.dataObjectTree.getStore().reload();
									self.dataObjectTree.getView().refresh();
								});

			}
			createDataEntity(node, callback);
		} else if ("" != node.get('dataEntityID')
				&& "" == selectedRecord.get('dataEntityID')) {// 目标数据为引用节点（虚拟节点），源数据为实节点
			function callback(selectedRecord) {
				var dataRelationType = parentType == "dataCenter" ? 22 : 1;
				var dataRelation = Seam.Remoting
						.createType("com.sysware.edm.dataentity.DataRelation");
				dataRelation.setSourceDataCenterID(node.get("dataCenterID"));
				dataRelation.setSourceCategoryInsID(node
						.get("dcategoryinstanceid"));
				dataRelation.setSourceDataID(node.get('dataEntityID'));
				dataRelation.setSourceDataRevision(node.get("revision"));
				dataRelation.setSourceDataType(0);
				dataRelation.setDataRelationType(dataRelationType);
				dataRelation.setDestinationCategoryInsID(selectedRecord
						.get("dcategoryinstanceid"));
				dataRelation.setDestinationDataCenterID(selectedRecord
						.get("dataCenterID"));
				dataRelation.setDestinationDataID(selectedRecord
						.get("dataEntityID"));
				dataRelation.setDestinationDataRevision(selectedRecord
						.get("revision"));

				Seam.Component.getInstance("dataEntity_DataEntityRemote")
						.setDataEnityAndRelationByRelation(dataRelation,
								function(result) {
									winDia.close();
									self.dataObjectTree.getSelectionModel()
											.clearSelections();
									self.dataObjectTree.getStore().removedRecords = [];
									self.dataObjectTree.getStore().reload();
									self.dataObjectTree.getView().refresh();
								});

			}
			createDataEntity(selectedRecord, callback);
		} else if ("" == node.get('dataEntityID')
				&& "" == selectedRecord.get('dataEntityID')) {// 源数据和目标数据均为引用节点（虚拟节点）
			var theDestinDataEntity;
			var theSourceDataEntity;
			function callback(node, selectedRecord) {
				var dataRelationType = parentType == "dataCenter" ? 22 : 1;
				var dataRelation = Seam.Remoting
						.createType("com.sysware.edm.dataentity.DataRelation");
				dataRelation.setSourceDataCenterID(node.get("dataCenterID"));
				dataRelation.setSourceCategoryInsID(node
						.get("dcategoryinstanceid"));
				dataRelation.setSourceDataID(node.get('dataEntityID'));
				dataRelation.setSourceDataRevision(node.get("revision"));
				dataRelation.setSourceDataType(0);
				dataRelation.setDataRelationType(dataRelationType);
				dataRelation.setDestinationCategoryInsID(selectedRecord
						.get("dcategoryinstanceid"));
				dataRelation.setDestinationDataCenterID(selectedRecord
						.get("dataCenterID"));
				dataRelation.setDestinationDataID(selectedRecord
						.get("dataEntityID"));
				dataRelation.setDestinationDataRevision(selectedRecord
						.get("revision"));

				Seam.Component.getInstance("dataEntity_DataEntityRemote")
						.setDataEnityAndRelationByRelation(dataRelation,
								function(result) {
									winDia.close();
									self.dataObjectTree.getSelectionModel()
											.clearSelections();
									self.dataObjectTree.getStore().removedRecords = [];
									self.dataObjectTree.getStore().reload();
									self.dataObjectTree.getView().refresh();
								});

			}
			function destinDataEntityCallback(destinDataEntity) {
				theSourceDataEntity = destinDataEntity;
				callback(theDestinDataEntity, theSourceDataEntity);
			}
			function sourceDataEntityCallback(sourceDataEntity) {
				theDestinDataEntity = sourceDataEntity
				createDataEntity(selectedRecord, destinDataEntityCallback);
			}
			createDataEntity(node, sourceDataEntityCallback);
		} else {// 目标数据和源数据都不是虚拟节点
			var dataRelationType = parentType == "dataCenter" ? 22 : 1;
			var dataRelation = Seam.Remoting
					.createType("com.sysware.edm.dataentity.DataRelation");
			dataRelation.setSourceDataCenterID(node.get("dataCenterID"));
			dataRelation
					.setSourceCategoryInsID(node.get("dcategoryinstanceid"));
			dataRelation.setSourceDataID(node.get('dataEntityID'));
			dataRelation.setSourceDataRevision(node.get("revision"));
			dataRelation.setSourceDataType(0);
			dataRelation.setDataRelationType(dataRelationType);
			dataRelation.setDestinationCategoryInsID(selectedRecord
					.get("dcategoryinstanceid"));
			dataRelation.setDestinationDataCenterID(selectedRecord
					.get("dataCenterID"));
			dataRelation.setDestinationDataID(selectedRecord
					.get("dataEntityID"));
			dataRelation.setDestinationDataRevision(selectedRecord
					.get("revision"));

			Seam.Component.getInstance("dataEntity_DataEntityRemote")
					.setDataEnityAndRelationByRelation(dataRelation,
							function(result) {
								winDia.close();
								self.dataObjectTree.getSelectionModel()
										.clearSelections();
								self.dataObjectTree.getStore().removedRecords = [];
								self.dataObjectTree.getStore().reload();
								self.dataObjectTree.getView().refresh();
							});
		}
	}
	function updateDataEntityByRelationCallback(record) {// 根据映射关系更新目标数据
		var dataEntity = Seam.Remoting
				.createType("com.sysware.edm.dataentity.DataEntity");
		dataEntity.setDataCenterID(record.get("dataCenterID"));
		dataEntity.setDataEntityType(record.get('dataEntityType'));
		dataEntity.setDimension(record.get('dimension'));
		dataEntity.setDataEntityID(record.get('dataEntityID'));
		dataEntity.setDcategoryinstanceid(record.get('dcategoryinstanceid'));
		
		Seam.Component.getInstance("dataEntity_DataEntityRemote")
				.updateDataEntityByRelation(dataEntity, function(result) {
					if (result == "notsametype") {
						Ext.Msg.show({
									title : ''
											+ getResource('resourceParam575')
											+ '',
									msg : "源" + getResource('resourceParam474')
											+ "的"
											+ getResource('resourceParam481')
											+ "或者"
											+ getResource('resourceParam853')
											+ ""
											+ getResource('resourceParam509')
											+ ""
											+ getResource('resourceParam478')
											+ "！",
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.ERROR
								});
					} else if (result == "notexist") {
						Ext.Msg.show({
									title : ''
											+ getResource('resourceParam575')
											+ '',
									msg : "源" + getResource('resourceParam474')
											+ ""
											+ getResource('resourceParam619')
											+ ""
											+ getResource('resourceParam475')
											+ "！",
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.ERROR
								});
					} else {
						self.dataObjectTree.getSelectionModel()
								.clearSelections();
						self.dataObjectTree.getStore().removedRecords = [];
						self.dataObjectTree.getStore().reload();
						self.dataObjectTree.getView().refresh();
					}
				});
	}
	this.dataObjectTree = dataObjectTreeGrid.init(fileUploadCallback,
			setDataRelationCallback, updateDataEntityByRelationCallback);
	this.dataCenterGrid = dataCenterGridView.init(true);
	this.dataCenterGrid.hide();
	this.isOnDataCenterRelation = false;
	this.edmLabel = new Ext.form.Label({
		id : 'edmWang',
		html : '<div style="height:20px;line-height:20px;"><span>EDM:</span>'
				+ '<a href="javascript:void(0);"><span id="dataObjectPanel_dataEntityEDM" style="color:blue;text-decoration:underline;"></span></a>'
				+ '&nbsp;&nbsp;'
				+ '<a href="javascript:void(0);" id="ID_viewDataObject" curCenterId="-1" style="color:blue;text-decoration:underline;display:none;">查看</a>'
				+ '&nbsp;&nbsp;'
				+ '<a href="javascript:void(0);" id="ID_cancelBand" curCenterId="-1" style="color:blue;text-decoration:underline;display:none;">取消绑定</a></div>'
	})
	this.parameters = {};
	var defaultsConfigs = {
		projectFormItem : {
			"value" : "",
			"name" : "projectName",
			"disabled" : true
		},
		taskFormItem : {
			"value" : "",
			"name" : "taskName",
			"disabled" : true,
			"isShow" : true
		},
		dataNameFormItem : {
			"value" : "",
			"name" : "dataEntityName"
		},
		dataTypeFormItem : {
			"value" : "",
			"name" : "dataEntityTypeName"
		},
		dataTypeFormItemHidden : {
			"value" : "",
			"name" : "dataEntityType"
		},
		valueFormItem : {
			"value" : "",
			"name" : "value"
		},
		startDateFormItem : {
			"value" : "",
			"name" : "startDate"
		},
		endDateFormItem : {
			"value" : "",
			"name" : "endDate"
		},
		versionFormItem : {
			"value" : "",
			"name" : "revisionName"
		},
		versionFormItemHidden : {
			"value" : "",
			"name" : "revision"
		}
	}

	function searchCallback(paramsObj) {// 查询回调函数

		self.setSearchResultTreeGridConfig(true);
		self.searchResultTreeGrid.getSelectionModel().clearSelections();
		var conn = synchronize.createXhrObject();
		var url = "../JSON/dataEntity_DataEntityRemote.getProcessOn?id=1"
		conn.open("GET", url, false);
		conn.send(null);
		var respText = conn.responseText;

		var obj = Ext.util.JSON.decode(respText);
		if (obj) {
			self.searchResultTreeGrid.getStore().on('beforeload',
					function(store, options) {
						this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
						})
						options.params = Ext.apply(options.params, paramsObj);
					});
		} else {
			// projectdatas_4065300 taskdatas_
			// alert(paramsObj.dcategoryinstanceid.substring(8));
			var datacateid = "";
			// alert(paramsObj.dcategoryinstanceid.indexOf('project'));
			if (paramsObj.dcategoryinstanceid.indexOf('project') == 0) {
				datacateid = "projectdatas_"
						+ paramsObj.dcategoryinstanceid.substring(8);
			} else {
				datacateid = "taskdatas_"
						+ paramsObj.dcategoryinstanceid.substring(5);

			}
			self.searchResultTreeGrid.getStore().on('beforeload',
					function(store, options) {
						this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataEntity_DataEntityRemote.queryDataEntities'
						})
						options.params = Ext.apply(options.params, paramsObj);
						options.params.dcategoryinstanceid = datacateid;
					});
		}
		self.searchResultTreeGrid.getStore().load();
	}
	this.searchPanel = searchPanel.init(defaultsConfigs, searchCallback);
	this.searchResultTreeGrid = searchResultTreeGrid.init();
	dataCateList.flag = 2;
	this.dataCenterGridList = dataCateList.init();
	this.categoryInstancePanel = cateInstancePanel.init();
	this.wareHousePanel = dataCenterWareHouse.init();
	function dataCenterGridCellClickHandler(grid, rowIndex, columnIndex, e) {// 查看数据中心
		if (grid.getStore().getAt(rowIndex).get("categorytype") == 4) {
			// wsid, wsname, categoryid, desc
			self.viewWareHouse(grid.getStore().getAt(rowIndex)
							.get("categoryinstanceid"), grid.getStore()
							.getAt(rowIndex).get("categoryinstancename"), grid
							.getStore().getAt(rowIndex).get("categoryid"), grid
							.getStore().getAt(rowIndex).get("description"));
		} else {
			self.viewDataInstance(grid.getStore().getAt(rowIndex)
							.get("categoryinstanceid"), grid.getStore()
							.getAt(rowIndex).get("categoryinstancename"));
		}
	}

	// 对grid设置监听事件
	this.dataCenterGridList.items.items[0].on('cellclick',
			dataCenterGridCellClickHandler)
};
dataObjectPanel.prototype = {
	init : function() {
		var self = this;
		dataObjectPanel.dataPanel = new Ext.Panel({
			title : '' + getResource('resourceParam474') + '',
			frame : false,
			boder : false,
			id : 'dataObjectPanel',
			items : [/*self.edmLabel,*/ self.dataObjectTree, self.dataCenterGrid,
					self.searchResultTreeGrid, self.categoryInstancePanel,
					self.dataCenterGridList, self.wareHousePanel],
			listeners : {
				'bodyresize' : function() {// 尺寸动态变化
					/**
					 * Updated by YangJin'gang at 2011-01-04
					 */
					this.show();
					var intHeight = this.getHeight();
					var intWidth = this.getWidth();
					if (self.dataObjectTree != undefined) {
						self.dataObjectTree.setHeight(intHeight - 25);
						self.dataObjectTree.setWidth(intWidth - 2);
					}
					if (self.dataCenterGrid != undefined) {
						self.dataCenterGrid.setHeight(intHeight - 25);
						self.dataCenterGrid.setWidth(intWidth - 2);
					}
					if (self.searchResultTreeGrid != undefined) {
						self.searchResultTreeGrid.setHeight(intHeight - 25);
						self.searchResultTreeGrid.setWidth(intWidth - 2);
					}
					if (self.dataCenterGridList != undefined
							&& dataObjectPanel.dataPanel != undefined) {
						self.dataCenterGridList.setHeight(intHeight - 25);
						self.dataCenterGridList.setWidth(intWidth - 2);
					}
					if (self.categoryInstancePanel != undefined
							&& dataObjectPanel.dataPanel != undefined) {
						self.categoryInstancePanel.setHeight(intHeight - 25);
						self.categoryInstancePanel.setWidth(intWidth - 2);
					}
				},

				'beforedeactivate' : function() {// 离开页面之前判断是否有未保存数据
					var langMsg = getResource('resourceParam4038');
					var store = self.dataObjectTree.getStore();
					if (store.getModifiedRecords().length > 0) {
						return confirm(langMsg)
					}
					var addlist = new Array();
					store.findBy(function(record, id) {
								if (record.get("dataEntityID") === undefined) {
									addlist.push(record)
								}
							}, store)
					if (addlist.length > 0) {
						return confirm(langMsg)
					}
				}
			},
			tbar : [{
				id : 'dataObjectColumnTreeAdd',
				text : '' + getResource('resourceParam647') + '',
				iconCls : 'add1',
				// tooltip : '' + getResource('resourceParam647') + '',
				handler : function() {
					var Plant = self.dataObjectTree.getStore().recordType;
					var defaultDataObject = {
						text : '' + getResource('resourceParam1075') + '',
						dataEntityTypeName : ''
								+ getResource('resourceParam1079') + '',
						dataEntityType : 'string',
						inout : '0',
						leaf : true,
						parent : null,
						isRef : '0',
						dimension : '1',
						isArray : false
					}
					if (Ext.getCmp("dataObjectColumnTreeDefaultType")
							.getValue() != "") {
						defaultDataObject = {
							text : '' + getResource('resourceParam1075') + '',
							dataEntityTypeName : self.parameters["defaultTypeName"],
							dataEntityType : self.parameters["defaultTypeId"],
							inout : '0',
							leaf : true,
							parent : null,
							isRef : self.parameters["defaultIsRef"],
							extendsTypeRealName : self.parameters["defaultExtendsTypeRealName"],
							realIsRef : self.parameters["defaultIsRef"],
							value : '',
							dimension : '1',
							isArray : false
						}
					}
					var p = new Plant(defaultDataObject);
					self.dataObjectTree.stopEditing();
					p.markDirty()
					self.dataObjectTree.getStore().insert(
							self.dataObjectTree.getStore().getCount(), p);
					//修改我的工作日历中为任务添加数据时数据串到下一行问题---hegs
					//start		
					var rows = self.dataObjectTree.getStore().getCount();
					var view = self.dataObjectTree.getView();
					var td = view.getCell(rows-1, 2);
					var styl = td.childNodes[0].childNodes[0].style;
					if(Ext.isIE)
					{
						styl.styleFloat = 'left';
					}else
					{
						styl.cssFloat = 'left';
					}
					styl.display = 'inline';
					//end	
				}

			}, {
				id : 'dataObjectColumnTreeDel',
				text : '' + getResource('resourceParam475') + '',
				iconCls : 'del1',
				handler : function() {
					var hasDelNodes = false;
					var delNodes = self.dataObjectTree.getEnableCheckNodes();
					for (s = 0; s < delNodes.length; s++) {
						self.dataObjectTree.getStore()
								.removeRecord(delNodes[s]);
						hasDelNodes = true;
						var childNodes = self.dataObjectTree.getStore()
								.getNodeChildren(delNodes[s]);
						for (var i = 0; i < childNodes.length; i++) {
							self.dataObjectTree.getStore()
									.remove(childNodes[i]);
						}
					}
					var dels = self.dataObjectTree.getSelectionModel()
							.getSelections();
					for (k = 0; k < dels.length; k++) {
						if (dels[k].get("id") == undefined) {
							self.dataObjectTree.getStore().remove(dels[k]);
							hasDelNodes = true;
						}
					}
					if (!hasDelNodes) {
						Ext.Msg.show({
									title : ''
											+ getResource('resourceParam575')
											+ '',
									msg : '' + getResource('resourceParam1067')
											+ '！',
									width : 250,
									buttons : Ext.Msg.OK,
									animEl : 'elId',
									icon : Ext.MessageBox.ERROR
								});
					}
				}
			}, {
				text : getResource('resourceParam5019'),
				iconCls : 'save1',
                count : 0,
				id : 'dataObjectColumnTreeSave',
				handler : function(button) {
					button.disable();
					self.dataObjectTree.stopEditing();
					var loadmask = new Ext.LoadMask(Ext.getBody(), {
								msg : getResource('resourceParam4039')
							});
					loadmask.show();
					var addlist = new Array();
					var store = self.dataObjectTree.getStore();
					store.findBy(function(record, id) {// 查找新添加的数据
								if (record.get("dataEntityID") === undefined) {
									addlist.push(record);
								}
							}, store)
					var DataEntitys = Seam.Remoting.createType("com.sysware.edm.dataentity.DataEntity");
					var list = new Array();
					for (var i = 0; i < store.getModifiedRecords().length; i++) {// 修改的数据
						var dataEntity = Seam.Remoting.createType("com.sysware.edm.dataentity.DataEntity");
						var modifiedRecord = store.getModifiedRecords()[i];
						if (modifiedRecord.get("dataEntityID") != undefined) {
							dataEntity.setDataEntityType(modifiedRecord.get('dataEntityType'));
							dataEntity.setDataEntityName(modifiedRecord.get('text'));
							if (modifiedRecord.get('isArray')) {
								dataEntity.setIsRef(2);
							} else {
								dataEntity.setIsRef(modifiedRecord.get('isRef'));
							}
							dataEntity.setDataCenterID(self.dataObjectTree.dataCenterId);
							dataEntity.setDimension(modifiedRecord.get('dimension'));
							dataEntity.setValue(modifiedRecord.get('value'));
							dataEntity.setDataEntityID(modifiedRecord.get('dataEntityID'));
							dataEntity.setParentDataEntityID(modifiedRecord.get('parentDataEntityID'));
							dataEntity.setCustomTypeItemID(modifiedRecord.get('customTypeItemID'));
							dataEntity.setCustomTypeParentID(modifiedRecord.get('customTypeParentID'));
							dataEntity.setFileID(modifiedRecord.get('fileID'));
							dataEntity.setInout(modifiedRecord.get('inout'));
							dataEntity.setUnit(modifiedRecord.get('unit'));
							dataEntity.setDescription(modifiedRecord.get('description'));
							dataEntity.setIsArray(modifiedRecord.get('isArray'));
							dataEntity.setDataEntityCategoryTag(modifiedRecord.get('dataEntityCategoryTag'));
							dataEntity.setDataEntityCategoryTagName(modifiedRecord.get('dataEntityCategoryTagName'));
							dataEntity.setDataEntityCategoryTagCenterID(modifiedRecord.get('dataEntityCategoryTagCenterID'));
							dataEntity.setUpdateStatus("1");
							dataEntity.setDcategoryinstanceid(self.dataObjectTree.datacCategoryInsId);
							list.push(dataEntity);
						}
					}
					
					for (var j = 0; j < addlist.length; j++) {
						var dataEntity = Seam.Remoting.createType("com.sysware.edm.dataentity.DataEntity");
						dataEntity.setDataEntityType(addlist[j].get('dataEntityType'));
						dataEntity.setDataEntityName(addlist[j].get('text'));
						if (addlist[j].get('isArray')) {
							dataEntity.setIsRef(2);
						} else {
							dataEntity.setIsRef(addlist[j].get('isRef'));
						}
						dataEntity.setDataCenterID(self.dataObjectTree.dataCenterId);
						dataEntity.setDimension(addlist[j].get('dimension') == undefined
										? "1"
										: addlist[j].get('dimension'));
						dataEntity.setValue(addlist[j].get('value') != undefined
										? addlist[j].get('value')
										: "");
						dataEntity.setParentDataEntityID("0");
						dataEntity.setCustomTypeItemID("0");
						dataEntity.setFileID(addlist[j].get('fileID'));
						dataEntity.setCustomTypeParentID("0");
						dataEntity.setUpdateStatus("0");
						dataEntity.setUnit(addlist[j].get("unit"));
						dataEntity.setInout(addlist[j].get('inout'));
						dataEntity.setDataEntityCategoryTag(addlist[j].get('dataEntityCategoryTag'));
						dataEntity.setIsArray(addlist[j].get('isArray'));
						dataEntity.setDescription(addlist[j].get('description'));
						dataEntity.setDataEntityCategoryTagName(addlist[j].get('dataEntityCategoryTagName'));
						dataEntity.setDataEntityCategoryTagCenterID(addlist[j].get('dataEntityCategoryTagCenterID'));
						dataEntity.setDcategoryinstanceid(self.dataObjectTree.datacCategoryInsId);
						list.push(dataEntity);
					}
					
					var removedRecords = store.removedRecords;// 删除的数据
					for (var k = 0; k < removedRecords.length; k++) {
						if (removedRecords[k].get('dataEntityID') != undefined
								&& removedRecords[k].get('dataEntityID') != "") {
							/*
							 * edit by suny 2011-04-21
							 * bug现象：删除一条数据，点击保存，dataEntity为空
							 * 修改为：通过createType的方式创建dataEntity
							 */
							var dataEntity = Seam.Remoting.createType("com.sysware.edm.dataentity.DataEntity");
//							var dataEntity = Seam.Component.newInstance("DataEntity");
							dataEntity.setDataEntityID(removedRecords[k].get('dataEntityID'));
							dataEntity.setDataCenterID(removedRecords[k].get('dataCenterID'));
							dataEntity.setUpdateStatus("2");
							dataEntity.setDcategoryinstanceid(self.dataObjectTree.datacCategoryInsId);
							list.push(dataEntity);
						}
					}
					
					DataEntitys.setDelist(list);
					if (list.length == 0) {
						button.enable();
						loadmask.hide();
						return;
					}
					
					Seam.Component.getInstance("dataEntity_DataEntityRemote")
							.createDataEntities(DataEntitys, function(result) {
								self.dataObjectTree.getSelectionModel().clearSelections();
								self.dataObjectTree.getView().refresh();
								self.dataObjectTree.getStore().commitChanges();
								self.dataObjectTree.getStore().removedRecords = [];
								store.reload({
									callback : function() {
										loadmask.hide();
										button.enable();
									}
								});
								if (result != "false") {
									Ext.example.msg(getResource('resourceParam575') + "",
												 getResource('resourceParam1072') + "");
								}
							});
				}
			}, '-', {// 废弃
						text : '' + getResource('resourceParam1068') + '',
						id : 'dataObjectColumnTreeEdit',
						iconCls : 'edit1',
						hidden : true,
						handler : function() {
							if (!self.dataObjectTree.unableEdm) {
								Ext.Msg.show({
											title : ''
													+ getResource('resourceParam575')
													+ '',
											msg : ''
													+ getResource('resourceParam1070')
													+ '！',
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.ERROR
										});
								return false;
							}
							var selectedRecords = self.dataObjectTree
									.getEnableCheckNodes();
							if (selectedRecords.length < 1) {
								Ext.Msg.show({
											title : ''
													+ getResource('resourceParam1074')
													+ '',
											msg : ''
													+ getResource('resourceParam1071')
													+ '',
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.ERROR
										});
								return false;
							}
							function callback(win, arrNodes) {
								var list = new Array();
								var sourceDataIds = new Array();
								var dataRelationVos = Seam.Remoting
										.createType("com.sysware.edm.dataentity.DataRelationVo");
								for (var i = 0; i < selectedRecords.length; i++) {
									sourceDataIds.push(selectedRecords[i]
											.get("dataEntityID"));
									for (var j = 0; j < arrNodes.length; j++) {
										var dataRelationVo = Seam.Remoting
												.createType("com.sysware.edm.dataentity.DataRelationVo");
										dataRelationVo
												.setSourceDataID(selectedRecords[i]
														.get("dataEntityID"));
										dataRelationVo
												.setSourceDataCenterID(selectedRecords[i]
														.get("dataCenterID"));
										dataRelationVo.setSourceDataType(0);
										dataRelationVo.setDataRelationType(21);
										dataRelationVo
												.setSourceCategoryInsID(selectedRecords[i]
														.get("dcategoryinstanceid"))
										dataRelationVo
												.setSourceDataRevision(selectedRecords[i]
														.get("revision"));
										dataRelationVo
												.setDestinationDataCenterID(arrNodes[j].attributes.dataCenterID);
										dataRelationVo
												.setDestCategoryInsPath(arrNodes[j].attributes.treepath);
										dataRelationVo
												.setSourceCategoryInsPath(self.dataObjectTree.taskPath);
										dataRelationVo
												.setDestinationCategoryInsID(arrNodes[j].attributes.id);
										list.push(dataRelationVo);
									}
								}
								dataRelationVos.setSourceDataID(sourceDataIds
										.join(","));
								dataRelationVos.setChildren(list);
								Seam.Component
										.getInstance("dataEntity_DataEntityRemote")
										.saveToDataCenter(dataRelationVos,
												function(result) {

												});
								win.close();
							}
							dataCenterLocation.init(selectedRecords[0]
											.get("dataEntityID"),
									self.dataObjectTree.dataCenterId, callback);
						}
					}, {
						text : '' + getResource('resourceParam1069') + '',
						iconCls : 'search1',
						id : 'dataObjectColumnTreeDataCenterView',
						handler : function(button) {
							if (this.text == ""
									+ getResource('resourceParam1069') + "") {
								self.viewDataCenter(button);
							} else {
								self.setConfigs(self.dataCenterIDBak,
										self.dataCategoryInsIDBak,
										self.enableEdit)
							}
						}
					}, '-', 
//                        {zhengjg 去掉数据的查询功能
//						text : getResource('resourceParam652'),
//						id : 'dataObjectColumnTreeSearch',
//						iconCls : 'search1',
//						menu : self.searchPanel,
//						handler : function() {
//							if (!self.categoryInstancePanel.hidden) {// 查询数据中心
//								var thisnode = cateInstanceTree.checkinstancenode;
//								searchPanel.mainpanel.getForm().reset();
//
//								searchPanel.mainpanel
//										.remove(searchPanel.taskFormItem)
//								searchPanel.mainpanel
//										.remove(searchPanel.projectFormItem)
//								var projectFormItemConfig = {
//									fieldLabel : getResource('resourceParam463')
//											+ '',
//									width : 120
//								};
//								Ext.apply(projectFormItemConfig, {
//											"value" : thisnode.attributes.categoryName,
//											"name" : "projectName",
//											"fieldLabel" : ''
//													+ getResource('resourceParam1746')
//													+ '',// 对象名称
//											"disabled" : true
//										});
//								searchPanel.projectFormItem = new Ext.form.TextField(projectFormItemConfig);
//								searchPanel.mainpanel.insert(0,
//										searchPanel.projectFormItem);
//
//								searchPanel.projectFormItem
//										.setValue(thisnode.attributes.categoryName);
//								self.searchResultTreeGrid.getView().refresh();
//								var dcategoryinstanceid = thisnode.id;
//								searchPanel.setParameter("dcategoryInsid",
//										dcategoryinstanceid);
//								searchPanel.setParameter("projectFormItemName",
//										thisnode.attributes.categoryName);
//							} else {// 查询任务数据
//								var type = self.isProject ? 0 : 1
//								Ext.Ajax.request({
//									url : '../JSON/task_TaskRemote.getProjectAndTaskInfo',
//									success : function(response, opts) {
//										searchPanel.mainpanel.getForm().reset();
//
//										searchPanel.mainpanel
//												.remove(searchPanel.taskFormItem)
//										searchPanel.mainpanel
//												.remove(searchPanel.projectFormItem)
//										var projectFormItemConfig = {
//											fieldLabel : getResource('resourceParam463')
//													+ '',
//											width : 120
//										};
//										Ext.apply(projectFormItemConfig, {
//													"value" : "",
//													"name" : "projectName",
//													"disabled" : true
//												});
//										searchPanel.projectFormItem = new Ext.form.TextField(projectFormItemConfig);
//										searchPanel.mainpanel.insert(0,
//												searchPanel.projectFormItem);
//
//										var taskFormItemConfig = {
//											fieldLabel : getResource('resourceParam733')
//													+ '',
//											width : 120
//										}
//										Ext.apply(taskFormItemConfig, {
//													"value" : "",
//													"name" : "taskName",
//													"disabled" : true,
//													"isShow" : true
//												});
//										searchPanel.taskFormItem = new Ext.form.TextField(taskFormItemConfig);
//										searchPanel.mainpanel.insert(1,
//												searchPanel.taskFormItem);
//
//										var obj = Ext
//												.decode(response.responseText);
//										searchPanel.projectFormItem
//												.setValue(obj.projectName);
//										if (!self.isProject) {
//											searchPanel.taskFormItem
//													.setValue(obj.taskName);
//										}
//										self.searchResultTreeGrid.getView()
//												.refresh();
//										var categoryPrefix = self.isProject
//												? "project_"
//												: "task_";
//										var dcategoryinstanceid = categoryPrefix
//												+ self.dataCategroyInsID;
//										searchPanel.setParameter(
//												"dcategoryInsid",
//												dcategoryinstanceid);
//										searchPanel.setParameter(
//												"projectFormItemName",
//												obj.projectName);
//										searchPanel.setParameter(
//												"taskFormItemName",
//												obj.taskName);
//									},
//									failure : function(response, opts) {
//									},
//									method : 'POST',
//									params : {
//										node : self.dataCategroyInsID,
//										type : type
//									}
//								})
//							}
//						}
//					},
                     {
						text : '' + getResource('resourceParam1081') + '',
						iconCls : 'refresh1',
						id : 'dataObjectColumnTreeRefresh',
						handler : function() {// 刷新数据（如果有选中节点，只刷新子数据，否则刷新顶层数据）
							var rc = self.dataObjectTree.getSelectionModel()
									.getSelected();
							self.dataObjectTree.getStore().on('beforeload',
									function(store, options) {
										if (rc == undefined) {
											this.proxy = new Ext.data.HttpProxy(
													{
														method : 'POST',
														url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
													})
											options.params = Ext.apply(
													options.params, {
														dataCenterID : self.dataObjectTree.dataCenterId,
														parentDataEntityID : self.dataObjectTree.datacCategoryInsId
													});
										} else {
											this.proxy = new Ext.data.HttpProxy(
													{
														method : 'POST',
														url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
													})
											options.params = Ext.apply(
													options.params, {
														dataCenterID : rc
																.get('dataCenterID'),
														dataEntityID : rc
																.get('dataEntityID'),
														parentDataEntityID : rc
																.get('parentDataEntityID'),
														dataEntityType : rc
																.get('dataEntityType'),
														customTypeParentID : rc
																.get('customTypeParentID'),
														customTypeItemID : rc
																.get('customTypeItemID'),
														isRef : (rc
																.get("dimension")
																.indexOf("*") > 0 || Number(rc
																.get("dimension")) > 1)
																? 2
																: rc
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
										self.dataObjectTree.getStore()
												.expandNode(rc);
										self.dataObjectTree.getSelectionModel()
												.clearSelections();
									}
								}
							} else {
								loadObject = {
									callback : function() {
										self.dataObjectTree.getSelectionModel()
												.clearSelections();
									}
								}
							}
							self.dataObjectTree.getStore().load(loadObject);
							self.dataObjectTree.getView().refresh();
							self.dataObjectTree.getStore().removedRecords = [];
						}
					}, '-', {
						text : getResource('resourceParam3021') + '', // 批量设置标签
						id : 'btnBatchSetTag',
						iconCls : 'icon-label-in',
						handler : function() {
							var smRow = self.dataObjectTree.getSelectionModel();
							// 是否有选中行
							var boolSelected = smRow.getCount() > 0;
							if (! boolSelected) {
								Ext.Msg.show({
									   title:'提示',
									   msg: '请至少选择一条记录才能进行此项操作！',
									   buttons: Ext.Msg.OK,
									   buttonText: '确定',
									   icon: Ext.MessageBox.INFO
									});
									return false;
							}
							
							Ext.Msg.confirm('确认',
									'批量设置会覆盖所选数据原有的数据标签位置。<br>' + 
									'您是否要继续进行此项操作？',
									function(result){
									   if (result == 'no') {
										   return false;
									   } else {
										   dataLabelLocation.init(null, null, null,
													function(insId_s, centerId_s){
														// 迭代选中的行，检查是否存在已经设置了数据中心标签的数据实例
														smRow.each(function(r){
															self.dataObjectTree.stopEditing();
															r.set('dataEntityCategoryTag', insId_s);
															r.set('dataEntityCategoryTagCenterID', centerId_s);
															var tmp = r.get('dataEntityCategoryTagName');
														    tmp = tmp.substring(tmp.length - 1, tmp.length) == '_'
														    	? tmp.substring(0, tmp.length - 1)
														    	: (tmp + '_');
														    r.set('dataEntityCategoryTagName', tmp);
														   
														    r.markDirty();
														});
													}
											);
									   }
								   	});
						}
					}, {
						text : '批量取消标签',
						iconCls : 'icon-label-out',
						handler : function() {
							var smRow = self.dataObjectTree.getSelectionModel();
							// 是否有选中行
							var boolSelected = smRow.getCount() > 0;
							if (! boolSelected) {
								Ext.Msg.show({
									   title:'提示',
									   msg: '请至少选择一条记录才能进行此项操作！',
									   buttons: Ext.Msg.OK,
									   buttonText: '确定',
									   icon: Ext.MessageBox.INFO
									});
									return false;
							}
							
							Ext.Msg.confirm('确认',
											'您是否要取消所选数据的标签位置？',
											function(result){
											   if (result == 'no') {
												   return false;
											   } else {
												   // 迭代选中的行，检查是否存在已经设置了数据中心标签的数据实例
												   smRow.each(function(r){
													   self.dataObjectTree.stopEditing();
													   r.set('dataEntityCategoryTag', '');
													   r.set('dataEntityCategoryTagCenterID', '');
													   // 对 dataEntityCategoryTagName的编辑，只是为能够显示编辑过的状态
													   // 也可通过给表格所在底层htmlElements的TD的class添加x-grid3-dirty-cell的类名达到相同目的
													   // cell.className = cell.className + ' x-grid3-dirty-cell';
													   var tmp = r.get('dataEntityCategoryTagName');
													   tmp = tmp.substring(tmp.length - 1, tmp.length) == '_'
														   ? tmp.substring(0, tmp.length - 1)
														   : (tmp + '_');
													   r.set('dataEntityCategoryTagName', tmp);
													   
													   r.markDirty();
												   });
											   }
										   	});
						}
					}, new Ext.form.ComboBox({
						id : 'dataObjectColumnTreeDefaultType',
						width : 100,
						store : new Ext.data.JsonStore({
							url : '../JSON/dynamicmodel_datatype.getAllDataTypeList',
							method : 'POST',
							fields : [{
										name : 'datatypeId',
										mapping : 'dataTypeId'
									}, {
										name : 'datatypeName',
										mapping : 'dataTypeName'
									}, {
										name : 'rank',
										mapping : 'rank'
									}, {
										name : 'dataType',
										mapping : 'dataType'
									}]
						}),
						triggerAction : 'all',
						valueField : 'datatypeName',
						displayField : 'datatypeName',
						emptyText : getResource('resourceParam4040'),
						editable : false,
						lazyRender : true,
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
								self.setParameters({
											"defaultIsRef" : record.get("rank")
										}, {
											"defaultExtendsTypeRealName" : record
													.get('dataType')
										}, {
											"defaultTypeId" : record
													.get('datatypeId')
										}, {
											"defaultTypeName" : record
													.get('datatypeName')
										})
							}
						}
					})]
		});
		dataObjectPanel.dataPanel.addEvents("beforedeactivate");
		return dataObjectPanel.dataPanel;
	},
	/**
	 * 
	 * @param dataCenterID
	 * @param dataCategroyInsID
	 * @param enableEdit
	 * @param forceEdit
	 *            强制能修改
	 */
	setConfigs : function(dataCenterID, dataCategroyInsID, enableEdit,
			forceEdit) {// 初始化设置
		var dataId = dataCenterID.toString().indexOf("p") == 0
				? dataCenterID
				: dataCategroyInsID;

		// 权限查询
		var conn = synchronize.createXhrObject();
		var myurl = "../JSON/privilege_DataPrivilegeRemote.getDataManipultations?dataId="
				+ dataId + "&d=" + new Date();
		conn.open("GET", myurl, false);
		conn.send(null);
		var obj = Ext.util.JSON.decode(conn.responseText);
		if (obj.remove) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam499') + '',
						msg : obj.message,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return false;
		}

		var self = this;
		this.dataCenterIDBak = dataCenterID.toString();
		this.dataCategoryInsIDBak = dataCategroyInsID.toString();
		self.dataObjectTree.show();
		self.dataCenterGrid.hide();
		self.searchResultTreeGrid.hide();
		self.categoryInstancePanel.hide();
		self.dataCenterGridList.hide();
		self.edmLabel.show();
		/**
		 * Updated by YangJin'gang at 2010-01-04
		 */
		// this.dataObjectTree.setWidth(dataObjectPanel.dataPanel.getWidth() -
		// 2);
		// dataObjectPanel.dataPanel.fireEvent("bodyresize", this);
		this.isProject = this.dataCenterIDBak.indexOf("p") == 0;
		this.dataCenterID = this.isProject
				? this.dataCenterIDBak.substr(1)
				: this.dataCenterIDBak;
		this.dataCategroyInsID = dataCategroyInsID.toString();
		if (forceEdit != undefined && forceEdit == true) {
			this.enableEdit = true;
		} else {
			this.enableEdit = enableEdit && obj.modify;
		}
		if (dataCenterID == "" || dataCategroyInsID == "") {
			this.enableEdit = false;
		}
		if (!self.enableEdit) {
			Ext.getCmp("dataObjectColumnTreeAdd").disable();
			Ext.getCmp("dataObjectColumnTreeEdit").disable();
			Ext.getCmp("dataObjectColumnTreeDel").disable();
			Ext.getCmp("dataObjectColumnTreeSave").disable();
			Ext.getCmp("dataObjectColumnTreeRefresh").disable();
			// Ext.getCmp("dataObjectColumnTreeDataSetTagBat").disable();
			// Ext.getCmp("dataObjectColumnTreeSearch").disable();
		} else {
			Ext.getCmp("dataObjectColumnTreeAdd").enable();
			Ext.getCmp("dataObjectColumnTreeEdit").enable();
			Ext.getCmp("dataObjectColumnTreeDel").enable();
			Ext.getCmp("dataObjectColumnTreeSave").enable();
			Ext.getCmp("dataObjectColumnTreeRefresh").enable();
			// Ext.getCmp("dataObjectColumnTreeDataSetTagBat").enable();
			// Ext.getCmp("dataObjectColumnTreeSearch").enable();
		}
		var dataCenterPrefix = "project_";
		var dataCategoryPrefix = self.isProject
				? "projectdatas_"
				: "taskdatas_";
		this.dataObjectTree.dataCenterId = dataCenterPrefix + self.dataCenterID;
		this.dataObjectTree.datacCategoryInsId = dataCategoryPrefix
				+ self.dataCategroyInsID;
		var srcDataCenterType = self.isProject ? "project" : "task"
		dataObjectTreeGrid.setParameters({
					"enableEdit" : this.enableEdit
				}, {
					"dataCenterId" : this.dataCenterID
				}, {
					"datacCategoryInsId" : this.dataCategroyInsID
				}, {
					"isProject" : this.isProject
				});
		dataObjectTreeGrid.setParameters({
					"dataCenterPrefixID" : this.dataObjectTree.dataCenterId
				}, {
					"dataCategoryPrefixID" : this.dataObjectTree.datacCategoryInsId
				});
		Ext.Ajax.request({
			url : '../JSON/datacenter_DataCenterRemote.getDataCenterRelationBySrcDataCategoryInsID',
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);
				var edmName = (obj.sourceDataObject[0] != undefined)
						? obj.sourceDataObject[0].categoryInstanceName
						: "?";
				var edmCategoryinstanceId = (obj.sourceDataObject[0] != undefined)
						? obj.sourceDataObject[0].categoryInstanceID
						: "";
				var parentEdmCategoryinstanceId = (obj.parentSourceDataObject[0] != undefined)
						? obj.parentSourceDataObject[0].categoryInstanceID
						: "";

//				Ext.get("dataObjectPanel_dataEntityEDM").dom.innerHTML = edmName;
//				// 设置“取消绑定”按钮可见
//				var objID_cancelBand = Ext.get("ID_cancelBand").dom;
//				if (edmName.indexOf('?') == -1) {
//					objID_cancelBand.style.display = '';
//					objID_cancelBand.curCenterId = self.dataObjectTree.datacCategoryInsId;
//				} else {
//					objID_cancelBand.style.display = 'none';
//					objID_cancelBand.curCenterId = '-1';
//				}
//				Ext.get("ID_viewDataObject").dom.style.display = (edmName == "?"
//						? "none"
//						: "");
				dataObjectTreeGrid.setParameter("EdmCategoryInstanceId",
						edmCategoryinstanceId);
				dataObjectTreeGrid.setParameter("parentEdmCategoryinstanceId",
						parentEdmCategoryinstanceId);
				self.EdmCategoryInstanceId = edmCategoryinstanceId;

				if (obj.parentSourceDataObject[0] == undefined
						&& obj.parentType != "none") {
					dataObjectTreeGrid.setParameter("setEDMAble", false);
				} else {
					dataObjectTreeGrid.setParameter("setEDMAble", true);
				}
			},
			failure : function(response, opts) {
			},
			method : 'POST',
			params : {
				srcDataCenterID : self.dataObjectTree.datacCategoryInsId,
				srcDataCenterType : srcDataCenterType
			}
		})
		if (!obj.view) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam499') + '',
						msg : getResource('resourceParam1049'),
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return false;
		}
		this.dataObjectTree.getStore().on('beforeload',
				function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
					})
					options.params = Ext.apply(options.params, {
						dataCenterID : self.dataObjectTree.dataCenterId,
						parentDataEntityID : self.dataObjectTree.datacCategoryInsId
					});
				});
		this.dataObjectTree.getSelectionModel().clearSelections()
		this.dataObjectTree.getStore().load();
		if (!this.isOnDataCenterRelation) {
//			Ext.get("dataObjectPanel_dataEntityEDM").on("click", function() {
//						self.setDataCenterRelation()
//					});
//			Ext.get("ID_cancelBand").on("click", function() {
//						self.cancelDataCenterBandle()
//					});
//			Ext.get("ID_viewDataObject").on("click", function() {
//						self.setDataCenterViewConfig();
//					});
			this.isOnDataCenterRelation = true;
		}
		Ext.getCmp("dataObjectColumnTreeDataCenterView").setText(""
				+ getResource('resourceParam1069') + "");
	},
	setDataCenterViewConfig : function() {// 设置查看数据中心数据
		var self = this;
		this.dataObjectTree.hide();
		this.dataCenterGrid.show();

		Ext.getCmp("dataObjectColumnTreeAdd").disable();
		Ext.getCmp("dataObjectColumnTreeEdit").disable();
		Ext.getCmp("dataObjectColumnTreeDel").disable();
		Ext.getCmp("dataObjectColumnTreeSave").disable();
		Ext.getCmp("dataObjectColumnTreeRefresh").disable();
		// Ext.getCmp("dataObjectColumnTreeDataSetTagBat").disable();
		// Ext.getCmp("dataObjectColumnTreeSearch").disable();
		this.dataCenterGrid.getStore().removeAll();
		var srcDataCenterType = !self.isProject ? "task" : "project"
		this.dataCenterGrid.getStore().on('beforeload',
				function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/datacenter_DataCenterRemote.getDataInstanceByResouceId'
					})
					options.params = Ext.apply(options.params, {
						srcDataCenterID : self.dataObjectTree.datacCategoryInsId,
						srcDataCenterType : srcDataCenterType
					});
				});
		dataCenterGridView.setParameters({
					"srcDataCenterId" : self.dataObjectTree.datacCategoryInsId
				}, {
					"srcDataCenterType" : srcDataCenterType
				})
		this.dataCenterGrid.getSelectionModel().clearSelections()
		this.dataCenterGrid.getStore().load();
		this.dataCenterGrid.setHeight(dataObjectPanel.dataPanel.getHeight()
				- 47);
		this.dataCenterGrid.setWidth(dataObjectPanel.dataPanel.getWidth() - 2);
		// Ext.getCmp("dataObjectColumnTreeDataCenterView").setText(""
		// + getResource('resourceParam1078') + ""
		// + getResource('resourceParam474') + "");
	},
	setSearchResultTreeGridConfig : function(pressed) {// 查看查询结果设置
		var self = this;
		if (!pressed) {
			this.dataObjectTree.show();
			this.dataCenterGrid.hide();
			this.searchResultTreeGrid.hide();
			self.edmLabel.show();
			this.dataObjectTree.setHeight(dataObjectPanel.dataPanel.getHeight()
					- 47);
			if (!self.enableEdit) {
				Ext.getCmp("dataObjectColumnTreeAdd").disable();
				Ext.getCmp("dataObjectColumnTreeEdit").disable();
				Ext.getCmp("dataObjectColumnTreeDel").disable();
				Ext.getCmp("dataObjectColumnTreeSave").disable();
				Ext.getCmp("dataObjectColumnTreeRefresh").disable();
				// Ext.getCmp("dataObjectColumnTreeDataSetTagBat").disable();
			} else {
				Ext.getCmp("dataObjectColumnTreeAdd").enable();
				Ext.getCmp("dataObjectColumnTreeEdit").enable();
				Ext.getCmp("dataObjectColumnTreeDel").enable();
				Ext.getCmp("dataObjectColumnTreeSave").enable();
				Ext.getCmp("dataObjectColumnTreeRefresh").enable();
				// Ext.getCmp("dataObjectColumnTreeDataSetTagBat").enable();
			}
		} else {
			Ext.getCmp("dataObjectColumnTreeAdd").disable();
			Ext.getCmp("dataObjectColumnTreeEdit").disable();
			Ext.getCmp("dataObjectColumnTreeDel").disable();
			Ext.getCmp("dataObjectColumnTreeSave").disable();
			Ext.getCmp("dataObjectColumnTreeRefresh").disable();
			// Ext.getCmp("dataObjectColumnTreeDataSetTagBat").disable();
			self.edmLabel.hide();
			this.dataObjectTree.hide();
			this.dataCenterGrid.hide();
			this.searchResultTreeGrid.show();
			this.searchResultTreeGrid.setHeight(dataObjectPanel.dataPanel
					.getHeight()
					- 27);
			this.searchResultTreeGrid.setWidth(dataObjectPanel.dataPanel
					.getWidth()
					- 2);
		}
	},
	setDataCenterRelation : function() {// 设置关联数据对象
		
		var self = this;
		if (!self.enableEdit) {
			return false;
		}
		function callback(locationWin, selectedNode) {
			if (!selectedNode) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam1074') + '',
							msg : '您必须' + getResource('resourceParam503')
									+ '一个' + getResource('resourceParam615')
									+ '',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
			} else {
				Ext.Msg.show({
					title : '' + getResource('resourceParam1074') + '',
					msg : '此' + getResource('resourceParam478') + '动作可能造成'
							+ getResource('resourceParam474') + '的标签失效！',
					buttons : Ext.MessageBox.OKCANCEL,
					icon : Ext.MessageBox.WARNING,
					fn : function(buttonId) {
						if (buttonId == "ok") {
							Ext.get("dataObjectPanel_dataEntityEDM").dom.innerHTML = selectedNode.attributes.categoryName;
							locationWin.close();
							var dataCenterRelation = Seam.Remoting.createType("com.sysware.edm.datacenter.DataCenterRelation");
							dataCenterRelation.setSrcDataCenterID(self.dataObjectTree.datacCategoryInsId);
							dataCenterRelation.setDestDataCenterID(selectedNode.attributes.id);
							dataCenterRelation.setUpdateStatus(1);
							Seam.Component.getInstance("datacenter_DataCenterRemote")
									.allAddUpdateDelDataCenterRelation(
											dataCenterRelation,
											function(result) {
												if (result == "true") {
													dataObjectTreeGrid
															.setParameter(
																	"EdmCategoryInstanceId",
																	selectedNode.attributes.id);
													self.EdmCategoryInstanceId = selectedNode.attributes.id;
												}
											});
						}
					}
				});
			}
		}
		var EdmCategoryInstanceInitId = this.isProject
				? ""
				: dataObjectTreeGrid.parameters["parentEdmCategoryinstanceId"];
		if (!dataObjectTreeGrid.parameters["setEDMAble"]) {
			Ext.Msg.show({
						title : '' + getResource('resourceParam575') + '',
						msg : '请先指定' + getResource('resourceParam1080') + '（'
								+ getResource('resourceParam463') + '）的关联'
								+ getResource('resourceParam615') + '！',
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.ERROR
					});
			return false;
		}
		dataCenterLocation.init(EdmCategoryInstanceInitId, "",
				self.dataObjectTree.dataCenterId, callback);
	},
	/**
	 * 数据中心的“取消绑定”
	 */
	cancelDataCenterBandle : function() {
		var objID_cancelBand = Ext.get("ID_cancelBand").dom;
		var objID_viewDataObject = Ext.get("ID_viewDataObject").dom;
		var valueCurCenterId = objID_cancelBand.curCenterId;
		if (valueCurCenterId == '-1') {
			Ext.Msg.alert('提示', '当前选中项目或任务丢失，请重新选择！');
			return;
		}

		Ext.Msg.show({
			title : '' + getResource('resourceParam1074') + '',
			msg : '此' + getResource('resourceParam478') + '动作可能造成'
					+ getResource('resourceParam474') + '的标签失效！',
			buttons : Ext.MessageBox.OKCANCEL,
			icon : Ext.MessageBox.WARNING,
			fn : function(buttonId) {
				if (buttonId == "ok") {
					var dataCenterRelation = Seam.Remoting
							.createType("com.sysware.edm.datacenter.DataCenterRelation");
					dataCenterRelation.setSrcDataCenterID(valueCurCenterId);
					dataCenterRelation.setUpdateStatus('2');
					Seam.Component.getInstance("datacenter_DataCenterRemote")
							.allAddUpdateDelDataCenterRelation(
									dataCenterRelation, function(result) {
										if (result == "true") {
											Ext.example.msg('提示',
													'您选择项目已经取消了绑定。');
											Ext
													.get("dataObjectPanel_dataEntityEDM").dom.innerHTML = '?';
											objID_cancelBand.style.display = 'none';
											objID_viewDataObject.style.display = "none";
										}
									});
				}
			}
		});
	},
	/**
	 * 查看数据中心
	 */
	viewDataCenter : function(button) {
		var self = this;
		// 设置菜单card显示状态
		self.edmLabel.hide();
		self.dataObjectTree.hide();
		self.dataCenterGrid.hide();
		self.searchResultTreeGrid.hide();
		self.categoryInstancePanel.hide();
		self.dataCenterGridList.getTopToolbar().hide();
		self.dataCenterGridList.show();

		// 设置按钮的显示text
		button.setText(getResource('resourceParam1078')
				+ getResource('resourceParam474'))

		// 设置按钮disabled
		Ext.getCmp("dataObjectColumnTreeAdd").disable();
		Ext.getCmp("dataObjectColumnTreeEdit").disable();
		Ext.getCmp("dataObjectColumnTreeDel").disable();
		Ext.getCmp("dataObjectColumnTreeSave").disable();
		Ext.getCmp("dataObjectColumnTreeRefresh").disable();
		// Ext.getCmp("dataObjectColumnTreeDataSetTagBat").disable();
		// Ext.getCmp("dataObjectColumnTreeSearch").disable();

		// 设置尺寸
		var parentPanel = dataObjectPanel.dataPanel;
		this.dataCenterGridList.setHeight(parentPanel.getHeight() - 27);
		this.dataCenterGridList.setWidth(parentPanel.getWidth() - 2);
	},
	viewDataInstance : function(id, name) {
		var self = this;
		self.edmLabel.hide();
		self.dataObjectTree.hide();
		self.dataCenterGrid.hide();
		self.searchResultTreeGrid.hide();
		var conn = synchronize.createXhrObject();
		var url = "../JSON/datacenter_DataCenterRemote.getCategoryInstance?categoryInstanceID="
				+ id;
		conn.open("GET", url, false);
		conn.send(null);
		var respText = conn.responseText;
		var obj = Ext.util.JSON.decode(respText);

		cateInstancePanel.catetree.getRootNode().setId(id);
		cateInstancePanel.catetree.getRootNode().setText(name);
		Ext.apply(cateInstancePanel.catetree.getRootNode().attributes, {
					categoryName : name
				});
		if ('' != obj.ci.icon) {
			cateInstancePanel.catetree.getRootNode().getUI().getIconEl().src = "../base/icons/edm/"
					+ obj.ci.icon;
		} else {
			cateInstancePanel.catetree.getRootNode().getUI().getIconEl().src = "../base/icons/edm/dataObject.png";
		}
		cateInstancePanel.catetree.getRootNode().reload();
		cateInstancePanel.catetree.getRootNode().expand();
		cateInstancePanel.catetree.fireEvent('click',
				cateInstancePanel.catetree.getRootNode());

		self.categoryInstancePanel.show();
		self.dataCenterGridList.hide();
		this.categoryInstancePanel.setHeight(dataObjectPanel.dataPanel
				.getHeight()
				- 30);
		this.categoryInstancePanel.setWidth(dataObjectPanel.dataPanel
				.getWidth()
				- 2);
	},
	viewWareHouse : function(wsid, wsname, categoryid, desc) {
		var self = this;
		self.edmLabel.hide();
		self.dataObjectTree.hide();
		self.dataCenterGrid.hide();
		self.searchResultTreeGrid.hide();

		self.categoryInstancePanel.hide();
		self.dataCenterGridList.hide();
		dataCenterWareHouse.view(wsid, wsname, categoryid, desc);
		self.wareHousePanel.show();

		this.wareHousePanel.setHeight(dataObjectPanel.dataPanel.getHeight()
				- 30);
		this.wareHousePanel.setWidth(dataObjectPanel.dataPanel.getWidth() - 2);
	},
	setParameters : function() {// 设置内部属性
		for (var i = 0; i < arguments.length; i++) {
			var param = arguments[i];
			for (var key in param) {
				this.parameters[key] = param[key];
			}
		}
	},
	setParameter : function(key, value) {// 设置内部属性信息
		this.parameters[key] = value;
	}
}
