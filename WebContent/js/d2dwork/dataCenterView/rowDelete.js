var rowDelete = {};
rowDelete.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show({
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1265')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
//	var isRef = myGrid.row.get('isRef');
//	if ('ArrayChild' == isRef) {//数组元素
//		Ext.MessageBox.alert('提示', '不能单独删除数组元素。');
//	} else if ('CustomChild' == isRef) {//自定义类型子项,需要进一步确认如何判断是自定义类型的子项？
//		Ext.MessageBox.alert('提示', '不能单独删除自定义数据类型子项。');
//	} 
		// 删除操作    text : 1724--警告！
		var isbox = Ext.MessageBox.confirm( '' + getResource('resourceParam1724') + '' , ''+getResource('resourceParam1264')+'',
				function(btn, text) {
					if (btn == 'yes') {
						var dataObjectID = myGrid.row.get('dataObjectID');
						// 判断是数据中心节点还是数据对象节点
						if (dataCenterViewMain.currentNodeType == '0') {// 删除的是数据中心
							callSeam("DataCenterViewService",
									"deleteDataCenter", [dataObjectID],
									rowDelete.delreturn);
						} else {
							callSeam("DataCenterViewService",
									"deleteDataObject", [dataObjectID],
									rowDelete.delreturn);
						}
					}
				});

}
rowDelete.delreturn = function(result) {
	var sign = result;
	if (sign == "true") {
//		Ext.MessageBox.show( {
//			title : '操作成功',
//			msg : '您选择删除的新闻已被成功删除！',
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.INFO
//		})
		myGrid.row = null;		
	} else {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam651')+'',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	//刷新树和grid节点
	var westTreeNode = dataCenterViewWest.tag.getNodeById(dataCenterViewMain.currentFullNodeId);
	dataCenterViewWest.refreshTreeNode(westTreeNode);
	myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:20},{});

}
