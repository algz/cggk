var dataCenterMain = {};

dataCenterMain.init = function() {
	Ext.QuickTips.init();

	dataCenterMain.leftTree = dataCenterLeftTree.init();
	dataCenterMain.mainContent = dataCenterMainContent.init();
	var treeLoader = dataCenterMain.leftTree.getLoader();

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [{
					region : 'center',
					layout : 'border',
					items : [{
								region : 'west',
								// title : '数据导航',
								width : 230,
								height : 400,
								// collapsible : true,
								items : [dataCenterMain.leftTree]
							}, {
								region : 'center',
								items : [dataCenterMain.mainContent]
							}]
				}]
	});
	treeLoader.on('beforeload', function(treeLoader, node) {
		if (node.id.indexOf("odata") < 0) {
			treeLoader.dataUrl = '../JSON/webremote_DataCenterRemote.getFirstChildByCenterId';
			treeLoader.baseParams.id = node.id;
		} else {
			treeLoader.dataUrl = '../JSON/webremote_DataCenterRemote.getChildDataobjectByPage';
			treeLoader.baseParams.id = node.attributes.dataObjectId;
			treeLoader.baseParams.dataObjectType = node.attributes.dataObjectType;
			treeLoader.baseParams.isRef = node.attributes.isRef;
			treeLoader.baseParams.dataCenterId = node.attributes.dataCenterId;
			treeLoader.baseParams.parentDataObjectId = node.attributes.parentDataObjectId;
			treeLoader.baseParams.customTypeItemID = node.attributes.customTypeItemID;
			treeLoader.baseParams.basicIsRef = 0;
		}
		treeLoader.baseParams.isQuote = node.attributes.isQuote;
	});
	dataCenterMain.leftTree.on("contextmenu", function(node) {
		node.select();
			// menu.show(node.ui.getAnchor())
		})
	var menu = new Ext.menu.Menu({
				items : [{
							text : 'aaa'
						}]
			})
	dataCenterMain.columnTree = dataCenterColumnTree.init()
	dataCenterMain.leftTree.on("click", function(node) {
		var RootId = node.id;
		var gridPanel = Ext.get("dataCenterGridPanel");
		if (null != gridPanel) {
			gridPanel.remove();
		}
		var rootNode = new Ext.tree.AsyncTreeNode({
					id : node.id,
					text : 'Root',
					iconCls : 'root'
				})

		var columnModel = [{
					header : ''+getResource('resourceParam480')+'',
					width : 220,
					dataIndex : 'dataObjectName'
				}, {
					header : ''+getResource('resourceParam853')+'',
					width : 100,
					dataIndex : 'dimension'
				}, {
					header : ''+getResource('resourceParam481')+'',
					width : 150,
					dataIndex : 'dataObjectTypeName'
				}, {
					header : ''+getResource('resourceParam511')+'',
					width : 150,
					dataIndex : 'value'
				}, {
					header : ''+getResource('resourceParam857')+'',
					width : 180,
					dataIndex : ''
				}];
		var url;
		if (node.id.indexOf("odata") < 0) {
			url = "../JSON/webremote_DataCenterRemote.getFirstChildByCenterIdForC?isQuote="
					+ node.attributes.isQuote
					+ "&startIndex=-1&count=0&id="
					+ node.id;
		} else {
			url = '../JSON/webremote_DataCenterRemote.getChildDataobjectByPageForC?basicIsRef='
					+ node.attributes.basicIsRef
					+ '&count=0&customTypeItemID='
					+ node.attributes.customTypeItemID
					+ '&dataCenterId='
					+ node.attributes.dataCenterId
					+ '&isQuote='
					+ node.attributes.isQuote
					+ '&dataObjectType='
					+ node.attributes.dataObjectType
					+ '&id='
					+ node.attributes.dataObjectId
					+ '&isRef='
					+ node.attributes.isRef
					+ '&parentDataObjectId='
					+ node.attributes.parentDataObjectId + '&startIndex=-1';
		}
		var colTree = new commonColumnsTree();
		colTree.init(url, rootNode, columnModel, false);
		colTree.columnTree.on("beforeexpandnode", function(node) {
			if (node.id.indexOf("odata") >= 0) {
				var url1 = '../JSON/webremote_DataCenterRemote.getChildDataobjectByPageForC?basicIsRef='
						+ node.attributes.basicIsRef
						+ '&count=0&customTypeItemID='
						+ node.attributes.customTypeItemID
						+ '&dataCenterId='
						+ node.attributes.dataCenterId
						+ '&isQuote='
						+ node.attributes.isQuote
						+ '&dataObjectType='
						+ node.attributes.dataObjectType
						+ '&id='
						+ node.attributes.dataObjectId
						+ '&isRef='
						+ node.attributes.isRef
						+ '&parentDataObjectId='
						+ node.attributes.parentDataObjectId + '&startIndex=-1';
				colTree.fnBeforeExpandNode(node, url1);
			}
		});
		colTree.columnTree.on("contextmenu", function(node) {
					node.select();
					//menu.show(node.ui.getAnchor())
				})
		Ext.getDom("dataCenterColumnTreePanel").innerHTML = "";
		colTree.columnTree.render(Ext.getDom("dataCenterColumnTreePanel"));
	})
}
Ext.onReady(dataCenterMain.init, dataCenterMain, true);
