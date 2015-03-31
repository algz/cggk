
var departmentTaskDetailMainPanel = {
	taskId : null,
	taskName : null
};


//顶部面板，采用table panel 布局
departmentTaskDetailMainPanel.northPanel = function(){
	var panel = new Ext.Panel({
		layout : 'table',
		//width : 800,
		height : 30,
		border : false,
		layoutConfig : {
			columns : 3	
		},
		defaults : {
			bodyStyle : 'padding:3px 5px;'
		},
		items : [{
			html : '<span style="line-height:18px;padding-left:5px;font-size:12;">任务名称:'+departmentTaskDetailMainPanel.taskName+'</span>',
			width : 140,
			bodyBorder : false
		},{
			bodyBorder : false,
			width : 60,
			html : ''
		},{
			xtype : 'button',
			text : '返回上页',
			handler : function(){
				var viewport = Ext.getCmp('departmentTaskMain');
				viewport.getLayout().setActiveItem('departmentTaskPanel');
			}
		}]
	});
	return panel;
}


departmentTaskDetailMainPanel.init = function (taskId, taskName) {
	departmentTaskDetailMainPanel.taskId = taskId;
	departmentTaskDetailMainPanel.taskName = taskName;
	var cententPanel = departmentTaskDetailTabPanel.mainTabPanel(taskId, taskName);
	var panel = new Ext.Panel({
		id : 'departmentTaskDetailMainPanel',
		layout : 'border',
		height : 800,
		items : [{
			region : 'north',
			height : 30,
			items : [departmentTaskDetailMainPanel.northPanel()]
		},{
			region : 'center',
			layout : 'fit',
			items : [cententPanel]
		}]
	});
	return panel;
};
