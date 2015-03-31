Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var dataObjectColumnTree = {

};

dataObjectColumnTree.init = function(oNode, container,hasCheckbox,totalWidth,height) {
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
				 + rootId;
		rootId = 't' + rootId;
	}
	Ext.get(container).dom.innerHTML = '<input type="hidden" id="' + container
			+ '_projectId_hidden" style="display:none;" value="' + rootId
			+ '"/><input type="hidden" id="' + container
			+ '_isleaf_hidden" style="display:none;" value="' + oNode.isLeaf()
			+ '"/>';
	var root = [{
				text : oNode.text,
				id : rootId,
				iconCls : oNode.attributes.iconCls,
				uiProvider : Ext.tree.ColumnCheckboxNodeUI,
				value : ''
			}];
	var columnModel = [{
				header : ''+getResource('resourceParam480')+'',
				width : 0.40*totalWidth,
				dataIndex : 'name'
			}, {
				header : ''+getResource('resourceParam481')+'',
				width : 0.10*totalWidth,
				dataIndex : 'dataObjectType'
			}, {
				header : ''+getResource('resourceParam849')+'',
				width : 0.10*totalWidth,
				dataIndex : 'inoutType',
				renderer : function(value, p, record) {
					if(value == 0)
						return ""+getResource('resourceParam494')+"";
					if(value == 1)
						return  ""+getResource('resourceParam1066')+"";
					if(value == 2)
						return  ""+getResource('resourceParam1065')+"";
					if(value == 3)
						return  ""+getResource('resourceParam1064')+"";
					if(value == 4)
						return  ""+getResource('resourceParam1063')+"";
				}
			}, {
				header : ''+getResource('resourceParam850')+'',
				width : 0.10*totalWidth,
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
				width : 0.05*totalWidth,
				dataIndex : 'dimension'
			}, {
				header : ''+getResource('resourceParam511')+'',
				width : 0.15*totalWidth,
				dataIndex : 'value',
				renderer : function(value, p, record) {
					if (record.datatype == "date") {
						return value;
					} else {
						return '<span title=' + value + '>' + value + '</span>';
					}
				}
			}, {
				header : '<img src="../images/pin2.png" width=16 height=16 />',
				width : 0.05*totalWidth,
				dataIndex : 'value',
				renderer : function(value, p, record) {
					if (record.datatype == "file") {
						if (record.dataObjectId != "") {
							return '<img src="../images/patch2.gif" width=16 height=16 style="float:right;" title="'+getResource('resourceParam604')+'" onclick=operateDataObject.uploadFile("'
									+ record.dataObjectId + '") />';
						} else {
							return '<img src="../images/patch2.gif" width=16 height=16 style="float:right;" title="'+getResource('resourceParam604')+'" onclick=operateDataObject.beforeUploadFile("'
									+ record.id + '") />';
						}
					} else {
						return "";
					}
				}
			}, {
				width : 0.05*totalWidth
			}];
	// 调用开始
	var colTree = new commonColumnsTree();
	colTree.init(url, root, columnModel,true,hasCheckbox,height);
	colTree.columnTree.getRootNode().attributes.chargedManId = oNode.attributes.chargedManId;
	colTree.columnTree.on("beforeexpandnode", function(node) {
		var projectIdHidden = Ext.get(container + "_projectId_hidden").dom.value;
		var isLeafHidden = Ext.get(container + "_isleaf_hidden").dom.value;
		if (node.id != projectIdHidden) {
			if ('p' == node.id.substring(0, 1)) {// 展开项目下的任务
				var url1 = '../JSON/project_coopProjectRemote.getTaskTreeUseByCoop?id=0&name='
						+ node.id;
				colTree.fnBeforeExpandNode(node, url1);
			} else if ('c' == node.id.substring(0, 1)) {// 展开项目夹下的项目和子项目夹
				var url1 = '../JSON/project_coopProjectRemote.getProjectListByGroupId?id='
						+ node.id;
				colTree.fnBeforeExpandNode(node, url1);
			} else if ('io' == node.id.split("_")[0]) {// 展开子输入输出项下的子输入输出项
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
						inout : node.attributes.inout,
						inoutType : node.attributes.inoutType,
						publish : node.attributes.publish,
						customTypeParentID : node.attributes.customTypeParentID
					}
				} else {
					var url1 = '../JSON/webremote_DataObjectRemote.getChildDataObject';
					var baseparams = {
						inout : node.attributes.inout,
						inoutType : node.attributes.inoutType,
						publish : node.attributes.publish,
						id : node.attributes.dataObjectId
					}
				}
				colTree.fnBeforeExpandNode(node, url1, baseparams);
			} else {// 展开任务下的子任务和输入输出项
				nodeId = node.id.substring(1, node.id.length)
				var url1 = '../JSON/webremote_DataObjectRemote.getAllDataObject?id='
						+ nodeId;
				colTree.fnBeforeExpandNode(node, url1);
			}
		}

	});

	colTree.columnTree.render(Ext.get(container).dom);
	colTree.columnTree.collapseAll();
	dataObjectColumnTree.columnTree = colTree.columnTree;
	return dataObjectColumnTree.columnTree;
}
