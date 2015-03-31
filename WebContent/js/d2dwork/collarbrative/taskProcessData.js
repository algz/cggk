Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var taskProcessTab = {

};

taskProcessTab.init = function(oNode, container) {
	Ext.QuickTips.init();
	if (null == Ext.get(container)) {
		return false;
	}
	var url;
	var rootId;
	var container = container;
	if ("p" == oNode.id.substring(0, 1)) {// 根节点为项目
		rootId = oNode.id;
		url = '../JSON/project_coopProjectRemote.getTaskTreeUseByCoop?id=0&name='
				+ rootId;
	} else if ("c" == oNode.id.substring(0, 1)) {// 根节点为项目夹
		rootId = oNode.id;
		url = '../JSON/project_coopProjectRemote.getProjectListByGroupId?id='
				+ rootId;
	} else {
		rootId = oNode.id;
		url = '../JSON/webremote_DataObjectRemote.getAllDataObject?id='
				+ rootId.substring(1);
	}
	Ext.get(container).dom.innerHTML = '<input type="hidden" id="' + container
			+ '_projectId_hidden" style="display:none;" value="' + rootId
			+ '"/><input type="hidden" id="' + container
			+ '_isleaf_hidden" style="display:none;" value="' + oNode.isLeaf()
			+ '"/>';
	var root = [{
				text : oNode.text,
				id : rootId,
				iconCls : oNode.attributes.iconCls
			}];

	var columnModel = [{
				header : ''+getResource('resourceParam480')+'',
				width : 280,
				dataIndex : 'name'
			}, {
				header : ''+getResource('resourceParam481')+'',
				width : 120,
				dataIndex : 'dataObjectType'
			}, {
				header : ''+getResource('resourceParam849')+'',
				width : 100,
				dataIndex : 'inout'
			}, {
				header : ''+getResource('resourceParam850')+'',
				width : 80,
				dataIndex : 'publish',
				renderer : function(value, p, record) {
					if (record.id.indexOf("io") == 0) {
						return value == 1 ? ""+getResource('resourceParam512')+"" : ""+getResource('resourceParam510')+"";
					} else {
						return "";
					}
				}
			}, {
				header : ''+getResource('resourceParam853')+'',
				width : 50,
				dataIndex : 'dimension'
			}, {
				header : ''+getResource('resourceParam511')+'',
				width : 150,
				dataIndex : 'value',
				renderer : function(value, p, record) {
					return '<span title=' + value + '>' + value + '</span>';
				}
			}, {
				header : '<img src="../images/pin2.png" width=16 height=16 />',
				width : 25,
				dataIndex : 'value',
				renderer : function(value, p, record) {
					if (record.datatype == "file") {
						if (record.dataObjectId != "") {
							return '<img src="../images/patch2.gif" width=16 height=16 style="float:right;" title="'+getResource('resourceParam604')+'" onclick=operateData.uploadFile("'
									+ record.dataObjectId
									+ '","taskProcessTab") />';
						} else {
							return '<img src="../images/patch2.gif" width=16 height=16 style="float:right;" title="'+getResource('resourceParam604')+'" onclick=operateData.beforeUploadFile("'
									+ record.id + '","taskProcessTab") />';
						}
					} else {
						return "";
					}
				}
			}, {
				width : 20
			}];
	// 调用开始
	var colTree = new commonColumnsTree();
	colTree.init(url, root, columnModel);

	colTree.columnTree.on("beforeexpandnode", function(node) {
		var projectIdHidden = Ext.get(container + "_projectId_hidden").dom.value;
		var isLeafHidden = Ext.get(container + "_isleaf_hidden").dom.value;
		if (node.id != projectIdHidden) {
			if ('p' == node.id.substring(0, 1)) {// 展开项目下的任务
				var url1 = '../JSON/project_coopProjectRemote.getTaskTreeUseByCoop?id=0&name='
						+ node.id;
				colTree.fnBeforeExpandNode(node, url1);
			}
			if ('c' == node.id.substring(0, 1)) {// 展开项目夹下的项目和子项目夹
				var url1 = '../JSON/project_coopProjectRemote.getProjectListByGroupId?id='
						+ node.id;
				colTree.fnBeforeExpandNode(node, url1);
			}
			if ('t' == node.id.substring(0, 1)) {// 展开任务下的子任务和输入输出项
				nodeId = node.id.substring(1, node.id.length)
				var url1 = '../JSON/webremote_DataObjectRemote.getAllDataObject?id='
						+ nodeId;
				colTree.fnBeforeExpandNode(node, url1);
			}
			if ('io' == node.id.split("_")[0]) {// 展开子输入输出项下的子输入输出项
				if (node.attributes.dataObjectId == "") {
					var url1 = '../JSON/webremote_DataObjectRemote.getChildDataObjectEntity';
					var baseparams = {
						dataObjectType : node.attributes.dataObjectRealType,
						customTypeItemID : node.attributes.customTypeItemID,
						dataCenterId : node.attributes.dataCenterId,
						value : node.attributes.value,
						parentDataObjectId : node.attributes.parentDataObjectId,
						dataObjectId : node.attributes.dataObjectId,
						isAdded : node.attributes.added,
						isRef : node.attributes.isRef,
						dimension : node.attributes.dimension,
						orderNumber : node.attributes.orderNumber,
						dataObjectName : node.attributes.dataObjectName,
						customTypeParentID : node.attributes.customTypeParentID
					}
				} else {
					var url1 = '../JSON/webremote_DataObjectRemote.getChildDataObject';
					var baseparams = {
						id : node.attributes.dataObjectId
					}
				}
				colTree.fnBeforeExpandNode(node, url1, baseparams);
			}
		}

	});

	colTree.columnTree.on('click', function(node, event) {
				if (node.id.indexOf('io') == 0) {
					Ext.getCmp('taskProcessTabUpdate').enable();
					if (node.attributes.isRef != undefined
							&& node.attributes.isRef.indexOf("Parent") < 0) {
						Ext.getCmp('taskProcessTabDel').disable();
					} else {
						Ext.getCmp('taskProcessTabDel').enable();
					}
					Ext.getCmp('taskProcessTabAdd').disable();
				} else {
					if (node.id.indexOf('t') == 0) {
						Ext.getCmp('taskProcessTabAdd').enable();
					} else {
						Ext.getCmp('taskProcessTabAdd').disable();
					}
					Ext.getCmp('taskProcessTabUpdate').disable();
					Ext.getCmp('taskProcessTabDel').disable();
				}
			});
	colTree.columnTree.render(Ext.get(container).dom);
	colTree.columnTree.collapseAll();
	taskProcessTab.columnTree = colTree.columnTree;
}
