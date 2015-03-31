function back1(id, name) {
	cateGoryMain.cateGorypanel.getLayout().setActiveItem(0);
	window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''
			+ getResource('resourceParam1791') + '' + name;
}
var cateGoryAttribute = {
	projectcategoryid : null,
	projectcategoryname : null
};
cateGoryAttribute.init = function() {
	cateGoryAttribute.basicgrid = cateGoryBasic.init();
	cateGoryAttribute.extendgrid = cateGoryExtend.init();
	cateGoryAttribute.basic = new Ext.Panel({
				title : '' + getResource('resourceParam859') + '',
				border : false,
				layout : 'fit',
				listeners : {
					activate : loadBasic
				},
				items : [cateGoryAttribute.basicgrid]
			});
	cateGoryAttribute.extend = new Ext.Panel({
				title : '' + getResource('resourceParam1036') + '',
				border : false,
				layout : 'fit',
				listeners : {
					activate : loadExtend
				},
				items : [cateGoryAttribute.extendgrid]
			});
	cateGoryAttribute.bak = new Ext.Panel({
				title : '' + getResource('resourceParam944') + '',
				border : false,
				layout : 'fit',
				listeners : {
					activate : function() {
						back1(cateGoryAttribute.projectcategoryid,
								cateGoryAttribute.projectcategoryname)
					}
				}
			});
	function loadBasic() {
		myGrid.loadvalue(cateGoryAttribute.basicgrid.store, cateGoryMain.args,
				null);
	}

	function loadExtend() {
		myGrid.loadvalue(cateGoryExtend.grid.store, {
					start : 0,
					limit : 25
				}, cateGoryMain.baseargs);
	}
	cateGoryAttribute.tabpanels = new Ext.TabPanel({
				minTabWidth : 300,
				resizeTabs : false,
				forceLayout : true,
				border : false,
				hidden : false,
				items : [cateGoryAttribute.basic, cateGoryAttribute.extend,cateGoryAttribute.bak],
				activeTab : 0
			});

	return cateGoryAttribute.tabpanels;
}
