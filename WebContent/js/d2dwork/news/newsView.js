// 新闻的查看界面对象
var newsView = {
	issueDialog : null,
	form : null,
	temp : null
}

// 实例化查看界面并加载内容
newsView.init = function() {
	myGrid.row = Ext.getCmp('fileGridPanel').selModel.getSelected();
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : '' + getResource('resourceParam663') + '',
			msg : '' + getResource('resourceParam1505') + '!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	if (!newsView.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'newsView'); // 动态生成需要绑定的div
		newsView.issueDialog = new Ext.Window( { // 创建对话框
					el : 'newsView',
					title : '' + getResource('resourceParam1507') + '',
					modal : true,
					layout : 'fit',
					width : 440,
					height : 500,
					closeAction : 'hide',
					plain : false,
					items : [ newsView.addform() ]
				// 将面板绑定到对话框
				});
	}
	newsView.issueDialog.show();

	newsView.issueDialog.on("hide", function() {
		newsView.issueDialog.close();
		newsView.issueDialog.destroy();
		newsView.issueDialog = null;
	});
}

// 利用EXT.Form加载新闻数据到指定控件
newsView.addform = function() {
	newsView.temp = new Ext.form.HtmlEditor( {
		height : 440,
		width : 500,
		name : "content",
		fieldLabel : "" + getResource('resourceParam1498') + "",//新闻内容
		readOnly : true,
		cls : 'readonly',
		disabled : true,
		id : "content",
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});

	newsView.temp.value = myGrid.row.get("content");

	newsView.form = new Ext.FormPanel( {
		labelWidth : 60, // label settings here cascade unless
//		width:430,
//		layout : 'anchor', // overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		items : [
				{
					fieldLabel : '' + getResource('resourceParam1499') + '', // 文本框   新闻标题
					xtype : 'textfield',
					name : 'title',
					blankText : '' + getResource('resourceParam1496') + '', //请输入新闻标题
					maxLength : 50,
					maxLengthText : '' + getResource('resourceParam735') + ''
							+ getResource('resourceParam1122') + '',
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
				},{
					xtype : 'panel',
					bodyStyle : 'padding:0px 0px 10px 0px;background:transparent;border:0',
					html : '<div><span style="float:left;font-size:12px;">' + getResource('resourceParam453') + ':&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+myGrid.row.get("authorname")
					+'</span><span style="float:left;font-size:12px;padding-left: 100px;">' + getResource('resourceParam689') + ':&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+myGrid.row.get("ginstituteName")+'</span></div>'
				},
//				{
//					fieldLabel : '' + getResource('resourceParam453') + '', // 发布人
//					xtype : 'textfield',
//					name : 'title',
//					blankText : '' + getResource('resourceParam453') + '',
//					maxLength : 50,
//					maxLengthText : '' + getResource('resourceParam735') + ''
//							+ getResource('resourceParam1122') + '',
//					allowBlank : false,
//					readOnly : true,
//					cls : 'readonly',
//					value : myGrid.row.get("authorname"),
//					anchor : '50%'
//				},
//				{
//					fieldLabel : '' + getResource('resourceParam689') + '', // 发布部门
//					xtype : 'textfield',
//					name : 'title',
//					blankText : '' + getResource('resourceParam689') + '',
//					maxLength : 50,
//					maxLengthText : '' + getResource('resourceParam735') + ''
//							+ getResource('resourceParam1122') + '',
//					allowBlank : false,
//					readOnly : true,
//					cls : 'readonly',
//					value : myGrid.row.get("ginstituteName"),
//					 anchor : '50%'
//				}, 
				{
					title : '' + getResource('resourceParam1498') + '', //新闻内容
					layout : 'fit',
					items : new Ext.Panel( {
						autoScroll : true,
						frame : true,
						autoScroll : true, 
						width : 400,
						height : 300, //gzj2010-4-19
						bodyStyle : 'padding:5px 5px 0px 5px;',
						html : Ext.util.Format.htmlDecode(myGrid.row.get('content'))
					})
				} ],
		buttons : [ { // 定义面板中的按钮
			text : '' + getResource('resourceParam479') + '',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
			newsView.issueDialog.hide();
		}
		} ]
	});

	return newsView.form;
}