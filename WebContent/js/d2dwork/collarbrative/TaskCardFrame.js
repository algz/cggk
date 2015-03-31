var TaskCardFrame = {};

TaskCardFrame.init = function() {

	TaskCardFrame.basicForm = TaskBasicForm.init();
	TaskCardFrame.extendForm = TaskExtendForm.init();

	TaskCardFrame.panel1 = new Ext.Panel({
				title : ''+getResource('resourceParam1200')+'',

				layout : 'fit',
				items : [TaskCardFrame.basicForm]
			});

	TaskCardFrame.panel2 = new Ext.Panel({
				title : ''+getResource('resourceParam1150')+'',
				layout : 'fit',
				items : [TaskCardFrame.extendForm]
			});

	TaskCardFrame.card = new Ext.Panel({
				layout : 'card',
				activeItem : 0,
				height : 300,
				width : 600,
				hidden : true,
				frame : false,
				border : false,
				split : true,
				buttonAlign : 'center',
				items : [

						TaskCardFrame.panel1, TaskCardFrame.panel2

				],

				buttons : [

				{
							id : 'nextstep',
							text : ''+getResource('resourceParam1151')+'',
							hidden : false,
							handler : nextPage
						}, {
							id : 'formerstep',
							text : ''+getResource('resourceParam1152')+'',
							hidden : true,
							handler : formerPage
						}, {
							id : 'submitform',
							text :  '' + getResource('resourceParam9023') + '' , // text : 完成
							hidden : true,
							handler : formsubmit
						}]
			});
	var name, type, department, user, status, start, end, realstart, realend, textarea;
	function nextPage() {
		if (TaskCardFrame.basicForm.getForm().isValid()) {
			Ext.Ajax.request({
						url : '../JSON/task_TaskRemote.getTaskExtendForm',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							// 后台获取的扩展属性的表单
							for (var i = 0; i < obj.length; i++) {
								TaskCardFrame.extendForm.insert(i, obj[i]);
							}
							if (obj.length == 0) {
								Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1148')+'');
							}
							TaskCardFrame.extendForm.doLayout();
							Ext.getCmp('nextstep').setVisible(false);
							Ext.getCmp('submitform').setVisible(true);
							Ext.getCmp('formerstep').setVisible(true);
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							taskcategoryid : [collarbMain.taskcategoryid]
						}
					});

			TaskCardFrame.card.layout.setActiveItem(1);
			try {
				// 传第一个form的data
				name = TaskCardFrame.basicForm.getForm().findField('name')
						.getValue();
				type = TaskCardFrame.basicForm.getForm().findField('category')
						.getValue();
				department = dataCenterBase.codeid;
				user = dataCenterBase.userComb.getValue();
//				status = TaskCardFrame.basicForm.getForm()
//						.findField('taskstatusid').getValue();
				textarea = TaskCardFrame.basicForm.getForm()
						.findField('ttextarea').getValue();
				var start1 = TaskCardFrame.basicForm.getForm()
						.findField('start').getValue();
				start = (new Date(start1)).format('Y-m-d');
				var end1 = TaskCardFrame.basicForm.getForm().findField('end')
						.getValue();
				end = (new Date(end1)).format('Y-m-d');
				var realstart1 = TaskCardFrame.basicForm.getForm()
						.findField('realstart').getValue();
				realstart = (new Date(realstart1)).format('Y-m-d');
				var realend1 = TaskCardFrame.basicForm.getForm()
						.findField('realend').getValue();
				realend = (new Date(realend1)).format('Y-m-d');

			} catch (e) {
			} finally {
			}
		}
	}
	function formerPage() {
		Ext.getCmp('nextstep').setVisible(true);
		Ext.getCmp('submitform').setVisible(false);
		Ext.getCmp('formerstep').setVisible(false);

		TaskCardFrame.card.layout.setActiveItem(0);
		TaskCardFrame.panel2.remove(TaskCardFrame.extendForm);
		TaskCardFrame.extendForm = TaskExtendForm.init();
		TaskCardFrame.panel2.items.add(TaskCardFrame.extendForm);
		TaskCardFrame.panel2.doLayout();

	}
	function formsubmit() {
		if (TaskCardFrame.extendForm.getForm().isValid()) {
			var form = TaskCardFrame.extendForm.getForm().getValues();
			var send = Ext.encode(form);
			Ext.Ajax.request({
				url : "../JSON/project_ProjectRemote.saveTask",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success == true) {

						if (collarbTabpanel.kind == 'sub') {
							// 创建子任务
							var currentNode = collarbTabpanel.tasktree
									.getNodeById(collarbTaskTree.nodeId);
							var newNode = new Ext.tree.TreeNode({
										id : obj.nodeId,
										text : name,
										attributes : '0',
										iconCls : 'icon-planningTask',
										leaf : true
									});
							currentNode.appendChild(newNode);
							currentNode.expand();
						} else if (collarbTabpanel.kind == 'same') {
							// 创建同级任务
							var currentNode = collarbTabpanel.tasktree
									.getNodeById(collarbTaskTree.nodeId);
							var parentNode = currentNode.parentNode;
							var newNode = new Ext.tree.TreeNode({
										id : obj.nodeId,
										text : name,
										attributes : '0',
										iconCls : 'icon-planningTask',
										leaf : true
									});
							var nextNode = currentNode.nextSibling;
							if (nextNode != null) {
								parentNode.insertBefore(newNode, nextNode);
							} else {
								parentNode.appendChild(newNode);
							}
						}
						var newAddNode = collarbTabpanel.tasktree
								.getNodeById(obj.nodeId);
						collarbTabpanel.tasktree.fireEvent('click', newAddNode);// 点击该node
						newAddNode.select();
					} else {
						// text 9029--失败，请重新创建！
						Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1200')+ '' + getResource('resourceParam9029') + '' );
					}
					// 显示task tab属性
					collarbCenter.etabpanel.setVisible(true);
					collarbTabpanel.taskCardFrame.setVisible(false);
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					project : collarbMain.leafId,// 所属的project id,start
					// with 'p'
					method : collarbTabpanel.kind,// 同级任务，或子任务
					node : collarbTaskTree.nodeId,
					name : name,
					type : type,
					department : department,
					user : user,
					status : status,
					start : start,
					end : end,
					realstart : realstart,
					realend : realend,
					textarea : textarea,
					extendform : send,
					taskcategoryid : collarbMain.taskcategoryid
				}
			});
		}
	}

	return TaskCardFrame.card;
}
