/**
 * 流程实例监控窗口
 * @class FlowStepWindow
 * @extends Ext.Window
 * @author CaoRT
 * @date 2011-11-25
 */
FlowStepWindow = Ext.extend(Ext.Window, {
	
	objectType : null,
	
	objectId : null,
	
	flowStepTabPanel : null,
	
    constructor : function(config) { // 构造方法
    	if(config) {
    		if(config.objectType) {
    			this.objectType = config.objectType;
    		}
    		if(config.objectId) {
    			this.objectId = config.objectId;
    		}
    	}
    	this.initFlowStepTabPanel();
		// copy其它配置项
        config = Ext.apply({
        	width : 800,
        	height : 500,
        	layout : 'fit',
        	items : [this.flowStepTabPanel]
        }, config);
        
        // 调用父类构造函数创建实例
        FlowStepWindow.superclass.constructor.call(this, config);
    },
    
    initFlowStepTabPanel : function() {
    	var scope = this;
    	this.flowStepTabPanel = new FlowStepTabPanel({
    		objectId : scope.objectId,
    		objectType : scope.objectType,
    		border : false
    	});
    }
});