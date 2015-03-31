var updateProjectCard = {};

updateProjectCard.init = function() {
	updateProjectCard.form = updateProjectBasic.init();
	updateProjectCard.extendform = updateProjectExtend.init();

	updateProjectCard.panel1 = new Ext.Panel({
				title : ''+getResource('resourceParam1569')+'',
				layout : 'fit',
				border : false,
				items : [updateProjectCard.form]
			});

	updateProjectCard.panel2 = new Ext.Panel({
				title : ''+getResource('resourceParam1568')+'',
				layout : 'fit',
				border : false,
				items : [updateProjectCard.extendform]
			});

	updateProjectCard.card = new Ext.Panel({
				layout : 'card',
				activeItem : 0,
				frame : false,
				border : false,
				split : true,
				buttonAlign : 'center',
				items : [updateProjectCard.panel1, updateProjectCard.panel2]

			});

	return updateProjectCard.card;
}
