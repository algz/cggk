var TaskCardFrame = {};

TaskCardFrame.init = function(callback) {
	TaskCardFrame.basicForm = TaskBasicForm.init(callback);
	TaskBasicForm.start1=null;
	TaskBasicForm.end1=null;
	TaskCardFrame.extendForm = TaskExtendForm.init(callback);

	TaskCardFrame.panel1 = new Ext.Panel({
		title : ''+getResource('resourceParam1055')+'',
		layout : 'fit',
		border : false,
		items : [TaskCardFrame.basicForm]
	});

	TaskCardFrame.panel2 = new Ext.Panel({
		title : ''+getResource('resourceParam1564')+'',
		layout : 'fit',
		border : false,
		items : [TaskCardFrame.extendForm]
	});

	TaskCardFrame.card = new Ext.Panel({
		layout : 'card',
		activeItem : 0,
		height : 300,
		width : 600,
		frame : false,
		border : false,
		split : true,
		buttonAlign : 'center',
		items : [TaskCardFrame.panel1, TaskCardFrame.panel2]
	});

	return TaskCardFrame.card;
}
