Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
var button = null;
var collarbMain = {
	tpye : "1",
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	test : true,
	projectStatsId:[1,4]//默认选中的项目过滤状态
};
collarbMain.init = function() {

	// 左边面板刷新按钮调用函数
	collarbMain.refresh = function(para,deleteBuffer) {
		var node=leftNavigationTree.node;
		if(node==null){
			node=collarbMain.leftTree.getRootNode();
		}
		if(deleteBuffer){
			/*
			 * 手动点击刷新时，清空当前节点的缓存
			 */
			collarbMain.deleteCachedPrivilege(node);
		}
		var nodeId=''+node.id;
		if (nodeId.indexOf('v') == 0){
			//如果是关联节点 ，不刷新
			return;
		}
		if (para) {
			Ext.get('refreshProject').hide();
		}
		Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.refreshTreeNode",
					method : 'GET',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							Ext.get('refreshProject').fadeIn({
										duration : 2
									},this,{single:true});
							if (para) {
								if(node.attributes.leaf==true){
								    //没有子节点时的刷新
									collarbMain.leftTree.getLoader().load(node);
									node.expand();
								}else if (!node.isExpanded()) {
									node.expand();
								} else{
									collarbMain.leftTree.getLoader().load(node);
									node.expand();
								}
							}
						} else {
							Ext.get('refreshProject').fadeIn({
								duration : 2
							},this,{single:true});
						}
						updateTreeNode(node, obj);
						collarbMain.leftTree.fireEvent('beforeclick', node);// 点击该node
						collarbMain.leftTree.fireEvent('click', node,
								Ext.EventObject.ctrlKey);// 点击该node
					},
					params : {
						node : nodeId
						// 选中的节点
					}
				});
	};
	
	/*
	 * 删除控制页面按钮的缓存 
	 * 以用于更新控制页面按钮
	 * 
	 * 删除 修改时，更新所有父节点
	 * 提交审批、置通过、完成时，终止、重启，更新所有子节点
	 * 
	 * type ：
	 */
	collarbMain.deleteCachedPrivilege = function(node, type) {
		if(type&&type=='up'){
			//更新所有父节点
			var parent=node.parentNode;
			if(parent){
				collarbMain.deleteCachedPrivilege(parent,type);
			}
		}else if(type&&type=='down'){
			//更新所有子节点
			var childNodes = node.childNodes;
			for ( var p in childNodes) {
				var childNode = childNodes[p];
				collarbMain.deleteCachedPrivilege(childNode,type);
			}
		}
		var nodeId = node.id;
		if (buffer.hasOwnProperty(nodeId)) {
			delete buffer[nodeId];
		}
	};
	
	
	

	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';
	Ext.form.Field.prototype.labelSeparator = ':';
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.Ajax.timeout = 900000;

	// 初始化左边面板的树结构
	collarbMain.leftTree = leftNavigationTree.init("coop");
	 collarbMain.leftTree.selModel = new Ext.tree.MultiSelectionModel( {
		 /*
		  * 加入getSelectedNode以适应以前只能单选的model
		  */
		getSelectedNode : function() {
			var array = this.getSelectedNodes();
			var len = array.length;
			var node = array[len - 1];
			return node;
		}
	});
	collarbMain.tabPanel = collarbTabPanel.init();
	var config = {
		createByTemplateCallBack : collarbMain.refresh
	};
	collarbMain.createPanel = collarbCreatePanel.init(config);
	collarbMain.privilegeSet = null;// 权限设置面板
	collarbMain.columnTree = null;
	// collarbMain.approveFlowPanel = approveFlowInfo.init();
	// collarbMain.myApproveTask = myApproveTaskPanel.init();
	collarbMain.approvePanel = null// 审批面板
	collarbMain.project = null;// 新建项目面板
	collarbMain.task = null;// 新建任务面板
	collarbMain.updateProject = null; // 修改项目面板
	collarbMain.updateTask = null; // 修改任务面板
	
	var creatSubTask = function(){
		collarbMain.kind = 'sub';
		// 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
		Ext.Ajax.request({
			url : "../JSON/task_TaskRemote.getTaskTimeScale",
			method : 'GET',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					if (collarbMain.task == null) {
						collarbMain.task = TaskCardFrame
								.init(collarbMain.createTaskCallBack);
						collarbCreatePanel.createTask.add(collarbMain.task);
					} else {
						collarbCreatePanel.createTask
								.remove(collarbMain.task);
						collarbMain.task = TaskCardFrame
								.init(collarbMain.createTaskCallBack);
						collarbCreatePanel.createTask.add(collarbMain.task);
					}

					TaskBasicForm.projectId = leftNavigationTree.node.attributes.projectId;
					// 扩展页面参数
					TaskExtendForm.kind = collarbMain.kind;
					TaskExtendForm.nodeId = leftNavigationTree.nodeId;
					collarbMain.cardPanel.getLayout().setActiveItem(1);
					collarbCreatePanel.cardPanel.getLayout()
							.setActiveItem(1);
					collarbCreatePanel.cardPanel.doLayout();

					TaskCardFrame.basicForm.setTitle(''
							+ getResource('resourceParam1192') + '');
					TaskCardFrame.card.layout.setActiveItem(0);
					TaskCardFrame.basicForm.getForm().reset();
					var currentNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					currentNode.expand();
					var config={
							timeExtend:collarbMain.timeExtend,
							chargedExtend:collarbMain.chargedExtend
					};
					TaskBasicForm.constrain(obj,config);
				} else {
					Ext.MessageBox.show({
								title : '提示',
								msg : obj.message,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
				}
				collarbMain.centerPanel.doLayout();
			},
			params : {
				node : leftNavigationTree.nodeId,
				method : collarbMain.kind
				// 同级任务，或子任务
			}
		});
    };
	
    
	var create_menu=new Ext.menu.Menu({
		style : {
			overflow : 'visible' 
		},
		items : [ 
        // 新建按钮下拉菜单--创建项目
		{
				id : 'createProjectByManual',
				text : '' + getResource('resourceParam1549') + '',
				disabled : true,
				iconCls: 'icon-planningProject',
				handler : function() {
			if (collarbMain.project == null) {
				collarbMain.project = collarbCardFrame.init();
				collarbCreatePanel.createProject
						.add(collarbMain.project);
			} else {
				collarbCreatePanel.createProject
						.remove(collarbMain.project);
				collarbMain.project = collarbCardFrame.init();
				collarbCreatePanel.createProject
						.add(collarbMain.project);
			}
			collarbMain.cardPanel.getLayout().setActiveItem(1);
			collarbCreatePanel.cardPanel.getLayout().setActiveItem(0);
			collarbCreatePanel.cardPanel.doLayout();
			var currentNode = collarbMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			currentNode.expand();
				}
			},
			// 新建按钮下拉菜单--创建同级任务
			{
				id : 'createSameLevelTask',
				text : '' + getResource('resourceParam1188') + '',
				iconCls : 'icon-createTask',
				disabled : true,
				handler : function() {
					collarbMain.kind = 'same';
					// 任务的时间限制，任务时间限制在父project计划时间内，或父任务时间内
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.getTaskTimeScale",
						method : 'GET',
						success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
							if (obj.success == true) {
								if (collarbMain.task == null) {
									collarbMain.task = TaskCardFrame
											.init(collarbMain.createTaskCallBack);
									collarbCreatePanel.createTask.add(collarbMain.task);
								} else {
									collarbCreatePanel.createTask
											.remove(collarbMain.task);
									collarbMain.task = TaskCardFrame
											.init(collarbMain.createTaskCallBack);
									collarbCreatePanel.createTask.add(collarbMain.task);
								}
								TaskBasicForm.projectId = leftNavigationTree.node.attributes.projectId;
								// 扩展页面参数
								TaskExtendForm.kind = collarbMain.kind;
								TaskExtendForm.nodeId = leftNavigationTree.nodeId;
								collarbMain.cardPanel.getLayout().setActiveItem(1);
								collarbCreatePanel.cardPanel.getLayout()
										.setActiveItem(1);
								collarbCreatePanel.cardPanel.doLayout();

								TaskCardFrame.basicForm.setTitle(''
										+ getResource('resourceParam1189') + '');
								TaskCardFrame.card.layout.setActiveItem(0);
								TaskCardFrame.basicForm.getForm().reset();
								var config={
										timeExtend:collarbMain.timeExtend,
										chargedExtend:collarbMain.chargedExtend
								};
								TaskBasicForm.constrain(obj,config);
							} else {
								Ext.MessageBox.show({
											title : '提示',
											msg : obj.message,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
							}
							collarbMain.centerPanel.doLayout();

						},
						params : {
							node : leftNavigationTree.nodeId,
							method : collarbMain.kind
							// 同级任务，或子任务

						}
					});

				}
			},
			// 新建按钮下拉菜单--创建子任务
			{
				id : 'createSubLevelTask',
				text : '' + getResource('resourceParam1191') + '',
				iconCls : 'icon-createSubTask',
				disabled : true,
				handler : creatSubTask
			},
			// 新建按钮下拉菜单--创建项目夹
			{
				id : 'createProjectFolder',
				disabled : true,
				iconCls : 'new-icon-projectCategory',
				text : '' + getResource('resourceParam1546') + '',
				handler : function() {
					collarbMain.projectFolder = ProjectFolderForm.init(collarbMain.addFolderCallBack);
					collarbCreatePanel.createProjectFolder
							.add(collarbMain.projectFolder);
					collarbMain.cardPanel.getLayout().setActiveItem(1);
					collarbCreatePanel.cardPanel.getLayout().setActiveItem(5);
					collarbCreatePanel.cardPanel.doLayout();
					var currentNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					currentNode.expand();
					collarbMain.centerPanel.doLayout();
				}
			},
			// 新建按钮下拉菜单--从任务流程模板创建
			{
				id : 'createByWBSTemplate',
				hidden : true,
				text : '' + getResource('resourceParam9162') + '',
				handler : function() {
					applyTemplateMain.load();
					// 模板创建的任务的目标Id
					applyTemplateMain.targetId = leftNavigationTree.nodeId;
					collarbMain.cardPanel.getLayout().setActiveItem(1);
					collarbCreatePanel.cardPanel.getLayout().setActiveItem(8);
					collarbCreatePanel.cardPanel.doLayout();
					collarbMain.centerPanel.doLayout();
				}
			},
			// 新建按钮下拉菜单--创建审批任务
			{
				id : 'createApproveTask',
				hidden : true,
				iconCls: 'icon-Prepare_the_approval',
				text : '' + getResource('resourceParam9163') + '',
				handler : function() {
					collarbMain.kind = 'sub';
					// 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
					Ext.Ajax.request({
								url : "../JSON/task_TaskRemote.getTaskTimeScale",
								method : 'GET',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									var successCallback = function(obj) {
										collarbMain.refresh(true);
									}
									if (obj.success == true) {
										if (collarbMain.updateApproveTask) {
											collarbCreatePanel.updateApproveTask
													.remove(collarbMain.updateApproveTask);
											collarbMain.updateApproveTask = null;
										}
										if (collarbMain.approveTask == null) {
											collarbMain.approveTask = createApproveTask
													.init(null,
															leftNavigationTree.nodeId,
															"TaskDataType",
															canelApproveTask, '',
															successCallback);
											collarbCreatePanel.createApproveTask
													.add(collarbMain.approveTask);
										} else {
											collarbCreatePanel.createApproveTask
													.remove(collarbMain.approveTask);
											collarbMain.approveTask = createApproveTask
													.init(null,
															leftNavigationTree.nodeId,
															"TaskDataType",
															canelApproveTask, '',
															successCallback);
											collarbCreatePanel.createApproveTask
													.add(collarbMain.approveTask);
										}
										collarbMain.cardPanel.getLayout()
												.setActiveItem(1);
										collarbCreatePanel.cardPanel.getLayout()
												.setActiveItem(9);
										collarbCreatePanel.cardPanel.doLayout();

										var currentNode = collarbMain.leftTree
												.getNodeById(leftNavigationTree.nodeId);
										currentNode.expand();
										collarbMain.centerPanel.doLayout();

									} else {
										Ext.MessageBox.show({
													title : '提示',
													msg : obj.message,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
									}
								},
								params : {
									node : leftNavigationTree.nodeId,
									method : collarbMain.kind
									// 同级任务，或子任务
								}
							});
				}
			},
						{
							id : 'taskCreateRules',// 任务创建规则
							text : getResource('resourceParam9797'),// 任务创建规则
							menu : {
								items : [
										{
											xtype : 'menucheckitem',
											text : '<span ext:qtip="勾选该选项，在创建任务时可以继承<br/>父节点的计划开始和计划结束时间">继承父节点计划时间</span>',
											checkHandler : function() {
												collarbMain.timeExtend = this.checked;
											},
											stateId : 'timeExtend',
											stateful : true,
											hideOnClick : false,
											stateEvents : [ 'click' ],
											applyState : function(state) {
												this.checked = state.checked;
												collarbMain.timeExtend = this.checked;
											},
											getState : function() {
												return {
													checked : this.checked
												};
											}
										},
										{
											xtype : 'menucheckitem',
											text : '<span ext:qtip="勾选该选项，在创建任务时可以继承<br/>父节点的负责部门和负责人">继承父节点负责部门和负责人</span>',
											checkHandler : function() {
												collarbMain.chargedExtend = this.checked;
											},
											stateId : 'chargedExtend',
											stateful : true,
											hideOnClick : false,
											stateEvents : [ 'click' ],
											applyState : function(state) {
												this.checked = state.checked;
												collarbMain.chargedExtend = this.checked;
											},
											getState : function() {
												return {
													checked : this.checked
												};
											}
										}]
							},
							hideOnClick : false
						}]
	});

    //置通过
	var projectApprove = new Ext.Action({
		id : 'projectApprove',
		text : '' + getResource('resourceParam100') + '',
		disabled : true,
		handler : function() {
		/*
		 * 删除当前节点和所有子节点的控制页面按钮的缓存 以用于更新控制页面按钮
		 */
		    collarbMain.deleteCachedPrivilege(leftNavigationTree.node,'down');
		    
		    var node=leftNavigationTree.node;
		    var nodeId='';
		    var dataType=node.attributes.dataType;
		    if(dataType=='ProjectDataType'){
		    	nodeId=node.attributes.projectId;
			}else if(dataType=='TaskDataType'){
				nodeId=node.id;
			}
		    
		    var selModel=collarbMain.leftTree.selModel;
			var selectedNodes=selModel.getSelectedNodes();
			var length=selectedNodes.length;
			var info = "" + getResource('resourceParam1535') + "";
			if(length>1){
				info='批量置通过执行的时间可能较长，请耐心等候...';
				var nodes=[];
				for(var i=0;i<length;i++){
					if(dataType=='ProjectDataType'){
						nodes[i]=selectedNodes[i].attributes.projectId;
					}else if(dataType=='TaskDataType'){
						nodes[i]=selectedNodes[i].taskId;
					}
				}
				nodeId=nodes.join(',');
				delete nodes;
			}
			var approveMask = new Ext.LoadMask(document.body, {
						msg : getResource('resourceParam5042')
					});
			Ext.Msg.confirm('' + getResource('resourceParam575') + '', info,
					function(btn) {
						if (btn == 'yes') {
							approveMask.show();
							Ext.Ajax.request({
								url : "../JSON/project_ProjectRemote.approveOnPlanning",
								method : 'GET',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if(length>1){
										leftNavigationTree.node=node.parentNode;
									}
									collarbMain.refresh(true);
									if(obj.success==false){
										Ext.MessageBox.show({
											title : '提示',
											msg   : obj.message,
											width :310,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
									}else{
										Ext.example.msg('提示','操作成功！');
									}
									approveMask.hide();
								},
								failure : function(options, response) {
									approveMask.hide();
								},
								params : {
									dataType:dataType,
									node : nodeId
								}
							});
						}
					}).getDialog().setWidth(450);
		}
	});
	

	//置完成
	var projectApprove1 = new Ext.Action({
		id : 'projectApprove1',
		text : '' + getResource('resourceParam101') + '',
		disabled : true,
		handler : function() {
			var approveMask = new Ext.LoadMask(document.body, {
						msg : getResource('resourceParam5042')
					});
			
			var	info = getResource('resourceParam9161');
			
			Ext.Msg.confirm('' + getResource('resourceParam575') + '', info,
					function(btn) {
						if (btn == 'yes') {
							approveMask.show();
							/*
							 * 删除当前节点和所有子节点的控制页面按钮的缓存 
							 * 以用于更新控制页面按钮
							 */
							collarbMain.deleteCachedPrivilege(leftNavigationTree.node,'down');
							Ext.Ajax.request({
								url : "../JSON/project_ProjectRemote.approveOnWorking",
								method : 'GET',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										collarbMain.refresh(true);
									} else {
										collarbMain.refresh();
										Ext.MessageBox.show({
											title : '提示',
											msg : obj.message,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
									}
									approveMask.hide();
								},
								failure : function(options, response) {
									approveMask.hide();
								},
								params : {
									node : leftNavigationTree.nodeId
								}
							});
						}
					}).getDialog().setWidth(450);
		}
	});

	var projectVerify = new Ext.Action({
		id : 'projectVerify',
		text : '' + getResource('resourceParam1550') + '...',
		disabled : true,
		handler : function() {
			var contentNode = collarbMain.leftTree.getSelectionModel()
					.getSelectedNode();
			if (contentNode == null) {
				Ext.MessageBox.show({
							title : '' + getResource('resourceParam575') + '',
							msg : '' + getResource('resourceParam1167') + '',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
						});
				// 在点击文件夹节点的时候禁掉“权限菜单”
				return;
			}
			/*
			 * 删除当前节点和所有子节点的控制页面按钮的缓存 
			 * 以用于更新控制页面按钮
			 */
			collarbMain.deleteCachedPrivilege(leftNavigationTree.node,'down');
			approvePanel.status = contentNode.attributes.statusId;
			collarbMain.dataid = contentNode.id.indexOf("p") == 0
					? contentNode.id.substring(1)
					: contentNode.id;// 设置项目id
			collarbMain.datatype = contentNode.id.indexOf("p") == 0
					? 'ProjectDataType'
					: 'TaskDataType';// 设置类型，这里需要设置为常量

			collarbMain.cardPanel.remove(collarbMain.approvePanel, true);
			approvePanel.status = contentNode.attributes.statusId;
			approvePanel.securityDegree = contentNode.attributes.securityDegree;
			if (approvePanel.status == '1') {
				collarbMain.approvePanel = approvePanel.init(
						collarbMain.cardPanel, collarbMain.dataid,
						collarbMain.datatype, canelApproval, ''
								+ getResource('resourceParam1547') + '',
						collarbMain.refresh);
			} else if (approvePanel.status == '4') {
				collarbMain.approvePanel = approvePanel.init(
						collarbMain.cardPanel, collarbMain.dataid,
						collarbMain.datatype, canelApproval, ''
								+ getResource('resourceParam1548') + '',
						collarbMain.refresh);
			}
			collarbMain.cardPanel.getLayout().setActiveItem(2);
			if (leftNavigationTree.statusId == '4'
					&& leftNavigationTree.approval == 2) {
				Ext.Ajax.request({
					url : "../JSON/mytask_MyTaskRemote.getSuperLeader",
					method : 'GET',
					params : {
						taskid : leftNavigationTree.nodeId
					},
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						approvePanel.participantsGrid.getTopToolbar().disable();
						var approvalUserRecord = Ext.data.Record.create([{
									name : 'userid'
								}, {
									name : 'truename'
								}, {
									name : 'ginstitutename'
								}, {
									name : 'usertype'
								}]);
						var record = new approvalUserRecord({
									userid : obj.result.userid,
									truename : obj.result.truename,
									ginstitutename : obj.result.ginstitutename,
									usertype : ''
											+ getResource('resourceParam731')
											+ ''
								});
						var toDataStore = approvePanel.participantsGrid
								.getStore();
						toDataStore.add(record);
					}
				});
			}
			collarbMain.approvePanel.doLayout();
			function canelApproval() {
				collarbMain.cardPanel.getLayout().setActiveItem(0);
			}
		}
	});

	var examApprovalTab = new Ext.Action({
				id : 'examApprovalTab',
				text : '' + getResource('resourceParam1448') + '',
				disabled : true,
				/*
				 * by suny 2011-05-24
				 * 在下拉菜单中不显示审批记录
				 */
				hidden :true,
				handler : function() {
					var contentNode = collarbMain.leftTree.getSelectionModel()
							.getSelectedNode();
					if (contentNode == null) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam575')
											+ '',
									msg : '' + getResource('resourceParam1167')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
						// 在点击文件夹节点的时候禁掉“权限菜单”
						return;
					}
					collarbMain.dataid = contentNode.id.indexOf("p") == 0
							? contentNode.id.substring(1)
							: contentNode.id;// 设置项目id
					collarbMain.datatype = contentNode.id.indexOf("p") == 0
							? 'ProjectDataType'
							: 'TaskDataType';// 设置类型，这里需要设置为常量
					collarbMain.cardPanel
							.remove(collarbMain.approvePanel, true);
					// collarbMain.approvePanel = examApproval.getGrid(
					// collarbMain.cardPanel, collarbMain.dataid,
					// collarbMain.datatype);
					collarbMain.approvePanel = examApproval.getCommentGrid(
							collarbMain.cardPanel, collarbMain.dataid,
							collarbMain.datatype);
					collarbMain.cardPanel.getLayout().setActiveItem(2);
					collarbMain.approvePanel.doLayout();
					// approveFlowSteps.refreshGrid();
				}
			});
	
	
	
	var projectStatusStore = new Ext.data.SimpleStore( {
		fields : [ 'id', 'status' ],
		data : [ [ 1, '编制中' ],[ 11, '审批中' ], [ 4, '进行中' ], [ 5, '确认中' ],
					[ 6, '已完成' ], [ 7, '已终止' ], [ 9, '已暂停' ] ]
	});
	var projectStatus = new Ext.ux.form.LovCombo({
		width : 110,
		listWidth : 150,
		hideOnSelect : false,
		maxHeight : 200,
		store : projectStatusStore,
		triggerAction : 'all',
		valueField : 'id',
		displayField : 'status',
		mode : 'local',
		beforeBlur : Ext.emptyFn,
		selectAll : function() {
			var i = 0;
			this.store.each(function(record) {
				if (i !== 0) {
					record.set(this.checkField, true);
				}
				i++;
			}, this);
			this.setValue(this.getCheckedValue());
		}
	});
	var record = Ext.data.Record.create( [ {
		name : 'status'
	}, {
		name : 'id'
	} ]);
	var selectAll = new record( {
		status : getResource('resourceParam5029'),
		id : '-1'
	});
	var deSelectAll = new record( {
		status : '' + getResource('resourceParam808') + '',
		id : '-2'
	});
	
	projectStatus.on('render', function(combo) {
		var statusIds=collarbMain.projectStatsId;
		projectStatus.setValue(statusIds);
	});
	
	projectStatus.on('expand', function(combo) {
		var store = combo.getStore();
		var firstRecord = store.getAt(0);
		if (firstRecord.data.id == -1
				|| firstRecord.data.id == -2) {
			store.remove(firstRecord);
		}
		var checkSum = null;// 选中的总数
			if (combo.getCheckedValue() == '') {
				checkSum = 0;
			} else {
				checkSum = combo.getCheckedValue().split(
						',').length;
			}
			if (checkSum == store.getCount()) {
				// 已全部选中
			store.insert(0, deSelectAll);
		} else {
			store.insert(0, selectAll);
		}
	});
	
	
	projectStatus
			.on(
					'select',
					function(combo, record, index) {
						if (record.data.id == -1) {
							// click selectAll
							record.set('checked', false);
							combo.getStore().remove(record);
							combo.getStore().insert(0,
									deSelectAll);
							combo.selectAll();
							combo.getStore().getAt(0).set(
									'checked', false);
						} else if (record.data.id == -2) {
							// click deSelectAll
							combo.deselectAll();
							combo.getStore().remove(record);
							combo.getStore().insert(0,
									selectAll);
						} else {
							var checkSum = null;// 选中的总数
							if (combo.getCheckedValue() == '') {
								checkSum = 0;
							} else {
								checkSum = combo
										.getCheckedValue()
										.split(',').length;
								if (checkSum < (combo
										.getStore()
										.getCount() - 1)) {
									combo
											.getStore()
											.remove(
													combo
															.getStore()
															.getAt(
																	0));
									combo
											.getStore()
											.insert(0,
													selectAll);
								}
								if (checkSum == (combo
										.getStore()
										.getCount() - 1)) {
									combo
											.getStore()
											.remove(
													combo
															.getStore()
															.getAt(
																	0));
									combo
											.getStore()
											.insert(0,
													deSelectAll);
								}
							}
						}
					});
	projectStatus
			.on(
					'blur',
					function() {
						var temp = projectStatus.getValue();
						var str = '';
						var params = "";
						if (temp.length != 0) {
							params = temp + ',';
						} else {
							projectStatus
									.setRawValue(""
											+ getResource('resourceParam1474')
											+ "");
						}
						/*
						 * blur时，给项目树传值
						 */
						var loader=collarbMain.leftTree.getLoader();
						loader.on('beforeload',function(loader,node,callback){
							/*
							 * 勾选下拉后，重新从第一页开始，
							 * 并且传入状态过滤id
							 */
							Ext.apply(loader.baseParams, {
								statusFilter : temp,
								start:0,
								limit:leftNavigationTree.pageSize
							});
						},this, {
							single : true
						});
						var node=leftNavigationTree.node;
						if(node==null){
							node=collarbMain.leftTree.getRootNode();
						}
						
						if(node.attributes.leaf==true){
						    //没有子节点时的刷新
							loader.load(node);
							node.expand();
						}else if (!node.isExpanded()) {
							node.expand();
						} else{
							loader.load(node);
							node.expand();
						}
					});
	
	
	
	// 主面板 的 左侧面板
	collarbMain.westPanel = new Ext.Panel({
		region : 'west',
		width : 200,
		/*
		 * 设置左侧树的最小宽度，
		 * 如果更小projectStatus展示会有问题
		 */
		minWidth:200,
		height : 800,
		boder : false,
		tbar:[{text:'项目状态:',xtype:'tbtext'},projectStatus],
		autoScroll : true,
		collapsible : true,
		split : true,
		layout : 'fit',
		title : ""
				+ getResource('resourceParam724')
				+ "<span id='refreshProject' style='padding-left:5px;'><a  href='javascript:void(0);'  onClick='collarbMain.refresh(true,true)' ><img ext:qtip=''+getResource('resourceParam1081')+'' src='../images/refresh.gif' style='width:12px;heigth:12px;paddin-left:40px'/></a></span>",
		items : [collarbMain.leftTree]
	});
	
	
	
	

	collarbMain.cardPanel = new Ext.Panel({
				id : 'collarbMain_cardPanel',
				frame : false,
				boder : false,
				hideBorders:true,
				layout : 'card',
				items : [collarbMain.tabPanel, collarbMain.createPanel],
				activeItem : 0
			});

	// 主面板 的 中间面板
	collarbMain.centerPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				hideBorders:true,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [collarbMain.cardPanel]

			});

	collarbMain.tbar = new Ext.Toolbar({
		items : [{
			text : '数据权限测试',
			hidden : collarbMain.test,
			handler : function() {
				var mask = new Ext.LoadMask(document.body, {
							msg : '正在操作，请稍候...'
						});
				mask.show();
				Ext.Ajax.request({
							url : "../JSON/task_TaskRemote.testDataPrivilege",
							method : 'GET',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								mask.hide();
								Ext.example.msg(obj.success, obj.message);
							},
							failure : function(response, options) {
								mask.hide();
							},
							params : {
								node : leftNavigationTree.nodeId
							}
						});
			}
		}, '-',

		{
			id : 'create',
			text : '' + getResource('resourceParam483') + '',
			disabled : true,
			menu : create_menu
		}, new Ext.Toolbar.Separator({
					id : 's_create'
				}), {
			id : 'update',
			text : '' + getResource('resourceParam478') + '',
			tooltip : '',
			disabled : true,
			handler : function() {
			/*
			 * 删除当前节点和所有父节点的控制页面按钮的缓存 
			 * 以用于更新控制页面按钮
			 * TODO 后期优化，只编制中修改负责人时，清除按钮缓存
			 */
			 collarbMain.deleteCachedPrivilege(leftNavigationTree.node,'up');
				if (leftNavigationTree.nodeId.indexOf('c') == 0) {
					updateContent();
				} else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
					// 修改项目
					updateProject();
				} else {
					var node = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					var nt = node.attributes.nt;
					if (nt == 0 || nt == '0') {
						// 更新普通任务
						updateTask();
					} else if (nt == 1 || nt == '1') {
						// 更新审批任务
						updateApproveTask();
					}
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_update'
				}), {
			id : 'delete',
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'icon-deleteTask',
			tooltip : '',
			disabled : true,
			handler : function() {
			/*
			 * 删除任务时，更新所有父节点
			 * （TODO 后期优化，只删除了没有负责人的项目或者任务需要清除按钮缓存）
			 * 
			 */
			    var node=leftNavigationTree.node;
			    collarbMain.deleteCachedPrivilege(node,'up');
				if (leftNavigationTree.nodeId.indexOf('c') == 0) {
					deleteFolder();
				} else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
					deleteProject();
				} else if (leftNavigationTree.nodeId.indexOf('v') == 0) {
					deleteVirtualRelation();
				} else {
					deleteTask();
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_delete'
				}), {
			id : 'terminate',
			text : '' + getResource('resourceParam1170') + '',
			tooltip : '',
			disabled : true,
			handler : function() {
			
			    var node=leftNavigationTree.node;
			    var nodeId=node.id;
				if (nodeId.indexOf('c') == 0) {

				} else if (nodeId.indexOf('p') == 0) {
					/*
					 * 删除当前节点和所有子节点的控制页面按钮的缓存 
					 * 以用于更新控制页面按钮
					 */
					collarbMain.deleteCachedPrivilege(node,'down');
					terminateProject();
				} else {
					/*
					 * 删除当前节点和所有子节点的控制页面按钮的缓存 
					 * 以用于更新控制页面按钮
					 */
					collarbMain.deleteCachedPrivilege(node,'down');
					terminateTask();
				}
			}

		}, new Ext.Toolbar.Separator({
					id : 's_terminate'
				}), {
			id : 'restart',
			text : '' + getResource('resourceParam9109') + '',
			disabled : true,
			tooltip : '',
			handler : function() {
				var restartMask = new Ext.LoadMask(document.body, {
					msg : getResource('resourceParam9157')
				});
				if(leftNavigationTree.node.attributes.auto==1){
					Ext.MessageBox.show({
						title : '提示',
						msg : '自动任务不允许重启！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					return;
				}
				Ext.Msg.confirm('' + getResource('resourceParam575') + '', "" + getResource('resourceParam9158') + "?", function(btn) {
					if (btn == 'yes') {
						restartMask.show();
						/*
						 * 删除当前节点和所有子节点的控制页面按钮的缓存 
						 * 以用于更新控制页面按钮
						 */
						collarbMain.deleteCachedPrivilege(leftNavigationTree.node,'down');
						Ext.Ajax.request({
							url : "../JSON/task_TaskRemote.restartTask",
							method : 'GET',
							success : function(response, options) {
								var obj = Ext.util.JSON.decode(response.responseText);
								if (obj.success == true) {
//									var node = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
//									var parentNode = node.parentNode;
//									collarbMain.leftTree.fireEvent('beforeclick', node);// 刷新当前节点
//									collarbMain.leftTree.fireEvent('click', node, Ext.EventObject.ctrlKey);// 刷新当前节点
//									if (!parentNode.isExpanded()) {
//										parentNode.expand();
//									}
									/*
									 * edit by suny
									 * 在collarbMain.refresh已经执行了以上操作，
									 * 并且刷新了当前选中结点的样式
									 * 
									 */
									collarbMain.refresh(true);
								} else {
									if(obj.forEach) {
										Ext.Msg.confirm('' + getResource('resourceParam575') + '', obj.error, function(btn) {
											if (btn == 'yes') {
												restartMask.show();
												Ext.Ajax.request({
													url : "../JSON/task_TaskRemote.restartCurTask",
													method : 'GET',success : 
													function(response, options) {
														var obj = Ext.util.JSON.decode(response.responseText);
														if (obj.success == true) {
															var node = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
															var parentNode = node.parentNode;
															collarbMain.leftTree.fireEvent('beforeclick', node);// 刷新当前节点
															collarbMain.leftTree.fireEvent('click', node, Ext.EventObject.ctrlKey);// 刷新当前节点
															if (!parentNode.isExpanded()) {
																parentNode.expand();
															}
															restartMask.hide();
														} else {
															collarbMain.refresh();
															Ext.MessageBox.show({
																title : '提示',
																msg : obj.error,
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.INFO
															});
														}
														restartMask.hide();
													},
													failure : function(options, response) {
														restartMask.hide();
													},
													params : {
														node : leftNavigationTree.nodeId
													}
												});
											} else {
												collarbMain.refresh();
											}
										});
									} else {
										collarbMain.refresh();
										Ext.MessageBox.show({
											title : '提示',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
									}
								}
								restartMask.hide();
	
							},
							failure : function(options, response) {
								restartMask.hide();
							},
							params : {
								node : leftNavigationTree.nodeId
							}
						});
					}
				});
			}
		}, new Ext.Toolbar.Separator({
			id : 's_restart'
		}), {
			id : 'approve',
			text : '' + getResource('resourceParam1045') + '',
			disabled : true,
			menu : [projectApprove,projectApprove1, projectVerify, examApprovalTab]
		}, new Ext.Toolbar.Separator({
					id : 's_approve'
				}), {
			id : 'privilege',
			text : '' + getResource('resourceParam582') + '',
			disabled : true,
			tooltip : '',
			handler : function() {
				// 获取树上的选择节点
				var currentNode = collarbMain.leftTree.getSelectionModel()
						.getSelectedNode();
				if (currentNode == null) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1541')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
					// 在点击文件夹节点的时候禁掉“权限菜单”
					return;
				}

				// 判断选择的是项目还是任务
				if (currentNode.id == '0') {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1542')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
					return;
				} else if (currentNode.id.indexOf('c') == 0) {// 项目夹
					collarbMain.dataId = currentNode.id.substring(1);// 设置项目夹id
					collarbMain.dataType = 'ContentDataType';// 设置项目类型，这里需要设置为常量
				} else if (currentNode.id.indexOf('p') == 0) {// 项目
					collarbMain.dataId = currentNode.id.substring(1);// 设置项目id
					collarbMain.dataType = 'ProjectDataType';// 设置项目类型，这里需要设置为常量
				} else {// 任务
					collarbMain.dataId = currentNode.id;// 设置任务id
					collarbMain.dataType = 'TaskDataType';// 设置任务类型，这里需要设置为常量
				}

				if (collarbMain.privilegeSet == null) {// 初始化界面
					collarbMain.privilegeSet = setDataPrivilege.init({
								'dataId' : base
										.convertNodeId(collarbMain.dataId),
								'dataType' : collarbMain.dataType
							});
					collarbCreatePanel.createDataprivilege
							.add(collarbMain.privilegeSet);
					// collarbCreatePanel.createDataprivilege.doLayout();
				} else {
					collarbMain.privilegeSet.dataId = base
							.convertNodeId(collarbMain.dataId);
					collarbMain.privilegeSet.dataType = collarbMain.dataType;
				}
				collarbMain.privilegeSet.refresh();// 刷新权限页面

				collarbMain.cardPanel.getLayout().setActiveItem(1);
				collarbCreatePanel.cardPanel.getLayout().setActiveItem(2);
				collarbCreatePanel.cardPanel.doLayout();
			}
		}, new Ext.Toolbar.Separator({
					id : 's_privilege'
				}), {
			id : 'copyTask',
			text : '' + getResource('resourceParam485') + '',
			disabled : true,
			tooltip : '',
			handler : function() {
				var nodeId = leftNavigationTree.nodeId;
				if (nodeId.indexOf("p") == 0) {
					// 项目
					collarbMain.pasteCate = 'project';
					collarbMain.copyProjectId = leftNavigationTree.nodeId;
					collarbMain.copyProjectNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					collarbMain.pasteType = 'copy';
					Ext.getCmp('pasteTask').disable();
				} else if (nodeId.indexOf("vp") == 0) {
					// 虚拟项目
					collarbMain.pasteCate = '';
					alert(getResource('resourceParam5037'));
				} else {
					// 任务复制
					collarbMain.pasteCate = 'task';
					collarbMain.copyTaskId = leftNavigationTree.nodeId;
					collarbMain.copyTaskNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					collarbMain.pasteType = 'copy';
					Ext.getCmp('pasteTask').disable();
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_copyTask'
				}), {
			id : 'cutTask',
			text : '' + getResource('resourceParam486') + '',
			disabled : true,
			tooltip : '',
			handler : function() {
				var nodeId = leftNavigationTree.nodeId;
				if (nodeId.indexOf("p") == 0) {
					// 项目
					collarbMain.pasteCate = 'project';
					collarbMain.cutProjectId = leftNavigationTree.nodeId;
					collarbMain.cutProjectNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					collarbMain.pasteType = 'cut';
					Ext.getCmp('pasteTask').disable();
					// cut时维护节点pre nex
					var currentNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					var previousNode = currentNode.previousSibling;
					var nextNode = currentNode.nextSibling;
					// 维护节点的pre和 nex
					if (previousNode != null) {
						previousNode.attributes.nex = currentNode.attributes.nex;
					}
					if (nextNode != null) {
						nextNode.attributes.pre = currentNode.attributes.pre;
					}

				} else if (nodeId.indexOf("vp") == 0) {
					// 虚拟项目
					collarbMain.pasteCate = '';
					alert(getResource('resourceParam5038'));
				} else {
					// 任务剪切
					collarbMain.pasteCate = 'task';
					collarbMain.cutTaskId = leftNavigationTree.nodeId;
					collarbMain.cutTaskNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					collarbMain.pasteType = 'cut';
					Ext.getCmp('pasteTask').disable();
					// cut时维护节点pre nex
					var currentNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					var previousNode = currentNode.previousSibling;
					var nextNode = currentNode.nextSibling;
					// 维护节点的pre和 nex
					if (previousNode != null) {
						previousNode.attributes.nex = currentNode.attributes.nex;
					}
					if (nextNode != null) {
						nextNode.attributes.pre = currentNode.attributes.pre;
					}
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_cutTask'
				}), {
			id : 'pasteTask',
			iconCls : 'icon-pasteTask',
			text : '' + getResource('resourceParam487') + '',
			disabled : true,
			tooltip : '',
			handler : function() {
				if (collarbMain.pasteCate == 'project') {
					// 项目
					var pasteMask = new Ext.LoadMask(document.body, {
								msg : '' + getResource('resourceParam1539')
										+ ''
							});
					Ext.Msg.confirm('' + getResource('resourceParam575') + '', 
							"<br>" + getResource('resourceParam5039') + "</br>", function(btn) {
								if (btn == 'yes') {
									pasteMask.show();
									Ext.Ajax.request({
										url : "../JSON/project_ProjectRemote.paste_Project",
										method : 'GET',
										success : function(response, options) {

											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												if (collarbMain.pasteType == 'cut') {
													Ext.getCmp('pasteTask')
															.disable();
													if (leftNavigationTree.nodeId
															.indexOf('c') == 0) {
														leftNavigationTree.nodeId = 0;
														collarbMain
																.refresh(true);
													} else {
														leftNavigationTree.nodeId = 0;
														collarbMain
																.refresh(true);
													}

												} else if (collarbMain.pasteType == 'copy') {
													if (leftNavigationTree.nodeId
															.indexOf('c') == 0) {
														leftNavigationTree.nodeId = 0;
														collarbMain
																.refresh(true);
													} else {
														leftNavigationTree.nodeId = 0;
														collarbMain
																.refresh(true);

													}

												}

											} else {
												collarbMain.refresh();
												Ext.MessageBox.show({
													title : '提示',
													msg : obj.message,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
											}
											pasteMask.hide();
										},
										failure : function(options, response) {
											pasteMask.hide();
										},
										params : {
											node : leftNavigationTree.nodeId,// 当前选中的节点
											copyProjectId : collarbMain.copyProjectId,// 
											// id
											cutProjectId : collarbMain.cutProjectId,// 
											// id
											pastType : collarbMain.pasteType,
											// 复制还是剪切
											tpye : '1'
										}
									});
								}
							}).getDialog().setWidth(200);
				} else if (collarbMain.pasteCate == 'task') {
					var pasteMask = new Ext.LoadMask(document.body, {
								msg : '' + getResource('resourceParam1539')
										+ ''
							});
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"" + getResource('resourceParam1544') + "?",
							function(btn) {
								if (btn == 'yes') {
									pasteMask.show();
									Ext.Ajax.request({
										url : "../JSON/task_TaskRemote.paste_Task",
										method : 'GET',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {

												var projectId = null;
												var chargedManId = null;
												if (collarbMain.pasteType == 'cut') {
													Ext.getCmp('pasteTask')
															.disable();
													var cutTaskNode = collarbMain.leftTree
															.getNodeById(collarbMain.cutTaskId);
													if (cutTaskNode == null) {
														cutTaskNode = collarbMain.cutTaskNode;
													}

													projectId = cutTaskNode.attributes.projectId;
													chargedManId = cutTaskNode.attributes.chargedManId;
													collarbMain.cutTaskId = null;
													collarbMain.cutTaskNode = null;
													cutTaskNode.remove();
												} else if (collarbMain.pasteType == 'copy') {
													var copyTaskNode = collarbMain.leftTree
															.getNodeById(collarbMain.copyTaskId);
													if (copyTaskNode == null) {
														copyTaskNode = collarbMain.copyTaskNode;
													}
													projectId = copyTaskNode.attributes.projectId;
													chargedManId = copyTaskNode.attributes.chargedManId;
												}
												// 创建子任务
												var currentNode = collarbMain.leftTree
														.getNodeById(leftNavigationTree.nodeId);
												currentNode.attributes.leaf = false;
												var expandable = !obj.leaf;
												currentNode.beginUpdate();
												var newNode = collarbMain.leftTree
														.getLoader()
														.createNode({
															id : obj.nodeId,
															text : obj.text,
															projectId : obj.projectId,
															dataType: 'TaskDataType',
															iconCls : obj.iconCls,
															statusId : obj.statusId,
															allowDrop : obj.allowDrop,
															allowDrag : false,
															chargedManId : obj.chargedManId,
															nt : obj.nt,
															leaf : obj.leaf,
															approval : obj.approval,
															expandable : expandable
														});

												var lastChildNode = currentNode.lastChild;
												if (lastChildNode != null) {
													// 粘贴时，维护新节点于最后一个节点的
													// pre，nex
													newNode.attributes.pre = lastChildNode.attributes.id;
													newNode.attributes.nex = lastChildNode.attributes.nex;

													lastChildNode.attributes.nex = newNode.attributes.id;
												} else {
													newNode.attributes.pre = '';
													newNode.attributes.nex = '';
												}

												currentNode
														.appendChild(newNode);
												currentNode.endUpdate();
												currentNode.expand();
											} else {
												collarbMain.refresh();
												Ext.MessageBox.show({
													title : '提示',
													msg : obj.message,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
											}
											pasteMask.hide();
										},
										failure : function(options, response) {
											pasteMask.hide();
										},
										params : {
											node : leftNavigationTree.nodeId,// 当前选中的节点
											copyTaskId : collarbMain.copyTaskId,// 要复制的task
											// id
											cutTaskId : collarbMain.cutTaskId,// 要剪切的task
											// id
											pastType : collarbMain.pasteType
											// 复制还是剪切
										}
									});
								}
							}).getDialog().setWidth(250);
				} else {
					// 虚拟项目
					alert(getResource('resourceParam5040'));
				}
			}

		}, new Ext.Toolbar.Separator({
					id : 's_pasteTask'
				}), {
			id : 'moveUp',
			tooltip : '',
			iconCls : 'icon-taskUp',
			text : '' + getResource('resourceParam488') + '',
			disabled : true,
			handler : function() {
				var currentNode = collarbMain.leftTree
						.getNodeById(leftNavigationTree.nodeId);
				var pNode = currentNode.previousSibling;
				var parentNode = currentNode.parentNode;
				if (currentNode.attributes.pre == '') {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1180')
										+ "",
								width : 250,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					var url = "../JSON/task_TaskRemote.moveUpTask";
					var upinfo=getResource('resourceParam1186');
					if (leftNavigationTree.nodeId.indexOf('c') == 0
							|| leftNavigationTree.nodeId.indexOf('p') == 0
							|| leftNavigationTree.nodeId.indexOf('vp') == 0) {
						url = "../JSON/project_ProjectRemote.moveUp";
						if(leftNavigationTree.nodeId.indexOf('c')==0){
						    upinfo=getResource('resourceParam9152');
						}else{
							upinfo=getResource('resourceParam9150');
						}
					}
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							upinfo ,
							function(btn) {
								if (btn == 'yes') {
									var up = new Ext.LoadMask(document.body, {
												msg : getResource('resourceParam9143')
											});
									up.show();
									Ext.Ajax.request({
										url : url,
										method : 'GET',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												var newNode = collarbMain.leftTree
														.getLoader()
														.createNode({
															id : currentNode.id,
															text : currentNode.text,
															iconCls : currentNode.attributes.iconCls,
															leaf : currentNode.attributes.leaf,
															allowDrop : currentNode.attributes.allowDrop,
															allowDrag : false,
															nt : currentNode.attributes.nt,
															statusId : currentNode.attributes.statusId,
															approval : currentNode.attributes.approval,
															dataType: currentNode.attributes.dataType,
															chargedManId : currentNode.attributes.chargedManId,
															projectId : currentNode.attributes.projectId,
															expandable : !currentNode.attributes.leaf
														});
												if (pNode != null) {// 处理不是页面首节点的情况
													newNode.attributes.pre = pNode.attributes.pre;
													newNode.attributes.nex = pNode.attributes.id;

													pNode.attributes.pre = currentNode.attributes.id;
													pNode.attributes.nex = currentNode.attributes.nex;

													// newNode
													// .on(
													// 'beforeexpand',
													// function(
													// node)
													// {
													// collarbMain.leftTree
													// .getLoader()
													// .load(
													// node);
													// });
													currentNode.remove();
													parentNode.insertBefore(
															newNode, pNode);
													collarbMain.leftTree
															.fireEvent(
																	'click',
																	newNode,
																	Ext.EventObject.ctrlKey);// 刷新当前节点
													newNode.select();
												} else {
													// 如果是页面首节点
													leftNavigationTree.nodeId = parentNode.attributes.id;
													collarbMain.refresh(true);
												}

											} else {
												collarbMain.refresh();
												Ext.MessageBox.show({
													title : '提示',
													msg : obj.error,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
											}
											up.hide();
										},
										failure : function(response, options) {
											up.hide();
										},
										params : {
											node : leftNavigationTree.nodeId,
											moveId : currentNode.attributes.pre
										}
									});
								}
							}).getDialog().setWidth(200);
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_moveUp'
				}), {
			id : 'moveDown',
			tooltip : '',
			iconCls : 'icon-taskDown',
			text : '' + getResource('resourceParam489') + '',
			disabled : true,
			handler : function() {
				var currentNode = collarbMain.leftTree
						.getNodeById(leftNavigationTree.nodeId);
				var nextNode = currentNode.nextSibling;
				var parentNode = currentNode.parentNode;
				if (currentNode.attributes.nex == '') {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1179')
										+ "",
								width : 250,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					var url = "../JSON/task_TaskRemote.moveDownTask";
					var downinfo=getResource('resourceParam1185');
					if (leftNavigationTree.nodeId.indexOf('c') == 0
							|| leftNavigationTree.nodeId.indexOf('p') == 0
							|| leftNavigationTree.nodeId.indexOf('vp') == 0) {
						url = "../JSON/project_ProjectRemote.moveDown";
						if(leftNavigationTree.nodeId.indexOf('c') == 0){
							downinfo=getResource('resourceParam9151');
						}else{
							downinfo=getResource('resourceParam9149');
						}
					}
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							downinfo,
							function(btn) {
								if (btn == 'yes') {
									var down = new Ext.LoadMask(document.body,
											{
												msg : getResource('resourceParam9144')
											});
									down.show();
									Ext.Ajax.request({
										// fixDuartionAndManhour
										url : url,
										method : 'GET',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												if (nextNode != null) {// 处理不是页面尾节点的情况
													var nextnextNode = nextNode.nextSibling;
													var newNode = collarbMain.leftTree
															.getLoader()
															.createNode({
																id : currentNode.id,
																text : currentNode.text,
																iconCls : currentNode.attributes.iconCls,
																leaf : currentNode.attributes.leaf,
																allowDrop : currentNode.attributes.allowDrop,
																allowDrag : false,
																nt : currentNode.attributes.nt,
																statusId : currentNode.attributes.statusId,
																approval : currentNode.attributes.approval,
																dataType: currentNode.attributes.dataType,
																chargedManId : currentNode.attributes.chargedManId,
																projectId : currentNode.attributes.projectId,
																expandable : !currentNode.attributes.leaf
															});
													newNode.attributes.pre = nextNode.attributes.id;
													newNode.attributes.nex = nextNode.attributes.nex;

													nextNode.attributes.pre = currentNode.attributes.pre;
													nextNode.attributes.nex = currentNode.attributes.id;
													currentNode.remove();
													parentNode.insertBefore(
															newNode,
															nextnextNode);
													// newNode
													// .on(
													// 'beforeexpand',
													// function(
													// node)
													// {
													// collarbMain.leftTree
													// .getLoader()
													// .load(
													// node);
													// });
													collarbMain.leftTree
															.fireEvent(
																	'click',
																	newNode,
																	Ext.EventObject.ctrlKey);// 刷新当前节点
													newNode.select();
												} else {
													// 如果是页面尾节点
													leftNavigationTree.nodeId = parentNode.attributes.id;
													collarbMain.refresh(true);

												}

											} else {
												collarbMain.refresh();
												Ext.MessageBox.show({
													title : '提示',
													msg : obj.error,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
											}
											down.hide();
										},
										failure : function(response, options) {
											down.hide();
										},
										params : {
											node : leftNavigationTree.nodeId,
											moveId : currentNode.attributes.nex
										}
									});
								}
							}).getDialog().setWidth(200);
				}
			}
		},{
			text:'导出',
			hidden:true,
			menu:new Ext.menu.Menu({
				style : {
				overflow : 'visible' 
			},
			items : [ 
			    {
					text : '执行结果报告',
					handler:function(){
			    	var node=leftNavigationTree.node;
			    	var id=node.id;
			    	if(id.indexOf('v')==0||id.indexOf('p')==0||id.indexOf('c')==0){
			    		Ext.example.msg('提示','请选取任务导出执行结果报告！');
			    		return;
			    	}
			    	window.open('../getReport/?type=execute_result&&projectId='
						    + node.attributes.projectId
							+ '&&taskId='
							+ node.attributes.taskId);
			        }
						
				},
				{
					text : '执行过程报告',
					handler:function(){
					var node=leftNavigationTree.node;
					var id=node.id;
			    	if(id.indexOf('v')==0||id.indexOf('p')==0||id.indexOf('c')==0){
			    		Ext.example.msg('提示','请选取任务导出执行过程报告！');
			    		return;
			    	}
					window.open('../getReport/?type=execute_process&&projectId='
						    + node.attributes.projectId
							+ '&&taskId='
							+ node.attributes.taskId);
			        }
				}
				]
		    })
		},'-',{
			text: '暂停',
		    id:'pause',
			hidden:true,
			disabled:true,
			handler:function(button){
			var node =leftNavigationTree.node;
			var dataType=node.attributes.dataType;
			if(dataType=='ProjectDataType'){
				var statusId=node.attributes.statusId;
				if(statusId==9){
					Ext.example.msg(getResource('resourceParam575'), '项目已暂停!');
					return;
				}
				Ext.Msg.confirm(getResource('resourceParam575'),'是否暂停项目?' ,
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : "../JSON/project_ProjectRemote.pauseProject",
									method : 'GET',
									success : function(response, options) {
										var obj = Ext.util.JSON.decode(response.responseText);
										Ext.example.msg(getResource('resourceParam575'), obj.message);
										collarbMain.refresh(true);
									},
									failure : function(response, options) {
									},
									params : {
										node : leftNavigationTree.nodeId
									}
								});
							}
						});
				
			}else if(dataType=='TaskDataType'){
				var statusId=node.attributes.statusId;
				if(statusId==9){
					Ext.example.msg(getResource('resourceParam575'), '任务已暂停!');
					return;
				}
				Ext.Msg.confirm(getResource('resourceParam575'),'是否暂停任务?' ,
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : "../JSON/task_TaskRemote.pauseTask",
									method : 'GET',
									success : function(response, options) {
										var obj = Ext.util.JSON.decode(response.responseText);
										Ext.example.msg(getResource('resourceParam575'), obj.message);
										collarbMain.refresh(true);
									},
									failure : function(response, options) {
									},
									params : {
										node : leftNavigationTree.nodeId
									}
								});
							}
						});
				
			}else{
				Ext.example.msg('提示', '请选中项目或任务后，再执行暂停操作!');
			}
			
		}
		},{
			text: '恢复',
			id:'resume',
			hidden:true,
			disabled:true,
			handler:function(button){
			var node=leftNavigationTree.node;
			var dataType=node.attributes.dataType;
			var statusId=node.attributes.statusId;
			if(dataType=='ProjectDataType'){
				if(statusId!=9){
					Ext.example.msg(getResource('resourceParam575'), '暂停的项目才能恢复!');
					return;
				}
				Ext.Msg.confirm(getResource('resourceParam575'),'是否恢复项目?',
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : "../JSON/project_ProjectRemote.resumeProject",
									method : 'GET',
									success : function(response, options) {
										var obj = Ext.util.JSON.decode(response.responseText);
										Ext.example.msg(getResource('resourceParam575'), obj.message);
										collarbMain.refresh(true);
									},
									failure : function(response, options) {
									},
									params : {
										node : leftNavigationTree.nodeId
									}
								});
							}
						});
			}else if(dataType=='TaskDataType'){
				if(statusId!=9){
					Ext.example.msg(getResource('resourceParam575'), '暂停的任务才能恢复!');
					return;
				}
				Ext.Msg.confirm(getResource('resourceParam575'),'是否恢复任务?',
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : "../JSON/task_TaskRemote.resumeTask",
									method : 'GET',
									success : function(response, options) {
										var obj = Ext.util.JSON.decode(response.responseText);
										if(obj.success){
											Ext.example.msg(getResource('resourceParam575'), obj.message);
										}else{
											Ext.MessageBox.show({
												title : '' + getResource('resourceParam575') + '',
												msg : obj.message,
												width:300,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
											});
										}
										collarbMain.refresh(true);
									},
									failure : function(response, options) {
									},
									params : {
										node : leftNavigationTree.nodeId
									}
								});
							}
						});
			}else{
				Ext.example.msg('提示', '请选中项目或任务后，再执行恢复操作!');
			}
			
			
		}
		},{
			text : '接受',
			iconCls : 'icon-importTasks-2',
			hidden : collarbMain.test,
			handler : function() {
				var nodeId = leftNavigationTree.nodeId;
				if (nodeId.indexOf("p") == 0) {
				} else if (nodeId.indexOf("vp") == 0) {
				} else {
					var ids = new Array();
					ids[0] = nodeId;
					callSeam("mytask_MyTaskRemote", "acceptTasks", [ids],
							function(result) {
							});
				}
			}
		}]
	});

	// 主面板
	collarbMain.mainPanel = new Ext.Panel({
				region : 'center',
				layout : 'border', // 布局模式
				boder : false,
				hideBorders:true,
				items : [collarbMain.westPanel, collarbMain.centerPanel],
				listeners : {
					beforerender : function() {

					},
					render : function() {
						// 按钮id名称 与对应的功能权限的id，id名称不区分大小写，功能权限id可以不写，在后台会根据前台按钮名称，根据权限给与权限id
						var message = "{'createProjectByManual':''," + "'createProjectByFlow':'',"
								+ "'createProjectFolder':''," + "'createSameLevelTask':'',"
								+ "'createSubLevelTask':''," + "'createApproveTask':''}";
						function initButton(obj) {
							// 根据权限，将用户不可操作菜单隐藏
							if (button.createProjectByManual == false
									&& button.createProjectByFlow == false
									&& button.createProjectFolder == false
									&& button.createSameLevelTask == false
									&& button.createSubLevelTask == false) {
								Ext.getCmp('create').setVisible(false);
								Ext.getCmp('s_create').hide();
							}
							// 为选中任何节点，默认为根节点时，按纽的状态
							if (button.createProjectByManual || button.createProjectByFlow
									|| button.createProjectFolder) {
								Ext.getCmp('create').enable();
								Ext.getCmp('createSameLevelTask').setVisible(false);
								Ext.getCmp('createSubLevelTask').setVisible(false);
								if (button.createProjectByManual) {
									Ext.getCmp('createProjectByManual').setVisible(true);
									Ext.getCmp('createProjectByManual').enable();
								} else {
									Ext.getCmp('createProjectByManual').setVisible(false);
								}
								Ext.getCmp('createByWBSTemplate').setVisible(false);
								if (button.createProjectFolder) {
									Ext.getCmp('createProjectFolder').setVisible(true);
									Ext.getCmp('createProjectFolder').enable();
								} else {
									Ext.getCmp('createProjectFolder').setVisible(true);
								}
							} else {
								Ext.getCmp('create').disable();
							}
						}
						
						var root=collarbMain.leftTree.getRootNode();
						var loader=collarbMain.leftTree.getLoader();
						
						
						loader.on('beforeload',function(loader,node,callback){
							Ext.apply(loader.baseParams, {
								statusFilter : collarbMain.projectStatsId.join(','),
								privilegename : message
							});
						},this, {
							single : true
						});
						loader
								.on(
										'load',
										function(loader, node, response) {
											/*
											 * 在第一次加载后，清空privilegename参数，
											 * 不再获取控制功能权限
											 */
											Ext.apply(loader.baseParams, {
												privilegename : ''
											});

											var obj = Ext.util.JSON
													.decode(response.responseText);
											button = {
												"createProjectByManual" : true,
												"createProjectByFlow" : true,
												"createProjectFolder" : true,
												"createSameLevelTask" : true,
												"createSubLevelTask" : true,
												"createApproveTask" : true,
												"success" : true
											};
											button.createProjectByManual = obj.createProjectByManual;
											button.createProjectByFlow = obj.createProjectByFlow;
											button.createProjectFolder = obj.createProjectFolder;
											button.createSameLevelTask = obj.createSameLevelTask;
											button.createSubLevelTask = obj.createSubLevelTask;
											button.createApproveTask = obj.createApproveTask;
											initButton(button);
										}, this, {
											single : true
										});
						root.expand();
						//在resize时，会重新layout(在afterlayout中时)，不能写固定值
						var activePanel = collarbMain.tabPanel.getActiveTab();
						if(activePanel==null){
							activePanel=0;
						}
						collarbMain.tabPanel.setActiveTab(activePanel);
						
					},
					afterlayout : function() {
						
					}
				},
				tbar : collarbMain.tbar
			});

	
	
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [collarbMain.mainPanel]
	});

	window.onresize = function() {
		document.getElementById("coopProjectPanel") != undefined
				? document.getElementById("coopProjectPanel").style.height = (document.body.clientHeight - 90)
				: "";
	};
	var multiSelectTbarConroller=function(){
		/*
		 * 将顶部toolbar置灰
		 */
		collarbMain.tbar.setDisabled(true);
		
		
		if (leftNavigationTree.node.attributes.dataType == 'ProjectDataType') {
			/*
			 * 项目类型时，放开置通过操作
			 */
			Ext.getCmp('approve').enable();// 放开送审下拉菜单
			Ext.getCmp('projectApprove').enable();// 放开置通过
			Ext.getCmp('projectVerify').disable();// 屏蔽提交送审
			Ext.getCmp('projectApprove1').disable();// 屏蔽置完成
		}
		
	}
	var beforeclick = function(node, eventObject) {
		var isMulti=false;
		if(eventObject){
			if(eventObject.ctrlKey){
				/*
				 * 当前的点击并没有选取结点
				 */
				var selModel=collarbMain.leftTree.selModel;
				var selectedNodes=selModel.getSelectedNodes();
				var length=selectedNodes.length;
				if(length>0){//已经选取了一个，并且按着ctrl继续选取
					isMulti=true;
					var dataType=node.attributes.dataType;
					var parentId=node.parentNode.id;
					for(var i=0;i<length;i++){
						if(dataType!=selectedNodes[i].attributes.dataType){
							Ext.example.msg('提示','只能选取相同类型的数据，进行批量操作！');
							return;
						}
						if(parentId!=selectedNodes[i].parentNode.id){
							Ext.example.msg('提示','请选取同级兄弟结点，进行批量操作！');
							return;
						}
						if(dataType=="TaskDataType"){
							Ext.example.msg('提示','请选取项目进行批量操作！');
							return;
						}
						if(dataType=="ContentDataType"){
							Ext.example.msg('提示','请选取项目进行批量操作！');
							return;
						}
					}
				}
			}
		}
		if(isMulti){
			/*
			 * 多选时对于顶部button的控制
			 */
			multiSelectTbarConroller();
			return;
		}
		
		
		if (Ext.getCmp('virtualRelationPanel')) {
			Ext.getCmp('virtualRelationPanel_combo').clearValue();
			wbsdata.clear();
			Ext.getCmp('virtualRelationPanel').hide();
			Ext.getCmp('collarbMain_cardPanel').show();
		}
		// 关联工具栏按钮
		// if (node.id.indexOf('v') == 0) {
		// Ext.getCmp('virtualRelation').disable();
		// } else {
		// Ext.getCmp('virtualRelation').enable();
		// }
		if (node.id == 0) {
			collarbTabPanel.dataPanel.disable();
			Ext.getCmp('pause').setVisible(false);
			Ext.getCmp('resume').setVisible(false);

			// 属性面板，只project和task时 enable
			Ext.getCmp('relationPanel').disable();
			// 在根节点下，如果可以建content,project则 create enable
			if (button.createProjectByManual || button.createProjectByFlow
					|| button.createProjectFolder) {
				Ext.getCmp('create').enable();
				if (button.createProjectByManual) {
					Ext.getCmp('createProjectByManual').setVisible(true);
					Ext.getCmp('createProjectByManual').enable();
				} else {
					Ext.getCmp('createProjectByManual').setVisible(false);
				}
				Ext.getCmp('createByWBSTemplate').setVisible(false);
				if (button.createProjectFolder) {
					Ext.getCmp('createProjectFolder').setVisible(true);
					Ext.getCmp('createProjectFolder').enable();
				} else {
					Ext.getCmp('createProjectFolder').setVisible(true);
				}
				Ext.getCmp('createSameLevelTask').setVisible(false);
				Ext.getCmp('createSubLevelTask').setVisible(false);
			} else {
				Ext.getCmp('create').disable();
			}

			Ext.getCmp('update').disable();
			Ext.getCmp('delete').disable();
			Ext.getCmp('terminate').disable();
			Ext.getCmp('approve').disable();

			Ext.getCmp('privilege').disable();
			Ext.getCmp('copyTask').disable();
			Ext.getCmp('cutTask').disable();
			Ext.getCmp('pasteTask').disable();
			Ext.getCmp('moveUp').disable();
			Ext.getCmp('moveDown').disable();
			// 扩展属性链接设置为隐藏
			collarbViewTaskForm.link.setVisible(false);
			collarbViewProjectForm.link.setVisible(false);
			Ext.getCmp('createByWBSTemplate').setVisible(false);
			Ext.getCmp('createApproveTask').setVisible(false);
		} else if (node.id.indexOf('c') == 0) {
			collarbTabPanel.dataPanel.disable();
			Ext.getCmp('pause').setVisible(false);
			Ext.getCmp('resume').setVisible(false);
			
			Ext.getCmp('relationPanel').disable();
			if (button.createProjectByManual || button.createProjectByFlow
					|| button.createProjectFolder) {
				Ext.getCmp('create').enable();
				if (button.createProjectByManual) {
					Ext.getCmp('createProjectByManual').setVisible(true);
					Ext.getCmp('createProjectByManual').enable();
				} else {
					Ext.getCmp('createProjectByManual').setVisible(false);
				}
				if (button.createProjectByFlow) {
					Ext.getCmp('createByWBSTemplate').setVisible(true);
					Ext.getCmp('createByWBSTemplate').enable();
				} else {
					Ext.getCmp('createByWBSTemplate').setVisible(false);
				}
				if (button.createProjectFolder) {
					Ext.getCmp('createProjectFolder').setVisible(true);
					Ext.getCmp('createProjectFolder').enable();
				} else {
					Ext.getCmp('createProjectFolder').setVisible(true);
				}
				Ext.getCmp('createSameLevelTask').setVisible(false);
				Ext.getCmp('createSubLevelTask').setVisible(false);
			} else {
				Ext.getCmp('create').disable();
			}
			collarbViewTaskForm.link.setVisible(false);
			collarbViewProjectForm.link.setVisible(false);
			Ext.getCmp('createByWBSTemplate').setVisible(false);
			Ext.getCmp('createApproveTask').setVisible(false);
			// folder不用审批
			Ext.getCmp('projectApprove').disable();
			Ext.getCmp('projectApprove1').disable();
			Ext.getCmp('projectVerify').disable();
			Ext.getCmp('examApprovalTab').disable();
		} else if (node.id.indexOf('p') == 0 || node.id.indexOf('vp') == 0) {
			collarbTabPanel.dataPanel.enable();
			var statusId=node.attributes.statusId;
			if (statusId != 9 && statusId != 1
					&& statusId != 6 && statusId != 7) {
				Ext.getCmp('pause').setVisible(true);
				Ext.getCmp('pause').enable();
			}else{
				Ext.getCmp('pause').setVisible(false);
			}
			if (node.attributes.statusId == 9) {
				Ext.getCmp('resume').setVisible(true);
				Ext.getCmp('resume').enable();
			}else{
				Ext.getCmp('resume').setVisible(false);
			}
			
			Ext.getCmp('relationPanel').enable();
			if (button.createSubLevelTask) {
				Ext.getCmp('create').enable();
				Ext.getCmp('createProjectByManual').setVisible(false);
				Ext.getCmp('createProjectFolder').setVisible(false);
				Ext.getCmp('createSameLevelTask').setVisible(false);
				Ext.getCmp('createSubLevelTask').setVisible(true);
				Ext.getCmp('createSubLevelTask').enable();
				Ext.getCmp('createByWBSTemplate').setVisible(true);
				Ext.getCmp('createApproveTask').setVisible(true);
				if (node.attributes.nt == 1 || node.attributes.nt == '1') {
					// 审批任务，禁止 审批通过 审批
					Ext.getCmp('projectApprove').setVisible(false);
					Ext.getCmp('projectApprove1').setVisible(false);
					Ext.getCmp('projectVerify').setVisible(false);
				} else {
					Ext.getCmp('projectApprove').setVisible(true);
					Ext.getCmp('projectApprove1').setVisible(true);
					Ext.getCmp('projectVerify').setVisible(true);
				}
			} else {
				Ext.getCmp('create').disable();
			}
			collarbViewTaskForm.link.setVisible(false);
			collarbViewProjectForm.link.setVisible(true);
			collarbTabPanel.dataPanel.enable();
		} else {
			collarbTabPanel.dataPanel.enable();
			var statusId=node.attributes.statusId;
			if (statusId != 9 && statusId != 1
					&& statusId != 6 && statusId != 7) {
				Ext.getCmp('pause').setVisible(true);
				Ext.getCmp('pause').enable();
			}else{
				Ext.getCmp('pause').setVisible(false);
			}
			if (node.attributes.statusId == 9) {
				Ext.getCmp('resume').setVisible(true);
				Ext.getCmp('resume').enable();
			}else{
				Ext.getCmp('resume').setVisible(false);
			}
			
			Ext.getCmp('relationPanel').enable();
			collarbTabPanel.dataPanel.enable();
			if (button.createSameLevelTask || button.createSubLevelTask) {
				Ext.getCmp('create').enable();
				Ext.getCmp('createProjectByManual').setVisible(false);
				Ext.getCmp('createProjectFolder').setVisible(false);
				if (button.createSameLevelTask) {
					Ext.getCmp('createSameLevelTask').setVisible(true);
					Ext.getCmp('createSameLevelTask').enable();
				} else {
					Ext.getCmp('createSameLevelTask').setVisible(false);
				}
				if (button.createSubLevelTask) {
					Ext.getCmp('createSubLevelTask').setVisible(true);
					Ext.getCmp('createSubLevelTask').enable();
				} else {
					Ext.getCmp('createSubLevelTask').setVisible(false);
				}

				if (node.attributes.nt == 1 || node.attributes.nt == '1') {
					// 审批任务，禁止 审批通过 审批
					Ext.getCmp('projectApprove').setVisible(false);
					Ext.getCmp('projectApprove1').setVisible(false);
					Ext.getCmp('projectVerify').setVisible(false);
					Ext.getCmp('createSubLevelTask').setVisible(false);
					Ext.getCmp('createSameLevelTask').setVisible(false);
					Ext.getCmp('createByWBSTemplate').setVisible(false);
					Ext.getCmp('createApproveTask').setVisible(false);
				} else {
					Ext.getCmp('projectApprove').setVisible(true);
					Ext.getCmp('projectApprove1').setVisible(true);
					Ext.getCmp('projectVerify').setVisible(true);
					Ext.getCmp('createSubLevelTask').setVisible(true);
					Ext.getCmp('createSameLevelTask').setVisible(true);
					Ext.getCmp('createByWBSTemplate').setVisible(true);
					Ext.getCmp('createApproveTask').setVisible(true);
				}
				/*
				 * 任务置完成by suny
				 */
				// if (node.attributes.statusId == 4) {
				// Ext.getCmp('projectApprove').setVisible(false);
				// }
			} else {
				Ext.getCmp('create').disable();
			}
			collarbViewTaskForm.link.setVisible(true);
			collarbViewProjectForm.link.setVisible(false);
		}
	};
	// var logTag = 0;
	var click = function(node, eventObject) {
		// if (eventObject.ctrlKey) {
		// }
//		console.log('click')
		var isMulti=false;
		if(eventObject){
			if(eventObject.ctrlKey){
				/*
				 * 当前的点击并没有选取结点
				 */
				var selModel=collarbMain.leftTree.selModel;
				var selectedNodes=selModel.getSelectedNodes();
				var length=selectedNodes.length;
				if(length>1){//已经选取了一个，并且按着ctrl继续选取
					isMulti=true;
					var dataType=node.attributes.dataType;
					var parentId=node.parentNode.id;
					for(var i=0;i<length;i++){
						if(dataType!=selectedNodes[i].attributes.dataType){
							selModel.unselect(node);
							return;
						}
						if(parentId!=selectedNodes[i].parentNode.id){
							selModel.unselect(node);
							return;
						}
						if(dataType=="TaskDataType"){
							selModel.unselect(node);
							return;
						}
						if(dataType=="ContentDataType"){
							selModel.unselect(node);
							return;
						}
					}
				}
			}
		}
		if(isMulti){
			return;
		}
		
		
		if (templateDatail.conflict) {
			templateDatail.conflict = false;
			collarbMain.cardPanel.remove(0);
			collarbMain.tabPanel = collarbTabPanel.init();
			collarbMain.cardPanel.insert(0, collarbMain.tabPanel);
			collarbMain.cardPanel.remove(1);
			var config = {
				createByTemplateCallBack : collarbMain.refresh
			};
			collarbMain.createPanel = collarbCreatePanel.init(config);
			collarbMain.cardPanel.insert(1, collarbMain.createPanel);
		}

		Ext.get('refreshProject').show();

		leftNavigationTree.node = node;
		leftNavigationTree.nodeId = node.id;
		leftNavigationTree.statusId = node.attributes.statusId;
		leftNavigationTree.approval = node.attributes.approval;
		leftNavigationTree.nodeText = node.text;
		collarbMain.cardPanel.getLayout().setActiveItem(0);
		if (node.id.indexOf('p') == 0 || node.id.indexOf('vp') == 0) {
//			collarbTabPanel.feedbackPanel.disable();
//			collarbTabPanel.tasklgoPanel.disable();
//			collarbTabPanel.feedbackPanel.html = "<font  style='font-size: 15px; line-height: 48px; margin-left: 9px;'>"
//					+ getResource('resourceParam1545') + "。<font>";

		} else if (node.id == 0 || node.id.indexOf('c') == 0) {
//			collarbTabPanel.feedbackPanel.disable();
//			collarbTabPanel.tasklgoPanel.disable();
//			collarbTabPanel.feedbackPanel.html = ""
//					+ getResource('resourceParam1545') + ".";
			attributePanel.attributePanel.getLayout().setActiveItem(0);
			if (node.id != 0 || node.id.indexOf('c') == 0) {
				if (collarbMain.projectFolderDetail == null) {
					collarbMain.projectFolderDetail = projectFolderDetail
							.init();
					collarbCreatePanel.projectFolderDetail
							.add(collarbMain.projectFolderDetail);
				} else {
					collarbMain.projectFolderDetail
							.remove(collarbMain.projectFolderDetail);
					collarbMain.projectFolderDetail = projectFolderDetail
							.init();
					collarbCreatePanel.projectFolderDetail
							.add(collarbMain.projectFolderDetail);
				}
				collarbMain.cardPanel.getLayout().setActiveItem(1);
				collarbCreatePanel.cardPanel.getLayout().setActiveItem(7);
				collarbCreatePanel.cardPanel.doLayout();
			}
		} else if (node.id != 0 && node.id.indexOf('c') != 0) {
//			collarbTabPanel.feedbackPanel.enable();
//			collarbTabPanel.tasklgoPanel.enable();

//			collarbTabPanel.feedbackPanel.html = null;
//			collarbTabPanel.feedbackPanel.html = ""
//					+ getResource('resourceParam1545') + ".";

		} else {
//			collarbTabPanel.feedbackPanel.enable();
//			collarbTabPanel.tasklgoPanel.enable();
//			collarbTabPanel.feedbackPanel.html = ""
//					+ getResource('resourceParam1545') + ".";
			attributePanel.attributePanel.getLayout().setActiveItem(0);
			attributePanel.projectPanel.getForm().reset();
		}
		// 属性面板显示为选中的面板
		var activePanel = collarbMain.tabPanel.getActiveTab();
		var activeTabId = activePanel.getId();
		activePanel.fireEvent('activate');
	}
	leftNavigationTree.treePanel.on('beforeclick', beforeclick);
	leftNavigationTree.treePanel.on('click', click);

}
Ext.onReady(collarbMain.init, collarbMain, true);


function updateContent() {
	if (collarbMain.updateProjectFolder == null) {
		collarbMain.updateProjectFolder = updateProjectFolder
				.init(collarbMain.updateFolderCallBack);
		collarbCreatePanel.updateProjectFolder
				.add(collarbMain.updateProjectFolder);
	} else {
		collarbMain.updateProjectFolder.remove(collarbMain.updateProjectFolder);
		collarbMain.updateProjectFolder = updateProjectFolder
				.init(collarbMain.updateFolderCallBack);
		collarbCreatePanel.updateProjectFolder
				.add(collarbMain.updateProjectFolder);
	}
	collarbMain.cardPanel.getLayout().setActiveItem(1);
	collarbCreatePanel.cardPanel.getLayout().setActiveItem(6);
	collarbCreatePanel.cardPanel.doLayout();
}

function updateProject() {

	if (collarbMain.updateProject == null) {
		collarbMain.updateProject = updateProjectCard.init();
		collarbCreatePanel.updateProject.add(collarbMain.updateProject);
	} else {
		collarbCreatePanel.updateProject.remove(collarbMain.updateProject);
		collarbMain.updateProject = updateProjectCard.init();
		collarbCreatePanel.updateProject.add(collarbMain.updateProject);
	}
	collarbMain.cardPanel.getLayout().setActiveItem(1);
	collarbCreatePanel.cardPanel.getLayout().setActiveItem(3);
	collarbCreatePanel.cardPanel.doLayout();

}
function updateTaskCardRefresh() {
	collarbMain.refresh();
	collarbMain.cardPanel.getLayout().setActiveItem(0);
}

function updateTask() {
	if (leftNavigationTree.nodeId != 0) {
		// 修改任务
		updateTaskBasic.nodeId = leftNavigationTree.nodeId;
		updateTaskBasic.projectId = leftNavigationTree.node.attributes.projectId;
		if (collarbMain.updateTask == null) {
			collarbMain.updateTask = updateTaskCard.init(updateTaskCardRefresh);
			collarbCreatePanel.updateTask.add(collarbMain.updateTask);
		} else {
			collarbCreatePanel.updateTask.remove(collarbMain.updateTask);
			collarbMain.updateTask = updateTaskCard.init(updateTaskCardRefresh);
			collarbCreatePanel.updateTask.add(collarbMain.updateTask);
		}
		updateTaskBasic.setBasic();
		collarbMain.cardPanel.getLayout().setActiveItem(1);
		collarbCreatePanel.cardPanel.getLayout().setActiveItem(4);
		collarbCreatePanel.cardPanel.doLayout();
	}
}
function canelApproveTask() {
	collarbMain.cardPanel.getLayout().setActiveItem(0);
}
function updateApproveTask() {
	if (leftNavigationTree.nodeId != 0) {
		// 修改审批任务
		if (collarbMain.approveTask) {
			collarbCreatePanel.createApproveTask
					.remove(collarbMain.approveTask);
			collarbMain.approveTask = null;
		}
		var params = {
			title : '' + getResource('resourceParam478') + ''
					+ getResource('resourceParam1020') + '',
			update : true
		}
		if (collarbMain.updateApproveTask == null) {
			collarbMain.updateApproveTask = createApproveTask.init(null,
					leftNavigationTree.nodeId, "TaskDataType",
					canelApproveTask, '', collarbMain.refresh, params);
			collarbCreatePanel.updateApproveTask
					.add(collarbMain.updateApproveTask);
		} else {
			collarbCreatePanel.updateApproveTask
					.remove(collarbMain.updateApproveTask);
			collarbMain.updateApproveTask = createApproveTask.init(null,
					leftNavigationTree.nodeId, "TaskDataType",
					canelApproveTask, '', collarbMain.refresh, params);
			collarbCreatePanel.updateApproveTask
					.add(collarbMain.updateApproveTask);
		}
		collarbMain.cardPanel.getLayout().setActiveItem(1);
		collarbCreatePanel.cardPanel.getLayout().setActiveItem(10);
		collarbCreatePanel.cardPanel.doLayout();
	}
}

function deleteProject() {
	var deleteMask = new Ext.LoadMask(document.body, {
				msg : '' + getResource('resourceParam1538') + ''
			});
	Ext.Msg.show({
		title : '' + getResource('resourceParam575') + '',
		msg : '' + getResource('resourceParam1165') + '',
		width : 300,
		buttons : Ext.MessageBox.YESNO,
		fn : function(btn) {
			if (btn == 'yes') {
				// if (leftNavigationTree.statusId == '4') {
				// Ext.MessageBox.show({
				// title : '提示',
				// msg : '请先终止该工程!',
				// buttons : Ext.MessageBox.OK,
				// icon : Ext.MessageBox.INFO
				// });
				// } else if (leftNavigationTree.statusId == '11') {
				// Ext.MessageBox.show({
				// title : '提示',
				// msg : '正在审批，不能删除!',
				// buttons : Ext.MessageBox.OK,
				// icon : Ext.MessageBox.INFO
				// });
				// } else
				// {

				deleteMask.show();
				Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.deleteProject",
					method : 'GET',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							var currentNode = collarbMain.leftTree
									.getNodeById(leftNavigationTree.nodeId);

							var previousNode = currentNode.previousSibling;
							if (previousNode != null) {
								collarbMain.leftTree.fireEvent('beforeclick',
										previousNode);// 刷新当前节点
								collarbMain.leftTree.fireEvent('click',
										previousNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								previousNode.select();
							} else {
								var parentNode = currentNode.parentNode;
								leftNavigationTree.nodeId = parentNode.id;
								// collarbMain.refresh();
								parentNode.attributes.expandable = false;
								parentNode.attributes.leaf = true;
								collarbMain.leftTree.fireEvent('beforeclick',
										parentNode);// 刷新当前节点
								collarbMain.leftTree.fireEvent('click',
										parentNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								parentNode.select();
							}
							currentNode.remove();
						} else {
							collarbMain.refresh();
							Ext.MessageBox.show({
										title : '提示',
										msg : obj.error,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
						}
						deleteMask.hide();
					},
					failure : function(options, response) {
						deleteMask.hide();
					},
					params : {
						node : leftNavigationTree.nodeId,
						tpye : collarbMain.tpye
					}
				});// deleteProject
				// }
			}
		},
		icon : Ext.MessageBox.QUESTION
	});
}

function deleteVirtualRelation() {
	var deleteMask = new Ext.LoadMask(document.body, {
				msg : '' + getResource('resourceParam1538') + ''
			});
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1182') + "", function(btn) {
				if (btn == 'yes') {
					deleteMask.show();
					Ext.Ajax.request({
						url : "../JSON/taskNodeRelation_TaskNodeRelationRemote.deleteVirtualRelation",
						method : 'GET',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								var currentNode = collarbMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var previousNode = currentNode.previousSibling;
								var nextNode = currentNode.nextSibling;
								// 维护节点的pre和 nex
								if (previousNode != null) {
									previousNode.attributes.nex = currentNode.attributes.nex;
								}
								if (nextNode != null) {
									nextNode.attributes.pre = currentNode.attributes.pre;
								}
								if (previousNode != null) {
									collarbMain.leftTree.fireEvent(
											'beforeclick', previousNode);// 刷新当前节点
									collarbMain.leftTree.fireEvent('click',
											previousNode,
											Ext.EventObject.ctrlKey);// 刷新当前节点
									previousNode.select();
								} else {
									var parentNode = currentNode.parentNode;
									leftNavigationTree.nodeId = parentNode.id;
									parentNode.attributes.expandable = false;
									parentNode.attributes.leaf = true;
									collarbMain.leftTree.fireEvent(
											'beforeclick', parentNode);// 刷新当前节点
									collarbMain.leftTree
											.fireEvent('click', parentNode,
													Ext.EventObject.ctrlKey);// 刷新当前节点
									parentNode.select();
								}
								var parentNode = currentNode.parentNode;
								currentNode.remove();
							} else {
								collarbMain.refresh();
								Ext.MessageBox.show({
											title : '提示',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
							}
							deleteMask.hide();

						},
						failure : function(options, response) {
							deleteMask.hide();
						},
						params : {
							pid : collarbMain.leftTree
									.getNodeById(leftNavigationTree.nodeId).parentNode.id,
							cids : leftNavigationTree.nodeId
						}
					});// deleteTask

					// }
				}
			}).getDialog().setWidth(250);
}

function deleteTask() {
	var deleteMask = new Ext.LoadMask(document.body, {
				msg : '' + getResource('resourceParam1538') + ''
			});
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1182') + "", function(btn) {
				if (btn == 'yes') {
					deleteMask.show();
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.deleteTask",
						method : 'GET',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								var currentNode = collarbMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var previousNode = currentNode.previousSibling;
								var nextNode = currentNode.nextSibling;
								// 维护节点的pre和 nex
								if (previousNode != null) {
									previousNode.attributes.nex = currentNode.attributes.nex;
								}
								if (nextNode != null) {
									nextNode.attributes.pre = currentNode.attributes.pre;
								}
								if (previousNode != null) {
									collarbMain.leftTree.fireEvent(
											'beforeclick', previousNode);// 刷新当前节点
									collarbMain.leftTree.fireEvent('click',
											previousNode,
											Ext.EventObject.ctrlKey);// 刷新当前节点
									previousNode.select();
								} else {
									var parentNode = currentNode.parentNode;
									leftNavigationTree.nodeId = parentNode.id;
									parentNode.attributes.expandable = false;
									parentNode.attributes.leaf = true;
									collarbMain.leftTree.fireEvent(
											'beforeclick', parentNode);// 刷新当前节点
									collarbMain.leftTree
											.fireEvent('click', parentNode,
													Ext.EventObject.ctrlKey);// 刷新当前节点
									parentNode.select();
								}
								var parentNode = currentNode.parentNode;
								currentNode.remove();
							} else {
								collarbMain.refresh();
								Ext.MessageBox.show({
											title : '提示',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
							}
							deleteMask.hide();

						},
						failure : function(options, response) {
							deleteMask.hide();
						},
						params : {
							node : leftNavigationTree.nodeId
						}
					});// deleteTask
				}
			}).getDialog().setWidth(250);
}

function deleteFolder() {
	var deleteMask = new Ext.LoadMask(document.body, {
				msg : '' + getResource('resourceParam1538') + ''
			});
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1540') + "?", function(btn) {
				if (btn == 'yes') {
					var currentNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					var parentnode1 = currentNode.parentNode;

					if (currentNode.hasChildNodes()) {
						Ext.Msg.confirm('' + getResource('resourceParam575')
										+ '', ""
										+ getResource('resourceParam1543')
										+ "?", function(btn) {
									if (btn == "yes") {

										deleteMask.show();
										Ext.Ajax.request({
											url : '../JSON/project_ProjectRemote.deleteProjectFolderHasChild?a='
													+ new Date().getTime(),
											method : 'GET',
											success : function(response,
													options) {
												var obj = Ext.util.JSON
														.decode(response.responseText);
												if (obj.success == true) {
													leftNavigationTree.nodeId = 0;
													collarbMain.refresh(true);
												} else {
													leftNavigationTree.nodeId = 0;
													collarbMain.refresh(true);
													Ext.MessageBox.show({
														title : '提示',
														msg : obj.error,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
												}
												deleteMask.hide();
											},
											failure : function(options,
													response) {
												deleteMask.hide();
											},
											params : {
												contentsid : leftNavigationTree.nodeId
														.replace("c", ""),
												tpye : collarbMain.tpye
											}
										});

									}
								});

					} else {
						deleteMask.show();
						Ext.Ajax.request({
							url : '../JSON/project_ProjectRemote.deleteProjectFolder?a='
									+ new Date().getTime(),
							method : 'GET',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								if (obj.success == true) {

									var previousNode = currentNode.previousSibling;
									var nextNode = currentNode.nextSibling;

									if (previousNode != null) {
										collarbMain.leftTree.fireEvent(
												'beforeclick', previousNode);// 刷新当前节点
										collarbMain.leftTree.fireEvent('click',
												previousNode,
												Ext.EventObject.ctrlKey);// 刷新当前节点
										previousNode.select();
									} else {
										parentnode1.attributes.expandable = false;
										parentnode1.attributes.leaf = true;
										collarbMain.leftTree.fireEvent(
												'beforeclick', parentnode1);// 刷新当前节点
										collarbMain.leftTree.fireEvent('click',
												parentnode1,
												Ext.EventObject.ctrlKey);// 刷新当前节点
										parentnode1.select();
									}
									currentNode.remove();

									// parentnode1
									// .removeChild(currentNode);
									// if (!parentnode1
									// .hasChildNodes()) {
									// parentnode1.attributes.leaf
									// = true;
									// parentnode1.attributes.expandable
									// = false;
									// }

								} else {
									collarbMain.refresh();
									Ext.MessageBox.show({
										title : '提示',
										msg : obj.error,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
								}
								deleteMask.hide();
							},
							failure : function(options, response) {
								deleteMask.hide();
							},
							params : {
								contentsid : leftNavigationTree.nodeId.replace(
										"c", ""),
								tpye : collarbMain.tpye
							}
						});
					}

				}
			});
}

function terminateProject() {
	var terminateMask = new Ext.LoadMask(document.body, {
				msg : getResource('resourceParam5041')
			});
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1536') + "?", function(btn) {
				if (btn == 'yes') {

					terminateMask.show();
					Ext.Ajax.request({
						url : '../JSON/project_ProjectRemote.terminateProject?a='
								+ new Date().getTime(),
						method : 'GET',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								var node = collarbMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var expandable = !node.attributes.leaf;
								var newNode = collarbMain.leftTree.getLoader()
										.createNode({
											id : node.id,
											text : node.text,
											iconCls : 'icon-terminatedProject',
											leaf : node.attributes.leaf,
											dataType:'ProjectDataType',
											statusId : obj.statusId,
											allowDrop : obj.allowDrop,
											chargedManId : node.attributes.chargedManId,
											expandable : expandable
										});
								var parentNode = node.parentNode;
								var nextNode = node.nextSibling;
								var previousNode = node.previousSibling;
								if (nextNode != null) {
									node.remove();
									parentNode.insertBefore(newNode, nextNode);
								} else {
									if (previousNode == null) {
										var tempNode = new Ext.tree.TreeNode({
													id : new Date().toString()
												});
										parentNode.appendChild(tempNode);
										node.remove();
										parentNode.appendChild(newNode);
										tempNode.remove();

									} else {
										node.remove();
										parentNode.appendChild(newNode);
									}
								}
								// newNode
								// .on(
								// 'beforeexpand',
								// function(node) {
								// collarbMain.leftTree
								// .getLoader()
								// .load(
								// node);
								// });
								collarbMain.leftTree.fireEvent('beforeclick',
										newNode);// 刷新当前节点
								collarbMain.leftTree.fireEvent('click',
										newNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								if (!parentNode.isExpanded()) {
									parentNode.expand();
								}
							} else {
								collarbMain.refresh();
								Ext.MessageBox.show({
											title : '提示',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
							}
							terminateMask.hide();
						},
						failure : function(options, response) {
							terminateMask.hide();
						},
						params : {
							node : leftNavigationTree.nodeId
						}
					});
				}
			});
}

function terminateTask() {
	var terminateMask = new Ext.LoadMask(document.body, {
				msg : getResource('resourceParam5041')
			});
	
	if(leftNavigationTree.node.attributes.auto==1){
		Ext.MessageBox.show({
			title : '提示',
			msg : '自动任务不允许终止',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.INFO
		});
		return;
	}
	
	
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1537') + "?", function(btn) {
				if (btn == 'yes') {

					terminateMask.show();
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.terminateTask",
						method : 'GET',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								var node = collarbMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var expandable = !node.attributes.leaf;
								var iconCls='';
								if(node.attributes.nt==1){
									iconCls='icon-approval_tasks';
								}else{
									iconCls='icon-terminatedTask';
									if(node.attributes.auto==1){
										iconCls='icon-automation_tasks';
									}
								}
								var newNode = collarbMain.leftTree.getLoader()
										.createNode({
											id : node.id,
											text : node.text,
											iconCls : iconCls,
											statusId : obj.statusId,
											allowDrop : obj.allowDrop,
											dataType:'TaskDataType',
											allowDrag : false,
											nt : node.attributes.nt,
											approval : node.attributes.approval,
											chargedManId : node.attributes.chargedManId,
											projectId : node.attributes.projectId,
											leaf : node.attributes.leaf,
											expandable : expandable
										});
								var parentNode = node.parentNode;
								var nextNode = node.nextSibling;
								var previousNode = node.previousSibling;
								if (nextNode != null) {
									node.remove();
									parentNode.insertBefore(newNode, nextNode);
								} else {
									if (previousNode == null) {
										var tempNode = new Ext.tree.TreeNode({
													id : new Date().toString()
												});
										parentNode.appendChild(tempNode);
										node.remove();
										parentNode.appendChild(newNode);
										tempNode.remove();
									} else {
										node.remove();
										parentNode.appendChild(newNode);
									}
								}

								collarbMain.leftTree.fireEvent('beforeclick',
										newNode);// 刷新当前节点
								collarbMain.leftTree.fireEvent('click',
										newNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								if (!parentNode.isExpanded()) {
									parentNode.expand();
								}
							} else {
								collarbMain.refresh();
								Ext.MessageBox.show({
											title : '提示',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
							}
							terminateMask.hide();

						},
						failure : function(options, response) {
							terminateMask.hide();
						},
						params : {
							node : leftNavigationTree.nodeId
						}
					});
				}
			});
}

/**
 * bug编号34
 * bug信息（复制一个进行中的自动化任务，粘贴后，鼠标再原任务和粘贴任务直接来回点击，状态就会混乱）
 * @author wangyf
 * 
 * re edit by suny
 * 来回点击的时样式变化与此无关
 * 
 */
function updateTreeNode(node, obj) {
	node.beginUpdate();
	var el = node.getUI().getIconEl();
	Ext.Element.fly(el).removeClass(node.attributes.iconCls);
	if (node.attributes.id == 0) {
		node.setText(leftNavigationTree.rootName);
		Ext.Element.fly(el).addClass(leftNavigationTree.rootIconCls);
	} else {
		if (obj.success) {
			node.setText(obj.text);
			Ext.Element.fly(el).addClass(obj.iconCls);
			Ext.apply(node.attributes, obj);
		} else {
			if (obj.iconCls != null) {
				Ext.Element.fly(el).addClass(obj.iconCls);
				obj.iconCls = node.attributes.iconCls;
			}
		}
		
	}
	// node.getUI().getTextEl().innerHTML = obj.text;
	node.endUpdate();
}
function escSpanTag(text) {
	var reg = /<(span)\s*[^<>]*>([^<>]*)<\/\1\s*>/;
	while (reg.exec(text)) {
		text = text.replace(reg, "$2");
	}
	return text;
}
