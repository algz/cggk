/**
 * 画图工具封装类
 * @class FlowGraphPanel
 * @extends Ext.Panel
 * @author CaoRT
 * @date 2011-11-25
 */
FlowGraphPanel = Ext.extend(Ext.Panel, {
	
	graph : null, // 流程图画布组件
	
    constructor : function(config) { // 构造方法
		// copy其它配置项
        config = Ext.apply({
        	autoScroll : true
        }, config);
        
        // 调用父类构造函数创建实例
        FlowGraphPanel.superclass.constructor.call(this, config);
    },
    
    initComponent : function(){ // 为组件注册双击事件
        FlowGraphPanel.superclass.initComponent.call(this);
        this.addEvents(
        	/**
        	 * @event nodeclick 单击流程图中的节点时触发
        	 * @param obj 节点上保存的自定义对象（用来存储和图形无关的数据）
        	 * @param cell 节点本身，可通过节点获取所有节点上的信息
        	 */
            'nodeclick', // 当流程节点被单击时，触发该事件
        	/**
        	 * @event lineclick 单击流程图中的连接线时触发
        	 * @param obj 连接线上保存的自定义对象（用来存储和图形无关的数据）
        	 * @param cell 连接线本身，可通过连接线获取所有连接线上的信息
        	 */
            'lineclick', // 当流程节点被单击时，触发该事件
            /**
        	 * @event nodeclick 双击流程图中的节点时触发
        	 * @param obj 节点上保存的自定义对象（用来存储和图形无关的数据）
        	 * @param cell 节点本身，可通过节点获取所有节点上的信息
        	 */
            'nodedbclick', // 当流程节点被双击时，触发该事件
        	/**
        	 * @event lineclick 双击流程图中的连接线时触发
        	 * @param obj 连接线上保存的自定义对象（用来存储和图形无关的数据）
        	 * @param cell 连接线本身，可通过连接线获取所有连接线上的信息
        	 */
            'linedbclick' // 当流程节点被双击时，触发该事件
        );
    },
    
    afterRender : function() { // 面板加载后要处理的事件
    	FlowGraphPanel.superclass.afterRender.call(this);
    	this.initGraph();
    },
    
    regDBClickEvent : function() { // 为面板注册双击事件
    	var scope = this;
	    this.graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt){
			var clickCell = evt.properties.cell;
			if(!clickCell) return;
			if(clickCell.isVertex()) { // 如果双击的是节点
				scope.fireEvent('nodedbclick', clickCell.value, clickCell);
			} else if (clickCell.isEdge()) { // 如果双击的连接线
				scope.fireEvent('linedbclick', clickCell.value, clickCell);
			}
	    });
    },
    
    regClickEvent : function() { // 为面板注册点击事件
    	var scope = this;
	    this.graph.addListener(mxEvent.CLICK, function(sender, evt){
			var clickCell = evt.properties.cell;
			if(!clickCell) return;
			if(clickCell.isVertex()) { // 如果单击的是节点
				scope.fireEvent('nodeclick', clickCell.value, clickCell);
			} else if (clickCell.isEdge()) { // 如果单击的连接线
				scope.fireEvent('lineclick', clickCell.value, clickCell);
			}
	    });
    },
    
    initGraph : function() { // 初始化graph组件，并配置相关属性及样式
    	graph = new mxGraph();
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
		
		graph.init(this.body.dom);
		
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
		
		this.graph = graph;
		
		this.regClickEvent();
		this.regDBClickEvent();
    },
    
    addNode : function(x, y, width, height, obj, icon) { // 添加一个节点
    	var parent = this.graph.getDefaultParent();
		var vertex = this.graph.insertVertex(parent, null, obj, x, y, width, height, 'shape=image;image=' + icon + ';verticalLabelPosition=bottom;verticalAlign=top');
		return vertex;
    },
    
    addConnection : function(source, target, obj) {
    	var parent = this.graph.getDefaultParent();
    	var edge = this.graph.insertEdge(parent, null, obj, source, target);
    }
});