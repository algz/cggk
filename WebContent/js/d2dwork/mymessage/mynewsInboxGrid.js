Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var mynewsInboxGrid={sm:null,setcm1:null,cm:null,grid:null}
mynewsInboxGrid.init=function()
{
	
	
	var strurl = "";
	mynewsInboxGrid.proxy = new Ext.data.HttpProxy({
				url :'../../JSON/messagereceive_MessageReceiveRemote.myNewsInbox?a='+new Date(),
				method : 'GET'
			});
	
			
	mynewsInboxGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'messagereceiverid'
			}, 
			[
			  'messagereceiverid','messageid','messagetitle',
					'messagebody', 'messagedate', 'userid', 'username','truename',
					'messagereceiver', 'receivestatus', 'participatemode']);

	var ds = new Ext.data.Store({
				proxy : mynewsInboxGrid.proxy,
				reader : mynewsInboxGrid.reader
			});

	mynewsInboxGrid.setcm1();
	var replyBt = {
		text : ''+getResource('resourceParam1415')+'',
		// iconCls : 'add1',
		handler : function() {
			var str = mymessageMain.selectCode() + '';
			if (str.indexOf(',') != -1) {
				Ext.MessageBox.show({
							title : ''+getResource('resourceParam1074')+'',
							msg : ''+getResource('resourceParam1410')+'',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			/**
			 * gaoyn
			 * bug：639
			 * 2011-5-17 15:56
			 */
			if (Ext.isEmpty(str) ||str =='undefined') {
				Ext.MessageBox.show({
							title : ''+getResource('resourceParam1074')+'',
							msg : ''+getResource('resourceParam1413')+'',
							buttons : Ext.MessageBox.OK,
							width:255,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			
			var appVo = Seam.Remoting
					.createType("com.luck.itumserv.message.messagereceive.MessageInBoxNewsVo");
			appVo.setMessagereceiverid(mymessageMain.selectCode());
			Seam.Component.getInstance("messagereceive_MessageReceiveRemote")
					.getMessageOutBoxNew(appVo, function(reslut) {
						mymessageSendBox.form.get('messagetitle').setValue('Re:'+ reslut.messagetitle);
						var msgBody = '<br><br><br>'
									+ new Date().dateFormat('Y-m-d')
									+ '<br>-------------------------------------------------<br>'
									+ getResource('resourceParam5022')+'：' + reslut.messagebody;//原文
						mymessageSendBox.form.get('messagebody').setValue(msgBody);
						Ext.fly("userid").dom.value=reslut.userid;
                        Ext.fly("btnuUsers").dom.value=reslut.truename;
					});
			mymessageMain.tabpanel.setActiveTab(2);
		}
	};
	var transmitBt = {
		text : ''+getResource('resourceParam1238')+'',
		// iconCls : 'add1',
		handler : function() {
			var str = '' + mymessageMain.selectCode();
			if (str.indexOf(',') != -1) {
				Ext.MessageBox.show({
							title : ''+getResource('resourceParam1074')+'',
							msg : ''+getResource('resourceParam1411')+'',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			if (Ext.isEmpty(str)|| str === 'undefined') {
				Ext.MessageBox.show({
							title : ''+getResource('resourceParam1074')+'',
							msg : ''+getResource('resourceParam1413')+'',
							buttons : Ext.MessageBox.OK,
							width:255,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			var appVo = Seam.Remoting
					.createType("com.luck.itumserv.message.messagereceive.MessageInBoxNewsVo");
			appVo.setMessagereceiverid(mymessageMain.selectCode());
			Seam.Component.getInstance("messagereceive_MessageReceiveRemote")
					.getMessageOutBoxNew(appVo, function(reslut) {
						mymessageSendBox.form.get('messagetitle').setValue('Fw:'+ reslut.messagetitle);
						var msgBody = '<br><br><br>'
									+ new Date().dateFormat('Y-m-d')
									+ '<br>-------------------------------------------------<br>'
									+ getResource('resourceParam5022')+'：' + reslut.messagebody;//原文
						mymessageSendBox.form.get('messagebody').setValue(msgBody);
				});
			mymessageMain.tabpanel.setActiveTab(2);
		}
	};
	var delBt = {
		text : ''+getResource('resourceParam475')+'',
		// iconCls : 'add1',
		handler : function() {
			mymessageMain.deleteMessage();
            myGrid.rows = null;
            mynewsInboxGrid.getSelectionModel().clearSelections();
		}
	};
	var viewBt = {
		text : ''+getResource('resourceParam576')+'',
		// iconCls : 'add1',
		handler : function() {
            
			var str = mymessageMain.selectCode() + '';
            
			if (str.indexOf(',') != -1) {
				Ext.MessageBox.show({
							title : ''+getResource('resourceParam1074')+'',
							msg : ''+getResource('resourceParam1412')+'',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			if (Ext.isEmpty(str) ||  str === 'undefined') {
				Ext.MessageBox.show({
							title : ''+getResource('resourceParam1074')+'',
							msg : ''+getResource('resourceParam1413')+'',
							buttons : Ext.MessageBox.OK,
							width:255,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			mynewsInboxDetails.init(mymessageMain.selectCode());
		}
	};
	var tb = [replyBt, transmitBt, delBt, viewBt];
	grid = myGrid.initBox(ds, mynewsInboxGrid.cm, tb, mynewsInboxGrid.sm, null);
	return grid;
	

	
	
}

//mynewsInboxGrid.inboxpanel=function()
//{
//    mynewsInboxGrid.inboxpanels=new Ext.Panel({
//       title:'详细',
//       layout:'fit',
//       items:[mynewsInboxGrid.init()]
//    });
//	return mynewsInboxGrid.inboxpanel;
//}

mynewsInboxGrid.setcm1 = function() {
	
	mynewsInboxGrid.sm = new Ext.grid.CheckboxSelectionModel();
	mynewsInboxGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
	        new Ext.grid.RowNumberer(),
			mynewsInboxGrid.sm, {
				header : ""+getResource('resourceParam1414')+"",
				width : 20,
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					var str = record.data.receivestatus;
					if (str == "1")// 未读的消息
					{
						return ""+getResource('resourceParam510')+"";
					} else {
						return ""+getResource('resourceParam512')+"";
					}
				}
			}, {
				header : ""+getResource('resourceParam1409')+"",
				width : 30,
				dataIndex : 'truename'
			}, {
				header : ""+getResource('resourceParam476')+"",
				width : 110,
				dataIndex : 'messagetitle',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					var str = record.data.receivestatus;
					if (str == "1")// 未读的消息
					{
						return "<a href='javascript:void(0);' onclick='mynewsInboxDetails.init(&quot;"
								+ record.data.messagereceiverid
								+ "&quot;);'><span style='font-weight:bold;'>"
								+ record.data.messagetitle + "</span></a>";
					} else {
						return "<a href='javascript:void(0);' onclick='mynewsInboxDetails.init(&quot;"
								+ record.data.messagereceiverid
								+ "&quot;);'>"
								+ record.data.messagetitle + "</a>";
					}
				}
			}, {
				header : ""+getResource('resourceParam988')+"",
				dataIndex : 'messagedate',
				width : 40
			}]
	});

}
