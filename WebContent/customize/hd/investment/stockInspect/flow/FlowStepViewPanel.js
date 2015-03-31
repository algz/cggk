/**
 * 流程图形化监控面板，创建时参数参考GraphPanel
 * @class FlowStepViewPanel
 * @extends GraphPanel
 * @author CaoRT
 * @date 2011-11-25
 */
FlowStepViewPanel = Ext.extend(FlowGraphPanel, {

    getImageByNodeType : function(nodeType) { // 根据流程节点的类型获取相应的图片
    	if(nodeType == '4') {
    		return "icons/p2m/flow/start.png";
    	} else if (nodeType == '5') {
    		return "icons/p2m/flow/end.png";
    	} else if (nodeType == '6') {
    		return "icons/p2m/flow/approvalTask.png";
    	} else if (nodeType == '7' || nodeType == '8' || nodeType == '9') {
    		return "icons/p2m/flow/task.png";
    	} else if (nodeType == '1') {
    		return "icons/p2m/flow/judge.png";
    	}
    },
    
    viewFlowInstanceByObject : function(objectId, objectType) { // 根据审批对象id及审批对象类型查看流程监控图
    	var scope = this;
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.viewFlowInstanceByObject",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					scope.loadFlow(obj.flowID, obj.curActivityId);
				}
			},
			disableCaching : true,
			params : {
				objectId : objectId,
				objectType : objectType
			}
		});
	},
    
	viewFlowInstance : function(flowInstanceID) { // 根据流程实例ID查看流程监控图
		var scope = this;
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.viewFlowInstance",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					scope.loadFlow(obj.flowID, obj.curActivityId);
				}
			},
			disableCaching : true,
			params : {
				flowID : flowInstanceID
			}
		});
	},
	
    loadFlow : function(flowId, curActivityId) { // 加载流程图
    	var scope = this;
		this.graph.getModel().clear();
    	Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.loadFlow",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					scope.graph.getModel().clear();
    				scope.graph.getModel().beginUpdate();
    				try {
				    	var parent = scope.graph.getDefaultParent();
						
						// 获取流程的节点
						var nodes = obj.flow.nodes ? obj.flow.nodes : new Array();
						
						// 通过以下两个对象缓存添加的页面上的所有节点，以方便在添加连接线和添加驱动因素映射关系时，通过流程节点id和流程节点nodeid来获取页面上的节点元素
						// 以流程节点的activityId为key，以流程节点为value的对象
						var activityIdMap = new Object();
						
						// 添加节点
						for(var i = 0; i < nodes.length; i ++) {
							var node = nodes[i];
							var value = new Object();
							value['activityId'] = node.activityId;
							value['name'] = node.text;
							value['nodetypeid'] = node.nodetypeid;
							value['notFireAddEvent'] = true;
							var icon = scope.getImageByNodeType(node.nodetypeid);
							
							var vertex = scope.graph.insertVertex(parent, -1, value, node.positionx, node.positiony, node.width, node.height, 'shape=image;image=' + icon + ';verticalLabelPosition=bottom;verticalAlign=top;');
							if(curActivityId && node.activityId == curActivityId) {
								var style = scope.graph.getStylesheet().getCellStyle('running');
								style[mxConstants.STYLE_IMAGE] = icon;
								scope.graph.getStylesheet().putCellStyle('running', style);
								vertex.setStyle('running');
							} else if (curActivityId && curActivityId == 'end' && node.nodetypeid == '5') {
								var style = scope.graph.getStylesheet().getCellStyle('running');
								style[mxConstants.STYLE_IMAGE] = icon;
								scope.graph.getStylesheet().putCellStyle('running', style);
								vertex.setStyle('running');
							}
							activityIdMap[node.activityId] = vertex;
						}
						
						// 添加所有连接线
						var connections = obj.flow.relations ? obj.flow.relations : new Array();
						for (var i = 0; i < connections.length; i ++) {
							var connection = connections[i];
							var oriVertex = activityIdMap[connection.originalid];
							var desVertex = activityIdMap[connection.destinationid];
							var pointX = connection.pointX;
							var pointY = connection.pointY;
							var value = new Object();
							value['relationid'] = connection.relationid;
							value['name'] = connection.name && connection.name!='' ? connection.name : '';
							value['originalindex'] = connection.originalindex;
							value['notFireAddEvent'] = true;
        					var edge = scope.graph.insertEdge(parent, null, value, oriVertex, desVertex);
        					
							// 如果连接线的源节点是审批节点或者判断节点，则设置该连接线的出线类型‘是’或‘否’
							if(connection.originalindex == '1') {
								edge.value['name'] = '是';
							} else if(connection.originalindex == '2') {
								edge.value['name'] = '否';
							}
							if(pointX!=null && pointX!='' && pointY!=null && pointY!='') {
        						edge.getGeometry().points = [{x : pointX, y : pointY}];
							}
						}
    				} finally {
    					scope.graph.getModel().endUpdate();
    				}
				} else if (obj.success == false) {
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam499') + '',
						msg : '读取失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			disableCaching : true,
			params : {
				flowid : flowId
			}
		});
    }
});
