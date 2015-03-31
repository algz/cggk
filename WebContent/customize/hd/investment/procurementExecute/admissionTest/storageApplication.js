/**
*入库申请
**/
var storageApplication = { }; 
storageApplication.getSearchForm = function(){ 
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
storageApplication.getVendor = function(){ 
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
			storageApplication.getSearchForm().show();
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
			Ext.getCmp("storageApplicationForm").form.findField("vendorCode").setValue(records[0].get("vendorCode"));
			Ext.getCmp("storageApplicationForm").form.findField("vendorName").setValue(records[0].get("vendorName"));
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

// 入库登记列表
storageApplication.admissionTestGridPanel = function(arrivalCheckIds) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/admissionTestRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'arrivalCheckId',
					totalProperty : 'totalProperty'
				}, [  'itemCode', 'itemName', 'contractCode',
					 'contractName','itemId','contractId','lotNo','arrivalCheckId',
					 'applyNum','applyInId','price','invoiceNo','demension','materialstate'
					 ])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm, 		
			{
				header : '物资编号',
				dataIndex : 'itemCode',
				sortable : true
			},
			{
				header : '物资名称 ',
				dataIndex : 'itemName',
				width : 100,
				sortable : true
			} ,
			{
				header : '合同编号',
				dataIndex : 'contractCode',
				sortable : true 
			},
			{
				header : '合同名称 ',
				dataIndex : 'contractName',
				width : 100	,
				sortable : true			
			},
			{
				header : '实际单价 ',
				dataIndex : 'price',
				width : 100	,
				sortable : true	,
				editor : {xtype:'numberfield'}
			},{
				header : '申请数量<font color="red">*</font>',
				dataIndex : 'applyNum',
				sortable : true,
				editor : {xtype:'numberfield'}
			},
			{
				header : '到货批次 ',
				dataIndex : 'lotNo',
				width : 100	,
				sortable : true			
			},{
				header : '物资状态 ',
				dataIndex : 'materialstate',
				width : 100,
				sortable : true,
				editor : new Ext.form.ComboBox({
							name : 'materialstate',
							// 作为FORM表单提交时的参数名,并且hiddenName!=id
							hiddenName : 'materialstate',// 创建一个新的控件,id=hiddenName
							fieldLabel : '物质状态',
							typeAhead : true,// 必须项
							triggerAction : 'all',// 必须项
							// hideTrigger:true ,//true隐藏下拉箭头
							lazyRender : true,
							resizable : true,// 是否手动扩展大小,默认false
							mode : 'local',
							forceSelection : true,// 限制输入范围在可选择的文本内
							editable : false,// 不允许输入,只能选择文本列表
							anchor : '95%',
							store : new Ext.data.ArrayStore({
										id : 0,
										fields : ['value', 'displayText'],
										data : [[1, '正常入库'], [2, '委托加工'], [3, '返修品']]
									}),
							valueField : 'value',
							value : 1,
							displayField : 'displayText'
						}),
				renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
					if(value==1){
						return "正常入库";
					}else if(value==2){
						return "委托加工";
					}else if(value==3){
						return "返修品";
					}return value;
				}
			}
			]);
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
				height :400,
				autoHeight:true,
				autoWidth  : true,
				columnLines : true,
				clicksToEdit:1, 
				loadMask : {
					msg : '数据加载中...'
				},
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				}/*,
//				tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})*/
	});  
	store.baseParams={start:0,limit:20,arrivalCheckId:arrivalCheckIds};
	store.load();	
	return grid;
}
storageApplication.getForm = function(appraisalNo,departmentName,applyStorage,arrivalCheckId,arrivalCheckIds,departmentId,planPrice,
chkUserNo,startJc,ea,certificateNo,qualityCode,endJc,lotNo,contractCode,vendorCode,vendorName,itemDataBillId,createDate,potLife,checkLife,
oilLife,useLife,guarantyLife,supplyCertifica,note) { 
	var item11 = [
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
	        				items : [{name:'departmentId',value :　departmentId,xtype : 'hidden'},
	        				{name:'itemDataBillId',value :　itemDataBillId,xtype : 'hidden'}, 
	        				     {
		        					fieldLabel : '申请编号',	
		        					xtype :'textfield',
		        					name : 'appraisalNo', 
		        					allowBlank : false,
		        					readOnly:true,
		        					anchor : '95%',
		        					value : appraisalNo
		        				},
	        				 {
	        					fieldLabel : '起始架次  ',	
	        					xtype :'textfield', 
	        					name : 'startJc',  
	        					anchor : '95%',
	        					value :startJc
	        				}
		        			] 
	               	},{
                    	columnWidth : .5,
        				border : false,
        				layout : 'form',
        				items : [
	        				 {
	        					fieldLabel : '特殊入库数量',	
	        					xtype :'textfield', 
	        					name : 'ea', 
//	        					allowBlank : false,
	        					anchor : '95%',
	        					value :ea
	        				},
	        				 {
	        					fieldLabel : '结束架次 ',	
	        					xtype :'textfield', 
	        					name : 'endJc',  
	        					anchor : '95%',
	        					value :endJc
	        				}
	        		] 
               	}
	               ]
	              }];
	var item21 = [
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
	        				items : [{name:'id',xtype:'hidden',value : itemDataBillId},{
		        					fieldLabel : '生产日期（月）',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
		        					name : 'createDate', 
		        					anchor : '95%',
		        					value : createDate
		        				},
	        					{
		        					fieldLabel : '储存期限（月）', 
		        					name : 'potLife',
		        					xtype :'numberfield', 
		        					anchor : '95%',
		        					value : potLife
		        				},{
		        					fieldLabel : '定检期限（月）',	
		        					xtype :'numberfield',
		        					name : 'checkLife', 
		        					anchor : '95%',
		        					value : checkLife
		        				},{
		        					fieldLabel : '油封期限（月）',	
		        					xtype :'numberfield',
		        					name : 'oilLife',  
		        					anchor : '95%' ,
		        					value : oilLife
		        				},{
		        					fieldLabel : '炉批号',	
		        					xtype :'textfield',
		        					name : 'supplyRegularNo', 
		        					anchor : '95%', 
		        					readOnly : true,
		        					value : lotNo
		        				},itemDataBillForm.combo()] 
		               	},{
	                    	columnWidth : .5,
	        				border : false,
	        				layout : 'form',
	        				items : [{
		        					fieldLabel : '使用期限（月）',	
		        					xtype :'numberfield',
		        					name : 'useLife',  
		        					anchor : '95%',
		        					value : useLife
		        				},{
		        					fieldLabel : '保证期限（月）',	
		        					xtype :'numberfield',
		        					name : 'guarantyLife',  
		        					anchor : '95%',
		        					value : guarantyLife
		        				},
	        					   {
			        					fieldLabel : '供应商编号',	
			        					xtype :'textfield',
			        					name : 'vendorCode', 
			        					anchor : '95%',
			        					value : vendorCode,
			        					readOnly : true,
			        					listeners : {
											    focus : function(field){ 
														storageApplication.getVendor().show(); 
											}
										}
			        				},{
			        					fieldLabel : '供应商名称',	
			        					xtype :'textfield',
			        					name : 'vendorName', 
			        					anchor : '95%', 
			        					readOnly : true,
//			        					allowBlank : false, 
			        					value : vendorName
			        				},{
		        					fieldLabel : '合同编号',	
		        					xtype :'textfield',
		        					name : 'orderNo', 
		        					anchor : '95%',
//		        					allowBlank : false,
		        					readOnly : true ,
		        					value :contractCode
		        				},{
		        					fieldLabel : '合格证编号',	
		        					xtype :'textfield',
		        					name : 'supplyCertifica', 
		        					anchor : '95%',
		        					value : supplyCertifica
		        				},{
			        					fieldLabel : '备注',	
			        					xtype :'textarea',
			        					name : 'note',
			        					height : 50, 
										maxLength : 250,
										maxLengthText : '最多可输入250个字，请重新输入！',
			        					anchor : '95%' ,
			        					value : note
			        				}] 
	               	}
	               ]
	              }];
	var item1=[{
		xtype : 'fieldset',
		title : '入库信息表',
		items : [item11]
	}];
	var item2=[{
		xtype : 'fieldset',
		title : '质量信息表',
		items : [item21]
	}];
	var inform = new Ext.FormPanel( {
		id : 'storageApplicationForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		width : 700, 
		height : 300,
		autoScroll : true,
		frame : false,
		border : false,
		items : [item1,item2,storageApplication.admissionTestGridPanel(arrivalCheckIds)],
		fileUpload : false,
		padding : 5 
	}); 
 
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			  	var grid = Ext.getCmp('VendorAppraisalDepartmentGrid'); 
			    var applyNum = new Array();
			    var applyInId =  new Array();
			    var itemId = new Array();
				var itemCode = new Array();
				var price = new Array();
				var contractCode = new Array();
				var invoiceNo = new Array();
				var demension = new Array();
				var lotNo = new Array();
				var productCode = new Array();
				var note = new Array();
			    var materialstate=new Array();//物资状态
					for ( var i = 0; i < grid.getStore().getCount(); i++) { 
						  var num=grid.getStore().getAt (i).get('applyNum');
						  if(num==""||num==0){
						  		Ext.Msg.alert('提示', '请填写正确的申请数量！');
								return;
						  }
						  applyNum.push(grid.getStore().getAt (i).get('applyNum'));
						  applyInId.push(grid.getStore().getAt (i).get('applyInId'));
						  itemId.push(grid.getStore().getAt (i).get('itemId'));
						  itemCode.push(grid.getStore().getAt (i).get('itemCode'));
						  price.push(grid.getStore().getAt (i).get('price'));
						  contractCode.push(grid.getStore().getAt (i).get('contractCode'));
						  invoiceNo.push(grid.getStore().getAt (i).get('InvoiceNo'));
						  demension.push(grid.getStore().getAt (i).get('demension'));
						  lotNo.push(grid.getStore().getAt (i).get('lotNo'));
						  materialstate.push(grid.getStore().getAt(i).get('materialstate'));
						  productCode.push('');
						  note.push('');
					}
				 
				var appraisalNo = inform.form.findField('appraisalNo').getRawValue();  
				var startJc = inform.form.findField('startJc').getRawValue();
				var ea = inform.form.findField('ea').getRawValue();  
				var endJc = inform.form.findField('endJc').getRawValue(); 
				 
				var id = inform.form.findField('id').getRawValue(); 
				var	createDate = inform.form.findField('createDate').getRawValue();
				var	potLife = inform.form.findField('potLife').getRawValue(); 
				var	checkLife=inform.form.findField('checkLife').getRawValue();
				var	oilLife=inform.form.findField('oilLife').getRawValue(); 
				var	useLife=inform.form.findField('useLife').getRawValue();  
				var	supplyRegularNo=inform.form.findField('supplyRegularNo').getRawValue(); 
				var	orderNo=inform.form.findField('orderNo').getRawValue(); 
				var	vendorCode = inform.form.findField('vendorCode').getRawValue(); 
				var	vendorName=inform.form.findField('vendorName').getRawValue();
				var	note1 = inform.form.findField('note').getRawValue();
				var	itemPurpose = inform.form.findField('itemPurpose').getRawValue();
				var supplyCertifica  = inform.form.findField('supplyCertifica').getRawValue(); 
//				if(appraisalNo==null || appraisalNo==""){
//					Ext.Msg.alert('提示', '请录入申请编号');
//					return;
//				}
//				if(supplyCertifica==null || supplyCertifica==""){
//					Ext.Msg.alert('提示', '请录入合格证编号');
//					return;
//				}
				var guarantyLife  = inform.form.findField('guarantyLife').getRawValue(); 
				var remote = Seam.Component.getInstance("admissionTestRemote");  
				remote.saveApplyIn(arrivalCheckId, applyNum, applyInId, appraisalNo,itemId
				,itemCode,price,contractCode,invoiceNo,demension,lotNo,productCode,note,startJc,ea,
				endJc,id,createDate,potLife,checkLife,oilLife,useLife,guarantyLife,supplyRegularNo,orderNo,vendorCode,
				vendorName,note1,itemPurpose,supplyCertifica,materialstate, function(result){
					var json=Ext.util.JSON.decode(result);
					if(json.success==false){
						Ext.Msg.alert('提示', "提交失败!");
						//inform.getForm().reset();
						//window.close();
						return;
					}else{
					//批量修改申请入库后的状态
					var AdmissionTestGrid = Ext.getCmp('admissionTestGridPanelId');
//					var recordAdmissionTest = Ext.getCmp('admissionTestGridPanelId').getSelectionModel().getSelections()
//					var registrationIds = '';
//					for(var j=0;j<recordAdmissionTest.length;j++){
//						registrationIds = registrationIds + recordAdmissionTest[j].data.registrationId;
//						if(j<recordAdmissionTest.length-1)
//							registrationIds = registrationIds + ",";
//					}
//					var remote = Seam.Component.getInstance("admissionTestRemote"); 
//				 	remote.UpdateArrivalCheck(registrationIds,'7', function(result){ 
			 		Ext.Msg.alert('提示',json.msg!=''?json.msg: '数据保存成功！');  
					AdmissionTestGrid.store.reload();
//				 	});
					inform.getForm().reset();
					window.close();
					}
				});
		}
	}, {
		text : '取消',
		handler : function() {
			Ext.Ajax.request({
				url : '../JSON/admissionTestRemote.delApplyIn?d=' + new Date(),
				method : 'POST',
				params : {
					applyNo : appraisalNo
				},
				success : function(response, options) {
					inform.getForm().reset();
					window.close();
//					var obj = Ext.util.JSON.decode(response.responseText);
//					storageApplication.getForm(obj.data.applyNo, obj.data.departmentName, obj.data.applyStorage, arrivalCheckId, arrivalCheckIds, obj.data.departmentId,
//							obj.data.planPrice, obj.data.chkUserNo, obj.data.startJc, obj.data.ea, obj.data.certificateNo, obj.data.qualityCode, obj.data.endJc,
//							records[0].get("lotNo"), records[0].get("contractCode"), records[0].get("vendorCode"), records[0].get("vendName"), obj.data.itemBillId).show();
				},
				failure : function() {
					Ext.Msg.alert('提示', "服务器正忙");
				}
			});
		}
	} ]

	var window = new Ext.Window( {
		id : "storageApplicationAddWind",
		width : 730, 
		height : 500, 
		layout : 'fit',
		autoScroll : true,
		title : '申请入库',
		modal : true,
		items : [inform],
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 
 