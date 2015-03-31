var meetingtypeAdd = {
	issueDialog : null,
	form : null,
	temp : null,
	editor : null
}

meetingtypeAdd.init = function() {
	if (!meetingtypeAdd.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'tapp'); // 动态生成需要绑定的div
		meetingtypeAdd.issueDialog = new Ext.Window( { // 创建对话框
			el : 'tapp',
			title : getResource('resourceParam1213') + '' + getResource('resourceParam481'),
			modal : true,
			layout : 'fit',
			width : 350,
			height : 180,
			closeAction : 'hide',
			plain : false,
			items : [ meetingtypeAdd.addform() ] // 将面板绑定到对话框
		});
	}
	meetingtypeAdd.issueDialog.show();
	meetingtypeAdd.issueDialog.on("hide", function() {
		meetingtypeAdd.issueDialog.close();
		meetingtypeAdd.issueDialog.destroy();
		meetingtypeAdd.issueDialog = null;
	});
}

meetingtypeAdd.addform = function() {
	meetingtypeAdd.form = new Ext.FormPanel( {
		labelWidth : 80, // label settings here cascade unless
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [ {
			fieldLabel : getResource('resourceParam1139') + '', // 文本框
			name : 'name',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : getResource('resourceParam1092') + '!',
			blankText : getResource('resourceParam1095') + '',
			maxLength : 25,
			maxLengthText : getResource('resourceParam1138') + '',
			allowBlank : false,
			anchor : '95%'
		}, {
			fieldLabel : getResource('resourceParam1140') + '', // 文本框
			xtype : "textarea",
			name : 'description',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : getResource('resourceParam1092') + '!',
			blankText : getResource('resourceParam1095') + '',
			height : 60,
			maxLength : 50,
			maxLengthText : getResource('resourceParam1094') + '',
			allowBlank : true,
			anchor : '95%'
		} ],
		buttons : [ { // 定义面板中的按钮
				text : '' + getResource('resourceParam505') + '',
				handler : function() { // 为当前按钮绑定事件 如果验证通过，则将表单元素提交到指定路径
					if (meetingtypeAdd.form.form.isValid()) {
						var typeVo = Seam.Remoting.createType("com.luck.itumserv.conference.meetingtype.MeetingTypeVo");
						Ext.apply(typeVo, meetingtypeAdd.form.getForm().getValues());
						callSeam("meetingtypesvr", "typeAdd", [ typeVo ], meetingtypeAdd.save);
						myGrid.loadvalue(
							meetingtypeMain.grid.store, {
								start : 0,
								limit : 25
							}, {});
					}

				}
			}, {
				text : getResource('resourceParam9002') + '', // text 取消
				handler : function() {
					// batcheUpdate.batcheform.form.reset(); //表单重置
					meetingtypeAdd.issueDialog.hide();
				}
			} ]
	});

	return meetingtypeAdd.form;
}

/**
 * 根据返回结果进行操作
 */
meetingtypeAdd.save = function(result) {
	var sign = result;
	if (sign == "true") {

	} else {
		meetingtypeAdd.form.form.reset();
		Ext.MessageBox.show( {
			title : getResource('resourceParam634') + '',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}
	myGrid.loadvalue(meetingtypeMain.grid.store, {
		start : 0,
		limit : 25
	}, {});
	meetingtypeAdd.issueDialog.hide();
}
