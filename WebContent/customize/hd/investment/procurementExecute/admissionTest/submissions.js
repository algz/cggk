/**
*意见书
**/
var submissions = {};
submissions.combo = function(objectResult){ 
	var combox = new Ext.form.ComboBox({
		id : 'objectResult',
//		id : 'yiJianShuResult',
		fieldLabel : '处理方式',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '重检', '重检' ],[ '退货', '退货' ],[ '降级使用', '降级使用' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		allowBlank : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : objectResult
	})
	return combox;
}
submissions.getForm = function(checkType,checkDetailId,objectNo,objectName,objectComment,objectResult,
arrivalCheckId,contractCode,itemCode,contractName,itemName,fileId,fileName) { 
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
	        						{name:'fileId',value:fileId,xtype: 'hidden'},
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
		        					fieldLabel : '编号',	
		        					xtype :'textfield',
		        					name : 'objectNo', 
		        					anchor : '95%',
		        					allowBlank : false,
		        					value : objectNo
		        				},{
	        					fieldLabel : '上传质量意见书', 
								id : 'form-file',
								anchor : '95%',
								xtype:'fileuploadfield', 
								name : 'fileName',  
					            buttonText:'浏览...',
					            allowBlank:false,
					            blankText:'请上传质量意见书！',
					            value : fileName
				        	},submissions.combo(objectResult) ] 
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
	        					fieldLabel : '名称',	
	        					xtype :'textfield',
	        					name : 'objectName', 
	        					anchor : '95%',
	        					allowBlank : false,
	        					value : objectName
	        				},{
		        					fieldLabel : '质量处理意见',	
		        					xtype :'textfield',
		        					name : 'objectComment', 
		        					height : 50,
									allowBlank : true,
									maxLength : 250,
									maxLengthText : '最多可输入250个字，请重新输入！',
		        					anchor : '95%',
		        					value : objectComment
		        				}] 
			         	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'submissions',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 200,
		frame : false,
		border : false,
		items : items,
		fileUpload : true,
		padding : 5 
	});  
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			if (inform.form.isValid()) {  
				inform.form
				.doAction('submit',{
//							waitMsg : '正在保存数据，请稍候...',
//							waitTitle : '提示',
//							url : '../JSON/admissionTestRemote.saveCheckDetail?d=' + new Date(),
//							method : 'post',
//							success : function(form, action) {//在这处理逻辑。
//								 var grid = Ext.getCmp('admissionTestGridPanelId'); 
//							
//								 var YiJianShu = Ext.getCmp('objectResult').getValue();
//							 	 var result = '';
//							 	 if(YiJianShu == '重检')
//							 		 result = '4';
//							 	 else if(YiJianShu == '退货')
//							 		 result = '5';
//							 	 else if(YiJianShu == '降级使用')
//							 		 result = '8';
//							 	 //修改“处理状态”
//							 	 var remote = Seam.Component.getInstance("admissionTestRemote"); 
//							 	 remote.UpdateArrivalCheck(grid.getSelectionModel().getSelections()[0].data.registrationId,result, function(result){ 
//							 		 Ext.Msg.alert('提示',"保存成功");
//							 		 // grid.store.baseParams = {start : 0 ,limit :20};
//									grid.store.reload();
//							 	 });
//							
//								 inform.getForm().reset();
//								 window.close(); 
//							},
//							failure : function(form, action) {
//								Ext.Msg.alert('提示',"保存失败");
//							}
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
							
								Ext.Ajax
										.request( {
											url : '../JSON/admissionTestRemote.saveCheckDetail?d=' + new Date(),
											method : 'POST',
											params : {
												fileId : action.result.fileId!=""?action.result.fileId:fileId,
												fileName : action.result.fileName!=""?action.result.fileName:fileName,
												objectResult : inform.form.findField('objectResult').getRawValue(), 
												arrivalCheckId : inform.form.findField('arrivalCheckId').getRawValue(),
												checkDetailId : inform.form.findField('checkDetailId').getRawValue(),
												checkType : inform.form.findField('checkType').getRawValue(), 
												objectName:inform.form.findField('objectName').getRawValue(),
												objectComment:inform.form.findField('objectComment').getRawValue(),
												objectNo : inform.form.findField('objectNo').getRawValue() 
											},
											success : function() {
													 var grid = Ext.getCmp('admissionTestGridPanelId');  
													 var YiJianShu = Ext.getCmp('objectResult').getValue();
												 	 var result = '';
												 	 if(YiJianShu == '重检')
												 		 result = '4';
												 	 else if(YiJianShu == '退货')
												 		 result = '5';
												 	 else if(YiJianShu == '降级使用')
												 		 result = '8';
												 	 //修改“处理状态”
												 	 var remote = Seam.Component.getInstance("admissionTestRemote"); 
												 	 remote.UpdateArrivalCheck(grid.getSelectionModel().getSelections()[0].data.registrationId,result, function(result){ 
												 		 Ext.Msg.alert('提示',"保存成功"); 
														 grid.store.reload();
												 	 });
												
													 inform.getForm().reset();
													 window.close(); 
											},
											failure : function() {
												 Ext.Msg.alert('提示',"保存失败"); 
											}
										});
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',action.result);
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
		id : "submissionsAddWind",
		width : 500,
		layout : 'fit',
		autoScroll : true,
		title : '质量处理意见书',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 