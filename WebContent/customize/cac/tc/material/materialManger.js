//信息录入form
var materialManger = {searchCon:null};
materialManger.inForm = function (){
	var items = [{
         layout : 'column',
	     border : false,
	     width : 800,
	     defaults : {
			layout : 'form',
			border : false,
			defaultType : 'textfield',
			columnWidth : .5
		},
		items:[
		       {items:[{
		    	   xtype : 'hidden',
		    	   name :'guid'
		       }]},
		       {columnWidth : 1,items:[{
		    	   fieldLabel : '接收日期',
		    	   name : 'reciveDate',
		    	   xtype:'datefield',
		    	   format:'Y-m-d',
		    	   id:'reciveDate',
		    	   value : new Date(),
		    	   allowBlank : true,
		    	   anchor : '100%'
		       }]},
		       {columnWidth : .5,items:[{
		    	   fieldLabel : '图号(文件号)',
		    	   name : "fileNum",
		    	   xtype:'textfield',
		    	   id:'fileNum',
		    	   blankText :'图号是必填项，请填写图号！',
		    	   emptyText :'请填写图号...',
		    	   msgTarget :'qtip',
		    	   allowBlank : false,
		    	 
		    	   anchor : '100%'
		       }]},
		       {columnWidth : .5,items:[{
		    	   fieldLabel:'版次',
		    	   xtype:'textfield',
		    	   name:'edition',
		    	   allowBlank:true,
		    	   
		    	   anchor : '100%'
		       }]},
		       {columnWidth : 1,items:[{
		    	   fieldLabel : '发文日期',
		    	   name : "sendDate",
		    	   id:'sendDate',
		    	   xtype:'datefield',
		    	   value : new Date(),
		    	   format:'Y-m-d',
		    	   allowBlank : true,
		    	   
		    	   anchor : '100%'
		       }]},
		       {columnWidth : 1,items:[{
		    	   fieldLabel : '名称',
		    	   name : "title",
		    	   regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
		    	   allowBlank : true,
		    	   
		    	   anchor : '100%'
		       }]},
		       {columnWidth : .4,items:[{
		    	   	fieldLabel : '分类代号',
		    	   	name : "typeNum",	
					xtype:'combo',
					id:'typeNum',
			    	store:typeNumStore,
					allowBlank : false,
					emptyText :'请选择分类代号...',
					anchor : '100%'
		       }]},
		       {columnWidth : .3,items:[{
		    	   	fieldLabel:'份数',
			    	xtype:'numberfield',
			    	name:'count',
			    	allowBlank:true,
			    	value : 1,
			    	anchor : '100%'
		       }]},
		       {columnWidth : .3,items:[{
		    	   	fieldLabel:'每份页数',
		    	   	xtype:'numberfield',
		    	   	name:'pageNum',	
		    	   	allowBlank:true,
		    	   	value : 1,
		    	   	anchor : '100%'
		       }]},
		       {items:[{
		    	   	fieldLabel : '类别',
		    	   	name : "sort",
					xtype:'combo',
					id:'sort',
			    	store:sortStore,
					allowBlank : true,
					columnWidth : .5,
					anchor : '100%'
		       }]},
		       {columnWidth:.5,items:[{
		    	   	fieldLabel:'密级',
			    	xtype:'combo',
			    	name:'secretLevel',
			    	id:'secretLevel',
			    	store:secretLevelStore,
			    	
			    	allowBlank:true,
			    	anchor : '100%'
		       }]},
		       {columnWidth : .5,items:[{
		    	   	fieldLabel : '索取号',
		    	   	name : "indexNum",
					xtype:'textfield',
					allowBlank : true,
					
					anchor : '100%'
		       }]},
		       {columnWidth:.5,items:[{
		    	   	fieldLabel:'使用机型',
		    	   	xtype:'combo',
		    	   	id:'machineType',
		    	   	name:'machineType',
		    	   	store:machineTypeStore,
		    	   	
		    	   	allowBlank:true,
		    	   	anchor : '100%'
		       }]},
		       {columnWidth : 1,items:[{
		    	   	fieldLabel:'发往单位',
					xtype:'combo',
					name:'sendDept',
					id:'sendDept',
					store:sendDeptStore,
					allowBlank : true,
					
					anchor : '100%'
		       }]},
		       {columnWidth : .4,items:[{
		    	   	fieldLabel : '文件类型',
		    	   	name : "fileType",
					xtype:'combo',
			    	store:fileTypeStore,
					allowBlank : true,
					
					anchor : '100%'
		       }]},
		       {columnWidth:.3,items:[{
		    	   	fieldLabel:'发文者',
		    	   	xtype:'textfield',
		    	   	name:'asker',
		    	   	
		    	   	regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
		    	   	allowBlank:true,
		    	   	anchor : '100%'
		       }]},
		       {columnWidth:.3,items:[{
		    	   	fieldLabel:'A4数',
		    	   	xtype:'numberfield',
		    	   	name:'A4Num',
		    	   	value : 1,
		    	   	allowBlank:true,
		    	   	anchor : '100%'
		       }]},
		       {columnWidth : 1,items:[{
		    	   	fieldLabel:'引用文章',
					name:'referenceFile',
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
					allowBlank : true,
					anchor : '100%'
		       }]},
		       {columnWidth : 1,items:[{
		    	   	fieldLabel:'更改图号',
					name:'changeNum',
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
					allowBlank : true,
					
					anchor : '100%'
		       }]},
		       {columnWidth : 1,items:[{
		    	   	fieldLabel:'更改原因',
					name:'changeReason',
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
					allowBlank : true,
					
					anchor : '100%'
		       }]},
		       {columnWidth : .5,items:[{
		    	   	xtype:'datefield',
					fieldLabel:'更改日期',
					name:'changeDate',
					format:'Y-m-d',
					value : new Date(),
					allowBlank : true,
					anchor : '100%'
		       }]},
		       {columnWidth : .5,items:[{
		    	   	xtype:'datefield',
					fieldLabel:'有效期',
					name:'availabilityDate',
					format:'Y-m-d',
					value : new Date(),
					allowBlank : true,
					
					anchor : '100%'
		       }]},
		       {columnWidth : 1,items:[{
		    	   	xtype:'textfield',
					fieldLabel:'备注',
					name:'note',
					allowBlank : true,
					anchor : '100%'
		       }]}
			]}];
	var buttons = [{
		text : '' + getResource('resourceParam505') + '',
		handler : function(){
			var materialForm = Ext.getCmp("materialFrom");
			if(materialForm.form.isValid()) {
				materialForm.form.doAction('submit',{
					waitMsg:'正在保存数据，请稍候...',
					waitTitle:'提示',
					url : '../JSON/material_MaterialRemote.addMaterialInfo?id='+new Date(),
					method : 'post',
					success : function(form, action) {
						alert('保存数据成功！');
						form.reset();
						Ext.getCmp("tabPanel").setActiveTab("materialGridId");
					}
				})
			}
		}		
	}, {
		text : '' + getResource('resourceParam1930') + '',
		handler : function() {
			Ext.getCmp("materialFrom").getForm().reset();
		}
	} ]
	var inform = new Ext.FormPanel({
		id : 'materialFrom',
		title:'技术资料登记帐',
		hidemode : "offsets",
		width : 600,
		buttonAlign :'center',
		labelAlign : 'right',
		bodyStyle : 'padding:10,0,0,0',
		autoHeight : true,
		items : items,
		buttons:buttons
	});
	return inform;
}

//资料信息列表
materialManger.inGrid = function(){
	var checkbox = new Ext.grid.CheckboxSelectionModel();
	var rn = new Ext.grid.RowNumberer();
	var fields = ['guid','reciveDate','sendDate','typeNum','fileNum','edition','machineType','title','count','pageNum','secretLevel','sendDept','fileType','fileNumber','changeNum','changeReason','availabilityDate','referenceFile','asker','A4Num'];
	var store = new Ext.data.JsonStore({url:'../JSON/material_MaterialRemote.getMaterialList',root:'results',totalProperty:'totalProperty',fields:fields});
	var colM = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [checkbox,rn,
 			{header:'接收时间',dataIndex:'reciveDate'},
 			{header:'发文时间',dataIndex:'sendDate'},
 			{header:'分类代号',dataIndex:'typeNum'},
 			{header:'图号',dataIndex:'fileNum'},
 			{header:'版次',dataIndex:'edition'},
 			{header:'使用机型',dataIndex:'machineType'},
 			{header:'名称',dataIndex:'title'},
 			{header:'份数',dataIndex:'count'},
 			{header:'每份页数',dataIndex:'pageNum'},
 			{header:'类别',dataIndex:'sort'},
 			{header:'密级',dataIndex:'secretLevel'},
 			{header:'发往单位',dataIndex:'sendDept'},
 			{header:'文件类型',dataIndex:'fileType'},
 			{header:'索引号',dataIndex:'fileNumber'},
 			{header:'更改图号',dataIndex:'changeNum'},
 			{header:'更改原因',dataIndex:'changeReason'},
 			{header:'有效期',dataIndex:'availabilityDate'},
 			{header:'引用文件',dataIndex:'referenceFile'},
 			{header:'发文者',dataIndex:'asker'},
 			{header:'A4数',dataIndex:'A4Num'}
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
	var ingrid = new Ext.grid.GridPanel({
		id:'materialGridId',
		title:' 资料列表  ',
		sm:checkbox,
		cm:colM,
		store:store,
		loadMASK:{msg:'数据加载中...'},
		stripeRows:true,
		tbar:[{text:' 查 询 ',id:'materialSearch',handler:function(){
			materialManger.materialSearch();
			//this.materialSearch().show();
		}},'-',{text:' 编 辑 ',id:'materialEdite',handler:function(){
			materialManger.materialEdite();
		}},'-',{text:' 导 出 ',id:'materialReport',handler:function(){
			materialManger.materialReport();
		}}],
		bbar:bbar
	});
	checkbox.on('selectionchange', function(sm) {
		var arr = sm.getSelections();
		if(arr){
			materialAttribute.obj = arr[arr.length-1];
		}
	});
	ingrid.on('activate',function(){
		ingrid.getStore().load({params:{start:0,limit:20}});
		ingrid.doLayout();
	})
	return ingrid;
}


//编辑数据加载
materialManger.materialEdite = function(){
	if(materialAttribute.obj == null){
		alert("请选择你要编辑的数据！");
		return ;
	}
	Ext.getCmp("tabPanel").setActiveTab("materialFrom");
	Ext.getCmp("materialFrom").form.loadRecord(materialAttribute.obj);
}
//查询视图
materialManger.materialSearch = function(){
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
						columnWidth : .5
					},
					items:[
					       {items:[{fieldLabel : '图号',name : "fileNum",id:'fileNumId',xtype:'textfield',anchor:'95%'}]},
					       {items:[{fieldLabel:'版次',xtype:'textfield',id:'editionId', name:'edition',anchor:'95%'}]},
					       {items:[{fieldLabel:'使用机型',xtype:'combo',id:'machineTypeId', name:'machineType',store:machineTypeStore,anchor:'95%'}]},
					       {items:[{fieldLabel:'分类代号',xtype:'combo',id:'typeNumId', name:'typeNum',store:typeNumStore,anchor:'95%'}]},
					       {items:[{fieldLabel:'文件类型',xtype:'combo',id:'fileTypeId', name:'fileType',store:fileTypeStore,anchor:'95%'}]},
					       {items:[{fieldLabel:'类别',xtype:'combo',id:'sortId', name:'sort',store:sortStore,anchor:'95%'}]},
					       {items:[{fieldLabel:'名称',xtype:'textfield',id:'titleId', name:'title',anchor:'95%'}]},
					       {items:[{fieldLabel:'有效性',xtype:'datefield',id:'availabilityDateId',format:'Y-m-d', name:'availabilityDate',anchor:'95%'}]},
					       {items:[{fieldLabel:'发文者',xtype:'textfield',id:'askerId', name:'asker',anchor:'95%'}]}
					      ]
				}]
		var window = new CreateWin("资料查询","searchWindowId");
		window.setButtons(buttons);
		window.setItems(items);
		window.setWidth(600);
		window.setHeight(240);
		window.init().show();
}
//导出
materialManger.materialReport = function(){
	var url = '../JSON/exportDocServlet?tag=1';
	window.location.href = url;
}

