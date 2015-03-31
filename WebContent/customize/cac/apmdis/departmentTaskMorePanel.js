
var departmentTaskMorePanel = {
	departmentId : 0,
	taskStatusId : -1,
	pagingParam : {start : 0, limit : 20}
};



//部门下拉选择框（直接调用平台封装好的）
departmentTaskMorePanel.setDepartmentComboBox = function() {
	departmentUser.department('');//设置字段名字
	departmentUser.departmentCombo.setWidth(190);//设置组件宽度
	departmentUser.departmentCombo.allowBlank = true;//设置是否允许为空
	//监听选择事件
	departmentUser.departmentCombo.on('select', function(combo, record, index){
		departmentTaskMorePanel.departmentId = record.id;
		//departmentTaskMorePanel.queryByMuilParam();
	})
}

//根据部门或者状态查询任务
departmentTaskMorePanel.queryByMuilParam = function() {//待完善
//	centerPanel = departmentTaskTypeGrid.outerAssignTask();
//	store = centerPanel.getStore();
//	store.proxy.conn.url = '../JSON/departmentTask_DepartmentTaskRemote.getOuterAssignedTaskListByMuilParam?departmentId='+departmentTaskMorePanel.departmentId+'&taskStatusId='+departmentTaskMorePanel.taskStatusId;
//	store.load({params : departmentTaskMorePanel.pagingParam});
//	var panel = Ext.getCmp('moreCenterPanel');
//	panel.removeAll();
//	panel.add(centerPanel);
//	panel.doLayout();
}

//任务状态 下拉选择框
departmentTaskMorePanel.taskStatusComboBox = function() {
	var store = new Ext.data.SimpleStore({
		fields : ['taskStatusId', 'taskStatusName'],
		data : [[-1, '所有状态'],[3, '未接收'],[4, '进行中'],[11, '审批中'],[6, '已完成'], [7, '已终止']]
	});
	var comboBox = new Ext.form.ComboBox({
		id : 'taskStatusCob',
		triggerAction : 'all',
		store : store,
		displayField : 'taskStatusName',
		valueField : 'taskStatusId',
		mode : 'local'
	});
	comboBox.on('select', function(combo){
		departmentTaskMorePanel.taskStatusId = combo.getValue();
	})
	return comboBox;
};

//组合框组合面板（采用table布局）
departmentTaskMorePanel.northPanel = function(flag){
	var title = '';
	if (flag == 'outerAssignedTask'){
		title = '<span style="line-height:18px;padding-left:5px;font-size:12;">派发单位:</span>';
	} else if(flag == 'inerAssignedTask'){
		title = '<span style="line-height:18px;padding-left:5px;font-size:12;">负责单位:</span>';
	}
	//调用部门下拉视图
	departmentTaskMorePanel.setDepartmentComboBox();
	var panel = new Ext.Panel({
		layout : 'table',
		//width : 800,
		height : 30,
		border : false,
		layoutConfig : {
			columns : 6	
		},
		defaults : {
			bodyStyle : 'padding:3px 5px;'
		},
		items : [{
			html : title,
			id : 'title1',
			width : 80,
			bodyBorder : false
		},{
			bodyBorder : false,
			id : 'comb1',
			width : 200,
			items : [departmentUser.departmentCombo]
		},{
			html : '<span style="line-height:18px;padding-left:5px;font-size:12;">选择状态:</span>',
			width : 80,
			bodyBorder : false
		},{
			bodyBorder : false,
			width : 180,
			items : [departmentTaskMorePanel.taskStatusComboBox()]
		},{
			xtype : 'button',
			text : '返回上页',
			handler : function(){
				var viewport = Ext.getCmp('departmentTaskMain');
				viewport.getLayout().setActiveItem('departmentTaskPanel');
			}
		}]
	});
	if (flag == 'ownTask') {
		panel.remove('title1');
		panel.remove('comb1');
		panel.doLayout();
	}
	return panel;
}

//根据标志参数，返回相应的表格面板
departmentTaskMorePanel.init = function (flag) {
	var centerPanel = null;
	var store = null;
	if (flag == 'ownTask') {
		centerPanel = departmentTaskTypeGrid.ownTask();
		store = centerPanel.getStore();
		store.proxy.conn.url = '../JSON/departmentTask_DepartmentTaskRemote.getOnwTaskList?limitFlag=0';
	} else if(flag == 'outerAssignedTask') {
		centerPanel = departmentTaskTypeGrid.outerAssignTask();
		store = centerPanel.getStore();
		store.proxy.conn.url = '../JSON/departmentTask_DepartmentTaskRemote.getOuterAssignedTaskList?limitFlag=0';
	} else if(flag == 'inerAssignedTask') {
		centerPanel = departmentTaskTypeGrid.inerAssignTask();
		store = centerPanel.getStore();
		store.proxy.conn.url = '../JSON/departmentTask_DepartmentTaskRemote.getInerAssignedTaskList?limitFlag=0';
	}
	//添加分页工具栏
	if (centerPanel.getBottomToolbar() == undefined) {
		centerPanel.insert(0,departmentTaskTypeGrid.paging(store));
	}
	store.load({params : departmentTaskMorePanel.pagingParam});
	var panel = new Ext.Panel({
		id : 'departmentTaskMorePanel',
		layout : 'border',
		height : 800,
		items : [{
			region : 'north',
			height : 30,
			items : [departmentTaskMorePanel.northPanel(flag)]
		},{
			region : 'center',
			xtype : 'panel',
			id : 'moreCenterPanel',
			layout : 'fit',
			items : [centerPanel]
		}]
	});
	return panel;
};
