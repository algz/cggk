var FlowViewWindow = function() {
	var scope = this;
	var graph = new mxGraph();
	
	this.loadMask = null;	
	this.graphPanel = new Ext.Panel({
		autoScroll : true,
        region:'center',
		listeners : {
			afterrender : function() {
				scope.initGraph();
				scope.loadMask = new Ext.LoadMask(scope.graphPanel.body.dom, {
					msg : 'loading...'
				});
			}
		}
	});
	
	this.window = new Ext.Window({
		title : '审批进度',
		width : 800,
		height : 500,
		buttonAlign : 'center',
		closeAction : 'hide',
		layout : 'fit',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [scope.graphPanel],
		buttons : [{
			width : 50,
			scope : scope,
			text : "" + getResource('resourceParam2006') + "",
			handler : function() {
				scope.window.hide();
			}
		}]
	});
	/**
     * 初始化graph组件，并配置相关属性
     */
	this.initGraph = function() {
		Ext.QuickTips.init();
		
	    // Makes the connection hotspot smaller
	    mxConstants.DEFAULT_HOTSPOT = 0.3;
	    // 设置阴影的颜色
	    mxConstants.SHADOWCOLOR = '#C0C0C0';
	    
	    // 设置图形默认样式
	    var node = mxUtils.load(mxBasePath + '/resources/default-style.xml').getDocumentElement();
	    var dec = new mxCodec(node.ownerDocument);
	    dec.decode(node, graph.getStylesheet());
	    
	    // Sets the style to be used when an elbow edge is double clicked
	    graph.alternateEdgeStyle = 'vertical';
	
	    // 将图形的tooltip更换为Ext的tooltip
	    var tooltip = new Ext.ToolTip({
	        target: graph.container,
	        html: ''
	    });
	    
	    tooltip.disabled = true;
	    graph.tooltipHandler.show = function(tip, x, y) {
	        if (tip != null && tip.length > 0) {
	            if (tooltip.body != null) {
	                tooltip.body.dom.firstChild.nodeValue = tip;
	            } else {
	                tooltip.html = tip;
	            }
	            tooltip.showAt([x, y + mxConstants.TOOLTIP_VERTICAL_OFFSET]);
	        }
	    };
	    
	    graph.tooltipHandler.hide = function() {
	        tooltip.hide();
	    };
	    
	    graph.getTooltipForCell = function(cell) {
	    	if(!cell.value || cell.value == null) {
	    		return '';
	    	}
	    	if(!cell.value['name'] || cell.value['name'] == null) {
	    		return '';
	    	}
			return cell.value['name'];
		};
	    
	    // 修改cell的显示名称获取方式
	    graph.getLabel = function(cell) {
	    	if(!cell.value || cell.value == null) {
	    		return '';
	    	}
	    	if(!cell.value['name'] || cell.value['name'] == null) {
	    		return '';
	    	}
			return cell.value['name'];
		};
		
		graph.init(scope.graphPanel.body.dom);
		
	    if (mxClient.IS_GC || mxClient.IS_SF) {
	        graph.container.style.background = '-webkit-gradient(linear, 0% 0%, 100% 0%, from(#FFFFFF), to(#FFFFEE))';
	    } else if (mxClient.IS_NS) {
	        graph.container.style.background = '-moz-linear-gradient(left, #FFFFFF, #FFFFEE)';  
	    } else if (mxClient.IS_IE) {
	        graph.container.style.filter = 'progid:DXImageTransform.Microsoft.Gradient('+
	                'StartColorStr=\'#FFFFFF\', EndColorStr=\'#FFFFEE\', GradientType=1)';
	    }
	    
	    graph.cellsLocked = true;
	    
	    var style = new Object();
		style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
		style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
		style[mxConstants.STYLE_FONTCOLOR] = '#FF150F';
		style[mxConstants.STYLE_STROKECOLOR] = '#FF150F';
		style[mxConstants.STYLE_STROKEWIDTH] = 2;
		style[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
		style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFFFF';
		style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
		style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;
		style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
		style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;
		style[mxConstants.STYLE_IMAGE] = "icons/p2m/flow/approvalTask.png";
		style[mxConstants.STYLE_IMAGE_WIDTH] = '50';
		style[mxConstants.STYLE_IMAGE_HEIGHT] = '50';
		style[mxConstants.STYLE_SPACING_TOP] = '50';
		graph.getStylesheet().putCellStyle('running', style);
	};

    /**
     * 根据流程节点的类型获取相应的图片
     */
    this.getImageByNodeType = function(nodeType) {
    	if(nodeType == '4') {
    		return "icons/p2m/flow/start.png";
    	} else if (nodeType == '5') {
    		return "icons/p2m/flow/end.png";
    	} else if (nodeType == '6') {
    		return "icons/p2m/flow/approvalTask.png";
    	} else if (nodeType == '7' || nodeType == '8' || nodeType == '9') {
    		return "icons/p2m/flow/task.png";
    	} else if (nodeType == '1' || nodeType == '10') {
    		return "icons/p2m/flow/judge.png";
    	}
    }
	
    this.viewFlowInstanceByObject = function(objectId, objectType) {
		this.window.show();
    	this.loadMask.show();
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.viewFlowInstanceByObject",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					scope.loadFlow(obj.flowID, obj.curActivityId);
				} else {
					scope.loadMask.hide();
				}
			},
			disableCaching : true,
			params : {
				objectId : objectId,
				objectType : objectType
			}
		});
	}
    
	this.viewFlowInstance = function(flowInstanceID) {
		this.window.show();
    	this.loadMask.show();
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.viewFlowInstance",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					scope.loadFlow(obj.flowID, obj.curActivityId);
				} else {
					scope.loadMask.hide();
				}
			},
			disableCaching : true,
			params : {
				flowID : flowInstanceID
			}
		});
	}
	
	/**
	 * 获取流程图信息
	 */
    this.loadFlow = function(flowId, curActivityId) {
    	if(!curActivityId) {
			this.window.show();
	    	this.loadMask.show();
    	}
		graph.getModel().clear();
    	Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.loadFlow",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					graph.getModel().clear();
    				graph.getModel().beginUpdate();
    				try {
				    	var parent = graph.getDefaultParent();
						
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
							
							var vertex = graph.insertVertex(parent, -1, value, node.positionx, node.positiony, node.width, node.height, 'shape=image;image=' + icon + ';verticalLabelPosition=bottom;verticalAlign=top;');
							if(curActivityId && node.activityId == curActivityId) {
								var style = graph.getStylesheet().getCellStyle('running');
								style[mxConstants.STYLE_IMAGE] = icon;
								graph.getStylesheet().putCellStyle('running', style);
								vertex.setStyle('running');
							} else if (curActivityId && curActivityId == 'end' && node.nodetypeid == '5') {
								var style = graph.getStylesheet().getCellStyle('running');
								style[mxConstants.STYLE_IMAGE] = icon;
								graph.getStylesheet().putCellStyle('running', style);
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
        					var edge = graph.insertEdge(parent, null, value, oriVertex, desVertex);
        					
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
    					graph.getModel().endUpdate();
    				}
				} else if (obj.success == false) {
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam499') + '',
						msg : '读取失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
				scope.loadMask.hide();
			},
			disableCaching : true,
			params : {
				flowid : flowId
			}
		});
    };
};