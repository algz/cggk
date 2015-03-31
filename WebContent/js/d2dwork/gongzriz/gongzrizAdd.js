
/**
 * 添加日志
 */

var gongzrizAdd = {
	addDialog : null,
	gongzrizform : null,
	gongzrizs : null
};

/**
 * 生成添加日志表单面板
 */

gettabpanel = function() {
	strurl = '../data/d2dwork/gongzriz_GongzrizSVR_getXitongriz.text';
	gongzrizAjax.init_rizhi(strurl);
	gongzrizAdd.tab = new Ext.TabPanel( {
		region : 'center',
		activeTab : 0,
		bodyStyle : 'background:transparent',
		layoutOnTabChange : true,
		defaults : {
			autoScroll : true
		},
		items : [
				{
					title : ''+getResource('resourceParam1299')+'',
					items : [new Ext.FormPanel( {
						labelWidth : 60,
						plain : false,
						frame : true,
						width : '100%',
						height : 188,
						bodyStyle : 'padding:5px 5px 0;background:transparent',
						items : [new Ext.form.TextArea( {
							fieldLabel : ''+getResource('resourceParam626')+'',
							name : 'rizhinr',
							id : 'rizhinr',
							width : 250,
							height : 140
						})]
					})]
				},
				{
					title : ''+getResource('resourceParam1300')+'',
					items : [new Ext.FormPanel( {
						labelWidth : 60,
						plain : false,
						frame : true,
						width : '100%',
						height : 188,
						bodyStyle : 'padding:5px 5px 0;background:transparent',
						items : [addxitongriz()],
						buttons : [{
							text : ''+getResource('resourceParam1300')+'',
							handler : function() {
								gongzrizAdd.xitongriz
										.setValue(gongzrizAjax.rizhi
												.getById('2008-02-02')
												.get('xitongrz'));
							}
						}]
					})]
				}]
	})
	return gongzrizAdd.tab;
}

gongzrizAdd.getgongzrizform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';
	gongzrizAdd.gongzrizform = new Ext.FormPanel( {
		id : 'gongzrizAddform',
		region : 'north',
		labelWidth : 66, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		height : 35,
		items : [ // 定义面板中的表单元素
		{
			fieldLabel : ''+getResource('resourceParam1301')+'',
			xtype : 'datefield',
			format : 'Y-m-d',
			name : 'rizhisj',
			blankText : ''+getResource('resourceParam1298')+'',
			allowBlank : false,
			// anchor : '75%'
			width : 250
		}]
	});
	return this.gongzrizform;
}

/**
 * 创建添加日志对话框
 */
gongzrizAdd.init = function(response, opt) {
	// gettabpanel();
	if (!gongzrizAdd.addDialog) {
		tlework.addHtml(tlework.divHtml, 'gongzrizAdd'); // 动态生成需要绑定的div
		gongzrizAdd.addDialog = new Ext.Window( { // 创建对话框
			el : 'gongzrizAdd',
			title : ''+getResource('resourceParam1302')+'',
			modal : true,
			layout : 'border',
			width : 400,
			height : 320,
			closeAction : 'hide',
			plain : false,
			buttonAlign : 'center',
			items : [gongzrizAdd.getgongzrizform(), gettabpanel()],
			buttons : [ // 定义面板中的按钮
			{
				text : ''+getResource('resourceParam505')+'',
				handler : function() // 为当前按钮绑定事件
					{ // 如果验证通过，则将表单元素提交到指定路径

						if (gongzrizAdd.gongzrizform.form.isValid()) {
							var gongzrizVo = createType("com.luck.itumserv.d2dwork.gongzriz.GongzrizAddVo");
							Ext.apply(gongzrizVo, gongzrizAdd.gongzrizform
									.getForm().getValues());
							gongzrizVo.rizhinr = Ext.get('rizhinr').dom.value;
							callSeam("d2dwork_gongzriz_GongzrizSvr", "save",
									[gongzrizVo], gongzrizAdd.save);
						} else {
							Ext.MessageBox.show( {
								title : ''+getResource('resourceParam1303')+'',
								msg : ''+getResource('resourceParam1297')+'',
								buttons : Ext.MessageBox.OK
							});
						}

					}
				}, {
					text : '取消',
					handler : function() {
						gongzrizAdd.addDialog.hide();
					}
				}]
		});
	}
	gongzrizAdd.addDialog.show(); // 显示对话框
	gongzrizAdd.addDialog.on("hide", function() {
		gongzrizAdd.addDialog.close();
		gongzrizAdd.addDialog.destroy();
		gongzrizAdd.addDialog = null;

	});

}

/**
 * 根据返回结果进行操作
 */
gongzrizAdd.save = function(result) {
	// var sign = result;
	if (result) {
		Ext.MessageBox.show( {
			title : '保存成功',
			msg : ''+getResource('resourceParam631')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.INFO
		});
	} else {
		gongzrizAdd.gongzrizform.form.reset();
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam634')+'',
			msg : ''+getResource('resourceParam634')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}
	gongzrizAdd.addDialog.hide();
	gongzrizMain.baseargs = null;
	myGrid.loadvalue(gongzrizMain.gongzrizgrid.store, gongzrizMain.args,
			gongzrizMain.baseargs);
};

addxitongriz = function() {
	gongzrizAdd.xitongriz = new Ext.form.TextArea( {
		fieldLabel : ''+getResource('resourceParam1304')+'',
		name : 'xitongrz',
		width : 250,
		height : 140
	});
	return gongzrizAdd.xitongriz;
}
