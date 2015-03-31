var updateProjectExtend = {};
updateProjectExtend.init = function() {
	var updateTaskMask = new Ext.LoadMask(document.body, {
		msg : '正在更新'+getResource('resourceParam463')+'，请稍候。。。'
	});
	updateProjectExtend.myform = new Ext.form.FormPanel({
				autoScroll : true,
				autoWidth : true,
				fileUpload : true,
				border : false,
				bodyStyle : 'padding:10px 0px 10px 10px',
				items : [{
							layout : 'column',
							border : false,
							items : [{
										border : false,
										width : 325,
										layout : 'form',
										items : [{
													xtype : 'button',
													style : 'margin-left: 275px;',
													text : ''+getResource('resourceParam1152')+'',
													handler : formerPage
												}]
									}, {
										border : false,
										layout : 'form',
										width : 60,
										items : [{
													xtype : 'button',
													text : getResource('resourceParam5036'),
													handler : formsubmit
												}]
									}]
						}

				]

			});

	function formerPage() {
		updateProjectCard.card.layout.setActiveItem(0);

	}
	function formsubmit() {
		if (updateProjectCard.extendform.getForm().isValid()) {
			updateTaskMask.show();
			var form = updateProjectCard.extendform.getForm().getFieldValues();
			var send = Ext.encode(form);
			updateProjectCard.extendform.getForm().submit({
//				url : "../JSON/FileUploadServlet",
				url : "../FILEUP/",
				method : 'POST',
//				waitMsg : '正在修改，请稍候。。。',
//				waitTitle : '修改项目',
				failure : function(form, action) {
				var obj = Ext.util.JSON
				.decode(action.response.responseText);
		var filepath = action.response.responseText;
		Ext.Ajax.request({
			url : "../JSON/project_ProjectRemote.updateProject",
			method : 'POST',
			success : function(response, options) {
				var mes = Ext.util.JSON
						.decode(response.responseText);
				var node = collarbMain.leftTree
						.getNodeById(leftNavigationTree.nodeId);
				if (mes.success == true) {
					collarbMain.refresh();
					collarbMain.cardPanel.getLayout().setActiveItem(0);
					updateProjectBasic.flag = false;// 更新成功则类型标志位重新置为false
//					var expandable = !mes.leaf;
//					var newNode = new Ext.tree.TreeNode({
//						id : mes.id,
//						text : mes.text,
//						iconCls : mes.iconCls,
//						statusId : mes.statusId,
//						allowDrop : mes.allowDrop,
//						leaf : mes.leaf,
//						chargedManId : mes.chargedManId,
//						projectId : mes.projectId,
//						expandable : expandable
//					});
//					var parentNode = node.parentNode;
//					var nextNode = node.nextSibling;
//					var previousNode = node.previousSibling;
//
//					if (nextNode == null && previousNode == null) {
//						// 点击的节点 没有任何兄弟节点
//						var tempNode = new Ext.tree.TreeNode({
//									id : new Date().toString()
//								});
//						parentNode.appendChild(tempNode);
//						node.remove();
//						parentNode.appendChild(newNode);
//						tempNode.remove();
//					} else {
//						node.remove();
//						if (nextNode != null) {
//							parentNode.insertBefore(newNode,
//									nextNode);
//						} else {
//							parentNode.appendChild(newNode);
//						}
//					}
//					newNode.on('beforeexpand', function(node) {
//						collarbMain.leftTree.getLoader().load(node);
//					});
//					collarbMain.leftTree.fireEvent('beforeclick',
//							newNode);// 刷新当前节点
//					collarbMain.leftTree
//							.fireEvent('click', newNode,Ext.EventObject.ctrlKey);// 刷新当前节点
				} else {
					collarbMain.refresh();
					collarbMain.cardPanel.getLayout().setActiveItem(0);
//					collarbMain.leftTree.fireEvent('click', node,Ext.EventObject.ctrlKey);// 刷新当前节点
					Ext.MessageBox.show({
								title : ''+getResource('resourceParam575')+'',
								msg : mes.error,
								minWidth : 100,
								icon : Ext.MessageBox.ERROR,
								buttons : Ext.MessageBox.OK
							});
				}
				updateTaskMask.hide();
			},
			params : {
				node : leftNavigationTree.nodeId,// 选中的projectid
				name : updateProjectBasic.name1,
				type : updateProjectBasic.type1,
				department : updateProjectBasic.department1,
				user : updateProjectBasic.user1,
				createtime : updateProjectBasic.createtime1
						.toString(),
				status : updateProjectBasic.status1,
				start : updateProjectBasic.start1,
				end : updateProjectBasic.end1,
				datacenterids : updateProjectBasic.datacenter1,
				securityDegree:updateProjectBasic.securityDegree1,
				textarea : updateProjectBasic.textarea1,
				extendform : send,
				projectcategoryid : updateProjectBasic.projectcategoryid,
				filepath : filepath,
				flag : updateProjectBasic.flag,
				why:updateProjectBasic.why
				// 标记是否更换了类型
			}
		});
				},
				success : function(form, action) {
					var obj = Ext.util.JSON
							.decode(action.response.responseText);
					var filepath = action.response.responseText;
					Ext.Ajax.request({
						url : "../JSON/project_ProjectRemote.updateProject",
						method : 'POST',
						success : function(response, options) {
							var mes = Ext.util.JSON
									.decode(response.responseText);
							var node = collarbMain.leftTree
									.getNodeById(leftNavigationTree.nodeId);
							if (mes.success == true) {
								collarbMain.refresh();
								collarbMain.cardPanel.getLayout().setActiveItem(0);
								updateProjectBasic.flag = false;// 更新成功则类型标志位重新置为false
//								var expandable = !mes.leaf;
//								var newNode = new Ext.tree.TreeNode({
//									id : mes.id,
//									text : mes.text,
//									iconCls : mes.iconCls,
//									statusId : mes.statusId,
//									allowDrop : mes.allowDrop,
//									leaf : mes.leaf,
//									chargedManId : mes.chargedManId,
//									projectId : mes.projectId,
//									expandable : expandable
//								});
//								var parentNode = node.parentNode;
//								var nextNode = node.nextSibling;
//								var previousNode = node.previousSibling;
//
//								if (nextNode == null && previousNode == null) {
//									// 点击的节点 没有任何兄弟节点
//									var tempNode = new Ext.tree.TreeNode({
//												id : new Date().toString()
//											});
//									parentNode.appendChild(tempNode);
//									node.remove();
//									parentNode.appendChild(newNode);
//									tempNode.remove();
//								} else {
//									node.remove();
//									if (nextNode != null) {
//										parentNode.insertBefore(newNode,
//												nextNode);
//									} else {
//										parentNode.appendChild(newNode);
//									}
//								}
//								newNode.on('beforeexpand', function(node) {
//									collarbMain.leftTree.getLoader().load(node);
//								});
//								collarbMain.leftTree.fireEvent('beforeclick',
//										newNode);// 刷新当前节点
//								collarbMain.leftTree
//										.fireEvent('click', newNode,Ext.EventObject.ctrlKey);// 刷新当前节点
							} else {
								collarbMain.refresh();
								collarbMain.cardPanel.getLayout().setActiveItem(0);
//								collarbMain.leftTree.fireEvent('click', node,Ext.EventObject.ctrlKey);// 刷新当前节点
								Ext.MessageBox.show({
											title : ''+getResource('resourceParam575')+'',
											msg : mes.error,
											minWidth : 100,
											icon : Ext.MessageBox.ERROR,
											buttons : Ext.MessageBox.OK
										});
							}
							updateTaskMask.hide();
						},
						params : {
							node : leftNavigationTree.nodeId,// 选中的projectid
							name : updateProjectBasic.name1,
							type : updateProjectBasic.type1,
							department : updateProjectBasic.department1,
							user : updateProjectBasic.user1,
							createtime : updateProjectBasic.createtime1
									.toString(),
							status : updateProjectBasic.status1,
							start : updateProjectBasic.start1,
							end : updateProjectBasic.end1,
							datacenterids : updateProjectBasic.datacenter1,
							securityDegree:updateProjectBasic.securityDegree1,
							textarea : updateProjectBasic.textarea1,
							extendform : send,
							projectcategoryid : updateProjectBasic.projectcategoryid,
							filepath : filepath,
							flag : updateProjectBasic.flag,
							why:updateProjectBasic.why
							// 标记是否更换了类型
						}
					});

				}
			});

		}
	}
	return updateProjectExtend.myform;
}
