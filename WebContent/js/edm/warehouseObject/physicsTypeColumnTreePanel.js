var physicsTypeColumnTreePanel = {};

physicsTypeColumnTreePanel.init = function(dataCenterId, totalWidth) {
	Ext.QuickTips.init();
	
	var dataCenterId = dataCenterId;
	var url = '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterId='
			+ dataCenterId + '&parentDataObjectId=0';

	var root = [{
				text : 'root',
				// uiProvider : Ext.tree.ColumnCheckboxNodeUI,
				id : '0'
			}];
	var columnModel = [{
				header : ''+getResource('resourceParam1258')+'',
				width : 0.40 * totalWidth,
				dataIndex : 'name'
			}, {
				header : ''+getResource('resourceParam481')+'',
				width : 0.15 * totalWidth,
				dataIndex : 'dataObjectTypeName'
			}, {
				header : ''+getResource('resourceParam1282')+'',
				width : 0.15 * totalWidth,
				dataIndex : 'inoutType'
			}, {
				header : ''+getResource('resourceParam648')+'',
				width : 0.25 * totalWidth,
				dataIndex : 'publish',
				renderer : function(value, p, record) {
					if (record.id.indexOf("io") == 0) {
						return value == 1 ? ""+getResource('resourceParam512')+"" : ""+getResource('resourceParam510')+"";
					} else {
						return "";
					}
				}
			}, {
				width : 0.05 * totalWidth
			}];
	// 调用开始
	var colTree = new commonColumnsTree();
	colTree.init(url, root, columnModel, false, true, 600);
	colTree.columnTree.on("beforeexpandnode", function(node) {
		if (node.id != 0) {
			var url1 = '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterId='
					+ node.attributes.dataObjectType + '&parentDataObjectId=0';
			colTree.fnBeforeExpandNode(node, url1);
		}

	});
	physicsTypeColumnTreePanel.columnTree = colTree.columnTree;
	return physicsTypeColumnTreePanel.columnTree;
}

physicsTypeColumnTreePanel.setFormValues = function(rec) {
	var rootNode = physicsTypeColumnTreePanel.columnTree.getRootNode();
	rootNode.setText(rec.get("datatypeName"));
	physicsTypeColumnTreePanel.columnTree.getLoader().dataUrl = '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterId='
			+ rec.get("datatypeId") + '&parentDataObjectId=0';
	rootNode.reload();
}
