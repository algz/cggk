/**
*紧急放行
**/
var restAssured = {};
restAssured.getForm = function(checkType,checkDetailId,objectNo,objectName,objectComment,
arrivalCheckId,contractCode,itemCode,contractName,itemName,restAssuredDate,restAssuredNumber) { 
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
	        					  	{name:'arrivalCheckId',value:arrivalCheckId,xtype : 'hidden'},
	        						{name:'checkDetailId',value:checkDetailId,xtype : 'hidden'},
	        						{name:'objectNo',value: '1',xtype : 'hidden'},
	        						{name:'objectName',value: '1',xtype : 'hidden'},
	        						{name:'checkType',value: checkType,xtype : 'hidden'},
	        				    {
		        					fieldLabel : '合同编号',	
		        					xtype :'textfield',
		        					name : 'contractCode', 
		        					anchor : '95%',
		        					disabled: true,
		        					value : contractCode
		        				},{
		        					fieldLabel : '物资编号',	
		        					xtype : 'textfield',
		        					name : 'itemCode',  
		        					anchor : '95%',
		        					disabled: true,
		        					value : itemCode
		        				},{
		        					fieldLabel : '放行数量',	
		        					xtype :'numberfield',
		        					name : 'restAssuredNumber', 
		        					anchor : '95%',
		        					allowBlank : false,
		        					value : restAssuredNumber
		        				},{
                    	columnWidth : 1,
        				border : false,
        				layout : 'form',
        				items : [{
		        					fieldLabel : '备注',	
		        					xtype :'textfield',
		        					name : 'objectComment', 
		        					height : 50,
									allowBlank : true,
									maxLength : 100,
									maxLengthText : '最多可输入100个字，请重新输入！',
		        					anchor : '98%',
		        					value : objectComment
		        				}]} ] 
	               	},{
                    	columnWidth : .5,
        				border : false,
        				layout : 'form',
        				items : [
        				    {
	        					fieldLabel : '合同名称',	
	        					xtype :'textfield', 
	        					name : 'contractName', 
	        					disabled : true,
	        					anchor : '95%',
	        					disabled: true,
	        					value : contractName
	        				},{
	        					fieldLabel : '物资名称',	
	        					name : 'itemName', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%',
	        					disabled: true,
	        					value : itemName
	        				},{
	        					fieldLabel : '放行日期', 
	        					name : 'restAssuredDate', 
	        					xtype : "datefield",
	        					format : 'Y-m-d',
	        					anchor : '95%',
								editable : false,
	        					value : restAssuredDate
	        				}] 
               	} 
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'restAssured',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 160,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 
	}); 
 
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			if (inform.form.isValid()) {  
				inform.form
				.doAction(
						'submit',
						{
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../JSON/admissionTestRemote.saveCheckDetail?d=' + new Date(),
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
								Ext.Msg.alert('提示',"保存成功");
								 inform.getForm().reset();
								 window.close();
								
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',"保存失败");
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

	var window = new Ext.Window( {
		id : "restAssuredAddWind",
		width : 500,
		layout : 'fit',
		autoScroll : true,
		title : '紧急放行',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 