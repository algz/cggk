// 新闻查询对象
var newsQuery = {
	issueDialog : null,
	form : null,
	temp : null
}

// 实例化查询窗口
newsQuery.init = function() {
	if (!newsQuery.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'newsQuery'); // 动态生成需要绑定的div
		newsQuery.issueDialog = new Ext.Window( { // 创建对话框
			el : 'newsQuery',
			title : '' + getResource('resourceParam1502') + '',
			modal : true,
			layout : 'fit',
			width : 350,
			height : 150,
			closeAction : 'hide',
			plain : false,
			items : [ newsQuery.addform() ] // 将面板绑定到对话框
		});
	}
	newsQuery.issueDialog.show();

	// 注册关闭时的监听函数操作
	newsQuery.issueDialog.on("hide", function() {
		newsQuery.issueDialog.close();
		newsQuery.issueDialog.destroy();
		newsQuery.issueDialog = null;
	});
}

newsQuery.addform= function(){
	newsQuery.combo1 = new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : "../JSON/news_newssvr.getTypeCombo"
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
		fieldLabel : '' + getResource('resourceParam1501') + '',
		name : 'typeid',
		anchor : '100%'
	});
	 
	// 查询窗口的数据录入表单
	newsQuery.form = new Ext.FormPanel( {
		labelWidth : 60, // label settings here cascade unless
		frame : false,
		plain : false,
		border : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [ {
			fieldLabel : '' + getResource('resourceParam1499') + '', // 文本框
			name : 'title',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!',
			// width:200,
			blankText : '' + getResource('resourceParam1496') + '',
			maxLength : 50,
			maxLengthText : getResource('resourceParam735') + '' + getResource('resourceParam1122') + '',
			allowBlank : true,
			anchor : '100%'
		} ],
		buttons : [ { // 定义面板中的按钮
			text : '' + getResource('resourceParam652') + '',
			handler : function() { // 为当前按钮绑定事件
				// 如果验证通过，则将表单元素提交到指定路径
				if (newsQuery.form.form.isValid()) {
					var appVo = Seam.Remoting.createType("com.luck.itumserv.news.NewsVo");
					Ext.apply(appVo, newsQuery.form.getForm().getValues());
					appVo.setTypeid(newsQuery.combo1.getValue());
//					// 构造查询数据对象
//					newsMain.baseargs = {
//						typeid : appVo.getTypeid(),
//						title : appVo.getTitle()
//					};
					// 应用查询条件加载数据
					var ds = Ext.getCmp('fileGridPanel').getStore();
					ds.on('beforeload', function() {
							 ds.baseParams = {
							 	typeid : appVo.getTypeid(),
						        title : appVo.getTitle(),
						        start : 0,
						    	limit : 25
							 };
						 });
					ds.load();
					// 关闭 查询窗口
					newsQuery.issueDialog.hide();
				}
			}
		}, {
			text : '取消',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				newsQuery.issueDialog.hide();
			}
		} ]
	});

	return newsQuery.form;
}