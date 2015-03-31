var conferenceQuery = {
	issueDialog : null,
	form : null,
	temp : null
}

conferenceQuery.init = function() {
	if (!conferenceQuery.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'conferenceQuery'); // 动态生成需要绑定的div
		conferenceQuery.issueDialog = new Ext.Window( { // 创建对话框
			el : 'conferenceQuery',
			title : getResource('resourceParam1225') + '',
			modal : true,
			layout : 'fit',
			width : 350,
			height : 150,
			closeAction : 'hide',
			plain : false,
			items : [ conferenceQuery.addform() ]
		// 将面板绑定到对话框
		});
	}
	conferenceQuery.issueDialog.show();
	conferenceQuery.issueDialog.on("hide", function() {
		conferenceQuery.issueDialog.close();
		conferenceQuery.issueDialog.destroy();
		conferenceQuery.issueDialog = null;

	});
}

conferenceQuery.addform = function() {
	conferenceQuery.combo1 = new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : "../JSON/meetings_meetingssvr.getTypeCombo"
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
		fieldLabel : getResource('resourceParam736') + '' + getResource('resourceParam481'),
		name : 'typeid',
		anchor : '100%'
	});

	conferenceQuery.form = new Ext.FormPanel( {
		labelWidth : 60, // label settings here cascade unless
		frame : false,
		plain : false,
		border : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [ {
			fieldLabel : getResource('resourceParam1216') + '', // 文本框
			name : 'title',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : getResource('resourceParam1092') + '',
			// width:200,
			blankText : getResource('resourceParam1212') + '',
			maxLength : 50,
			maxLengthText : getResource('resourceParam1210') + '',
			allowBlank : true,
			anchor : '100%'
		} ],
		buttons : [ { // 定义面板中的按钮
				text : getResource('resourceParam652') + '',
				handler : function() { // 为当前按钮绑定事件 // 如果验证通过，则将表单元素提交到指定路径
					if (conferenceQuery.form.form.isValid()) {
						var appVo = Seam.Remoting.createType("com.luck.itumserv.conference.MeetingsVo");
						Ext.apply(appVo, conferenceQuery.form.getForm().getValues());
						appVo.setTypeid(conferenceQuery.combo1.getValue());
						
						
						//bug:879 gaoyn 2011-5-26 16:26	
						var ds = Ext.getCmp("conferenceGridPanel").getStore();
				 			ds.on('beforeload', function() {
												 ds.baseParams = {
												 	typeid : appVo.getTypeid(),
											        title : appVo.getTitle(),
											        start : 0,
											    	limit : 25

												 };
											 });
								ds.load();		
						conferenceQuery.issueDialog.hide();
					}
				}
			}, {
				text : getResource('resourceParam9002') + '', // 取消
				handler : function() {
					// batcheUpdate.batcheform.form.reset(); //表单重置
					conferenceQuery.issueDialog.hide();
	
				}
		} ]
	});

	return conferenceQuery.form;
}
