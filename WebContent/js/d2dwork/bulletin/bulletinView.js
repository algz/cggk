var bulletinView = {
	issueDialog : null,
	form : null,
	temp : null
}

bulletinView.init = function() {
	myGrid.row = bulletinMain.grid.selModel.getSelected();
	if (myGrid.row == null||bulletinGrid.rows.length != 1) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : getResource('resourceParam663') + '',
			msg : getResource('resourceParam1133') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	if (!bulletinView.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'bulletinView'); // 动态生成需要绑定的div
		bulletinView.issueDialog = new Ext.Window( { // 创建对话框
			el : 'bulletinView',
			title : getResource('resourceParam1135') + '',
			modal : true,
			layout : 'fit',
			width : 440,
			height : 400,
			closeAction : 'hide',
			plain : false,
			items : [ bulletinView.addform() ] // 将面板绑定到对话框
		});
	}
	bulletinView.issueDialog.show();

	bulletinView.issueDialog.on("hide", function() {
		bulletinView.issueDialog.close();
		bulletinView.issueDialog.destroy();
		bulletinView.issueDialog = null;

	});
}

bulletinView.addform = function() {
	bulletinView.temp = new Ext.form.HtmlEditor( {
		height : 310,
		width : 500,
		name : "content",
		fieldLabel : getResource('resourceParam1125') + "",
		readOnly : true,
		cls : 'readonly',
		disabled : true,
		id : "content",
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});

	bulletinView.temp.value = myGrid.row.get("content");
	bulletinView.form = new Ext.FormPanel( {
		labelWidth : 60, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		items : [ {
				fieldLabel : getResource('resourceParam1126') + '', // 文本框
				xtype : 'textfield',
				name : 'title',
				blankText : getResource('resourceParam1123') + '',
				maxLength : 50,
				maxLengthText : getResource('resourceParam734') + ''
						+ getResource('resourceParam1122'),
				allowBlank : false,
				readOnly : true,
				cls : 'readonly',
				value : myGrid.row.get("title"),
				anchor : '100%'
			},{
				fieldLabel : '' + getResource('resourceParam1120') + '', // 发布日期
				xtype : 'textfield',
				name : 'title',
				blankText : '' + getResource('resourceParam1120') + '',
				maxLength : 50,
				maxLengthText : '' + getResource('resourceParam735') + ''
						+ getResource('resourceParam1122') + '',
				allowBlank : false,
				readOnly : true,
				cls : 'readonly',
				value : myGrid.row.get("pbudatestr"),
				anchor : '100%'
			},
//			{
//				fieldLabel : '' + getResource('resourceParam453') + '', // 发布人
//				xtype : 'textfield',
//				name : 'title',
//				blankText : '' + getResource('resourceParam453') + '',
//				maxLength : 50,
//				maxLengthText : '' + getResource('resourceParam735') + ''
//						+ getResource('resourceParam1122') + '',
//				allowBlank : false,
//				readOnly : true,
//				cls : 'readonly',
//				value : myGrid.row.get("authorname"),
//				anchor : '50%'
//			},
//			{
//				fieldLabel : '' + getResource('resourceParam689') + '', // 发布部门
//				xtype : 'textfield',
//				name : 'title',
//				blankText : '' + getResource('resourceParam689') + '',
//				maxLength : 50,
//				maxLengthText : '' + getResource('resourceParam735') + ''
//						+ getResource('resourceParam1122') + '',
//				allowBlank : false,
//				readOnly : true,
//				cls : 'readonly',
//				value : myGrid.row.get("ginstituteName"),
//				 anchor : '50%'
//			},
			
			{
				xtype : 'panel',
				bodyStyle : 'padding:0px 0px 10px 0px;background:transparent;border:0',
				html : '<div><span style="float:left;font-size:12px;">' + getResource('resourceParam453') + ':&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+myGrid.row.get("authorname")
				+'</span><span style="float:left;font-size:12px;padding-left: 100px;">' + getResource('resourceParam689') + ':&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+myGrid.row.get("ginstituteName")+'</span></div>'
			},
			{
				title : getResource('resourceParam1125') + '',
				layout : 'fit',
				items : new Ext.Panel( {
					autoScroll : true,
					frame : true,
					width : 380,
					height : 200,
					bodyStyle : 'padding:5px 5px 0;background:transparent',
					html : myGrid.row.get('content')
				})
			} ],
		buttons : [ { // 定义面板中的按钮
			text : getResource('resourceParam479') + '',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				bulletinView.issueDialog.hide();
			}
		} ]
	});
	return bulletinView.form;
}
