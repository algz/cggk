var myApproveObjectGrid = {};
myApproveObjectGrid.init = function() {

	var strurl = "";

	strurl = '../JSON/approval_ApprovalRemote.getApprovalObjectVos?approvalType=StepByStep';

	myApproveObjectGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'GET'
			});
	myApproveObjectGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskid'
			}, ["objectName", "objectTypeName","dataCenterId", "objectType", "objectID",
					"projectId", "chargedManId","taskType"]);

	var ds = new Ext.data.Store({
				proxy : myApproveObjectGrid.proxy,
				reader : myApproveObjectGrid.reader
			});
	ds.on('load',function(store,records,options){
		for(var i=0;i<records.length;i++){
			var rec = records[i];
			var type = rec.get('objectType');
			if(type=='ProjectDataType'){
				ajaxRequest(rec,store,'project_ProjectRemote.getProjectApprovalObject',{
					'node' : rec.get('objectID')
				});
			}else if(type=='TaskDataType'){
				ajaxRequest(rec,store,'task_TaskRemote.getTaskApprovalObject',{
					'node' : rec.get('objectID')
				});
			}else if(type=='TemplateDataType'){
				ajaxRequest(rec,store,'wbstemplate_TemplateRemote.getWBSTemplateApprovalObject',{
					'node' : rec.get('objectID')
				});
			}else if(type=='DataObjectDataType'){
				ajaxRequest(rec,store,'datacenter_DataCenterRemote.getDataObjectApprovalObject',{
					'node' : rec.get('objectID')
				});
			}else if(type=='DataTagDataType'){
				ajaxRequest(rec,store,'datacenter_DataCenterRemote.getDataTagApprovalObject',{
					'node' : rec.get('objectID')
				});
			}else if(type=='DataEntityDataType'){
				ajaxRequest(rec,store,'dataEntity_DataEntityRemote.getDataEntityApprovalObject',{
					'id' : rec.get('objectID')
				});
			}else if(type=='DataTypeDataType'){
				ajaxRequest(rec,store,'dynamicmodel_datatype.getDataTypeApprovalObject',{
					'datatypeId' : rec.get('objectID')
				});
			}else if(type=='QulityFormDataType'){
				ajaxRequest(rec,store,'qualityMgm_qualityTemplate.getQualityApprovalInfo',{
					'dataId' : rec.get('objectID')
				});
			} else if(type=='SiteMgrDocFormatDataType'){
				ajaxRequest(rec,store,'siteMgrRemote.getSiteMgrApprovalInfo',{
					'col11' : rec.get('objectID'),'col1' : type
				});
			} else if(type=='SiteMgrProblemFormatDataType'){
				ajaxRequest(rec,store,'siteMgrRemote.getSiteMgrApprovalInfo',{
					'col11' : rec.get('objectID'),'col1' : type
				});
			} else {
				ajaxRequest(rec, store, 'ApprovalObjectInfoRemote.get' + type + 'Info', {
					'objectID' : rec.get('objectID')
				});
			}
		}
	});
	myApproveObjectGrid.setcm();
	var grid = myGrid.initByPageSize(ds, myApproveObjectGrid.cm);
	// ds.load();
	grid.height = 100;
	grid.width = 400;
	return grid;

}
var ajaxRequest = function(rec,store,pUrl,paramObj){
	Ext.Ajax.request({
		mothed : 'post',
		url : '../JSON/'+pUrl,
		success : function(response, opts){
			var obj = Ext.decode(response.responseText);
			if(obj.success){
			rec.set('projectId',obj.projectId);
			rec.set('chargedManId',obj.chargedManId);
			rec.set('objectName',obj.objectName);
			rec.set('objectTypeName',obj.objectTypeName);
			rec.set('taskType',obj.taskType);
			rec.set('dataCenterId',obj.dataCenterId);
			rec.set('dataTypeType',obj.dataTypeType);
			store.commitChanges();
			}else{
				store.remove(rec);
			}
		},
		failure : function(response, opts){
			var obj = Ext.decode(response.responseText);
			Ext.Msg.alert(getResource('resourceParam5016'),obj.message);//错误信息
		},
		params : paramObj
	});
}
var initItem = function(objectType, objectID, objectName, projectId,
		chargedManId,taskType,dataCenterId,dataTypeType) {
	myApproveMain.mainPanel.getLayout().setActiveItem(2);
	myApproveCard3.objectType=objectType;
	myApproveCard3.projectid = projectId;
	if (objectType == "ProjectDataType") {// project
		
		myApproveCard3.projectAttributePanel = ProjectAttributePanel.init();
		//项目属性
		myApproveCard3.projectTabPanel.add(new Ext.Panel({
			height : 800,
			title : getResource('resourceParam5001'),
			layout : 'fit',
			items : [myApproveCard3.projectAttributePanel]
		}));
		
		ProjectAttributePanel.projectId = "p"+objectID;// 设置projectid
		ProjectAttributePanel.setBasicForm();// 设置表单值
		wbsdata.nodeId = 'p' + projectId;
        //项目数据
		var mydataObjectPanel = new dataObjectPanel();
		myApproveCard3.projectDataPanel = mydataObjectPanel.init();
		myApproveCard3.projectDataPanel.on('activate', function() {
				var enableEdit = true;
				var selectedProjectId;
				var selectedTaskId;
                var forceEdit=true;
				selectedProjectId = "p" + projectId;
				selectedTaskId = projectId;
				mydataObjectPanel.setConfigs(selectedProjectId, selectedTaskId,
						enableEdit,forceEdit);

			})
		myApproveCard3.projectTabPanel.add(myApproveCard3.projectDataPanel);
		//项目wbs
		myApproveCard3.projectTabPanel.add(new Ext.Panel({
			height : 800,
			title : 'WBS',
			layout : 'fit',
			items : [wbsdata.init()],
			listeners : {
				'activate' : function(){
					wbsdata.refresh();
				}
			}
		}));
		//项目关系面板
		var p = new Ext.Panel({
			height : 800,
			title : ''+getResource('resourceParam1154')+'',
			layout : 'fit',
			items : [relationPanel.init()]
		});
        p.on('activate', function() {
			relationPanel.active(projectId, wbsdata.nodeId, objectName);
		});
        myApproveCard3.projectTabPanel.add(p);
		myApproveCard3.projectTabPanel.setActiveTab(0);
		myApproveCard3.mainPanel.setActiveItem(0);
	} else if (objectType == "TaskDataType") {// task
		
		
		if(taskType==1||taskType=='1'){
			
			myApproveCard3.taskAttributePanel= new Ext.Panel({
				height : 800,
				title : getResource('resourceParam5001'),
				layout : 'fit',
				items : [viewApproveTask.init()]
			})
			//task attribute
			myApproveCard3.taskTabPanel.add(myApproveCard3.taskAttributePanel);
			viewApproveTask.setBasicForm(objectID)
		}else{
			myApproveCard3.taskAttributePanel= new Ext.Panel({
				height : 800,
				title : getResource('resourceParam5001'),
				layout : 'fit',
				items : [TaskAttributePanel.init()]
			})
			
			//task attribute
			myApproveCard3.taskTabPanel.add(myApproveCard3.taskAttributePanel);
			
			TaskAttributePanel.taskId = objectID;
			TaskAttributePanel.setBasicForm();
		}
		
        //task data panel
		myApproveCard3.taskTabPanel.add(myApproveCard3.taskDataPanelInit(
		projectId, objectID));
		
		//task wbs panel
		wbsdata.nodeId = objectID;
		myApproveCard3.taskTabPanel.add(new Ext.Panel({
			height : 800,
			title : 'WBS',
			layout : 'fit',
			items : [wbsdata.init()],
			listeners : {
				'activate' : function(){
					wbsdata.refresh();
				}
			}
		}));
		//task relation panel
		var p = new Ext.Panel({
			id : 'task-relation',
			height : 800,
			title : ''+getResource('resourceParam1154')+'',
			layout : 'fit',
			items : [relationPanel.init()]
		});
        p.on('activate', function() {
			relationPanel.active(projectId, wbsdata.nodeId, objectName);
		})
        myApproveCard3.taskTabPanel.add(p);
        
        //remind
		remind.init(objectID, objectName, chargedManId);
		remind.remindTabPanel.remove('addremindinfo');
		myApproveCard3.taskTabPanel.add(remind.fullRemainPanel);
		//log
		log.init(objectID, objectName);
		log.logTabPanel.remove('addloginfo');
		myApproveCard3.taskTabPanel.add(log.fullLogPanel);
		//feed
		feedback.taskid = objectID;
		feedback.init(objectID, objectName);
		feedback.feedBackTabPanel.remove('addFeedBackinfo');
		myApproveCard3.taskTabPanel.add(feedback.allFeedBackPanel);
		
		myApproveCard3.taskTabPanel.setActiveTab(0);
		myApproveCard3.mainPanel.setActiveItem(1);
	} else if (objectType == "TemplateDataType") {
		
	
		
		var templatePanel= new Ext.Panel({
			layout : 'fit',
			border : false,
			autoWidth:true,
			frame : false,
			autoScroll:true,
			items : [templateDatail.init({
						rootName : objectName,
						rootId : objectID
					})]
		});
		myApproveCard3.templateTabPanel.add(templatePanel);
		templateTree.node = templateTree.rootNode;
		templateTabPanel.tabPanel.setActiveTab(0);
		templateTree.treePanel.on('click', function(node, eventObject) {
			templateTree.node = node;
			templateTree.nodeId = node.attributes.id;
			templateTree.nodeName = node.attributes.text;
			var activedPanel = templateTabPanel.tabPanel.getActiveTab();
			activedPanel.fireEvent('activate');
		});
		
        myApproveCard3.mainPanel.setActiveItem(2);
	} else if (objectType == "DataObjectDataType") {
		if (!myApproveCard3.dataObjectTabPanel.get('dataobject')) {
			cateInstanceAttriTab.params.callback = function(tabpanel){
				var disfunc = function(b){b.disable()}
				for(var i=0;i<tabpanel.items.length;i++){
					Ext.getCmp('dataObjectColumnTreeAdd'+i).on('enable',disfunc);
					Ext.getCmp('dataObjectColumnTreeDel'+i).on('enable',disfunc);
					Ext.getCmp('dataObjectColumnTreeSave'+i).on('enable',disfunc);
					Ext.getCmp('dataObjectColumnTreeRefresh'+i).on('enable',disfunc);
					Ext.getCmp('dataTagApproveMenu'+i).disable();
					Ext.getCmp('dataEntityApproveMenu'+i).disable();
					Ext.getCmp('dataTagApproveMenu'+i).on('enable',disfunc);
					Ext.getCmp('dataEntityApproveMenu'+i).on('enable',disfunc);
				}
			}
			myApproveCard3.dataObjectTabPanel.add(new Ext.Panel({
						id : 'dataobject',
						height : 800,
						title : ''+getResource('resourceParam1375')+'',
						layout : 'fit',
						items : [cateInstanceAttriTab.init(objectID)]
					}));
		}
		cateInstanceAttriTab.params.parentContainer = Ext.getCmp('dataobject');
		cateInstanceAttriTab.params.nodeid = objectID;
		myApproveCard3.dataObjectTabPanel.setActiveTab(0);
        myApproveCard3.mainPanel.setActiveItem(3);
	} else if (objectType == "DataTagDataType") {
		if (!myApproveCard3.dataTagTabPanel.get('datatag')) {
        	myApproveCard3.mainPanel.setActiveItem(4);
			var t = dataObjectTreeGrid.init(objectID, 0, dataCenterId);
			t.getStore().on('beforeload',
					function(store, options) {
						this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
						})
						options.params = Ext.apply(options.params, {
									dataCenterID : dataCenterId,
									parentDataEntityID : objectID
								});
					});
			t.getStore().load();
			myApproveCard3.dataTagTabPanel.add(new Ext.Panel({
						id : 'datatag',
						height : 800,
						title : objectName,
						layout : 'fit',
						buttons : [historyDataObjectView.initCategoryHistoryButton(t,objectID,dataCenterId),
							historyDataObjectView.initDataHistoryButton(t)
						],
						items : [t]
					}));
			myApproveCard3.dataTagTabPanel.setActiveTab(0);
		}
	} else if (objectType == "DataEntityDataType") {
        myApproveCard3.mainPanel.setActiveItem(5);
		var t = historyDataObjectView.init(objectID);
		if (!myApproveCard3.dataEntityTabPanel.get('dataentity')) {
			myApproveCard3.dataEntityTabPanel.add(new Ext.Panel({
						id : 'dataentity',
						height : 800,
						title : ''+getResource('resourceParam474')+'',
						layout : 'fit',
						buttons : [{
							text : '' + getResource('resourceParam576') + '历史'
						+ getResource('resourceParam474') + '',
							handler : function(){
								var win = new Ext.Window({
									autoScroll : true,
									items : [historyDataObjectView.init(objectID,t.getStore().getAt(0).get('revision'))],
									width : 700,
									layout : 'fit',
									height : 300
								});
								win.show();
							}
						}],
						items : [t]
					}));
		}
		myApproveCard3.dataEntityTabPanel.setActiveTab(0);
	} else if (objectType == "QulityFormDataType") {//质量单
		myApproveCard3.qualityFormItemPanel.add(qualityFormItemPanel.init(objectID));
		myApproveCard3.mainPanel.setActiveItem(6);
	} else if (objectType == "DataTypeDataType") {//数据类型
		myApproveCard3.dataTypePanel.removeAll();
		var p;
		if(dataTypeType==2){//扩展类型
			extendTypeMain.approvalModel = true;
			extendTypeProPanel.editable = false;
			extendTypeMain.mainUrl = '../JSON/dynamicmodel_datatype.getDataTypeById?datatypeId='+objectID;
			p = new Ext.Panel({
							height : 800,
							title : getResource('resourceParam614'),//'扩展类型',
							layout : 'fit',
							items : [extendTypeMain.init()]
						});
			extendTypeMain.ds.load();
		}else if(dataTypeType==9){//枚举类型
			enumTypeMain.approvalModel = true;
			enumTypeTreeGridPanel.editable = false;
			enumTypeMain.mainUrl = '../JSON/dynamicmodel_datatype.getDataTypeById?datatypeId='+objectID;
			p = new Ext.Panel({
							height : 800,
							title : getResource('resourceParam9096'),//'枚举类型',
							layout : 'fit',
							items : [enumTypeMain.init()]
						});
			enumTypeMain.ds.load();
		}else if(dataTypeType==8){//物理类型
			physicsTypeMain.approvalModel = true;
			physicTypeTreeGridPanel.editable = false;
			physicsTypeMain.mainUrl = '../JSON/dynamicmodel_datatype.getDataTypeById?datatypeId='+objectID;
			p = new Ext.Panel({
							height : 800,
							title : getResource('resourceParam616'),//'物理类型',
							layout : 'fit',
							items : [physicsTypeMain.init()]
						});
			physicsTypeMain.ds.load();
		}
		myApproveCard3.dataTypePanel.add(p);
		myApproveCard3.dataTypePanel.setActiveTab(0);
		myApproveCard3.mainPanel.setActiveItem(7);
	} else if(objectType=="SiteMgrDocFormatDataType"){
		myApproveCard3.mainPanel.setActiveItem(8);
		myApproveCard3.siteMgrDocFormItemPanel.add(siteMgrFormPanel.initDoc(objectID));
		myApproveCard3.siteMgrDocFormItemPanel.setActiveTab(0);
	} else if(objectType=="SiteMgrProblemFormatDataType"){
		myApproveCard3.mainPanel.setActiveItem(9);
		myApproveCard3.siteMgrProblemFormItemPanel.add(siteMgrFormPanel.initProblem(objectID));
		myApproveCard3.siteMgrProblemFormItemPanel.setActiveTab(0);
	}else{
		myApproveCard3.mainPanel.setActiveItem(10);
		var dataParams={
			activityInstanceID:myApproveCard2.activityInstanceID,
			flowInstanceID : myApproveCard2.flowInstanceID
		};
		var panelCreator = eval(objectType + "ApprovalObjectPanel.init");
		var panel = panelCreator(objectID,dataParams);
		myApproveCard3.approvalProjectPanel.removeAll();
		myApproveCard3.approvalProjectPanel.add(panel);
		myApproveCard3.approvalProjectPanel.doLayout();
	}

}
myApproveObjectGrid.setcm = function() {
	myApproveObjectGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
			new Ext.grid.RowNumberer(), {
				header : ""+getResource('resourceParam480')+"",
				dataIndex : 'objectName',
				width : 200,
				renderer : function(value, cellmeta, record) {
					return '<a href="javascript:void(0);" style="text-decoration:underline;color:blue;" onclick="initItem(\''
							+ record.data.objectType
							+ '\'' 
							+ ',' 
							+ '\''
							+ record.data.objectID
							+ '\'' 
							+ ','
							+ '\''
							+ value
							+ '\''
							+ ','
							+ '\''
							+ record.data.projectId
							+ '\''
							+ ','
							+ '\''
							+ record.data.chargedManId
							+ '\''
							+ ','
							+ '\''
							+ record.data.taskType
							+ '\''
							+ ','
							+ '\''
							+ record.data.dataCenterId
							+ '\''
							+ ','
							+ '\''
							+ record.data.dataTypeType
							+ '\''
							+')"><span>' + value + '</span></a>';
				}
			}, {
				header : ""+getResource('resourceParam481')+"",
				width : 140,
				dataIndex : 'objectTypeName'
			}]
	});
}
