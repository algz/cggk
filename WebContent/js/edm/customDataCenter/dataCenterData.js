var dataCenterData = {

}
dataCenterData.init = function(id, callback) {
	dataCenterData.root = new Ext.tree.AsyncTreeNode({
				id : 'root',
				text : '',
				expandable : true

			});

	dataCenterData.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataInstanceTree',
				baseParams : {
					nodeid : '',
					datacenterid : id
				}
			})
	dataCenterData.instanceTree = new Ext.tree.TreePanel({
				border : false,
				rootVisible : true,
				useArrows : false,
				autoShow : true,
				animate : false,
				enableDD : false,
				containerScroll : false,
				frame : false,
				loader : dataCenterData.treeloader,
				disabled : false,
				autoScroll : true,
				rootVisible : false,
				root : dataCenterData.root
			});
	dataCenterData.instanceTree.on("click", function(node) {
				dataCenterData.checkinstancenode = node;
				var nodeid = node.id;
				var newPanel = dataCenterData.initTab(nodeid);
				var tpanel = dataCenterData.attriPanel.items.get(0);
				if (tpanel) {
					dataCenterData.attriPanel.remove(tpanel);
				}

				dataCenterData.attriPanel.add(newPanel);
				dataCenterData.attriPanel.doLayout();

			});

	dataCenterData.root.expand(true);
	// var panel = categoryData.init();

	var temppanel = new Ext.TabPanel({
				activeItem : 0,
				items : [new Ext.Panel({
							title : ''+getResource('resourceParam474')+'',
							html : ''+getResource('resourceParam1726')+''
						})]
			});
	dataCenterData.attriPanel = new Ext.Panel({
				layout : 'fit',
				region : 'center',
				items : [temppanel]

			});
	dataCenterData.mainpanel = new Ext.Panel({
				layout : 'border',
				items : [new Ext.Panel({
									region : 'west',
									width : 200,
									layout : 'fit',
									items : [dataCenterData.instanceTree]
								}), dataCenterData.attriPanel]
			});
	var locationWin = new Ext.Window({
				title : ''+getResource('resourceParam474')+'',
				width : 696,
				height : 425,
				layout : 'fit',
//				resizable : false,
				modal : true,
				items : [dataCenterData.mainpanel],
				buttons : [{
							text : ''+getResource('resourceParam479')+'',
							handler : function() {
								callback(locationWin)
							}
						}]
			});
	locationWin.show();
}
dataCenterData.initTab = function(nodeid) {
	var attributeTab = new Ext.TabPanel({
		activeItem : 0,
		border : false,
		defaults : {
			autoScroll : true
		},
		enableTabScroll : true

			// ,
			// plugins : new Ext.ux.TabCloseMenu()

		});
	Seam.Component.getInstance("datacenter_DataCenterRemote")
			.getAllChildCateByFath(nodeid, function(result) {
				var obj = Ext.util.JSON.decode(result)
				if (obj.length > 0) {
					// dataCenterData.attributeTab.items.each(function(item) {
					// if (item.closable) {
					// dataCenterData.attributeTab.remove(item);
					// }
					// });
				}
				for (var i = 0; i < obj.length; i++) {
					var dataObjectTab = categoryData.init(
							obj[i]['categoryInstanceName'],
							obj[i]['categoryInstanceID'], i,
							obj[i]['dataCenterID']);
					if (i == 0) {
						attributeTab.add(dataObjectTab).show();
					} else {
						attributeTab.add(dataObjectTab)
					}
					attributeTab.doLayout();
				}
			});

	return attributeTab;
}
