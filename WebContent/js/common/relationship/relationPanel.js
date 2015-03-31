var relationPanel = {
	flowid : null,
	flowtype : null,
	projectId : null,
	taskId : null,
	nodename : null,
	nodeid : null,
	nodes : null
};

relationPanel.init = function() {
	var scope = this;
	
    Ext.QuickTips.init();
	
    // Makes the connection hotspot smaller
    mxConstants.DEFAULT_HOTSPOT = 0.3;
    // 设置阴影的颜色
    mxConstants.SHADOWCOLOR = '#C0C0C0';
    // 创建graph
    var graph = new mxGraph();
    
    // 设置图形默认样式
//    var node = mxUtils.load(mxBasePath + '/resources/default-style.xml').getDocumentElement();
//    var dec = new mxCodec(node.ownerDocument);
//    dec.decode(node, graph.getStylesheet());
	
	relationPanel.configStyle = function() {
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
    
    relationPanel.configStyle();
    
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
    
    // 流程图面板
	relationPanel.flowPanel = new Ext.Panel({
		id : 'flowPanel',
		frame : false,
		boder : false,
		autoScroll : true,
		layout : 'fit',
		listeners : {
			afterrender : function() {
			    graph.init(relationPanel.flowPanel.body.dom);
			    
			    if (mxClient.IS_GC || mxClient.IS_SF) {
			        graph.container.style.background = '-webkit-gradient(linear, 0% 0%, 100% 0%, from(#FFFFFF), to(#FFFFEE))';
			    } else if (mxClient.IS_NS) {
			        graph.container.style.background = '-moz-linear-gradient(left, #FFFFFF, #FFFFEE)';  
			    } else if (mxClient.IS_IE) {
			        graph.container.style.filter = 'progid:DXImageTransform.Microsoft.Gradient('+
			                'StartColorStr=\'#FFFFFF\', EndColorStr=\'#FFFFEE\', GradientType=1)';
			    }
			    
			    graph.setConnectable(false);
			    graph.setDropEnabled(false);
			    graph.setPanning(true);
			    graph.setTooltips(true);
			    graph.connectionHandler.setCreateTarget(false);
                graph.setAllowDanglingEdges(false);
                graph.setMultigraph(true);
                graph.setAllowLoops(false);
                graph.setCellsResizable(false);
			    graph.cellsEditable = false;
				graph.swimlaneNesting = false;
				graph.foldingEnabled = false;
				graph.edgeLabelsMovable = false;
				graph.vertexLabelsMovable = false; 

				graph.setCellsDisconnectable(false);
			    
			    // Sets the cursor
			    graph.container.style.cursor = 'default';
			    // Creates rubberband selection
			    var rubberband = new mxRubberband(graph);
			}
		}
	});
	
    relationPanel.setVisible = function(flowtype, visible) {
		var parent = graph.getDefaultParent();
		for(var i = 0; i < parent.children.length; i ++) {
			var cell = parent.children[i];
			if(cell.isEdge() && cell.value['flowtype'] == flowtype) {
				cell.setVisible(visible);
			}
		}
		graph.refresh();
    };
    relationPanel.startupp2mButton = new Ext.Button({
		
	});
	
	relationPanel.startP2MMask = new Ext.LoadMask(document.body, {
		msg : ''+getResource('resourceParam1047')+''
	});
	
	// 中间面板
	relationPanel.centerPanel = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit',
        region:'center',
		tbar : [{
			text : ''+getResource('resourceParam1053')+'',
			id : 'relationPanelwbsbutton',
			iconCls:'icon-controlFlow',
			handler : function(button) {
				if(this.pressed) { // 如果当前控制流按钮为按下状态，在此状态下，可能为2个都按下，也可能为只有控制流按钮按下
					this.removeClass('x-btn-pressed');
					this.pressed = false;
					relationPanel.setVisible('0', false);
				} else { // 如果该按钮没有被按下，则有两种情况：1，数据流按钮按下  2，都没有按下
					this.addClass("x-btn-pressed");
					this.pressed = true;
					relationPanel.setVisible('0', true);
				}
			}
		}, {
            text : ''+getResource('resourceParam1052')+'',
            id : 'relationPanelflowbutton',
            iconCls:'icon-dataFlow2',
            handler : function(button) {
                if(this.pressed) { // 如果当前数据流按钮为按下状态，在此状态下，可能为2个都按下，也可能为只有数据流按钮按下
					this.removeClass('x-btn-pressed');
					this.pressed = false;
					relationPanel.setVisible('1', false);
				} else { // 如果该按钮没有被按下，则有两种情况：1，控制流按钮按下  2，都没有按下
					this.addClass("x-btn-pressed");
					this.pressed = true;
					relationPanel.setVisible('1', true);
				}
            }
        }, '-', {
        	id : 'blowUpW',
            text:'放大',
            iconCls : 'icon-flow-zoomin',
            scope:this,
            handler: function(item) {
				graph.zoomIn();
            }
        }, {
        	id : 'lessenW',
            text:'缩小',
            iconCls : 'icon-flow-zoomout',
            scope:this,
            handler: function(item) {
                graph.zoomOut();
            }
        }, '-', {
	        id : 'startupp2m',
			text : ''+getResource('resourceParam1051')+'',
			disabled : false,
			handler : function() {
				var priId = base.getDataId(scope.nodeid);//权限检查id
				var priType = base.getDataType(scope.nodeid);//权限检查type
				Ext.Ajax.request({
					url : "../JSON/privilege_DataPrivilegeRemote.getManipulations",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.modify) {
							relationPanel.startP2MMask.show();
							startP2M("P2M", scope.projectId, scope.taskId);
							setInterval("relationPanel.startP2MMask.hide()", 3000);
						} else {
							Ext.example.msg("提示", "没有修改权限,无法启动流程编辑器");
						}
					},
					params : {
						dataId : priId,
						dataType : priType
					}
				});
			}
        }],
		items : [relationPanel.flowPanel]
	});
	
	relationPanel.mainPanel = new Ext.Panel({
		border : false,
		layout : 'border',
		items : [relationPanel.centerPanel]
	});
	
	relationPanel.loadMask = new Ext.LoadMask(document.body, {
		msg : 'loading...'
	});
	
	relationPanel.reload = function() {
		this.active(this.projectId, this.nodeid, this.nodename);
	};
	
	/**
	 * 在激活关系面板时调用，首先从后台读取当前任务或项目的子任务填充在左边面板内
	 * 然后从后台读取流程图信息显示在流程图面板
	 */
	relationPanel.active = function(projectId, nodeid, nodename){
		if(nodeid==0) {
			graph.getModel().clear();
			return;
		}
		relationPanel.loadMask.show();
		this.projectId = '' + projectId + '';
		this.nodeid = '' + nodeid + '';
		this.nodename = '' + nodename + '';
		relationPanel.loadFlow();
	};
	
	relationPanel.getOverlay = function(status) {
		var overlay = null;
		if (status == '1') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/planningTask.png', 16, 16), '编制中');
		} else if (status == '11') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/approvingTask.png', 16, 16), '审批中');
		} else if (status == '2') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/unactiveTask.png', 16, 16), '未激活');
		} else if (status == '3') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/unacceptedTask.png', 16, 16), '未接受');
		} else if (status == '4') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/workingTask.png', 16, 16), '进行中');
		} else if (status == '5') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/confirmingTask.png', 16, 16), '确认中');
		} else if (status == '6') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/finishedTask.png', 16, 16), '已完成');
		} else if (status == '7') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/terminatedTask.png', 16, 16), '已终止');
		} else if (status == '9') {
			overlay = new mxCellOverlay(new mxImage('icons/p2m/pausedTask.png', 16, 16), '已暂停');
		}
		return overlay;
	}
	
	/**
	 * 获取流程图信息
	 */
	relationPanel.loadFlow = function() {
		// 设置初始化时的流程类型为控制流
		relationPanel.flowtype = '-1';
		Ext.getCmp('relationPanelwbsbutton').addClass('x-btn-pressed');
		Ext.getCmp('relationPanelwbsbutton').pressed = true;
		Ext.getCmp('relationPanelflowbutton').addClass('x-btn-pressed');
		Ext.getCmp('relationPanelflowbutton').pressed = true;
		var taskid = 0;
		if (this.nodeid.indexOf('p') == 0 ) {
		} else if (this.nodeid.indexOf('vp') == 0) {
		} else {
			taskid = this.nodeid;
		}
		scope.taskId = taskid;
		Ext.Ajax.request({
			url : "../JSON/flow_FlowRemote.loadFlow",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					graph.getModel().clear();
    				graph.getModel().beginUpdate();
    				try {
				    	var parent = graph.getDefaultParent();
						if (obj.flow && obj.flow != 'none') { // 如果当前任务或项目没有定制流程，则默认插入开始和结束节点
							scope.flowid = obj.flow.flowid;
							
							// 获取流程的节点
							var nodes = obj.flow.nodes ? obj.flow.nodes : new Array();
							
							// 通过以下两个对象缓存添加的页面上的所有节点，以方便在添加连接线和添加驱动因素映射关系时，通过流程节点id和流程节点nodeid来获取页面上的节点元素
							// 以流程节点的id为key，以流程节点为value的对象
							var activityIdMap = new Object();
							// 以流程节点的nodeid为key，以流程节点为value的对象
							var nodeidMap = new Object();
							
							// 通过不同的节点类型分别添加不同类型的节点
							for(var i = 0; i < nodes.length; i ++) {
								var node = nodes[i];
								if(node.nodetypeid == '4') {
									// 添加开始节点
									var value = new Object();
									value['name'] = '开始';
									value['activityid'] = node.activityid;
									value['nodeid'] = 0;
									value['nodetypeid'] = 4;
									value['notFireAddEvent'] = true;
									var vertex = graph.insertVertex(parent, -1, value, node.positionx * 2.5, node.positiony * 2.5, 50, 50, 'shape=image;image=icons/p2m/flow/start.png;verticalLabelPosition=bottom;verticalAlign=top');
									nodeidMap[node.nodeid] = vertex;
									activityIdMap[node.activityid] = vertex;
								} else if (node.nodetypeid == '5') {
									// 添加结束节点
									var value = new Object();
									value['name'] = '结束';
									value['activityid'] = node.activityid;
									value['nodeid'] = 0;
									value['nodetypeid'] = 5;
									value['notFireAddEvent'] = true;
									var vertex = graph.insertVertex(parent, -2, value, node.positionx * 2.5, node.positiony * 2.5, 50, 50, 'shape=image;image=icons/p2m/flow/end.png;verticalLabelPosition=bottom;verticalAlign=top');
									nodeidMap[node.nodeid] = vertex;
									activityIdMap[node.activityid] = vertex;
								} else if (node.nodetypeid == '0') {
									// 添加普通任务节点
									var value = new Object();
									value['name'] = node.text;
									value['activityid'] = node.activityid;
									value['nodeid'] = node.nodeid;
									value['nodetypeid'] = node.nodetypeid;
									value['notFireAddEvent'] = true;
									var vertex = graph.insertVertex(parent, null, value, node.positionx * 2.5, node.positiony * 2.5, 48, 48, 'shape=image;image=icons/p2m/flow/task.png;verticalLabelPosition=bottom;verticalAlign=top');
									graph.addCellOverlay(vertex, relationPanel.getOverlay(node.taskstatus));
									nodeidMap[node.nodeid] = vertex;
									activityIdMap[node.activityid] = vertex;
								} else if (node.nodetypeid == '6') {
									// 添加审批任务节点
									var value = new Object();
									value['name'] = node.text;
									value['activityid'] = node.activityid;
									value['nodeid'] = node.nodeid;
									value['nodetypeid'] = node.nodetypeid;
									value['notFireAddEvent'] = true;
									var vertex = graph.insertVertex(parent, null, value, node.positionx * 2.5, node.positiony * 2.5, 48, 48, 'shape=image;image=icons/p2m/flow/approvalTask.png;verticalLabelPosition=bottom;verticalAlign=top');
									graph.addCellOverlay(vertex, relationPanel.getOverlay(node.taskstatus));
									nodeidMap[node.nodeid] = vertex;
									activityIdMap[node.activityid] = vertex;
								} else if (node.nodetypeid == '1') {
									// 添加判断节点
									var value = new Object();
									value['name'] = node.text;
									value['activityid'] = node.activityid;
									value['nodeid'] = node.nodeid;
									value['nodetypeid'] = node.nodetypeid;
									value['notFireAddEvent'] = true;
									var vertex = graph.insertVertex(parent, null, value, node.positionx * 2.5, node.positiony * 2.5, 32, 32, 'shape=image;image=icons/p2m/flow/judge.png;verticalLabelPosition=bottom;verticalAlign=top');
									nodeidMap[node.nodeid] = vertex;
									activityIdMap[node.activityid] = vertex;
								} else if (node.nodetypeid == '2') {
									// 添加分支节点
									var value = new Object();
									value['name'] = node.text;
									value['activityid'] = node.activityid;
									value['nodeid'] = node.nodeid;
									value['nodetypeid'] = node.nodetypeid;
									value['notFireAddEvent'] = true;
									var vertex = graph.insertVertex(parent, null, value, node.positionx * 2.5, node.positiony * 2.5, 32, 32, 'shape=image;image=icons/p2m/flow/branch.png;verticalLabelPosition=bottom;verticalAlign=top');
									nodeidMap[node.nodeid] = vertex;
									activityIdMap[node.activityid] = vertex;
								}
							}
							
							// 添加所有连接线
							var relations = obj.flow.relations ? obj.flow.relations : new Array();
							for (var i = 0; i < relations.length; i ++) {
								var relation = relations[i];
								var pointX = relation.pointX;
								var pointY = relation.pointY;
								var oriVertex = activityIdMap[relation.originalid];
								var desVertex = activityIdMap[relation.destinationid];
								
								var value = new Object();
								value['name'] = '';
								value['originalindex'] = relation.originalindex;
								value['flowtype'] = relation.flowtype;
								value['relationid'] = relation.relationid;
								value['notFireAddEvent'] = true;
	        					var edge = graph.insertEdge(parent, null, value, oriVertex, desVertex);
								// 如果连接线的源节点是审批节点或者判断节点，则设置该连接线的出线类型‘是’或‘否’
								if(oriVertex.value['nodetypeid'] == '1' || oriVertex.value['nodetypeid'] == '6') {
									if(relation.originalindex == '1') {
										edge.value['name'] = '是';
									} else if(relation.originalindex == '2') {
										edge.value['name'] = '否';
									}
								}
								if(relation.flowtype == '1') {
									edge.setStyle('defaultEdge');
								} else if (relation.flowtype == '0') {
									edge.setStyle('dataEdge');
								}
								if(pointX!=null && pointX!='' && pointY!=null && pointY!='') {
	        						edge.getGeometry().points = [{x : pointX, y : pointY}];
								}
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
				relationPanel.loadMask.hide();
			},
			disableCaching : true,
			params : {
				projectId : scope.projectId,
				taskId : taskid
			}
		});
	};
	
	/**
     * 当流程节点移动时，update FlowActivity的坐标
     */
    graph.addListener(mxEvent.CELLS_MOVED, function(sender, evt) {
    	var newCells = evt.properties.cells;
    	for(var i = 0; i < newCells.length; i ++) {
    		var newCell = newCells[i];
    		if(newCell.isVertex()) { // 如果移动元素为节点
		    	scope.loadMask.show();
				var newCellGeometry = newCell.getGeometry();
		    	Ext.Ajax.request({
					url : "../JSON/flow_FlowRemote.updatePosition",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						scope.loadMask.hide();
						if(obj.success) {
						} else {
							relationPanel.reload();
						}
					},
					failure : function(response, options) {
						relationPanel.reload();
					},
					disableCaching : true,
					params : {
						activityID : newCell.value['activityid'],
						positionx : newCellGeometry.x/2.5,
						positiony : newCellGeometry.y/2.5
					}
				});
			}
    	}
    });
    
	mxEdgeHandler.prototype.changePoints = function(edge, points) {
	    var model = this.graph.getModel();
	    var geo = model.getGeometry(edge);
	    if (geo != null) {
	        geo = geo.clone();
	        geo.points = points;
	        model.setGeometry(edge, geo);
	    }
	    if(points[0]) {
		    Ext.Ajax.request({
				url : "../JSON/flow_FlowRemote.updateRelationPoint",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					scope.loadMask.hide();
					if(obj.success) {
					} else {
						relationPanel.reload();
					}
				},
				failure : function(response, options) {
					relationPanel.reload();
				},
				disableCaching : true,
				params : {
					activityRelationID : edge.value['relationid'],
					pointx : points[0].x,
					pointy : points[0].y
				}
			});
	    }
	};
	
	return relationPanel.mainPanel;
}
