var mynewsInboxDetails={}
mynewsInboxDetails.init=function(messagereceiverid)
{
   
	var appVo = Seam.Remoting
			.createType("com.luck.itumserv.message.messagereceive.MessageInBoxNewsVo");
	appVo.setMessagereceiverid(messagereceiverid);
	Seam.Component.getInstance("messagereceive_MessageReceiveRemote")
			.getMessageOutBoxNew(appVo, function(reslut) {
				mynewsInboxDetails.form = new Ext.FormPanel({
					labelWidth : 60, // label settings here cascade unless
                    autoScroll : true,
					// overridden
					frame : false,
					plain : false,
					bodyStyle : 'padding:5px 5px 0;background:transparent;',
					defaultType : 'textfield',
					items : [{
						fieldLabel : ''+getResource('resourceParam504')+'', // 文本框
						name : 'messagetitlei',
						id : 'messagetitlei',
						anchor : '95%',
						disabled :true,
						value : reslut.messagetitle
					}, {
						fieldLabel : ''+getResource('resourceParam1409')+'', // 文本框
						name : 'usernamei',
						id : 'usernamei',
						anchor : '95%',
						disabled :true,
						value : reslut.truename
					}, {
						fieldLabel : ''+getResource('resourceParam1120')+'', // 文本框
						name : 'messagedatei',
						id : 'messagedatei',
						anchor : '95%',
						disabled :true,
						value : reslut.messagedate
					},{
						fieldLabel : getResource('resourceParam5021'),
						xtype:'htmleditor',
					    enableColors:true,
					    enableAlignments:true,
					   	id : 'messagebodyi',
						name : 'messagebodyi',
						value : reslut.messagebody,
						anchor : '95%'
					},{
					 xtype:'panel', 
					 bodyStyle : 'padding:0px 0px 0;background:transparent;border:0',
					 html: ''+getResource('resourceParam604')+'：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
					 		reslut.filenames 
					}],
                    buttons:[{
                        text : getResource('resourceParam506'),
                        handler : function() {
                            mynewsInboxDetails.issueDialog.hide();
                        }
                    }]
                    
                    
				});

					tlework.addHtml(tlework.divHtml, 'mynewsInboxDetailsi'); // 动态生成需要绑定的div
					mynewsInboxDetails.issueDialog = new Ext.Window({ // 创建对话框
						el : 'mynewsInboxDetailsi',
						title : ''+getResource('resourceParam857')+'',
						modal : true,
						layout : 'fit',
						width : 700,
						height : 490,
						closeAction : 'hide',
						plain : false,
						items : [mynewsInboxDetails.form]
							// 将面板绑定到对话框
					});
					mynewsInboxDetails.issueDialog.show();

			});
}
