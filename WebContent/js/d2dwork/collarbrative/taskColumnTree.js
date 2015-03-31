Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var taskColumnTree = {

};

taskColumnTree.init = function(oNode, pid, container) {
	Ext.QuickTips.init();
	if (null == Ext.get(container)) {
		return false;
	}

	var container = container;
	var rootId = pid;
	var url = '../JSON/project_coopProjectRemote.getTaskdataForCoop?id=' + pid.substring(1,pid.length)
			+ "." + oNode.id;
	Ext.get(container).dom.innerHTML = '<input type="hidden" id="' + container
			+ '_projectId_hidden" style="display:none;" value="' + rootId
			+ '"/><input type="hidden" id="' + container
			+ '_isleaf_hidden" style="display:none;" value="' + oNode.isLeaf()
			+ '"/>';
	var root = [{
				text : oNode.text,
				id : rootId,
				iconCls : 'top'
			}];

	var columnModel = [{
				header : ''+getResource('resourceParam480')+'',
				width : 250,
				dataIndex : 'name'
			}, {
				header : ''+getResource('resourceParam481')+'',
				width : 100,
				dataIndex : 'dataType'
			}, {
				header : ''+getResource('resourceParam511')+'',
				width : 100,
				dataIndex : 'dataValue'
			}, {
				header : ''+getResource('resourceParam1201')+'',
				width : 80,
				dataIndex : 'department'
			}, {
				header : ''+getResource('resourceParam648')+'',
				width : 180,
				dataIndex : 'description'
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
				var url1 = '../JSON/project_coopProjectRemote.getTaskdataForCoop?id='
						+ nodeId;
				colTree.fnBeforeExpandNode(node, url1);
			}
			if ('io' == node.id.split("_")[0]) {// 展开子任务下的子任务和输入输出项
				nodeId = node.id.split("_")[1];
				var url1 = '../JSON/project_coopProjectRemote.getTaskdataObjectForCoop?id='
						+ nodeId;
				colTree.fnBeforeExpandNode(node, url1);
			}
		}

	});

	colTree.columnTree.on('click', function(node, event) {
				// alert(node.attributes.dataType);
				// alert(node.id);
				// alert(node.parentNode.id);
			})
	colTree.columnTree.render(Ext.get(container).dom);
	colTree.columnTree.collapseAll();
}
