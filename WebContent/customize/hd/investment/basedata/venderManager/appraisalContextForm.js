var appraisalContextForm = { 
};   
appraisalContextForm.combo = function(){ 
	var combox = new Ext.form.ComboBox({
		id : 'appraisalStatus',
		name : 'appraisalStatus',
		fieldLabel : '状态',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '0', '未考核' ],[ '1', '合格' ],[ '2', '试供' ]]//,[ '3', '不合格' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%'
	})
	return combox;
}
// 部门数据列表
appraisalContextForm.deparmentGridPanel = function(vendorAppraisalId) {
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
				sortable : true 
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
//				tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
	});  
	store.baseParams={start:0,limit:20,vendorAppraisalId:vendorAppraisalId,isExaminer:1};
	store.load();	
	return grid;
} 
appraisalContextForm.getForm = function(rd,vendorAppraisalId) { 
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
		        				},appraisalContextForm.combo()] 
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
		        			},{
		        					fieldLabel : '修改意见',	
		        					xtype :'textfield',
		        					name : 'appraisalComment', 
		        					height : 50,
									allowBlank : true,
									maxLength : 150,
									maxLengthText : '最多可输入150个字，请重新输入！',
		        					anchor : '95%'
		        				} ] 
               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'appraisalContextForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		width : 700, 
		height : 400,
		frame : false,
		border : false,
		items : [items,appraisalContextForm.deparmentGridPanel(vendorAppraisalId)],
		fileUpload : false,
		padding : 5 
	}); 

	if(rd!=null)
	inform.getForm().loadRecord(rd);
	var buttons = [ {
		text : ' 确定 ',
		hidden:rd.get('appraisalStatus')==0?false:true,
		handler : function() {
			if(Ext.getCmp('appraisalStatus').getValue()==0){
				Ext.Msg.alert("提示","请修改考核状态!")
				return ;
			}
			if (inform.form.isValid()) { 
				var remote = Seam.Component.getInstance("vendorAppraisalRemote"); 
			 
				var vendorAppraisalId = inform.form.findField('vendorAppraisalId').getRawValue();
				var appraisalComment = inform.form.findField('appraisalComment').getRawValue();
				var appraisalStatus = inform.form.findField('appraisalStatus').getValue();
				remote.updatevendorAppraisal(vendorAppraisalId,appraisalComment,appraisalStatus, function(result){
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
		id : "appraisalContextFormAddWind",
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
