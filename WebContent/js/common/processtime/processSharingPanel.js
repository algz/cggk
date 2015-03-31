var processSharingPanel = {projectid:null,taskid:null}
// taskid=0时，是项目ID有值
processSharingPanel.init = function() {
	processSharingPanel.grid = processGrid.init();
	var b = new Ext.Panel({
		id : 'etabpanel18',
		height : 800,
		title : getResource("resourceParam4023"),
		layout : 'fit',
		items : [processSharingPanel.grid]
	});
	return b;
}
