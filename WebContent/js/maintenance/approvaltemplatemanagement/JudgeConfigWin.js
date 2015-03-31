JudgeConfigWin = function() {
	var scope = this;
	
	this.loadMask = null;
	this.configPanel = new Ext.FormPanel({
		frame : false,
		boder : false,
		bodyStyle : 'padding:10px 0px 10px 10px',
		labelWidth : 80,
		layout : 'form',
		region : 'center',
		items : [{
			xtype : 'textfield',
			fieldLabel : '判断器',
			id : 'approvePress_card2',
			allowBlank : false,
			name : 'runScript',
			maxLength : 200,
			maxLengthText : '不能超过200个字符',
			blankText : '不能为空',// 请输入流程名称
			anchor : '95%',
			style : 'margin-bottom:5px;'
		}],
		listeners : {
        	afterrender : function() {
				scope.loadMask = new Ext.LoadMask(scope.configPanel.body.dom, {
					msg : 'loading...'
				});
        	}
        }
	});
	
	this.window = new Ext.Window({
		title : '配置',
		width : 400,
		height : 300,
		buttonAlign : 'right',
		closeAction : 'hide',
		layout : 'border',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [this.configPanel],
		buttons : [{
			width : 50,
			text : "" + getResource('resourceParam479') + "",
			handler : function(button) {
				scope.save(button);
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",
			handler : function() {
				scope.window.hide();
			}
		}]
	});
	
	this.save = function(button) {
		if(this.configPanel.getForm().isValid()) {
			scope.loadMask.show();
			Ext.Ajax.request({
				url : "../JSON/approval_templetRemote.saveRunScript",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					scope.loadMask.hide();
					if(obj.success) {
						scope.window.hide();
					} else {
						Ext.Msg.alert('提示', '保存失败！');
					}
				},
				failure : function(response, options) {
				},
				disableCaching : true,
				params : {
					activityID : scope.activityId,
					runScript : scope.configPanel.getForm().findField('runScript').getValue()
				}
			});
		}
	};
	
	this.showWin = function(flowId, activityId) {
		this.flowId = flowId;
		this.activityId = activityId;
		this.window.show();
		scope.configPanel.getForm().reset();
		this.loadMask.show();
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.getRunScript",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if(obj.success) {
					if(obj.runScript) {
						scope.configPanel.getForm().findField('runScript').setValue(obj.runScript);
					}
				}
				scope.loadMask.hide();
			},
			failure : function(response, options) {
			},
			disableCaching : true,
			params : {
				activityID : activityId
			}
		});
	}
}