/**
 * 图书管理
 * 
 * @author zgy 2010-09-28
 * @classDescription 包含图书管理中的各种操作
 * 
 */

var librarianBook = {bookId:null};

//图书管理面板
librarianBook.bookMangerPanel = function(){
	var tbar = ['-',{text:' 查 询 ',id:'bookSearchButtonId',disabled:true,handler:function(){
		librarianBook.bookSearchView();
	}},'-'];
	var panel = new Ext.Panel({
		id : 'bookMangerPanelId',
		title : '图书管理',
		frame : false,
		tbar : tbar,
		items:[librarianBook.bookMangerSearchForm()]
	})
	return panel;
}

//图书管理查询form
librarianBook.bookMangerSearchForm = function() {
	var items = [{xtype:'textfield',fieldLabel:'书号',name:'bookNum',id:'bookNum',anchor:'90%'},
	             {xtype:'textfield',fieldLabel:'名称',id:'bookName',readOnly:true,anchor:'90%',name:'bookName'}];
	var buttons = [{
	            	   	text : '' + getResource('resourceParam505') + '',
	            	   	handler:function(){
							librarianBook.bookSearchSubmit();
						}
					},{
						text : '' + getResource('resourceParam1930') + '',
						handler : function() {
							Ext.getCmp("bookSearchForm").getForm().reset();
						}
					}];
	var form = new Ext.FormPanel({
		id : 'bookSearchForm',
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
		id:'bookSearchPanel',
		height : 300,
		border:false,
		bodyStyle : 'margin-top:120;margin-left:200',
		items:[form]
	});
	//监听书号
	form.findById("bookNum").on('change',function(t){
		var value = form.findById("bookNum").getValue();
		Ext.Ajax.request({
			url : '../JSON/material_MaterialRemote.getBookName',
			method : 'post',
			disableCaching : true,
			autoAbort : true,
			callback : function(options, success, response) {
				var resText = response.responseText;
				if(resText == ""){
					Ext.Msg.alert('提示','你输入的书号不正确，请重新输入');
					return ;
				}
				var str = resText.split("@");
				Ext.getCmp("bookSearchForm").findById("bookName").setValue(str[1]);
				librarianBook.bookId = str[0];
			},
			params : {
				con:"bookNum@"+value
			}
		});
	})
	return panel;
}
//查询视图
librarianBook.bookSearchView = function(){
	//设置按钮不可用
	Ext.getCmp("bookSearchButtonId").setDisabled(true);
	var tabpanel = Ext.getCmp("bookMangerPanelId");
	tabpanel.removeAll();
	tabpanel.add(librarianBook.bookMangerSearchForm());
	tabpanel.doLayout();
}
//提交查询
librarianBook.bookSearchSubmit = function(){
	//按钮设置为可用
	Ext.getCmp("bookSearchButtonId").setDisabled(false);
	var tabpanel = Ext.getCmp("bookMangerPanelId");
	tabpanel.remove("bookSearchPanel");
	tabpanel.add(librarianBook.bookMangerForm(),librarianBook.bookMangerGridPanel());
	tabpanel.doLayout();
	Ext.getCmp("bookFormId").load({url:'../JSON/material_MaterialRemote.getBookObj?con='+librarianBook.bookId,method : 'post',success : function(form, anction){}});
	Ext.getCmp("bookMangerGridPanelId").getStore().load({params:{con:"bookId@"+librarianBook.bookId}});
}

//图书管理查询后的form
librarianBook.bookMangerForm = function(){
	var items = [{
		layout:'column',
	    border:false,
	    width : '80%',
	    defaults:{
			layout:'form',
			columnWidth:.5,
			border:false,
			defaultType : 'textfield'
		},
		items:[
		       {items:[{fieldLabel:'书号',name:'bookIndex',anchor:'90%',readOnly:true}]},
		       {items:[{fieldLabel:'书名',name:'title',anchor:'90%',readOnly:true}]}
		       ]
	}];
	var form = new Ext.FormPanel({
		id:'bookFormId',
		labelWidth:60,
	    border:false,
		style:'margin:20,0,0,20;padding:10',
		items:items
	})
	return form;
}
//当前状态
librarianBook.bookMangerGridPanel = function(){
	var rn = new Ext.grid.RowNumberer();
	var fields = ['guid','bookNum','bookName','count','name','dept','lendDate','shouldSendDate','secretLevel'];
	var store = new Ext.data.JsonStore({url:'../JSON/material_MaterialRemote.getLibrarianMangerList',root:'results',totalProperty:'totalProperty',fields:fields});
	var colM = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [rn,
 			{header:'书号',width:100,dataIndex:'bookNum'},
			{header:'名称',width:180,dataIndex:'bookName'},
 			{header:'份数',width:50,dataIndex:'count'},
 			{header:'借阅人',dataIndex:'name'},
 			{header:'部门',width:100,dataIndex:'dept'},
 			{header:'借出时间',width:100,dataIndex:'lendDate'},
 			{header:'应还时间',width:100,dataIndex:'shouldSendDate'},
 			{header:'密级',width:80,dataIndex:'secretLevel'}
		]
	});
	var grid = new Ext.grid.GridPanel({
		id:'bookMangerGridPanelId',
		title:'当前状态',
		cm:colM,
		width:'96%',
		style:'margin:20,0,0,20',
		autoHeight : true,
		store:store,
		loadMASK:{msg:'数据加载中...'},
		stripeRows:true
	});
	return grid;
}

