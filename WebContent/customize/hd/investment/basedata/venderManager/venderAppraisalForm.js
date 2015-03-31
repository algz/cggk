var venderAppraisalForm = { 
};  
/*
 * 获取供应商列表
  */
venderAppraisalForm.getVendor = function(){ 
			var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendor_VendorRemote.getVendorAppraisalGridData?d='
							+ new Date()+'&selectStatus='+1,
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'businessScope',
					 'scale','trial_status','createrName','create_date','remark',{name:'recentEvaluationDate',type:'date',dateFormat:'Y-m-d'}])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '供应商编号 ',
				dataIndex : 'vendorCode',
				width : 100
			},			
			{
				header : '供应商名称',
				dataIndex : 'vendorName',
				sortable : true
			},
			{
				header : '规模 ',
				dataIndex : 'scale',
				width : 100,
				sortable : true
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},{
				header : '最近考核时间',
				dataIndex : 'recentEvaluationDate',
				renderer:Ext.util.Format.dateRenderer("Y-m-d"),
				sortable : true			
			},
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 300	,
				sortable : true			
			} ]);
	var tbar = [ '-', {
		text : '送审',
		iconCls : 'Send',
		handler : function() {
			venderRegisterAction.send();
		}
	},'-', {
		text : '查询',
		iconCls : 'Send',
		handler : function() {
			venderRegisterAction.seach();
		}
	}  ]; 
	var grid = new Ext.grid.GridPanel({
	     store : store,
	     cm : cm,
	     sm : sm,
	     autoScroll : true,
	     height : 400,
	     id : "venderRegisterGridPanelId",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     } ,
	     bbar : new Ext.PagingToolbar({ // 定义下方工作面板
					pageSize : 20,
					store : store,
					displayInfo : true,
					displayMsg : '当前行数{0} - {1} 共 {2} 行',
					emptyMsg : "未查询到数据"
				})
	}); 
	store.baseParams = {start:0,limit:20};
	store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("venderRegisterGridPanelId").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择供应商信息！');
				return ;
			}  
			Ext.getCmp("venderAppraisalForm").getForm().loadRecord(records[0]);
			window1.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window1.close();
		}
	} ]
	var window1 = new Ext.Window( {
		id : "venderRegisterGridWind",
		width : 700,
		layout : 'fit',
		autoScroll : true,
		title : '供应商列表',
		modal : true,
		items : grid,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window1;
}  
// 通过部门获取用户数据列表
venderAppraisalForm.userGridPanel = function(departmentId,rowIndex) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendorAppraisalRemote.getUserGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'departmentId',
					totalProperty : 'totalProperty'
				}, [ 'appraisaler', 'appraisaleName'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '用户编号 ',
				dataIndex : 'appraisaler',
				width : 100
			},			
			{
				header : '用户名称',
				dataIndex : 'appraisaleName',
				sortable : true
			}]);
	var tbar = [ '-', {
		text : '送审',
		iconCls : 'Send',
		handler : function() {
			venderRegisterAction.send();
		}
	},'-', {
		text : '查询',
		iconCls : 'Send',
		handler : function() {
			venderRegisterAction.seach();
		}
	}  ];
 
	var grid = new Ext.grid.GridPanel({
	     store : store,
	     cm : cm,
	     sm : sm,
	     autoScroll : true,
	     height : 350,
	     id : "userGridPanel",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     } 
	}); 
	store.baseParams={start:0,limit:20,appraisalDeptId:departmentId};
	store.load();	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var record = Ext.getCmp("userGridPanel").getSelectionModel().getSelections();
			if(record==null || record.length==0){
				Ext.Msg.alert('提示','请选择评分人信息！');
				return ;
			}   
			var records = Ext.getCmp('deparmentGrid').getSelectionModel().getSelections();
			records[0].set('appraisaler',record[0].get("appraisaler"));
			records[0].set('appraisaleName',record[0].get("appraisaleName")); 
			window2.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window2.close();
		}
	} ]
	var window2 = new Ext.Window( {
		id : "userGridWind",
		width : 400,
		layout : 'fit',
		autoScroll : true,
		title : '评分人列表',
		modal : true,
		items : grid,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window2;
}
venderAppraisalForm.getForm = function(rd) { 
	var items = [
	              {
	            	layout : 'column',
	    			border : false,
	    			defaults : {
	    				border : false,
	    				labelWidth : 110,
	    				columnWidth : 1			
	    		    }, 
	               items : [{
	                    	columnWidth : .5,
	        				border : false,
	        				layout : 'form',
	        				items : [{name:'vendorID',	xtype : 'hidden'},{name:'vendorAppraisalId',xtype : 'hidden'},
	        				     {
		        					fieldLabel : '考核编号',	
		        					xtype :'textfield',
		        					name : 'appraisalNo', 
		        					allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '供应商编号',	
		        					xtype :'textfield',
		        					name : 'vendorCode', 
		        					allowBlank : false,
		        					anchor : '95%',
		        					listeners : {
										focus : function(field){
											venderAppraisalForm.getVendor().show(); 
										}
									}
		        				}] 
	               	},{
                    	columnWidth : .5,
        				border : false,
        				layout : 'form',
        				items : [
        				    {
	        					fieldLabel : '考核名称',	
	        					xtype :'textfield', 
	        					name : 'appraisalName', 
	        					allowBlank : false,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '供应商名称',	
	        					name : 'vendorName', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%'
	        				}] 
               	}
	               ]
	              }];
//	var rm = new Ext.grid.RowNumberer();
//	var sm = new Ext.grid.CheckboxSelectionModel();
//	var store = new Ext.data.Store(
//			{
//				proxy : new Ext.data.HttpProxy( {
//					url : '../JSON/vendorAppraisalRemote.getDepartmentGridData?d='
//							+ new Date(),
//					method : 'post'
//				}),
//				reader : new Ext.data.JsonReader( {
//					root : 'results',
//					id : 'departmentId',
//					totalProperty : 'totalProperty'
//				}, [ 'departmentCode', 'departmentId', 'departmentName', 'phone',
//					 'parent','appraisaleName','appraisaler','appraisalDetailId'])
//			});
//	var cm = new Ext.grid.ColumnModel( [
//			sm,
//			rm,
//			{
//				header : '单位编号 ',
//				dataIndex : 'departmentCode',
//				width : 100
//			},			
//			{
//				header : '单位名称',
//				dataIndex : 'departmentName',
//				sortable : true
//			},
//			{
//				header : '上级部门 ',
//				dataIndex : 'parent',
//				width : 100,
//				sortable : true
//			},
//			{
//				header : '电话',
//				dataIndex : 'phone',
//				width : 100,
//				sortable : true
//			},
//			{
//				header : '评分人',
//				dataIndex : 'appraisaleName',
//				width : 100,
//				sortable : true, 
//				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
//				store) { 
//					var value = record.get("appraisaleName");   
//					if(value=="")
//					   value = "请选择评分人";
//					var departmentId = record.get("departmentId");   
//					return "<a href=javascript:void(0); onclick=javascript:venderAppraisalAction.showUser('"+departmentId+"','"+rowIndex+"'); ><font color=blue>"+value+"</font></a>"; 
//				}
//			},
//			{
//				header : '意见报告书填写人',
//				dataIndex : 'appraisaleName',
//				width : 100,
//				sortable : true, 
//				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
//				store) { 
//					var value = record.get("appraisaleName");   
//					if(value=="")
//					   value = "请选择评分人";
//					var departmentId = record.get("departmentId");   
//					return "<a href=javascript:void(0); onclick=javascript:venderAppraisalAction.showUser('"+departmentId+"','"+rowIndex+"'); ><font color=blue>"+value+"</font></a>"; 
//				}
//			} ,{ 
//				dataIndex : 'appraisaler', 
//				hidden : true
//			} ,{
//			    dataIndex : 'appraisalDetailId', 
//			    hidden : true
//			}]);
//	var tbar = [ '-', {
//		text : '送审',
//		iconCls : 'Send',
//		handler : function() {
//			venderRegisterAction.send();
//		}
//	},'-', {
//		text : '查询',
//		iconCls : 'Send',
//		handler : function() {
//			venderRegisterAction.seach();
//		}
//	}  ];
//	var grid = new Ext.grid.GridPanel({
//	     store : store,
//	     cm : cm,
//	     sm : sm,
//	     autoScroll : true,
//	     height : 300,
//	     id : "deparmentGrid",
//	     loadMask : {
//	      msg : '正在加载数据,请稍后...'
//	     } 
//	});
//	store.baseParams={start:0,limit:20};
//	store.load();	
	var inform = new Ext.FormPanel( {
		id : 'venderAppraisalForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		frame : false,
		border : false,
		width : 600, 
//		height : 370,
//		items : [items,grid],
		//-------------新的添加评分人和报表人
		height : 80,
		items : [items],
		region:'north',
		//-------------新的添加评分人和报表人
		fileUpload : false,
		padding : 5 
	}); 

	if(rd!=null)
	inform.getForm().loadRecord(rd);
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			if (inform.form.isValid()) {
				var departId = new Array();
				var appraisaleName = new Array();
				var appraisaler = new Array();
				var appraisalDetailId = new  Array();
//				var records = Ext.getCmp("deparmentGrid").getSelectionModel().getSelections();
				var records=Ext.getCmp('pingFenGrid').getStore().getRange();
				if(records==null || records.length==0){
					Ext.Msg.alert('提示','请选择评分人信息！');
					return;
				}
				for(i=0;i<records.length;i++){
//					if(records[i].get("appraisaleName")==null || records[i].get("appraisaleName")==""){
//							Ext.Msg.alert('提示','请选择评分人！');
//							return;
//					}
					departId.push(records[i].get("departmentId"));//评分部门ID
					appraisaler.push(records[i].get("userid"));//评分人ID
//					appraisaler.push(records[i].get("appraisaler"));
					appraisaleName.push(records[i].get("appraisaleName"));
					appraisalDetailId.push(records[i].get("appraisalDetailId"));
				}

				records=Ext.getCmp('yiJianGrid').getStore().getRange();
				if(records==null || records.length==0){
					Ext.Msg.alert('提示','请选择意见报告人信息！');
					return;
				}
				var examiner=records[0].get("userid");//意见报告人	
				
				var remote = Seam.Component.getInstance("vendorAppraisalRemote"); 
				var vendorID = inform.form.findField('vendorID').getRawValue();  
				var vendorAppraisalId = inform.form.findField('vendorAppraisalId').getRawValue();
				var appraisalNo = inform.form.findField('appraisalNo').getRawValue();
				var appraisalName = inform.form.findField('appraisalName').getRawValue();
				
				remote.savevendorAppraisal(vendorAppraisalId,appraisalNo,appraisalName,vendorID,  departId,appraisaler,appraisalDetailId,null,examiner, function(result){
						Ext.Msg.alert('提示', '保存数据成功！');
						try{
							inform.getForm().reset();
							window.close();
							Ext.getCmp('venderAppraisalGridPanelId').store.baseParams={start:0,limit:20};
							Ext.getCmp('venderAppraisalGridPanelId').store.load();
						}catch(UnkonwnException){
				
						}
				}); 
			}

		}
	}, {
		text : '取消',
		handler : function() {
		  inform.getForm().reset();
		  window.close();
			 
		}
	} ]
	
	//新的添加评分人和报表人
	var panel = new Ext.Panel({
		layout:'border',
		height:300,
		width:600,
		items:[inform,selectUserPanel.init()]
	})

	var window = new Ext.Window( {
		id : "venderAppraisalFormAddWind",
		width : 600, 
		layout : 'fit',
		autoScroll : true,
		title : '创建考核表',
		modal : true,
//		items : inform,
		//新的添加评分人和报表人
		items : panel,
		//-------------
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 
