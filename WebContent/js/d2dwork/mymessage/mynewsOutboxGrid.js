Ext.BLANK_IMAGE_URL = '../../lib/ext/resources/images/default/s.gif';
var mynewsOutboxGrid = {}
mynewsOutboxGrid.init = function() {
	var strurl = "";
	mynewsOutboxGrid.proxy = new Ext.data.HttpProxy({
				url : '../../JSON/messagereceive_MessageReceiveRemote.myNewsOutBox?a='
						+ new Date(),
				method : 'GET'
			});

	mynewsOutboxGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'messageid'
			}, ['messagereceiverid', 'messageid', 'messagetitle',
					'messagebody', 'messagedate', 'userid', 'username',
					'truename', 'messagereceiver', 'receivestatus',
					'participatemode', 'publishmode']);

	var ds = new Ext.data.Store({
				proxy : mynewsOutboxGrid.proxy,
				reader : mynewsOutboxGrid.reader
			});

	mynewsOutboxGrid.setcm1();

	var newMsgBt = {
		text : '' + getResource('resourceParam1424') + '',
		// iconCls : 'add1',
		handler : function() {
			mymessageMain.tabpanel.setActiveTab(2);
		}
	};
	var delBt = {
		text : '' + getResource('resourceParam475') + '',
		// iconCls : 'add1',
		handler : function() {
			mymessageMain.deleteMessage();
		}
	};
	var viewBt = {
		text : '' + getResource('resourceParam576') + '',
		// iconCls : 'add1',
		handler : function() {
			var str = mymessageMain.selectCode() + '';
			/**
			 * bug编号493 wangyf
			 * bug信息：在发件箱子页，直接点击查看按钮，系统提示请等待。
			 * 2011-05-16 13：11
			 */
			if(str === "undefined") {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam1074') + '',
					msg : '' + getResource('resourceParam1413') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				}).getDialog().setWidth(220);
				return;
			}
			if (str.indexOf(',') != -1) {
				Ext.MessageBox.show({
							title : '' + getResource('resourceParam1074') + '',
							msg : '' + getResource('resourceParam1412') + '',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			if (Ext.isEmpty(str)) {
				Ext.MessageBox.show({
							title : '' + getResource('resourceParam1074') + '',
							msg : '' + getResource('resourceParam1413') + '',
							buttons : Ext.MessageBox.OK,
							width:255,
							icon : Ext.MessageBox.ERROR
						});
				return;
			}
			mynewsOutboxDetails.init(mymessageMain.selectCode());
		}
	};

	var sendBt = {
		text : '' + getResource('resourceParam605') + '',
		// iconCls : 'add1',
		handler : function() {
            var str = mymessageMain.selectCode() + '';
            if (Ext.isEmpty(str)) {
                Ext.Msg.alert(getResource("resourceParam587"),getResource("resourceParam9148"));
                return;
            }
            if(myGrid.rows != null)
            {
               var f=0; 
               for(var i=0;i<myGrid.rows.length;i++)
               {
                  if(myGrid.rows[i].data.publishmode != 5)
                  {
                     f=1;
                     break;
                  }
               }
               if(f == 1)
               {
                 Ext.Msg.alert(getResource('resourceParam508'),getResource('resourceParam9148'));
                 return;
               }
                var result = new Array();
                var size=myGrid.rows.length;
                for(var i=0;i<size;i++)
                {
                    result[i]=myGrid.rows[i].id;
                }
                var appVo=Seam.Remoting
                            .createType("com.luck.itumserv.message.messageuser.MessageUserVo");
                    appVo.setMessageids(result);
                Seam.Component.getInstance("messageuser_MessageUserRemote")
               .publishMessage(appVo, function(reslut) {
                   if(reslut == true)
                   {
                     Ext.Msg.alert(getResource("resourceParam587"),getResource("resourceParam597"));
                   }else
                   {
                     Ext.Msg.alert(getResource("resourceParam587"),getResource("resourceParam1127"));
                   }
                myGrid.rows = null;
                myGrid.loadvalue(mymessageMain.outboxgrid.store, {
                            start : 0,
                            limit : 25
                        }, mymessageMain.baseargs);
                mymessageMain.outboxgrid.getSelectionModel().clearSelections();
               });
            }else
            {
            
                Ext.Msg.alert(getResource("resourceParam587"),getResource("resourceParam9148"));
            }
		}
	};
    // '->'
	var tb = [newMsgBt, delBt, viewBt, sendBt];
	var grid = myGrid.initBox(ds, mynewsOutboxGrid.cm, tb, mynewsOutboxGrid.sm,
			null);
	return grid;
}

mynewsOutboxGrid.setcm1 = function() {

	mynewsOutboxGrid.sm = new Ext.grid.CheckboxSelectionModel();
	mynewsOutboxGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(),
			mynewsOutboxGrid.sm, {
				header : "" + getResource('resourceParam850') + "",
				width : 30,
				dataIndex : 'publishmode',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					var d = record.data.publishmode;
					if (d == 5) {
						return '' + getResource('resourceParam1267') + '';
					} else {
						return '' + getResource('resourceParam1266') + '';
					}
				}
			}, {
				header : "" + getResource('resourceParam1423') + "",
				width : 30,
				dataIndex : 'truename'
			}, {
				header : "" + getResource('resourceParam476') + "",
				width : 110,
				dataIndex : 'messagetitle',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {

					return "<a href='javascript:mynewsOutboxDetails.init(&quot;"
							+ record.data.messageid
							+ "&quot;);'>"
							+ record.data.messagetitle + "</a>";
				}
			}, {
				header : "" + getResource('resourceParam988') + "",
				dataIndex : 'messagedate',
				width : 40
			}]
	});

}
