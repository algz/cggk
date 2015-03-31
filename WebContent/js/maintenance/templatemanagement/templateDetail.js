

var templateDatail = {
	conflict:false//用于协同工程中，标记是否与原有的属性tab页冲突
};

templateDatail.init = function(config) {
	templateDatail.conflict=true;
	templateDatail.tree=templateTree.init();
	templateTree.rootName =config.rootName;
	templateTree.projectId =config.rootId;
	
	templateDatail.westPanel = new Ext.Panel({
				region : 'west',
				width : 200,
				height : 800,
				boder : false,
				autoScroll : true,
				collapsible : true,
				split : true,
				layout : 'fit',
				title : '模板结构',
				items:[templateTree.init()]
			});

	templateDatail.centerPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [templateTabPanel.init()]
			});
	templateDatail.mainPanel = new Ext.Panel({
				region : 'center',
				layout : 'border',
				boder : false,
				items : [templateDatail.westPanel, templateDatail.centerPanel]
			});
	return templateDatail.mainPanel;
}
