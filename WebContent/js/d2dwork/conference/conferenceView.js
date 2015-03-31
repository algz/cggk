var conferenceView = {
	issueDialog : null,
	form : null,
	temp : null
}

conferenceView.init = function() {
	myGrid.row = conferenceMain.grid.selModel.getSelected();
	if (myGrid.row == null||conferenceGrid.rows.length != 1) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : getResource('resourceParam663') + '',
			msg : getResource('resourceParam1208') + '!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	if (!conferenceView.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'conferenceView'); // 动态生成需要绑定的div
		conferenceView.issueDialog = new Ext.Window( { // 创建对话框
			el : 'conferenceView',
			title : '' + getResource('resourceParam1229') + '',
			modal : true,
			layout : 'fit',
			width : 500,
			height : 400,
			closeAction : 'hide',
			plain : false,
			items : [ conferenceView.addform() ] // 将面板绑定到对话框
		});
	}
	conferenceView.issueDialog.show();

	conferenceView.issueDialog.on("hide", function() {
		conferenceView.issueDialog.close();
		conferenceView.issueDialog.destroy();
		conferenceView.issueDialog = null;

	});
}

conferenceView.addform = function() {
	conferenceView.temp = new Ext.form.HtmlEditor( {
		height : 250,
		width : 480,
		name : "content",
		fieldLabel : getResource('resourceParam1214') + "",
		readOnly : true,
		cls : 'readonly',
		disabled : true,
		id : "content",
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	conferenceView.temp.value = myGrid.row.get("content");
	conferenceView.form = new Ext.FormPanel( {
			labelAlign : 'left',
			plain : false,
			frame : true,
			autoScroll : false,
			region : 'north',
			labelWidth : 60,
			items : [ {
				layout : 'column',
				items : [ {
						columnWidth : .98,
						layout : 'form',
						items : [ {
							fieldLabel : getResource('resourceParam1216') + '', // 文本框
							name : 'title',
							xtype : 'textfield',
							blankText : getResource('resourceParam1212') + '',
							maxLength : 50,
							value : myGrid.row.get("title"),
							readOnly : true,
							cls : 'readonly',
							maxLengthText : getResource('resourceParam1210') + '',
							allowBlank : false,
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
						}
						 ]
					}, {
						columnWidth : .49,
						layout : 'form',
						items : [ {
							fieldLabel : getResource('resourceParam1230') + '', // 文本框
							xtype : 'textfield',
							name : 'typename',
							regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
							regexText : getResource('resourceParam1092') + '!',
							blankText : getResource('resourceParam1228') + '',
							maxLength : 50,
							maxLengthText : getResource('resourceParam736') + ''
									+ getResource('resourceParam1230') + ''
									+ getResource('resourceParam9030'), // text '长度过长，不能超过50'
							allowBlank : false,
							readOnly : true,
							cls : 'readonly',
							value : myGrid.row.get("depname"),
							anchor : '100%'
						} ]
					}, {
						columnWidth : .49,
						layout : 'form',
						items : [ {
							
								fieldLabel : '' + getResource('resourceParam453') + '', // 发布人
								xtype : 'textfield',
								name : 'title',
								blankText : '' + getResource('resourceParam453') + '',
								maxLength : 50,
								maxLengthText : '' + getResource('resourceParam735') + ''
										+ getResource('resourceParam1122') + '',
								allowBlank : false,
								readOnly : true,
								cls : 'readonly',
								value : myGrid.row.get("authorname"),
								anchor : '50%'
							
						} ]
					}, {
						columnWidth : .49,
						layout : 'form',
						items : [ {
							fieldLabel : getResource('resourceParam1218') + '', // 文本框
							name : 'meetingdatestr',
							xtype : 'textfield',
							cls : 'readonly',
							allowBlank : false,
							readOnly : true,
							value : myGrid.row.get("meetingdatestr"),
							anchor : '100%'
						} ]
					}, {
						columnWidth : .49,
						layout : 'form',
						items : [ {
							fieldLabel : getResource('resourceParam1217') + '', // 文本框
							name : 'place',
							xtype : 'textfield',
							regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
							regexText : getResource('resourceParam1092') + '!',
							blankText : getResource('resourceParam1212') + '',
							value : myGrid.row.get("place"),
							maxLength : 25,
							cls : 'readonly',
							readOnly : true,
							maxLengthText : getResource('resourceParam1211') + '',
							allowBlank : false,
							anchor : '100%'
						} ]
					}, {
						columnWidth : .98,
						layout : 'form',
						items : [ {
							title : getResource('resourceParam1214') + '',
							layout : 'fit',
							items : new Ext.Panel( {
									autoScroll : true,
									frame : true,
									width : 380,
									height : 200,
									bodyStyle : 'padding:5px 5px 0;background:transparent',
									html : myGrid.row.get('content')
								})
						} ]
					} ]
			} ],
			buttons : [ { // 定义面板中的按钮
				text : getResource('resourceParam479') + '',
				handler : function() {
					// batcheUpdate.batcheform.form.reset(); //表单重置
					conferenceView.issueDialog.hide();
				}
			} ]
		});
	return conferenceView.form;
}