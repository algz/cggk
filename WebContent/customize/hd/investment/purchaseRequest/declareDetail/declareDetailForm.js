
var DeclarationMaterial={param1 : null,param2 : null}
var declareDetailForm={}
DeclarationMaterial.declarationContentGridPanel =function(){
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
    		defaults: {
    	        sortable: true,
    	        menuDisabled: true
    	    },
    		columns : [new Ext.grid.RowNumberer({
	    	        width : 35,
	    	        header : "序号"
	    	 	}),sm,{
	    			header : '物资编号',
	    			dataIndex : 'materialitemcode',
	    			width : 100
	    		},{
	    			header : '物资名称',
	    			dataIndex : 'materialItemName',
	    			width : 100
	    		}, {
	    			header : '规格型号',
	    			dataIndex : 'materialStandard',
	    			width : 100
	    		}, {
	    			header : '单位',
	    			dataIndex : 'demension',
	    			width : 100
	    		}, {
	    			header : '技术条件',
	    			dataIndex : 'technicCondition',
	    			width : 100
	    		}, {
	    			header : '物资类别',
	    			dataIndex : 'materialCatalogName',
	    			width : 150//, 
	    			//editor:declareDetailForm.getPurchasedUseCombo()
	    		}, {
	    			header : '数量',
	    			dataIndex : 'quantity',
	    			width : 100,
	    			maxLength : 10,
		        	maxLengthText : '不能超过10个字符，请重新输入！',
	    			editor: new Ext.form.NumberField({ 
			        })
	    		}, {
	    			header : '使用时间',
	    			dataIndex : 'useDate',
	    			width : 100,
	    			renderer:Ext.util.Format.dateRenderer('Y-m-d'),
	    			editor: new Ext.form.DateField({
					  		  format : 'Y-m-d',
					  		  editable : false
					})
	    		}, {
	    			header : '采购用途',
	    			dataIndex : 'use',
	    			width : 100,
	    			editor:declareDetailForm.getDeclareTypeCombo()
	    		}, {
	    			header : '资金预算（单位：元）',
	    			dataIndex : 'amount',
	    			width : 120, 
	    			editor: new Ext.form.NumberField({
			             allowBlank: false,
			             allowDecimals :true,//是否允许输入小数   
			             maxLength : 12,
		        		 maxLengthText : '不能超过15个字符，请重新输入！',
	    				 decimalPrecision :3//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义 
			        })
	    		}, {
	    			header : '采购类型',
	    			dataIndex : 'declareTypeName',
	    			width : 100,
	    			editor:declareDetailForm.mCNameCombo()
	    		}
//	    		, {
//	    			header : '报告类型',
//	    			dataIndex : 'reportType',
//	    			width : 100,
//	    			editor:declareDetailForm.reportTypeCombo()
//	    		}, {
//	    			header : '报告文件',
//	    			dataIndex : 'fileName',
//	    			width : 120,
//	    			renderer : function(value, cellmeta, record,
//						rowIndex) { 
//						var value = record.get("fileName");   
//						if(value=="")
//						   value = "上传报告文件";
//						return "<a cursor：hand href = javascript:void(0) onclick = declareDetailAction.showUploadForm('0').show()><font color = blue>"+value+"</font></a>";
//			   		}
//	    		}, {
//	    			hidden : true,
//	    			dataIndex : 'fileId',
//	    			width : 100
//	    		}
	        ]
	    });	
	    var proxy = new Ext.data.HttpProxy({
		   	url : '',//'../JSON/material_MaterialRemote.getAll?d='+new Date(),
	        method : "POST"
	    });
		var reader = new Ext.data.JsonReader({
		    root: 'results',
		    totalProperty: 'totalProperty',
		    id : 'materialid'
		}, ['materialid', 'materialItemName', 'desingnation',
			'materialStandard', 'demension', 'referencePrice','materialcatalogName',
			'technicCondition', 'warningValue', 'preservePeriod','taskno',
			'remarks','materialitemcode','fileId','fileName','remark'
	        ]);
		 
		var myStore = new Ext.data.Store({
			proxy : proxy,
		    reader: reader
		}); 
//     var bb = new Ext.PagingToolbar({
//		pageSize:20,
//		store:myStore,
//		displayInfo:true,
//		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
//		emptyMsg:'没有记录'
//	}); 
	var toolbar = ['-',{
				text : '添加',
				handler : function() {
					var win=Ext.getCmp('addDeclarationMaterial');
					if(win==null){
						win=new declarationMaterial.materialWin({
						     title:'新增记录详情',
						     id:'addDeclarationMaterial',
						     listeners:{show:function(){
    				var contactPerson=Ext.getCmp('contactPerson');
				if(contactPerson.getValue()==""){
				Ext.Ajax.request({
					url : '../JSON/untilsRemote.getLoginUser',
					method : 'post',
					disableCaching : true,
					autoAbort : true,
					success : function(response, options) {
						var user=Ext.util.JSON.decode(response.responseText).data;
						contactPerson.setValue(user.truename);
					}
				});
				}}}});
					}
					
//					win = new hd.investment.purchaseRequest.declareDetail.win.window({title : '新增记录详情'});
					win.show();
				}
			}, {
				text : '编辑',
				id : 'edit',
				handler : function() {
					var win=Ext.getCmp('modifyDeclarationMaterial');
					var rec=Ext.getCmp('materialGrid').getSelectionModel().getSelected();
					if(rec==null){
						Ext.Msg.alert("提示","请选择一条记录!");
						 return;
					}
					if(win==null){
						win=new declarationMaterial.materialWin({title:'编辑记录详情',id:'modifyDeclarationMaterial'});
					}
//					win = new hd.investment.purchaseRequest.declareDetail.win.window({title : '新增记录详情'});
					win.show();
					
					Ext.getCmp('declarationMaterialFormPanel').getForm().loadRecord(rec);
					
				}
			}, {
				text : '删除',				
				handler : function() {
					var grid=Ext.getCmp('materialGrid')
		                grid.getStore().remove(grid.getSelectionModel().getSelections());
				}
			}/*, {
				text : '查询',
				iconCls : 'search1',
				handler : function() {
					declareDetailAction.getSearchForm().show();
				}
			}*/];
	var grid = new Ext.grid.EditorGridPanel({ 
		 width : 800,
		 height :300,
	     store : myStore, 
//	     bbar : bb,
	     cm : cm,
	     sm : sm,
	     id : "materialGrid", 
//	     loadMask : {
//	      	msg : '正在加载数据,请稍后...'
//	     },
	     columnLines : true,
	     stripeRows : true,
		 viewConfig : {
			enableRowBody : true
		 }, 
		 tbar:toolbar,
		 clicksToEdit:1//设置点击几次才可编辑 
		
	});
	grid.addListener('cellclick',cellclick);
	
	function cellclick(grid, rowIndex, columnIndex, e) { 
			 var records = grid.getSelectionModel().getSelections();
				 if(records.length>1){
				 	Ext.getCmp("edit").disable();
				 }else{ 
				 	Ext.getCmp("edit").enable();
				 }
	}
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
				var grid = Ext.getCmp('materialGrid');
				var records = grid.getStore().getRange()//.getModifiedRecords(); 
				if(records.length==0){
					Ext.Msg.alert('提示',"没有修改不能保存!");
					return;
				}
				var materialid = new Array();
				var declareId = declareAction.declareId;
				var declareDetailId = ""; 
				var quantity = new Array();
			    var use1 = new Array();
			    var useDate  = new Array(); 
			    var amount  = new Array();
			    var declareType  = new Array();
			    var materialCatalogName  = new Array(); 
			    var fileName = new Array();
			    var fileId  = new Array();
			    var reportType = new Array();
			    var remark=new Array();
			    var taskno=new Array();
				var contactPerson=new Array();
				var contactTelephone=new Array();
			    //循环判断每一行是否完全输入值了
			    for (i = 0; i < records.length; i++) {
						materialid.push(records[i].get("materialid"));
						if (typeof (records[i].get("quantity")) == 'undefined') {
							Ext.Msg.alert('提示', "请输入数量");
							return;
						}
						quantity.push(records[i].get("quantity"));
						if (typeof (records[i].get("use")) == 'undefined') {
							Ext.Msg.alert('提示', "请输入用途");
							return;
						}
						use1.push(records[i].get("use"));
						if (typeof (records[i].get("useDate")) == 'undefined') {
							Ext.Msg.alert('提示', "请输入使用时间");
							return;
						}
						useDate.push(records[i].get("useDate").dateFormat('Y-m-d'));
						if (typeof (records[i].get("amount")) == 'undefined') {
							Ext.Msg.alert('提示', "请输入金额");
							return;
						}
						amount.push(records[i].get("amount"));
						if (typeof (records[i].get("declareTypeName")) == 'undefined') {
							Ext.Msg.alert('提示', "请选择采购类型");
							return;
						}
						declareType.push(records[i].get("declareTypeName"));
						if (typeof (records[i].get("materialCatalogName")) == 'undefined') {
							Ext.Msg.alert('提示', "请选择物资类别");
							return;
						}
						materialCatalogName.push(records[i].get("materialCatalogName")); 
//						if (typeof (records[i].get("reportType")) == 'undefined'||records[i].get("reportType")=="") {
//							Ext.Msg.alert('提示', "请选择报告类型");
//							return;
//						}
//						reportType.push(records[i].get("reportType"));
						reportType.push("");
						//修改判断的方式 ---- 用字符串的长度来判断是否有上传文件.如果长度为0,那么则是初始状态(没有上传文件)
//						var fileNameLength = records[i].get("fileName").length;
//						// if(typeof(records[i].get("fileName"))=='undefined'){  //这是原始逻辑
//						if (fileNameLength == 0) {
//							Ext.Msg.alert('提示', "请您上传可行性/需求报告");
//							return;
//						}
//						fileName.push(records[i].get("fileName"));
//						fileId.push(records[i].get("fileId")); 
						fileName.push("");
						fileId.push(""); 
						remark.push(records[i].get("remark"));
						taskno.push(records[i].get("taskno"));
					    contactPerson.push(records[i].get("contactPerson"));
					    contactTelephone.push(records[i].get("contactTelephone"));
					}
			    	var remote = Seam.Component.getInstance("declareDetail_DeclareDetailRemote"); 
			    	remote.saveDeclareDetail(declareId, declareDetailId, materialid, quantity, use1, useDate, amount, declareType, materialCatalogName, fileName, 
						fileId,reportType,remark,taskno,contactPerson,contactTelephone,DeclarationMaterial.param1,DeclarationMaterial.param2, function(result){   
									if(declareAction.declareId==null){
										var purchaseRequestDeclareGridPanel = Ext.getCmp('PurchaseRequestDeclareGridPanel');						
										purchaseRequestDeclareGridPanel.store.load();
									}else{
										var grid = Ext.getCmp('declareDetailGridPanel');				
										grid.store.load();
									}
									window.close();
						}); 				 
		}
	}, {
		text : '取消',
		handler : function() { 
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "declareDetailForm",
		title : "新增申报记录详情",
		width : 800, 
		
	maximized :true,
		layout : 'fit',
		autoScroll : true, 
		modal : true,
		items : grid,
		autoDestory : true,
		closeAction :'close',
		buttons : buttons
	});
	return window;
}
declareDetailForm.reportTypeCombo=function(){
    var reportTypeStore = new Ext.data.SimpleStore({
		fields : [ 'id', 'flag' ],
		data : [ [ '可行性报告', '可行性报告' ], [ '需求报告', '需求报告' ], [ '申报依据', '申报依据']]
	});
	
    var mCNameCombo = new Ext.form.ComboBox({ 
		anchor : '95%',
		store : reportTypeStore,
		triggerAction : 'all',
		valueField : 'id',
		displayField : 'flag',
		editable : false,
		mode : 'local'
	});
	return mCNameCombo;
}
declareDetailForm.mCNameCombo=function(){
    var declareTypeStore = new Ext.data.SimpleStore({
		fields : [ 'id', 'flag' ],
		data : [ [ '计划内', '计划内' ], [ '应急', '应急' ], [ '非应急', '非应急']]
	});
	
    var mCNameCombo = new Ext.form.ComboBox({ 
		anchor : '95%',
		store : declareTypeStore,
		triggerAction : 'all',
		valueField : 'id',
		displayField : 'flag',
		editable : false,
		mode : 'local'
	});
	return mCNameCombo;
}
declareDetailForm.getDeclareTypeCombo=function(){
    var purchasedUseStore = new Ext.data.SimpleStore({
		fields : [ 'id', 'flag' ],
		data : [ ['批产用（备注机型）','批产用（备注机型）'], 
		         ['科研用（备注项目）', '科研用（备注项目）' ], 
		         ['生产准备', '生产准备' ],
		         ['办公耗材','办公耗材'],
		         ['生产补料','生产补料'],
		         ['备件（备注型号）','备件（备注型号）'],
		         ['试验用（备注机型或项目）','试验用（备注机型或项目）'],
		         ['工装用（备注具体项目）','工装用（备注具体项目）'],
		         ['典型试飞','典型试飞'],
		         ['技改大修','技改大修'],
		         ['日常管理（备注具体用途）','日常管理（备注具体用途）'],
		         ['其他','其他']]
	}); 
	var declareTypeCombo = new Ext.form.ComboBox({
 		anchor : '95%',
		store : purchasedUseStore,
		triggerAction : 'all', 
		valueField : 'id',
		displayField : 'flag',
		forceSelection : true,
		editable : false,
		mode : 'local' 
	});
	return declareTypeCombo;
}
declareDetailForm.getPurchasedUseCombo = function(){
	var mCNameStore = new Ext.data.SimpleStore( {
		fields : [ 'id', 'flag' ],
		data : [ [ '直接用料', '直接用料' ],
		         [ '航空成附件修理', '航空成附件修理' ],
		         [ '物流运输', '物流运输' ],
		         [ '土建', '土建' ],
		         [ '机电设备', '机电设备' ], 
		         [ '车辆', '车辆' ],
		         ['电脑或电脑附件','电脑或电脑附件'],
		         ['土建或设备大修','土建或设备大修'],
		         ['常用礼品','常用礼品'],
		         ['办公用品、耗材','办公用品、耗材'],
		         ['节能用品、能源用品','节能用品、能源用品'],
		         ['劳保用品','劳保用品'],
		         ['工装工具(货架类)','工装工具(货架类)'],
		         ['原煤','原煤'],
		         ['木材','木材'],
		         ['防暑药品、清凉饮料','防暑药品、清凉饮料'],
		         ['切削液、润滑液','切削液、润滑液'],
		         ['数字电视改造','数字电视改造'] ]
	});
	
	

	var purchasedUseCombo = new Ext.form.ComboBox({ 
		anchor : '95%',
		store : mCNameStore,
		triggerAction : 'all',
		valueField : 'id',
		displayField : 'flag',
		forceSelection : true,
		editable : false,
		mode : 'local' 
	});
	return purchasedUseCombo
}