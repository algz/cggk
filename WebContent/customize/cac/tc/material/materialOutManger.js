//信息录入form
var materialOutManger = {};

materialOutManger.outForm = function(){
	var items = [{
		layout : 'column',
	    border : false,
	    width : 600,
	    defaults : {
			layout : 'form',
			border : false,
			//defaultType : 'textfield',
			columnWidth : .5
		},
		items : [
		         {items:[{
		        	 xtype : 'hidden',
		        	 name :'guid'
		         }]},
		         {columnWidth : .8,items:[{
		        	 fieldLabel : '图号',
		        	 name : "fileNum",
		        	 xtype:'textfield',
		        	 id:'fileNum-Id',
		        	 allowBlank : false,
		        	 anchor : '95%'
		         }]},
		         {columnWidth : .2,items:[{
		        	 text : '作废资料',
			    	 xtype:'button',
			    	 id:'outMaterialButton',
			    	 handler:function(){
		    		 	materialOutManger.toLoadForm();
		         	}
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel : '名称',
		        	 name : "title",
		        	 xtype:'textfield',
		        	 disabled : true,
		        	 allowBlank : true,
		        	 anchor : '100%',
		        	 readOnly : true
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel : '变更日期',
		        	 name : "changeDate",
		        	 id:'changeDate-Id',
		        	 xtype:'datefield',
		        	 format:'Y-m-d',
		        	 disabled : true,
		        	 allowBlank : true,
		        	 anchor : '100%'
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel : '密级',
		        	 name : "secretLevel",
		        	 xtype:'textfield',
		        	 disabled : true,
		        	 allowBlank : true,
		        	 anchor : '100%',
		        	 readOnly : true
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel : '作废页数',
		        	 name : "outPage",
		        	 xtype:'numberfield',
		        	 id:'outPage-Id',
		        	 disabled : true,
		        	 allowBlank : true,
		        	 anchor : '100%'
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel:'作废页号',
			    	 xtype:'textfield',
			    	 name:'outNum',
			    	 id:'outNum-Id',
			    	 disabled : true,
			    	 allowBlank:true,
		        	 anchor : '100%'
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel:'作废份数',
		        	 name : "outCount",
		        	 xtype:'numberfield',
		        	 id:'outCount-Id',
		        	 disabled : true,
		        	 allowBlank : true,
		        	 anchor : '100%'
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel:'作废状态',
		        	 xtype:'combo',
		        	 name:'outState',
		        	 id:'outState-Id',
		        	 disabled : true,
		        	 store:outStateStore,
		        	 allowBlank:true,
		        	 anchor : '100%'
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel : '销毁状态',
		        	 name : "destroyState",
		        	 xtype:'combo',
		        	 id:'destroyState-Id',
		        	 store:destroyStateStore,
		        	 allowBlank : true,
		        	 disabled : true,
		        	 anchor : '100%'
		         }]},
		         {columnWidth : .5,items:[{
		        	 fieldLabel:'使用机型',
		        	 xtype:'textfield',
		        	 name:'machineType',
		        	 id:'machineType-Id',
		        	 disabled : true,
		        	 allowBlank:true,
		        	 anchor : '100%',
		        	 readOnly : true
		         }]},
		         {columnWidth : 1,items:[{
		        	 fieldLabel:'备注',
			    	 xtype:'textfield',
			    	 name:'note',
			    	 disabled : true,
			    	 allowBlank:true,
		        	 anchor : '100%'
		         }]}
		   ]
	}];
	var buttons = [{
		text : '' + getResource('resourceParam505') + '',
		handler : function(){
			materialOutManger.toFormSubmit();
		}		
	}, {
		text : '' + getResource('resourceParam1930') + '',
		handler : function() {
			materialOutManger.outForm().form.reset();
		}
	} ];
	var form = new Ext.FormPanel({
		id : 'materialOutFrom',
		title:' 作废文件 ',
		hidemode : "offsets",
		frame : true,
		bodyStyle : 'padding:20px 0px 0,0px',
		baseCls : "x-plain",
		width : 800,
		//layout:'form',
		buttonAlign :'center',
		labelAlign : 'right',
		autoHeight : true,
		items : items,
		buttons:buttons
	});
	return form;
}

//资料信息列表 


//资料信息列表
materialOutManger.outGrid = function(){
	var checkbox = new Ext.grid.CheckboxSelectionModel();
	var rowNum = new Ext.grid.RowNumberer();
	var fields = ['guid','changeDate','fileNum','outPage','outNum','destroyReason','outCount','outState','destroyState','machineType'];
	var materialOutStore = new Ext.data.JsonStore({url:'../JSON/material_MaterialRemote.getMaterialOutList',root:'results',totalProperty:'totalProperty',fields:fields})
	var colM = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [checkbox,rowNum,
 			{header:'变更日期',dataIndex:'changeDate'},
 			{header:'图号',dataIndex:'fileNum'},
 			{header:'作废页数',dataIndex:'outPage'},
 			{header:'作废页号',dataIndex:'outNum'},
 			{header:'变更依据',dataIndex:'destroyReason'},
 			{header:'作废份数',dataIndex:'outCount'},
 			{header:'作废状态',dataIndex:'outState'},
 			{header:'销毁状态',dataIndex:'destroyState'},
 			{header:'使用机型',dataIndex:'machineType'}
		]
	});
	//底部导航
	var bbar = new Ext.PagingToolbar({
		pageSize:10,
		store:materialOutStore,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	});
	var outgrid = new Ext.grid.GridPanel({
		id:'materialOutGridId',
		title:' 浏览修改 ',
		sm:checkbox,
		cm:colM,
		store:materialOutStore,
		loadMASK:{msg:'数据加载中...'},
		stripeRows:true,
		tbar:[{text:' 查 询 ',id:'searchMaterialOut',handler:function(){
			materialOutManger.searchMaterialOut();
		}},'-',{text:' 导 出 ',id:'reportMaterialOut',handler:function(){
			materialOutManger.reportMaterialOutView();
		}},'-',{text:' 编 辑 ',id:'editeMaterialOut',handler:function(){
			materialOutManger.editeMaterialOut()
		}}],
		bbar:bbar
	});
	//选择事件
	checkbox.on('selectionchange', function(sm) {
		var arr = sm.getSelections();
		if(arr){
			materialAttribute.obj = arr[arr.length-1];
		}
	});
	outgrid.on('activate',function(){
		outgrid.getStore().load({params:{start:0,limit:20}});
	})
	return outgrid;
}

//作废资料操作
materialOutManger.toLoadForm = function(){
	var fm = Ext.getCmp("materialOutFrom");
	var fn = fm.findById("fileNum-Id").getValue();
	if(fn == ""){
		alert("请填写图号！");
		return ;
	}
	fm.load({
		url : '../JSON/material_MaterialRemote.getMaterialByFileNum',
		method : 'post',
		params : {con:fn},
		success : function(form, action) {
			fm.setDisabled(false);
		},
		failure: function(form, action){
			alert("你输入的图号不正确，请从新输入！");
		}
	});
}

//作废资料提交
materialOutManger.toFormSubmit = function(){
	var form = Ext.getCmp("materialOutFrom");
	var fn = form.findById("fileNum-Id").getValue();
	if(fn == ""){
		alert("请填写图号！");
		return ;
	}
	if(form.form.isValid()) {
		form.form.doAction('submit',{
			waitMsg:'正在保存数据，请稍候...',
			waitTitle:'提示',
			url : '../JSON/material_MaterialRemote.saveMaterialOut?id='+new Date(),
			method : 'post',
			success : function(form, action) {
				alert('保存数据成功！');
				form.reset();
				Ext.getCmp("tabPanel").setActiveTab("materialOutGridId");
				Ext.getCmp("materialOutGridId").getStore().reload();
				Ext.getCmp("materialOutGridId").render();
			}
		})
	}
}
//编辑数据加载
materialOutManger.editeMaterialOut = function(){
	if(materialAttribute.obj == null){
		alert("请选择你要编辑的数据！");
		return ;
	}
	Ext.getCmp("tabPanel").setActiveTab("materialOutFrom");
	Ext.getCmp("materialOutFrom").form.loadRecord(materialAttribute.obj);
	Ext.getCmp("materialOutFrom").setDisabled(false);
	
}

materialOutManger.searchMaterialOut = function(){
	var buttons = [{text : '查询',handler : function() {
				var con = "";
				var str = toolForm.getForm().getValues(true);
				var items = str.split("&");
				for(var i=0;i<items.length;i++){
					var s = items[i].split("=");
					if(s[1] != ""){
						con+=s[0]+"@"+s[1]+",";
					}
				}
				if(con == ""){
					alert("请至少输入一个查询条件！");
					return false;
				} else {
					con = decodeURI(con.substring(0,con.lastIndexOf(",")));
				}
				Ext.getCmp("materialOutGridId").getStore().baseParams={start:0,limit:20,con:con};
				Ext.getCmp("materialOutGridId").getStore().load();
				win.close();
			}
		}, {
			text : '取消',
			handler : function() {
				toolForm.form.reset();
				win.close();
			}
		}]
	var items = [{	
		layout:'column',
		border:false,
		defaults:{
			layout:'form',
			columnWidth : .5
		},
		items:[
		       {items:[{fieldLabel:'使用机型',xtype:'combo',id:'mtId', name:'machineType',store:outStateStore,anchor:'95%'}]},
		       {items:[{fieldLabel:'类别',xtype:'combo',id:'sort_Id', name:'sort',store:sortStore,anchor:'95%'}]},
		       {items:[{fieldLabel:'文件类型',xtype:'combo',id:'fileType_Id', name:'fileType',store:fileTypeStore,anchor:'95%'}]},
		       {items:[{fieldLabel:'作废状态',xtype:'combo',id:'outState_Id', name:'outState',store:outStateStore,anchor:'95%'}]},
		       {items:[{fieldLabel:'销毁状态',xtype:'combo',id:'destroyState_Id', name:'destroyState',store:destroyStateStore,anchor:'95%'}]}
		      ]
		}]
		
	var window = new CreateWin("作废资料查询","searchOutWindowId");
	window.setButtons(buttons);
	window.setItems(items);
	window.setWidth(600);
	window.setHeight(180);
	window.init().show();
}
//导出视图
materialOutManger.reportMaterialOutView = function(){
	var form = new Ext.FormPanel({
		id : 'formId',
		frame : true,
		bodyStyle : 'padding:20px 0px 0,0px',
		baseCls : "x-plain",
		width : 300,
		buttonAlign :'center',
		labelAlign : 'right',
		hidemode : "offsets",
		autoHeight : true,
		items : [
		         new Ext.form.Radio({
		        	 name:'tag',
		        	 fieldLabel:'导出类型',
		        	 id:'tag1',
		        	 boxLabel:' 非 密 ',
		        	 checked:true,
		        	 inputValue:'4'
		         }),
		         new Ext.form.Radio({
		        	 name:'tag',
		        	 id:'tag2',
		        	 fieldLabel:'导出类型',
		        	 boxLabel:' 涉 密 ',
		        	 inputValue : '3'
		         })  
		]
	});
	var buttons = [{
			text : '' + getResource('resourceParam505') + '',
			handler : function(){
				var con = decodeURI(Ext.getCmp("formId").form.getValues(true));
				materialOutManger.reportMaterialOut(con);
				Ext.getCmp("reportWindowId").close();
			}		
		}, {
			text : '' + getResource('resourceParam1930') + '',
			handler : function() {
				Ext.getCmp("reportWindowId").close();
			}
		} ];
	var window = new Ext.Window({
		id:'reportWindowId',
		title:'导出类型窗口',
		width:300,
		height:150,
		modal : true,
		plain : true,
		layout : 'fit',
		items:[form],
		buttons:buttons
	})
	window.show();
}
//导出提交
materialOutManger.reportMaterialOut = function(c){
	var	url = "../JSON/exportDocServlet?"+c;
	window.location.href = url;
}