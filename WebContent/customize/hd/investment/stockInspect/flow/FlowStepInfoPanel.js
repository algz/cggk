/**
 * 查看一个审批步骤的审批信息列表
 * @class FlowStepInfoPanel
 * @extends Ext.Panel
 * @author CaoRT
 * @date 2011-11-25
 */
FlowStepInfoPanel = Ext.extend(Ext.Panel, {
	
	flowStepGrid : null,
	
	stepTbar : null,
	
	viewCurBtn : null,
	
	viewAllBtn : null,
	
    constructor : function(config) {
	 	this.initFlowStepGrid();
        config = Ext.apply({
        	layout : 'border',
        	items : [this.flowStepGrid]
        }, config);
        FlowStepInfoPanel.superclass.constructor.call(this, config);
    },
    
    initFlowStepGrid : function() {
    	this.flowStepGrid = approveFlowSteps.getGrid();
    	this.flowStepGrid.region = 'center';
    },
    
    loadData : function() {
		approveFlowSteps.getAllApprovalRecord(this.objectId, this.objectType);
    }
});
