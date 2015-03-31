var itemDataBillForm = {
	contractId : null,
	record : null
};
itemDataBillForm.combo = function(){ 
	var combox = new Ext.form.ComboBox({
		hiddenName : 'itemPurpose',
		fieldLabel : '检验地点',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '部检', '部检' ],[ '海军检', '海军检' ],[ '空军检', '空军检' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : '部检'
	})
	return combox;
}
itemDataBillForm.getForm = function() { 
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
	        				items : [{name:'id',xtype:'hidden'},
	        					 {
		        					fieldLabel : '进场时间',	 
		        					name : 'inFactoryData', 
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '储存期限', 
		        					name : 'potLife',
		        					xtype :'numberfield',
		        					allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '定检期限',	
		        					xtype :'numberfield',
		        					name : 'checkLife',
		        					allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '油封期限',	
		        					xtype :'numberfield',
		        					name : 'oilLife',  
		        					anchor : '95%',
		        					allowBlank : false
		        				},{
		        					fieldLabel : '使用期限',	
		        					xtype :'numberfield',
		        					name : 'useLife',  
		        					anchor : '95%',
		        					allowBlank : false
		        				},{
		        					fieldLabel : '保证期限',	
		        					xtype :'numberfield',
		        					name : 'guarantyLife',  
		        					anchor : '95%',
		        					allowBlank : false
		        				},{
		        					fieldLabel : '炉批号',	
		        					xtype :'textfield',
		        					name : 'supplyRegularNo', 
		        					anchor : '95%',
		        					allowBlank : false,
		        					readOnly : true  
		        				},{
		        					fieldLabel : '合同编号',	
		        					xtype :'textfield',
		        					name : 'orderNo', 
		        					anchor : '95%',
//		        					allowBlank : false,
		        					readOnly : true 
		        				},{
		        					fieldLabel : '合格证编号',	
		        					xtype :'textfield',
		        					name : 'supplyCertifica', 
		        					anchor : '95%',
		        					allowBlank : false
		        				},itemDataBillForm.combo()] 
		               	},{
	                    	columnWidth : .5,
	        				border : false,
	        				layout : 'form',
	        				items : [{
		        					fieldLabel : '出场时间',	 
			        				name : 'outFactoryData', 
			        				xtype : "datefield",
			        				format : 'Y-m-d',
									editable : false,
									allowBlank : false,
			        				anchor : '95%'
		        				},{
		        					fieldLabel : '储存到期时间', 
		        					name : 'potLifeDeadLine', 
		        					xtype : "datefield",
		        					format : 'Y-m-d',
		        					allowBlank : false,
									editable : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '定检到期时间',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					name : 'checkLifeDeadLine', 
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '油封期限时间',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					name : 'oilLifeDeadLine', 
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '使用到期时间',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					name : 'useLifeDeadLine', 
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '保证期限时间',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					name : 'guarantyLifeDeadLine', 
		        					anchor : '95%'
		        				} ,{
			        					fieldLabel : '供应商编号',	
			        					xtype :'textfield',
			        					name : 'vendorCode', 
			        					anchor : '95%',
			        					readOnly : true 
			        				},{
			        					fieldLabel : '供应商名称',	
			        					xtype :'textfield',
			        					name : 'vendorName', 
			        					anchor : '95%',
//			        					allowBlank : false,
			        					readOnly : true 
			        				},{
			        					fieldLabel : '质量编号',	
			        					xtype :'textfield',
			        					name : 'qualityCode', 
			        					anchor : '95%',
			        					allowBlank : false 
			        				},{
			        					fieldLabel : '备注',	
			        					xtype :'textarea',
			        					name : 'note',
			        					height : 50, 
										maxLength : 250,
										maxLengthText : '最多可输入250个字，请重新输入！',
			        					anchor : '95%' 
			        				}] 
	               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'itemDataBillForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 300,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 
	}); 
 
	var buttons = [ {
		text : ' 确定 ',
		id : 'submit',
		handler : function() {
			if (inform.form.isValid()) { 
				var id = inform.form.findField('id').getRawValue(); 
				var	inFactoryData = inform.form.findField('inFactoryData').getRawValue();
				var	potLife = inform.form.findField('potLife').getRawValue(); 
				var	checkLife=inform.form.findField('checkLife').getRawValue();
				var	oilLife=inform.form.findField('oilLife').getRawValue(); 
				var	useLife=inform.form.findField('useLife').getRawValue(); 
				var	guarantyLife=inform.form.findField('guarantyLife').getRawValue();
				var	supplyRegularNo=inform.form.findField('supplyRegularNo').getRawValue(); 
				var	orderNo=inform.form.findField('orderNo').getRawValue();
				var	outFactoryData=inform.form.findField('outFactoryData').getRawValue();
				var	potLifeDeadLine=inform.form.findField('potLifeDeadLine').getRawValue(); 
				var	checkLifeDeadLine=inform.form.findField('checkLifeDeadLine').getRawValue();
				var	oilLifeDeadLine=inform.form.findField('oilLifeDeadLine').getRawValue();
				var	useLifeDeadLine=inform.form.findField('useLifeDeadLine').getRawValue(); 
				var	guarantyLifeDeadLine=inform.form.findField('guarantyLifeDeadLine').getRawValue();
				var	vendorCode = inform.form.findField('vendorCode').getRawValue(); 
				var	vendorName=inform.form.findField('vendorName').getRawValue();
				var	note = inform.form.findField('note').getRawValue();
				var	itemPurpose = inform.form.findField('itemPurpose').getRawValue();
				var supplyCertifica  = inform.form.findField('supplyCertifica').getRawValue();
				var qualityCode  = inform.form.findField('qualityCode').getRawValue();
				var remote = Seam.Component.getInstance("admissionTestRemote"); 
				remote.saveItemDataBill( id, inFactoryData, potLife, checkLife, oilLife, useLife, guarantyLife,
				supplyRegularNo, orderNo, outFactoryData, potLifeDeadLine, checkLifeDeadLine,
				oilLifeDeadLine, useLifeDeadLine, guarantyLifeDeadLine, vendorCode, vendorName,
				note, itemPurpose,supplyCertifica, function(result){
					    Ext.Msg.alert('提示', '数据保存成功！');   
						inform.getForm().reset(); 
						var obj = Ext.util.JSON.decode(result);
						storageApplication.qualityCode = qualityCode;
						storageApplication.id = obj.id; 
						Ext.getCmp("storageApplicationForm").form.findField('qualityCode').setRawValue(qualityCode);
						window.close();
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
		id : "itemDataBillFormwin",
		width : 500,
		layout : 'fit',
		autoScroll : true,
		title : '质量信息表',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});  
	return window;

} 
