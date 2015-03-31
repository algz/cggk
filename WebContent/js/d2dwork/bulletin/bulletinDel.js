var bulletinDel = {
	win : null
};

bulletinDel.init = function(btn, pressed) {
	var userId = bulletinGrid.loginId
	myGrid.row = Ext.getCmp('bulletinGridPanel').selModel.getSelected();
	if (myGrid.row == null || bulletinGrid.rows.length == 0) {
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam7124') + '',
					buttons : Ext.MessageBox.OK,
					width : 250,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var ids = '';
	var authorIds = '';
	var noticeTitles = '';
	var pubTimes = '';
	var userId = '';
	for (i = 0; i < bulletinGrid.rows.length; i++) {
		//bug:667
		//gaoyn 2011-5-23 16:44
		//只能对未发布的信息进行删除的操作
		userId = bulletinGrid.rows[i].get('userId');
		if(userId == null || userId != 3) {
			if (bulletinGrid.rows[i].get('isarchived') == 1) {
				Ext.MessageBox.show({
							title : getResource('resourceParam663') + '',
							msg : getResource('resourceParam9798') + '',
							width : 300,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
				return false;
			} 
		}
		
		if (i != bulletinGrid.rows.length - 1) {
			ids += bulletinGrid.rows[i].get('id') + ",";
			authorIds += bulletinGrid.rows[i].get('author') + ",";
			noticeTitles += bulletinGrid.rows[i].get('title') + ",";
			pubTimes += bulletinGrid.rows[i].get('pbudatestr') + ",";
		} else {
			ids += bulletinGrid.rows[i].get('id');
			authorIds += bulletinGrid.rows[i].get('author') + ",";
			noticeTitles += bulletinGrid.rows[i].get('title') + ",";
			pubTimes += bulletinGrid.rows[i].get('pbudatestr') + ",";
		}
	}
	// text : 1724--警告 9020--的 9021--无法恢复 9019--继续
//	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724') + '',
//			getResource('resourceParam475') + ''
//					+ getResource('resourceParam9020') + ''
//					+ getResource('resourceParam734') + ''
//					+ getResource('resourceParam508') + ''
//					+ getResource('resourceParam9021') + '，'
//					+ getResource('resourceParam512') + ''
//					+ getResource('resourceParam510') + ''
//					+ getResource('resourceParam9019') + '?', function(btn,
//					text) {
//				if (btn == 'yes') {
//					if(userId == '3') {
//						bulletinDelAs(ids, authorIds, noticeTitles, pubTimes)
//					} else {
//						var appId = ids;
//						callSeam("notices_noticessvr", "noticeDel", [appId], bulletinDel.delreturn);
//					}
//				}
//			}).getDialog().setWidth(300);
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
	//				labelStyle : 'padding : 0px 0px 0px 10px',
			labelStyle : 'padding:5px 0px 5px 0px',
			allowBlank : false
		}
	);
	var delReaForm = new Ext.FormPanel({
			frame : true,
			autoWidth : true,
			autoHeight : true,
			items : [{id : 'alertMsg',
					  html : '<font color="red" size=3>删除的公告信息无法恢复！</font>'},
			         desRea]
		}
	);
	bulletinDelAs = function(nIds, authorIds, noticeTitles, pubTimes) {
		bulletinDel.win = new Ext.Window({
				title : '删除原因',
				height : 210,
				width : 400,
				frame : true,
				layout : 'fit',
				closable : true,
				plain : true,
				floating : true,
				items : [delReaForm],
				modal : true, //模态 只显示当前的窗口，把下面的用幕布遮起来，不能操作
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
//									msg : '消息长度不能超过300个字符！',
//									width : 200,
//									buttons : Ext.Msg.OK,
//									icon : Ext.Msg.ERROR
//								});
								return ;
							}
							if (delReaForm.form.isValid()) {
								var url = "../JSON/notices_noticessvr.delBulAs";
								Ext.Ajax.request({
										url : url,
										method : 'POST',
										params : {
											noticeIds : nIds,
											authorIds : authorIds,
											content : reaMsg,
											noticeTitles : noticeTitles,
											pubTimes : pubTimes
										},
										success : function(response, options) {
											Ext.Msg.show({
												title : '提示',
												width : 300,
												msg : '消息发送成功！公告删除成功！',
												width : 200,
												buttons : Ext.Msg.OK
											});
											bulletinDel.win.close();
											bulletinMain.baseargs = {};
											myGrid.loadvalue(Ext.getCmp('bulletinGridPanel').store, {
													start : 0,
													limit : 25
												}, {});
										},
										failure : function(response, options) {
											Ext.MessageBox.show({
												title : '提示',
												width : 200,
												msg : '' + "消息发送失败！公告删除失败！" + '',
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
							bulletinDel.win.close();
						}
					}
				]
			});
		bulletinDel.win.show();
	}
	/**删除原因 —— 结束**/
	
	if(userId == '3') {
		bulletinDelAs(ids, authorIds, noticeTitles, pubTimes)
	} else {
		var appId = ids;
		Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam636')+'',function(btn, text){
	    //bug：666
		//gaoyn 2011-5-23 14:44
		//删除前加提示框	
	    if(btn == 'yes'){
			 callSeam("notices_noticessvr", "noticeDel", [appId], bulletinDel.delreturn);
	    	}
		}
		);
	}
}

bulletinDel.delreturn = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.MessageBox.show({
			title : '操作成功',
			msg : '公告删除成功！',
			buttons : Ext.MessageBox.OK
		})
	} else {
		Ext.MessageBox.show({
					title : getResource('resourceParam651') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				})
	}
	bulletinMain.baseargs = {};
	var ds = Ext.getCmp("bulletinGridPanel").getStore();
 		ds.on('beforeload', function() {
			 ds.baseParams = {
			 	typeid : null,
		        title : null
			 };
		 });
		ds.load();
}