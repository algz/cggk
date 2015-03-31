var customEDMDataCenterTree = {
	currendchecknode : null
}
function getCustomCheckNode() {
	return customEDMDataCenterTree.currendchecknode;
}
function customReload(fn) {

	customEDMDataCenterTree.datacentertree.getRootNode().reload(fn);
}
function getCustomNodeById(nodeid) {
	if (nodeid != null && nodeid != "") {
		return customEDMDataCenterTree.datacentertree.getNodeById(nodeid);
	}
}
function setCustomEnable(value) {
	if (value) {
		customEDMDataCenterTree.datacentertree.enable();
	} else {
		customEDMDataCenterTree.datacentertree.disable();
	}
}
var customHistoryViewModel = false;
customEDMDataCenterTree.init = function() {
	var root = new Ext.tree.TreeNode({
				// id : 'root',
				text : '014'+getResource('resourceParam561')+'',
				icon : 'icons/p2m/dataCenter.png'
			});

	// dataType.appendChild(baseType);
	// dataType.appendChild(extendType);
	// dataType.appendChild(physicsType);
	// dataType.appendChild(formType);
	// var dataClassification = new Ext.tree.TreeNode({
	// id : 'dataClassification',
	// text : '数据分类'
	// });
	// var dataObject = new Ext.tree.TreeNode({
	// id : 'dataObject',
	// text : '数据对象'
	// });
	// var warehouseObject = new Ext.tree.TreeNode({
	// id : 'warehouseObject',
	// text : '库对象'
	// });
	// root.appendChild(dataType);
	// root.appendChild(dataClassification);
	// root.appendChild(dataObject);
	// root.appendChild(warehouseObject);
	customEDMDataCenterTree.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getCustomDataCenterTree'
			})

	var baseWareHouse = new Ext.tree.TreeNode({
				text : ''+getResource('resourceParam562')+'',
				leaf : true,
				id : 'baseWareHouse',
				// iconCls : 'icon-baseWareHouse-16'
				icon : '../base/icons/edm/baseWarehouse1.png'
			});
	var fileWareHouse = new Ext.tree.TreeNode({
				text : ''+getResource('resourceParam564')+'',
				leaf : true,
				id : 'fileWareHouse',
				icon : '../base/icons/edm/fileWareHouse1.png'
			});
	var planWareHouse = new Ext.tree.TreeNode({
				text : ''+getResource('resourceParam563')+'',
				leaf : true,
				id : 'planWareHouse',
				icon : '../base/icons/edm/plan1.png'
			});
	customEDMDataCenterTree.datacentertree = new Ext.tree.TreePanel({
				renderTo : 'customDataCenter',
				// id : 'customDataCenter',
				root : {
					icon : 'icons/p2m/dataCenter.png',
					id : 'root',
					nodeType : 'async',
					text : ''+getResource('resourceParam561')+''
				},
				border : false,
				rootVisible : true,

				loader : customEDMDataCenterTree.treeloader
			});

	// customEDMDataCenterTree.datacentertree.getRootNode()
	// .appendChild(baseWareHouse);
	// customEDMDataCenterTree.datacentertree.getRootNode()
	// .appendChild(fileWareHouse);
	// customEDMDataCenterTree.datacentertree.getRootNode()
	// .appendChild(planWareHouse);
	customEDMDataCenterTree.datacentertree.getRootNode().expand(true);
	customEDMDataCenterTree.datacentertree.on("click", function(node) {
				customEDMDataCenterTree.currendchecknode = node;

				var temp = {

				};
				if (node.id == "fileWareHouse" || node.id == "baseWareHouse") {
					temp.name = "customWareHouse";
					temp.text = node.text;
					temp.id = node.id;
					menu_click(temp);
				} else if ("root" == node.id) {
					return;
					temp.name = 'defaultDataCenter';
					temp.text = ''+getResource('resourceParam561')+'';
					menu_click(temp);
				} else  {
					// temp.name = "defaultDataCenter";
					temp.name = "customDatainstance";
					temp.text = node.text;
					temp.id = node.id
					menu_click(temp);
				}

			});
}
