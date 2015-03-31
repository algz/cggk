/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var ExpertGrid = { 
};

// 数据列表
ExpertGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/expertRemote.getExportList?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'exportID',
					totalProperty : 'totalProperty'
				}, [ 'exportID', 'exportName', 'exportCode', 'exportSex',
					 'exportPost','exportTitle','exportAge','expertise'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,		
			{
				header : '姓名',
				dataIndex : 'exportName',
				sortable : true
			},
			{
				header : '性别 ',
				dataIndex : 'exportSex',
				width : 100,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
				    if(record.get("exportSex")=="F"){
				    	
						return '女'; 
				    }
					else if(record.get("exportSex")=="M"){
						
						return '男';  
					}else if(value=="U"){
						return '未知';
					}else{
					return value;
					}l
						
				}
			},
			{
				header : '年龄',
				dataIndex : 'exportAge',
				width : 100,
				sortable : true
			},
			{
				header : '职务',
				dataIndex : 'exportPost',
				sortable : true
			},
			{
				header : '职称 ',
				dataIndex : 'exportTitle',
				width : 100	,
				sortable : true			
			},
			{
				header : '专长 ',
				dataIndex : 'expertise',
				width : 100	,
				sortable : true			
			} ]);
	var tbar = ['-', {
		text : '新建',
		iconCls : 'add1',
		handler : function() {
			var win=Ext.getCmp('expertEditWin');
			if(!win){
				win=new ExpertGrid.expertEditWin();
			}
			win.show();
		}},'-',{text:'编辑',handler:function(){
			var sm=Ext.getCmp('ExpertGridPanelId').getSelectionModel()
			var record=sm.getSelected();
			if(record==null){
				Ext.Msg.alert('提示','请选择数据!');
				return;
			}if(sm.getCount()>1){
			    Ext.Msg.alert('提示','请选择一条数据!');
				return;
			}
			var win=Ext.getCmp('expertEditWin');
			if(!win){
				win=new ExpertGrid.expertEditWin();
			}
			Ext.getCmp('expertEditForm').getForm().loadRecord(record)
			win.show();
		}}, {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			ExpertQueryForm.getSearchForm().show();
		}},'-', {
			text : '刪除',
			iconCls : 'del1',
			handler : function() {
				var grid=Ext.getCmp('ExpertGridPanelId');
				var sm=grid.getSelectionModel();
				var records=sm.getSelections();
				if(sm.getCount()==0){
					Ext.Msg.alert('提示','请选择一条记录!');
					return ;
				}
				var ids=[];
				for(var i=0;i<records.length;i++){
					ids.push(records[i].get('exportID'))
				}
				Ext.Ajax.request({
								url : '../JSON/expertRemote.delExpert',
								params:{
									exportID:Ext.util.JSON.encode(ids)
								
								},
								success : function(response, opts) {
									
				grid.store.remove(sm.getSelections());
									var obj = Ext.decode(response.responseText);
//									console.dir(obj);
								},
								failure : function(response, opts) {
//									console.log('server-side failure with status code '+ response.status);
								}
							});
			}
	}  ]; 
	var grid = new Ext.grid.GridPanel({
	     store : store,
	     cm : cm,
	     sm : sm,
	     autoScroll : true ,
	     id : "ExpertGridPanelId",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     } ,
	     tbar:tbar,
	     bbar: new Ext.PagingToolbar({
            pageSize: 25,
            store: store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        })
	}); 
	return grid;
}

ExpertGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '专家库',
		id : 'ExpertGridTab',
		layout : 'fit',
		items : [ ExpertGrid.gridPanel() ],
		listeners : {
			'activate' : function() {
			 
				var grid = Ext.getCmp('ExpertGridPanelId'); 
				grid.store.baseParams = {start : 0,limit :20};
				grid.store.load();
			}
		}
	});

	return tab;
};


Ext.namespace("ExpertGrid.expertEditWin")
/**
 * 专家库新建/修改
 * @class ExpertGrid.expertEditWin
 * @extends Ext.Window
 */
ExpertGrid.expertEditWin = Ext.extend(Ext.Window, {
			id : "expertEditWin",
			layout : 'fit',
			width : 700,
			autoHeight : true,
			autoScroll : true,
			title : '新建/修改',
			modal : true,
			border : true,
			closeAction : 'close',
			initComponent: function() {//事件绑定不要放在初始时,可以放在扩展时或Renderer中.
             var win=this;
             Ext.applyIf(this,{  
                items : new Ext.form.FormPanel({
                	id:'expertEditForm',
						padding : 5,
						buttonAlign : 'center',
						layout : 'column',
						autoScroll : true,
						width : 700,
						autoHeight : true,
						items : [{
									layout : 'column',
									xtype : 'container',
									defaults : {
										border : false,
										labelWidth : 85
									},
									items : [{
												columnWidth : .49,
												width : 700,
												layout : 'form',
												border : false,
												items : [{xtype:'hidden',name:'exportID'},
														new Ext.form.ComboBox({
									fieldLabel : '姓名',
									xtype : 'textfield',
									allowBlank : false,
									anchor : '90%',
									store : new Ext.data.Store({
										proxy : new Ext.data.HttpProxy({
											method : 'POST',
											url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
													+ new Date()
										}),
										reader : new Ext.data.JsonReader({
													id : "userid",
													totalProperty : 'totalProperty',
													root : 'results'
												}, [{
															name : 'truename'
														}, {
															name : 'userid'
														}, {
															name : 'loginname'
														}])
									}),
									valueField : "userid",
									displayField : "truename",
									mode : 'remote',
									queryParam : 'truename',
									minChars : 0,
									pageSize : 10,
									forceSelection : true,
									hiddenName : 'exportCode',
									editable : true,
									triggerAction : 'all',
									typeAhead : true,
									name : 'exportCode',
									enableKeyEvents : true,
									disableKeyFilter : true
								}),
														/*{
															fieldLabel : '姓名',
															xtype : 'textfield',
															id : 'exportName',
															allowBlank :false,
															anchor : '90%'
														},*/{
															fieldLabel : '年龄',
															xtype : 'numberfield',
															id : 'exportAge',
															anchor : '90%'
														},
															{
																xtype:'combo',
												name : 'expertise',
												fieldLabel : '专长',
												typeAhead : true,// 必须项
												triggerAction : 'all',// 必须项
												lazyRender : true,
												resizable : true,// 是否手动扩展大小,默认false
												mode : 'local',
												forceSelection : true,// 限制输入范围在可选择的文本内
												editable : false,// 不允许输入,只能选择文本列表
												anchor : '90%',
												store : new Ext.data.ArrayStore(
														{
															id : 0,
															fields : ['value',
																	'displayText'],
															data : [['01', '专长1'],
																	['02', '专长2']]
														}),
												valueField : 'value',
												value : '01',
												hiddenName : 'expertise',// 作为FORM表单提交时的参数名
												displayField : 'displayText'
											}]
											}, {
												columnWidth : .49,
												layout : 'form',
												border : false,
												items : [
													new Ext.form.ComboBox({
												name : 'exportSex',
												fieldLabel : '性别',
												typeAhead : true,// 必须项
												triggerAction : 'all',// 必须项
												lazyRender : true,
												resizable : true,// 是否手动扩展大小,默认false
												mode : 'local',
												forceSelection : true,// 限制输入范围在可选择的文本内
												editable : false,// 不允许输入,只能选择文本列表
												anchor : '90%',
												store : new Ext.data.ArrayStore(
														{
															id : 0,
															fields : ['value',
																	'displayText'],
															data : [['M', '男'],
																	['F', '女'],['U', '未知']]
														}),
												valueField : 'value',
												value : 'U',
												hiddenName : 'exportSex',// 作为FORM表单提交时的参数名
												displayField : 'displayText'
											}),{
															xtype : 'textfield',
															fieldLabel : '职务',
															lableWidth : 150,
															id : 'exportPost',
															anchor : '90%'
														},{
															fieldLabel : '职称',
															xtype : 'textfield',
															id : 'exportTitle',
															anchor : '90%'
														} ]
											}]
								}]
					}),
				buttons:[ {
		text : '确定',
		handler : function() {
			var form=Ext.getCmp('expertEditForm')
			form.getForm().submit({
//						clientValidation : true,
						url : '../JSON/expertRemote.saveExpert?d='+new Date(),
						method : 'post',
						success : function(form, action) {
							Ext.Msg.alert('信息','保存成功!' );//action.result.msg
							Ext.getCmp('ExpertGridPanelId').getStore().reload();
							win.close();
						},
						failure : function(form, action) {
							switch (action.failureType) {
								case Ext.form.Action.CLIENT_INVALID :
									Ext.Msg
											.alert('Failure',
													'Form fields may not be submitted with invalid values');
									break;
								case Ext.form.Action.CONNECT_FAILURE :
									Ext.Msg.alert('Failure',
											'Ajax communication failed');
									break;
								case Ext.form.Action.SERVER_INVALID :
									Ext.Msg.alert('Failure', action.result.msg);
							}
						}
					});
		}
	}, {
		text : '关闭',
		handler : function() {
			win.close();
		}
	} ]
             })
             ExpertGrid.expertEditWin.superclass.initComponent.call(this);//必须放在末尾,否则出错
        }

		}) 
