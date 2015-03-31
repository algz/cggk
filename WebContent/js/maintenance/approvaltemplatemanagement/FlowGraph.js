var FlowGraph = function() {
	var scope = this;
	
    var keyHandler = null;
    
    var approvalConfigWin = null;//审批节点配置界面
    var counterSignConfigWin=null;//会签节点配置界面
    var judgeConfigWin = null;//判断节点配置界面
    /**
     * 创建graph
     */
    var graph = new mxGraph();
    
    /**
	 * 画布面板
	 */
    var graphPanel = new Ext.Panel({
		autoScroll : true,
        region:'center',
		tbar : [{
        	text : '删除',
        	id : 'flow_delete',
        	disabled : true,
        	iconCls : 'icon-flow-delete',
        	handler : function(button) {
        		graph.removeCells();
        	}
        }, '-', {
        	text : '配置',
        	id : 'node_edit',
        	disabled : true,
        	iconCls : 'icon-editParametersTable',
        	handler : function(button) {
        		scope.editNode();
        	}
        }, '-', {
        	text : '查看',
        	iconCls : 'preview',
        	disabled : false,
        	handler : function(button) {
        		mxUtils.show(graph, null, 10, 10);
        	}
        }, '-', {
            text : 'Zoom',
            iconCls : 'icon-flow-zoom',
            scope : this,
            handler : function(menu) {},
            menu : {
                items : [{
		            text:'400%',
		            scope:this,
		            handler: function(item) {
						graph.getView().setScale(4);
		            }
		        }, {
		            text:'200%',
		            scope:this,
		            handler: function(item) {
						graph.getView().setScale(2);
		            }
		        }, {
		            text:'150%',
		            scope:this,
		            handler: function(item) {
						graph.getView().setScale(1.5);
		            }
		        }, {
		            text:'100%',
		            scope:this,
		            handler: function(item)
		            {
		                graph.getView().setScale(1);
		            }
		        }, {
		            text:'75%',
		            scope:this,
		            handler: function(item) {
						graph.getView().setScale(0.75);
		            }
		        }, {
		            text:'50%',
		            scope:this,
		            handler: function(item)
		            {
						graph.getView().setScale(0.5);
		            }
		        }, {
		            text:'25%',
		            scope:this,
		            handler: function(item) {
						graph.getView().setScale(0.25);
		            }
		        }, '-', {
		            text:'放大',
		            iconCls : 'icon-flow-zoomin',
		            scope:this,
		            handler: function(item) {
						graph.zoomIn();
		            }
		        }, {
		            text:'缩小',
		            iconCls : 'icon-flow-zoomout',
		            scope:this,
		            handler: function(item) {
		                graph.zoomOut();
		            }
		        }]
            }
        }],
		listeners : {
			afterrender : function() {
			}
		}
	});
	
    /**
	 * 缩略图面板
	 */
    var outlinePanel = new Ext.Panel({
    	height : 150,
    	region : 'south',
        split: true,
		listeners : {
			afterrender : function() {
			    scope.initGraph();
			    scope.initOutline();
			}
		}
    });
    
    /**
     * 初始化微缩图
     */
    this.initOutline = function() {
	    var outline = new mxOutline(graph, outlinePanel.body.dom);
	    outlinePanel.body.dom.style.cursor = 'move';
    }
	
    /**
     * 配置流程图点默认样式
     */
    this.configDefaultStyles = function() {
    	configStyle = function() {
		var style1 = new Object();
		style1['labelBackgroundColor'] = 'white';
		style1['rounded'] = 1;
		style1['edgeStyle'] = 'elbowEdgeStyle';
		style1['strokeColor'] = '#5d65df';
		style1['fontSize'] = 10;
		style1['fontColor'] = '#1d258f';
		style1['fontFamily'] = 'Verdana';
		style1['shape'] = 'connector';
		style1['endArrow'] = 'classic';
		style1['align'] = 'center';
		style1['verticalAlign'] = 'middle';
		style1['align'] = 'center';
		graph.getStylesheet().putDefaultEdgeStyle(style1);
		
		var style2 = new Object();
		style2['labelBackgroundColor'] = 'white';
		style2['rounded'] = 1;
		style2['edgeStyle'] = 'elbowEdgeStyle';
		style2['strokeColor'] = '#F34949';
		style2['fontSize'] = 11;
		style2['fontColor'] = '#1d258f';
		style2['fontFamily'] = 'Verdana';
		style2['shape'] = 'connector';
		style2['endArrow'] = 'classic';
		style2['align'] = 'center';
		style2['verticalAlign'] = 'middle';
		style2['align'] = 'center';
		graph.getStylesheet().putCellStyle('dataEdge', style2);
	}
    }
    
    /**
     * 初始化graph组件，并配置相关属性
     */
	this.initGraph = function() {
		Ext.QuickTips.init();
		
	    // Makes the connection hotspot smaller
	    mxConstants.DEFAULT_HOTSPOT = 0.3;
	    // 设置阴影的颜色
	    mxConstants.SHADOWCOLOR = '#C0C0C0';
		
	    // 设置连接图片
		mxConnectionHandler.prototype.connectImage = new mxImage('../lib/mxgraph/src/images/connector.gif', 16, 16);
	    
	    // 修改原有双击连接线控制点的方法
	    graph.flipEdge = function(edge) {
	        if (edge != null) {
	            var state = this.view.getState(edge);
	            var style = (state != null) ? state.style : this.getCellStyle(edge);
	            
	            if (style != null) {
	                var elbow = mxUtils.getValue(style, mxConstants.STYLE_ELBOW, mxConstants.ELBOW_HORIZONTAL);
	                var value = (elbow == mxConstants.ELBOW_HORIZONTAL) ? mxConstants.ELBOW_VERTICAL : mxConstants.ELBOW_HORIZONTAL;
	                this.setCellStyles(mxConstants.STYLE_ELBOW, value, [edge]);
	            }
	        }
	    };
	    
	    // 设置图形默认样式
//	    /**
	    var node = mxUtils.load(mxBasePath + '/resources/default-style.xml').getDocumentElement();
	    var dec = new mxCodec(node.ownerDocument);
	    dec.decode(node, graph.getStylesheet());
//	    */
//	    this.configDefaultStyles();
	    
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
		
		graph.init(graphPanel.body.dom);
		
		//根据浏览器版本不同设置容器背景颜色
	    if (mxClient.IS_GC || mxClient.IS_SF) {
	        graph.container.style.background = '-webkit-gradient(linear, 0% 0%, 100% 0%, from(#FFFFFF), to(#FFFFEE))';
	    } else if (mxClient.IS_NS) {
	        graph.container.style.background = '-moz-linear-gradient(left, #FFFFFF, #FFFFEE)';  
	    } else if (mxClient.IS_IE) {
	        graph.container.style.filter = 'progid:DXImageTransform.Microsoft.Gradient('+
	                'StartColorStr=\'#FFFFFF\', EndColorStr=\'#FFFFEE\', GradientType=1)';
	    }
	    
	    //获取节点是否可编辑
		graph.isCellEditable = function(cell) {
	    	if(cell.isEdge()) {
	    		return false;
	    	}
		    return this.isCellsEditable() && !this.isCellLocked(cell)
		};
	    
	    graph.setConnectable(true);
	    graph.setDropEnabled(true);
	    graph.setPanning(true);
	    graph.setTooltips(true);
	    graph.connectionHandler.setCreateTarget(false);
        graph.setAllowDanglingEdges(false);
        graph.setMultigraph(true);
        graph.setAllowLoops(false);
		graph.setCellsDisconnectable(false);
	    // Sets the cursor
	    graph.container.style.cursor = 'default';
		
	    scope.createKeyHandler();
		
	    // Creates rubberband selection
	    var rubberband = new mxRubberband(graph);
	    
	};
	
	/**
	 * load进度条 
	 */
	this.loadMask = new Ext.LoadMask(document.body, {
		msg : 'loading...'
	});
    
    /**
     * 创建按键的事件
     */
    this.createKeyHandler = function() {
    	// 键盘按键事件设置
	    keyHandler = new mxKeyHandler(graph);
	    // "End"刷新元素
	    keyHandler.bindKey(35, function() {
	        graph.refresh();
	    });
	    // "←"选择上一个元素
	    keyHandler.bindKey(37, function() {
	        graph.selectPreviousCell();
	    });
	    // "↑"选择父元素
	    keyHandler.bindKey(38, function() {
	        graph.selectParentCell();
	    });
	    // "→"选择下一个元素
	    keyHandler.bindKey(39, function() {
	        graph.selectNextCell();
	    });
	    // "↓"选择子元素
	    keyHandler.bindKey(40, function() {
	        graph.selectChildCell();
	    });
	    // "Delete"删除选中元素
	    keyHandler.bindKey(46, function() {
	        graph.removeCells();
	    });
    };
    
    /**
     * 设置控制流和数据流隐藏
     */
	this.setVisible = function(flowtype, visible) {
		var parent = graph.getDefaultParent();
		for(var i = 0; i < parent.children.length; i ++) {
			var cell = parent.children[i];
			if(cell.isEdge() && cell.value['type'] == flowtype) {
				cell.setVisible(visible);
			}
		}
		graph.refresh();
    };
    
    /**
     * 获取graph
     */
    this.getGraph = function() {
    	return graph;
    };
    
    /**
     * 获取流程图画布panel
     */
    this.getGraphPanel = function() {
    	return graphPanel;
    };
    
	/**
     * 获取微缩图panel
     */
    this.getOutlinePanel = function() {
    	return outlinePanel;
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
    	} else if (nodeType == '1') {
    		return "icons/p2m/flow/judge.png";
    	} else if (nodeType == '10') {
    		return "icons/p2m/flow/judge.png";
    	}
    }
    
    /**
	 * 获取流程图信息
	 */
    this.loadFlow = function(flowId) {
    	scope.flowId = flowId;
    	this.loadMask.show();
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
							var vertex = graph.insertVertex(parent, -1, value, node.positionx, node.positiony, node.width, node.height, 'shape=image;image=' + icon + ';verticalLabelPosition=bottom;verticalAlign=top');
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
    
    /**
     * 保存节点关系
     */
    this.saveRelation = function(connection) {
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.saveRelation",
			method : 'POST',
			success : function(response, options) {
				connection.success(response, options);
			},
			failure : function(response, options) {
				scope.loadFlow(scope.flowId);
			},
			disableCaching : true,
			params : {
				activityRelationID : connection.activityRelationID,
				flowID : connection.flowID,
				name : connection.name,
				pointx : connection.pointx,
				pointy : connection.pointy,
				originalActivieyID : connection.originalActivieyID,
				destinationActivityID : connection.destinationActivityID,
				originalIndex : connection.originalIndex
			}
		});
    }
	
    /**
	 * 保存流程节点
	 */
	this.saveNode = function(node) {
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.saveActivity",
			method : 'POST',
			success : function(response, options) {
				node.success(response, options);
			},
			failure : function(response, options) {
				scope.loadFlow(scope.flowId);
			},
			disableCaching : true,
			params : {
				activityID : node.activityID,
				flowID : node.flowID,
				positionx : node.positionx,
				positiony : node.positiony,
				width : node.width,
				height : node.height,
				text : node.text,
				nodeTypeID : node.nodeTypeID
			}
		});
	};
	
	/**
	 * 删除节点
	 */
	this.deleteNode = function(node) {
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.deleteNode",
			method : 'POST',
			success : function(response, options) {
				node.success(response, options);
			},
			failure : function(response, options) {
				scope.loadFlow(scope.flowId);
			},
			disableCaching : true,
			params : {
				activityID : node.activityID
			}
		});
	};
	
	/**
	 * 删除节点连接线
	 */
	this.deleteRelation = function(connection) {
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.deleteRelation",
			method : 'POST',
			success : function(response, options) {
				connection.success(response, options);
			},
			failure : function(response, options) {
				scope.loadFlow(scope.flowId);
			},
			disableCaching : true,
			params : {
				activityRelationID : connection.activityRelationID
			}
		});
	};
	
	/**
	 * 添加节点或者添加连线时触发的ADD事件调用
	 */
    this.onCellsAdded = function(newCell) {
		if(newCell.isVertex()) { // 如果新增元素为节点
		} else if (newCell.isEdge()) { // 如果新增元素为连接线
			// 获取连接线的源节点和目标节点
			var source = newCell.source;
			var target = newCell.target;
	    	var sourceNodetypeid = source.value["nodetypeid"];
	    	var targetNodetypeid = target.value["nodetypeid"];
	    	
			// 如果目标节点为开始节点时，不添加
			if(target && targetNodetypeid == '4') {
				graph.removeCells([newCell]);
    			scope.loadMask.hide();
    			return;
			}
			// 如果源节点为结束节点时，不添加
			if(source && sourceNodetypeid == '5') {
				graph.removeCells([newCell]);
    			scope.loadMask.hide();
    			return;
			}
			// 如果源节点为开始节点，目标节点为结束节点时，不添加
			if(source && sourceNodetypeid == '4' && target && targetNodetypeid == '5') {
				graph.removeCells([newCell]);
    			scope.loadMask.hide();
    			return;
			}
			// 限制判断节点不能直接连接判断节点
			if(source.value['nodetypeid'] == '1' && target.value['nodetypeid'] == '1') {
				graph.removeCells([newCell]);
    			scope.loadMask.hide();
    			return;
			}
			// 限制开始节点只能向外拉一根线
			if(source.value['nodetypeid'] == '4' && source.edges.length > 1) {
				graph.removeCells([newCell]);
    			scope.loadMask.hide();
    			return;
			}
			
			
	    	var pointx = '';
	    	var pointy = '';
			if(newCell.getGeometry().points) {
				pointx = newCell.getGeometry().points[0].x;
				pointy = newCell.getGeometry().points[0].y;
			}
			newCell.value['originalindex'] = '0';
			newCell.value['name'] = '';
			if(source && (sourceNodetypeid == '1' || sourceNodetypeid == '10')) {
				newCell.value['name'] = '是';
				newCell.value['originalindex'] = '1';
	    	}
			scope.loadMask.hide();
			graph.getSelectionModel().cells[0] = newCell;
			scope.saveRelation({
		    	activityRelationID : newCell.value['relationid'],
				flowID : scope.flowId,
				name : newCell.value['name'],
				pointx : pointx,
				pointy : pointy,
				originalActivieyID : source.value['activityId'],
				destinationActivityID : target.value['activityId'],
				originalIndex : newCell.value['originalindex'],
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
    				scope.loadMask.hide();
    				if(obj.success) {
    					newCell.value['relationid'] = obj.relationid;
    				} else {
    					scope.loadFlow(scope.flowId);
    				}
				}
			});
		}
	};
	
	/**
     * graph中添加元素事件
     */
    graph.addListener(mxEvent.CELLS_ADDED, function(sender, evt) {
		// 获取添加的元素（数组，可能是多个）
    	var newCells = evt.properties.cells;
    	for(var i = 0; i < newCells.length; i ++) {
    		var newCell = newCells[i];
    		if(!newCell.value) {
    			newCell.value = new Object();
    		}
    		/* 
    		 * 先判断添加的元素是否激活添加事件，在读取流程图时，需要将读取的流程添加到graph中，也会激活该事件
    		 * 因此，在读取的流程节点和节点关系的value中加入该标记，在添加这些cell时，不进行处理
    		 */
    		if(!newCell.value['notFireAddEvent']) {
    			/*
				 * 在读取该任务或者项目的流程时，如果该任务或者项目没有流程存在，则设置scope.flowid为null
		    	 * 在添加节点时，首先通过scope.flowid判断当前任务或者项目有没有存在的流程
		    	 */
				scope.loadMask.show();
	    		scope.onCellsAdded(newCell);
    		}
    	}
    });
    
    /**
     * 当流程节点长宽发生变化时，updateFlowActivity的长和高
     */
    graph.addListener(mxEvent.CELLS_RESIZED, function(sender, evt) {
    	var newCells = evt.properties.cells;
    	for(var i = 0; i < newCells.length; i ++) {
    		var newCell = newCells[i];
    		if(newCell.isVertex()) {
    			// 活动节点size变更
		    	scope.loadMask.show();
    			var newCellGeometry = newCell.getGeometry();
		    	scope.saveNode({
					activityID : newCell.value['activityId'],
					flowID : scope.flowId,
					positionx : newCellGeometry.x,
					positiony : newCellGeometry.y,
					width : newCellGeometry.width,
					height : newCellGeometry.height,
					text : newCell.value['name'],
					nodeTypeID : newCell.value['nodetypeid'],
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						scope.loadMask.hide();
						if(obj.success) {
							newCell.value['activityId'] = obj.activityId;
						} else {
							scope.loadFlow(scope.flowId);
						}
					}
				});
    		} else if(newCell.isEdge()) {
    			
    		}
    	}
    });
    
    /**
     * 当流程节点移动时，update FlowActivity的坐标
     */
    graph.addListener(mxEvent.CELLS_MOVED, function(sender, evt) {
    	var newCells = evt.properties.cells;
    	for(var i = 0; i < newCells.length; i ++) {
    		var newCell = newCells[i];
    		if(newCell.isVertex()) { // 如果移动元素为节点
				// 如果新添加的元素超出graph范围，则将元素放在（0，0）位置
	    		var newCellGeometry = newCell.getGeometry();
	    		var x = newCellGeometry.x;
	    		var y = newCellGeometry.y;
	    		if(x < 0 || y < 0) {
	    			newCellGeometry.x = 0;
	    			newCellGeometry.y = 0;
	    		}
		    	scope.loadMask.show();
		    	scope.saveNode({
					activityID : newCell.value['activityId'],
					flowID : scope.flowId,
					positionx : x,
					positiony : y,
					width : newCellGeometry.width,
					height : newCellGeometry.height,
					text : newCell.value['name'],
					nodeTypeID : newCell.value['nodetypeid'],
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						scope.loadMask.hide();
						if(obj.success) {
							newCell.value['activityId'] = obj.activityId;
						} else {
							scope.loadFlow(scope.flowId);
						}
					}
				});
			}
    	}
    });
    
    /**
     * 重写mxEdgeHandler的changePoints方法，当控制线的控制点发生变化时，保存控制点信息
     */
	mxEdgeHandler.prototype.changePoints = function(edge, points) {
	    var model = this.graph.getModel();
	    var geo = model.getGeometry(edge);
	    if (geo != null) {
	        geo = geo.clone();
	        geo.points = points;
	        model.setGeometry(edge, geo);
	    }
	    if(points[0]) {
			var source = edge.source;
			var target = edge.target;
			scope.saveRelation({
		    	activityRelationID : edge.value['relationid'],
				flowID : scope.flowId,
				name : edge.value['name'],
				pointx : points[0].x,
				pointy : points[0].y,
				originalActivieyID : source.value['activityId'],
				destinationActivityID : target.value['activityId'],
				originalIndex : edge.value['originalindex'],
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
    				scope.loadMask.hide();
    				if(obj.success) {
    					edge.value['relationid'] = obj.relationid;
    				} else {
    					scope.loadFlow(scope.flowId);
    				}
				}
			});
	    }
	};

	/**
	 * 为graph添加删除事件
	 */
    graph.addListener(mxEvent.CELLS_REMOVED, function(sender, evt){
    	var removeCells = evt.properties.cells ? evt.properties.cells : new Array();
    	for(var i = 0; i < removeCells.length; i ++) {
    		var removeCell = removeCells[i];
    		if(removeCell.isVertex()) {
				scope.loadMask.show();
    			scope.deleteNode({
    				activityID : removeCell.value['activityId'],
    				success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						scope.loadMask.hide();
						if(obj.success) {
						} else {
							scope.loadFlow(scope.flowId);
						}
    				}
    			});
    		} else if (removeCell.isEdge()) {
		    	scope.loadMask.show();
    			scope.deleteRelation({
					activityRelationID : removeCell.value['relationid'],
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						scope.loadMask.hide();
						if(obj.success) {
							
						} else {
							scope.loadFlow(scope.flowId);
						}
					}
    			});
    		}
    	}
    });
	
    /**
     * 为graph添加双击事件
     */
    graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt){
		var clickCell = evt.properties.cell;
		if(!clickCell) return;
		if(clickCell.isVertex()) { // 如果双击的是节点
			
		} else if (clickCell.isEdge()) { // 如果双击的连接线
			// 如果双击判断节点的出线时,需要选择“是”与“否”
			var source = clickCell.source;
			var target = clickCell.target;
	    	var sourceNodetypeid = source.value["nodetypeid"];
	    	var targetNodetypeid = target.value["nodetypeid"];
	    	if(sourceNodetypeid == "1" || sourceNodetypeid == "10") {
		    	var pointx = '';
		    	var pointy = '';
				if(clickCell.getGeometry().points) {
					pointx = clickCell.getGeometry().points[0].x;
					pointy = clickCell.getGeometry().points[0].y;
				}
				var menu = new Ext.menu.Menu({
					subMenuAlign : 'center',
					items : [{
						text : '是',
						handler : function() {
		    				scope.loadMask.show();
							menu.hide();
							clickCell.value['name'] = '是';
							clickCell.value['originalindex'] = '1';
							graph.refresh(clickCell);
						    scope.saveRelation({
						    	activityRelationID : clickCell.value['relationid'],
								flowID : scope.flowId,
								name : clickCell.value['name'],
								pointx : pointx,
								pointy : pointy,
								originalActivieyID : source.value['activityId'],
								destinationActivityID : target.value['activityId'],
								originalIndex : clickCell.value['originalindex'],
								success : function(response, options) {
									var obj = Ext.util.JSON.decode(response.responseText);
				    				scope.loadMask.hide();
				    				if(obj.success) {
				    					clickCell.value['relationid'] = obj.relationid;
				    				} else {
				    					scope.loadFlow(scope.flowId);
				    				}
								}
							});
						}
					}, {
						text : '否',
						handler : function() {
							menu.hide();
							clickCell.value['name'] = '否';
							clickCell.value['originalindex'] = '2';
							graph.refresh(clickCell);
						    scope.saveRelation({
						    	activityRelationID : clickCell.value['relationid'],
								flowID : scope.flowId,
								name : clickCell.value['name'],
								pointx : pointx,
								pointy : pointy,
								originalActivieyID : source.value['activityId'],
								destinationActivityID : target.value['activityId'],
								originalIndex : clickCell.value['originalindex'],
								success : function(response, options) {
									var obj = Ext.util.JSON.decode(response.responseText);
				    				scope.loadMask.hide();
				    				if(obj.success) {
				    					clickCell.value['relationid'] = obj.relationid;
				    				} else {
				    					scope.loadFlow(scope.flowId);
				    				}
								}
					    	});
						}
					}]
				});
				menu.showAt([evt.properties.event.clientX, evt.properties.event.clientY]);
	    	}
		}
    });
    
    /**
     * 在选择节点时，根据不同的选择项设置按钮的可操作性
     */
    graph.getSelectionModel().addListener(mxEvent.CHANGE, function(){
    	var buttons = graphPanel.getTopToolbar().items;
    	var selectModel = graph.getSelectionModel();
    	var empty = selectModel.isEmpty();
    	if(empty) {
    		buttons.get('flow_delete').setDisabled(true);
		    keyHandler.bindKey(46, function(){});
    		buttons.get('node_edit').setDisabled(true);
    	} else {
    		if (selectModel.cells.length == 1) {
    			var selectCell = selectModel.cells[0];
    			if (selectCell.isEdge()) {
					buttons.get('flow_delete').setDisabled(false);
				    keyHandler.bindKey(46, function() {
				        graph.removeCells();
				    });
    				buttons.get('node_edit').setDisabled(true);
    			} else if (selectCell.isVertex()) {
	    			var nodetype = selectCell.value['nodetypeid'];
	    			if (nodetype == '4' || nodetype == '5') {
	    				buttons.get('flow_delete').setDisabled(true);
					    keyHandler.bindKey(46, function(){});
    					buttons.get('node_edit').setDisabled(true);
	    			} else if(nodetype == '6' || nodetype == '7' || nodetype == '8' || nodetype == '9' || nodetype == '1') {
	    				buttons.get('flow_delete').setDisabled(false);
					    keyHandler.bindKey(46, function() {
					        graph.removeCells();
					    });
    					buttons.get('node_edit').setDisabled(false);
	    			}
    			}
    		} else if (selectModel.cells.length > 1) {
	    		buttons.get('flow_delete').setDisabled(false);
			    keyHandler.bindKey(46, function() {
			        graph.removeCells();
			    });
    			buttons.get('node_edit').setDisabled(true);
	    		for (var i = 0; i < selectModel.cells.length; i ++) {
	    			var selectCell = selectModel.cells[i];
    				var nodetype = selectCell.value['nodetypeid'];
	    			if (nodetype == '4' || nodetype == '5') {
	    				buttons.get('flow_delete').setDisabled(true);
					    keyHandler.bindKey(46, function(){});
	    				break;
	    			}
	    		}
    		}
    	}
    });
    
    /**
     * 重写活动节点的编辑方法，双击节点时获取节点显示的值
     */
	graph.convertValueToString = function(cell) { 
		if (cell.value['name']) { 
			return cell.value['name']; 
		} 
	}; 
 
	/**
	 * 重写活动节点的编辑方法，当修改完节点显示的值后，保存
	 */
	var cellLabelChanged = graph.cellLabelChanged; 
	graph.cellLabelChanged = function(cell, newValue, autoSize) {
		if(!cell.value['name']) {
			cell.value['name'] = '';	
		}
		// Clones the value for correct undo/redo 
		var elt = cell.value; 
		elt['name'] = newValue; 
		newValue = elt; 
		cellLabelChanged.apply(this, arguments); 
    	scope.loadMask.show();
		var newCellGeometry = cell.getGeometry();
		
		if(cell.isVertex()) {
			scope.saveNode({
				activityID : cell.value['activityId'],
				flowID : scope.flowId,
				positionx : newCellGeometry.x,
				positiony : newCellGeometry.y,
				width : newCellGeometry.width,
				height : newCellGeometry.height,
				text : cell.value['name'],
				nodeTypeID : cell.value['nodetypeid'],
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					scope.loadMask.hide();
					if(obj.success) {
						cell.value['activityId'] = obj.activityId;
					} else {
						scope.loadFlow(scope.flowId);
					}
				}
			});
		} else if (cell.isEdge()) {
			var source = cell.source;
			var target = cell.target;
	    	var pointx = '';
	    	var pointy = '';
			if(cell.getGeometry().points) {
				pointx = cell.getGeometry().points[0].x;
				pointy = cell.getGeometry().points[0].y;
			}
			scope.saveRelation({
		    	activityRelationID : cell.value['relationid'],
				flowID : scope.flowId,
				name : cell.value['name'],
				pointx : pointx,
				pointy : pointy,
				originalActivieyID : source.value['activityId'],
				destinationActivityID : target.value['activityId'],
				originalIndex : cell.value['originalindex'],
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
    				scope.loadMask.hide();
    				if(obj.success) {
    					cell.value['relationid'] = obj.relationid;
    				} else {
    					scope.loadFlow(scope.flowId);
    				}
				}
	    	});
		}
	};
	
	/**
	 * 配置审批节点或者会签节点的负责人
	 */
	this.editNode = function() {
		var selectModel = graph.getSelectionModel();
		selectCells = selectModel.cells;
		if(selectCells[0].isVertex()){
			var nodetypeid = selectCells[0].value['nodetypeid'];
			if(nodetypeid == '6') {
				if(!approvalConfigWin) {
					approvalConfigWin = new ApprovalConfigWin();
				}
				approvalConfigWin.showWin(this.flowId, selectCells[0].value['activityId']);
			} else if(nodetypeid == '7' || nodetypeid == '8' || nodetypeid == '9') {
				if(!counterSignConfigWin) {
					counterSignConfigWin = new CounterSignConfigWin();
				}
				counterSignConfigWin.showWin(this.flowId, selectCells[0].value['activityId']);
			} else if(nodetypeid == '1') {
				if(!judgeConfigWin) {
					judgeConfigWin = new JudgeConfigWin();
				}
				judgeConfigWin.showWin(this.flowId, selectCells[0].value['activityId']);
			}
		}
	}
}