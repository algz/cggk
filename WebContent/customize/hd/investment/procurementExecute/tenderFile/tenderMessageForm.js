//招标通知
var tenderMessageForm= {
		
};


tenderMessageForm.getForm = function(tenderId,procurementPlanDetilName,tenderFileType,tenderFileCode,
plenipotentiary,createdate,fileName,fileId,tenderFileId,status,type){ 
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
										tenderFileId:tenderFileId,//主键
										procurementplanDetilName : procurementPlanDetilName//招标项目
										
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
		text : ' 送审 ',
		id : 'send',
		handler : function() {
			var flowid = "442753";
			var name = "中标通知书签发";
			if(type=="f")
			{
				flowid = "442762";
				name = "定向谈判通知书签发";
			}
			tenderFileAction.submitTenderFile(flowid,name,tenderFileId+tenderFileType);
		} 
	}, 
//	, {
//		text : '打印',
//		disabled : true,
//		handler : function() {
//			
//		}
//	}  
//	, {
//		text : ' 招标单位 ',
//		id : 'TenderUnits',
//		handler : function() {
//			tenderUnitsGrid.getTenderUnits(tenderFileId).show();
//		}
//	}
	{
		text : ' 返回 ',
		handler : function() {
			window.close();
		}
	}];


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
				editable : false,
				anchor : '90%',
				allowBlank : false,
				value : createdate} ]
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
		}]
	
	},{name:'fileId',value:fileId,hidden:true}];

	
	//表单
	var tenderFileForm = new Ext.form.FormPanel({
		padding : 5,
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
		title : '招标通知',
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


