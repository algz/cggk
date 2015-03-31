var EDMDataCenterTree = {
	currendchecknode : null
}

function addnode(id, text, datacenterid, categoryid, iconpath) {
	var node = new Ext.tree.TreeNode({
				id : id,
				text : text,
				icon : iconpath
			});
	Ext.apply(node.attributes, {
				datacenterid : datacenterid,
				categoryid : categoryid
			});
	EDMDataCenterTree.datacentertree.getRootNode().appendChild(node);
}
function getNodeById(nodeid) {
	if (nodeid != null && nodeid != "") {
		return EDMDataCenterTree.datacentertree.getNodeById(nodeid);
	}
}
function clickNode(nodeid) {
	if (undefined == EDMDataCenterTree.datacentertree.getNodeById(nodeid)) {
		EDMDataCenterTree.datacentertree.getRootNode().reload();
		EDMDataCenterTree.datacentertree.getRootNode().expand(true, true,
				function() {
					EDMDataCenterTree.datacentertree.fireEvent('click',
							getNodeById(nodeid));
				});
	} else {

		EDMDataCenterTree.datacentertree
				.fireEvent('click', getNodeById(nodeid));
	}
}
function reload(fn) {

	EDMDataCenterTree.datacentertree.getRootNode().reload(fn);
}
function refresh(fn) {

	if (EDMDataCenterTree.currendchecknode.text.indexOf('*') == -1) {
		EDMDataCenterTree.currendchecknode.setText(node.text
				+ "<font color=red>*</font>");
	}
}
function removenode(nodeid) {
	var nodes = nodeid.split(",");
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i] != null && nodes[i] != "") {
			var node = EDMDataCenterTree.datacentertree.getNodeById(nodes[i]);
			EDMDataCenterTree.datacentertree.getRootNode().removeChild(node);
		}
	}
}
function getCheckNode() {
	return EDMDataCenterTree.currendchecknode;
}
function setEnable(value) {
	if (value) {
		EDMDataCenterTree.datacentertree.enable();
	} else {
		EDMDataCenterTree.datacentertree.disable();
	}
}
var historyViewModel = false;
EDMDataCenterTree.init = function() {
	var root = new Ext.tree.TreeNode({
				// id : 'root',
				text : '' + getResource('resourceParam561') + '',
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
	EDMDataCenterTree.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataCenterTree'
			})

	var baseWareHouse = new Ext.tree.TreeNode({
				text : '' + getResource('resourceParam562') + '',
				leaf : true,
				id : 'baseWareHouse'
			});
	var fileWareHouse = new Ext.tree.TreeNode({
				text : '' + getResource('resourceParam564') + '',
				leaf : true,
				id : 'fileWareHouse'
			});
	var planWareHouse = new Ext.tree.TreeNode({
				text : '' + getResource('resourceParam563') + '',
				leaf : true,
				id : 'planWareHouse'
			});
	EDMDataCenterTree.datacentertree = new Ext.tree.TreePanel({
				renderTo : 'defaultDataCenter',
				id : 'datacentertree',
				root : {
					icon : 'icons/p2m/dataCenter.png',
					id : 'root',
					nodeType : 'async',
					text : '' + getResource('resourceParam561') + ''
				},
				border : false,
				rootVisible : true,
				loader : EDMDataCenterTree.treeloader
			});
	EDMDataCenterTree.datacentertree.getRootNode().expand(true);
	// EDMDataCenterTree.datacentertree.getRootNode().appendChild(baseWareHouse);
	// EDMDataCenterTree.datacentertree.getRootNode().appendChild(fileWareHouse);
	// EDMDataCenterTree.datacentertree.getRootNode().appendChild(planWareHouse);
	EDMDataCenterTree.datacentertree.on("click", function(node) {
				EDMDataCenterTree.currendchecknode = node;

				var temp = {

				};

				if (node.attributes.type == 4) {
					temp.name = "dataCenterWareHouse";
					temp.text = node.attributes.realName;
					temp.id = node.id
					menu_click(temp);
				} else if (node.attributes.type == 40) {
					temp.name = "table";
					temp.text = node.attributes.realName;
					temp.id = node.id
					menu_click(temp);
				} else if (node.id == "planWareHouse"
						|| node.id == "fileWareHouse"
						|| node.id == "baseWareHouse") {
					temp.name = "customWareHouse";
					temp.text = node.text;
					temp.id = node.id;
					menu_click(temp);
				} else if ("root" == node.id) {
					EDMDataCenterTree.datacentertree.getRootNode().reload();
					EDMDataCenterTree.datacentertree.getRootNode().expand(true);

					temp.name = 'defaultDataCenter';
					temp.text = '' + getResource('resourceParam561') + '';
					menu_click(temp);
				} else {

					temp.name = "datainstance";
					temp.text = node.attributes.realName;
					temp.id = node.id
					menu_click(temp);
				}

			});
	// datacentertree.render("");
}
EDMDataCenterTree.add = function(node) {
	alert(parent.westpanel.panel.innerHTML);
	// var root = EDMDataCenterTree.datacentertree.getRootNode();
	// root.appendChild(node);
}
