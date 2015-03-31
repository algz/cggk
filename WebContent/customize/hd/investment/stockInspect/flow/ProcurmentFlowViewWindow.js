var ProcurmentFlowViewWindow = function(id,status,plantype) {
	var scope = this; 
	this.graphPanel = new FlowGraphPanel({
		autoScroll : true,
        region:'center',
		listeners : {
			nodedbclick : function(obj, node) {  
					if(obj.objectId && obj.objectType) {
						if(obj.objectType=="ProcurementPlan" && parseInt(status)>1){
							var flowStepWindow = new FlowStepWindow({
								objectId : obj.objectId+plantype,
								objectType : obj.objectType
							});
							flowStepWindow.show();
						}else{
							Ext.Msg.alert("提示","还没有提交送审");
							return;
						}
					}else if(obj.objectType=="declare") {
						declareDetailGrid.getDeclareDetail().show();
						Ext.getCmp("declareDetailGrid").store.baseParams = {start :0, limit:20,plantype:plantype,procurementplanId:id}; 
						Ext.getCmp("declareDetailGrid").store.load();
					}else if(obj.objectType=="DeclarePlan") {
						DeclarePlanGrid.getForm().show();
						Ext.getCmp("DeclarePlanGrid").store.baseParams = {start :0, limit:20,procurementplanType:plantype,procurementplanId:id}; 
						Ext.getCmp("DeclarePlanGrid").store.load();
					}
			},
			afterrender : function() { 
				scope.loadMask = new Ext.LoadMask(scope.graphPanel.body.dom, {
					msg : 'loading...'
				});
				var v1 = this.addNode(50, 50, 50, 50, {name : '开始'}, "icons/p2m/flow/start.png");
				var v2 = this.addNode(150, 50, 50, 50, {name : '采购申请',objectType : 'declare'}, "icons/p2m/flow/approvalTask.png");
			 	var v3 = this.addNode(250, 50, 50, 50, {name : '申报计划',objectType : 'DeclarePlan'}, "icons/p2m/flow/approvalTask.png");
			 	var v4 = this.addNode(350, 50, 50, 50, {name : '采购计划', objectType : 'ProcurementPlan',objectId:id}, "icons/p2m/flow/approvalTask.png"); 
				var v5 = this.addNode(450, 50, 50, 50, {name : '结束'}, "icons/p2m/flow/end.png");
				this.addConnection(v1, v2);
				this.addConnection(v2, v3);
				this.addConnection(v3, v4);
				this.addConnection(v4, v5); 
			}
		}
	});
	
	this.showWin = function(){
		this.window.show(); 
	}
	this.window = new Ext.Window({
		title : '采购流程',
		width : 800,
		height : 500,
		buttonAlign : 'center',
		closeAction : 'close',
		layout : 'fit',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [scope.graphPanel],
		buttons : [{
			width : 50,
			scope : scope,
			text : "关闭",
			handler : function() {
				scope.window.close();
			}
		}]
	}); 
};

var ProcurementFlowViewWindow2 = function(id,status,plantype) {
	var scope = this; 
	this.graphPanel = new FlowGraphPanel({
		autoScroll : true,
        region:'center',
		listeners : {
			nodedbclick : function(obj, node) { 
					if(obj.objectId && obj.objectType) {
						if(obj.objectType=="SpecialProject" && parseInt(status)>1){
							var flowStepWindow = new FlowStepWindow({
								objectId : obj.objectId,
								objectType : obj.objectType
							});
							flowStepWindow.show();
						}else{
							Ext.Msg.alert("提示","还没有提交送审");
							return;
						}
					}
			},
			afterrender : function() { 
				scope.loadMask = new Ext.LoadMask(scope.graphPanel.body.dom, {
					msg : 'loading...'
				});
				var v1 = this.addNode(50, 50, 50, 50, {name : '开始'}, "icons/p2m/flow/start.png");
				var v2 = this.addNode(150, 50, 50, 50, {name : '320专项计划',objectType : 'SpecialProject',objectId:id}, "icons/p2m/flow/approvalTask.png"); 
				var v3 = this.addNode(250, 50, 50, 50, {name : '结束'}, "icons/p2m/flow/end.png");
				this.addConnection(v1, v2);
				this.addConnection(v2, v3);
			}
		}
	});
	
	this.showWin = function(){
		this.window.show(); 
	}
	this.window = new Ext.Window({
		title : '采购流程',
		width : 800,
		height : 500,
		buttonAlign : 'center',
		closeAction : 'close',
		layout : 'fit',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [scope.graphPanel],
		buttons : [{
			width : 50,
			scope : scope,
			text : "关闭",
			handler : function() {
				scope.window.close();
			}
		}]
	}); 
};
var ProcurementFlowViewWindow3 = function(id,status,plantype) {
	var scope = this; 
	this.graphPanel = new FlowGraphPanel({
		autoScroll : true,
        region:'center',
		listeners : {
			nodedbclick : function(obj, node) { 
					if(obj.objectId && obj.objectType) {
						if(obj.objectType=="CivilPurchasePlan" && parseInt(status)>1){
							var flowStepWindow = new FlowStepWindow({
								objectId : obj.objectId,
								objectType : obj.objectType
							});
							flowStepWindow.show();
						}else{
							Ext.Msg.alert("提示","还没有提交送审");
							return;
						}
					}else if(obj.objectType=="CivilRegist") {
						var grid = CivilRegistApprovalObjectPanel.init(id);
						var window = new Ext.Window( {
							id : "CivilRegistGridWind",
							width : 800,
							height : 250,
							layout : 'fit',
							autoScroll : true,
							modal : true,
							items : grid,
							border : true,
							buttons : [{
								text : '关闭',
								handler : function() { 
									window.close();
							}}],
							closeAction : 'close'
						});
						window.show();
					}else if(obj.objectType=="CivilDetails") {
						var grid = CivilDetailsApprovalObjectPanel.init(id);
						var window = new Ext.Window( {
							id : "CivilDetailsGridWind",
							width : 800,
							height : 250,
							layout : 'fit',
							autoScroll : true,
							modal : true,
							items : grid,
							border : true,
							buttons : [{
								text : '关闭',
								handler : function() { 
									window.close();
							}}],
							closeAction : 'close'
						});
						window.show();
					}
			},
			afterrender : function() { 
				scope.loadMask = new Ext.LoadMask(scope.graphPanel.body.dom, {
					msg : 'loading...'
				});
				var v1 = this.addNode(50, 50, 50, 50, {name : '开始'}, "icons/p2m/flow/start.png");
				var v2 = this.addNode(150, 50, 50, 50, {name : '土建申报',objectType : 'CivilRegist'}, "icons/p2m/flow/approvalTask.png");
			 	var v3 = this.addNode(250, 50, 50, 50, {name : '土建申报汇总',objectType : 'CivilDetails'}, "icons/p2m/flow/approvalTask.png");
			 	var v4 = this.addNode(350, 50, 50, 50, {name : '土建采购计划', objectType : 'CivilPurchasePlan',objectId:id}, "icons/p2m/flow/approvalTask.png"); 
				var v5 = this.addNode(450, 50, 50, 50, {name : '结束'}, "icons/p2m/flow/end.png");
				this.addConnection(v1, v2);
				this.addConnection(v2, v3);
				this.addConnection(v3, v4);
				this.addConnection(v4, v5); 
			}
		}
	});
	
	this.showWin = function(){
		this.window.show(); 
	}
	this.window = new Ext.Window({
		title : '采购流程',
		width : 800,
		height : 500,
		buttonAlign : 'center',
		closeAction : 'close',
		layout : 'fit',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [scope.graphPanel],
		buttons : [{
			width : 50,
			scope : scope,
			text : "关闭",
			handler : function() {
				scope.window.close();
			}
		}]
	}); 
};
var ProcurementFlowViewWindow4 = function(id,status,plantype) {
	var scope = this; 
	this.graphPanel = new FlowGraphPanel({
		autoScroll : true,
        region:'center',
		listeners : {
			nodedbclick : function(obj, node) { 
					if(obj.objectId && obj.objectType) {
						if(obj.objectType=="EquipPurchasePlan" && parseInt(status)>1){
							var flowStepWindow = new FlowStepWindow({
								objectId : obj.objectId,
								objectType : obj.objectType
							});
							flowStepWindow.show();
						}else{
							Ext.Msg.alert("提示","还没有提交送审");
							return;
						}
					}else if(obj.objectType=="EquipRegist") {
						var grid = EquipRegistApprovalObjectPanel.init(id);
						var window = new Ext.Window( {
							id : "EquipRegistGridWind",
							width : 800,
							height : 300,
							layout : 'fit',
							autoScroll : true,
							modal : true,
							items : grid,
							border : true,
							buttons : [{
								text : '关闭',
								handler : function() { 
									window.close();
							}}],
							closeAction : 'close'
						});
						window.show();
					}else if(obj.objectType=="EquipPlan") {
						var grid = EquipPlanApprovalObjectPanel.init(id);
						var window = new Ext.Window( {
							id : "EquipPlanGridWind",
							width : 800,
							height : 300,
							layout : 'fit',
							autoScroll : true,
							modal : true,
							items : grid,
							border : true,
							buttons : [{
								text : '关闭',
								handler : function() { 
									window.close();
							}}],
							closeAction : 'close'
						});
						window.show();
					}
			},
			afterrender : function() { 
				scope.loadMask = new Ext.LoadMask(scope.graphPanel.body.dom, {
					msg : 'loading...'
				});
				var v1 = this.addNode(50, 50, 50, 50, {name : '开始'}, "icons/p2m/flow/start.png");
				var v2 = this.addNode(150, 50, 50, 50, {name : '设备申报',objectType : 'EquipRegist'}, "icons/p2m/flow/approvalTask.png");
			 	var v3 = this.addNode(250, 50, 50, 50, {name : '设备申报汇总',objectType : 'EquipPlan'}, "icons/p2m/flow/approvalTask.png");
			 	var v4 = this.addNode(350, 50, 50, 50, {name : '设备采购计划', objectType : 'EquipPurchasePlan',objectId:id}, "icons/p2m/flow/approvalTask.png"); 
				var v5 = this.addNode(450, 50, 50, 50, {name : '结束'}, "icons/p2m/flow/end.png");
				this.addConnection(v1, v2);
				this.addConnection(v2, v3);
				this.addConnection(v3, v4);
				this.addConnection(v4, v5); 
			}
		}
	});
	
	this.showWin = function(){
		this.window.show(); 
	}
	this.window = new Ext.Window({
		title : '采购流程',
		width : 800,
		height : 500,
		buttonAlign : 'center',
		closeAction : 'close',
		layout : 'fit',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [scope.graphPanel],
		buttons : [{
			width : 50,
			scope : scope,
			text : "关闭",
			handler : function() {
				scope.window.close();
			}
		}]
	}); 
};