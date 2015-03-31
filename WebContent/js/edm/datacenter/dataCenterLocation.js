var dataCenterLocation = {
	node : null,
	root : null
}
// 项目id
dataCenterLocation.init = function(nodeid, dataEntityId, id, callback) {
	if ("" == nodeid || null == nodeid) {
		dataCenterLocation.root = new Ext.tree.AsyncTreeNode({
					id : 'root',
					text : ''+getResource('resourceParam561')+'',
					expandable : true,
					disiabled : false

				});
	} else {
		dataCenterLocation.root = new Ext.tree.AsyncTreeNode({
					id : "appoint",
					text : ''+getResource('resourceParam561')+'',
					expandable : true,
					disiabled : false

				});
	}
	dataCenterLocation.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataCenterLocationTree',
				baseParams : {
					nodeid : dataEntityId,
					datacenterid : id
				}
			});
	dataCenterLocation.treeloader.on('beforeload', function(treeLoader, node) {
		if (node.id == "appoint") {
			dataCenterLocation.treeloader.dataUrl = '../JSON/datacenter_DataCenterRemote.getDataCenterLocationTree';
			dataCenterLocation.treeloader.baseParams.nodeid = nodeid;
			dataCenterLocation.treeloader.baseParams.datacenterid = id;
		} else if (node.id == "root") {
			dataCenterLocation.treeloader.dataUrl = '../JSON/datacenter_DataCenterRemote.getDataCenterLocationTree';
			dataCenterLocation.treeloader.baseParams.nodeid = dataEntityId;
			dataCenterLocation.treeloader.baseParams.datacenterid = id;
		} else {
			dataCenterLocation.treeloader.dataUrl = '../JSON/datacenter_DataCenterRemote.getDataCenterLocationTree';
			dataCenterLocation.treeloader.baseParams.nodeid = dataEntityId;
			dataCenterLocation.treeloader.baseParams.datacenterid = id;
		}
	})
	dataCenterLocation.treepanel = new Ext.tree.TreePanel({
				bodyStyle : 'height:100%',
				border : false,
				useArrows : false,
				autoShow : true,
				animate : false,
				enableDD : false,
				containerScroll : false,
				frame : false,
				loader : dataCenterLocation.treeloader,
				disabled : false,
				rootVisible : false,
				autoScroll : true,
				root : dataCenterLocation.root
			});
	dataCenterLocation.treepanel.on("click", function(node) {
				dataCenterLocation.node = node;
			});

	// dataCenterLocation.root.expand(true);
	var locationWin = new Ext.Window({
				title : ''+getResource('resourceParam1727')+'',
				width : 313,
				height : 400,
				layout : 'fit',
				modal : true,
				closeAction : 'close',
				items : [dataCenterLocation.treepanel],
				buttons : [{
					text : ''+getResource('resourceParam479')+'',
					handler : function(button) {
						button.disable();
						var checkedNodes = dataCenterLocation.treepanel
								.getSelectionModel().getSelectedNode();
						callback(locationWin, checkedNodes);
						button.enable();
					}
				}, {
					text : ''+getResource('resourceParam7007')+'',//取消
					handler : function() {
						locationWin.close();
					}
				}]

			});
	locationWin.show();
}
dataCenterLocation.childTreeInit = function(node) {
	var conn = synchronize.createXhrObject();
	var url = "../JSON/datacenter_DataCenterRemote.getDataCategoryMetaById?categoryid="
			+ node.attributes.categoryid;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;

	var obj = Ext.util.JSON.decode(respText);
	var categoryName = obj.categoryName;
	var treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getObjectTree',
				baseParams : {
					nodeid : ''
				}
			})

	objectTree = new Ext.tree.TreePanel({

				id : 'objectTree',
				border : false,
				rootVisible : true,
				useArrows : false,
				autoShow : true,
				autoScroll : true,
				animate : false,
				enableDD : false,
				height : 270,
				frame : false,
				disabled : false,
				root : {
					id : node.attributes.categoryid,
					text : obj.categoryName,
					disabled : true
					// ,
					// icon : node.getUI().getIconEl().src
				},
				loader : cateInstancePanel.treeloader,

				listeners : {
	// 'checkchange' : function(node, checked) {
				// if (checked) {
				// node.getUI().addClass('complete');
				// } else {
				// node.getUI().removeClass('complete');
				// }
				// }
				},
				buttons : []

			});

	function getparent(node, nodeid) {
		if (node.id.split(",")[0] == nodeid) {
			var a = new Date();
			var b = new Date();

			treeloader.baseParams.nodeid = a.toString() + "," + b.toString();
		} else if (node == objectTree.getRootNode()) {
			return node;
		} else {
			return getparent(node.parentNode, nodeid);
		}

	}
	objectTree.on("click", function(node) {
			});

	treeloader.on("beforeload", function(treeloader, node) {
				treeloader.baseParams.nodeid = "";
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					getparent(node.parentNode, realnode);
					// var pnode = null;
					// for (var i = 0; i < depth; i++) {
					// pnode = checknode(node, nodeid);
					//
					// }
				}
			})
	objectTree.getRootNode().expand(true, true, function() {
				var childs = objectTree.getRootNode().childNodes;
				for (var i = 0; i < childs.length; i++) {
					if (childs[i].attributes.type == 1) {
						childs[i].enable();
					}
				}
			});

	var win = new Ext.Window({
				bbar : [{}, {
							text : ''+getResource('resourceParam7007')+'',//取消
							listeners : {
								'click' : function() {
									win.close();
								}
							}
						}],
				width : 300,
				modal : true,
				items : [objectTree]

			});
	win.show();
	// cateInstancePanel.objectTree.getRootNode().disable();

}
