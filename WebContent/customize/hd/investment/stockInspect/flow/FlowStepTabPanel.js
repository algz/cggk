/**
 * 流程监控tab页
 * @class FlowStepTabPanel
 * @extends Ext.TabPanel
 * @author CaoRT
 * @date 2011-11-26
 */
FlowStepTabPanel = Ext.extend(Ext.TabPanel, {
	
	objectType : null,
	
	objectId : null,
	
	flowStepViewPanel : null,
	
	dataObjectViewPanel : null,
	
	flowStepInfoPanel : null,
	
    constructor : function(config) {
    	if(config) {
    		if(config.objectType) {
    			this.objectType = config.objectType;
    		}
    		if(config.objectId) {
    			this.objectId = config.objectId;
    		}
    	}
    	this.initFlowStepInfoPanel();
    	this.initDataObjectViewPanel();
    	this.initFlowViewPanel();
        config = Ext.apply({
        	activeItem : 0,
            items : [
            	this.flowStepViewPanel,
            	this.flowStepInfoPanel,
            	this.dataObjectViewPanel
            ]
        }, config);
        FlowStepTabPanel.superclass.constructor.call(this, config);
    },
    
    initFlowViewPanel : function() {
    	var scope = this;
    	this.flowStepViewPanel = new FlowStepViewPanel({
    		title : '审批进度',
    		border : false,
    		listeners : {
    			'activate' : function() {
			    	this.viewFlowInstanceByObject(scope.objectId, scope.objectType);
    			}
    		}
    	});
    },
    
    initDataObjectViewPanel : function() {
    		var scope = this;
		this.dataObjectViewPanel = new Ext.Panel({
			title : '审批对象',
			layout : 'fit',
			border : false,
			frame : false,
//			items : [objectPanel]
			listeners : {
    			'activate' : function() {
//    				this.loadData();
    				var objectPanel = eval(scope.objectType + "ApprovalObjectPanel.init('" +scope.objectId + "')");
    				this.add(objectPanel);
    			}
    		}
		});
    },
    
    initFlowStepInfoPanel : function() {
    	var scope = this;
    	this.flowStepInfoPanel = new FlowStepInfoPanel({
    		title : '审批记录',
    		border : false,
    		objectId : scope.objectId,
    		objectType : scope.objectType,
    		listeners : {
    			'activate' : function() {
    				this.loadData();
    			}
    		}
    	});
    }
    
});
