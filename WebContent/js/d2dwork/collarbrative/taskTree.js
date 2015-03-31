var collarbTaskTree = {};

collarbTaskTree.init = function() {
	if (collarbMain.leafName != null) {
		// tabpanel的按钮是否可选
		collarbTabpanel.addsame.disable();
		collarbTabpanel.addsub.enable();
	} else {
		// tabpanel的按钮是否可选
		collarbTabpanel.addsame.disable();
		collarbTabpanel.addsub.disable();
	}
	collarbTaskTree.nodeId = 0;// 默认选中根节点
	collarbTaskTree.tag = new Ext.tree.TreePanel({
				split : true,
				// rootVisible : false,
				autoScroll : true,
				animate : true,
				autoScroll : true,
				autoHeight : true,
				split : true,
				border : false,
				margins : '0 5 0 5',
				loader : new Ext.tree.TreeLoader({
							preloadChildren : false,
							baseAtts : new Ext.tree.AsyncTreeNode({
										draggable : false
									}),
							// collarbTaskTree.projectId在点击project树时确定
							dataUrl : '../JSON/project_ProjectRemote.getTaskTree?name='
									+ collarbMain.leafId
									+ '&a='
									+ new Date().getTime()
						}),
				lines : true,
				enableDD : false,
				draggable : false,
				autoScroll : true
			});

	// add a tree sorter in folder mode
	new Ext.tree.TreeSorter(collarbTaskTree.tag, {
				folderSort : false,
				property : 'attributes'
			});

	collarbTaskTree.root = new Ext.tree.AsyncTreeNode({
		draggable : false,
		text : collarbMain.leafName,
		id : '0',
		iconCls : collarbMain.projectIconCls
			// 在任务流程信息中使用
		});
	collarbTaskTree.tag.setRootNode(collarbTaskTree.root);
	collarbTaskTree.tag.on('beforeload', function(node) {
			});
	collarbTaskTree.tag.on('beforechildrenrendered', function(node) {
			});

	function setTaskForm(obj) {

		collarbCenter.form.getForm().findField('tname').setValue(obj.tname);
		collarbCenter.form.getForm().findField('ttype').setValue(obj.ttype);
		collarbCenter.form.getForm().findField('tdepart').setValue(obj.tdepart);
		collarbCenter.form.getForm().findField('tuser').setValue(obj.tuser);
		// collarbCenter.form.getForm().findField('tcomplete')
		// .setValue(obj.tcomplete);
		Ext.getCmp('progressbar').updateProgress(obj.tcomplete / 100,
				''+getResource('resourceParam1031')+'' + obj.tcomplete + '%');
		collarbCenter.form.getForm().findField('tstatus').setValue(obj.tstatus);
		collarbCenter.form.getForm().findField('tstart').setValue(obj.tstart);
		collarbCenter.form.getForm().findField('tend').setValue(obj.tend);
		collarbCenter.form.getForm().findField('trealstart')
				.setValue(obj.trealstart);
		collarbCenter.form.getForm().findField('trealend')
				.setValue(obj.trealend);
		collarbCenter.form.getForm().findField('tdesc').setValue(obj.tdesc);
		collarbCenter.form.getForm().findField('vissue').setValue(obj.vissue);
		collarbCenter.form.getForm().findField('vlandmark')
				.setValue(obj.vlandmark);

	}
	var sm = collarbTaskTree.tag.getSelectionModel();
	sm.on('beforeselect', function(sm, currentNode, formerNode) {
			});

	sm.on('selectionchange', function(sm, node) {
				if (node != null) {
					if (node.id != 0) {
						Ext.getCmp('copyTask').enable();
						Ext.getCmp('cutTask').enable();
						var currentNode = collarbTabpanel.tasktree
									.getNodeById(collarbTaskTree.nodeId);
						if (collarbTaskTree.pasteType == 'cut') {
							// 剪切的不能贴在其子节点上
							if (collarbTaskTree.cutTaskId != null) {
								var copiedNode = collarbTabpanel.tasktree
										.getNodeById(collarbTaskTree.cutTaskId);
								if (copiedNode != null) {
									if (copiedNode.contains(currentNode)) {
										Ext.getCmp('pasteTask').disable();
									} else if (!copiedNode
											.contains(currentNode)) {
										Ext.getCmp('pasteTask').enable();
									} else if (copiedNode.id == currentNode.id) {
										Ext.getCmp('pasteTask').disable();
									}
								}
							}
						}
						if (collarbTaskTree.pasteType == 'copy') {
							// 拷贝的不能贴在其子节点上
							if (collarbTaskTree.copyTaskId != null) {
								var copiedNode = collarbTabpanel.tasktree
										.getNodeById(collarbTaskTree.copyTaskId);
								if (copiedNode != null) {
									if (copiedNode.contains(currentNode)) {
										Ext.getCmp('pasteTask').disable();
									} else if (!copiedNode
											.contains(currentNode)) {
										Ext.getCmp('pasteTask').enable();
									} else if (copiedNode.id == currentNode.id) {
										Ext.getCmp('pasteTask').disable();
									}
								}		
							}
							var currentNode = collarbTabpanel.tasktree
									.getNodeById(collarbTaskTree.nodeId);
						}

					} else if (node.id == 0) {
						Ext.getCmp('copyTask').disable();
						Ext.getCmp('cutTask').disable();
						if (collarbTaskTree.pasteType != null) {
							Ext.getCmp('pasteTask').enable();
						}

					}
					Ext.Ajax.request({
								url : "../JSON/task_TaskRemote.getTaskInfo",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									setTaskForm(obj);
									// if(obj.ttype!="已完成"&&obj.ttype!="已终止"&&obj.ttype!="审批中"){
									// Ext.getCmp('pasteTask').enable();
									// }

								},
								disableCaching : true,
								autoAbort : true,
								params : {
									node : collarbTaskTree.nodeId
								}
							});
				}
			});
	collarbTaskTree.tag.on('click', function(node) {
				// 显示task tab属性
				collarbCenter.etabpanel.setVisible(true);
				// 在tabpanel点击新建才会给taskcardframe赋值，如果没有创建则不存在
				if (collarbTabpanel.taskCardFrame != null) {
					// 如果存在则隐藏
					collarbTabpanel.taskCardFrame.setVisible(false);
				}
				if (node.id != 0) {// 非根节点
					// tabpanel的按钮是否可选
					collarbTabpanel.addsame.enable();
					collarbTabpanel.addsub.enable();
					Ext.getCmp('taskdelete').enable();

					collarbTaskTree.nodeId = node.id;
					if (node.nextSibling != null) {
						collarbTaskTree.nextNode = node.nextSibling.id;// 下一个节点id
					}
					if (node.previousSibling != null) {
						collarbTaskTree.previousNode = node.previousSibling.id;// 上一个节点id
					}

					collarbCenter.etabpanel.setActiveTab(0);// 显示任务属性页面

					if (Ext.get("coopProjectCenterPanel") != undefined) {
						taskColumnTree.init(node, collarbMain.leafId,
								"coopProjectCenterPanel");
					}
				} else {
					collarbTaskTree.nodeId = 0;// 点击了根节点
					// tabpanel的按钮是否可选
					collarbTabpanel.addsame.disable();
					collarbTabpanel.addsub.enable();
					Ext.getCmp('taskdelete').disable();
				}
			});

	return collarbTaskTree.tag;
}
