var dataObjectAddTabPanel = {

}
dataObjectAddTabPanel.init = function(node) {
	var panel = new Ext.Panel({
				html : 'sfs'
			});
			
	var tabpanel = new Ext.TabPanel({
				items : [panel]
			});
	return tabpanel;
}
