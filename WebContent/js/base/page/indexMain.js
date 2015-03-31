var indexMain = {
	form : null,
	form1 : null,
	tree:null
}
indexMain.init = function() {
	Seam.Component.getInstance("base_user_UserSerivce").getMenus(function(
			result) {

	  
		indexMain.form = new Ext.FormPanel({
			id : 'indexMainform',
			defaultType : 'textfield',
			labelWidth : 20, // label settings here cascade unless overridden
			plain : false,
			autoScroll : true,
			bodyStyle : 'padding:5px 5px 0;'

		});
		for (var i = 0; i < result.length; i++) {
			indexMain.form.add(mytaskExtend.Checkboxs(result[i].menuid, "",
					result[i].caption, result[i].flag));
		}

//		indexMain.form1 = new Ext.FormPanel({
//			labelWidth : 20, // label settings here cascade unless overridden
//			plain : false,
//			autoScroll : true,
//			// bodyStyle:'padding:5px 5px 0;background:transparent;',
//			bodyStyle : 'padding:5px 5px 0;'
//		});
        indexMain.tree=indexchecktree.init();
		var indexwestpanel = new Ext.Panel({
			title : ''+getResource('resourceParam712')+'',
			region : 'west',
			layout : 'fit',
			width : '50%',
			split : true,
			items : [indexMain.tree]

		});
    
		var indexcenterpanel = new Ext.Panel({
			title : ''+getResource('resourceParam713')+'',
			region : 'center',
			layout : 'fit',
			width : '50%',
			items : [indexMain.form]
		});

		var indexsouthpanel = new Ext.Panel({
			region : 'south',
			bodyStyle : 'padding:0px 0px 0px 0px;background:transparent;border:0',
			// html:'<div style="padding:10px 5px 10px 500px;"><a href="#"
			// onclick="">保存</a>&nbsp;&nbsp;<a href="#" onclick="">默认</a></div>'
			buttons : [{
				text : getResource('resourceParam5019'),
				handler : function() {
			    var msg = '', selNodes = indexMain.tree.getChecked();
                Ext.each(selNodes, function(node){
                    if(msg.length > 0){
                        msg += ', ';
                    }
                    msg += node.id;
                });
                    var str = indexMain.form.getForm().getValues(true);
					var appVo = Seam.Remoting
							.createType("com.luck.itumserv.home.ThomeconfigsVo");
					appVo.setMenuids(msg);
					appVo.setPanelsid(str);
					Seam.Component
							.getInstance("thomeconfigs_ThomeconfigsRemote")
							.insert(appVo, function(reslut) {
								if (reslut == "true") {
									Ext.MessageBox.show({
										title : ''+getResource('resourceParam587')+'',
										msg : ''+getResource('resourceParam711')+'',
										minWidth : 150,
										width : 350,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
								} else {
									Ext.MessageBox.show({
										title : ''+getResource('resourceParam587')+'',
										msg : ''+getResource('resourceParam714')+'',
										minWidth : 150,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							});

				}
			}
//			, {
//				text : '默认',
//				handler : function() {
//
//				}
//			}
			]
		});
		var viewport = new Ext.Viewport({
			layout : 'border',
			defaultType : '',
			items : [indexwestpanel, indexcenterpanel, indexsouthpanel]
		});
	});
}

Ext.onReady(indexMain.init, indexMain, true);
