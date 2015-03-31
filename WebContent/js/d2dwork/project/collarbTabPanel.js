var collarbTabPanel = {};
var data = {};
var buffer = {};
collarbTabPanel.init = function() {
	Ext.QuickTips.init();
	function requestPrivilege(callback) {
		var nodeId = leftNavigationTree.nodeId;
		if (nodeId == 0) {
			buttonFunc();
			return;
		}
		var prifixNodeId = base.convertNodeId(nodeId);
		var dataId = base.getDataId(prifixNodeId);
		var dataType = base.getDataType(prifixNodeId);
		if (buffer.hasOwnProperty(nodeId)) {
			data = buffer[nodeId];
			buttonFunc();
			callback();
		} else {
			Ext.Ajax.request({
						url : "../JSON/privilege_DataPrivilegeRemote.getManipulations",
						method : 'GET',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							data = obj;
							buffer[leftNavigationTree.nodeId] = data;
							buttonFunc();
							callback();
						},
						params : {
							dataId : dataId,
							dataType : dataType
						}
					});
		}
	}

	function buttonFunc() {
		if (leftNavigationTree.nodeId == 0) {
			// 根节点
			Ext.getCmp('create').enable();
			var node = leftNavigationTree.node;
			if (collarbMain.pasteType == 'cut') {
				if (collarbMain.cutProjectId != null) {
					var copiedNode = collarbMain.leftTree
							.getNodeById(collarbMain.cutProjectId);
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
			if (collarbMain.pasteType == 'copy') {
				if (collarbMain.copyProjectId != null) {
					var copiedNode = collarbMain.leftTree
							.getNodeById(collarbMain.copyProjectId);
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
			Ext.getCmp('restart').disable();
		} else if (leftNavigationTree.nodeId.indexOf('c') == 0) {
			// 项目夹
			if (data.add) {
				Ext.getCmp('create').enable();
				Ext.getCmp('createProjectByManual').enable();
				Ext.getCmp('createProjectByManual').setText('<span>'
						+ getResource('resourceParam1549') + '</span>');
				Ext.getCmp('createProjectFolder').enable();
				Ext.getCmp('createProjectFolder').setText('<span>'
						+ getResource('resourceParam1546') + '</span>');
			} else {
				Ext.getCmp('createProjectByManual').disable();
				Ext.getCmp('createProjectByManual').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam1549') + '</span>');
				Ext.getCmp('createProjectFolder').disable();
				Ext.getCmp('createProjectFolder').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam1546') + '</span>');
			}

			if (data.modify) {
				Ext.getCmp('update').enable();
				Ext.getCmp('update').setTooltip('');
			} else {
				Ext.getCmp('update').disable();
				Ext.getCmp('update').setTooltip(data.modify_msg);
			}
			if (data.updown) {
				Ext.getCmp('moveUp').enable();
				Ext.getCmp('moveUp').setTooltip('');
				Ext.getCmp('moveDown').enable();
				Ext.getCmp('moveUp').setTooltip('');
			} else {
				Ext.getCmp('moveUp').disable();
				Ext.getCmp('moveUp').setTooltip(data.updown_msg);
				Ext.getCmp('moveDown').disable();
				Ext.getCmp('moveUp').setTooltip(data.updown_msg);
			}
			if (data.del) {
				Ext.getCmp('delete').enable();
				Ext.getCmp('delete').setTooltip('');
			} else {
				Ext.getCmp('delete').disable();
				Ext.getCmp('delete').setTooltip(data.del_msg);
			}
			if (data.setprivilege) {
				Ext.getCmp('privilege').enable();
				Ext.getCmp('privilege').setTooltip('');
			} else {
				Ext.getCmp('privilege').disable();
				Ext.getCmp('privilege').setTooltip(data.setprivilege_msg);
			}
			var node = leftNavigationTree.node;
			if (collarbMain.pasteType == 'cut') {
				if (collarbMain.cutProjectId != null) {
					var copiedNode = collarbMain.leftTree
							.getNodeById(collarbMain.cutProjectId);
					if (copiedNode != null) {
						if (copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').disable();
						} else if (copiedNode.id == node.id) {
							Ext.getCmp('pasteTask').disable();
						} else if (!copiedNode.contains(node)) {
							if (data.paste) {
								Ext.getCmp('pasteTask').enable();
								Ext.getCmp('pasteTask').setTooltip('');
							} else {
								Ext.getCmp('pasteTask').disable();
								Ext.getCmp('pasteTask')
										.setTooltip(data.paste_msg);
							}
						}
					}
				} else {
					Ext.getCmp('pasteTask').disable();
				}
			}
			if (collarbMain.pasteType == 'copy') {
				if (collarbMain.copyProjectId != null) {
					var copiedNode = collarbMain.leftTree
							.getNodeById(collarbMain.copyProjectId);
					if (copiedNode != null) {
						if (copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').disable();
						} else if (copiedNode.id == node.id) {
							Ext.getCmp('pasteTask').disable();
						} else if (!copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').enable();
							Ext.getCmp('pasteTask').setTooltip('');
						}
					}
				}
			}
			Ext.getCmp('terminate').disable();
			Ext.getCmp('approve').disable();
			Ext.getCmp('copyTask').disable();
			Ext.getCmp('cutTask').disable();
			Ext.getCmp('restart').disable();
		} else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
			// 项目
			Ext.getCmp('restart').disable();
			if (data.modify) {
				Ext.getCmp('update').enable();
				Ext.getCmp('update').setTooltip('');
				Ext.getCmp('examApprovalTab').enable();
			} else {
				Ext.getCmp('update').disable();
				Ext.getCmp('update').setTooltip(data.modify_msg);
				Ext.getCmp('examApprovalTab').enable();
			}
			if (data.copy) {
				Ext.getCmp('copyTask').enable();
				Ext.getCmp('copyTask').setTooltip('');
			} else {
				Ext.getCmp('copyTask').disable();
				Ext.getCmp('copyTask').setTooltip(data.copy_msg);
			}
			if (data.cut) {
				Ext.getCmp('cutTask').enable();
				Ext.getCmp('cutTask').setTooltip('');
			} else {
				Ext.getCmp('cutTask').disable();
				Ext.getCmp('cutTask').setTooltip(data.cut_msg);
			}
			if (collarbMain.pasteType == 'cut') {
				if (collarbMain.cutTaskId != null) {
					if (data.paste) {
						Ext.getCmp('pasteTask').enable();
						Ext.getCmp('pasteTask').setTooltip('');
					} else {
						Ext.getCmp('pasteTask').disable();
						Ext.getCmp('pasteTask').setTooltip(data.paste_msg);
					}
				} else {
					Ext.getCmp('pasteTask').disable();
				}
			} else if (collarbMain.pasteType == 'copy') {
				if (collarbMain.copyTaskId != null) {
					if (data.paste) {
						Ext.getCmp('pasteTask').enable();
						Ext.getCmp('pasteTask').setTooltip('');
					} else {
						Ext.getCmp('pasteTask').disable();
						Ext.getCmp('pasteTask').setTooltip(data.paste_msg);
					}
				} else {
					Ext.getCmp('pasteTask').disable();
				}
			}
			if (data.add) {
				Ext.getCmp('create').enable();
				var node = leftNavigationTree.node;
				if(node.attributes.statusId==9){
					Ext.getCmp('createSubLevelTask').disable();
					Ext.getCmp('createSubLevelTask').setText('<span ext:qtip="暂停的项目不能新建子任务！">'
							+ getResource('resourceParam1191') + '</span>');
					Ext.getCmp('createByWBSTemplate').disable();
					Ext.getCmp('createByWBSTemplate').setText('<span ext:qtip="暂停的项目不能应用模板！">'
							+ getResource('resourceParam9162') + '</span>');
					Ext.getCmp('createApproveTask').disable();
					Ext.getCmp('createApproveTask').setText('<span ext:qtip="暂停的项目不能创建审批任务！">'
							+ getResource('resourceParam9163') + '</span>');
					
				}else{
					Ext.getCmp('createSubLevelTask').enable();
					Ext.getCmp('createSubLevelTask').setText('<span >'
							+ getResource('resourceParam1191') + '</span>');
					Ext.getCmp('createByWBSTemplate').enable();
					Ext.getCmp('createByWBSTemplate').setText('<span >'
							+ getResource('resourceParam9162') + '</span>');
					Ext.getCmp('createApproveTask').enable();
					Ext.getCmp('createApproveTask').setText('<span >'
							+ getResource('resourceParam9163') + '</span>');
				}
				
			} else {
				Ext.getCmp('createSubLevelTask').disable();
				Ext.getCmp('createSubLevelTask').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam1191') + '</span>');
				Ext.getCmp('createByWBSTemplate').disable();
				Ext.getCmp('createByWBSTemplate').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam9162') + '</span>');
				Ext.getCmp('createApproveTask').disable();
				Ext.getCmp('createApproveTask').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam9163') + '</span>');
			}
			if (data.del) {
				Ext.getCmp('delete').enable();
				Ext.getCmp('delete').setTooltip('');
			} else {
				Ext.getCmp('delete').disable();
				Ext.getCmp('delete').setTooltip(data.del_msg);
			}
			if (data.terminate) {
				Ext.getCmp('terminate').enable();
				Ext.getCmp('terminate').setTooltip('');
			} else {
				Ext.getCmp('terminate').disable();
				Ext.getCmp('terminate').setTooltip(data.terminate_msg);
			}

			if (data.approve || data.setpass || data.setcompleted
					|| data.modify) {
				// 送审下拉
				Ext.getCmp('approve').enable();
			} else {
				Ext.getCmp('approve').enable();
			}
			if (data.approve) {
				// 提交送审
				Ext.getCmp('projectVerify').enable();
				Ext.getCmp('projectVerify').setText('<span>'
						+ getResource('resourceParam1550') + '...</span>');
			} else {
				Ext.getCmp('projectVerify').disable();
				Ext.getCmp('projectVerify').setText('<span ext:qtip="'
						+ data.approve_msg + '">'
						+ getResource('resourceParam1550') + '...</span>');
			}
			if (data.setpass) {
				// 置通过
				Ext.getCmp('projectApprove').enable();
				Ext.getCmp('projectApprove').setText('<span >置通过</span>');
			} else {
				Ext.getCmp('projectApprove').disable();
				Ext.getCmp('projectApprove').setText('<span ext:qtip="'
						+ data.setpass_msg + '">置通过</span>');
			}
			if (data.setcompleted) {
				// 置完成
				Ext.getCmp('projectApprove1').enable();
				Ext.getCmp('projectApprove1').setText('<span >置完成</span>');
			} else {
				Ext.getCmp('projectApprove1').disable();
				Ext.getCmp('projectApprove1').setText('<span ext:qtip="'
						+ data.setcompleted_msg + '">置完成</span>');
			}
			if (data.setprivilege) {
				Ext.getCmp('privilege').enable();
				Ext.getCmp('privilege').setTooltip('');
			} else {
				Ext.getCmp('privilege').disable();
				Ext.getCmp('privilege').setTooltip(data.setprivileg_msg);
			}
			if (data.updown) {
				Ext.getCmp('moveUp').enable();
				Ext.getCmp('moveDown').enable();
				Ext.getCmp('moveUp').setTooltip('');
				Ext.getCmp('moveDown').setTooltip('');
			} else {
				Ext.getCmp('moveUp').disable();
				Ext.getCmp('moveDown').disable();
				Ext.getCmp('moveUp').setTooltip(data.updown_msg);
				Ext.getCmp('moveDown').setTooltip(data.updown_msg);
			}

		} else if (leftNavigationTree.nodeId.indexOf('v') == 0) {
			// 如果是关联节点
			Ext.getCmp('copyTask').disable();
			Ext.getCmp('cutTask').disable();
			Ext.getCmp('delete').disable();
			Ext.getCmp('terminate').disable();
			Ext.getCmp('approve').disable();
			Ext.getCmp('privilege').disable();
			Ext.getCmp('update').disable();
			Ext.getCmp('create').disable();
			Ext.getCmp('pasteTask').disable();
			Ext.getCmp('moveUp').disable();
			Ext.getCmp('moveDown').disable();
			Ext.getCmp('restart').disable();
		} else {
			var node = collarbMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			if (data.restart) {
				Ext.getCmp('restart').enable();
				Ext.getCmp('restart').setTooltip('');
			} else {
				Ext.getCmp('restart').disable();
				Ext.getCmp('restart').setTooltip(data.restart_msg);
			}
			if (data.copy) {
				Ext.getCmp('copyTask').enable();
				Ext.getCmp('copyTask').setTooltip('');
			} else {
				Ext.getCmp('copyTask').disable();
				Ext.getCmp('copyTask').setTooltip(data.copy_msg);
			}
			if (data.cut) {
				Ext.getCmp('cutTask').enable();
				Ext.getCmp('cutTask').setTooltip('');
			} else {
				Ext.getCmp('cutTask').disable();
				Ext.getCmp('cutTask').setTooltip(data.cut_msg);
			}
			if (data.del) {
				Ext.getCmp('delete').enable();
				Ext.getCmp('delete').setTooltip('');
			} else {
				Ext.getCmp('delete').disable();
				Ext.getCmp('delete').setTooltip(data.del_msg);
			}
			if (data.terminate) {
				Ext.getCmp('terminate').enable();
				Ext.getCmp('terminate').setTooltip('');
			} else {
				Ext.getCmp('terminate').disable();
				Ext.getCmp('terminate').setTooltip(data.terminate_msg);
			}
			if (data.approve || data.setpass || data.setcompleted
					|| data.modify) {
				Ext.getCmp('approve').enable();
			} else {
				Ext.getCmp('approve').enable();
			}
			if (leftNavigationTree.approval == 0) {
				// 不为不需要审批的
				Ext.getCmp('projectVerify').enable();
				Ext.getCmp('projectVerify').setText('<span >'
						+ getResource('resourceParam1550') + '...</span>');
			} else {
				Ext.getCmp('projectVerify').disable();
				Ext.getCmp('projectVerify').setText('<span ext:qtip="'
						+ data.approve_msg + '">'
						+ getResource('resourceParam1550') + '...</span>');
			}
			// 提交审批
			if (data.approve) {
				Ext.getCmp('projectVerify').enable();
				Ext.getCmp('projectVerify').setText('<span >'
						+ getResource('resourceParam1550') + '...</span>');
			} else {
				Ext.getCmp('projectVerify').disable();
				Ext.getCmp('projectVerify').setText('<span ext:qtip="'
						+ data.approve_msg + '">'
						+ getResource('resourceParam1550') + '...</span>');
			}
			if (data.setpass) {
				// 置通过
				Ext.getCmp('projectApprove').enable();
				Ext.getCmp('projectApprove').setText('<span>置通过</span>');
			} else {
				Ext.getCmp('projectApprove').disable();
				Ext.getCmp('projectApprove').setText('<span ext:qtip="'
						+ data.setpass_msg + '">置通过</span>');
			}
			if (data.setcompleted) {
				// 置完成
				Ext.getCmp('projectApprove1').enable();
				Ext.getCmp('projectApprove1').setText('<span >置完成</span>');
			} else {
				Ext.getCmp('projectApprove1').disable();
				Ext.getCmp('projectApprove1').setText('<span ext:qtip="'
						+ data.setcompleted_msg + '">置完成</span>');
			}

			if (data.setprivilege) {
				Ext.getCmp('privilege').enable();
				Ext.getCmp('privilege').setTooltip('');
			} else {
				Ext.getCmp('privilege').disable();
				Ext.getCmp('privilege').setTooltip(data.setprivilege_msg);
			}
			if (data.modify) {
				Ext.getCmp('update').enable();
				Ext.getCmp('update').setTooltip('');
				Ext.getCmp('examApprovalTab').enable();
			} else {
				Ext.getCmp('update').disable();
				Ext.getCmp('update').setTooltip(data.modify_msg);
				Ext.getCmp('examApprovalTab').enable();
			}

			if (data.add || data.addsame) {
				Ext.getCmp('create').enable();
			} else {
				Ext.getCmp('create').disable();
			}
			if (data.add) {
				var node = leftNavigationTree.node;
				if(node.attributes.statusId==9){
					Ext.getCmp('createSubLevelTask').disable();
					Ext.getCmp('createSubLevelTask').setText('<span ext:qtip="暂停的任务不能新建子任务！">'
							+ getResource('resourceParam1191') + '</span>');
					Ext.getCmp('createByWBSTemplate').disable();
					Ext.getCmp('createByWBSTemplate').setText('<span ext:qtip="暂停的任务不能应用模板！">'
							+ getResource('resourceParam9162') + '</span>');
					Ext.getCmp('createApproveTask').disable();
					Ext.getCmp('createApproveTask').setText('<span ext:qtip="暂停的任务不能创建审批任务！">'
							+ getResource('resourceParam9163') + '</span>');
				}else{
					Ext.getCmp('createSubLevelTask').enable();
					Ext.getCmp('createSubLevelTask').setText('<span >'
							+ getResource('resourceParam1191') + '</span>');
					Ext.getCmp('createByWBSTemplate').enable();
					Ext.getCmp('createByWBSTemplate').setText('<span >'
							+ getResource('resourceParam9162') + '</span>');
					Ext.getCmp('createApproveTask').enable();
					Ext.getCmp('createApproveTask').setText('<span >'
							+ getResource('resourceParam9163') + '</span>');
				}
			} else {
				Ext.getCmp('createSubLevelTask').disable();
				Ext.getCmp('createSubLevelTask').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam1191') + '</span>');
				Ext.getCmp('createByWBSTemplate').disable();
				Ext.getCmp('createByWBSTemplate').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam9162') + '</span>');
				Ext.getCmp('createApproveTask').disable();
				Ext.getCmp('createApproveTask').setText('<span ext:qtip="'
						+ data.add_msg + '">'
						+ getResource('resourceParam9163') + '</span>');
			}
			if (data.addsame) {
				var node = leftNavigationTree.node;
				if(node.attributes.statusId==9){
					Ext.getCmp('createSameLevelTask').disable();
					Ext.getCmp('createSameLevelTask').setText('<span ext:qtip="暂停的任务不能创建同级任务！">'
							+ getResource('resourceParam1188') + '</span>');
				}else{
					Ext.getCmp('createSameLevelTask').enable();
					Ext.getCmp('createSameLevelTask').setText('<span >'
							+ getResource('resourceParam1188') + '</span>');
				}
			} else {
				Ext.getCmp('createSameLevelTask').disable();
				Ext.getCmp('createSameLevelTask').setText('<span ext:qtip="'
						+ data.addsame_msg + '">'
						+ getResource('resourceParam1188') + '</span>');
			}
			var node = leftNavigationTree.node;
			if (collarbMain.pasteType == 'cut') {
				if (collarbMain.cutTaskId != null) {
					var copiedNode = collarbMain.leftTree
							.getNodeById(collarbMain.cutTaskId);
					if (copiedNode != null) {
						if (copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').disable();
						} else if (copiedNode.id == node.id) {
							Ext.getCmp('pasteTask').disable();
						} else if (!copiedNode.contains(node)) {
							if (data.paste) {
								Ext.getCmp('pasteTask').enable();
								Ext.getCmp('pasteTask').setTooltip('');
							} else {
								Ext.getCmp('pasteTask').disable();
								Ext.getCmp('pasteTask')
										.setTooltip(data.paste_msg);
							}
						}
					}
				} else {
					Ext.getCmp('pasteTask').disable();
				}
			}
			if (collarbMain.pasteType == 'copy') {
				if (collarbMain.copyTaskId != null) {
					var copiedNode = collarbMain.leftTree
							.getNodeById(collarbMain.copyTaskId);
					if (copiedNode != null) {
						if (copiedNode.contains(node)) {
							Ext.getCmp('pasteTask').disable();
						} else if (copiedNode.id == node.id) {
							Ext.getCmp('pasteTask').disable();
						} else if (!copiedNode.contains(node)) {
							if (data.paste) {
								Ext.getCmp('pasteTask').enable();
							} else {
								Ext.getCmp('pasteTask').disable();
							}
						}
					}
				}
			}
			if (data.updown) {
				Ext.getCmp('moveUp').enable();
				Ext.getCmp('moveDown').enable();
				Ext.getCmp('moveUp').setTooltip('');
				Ext.getCmp('moveDown').setTooltip('');
			} else {
				Ext.getCmp('moveUp').disable();
				Ext.getCmp('moveDown').disable();
				Ext.getCmp('moveUp').setTooltip(data.updown_msg);
				Ext.getCmp('moveDown').setTooltip(data.updown_msg);
			}
		}
	}

	collarbTabPanel.attributePanel = new Ext.Panel({
		id : 'attributePanel',
		itemId : 'attributePanel',
		title : getResource('resourceParam5001'), // 属性
		frame : false,
		boder : false,
		layout : 'fit',
		listeners : {
			activate : function() {
				if (collarbTabPanel.attributePanelMain == null) {
					collarbTabPanel.attributePanelMain = attributePanel.init();
					collarbTabPanel.attributePanel
							.add(collarbTabPanel.attributePanelMain);
				}
				this.removeClass('x-hide-display');
				var callback = function() {
					if (leftNavigationTree.nodeId.indexOf('p') == 0
							|| leftNavigationTree.nodeId.indexOf('vp') == 0) {
						ProjectAttributePanel.setFirstPage();
						/**
						 * bug编号34
						 * bug信息（复制一个进行中的自动化任务，粘贴后，鼠标再原任务和粘贴任务直接来回点击，状态就会混乱）
						 * 
						 * @author wangyf
						 * @param node
						 * @param obj
						 * @return
						 */
						var errorCallBack = function(iconCls) {
							// var node = collarbMain.leftTree
							// .getNodeById(leftNavigationTree.nodeId);
							// var el = node.getUI().getIconEl();
							// Ext.Element
							// .fly(el)
							// .removeClass(node.attributes.iconCls);
							// Ext.Element.fly(el).addClass(iconCls);
						}
						attributePanel.attributePanel.getLayout()
								.setActiveItem(0);
						ProjectAttributePanel.projectId = base
								.convertNodeId(leftNavigationTree.nodeId);
						ProjectAttributePanel.setBasicForm(
								ProjectAttributePanel.projectId, errorCallBack);
					} else if (leftNavigationTree.nodeId != 0
							&& leftNavigationTree.nodeId.indexOf('c') != 0) {
						TaskAttributePanel.setFirstPage();
						var errorCallBack = function(iconCls) {
							// var node = collarbMain.leftTree
							// .getNodeById(leftNavigationTree.nodeId);
							// node.beginUpdate();
							// var el = node.getUI().getIconEl();
							// Ext.Element
							// .fly(el)
							// .removeClass(node.attributes.iconCls);
							// Ext.Element.fly(el).addClass(iconCls);
							// node.attributes.iconCls=iconCls;
							// node.endUpdate();
						}
						var node = leftNavigationTree.node;
						if (node.attributes.nt == 0
								|| node.attributes.nt == '0') {
							attributePanel.attributePanel.getLayout()
									.setActiveItem(1);
							TaskAttributePanel.setBasicForm(
									leftNavigationTree.nodeId, errorCallBack);
						} else if (node.attributes.nt == 1
								|| node.attributes.nt == '1') {
							attributePanel.attributePanel.getLayout()
									.setActiveItem(2);
							viewApproveTask.setBasicForm(
									leftNavigationTree.nodeId, errorCallBack);
						}

					}
				};
				requestPrivilege(callback);
			}
		}
	});

	function fnCallback(flag) {
		Ext.getCmp('dataObjectColumnTreeDel').disable();
		Ext.getCmp('dataObjectColumnTreeAdd').disable();
		Ext.getCmp('dataObjectColumnTreeUpdate').disable();
	};
	// 任务数据tab页
	if (collarbTabPanel.dataPanel == null) {
		collarbTabPanel.dataPanel_content_data = new dataObjectPanel();
		collarbTabPanel.dataPanel = collarbTabPanel.dataPanel_content_data
				.init();
	}
	collarbTabPanel.dataPanel.on('activate', function() {
		var callback = function() {
			if (leftNavigationTree.nodeId != 0) {
				var projectNode = collarbMain.leftTree.getSelectionModel()
						.getSelectedNode();
				var enableEdit = data.modify;
				if (projectNode.id.indexOf("c") != 0 && projectNode.id != 0) {
					var selectedProjectId;
					var selectedTaskId;
					if (projectNode.id.indexOf("p") == 0
							|| projectNode.id.indexOf("vp") == 0) {
						selectedProjectId = base.convertNodeId(projectNode.id);
						selectedTaskId = selectedProjectId.substr(1);
					} else {
						selectedProjectId = base
								.convertNodeId(projectNode.attributes.projectId)
						selectedTaskId = base.convertNodeId(projectNode.id);
					}
					collarbTabPanel.dataPanel_content_data.setConfigs(
							selectedProjectId, selectedTaskId, enableEdit);
				}
			}
		};
		requestPrivilege(callback);
	});
	// end
	collarbTabPanel.relationPanel = new Ext.Panel({
		id : 'relationPanel',
		title : '' + getResource('resourceParam1154') + '',
		frame : false,
		boder : false,
		disabled : true,
		layout : 'fit',
		listeners : {
			activate : function() {
				if (collarbTabPanel.relationPanel_content == null) {
					collarbTabPanel.relationPanel_content = relationPanel
							.init();
					collarbTabPanel.relationPanel
							.add(collarbTabPanel.relationPanel_content);
				}
				var callback = function() {
					var node = leftNavigationTree.node;
					var projectid = '';
					if (leftNavigationTree.node.id.indexOf('p') == 0) {
						projectid = leftNavigationTree.node.id.substring(1,
								leftNavigationTree.node.id.length);
					} else if (leftNavigationTree.node.id.indexOf('vp') == 0) {
						projectid = leftNavigationTree.node.id.substring(2,
								leftNavigationTree.node.id.length);
					} else {
						projectid = leftNavigationTree.node.attributes.projectId;
					}
					relationPanel.active(projectid, node.id,
							node.attributes.name);
				};
				requestPrivilege(callback);

			}
		}
	});

	collarbTabPanel.addColumnTree = function() {
		if (collarbTabPanel.wbs != null) {
			collarbTabPanel.wbsContainer.remove(collarbTabPanel.wbs);
		}
		wbsdata.nodeId = base.convertNodeId(leftNavigationTree.nodeId);
		wbsdata.checkbox = true;
		collarbTabPanel.wbs = wbsdata.init();
		collarbTabPanel.wbsContainer.add(collarbTabPanel.wbs);
		collarbTabPanel.wbsContainer.doLayout();
	};

	collarbTabPanel.wbsPanel = new Ext.Panel({
				id : 'wbsPanelOnTab',
				title : 'WBS',
				frame : false,
				boder : false,
				layout : 'fit',
				listeners : {
					activate : function() {
						if (collarbTabPanel.wbsContainer == null) {
							collarbTabPanel.wbsContainer = new Ext.Panel({
										frame : false,
										boder : false,
										layout : 'fit'
									});
							collarbTabPanel.wbsPanel
									.add(collarbTabPanel.wbsContainer);
						}
						var callback = function() {
							collarbTabPanel.addColumnTree();
							wbsdata.sourceNodeId = '';
							wbsdata.relationtypes = '1,2';
							wbsdata.refresh();
						}
						requestPrivilege(callback);
					}
				}
			});

	function logSubmit() {
		var temp = Ext.getCmp('logContent').getValue();
		var chargedManId = leftNavigationTree.node.attributes.chargedManId;

		if ("" == chargedManId || null == chargedManId
				|| undefined == chargedManId) {
			Ext.Msg.show({
						title : '' + getResource('resourceParam596') + '',
						msg : '' + getResource('resourceParam1551') + '',
						width : 170,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
			return;
		}

		if (!collarbTabPanel.logAddForm.getForm().isValid()) {
			return;
		}
		collarbTabPanel.logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ base.convertNodeId(Ext.getCmp('logAttributeTaskId')
							.getValue()) + '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent='
					+ '&messageType=3&publishMode=4&chargedManId='
					+ chargedManId,
			method : 'GET',
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
				collarbTabPanel.logAddForm.getForm().reset();
				Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);
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

	// function logSave() {
	// var temp = Ext.getCmp('logContent').getValue();
	// if (!collarbTabPanel.logAddForm.getForm().isValid()) {
	// return;
	// }
	// collarbTabPanel.logAddForm.getForm().submit(
	// {
	// url : '../logupload?logAttributeTaskId='
	// + base.convertNodeId(Ext.getCmp(
	// 'logAttributeTaskId').getValue())
	// + '&logAttributeTask='
	// + Ext.getCmp('logAttributeTask').getValue()
	// + '&logName=' + Ext.getCmp('logName').getValue()
	// + '&logContent='
	// + Ext.getCmp('logContent').getValue()
	// + '&messageType=3&publishMode=1',
	// method : 'GET',
	// // params:logAddForm,
	// success : function(form, action) {
	// Ext.Msg.show( {
	// title : '' + getResource('resourceParam596') + '',
	// msg : '' + getResource('resourceParam623') + '',
	// width : 170,
	// buttons : Ext.Msg.OK,
	// icon : Ext.Msg.INFO
	// });
	// var logAttributeTaskIds = Ext.getCmp(
	// 'logAttributeTaskId').getValue();
	// var logAttributeTasks = Ext.getCmp("logAttributeTask")
	// .getValue();
	// collarbTabPanel.logAddForm.getForm().reset();
	// Ext.getCmp("logAttributeTask").setValue(
	// logAttributeTasks);
	// Ext.getCmp("logAttributeTaskId").setValue(
	// logAttributeTaskIds);
	// },
	// failure : function(form, action) {
	// Ext.Msg.show( {
	// title : '' + getResource('resourceParam596') + '',
	// msg : '' + getResource('resourceParam623') + '',
	// width : 170,
	// buttons : Ext.Msg.OK,
	// icon : Ext.Msg.ERROR
	// });
	// }
	//
	// });
	// }
	function logReset() {
		Ext.getCmp('logName').reset();
		Ext.getCmp('logContent').reset();
		Ext.getCmp('logfile1').reset();
	}

	collarbTabPanel.feedbackPanel = new Ext.Panel({
		title : '' + getResource('resourceParam790') + '',// 提醒
		frame : false,
		boder : false,
		layout : 'fit',
		// disabled : true,
		listeners : {
			'activate' : function() {
				var prifixNodeId = base
						.convertNodeId(leftNavigationTree.nodeId);
				var dataId = base.getDataId(prifixNodeId);
				var dataType = base.getDataType(prifixNodeId);
				// if ('ProjectDataType' == dataType) {
				// this.setDisabled(true);
				// return;
				// } else {
				// this.setDisabled(false);
				// }
				if (collarbTabPanel.egridpanel12 == null) {
					var logAttributeTaskId = new Ext.form.TextField({

								id : 'logAttributeTaskId',
								inputType : 'hidden'
							});
					var logAttributeTask = new Ext.form.TextField({
								fieldLabel : dataType == 'TaskDataType'
										? getResource('resourceParam624')
										: getResource('resourceParam1851'),
								id : 'logAttributeTask',
								style : 'margin-bottom: 5px;',
								readOnly : true,
								width : 300
							});
					var logName = new Ext.form.TextField({
								id : 'logName',
								fieldLabel : ''
										+ getResource('resourceParam786') + '',
								style : 'margin-bottom: 5px;',
								width : 100,
								allowBlank : false,
								emptyText : ''
										+ getResource('resourceParam1553') + '',
								maxLength : 50,
								minLengthText : ''
										+ getResource('resourceParam786')
										+ '不能大于50个字符!',
								msgTarget : 'side'
							});
					var logContent = new Ext.form.TextArea({
								id : 'logContent',
								fieldLabel : ''
										+ getResource('resourceParam787') + '',
								style : 'margin-bottom: 5px;',
								width : 200,
								height : 100,
								// bug:746 可以为空 gaoyn 2011-5-25 10:05
								allowBlank : true,
								// emptyText : '' +
								// getResource('resourceParam785') + '',
								maxLength : 500,
								maxLengthText : ''
										+ getResource('resourceParam783') + ''
							});
					collarbTabPanel.logAddForm = new Ext.form.FormPanel({
						id : 'logAddForm',
						fileUpload : true,
						enctype : 'multipart/form-data',
						bodyStyle : 'padding:5px 5px 0',
						// disabled : true,
						// height:800,
						labelWidth : 80,
						defaults : {
							anchor : '62%',
							// allowBlank : false,
							msgTarget : 'side'
						},
						items : [
								new Ext.form.TextField({
									value : leftNavigationTree.node.attributes.chargedManId,
									id : 'chargedManId',
									inputType : 'hidden'
								}), logAttributeTaskId, logAttributeTask,
								logName,
								logContent, {
									xtype : 'fileuploadfield',
									id : 'logfile1',
									fieldLabel : ''
											+ getResource('resourceParam469')
											+ '',
									buttonText : ''
											+ getResource('resourceParam473')
											+ ''

								}],
						buttons : [{
									text : '' + getResource('resourceParam605')
											+ '',
									handler : logSubmit
								}, {
									text : '' + getResource('resourceParam606')
											+ '',
									handler : logReset
								}]
					});
					collarbTabPanel.addloginfo = new Ext.Panel({
								id : 'addloginfo',
								title : '  ' + getResource('resourceParam789')
										+ '',
								layout : 'fit',
								items : [collarbTabPanel.logAddForm]
							});
					collarbTabPanel.logTabPanel1 = new Ext.TabPanel({
								id : 'logTabPanel1',
								layoutOnTabChange : true,
								activeTab : 1,
								autoScroll : true,
								animScroll : true,
								resizeTabs : true,
								enableTabScroll : true,
								deferredRender : false,
								tabMargin : 0,
								items : [collarbTabPanel.addloginfo,
										collarbTabPanel.taskloggridPanel]

							});
					collarbTabPanel.egridpanel12 = new Ext.Panel({
								id : 'egridpanel12',
								layout : 'fit',
								items : [collarbTabPanel.logTabPanel1]
							});
					collarbTabPanel.feedbackPanel
							.add(collarbTabPanel.egridpanel12);
				}
				Ext.getCmp("logAttributeTask")
						.setValue(escSpanTag(leftNavigationTree.nodeText));

				// 如果是项目，去掉前缀p
				var logAttributeItemId;
				var convertedNodeId = base
						.convertNodeId(leftNavigationTree.nodeId);
				if (convertedNodeId.indexOf('p') == 0) {
					logAttributeItemId = convertedNodeId.substring(1);
				} else {
					logAttributeItemId = convertedNodeId;
				}
				// Ext.getCmp("logAttributeTaskId").setValue(
				// leftNavigationTree.nodeId);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeItemId);
				var callback = function() {
					// if (data.modify) {
					// collarbTabPanel.feedbackPanel.enable();
					// } else {
					// collarbTabPanel.feedbackPanel.disable();
					// }
					collarbTabPanel.logTabPanel1.setActiveTab(0);
				};
				requestPrivilege(callback);
			}
		}
	});

	// function tasklogSubmit() {
	// var temp = Ext.getCmp('tasklogContent').getValue();
	// if (!collarbTabPanel.tasklogAddForm.getForm().isValid()) {
	// return;
	// }
	// collarbTabPanel.tasklogAddForm.getForm().submit({
	// url : '../logupload?logAttributeTaskId='
	// + base.convertNodeId(Ext.getCmp('tasklogAttributeTaskId')
	// .getValue()) + '&logAttributeTask='
	// + Ext.getCmp('tasklogAttributeTask').getValue()
	// + '&logName=' + Ext.getCmp('tasklogName').getValue()
	// + '&logContent=' + Ext.getCmp('tasklogContent').getValue()
	// + '&messageType=1',
	// method : 'GET',
	// // params:logAddForm,
	// success : function(form, action) {
	// Ext.Msg.show({
	// title : '' + getResource('resourceParam596') + '',
	// msg : '' + getResource('resourceParam623') + '',
	// width : 170,
	// buttons : Ext.Msg.OK,
	// icon : Ext.Msg.INFO
	// });
	// var tasklogAttributeTaskIds = Ext
	// .getCmp('tasklogAttributeTaskId').getValue();
	// var tasklogAttributeTasks = Ext.getCmp("tasklogAttributeTask")
	// .getValue();
	// collarbTabPanel.tasklogAddForm.getForm().reset();
	// Ext.getCmp("tasklogAttributeTask")
	// .setValue(tasklogAttributeTasks);
	// Ext.getCmp("tasklogAttributeTaskId")
	// .setValue(tasklogAttributeTaskIds);
	// },
	// failure : function(form, action) {
	// Ext.Msg.show({
	// title : '' + getResource('resourceParam596') + '',
	// msg : '' + getResource('resourceParam594') + '',
	// width : 170,
	// buttons : Ext.Msg.OK,
	// icon : Ext.Msg.ERROR
	// });
	// }
	//
	// });
	// }
	// function tasklogReset() {
	// Ext.getCmp('tasklogName').setValue("");
	// Ext.getCmp('tasklogContent').setValue("");
	// }
	// collarbTabPanel.taskaddloginfo = new Ext.Panel(
	// {
	// id : 'taskaddloginfo',
	// title : ' ' + getResource('resourceParam628') + '',
	// layout : 'fit',
	// listeners : {
	// 'activate' : function() {
	// if (collarbTabPanel.tasklogAddForm == null) {
	// var tasklogAttributeTaskId = new Ext.form.TextField(
	// {
	//
	// id : 'tasklogAttributeTaskId',
	// inputType : 'hidden'
	// });
	//
	// var tasklogAttributeTask = new Ext.form.TextField(
	// {
	// fieldLabel : '' + getResource('resourceParam624') + '',
	// id : 'tasklogAttributeTask',
	// readOnly : true,
	// style : 'margin-bottom: 5px;',
	// width : 300
	// });
	// var tasklogName = new Ext.form.TextField(
	// {
	// id : 'tasklogName',
	// fieldLabel : '' + getResource('resourceParam625') + '',
	// style : 'margin-bottom: 5px;',
	// width : 100,
	// allowBlank : false,
	// emptyText : '' + getResource('resourceParam1552') + '',
	// maxLength : 95,
	// minLengthText : '' + getResource('resourceParam1449') + '',
	// msgTarget : 'side'
	// });
	// var tasklogContent = new Ext.form.TextArea(
	// {
	// id : 'tasklogContent',
	// fieldLabel : '' + getResource('resourceParam626') + '',
	// style : 'margin-bottom: 5px;',
	// width : 200,
	// height : 100,
	// allowBlank : false,
	// emptyText : '' + getResource('resourceParam622') + '',
	// maxLength : 2000,
	// maxLengthText : '' + getResource('resourceParam591') + ''
	// });
	//
	// collarbTabPanel.tasklogAddForm = new Ext.form.FormPanel(
	// {
	// id : 'tasklogAddForm',
	// fileUpload : true,
	// enctype : 'multipart/form-data',
	// bodyStyle : 'padding:5px 5px 0',
	// disabled : true,
	// labelWidth : 80,
	// // height:800,
	// defaults : {
	// anchor : '62%',
	// msgTarget : 'side'
	// },
	// items : [
	// tasklogAttributeTaskId,
	// tasklogAttributeTask,
	// tasklogName,
	// tasklogContent,
	// {
	// xtype : 'fileuploadfield',
	// id : 'tasklogfile1',
	// fieldLabel : '' + getResource('resourceParam469') + '',
	// buttonText : '' + getResource('resourceParam473') + ''
	//
	// } ],
	// buttons : [
	// {
	// text : getResource('resourceParam5019'),
	// handler : tasklogSubmit
	// },
	// {
	// text : '' + getResource('resourceParam606') + '',
	// handler : tasklogReset
	// } ]
	// });
	// collarbTabPanel.taskaddloginfo
	// .add(collarbTabPanel.tasklogAddForm);
	// }
	// Ext.getCmp("tasklogAttributeTask").setValue(
	// escSpanTag(leftNavigationTree.nodeText));
	// Ext.getCmp("tasklogAttributeTaskId").setValue(
	// leftNavigationTree.nodeId);
	//
	// }
	// }
	// });

	collarbTabPanel.taskloggridPanel = new Ext.Panel({
		title : '提醒',
		frame : false,
		boder : false,
		layout : 'fit',
		// disabled : true,
		html : "<iframe scrolling=auto  id='taskloginfoframe'  frameborder=0 width=100% height=100% src='../logInfo.seam' ></iframe>",
		listeners : {
			'activate' : function() {
				var prifixNodeId = base
						.convertNodeId(leftNavigationTree.nodeId);
				var dataId = base.getDataId(prifixNodeId);
				var dataType = base.getDataType(prifixNodeId);
				// if ('ProjectDataType' == dataType) {
				// this.setDisabled(true);
				// return;
				// } else {
				// this.setDisabled(false);
				// }
				var callback = function() {
					// if (data.modify) {
					// collarbTabPanel.tasklgoPanel.enable();
					// } else {
					// collarbTabPanel.tasklgoPanel.disable();
					// }
					var taskid = base.convertNodeId(leftNavigationTree.nodeId);
					taskid = taskid.indexOf('p') == 0
							? taskid.substring(1)
							: taskid;
					document.getElementById('taskloginfoframe').src = "../logInfo.seam?temp="
							+ new Date()
							+ "&taskid="
							+ taskid
							+ "&publics=1&publishMode=4&typeStr=3,";
				};
				requestPrivilege(callback);

			}
		}
	});
	
	collarbTabPanel.tasklgoPanel = new Ext.Panel({
				frame : false,
				boder : false,
				title : '' + getResource('resourceParam629') + '',
				layout : 'fit',
				listeners:{
					activate:function(){
						var taskid = base.convertNodeId(leftNavigationTree.nodeId);
						taskid = taskid.indexOf('p') == 0 ? taskid.substring(1) : taskid;
						collarbTabPanel.tasklgoPanel.items.get(0).getStore().load({
							params : {
								start : 0,
								limit : 25,
								taskid : taskid
							}
						});
					}
				},
				items : [taskLogGrid.init()]
			});
	collarbTabPanel.tasklgoPanel.items.get(0).getStore().on('beforeload',
			function(store, options) {
				this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/RecordRemote.getTaskRecordList'
						})
				var taskid = base.convertNodeId(leftNavigationTree.nodeId);
				taskid = taskid.indexOf('p') == 0 ? taskid.substring(1) : taskid;
				options.params = Ext.apply(options.params, {
							taskid : taskid
						});
			});

	// 进度
	collarbTabPanel.t8 = new Ext.Panel({
				frame : false,
				boder : false,
				title : '进度',
				layout : 'fit'
			});
	collarbTabPanel.t8.on("activate", function() {
		if (collarbTabPanel.t8_content == null) {
			collarbTabPanel.t8_content = processSharingPanel.init();
			collarbTabPanel.t8.add(collarbTabPanel.t8_content);
		}
		var callback = function() {
			var taskname = base.convertNodeId(leftNavigationTree.nodeId);
			var proxy = new Ext.data.HttpProxy({
				url : '../JSON/anotherprocessquery_ProcessquerySvr.getProjectTaskAndId?taskname='
						+ taskname
			});
			processSharingPanel.grid.getStore().proxy = proxy;
			myGrid.loadvalue(processSharingPanel.grid.getStore(),
					collarbMain.args, collarbMain.baseargs);
		};
		requestPrivilege(callback);

	});

	collarbTabPanel.wanchengliang = new Ext.Panel({
				frame : false,
				boder : false,
				title : '完成量',
				layout : 'fit'
			});
	collarbTabPanel.wanchengliang.on("activate", function() {
		if (collarbTabPanel.wanchengliang_content == null) {
			collarbTabPanel.wanchengliang_content = Sch.ganttQuantityMain
					.init();
			collarbTabPanel.wanchengliang
					.add(collarbTabPanel.wanchengliang_content);
		}
		var callback = function() {
			var taskname = base.convertNodeId(leftNavigationTree.nodeId);
			var proxy = new Ext.data.HttpProxy({
						url : '../JSON/gantt_ganttRemote.getGanttList?nodeid='
								+ taskname
					});
			Sch.ganttQuantityMain.getDay(taskname);
			Sch.ganttQuantityMain.ganttGrid.getStore().proxy = proxy;
			myGrid.loadvalue(Sch.ganttQuantityMain.ganttGrid.getStore(),
					collarbMain.args, collarbMain.baseargs);
			var proxy1 = new Ext.data.HttpProxy({
				url : '../JSON/ganttRelation_GanttRelationRemote.getGantLines?nodeid='
						+ taskname
			});
			Sch.ganttQuantityMain.ganttGrid.dependencyStore.proxy = proxy1;
			myGrid.loadvalue(Sch.ganttQuantityMain.ganttGrid.dependencyStore,
					collarbMain.args, collarbMain.baseargs);
		};
		requestPrivilege(callback);
	});

	collarbTabPanel.gongshi = new Ext.Panel({
				frame : false,
				boder : false,
				title : '工时进度',
				layout : 'fit'
			});
	collarbTabPanel.gongshi.on("activate", function() {
		if (collarbTabPanel.gongshi_content == null) {
			collarbTabPanel.gongshi_content = Sch.actualmanhourMain.init();
			collarbTabPanel.gongshi.add(collarbTabPanel.gongshi_content);
		}
		var callback = function() {
			var taskname = base.convertNodeId(leftNavigationTree.nodeId);
			var proxy = new Ext.data.HttpProxy({
				url : '../JSON/gantt_ganttRemote.getActualmanHourGanttList?nodeid='
						+ taskname
			});
			Sch.actualmanhourMain.ganttGrid.getStore().proxy = proxy;
			myGrid.loadvalue(Sch.actualmanhourMain.ganttGrid.getStore(),
					collarbMain.args, collarbMain.baseargs);
		};
		requestPrivilege(callback);
	});

	collarbTabPanel.time = new Ext.Panel({
				frame : false,
				boder : false,
				title : '时间进度',
				layout : 'fit'
			});
	collarbTabPanel.time.on("activate", function() {
		if (collarbTabPanel.time_content == null) {
			collarbTabPanel.time_content = Sch.timeMain.init();
			collarbTabPanel.time.add(collarbTabPanel.time_content);
		}
		var callback = function() {
			var taskname = base.convertNodeId(leftNavigationTree.nodeId);
			var proxy = new Ext.data.HttpProxy({
						url : '../JSON/gantt_ganttRemote.getTimeGanttList?nodeid='
								+ taskname
					});
			Sch.timeMain.getDay(taskname);
			Sch.timeMain.ganttGrid.getStore().proxy = proxy;
			myGrid.loadvalue(Sch.timeMain.ganttGrid.getStore(),
					collarbMain.args, collarbMain.baseargs);
			var proxy1 = new Ext.data.HttpProxy({
				url : '../JSON/ganttRelation_GanttRelationRemote.getGantLines?nodeid='
						+ taskname
			});
			Sch.timeMain.ganttGrid.dependencyStore.proxy = proxy1;
			myGrid.loadvalue(Sch.timeMain.ganttGrid.dependencyStore,
					collarbMain.args, collarbMain.baseargs);
		};
		requestPrivilege(callback);

	});

	collarbTabPanel.participants = new Ext.Panel({
				title : '' + getResource('resourceParam732') + '',
				frame : false,
				boder : false,
				layout : 'fit',
				listeners : {
					'activate' : function() {
						if (collarbTabPanel.participants_content == null) {
							collarbTabPanel.participants_content = participants
									.init();
							collarbTabPanel.participants
									.add(collarbTabPanel.participants_content);
						}
						var callback = function() {
							participants.activate();
						};
						requestPrivilege(callback);
					}
				}
			});

	collarbTabPanel.examiners = new Ext.Panel({
		title : '人员统计',
		frame : false,
		boder : false,
		layout : 'fit',
		listeners : {
			'activate' : function() {
				if (collarbTabPanel.examiner_content == null) {
					collarbTabPanel.examiner_content = new examinerPanel();
					collarbTabPanel.examiners
							.add(collarbTabPanel.examiner_content.getGrid());
				}
				var callback = function() {
					if (!leftNavigationTree.node) {
						return;
					}
					var taskid = leftNavigationTree.node.attributes.id;
					if (taskid.indexOf('p') == 0 ) {
						taskid = "";
					} else if (taskid.indexOf('vp') == 0) {
						taskid = "";
					}
					var projectId = leftNavigationTree.node.attributes.projectId;
					collarbTabPanel.examiner_content.active(projectId, taskid);
				};
				requestPrivilege(callback);
			}
		}
	});

	collarbTabPanel.history = new Ext.Panel({
				// 历史记录
				title : '审批记录',
				frame : false,
				boder : false,
				layout : 'fit',
				listeners : {
					'activate' : function() {
						if (collarbTabPanel.history_content == null) {
							collarbTabPanel.history_content = historyMessage
									.init();
							collarbTabPanel.history
									.add(collarbTabPanel.history_content);
							collarbTabPanel.history.doLayout(false, true);
						}
						var callback = function() {
							var nodeId = leftNavigationTree.node.id;
							var dataType;
							if (nodeId.indexOf('c') == 0) {
								return;
							} else if (nodeId.indexOf('p') == 0) {
								nodeId = nodeId.substring(1, nodeId.length);
								dataType="ProjectDataType";
							} else if (leftNavigationTree.node.id.indexOf('vp') == 0) {
								nodeId = nodeId.substring(2, nodeId.length);
								dataType="ProjectDataType";
							} else {
								nodeId = nodeId;
								dataType="TaskDataType";
							}
							historyMessage.refresh(nodeId,dataType);

						};
						requestPrivilege(callback);
					}
				}
			});

	// TAB面板
	collarbTabPanel.tabPanel = new Ext.sysTabPanel({
				id : 'tabe',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				// layoutOnCardChange : true,
				deferredRender : true,
				enableTabScroll : true,
				hidden : false,
				items : [collarbTabPanel.attributePanel,
						collarbTabPanel.dataPanel,
						collarbTabPanel.relationPanel,
						collarbTabPanel.wbsPanel, collarbTabPanel.t8,
						collarbTabPanel.wanchengliang, collarbTabPanel.gongshi,
						collarbTabPanel.time, collarbTabPanel.feedbackPanel,
						collarbTabPanel.tasklgoPanel,
						// collarbTabPanel.participants,
						collarbTabPanel.examiners, collarbTabPanel.history]
			});
	return collarbTabPanel.tabPanel;
}
