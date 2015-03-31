var appraisalScoreForm = { 
};   
// 部门数据列表
appraisalScoreForm.deparmentGridPanel = function(vendorAppraisalId) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendorAppraisalRemote.getVendorAppraisalDepartmentGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'departmentId',
					totalProperty : 'totalProperty'
				}, [ 'departmentCode', 'departmentId', 'departmentName', 'phone',
					 'parent','appraisaleName','appraisaler','appraisalDetailId',
					 'appraisalScore','appraisalDate','loginId'])
			});
	var cm = new Ext.grid.ColumnModel( [
//			sm,
			rm,
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
			{
				header : '评分人 ',
				dataIndex : 'appraisaleName',
				width : 100,
				sortable : true
			},
//			{
//				header : '电话',
//				dataIndex : 'phone',
//				width : 100,
//				sortable : true
//			},
			{
				header : '评分',
				dataIndex : 'appraisalScore',
				width : 100,
				sortable : true,
				editor:{
					xtype:'numberfield' 
				}
			},
			{
				header : '评分时间',
				dataIndex : 'appraisalDate',
				width : 100,
				sortable : true
			},
			{
				 
				dataIndex : 'departmentId',
				hidden:true
			},
			{
				 
				dataIndex : 'appraisaler',
				hidden:true
			},
			{
				 
				dataIndex : 'appraisalDetailId',
				hidden:true
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
	var grid = new Ext.grid.EditorGridPanel({
				id : 'VendorAppraisalDepartmentGrid',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
//				width :600,
				height : 300,
				autoWidth  : true,
				columnLines : true,
				clicksToEdit:1, 
				loadMask : {
					msg : '数据加载中...'
				},
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				listeners:{   
	    	//单击    
				'cellclick'  : function( grid,rowIndex,columnIndex,e ) {  
							if(columnIndex==6){ 
		    	                var record = grid.getStore().getAt(rowIndex);  // Get the Record   
 								  if(record.get("loginId")!=record.get("appraisaler")){
								  	 Ext.Msg.alert('提示','只能评分人评分！');
								  	 return;
 								  } 
							}
				},
				//是否可编辑逻辑可以在grid的beforeedit事件中拦截判断 
"beforeedit": function(e){ 
/* 
                e = { 
                    grid: this, 
                    record: r, 
                    field: field, 
                    value: r.data[field], 
                    row: row, 
                    column: col, 
                    cancel:false 
                }; 
*/ 
   if(e.record.get('appraisalDate')!=""){ 
      return false; // 中止，不让编辑 
   } 
}
				},  
//				tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
	});  
	store.baseParams={start:0,limit:20,vendorAppraisalId:vendorAppraisalId,isExaminer:0};
	store.load();	
	return grid;
} 
appraisalScoreForm.getForm = function(rd,vendorAppraisalId) { 
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
		        					disabled : true,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '供应商编号',	
		        					xtype :'textfield',
		        					name : 'vendorCode', 
		        					allowBlank : false,
		        					disabled : true,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '规模',	
		        					xtype :'textfield',
		        					name : 'scale',  
		        					disabled : true,
		        					anchor : '95%'
		        				}/*,{
		        					fieldLabel : '平均分',	
		        					xtype :'textfield',
		        					name : 'appraisalScore',  
		        					disabled : true,
		        					anchor : '95%'
		        				}*/] 
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
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '供应商名称',	
	        					name : 'vendorName', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%'
	        				} ,{
		        					fieldLabel : '经营范围',	
		        					xtype :'textfield',
		        					name : 'businessScope',  
		        					disabled : true,
		        					anchor : '95%'
		        			}] 
               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'appraisalScoreForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		width : 700, 
		height : 415,
		frame : false,
		border : false,
		items : [items,appraisalScoreForm.deparmentGridPanel(vendorAppraisalId)],
		fileUpload : false,
		padding : 5 
	}); 

	if(rd!=null)
	inform.getForm().loadRecord(rd);
	var buttons = [ {
		text : '确定',
		hidden:rd.get('appraisalStatus')==0?false:true,
		handler : function() {
			if (inform.form.isValid()) {
				var departId = new Array(); 
				var appraisaler = new Array();
				var appraisalDetailId = new  Array();
				var appraisalScore = new Array();
				var records = Ext.getCmp("VendorAppraisalDepartmentGrid").getStore().getRange();
	            
				if(records==null || records.length==0){
					Ext.Msg.alert('提示','请评分！');
					return;
				}
				if(records[0].get("appraisalDate")!=null&&records[0].get("appraisalDate")!=""){
					Ext.Msg.alert("提示","只允许评分一次!")
					return;
				}
//				for(i=0;i<records.length;i++){ 
					if((records[0].get("appraisalScore")+"")==""){
						Ext.Msg.alert('提示','请评分！');
						return;
					}
					departId.push(records[0].get("departmentId"));
					appraisalScore.push(records[0].get("appraisalScore"));
					appraisaler.push(records[0].get("appraisaler")); 
					appraisalDetailId.push(records[0].get("appraisalDetailId"));
//				}
				var remote = Seam.Component.getInstance("vendorAppraisalRemote"); 
				var vendorID = inform.form.findField('vendorID').getRawValue();  
				var vendorAppraisalId = inform.form.findField('vendorAppraisalId').getRawValue();
				var appraisalNo = inform.form.findField('appraisalNo').getRawValue();
				var appraisalName = inform.form.findField('appraisalName').getRawValue();
				
				remote.savevendorAppraisal(vendorAppraisalId,appraisalNo,appraisalName,vendorID,  departId,appraisaler,appraisalDetailId,appraisalScore,null, function(result){
						Ext.Msg.alert('提示', '保存数据成功！');
						inform.getForm().reset();
						window.close();
						Ext.getCmp('venderAppraisalGridPanelId').store.baseParams={start:0,limit:20};
						Ext.getCmp('venderAppraisalGridPanelId').store.load();
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

	var window = new Ext.Window( {
		id : "appraisalScoreFormAddWind",
		width : 700, 
		layout : 'fit',
		autoScroll : true,
		title : '供应商评分',
		modal : true,
		items : [inform],
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 
