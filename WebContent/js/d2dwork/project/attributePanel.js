var attributePanel = {};
attributePanel.init = function() {
	attributePanel.ApproveTaskPanel= new Ext.Panel( {
		frame : false,
		boder : false,
		layout : 'fit',
		items : [ viewApproveTask.init() ]
	});
	attributePanel.attributePanel = new Ext.Panel( {
		frame : false,
		boder : false,
		layout : 'card',
		items : [ ProjectAttributePanel.init(), TaskAttributePanel.init(),
				attributePanel.ApproveTaskPanel ],
		activeItem : 0
	});

	return attributePanel.attributePanel;
}
