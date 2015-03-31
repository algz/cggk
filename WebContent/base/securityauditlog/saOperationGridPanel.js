var saOperationGridPanel = {comboxValue : 'startTime'};

//数据列表
saOperationGridPanel.init = function(){
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/operation_MyLogRemote.getMyLogLists?userId=3',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader(
			{
				root : 'results',
				id : 'id',
				totalProperty : 'totalProperty'
			}, 
			['id', 'userId','ip','startTime', 'endTime','description', 'item1', 'item1']
		)
					});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm,rm,{
				header : '操作人员',
				dataIndex : 'userId'
			}, {
				header : '操作时间',
				dataIndex : 'startTime',
				width : 120
			}, {
				header : '操作ip',
				dataIndex : 'ip'
			}, {
				header : ' 描述 ',
				dataIndex : 'description',
				width : 400
			}]
	});
	var tbar = ['-'];
	var grid = common.gridPanel('saOperationGridPanelId',cm,store,tbar,true,sm,'安全审计管理员操作信息');
	//搜索
	var tbar = grid.getTopToolbar();
	var combox = new Ext.form.ComboBox({
		id : 'operationcomboxId',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['startTime','操作时间'],['ip','操作ip']]
		}),
		//field : ['value','name'],
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width : 100,
		forceSelection : true,
		value : '操作时间'
	})
	//监听选择
	var d1 = new Ext.form.DateField({
		id : 'operationstartTime',
		format : 'Y-m-d',
		width : 120,
		hidden : false,
		listeners : {'select':function(t){
			d2.setMinValue(t.value);
 	   	}}
	})
	var d2 = new Ext.form.DateField({
		id : 'operationstartTime1',
		format : 'Y-m-d',
		width : 120,
		hidden : false
	})
	var keyWord = new Ext.form.TextField({
		id : 'operationkeyWordId',
		width : 150,
		hidden : true
	});
	combox.on('select',function(combo, record, index){
		var val = record.get(combo.valueField);
		if(val == 'startTime'){
			Ext.getCmp('operationstartTime').setVisible(true);
			Ext.getCmp('operationstartTime1').setVisible(true);
			Ext.getCmp('operationkeyWordId').setVisible(false);
		} else {
			Ext.getCmp('operationstartTime').setVisible(false);
			Ext.getCmp('operationstartTime1').setVisible(false);
			Ext.getCmp('operationkeyWordId').setVisible(true);
		}
		saOperationGridPanel.comboxValue = val;
	});
	tbar.addField(combox);
	tbar.addSpacer();
	tbar.addField(d1);
	tbar.addSpacer();
	tbar.addField(d2);
	tbar.addField(keyWord);
	tbar.addSpacer();
	var search = {text:'搜索',iconCls : 'search1',handler:function(){
		saOperationGridPanel.search();
	}};
	tbar.addButton(search);
	tbar.addSeparator();
	tbar.add({text:'刷新',iconCls : 'refresh1',handler:function(){
		store.reload();
	}});
	tbar.addSeparator();
	var log_export={
	text:'导出',iconCls : 'icon-exportTasks',handler:function(){
//		new Ext.LoadMask(document.body, {
//			msg : '' + getResource('resourceParam1539') + ''
//		});
		var waitConfig = {};
		waitConfig.text = "" + getResource('resourceParam7055') + ","
				+ getResource('resourceParam7056') + "";
		Ext.MessageBox.wait("", "" + getResource('resourceParam7056') + "",
				waitConfig);
		var vo = Seam.Remoting
							.createType("com.sysware.base.audit.operationlog.UserOperationRecordVo");
		vo.setUserId('3');
		Seam.Component.getInstance("operation_MyLogRemote").exportAuditOperationData(
							vo,saOperationGridPanel.exportSucc);
	}
	};
	tbar.addButton(log_export);
	return grid;
}

saOperationGridPanel.exportSucc=function(aa)
{
	Ext.MessageBox.hide();
	window.open('../template.files/exportAuditOperationLog/'+aa,'_blank');
}
//搜索
saOperationGridPanel.search = function(){
	var panel = Ext.getCmp("saOperationGridPanelId");
	if(saOperationGridPanel.comboxValue == 'ip'){//ip查询
		var kw = Ext.getCmp("operationkeyWordId").getValue();
		if(kw == ""){
			Ext.Msg.alert('提示','请输入你要查询的内容！');
			return ;
		} else {
			panel.getStore().baseParams = {start:0,limit:20,ip:kw};
			panel.getStore().load();
		}
	} else {//时间查询
		var st = Ext.getCmp("operationstartTime").getRawValue();
		var st1 = Ext.getCmp("operationstartTime1").getRawValue();
		var str = "{'start':0,'limit':20,"
		if(st == "" || st1 == ""){
			Ext.Msg.alert('提示','请输入你要查询的内容！');
			return ;
		} else {
			if(st != ""){
				str += "'startTime':'"+st+"',"
			}
			if(st1 != ""){
				str += "'startTime1':'"+st1;
			}
			str += "'}";
			panel.getStore().baseParams = Ext.util.JSON.decode(str);
			panel.getStore().load();
		}
	}
}

