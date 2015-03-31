
/**
 * 查看日志
 */

var gongzrizView = {
	addDialog : null,
	gongzrizform : null,
	gongzrizs : null
};

/**
 * 查看操作
 */
gongzrizView.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1306')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
	gongzrizView.gongzrizDate();
};

/**
 * 生成查看日志表单面板
 */
gongzrizView.getgongzrizform = function() {
	return new Ext.FormPanel( {
		region: 'north',
		height:245,
		labelWidth:60,
		frame:true,
		plain:false,
		bodyStyle:'padding:5px 5px 0',
		
		items : [ // 定义面板中的表单元素,
		{
			layout : 'column',
			items : [ {
				columnWidth : 0.5,
				layout : 'form',
				defaultType : 'textfield',
				items : [{
					fieldLabel : ''+getResource('resourceParam1301')+'',
					name : 'rizhisj',
					value : myGrid.row.get('rizhisj'),
					cls : 'readonly',
					readOnly : true,
					anchor : '95%'
				}]
			}, {
				columnWidth : 0.5,
				layout : 'form',
				defaultType : 'textfield',
				items : [{
					fieldLabel : ''+getResource('resourceParam878')+'',
					name : 'yonghuId',
					value : myGrid.row.get('yonghumc'),
					cls : 'readonly',
					readOnly : true,
					anchor : '95%' // 除去label后，控件所占有的宽度
				}]
			}, {
				columnWidth : 0.5,
				layout : 'form',
				defaultType : 'textfield',
				items : [{
					fieldLabel : ''+getResource('resourceParam1324')+'',
					name : 'addtime',
					value : myGrid.row.get('rizhisj'),
					cls : 'readonly',
					readOnly : true,
					anchor : '95%' // 除去label后，控件所占有的宽度
				}]
			}, {
				columnWidth : 0.5,
				layout : 'form',
				defaultType : 'textfield',
				items : [{
					fieldLabel : ''+getResource('resourceParam1320')+'',
					name : 'updatetime',
					value : myGrid.row.get('updatetime'),
					cls : 'readonly',
					readOnly : true,
					anchor : '95%' // 除去label后，控件所占有的宽度
				}]
			}]
		}, new Ext.form.TextArea( {
			fieldLabel : ''+getResource('resourceParam626')+'',
			name : 'rizhinr',
			width : 307,
			height : 140,
			value : myGrid.row.get('rizhinr'),
			cls : 'readonly',
			readOnly : true
		})
		],
		buttons : [

		{
			text : ''+getResource('resourceParam506')+'',
			handler : function() {
				gongzrizView.addDialog.hide();
			}
		}]
	});
}

/**
 * 创建查看日志对话框
 */
gongzrizView.gongzrizDate = function(response, opt) {
	if (!gongzrizView.addDialog) {
		tlework.addHtml(tlework.divHtml, 'gongzrizview'); // 动态生成需要绑定的div
		gongzrizView.addDialog = new Ext.Window( { // 创建对话框
			el : 'gongzrizview',
			title : ''+getResource('resourceParam1317')+'',
			layout : 'fit',
			width : 420,
			height : 300,
			closeAction : 'hide',
			plain : false,
			items : gongzrizView.addgongzrizform()
		// 将面板绑定到对话框
		});
	}
	gongzrizView.addDialog.show(); // 显示对话框
	gongzrizView.addDialog.on("hide", function() {
		gongzrizView.addDialog.close();
		gongzrizView.addDialog.destroy();
		gongzrizView.addDialog = null;

	});
}

/**
 * 生成查看日志的Form面板
 */
gongzrizView.addgongzrizform = function() {
	gongzrizView.gongzrizform = gongzrizView.getgongzrizform();
	return gongzrizView.gongzrizform;
};
