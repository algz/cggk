//招标评审
var tenderAppraForm= {
		
};

tenderAppraForm.getForm = function(tenderId,procurementPlanDetilName,tenderFileType,tenderFileCode,selectedDepartment,
syndic,plenipotentiary,createdate,fileName,fileId,tenderFileId,status,amount){

	var buttons = [ {
		text : ' 保存 ',
		id : 'save',
		handler : function() {

			if (tenderFileForm.form.isValid()) {
				tenderFileForm.form.doAction('submit', {
					waitMsg : '正在保存数据，请稍候...',
					waitTitle : '提示',
					url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
					method : 'post',
					success : function(form, action) {//在这处理逻辑。
					
						Ext.Ajax
								.request( {
									url : '../JSON/tenderFileRemote.saveTenderFile?d=' + new Date(),
									method : 'POST',
									params : {
										fileId : action.result.fileId!=""?action.result.fileId:fileId,
										fileName : action.result.fileName!=""?action.result.fileName:fileName,
										tenderFileCode : tenderFileForm.form.findField('tenderFileCode').getRawValue(), 
										plenipotentiary : tenderFileForm.form.findField('plenipotentiary').getRawValue(),
										createdate : tenderFileForm.form.findField('createdate').getRawValue(),
										tenderId:tenderId,
										tenderFileType:tenderFileType,
										selecteddepartment:tenderFileForm.form.findField('selectedDepartment').getRawValue(),
										syndic:tenderFileForm.form.findField('syndic').getRawValue(),
										procurementplanDetilName : procurementPlanDetilName,//招标项目
										amount:tenderFileForm.form.findField('amount').getRawValue(),
										tenderFileId:tenderFileId//主键
										
									},
									success : function() {
										Ext.example.msg('提示','保存数据成功！');
										window.close();
									},
									failure : function() {
										Ext.Msg.alert('提示',action.result);
									}
								});
					},
					failure : function(form, action) {
						Ext.Msg.alert('提示',action.result);
					}
				
				})
			}

		
		}

	}, 
//	{
//		text : '导出',
//		disabled : true,
//		handler : function() {
//			
//		}
//	},
	{

		text : ' 送审',
		id : 'send',
		handler : function() {
			tenderFileAction.submitTenderFile('442752','标书评审',tenderFileId+tenderFileType);
		}
	}, 
//	{
//		text : '打印',
//		disabled : true,
//		handler : function() {
//			
//		}
//	} ,
	{
		text : ' 返回 ',
		handler : function() {
			window.close();
		}
	} ];;


	var item = [
	{
		layout : 'column',
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
				columnWidth : .49,
				width : 750,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '编号',
					xtype : 'textfield',
					name : 'tenderFileCode',
					anchor : '90%',
					value : tenderFileCode,
					disabled : true
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '招标项目',
					xtype : 'textfield',
					name : 'procurementPlanDetilName',
					value:procurementPlanDetilName,
					anchor : '90%',
					disabled : true
				} ]
		}]
	},{

		layout : 'column',
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
				columnWidth : .49,
				width : 750,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '中标单位',
					xtype : 'textfield',
					id : 'selectedDepartment',
					name : 'selectedDepartment',
					anchor : '90%',
					value : selectedDepartment,
					allowBlank : false,
					listeners : {
						    focus : function(field){
						    	 if(tenderFileId!="" && status!=1){}
						    	 else
									tenderAppraForm.getVendor('tenderAppraForm').show(); 
						}
					}
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '选评审人员',
					xtype : 'textfield',
					name : 'syndic',
					allowBlank : false,
					anchor : '90%',
					value : syndic
				} ]
		}]
	
	},{

		layout : 'column',
		width : 750,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '全权代表',
				xtype : 'textfield',
				name : 'plenipotentiary',
				anchor : '90%',
				allowBlank : false,
				value : plenipotentiary
			} ]
		},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				xtype : "datefield",
				fieldLabel : '时间',
				name:'createdate',
				lableWidth : 150,
				format : 'Y-m-d',
				allowBlank : false,
				editable : false,
				anchor : '90%',
				value : createdate}
			 ]
	}]
	
	},{

		layout : 'column',
		width : 750,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '上传文件', 
					id : 'form-file',
					anchor : '90%',
					xtype:'fileuploadfield', 
					name : 'fileName',  
		            buttonText:'浏览...',
		            allowBlank:false,
		            blankText:'请上传文件！',
		            value : fileName
			} ]
		},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				xtype : "numberfield",
				fieldLabel : '金额(单位:元)',
				name:'amount',
				anchor : '90%',
				allowBlank : false,
				allowDecimals :true,//是否允许输入小数   
	    		decimalPrecision :3,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义 
			     
				value : amount}
			 ]
	}]
	
	},{name:'fileId',value:fileId,hidden:true}];

	
	//表单
	var tenderFileForm = new Ext.form.FormPanel({
		padding : 5,
		id : 'tenderAppraForm',
		buttonAlign:'center',
		fileUpload : true,
		layout : 'column',
		autoScroll : true,
		width : 750,
	    autoHeight:true,
		items : [item]
	});
	var window = new Ext.Window( {
		buttons : buttons,
	    layout : 'fit',
	    width : 750,
	    autoHeight:true,
	    buttonAlign:'center',
		autoScroll : true,
		title : '招标评审',
		modal : true,
		items : tenderFileForm,
		border : true
	});
	  if(tenderFileId=="" || status!=1)
	  { 
	  	 Ext.getCmp("send").disable();
	  }
	  if(tenderFileId!="" && status!=1){
	  	 Ext.getCmp("save").disable();
	  }
	return window;

}
/*
 * 获取供应商列表
  */
tenderAppraForm.getVendor = function(formName){ 
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
					 'scale','trial_status','createrName','create_date','remark'])
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
			},
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 300	,
				sortable : true			
			} ]);
 
	var tbar = [ '-', {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			tenderAppraForm.getSearchForm().show();
		}
	}];
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
	      tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
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
			Ext.getCmp(formName).form.findField("selectedDepartment").setValue(records[0].get("vendorName"));
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
tenderAppraForm.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var vendorCode = Ext.getCmp("vendorCode").getValue();
			var vendorName = Ext.getCmp("vendorName").getValue();
			var scale = Ext.getCmp("scale").getValue();
			var businessScope = Ext.getCmp("businessScope").getValue(); 
			var grid = Ext.getCmp('venderRegisterGridPanelId'); 
				grid.store.baseParams={start:0,limit:20,pageType:'1',vendorCode:vendorCode,vendorName:vendorName,scale:scale,businessScope:businessScope};
				grid.store.load();
		 
			venderRegisterQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			venderRegisterQuerySearchForm.getForm().reset();
			window.close();
		}
	} ];;

	var item = [
	{
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
				items : [ {
					fieldLabel : '供应商编号',
					xtype : 'textfield',
					id : 'vendorCode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '供应商名称',
					xtype : 'textfield',
					id : 'vendorName',
					anchor : '90%'
				} ]
		}]
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '规模',
				xtype : 'textfield',
				id : 'scale',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : 'textfield',
			fieldLabel : '经营范围',
			lableWidth : 150, 
			id : 'businessScope',
			anchor : '90%'}
		 ]
	}]
	
	}];

	
	//表单
	var venderRegisterQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "venderRegisterQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : venderRegisterQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}


