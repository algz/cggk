
var bulletionFormUpdate = {
	issueDialog : null,
	form : null,
	temp : null,
	typeid : null,
	oFCKeditor : null
}
var bulletionFromPanel = {
	isUpdate : false,
	init : function (){
		var formPanel = new Ext.form.FormPanel({
			    id : 'news_form_panel',
				frame : true,
				fit:true,
				hidden : true,
				plain : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent;',
				items : [
			 	{xtype : 'textfield',id:'news_textfield',fieldLabel:'公告名称',name:'title',
			 		regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
					regexText : ''+getResource('resourceParam1092')+'！',
			 		maxLength:50,maxLengthText:'最大50个字符',style : 'margin-bottom:5px;',anchor:'80%',allowBlank:false,invalidText:'名称不能为空'},
				{xtype:'label',fieldLabel:'公告内容'},{id:'richEditor'}
				],
				//bug:812 防止重复提交
				//gaoyn 2011-5-25 9:22
				buttons:[{id:'save', text:'保存',disabled:false, handler:function(){
					if(Ext.getCmp('save').disabled==false){
					    if(bulletionFromPanel.isUpdate){
					    	if (formPanel.getForm().isValid()) {
					    			var appVo = Seam.Remoting.createType("com.luck.itumserv.bulletin.NoticesVo");
						            appVo.setId(myGrid.row.get("id"));
									Ext.apply(appVo, formPanel.getForm().getValues());
									var content=FCKeditorAPI.GetInstance("dictContent");
									appVo.content=content.GetXHTML(true);
									
									if(appVo.content=="" || (appVo.content).length==0){
									Ext.Msg.alert("提示","公告内容不能为空!");
									return;
								}
								Ext.getBody().mask("正在保存公告，请稍后...","x-mask-loading");
									Ext.getCmp('save').setDisabled(true);
									callSeam("notices_noticessvr", "noticeUpdate", [appVo],
											function(result){
												Ext.getBody().unmask();
												Ext.getCmp('save').setDisabled(false);
												var obj = Ext.util.JSON.decode(result);
												if(true==obj.success){
														Ext.example.msg(
													"" + getResource('resourceParam575')
															+ "",
													"" + getResource('resourceParam1072')
															+ "");
													 		//bug:gaoyn 879 2011-5-26 16:23
													 		var ds = Ext.getCmp("bulletinGridPanel").getStore();
													 		ds.on('beforeload', function() {
																			 ds.baseParams = {
																			 	typeid : null,
																		        title : null
																			 };
																		 });
																		ds.load();
													 		bulletinMain.cardpanel.getLayout().setActiveItem(0);
												}else{
														Ext.Msg.show({
																title : '提示',
																msg : 'error',
																width : 170,
																buttons : Ext.Msg.OK,
																icon : Ext.Msg.ERROR
															});
												}
												bulletionFromPanel.isUpdate = false;
												Ext.getCmp('news_textfield').setValue("");
												FCKeditorAPI.GetInstance("dictContent").SetHTML("");
												Ext.getCmp("bulletinGridPanel").selModel.clearSelections();
									});
								}
					    }else{
								if(formPanel.getForm().isValid()){
								var vo = Seam.Remoting.createType("com.luck.itumserv.bulletin.NoticesVo");
								Ext.apply(vo, formPanel.getForm().getValues());
								var content=FCKeditorAPI.GetInstance("dictContent");
								vo.content=content.GetXHTML(true);
								if(vo.content==""){
									Ext.Msg.alert("提示","公告内容不能为空!");
									return;
								}
								Ext.getBody().mask("正在保存公告，请稍后...","x-mask-loading");
								Ext.getCmp('save').setDisabled(true);
								callSeam("notices_noticessvr",
											"noticeAdd", [vo], function(result) {
												Ext.getBody().unmask();
												var obj = Ext.util.JSON.decode(result);
												Ext.getCmp('save').setDisabled(false);
												if(true==obj.success){
														Ext.example.msg(
													"" + getResource('resourceParam575')
															+ "",
													"" + getResource('resourceParam1072')
															+ "");
															//bug:gaoyn 879 2011-5-26 16:23
													 		var ds = Ext.getCmp("bulletinGridPanel").getStore();
													 		ds.on('beforeload', function() {
																			 ds.baseParams = {
																			 	typeid : null,
																		        title : null
																			 };
																		 });
																		ds.load();
													 		bulletinMain.cardpanel.getLayout().setActiveItem(0);
												}else{
														Ext.Msg.show({
																title : '提示',
																msg : 'error',
																width : 170,
																buttons : Ext.Msg.OK,
																icon : Ext.Msg.ERROR
															});
												}
												Ext.getCmp('news_textfield').setValue("");
												FCKeditorAPI.GetInstance("dictContent").SetHTML("");
												
											});
							}
			     		}
					}
				
				}},{text:'返回',handler:function(){
					   if(formPanel.getForm().getValues()){
					   		Ext.getCmp('news_textfield').setValue("");
					   	    FCKeditorAPI.GetInstance("dictContent").SetHTML("");
					   }
					   bulletinMain.cardpanel.getLayout().setActiveItem(0);
				}}]
		});
		return formPanel;
	}
};

/**
 * 公告更新
 * @return {Boolean}
 */
bulletionFormUpdate.init = function() {
	myGrid.row = Ext.getCmp('bulletinGridPanel').selModel.getSelected();
	if (myGrid.row == null || bulletinGrid.rows.length != 1) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam1505') + '!',
					buttons : Ext.MessageBox.OK,
					width : 250,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	bulletionFromPanel.isUpdate = true;
	if(myGrid.row.get('isarchived') == 1){//判断已发布的公告
		Ext.MessageBox.confirm("信息提示","您选择的公告已发布，如果修改将自动取消发布，是否进行修改？",function(btn){
		     if(btn == 'yes'){
		     	    var appId = myGrid.row.get('id');
		     	    callSeam("notices_noticessvr", "NoticeSend", [appId],function(result){
								var sign = result;
								if (sign == "true") {
								   bulletinMain.setActiveItem(1,myGrid.row);
								} else {
									Ext.MessageBox.show({
												title : getResource('resourceParam651') + '',
												msg : sign,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											})
								}
		     	    });
		     		
		     }
		}).getDialog().setWidth(300);
	}else{
		bulletinMain.setActiveItem(1,myGrid.row);
	}
	
}
