var cateInstanceTree = {
	checkinstancenode : null
}
cateInstanceTree.init = function(id, text, categoryid, datacenterid, icon,
		revision, realName) {

	cateInstanceTree.root = new Ext.tree.AsyncTreeNode({
				id : id,
				text : text,
				expandable : true,
				icon : icon,
				categoryName : realName
			});
	Ext.apply(cateInstanceTree.root.attributes, {
				categoryid : categoryid,
				dataCenterID : datacenterid,
				revision : revision
			});
	cateInstanceTree.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getCustomDataInstanceTree',
				baseParams : {
					nodeid : ''
				}
			});
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
				root : cateInstanceTree.root
			});
	cateInstanceTree.attributeTree.on("click", function(node) {
				cateInstanceTree.checkinstancenode = node;
				var nodeid = node.id;
				if (window.parent.customHistoryViewModel) {
					var vo = Seam.Component
							.newInstance("CategoryInstanceVersionVo");
					vo.setCategoryInstanceID(nodeid);
					vo.setFixedRevision(node.attributes.revision);
					Seam.Component.getInstance("datacenter_DataCenterRemote")
							.getAllChildCateByFathByRevision(vo,
									function(result) {
										cateInstancePanel
												.updateFirstAttriTab(nodeid);
									});
				} else {
					Seam.Component.getInstance("datacenter_DataCenterRemote")
							.getAllChildCateByFath(nodeid, function(result) {
										cateInstancePanel
												.updateFirstAttriTab(nodeid);
									});
				}

			});

	cateInstanceTree.root.expand(true);
	return cateInstanceTree.attributeTree;
}
cateInstanceTree.appendChild = function(node) {
	cateInstanceTree.checkinstancenode.appendChild(node);
}
cateInstanceTree.updatenode = function(ids, texts, desc) {
	var node = cateInstanceTree.attributeTree.getNodeById(ids);
	node.setText(texts);
	Ext.apply(node.attributes, {
				description : desc
			});
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
	if (enable) {
		cateInstanceTree.attributeTree.enable();
		cateInstanceTree.attributeTree.fireEvent('click',
				cateInstanceTree.checkinstancenode == null
						? cateInstanceTree.root
						: cateInstanceTree.checkinstancenode);
	} else {
		cateInstanceTree.attributeTree.disable();
	}
}
