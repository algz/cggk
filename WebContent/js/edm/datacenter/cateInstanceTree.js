var cateInstanceTree = {
	checkinstancenode : null,
	queryflag : 1,
	rootid : null,
	rooticon : null,
	roottext : null,
	view : '0',
	refchecknode : null
}
cateInstanceTree.init = function(id, text, categoryid, datacenterid, icon,
		revision, realName) {
	// alert(text);
	cateInstanceTree.rootid = id;
	cateInstanceTree.roottext = text;
	cateInstanceTree.rooticon = icon;
	cateInstanceTree.root = new Ext.tree.AsyncTreeNode({
				id : id,
				text : text,
				expandable : true,
				icon : icon,
				categoryidpath : ''
			});
	Ext.apply(cateInstanceTree.root.attributes, {
				categoryid : categoryid,
				dataCenterID : datacenterid,
				revision : revision,
				categoryName : realName
			});
	cateInstanceTree.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataInstanceTree',
				baseParams : {
					nodeid : '',
					node : '',
					tempNode : '',
					isref : 0
				}
			});
	cateInstanceTree.treeloader.on("beforeload", function(treeloader, node) {

				if (node.attributes.isref == 1) {
					cateInstanceTree.treeloader.baseParams.tempNode = node.id
							.substring(0, node.id.indexOf("#"));
					cateInstanceTree.treeloader.baseParams.isref = 1;

				} else {
					cateInstanceTree.treeloader.baseParams.isref = 0;
				}
			})
	var name = new Ext.form.TextField({
				width : 110
			});
	cateInstanceTree.setTop = function() {
		// cateInstanceTree.rootid =
		// cateInstanceTree.attributeTree.getRootNode().id
		// cateInstanceTree.roottext = cateInstanceTree.attributeTree
		// .getRootNode().text
		// cateInstanceTree.rooticon = cateInstanceTree.attributeTree
		// .getRootNode().attributes.icon
		if (cateInstanceTree.checkinstancenode == cateInstanceTree.attributeTree
				.getRootNode()) {
			return;
		}
		if (null == cateInstanceTree.checkinstancenode) {
			Ext.example.msg('' + getResource('resourceParam596') + '', ''
							+ getResource('resourceParam7014') + '');// 提示信息,请选择一个节点
			return;
		}
		cateInstanceTree.attributeTree.getRootNode().getUI().getIconEl().src = cateInstanceTree.checkinstancenode.attributes.icon;
		cateInstanceTree.attributeTree.getRootNode()
				.setText(cateInstanceTree.checkinstancenode.text);
		cateInstanceTree.attributeTree.getRootNode()
				.setId(cateInstanceTree.checkinstancenode.id);
		cateInstanceTree.attributeTree.getRootNode().reload();
		// cateInstanceTree.attributeTree.getRootNode().expand();
		top.setText('' + getResource('resourceParam944') + '');// 返回
		top.setHandler(cateInstanceTree.setBack);

	}
	cateInstanceTree.setBack = function() {

		cateInstanceTree.attributeTree.getRootNode().getUI().getIconEl().src = cateInstanceTree.rooticon;
		cateInstanceTree.attributeTree.getRootNode()
				.setText(cateInstanceTree.roottext);
		cateInstanceTree.attributeTree.getRootNode()
				.setId(cateInstanceTree.rootid);
		cateInstanceTree.attributeTree.getRootNode().reload();
		// cateInstanceTree.attributeTree.getRootNode().expand(true);
		top.setText('' + getResource('resourceParam7015') + '');// 置顶
		top.setHandler(cateInstanceTree.setTop);

	}
	var top = new Ext.Button({
				text : '' + getResource('resourceParam7015') + ''// 置顶
			});
	top.setHandler(cateInstanceTree.setTop);

	cateInstanceTree.attributeTree = new Ext.tree.TreePanel({
		bodyStyle : 'height:100%',
		rootVisible : true,
		useArrows : false,
		autoShow : true,
		tbar : [name, new Ext.Button({
			text : '' + getResource('resourceParam7016') + '',// 检索
			listeners : {
				'click' : function() {
					if ('' != name.getValue()) {
						cateInstanceTree.queryflag = 2;
						var nodeid = "";
						var cnode = null
						if (null == cateInstanceTree.checkinstancenode) {
							cnode = cateInstanceTree.attributeTree.getRootNode();
                            //zhengjg 没有removeAll()方法
                            for(var i=0;i<cnode.childNodes.length; i++)
                            {
                               cnode.removeChild(cnode.childNodes[i]);
                            }
//							cateInstanceTree.attributeTree.getRootNode().removeAll();
							nodeid = cateInstanceTree.attributeTree
									.getRootNode().id;
						} else {
							cnode = cateInstanceTree.checkinstancenode;
                             //zhengjg 没有removeAll()方法
                            for(var i=0;i<cnode.childNodes.length; i++)
                            {
                               cnode.removeChild(cnode.childNodes[i]);
                            }
//							cateInstanceTree.checkinstancenode.removeAll();
							nodeid = cateInstanceTree.checkinstancenode.id;
						}
						Ext.Ajax.request({
							url : '../JSON/datacenter_DataCenterRemote.queryDataInstanceTree',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								for (var i = 0; i < obj.length; i++) {

									var node = new Ext.tree.TreeNode({
												id : obj[i]['id'],
												text : obj[i]['text'],
												leaf : true,
												icon : obj[i]['icon']
											});
									Ext.apply(node.attributes, {
												categoryid : obj[i]['categoryid'],
												type : obj[i]['type'],
												revision : obj[i]['revision'],
												multiplicity : obj[i]['multiplicity'],
												dataCenterID : obj[i]['dataCenterID'],
												qtip : obj[i]['treePath']

											});
									cnode.appendChild(node);
								}
								cnode.expand(true);
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								node : nodeid,
								name : name.getValue()
							}
						});
					} else {
						cateInstanceTree.queryflag = 1;
						cateInstanceTree.attributeTree.getRootNode().reload();
					}

				}
			}
		}), new Ext.Button({
					text : '' + getResource('resourceParam2004') + '',// 展开
					listeners : {
						'click' : function() {
							if (null == cateInstanceTree.checkinstancenode) {
								cateInstanceTree.attributeTree.getRootNode()
										.reload();
								cateInstanceTree.attributeTree.getRootNode()
										.expand(true);

							} else {
								if (cateInstanceTree.queryflag == 2) {
									cateInstanceTree.queryflag = 1;
									cateInstanceTree.attributeTree
											.getRootNode().reload();
									cateInstanceTree.attributeTree
											.getRootNode().expand(true);
								} else {
									cateInstanceTree.checkinstancenode
											.expand(true);

								}
							}
						}
					}
				}), top],
		enableDD : false,
		containerScroll : false,
		frame : false,
		loader : cateInstanceTree.treeloader,
		disabled : false,
		rootVisible : true,
		root : cateInstanceTree.root,
		autoScroll : true,
		listeners : {
			'load' : function(node) {
				var opertationVo = Seam.Remoting
						.createType("com.luck.itumserv.base.privilege.OperationVo");
				opertationVo.setDataId(node.id);
				opertationVo.setIsPermitted(false);
				opertationVo.setIsRefused(false);
				opertationVo.setFlag(false);
				opertationVo.setCompulsory(false);
				callSeam("privilege_DataPrivilegeRemote",
						"getDataCenterDataManipultations", [opertationVo],
						function(result) {
							var obj = Ext.util.JSON.decode(result);
							if (obj.view == false) {
								node.setText('<font color=gray>' + node.text
										+ '</font>');
							}
						});
			}
		}
	});
	cateInstanceTree.attributeTree.on("click", function(node) {
		cateInstanceTree.checkinstancenode = node;
		if (node.attributes.isref == 1) {
			cateInstancePanel.infoLabel.setText(node.attributes.namePath);
		} else {
			cateInstancePanel.infoLabel.setText("");
		}
		var nodeid = node.id;
		var hasModifyPrivilege = true;
		var opertationVo = Seam.Remoting
				.createType("com.luck.itumserv.base.privilege.OperationVo");
		opertationVo.setDataId(nodeid);
		opertationVo.setIsPermitted(false);
		opertationVo.setIsRefused(false);
		opertationVo.setFlag(false);
		opertationVo.setCompulsory(false);
		callSeam("privilege_DataPrivilegeRemote",
				"getDataCenterDataManipultations", [opertationVo], function(
						result) {
					var obj = Ext.util.JSON.decode(result);
					if (obj.view == false) {
						Ext.getCmp('cateinssearch').disable();
						Ext.getCmp('cateinshistoryversion').disable();
						node.setText('<font color=gray>' + node.text
								+ '</font>');
					} else {
						Ext.getCmp('cateinssearch').enable();
						Ext.getCmp('cateinshistoryversion').enable();
					}
					if (obj.setpass == false) {
						Ext.getCmp('cateinspassApprove').disable();
					} else {
						Ext.getCmp('cateinspassApprove').enable();
					}
					if (obj.del == false) {
						Ext.getCmp('cateinsdel').disable();
					} else {
						Ext.getCmp('cateinsdel').enable();
					}
					if (obj.approve == false) {
						Ext.getCmp('cateinssubmitApprove').disable();
					} else {
						Ext.getCmp('cateinssubmitApprove').enable();
					}
					if (obj.setprivilege == false) {
						Ext.getCmp('cateinsprivilege').disable();
					} else {
						Ext.getCmp('cateinsprivilege').enable();
					}
					// if(obj.modify==false){
					// Ext.getCmp('addobject').disable();
					// Ext.getCmp('instanceedit').disable();
					// Ext.getCmp('cateinssetversion').disable();
					// hasModifyPrivilege = false;
					// }else{
					// Ext.getCmp('addobject').enable();
					// Ext.getCmp('instanceedit').enable();
					// Ext.getCmp('cateinssetversion').enable();
					// }
					if (obj.modifyobject == false) {
						Ext.getCmp('instanceedit').disable();
						Ext.getCmp('cateinssetversion').disable();
						hasModifyPrivilege = false;
					} else {
						Ext.getCmp('instanceedit').enable();
						Ext.getCmp('cateinssetversion').enable();
					}
					if (obj.addchildobject == false) {
						Ext.getCmp('addobject').disable();
						hasModifyPrivilege = false;
					} else {
						Ext.getCmp('addobject').enable();
					}
					if (window.parent.historyViewModel) {
						Ext.getCmp('cateinssearch').disable();
						Ext.getCmp('cateinspassApprove').disable();
						Ext.getCmp('cateinsdel').disable();
						Ext.getCmp('cateinssubmitApprove').disable();
						Ext.getCmp('cateinsprivilege').disable();
						Ext.getCmp('addobject').disable();
						Ext.getCmp('instanceedit').disable();
						Ext.getCmp('cateinssetversion').disable();
						var vo = Seam.Component
								.newInstance("CategoryInstanceVersionVo");
						vo.setCategoryInstanceID(nodeid);
						vo.setFixedRevision(node.attributes.revision);
						Seam.Component
								.getInstance("datacenter_DataCenterRemote")
								.getAllChildCateByFathByRevision(vo,
										function(result) {
											cateInstancePanel
													.updateFirstAttriTab(nodeid);
										});
					} else {
						Seam.Component
								.getInstance("datacenter_DataCenterRemote")
								.getAllChildCateByFath(nodeid,
										function(result) {
											cateInstancePanel
													.updateFirstAttriTab(nodeid);
										});
					}
				});
	});

	// cateInstanceTree.attributeTree.getRootNode().expand(true);
	return cateInstanceTree.attributeTree;
}
cateInstanceTree.appendChild = function(node) {
	cateInstanceTree.checkinstancenode.appendChild(node);
}
cateInstanceTree.updatenode = function(ids, texts, desc) {
	var node = cateInstanceTree.attributeTree.getNodeById(ids);
	node.setText(texts);
	Ext.apply(node.attributes, {
				description : desc,
				categoryName : texts
			});
}

/**
 * 修改节点文本树形，避免重复加载数据
 * 
 * @param String
 *            ids 当前操作节点ID
 * @param String
 *            text 当前节点编辑后的文本
 * @param String
 *            memo 当前节点编辑后的描述
 * @returns void
 * 
 * @author YangJingang
 * @date 2010-09-06
 */
cateInstanceTree.updatenodetext = function(ids, text, memo) {
	// 确定当前节点
	var node = cateInstanceTree.attributeTree.getNodeById(ids);

	// 获取根节点
	var rootNode = cateInstanceTree.attributeTree.root;

	// 临时变量设置为当前节点
	var tmpNode = node;

	// 最多查找50级
	var maxSearch = 0;
	while (tmpNode != null && maxSearch < 50) {
		var txt = tmpNode.text;

		// 如果是当前节点则需要更新节点文本
		if (maxSearch == 0) {
			txt = txt.replace(/(.+?<)/, text + '<');
		}

		// 标记版次时，如果不包含*号则插入*
		if (txt.indexOf('>*<') == -1) {
			txt = txt + '<font color=red>*</font>';
			tmpNode.setText(txt);
			Ext.apply(node.attributes, {
						description : memo,
						categoryName : txt
					});
		} else {
			// 当前节点已经包含*时
			if (maxSearch == 0) {
				tmpNode.setText(txt);
				Ext.apply(node.attributes, {
							description : memo,
							categoryName : txt
						});
			}
		}

		// 找到当前节点的父节点
		tmpNode = tmpNode.parentNode;

		// 无法确定父节点时结束循环
		if (null == tmpNode)
			break;
		maxSearch++;
	}
}
/**
 * 修改节点文本树形，避免重复加载数据
 * 
 * @param String
 *            ids 当前操作节点ID
 * @param String
 *            text 当前节点编辑后的文本
 * @returns void
 * 
 * @author YangJingang
 * @date 2010-09-06
 */
cateInstanceTree.updateversionsymble = function(node) {
	// 获取根节点
	var rootNode = cateInstanceTree.attributeTree.root;

	// 临时变量设置为当前节点
	var tmpNode = node;

	// 最多查找50级
	var maxSearch = 0;
	while (tmpNode != null && maxSearch < 50) {
		// 找到当前节点的父节点
		tmpNode = tmpNode.parentNode;

		// 无法确定父节点时结束循环
		if (null == tmpNode)
			break;

		var txt = tmpNode.text;

		// 标记版次时，如果不包含*号则插入*
		if (txt.indexOf('>*<') == -1) {
			txt = txt + '<font color=red>*</font>';
			tmpNode.setText(txt);
			Ext.apply(node.attributes, {
						categoryName : txt
					});
		}
	}
	maxSearch++;
	cateInstanceTree.reload();
}

cateInstanceTree.getNodeById = function(id) {
	return cateInstanceTree.attributeTree.getNodeById(id);
}
cateInstanceTree.reloadNode = function(node, revision, callback) {
	if (revision) {
		node.attributes.revision = revision;
		cateInstanceTree.treeloader.on('beforeload', function() {
					this.baseParams.fixedrevision = revision;
					this.baseParams.nodeid = node.id;
				});
	} else {
		cateInstanceTree.treeloader.on('beforeload', function() {
					this.baseParams.nodeid = '';
				});
	}
	cateInstanceTree.treeloader.load(node, function() {
				callback();
				node.expand(true);
			});
}
cateInstanceTree.setEnable = function(enable) {
	if (!cateInstanceTree.attributeTree) {
		return false;
	}
	if (enable) {
		cateInstanceTree.attributeTree.enable();
	} else {
		cateInstanceTree.attributeTree.disable();
	}
}
cateInstanceTree.clickNode = function(node) {
	if (node) {
		cateInstanceTree.attributeTree.fireEvent('click', node);
	}
}

cateInstanceTree.viewView = function(viewName, viewid) {
	cateInstanceTree.treeloader.on('beforeload', function(o, n) {
				this.baseParams.view = '1';
				this.baseParams.viewid = viewid;
				this.baseParams.nodeid = window.parent.getCheckNode().id;
				this.baseParams.categoryidpath = n.attributes.categoryidpath;
				this.baseParams.categoryId = n.attributes.categoryid;

			});
	// cateInstanceTree.attributeTree.getRootNode().setText(viewName);
	cateInstanceTree.originalRootName = cateInstanceTree.attributeTree
			.getRootNode().text;
	cateInstanceTree.attributeTree.getRootNode().setId('view');

	cateInstanceTree.attributeTree.getRootNode().reload();
	cateInstanceTree.attributeTree.getRootNode().expand(true, true, function() {
				var ddd = cateInstanceTree.attributeTree.getRootNode().getUI()
						.getEl();
				ddd.firstChild.style.display = "none"
			});
}
cateInstanceTree.viewViewBack = function() {
	cateInstanceTree.treeloader.on('beforeload', function(o, n) {
				this.baseParams.view = '0';
				this.baseParams.nodeid = "";

			});
	cateInstanceTree.attributeTree.getRootNode()
			.setText(cateInstanceTree.originalRootName);
	cateInstanceTree.attributeTree.getRootNode().setId(window.parent
			.getCheckNode().id);
	cateInstanceTree.attributeTree.getRootNode().reload();
	var ddd = cateInstanceTree.attributeTree.getRootNode().getUI().getEl();
	ddd.firstChild.style.display = ""
	cateInstanceTree.attributeTree.getRootNode().expand(true);
	cateInstanceTree.attributeTree.fireEvent('click',
			cateInstanceTree.attributeTree.getRootNode());

}

cateInstanceTree.reload = function() {
	if (null != cateInstanceTree.checkinstancenode) {

		// 
		cateInstanceTree.checkinstancenode.expand(true);
		// cateInstanceTree.checkinstancenode.reload();
	}
}
cateInstanceTree.updateParent = function(node) {
	if (node == cateInstanceTree.attributeTree.getRootNode()) {
		if (node.text.indexOf('*') == -1) {
			node.setText(node.text + "<font color=red>*</font>");
		}
		return;
	} else {
		if (node.text.indexOf('*') == -1) {
			node.setText(node.text + "<font color=red>*</font>");
		}
		return cateInstanceTree.updateParent(node.parentNode);

	}

}

cateInstanceTree.ref = function(id, text, categoryid, datacenterid, icon,
		revision, realName) {
	var conn = synchronize.createXhrObject();
	var url = "../JSON/datacenter_DataCenterRemote.getInstanceListRecursionDownToUp?categoryInstanceID="
			+ cateInstanceTree.checkinstancenode.id;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	var obj = Ext.util.JSON.decode(respText);
	var disable = false;
	for (var i = 0; i < obj.result.length; i++) {
		if (id == obj.result[i]['categoryInstanceID']) {
			disable = true;
			break;
		}
	}
	var root = new Ext.tree.AsyncTreeNode({
				id : id,
				text : text,
				expandable : true,
				icon : icon,
				disabled : disable,
				categoryidpath : ''
			});
	Ext.apply(root.attributes, {
				categoryid : categoryid,
				dataCenterID : datacenterid,
				revision : revision,
				categoryName : realName
			});
	var treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataInstanceTree',
				baseParams : {
					nodeid : '',
					refnode : cateInstanceTree.checkinstancenode.id,
					tempNode : '',
					isref : 0
				}
			});

	treeloader.on("beforeload", function(treeloader, node) {
				if (node.attributes.isref == 1) {
					treeloader.baseParams.tempNode = node.id.substring(0,
							node.id.indexOf("#"));
					treeloader.baseParams.isref = 1;

				}
			})

	var refTree = new Ext.tree.TreePanel({
				bodyStyle : 'height:100%',
				rootVisible : true,
				useArrows : false,
				autoShow : true,
				animate : false,
				enableDD : false,
				containerScroll : false,
				frame : false,
				loader : treeloader,
				disabled : false,
				rootVisible : true,
				root : root,
				autoScroll : true

			});
	refTree.on("click", function(node) {
				if (node.attributes.isref == 1) {
					return;
				}
				cateInstanceTree.refchecknode = node;
			});

	root.expand(true);
	return refTree;
}