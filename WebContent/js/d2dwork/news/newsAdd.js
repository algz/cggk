var newsFormUpdate = {
	issueDialog : null,
	form : null,
	temp : null,
	typeid : null,
	oFCKeditor : null
	
}
var newsFromPanel = {
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
			 	{xtype : 'textfield',id:'news_textfield',fieldLabel:'新闻名称',name:'title',maxLength:50,maxLengthText:'最大50个字符',style : 'margin-bottom:5px;',
			 	regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
				regexText : ''+getResource('resourceParam1092')+'！',
			 	anchor:'80%',allowBlank:false,invalidText:'名称不能为空'},
				{xtype:'label',fieldLabel:'新闻内容'},{id:'richEditor'}
				],
				
				buttons:[{id:'savenews', text:'保存',disabled:false , handler:function(){
					//bug:812  防止重复提交的 
					//gaoyn 2011-5-24
					
					if(Ext.getCmp('savenews').disabled==false){
								
							   
								if(newsFromPanel.isUpdate){
							    	if (formPanel.getForm().isValid()) {
							    			 
							    		
							    			//gaoyn bug 1205 修改时不允许内容为空
											var appVo = Seam.Remoting.createType("com.luck.itumserv.news.NewsVo");
											appVo.setNewsid(myGrid.row.get("newsid"));
											Ext.apply(appVo, formPanel.getForm().getValues());
											var content=FCKeditorAPI.GetInstance("dictContent");
											appVo.content=content.GetXHTML(true);
											if(appVo.content==""){
											Ext.Msg.alert("提示","新闻内容不能为空!");
											return;
										 }
											Ext.getBody().mask("正在保存新闻，请稍后...","x-mask-loading");
											Ext.getCmp('savenews').setDisabled (true);
											callSeam("news_newssvr", "newsUpdate", [appVo],
													function(result){
														Ext.getBody().unmask();
														Ext.getCmp('savenews').setDisabled (false);
														var obj = Ext.util.JSON.decode(result);
														if(true==obj.success){
																Ext.example.msg(
															"" + getResource('resourceParam575')
																	+ "",
															"" + getResource('resourceParam1072')
																	+ "");
																	newsMain.cardpanel.getLayout().setActiveItem(0);
															 		var ds = Ext.getCmp("fileGridPanel").getStore();
																 		ds.on('beforeload', function() {
																			 ds.baseParams = {
																			 	typeid : null,
																		        title : null
																			 };
																		 });
																		ds.load();
														}else{
																Ext.Msg.show({
																		title : '提示',
																		msg : 'error',
																		width : 170,
																		buttons : Ext.Msg.OK,
																		icon : Ext.Msg.ERROR
																	});
														}
														newsFromPanel.isUpdate = false;
														Ext.getCmp('news_textfield').setValue("");
														FCKeditorAPI.GetInstance("dictContent").SetHTML("");
														Ext.getCmp("fileGridPanel").selModel.clearSelections();
														
											});
										}
							    }else{
										if(formPanel.getForm().isValid()){
										
										var vo = Seam.Remoting.createType("com.luck.itumserv.news.NewsVo");
										Ext.apply(vo, formPanel.getForm().getValues());
										var content=FCKeditorAPI.GetInstance("dictContent");
										vo.content=content.GetXHTML(true);
										if(vo.content==""){
											Ext.Msg.alert("提示","新闻内容不能为空!");
											return;
										}
										Ext.getBody().mask("正在保存新闻，请稍后...","x-mask-loading");
										Ext.getCmp('savenews').setDisabled (true); 
											callSeam("news_newssvr",
														"newsAdd", [vo], function(result) {
															Ext.getBody().unmask();
															Ext.getCmp('savenews').setDisabled (false);
															var obj = Ext.util.JSON.decode(result);
															if(true==obj.success){
																	Ext.example.msg(
																"" + getResource('resourceParam575')
																		+ "",
																"" + getResource('resourceParam1072')
																		+ "");
																		newsMain.cardpanel.getLayout().setActiveItem(0);
																 		var ds = Ext.getCmp("fileGridPanel").getStore();
																 		ds.on('beforeload', function() {
																			 ds.baseParams = {
																			 	typeid : null,
																		        title : null
																			 };
																		 });
																		ds.load();
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
//					   Ext.getCmp('fileGridPanel').show();
//					   Ext.getCmp('news_form_panel').hide();
					   newsMain.cardpanel.getLayout().setActiveItem(0);
				}}]
		});
		return formPanel;
	}
};

/**
 * 新闻更新
 * @return {Boolean}
 */
newsFormUpdate.init = function() {
	myGrid.row = Ext.getCmp('fileGridPanel').selModel.getSelected();
	if (myGrid.row == null || newsGrid.rows.length != 1) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam9185') + '!',
					buttons : Ext.MessageBox.OK,
					width : 250,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	newsFromPanel.isUpdate = true;
	if(myGrid.row.get('isarchived') == 1){//判断已发布的新闻
		Ext.MessageBox.confirm("信息提示","您选择的新闻已发布，如果修改将自动取消发布，是否进行修改？",function(btn){
		     if(btn == 'yes'){
		     	    var appId = myGrid.row.get('newsid');
		     	    callSeam("news_newssvr", "newsSend", [appId],function(result){
								var sign = result;
								if (sign == "true") {
								   newsMain.setActiveItem(1,myGrid.row);
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
		newsMain.setActiveItem(1,myGrid.row);
	}
	
}