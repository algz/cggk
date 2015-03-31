var cateInstanceTree = {
	checkinstancenode : null
}
cateInstanceTree.init = function(id, text, categoryid, datacenterid, icon,
		revision, rootVisible) {
	// alert(id + ":" + categoryid + ":" + datacenterid + ":" + icon + ":"
	// + revision);
	var root = new Ext.tree.AsyncTreeNode({
				id : id,
				text : text,
				// expandable : true,
				icon : '../base/icons/p2m/project.png'
			});

	Ext.apply(root.attributes, {
				categoryid : categoryid,
				dataCenterID : datacenterid,
				revision : revision
			});
	cateInstanceTree.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataInstanceTree',
				baseParams : {
					nodeid : ''
				}
			});
	cateInstanceTree.attributeTree = new Ext.tree.TreePanel({
				bodyStyle : 'height:100%',
				rootVisible : true,
				useArrows : false,
				// autoShow : true,
				animate : false,
				enableDD : false,
				containerScroll : false,
				frame : false,
				loader : cateInstanceTree.treeloader,
				disabled : false,
				rootVisible : rootVisible,
				autoScroll : true,
				root : root,
				listeners : {
					'load' : function(node) {
						// var opertationVo = Seam.Remoting
						// .createType("com.luck.itumserv.base.privilege.OperationVo");
						// opertationVo.setDataId(node.id);
						// opertationVo.setIsPermitted(false);
						// opertationVo.setIsRefused(false);
						// opertationVo.setFlag(false);
						// opertationVo.setCompulsory(false);
						// callSeam("privilege_DataPrivilegeRemote",
						// "getDataCenterDataManipultations", [opertationVo],
						// function(result) {
						// var obj = Ext.util.JSON.decode(result);
						// if (obj.view == false) {
						// node.setText('<font color=gray>' + node.text
						// + '</font>');
						// }
						// });
					}
				}
			});

	// cateInstanceTree.attributeTree.getRootNode().expand();
	cateInstanceTree.attributeTree.on("click", function(node) {
		if (node.id.indexOf('content') != -1) {
			return;
		}
		cateInstanceTree.checkinstancenode = node;
		var nodeid = node.id;
		// formEditTab.datacenterid
		// formEditTab.categoryInstanceID
		// extendForm(formEditTab.datacenterid, formEditTab.categoryInstanceID);
		var f = Ext.getCmp('formEditTab');
		if (f) {
			Ext.getCmp('formEditTab').removeAll();
		}

		// Seam.Component.getInstance("datacenter_DataCenterRemote")
		// .getAllChildCateByFath(nodeid, function(result) {
		// alert(result);
		cateInstancePanel.updateFirstAttriTab(nodeid);
			// });
		});

	// cateInstanceTree.root.expand(true);
	return cateInstanceTree.attributeTree;
}
// cateInstanceTree.appendChild = function(node) {
// cateInstanceTree.checkinstancenode.appendChild(node);
// }
// cateInstanceTree.updatenode = function(ids, texts, desc) {
// var node = cateInstanceTree.attributeTree.getNodeById(ids);
// node.setText(texts);
// Ext.apply(node.attributes, {
// description : desc
// });
// }
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
		// cateInstanceTree.clickNode(node);
	}

	cateInstanceTree.treeloader.load(node, function() {

		callback();
			// node.expand(true);

		});
}

cateInstanceTree.setEnable = function(enable) {
	if (enable) {
		cateInstanceTree.attributeTree.enable();
		cateInstanceTree.attributeTree.fireEvent('click',
				cateInstanceTree.checkinstancenode == null
						? cateInstanceTree.attributeTree.getRootNode()
						: cateInstanceTree.checkinstancenode);
	} else {
		cateInstanceTree.attributeTree.disable();
	}
}
cateInstanceTree.clickNode = function(node) {
	if (node) {
		cateInstanceTree.attributeTree.fireEvent('click', node);
	}
}
