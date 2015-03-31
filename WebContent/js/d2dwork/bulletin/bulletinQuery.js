var bulletinQuery = {
	issueDialog : null,
	form : null,
	temp : null
}

bulletinQuery.init = function() {
	if (!bulletinQuery.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'bulletinQuery'); // 动态生成需要绑定的div
		bulletinQuery.issueDialog = new Ext.Window( {// 创建对话框
			el : 'bulletinQuery',
			title : getResource('resourceParam1131') + '',
			modal : true,
			layout : 'fit',
			width : 350,
			height : 150,
			closeAction : 'hide',
			plain : false,
			items : [ bulletinQuery.addform() ]
		// 将面板绑定到对话框
		});
	}
	bulletinQuery.issueDialog.show();

	bulletinQuery.issueDialog.on("hide", function() {
		bulletinQuery.issueDialog.close();
		bulletinQuery.issueDialog.destroy();
		bulletinQuery.issueDialog = null;

	});
}

bulletinQuery.addform = function() {
	bulletinQuery.combo1 = new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : "../JSON/notices_noticessvr.getTypeCombo"
			}),
			reader : new Ext.data.JsonReader( {
				totalProperty : 'totalProperty',
				root : 'results'
			}, [ {
				name : 'name'
			}, {
				name : 'typeid'
			} ])
		}),
		allowBlank : true,
		valueField : "typeid",
		displayField : "name",
		mode : 'remote',
		forceSelection : true,
		hiddenName : 'typeid',
		editable : false,
		triggerAction : 'all',
		fieldLabel : getResource('resourceParam1132') + '',
		name : 'typeid',
		anchor : '100%'
	});

	bulletinQuery.form = new Ext.FormPanel( {
			labelWidth : 60, // label settings here cascade unless
			frame : false,
			plain : false,
			border : false,
			bodyStyle : 'padding:5px 5px 0;background:transparent;',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : getResource('resourceParam1126') + '', // 文本框
				name : 'title',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : getResource('resourceParam1092') + '!',
				blankText : getResource('resourceParam1123') + '',
				maxLength : 50,
				maxLengthText : getResource('resourceParam734') + '' + getResource('resourceParam1122'),
				allowBlank : true,
				anchor : '100%'
			} ],
			buttons : [ { // 定义面板中的按钮
					text : getResource('resourceParam652') + '',
					handler : function() { // 为当前按钮绑定事件,如果验证通过，则将表单元素提交到指定路径
						if (bulletinQuery.form.form.isValid()) {
							var appVo = Seam.Remoting.createType("com.luck.itumserv.bulletin.NoticesVo");
							Ext.apply(appVo, bulletinQuery.form.getForm().getValues());
							appVo.setTypeid(bulletinQuery.combo1.getValue());
							
							//bug:gaoyn 879 2011-5-26 16:23
					 		var ds = Ext.getCmp("bulletinGridPanel").getStore();
						 		ds.on('beforeload', function() {
												 ds.baseParams = {
												 	typeid : appVo.getTypeid(),
											        title : appVo.getTitle(),
											        start : 0,
											    	limit : 25
												 };
											 });
								ds.load();
							bulletinQuery.issueDialog.hide();
						}
					}
				}, {
					text : getResource('resourceParam9002') + '', // text,取消
					handler : function() {
						// batcheUpdate.batcheform.form.reset(); //表单重置
						bulletinQuery.issueDialog.hide();
					}
				} ]
		});

	return bulletinQuery.form;
}
