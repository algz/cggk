Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var collarbMain = {

};
collarbMain.init = function() {

	collarbMain.lefttree = collarbleft.init();
	collarbMain.cardframe = collarbCardFrame.init();
	collarbMain.mytab = collarbTabpanel.init();
	collarbMain.privilegeSet = setDataPrivilege.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	collarbMain.approvePanel = approvePanel.init();// 审批面板
	collarbMain.projectIconCls='icon-project';//task 根节点	
	collarbMain.nodeId = 0;// 默认选中根节点,选中的文件夹,如果点文件夹下的工程，则选中该文件夹
	var action = new Ext.Action({
				text : ''+getResource('resourceParam1169')+'',
				handler : function() {
					if (collarbMain.nodeId != null) {
						var contentNode = collarbMain.lefttree
								.getNodeById(collarbMain.nodeId);
						contentNode.expand();// 点击创建时展开当前文件夹
						collarbMain.mytab.setVisible(false);
						collarbMain.privilegeSet.setVisible(false);
						collarbMain.approvePanel.setVisible(false);
						collarbMain.cardframe.setVisible(true);

						Ext.getCmp('pnextstep').setVisible(true);
						Ext.getCmp('psubmitform').setVisible(false);
						Ext.getCmp('pformerstep').setVisible(false);
						collarbCardFrame.card.layout.setActiveItem(0);
						collarbCardFrame.panel2
								.remove(collarbCardFrame.extendform);
						collarbCardFrame.extendform = collarbExtendForm.init();
						collarbCardFrame.panel2.items
								.add(collarbCardFrame.extendform);
						collarbCardFrame.panel2.doLayout();
						collarbCardFrame.form.getForm().reset();
					} else {
						Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam459')+ '' + getResource('resourceParam9025') + '！' ); // text : 一个节点
					}
				}
			});
	var action1 = new Ext.Action({
				text : ''+getResource('resourceParam1166')+'',
				handler : function() {

				}
			});
	// 主面板 的 左侧面板
	collarbMain.westPanel = new Ext.Panel({
				id : 'mwestPanel',
				region : 'west',
				width : 200,
				height : 800,
				autoScroll : true,
				collapsible : true,
				split : true,
				layout:'fit',
				title : ''+getResource('resourceParam724')+'',
				items : [collarbMain.lefttree]
			});
	// 主面板 的 中间面板
	collarbMain.centerPanel = new Ext.Panel({
				id : 'mcenterPanel',
				region : 'center',
				height : 800,
				frame : false,
				collapsible : true,
				// layout : 'fit',
				items : [collarbMain.mytab, collarbMain.cardframe,
						collarbMain.privilegeSet,collarbMain.approvePanel]

			});

	// 主面板
	collarbMain.mainpanel = new Ext.Panel({
				region : 'center',
				layout : 'border', // 布局模式
				items : [collarbMain.westPanel, collarbMain.centerPanel],
				tbar : [{
							id : 'create',
							text : ''+getResource('resourceParam483')+'',
							menu : [action, action1]
						}, '-', {
							id : 'terminate',
							text : ''+getResource('resourceParam1170')+'',
							disabled : true,
							handler : terminate
						}, '-', {
							id : 'delete',
							text : ''+getResource('resourceParam475')+'',
							disabled : true,
							handler : deleteProject
						}, '-', {
							id : 'approve',
							text : ''+getResource('resourceParam1062')+'',
//							disabled : true,
							handler : approveProject
						}, '-', {
							id : 'privilege',
							text : ''+getResource('resourceParam582')+'',
//							disabled : true,
							handler : setProjectPrivileges
						}]
			});

	// 项目送审
	function approveProject() {
		var contentNode = collarbMain.lefttree.getSelectionModel()
				.getSelectedNode();
		if (contentNode == null) {
			Ext.Msg.alert(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1167')+"");// 在点击文件夹节点的时候禁掉“权限菜单”
			return;
		}
		collarbMain.dataid = contentNode.id.substring(1);// 设置项目id
		collarbMain.datatype = '2';// 设置项目类型，这里需要设置为常量

		selectedUserAndRole.refreshGrid();// 刷新操作者grid

		collarbMain.approvePanel.setVisible(true);
		collarbMain.privilegeSet.setVisible(false);
		collarbMain.mytab.setVisible(false);
		collarbMain.cardframe.setVisible(false);
		collarbMain.approvePanel.doLayout();
	}

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [collarbMain.mainpanel]
	});

	// 设置项目权限
	function setProjectPrivileges() {
		var contentNode = collarbMain.lefttree.getSelectionModel()
				.getSelectedNode();

		if (contentNode == null) {
			Ext.Msg.alert(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1167')+"");// 在点击文件夹节点的时候禁掉“权限菜单”
			return;
		}
		collarbMain.dataid = contentNode.id.substring(1);// 设置项目id
		collarbMain.datatype = '2';// 设置项目类型，这里需要设置为常量

		selectedUserAndRole.refreshGrid();// 刷新操作者grid

		collarbMain.privilegeSet.setVisible(true);
		collarbMain.mytab.setVisible(false);
		collarbMain.cardframe.setVisible(false);
		collarbMain.approvePanel.setVisible(false);
		collarbMain.privilegeSet.doLayout();
	}

	function terminate() {
		Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1164')+"", function(btn) {
			if (btn == 'yes') {

				Ext.Ajax.request({
							url : "../JSON/project_ProjectRemote.terminateProject",
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								if (obj.success == true) {
									// Ext.Msg.alert("提示","已终止当前工程");
									var node = collarbMain.lefttree
											.getNodeById(collarbMain.leafId);

									var newNode = new Ext.tree.TreeNode({
												id : node.id,
												text : node.text,
												iconCls : 'icon-terminatedProject',
												leaf : true
											});
									var parentNode = node.parentNode;
									var nextNode = node.nextSibling;
									node.remove();
									if (nextNode != null) {
										parentNode.insertBefore(newNode,
												nextNode);

									} else {
										parentNode.appendChild(newNode);
									}
									collarbMain.lefttree.fireEvent('click',
											newNode);// 刷新当前节点
								} else {
									Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.error);
								}
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								node : collarbMain.leafId
							}
						});
			}
		});
	}

	function deleteProject() {
		Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1165')+"", function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.getProjectInfo",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.vstatus == ''+getResource('resourceParam1117')+'') {
							Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1168')+"!");
						} else if (obj.vstatus == ''+getResource('resourceParam948')+'') {
							Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1163')+"");
						} else {
							Ext.Ajax.request({
								url : "../JSON/project_ProjectRemote.deleteProject",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										var node = collarbMain.lefttree
												.getNodeById(collarbMain.leafId);
										node.remove();
										collarbMain.mytab.setVisible(false);
										collarbMain.cardframe.setVisible(false);
										Ext.getCmp('delete').setDisabled(true);
									} else {
										Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.error);
									}

								},
								disableCaching : true,
								autoAbort : true,
								params : {
									node : collarbMain.leafId
								}
							});// deleteProject

						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						node : collarbMain.leafId
					}
				});// getProjectInfo
			}
		});
	}

}
Ext.onReady(collarbMain.init, collarbMain, true)
