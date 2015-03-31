var collarbCardFrame = {};


collarbCardFrame.init = function() {
	
	
	
	collarbCardFrame.form = collarbForm.init();
	 collarbForm.start1=null;
	collarbForm.end1=null;
	collarbCardFrame.extendform = collarbExtendForm.init();

	collarbCardFrame.panel1 = new Ext.Panel({
				title : ''+getResource('resourceParam1557')+'',
				layout : 'fit',
				border : false,
				items : [collarbCardFrame.form]
			});

	collarbCardFrame.panel2 = new Ext.Panel({
				title : ''+getResource('resourceParam1556')+'',
				layout : 'fit',
				border : false,
				items : [collarbCardFrame.extendform]
			});

	collarbCardFrame.card = new Ext.Panel({
				layout : 'card',
				activeItem : 0,
				frame : false,
				border : false,
				split : true,
				buttonAlign : 'center',
				items : [collarbCardFrame.panel1, collarbCardFrame.panel2]

			});

	return collarbCardFrame.card;
}
