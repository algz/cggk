var updateTaskCard = {};

updateTaskCard.init = function(callback) {


	
	updateTaskCard.basicForm = updateTaskBasic.init(callback);
	updateTaskCard.extendForm = updateTaskExtend.init(callback);

	updateTaskCard.panel1 = new Ext.Panel({
				title : ''+getResource('resourceParam1572')+'',
				layout : 'fit',
				border : false,
				items : [updateTaskCard.basicForm]
			});

	updateTaskCard.panel2 = new Ext.Panel({
				title : ''+getResource('resourceParam1573')+'',
				layout : 'fit',
				border : false,
				items : [updateTaskCard.extendForm]
			});

	updateTaskCard.card = new Ext.Panel({
				layout : 'card',
				activeItem : 0,
				height : 300,
				width : 600,
				frame : false,
				border : false,
				split : true,
				buttonAlign : 'center',
				items : [

						updateTaskCard.panel1, updateTaskCard.panel2

				]

			});

	return updateTaskCard.card;
}
