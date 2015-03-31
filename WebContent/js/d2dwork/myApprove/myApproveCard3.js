var myApproveCard3 = {};
myApproveCard3.taskDataPanelInit = function(projectid, taskid) {
	var id = taskid;
	function fileUploadCallback(winDia, form, resp, flag) {
		var record = dataObjectTree.getSelectionModel().getSelected();
		if (flag) {
			winDia.window.close();
			record.set("fileID", resp.result.fileId);
			var strFileName = resp.result.fileName;
			strFileName = strFileName.substring(strFileName.lastIndexOf('\\') + 1);
			record.set("value", strFileName);
			
			// record.set("value", resp.result.fileName);
		} else {
			Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1073')+"");
		}
	}
	var dataObjectTree = dataObjectTreeGrid.init(fileUploadCallback);
	dataObjectTree.on('celldblclick', function(grid, rowIndex, colIndex, e) {
				return false;
			});

	var mydataObjectPanel = new dataObjectPanel();
	myApproveCard3.taskDataPanel = mydataObjectPanel.init();
	myApproveCard3.taskDataPanel.on('activate', function() {
				var enableEdit = true;
				var selectedProjectId;
				var selectedTaskId;
				var forceEdit=true;
				selectedProjectId = projectid;
				selectedTaskId = taskid;
				mydataObjectPanel.setConfigs(selectedProjectId, selectedTaskId,
						enableEdit,forceEdit);

			})
	return myApproveCard3.taskDataPanel;
}

myApproveCard3.init = function() {
	
	myApproveCard3.projectTabPanel = new Ext.TabPanel({
				activeTab : 0
			});
	
	myApproveCard3.taskTabPanel = new Ext.TabPanel({
		activeTab : 0
	});
	
	myApproveCard3.templateTabPanel = new Ext.Panel({
		layout:'fit',
		border:false,
		frame:false
			});
	myApproveCard3.dataObjectTabPanel = new Ext.TabPanel({
				activeTab : 0,
				items : []
			});
	myApproveCard3.dataTagTabPanel = new Ext.TabPanel({
				activeTab : 0,
				items : []
			});
	myApproveCard3.dataEntityTabPanel = new Ext.TabPanel({
				activeTab : 0,
				items : []
			});

	//longtc_add
	myApproveCard3.qualityFormItemPanel = new Ext.Panel({
		height : 800,
		title : '质量单',
		layout : 'fit'
	});
	
	myApproveCard3.dataTypePanel = new Ext.TabPanel({
		activeTab : 0,
		items : []
	});
	//现场管理--书面文档
	myApproveCard3.siteMgrDocFormItemPanel = new Ext.TabPanel({
		activeTab : 0,
		items : []
	});
	//现场管理--现场问题
	myApproveCard3.siteMgrProblemFormItemPanel = new Ext.TabPanel({
		activeTab : 0,
		items : []
	});
		//工程部需要扩展
	myApproveCard3.approvalProjectPanel = new Ext.Panel({
		height : 800,
		layout : 'fit'
	});
	
	myApproveCard3.mainPanel = new Ext.Panel({
		        layout:'card',
		        autoScroll : true,
		        border : false,
				frame : false,
				items : [myApproveCard3.projectTabPanel,
						myApproveCard3.taskTabPanel,
						myApproveCard3.templateTabPanel,
						myApproveCard3.dataObjectTabPanel,
						myApproveCard3.dataTagTabPanel,
						myApproveCard3.dataEntityTabPanel,
						myApproveCard3.qualityFormItemPanel,
						myApproveCard3.dataTypePanel,
						myApproveCard3.siteMgrDocFormItemPanel,
						myApproveCard3.siteMgrProblemFormItemPanel,
						myApproveCard3.approvalProjectPanel],
				buttonAlign : 'left',
				buttons : [{
					text : ''+getResource('resourceParam944')+'',
					style : 'margin-left:270px',
					listeners : {
						click : function() {
					        myApproveCard3.removeAll();
							myApproveMain.mainPanel.getLayout()
									.setActiveItem(1);
						}
					}
				}]
			})
	myApproveCard3.mainPanel.setActiveItem=function(item){
		myApproveCard3.mainPanel.getLayout().setActiveItem(item);
	}
	return myApproveCard3.mainPanel;
}


myApproveCard3.removeAll=function(){
	var objectType=myApproveCard3.objectType;
	if (objectType == "ProjectDataType") {
		myApproveCard3.mainPanel.remove(0);
		myApproveCard3.projectTabPanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(0,myApproveCard3.projectTabPanel)
	} else if (objectType == "TaskDataType") {
		myApproveCard3.mainPanel.remove(1);
		delete myApproveCard3.taskTabPanel;
		myApproveCard3.taskTabPanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(1,myApproveCard3.taskTabPanel)
	} else if (objectType == "TemplateDataType") {
		myApproveCard3.mainPanel.remove(2);
		delete myApproveCard3.templateTabPanel;
		myApproveCard3.templateTabPanel = new Ext.Panel({
			layout:'fit',
			border:false,
			frame:false
		});
		myApproveCard3.mainPanel.insert(2,myApproveCard3.templateTabPanel)
	} else if (objectType == "DataObjectDataType") {
		myApproveCard3.mainPanel.remove(3);
		myApproveCard3.dataObjectTabPanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(3,myApproveCard3.dataObjectTabPanel)
	} else if (objectType == "DataTagDataType") {
		myApproveCard3.mainPanel.remove(4);
		myApproveCard3.dataTagTabPanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(4,myApproveCard3.dataTagTabPanel)
	} else if (objectType == "DataEntityDataType") {
		myApproveCard3.mainPanel.remove(5);
		myApproveCard3.dataEntityTabPanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(5,myApproveCard3.dataEntityTabPanel)
	} else if (objectType == "QulityFormDataType") {
		myApproveCard3.mainPanel.remove(6);
		myApproveCard3.qualityFormItemPanel = new Ext.Panel({
			height : 800,
			title : '质量单',
			layout : 'fit'
		});
		myApproveCard3.mainPanel.insert(6,myApproveCard3.qualityFormItemPanel)
	} else if (objectType == "DataTypeDataType") {
		myApproveCard3.mainPanel.remove(7);
		myApproveCard3.dataTypePanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(7,myApproveCard3.dataTypePanel)
	} else if(objectType=="SiteMgrDocFormatDataType"){
		myApproveCard3.mainPanel.remove(8);
		myApproveCard3.siteMgrDocFormItemPanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(8,myApproveCard3.siteMgrDocFormItemPanel)
	} else if(objectType=="SiteMgrProblemFormatDataType"){
		myApproveCard3.mainPanel.remove(9);
		myApproveCard3.siteMgrProblemFormItemPanel = new Ext.TabPanel({
			activeTab : 0
		});
		myApproveCard3.mainPanel.insert(9,myApproveCard3.siteMgrProblemFormItemPanel)
	}else
	{
		myApproveCard3.mainPanel.remove(10);
		myApproveCard3.approvalProjectPanel = new Ext.Panel({
			height : 800,
			layout : 'fit'
		});
		myApproveCard3.mainPanel.insert(10,myApproveCard3.approvalProjectPanel)
	}
}
