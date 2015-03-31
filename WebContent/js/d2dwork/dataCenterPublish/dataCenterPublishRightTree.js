var dataCenterPublishRightTree = {};
dataCenterPublishRightTree.init = function() {
	dataCenterPublishRightTree.tag = new Ext.tree.TreePanel({
		id : 'datacenter-tree1',
		region : 'east',
		split : true,
		 height : 800,
		title :  '' + getResource('resourceParam9087') + '' +getResource('resourceParam561')+"",
		margins : '0 5 0 5',
		loader : new Ext.tree.TreeLoader({
			baseAtts : new Ext.tree.AsyncTreeNode({
				draggle : false
			}),
			dataUrl : '../JSON/DataCenterViewService.getDataCentersJson'
		// baseParams :{name:null,instcode:null}
		}),
		animate : true,
		lines : true,
		autoScroll : true,
		enableDD : false,
		containerScroll : true,
		draggable : false,
		tbar : [{
			id : 'refresh',
			text : ''+getResource('resourceParam1081')+'',
			disabled : false,
			handler : dcrefresh
		}]
			// dropConfig : {
			// appendOnly : true
			// }
	});
	// add a tree sorter in folder mode
	new Ext.tree.TreeSorter(dataCenterPublishRightTree.tag, {
		folderSort : true
	});

	dataCenterPublishRightTree.root = new Ext.tree.AsyncTreeNode({
		draggable : false,
		text :  '' + getResource('resourceParam9087') + '' +getResource('resourceParam561')+'',
		id : '0',
		iconCls : 'top',
		leaf : false
	});
	dataCenterPublishRightTree.tag.setRootNode(dataCenterPublishRightTree.root);

	dataCenterPublishRightTree.tag.on('beforeload', function(node) {
		var iname = node.id.substring(3);
		if (node.id == '0') {// 获取数据中心集合
			dataCenterPublishRightTree.tag.loader.dataUrl = "../JSON/DataCenterViewService.getDataCentersJson?dataCenterID=0";
		} else if (node.id.indexOf('_dc') == 0) {// 获取数据中心下面的第一级数据集、数据项
			dataCenterPublishRightTree.tag.loader.dataUrl = "../JSON/DataCenterViewService.getDataObjectsByDC?dataCenterID="
					+ iname;
		} else if (node.id.indexOf('_do') == 0) {// 获取数据对象的下一级数据对象
			dataCenterPublishRightTree.tag.loader.dataUrl = "../JSON/DataCenterViewService.getDataObjectsJsonByParentDO?dataObjectID="
					+ iname;
		}
	});

	dataCenterPublishRightTree.tag.on('click', function(node) {
		var dataObjectID = node.id.substring(3);
		dataCenterPublishMain.rightDataObjectID = dataObjectID;// 把节点的id传到对象里面去
		dataCenterPublishMain.fullRightNodeID = node.id;

		if (node.id == '0') {// 数据中心集合
			dataCenterPublishMain.rightDataType = '_dcSet';
		} else if (node.id.indexOf('_dc') == 0) {// 数据中心
			dataCenterPublishMain.rightDataType = '_dc';
			dataCenterPublishMain.dataCenterID = node.id.substring(3);
		} else if (node.id.indexOf('_do') == 0) {// 数据对象
			if (node.attributes.dataType == 'dataset') {
				dataCenterPublishMain.rightDataType = 'dataset';
			} else {
				dataCenterPublishMain.rightDataType = 'dataitem';
			}
			dataCenterPublishMain.dataCenterID = getDataCenter(node);
		}

	});

	// 遍历树节点，找到节点所属的数据中心节点的id
	function getDataCenter(node) {
		while (node.parentNode.id != '0') {
			node = node.parentNode;
		}
		return node.id;
	}
	// 手动刷新节点
	function dcrefresh() {
		var Rightnode = dataCenterPublishRightTree.tag
				.getNodeById(dataCenterPublishMain.fullRightNodeID);
		if (Rightnode != null && Rightnode != undefined) {//如果用户没有选择节点，则什么都不做
			if (Rightnode.isExpanded()) {
				dataCenterPublishRightTree.tag.fireEvent('beforeload',
						Rightnode);
				dataCenterPublishRightTree.tag.loader.load(Rightnode);
				if (Rightnode.isLeaf() && Rightnode.item(0) != null)
					Rightnode.leaf = false;
				Rightnode.expand();
			} else {
				Rightnode.expand();
			}
		}
	}

	return dataCenterPublishRightTree.tag;
}
