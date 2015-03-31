function back(id, name) {
	taskCateMain.taskCatepanel.getLayout().setActiveItem(0);
	window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''
			+ getResource('resourceParam1635') + '' + name;
}
var taskCateAttribute = {
	taskcategoryid : null,
	taskcategoryname : null
};

taskCateAttribute.init = function() {
	taskCateAttribute.basicgrid = taskCateBasic.init();
	taskCateAttribute.extendgrid = taskCateExtend.init();
	taskCateAttribute.basic = new Ext.Panel({
				title : '' + getResource('resourceParam859') + '',
				border : false,
				layout : 'fit',
				listeners : {
					activate : loadBasic
				},
				items : [taskCateAttribute.basicgrid]
			});
	taskCateAttribute.extend = new Ext.Panel({
				title : '' + getResource('resourceParam1036') + '',
				border : false,
				layout : 'fit',
				listeners : {
					activate : loadExtend
				},
				items : [taskCateAttribute.extendgrid]
			});
	taskCateAttribute.bak = new Ext.Panel({
				title : '' + getResource('resourceParam944') + '',
				border : false,
				layout : 'fit',
				listeners : {
					activate : function() {
						back(taskCateAttribute.taskcategoryid,
								taskCateAttribute.taskcategoryname)
					}
				}
			});
	function loadBasic() {
		myGrid.loadvalue(taskCateAttribute.basicgrid.store, taskCateMain.args,
				null);
	}
	function loadExtend() {
		myGrid.loadvalue(taskCateExtend.grid.store, {
					start : 0,
					limit : 25
				}, taskCateMain.baseargs);
	}
	taskCateAttribute.tabpanels = new Ext.TabPanel({
				minTabWidth : 300,
				resizeTabs : false,
				border : false,
				hidden : false,
				items : [taskCateAttribute.basic, taskCateAttribute.extend,taskCateAttribute.bak],
				activeTab : 0
			});

	return taskCateAttribute.tabpanels;
}
