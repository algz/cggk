var systemnewsDetails={issueDialog:null,form:null}
systemnewsDetails.init=function(messageid)
{
 var appVo = Seam.Remoting
			.createType("com.luck.itumserv.message.messagereceive.MessageInBoxNewsVo");
	appVo.setMessageid(messageid);
	Seam.Component.getInstance("messagesystem_MessageSystemRemote")
			.getMessageSystem(appVo, function(reslut) {
				systemnewsDetails.form = new Ext.FormPanel({
					labelWidth : 60, // label settings here cascade unless
					// overridden
					frame : false,
					plain : false,
					bodyStyle : 'padding:5px 5px 0;background:transparent;',
					defaultType : 'textfield',
					buttons : [{text : '关闭',handler:function(){ //@chenw 增加关闭按钮
						systemnewsDetails.issueDialog.close();
					}}],
					items : [{
						fieldLabel : ''+getResource('resourceParam504')+'', // 文本框
						name : 'messagetitle',
						id : 'messagetitle',
						anchor : '95%',
						disabled :true,
						value : reslut.messagetitle
					},{
						fieldLabel : ''+getResource('resourceParam1409')+'', // 文本框
						name : 'username',
						id : 'username',
						anchor : '95%',
						disabled :true,
						value : reslut.username
					},{
						fieldLabel : ''+getResource('resourceParam1120')+'', // 文本框
						name : 'messagedate',
						id : 'messagedate',
						anchor : '95%',
						disabled :true,
						value : reslut.messagedate
					},{
						fieldLabel : getResource('resourceParam5021'),//内容
						xtype:'textarea',
				     	id : 'messagebody',
						name : 'messagebody',
						value : reslut.messagebody,
						height : 100,
						disabled :true,
						anchor : '95%'
					}]
				});

				
					tlework.addHtml(tlework.divHtml, 'systemnewsDetails'); // 动态生成需要绑定的div
					systemnewsDetails.issueDialog = new Ext.Window({ // 创建对话框
						el : 'systemnewsDetails',
						title : ''+getResource('resourceParam857')+'',
						modal : true,
						layout : 'fit',
						width : 500,
						height : 300,
						closeAction : 'hide',
						plain : false,
						items : [systemnewsDetails.form]
							// 将面板绑定到对话框
					});
					systemnewsDetails.issueDialog.show();

			});
}
