/**
 * 借阅管理
 * 
 * @author zgy 2010-09-28
 * @classDescription 封装借阅管理中各种操作
 * 
 */
var librarianManger = {
		tbar:null,
		storeUrl:'../JSON/material_MaterialRemote.getLibrarianMangerList',
		bookArr:null
};
//顶部导航
librarianManger.tbar = [ {text:' 查 询 ',id:'searchId',handler:function(){librarianInfo.materialSearch()}},'-',
                         {text:' 借 出 ',id:'lendId',handler:function(){librarianManger.bookLendWindow()}},'-',
                         {text:' 归 还 ',id:'sendId',handler:function(){librarianManger.booksendWindow()}}
                         ]
//借出视图                         
librarianManger.bookLendWindow = function(){
	if(lirarianAttribute.obj == null){
		alert("请选择要借出的书！");
		return ;
	}
	if(lirarianAttribute.obj.get("bookState") == "借出"){
		alert("这本书已全部借出，请选择借阅其他书籍！");
		return ;
	}
	var items = [{
	            	layout:'column',
	            	border:false,
	            	defaults:{
	            		layout:'form',
	            		border:false,
	            		columnWidth:.5
	             	},
	             	items:[{xtype:'hidden',name:'guid'},{xtype:'hidden',name:'userId',id:'userId'},{xtype:'hidden',name:'bookId',value:lirarianAttribute.obj.get("guid")},
	             	       {xtype:'hidden',name:'bookNum',id:'bookNum',value:lirarianAttribute.obj.get("bookNum")},{xtype:'hidden',name:'bookIndex',id:'bookIndex',value:lirarianAttribute.obj.get("bookIndex")},
	             	      {items:[getAuthor()]},
	             	      {items:[{xtype:'textfield',fieldLabel:'部门',allowBlank:false,name:'dept',id:'dept',anchor:'95%',readOnly:true}]},
	             	      {items:[{xtype:'numberfield',fieldLabel:'已借数量',name:'allcount',id:'allcount',anchor:'95%',readOnly:true}]},
	             	      {items:[{xtype:'textfield',fieldLabel:'密级',name:'secretLevel',id:'secretLevel',anchor:'95%',readOnly:true}]},
	             	      {columnWidth:1,items:[{xtype:'textfield',fieldLabel:'书名',name:'bookName',anchor:'98%',readOnly:true,value:lirarianAttribute.obj.get("title")}]},
	             	      {items:[{xtype:'numberfield',fieldLabel:'数量',name:'count',anchor:'95%',value:1,allowBlank:false,maxValue:lirarianAttribute.obj.get("count")}]},
	             	      {items:[{xtype:'textfield',fieldLabel:'分类',name:'bookType',anchor:'95%',readOnly:true,value:lirarianAttribute.obj.get("bookType")}]},
	             	      {items:[{xtype:'datefield',fieldLabel:'借阅时间',name:'lendDate',id:'lendDate',anchor:'95%',format:'Y-m-d',value:new Date()}]},
	             	      {items:[{xtype:'datefield',fieldLabel:'应还时间',name:'shouldSendDate',id:'shouldSendDate',anchor:'95%',disabled:true,format:'Y-m-d'}]}
	             	 ]
	            }];
	var buttons = [{
	   					text : '' + getResource('resourceParam505') + '',
	   					handler:function(){
							librarianManger.librarianMangerSubmit();
						}
					},{
						text : '' + getResource('resourceParam1930') + '',
						handler : function() {
							Ext.getCmp("librarianMangerLendWin_form").getForm().reset();
							win.close();
						}
					}];
	var window = new CreateWin("借出","librarianMangerLendWin");
	window.setButtons(buttons);
	window.setItems(items);
	window.setHeight(220);
	window.setWidth(600);
	window.init().show();
	//应还日期赋值
	librarianManger.toValueForDate();
}
//借出提交
librarianManger.librarianMangerSubmit = function(){
	var form = Ext.getCmp("librarianMangerLendWin_form");
	if(form.form.isValid()) {
		form.form.doAction('submit',{
			waitMsg:'正在保存数据，请稍候...',
			waitTitle:'提示',
			url : '../JSON/material_MaterialRemote.saveLibrarianManger?id='+new Date(),
			method : 'post',
			success : function(form, action) {
				alert('保存数据成功！');
				form.reset();
				win.close();
				Ext.getCmp("materialGridId").getStore().reload();
				Ext.getCmp("materialGridId").render();
			}
		})
	}
}
//归还视图
librarianManger.booksendWindow = function(){
	var buttons = [{
				   		text : '' + getResource('resourceParam505') + '',
				   		handler:function(){
							librarianManger.bookSendSubmit();
						}
					},{
						text : '' + getResource('resourceParam1930') + '',
						handler : function() {
							Ext.getCmp("booksendWindowId").close();
						}
					}];
	var window = new Ext.Window({
		title : ' 归   还 ',
		id: 'booksendWindowId',
		width : 700,
		modal : true,
		height : 400,
		maximazable : true,
		autoScroll : false,
		plain : true,
		frame:true,
		style:'background-color:#ffffff',
		items : [librarianManger.bookSendFormPanel(),librarianManger.bookSendGridPanel()],
		buttons : buttons
	})
	window.show();
}
//归还视图中的form
librarianManger.bookSendFormPanel = function(){
	var items = [{
		layout:'column',
		width:'96%',
		style:'margin:15,0,0,15;',
		border:false,
		defaults:{
			layout:'form',
			columnWidth:.5,
			border:false
		},
		items:[
		       {items:[getName()]},
		       {items:[{xtype:'textfield',fieldLabel:'部门',name:'dept',id:'dept',readOnly:true,anchor:'90%'}]},
		       {items:[{xtype:'datefield',fieldLabel:'实际归还时间',disabled:true,format:'Y-m-d',value:new Date(),name:'shouldSendDate',anchor:'95%'}]
		}]        
	}];
	var form = new Ext.FormPanel({
		id:'bookSendFormPanelId',
		labelWidth:90,
		labelAlign:'right',
		border:false,
		items:items
	})
	return form;
}
//归还视图中的gridpanel
librarianManger.bookSendGridPanel = function(){
	var checkbox = new Ext.grid.CheckboxSelectionModel();
	var rn = new Ext.grid.RowNumberer();
	var fields = ['guid','bookName','bookIndex','count','lendDate','shouldSendDate','secretLevel'];
	var store = new Ext.data.JsonStore({url:librarianManger.storeUrl,root:'results',totalProperty:'totalProperty',fields:fields});
	var colM = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [checkbox,rn,
 			{header:'名称',width:160,dataIndex:'bookName'},
 			{header:'索取号',width:80,dataIndex:'bookIndex'},
 			{header:'数量',width:50,dataIndex:'count'},
 			{header:'借出时间',width:100,dataIndex:'lendDate'},
 			{header:'应还时间',width:100,dataIndex:'shouldSendDate'}	                  
		]
	});
	var grid = new Ext.grid.GridPanel({
		id:'bookSendGridPanelId',
		cm:colM,
		width:'96%',
		store:store,
		height:255,
		sm:checkbox,
		autoScroll:true,
		style:'background:#fff;margin:10,0,0,15',
		loadMASK:{msg:'数据加载中...'},
		stripeRows:true
		//bbar:bbar
	});
	checkbox.on('selectionchange', function(sm) {
		librarianManger.bookArr = sm.getSelections();
	});
	return grid;
}
//归还提交
librarianManger.bookSendSubmit = function(){
	if(librarianManger.bookArr == null){
		alert("请选择你要归还的书籍！");
		return ;
	}
	var str = "";
	for(var i=0;i<librarianManger.bookArr.length;i++){
		str += "@"+librarianManger.bookArr[i].get("guid");
	}
	str = str.substring(str.indexOf("@")+1);
	Ext.Ajax.request({
		url : '../JSON/material_MaterialRemote.goBackBooks',
		method : 'post',
		disableCaching : true,
		autoAbort : true,
		params : {
			con:str
		},
		success : function(options, response){
			Ext.Msg.alert('提示'," 还书成功！");
			Ext.getCmp("booksendWindowId").close();
			Ext.getCmp("materialGridId").getStore().reload();
		},
		failure : function(options, response){
			Ext.Msg.alert('提示',"服务器忙，请稍候再试！");
		}
	});
}

//借出--姓名
var getAuthor = function() {
	depUser.users('姓名', '', 'name');
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = false;
	depUser.usersComb.on('select', function(combo, record, index) {
		depUser.manname = record.get(combo.displayField);
		librarianManger.toLendValues(record.get(combo.valueField));
	});
	return depUser.usersComb;
}
//归还--姓名
var getName = function() {
	depUser.users('姓名', '', 'name');
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = false;
	depUser.usersComb.on('select', function(combo, record, index) {
		depUser.manname = record.get(combo.displayField);
		librarianManger.toSendValues(record.get(combo.valueField));
	});
	return depUser.usersComb;
}
//借出赋值
librarianManger.toLendValues = function(userId){
	Ext.Ajax.request({
		url : '../JSON/material_MaterialRemote.getUserObj',
		method : 'post',
		disableCaching : true,
		autoAbort : true,
		callback : function(options, success, response) {
			var resText = response.responseText;
			var str = resText.split("@");
			var form = Ext.getCmp("librarianMangerLendWin_form");			
			form.findById("allcount").setValue(str[2]);			
			form.findById("dept").setValue(str[1]);		
			form.findById("secretLevel").setValue(str[3]);		
			form.findById("userId").setValue(userId);			
		},
		params : {
			con:userId
		}
	});
}
//归还赋值
librarianManger.toSendValues = function(userId){
	Ext.Ajax.request({
		url : '../JSON/material_MaterialRemote.getUserObj',
		method : 'post',
		disableCaching : true,
		autoAbort : true,
		callback : function(options, success, response) {
			var resText = response.responseText;
			var str = resText.split("@");
			var	form = Ext.getCmp("bookSendFormPanelId");
			form.findById("dept").setValue(str[1]);
		},
		params : {
			con:userId
		}
	});
	Ext.getCmp("bookSendGridPanelId").getStore().load({params:{con:"userId@"+userId+",state@借出中"}});
}
//赋值应还日期
librarianManger.toValueForDate = function(){
	var ff = Ext.getCmp("librarianMangerLendWin_form");
	//初始化
	var val = ff.findById("lendDate").getValue();
	librarianManger.getReturnValue(val);
	//监听日期变化
	ff.findById("lendDate").on('select',function(t){
		librarianManger.getReturnValue(t.value);
	});
}
librarianManger.getReturnValue = function(v){
	var form = Ext.getCmp("librarianMangerLendWin_form");
	Ext.Ajax.request({
		url : '../JSON/material_MaterialRemote.getAfterDate',
		method : 'post',
		disableCaching : true,
		autoAbort : true,
		callback : function(options, success, response) {
			var str = response.responseText;
			form.findById("shouldSendDate").setValue(str);
		},
		params : {
			con:v
		}
	});
}



                        