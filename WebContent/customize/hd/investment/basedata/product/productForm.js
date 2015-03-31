var productForm = {};
productForm.getForm = function(rd) {
	var items = [ {
		xtype : 'hidden',
		name : 'productid'
	}, {
		xtype : 'hidden',
		name : 'leaf'
	}, {

		xtype : 'hidden',
		name : 'parentid',
		value : productTree.parentId

	}, {
		xtype : "textfield",
		fieldLabel : '产品型号',
		lableWidth : 150,
		id : 'productcode',
		allowBlank : false,
		maxLength : 50,
		maxLengthText : '不能超过50个字符，请重新输入！',
		anchor : '90%'
	}, {
		xtype : "textfield",
		fieldLabel : '产品描述',
		lableWidth : 150,
		id : 'productname',
		allowBlank : false,
		maxLength : 100,
		maxLengthText : '不能超过100个字符，请重新输入！',
		anchor : '90%'
	}, {
		xtype : "textfield",
		fieldLabel : '产品批次',
		lableWidth : 150,
		id : "batchno",
		allowBlank : false,
		maxLength : 50,
		maxLengthText : '不能超过50个字符，请重新输入！',
		anchor : '90%'
	}, {

		fieldLabel : '备注',
		lableWidth : 150,
		id : "remarks",
		xtype : 'textarea',
		height : 33,
		allowBlank : true,
		maxLength : 200,
		maxLengthText : '不能超过200个字符，请重新输入！',
		anchor : '90%'
	} ];

	var inform = new Ext.FormPanel( {
		id : 'productFrom',
		buttonAlign : 'center',
		labelAlign : 'left',
		autoHeight : true,
		lableWidth : 150,
		padding:8,
		frame : false,
		border : false,
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);
	}
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			if (inform.form.isValid()) {
				Ext.getCmp("productcode").enable();
				inform.form.doAction('submit', {
					waitMsg : '正在保存数据，请稍候...',
					waitTitle : '提示',
					url : '../JSON/product_ProductRemote.save?d=' + new Date(),
					method : 'post',
					success : function(form, action) {
						var result = action.result.info;
						if(result=="name"){
							Ext.Msg.alert('提示', '型号已经存在，请重新输入！');
//							form.reset();
//							window.close();
						} 
						else{
							Ext.Msg.alert('提示', '保存数据成功！');
							form.reset();
							window.close();
							//productAction.treeRefresh();//更新树节点
							common.gridPanel.reload();//更新列表
						}
					}
				})
			}

		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "productAddWind",
		width : 600,
		height : 200,
		autoScroll : true,
		title : '产品信息-新增',
		 modal : true,
		items : inform,
		border : true,
		buttons : buttons
	});
	return window;

}

// 姓名
productForm.getUserName = function() {
	depUser.users('姓名', '', 'userCode');
	depUser.usersComb.anchor = '100%';
	depUser.usersComb.allowBlank = false;
	depUser.usersComb.on('select', function(combo, record, index) {
		var form = Ext.getCmp("archivesFrom");
		form.getForm().findField('postCode').setValue(record.get('postcode'));
		form.getForm().findField('userId').setValue(record.get('userid'));
		form.getForm().findField('userGroup').setValue(record.get('instcode'));
	});
	return depUser.usersComb;
}
