var librarianInfo = {};
//图书期刊信息录入form
librarianInfo.inForm = function (){
	var items = [
	             {
	            	 xtype : 'hidden',
	            	 name :'guid'
	             },{
	            	 xtype : 'datefield',
	            	 fieldLabel : '接受日期',
	            	 name : 'reciveDate',
	            	 value : new Date(),
	            	 format : 'Y-m-d',
	            	 anchor : '95%'
	             },{
	            	 xtype : 'combo',
	            	 fieldLabel : '分类',
	            	 name : 'bookType',
	            	 emptyText : '请选择图书分类...',
	            	 store : bookTypeStore,
	            	 anchor : '95%'
	             },{
	            	 fieldLabel : '书名',
	            	 name : 'title',
	            	 allowBlank : true,
	            	 emptyText : '请输入书名...',
	            	 anchor : '95%'
	             },{
	            	 fieldLabel : '书号',
	            	 name : 'bookNum',
	            	 allowBlank : false,
	            	 emptyText : '请输入书号...',
	            	 anchor : '95%'
	             },{
	            	 xtype : 'numberfield',
	            	 fieldLabel : '份数',
	            	 name : 'count',
	            	 value : 1,
	            	 anchor : '95%'
	             },{
	            	 xtype : 'numberfield',
	            	 fieldLabel : '每份页数',
	            	 name : 'pageNum',
	            	 value : 1,
	            	 anchor : '95%'
	             },{
	            	 xtype : 'combo',
	            	 fieldLabel : '密级',
	            	 name : 'secretLevel',
	            	 emptyText : '请选择密级...',
	            	 store : sLStore,
	            	 anchor : '95%'
	             },{
	            	 fieldLabel : '索取号',
	            	 name : 'bookIndex',
	            	 anchor : '95%'
	             },{
	            	 fieldLabel : '存放位置',
	            	 name : 'bookWhere',
	            	 anchor : '95%'
	             },{
	            	 fieldLabel : '备注',
	            	 name : 'note',
	            	 anchor : '95%'
	             }];    
	var buttons = [
	               {
	            	   text : '' + getResource('resourceParam505') + '',
	            	   handler : function(){
	            	   		var materialForm = Ext.getCmp("librarianInfoFrom");
	            	   		if(materialForm.form.isValid()) {
	            	   			materialForm.form.doAction('submit',{
	            	   				waitMsg:'正在保存数据，请稍候...',
	            	   				waitTitle:'提示',
	            	   				url : '../JSON/material_MaterialRemote.addLibrarianInfo',
	            	   				method : 'post',
	            	   				success : function(form, action) {
	            	   					alert('保存数据成功！');
	            	   					form.reset();
	            	   					Ext.getCmp("tabPanel").setActiveTab("materialGridId");
	            	   				}
	            	   			})
	            	   		}
	               		}		
	               },{
	            	   	text : '' + getResource('resourceParam1930') + '',
	            	   	handler : function() {
	            	   		Ext.getCmp("librarianInfoFrom").getForm().reset();
	               		}
	               	} ];
	var inform = new Ext.FormPanel({
		id : 'librarianInfoFrom',
		title:'图书期刊登记帐',
		hidemode : "offsets",
		layout : 'form',
		border : false,
		defaultType : 'textfield',
		width : '80%',
		labelWidth : 60,
		buttonAlign :'center',
		labelAlign : 'right',
		bodyStyle : 'padding:10,0,0,0',
		autoHeight : true,
		items : items,
		buttons:buttons
	});
	return inform;
}

//图书期刊管理头部导航
librarianInfo.tbar = [{text:' 查 询 ',id:'librarianSearch',handler:function(){librarianInfo.materialSearch();}},'-',
                      {text:' 编 辑 ',id:'materialEdite',handler:function(){librarianInfo.materialEdite();}},'-',
                      {text:' 导 出 ',id:'materialReport',handler:function(){librarianInfo.materialReport();}}];
//编辑数据加载
librarianInfo.materialEdite = function(){
	if(lirarianAttribute.obj == null){
		alert("请选择你要编辑的数据！");
		return ;
	}
	Ext.getCmp("tabPanel").setActiveTab("librarianInfoFrom");
	Ext.getCmp("librarianInfoFrom").form.loadRecord(lirarianAttribute.obj);
}
//查询视图
librarianInfo.materialSearch = function(){
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
							Ext.getCmp("materialGridId").getStore().baseParams={start:0,limit:20,con:con};
							Ext.getCmp("materialGridId").getStore().load();
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
						columnWidth : 1
					},
					items:[
					       {items:[{fieldLabel : '书号',name : "bookNum",xtype:'textfield',anchor:'95%'}]},
					       {items:[{fieldLabel:'名称',xtype:'textfield',name:'title',anchor:'95%'}]},
					       {items:[{fieldLabel:'状态',xtype:'combo',name:'bookState',store:bookStateStore,anchor:'95%'}]},
					       {items:[{fieldLabel:'索取号',xtype:'textfield',name:'bookIndex',anchor:'95%'}]},
					       {items:[{fieldLabel:'接收时间',xtype:'datefield',id:'reciveDateId', name:'reciveDate',format:'Y-m-d',anchor:'95%'}]}
					      ]
				}]
		var window = new CreateWin("图书期刊查询","searchWindowId");
		window.setButtons(buttons);
		window.setItems(items);
		window.setWidth(400);
		window.setHeight(220);
		window.init().show();
}
librarianInfo.materialReport = function(){
	var url = '../JSON/exportDocServlet?tag=2';
	window.location.href = url;
}

