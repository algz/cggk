/**
 * 会签配置页面，选择不同的会签方式，页面可操作功能不同，若选择评审会签，不可选择审批负责人，
 * 若选择决审会签，不可填写审批通过比率，若选择会审会签，即不能选择审批负责人，也不可填写审批
 * 通过比率
 */
ViewCounterSignWin = function(functOK,functCancel) {
	var scope = this;
	this.loadMask = null;
	
	// 创建formpanel，展示会签方式和审批通过比率
	this.form_panel = new Ext.FormPanel({
		region : 'north',
		autoHeight : true,
		labelWidth : 80,
		border : true,
		frame : false,
		bodyStyle : 'padding:5px 10px 5px 10px',
		items:[{
            xtype: 'radiogroup',
            name:'counterJoin',
            fieldLabel:'会签类型',
            items: [{
            	boxLabel : '评审会签', 
            	name : 'counterjoinType',
            	inputValue : 7,
            	disabled : true
			}, {
				boxLabel : '决审会签',
				name : 'counterjoinType',
				inputValue : 8,
				disabled : true
			}, {
				boxLabel : '会审会签',
				name : 'counterjoinType',
				inputValue : 9,
				disabled : true
			}]
        }, {
			border : false,
			width : 200,
			items : [{
				border : false,
				layout : 'column',
				items : [{
					width : 120,
					layout : 'form',
					labelWidth : 80,
					border : false,
					items : [{
						fieldLabel : '通过比率',
						width : 30,
			        	disabled : true,
			        	allowBlank : true,
			        	regex : /^([1-9]|[1-9][0-9]|100)?$/,
						regexText : '只能输入1-100之间的数字',//只能输入1-99之间的数字
						xtype : 'textfield',
						id : 'agreeRate'
					}]
				}, {
					width : 25,
					border : false,
					html : '<div valign="middle" align="left">&nbsp;%</div>'
				}]
			}]
        }]
	});
	
	// 渲染参与人类型
	this.renderExaminer=function(value) {
		if (value == 1) {
			return "负责人"
		} else {
			return "参与人";
		}
	}
	
	// 创建展示字段
	this.cm = new Ext.grid.ColumnModel([{
		hidden : true,
		width : 100,
		dataIndex : 'userid'},{
		header : "参与者",
		width : 100,
		dataIndex : 'truename'
	}, {
		header : "机构",
		width : 100,
		dataIndex : 'ginstitutename'
	}, {
		header : "参与类型",
		width : 100,
		dataIndex : 'examinerType',
		renderer : scope.renderExaminer
	}, {
		hidden : true,
		width : 100,
		dataIndex : 'instcode'
	}]);
	
	// 创建列表store
	this.ds = function() {
		var url = "../JSON/approval_templetRemote.getCounterJoinNodeInfo";
		var proxy = new Ext.data.HttpProxy({
			url : url,
			method : 'POST'
		});
		var reader = new Ext.data.JsonReader({
			root : 'results',
			totalProperty : 'totalProperty'
		}, [
			'approvalCommentId',
			'examinerType',
			'userid',
			'instcode',
			'truename',
			'ginstitutename',
			'nodeTypeId',
			'agreeRate'
		]);
		return new Ext.data.Store(proxy, reader);
	};

	// 创建列表面板，负责展示所选会签的审批参与人
	this.grid_panel=new Ext.grid.GridPanel({
		region : 'center',
		cm : scope.cm,
		viewConfig : {
			forceFit : true
		},
		ds : scope.ds()
	});
	
	// 页面汇总面板，合并formpanel和gridpanel
	this.configPanel = new Ext.Panel({
		frame : false,
		boder : false,
		region : 'center',
		layout : 'border',
		listeners : {
        	afterrender : function() {
				scope.loadMask = new Ext.LoadMask(scope.configPanel.body.dom, {
					msg : 'loading...'
				});
        	}
        },
		items:[scope.form_panel,scope.grid_panel]
	});
	
	// 创建弹出窗口
	this.window = new Ext.Window({
		title : '确认',
		width : 500,
		height : 400,
		buttonAlign : 'right',
		layout : 'border',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [this.configPanel],
		buttons : [{
			width : 50,
			text : "" + getResource('resourceParam479') + "",//确定按钮
			handler : function(button) {
				if(functOK) {
					functOK();
				}
				scope.window.close();
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",//关闭按钮
			handler : function() {
				if(functCancel) {
					functCancel();
				}
				scope.window.close();
			}
		}]
	});
	
	//展示窗口
	this.showWin = function(activityInfo, msg) {
		var attentionPanel = new Ext.Panel({
			bodyStyle : 'padding : 5px 0px 5px 0px',
			border : false,
			frame : false,
	   	  	region : 'north',
	   	  	html : '<div style="color:blue;font-size:12px">' + msg + '</div>'
		});
		this.form_panel.insert(0, attentionPanel);
		this.window.show();
		scope.form_panel.getForm().findField('counterJoin').setValue(activityInfo.nodetypeid);
		Ext.getCmp('agreeRate').setValue(activityInfo.agreeRate);
		var count=activityInfo.comments.length;
		var examinerRecord = Ext.data.Record.create([{
			name : 'truename'
		}, {
			name : 'ginstitutename'
		}, {
			name : 'examinerType'
		}]);
		for(i=0;i<count;i++) {
			var record = new examinerRecord({
				truename:activityInfo.comments[i].examinerName,
				ginstitutename:activityInfo.comments[i].examinerName,
				examinerType:activityInfo.comments[i].examinerType
			});
			scope.grid_panel.getStore().add(record);
		}
	};
}