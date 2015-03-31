var collarbCreatePanel = {};
collarbCreatePanel.init = function(config) {

	// collarbCreatePanel.project=collarbCardFrame.init();
	// collarbCreatePanel.task=TaskCardFrame.init();
	collarbCreatePanel.createProjectFolder = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit'
			// items:[collarbCreatePanel.project]
		});
	
	collarbCreatePanel.createProject = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit'
			// items:[collarbCreatePanel.project]
		});
	collarbCreatePanel.createTask = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit'
			// items:[collarbCreatePanel.task]
		});
	
	collarbCreatePanel.projectFolderDetail = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit'
			// items:[collarbCreatePanel.task]
		});
	//数据权限设置面板
	collarbCreatePanel.createDataprivilege = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	collarbCreatePanel.updateProjectFolder = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit'
			// items:[collarbCreatePanel.project]
		});
	collarbCreatePanel.updateProject = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	collarbCreatePanel.updateTask = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	
	collarbCreatePanel.createApproveTask = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit'
	});
	collarbCreatePanel.updateApproveTask = new Ext.Panel({
		frame : false,
		boder : false,
		layout : 'fit'
	});
    
	collarbCreatePanel.createByTemplate = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit',
				items : applyTemplateMain.init(config.createByTemplateCallBack)
			});
	collarbCreatePanel.cardPanel = new Sysware.P2M.CardPanel({
				frame : false,
				boder : false,
				items : [collarbCreatePanel.createProject,
						collarbCreatePanel.createTask,
						collarbCreatePanel.createDataprivilege,
						collarbCreatePanel.updateProject,
						collarbCreatePanel.updateTask,
						collarbCreatePanel.createProjectFolder,
						collarbCreatePanel.updateProjectFolder,
						collarbCreatePanel.projectFolderDetail,
						collarbCreatePanel.createByTemplate,
						collarbCreatePanel.createApproveTask,
						collarbCreatePanel.updateApproveTask],
				activeItem : 0
			});
	return collarbCreatePanel.cardPanel;
}
