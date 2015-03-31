var viewView = {
	viewid : ''
}
viewView.init = function() {

	var treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/dataobject_DataObjectRemote.viewView',
				baseParams : {
					nodeid : ''
				}
			})
	function getparent(node, nodeid) {
		if (node.id.split(",")[0] == nodeid) {
			var a = new Date();
			var b = new Date();

			treeloader.baseParams.nodeid = a.toString() + "," + b.toString();
		} else if (node == checkTree.getRootNode()) {
			return node;
		} else {
			return getparent(node.parentNode, nodeid);
		}

	}
	treeloader.on("beforeload", function(treeloader, node) {
				treeloader.baseParams.nodeid = "";
				treeloader.baseParams.path = node.attributes.treePath;
				treeloader.baseParams.viewid = viewView.viewid;
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					getparent(node.parentNode, realnode);
				}
			})
	function getCheck(node) {
		if (node == checkTree.getRootNode()) {
			return node.attributes.checked;
		} else if (node.attributes.checked == true) {
			return true;
		} else {

			return getCheck(node.parentNode);
		}

	}
	function getChildCheck(node) {
		var result = false;
		if (node.attributes.checked == true) {
			result = true;
		} else if (node.hasChildNodes()) {
			node.eachChild(function(n) {
						if (getChildCheck(n)) {
							result = true;
							return;
						}
					})
		} else {
			result = false;
		}
		return result;
	}
	var viewn = new Ext.form.TextField({});
	var viewd = new Ext.form.TextField({});
	var checkTree = new Ext.tree.TreePanel({
		border : false,
		rootVisible : true,
		useArrows : true,
		autoShow : true,
		animate : false,
		enableDD : false,
		autoScroll : true,
		frame : false,
		loader : treeloader,
		disabled : false,
		root : {
			id : 'root',
			checked : false,
			text : '' + getResource('resourceParam615') + ''
		},

		listeners : {
			'activate' : function(panel) {
				return;
				checkTree.getRootNode()
						.setText(dataObjectAttribute.attributeTree
								.getRootNode().text);
				checkTree.getRootNode().setId(dataObjectAttribute.attributeTree
						.getRootNode().id);
				checkTree.getRootNode().getUI().getIconEl().src = dataObjectAttribute.attributeTree
						.getRootNode().getUI().getIconEl().src;
				Ext.apply(checkTree.getRootNode().attributes, {
					treePath : dataObjectAttribute.attributeTree.getRootNode().id
				});

				checkTree.getRootNode().reload();
				checkTree.getRootNode().expand(true, true);
			},
			'checkchange' : function(node, checked) {

				if (checked == false) {

					node.getUI().checkbox.checked = true;
					node.attributes.checked = true;
				} else {

					node.getUI().checkbox.checked = false;
					node.attributes.checked = false;

				}
			}
		},
		// ,
		// tbar : ['&nbsp;&nbsp;名称:&nbsp;&nbsp;', viewn,
		// '&nbsp;&nbsp;描述:&nbsp;&nbsp;', viewd],
		bbar : ['->', {
			text : ''+getResource('resourceParam944')+'',
			listeners : {
				'click' : function() {
					dataObjectAttribute.viewPanel1.layout.setActiveItem(0);
					dataObjectAttribute.viewGrid.getStore().on('beforeload',
							function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataobject_DataObjectRemote.queryViewList'
								})
								options.params = Ext.apply(options.params, {
											categoryId : dataObjectAttribute.categoryId
													.getValue()
										});

							});

					myGrid.loadvalue(dataObjectAttribute.viewGrid.getStore(), {
								start : 0,
								limit : 25
							}, dataObjectAttribute.baseargs);

				}
			}
		}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;']

	});
	checkTree.on("click", function(node) {
			});
	function checknode(node, nodeid) {
		return node.parentNode;
	}
	checkTree.on("beforeexpandnode", function(node) {
				treeloader.baseParams.nodeid = "";
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					var pnode = null;
				}
			})

	return checkTree;

}