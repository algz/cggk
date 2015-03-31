var dataCenterLocation = {
	node : null
}
// 项目id
dataCenterLocation.init = function(dataEntityId, id, callback) {
	dataCenterLocation.root = new Ext.tree.AsyncTreeNode({
				id : 'root',
				text : '' + getResource('resourceParam561') + '',
				expandable : true,
				disiabled : false

			});
	dataCenterLocation.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataCenterLocationTree',
				baseParams : {
					nodeid : dataEntityId,
					datacenterid : id
				}
			})
	dataCenterLocation.treepanel = new Ext.tree.TreePanel({
				bodyStyle : 'height:100%',
				border : false,
				rootVisible : true,
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

	dataCenterLocation.root.expand(true);
	var locationWin = new Ext.Window({
				title : '' + getResource('resourceParam1727') + '',
				width : 313,
				height : 400,
				layout : 'fit',
				modal : true,
				items : [dataCenterLocation.treepanel],
				buttons : [{
					text : '' + getResource('resourceParam479') + '',
					handler : function() {
						var checkedNodes = dataCenterLocation.treepanel
								.getChecked();
						callback(locationWin, checkedNodes);
					}
				}, {
					text : '' + getResource('resourceParam7007') + '',//取消
					handler : function() {
						locationWin.close();
					}
				}]

			});
	locationWin.show();
}
