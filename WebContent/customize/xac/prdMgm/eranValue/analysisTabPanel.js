//Ext.util.CSS.swapStyleSheet("theme","../css/workOrContext.css");
var analysisTabPanel = {};
var data = {};
analysisTabPanel.init = function() {

	Ext.QuickTips.init();
	function buttonFunc() {
		if (leftNavigationTree.nodeId == 0) {
			var node = leftNavigationTree.node;
			if (analysisMain.pasteType == 'cut') {
				if (analysisMain.cutProjectId != null) {
					var copiedNode = analysisMain.leftTree
							.getNodeById(analysisMain.cutProjectId);
					if (copiedNode != null) {
						if (copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').disable();
						} else if (copiedNode.id == node.id) {
							Ext.getCmp('pasteTask').disable();
						} else if (!copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').enable();
						}
					}
				} else {
					Ext.getCmp('pasteTask').disable();
				}
			}
			if (analysisMain.pasteType == 'copy') {
				if (analysisMain.copyProjectId != null) {
					var copiedNode = analysisMain.leftTree
							.getNodeById(analysisMain.copyProjectId);
					if (copiedNode != null) {
						if (copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').disable();
						} else if (copiedNode.id == node.id) {
							Ext.getCmp('pasteTask').disable();
						} else if (!copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').enable();
						}
					}
				}
			}

		} else if (leftNavigationTree.nodeId.indexOf('c') == 0) {
			if (data.modify) {
				Ext.getCmp('update').enable();
				var node = leftNavigationTree.node;
				if (analysisMain.pasteType == 'cut') {
					if (analysisMain.cutProjectId != null) {
						var copiedNode = analysisMain.leftTree
								.getNodeById(analysisMain.cutProjectId);
						if (copiedNode != null) {
							if (copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').disable();
							} else if (copiedNode.id == node.id) {
								Ext.getCmp('pasteTask').disable();
							} else if (!copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').enable();
							}
						}
					} else {
						Ext.getCmp('pasteTask').disable();
					}
				}
				if (analysisMain.pasteType == 'copy') {
					if (analysisMain.copyProjectId != null) {
						var copiedNode = analysisMain.leftTree
								.getNodeById(analysisMain.copyProjectId);
						if (copiedNode != null) {
							if (copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').disable();
							} else if (copiedNode.id == node.id) {
								Ext.getCmp('pasteTask').disable();
							} else if (!copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').enable();
							}
						}
					}
				}
			} else {
				Ext.getCmp('update').disable();
				Ext.getCmp('pasteTask').disable();
			}
			if (data.del) {
				Ext.getCmp('delete').enable();
			} else {
				Ext.getCmp('delete').disable();
			}
			Ext.getCmp('terminate').disable();
			Ext.getCmp('approve').disable();
			if (data.setprivilege) {
				Ext.getCmp('privilege').enable();
			} else {
				Ext.getCmp('privilege').disable();
			}
			Ext.getCmp('copyTask').disable();
			Ext.getCmp('cutTask').disable();
			Ext.getCmp('moveUp').disable();
			Ext.getCmp('moveDown').disable();
		} else if (leftNavigationTree.nodeId.indexOf('p') == 0
				|| leftNavigationTree.nodeId.indexOf('vp') == 0) {
			if (data.modify) {
				// 1、4状态下可修改
				if (leftNavigationTree.statusId == '1'
						|| leftNavigationTree.statusId == '4') {
					Ext.getCmp('update').enable();
				} else {
					Ext.getCmp('update').disable();
				}
				Ext.getCmp('examApprovalTab').enable();
				if (analysisMain.pasteType == 'cut') {
					if (analysisMain.cutTaskId != null) {
						Ext.getCmp('pasteTask').enable();
					} else {
						Ext.getCmp('pasteTask').disable();
					}
				} else if (analysisMain.pasteType == 'copy') {
					if (analysisMain.copyTaskId != null) {
						Ext.getCmp('pasteTask').enable();
					} else {
						Ext.getCmp('pasteTask').disable();
					}
				}
			} else {
				Ext.getCmp('update').disable();
				Ext.getCmp('pasteTask').disable();
				Ext.getCmp('examApprovalTab').disable();
			}
			Ext.getCmp('copyTask').enable();
			Ext.getCmp('cutTask').enable();
			Ext.getCmp('moveUp').disable();
			Ext.getCmp('moveDown').disable();
			if (data.del) {
				Ext.getCmp('delete').enable();
			} else {
				Ext.getCmp('delete').disable();
			}
			if (data.terminate) {
				if (leftNavigationTree.statusId == '4') {
					Ext.getCmp('terminate').enable();
				} else {
					Ext.getCmp('terminate').disable();
				}
			} else {
				Ext.getCmp('terminate').disable();
			}
			if (data.approve || data.setpass || data.setcompleted
					|| data.modify) {
				// 送审下拉
				Ext.getCmp('approve').enable();
			} else {
				Ext.getCmp('approve').disable();
			}
			if (data.approve) {
				// 提交送审
				if (leftNavigationTree.statusId == '1'
						|| leftNavigationTree.statusId == '4') {
					Ext.getCmp('projectVerify').enable();
				} else {
					Ext.getCmp('projectVerify').disable();
				}
			} else {
				Ext.getCmp('projectVerify').disable();
			}
			if (data.setpass || data.setcompleted) {
				// 置通过、完成
				if (leftNavigationTree.statusId == '1'
						|| leftNavigationTree.statusId == '4') {
					Ext.getCmp('projectApprove').enable();
				} else {
					Ext.getCmp('projectApprove').disable();
				}
			} else {
				Ext.getCmp('projectApprove').disable();
			}

			if (data.setprivilege) {
				Ext.getCmp('privilege').enable();
			} else {
				Ext.getCmp('privilege').disable();
			}
		} else {
			var node = analysisMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			if (node.attributes.nt == 1 || node.attributes.nt == '1') {
				Ext.getCmp('create').disable();
			} else {
				Ext.getCmp('create').enable();
			}
			if (data.modify) {
				// 1、4状态下可修改
				if (leftNavigationTree.statusId == '1'
						|| leftNavigationTree.statusId == '2'
						|| leftNavigationTree.statusId == '3'
						|| leftNavigationTree.statusId == '4') {
					Ext.getCmp('update').enable();
				} else {
					Ext.getCmp('update').disable();
				}
				Ext.getCmp('examApprovalTab').enable();
				Ext.getCmp('copyTask').enable();
				Ext.getCmp('cutTask').enable();
				var node = leftNavigationTree.node;
				if (analysisMain.pasteType == 'cut') {
					if (analysisMain.cutTaskId != null) {
						var copiedNode = analysisMain.leftTree
								.getNodeById(analysisMain.cutTaskId);
						if (copiedNode != null) {
							if (copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').disable();
							} else if (copiedNode.id == node.id) {
								Ext.getCmp('pasteTask').disable();
							} else if (!copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').enable();
							}
						}
					} else {
						Ext.getCmp('pasteTask').disable();
					}
				}
				if (analysisMain.pasteType == 'copy') {
					if (analysisMain.copyTaskId != null) {
						var copiedNode = analysisMain.leftTree
								.getNodeById(analysisMain.copyTaskId);
						if (copiedNode != null) {
							if (copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').disable();
							} else if (copiedNode.id == node.id) {
								Ext.getCmp('pasteTask').disable();
							} else if (!copiedNode.contains(node)) {
								Ext.getCmp('pasteTask').enable();
							}
						}
					}
				}
			} else {
				Ext.getCmp('copyTask').disable();
				Ext.getCmp('update').disable();
				Ext.getCmp('examApprovalTab').disable();
				Ext.getCmp('cutTask').disable();
				Ext.getCmp('pasteTask').disable();

			}
			if (data.del) {
				Ext.getCmp('delete').enable();
			} else {
				Ext.getCmp('delete').disable();
			}
			if (data.terminate) {
				if (node.attributes.nt == 1 || node.attributes.nt == '1') {
					Ext.getCmp('terminate').disable();
				} else {
					Ext.getCmp('terminate').enable();
				}
			} else {
				Ext.getCmp('terminate').disable();
			}
			if (data.approve || data.setpass || data.setcompleted
					|| data.modify) {
				Ext.getCmp('approve').enable();
			} else {
				Ext.getCmp('approve').disable();
			}
			// 提交审批
			if (data.approve) {
				leftNavigationTree.approval
				if (leftNavigationTree.statusId == '1') {
					Ext.getCmp('projectVerify').enable();
				} else if (leftNavigationTree.statusId == '4'
						&& leftNavigationTree.approval) {
					Ext.getCmp('projectVerify').enable();
				} else {
					Ext.getCmp('projectVerify').disable();
				}
			} else {
				Ext.getCmp('projectVerify').disable();
			}
			if (data.setpass || data.setcompleted) {
				if (leftNavigationTree.statusId == '1'
						|| leftNavigationTree.statusId == '4') {
					Ext.getCmp('projectApprove').enable();
				} else {
					Ext.getCmp('projectApprove').disable();
				}
			} else {
				Ext.getCmp('projectApprove').disable();
			}
			if (data.setprivilege) {
				Ext.getCmp('privilege').enable();
			} else {
				Ext.getCmp('privilege').disable();
			}
			if (data.updown) {
				Ext.getCmp('moveUp').enable();
				Ext.getCmp('moveDown').enable();
			} else {
				Ext.getCmp('moveUp').disable();
				Ext.getCmp('moveDown').disable();
			}
		}
		// if(leftNavigationTree.node.id.indexOf('v')==0){
		// Ext.getCmp('delete').disable();
		// Ext.getCmp('update').disable();
		// Ext.getCmp('terminate').disable();
		// Ext.getCmp('approve').disable();
		// Ext.getCmp('privilege').disable();
		// Ext.getCmp('copyTask').disable();
		// Ext.getCmp('cutTask').disable();
		// Ext.getCmp('pasteTask').disable();
		// Ext.getCmp('moveUp').disable();
		// Ext.getCmp('moveDown').disable();
		// }
		// if(leftNavigationTree.node.parentNode.id.indexOf('v')!=0){
		// Ext.getCmp('delete').enable();
		// }
	}

	analysisTabPanel.attributePanelMain = attributePanel.init();
	analysisTabPanel.attributePanel = new Ext.Panel({
		id : 'attributePanel',
		title : '属性',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [analysisTabPanel.attributePanelMain],
		listeners : {
			activate : function() {
	
				if (leftNavigationTree.nodeId == 0) {
					buttonFunc();
				} else if (leftNavigationTree.nodeId != 0) {
					Ext.Ajax.request({
						url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							var node = analysisMain.leftTree
									.getNodeById(leftNavigationTree.nodeId);
							if (obj.remove) {
								var el = node.getUI().getIconEl();
								Ext.Element.fly(el)
										.removeClass(node.attributes.iconCls);
								Ext.Element.fly(el).addClass(obj.iconCls);
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : obj.message,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							} else {
								data = obj;
								buttonFunc();
								if (leftNavigationTree.nodeId.indexOf('p') == 0
										|| leftNavigationTree.nodeId
												.indexOf('vp') == 0) {
									ProjectAttributePanel.setFirstPage();
									var errorCallBack = function(iconCls) {
										var node = analysisMain.leftTree
												.getNodeById(leftNavigationTree.nodeId);
										var el = node.getUI().getIconEl();
										Ext.Element
												.fly(el)
												.removeClass(node.attributes.iconCls);
										Ext.Element.fly(el).addClass(iconCls);
									}
									attributePanel.attributePanel.getLayout()
											.setActiveItem(0);
									ProjectAttributePanel.projectId = base
											.convertNodeId(leftNavigationTree.nodeId);
									ProjectAttributePanel.setBasicForm(
											ProjectAttributePanel.projectId,
											errorCallBack);
								} else if (leftNavigationTree.nodeId != 0
										&& leftNavigationTree.nodeId
												.indexOf('c') != 0) {
									TaskAttributePanel.setFirstPage();
									var errorCallBack = function(iconCls) {
										var node = analysisMain.leftTree
												.getNodeById(leftNavigationTree.nodeId);
										var el = node.getUI().getIconEl();
										Ext.Element
												.fly(el)
												.removeClass(node.attributes.iconCls);
										Ext.Element.fly(el).addClass(iconCls);
									}
									if (node.attributes.nt == 0
											|| node.attributes.nt == '0') {
										attributePanel.attributePanel
												.getLayout().setActiveItem(1);
										TaskAttributePanel.setBasicForm(
												leftNavigationTree.nodeId,
												errorCallBack);
									} else if (node.attributes.nt == 1
											|| node.attributes.nt == '1') {
										attributePanel.attributePanel
												.getLayout().setActiveItem(2);
										viewApproveTask.setBasicForm(
												leftNavigationTree.nodeId,
												errorCallBack);
									}

								}
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							dataId : base
									.convertNodeId(leftNavigationTree.nodeId)
						}
					});
				}
			}
		}
	});

	function fnCallback(flag) {
		Ext.getCmp('dataObjectColumnTreeDel').disable();
		Ext.getCmp('dataObjectColumnTreeAdd').disable();
		Ext.getCmp('dataObjectColumnTreeUpdate').disable();
	}
	// 任务数据tab页
	var mydataObjectPanel = new dataObjectPanel();
	analysisTabPanel.dataPanel = mydataObjectPanel.init();
	analysisTabPanel.dataPanel.disable();
	analysisTabPanel.dataPanel.on('activate', function() {
		if (leftNavigationTree.nodeId != 0) {
			Ext.Ajax.request({
				url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.remove) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam499')
											+ '',
									msg : obj.message,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					} else {
						data = obj;
						buttonFunc();
						var projectNode = analysisMain.leftTree
								.getSelectionModel().getSelectedNode();
						var enableEdit = !(projectNode.attributes.statusId == "6"
								|| projectNode.attributes.statusId == "7" || projectNode.attributes.nt == "1")
						if (projectNode.id.indexOf("c") != 0
								&& projectNode.id != 0) {
							var selectedProjectId;
							var selectedTaskId;
							if (projectNode.id.indexOf("p") == 0
									|| projectNode.id.indexOf("vp") == 0) {
								selectedProjectId = base
										.convertNodeId(projectNode.id);
								selectedTaskId = selectedProjectId.substr(1);
							} else {
								selectedProjectId = base
										.convertNodeId(projectNode.attributes.projectId)
								selectedTaskId = base
										.convertNodeId(projectNode.id);
							}
							mydataObjectPanel.setConfigs(selectedProjectId,
									selectedTaskId, enableEdit);
						}
					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					dataId : base.convertNodeId(leftNavigationTree.nodeId)
				}
			});
		}
	})
	// end
	analysisTabPanel.relationPanel = new Ext.Panel({
		id : 'relationPanel',
		title : '' + getResource('resourceParam1154') + '',
		frame : false,
		boder : false,
		disabled : true,
		layout : 'fit',
		items : [relationPanel.init()],
		listeners : {
			activate : function() {
				var node = leftNavigationTree.node
				var projectid = '';
				if (leftNavigationTree.node.id.indexOf('p') == 0 ) {
					projectid = leftNavigationTree.node.id.substring(1, leftNavigationTree.node.id.length);
				} else if (leftNavigationTree.node.id.indexOf('vp') == 0) {
					projectid = leftNavigationTree.node.id.substring(2, leftNavigationTree.node.id.length);
				} else {
					projectid = leftNavigationTree.node.attributes.projectId;
				}
				relationPanel.active(projectid, node.id, node.attributes.name);
				buttonFunc();
			}
		}
	});
	analysisTabPanel.wbsContainer = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	analysisTabPanel.addColumnTree = function() {
		if (analysisTabPanel.wbs != null) {
			analysisTabPanel.wbsContainer.remove(analysisTabPanel.wbs);
		}
		wbsdata.nodeId = base.convertNodeId(leftNavigationTree.nodeId);
        var tbar = new Ext.Toolbar({
        items : [{
                            id : 'kongzhiid',
                            text : '控制账目',
                            disabled : true,
                            handler : function() {
                                wbsdata.getSelectIds();
                                wbsdata.selections;
                                    var appVo = Seam.Remoting.createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");
                                    appVo.setTaskStr(wbsdata.selections);
                                    appVo.setType("1");
                                callSeam("budgetPvAcRemote","establishWorkOrControl",[appVo],wbsdata.establishWorkOrControl);
                            }

                        }, '-',{
                            id : 'gongzuoid',
                            text : '工作包',
                            disabled : true,
                            handler : function() {
                                wbsdata.getSelectIds();
                                wbsdata.selections;
                                    var appVo = Seam.Remoting.createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");
                                    appVo.setTaskStr(wbsdata.selections);
                                    appVo.setType("2");
                                callSeam("budgetPvAcRemote","establishWorkOrControl",[appVo],wbsdata.establishWorkOrControl);
                            }

                        }, '-']
        });
		analysisTabPanel.wbs = wbsdata.init({tbar:tbar});
        wbsdata.sm.on('selectionchange', function(sm) {
                if (sm.getCount() > 0) {
                    Ext.getCmp("kongzhiid").enable();
                    Ext.getCmp("gongzuoid").enable();
                } else {
                    Ext.getCmp("kongzhiid").disable();
                    Ext.getCmp("gongzuoid").disable();
                }
            });
		analysisTabPanel.wbsContainer.add(analysisTabPanel.wbs);
		analysisTabPanel.wbsContainer.doLayout();
        
	};

	analysisTabPanel.wbsPanel = new Ext.Panel({
		id : 'wbsPanelOnTab',
		title : 'WBS',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [analysisTabPanel.wbsContainer],
		listeners : {
			activate : function() {
		
				Ext.Ajax.request({
					url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.remove) {
							// analysisMain.refresh();
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : obj.message,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						} else {
							data = obj;
							buttonFunc();
							analysisTabPanel.addColumnTree();
							wbsdata.sourceNodeId = '';
							wbsdata.relationtypes = '1,2';
							wbsdata.refresh();
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataId : base.convertNodeId(leftNavigationTree.nodeId)
					}
				});
			}
		}
	});

	var logAttributeTaskId = new Ext.form.TextField({

				id : 'logAttributeTaskId',
				inputType : 'hidden'
			});

	var logAttributeTask = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam624') + '',
				id : 'logAttributeTask',
				style : 'margin-bottom: 5px;',
				readOnly : true,
				width : 300
			});
	var logName = new Ext.form.TextField({
				id : 'logName',
				fieldLabel : '' + getResource('resourceParam786') + '',
				style : 'margin-bottom: 5px;',
				width : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam1553') + '',
				maxLength : 50,
				minLengthText : '' + getResource('resourceParam786')
						+ '不能大于50!',
				msgTarget : 'side'
			});
	var logContent = new Ext.form.TextArea({
				id : 'logContent',
				fieldLabel : '' + getResource('resourceParam787') + '',
				style : 'margin-bottom: 5px;',
				width : 200,
				height : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam785') + '',
				maxLength : 500,
				maxLengthText : '' + getResource('resourceParam783') + ''
			});
	// var logFile1 = new Ext.form.TextField({
	// inputType : 'file',
	// allowBlank : true,
	// id : 'logFile1',
	// width : 200,
	// fieldLabel : '文件'
	// // ,
	// // buttonCfg : {
	// // text : '',
	// // iconCls : 'upload-icon'
	// // }
	//
	// });

	analysisTabPanel.logAddForm = new Ext.form.FormPanel({
				id : 'logAddForm',
				fileUpload : true,
				enctype : 'multipart/form-data',
				bodyStyle : 'padding:5px 5px 0',
				disabled : true,
				// height:800,
				labelWidth : 80,
				defaults : {
					anchor : '62%',
					// allowBlank : false,
					msgTarget : 'side'
				},
				items : [logAttributeTaskId, logAttributeTask, logName,
						logContent, {
							xtype : 'fileuploadfield',
							id : 'logfile1',
							fieldLabel : '' + getResource('resourceParam469')
									+ '',
							buttonText : '' + getResource('resourceParam473')
									+ ''

						}],
				buttons : [{
							text : '' + getResource('resourceParam605') + '',
							handler : logSubmit
						}, {
							text : '' + getResource('resourceParam606') + '',
							handler : logReset
						}]
			});

	function logSubmit() {
		// alert(Ext.getCmp('logAttributeTaskId').getValue());
		// return ;
		var temp = Ext.getCmp('logContent').getValue();
		if ("" == analysisMain.chargedManId || null == analysisMain.chargedManId
				|| undefined == analysisMain.chargedManId) {
			Ext.Msg.show({
						title : '' + getResource('resourceParam596') + '',
						msg : '' + getResource('resourceParam1551') + '',
						width : 170,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
			return;
		}

		if (!analysisTabPanel.logAddForm.getForm().isValid()) {
			return;
		}
		analysisTabPanel.logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ base.convertNodeId(Ext.getCmp('logAttributeTaskId')
							.getValue()) + '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent='
					+ Ext.getCmp('logContent').getValue()
					+ '&messageType=3&publishMode=4&chargedManId='
					+ analysisMain.chargedManId,
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
						.getValue();
				var logAttributeTasks = Ext.getCmp("logAttributeTask")
						.getValue();
				analysisTabPanel.logAddForm.getForm().reset();
				Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);
			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	function logSave() {
		// alert(Ext.getCmp('logAttributeTaskId').getValue());
		// return ;
		var temp = Ext.getCmp('logContent').getValue();
		if (!analysisTabPanel.logAddForm.getForm().isValid()) {
			return;
		}
		analysisTabPanel.logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ base.convertNodeId(Ext.getCmp('logAttributeTaskId')
							.getValue()) + '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent='
					+ Ext.getCmp('logContent').getValue()
					+ '&messageType=3&publishMode=1',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
						.getValue();
				var logAttributeTasks = Ext.getCmp("logAttributeTask")
						.getValue();
				analysisTabPanel.logAddForm.getForm().reset();
				Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);
			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	function logReset() {
		Ext.getCmp('logName').setValue("");
		Ext.getCmp('logContent').setValue("");
		Ext.getCmp('logfile1').setValue("");
	}
	analysisTabPanel.addloginfo = new Ext.Panel({
				id : 'addloginfo',
				title : '  ' + getResource('resourceParam789') + '',
				// visible : false,
				//
				// autoScroll : true,
				layout : 'fit',
				items : [analysisTabPanel.logAddForm],
				listeners : {
					'activate' : function() {
						// logTabPanel.doLayout();
					}
				}
			});
	analysisTabPanel.logTabPanel1 = new Ext.TabPanel({
				id : 'logTabPanel1',
				layoutOnTabChange : true,
				activeTab : 0,
				autoScroll : true,
				animScroll : true,
				resizeTabs : true,
				enableTabScroll : true,
				deferredRender : false,
				tabMargin : 0,
				items : [analysisTabPanel.addloginfo]

			});
	analysisTabPanel.egridpanel12 = new Ext.Panel({
				id : 'egridpanel12',
				layout : 'fit',
				items : [analysisTabPanel.logTabPanel1]
			});
	analysisTabPanel.feedbackPanel = new Ext.Panel({
		title : '' + getResource('resourceParam790') + '',
		frame : false,
		boder : false,
		layout : 'fit',
		disabled : true,
		items : [analysisTabPanel.egridpanel12],
		listeners : {
			'activate' : function() {
				Ext.Ajax.request({
					url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.remove) {
							// analysisMain.refresh();
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : obj.message,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						} else {
							data = obj;
							buttonFunc();
							analysisTabPanel.logTabPanel1.setActiveTab(0);
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataId : base.convertNodeId(leftNavigationTree.nodeId)
					}
				});

			}
		}

	});

	var tasklogAttributeTaskId = new Ext.form.TextField({

				id : 'tasklogAttributeTaskId',
				inputType : 'hidden'
			});

	var tasklogAttributeTask = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam624') + '',
				id : 'tasklogAttributeTask',
				readOnly : true,
				style : 'margin-bottom: 5px;',
				width : 300
			});
	var tasklogName = new Ext.form.TextField({
				id : 'tasklogName',
				fieldLabel : '' + getResource('resourceParam625') + '',
				style : 'margin-bottom: 5px;',
				width : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam1552') + '',
				maxLength : 95,
				minLengthText : '' + getResource('resourceParam1449') + '',
				msgTarget : 'side'
			});
	var tasklogContent = new Ext.form.TextArea({
				id : 'tasklogContent',
				fieldLabel : '' + getResource('resourceParam626') + '',
				style : 'margin-bottom: 5px;',
				width : 200,
				height : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam622') + '',
				maxLength : 2000,
				maxLengthText : '' + getResource('resourceParam591') + ''
			});

	analysisTabPanel.tasklogAddForm = new Ext.form.FormPanel({
				id : 'tasklogAddForm',
				fileUpload : true,
				enctype : 'multipart/form-data',
				bodyStyle : 'padding:5px 5px 0',
				disabled : true,
				labelWidth : 80,
				// height:800,
				defaults : {
					anchor : '62%',
					msgTarget : 'side'
				},
				items : [tasklogAttributeTaskId, tasklogAttributeTask,
						tasklogName, tasklogContent, {
							xtype : 'fileuploadfield',
							id : 'tasklogfile1',
							fieldLabel : '' + getResource('resourceParam469')
									+ '',
							buttonText : '' + getResource('resourceParam473')
									+ ''

						}],
				buttons : [{
							text : '保存',
							handler : tasklogSubmit
						}, {
							text : '' + getResource('resourceParam606') + '',
							handler : tasklogReset
						}]
			});

	function tasklogSubmit() {
		var temp = Ext.getCmp('tasklogContent').getValue();
		if (!analysisTabPanel.tasklogAddForm.getForm().isValid()) {
			return;
		}
		analysisTabPanel.tasklogAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ base.convertNodeId(Ext.getCmp('tasklogAttributeTaskId')
							.getValue()) + '&logAttributeTask='
					+ Ext.getCmp('tasklogAttributeTask').getValue()
					+ '&logName=' + Ext.getCmp('tasklogName').getValue()
					+ '&logContent=' + Ext.getCmp('tasklogContent').getValue()
					+ '&messageType=1',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var tasklogAttributeTaskIds = Ext
						.getCmp('tasklogAttributeTaskId').getValue();
				var tasklogAttributeTasks = Ext.getCmp("tasklogAttributeTask")
						.getValue();
				analysisTabPanel.tasklogAddForm.getForm().reset();
				Ext.getCmp("tasklogAttributeTask")
						.setValue(tasklogAttributeTasks);
				Ext.getCmp("tasklogAttributeTaskId")
						.setValue(tasklogAttributeTaskIds);
			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam594') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	function tasklogReset() {
		Ext.getCmp('tasklogName').setValue("");
		Ext.getCmp('tasklogContent').setValue("");
	}
	analysisTabPanel.taskaddloginfo = new Ext.Panel({
				id : 'taskaddloginfo',
				title : '  ' + getResource('resourceParam628') + '',
				// visible : false,
				//
				// autoScroll : true,
				layout : 'fit',
				items : [analysisTabPanel.tasklogAddForm],
				listeners : {
					'activate' : function() {
						// logTabPanel.doLayout();
					}
				}
			});

	analysisTabPanel.tasklgoPanel = new Ext.Panel({
		title : '' + getResource('resourceParam629') + '',
		frame : false,
		boder : false,
		layout : 'fit',
		disabled : true,
		html : "<iframe scrolling=auto  id='taskloginfoframe'  frameborder=0 width=100% height=100% src='../logInfo.seam' ></iframe>",
		listeners : {
			'activate' : function() {
				Ext.Ajax.request({
					url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.remove) {
							// analysisMain.refresh();
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : obj.message,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						} else {
							data = obj;
							buttonFunc();
							var taskid = base
									.convertNodeId(leftNavigationTree.nodeId);
							taskid = taskid.indexOf('p') == 0 ? taskid
									.substring(1) : taskid;
							document.getElementById('taskloginfoframe').src = "../logInfo.seam?temp="
									+ new Date()
									+ "&taskid="
									+ taskid
									+ "&publics=1&publishMode=4&typeStr=1,3,4,";
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataId : base.convertNodeId(leftNavigationTree.nodeId)
					}
				});

			}
		}

	});
	// 进度
	analysisTabPanel.t8 = processSharingPanel.init();
	analysisTabPanel.t8.on("activate", function() {
		buttonFunc();
		var taskname = base.convertNodeId(leftNavigationTree.nodeId);
		var proxy = new Ext.data.HttpProxy({
			url : '../JSON/anotherprocessquery_ProcessquerySvr.getProjectTaskAndId?taskname='
					+ taskname
		});
		processSharingPanel.grid.getStore().proxy = proxy;
		myGrid.loadvalue(processSharingPanel.grid.getStore(), analysisMain.args,
				analysisMain.baseargs);
	});

	// 甘特图
	analysisTabPanel.t9 = ganttMain.init();
	// analysisTabPanel.t9
	// .on("activate", function() {
	// buttonFunc();
	// var taskname = base.convertNodeId(leftNavigationTree.nodeId);
	// // if(taskname==0)
	// // {return;}
	// var proxy = new Ext.data.HttpProxy(
	// {
	// url : '../JSON/aofoquery_zongheChaxunSvr.getGanttList?nodeid=' + taskname
	// // url:'tasks.json'
	// });
	// ganttMain.ganttGrid.getStore().proxy = proxy;
	// myGrid.loadvalue(ganttMain.ganttGrid.getStore(),
	// analysisMain.args, analysisMain.baseargs);
	// });

	analysisTabPanel.t9.on("activate", function() {
		buttonFunc();
		
		var taskname = base.convertNodeId(leftNavigationTree.nodeId);
		Seam.Component.getInstance("aofoquery_zongheChaxunSvr").getStartDate(
				taskname, function(reslut) {
					var proxy = new Ext.data.HttpProxy({
						url : '../JSON/aofoquery_zongheChaxunSvr.getGanttList?nodeid='
								+ taskname
					});
					var today = Date.parseDate(reslut, "Y-m-d");
					ganttMain.ganttGrid.setView(today, today
									.add(Date.MONTH, 12), 'monthAndQuarters');
					ganttMain.ganttGrid.getStore().proxy = proxy;
					myGrid.loadvalue(ganttMain.ganttGrid.getStore(),
							analysisMain.args, analysisMain.baseargs);
					myGrid.loadvalue(ganttMain.ganttGrid.dependencyStore,
							analysisMain.args, analysisMain.baseargs);
				});

	});

	// 参与人
	// analysisTabPanel.t10=participant.init();
	// analysisTabPanel.t11=new Ext.Panel({
	// title:'参与人',
	// layout:'fit',
	// items:[analysisTabPanel.t10]
	// });
	// analysisTabPanel.t11

	analysisTabPanel.T1=new Ext.Panel({
				id : 'analysisTabPanelt1',
				title : '工作包说明',
				layout : 'fit',
				waitText: 'fd',
//				/bodyStyle :'font: 100% 宋体, 新宋体;background: #666666;margin: 0;padding: 0;text-align: center; color: #000000;',
				//html:'<div id="analysisTabPanelt1divid" ></div>',
				listeners : {
					activate : function() {
	
							var appVo = Seam.Remoting.createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");
							    appVo.setNodeid(leftNavigationTree.nodeId);
							    appVo.setHis(false);
								callSeam("budgetPvAcRemote","getWorkOrContext",[appVo],analysisTabPanel.workOrContext);
								
					}
				
				}
	});
	var i = 0;
		analysisTabPanel.T2=new Ext.Panel({
				id : 'tabPv1',
				title : 'PV统计报表',
				layout : 'fit',
				listeners : {
					'activate' : function(tab) {
			
		
			reportView('tabPv1',leftNavigationTree.nodeId,'1','/xac/pv.html',false);
						 
			
		
					}
				}
	})
		
		
		analysisTabPanel.T3=new Ext.Panel({
				id : 'tabAc1',
				title : 'AC统计报表',
				layout : 'fit',
				listeners : {
					'activate' : function() {
			
						report.view.html('tabAc1',leftNavigationTree.nodeId,'2','/xac/ac.html',false);
						
						
					}
				}
	});
	
		analysisTabPanel.T4=new Ext.Panel({
				id : 'tabStatus',
				title : '工作进度状况表',
				layout : 'fit',
				width :50,
				height:200,
				autoScroll :true,
				listeners : {
					'activate' : function() {
					excelType = 1;
					report.view.html('tabStatus',leftNavigationTree.nodeId,'3','/xac/status.html',false);
						
					}
				}
	});
	analysisTabPanel.T5=new Ext.Panel({
				id : 'tabAnalysis',
				title : '月度分析报表',
				layout : 'fit',
				listeners : {
					'activate' : function() {
						
						
						var results = Seam.Component.getInstance("budgetPvAcRemote")
						.isControlAndPackage(leftNavigationTree.nodeId,function(data){
							if(data == 1){
								excelType = 2;
								report.view.html('tabAnalysis',leftNavigationTree.nodeId,'4','/xac/controlaccount.html',false);
						}else{
							excelType = 3;
							report.view.html('tabAnalysis',leftNavigationTree.nodeId,'5','/xac/taskstatus.html',false);
						}
						});
						
					}
				}
	});
	
    analysisTabPanel.T6=new Ext.Panel({
				id : 'tabTaskStatus',
				title : '任务完成情况月度分析报表',
				layout : 'fit',
				listeners : {
					'activate' : function() {
    					report.view.html('tabTaskStatus',leftNavigationTree.nodeId,'5','/xac/taskstatus.html',false);
					}
				}
	});
  

	// TAB面板
	analysisTabPanel.tabPanel = new Ext.TabPanel({
				id : 'tabReport',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : true,
				enableTabScroll : true,
				items : [analysisTabPanel.attributePanel,
//						analysisTabPanel.dataPanel,
//						analysisTabPanel.relationPanel,
						analysisTabPanel.wbsPanel,
					    analysisTabPanel.T1,
					    analysisTabPanel.T2,
					    analysisTabPanel.T3,
					    analysisTabPanel.T4,
					    analysisTabPanel.T5
//						analysisTabPanel.t8,
//						analysisTabPanel.t9, 
//					    analysisTabPanel.feedbackPanel,
//						analysisTabPanel.tasklgoPanel
						],
				activeTab : 0
			});
	
	
	
	return analysisTabPanel.tabPanel;
}

analysisTabPanel.workOrContext=function(reslut)
{
	  var _reslut=Ext.util.JSON.decode(reslut);
	  var html = "<div id='pv'>" +
   "<div class='thead'>" +
       "<div class='th'>" +
          "<span>承研单位：</span>" +"<br />" +
          "<span>1.活动类型："+analysisTabPanel.isStr(_reslut[0].a)+"</span></div>" +
       "<div class='th'><span>工作包名称及编号:</span><br />" +
          "<span>2.时间进度："+analysisTabPanel.isStr(_reslut[0].b)+"</span>" +
       "</div>" +
   "</div>" +
   "<div class='tBody'>" +
    "<div class='tfoot'>3.目标："+analysisTabPanel.isStr(_reslut[0].c)+"</div><p>" +
    "<div class='tfoot'>4.内容范围描述，工作步骤、途径或方法："+analysisTabPanel.isStr(_reslut[0].d)+"</div><p>" +
    "<div class='tfoot'>5.负责人及参与者："+analysisTabPanel.isStr(_reslut[0].e)+"</div><p>" +
    "<div class='tfoot'>6.可交付成果和里程碑："+analysisTabPanel.isStr(_reslut[0].f)+"</div><p>" +
    "<div class='tfoot'>7.挣值测量方法："+analysisTabPanel.isStr(_reslut[0].g)+"</div><p>" +
    "<div class='tfoot'>8.经费预算额度及依据说:"+analysisTabPanel.isStr(_reslut[0].h)+"</div><p>" +
    "<div class='th'>填报部门签字盖章：</div><div class='th'></div>" +
   "</div>";
	Ext.getCmp('analysisTabPanelt1').getEl().dom.innerHTML = html;
}
analysisTabPanel.isStr=function(name)
{
   if(name == null || name == "null" || name == undefined)
   {
   	  name = "";
   }
   return name;
}

