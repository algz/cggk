var collarbViewExtendForm = {};
collarbViewExtendForm.init = function(buttonWidth) {
	collarbViewExtendForm.extendForm = new Ext.form.FormPanel({
		autoScroll : true,
		border : false,
		bodyStyle : 'padding:10px 10px 10px 10px',
		items : [new Ext.form.Label({
			html : "<div style='padding-left:" + buttonWidth + "px;'/>" +
					"<a href='javascript:void(0);'  " +
					"onClick='collarbViewExtendForm.formerPage()' " +
					"style='text-decoration:underline;color:blue;white-space:nowrap;''>"+getResource('resourceParam944')+"</a></div>"
		})]

	});
	return collarbViewExtendForm.extendForm;
}
