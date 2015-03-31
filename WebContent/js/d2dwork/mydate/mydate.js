Ext.onReady(function() {
	new Ext.Viewport({

		layout : 'border',
		fitToFrame : true,
		items : [{
			id : 'mydate_panel',
			region : 'center',

			layout : 'card',
			// margins:'2 5 5 0',
			activeItem : 0,
			border : false,
			items : [datePanel]

		}]

	});
});
var datePanel = new Ext.Panel({
	id : 'datePanel',
	html : "<iframe scrolling=auto  frameborder=0 width=100% height=100% src='../mydate/myDateMain.html' ></iframe>",
	layout : 'fit'
   
});
