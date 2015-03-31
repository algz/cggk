var mymessageMain = {
	baseargs : null,
	tabpanel : null
}
mymessageMain.init = function(tapid) {
	Ext.QuickTips.init();
	mymessageMain.inboxgrid = mynewsInboxGrid.init();
	mymessageMain.outboxgrid = mynewsOutboxGrid.init();
	mymessageMain.sendboxfrom = mymessageSendBox.init();
	mymessageMain.egridpanel1 = new Ext.Panel({
				id : 'netabpanel1',
				layout : 'fit',
				height : 475,
				// autoHeight:true,
				title : '' + getResource('resourceParam1420') + '',
				items : [mymessageMain.inboxgrid]
			});

	mymessageMain.egridpanel2 = new Ext.Panel({
				id : 'netabpanel2',
				layout : 'fit',
				height : 475,
				// autoHeight:true,
				title : '' + getResource('resourceParam1421') + '',
				items : [mymessageMain.outboxgrid]
			});

	mymessageMain.egridpanel3 = new Ext.Panel({
				id : 'netabpanel3',
				layout : 'fit',
				height : 475,
				// autoHeight:true,
				title : '' + getResource('resourceParam1419') + '',
				items : [mymessageMain.sendboxfrom]
//				listeners : {
//					'activate' : function(p) {
////                        this.add(mymessageMain.sendboxfrom);
////                        this.doLayout();
////						var a = document.getElementsByTagName("input");
////						for (var i = 0; i < a.length; i++) {
////							if (a[i].type == 'file') {
////								document.getElementById(a[i].id).focus();
////                                clearUploadFile.clear(a[i].name);
////							}
////						}
//                        mymessageSendBox.form.form.reset();
//                        Ext.fly("tableFiles").dom.innerHTML='';
//                        Ext.fly("userid").dom.value='';
//                        Ext.fly("btnuUsers").dom.value='';
//					}
//				}
			});

	mymessageMain.tabpanel = new Ext.TabPanel({
				id : 'mymessageMaintabpanel',
				minTabWidth : 50,
				region : 'center',
				resizeTabs : true,
				activeItem : parseInt(tapid),
				items : [mymessageMain.egridpanel1, mymessageMain.egridpanel2,
						mymessageMain.egridpanel3]
			});

	var panel = new Ext.Panel({
				id : 'mymessageMainpanel',
				region : 'center',
				layout : 'fit',
				height : 500,
				items : [mymessageMain.tabpanel]
			}).show();

	panel.render("div_mynews");
	myGrid.loadvalue(mymessageMain.inboxgrid.store, {
				start : 0,
				limit : 25
			}, mymessageMain.baseargs);

	mymessageMain.egridpanel1.on('activate', function() {
                myGrid.rows = null;
				myGrid.loadvalue(mymessageMain.inboxgrid.store, {
							start : 0,
							limit : 25
						}, mymessageMain.baseargs);
                 mymessageMain.inboxgrid.getSelectionModel().clearSelections();
			});
	mymessageMain.egridpanel2.on('activate', function() {
               myGrid.rows = null;
				myGrid.loadvalue(mymessageMain.outboxgrid.store, {
							start : 0,
							limit : 25
						}, mymessageMain.baseargs);
                mymessageMain.outboxgrid.getSelectionModel().clearSelections();
			});

	// myGrid.loadvalue(mymessageMain.inboxgrid.store,{start:0,limit:25},mymessageMain.baseargs);
	// myGrid.loadvalue(mymessageMain.outboxgrid.store,{start:0,limit:25},mymessageMain.baseargs);
	mymessageMain.egridpanel3.on('activate', function() {
         mymessageSendBox.clearBtnuUsers();
				   mymessageSendBox.form.form.reset();
                        Ext.fly("userid").dom.value='';
                        Ext.fly("btnuUsers").dom.value='';
                        var m=Ext.fly("tableFiles").dom;
                        var len=m.rows.length;
                        for(var i=len-1;i>=0;i--)
                        {
                           m.deleteRow(i);
                        }
			});

	// 清空选中行
	mymessageMain.clear = function() {
		myGrid.rows = null;
		mynewsInboxGrid.getSelectionModel().clearSelections();
		mynewsOutboxGrid.getSelectionModel().clearSelections();
	}

	// 发件箱和收件箱信息删除
	mymessageMain.deleteMessage = function() {

		var re = mymessageMain.selectCode()
		if (re == "" || re == undefined) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',
						msg : '' + getResource('resourceParam1416') + '',
						buttons : Ext.MessageBox.OK,
						width:255,
						icon : Ext.MessageBox.INFO
					});
			return;
		}
		var appVo = Seam.Remoting
				.createType("com.luck.itumserv.message.messageuser.MessageUserVo");
		appVo.setMessageids(re);
		if (mymessageMain.tabpanel.layout.activeItem.id == "netabpanel1") {
			appVo.setDelbiaoji("1");
		} else if (mymessageMain.tabpanel.layout.activeItem.id == "netabpanel2") {
			appVo.setDelbiaoji("2");
		} else {
			return;
		}
		
		Ext.MessageBox.confirm('' + getResource('resourceParam1422') + '', ''+ getResource('resourceParam1417')+'', function(btn,text) {
					if (btn == 'yes') {
						Seam.Component
								.getInstance("messageuser_MessageUserRemote")
								.update(appVo, function(reslut) {
									if (reslut == "true") {
										myGrid.loadvalue(
												mymessageMain.inboxgrid.store,
												{
													start : 0,
													limit : 25
												}, mymessageMain.baseargs);
										myGrid.loadvalue(
												mymessageMain.outboxgrid.store,
												{
													start : 0,
													limit : 25
												}, mymessageMain.baseargs);
									} else {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											msg : ''
													+ getResource('resourceParam1418')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
								});
					}
				}).getDialog().setWidth(255);
	}

	// 选中的ID值
	mymessageMain.selectCode = function() {
		var result = new Array();
		if (myGrid.rows != null) {
			var size = myGrid.rows.length;
			for (var i = 0; i < size; i++) {
				var record = myGrid.rows[i].id;
				result[i] = record;
			}
			return result;
		}
	}

}
