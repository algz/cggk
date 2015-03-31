var myTaskColumnTree = {
	init : null,
	myTaskColumnTreePanel : null,
	columnTree : null
}

myTaskColumnTree.init = function(taskid) {
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
								+ record.dataObjectId + '","myTaskColunmTree") />';
						}else{
							return '<img src="../images/patch2.gif" width=16 height=16 style="float:right;" title="'+getResource('resourceParam604')+'" onclick=operateData.beforeUploadFile("'
								+ record.id + '","myTaskColunmTree") />';
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

	myTaskColumnTree.columnTree = colTree.columnTree;
	myTaskColumnTree.loader = colTree.loader;
	myTaskColumnTree.rootNode = colTree.root;

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
					dataObjectName : node.attributes.dataObjectName,
					inout : node.attributes.inout,
					inoutType : node.attributes.inoutType,
					publish : node.attributes.publish,
					customTypeParentID : node.attributes.customTypeParentID
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
	colTree.columnTree.on("contextmenu", function(node, e) {
				var nodeData = node;
				var addMenu = {
					text : ''+getResource('resourceParam1263')+'',
					handler : function() {
						myTaskColumnTree.addData(nodeData, 'add');
					}
				}
				var delMenu = {
					text : ''+getResource('resourceParam1434')+'',
					handler : function() {
						myTaskColumnTree.delData(nodeData);
					}
				}
				var updateMenu = {
					text : ''+getResource('resourceParam1435')+'',
					handler : function() {
						myTaskColumnTree.updateData(nodeData, 'update');
					}
				}
				menu = new Ext.menu.Menu([addMenu, delMenu, updateMenu]);
				node.select();
				// menu.showAt(e.getPoint());
				e.preventDefault();
			})
	colTree.columnTree.on("click", function(node) {
				Ext.getCmp('myTaskColumnTreeUpdate').enable();
				if (node.attributes.isRef.indexOf("Parent") < 0) {

					Ext.getCmp('myTaskColumnTreeDel').disable();
				} else {
					Ext.getCmp('myTaskColumnTreeDel').enable();
				}
			});
	return myTaskColumnTree.columnTree;
}
myTaskColumnTree.addData = function(node, flag) {
	operateData.initWindow(node, flag);
}
myTaskColumnTree.delData = function(node) {
	Ext.Msg.confirm(""+getResource('resourceParam851')+"", ""+getResource('resourceParam848')+"", function(button, text) {

		if ('yes' == button) {

			Ext.Ajax.request({
						url : '../JSON/webremote_DataObjectRemote.delDataObject',
						success : function(res, opt) {
							myTaskColumnTree.columnTree.getSelectionModel().getSelectedNode().parentNode.reload();
							Ext.getCmp('myTaskColumnTreeDel').disable();
							Ext.getCmp('myTaskColumnTreeUpdate').disable();
						},
						failure : function(res, opt) {
							myTaskColumnTree.columnTree.getSelectionModel().getSelectedNode().parentNode.reload();
							Ext.getCmp('myTaskColumnTreeDel').disable();
							Ext.getCmp('myTaskColumnTreeUpdate').disable();
						},
						params : {
							dataObjectId : node.attributes.dataObjectId
						}
					})
		}
	})
}
myTaskColumnTree.updateData = function(node, flag) {
	operateData.initWindow(node, flag);
}
