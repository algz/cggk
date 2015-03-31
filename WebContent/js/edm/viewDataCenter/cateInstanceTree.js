var cateInstanceTree = {
	checkinstancenode : null,
	queryflag : 1,
	rootid : null,
	rooticon : null,
	roottext : null,
	view : '0'
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
					nodeid : ''
				}
			});
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
		animate : false,
		enableDD : false,
		containerScroll : false,
		frame : false,
		loader : cateInstanceTree.treeloader,
		disabled : false,
		rootVisible : true,
		root : cateInstanceTree.root,
		autoScroll : true,
		listeners : {
			'load' : function(node) {}
		}
	});
	cateInstanceTree.attributeTree.on("click", function(node) {

				cateInstanceTree.checkinstancenode = node;
				var nodeid = node.id;
				var hasModifyPrivilege = true;

				Seam.Component.getInstance("datacenter_DataCenterRemote")
						.getAllChildCateByFath(nodeid, function(result) {
									cateInstancePanel
											.updateFirstAttriTab(nodeid);
								});

			});

	cateInstanceTree.root.expand();
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
	cateInstanceTree.attributeTree.getRootNode().expand();
	cateInstanceTree.attributeTree.fireEvent('click',
			cateInstanceTree.attributeTree.getRootNode());

}

cateInstanceTree.reload = function() {
	if (null != cateInstanceTree.checkinstancenode) {

		// 
		cateInstanceTree.checkinstancenode.expand();
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