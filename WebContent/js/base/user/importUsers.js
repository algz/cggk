Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var importUser = {};
	
	importUser.importuser = function(){
		 
		 var AddEditFormPanel = new  Ext.form.FormPanel({
			id				 : 'importUserFormId',
			frame 			 : true,
			autoScroll       : true,
			onSubmit         : Ext.emptyFn,
			fileUpload		 :true,
			trackResetOnLoad : true,
			enctype 		 : 'multipart/form-data',
			closable         : true,
			closeAction      : 'close',
			items            : [new Ext.ux.form.FileUploadField({
										fieldLabel : ''+'文件名称'+'(<span style="color:red;" >'+'＊'+'</span>)',
										name : 'userImport',
										allowBlank : false,
										anchor : '95%',
										style : 'margin-bottom: 5px;',
										enableClearValue:true,
										vtype:'fileType',
										vtypeText:'上传的文件必须是xls类型！',
										fileTypes:['xls'],
										invalidText : '请选取要导入的文件！'
									})
			],
		   buttons:[{		
		            	xtype     : 'button',
		            	id        : 'btnImport',
		                text      : '导入',
		                handler   : doImport
				    },'-',{
				    	xtype     : 'button',
		            	id        : 'btnCancleImportUser',
		                text      : '取消 ',
		                handler   : doCancle
				    }]
	    });	
		
	 var window=new Ext.Window({
	           width          : 350,
	           height         : 200,
	           id             : 'inputUserWindow',
	           hideParent     : false,
		       modal          : true,
		       layout         : 'fit',
	           plain          : true,
	           title          : '导入用户' ,
	           items          : [AddEditFormPanel]
	        });
	 window.show();
 }

	function doImport(){
     	var mainFormpanel=Ext.getCmp('importUserFormId');
     	var importForm=mainFormpanel.getForm();
     	if(importForm.isValid()){
     		Ext.getCmp('btnImport').disable();
     		importForm.submit({
	     		url:serviceName+'/importUser.action',
	     		method:'POST',
	     		success:function(response, options){
	     			
	     			parseMsgInfo(options.response.responseText);
	     		
					Ext.getCmp('inputUserWindow').close();
					
					user.baseargs={start:0,limit:25}
					myGrid.loadvalue(user.grid.store,user.baseargs,null);	
					
	     		} 
     	});
	}
}


function doCancle(){
Ext.getCmp('inputUserWindow').close();
}














