//参与人员主界面类,若调用该类时直接调用init方法.并传入相应的参数
//flag为传入的显示标签,
//当flag为0时为新增加参与人员时显示样式,既初始化时不调用后台获取已经参与人员的列表
//当flag为1时为修改参与人员时显示样式,既初始化时调用后台并获取已经参与人员列表
//当flag为2时为查看参与人员样式,既不显示任何的工具条
//renyuanlx为参与人员类型
var zyryMain = {
	issueDialog : null,
	baseargs : null,
	noticeid : null
}

zyryMain.init = function(noticeid,flag) {
//	myGrid.row = Ext.getCmp('bulletinGridPanel').selModel.getSelected();
//	if (myGrid.row == null||bulletinGrid.rows.length != 1) { // 如未选中任何一行，则不执行操作
//		Ext.MessageBox.show( {
//			title : getResource('resourceParam663') + '',
//			msg : getResource('resourceParam1133') + '',//请选择一条公告信息进行操作!
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.WARNING
//		});
//		return false;
//	}
	zyryMain.baseargs = {
		noticeid : noticeid
	};
	zyryMain.noticeid = noticeid;
	if (!zyryMain.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'zyryMain'); // 动态生成需要绑定的div
		var cenPanel=new Ext.Panel({
			layout:'fit',
			region:'center',
			items:[zyryGridUI.initGrid(flag)]
		});
		var southPanel=new Ext.form.FormPanel({
			height:25,
			region:'south',
			buttons : [	{
			text : '' + getResource('resourceParam745') + '',
			handler : function() // 为当前按钮绑定事件
			{ 
				zyryMain.issueDialog.hide();
			}
		}]
		})
		zyryMain.issueDialog = new Ext.Window( { // 创建对话框
			el : 'zyryMain',
			title : getResource('resourceParam1137') + '', //添加公告通知机构
			modal : true,
			layout : 'border',
			width : 500,
			height : 400,
			closeAction : 'hide',
			plain : false,
			items : [cenPanel,southPanel] // 将面板绑定到对话框
		});
	}
	zyryMain.issueDialog.show();
	zyryMain.issueDialog.on("hide", function() {
		zyryMain.issueDialog.close();
		zyryMain.issueDialog.destroy();
		zyryMain.issueDialog = null;

	});
	myGrid.postLoad(zyryGridUI.ds, zyryMain.baseargs);
}
