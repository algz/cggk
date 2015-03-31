Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var updatauser = {
	updatadialog : null,
	updataform : null,
	//user : null,
	cs : null,
	valuecode : null,
	userids : null
};
updatauser.updatauser = function() {
	updatauser.userids = user.useridall();
	if (updatauser.userids == "false") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam904')+'');
		return false;
	}
	if (updatauser.userids == "admin") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam902')+'');
		return false;
	}
	if (updatauser.userids.length > 1) {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam904')+'');
		return false;
	}
	Seam.Component.getInstance("base_user_UserSerivce")
			.getCsVo(updatauser.getupdatadialog);
};

updatauser.getupdataform = function() {
	departmentUser.department(''+getResource('resourceParam873')+'');
	departmentUser.departmentCombo.setWidth(165);
	departmentUser.departmentCombo.allowBlank = false;
	departmentUser.codeid = myGrid.rows[0].get('instcode');
	departmentUser.departmentCombo.on('expand', function() {
		departmentUser.treePanel.on('expandnode', function() {
			var node = departmentUser.treePanel.getNodeById(myGrid.rows[0]
					.get('instcode'));
			if (node != null) {
				node.select();
			}
		});
		departmentUser.treePanel.getRootNode().expand(true, true);
	});
	
	updatauser.securityDegree = new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : '../JSON/groups_GroupsRemote.getSecurityDegree'
			}),
			reader : new Ext.data.JsonReader( {
				totalProperty : 'totalProperty',
				root : 'root'
			}, [ {
				name : 'id'
			}, {
				name : 'name'
			} ])
		}),
		fieldLabel : getResource('resourceParam1973'),//'密级',
		hiddenName : 'securityDegree',
		valueField : "id",
		displayField : "name",
		mode : 'remote',
		allowBlank : true,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : getResource('resourceParam3003')+/*'请选择密级*/'...',
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
		updatauser.securityDegree1 = record.get('id');
			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			},
			afterrender:function(combo){
			
			}
		},
		style : 'margin-bottom: 5px;',
		width : 165
	});
	updatauser.securityDegree.setValue(myGrid.rows[0].get('securityDegreeName'));
	updatauser.securityDegree1=myGrid.rows[0].get('securityDegree');
	
	updatauser.updataform = new Ext.FormPanel({
		labelWidth : 75, // label settings here cascade unless overridden
		plain : false,
		frame : true,
		bodyStyle : 'padding:5px 5px 0',
		labelWidth : 80,
		items : [{
			layout : 'column',
			items : [{
				columnWidth : 1,
				layout : 'form',
				defaultType : 'textfield',
				items : [{
					fieldLabel : ''+getResource('resourceParam869')+'',//用户登录名
					width : 175,
					regex : /^([a-zA-Z]|\d|_)*$/,
					regexText : ''+getResource('resourceParam865')+'',
					allowBlank : false,
					disabled : true,
					value : [myGrid.rows[0].get('loginname')],
					anchor : '95%'
				}]
			}, {
				columnWidth : 1,
				layout : 'form',
				defaultType : 'textfield',
				items : [{
					fieldLabel : ''+getResource('resourceParam872')+'',
					name : 'truename',
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
					regexText : ''+getResource('resourceParam863')+'',
					width : 175,
					minLength : 1,
					maxLength : 20,
					allowBlank : false,
					value : [myGrid.rows[0].get('truename')],
					anchor : '95%'
				}]
			}, {
				columnWidth : 1,
				layout : 'form',
				defaultType : 'textfield',
				items : [{
					fieldLabel : ''+getResource('resourceParam874')+'',//职位
					name : 'professional',
					regex : /^([\u0391-\uFFE5]|[ ]|[a-zA-Z]|\d|_)*$/,
					regexText : ''+getResource('resourceParam679')+','+getResource('resourceParam3017')+'',
					width : 175,
					minLength : 1,
					/**
					 * bug编号1016 wangyf
					 * bug信息：系统管理员新增或修改用户时职位只能输入99，而不是系统提示的100
					 * 2011-06-07 10：40
					 */
					maxLength : 50,
					maxLengthText : '长度不能大于50！',
					allowBlank : true,
					value : [myGrid.rows[0].get('professional')],
					anchor : '95%'
				}]
			},{
				columnWidth : 1,
				layout : 'form',
				defaultType : 'textfield',
				items : [departmentUser.departmentCombo]

			}, {
				xtype : 'textfield',
				name : 'updatasign',
				hidden : true,
				value : 1
			}, {
				xtype : 'textfield',
				name : 'userid',
				hidden : true,
				value : myGrid.rows[0].get('userid')
			}]
		},
		updatauser.securityDegree],
		buttons : [{
			text : ''+getResource('resourceParam505')+'',
			handler : function() {

				if (departmentUser.codeid == 0) {
					Ext.MessageBox.show({
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam864')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
					return;
				}

				if (updatauser.updataform.form.isValid()) {
					var userform = Seam.Remoting
							.createType("com.luck.itumserv.base.user.GuserForm");
					Ext.apply(userform, updatauser.updataform.form.getValues());
					userform.setInstcode(departmentUser.codeid);
					userform
					.setSecurityDegree(updatauser.securityDegree1);
					Seam.Component.getInstance("base_user_UserSerivce").save(
							userform, updatauser.updatasave);
				}
			}
		}, {
			text : ''+getResource('resourceParam3001')+'',
			handler : function() {
				updatauser.updatadialog.hide();
			}
		}]
	});
	return updatauser.updataform;
};
updatauser.updatasave = function(returnvo) {
	if (returnvo.sign == true) {
		Ext.example.msg("" + getResource('resourceParam575') + "",
				returnvo.value);
	    user.baseargs={start:user.ds.baseParams.start,limit:user.ds.baseParams.limit}
	    //user.grid.store.baseParams=user.baseargs;
		myGrid.loadvalue(user.grid.store,user.baseargs,null);
		//user.loadvalue();
		user.sm.clearSelections();
		updatauser.updatadialog.hide();
	} else {
		Ext.MessageBox.show({
			title : ''+getResource('resourceParam634')+'',
			msg : returnvo.value,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}
};
updatauser.getupdatadialog = function(value) {
	updatauser.cs = value;
	tlework.addHtml(tlework.divHtml, 'updatauser');
	if (!updatauser.updatadialog) {
		updatauser.updatadialog = new Ext.Window({
			el : 'updatauser',
			title : ''+getResource('resourceParam910')+'',
			layout : 'fit',
			modal : true,
			width : 300,
			height : 220,
			closeAction : 'hide',
			plain : false,
			items : updatauser.getupdataform()
		});
		updatauser.updatadialog.on('hide', updatauser.close);
	}
	updatauser.updatadialog.show();
	departmentUser.departmentCombo.setTextValue(myGrid.rows[0]
			.get('ginstitutename'));
};
updatauser.close = function() {
	updatauser.updataform.form.reset();
	updatauser.updatadialog.destroy();
	updatauser.updataform = null;
	updatauser.updatadialog = null;

};
