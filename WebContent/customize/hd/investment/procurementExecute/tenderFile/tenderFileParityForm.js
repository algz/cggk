//自行比价
var tenderFileParityForm= {
		
};

tenderFileParityForm.getTenderFileParityForm = function(tenderId,procurementPlanDetilName,tenderFileType,tenderFileCode,amount,selectedDepartment,
createdate,fileName,fileId,tenderFileId,status){

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
										createdate : tenderFileForm.form.findField('createdate').getRawValue(),
										tenderId:tenderId,
										tenderFileId:tenderFileId,//主键
										tenderFileType:tenderFileType,
										amount:tenderFileForm.form.findField('amount').getRawValue(),//总金额
										selecteddepartment:tenderFileForm.form.findField('selectedDepartment').getRawValue(),//申请单位
										procurementplanDetilName : procurementPlanDetilName//招标项目
									},
									success : function() {
										Ext.example.msg('提示','保存数据成功！');
										window.close();
									},
									failure : function() {
										Ext.example.msg('提示','保存数据失败！');
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
			if(parseInt(amount)>1000000)
			   tenderFileAction.submitTenderFile('442757','申请报告审批',tenderFileId+'a');//类型为a的为类型10的
			else{ 
				var remote = Seam.Component.getInstance("tenderFileRemote"); 
				remote.updateStatusById(tenderFileAction.id, function(result){
					Ext.Msg.alert('提示','总金额小于1000000元，不需要进行“送审”的操作。')
					 Ext.getCmp("send").disable(); 
				  	 Ext.getCmp("save").disable(); 
				  	 //	Ext.getCmp("tenderPlanGrid").store.baseParams={start:0,limit:20,pageType:'1'};
					 Ext.getCmp("fixTenderGrid").store.reload();
				});
			}
		}
	}, 
//	{
//		text : '打印',
//		disabled : true,
//		handler : function() {
//			
//		}
//	} , 
	{
		text : ' 返回 ',
		handler : function() {
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
				width : 750,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '总金额',
					xtype : 'numberfield',
					name : 'amount',
					anchor : '90%',
					allowBlank : false,
					allowDecimals :true,//是否允许输入小数   
	    			decimalPrecision :3,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义 
	    			maxLength : 10,
	    			maxLengthText : '不能超过10个字符，请重新输入！',
			        value : amount
				}
				 ]
			}]
	},{

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
					fieldLabel : '申请单位',
					xtype : 'textfield',
					name : 'selectedDepartment',
					anchor : '90%',
					allowBlank : false,
					value : selectedDepartment
				} ]
			},{
				columnWidth : .49,
				width : 750,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '招标项目',
					xtype : 'textfield',
					disabled : true,
					value:procurementPlanDetilName,
					name : 'procurementPlanDetilName',
					anchor : '90%'
				}]}]
	
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
			width : 750,
			layout : 'form',
			border : false,
			items : [ {
				xtype : "datefield",
				fieldLabel : '时间',
				name:'createdate',
				lableWidth : 150,
				format : 'Y-m-d',
				editable : false,
				allowBlank : false,
				anchor : '90%',value : createdate} ]
			},{
				columnWidth : .49,
				width : 750,
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
				}]
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
		title : '自行比价',
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