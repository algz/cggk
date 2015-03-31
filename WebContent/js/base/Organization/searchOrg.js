var searchOrg = {
	searchWin : null,
	searchForm : null
};
// 按照条件查询机构对话框
searchOrg.initWindow = function() {
	searchOrg.searchWin = new Ext.Window({
				title : '' + getResource('resourceParam706') + '',
				width : 300,
				height : 160,
				modal : true,
				resizable : false,
				plain : false,
				layout : 'fit'
			});
	searchOrg.searchWin.on('hide', searchOrg.closeWin);
};
// 点击确认走的提交方法
searchOrg.submit = function() {
	// 清空原有数据
	 orgManage.grid.getSelectionModel().clearSelections();
	// orgManage.grid.getStore().removeAll();
	var count = orgManage.grid.getStore().getCount();
	for (i = count - 1; i >= 0; i--) {
		orgManage.grid.getStore().remove(i);
	}
	orgManage.baseargs = {
		instcode : searchOrg.searchForm.form.getValues().instcode,
		name : searchOrg.searchForm.form.getValues().name,
		sign : '1'
	};
	// 按照查询条件重新加载数据
	orgManage.grid.getStore().load({
				callback : function() {
					orgManage.grid.getStore().each(function(rec) {
								if (rec.get("instlevel") == "") {
									orgManage.grid.getStore().expandNode(rec);
								}
							})
				}
			});
	searchOrg.closeWin();
}
// 关闭查询对话框时执行的函数
searchOrg.closeWin = function() {
	if (searchOrg.searchWin != null) {
		searchOrg.searchWin.close();
		searchOrg.searchWin.destroy();
	}
}
// 查询机构form表单
searchOrg.initForm = function() {
	searchOrg.searchForm = {
		xtype : 'form',
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		labelAlign : "left",
		labelSeparator : ':',
		labelWidth : 95,
		frame : true,
		buttons : [{
					text : '' + getResource('resourceParam505') + '',
					handler : searchOrg.submit
				}, {
					text : '' + getResource('resourceParam7007') + '',
					handler : searchOrg.closeWin
				}],
		defaultType : 'textfield',
		items : [{
					id : 'instcode',
					fieldLabel : "" + getResource('resourceParam697') + "",
					name : 'instcode',
					anchor : '90%'
				}, {
					id : 'name',
					fieldLabel : "" + getResource('resourceParam685') + "",
					name : 'name',
					anchor : '90%'
				}]
	}
	return searchOrg.searchForm;
}

searchOrg.init = function() {
	searchOrg.initWindow();
	searchOrg.searchForm = searchOrg.searchWin.add(searchOrg.initForm());
	searchOrg.searchWin.show(this);
}