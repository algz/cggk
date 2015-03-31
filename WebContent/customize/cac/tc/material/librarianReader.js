/**
 * 读者管理
 * 
 * @author zgy
 * @classDescription 封装读者管理中的各种操作 
 *
 */
var librarianReader = {
		nowStoreUrl:"../JSON/material_MaterialRemote.getLibrarianMangerList",
		oldStoreUrl:"../JSON/material_MaterialRemote.getLibrarianMangerList",
		nowGridPanelId:'nowGridPanelId',
		oldGridPanelId:'oldGridPanelId',
		nowTitle : "当前借阅",
		oldTitle : "历史借阅",
		userId : null
	};

//读者管理面板
librarianReader.readerMangerPanel = function(){
	var tbar = ['-',{text:' 查 询 ',id:'searchButtonId',disabled:true,handler:function(){
		librarianReader.readerSearchView();
	}},'-'];
	var panel = new Ext.Panel({
		id : 'readerMangerPanelId',
		title : '读者管理',
		frame : false,
		tbar : tbar,
		items:[librarianReader.readerMangerSearchForm()]
	})
	return panel;
}

//读者管理查询form
librarianReader.readerMangerSearchForm = function() {
	var items = [getReaderName(),
	             {xtype:'textfield',fieldLabel:'部门',disable:true,anchor:'75%',name:'dept',id:'dept',readOnly:true}];
	var buttons = [{
	            	   	text : '' + getResource('resourceParam505') + '',
	            	   	handler:function(){
							librarianReader.readerSearchSubmit();
						}
					},{
						text : '' + getResource('resourceParam1930') + '',
						handler : function() {
							Ext.getCmp("readerSearchFrom").getForm().reset();
						}
					}];
	var form = new Ext.FormPanel({
		id : 'readerSearchFrom',
		title:'读者管理',
		layout : 'form',
		border : false,
		defaultType : 'textfield',
		width : 400,
		labelWidth : 75,
		buttonAlign :'center',
		labelAlign : 'left',
		style : 'border:1 solid #000;',
		bodyStyle : 'padding:10',
		items : items,
		buttons:buttons
	});
	var panel = new Ext.Panel({
		id:'readerSearchPanel',
		height : 300,
		border:false,
		bodyStyle : 'margin-top:120;margin-left:200',
		items:[form]
	});
	return panel;
}

//查询视图
librarianReader.readerSearchView = function(){
	//设置按钮不可用
	Ext.getCmp("searchButtonId").setDisabled(true);
	var tabpanel = Ext.getCmp("readerMangerPanelId");
	tabpanel.removeAll();
	tabpanel.add(librarianReader.readerMangerSearchForm());
	tabpanel.doLayout();
}
//提交查询
librarianReader.readerSearchSubmit = function(){
	//按钮设置为可用
	Ext.getCmp("searchButtonId").setDisabled(false);
	//当前阅读
	var now = librarianReader.readerMangerGridPanel(
			librarianReader.nowGridPanelId,
			librarianReader.nowTitle,
			librarianReader.nowStoreUrl);
	//now.getBottomToolbar().destroy();
	now.getBottomToolbar().setVisible(false);
	//历史借阅
	var old = librarianReader.readerMangerGridPanel(
			librarianReader.oldGridPanelId,
			librarianReader.oldTitle,
			librarianReader.oldStoreUrl);
	var tabpanel = Ext.getCmp("readerMangerPanelId");
	tabpanel.remove("readerSearchPanel");
	tabpanel.add(librarianReader.readerMangerForm(),now,old);
	tabpanel.doLayout();
	//加载数据
	Ext.getCmp("readerMangerFormId").load({url:'../JSON/material_MaterialRemote.getFormObj?con='+librarianReader.userId,method : 'post',success : function(form, anction){}});
	Ext.getCmp("nowGridPanelId").getStore().load({params:{con:"userId@"+librarianReader.userId+",state@借出中"}});
	Ext.getCmp("oldGridPanelId").getStore().load({params:{start:0,limit:10,con:"userId@"+librarianReader.userId}});
}

//读者管理查询后的form
librarianReader.readerMangerForm = function(){
	var items = [{
		layout:'column',
	    border:false,
	    width : '96%',
	    defaults:{
			layout:'form',
			columnWidth:.5,
			border:false,
			defaultType : 'textfield'
		},
		items:[
		       {items:[{fieldLabel:'读者姓名',name:'name',anchor:'90%',readOnly:true}]},
		       {items:[{fieldLabel:'部门',name:'dept',anchor:'90%',readOnly:true}]},
		       {items:[{fieldLabel:'已借数量',name:'count',anchor:'90%',readOnly:true}]},
		       {items:[{fieldLabel:'累计数量',name:'allCount',anchor:'90%',readOnly:true}]}
		       ]
	}];
	var form = new Ext.FormPanel({
		id:'readerMangerFormId',
		labelWidth:75,
	    border:false,
		style:'padding:10',
		style:'margin:10,0,0,20',
		items:items
	})
	return form;
}
//借阅别表
librarianReader.readerMangerGridPanel = function(id,title,url){
	var rn = new Ext.grid.RowNumberer();
	var fields = ['guid','bookName','bookIndex','count','lendDate','shouldSendDate','secretLevel'];
	var store = new Ext.data.JsonStore({url:url,root:'results',totalProperty:'totalProperty',fields:fields});
	var colM = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [rn,
 			{header:'名称',width:200,dataIndex:'bookName'},
 			{header:'索取号',width:120,dataIndex:'bookIndex'},
 			{header:'数量',dataIndex:'count'},
 			{header:'借出时间',width:120,dataIndex:'lendDate'},
 			{header:'应还时间',width:120,dataIndex:'shouldSendDate'},
 			{header:'密级',dataIndex:'secretLevel'}
		]
	});
	//底部导航
	var bbar = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	});
	var grid = new Ext.grid.GridPanel({
		id:id,
		title:title,
		cm:colM,
		width:'96%',
		autoHeight:true,
		style:'margin:10,0,0,20',
		store:store,
		loadMASK:{msg:'数据加载中...'},
		stripeRows:true,
		bbar:bbar
	});
	return grid;
}
//姓名
var getReaderName = function() {
	depUser.users('姓名', '', 'name');
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = false;
	depUser.usersComb.on('select', function(combo, record, index) {
		depUser.manname = record.get(combo.displayField);
		librarianReader.userId = record.get(combo.valueField);
		librarianReader.toDeptValue(record.get(combo.valueField));
	});
	return depUser.usersComb;
}
//赋值
librarianReader.toDeptValue = function(userId){
	Ext.Ajax.request({
		url : '../JSON/material_MaterialRemote.getUserObj',
		method : 'post',
		disableCaching : true,
		autoAbort : true,
		callback : function(options, success, response) {
			var resText = response.responseText;
			var str = resText.split("@");
			Ext.getCmp("readerSearchFrom").findById("dept").setValue(str[1]);
		},
		params : {
			con:userId
		}
	});
}
