var createRegistrationForm = {
	contractId : null,
	record : null
}; 
createRegistrationForm.combo = function(columnName,fieldName){ 
	var combox = new Ext.form.ComboBox({ 
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '否', '否' ],[ '是', '是' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		name:columnName,
		fieldLabel:fieldName,
		value : '否'
	})
	return combox;
};
registrationForm.combo1 = function(){ 
	var combox = new Ext.form.ComboBox({
		hiddenName : 'qualifyNo',
		fieldLabel : '合格证',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '合格', '合格' ],[ '不合格', '不合格' ],[ '未出', '未出' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : '合格'
	})
	return combox;
}
/*
 * 获取物资列表列表
  */
createRegistrationForm.getMaterial = function(){ 
		var rm = new Ext.grid.RowNumberer();
		var sm = new Ext.grid.CheckboxSelectionModel({
		    singleSelect : true
		});
		var store = new Ext.data.Store(
				{
					proxy : new Ext.data.HttpProxy( {
							url : '../JSON/material_MaterialRemote.getAll?d='+new Date(),
						method : 'POST'
					}),
					reader : new Ext.data.JsonReader( {
						root : 'results',
						id : 'materialid',
						totalProperty : 'totalProperty'
					},['materialid', 'materialItemName', 'desingnation',
						'materialStandard', 'demension', 'referencePrice',
						'technicCondition', 'warningValue', 'preservePeriod',
						'remarks','materialitemcode','fileId','fileName'
				        ])
				}); 
		var cm = new Ext.grid.ColumnModel( [
				sm,
				rm,{
				header : '物资编码',
				dataIndex : 'materialitemcode',
				width : 100,
				sortable : true
			},
				{
				header : '物资名称',
				dataIndex : 'materialItemName',
				width : 100,
				sortable : true
			}, {
				header : '物资牌号',
				dataIndex : 'desingnation',
				width : 100,
				sortable : true
			}, {
				header : '物资规格',
				dataIndex : 'materialStandard',
				width : 100,
				sortable : true
			}, {
	    			header : '技术条件',
	    			dataIndex : 'technicCondition',
	    			width : 100,
	    			sortable : true
	    	}, {
				header : '量纲',
				dataIndex : 'demension',
				width : 100,
				sortable : true
			}]);
		 var toolbar = [ '-',
					{text:'查询',
					 iconCls : 'search1',
					 handler:function(){
						materialSearchForm.getSearchForm().show();
					}}
	 ];
	var grid = new Ext.grid.GridPanel({
				id : 'MaterialGridPanelId', 
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
				height : 300,
				autoWidth  : true,
				columnLines : true, 
				loadMask : {
					msg : '数据加载中...'
				},
				 tbar:toolbar,
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
		store.baseParams={start:0,limit:20}
		store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("MaterialGridPanelId").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择合同信息！');
				return ;
			} 
			createRegistrationForm.record = records[0];
			Ext.getCmp("createRegistrationForm").getForm().loadRecord(records[0]);
			window.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window.close();
		}
	} ]
	var window = new Ext.Window( {
		id : "MaterialAddWind",
		width : 700,
		layout : 'fit',
		autoScroll : true,
		title : '物资信息列表',
		modal : true,
		items : grid,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;
}
createRegistrationForm.getForm = function(rd,checkStatus,materialid,materialitemcode,materialItemName) { 
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
	        				items : [
	        						{name:'materialid',xtype:'hidden',value : materialid},
	        						{name:'registrationId',xtype:'hidden'},
	        						{name:'arrivalCheckId',xtype:'hidden'}
	        					 ,{
		        					 
		        					xtype:'hidden',
		        					name : 'registrationCode' 
		        				},{
		        					fieldLabel : '物资编号',	
		        					xtype :'textfield',
		        					name : 'materialitemcode',  
		        					anchor : '95%',
		        					value : materialitemcode,
		        					listeners : {
										focus : function(field){
											createRegistrationForm.getMaterial().show(); 
										}
									}
		        				},{
	        					fieldLabel : '规格',	
	        					name : 'materialStandard', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '技术条件',	
	        					name : 'itemName', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%'
	        				},{
		        					fieldLabel : '合格数量',	
		        					xtype :'numberfield',
		        					name : 'qualifiedNum',
		        					allowBlank : false,
		        					anchor : '95%'
		        			},{
		        					fieldLabel : '到货日期',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					name : 'arrivalDate', 
		        					anchor : '95%'
		        				},createRegistrationForm.combo("sampling","取样"),
		        				  createRegistrationForm.combo("test","委托试验"),
		        				  createRegistrationForm.combo("sendSampling","送样"),
		        				  createRegistrationForm.combo("ynStamped","打钢印"),
		        				  createRegistrationForm.combo("ynSpectro","分光"),{
		        					fieldLabel : '生产厂商',	
		        					xtype :'textfield',
		        					name : 'vendorName', 
//		        					allowBlank : false,
		        					anchor : '95%', 
									listeners : {
								    	focus : function(field){ 
											createRegistrationForm.getVendor("createRegistrationForm","vendorName").show(); 
										}
									}
		        			},{
		        					fieldLabel : '备注',	
		        					xtype :'textfield',
		        					name : 'note', 
		        					allowBlank : false,
		        					anchor : '95%'
		        			}] 
	               	},{
                    	columnWidth : .5,
        				border : false,
        				layout : 'form',
        				items : [{ 
	        					fieldLabel : '物资名称',	
	        					name : 'materialItemName', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%',
	        					value :materialItemName
	        				},{
	        					fieldLabel : '牌号',	
	        					name : 'desingnation', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '量纲',	
	        					name : 'demension', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '到货数量',	
	        					xtype :'numberfield',
	        					name : 'arrivalNum', 
	        					anchor : '95%',
	        					allowBlank : false
	        				},{
		        					fieldLabel : '到货批次',	
		        					xtype :'textfield',
		        					name : 'lotNo', 
		        					allowBlank : false,
		        					anchor : '95%'
		        			},createRegistrationForm.combo("ynFlawDetection","探伤"),
		        				  createRegistrationForm.combo("ynclean","清洗"),
		        				  createRegistrationForm.combo("ynSpray","喷盖"),
		        				  createRegistrationForm.combo("ynCheck","表面检查"),
		        				  createRegistrationForm.combo("ynSeal","油封"),
		        				  registrationForm.combo1(),
		        				  new Ext.form.ComboBox({
		name : 'materialstate',
		// 作为FORM表单提交时的参数名,并且hiddenName!=id
		hiddenName : 'materialstate',//创建一个新的控件,id=hiddenName
		fieldLabel : '物质状态',
		typeAhead : true,// 必须项
		triggerAction : 'all',// 必须项
		//hideTrigger:true ,//true隐藏下拉箭头
		lazyRender : true,
		resizable : true,// 是否手动扩展大小,默认false
		mode : 'local',
		forceSelection : true,// 限制输入范围在可选择的文本内
		editable : false,// 不允许输入,只能选择文本列表
		anchor : '95%',
		store : new Ext.data.ArrayStore(
			{
				id : 0,
				fields : ['value',	'displayText'],
				data : [[1, '正常入库'],[2, '委托加工'],[3,'返修品' ]]	
			}),
		valueField : 'value',
		value : 1,
		displayField : 'displayText'
})] 
               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'createRegistrationForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 320,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 
	}); 
	if(rd!=null)
	inform.getForm().loadRecord(rd);
	var buttons = [ {
		text : ' 确定 ',
		id : 'submit',
		disabled : registrationAction.flag,
		handler : function() {
			if (inform.form.isValid()) { 
				 
//						Ext.Ajax
//								.request( {
//									url : '../JSON/registrationRemote.newRegistration?d=' + new Date(),
//									method : 'POST',
//									params : { 
//										itemId : inform.form.findField('materialid').getRawValue(), 
//										qualifiedNum : inform.form.findField('qualifiedNum').getRawValue(),
//										arrivalDate : inform.form.findField('arrivalDate').getRawValue(), 
//										sampling:inform.form.findField('sampling').getRawValue(),
//										test:inform.form.findField('test').getRawValue(), 
//										sendSampling:inform.form.findField('sendSampling').getRawValue(), 
//										ynSpectro:inform.form.findField('ynSpectro').getRawValue(),
//										ynStamped:inform.form.findField('ynStamped').getRawValue(), 
//										arrivalNum:inform.form.findField('arrivalNum').getRawValue(),
//										lotNo:inform.form.findField('lotNo').getRawValue(),
//										ynFlawDetection:inform.form.findField('ynFlawDetection').getRawValue(), 
//										ynclean:inform.form.findField('ynclean').getRawValue(),
//										ynSpray:inform.form.findField('ynSpray').getRawValue(),
//										ynCheck:inform.form.findField('ynCheck').getRawValue(), 
//										seal:inform.form.findField('seal').getRawValue(),
//										registrationId : inform.form.findField('registrationId').getRawValue(),
//										arrivalCheckId : inform.form.findField('arrivalCheckId').getRawValue()
//										
//									},
//									success : function() {
//										Ext.example.msg('提示','保存数据成功！');
//										window.close();
//									},
//									failure : function() {
//										Ext.Msg.alert('提示',action.result);
//									}
//								});
			    var itemId = inform.form.findField('materialid').getRawValue(); 
				var	qualifiedNum = inform.form.findField('qualifiedNum').getRawValue();
				var	arrivalDate = inform.form.findField('arrivalDate').getRawValue(); 
				var	sampling=inform.form.findField('sampling').getRawValue();
				var	test=inform.form.findField('test').getRawValue(); 
				var	sendSampling=inform.form.findField('sendSampling').getRawValue(); 
				var	ynSpectro=inform.form.findField('ynSpectro').getRawValue();
				var	ynStamped=inform.form.findField('ynStamped').getRawValue(); 
				var	arrivalNum=inform.form.findField('arrivalNum').getRawValue();
				var	lotNo=inform.form.findField('lotNo').getRawValue();
				var	ynFlawDetection=inform.form.findField('ynFlawDetection').getRawValue(); 
				var	ynclean=inform.form.findField('ynclean').getRawValue();
				var	ynSpray=inform.form.findField('ynSpray').getRawValue();
				var	ynCheck=inform.form.findField('ynCheck').getRawValue(); 
				var	ynseal=inform.form.findField('ynSeal').getRawValue();
				var	registrationId = inform.form.findField('registrationId').getRawValue();
				var	arrivalCheckId = inform.form.findField('arrivalCheckId').getRawValue();
				var	vendorName=inform.form.findField('vendorName').getRawValue();
				var	note = inform.form.findField('note').getRawValue();
				var	qualifyNo = inform.form.findField('qualifyNo').getRawValue();
				var materialstate=inform.form.findField('materialstate').getValue();
				var remote = Seam.Component.getInstance("registrationRemote"); 
				
				remote.newRegistration( itemId,  qualifiedNum,arrivalDate,  sampling,  test,
			    sendSampling,  ynSpectro,  ynStamped,arrivalNum,  lotNo,  ynFlawDetection, ynclean,  ynSpray, 
			    ynCheck,  ynseal, registrationId, arrivalCheckId,vendorName,note,qualifyNo,materialstate, function(result){
					Ext.Msg.alert('提示', '数据保存成功！');  
					var grid = Ext.getCmp('registrationGridPanelId'); 
//						grid.store.baseParams = {start : 0 ,limit :20};
						grid.store.reload();
						inform.getForm().reset();
						window.close();
	});
			}
		}
	}, {
		text : '取消',
		disabled : registrationAction.flag,
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]
   
	var window = new Ext.Window( {
		id : "registrationFormAddWind",
		width : 500,
		height : 400,
		layout : 'fit',
		autoScroll : true,
		title : '入厂登记',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});  
	return window;

} 

/*
 * 获取供应商列表
  */
createRegistrationForm.getVendor = function(formid,fieldid){ 
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
	var tbar = [ '-', {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			vendorSearchForm.getSearchForm().show();
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
	     },
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
			Ext.getCmp(formid).form.findField(fieldid).setValue(records[0].get("vendorName")); 
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
