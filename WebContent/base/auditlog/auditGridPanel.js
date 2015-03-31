var auditGirdPanel = {
	comboxValue : 'userId',
	operationcomboxValue : 'userId'
};
// 查询条件
var operationStartTime = "";
var operationEndTime = "";
var operationIpAddress = "";
var operationObjectName = "";
var operationModuleType = "";
var operationOperationType = "";
var operationOperationResult = "";
var operationLogLevel = "";
var operationOperatorId = "";
var operationOperatorTrueName = "";
var loginStartTime = "";
var loginEndTime = "";
var loginIpAddress = "";
var loginOperationResult = "";
var loginLogLevel = "";
var loginOperatorId = "";
var loginOperatorTrueName = "";

// 生成tab
auditGirdPanel.init = function() {
	var tabPanel = new Ext.TabPanel({
		activeTab : 0,
		plain : false,
		border : true,
		tabPosition : 'top',
		id : 'centerpanel',
		deferredRender : true,
		enableTabScroll : true,
		items : [auditGirdPanel.gridPanel(),auditGirdPanel.operationGridPanel()]
	})
	return tabPanel;
}	
// 数据列表(用户登录信息)
auditGirdPanel.gridPanel = function(){
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/operationLogRemote.getOperationLogList?logType=0',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader(
			{
				root : 'results',
				id : 'logId',
				totalProperty : 'totalProperty'
			}, 
			['logId', 'operatorTrueName', 'ipAddress', 'macAddress', 'moduleType', 'result', 'time', 'description', 'logLevel']
		)
	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm,rm,{
				header : '操作人员',
				dataIndex : 'operatorTrueName',
				sortable : true
			}, {
				header : 'IP地址',
				dataIndex : 'ipAddress',
				sortable : true
			}, 
			/**
			{
				header : ' MAC地址 ',
				dataIndex : 'macAddress',
				sortable : true
			}, 
			*/
			{
				header : ' 操作类型 ',
				dataIndex : 'moduleType',
				sortable : true
			}, {
				header : ' 操作结果 ',
				dataIndex : 'result',
				sortable : true
			}, {
				header : '操作时间',
				dataIndex : 'time',
				sortable : true,
				width : 150
			}, {
				header : '操作描述',
				dataIndex : 'description',
				sortable : true,
				width : 400
			}, {
				header : ' 日志级别 ',
				dataIndex : 'logLevel',
				sortable : true
			}]
	});
	var tbar = ['-'];
	var grid = common.gridPanel('auditGridPanelId',cm,store,tbar,true,sm,'用户登录信息');
	// 搜索
	var tbar = grid.getTopToolbar();
	var combox = new Ext.form.ComboBox({
	})
	// 监听选择
	var startTime = new Ext.form.DateField({
		id : 'startTime',
		format : 'Y-m-d',
		width : 80,
		emptyText : '开始时间',
		listeners : {'select':function(t){
			endTime.setMinValue(t.value);
 	   	}}
	});
	var endTime = new Ext.form.DateField({
		id : 'endTime',
		format : 'Y-m-d',
		width : 80,
		emptyText : '结束时间',
		listeners : {'select':function(t){
			startTime.setMaxValue(t.value);
 	   	}}
	});
	var ipAddress = new Ext.form.TextField({
		id : 'ipAddress',
		width : 80,
		maxLength : 20,
		regex : /^((2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)\.){3}(2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)$/,
		regexText : '请输入正确的IP地址，如：192.168.0.1!',
		emptyText : 'IP地址'
	});
	var operationResult = new Ext.form.ComboBox({
		id : 'operationResult',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [[null, ''], [0,'成功'], [1,'失败'], [2,'异常']]
		}),
		field : ['value','name'],
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width : 80,
		forceSelection : true,
		emptyText : '操作结果'
	});
	var logLevel = new Ext.form.ComboBox({
		id : 'logLevel',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [[null, ''], [1,'1'], [2,'2'], [3,'3']]
		}),
		field : ['value','name'],
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width : 80,
		forceSelection : true,
		emptyText : '日志级别'
	});
	tbar.addSpacer();
	tbar.addField(auditGirdPanel.getReaderName('userName'));
	tbar.addSpacer();
	tbar.addField(startTime);
	tbar.addSpacer();
	tbar.addField(endTime);
	tbar.addSpacer();
	tbar.addField(ipAddress);
	tbar.addSpacer();
	tbar.addField(operationResult);
	tbar.addSpacer();
	tbar.addField(logLevel);
	tbar.addSpacer();
	var search = {
		text:'搜索',
		iconCls : 'search1',
		handler : function() {
			auditGirdPanel.search('auditGridPanelId');
		}
	};
	tbar.addButton(search);
	tbar.addSpacer();
	var reset = {
		text:'重置',
		iconCls : 'edit1',
		handler:function() {
			endTime.setMinValue("");
			startTime.setMaxValue("");
			Ext.getCmp('startTime').setValue("");
			Ext.getCmp('endTime').setValue("");
			Ext.getCmp('ipAddress').setValue("");
			Ext.getCmp('operationResult').setValue();
			Ext.getCmp('logLevel').setValue("");
			Ext.getCmp('userName').setValue("");
			auditGirdPanel.userId = "";
		}
	};
	tbar.addButton(reset);
	tbar.addSeparator();
	tbar.add({text:'刷新',iconCls : 'refresh1',handler:function(){
		// common.gridPanel.refush();
		store.reload();
	}});
	tbar.addSeparator();
	var log_export={
		text:'导出',
		iconCls : 'icon-exportExcel',
		handler:function() {
			var waitConfig = {};
			waitConfig.text = "提交处理中,请稍候";
			Ext.MessageBox.wait("", "请稍候",
					waitConfig);
			var vo = Seam.Remoting.createType("com.sysware.core.operationLog.OperationLogVo");
			vo.setStartDate(loginStartTime);
			vo.setEndDate(loginEndTime);
			vo.setIpAddress(loginIpAddress);
			vo.setSelectOperationResult(loginOperationResult);
			vo.setSelectLogLevel(loginLogLevel);
			vo.setSelectOperatorId(loginOperatorId);
			vo.setSelectOperatorTrueName(loginOperatorTrueName);
			vo.setLogType(0);
			Seam.Component.getInstance("operationLogRemote").exportExcel(vo, auditGirdPanel.exportLoginSucc);
			
			
		}
	};
	tbar.addButton(log_export);
	return grid;
}

auditGirdPanel.exportSucc=function(aa) {
	Ext.MessageBox.hide();
	var obj = Ext.util.JSON.decode(aa);
	window.location.href = "../JSON/ExportExeclServlet?filename=" + obj.filename + "&filepath=" + obj.filepath;
}

auditGirdPanel.exportLoginSucc=function(aa) {
	Ext.MessageBox.hide();
	window.open('../template.files/exportLoginLog/'+aa, '_blank');
}

auditGirdPanel.exportOperationSucc=function(aa) {
	Ext.MessageBox.hide();
	window.open('../template.files/exportOperationLog/'+aa, '_blank');
}

// 数据列表(用户操作信息)
auditGirdPanel.operationGridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/operationLogRemote.getOperationLogList?logType=1',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader(
			{
				root : 'results',
				id : 'id',
				totalProperty : 'totalProperty'
			}, 
			['logId', 'operatorTrueName', 'operatorRoleName', 'operatorDeptName', 'ipAddress', 'macAddress', 'objectName', 'objectType', 'security', 'moduleType', 'operationType', 'result', 'time', 'description', 'logLevel']
		)
	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm,rm,{
				header : '操作人员',
				dataIndex : 'operatorTrueName',
				sortable : true,
				width : 100
			}, {
				header : '角色',
				dataIndex : 'operatorRoleName',
				sortable : true,
				width : 100
			}, {
				header : '所属部门',
				dataIndex : 'operatorDeptName',
				sortable : true,
				width : 100
			}, {
				header : 'IP地址',
				dataIndex : 'ipAddress',
				sortable : true,
				width : 80
			}, 
			/**
			{
				header : ' MAC地址 ',
				dataIndex : 'macAddress',
				sortable : true,
				width : 120
			}, 
			*/
			{
				header : '对象名称',
				dataIndex : 'objectName',
				sortable : true,
				width : 120
			}, {
				header : '对象类型',
				dataIndex : 'objectType',
				sortable : true,
				width : 60
			}, {
				header : '对象密级',
				dataIndex : 'security',
				sortable : true,
				width : 60
			}, {
				header : '所属模块',
				dataIndex : 'moduleType',
				sortable : true,
				width : 60
			}, {
				header : '操作动作',
				dataIndex : 'operationType',
				sortable : true,
				width : 60
			}, {
				header : ' 操作结果 ',
				dataIndex : 'result',
				sortable : true,
				width : 60
			}, {
				header : '操作时间',
				dataIndex : 'time',
				sortable : true,
				width : 120
			}, {
				header : '操作描述',
				dataIndex : 'description',
				sortable : true,
				width : 180
			}, {
				header : ' 日志级别 ',
				dataIndex : 'logLevel',
				sortable : true,
				width : 60
			}]
	});
	var tbar = ['-'];
	var grid = common.gridPanel('operationGridPanelId',cm,store,tbar,true,sm,'用户操作信息');
	// 搜索
	var tbar = grid.getTopToolbar();
	var combox = new Ext.form.ComboBox({
	})
	// 监听选择
	var zoperationStartTime = new Ext.form.DateField({
		id : 'operationStartTime',
		format : 'Y-m-d',
		width : 80,
		emptyText : '开始时间',
		listeners : {'select':function(t){
			zoperationEndTime.setMinValue(t.value);
 	   	}}
	});
	var zoperationEndTime = new Ext.form.DateField({
		id : 'operationEndTime',
		format : 'Y-m-d',
		width : 80,
		emptyText : '结束时间',
		listeners : {'select':function(t){
			zoperationStartTime.setMaxValue(t.value);
 	   	}}
	});
	var zoperationIpAddress = new Ext.form.TextField({
		id : 'operationIpAddress',
		width : 80,
		maxLength : 20,
		regex : /^((2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)\.){3}(2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)$/,
		regexText : '请输入正确的IP地址，如：192.168.0.1!',
		emptyText : 'IP地址'
	});
	var zoperationObjectName = new Ext.form.TextField({
		id : 'operationObjectName',
		width : 80,
		maxLength : 20,
		emptyText : '对象名称'
	});
	var zoperationModuleType = new Ext.form.ComboBox({
		id : 'operationModuleType',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [[null, ''], ['协同工程','协同工程'], ['任务看板','任务看板'], ['信息管理','信息管理'], ['类型管理','类型管理'], ['系统管理','系统管理'], ['动态建模','动态建模'], ['数据中心','数据中心'], ['知识库','知识库']]
		}),
		field : ['value','name'],
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width : 100,
		forceSelection : true,
		emptyText : '所属模块'
	});
	var zoperationOperationType = new Ext.form.TextField({
		id : 'operationOperationType',
		width : 60,
		maxLength : 20,
		emptyText : '操作动作'
	});
	var zoperationOperationResult = new Ext.form.ComboBox({
		id : 'operationOperationResult',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [[null, ''], [0,'成功'], [1,'失败'], [2,'异常']]
		}),
		field : ['value','name'],
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width : 80,
		forceSelection : true,
		emptyText : '操作结果'
	});
	var zoperationLogLevel = new Ext.form.ComboBox({
		id : 'operationLogLevel',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [[null, ''], [1,'1'], [2,'2'], [3,'3']]
		}),
		field : ['value','name'],
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width : 80,
		forceSelection : true,
		emptyText : '日志级别'
	});
	tbar.addSpacer();
	tbar.addField(auditGirdPanel.getReaderName('operationUserName'));
	tbar.addSpacer();
	tbar.addField(zoperationStartTime);
	tbar.addSpacer();
	tbar.addField(zoperationEndTime);
	tbar.addSpacer();
	tbar.addField(zoperationIpAddress);
	tbar.addSpacer();
	tbar.addField(zoperationObjectName);
	tbar.addSpacer();
	tbar.addField(zoperationModuleType);
	tbar.addSpacer();
	tbar.addField(zoperationOperationType);
	tbar.addSpacer();
	tbar.addField(zoperationOperationResult);
	tbar.addSpacer();
	tbar.addField(zoperationLogLevel);
	tbar.addSpacer();
	var search = {
		text:'搜索',
		iconCls : 'search1',
		handler : function() {
			auditGirdPanel.search('operationGridPanelId');
		}
	};
	tbar.addButton(search);
	tbar.addSpacer();
	var reset = {
		text:'重置',
		iconCls : 'edit1',
		handler : function() {
			zoperationEndTime.setMinValue("");
			zoperationStartTime.setMaxValue("");
			Ext.getCmp('operationStartTime').setValue("");
			Ext.getCmp('operationEndTime').setValue("");
			Ext.getCmp('operationIpAddress').setValue("");
			Ext.getCmp('operationObjectName').setValue("");
			Ext.getCmp('operationModuleType').setValue("");
			Ext.getCmp('operationOperationType').setValue("");
			Ext.getCmp('operationOperationResult').setValue();
			Ext.getCmp('operationLogLevel').setValue("");
			Ext.getCmp('operationUserName').setValue("");
			auditGirdPanel.operationuserId = "";
		}
	};
	tbar.addButton(reset);
	tbar.addSeparator();
	tbar.add({text:'刷新',iconCls : 'refresh1',handler:function(){
		store.reload();
	}});
	tbar.addSeparator();
	var log_export={
	text:'导出',iconCls : 'icon-exportExcel',handler:function(){
		var waitConfig = {};
		waitConfig.text = "提交处理中,请稍候";
		Ext.MessageBox.wait("", "请稍候",
				waitConfig);
		var vo = Seam.Remoting.createType("com.sysware.core.operationLog.OperationLogVo");
		vo.setStartDate(operationStartTime);
		vo.setEndDate(operationEndTime);
		vo.setIpAddress(operationIpAddress);
		vo.setObjectName(operationObjectName);
		vo.setModuleType(operationModuleType);
		vo.setOperationType(operationOperationType);
		vo.setSelectOperationResult(operationOperationResult);
		vo.setSelectLogLevel(operationLogLevel);
		vo.setSelectOperatorId(operationOperatorId);
		vo.setSelectOperatorTrueName(operationOperatorTrueName);
		vo.setLogType(1);
		Seam.Component.getInstance("operationLogRemote").exportExcel(vo, auditGirdPanel.exportOperationSucc);
	}
	};
	tbar.addButton(log_export);
	return grid;
}
// 人员
auditGirdPanel.getReaderName = function(id) {
//	depUser.users(''+getResource("")/* 姓名', '', id);
//	depUser.usersComb.setWidth(250);
//	depUser.usersComb.allowBlank = true;
//// depUser.usersComb.setValue("操作人员");
//	depUser.usersComb.emptyText = ""+getResource("")/* 请选择用户 */+"...";
//	depUser.usersComb.on('select', function(combo, record, index) {
//		if(id == 'operationuserName'){
//			auditGirdPanel.operationuserId = record.get(combo.valueField);
//		}
//		else{
//			auditGirdPanel.userId = record.get(combo.valueField);
//		}
//		
//	});
//	return depUser.usersComb;
	
	var conn1 = synchronize.createXhrObject();
	conn1.open("GET", '../JSON/operationLogRemote.getPermission?timestamp=' + new Date().getTime(), false);
	conn1.send(null);
	var respText1 = conn1.responseText.split("-");
	singleselect.id = id;
	singleselect.width = 250;
	singleselect.limitUserId = respText1[0];
	singleselect.limitUserType = respText1[1];
	singleselect.emptyText = "请选择用户...";
	singleselect.init(function(result){
		if(id == 'operationUserName'){
			auditGirdPanel.operationuserId = result;
		}
		else{
			auditGirdPanel.userId = result;
		}
	});
	return singleselect.usersComb;
}
// 搜索
auditGirdPanel.search = function(id){
	var panel = Ext.getCmp(id);
	if(id == "operationGridPanelId"){
		if(Ext.getCmp('operationStartTime').getValue() != "")
			operationStartTime = Ext.getCmp('operationStartTime').getValue().format("Y-m-d");
		else
			operationStartTime = "";
		if(Ext.getCmp('operationEndTime').getValue() != "")
			operationEndTime = Ext.getCmp('operationEndTime').getValue().format("Y-m-d");
		else
			operationEndTime = "";
		operationIpAddress = Ext.getCmp('operationIpAddress').getValue();
		operationObjectName = Ext.getCmp('operationObjectName').getValue();
		operationModuleType = Ext.getCmp('operationModuleType').getValue();
		operationOperationType = Ext.getCmp('operationOperationType').getValue();
		operationOperationResult = Ext.getCmp('operationOperationResult').getValue();
		operationLogLevel = Ext.getCmp('operationLogLevel').getValue();
		operationOperatorId = auditGirdPanel.operationuserId;//Ext.getCmp('operationUserName').getValue();
		operationOperatorTrueName = Ext.getCmp('operationUserName').getRawValue();
		panel.getStore().baseParams = {
			start : 0,
			limit : 25,
			startDate : operationStartTime,
			endDate : operationEndTime,
			ipAddress : operationIpAddress,
			objectName : operationObjectName,
			moduleType : operationModuleType,
			operationType : operationOperationType,
			selectOperationResult : operationOperationResult,
			selectLogLevel : operationLogLevel,
			selectOperatorId : operationOperatorId
		};
	} else {
		if(Ext.getCmp('startTime').getValue() != "")
			loginStartTime = Ext.getCmp('startTime').getValue().format("Y-m-d");
		else
			loginStartTime = "";
		if(Ext.getCmp('endTime').getValue() != "")
			loginEndTime = Ext.getCmp('endTime').getValue().format("Y-m-d");
		else
			loginEndTime = "";
		loginIpAddress = Ext.getCmp('ipAddress').getValue();
		loginOperationResult = Ext.getCmp('operationResult').getValue();
		loginLogLevel = Ext.getCmp('logLevel').getValue();
		loginOperatorId = auditGirdPanel.userId;//Ext.getCmp('userName').getValue();
		loginOperatorTrueName = Ext.getCmp('userName').getRawValue();
		panel.getStore().baseParams = {
			start : 0,
			limit : 25,
			startDate : loginStartTime,
			endDate : loginEndTime,
			ipAddress : loginIpAddress,
			selectOperationResult : loginOperationResult,
			selectLogLevel : loginLogLevel,
			selectOperatorId : loginOperatorId
		};
	}
	panel.getStore().load();
}
