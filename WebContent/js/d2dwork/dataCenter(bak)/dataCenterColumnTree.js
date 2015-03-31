var dataCenterColumnTree = {}

dataCenterColumnTree.init = function() {
	var rootNode = new Ext.tree.AsyncTreeNode({
				id : '0',
				text : 'Root',
				iconCls : 'root'
			})

	var columnModel = [{
				header : ''+getResource('resourceParam480')+'',
				width : 250,
				dataIndex : 'dataObjectName'
			}, {
				header : ''+getResource('resourceParam853')+'',
				width : 100,
				dataIndex : 'dimension'
			}, {
				header : ''+getResource('resourceParam481')+'',
				width : 150,
				dataIndex : 'dataObjectType'
			}, {
				header : ''+getResource('resourceParam511')+'',
				width : 150,
				dataIndex : 'value'
			}, {
				header : ''+getResource('resourceParam857')+'',
				width : 180,
				dataIndex : ''
			}];
	var url = "../JSON/webremote_DataCenterRemote.getDataCenterByIndex?startIndex=-1&count=0";

	var colTree = new commonColumnsTree();
	colTree.init(url, rootNode, columnModel, false);

	return dataCenterColumnTree.panel;
}
