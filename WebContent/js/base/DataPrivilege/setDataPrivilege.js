var setDataPrivilege = {
	dataId : null,
	dataType : null,
	privileged : true,
	mutiFirst : true
	// 是否勾选了多条数据，并且是第一次修改

};
// 生成数据权限的panel
setDataPrivilege.init = function(config) {// 传递数据id和数据类型
	setDataPrivilege.config = config;
	selectedUserAndRole.baseargs.privileged = setDataPrivilege.privileged;
	dataPrivilege.privileged = setDataPrivilege.privileged;
	setDataPrivilege.selectedUserAndRoleGridPanel = selectedUserAndRole.init();
	setDataPrivilege.privilegePanel = dataPrivilege.init();

	setDataPrivilege.main = new Ext.Panel({
				layout : 'border',
				border : false,
				frame : false,
				hideBorders:true,
				autoScroll : true,
				items : [setDataPrivilege.selectedUserAndRoleGridPanel,
						setDataPrivilege.privilegePanel],
				listeners : {
					bodyresize : function(panel, width, height) {
						var h = 365
						if (setDataPrivilege.config.height) {
							h = setDataPrivilege.config.height;
						}
						if (height < h) {
							panel.setHeight(h);
						} else {
							panel.setHeight(height);
						}
					},
					afterrender : function() {
					}
				}
			});

	setDataPrivilege.mainpanel = new Ext.Panel({
				// title :'权限设置',
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				items : [setDataPrivilege.main]
			});

	setDataPrivilege.mainpanel.dataId = setDataPrivilege.dataId;
	setDataPrivilege.mainpanel.dataType = setDataPrivilege.dataType;

	if (setDataPrivilege.config) {
		setDataPrivilege.mainpanel.dataId = setDataPrivilege.config.dataId;
		setDataPrivilege.mainpanel.dataType = setDataPrivilege.config.dataType;
	}
	// 设置刷新函数
	setDataPrivilege.mainpanel.refresh = setDataPrivilege.refresh;

	return setDataPrivilege.mainpanel;
}

setDataPrivilege.refresh = function() {
	selectedUserAndRole.refreshGrid();// 刷新操作者grid，可能还需要unselected
	dataPrivilege.refreshNullGrid();// 权限grid刷为空
}
