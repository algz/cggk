Ext.ns("hd.investment.purchaseRequest.declareDetail.grid");
/**
 * 采购申报明细Grid
 * @class hd.investment.purchaseRequest.declareDetail.grid.gridPanel
 * @extends Ext.grid.GridPanel
 */
hd.investment.purchaseRequest.declareDetail.grid.gridPanel = Ext.extend(Ext.grid.EditorGridPanel,{
	selectRow : null,
	selectObj : null,
	reloadvalue : function(ds,baseParams) {
		ds.baseParams = baseParams; // 分页时也能保持的参数
		ds.load();
    },
    sm : function(){
    	var self = this;
    	var sm = new Ext.grid.CheckboxSelectionModel();
    	sm.on('rowselect', function(sm, rowIndex, record) {
    		self.selectRow = record;
    	});
    	sm.on('selectionchange', function(sm, t) {
    		self.selectObj = sm.getSelections();
    		if(!sm.getSelections() || sm.getSelections().length<1){
    			self.selectRow = null;
    		}
    	});
    	return sm;
    },
    cm : function(){
    	var cm = new Ext.grid.ColumnModel({
    		defaults: {
    	        sortable: true,
    	        menuDisabled: true
    	    },
    		columns : [new Ext.grid.RowNumberer({
	    	        width : 35,
	    	        header : "序号"
	    	 	}),this.sm(),
	    	 	{
					header : '登记ID',
					dataIndex : 'declareDetailId',
					width : 100,
					sortable : true
				},
	    	 	{
					header : '物资名称',
					dataIndex : 'materialItemName',
					width : 100,
					sortable : true
				},{
					header : '规格型号',
					dataIndex : 'materialStandard',
					width : 100,
					sortable : true
				}, {
					header : "交货状态",
					dataIndex : 'deliveryStatus',
					width : 100,
					sortable : true
				}, {
					header : '物资类别',
					dataIndex : 'materialCatalogName',
					width : 100,
					sortable : true
				}, {
					header : '数量',
					dataIndex : 'quantity',
					width : 100,
					sortable : true/*,
					renderer:function(value, metaData, record, rowIndex, colIndex, store){
						var oldquantity=record.get('oldquantity');
						return oldquantity==""?value:value+'<='+oldquantity;
					}*/
				}, {
					header : '单位',
					dataIndex : 'demension',
					width : 100,
					sortable : true
				}, {
					header : '资金预算（单位：元）',
					dataIndex : 'amount',
					width : 120,
					sortable : true
				}, {
					header : '采购用途',
					dataIndex : 'use',
					width : 100,
					sortable : true
				},  {
					header : '采购类型',
					dataIndex : 'declareType',
					width : 100,
					sortable : true,
					renderer:function(value){
						// 申请记录类型，1计划内2应急3非应急
						if(value==1){
							return "计划内";
						}else if(value==2){
							return "应急";
						}else if(value==3){
							return "非应急";
						}else{
							return value;
						}
					}
				}, {
					header : '任务编号',
					dataIndex : 'taskno',
					width : 100,
					sortable : true
				}, {
					header : '使用时间',
					dataIndex : 'useDate',
					width : 100,
					sortable : true
				}, {
					header : '状态',
					dataIndex : 'declareDetailStatus',
					width : 100,
					sortable : true,
					renderer:function(value){
						//0未提交，1已提交，2未通过，3通过，5变更
						Ext.getCmp('change').enable();
						if(privilegeValidate.changeDdDisable){
							Ext.getCmp('change').disable();
						}
						if(value==0){
							Ext.getCmp('change').disable();
							return "未提交";
						}else if(value==1){
							return "已提交";
						}else if(value==2){
							return "未通过";
						}else if(value==3){
							return "通过";
						}else if(value==5){
							return "变更";
						}else{
							return value;
						}
					}
				},{
					header : '发放数量',
					dataIndex : ' ',
					width : 100,
					sortable : true,
					renderer:function(value,cellmeta,record,rowIndex){
						return "<a href='javascript:void(0);' onclick=showOut_Num('"+record.get('declareDetailId')+"') style='color:blue;'>查看</a>";
					}
				},{
					header : '变更前数量',
					dataIndex : 'oldquantity',
					width : 100,
					sortable : true
				}, {
					header : '变更人',
					dataIndex : 'changer',
					width : 100,
					sortable : true
				}, {
					header : '变更时间',
					dataIndex : 'changeTime',
					width : 100,
					sortable : true
				}, {
					header : '变更原因',
					dataIndex : 'changeReson',
					width : 100,
					sortable : true
				}
				
				/*, {
					header : '报告类型',
					dataIndex : 'reportType',
					width : 100,
					sortable : true
				}, {
					header : '报告文件',
					dataIndex : 'fileName',
					width : 180,
					sortable : true,
					renderer : function(value, cellmeta, record,
						rowIndex) {
						var ID = record.get("fileId");
						var ORIGINALNAME = record.get("fileName");
						value = "&nbsp;<font color=blue>" + value
								+ "</font>";
						return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
								+ ID
								+ "&ORIGINALNAME="
								+ encodeURI(encodeURI(ORIGINALNAME))
								+ "' cursor：hand>" + value + "</a>";
			   		}
				}/*, {
					header : '未通过原因',
					dataIndex : 'reason',
					width : 100,
					sortable : true
				}*/
	        ]
	    });	    
	    return cm;
    },
    tb : function(){
    	var items = ['-', {    		
    		text : '新建',
    		iconCls : 'add1',
    		id : 'add',
    		handler : function() {
    			
    			win = new hd.investment.purchaseRequest.declareDetail.win.window({
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
				}}}
    			});
	win.show();
//					var win=Ext.getCmp('addDeclarationMaterial');
//					if(win==null){
//						win=new declarationMaterial.materialWin({title:'新增记录详情',id:'addDeclarationMaterial'});
//					}
					
//					win = new hd.investment.purchaseRequest.declareDetail.win.window({title : '新增记录详情'});
//					win.show();
    			//declareDetailAction.add();
    		}
    	},'-', {    		
    		text : '修改',
    		iconCls : 'edit1',
    		id : 'update',
    		handler : function() {
    			declareDetailAction.update();
    		}
    	},'-', {    		
    		text : '删除',
    		iconCls : 'del1',
    		id : 'del',
    		handler : function() {
    			
    			declareDetailAction.remove();
    		}
    	},'-', {    		
    		text : '变更',
    		iconCls : 'edit1',
    		id : 'change',
    		handler : function() {
    			var grid=Ext.getCmp('declareDetailGridPanel');
    			if(grid.getSelectionModel().getCount()!=1){
    				return Ext.Msg.alert('提示','请选择一条数据!');
    			}
    			var rec=grid.getSelectionModel().getSelected();
    			
    			var win = Ext.getCmp('dataChanger');
    			if(win==null){
    			win=new Ext.Window({
    				        id:'dataChanger',
							title : '数据变更',
							width : 260,
							autoHeight : true,
							items : [{
										xtype : 'form',
										border : false,
										labelWidth : 60,
										items : [{
													xtype : 'textfield',
													fieldLabel : '原数据',
													readOnly:true,
													value : rec.get('quantity')//rec.get('oldquantity')==""?rec.get('quantity'):rec.get('oldquantity')
												}, {
													id:'oldquantity_new',
													xtype : 'textfield',
													fieldLabel : '新数据'//,
//													value:rec.get('oldquantity')==""?"":rec.get('quantity')
												}, {
													id:'changerReson_new',
													xtype : 'textfield',
													fieldLabel : '变更原因',
													value:rec.get('changeReson')
												}]
									}],
							buttons : [{
								text : '确定',
								handler : function() {
									if(rec.get('quantity')<=Ext.getCmp('oldquantity_new').getValue()){
										Ext.Msg.alert("提示","新数据不能大于或等于原数据!");
										return false;
									}else{
									Ext.Ajax.request({
										url : '../JSON/declareDetail_DeclareDetailRemote.updateDeclareDetail?d='
												+ new Date(),
										method : 'POST',
										params : {
											declareDetailId:rec.get('declareDetailId'),
											quantity : Ext.getCmp('oldquantity_new').getValue(),
											changeReson:Ext.getCmp('changerReson_new').getValue()
										},
										success : function(response, options) {
											var obj = Ext.util.JSON.decode(response.responseText);
											grid.store.load();
											
										},
										failure : function() {
											Ext.Msg.alert('提示', "服务器正忙");
										}
									});
									win.close()
									}
								}
							}, {
								text : '取消',
								handler : function() {
									win.close();
								}
							}]

						});
    			}
						win.show();
					}
    	},'-', {    		
    		text : '返回',
    		iconCls : 'icon-importTasks',
    		handler : function() {
    			declareAction.declareId = null;  
    				Ext.getCmp('declareOnReadyPanel').getLayout().setActiveItem(0);
    			var grid = Ext.getCmp('PurchaseRequestDeclareGridPanel');
    			grid.store.load();
    		}
    	}];
    	return items;
    },
	getStore : function(){
	   var proxy = new Ext.data.HttpProxy({
		   	url : '../JSON/declareDetail_DeclareDetailRemote.getGridData?d='+new Date(),//采购申报明细新增/修改
	        method : "POST"
	    });
		var reader = new Ext.data.JsonReader({
		    root: 'results',
		    totalProperty: 'totalProperty',
		    id : 'declareDetailId'
		}, ['declareDetailId','materialid','materialitemcode','declareId','materialItemName','technicCondition','demension',
		    'materialStandard','materialCatalogName','quantity','useDate','use','amount','declareType','declareDetailStatus',
		    'fileName','reason','fileId','reportType','taskno','remark','contactPerson','contactTelephone',
		    'oldquantity','changer','changeTime','changeReson','referencePrice','deliveryStatus'
	        ]);
		 
		var myStore = new Ext.data.Store({
			proxy : proxy,
		    reader: reader
		});
        return myStore;
	},
	initComponent : function() {
        var self = this;
        if(self.config){
            Ext.apply(this,self.config);
        } else {
           self.store = self.getStore();	
           var config={
        		title : '采购申报明细',
        		id : 'declareDetailGridPanel1',
				store : self.store, // 绑定数据源
				trackMouseOver : true, // 鼠标放到行上是否有痕迹
				loadMask : {
					msg : '正在装载数据...'
				},
				sm : self.sm(),
				cm : self.cm(),  
				viewConfig : {
					enableRowBody : true,
					showPreview : true
				},
				stripeRows : true, // 相邻行的颜色是否有差别
				bbar : new Ext.PagingToolbar({ // 定义下方工作面板
					pageSize : 20,
					store : self.store,
					displayInfo : true,
					displayMsg : '当前行数{0} - {1} 共 {2} 行',
					emptyMsg : "未查询到数据"
				}),
				tbar : self.tb()

			}
			Ext.apply(this,config);
        }
//        self.addListener('cellclick',cellclick);
//		
//		function cellclick(self, rowIndex, columnIndex, e) { 
//				 var records = self.selectObj;
//				 if(records.length>1){
//				 	Ext.getCmp("update").disable();
//				 }else
//				 	Ext.getCmp("update").enable();
//		}
        hd.investment.purchaseRequest.declareDetail.grid.gridPanel.superclass.initComponent.call(this);
    }
    
});
Ext.reg("hd.investment.purchaseRequest.declareDetail.grid.gridPanel",
		hd.investment.purchaseRequest.declareDetail.grid.gridPanel);

		
//*********************************
Ext.ns("DeclarationMaterial");
/**
 * 申报物资列表
 * @class DeclarationMaterial.gridPanel
 * @extends Ext.grid.GridPanel
 */
DeclarationMaterial.gridPanel = Ext.extend(Ext.grid.GridPanel,{
	selectRow : null,
	selectObj : null,
	reloadvalue : function(ds,baseParams) {
		ds.baseParams = baseParams; // 分页时也能保持的参数
		ds.load();
    },
    sm : function(){
    	var self = this;
    	var sm = new Ext.grid.CheckboxSelectionModel();
    	sm.on('rowselect', function(sm, rowIndex, record) {
    		self.selectRow = record;
    	});
    	sm.on('selectionchange', function(sm, t) {
    		self.selectObj = sm.getSelections();
    		if(!sm.getSelections() || sm.getSelections().length<1){
    			self.selectRow = null;
    		}
    	});
    	return sm;
    },
    cm : function(){
    	var cm = new Ext.grid.ColumnModel({
    		defaults: {
    	        sortable: true,
    	        menuDisabled: true
    	    },
    		columns : [new Ext.grid.RowNumberer({
	    	        width : 35,
	    	        header : "序号"
	    	 	}),this.sm(),
	    	 	{
					header : '物资名称',
					dataIndex : 'materialItemName',
					width : 100,
					sortable : true
				},{
					header : '规格型号',
					dataIndex : 'materialStandard',
					width : 100,
					sortable : true
				},{
					header : '数量',
					dataIndex : 'quantity',
					width : 100,
					sortable : true
				}, {
					header : '单位',
					dataIndex : 'demension',
					width : 100,
					sortable : true
				}, {
					header : '资金预算（单位：元）',
					dataIndex : 'amount',
					width : 120,
					sortable : true
				}
	        ]
	    });	    
	    return cm;
    },
    tb : function(){
    	var items = ['-', {    		
    		text : '返回',
    		iconCls : 'icon-importTasks',
    		handler : function() {
    			declareAction.declareId = null;  
    				Ext.getCmp('declareOnReadyPanel').getLayout().setActiveItem(0);
    			var grid = Ext.getCmp('PurchaseRequestDeclareGridPanel');
    			grid.store.load();
    		}
    	}];
    	return items;
    },
	getStore : function(){
	   var proxy = new Ext.data.HttpProxy({
		   	url : '../JSON/declareDetail_DeclareDetailRemote.getGridData?d='+new Date(),
	        method : "POST"
	    });
		var reader = new Ext.data.JsonReader({
		    root: 'results',
		    totalProperty: 'totalProperty',
		    id : 'declareDetailId'
		}, ['declareDetailId','materialid','declareId','materialItemName','technicCondition','demension',
		    'materialStandard','materialCatalogName','quantity','useDate','use','amount','declareType',
		    'fileName','reason','fileId','reportType','referencePrice'
	        ]);
		 
		var myStore = new Ext.data.Store({
			proxy : proxy,
		    reader: reader
		});
        return myStore;
	},
	initComponent : function() {
        var self = this;
        if(self.config){
            Ext.apply(this,self.config);
        } else {
           self.store = self.getStore();	
           var config={
        		title : '申报物资',
				store : self.store, // 绑定数据源
				trackMouseOver : true, // 鼠标放到行上是否有痕迹
				loadMask : {
					msg : '正在装载数据...'
				},
				sm : self.sm(),
				cm : self.cm(),  
				viewConfig : {
					enableRowBody : true,
					showPreview : true
				},
				stripeRows : true, // 相邻行的颜色是否有差别
				bbar : new Ext.PagingToolbar({ // 定义下方工作面板
					pageSize : 20,
					store : self.store,
					displayInfo : true,
					displayMsg : '当前行数{0} - {1} 共 {2} 行',
					emptyMsg : "未查询到数据"
				}),
				tbar : self.tb()
			}
			Ext.apply(this,config);
        }
        DeclarationMaterial.gridPanel.superclass.initComponent.call(this);
    }
});
Ext.reg("DeclarationMaterial.gridPanel",DeclarationMaterial.gridPanel);

/**
 * 显示发放数量
 * @param {} declareDetailId
 */
function showOut_Num(declareDetailId){
		var cm = new Ext.grid.ColumnModel( [
		    new Ext.grid.RowNumberer({width:30,header:'序号'}),
			{
					header : '发放日期',
					dataIndex : 'CREATION_DATE',
					width : 80,
					sortable : true
				},{
					header : '发放数量',
					dataIndex : 'OUT_QTY',
					width : 80,
					sortable : true
				}]);
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/declareDetail_DeclareDetailRemote.getOut_Num?d='+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					totalProperty : 'totalProperty'
				}, ['CREATION_DATE','OUT_QTY'
			        ])
			});

	var grid = new Ext.grid.GridPanel({
				cm : cm,
				store : store,
				autoScroll : true,
				height : 370,
				autoWidth  : true,
				columnLines : true,
				clicksToEdit:1, 
				loadMask :true,
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				}, 
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
						})
	});
	var win= new Ext.Window({
		width : 350,
		height:'300',
		layout : 'fit',
		autoScroll : true,
		title : '物资发放列表',
		items : grid,
		border : true,
		buttons : [{
		text : '关闭',
		handler : function() { 
			win.close();
		}
	} ]
	});
	
	grid.store.baseParams={start:0,limit:20,declareDetailId:declareDetailId}
	grid.store.load();
	win.show();
	
}
		