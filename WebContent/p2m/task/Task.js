Ext.ns('Sysware.P2M');
Sysware.P2M.Task = Ext.extend(Ext.Panel, {
	// create,update,view
	operation : 'view',

	createUrl : '../JSON/',
	createCallback : null,
	updateUrl : '../JSON/',
	updateCallback : null,
	viewUrl : '../JSON/',
	// 当前选中的结点
	currentNode : {
		fatherDataId : null,
		fatherDataType : null,
		taskId : null
	},
	anchor : '90%',// 默认的panel内组件的anchor
	// 基本属性的formpanel
	basicForm : null,
	// 扩展属性的formpanel
	extendedForm : null,

	/*
	 * 上一步
	 */
	pre : function(panel) {
		panel.getLayout().setActiveItem(0);
	},
	/*
	 * 下一步
	 */
	next : function(panel) {
		panel.getLayout().setActiveItem(1);
	},
	submit : function() {

	},
	setOperation : function(operation) {

	},

	initComponent : function() {
		var self = this;
		self.basicForm = {
			bodyStyle : 'padding:10px 0px 10px 10px',
			xtype : 'form',
			border : false,
			autoScroll : true,
			defaults : {
				anchor : self.anchor,
				style : 'margin-bottom: 5px;'
			},
			items : [ {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')
			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				xtype : 'textfield',
				name : 'contentName',
				fieldLabel : getResource('resourceParam1561')

			}, {
				layout : 'hbox',
				layoutConfig : {
					align : 'middle',
					pack : 'end',
					defaultMargins : {
						top : 0,
						right : 5,
						bottom : 0,
						left : 0
					}
				},
				border : false,
				items : [ {
					xtype : 'button',
					text : '下一步',
					handler : function() {
						self.getLayout().setActiveItem(1);
					}
				} ]
			} ]
		};
		self.extendedForm = {
			bodyStyle : 'padding:10px 0px 10px 10px',	
			xtype : 'form',
			border : false,
			autoScroll : true,
			fileUpload : true,
			defaults : {
				anchor : self.anchor,
				style : 'margin-bottom: 5px;'
			},
			items : [ {
				layout : 'hbox',
				layoutConfig : {
					align : 'middle',
					pack : 'end',
					defaultMargins : {
						top : 0,
						right : 5,
						bottom : 0,
						left : 0
					}
				},
				border : false,
				items : [ {
					xtype : 'button',
					text : '' + getResource('resourceParam1152') + '',
					handler : function() {
						self.getLayout().setActiveItem(0);
					}
				}, {
					xtype : 'button',
					text : getResource('resourceParam5046')
				} ]
			} ]
		};

		var config = {
			layout : 'card',
			hideMode : 'offsets',
			autoScroll : true,
			split : true,
			activeItem : 0,
			border : false,
			frame : false,
			items : [ {
				xtype : 'panel',
				layout : 'fit',
				items : [self.basicForm]
			}, {
				xtype : 'panel',
				layout : 'fit',
				items : [self.extendedForm]
			} ]
		};
		Ext.apply(this, config);
		Sysware.P2M.Task.superclass.initComponent.call(this);
		this.doLayout();
	}
});
Ext.reg('sysware.p2m.task', Sysware.P2M.Task);