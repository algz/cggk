// 任务数据
var taskdata = {
	panel : null,
	taskdatapanel : null,
	columnTree : null
}
taskdata.panel = function(taskid) {

	Ext.QuickTips.init();
	var root = [{
				text : ''+getResource('resourceParam852')+'',
				id : '0',
				hidden : true,
				iconCls : 'top'
			}];
	var url = '../JSON/webremote_DataObjectRemote.getAllDataObject?id='
			+ taskid + '&a=' + new Date();

	var columnModel = [{
				header : ''+getResource('resourceParam480')+'',
				width : 250,
				dataIndex : 'dataObjectName'
			}, {
				header : ''+getResource('resourceParam481')+'',
				width : 150,
				dataIndex : 'dataObjectType'
			}, {
				header : ''+getResource('resourceParam849')+'',
				width : 150,
				dataIndex : 'inout'
			}, {
				header : ''+getResource('resourceParam850')+'',
				width : 150,
				dataIndex : 'publish',
				renderer : function(value, p, record) {
					return value == 1 ? ""+getResource('resourceParam512')+"" : ""+getResource('resourceParam510')+"";
				}
			}, {
				header : ''+getResource('resourceParam853')+'',
				width : 150,
				dataIndex : 'dimension'
			}, {
				header : ''+getResource('resourceParam511')+'',
				width : 150,
				dataIndex : 'value',
				renderer : function(value, p, record) {
						return '<span title='+value+'>'+value+'</span>';
				}
			}, {
				header : '<img src="../images/pin2.png" width=16 height=16 />',
				width : 25,
				dataIndex : 'value',
				renderer : function(value, p, record) {
					if (record.datatype == "file") {
						if(record.dataObjectId != ""){
							return '<img src="../images/patch2.gif" width=16 height=16 style="float:right;" title="'+getResource('resourceParam604')+'" onclick=operateData.uploadFile("'
								+ record.dataObjectId + '","taskdata") />';
						}else{
							return '<img src="../images/patch2.gif" width=16 height=16 style="float:right;" title="'+getResource('resourceParam604')+'" onclick=operateData.beforeUploadFile("'
								+ record.id + '","taskdata") />';
						}
					} else {
						return "";
					}
				}
			}, {
				width : 20
			}];

	var colTree = new commonColumnsTree();
	colTree.init(url, root, columnModel, false);

	var sm = colTree.columnTree.getSelectionModel();
	var nodeInf;
	sm.on('selectionchange', function(sm, node) {
				if (node != null) {
					taskdata.nodePath = node.getPath();
					nodeInf = node.attributes;
				}
			});

	colTree.columnTree.on("beforeexpandnode", function(node) {
		if (node.id != 0) {
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
					inout : node.attributes.inout,
					inoutType : node.attributes.inoutType,
					publish : node.attributes.publish,
					dataObjectName : node.attributes.dataObjectName
				}
			} else {
				var url1 = '../JSON/webremote_DataObjectRemote.getChildDataObject';
				var baseparams = {
					id : node.attributes.dataObjectId,
					isRef : node.attributes.isRef,
					inout : node.attributes.inout,
					inoutType : node.attributes.inoutType,
					publish : node.attributes.publish,
					parentDataObjectId : node.attributes.parentDataObjectId
				}
			}
			colTree.fnBeforeExpandNode(node, url1, baseparams);
		}
	});
	colTree.columnTree.on("click", function(node) {
				Ext.getCmp('taskdataUpdate').enable();
				if (node.attributes.isRef.indexOf("Parent") < 0) {

					Ext.getCmp('taskdataDel').disable();
				} else {
					Ext.getCmp('taskdataDel').enable();
				}
			});

	taskdata.taskdatapanel = new Ext.Panel({
				id : 'tasktreepanel',
				layout : 'fit',
				title : ''+getResource('resourceParam474')+'',
				height : 800,
				bodyStyle : 'overflow:auto;',
				tbar : [{
					id : 'taskdataAdd',
					text : ''+getResource('resourceParam647')+'',
					iconCls : 'add1',
					handler : function() {
						var node = taskdata.columnTree.getSelectionModel()
								.getSelectedNode();
						taskdata.addData(node, "add");
					}
				}, {
					id : 'taskdataUpdate',
					text : '更新',
					iconCls : 'edit1',
					disabled : true,
					handler : function() {
						var node = taskdata.columnTree.getSelectionModel()
								.getSelectedNode();
						if (node != null) {
							taskdata.updateData(node, "update");
						} else {
							Ext.MessageBox.show({
										title : ''+getResource('resourceParam575')+'',
										msg : ''+getResource('resourceParam847')+'',
										icon : Ext.MessageBox.ERROR,
										buttons : Ext.MessageBox.OK
									})
						}
					}
				}, {
					id : 'taskdataDel',
					text : ''+getResource('resourceParam475')+'',
					iconCls : 'del1',
					disabled : true,
					handler : function() {
						var node = taskdata.columnTree.getSelectionModel()
								.getSelectedNode();
						taskdata.delData(node);
					}
				}],
				items : [colTree.columnTree]
			});
	// taskdata.columnTree.getLoader().load(taskdata.columnTree.getRootNode());
	taskdata.columnTree = colTree.columnTree;
	return taskdata.taskdatapanel;
}
taskdata.addData = function(node, flag) {
	operateData.initWindow(node, flag,"taskdata");
}
taskdata.delData = function(node) {
	Ext.Msg.confirm(""+getResource('resourceParam851')+"", ""+getResource('resourceParam848')+"", function(button, text) {

		if ('yes' == button) {

			Ext.Ajax.request({
						url : '../JSON/webremote_DataObjectRemote.delDataObject',
						success : function(res, opt) {
							taskdata.columnTree.getSelectionModel().getSelectedNode().parentNode.reload();
						},
						failure : function(res, opt) {
							taskdata.columnTree.getSelectionModel().getSelectedNode().parentNode.reload();
						},
						params : {
							dataObjectId : node.id
						}
					})
		}
	})
}
taskdata.updateData = function(node, flag) {
	operateData.initWindow(node, flag,"taskdata");
}
