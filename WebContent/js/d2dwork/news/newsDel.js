// 删除按钮操作对象
var newsDel = {
	win : null,
	result : null
};

// 删除操作对象的实例化
newsDel.init = function(btn, pressed) {
	var userId = newsGrid.loginId
	if (Ext.getCmp('fileGridPanel').selModel.getSelected() == null || newsGrid.rows.length == 0) {
			Ext.MessageBox.show( {
				title : getResource('resourceParam663') + '',
				msg : getResource('resourceParam7124') + '',
				width : 250,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
			return false;
	}
	var ids='';
	var authorIds = '';
	var titles = '';
	var times = '';
	var userId = '';
	for(i=0;i<newsGrid.rows.length;i++) {
		//bug:667
		//gaoyn 2011-5-23 16:44
		//只能对未发布的信息进行删除的操作
		userId = newsGrid.rows[i].get('userId');
		if(userId == null || userId != 3) {
			if (newsGrid.rows[i].get('isarchived') == 1) {
				Ext.MessageBox.show( {
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam9798') + '',
					width : 300,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
				return false;
			}
		}
		if(i!=newsGrid.rows.length-1) {
			ids+=newsGrid.rows[i].get('newsid')+",";
			authorIds += newsGrid.rows[i].get('author') + ",";
			titles += newsGrid.rows[i].get('title') + ",";
			times += newsGrid.rows[i].get('pbudatestr') + ",";
		} else {
			ids+=newsGrid.rows[i].get('newsid');
			authorIds += newsGrid.rows[i].get('author') + ",";
			titles += newsGrid.rows[i].get('title') + ",";
			times += newsGrid.rows[i].get('pbudatestr') + ",";
		}
	}
//	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724'), 
//									   getResource('resourceParam1500'),
//									   function(btn, text) {
//											if (btn == 'yes') {
//												if(userId == '3') {
//													var newsId = ids;
//													newsDelAs(newsId, authorIds);
//												} else {
//													var appId = ids;
//													callSeam("news_newssvr", "newsDel", [ appId], newsDel.delreturn);
//												}
//											} 
//									   }).getDialog().setWidth(300);
	/**删除原因 —— 开始**/						   
	var desRea = new Ext.form.TextArea({
			id : 'content',
			name : 'content',
			height : 110,
			width : 250,
			fieldLabel : '删除原因',
			emptyText  : '请填写删除原因...',
			blankText : '删除原因不能为空！',
			invalidText : '删除原因不能为空！',
			xtype : 'textfield',
			preventScrollbars : false,
			/**
			 * bug编号733 wangyf
			 * bug信息：用sa用户登录删除新闻时，当光标定位到删除原因编辑框后，查看编辑框向左移动
			 * 2011-05-19 18：00
			 */
//			style : 'margin:3px 0px 0px 8px',
//			labelStyle : 'padding : 0px 0px 0px 10px',
			labelStyle : 'padding:5px 0px 5px 0px',
			allowBlank : false
		}
	);
	var delReaForm = new Ext.FormPanel({
			frame : true,
			autoWidth : true,
			autoHeight : true,
			items : [{id : 'alertMsg',
					  html : '<font color="red" size=3>删除的新闻信息无法恢复！</font>'},
					  desRea]
		}
	);
	newsDelAs = function(nIds, authorIds) {
			newsDel.win = new Ext.Window({
				title : '删除原因',
				height : 210,
				width : 400,
				frame : true,
				layout : 'fit',
				closable : true,
				plain : true,
				floating : true,
				modal : true, //模态 只显示当前的窗口，把下面的用幕布遮起来，不能操作
				items : [delReaForm],
				buttons : [
					{
						text : '发送',
						handler : function() {
							var reaMsg = Ext.getCmp('content').getValue();
							if(reaMsg.length <= 0 || reaMsg == null || reaMsg == '') {
								Ext.Msg.show({
									title : '提示',
									msg : '删除原因不能为空！',
									width : 200,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.WARNING
								});
								return ;
							}
							if(reaMsg.length > 300) {
								Ext.example.msg('提示', '删除原因长度不能超过300个字符！');
//								Ext.Msg.show({
//									title : '提示',
//									msg : '删除原因长度不能超过300个字符！',
//									width : 200,
//									buttons : Ext.Msg.OK,
//									icon : Ext.Msg.ERROR
//								});
								return ;
							}
							if (delReaForm.form.isValid()) {
								var url = "../JSON/news_newssvr.newSDelASend";
								Ext.Ajax.request({
										url : url,
										method : 'POST',
										params : {
											newsIds : nIds,
											authorIds : authorIds,
											content : reaMsg,
											titles : titles,
											times : times
										},
										success : function(response, options) {
											Ext.Msg.show({
												title : '提示',
												width : 300,
												msg : '消息发送成功！新闻删除成功！',
												width : 200,
												buttons : Ext.Msg.OK
											});
											newsDel.win.close();
											var ds = Ext.getCmp('fileGridPanel').getStore();
											ds.on('beforeload', function() {
													 ds.baseParams = {
													 	typeid : null,
												        title : null,
												        start : 0,
												    	limit : 25
													 };
												 });
											ds.load();
//											newsMain.newsGridList.getStore().reload();
//											Ext.getCmp('fileGridPanel').store.reload();
										},
										failure : function(response, options) {
											Ext.MessageBox.show({
												title : '提示',
												width : 200,
												msg : '' + "消息发送失败！新闻删除失败！" + '',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
										}
									}
								);
							}
						}
					},
					{
						text : '取消',
						handler : function() {
							newsDel.win.close();
						}
					}
				]
			});
			newsDel.win.show();
	}
	/**删除原因 —— 结束**/	
	if(userId == '3') {
		var newsId = ids;
		newsDelAs(newsId, authorIds);
	} else {
		var appId = ids;
		 //bug：666
		//gaoyn 2011-5-23 14:44
		//删除前加提示框	
		Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
	    	callSeam("news_newssvr", "newsDel", [ appId], newsDel.delreturn); 
	    }
	})	
		
	}
}


// 删除操作的回调函数
newsDel.delreturn = function(result) {
	result = "true";
	var sign = result;
	if (sign == "true") {
		myGrid.row = null;
		Ext.MessageBox.show({
			title : '操作成功',
			msg : '新闻删除成功！',
			buttons : Ext.MessageBox.OK
		})
	} else {
		Ext.MessageBox.show( {
			title : getResource('resourceParam651') + '',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	newsMain.baseargs = {};
	var ds = Ext.getCmp('fileGridPanel').getStore();
					ds.on('beforeload', function() {
							 ds.baseParams = {
							 	typeid : null,
						        title : null
							 };
						 });
					ds.load();
}
