/**
*理化委托
**/
var physicalCommissioned = {};
physicalCommissioned.getForm = function(checkType,checkDetailId,objectNo,objectName,objectComment,
arrivalCheckId,contractCode,itemCode,contractName,itemName) { 
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
		        					fieldLabel : '委托单号',	
		        					xtype :'textfield',
		        					name : 'objectNo', 
		        					anchor : '95%',
		        					allowBlank : false,
		        					value : objectNo
		        				}] 
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
	        					fieldLabel : '委托单名称',	
	        					xtype :'textfield',
	        					name : 'objectName', 
	        					anchor : '95%',
	        					allowBlank : false,
	        					value : objectName
	        				}] 
               	},{
                    	columnWidth : 1,
        				border : false,
        				layout : 'form',
        				items : [
        				    {
		        					fieldLabel : '处理要求',	
		        					xtype :'textfield',
		        					name : 'objectComment', 
		        					height : 50,
									allowBlank : true,
									maxLength : 100,
									maxLengthText : '最多可输入100个字，请重新输入！',
		        					anchor : '98%',
		        					value : objectComment
		        				} ] 
               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'physicalCommissioned',
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
				inform.form.doAction('submit',{
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../JSON/admissionTestRemote.saveCheckDetail?d=' + new Date(),
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
								 var grid = Ext.getCmp('admissionTestGridPanelId'); 
								 //修改“处理状态”
								 var remote = Seam.Component.getInstance("admissionTestRemote"); 
								 remote.UpdateArrivalCheck(grid.getSelectionModel().getSelections()[0].data.registrationId,'1', function(result){ 
									 Ext.Msg.alert('提示',"保存成功");
									 // grid.store.baseParams = {start : 0 ,limit :20};
									 grid.store.reload();
								 });
								 
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
		id : "physicalCommissionedAddWind",
		width : 500,
		layout : 'fit',
		autoScroll : true,
		title : '理化委托',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 