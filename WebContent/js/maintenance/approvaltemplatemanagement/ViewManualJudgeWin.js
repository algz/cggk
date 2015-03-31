/**
 * 人工判断节点执行前需要用户进行判断，该页面为与用户交互的页面
 */
ViewManualJudgeWin = function(functOK,functCancel) {
	var scope = this;
	this.loadMask = null;
	
	// 创建formpanel，展示会签方式和审批通过比率
	this.form_panel = new Ext.FormPanel({
		region : 'center',
		labelWidth : 50,
		autoHeight : true,
		border : true,
		frame : false,
		bodyStyle : 'padding:5px 10px 5px 10px',
		items:[{
			xtype :'fieldset',
	        autoHeight : true,
	        title : '会签',
	        layout : 'form',
	        items : [{
	            xtype : 'radiogroup',
	            name : 'originalindex',
	            fieldLabel : '判断',
	            items : [{
	            	boxLabel : '是', 
	            	name : 'originalindexType',
	            	inputValue : 1
				}, {
					boxLabel : '否',
					name : 'originalindexType',
					inputValue : 2
				}]
	        }]
		}]
	});
	
	// 创建弹出窗口
	this.window = new Ext.Window({
		title : '判断',
		width : 300,
		height : 200,
		buttonAlign : 'right',
		closeAction : 'hide',
		layout : 'border',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [this.form_panel],
		buttons : [{
			width : 50,
			text : "" + getResource('resourceParam479') + "",//确定按钮
			handler : function(button) {
				var originalindex = scope.form_panel.getForm().findField('originalindex').getValue().inputValue;
				if(functOK) {
					functOK(originalindex);
				}
				scope.window.hide();
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",//关闭按钮
			handler : function() {
				if(functCancel) {
					functCancel();
				}
				scope.window.hide();
			}
		}]
	});
	
	// 展示窗口
	this.showWin = function(msg) {
		this.form_panel.getForm().reset();
		var attentionPanel = new Ext.Panel({
			bodyStyle : 'padding : 5px 0px 5px 0px',
			border : false,
			frame : false,
	   	  	region : 'north',
	   	  	html : '<div style="color:blue;font-size:12px">' + msg + '</div>'
		});
		this.form_panel.insert(0, attentionPanel);
		this.window.show();
	};
}