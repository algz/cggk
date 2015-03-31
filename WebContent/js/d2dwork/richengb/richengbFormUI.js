/**
 * 初始化form的类 游松 2008-3-4
 */

var richengbFormUI = {};

richengbFormUI.getForm = function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	richengbFormUI.form = new Ext.FormPanel( {
		labelAlign : 'left',
		buttonAlign : 'center',
		bodyStyle : 'padding:5px',
		width : 520,
		height : 260,
		frame : true,
		labelWidth : 60,
		id : 'richengbForm',
		items : [{
			layout : 'column',
			border : false,
			labelSeparator : '：',
			items : [ {
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [{
					xtype : 'datefield',
					fieldLabel : ''+getResource('resourceParam1329')+'',
					allowBlank : false,
					blankText : ''+getResource('resourceParam1664')+'!',
					name : 'txingrqi',
					anchor : '90%'
				}]
			},  {
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [{
					xtype : 'combo',
					fieldLabel : ""+getResource('resourceParam1666')+"",
					name : "sfdaiban",
					store : new Ext.data.SimpleStore( {
						fields : ["retrunValue", "displayText"],
						data : [[0, ''+getResource('resourceParam512')+''], [1, ''+getResource('resourceParam510')+'']]
					}),
					mode : 'local',
					triggerAction : 'all',
					displayField : 'displayText',
					hiddenName : 'sfdaiban',
					valueField : 'retrunValue',
					selectOnFocus : true,
					forceSelection : true,
					editable : false,
					emptyText : ''+getResource('resourceParam459')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+''+getResource('resourceParam1337')+'',
					anchor : "90%",
					allowBlank : false
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [{
					xtype : 'datefield',
					fieldLabel : ''+getResource('resourceParam1269')+'',
					allowBlank : false,
					blankText : ''+getResource('resourceParam1663')+'!',
					name : 'rcksshji',
					anchor : '90%'
				}]
			},{
				fieldLabel : '' + getResource('resourceParam6055'), // 日程内容
				xtype : 'htmleditor',
				autoHeight : true,
				width : 500,
				fieldLabel : '' + getResource('resourceParam6055'), // 日程内容
				anchor : '90%',
				name : 'rcnerong'
			}]
		}],

		buttons : [ {
			text : ''+getResource('resourceParam557')+'',
			handler : function() {
				Ext.getCmp("richengbForm").getForm().reset();// 重置表单
				if (myGrid.row != null) {
					myGrid.row == null;
				}
			}
		}, {

			text : '' + getResource('resourceParam6056'), // 保存
			handler : function() {
				if (richengbFormUI.form.form.isValid()) {
						
							richengbAjax.save();
							Ext.getCmp("richengbForm").getForm().reset();// 重置表单
		}

}

}, {
text : ''+getResource('resourceParam478')+'',
handler : function() {
	if (richengbFormUI.form.form.isValid()) {
		if (myGrid.row != null) {
			if (myGrid.row.get('rchengId') != null) {
				richengbAjax.update();
				Ext.getCmp("richengbForm").getForm().reset();// 重置表单
			} else {
				richengbAjax.confim(''+getResource('resourceParam1665')+'!');
			}
		} else {
			richengbAjax.confim(''+getResource('resourceParam1665')+'!');
		}
	}
}
}, {
text : ''+getResource('resourceParam606')+'',
handler : function() {
	richengbFormUI.form.form.reset();
}
}, {
text : ''+getResource('resourceParam475')+'',
handler : function() {
	if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1662')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.INFO
		});
		return;
	} else {
		richengbAjax.remove();
		richengbFormUI.form.form.reset();
	}
}
}		]

	})
};
