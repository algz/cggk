/**
 * 验收过程
 * @type 
 */
var testCourse={
	inputWidth:120,
	testCourseId:null
};

function formSubmit(theForm,acceptId){
	//判断必填项是否有内容
	if(theForm.getForm().isValid()){
		var fileUrl = theForm.getForm().findField('testCourseDocument').getValue();
		if(fileUrl!=null||fileUrl!=''){
			var fileName = fileUrl.toLowerCase().trim();
			//验证上传文件格式
			if(fileName.lastIndexOf('.')==-1){
				Ext.Msg.alert('提示','仅支持扩展名为docx,doc,txt的文件!');
				return;
			}
			if(fileName.substr(fileName.lastIndexOf('.')) != '.doc'&&fileName.substr(fileName.lastIndexOf('.')) != '.docx'
				&&fileName.substr(fileName.lastIndexOf('.')) != '.txt'){
				Ext.Msg.alert('提示','仅支持扩展名为docx,doc,txt的文件!');
				return;
			}
			theForm.getForm().submit({
//				url:'../JSON/TestCourseRemote.useTestCourse',
				url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
				method:'POST',
				failure:function(form,action){
					Ext.MessageBox.show({
						title : '提示信息',
						msg : '获取后台数据失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				},
				success:function(form,action){
//								alert(action.response.responseText);
//					fileId : action.result.fileId!=""?action.result.fileId:fileId,
//					fileName : action.result.fileName!=""?action.result.fileName:fileName,
//					alert(action.result.fileId!=""?action.result.fileId:fileId+"||"+action.result.fileName!=""?action.result.fileName:fileName);
					if(action.result.fileId==""){
						Ext.MessageBox.show({
										title : '提示信息',
										msg : '需要保存请重新上传文件！',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						return;
					}
					//保存数据到“验收过程”中
					Ext.Ajax.request({
						url:'../JSON/TestCourseRemote.useTestCourse',
						method:'POST',
						failure:function(){
							Ext.MessageBox.show({
										title : '提示信息',
										msg : '获取后台数据失败！',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						},
						success:function(response, options){
							testCourse.win.close();
							
							//刷新表格数据操作
							var acceptTaskGridStroe = Ext.getCmp('acceptTaskGrid').store
							//起始数
							var start = Ext.getCmp('acceptTaskGrid').getBottomToolbar().cursor;
							//每页显示总数
							var limit = Ext.getCmp('acceptTaskGrid').getBottomToolbar().pageSize;
							//添加默认参数
							acceptTaskGridStroe.baseParams.acceptNum=acceptTask.selectNum.getValue();
							acceptTaskGridStroe.baseParams.startTime=acceptTask.startTime.getValue();
							acceptTaskGridStroe.baseParams.endTime=acceptTask.endTime.getValue();
							acceptTaskGridStroe.load({
								params:{
									start:start,
									limit:limit
								}
							});
						},
						disableCaching : true,
						autoAbort : true,
						params:{
							acceptId:acceptId,
							//文件名称(只有同时存在名称和编号后面才能下载)
							testCourseDocument:action.result.fileName!=""?action.result.fileName:fileName,
							//文件编号
							testCourseDocumentId:action.result.fileId!=""?action.result.fileId:fileId,
							testCourseTime:theForm.getForm().findField('testCourseTime').getValue()
						}
					});
				}
			})
		}
	}
}

testCourse.init=function(acceptId){
	testCourse.acceptTaskMsg = new Ext.form.FormPanel({
		frame:true,
		border:true,
		style:'border:none;',
		buttonAlign:'center',
		//允许上传
		fileUpload:true,
		items:[
			{
				layout:'column',
				items:[
					{
						columnWidth:.98,
						layout:'form',
						items:[{
							xtype:'fileuploadfield', 
							buttonText:'浏览...',
							name:'testCourseDocument',
							fieldLabel:'验收大纲',
							width:testCourse.inputWidth*1.6,
							allowBlank:false,
		            		blankText:'请上传文件！'
						}]
					},
					{
						columnWidth:.98,
						layout:'form',
						items:[{
							xtype:'datefield',
							name:'testCourseTime',
							fieldLabel:'时间',
							format:'Y-m-d',
							value:new Date(),
							readOnly:true,
							width:testCourse.inputWidth
						}]
					}
				]
			}
		],
		buttons:[
			{
				text:'保存',
				id:'testCourseSave',
				handler:function(){
					formSubmit(testCourse.acceptTaskMsg,acceptId);
				}
			},
			{
				text:'送审',
				id:'testCourseApprove',
				handler:function(){
					//原有‘446901’
//					acceptTaskApprovePanel.approve('449851','验收过程',acceptId,'TestCourse');
					acceptTaskApprovePanel.approve('472152','验收过程审批',acceptId,'TestCourse');
				}
			},{
				text:'取消',
				handler:function(){
					testCourse.win.close();
				}
			}
		]
	});
	
	//判断是否已经存在内容
	Ext.Ajax.request({
		url:'../JSON/TestCourseRemote.getTestCourse',
		method:'POST',
		failure:function(){
			Ext.MessageBox.show({
						title : '提示信息',
						msg : '获取后台数据失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		},
		success:function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			//判断是否存在值
			if(result.success=='true'){
				testCourse.acceptTaskMsg.getForm().findField('testCourseDocument').setValue(result.testCourseDocument);
				testCourse.acceptTaskMsg.getForm().findField('testCourseTime').setValue(result.testCourseTime);
				
				var ID = result.testCourseDocumentId;
				var ORIGINALNAME = result.testCourseDocument;
				//建立当前上传文件的查看路径
				var path = new Ext.Panel({
					html:'<font color="red">当前文件路径查看：</font>'+"<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
								+ ID
								+ "&ORIGINALNAME="
								+ encodeURI(encodeURI(ORIGINALNAME))
								+ "' cursor：hand>" + result.testCourseDocument + "</a>"
				});
				
				//确定“送审”按钮是否可用
				var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
				//当为完成状态时，“保存”按钮不可用
				if(records.length==1&&records[0].get('acceptState')>4)
					Ext.getCmp('testCourseSave').setDisabled(true);
				//已送审的任务，“送审”不可用（“资产交接”以后状态的都说明应经送审）
				if(records.length==1&&records[0].get('acceptState')>4){
					Ext.getCmp('testCourseApprove').setDisabled(true);
				}else{
					Ext.getCmp('testCourseApprove').setDisabled(false);
				}
				//编号赋值
				testCourse.testCourseId=result.testCourseId;
				
				testCourse.acceptTaskMsg.add(path);
				testCourse.acceptTaskMsg.doLayout();
			}else{
				Ext.getCmp('testCourseApprove').setDisabled(true);
			}
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			acceptId:acceptId
		}
	});
	
	testCourse.win = new Ext.Window({
		title:'验收过程',
		width:400,
		minWidth:400,
		autoHeight:true,
		modal:true,
		items:[testCourse.acceptTaskMsg]
	});
	testCourse.win.show();

}