Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var extendTypeMain = {
	modelEdit : true,
	approvalModel : false,
	mainUrl : '../JSON/dynamicmodel_datatype.getDataTypeList?datatypeRank=2'
}
extendTypeMain.sizePerPage = 25;
extendTypeMain.init = function() {
	Ext.QuickTips.init();
	extendTypeMain.hm = false;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var comStore = new Ext.data.Store({
				reader : new Ext.data.ArrayReader({
							idIndex : 0
						}, Ext.data.Record.create([{
									name : 'id'
								}, {
									name : 'name'
								}]))
			});
	var comData = [[0, getResource('resourceParam947')],
			[1, getResource('resourceParam948')],
			[2, getResource('resourceParam1266')],
			[3, getResource('resourceParam9090')],
			[4, getResource('resourceParam9091')]];
	comStore.loadData(comData);
	var filterCombo = new Ext.ux.form.LovCombo({
		id : 'filterCombo',
		width : 80,
		listWidth : 120,
		hideOnSelect : false,
		maxHeight : 200,
		store : comStore,
		triggerAction : 'all',
		valueField : 'id',
		displayField : 'name',
		mode : 'local',
		beforeBlur : Ext.emptyFn,
		emptyText : '状态'
		});
	var com_record = Ext.data.Record.create([{
				name : 'name'
			}, {
				name : 'id'
			}]);
	var com_selectAll = new com_record({
				name : getResource('resourceParam5029'),
				id : '-1'
			});
	var com_deSelectAll = new com_record({
				name : '' + getResource('resourceParam808') + '',
				id : '-2'
			});
	filterCombo.on('expand', function(combo) {
				var store = combo.getStore();
				var firstRecord = store.getAt(0);
				if (firstRecord.get('id') == -1 || firstRecord.get('id') == -2) {
					store.remove(firstRecord);
				}
				var checkSum = null;// 选中的总数
				if (combo.getCheckedValue() == '') {
					checkSum = 0;
				} else {
					checkSum = combo.getCheckedValue().split(',').length;
				}
				if (checkSum == store.getCount()) {
					// 已全部选中
					store.insert(0, com_deSelectAll);
				} else {
					store.insert(0, com_selectAll);
				}
			});
	filterCombo.on('select', function(combo, record, index) {
				if (record.get('id') == -1) {
					// click selectAll
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.selectAll();
					combo.fireEvent('blur');
				} else if (record.get('id') == -2) {
					// click deSelectAll
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, com_selectAll);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, com_selectAll);
					}
				}
			});
	filterCombo.on('blur', function() {
				if(filterCombo.lastCheckedValue==filterCombo.getCheckedValue()){
					return;
				}
				var statuses = filterCombo.getValue();
				if (statuses.length == 0) {
					filterCombo.setRawValue('')// getResource('resourceParam1474'));//
												// 所有状态
				}
				if(extendTypeMain.hm){
					searchHistory(extendTypeMain.hmDatatypeId);
				}else{
					search();
				}
			    filterCombo.lastCheckedValue = filterCombo.getCheckedValue();
			});
	filterCombo.getStore().getAt(0).set('checked',true);
	filterCombo.getStore().getAt(1).set('checked',true);
	filterCombo.getStore().getAt(2).set('checked',true);
	filterCombo.getStore().getAt(3).set('checked',true);
	
	departmentUser.init('','',{
		userEmptyText : '创建者',
		userSelectCallback : search
	});
	departmentUser.userComb.setWidth(80);
	departmentUser.userComb.listWidth=150;
	departmentUser.userComb.allowBlank = true;
	
	var colArray = [new Ext.grid.RowNumberer(), sm, {
		header : '' + getResource('resourceParam1139') + '',
		dataIndex : 'datatypeName',
		width : 100,
		renderer : function(value, p, r) {
			return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
					+ value + '</a>'
		},
		editor : new Ext.form.TextField({
					enableKeyEvents : true,
					validator : function(value) {
						if (Ext.util.Format.trim(value).length == 0) {
							this.invalidText = ""
									+ getResource('resourceParam1089') + "";
							return false;
						}
						if (value.length > 50) {
							this.invalidText = ''
									+ getResource('resourceParam1271') + '';
							return false;
						}
						// if (hasReName(value)) {
						// this.invalidText = "您输入的名称已存在！";
						// return false;
						// }
						var reg = /^.*[/\\:\*\?\"<>\|]+.*$/;
						if (reg.test(value)) {
							this.invalidText = ""
									+ getResource('resourceParam1087') + "";
							return false;
						} else {
							return true;
						}
					}
				})
	}, {
		header : '' + getResource('resourceParam610') + '',
		dataIndex : 'basetypeName',
		width : 100,
		editor : new Ext.grid.GridEditor(new Ext.form.ComboBox({
			store : new Ext.data.Store({
		        proxy : new Ext.data.HttpProxy({
		                    method : 'GET',
		                    url : "../JSON/dynamicmodel_datatype.getDataTypeList?datatypeRank=4&start=0&limit=100"
		                }),
		        reader : new Ext.data.JsonReader({
		                    id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
		                }, [{
								name : 'datatypeName',
								mapping : 'datatypeName',
								type : 'string'
							}, {
								name : 'datatype',
								mapping : 'datatype',
								type : 'string'
							}])
		    }),
			triggerAction : 'all',
			valueField : 'datatypeName',
			displayField : 'datatypeName',
			editable : false,
			lazyRender : true,
			onSelect : function(record, index) {
				if (this.fireEvent('beforeselect', this, record, index) !== false) {
					var value = record.data[this.valueField
							|| this.displayField];
					this.setValue(value);
					this.collapse();
					this.fireEvent('select', this, record, index);
				}
				extendTypeMain.grid.getSelectionModel().getSelected().set(
						'datatype', record.get("datatype"));
			}
		}))
	}, {
		header : getResource('resourceParam500'),// 状态
		width : 70,
		renderer : function(value, p, r) {
			switch (value) {
				case 0 :
					return getResource('resourceParam947');// 编制中
				case 1 :
					return getResource('resourceParam948');// 审批中
				case 2 :
					return getResource('resourceParam1266');// 已发布
				case 3 :
					return getResource('resourceParam9090');// 修改中
				case 4 :
					return getResource('resourceParam9091');// 已废弃
			}
			return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
					+ value + '</a>'
		},
		dataIndex : 'status'
	}, {
		header : '' + getResource('resourceParam462'),
		width : 50,
		dataIndex : 'version',
		renderer : function(value, p, r) {
			return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;" onclick="Ext.getCmp(\'extendTypeGridViewHistory\').fireEvent(\'click\')">'
					+ value + '</a>';
		}
	}, {
		header : getResource('resourceParam1341'),
		dataIndex : 'userTrueName'
	}]
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : colArray
	})
	extendTypeMain.ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							method : 'GET',
							url : extendTypeMain.mainUrl
						}),
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, Ext.data.Record.create([{
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
						}, {
							name : 'checkStr',
							mapping : 'checkStr',
							type : 'string'
						}, {
							name : 'version',
							mapping : 'version',
							type : 'long'
						}, {
							name : 'status',
							mapping : 'status',
							type : 'long'
						}, {
							name : 'userId',
							mapping : 'userId',
							type : 'long'
						}, {
							name : 'userTrueName',
							mapping : 'userTrueName',
							type : 'string'
						}]))
			})

	extendTypeMain.grid = new Ext.grid.EditorGridPanel({
				store : extendTypeMain.ds,
				cm : cm,
				autoScroll : true,
				bodyStyle : 'border-top:0px;boder-left:0px;border-bottom:0px;',
				sm : sm,
				clicksToEdit : 2,
				viewConfig : {
					forceFit : true
				},
				bbar : new Ext.PagingToolbar({
					pageSize : extendTypeMain.sizePerPage,
					store : extendTypeMain.ds,
					displayInfo : true
				}),
				listeners : {
					'celldblclick' : function(g, r, c) {
						if (extendTypeMain.modelEdit == false) {
							return false;
						}
						var s = g.getStore();
						
						// 限制基类型保存后不能修改
						if(c==3){
							if(!s.getAt(r).isModified('basetypeName')){
								return false;
							}
						}
						
						var arr = document.cookie.split(';');
						var loginuserid = '';
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].indexOf('userid') != -1) {
								loginuserid = arr[i].split('=')[1];
								break;
							}
						}
						var userid = s.getAt(r).get('userId');
						if(userid==1&&loginuserid!=1){// 管理员创建的类型不允许其他人修改
							return false;
						}
						var status = s.getAt(r).get('status');
						switch (status) {
							case 0 :// 编制中,修改中,已发布
							case 2 :
							case 3 :
								return true;
							case 1 :// 审批中,已废弃
							case 4 :
								return false;
						}
						
						
					}
				}
			})
	function hasReName(value) {
		var ss = false;
		var num = 0;
		var rows = extendTypeMain.ds
		for (var i = 0; i < rows.getCount(); i++) {
			if (value == rows.getAt(i).get("datatypeName")) {
				num++;
				if (num > 1) {
					ss = true;
					break;
				}
			}
		}
		return ss;
	}
	/**
	 * 在将下拉列表设为readonly后，下拉列表缩短了，原因未知
	 * 但设置为disabled没有问题
	 * 原来的写法：
	 * for (var i = 0; i < arr.length; i++) {
			arr[i].setReadOnly(b);
	   }
	 * extendTypeProPanel.baseTypeComb（基础类型）在某些情况下是不能修改的，即已经设置为disabled了（规则未知）。在这里不修改其disabled属性
	 * at 2011-05-26 by liuxj
	 */
	function setFormReadOnly(b){
		var arr = extendTypeProPanel.formPanel
					.findByType('textfield');
		for (var i = 0; i < arr.length; i++) {
			if(extendTypeProPanel.baseTypeComb != arr[i])
				if(b)
					arr[i].disable();
				else
					arr[i].enable();
		}
	}
	sm.on('selectionchange', function(selection) {
		if(Ext.getCmp('extendTypeApprovalHistorySubPanel')!=undefined){
			Ext.getCmp('extendTypeApprovalHistorySubPanel').hide();
		}
		if(Ext.getCmp('extendTypeApprovalSubPanel')!=undefined){
			Ext.getCmp('extendTypeApprovalSubPanel').hide();
		}
		Ext.getCmp('extendTypeProPanel').show();
		
		//----------------------start-----------------------------
		/*
		 * 2011-5-24 liuxj
		 * 如果当前行为非’已废弃‘，那么工具条中的”恢复“按钮设置为不可用，否则设置可用
		 * 
		 * 2011-5-26 liuxj
		 * 如果没有选择任何checkbox时，JS报错的问题，故加上if(selectedRowed)判断
		 */
		var selectedRowed = selection.getSelected();
		if(selectedRowed){
			var statusColumn = selectedRowed.get("status"); 
			if(statusColumn!==4){
				Ext.getCmp('btnRevert').disable();
			}else{
				Ext.getCmp('btnRevert').enable();
			}
		}else{
			Ext.getCmp('btnRevert').disable();
		}
		//-----------------------end----------------------------
		
		if (extendTypeMain.modelEdit == false) {// 没有编辑权限
			setFormReadOnly(true);
			if (selection.getSelections().length == 1) {
				Ext.getCmp('extendTypeGridApprove').enable();
				Ext.getCmp('extendTypeGridviewApproveHistory').enable();
				Ext.getCmp("extendTypeProPanel").enable();
				var selectedRow = sm.getSelected();
				var dataTypeId = selectedRow.get("datatypeId");
				var index = extendTypeMain.ds.indexOf(selectedRow);
				extendTypeProPanel.setFormValues(selectedRow, index);
			}else{
				Ext.getCmp('extendTypeGridApprove').disable();
				Ext.getCmp("extendTypeProPanel").disable();
			}
		} 
		else {// 有编辑权限
			if (extendTypeMain.approvalModel) { // 审批模式
				setFormReadOnly(true);
				if (extendTypeMain.hm) {// 审批模式中的历史模式
					if (selection.getSelections().length == 1) {
						Ext.getCmp("extendTypeProPanel").enable();
						Ext.getCmp('extendTypeProPanelSave').disabe();
						var selectedRow = sm.getSelected();
						var dataTypeId = selectedRow.get("datatypeId");
						var index = extendTypeMain.ds.indexOf(selectedRow);
						extendTypeProPanel.setFormValues(selectedRow, index);
					} else{
						Ext.getCmp("extendTypeProPanel").disable();
					}
				} else {// 审批模式中的正常模式
					Ext.getCmp('extendTypeGridSave').disable();
					Ext.getCmp('extendTypeGridDel').disable();
					Ext.getCmp('extendTypeGridAdd').disable();
					if (selection.getSelections().length == 1) {
						Ext.getCmp('extendTypeGridApprove').enable();
						Ext.getCmp('extendTypeGridviewApproveHistory').enable();
						Ext.getCmp('extendTypeProPanelSave').disable();
						Ext.getCmp("extendTypeProPanel").enable();
						var selectedRow = sm.getSelected();
						var dataTypeId = selectedRow.get("datatypeId");
						var index = extendTypeMain.ds.indexOf(selectedRow);
						extendTypeProPanel.setFormValues(selectedRow, index);
					} else if(selection.getSelections().length>1) {
						Ext.getCmp('extendTypeGridApprove').disable();
						Ext.getCmp("extendTypeProPanel").disable();
					} else{
						Ext.getCmp('extendTypeGridApprove').disable();
						Ext.getCmp("extendTypeProPanel").disable();
					}
				}
			} else {// 非审批模式
				if (extendTypeMain.hm) {// 非审批模式中的历史模式
					setFormReadOnly(true);
					if (selection.getSelections().length == 1) {
						Ext.getCmp('extendTypeProPanelSave').disable();
						Ext.getCmp("extendTypeProPanel").enable();
						var selectedRow = sm.getSelected();
						var dataTypeId = selectedRow.get("datatypeId");
						var index = extendTypeMain.ds.indexOf(selectedRow);
						extendTypeProPanel.setFormValues(selectedRow, index);
					} else{
						Ext.getCmp("extendTypeProPanel").disable();
					}
				}else{// 非审批模式中的正常模式
					if (selection.getSelections().length == 1) {
						var selectedRow = sm.getSelected();
						// 限制基类型在保存后不能修改
						if(!selectedRow.isModified('basetypeName')){
							extendTypeProPanel.baseTypeComb.disable();
						}else{
							extendTypeProPanel.baseTypeComb.enable();
						}
						
						var dataTypeId = selectedRow.get("datatypeId");
						var index = extendTypeMain.ds.indexOf(selectedRow);
						extendTypeProPanel.setFormValues(selectedRow, index);
						
						if(dataTypeId==undefined){
							Ext.getCmp('extendTypeGridDel').enable();
							Ext.getCmp('extendTypeGridSave').enable();
							Ext.getCmp('extendTypeGridAdd').enable();
							Ext.getCmp('extendTypeGridApprove').disable();
							return false;
						}
						
						var userid = selectedRow.get("userId");
						var arr = document.cookie.split(';');
						var loginuserid = '';
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].indexOf('userid') != -1) {
								loginuserid = arr[i].split('=')[1];
								break;
							}
						}
						if(userid==1&&loginuserid!=1){// 管理员创建的类型不允许其他人修改
							Ext
										.getCmp('extendTypeGridDel')
									.setText(getResource('resourceParam9095'));// '废弃');
							Ext.getCmp('extendTypeGridSave').disable();
							Ext.getCmp('extendTypeGridDel').disable();
							Ext.getCmp('extendTypeGridAdd').disable();
							Ext.getCmp('extendTypeGridApprove').disable();
							Ext.getCmp("extendTypeProPanelSave").disable();
							setFormReadOnly(true);
							Ext.getCmp("extendTypeProPanel").enable();
							return false;
						}
						
						Ext.getCmp('extendTypeGridApprove').enable();
						Ext.getCmp('extendTypeGridviewApproveHistory').enable();
						Ext.getCmp("extendTypeProPanelSave").enable();
						Ext.getCmp("extendTypeProPanel").enable();
						var status = selectedRow.get("status");
						switch (status) {
							case 0 :// 编制中
								Ext
										.getCmp('extendTypeGridDel')
										.setText(getResource('resourceParam475'));// '删除');
								Ext.getCmp('extendTypeGridSave').enable();
								Ext.getCmp('extendTypeGridDel').enable();
								Ext.getCmp('extendTypeGridAdd').enable();
								Ext.getCmp('extendTypeGridsubmitApprove').enable();
								Ext.getCmp('extendTypeGridpassApprove').enable();
								setFormReadOnly(false);
								break;
							case 2 :// 已发布
								Ext
										.getCmp('extendTypeGridDel')
										.setText(getResource('resourceParam9095'));// '废弃');
								Ext.getCmp('extendTypeGridSave').enable();
								Ext.getCmp('extendTypeGridDel').enable();
								Ext.getCmp('extendTypeGridAdd').enable();
								Ext.getCmp('extendTypeGridsubmitApprove')
										.disable();
								Ext.getCmp('extendTypeGridpassApprove')
										.disable();
								setFormReadOnly(false);
								break;
							case 3 :// 修改中
								Ext
										.getCmp('extendTypeGridDel')
										.setText(getResource('resourceParam9095'));// '废弃');
								Ext.getCmp('extendTypeGridSave').enable();
								Ext.getCmp('extendTypeGridDel').enable();
								Ext.getCmp('extendTypeGridAdd').enable();
								Ext.getCmp('extendTypeGridsubmitApprove')
										.enable();
								Ext.getCmp('extendTypeGridpassApprove')
										.enable();
								setFormReadOnly(false);
								break;
							case 1 :// 审批中
								Ext.getCmp('extendTypeProPanelSave').disable();
								Ext.getCmp('extendTypeGridSave').enable();
								Ext.getCmp('extendTypeGridDel').disable();
								Ext.getCmp('extendTypeGridAdd').enable();										
								Ext.getCmp('extendTypeGridsubmitApprove')
										.disable();
								Ext.getCmp('extendTypeGridpassApprove')
										.disable();
								setFormReadOnly(true);
								break;
							case 4 :
								Ext.getCmp('extendTypeGridDel').setText(getResource('resourceParam475'));// '删除');;
								Ext.getCmp('extendTypeProPanelSave').disable();
								Ext.getCmp('extendTypeGridSave').enable();
								Ext.getCmp('extendTypeGridDel').enable();
								Ext.getCmp('extendTypeGridAdd').enable();										
								Ext.getCmp('extendTypeGridsubmitApprove')
										.disable();
								Ext.getCmp('extendTypeGridpassApprove')
										.disable();
								setFormReadOnly(true);
									
						}
					} else if(selection.getSelections().length>1) {
						Ext.getCmp('extendTypeGridApprove').enable();
						Ext.getCmp('extendTypeGridviewApproveHistory').disable();
						Ext.getCmp("extendTypeProPanel").disable();
						Ext.getCmp('extendTypeGridSave').enable();
						Ext.getCmp('extendTypeGridDel').enable();
						Ext.getCmp('extendTypeGridAdd').enable();										
						Ext.getCmp('extendTypeGridsubmitApprove')
								.enable();
						Ext.getCmp('extendTypeGridpassApprove')
								.enable();
					} else{
						Ext.getCmp('extendTypeGridApprove').disable();
						Ext.getCmp("extendTypeProPanel").disable();
						Ext.getCmp('extendTypeGridSave').enable();
						Ext.getCmp('extendTypeGridDel').disable();
						Ext.getCmp('extendTypeGridAdd').enable();										
					}
				}
			}
		}
	})
	var centerPanel = extendTypeProPanel.init();
	var mainPanel = new Ext.Panel({
		region : 'west',
		layout : 'fit',
		width : 400,
		tbar : [{
			text : '' + getResource('resourceParam483') + '',
			iconCls : 'add1',
			id : 'extendTypeGridAdd',
			disabled : true,
			handler : function() {
				var Plant = extendTypeMain.grid.getStore().recordType;
				var p = new Plant({
							datatypeName : '' + getResource('resourceParam483')
									+ '' + getResource('resourceParam614') + '',
							basetypeName : ''
									+ getResource('resourceParam1079') + '',
							datatype : 'string',
							status : 0,
							version : '',
							datatypeDiscription : ''
						});
				extendTypeMain.grid.stopEditing();
				p.markDirty();
				extendTypeMain.ds.insert(0, p);
				sm.selectFirstRow();
			}

		}, {
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'del1',
			id : 'extendTypeGridDel',
			disabled : true,
			handler : function() {
				if (sm.getSelections().length > 0) {
					var arr = sm.getSelections();
					var feiqiCount = 0;
					for (var i = 0; i < arr.length; i++) {
						var stat = arr[i].get('status');
						if (stat == 1) {
							Ext.example.msg(getResource('resourceParam596'),
									getResource('resourceParam9105') + '！');
							return;
						}else if(stat == 4){
							feiqiCount++;
						}
					}
					var feiqiFlag = false;
					if(feiqiCount == arr.length){// 全部是已废弃的类型
						feiqiFlag = true;
					}
					Ext.MessageBox.confirm('' + getResource('resourceParam596')
									+ '', feiqiFlag?'确定要彻底删除？':(getResource('resourceParam1274')
											.substring(0, 3)
									+ Ext.getCmp('extendTypeGridDel')
											.getText() + '?'), function(btn) {
								if (btn == 'yes') {
									var DataTypeVos = Seam.Remoting
											.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
									var list = new Array();
									var list1 = new Array();
									for (var i = 0; i < sm.getSelections().length; i++) {
										if (sm.getSelections()[i]
												.get("datatypeId") != undefined) {
											var DataTypeVo = Seam.Remoting
													.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
											DataTypeVo.setDatatypeId(sm
													.getSelections()[i]
													.get("datatypeId"));
											DataTypeVo.setStatus(sm
													.getSelections()[i]
													.get("status"));
											list.push(DataTypeVo);
										} else {
											list1.push(sm.getSelections()[i]);
										}
									}
									if (list.length > 0) {
										DataTypeVos.setDataTypeVoList(list);
										Seam.Component
												.getInstance("dynamicmodel_datatype")
												.delDataType(DataTypeVos,
														function(result) {
															var obj = Ext.util.JSON
														.decode(result);
															if (obj.success == true) {
																extendTypeMain.ds
																		.clearModified();
																for (var i = 0; i < list1.length; i++) {
																	extendTypeMain.ds
																			.remove(list1[i]);
																}
																extendTypeProPanel
																		.clearFormValues();
																extendTypeMain.ds
																		.reload(
																				{
																					'callback' : function() {
																						Ext.example.msg("" + getResource('resourceParam575') + "",
																										"" + getResource('resourceParam1515') + "");
																					}
																				});
															} else {
																Ext.MessageBox
																		.show({
																			title : '' + getResource('resourceParam651') + '',
																			msg : obj.message,
																			buttons : Ext.MessageBox.OK,
																			icon : Ext.MessageBox.ERROR
																		});
															}
														});
									}
									for (var j = 0; j < list1.length; j++) {
										extendTypeMain.ds.remove(list1[j])
									}
								}
							});
				} else {
					Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
									+ getResource('resourceParam1835') + "");
				}
			}
		}, {
			text : '' + getResource('resourceParam7002') + '',// 保存
			iconCls : 'save1',
			id : 'extendTypeGridSave',
			disabled : true,
			handler : function() {
				extendTypeMain.grid.stopEditing();
				var addlist = new Array();
				extendTypeMain.ds.findBy(function(record, id) {
							if (record.get("datatypeId") === undefined) {
								addlist.push(record)
							}
						}, extendTypeMain.ds)
				var DataTypeVos = Seam.Remoting
						.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
				var list = new Array();
				/**
				 * 去掉页面判断重名的问题，都通过数据库来判断
				 * at 2011-05-25  by liuxj
				 */
				for (var i = 0; i < extendTypeMain.ds.getModifiedRecords().length; i++) {
					var record = extendTypeMain.ds.getModifiedRecords()[i];
					/*
					if (hasReName(record.get("datatypeName"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam7035')
											+ '：<span style="color:blue;">'
											+ record.get("datatypeName")
											+ '       </span>',// 已存在重名对象
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return false;
					}
					*/
					var DataTypeVo = Seam.Remoting
							.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
					if (record.get("datatypeId") !== undefined) {
						DataTypeVo.setDatatype(record.get("datatype"))
						DataTypeVo.setDatatypeName(record.get("datatypeName"))
						DataTypeVo.setDatatypeId(record.get("datatypeId"))
						DataTypeVo.setDatatypeRank(2);
						list.push(DataTypeVo);
					}
				}
				for (var j = 0; j < addlist.length; j++) {
					/*
					if (hasReName(addlist[j].get("datatypeName"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam7035')
											+ '：<span style="color:blue;">'
											+ addlist[j].get("datatypeName")
											+ '       </span>',// 已存在重名对象
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return false;
					}
					*/
					var DataTypeVo = Seam.Remoting
							.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
					DataTypeVo.setDatatype(addlist[j].get("datatype"))
					DataTypeVo.setDatatypeName(addlist[j].get("datatypeName"))
					DataTypeVo.setDatatypeRank(2);
					list.push(DataTypeVo);
				}

				DataTypeVos.setDataTypeVoList(list);
				Seam.Component.getInstance("dynamicmodel_datatype")
						.insertOrUpdateDataTypes(DataTypeVos, function(result) {
							if (result === 'true') {
								var r = extendTypeMain.grid.getSelectionModel().getSelected();
								if(r!=undefined){
									var rowName = r.get('datatypeName');
									extendTypeMain.ds.load({
										params: {
									        start: 0,          
									        limit: extendTypeMain.sizePerPage
									    },
										callback : function(s){
											extendTypeMain.grid.getSelectionModel().selectRow(extendTypeMain.ds.findExact('datatypeName',rowName));
										}
									});
									extendTypeMain.ds.clearModified();
									extendTypeMain.ds.modified = [];
								}else{
									extendTypeMain.ds.load({
										params: {
									        start: 0,          
									        limit: extendTypeMain.sizePerPage
									    }
									});
								}
								Ext.example.msg(
										"" + getResource('resourceParam575')
												+ "",
										"" + getResource('resourceParam1072')
												+ "");
							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam651')
													+ '',
											msg : ''
													+ getResource('resourceParam7035')
													+ '：<span style="color:blue;">'
													+ result.replace("]", "")
															.replace("[", "")
													+ '       </span>',// 已存在重名对象
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						});
			}
		}, {
			id : 'extendTypeGridApprove',
			text : '' + getResource('resourceParam1062') + '',
			disabled : true,
			menu : [new Ext.Action({
				id : 'extendTypeGridpassApprove',
				disabled : true,
				text : '' + getResource('resourceParam1365') + '',
				handler : function() {
					var datatypeIdArr = [];
					for (var i = 0; i < sm.getSelections().length; i++) {
						/**
						 * 只有类型的创建者才能直接审批通过 at 2010-10-25 下午03:50:19 by limj
						 */
// var arr = document.cookie.split(';');
// var userid = '';
// for (var i = 0; i < arr.length; i++) {
// if (arr[i].indexOf('userid') != -1) {
// userid = arr[i].split('=')[1];
// break;
// }
// }
// if (sm.getSelections()[i].get("userId") != userid) {
// Ext.example.msg(getResource('resourceParam596'),
// getResource('resourceParam9114'));
// return;
// }
						
						/**
						 * 编制中或修改中的类型才能直接审批通过 at 2010-10-25 下午03:50:31 by limj
						 */
						var s = sm.getSelections()[i].get('status');
						if (s == 1 || s == 2 || s == 4) {
							Ext.example.msg(getResource('resourceParam596'),
									getResource('resourceParam9115'));
							return;
						} else {
							datatypeIdArr.push(sm.getSelections()[i]
									.get("datatypeId"));
						}
					}
					
					
					
					
					
					
					/**
					 * 审批通过提示信息和物理类型一致
					 * at 2011-06-09 by liuxj
					 */
					Ext.Ajax.request({
						url : "../JSON/dynamicmodel_datatype.getSubTypes",
						method : 'POST',
						success : function(response, options) {
							var obj1 = Ext.util.JSON
									.decode(response.responseText);
							Ext.Msg.confirm(getResource('resourceParam575'),
									'要将以下类型审批通过吗？<br/><br/>' + obj1.msg, function(
											btn) {
								
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : "../JSON/approval_ApprovalRemote.agree",
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON.decode(response.responseText);
											if (obj.success == true) {
												Ext.example.msg(getResource('resourceParam596'),
																getResource('resourceParam3002') + '！');
												/**
												 * extendTypeMain.ds.load(); ///
												 * Update By YangJin'gang At
												 * 201009281645
												 */
												// Update begin
// extendTypeMain.grid.store.reload();
												// var rec =
												// extendTypeMain.grid.getSelectionModel().getSelected();
												// rec.set('status',
												// getResource('resourceParam1266'));
												// Update end
											}else if(obj.success == false){
												Ext.MessageBox.show({
													title : getResource('resourceParam596'),
													msg : ''
															+ obj.message
															+ '！       ',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
												/**
												 * 强制弹出错误
												Ext.example.msg('错误信息', obj.message + '！');
												*/
											}
											var r = extendTypeMain.grid.getSelectionModel().getSelected();
												var rowIndex = extendTypeMain.ds.indexOf(r)
												extendTypeMain.ds.load({
													/**
													 * 修改bug211
													 * 
													 * @author wangyf 2011-04-20
													 */
													params: {
												        start: 0,          
												        limit: extendTypeMain.sizePerPage
													},
													callback : function(s){
														extendTypeMain.grid.getSelectionModel().selectRow(rowIndex);
													}
												});
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											approvalType : 'StepByStep',
											objectID : datatypeIdArr.join(','),
											objectType : 'DataTypeDataType'
										}
									});
								}
							});
							
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							datatypeId : datatypeIdArr.join(',')
						}
					});
				}
			}), new Ext.Action({
				id : 'extendTypeGridsubmitApprove',
				text : '' + getResource('resourceParam1550') + '...',
				disabled : true,
				handler : function() {
					if(Ext.getCmp('extendTypeApprovalHistorySubPanel')!=undefined){
						Ext.getCmp('extendTypeApprovalHistorySubPanel').hide();
					}
					if(Ext.getCmp('extendTypeApprovalSubPanel')!=undefined){
						Ext.getCmp('extendTypeApprovalSubPanel').hide();
					}
					Ext.getCmp('extendTypeProPanel').show();
					
					var datatypeIdArr = [];
					for (var i = 0; i < sm.getSelections().length; i++) {
						/**
						 * 只有类型的创建者才能直接审批通过 at 2010-10-25 下午03:50:56 by limj
						 */
// var arr = document.cookie.split(';');
// var userid = '';
// for (var i = 0; i < arr.length; i++) {
// if (arr[i].indexOf('userid') != -1) {
// userid = arr[i].split('=')[1];
// break;
// }
// }
// if (sm.getSelections()[i].get("userId") != userid) {
// Ext.example.msg(getResource('resourceParam596'),
// getResource('resourceParam9114'));
// return;
// }
						
						/**
						 * 编制中或修改中的类型才能直接审批通过 at 2010-10-25 下午03:51:09 by limj
						 */
						var s = sm.getSelections()[i].get('status');
						if (s == 1 || s == 2 || s == 4) {
							Ext.example.msg(getResource('resourceParam596'),
									getResource('resourceParam9115'));
							return;
						} else {
							datatypeIdArr.push(sm.getSelections()[i]
									.get("datatypeId"));
						}
					}
					var p = null;
					if(Ext.getCmp('extendTypeApprovalSubPanel')==undefined){
						p = new Ext.Panel({
								id : 'extendTypeApprovalSubPanel',
								bodyStyle : 'overflow:auto;width:584px;height:366px',
								layout:'fit',
								autoScroll:true
							})
						Ext.getCmp("eastPanel").insert(0,p);
						Ext.override(Ext.ux.grid.BufferView, {
							getVisibleRowCount : function() {
								if (this.scroller.dom) {
									var rh = this.getCalculatedRowHeight();
									var visibleHeight = this.scroller.dom.clientHeight;
									return (visibleHeight < 1) ? 0 : Math
											.ceil(visibleHeight / rh);
								}
							}
						});			
					}else{
						p = Ext.getCmp('extendTypeApprovalSubPanel');
					}
					p.removeAll();
					approvePanel.init(p, datatypeIdArr.join(','),
							'DataTypeDataType', function() {
								Ext.getCmp('extendTypeApprovalSubPanel').hide();
								Ext.getCmp('extendTypeProPanel').show();
							}, getResource('resourceParam9093'),// '数据类型审批',
							function() {
								Ext.Ajax.request({
									url : '../JSON/dynamicmodel_datatype.submitApproval',
									method : 'POST',
									success : function(response, options) {
										var obj = Ext.util.JSON
												.decode(response.responseText);
										if (obj.success == true) {
											Ext.getCmp('extendTypeApprovalSubPanel').hide();
											Ext.getCmp('extendTypeProPanel').show();
											var r = extendTypeMain.grid.getSelectionModel().getSelected();
											var rowIndex = extendTypeMain.ds.indexOf(r)
											extendTypeMain.ds.load({
												callback : function(s){
													extendTypeMain.grid.getSelectionModel().selectRow(rowIndex);
												}
											});
										}
									},
									disableCaching : true,
									autoAbort : true,
									params : {
										datatypeId : datatypeIdArr.join(',')
									}
								});
							});
					Ext.getCmp('extendTypeApprovalSubPanel').show();
					Ext.getCmp('extendTypeProPanel').hide();
					Ext.getCmp("eastPanel").doLayout();
				}
			}), new Ext.Action({
						id : 'extendTypeGridviewApproveHistory',
						text : '' + getResource('resourceParam1448') + '',
						disabled : true,
						handler : function() {
							if (sm.getSelections().length == 1) {
								if(Ext.getCmp('extendTypeApprovalHistorySubPanel')!=undefined){
									Ext.getCmp('extendTypeApprovalHistorySubPanel').hide();
								}
								if(Ext.getCmp('extendTypeApprovalSubPanel')!=undefined){
									Ext.getCmp('extendTypeApprovalSubPanel').hide();
								}
								Ext.getCmp('extendTypeProPanel').show();
								
								var datatypeId = sm.getSelections()[0]
										.get("datatypeId");
								var p = null;
								if(Ext.getCmp('extendTypeApprovalHistorySubPanel')==undefined){
									p = new Ext.Panel({
											id : 'extendTypeApprovalHistorySubPanel',
											bodyStyle : 'overflow:auto'
										})
									Ext.getCmp("eastPanel").insert(0,p);
								}else{
									p = Ext.getCmp('extendTypeApprovalHistorySubPanel');
								}
								p.removeAll();
								examApproval.getCommentGrid(p, datatypeId,
										'DataTypeDataType', function() {
											Ext.getCmp('extendTypeApprovalHistorySubPanel').hide();
											Ext.getCmp('extendTypeProPanel').show();
										});
								Ext.getCmp("extendTypeProPanel").hide();
								Ext.getCmp('extendTypeApprovalHistorySubPanel').show();
								Ext.getCmp("eastPanel").doLayout();
							}
						}
					})]
		}, {
			id : 'extendTypeGridViewHistory',
			text : getResource('resourceParam9094'),// '查看历史',
			hidden : true,
			listeners : {
				'click' : function() {
					if (Ext.getCmp('extendTypeGridViewHistory').getText() == getResource('resourceParam944')/* 返回 */) {
						extendTypeMain.hm = false;
						sm.clearSelections();
						extendTypeMain.grid.reconfigure(extendTypeMain.ds,
								new Ext.grid.ColumnModel(colArray));
						comStore.loadData(comData);
						filterCombo.clearValue();
						departmentUser.userComb.show();
						Ext.getCmp('btnRevert').show();
						Ext.getCmp('extendTypeGridApprove').show();
						Ext.getCmp('extendTypeGridApprove').disable();
						Ext.getCmp('extendTypeGridSave').show();
						Ext.getCmp('extendTypeGridSave').disable();
						Ext.getCmp('extendTypeGridDel').show();
						Ext.getCmp('extendTypeGridDel').disable();
						Ext.getCmp('extendTypeGridAdd').show();
						if(extendTypeMain.approvalModel){
							Ext.getCmp('extendTypeGridAdd').disable();
						}else{
							Ext.getCmp('extendTypeGridAdd').enable();
						}
						Ext.getCmp('extendTypeGridViewHistory').hide();
						Ext
								.getCmp('extendTypeGridViewHistory')
								.setText(getResource('resourceParam9094')/* 查看历史 */);
						search();
					} else {
						if (sm.getSelections().length == 1) {
							extendTypeMain.hm = true;
							extendTypeMain.hmDatatypeId = sm.getSelections()[0]
									.get("datatypeId");
							extendTypeMain.grid
									.reconfigure(
											extendTypeMain.ds,
											new Ext.grid.ColumnModel([
													new Ext.grid.RowNumberer(),
													new Ext.grid.RadioboxSelectionModel(),
													{
														header : ''
																+ getResource('resourceParam1139')
																+ '',
														dataIndex : 'datatypeName',
														renderer : function(
																value, p, r) {
															return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
																	+ value
																	+ '</a>'
														}
													}, {
														header : ''
																+ getResource('resourceParam610')// 基础类型
																+ '',
														dataIndex : 'basetypeName',
														width : 100
													}, {
														header : getResource('resourceParam500'),// 状态
														renderer : function(
																value, p, r) {
															switch (value) {
																case 0 :
																	return getResource('resourceParam947');// 编制中
																case 1 :
																	return getResource('resourceParam948');// 审批中
																case 2 :
																	return getResource('resourceParam1266');// 已发布
																case 3 :
																	return getResource('resourceParam9090');// 修改中
																case 4 :
																	return getResource('resourceParam9091');// 已废弃
															}
															return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
																	+ value
																	+ '</a>'
														},
														dataIndex : 'status'
													}, {
														header : getResource('resourceParam462'),// 版本
														dataIndex : 'version'
													}]));
							filterCombo.clearValue();
							comStore.remove(comStore.getById(0));
							comStore.remove(comStore.getById(1));
							comStore.remove(comStore.getById(3));
							departmentUser.userComb.hide();
							Ext.getCmp('btnRevert').hide();
							Ext.getCmp('extendTypeGridApprove').hide();
							Ext.getCmp('extendTypeGridSave').hide();
							Ext.getCmp('extendTypeGridDel').hide();
							Ext.getCmp('extendTypeGridAdd').hide();
							Ext.getCmp('extendTypeGridViewHistory').show();
							Ext.getCmp('extendTypeGridViewHistory')
									.setText(getResource('resourceParam944'));// 返回
							searchHistory(extendTypeMain.hmDatatypeId);
						}
					}
				}
			}
		},{
			text : '恢复',
			id : 'btnRevert',
			handler : function(){
				if (sm.getSelections().length > 0) {
					var arr = sm.getSelections();
					var feiqiCount = 0;
					for (var i = 0; i < arr.length; i++) {
						var stat = arr[i].get('status');
						if(stat == 4){
							feiqiCount++;
						}
					}
					if(feiqiCount != arr.length){
						/**
						 * bug编号628 wangyf bug信息：在扩展类型界面点击恢复按钮时系统的提示逻辑不合理
						 * 注：在次更改了JsResource_zh.js文件中相对应得值 2011-05-16
						 */
						Ext.example.msg(getResource('resourceParam575'),'' + getResource('resourceParam1835') + '');
						return;
					}
					Ext.MessageBox.confirm('' + getResource('resourceParam596')
									+ '', '确定要恢复？', function(btn) {
								if (btn == 'yes') {
									var DataTypeVos = Seam.Remoting
											.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
									var list = new Array();
									var list1 = new Array();
									for (var i = 0; i < sm.getSelections().length; i++) {
										if (sm.getSelections()[i]
												.get("datatypeId") != undefined) {
											var DataTypeVo = Seam.Remoting
													.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
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
												.getInstance("dynamicmodel_datatype")
												.revertDataType(DataTypeVos,
														function(result) {
															var obj = Ext.util.JSON
																	.decode(result);
															if (obj.success == true) {
																extendTypeMain.ds
																		.clearModified();
																extendTypeProPanel
																		.clearFormValues();
																extendTypeMain.ds
																		.reload(
																				{
																					'callback' : function() {
																						sm
																								.selectFirstRow();
																						Ext.example
																								.msg(
																										""
																												+ getResource('resourceParam575')
																												+ "",
																										""
																												+ getResource('resourceParam1515')
																												+ "");
																					}
																				});
															} else {
																Ext.MessageBox
																		.show({
																			title : '恢复失败!',
																			msg : obj.message,
																			buttons : Ext.MessageBox.OK,
																			icon : Ext.MessageBox.ERROR
																		});
															}
														});
									}
									for (var j = 0; j < list1.length; j++) {
										extendTypeMain.ds.remove(list1[j])
									}

								}
							});
				} else {
					Ext.MessageBox.show({
								title : "" + getResource('resourceParam575')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR,
								/**
								 * bug编号628 wangyf
								 * bug信息：在扩展类型界面点击恢复按钮时系统的提示逻辑不合理
								 * 注：在次更改了JsResource_zh.js文件中相对应得值(resourceParam1835)
								 * 2011-05-16
								 */
								msg : "" + getResource('resourceParam1835')
										+ ""
							})
				}
			}
		}
// ,'->',{
// text : '清理废弃类型',
// handler : function(){
// Ext.MessageBox.confirm('' + getResource('resourceParam596')
// + '', '次操作将会清理掉所有未被引用的已废弃的类型，确定继续吗？',
// function(btn){
// if(btn=='yes'){
// Ext.Ajax.request({
// url : '../JSON/dynamicmodel_datatype.clearDataType',
// method : 'POST',
// success : function(response, options) {
// Ext.MessageBox.alert(getResource('resourceParam596'),'类型：'+response.responseText+'
// ,已清理');
// extendTypeMain.ds
// .clearModified();
// for (var i = 0; i < list1.length; i++) {
// extendTypeMain.ds
// .remove(list1[i]);
// }
// extendTypeProPanel
// .clearFormValues();
// extendTypeMain.ds
// .reload(
// {
// 'callback' : function() {
// sm.selectFirstRow();
// Ext.example.msg("" + getResource('resourceParam575') + "",
// "" + getResource('resourceParam1515') + "");
// }
// });
// },
// disableCaching : true,
// autoAbort : true,
// params : {
// datatypeRank:2
// }
// });
// }
// });
// }
// }
		],
		border : false,
		items : [extendTypeMain.grid],
		listeners : {
			'render' : function(p){
		
		/**
		 * 当选定一个用户后，只能查该用户组的用户
		 * 复写该参数方法
		 * at 2011-06-08 by liuxj
		 */
			departmentUser.userComb.on('beforequery', function(qe) {
	                if (departmentUser.keypress) {
	                    departmentUser.comboboxStore.baseParams = {
	                        truename : null,
	                        instcode : null,
	                        roleId : null,
	                        securityDegree: null,
	                        start : 0,
	                        limit : 10
	                    }
	                } else {
	                    departmentUser.comboboxStore.baseParams = {
	                        instcode : null,
	                        roleId : null,
	                        securityDegree: null,
	                        start : 0,
	                        limit : 10
	                    }
	                }
	                departmentUser.keypress = false;
	               delete qe.combo.lastQuery;
	            });
		
				extendTypeMain.secondTbar = new Ext.Toolbar([filterCombo,departmentUser.userComb,{
					xtype : 'textfield',
					width : 100,
					emptyText : '类型名称',
					id : 'search_name'
				},{
					text : '查询',
					handler : function(){
						if(extendTypeMain.hm){
							searchHistory(extendTypeMain.hmDatatypeId)
						}else{
							search();
						}
					}
				}]);
				extendTypeMain.secondTbar.render(p.tbar);
			},
			'afterlayout' : function(panel) {
				if (extendTypeMain.approvalModel) {
					setFormReadOnly(true);
				} else {
					var mask = new Ext.LoadMask(Ext.getBody(),{msg:'Loading...'});
					mask.show();
					setTimeout(function() {
						Ext.Ajax.request({
							url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								if (obj.modelEdit == true) {
									Ext.getCmp("extendTypeGridAdd").enable();
									extendTypeMain.modelEdit = true;
								} else {
									extendTypeMain.modelEdit = false;
								}
								mask.hide();
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								privilegename : "{'modelEdit':''}"
							}
						});
					}, 1000);
				}
			}
		}
	})
	
	function search(){
			extendTypeMain.searchMap = '&statuses='
													+ filterCombo.getValue()+'&userId='
													+departmentUser.userComb.getValue()
						extendTypeMain.ds.on('beforeload',
							function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
											url : extendTypeMain.mainUrl + extendTypeMain.searchMap
										})
							});
						extendTypeMain.ds.load({params: {
					        start: 0,          
					        limit: extendTypeMain.sizePerPage,
					        datatypeName : Ext.getCmp('search_name').getValue()
					    }});
	}
	
	function searchHistory(datatypeId){
			extendTypeMain.searchHistoryMap = '&statuses='
													+ filterCombo.getValue()+'&datatypeName='
													+Ext.getCmp('search_name').getValue();
						extendTypeMain.ds.on('beforeload',
							function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
											method : 'GET',
											url : '../JSON/dynamicmodel_datatype.getDataTypeHistoryVersions?datatypeId='
											+ datatypeId + extendTypeMain.searchHistoryMap
										})
							});
						extendTypeMain.ds.load({params: {
					        start: 0,          
					        limit: extendTypeMain.sizePerPage
					    }});
	}
	
	return new Ext.Panel({
				layout : 'border',
				items : [new Ext.Panel({
									region : 'center',
									layout : 'fit',
									split : true,
									items : [mainPanel]
								}), new Ext.Panel({
									region : 'east',
									width : 490,
									id : 'eastPanel',
									layout : 'fit',
									items : [centerPanel]
								})]
			});
	// window.onbeforeunload = function() {
	// var warning = "确认离开吗？";
	// return warning;
	// }
}
extendTypeMain.initViewport = function() {
	var viewport = new Ext.Viewport({ // 页面布局
		items : [extendTypeMain.init()],
		layout : 'fit'
	});
	extendTypeMain.ds.load({
    	params: {
	        start: 0,          
	        limit: extendTypeMain.sizePerPage
	    }
	});
}
extendTypeMain.getBaseTypeComb = function(id, name, fieldLabel, width) {
	var baseTypeComb = new Ext.form.ComboBox({
		id : id,
		name : name,
		fieldLabel : fieldLabel,
		store : new Ext.data.Store({
	        proxy : new Ext.data.HttpProxy({
	                    method : 'GET',
	                    url : "../JSON/dynamicmodel_datatype.getDataTypeList?datatypeRank=4&start=0&limit=100"
	                }),
	        reader : new Ext.data.JsonReader({
	                    id : 'id',
						root : 'results',
						totalProperty : 'totalProperty'
	                }, [{
							name : 'datatypeName',
							mapping : 'datatypeName',
							type : 'string'
						}, {
							name : 'datatype',
							mapping : 'datatype',
							type : 'string'
						}])
	    }),
		triggerAction : 'all',
		width : width,
		valueField : 'datatypeName',
		displayField : 'datatypeName',
		editable : false,
		lazyRender : true,
		onSelect : function(record, index) {
			if (this.fireEvent('beforeselect', this, record, index) !== false) {
				var value = record.data[this.valueField || this.displayField];
				this.setValue(value);
				this.collapse();
				this.fireEvent('select', this, record, index);
			}
			Ext.get("extendTypeProRealBaseType").dom.value = record
					.get("datatype");
		}
	})
	return baseTypeComb;
}
