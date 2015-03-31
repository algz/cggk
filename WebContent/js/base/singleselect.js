var XX = {};
var singleselect = {
	id : 'singleselect', // 单选用户控件ID。
	width : '100%', // 显示宽度。
	emptyText : '', // 为空显示内容。
	fieldLabel : '', // 显示字段文本。
	allowBlank : true, // 是否为空。
	instcode : '', // 部门ID。
	roleId : '', // 角色ID。
	limitUserId : '', // 限制用户ID。
	limitUserType : 0, // 限制用户方式，0-'IN'或者1-'NOT IN'，默认为'IN'。
	containSelf : true
// 是否可选当前用户，true:是；false:否。
}
singleselect.init = function(callback) {
	singleselect.comboboxStores = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			method : 'POST',
			url : "../JSON/userinfo_UserInfoRemote.getUserSingleSelect?a="
					+ new Date()
		}),
		reader : new Ext.data.JsonReader( {
			id : "userid",
			totalProperty : 'totalProperty',
			root : 'results'
		}, [ {
			name : 'truename'
		}, {
			name : 'userid'
		}, {
			name : 'loginname'
		} ]),
		baseParams : {
			instcode : singleselect.instcode,
			roleId : singleselect.roleId,
			limitUserId : singleselect.limitUserId,
			limitUserType : singleselect.limitUserType
		}
	});
	singleselect.usersComb = new Ext.form.ComboBox(
			{
				id : singleselect.id,
				store : singleselect.comboboxStores,
				valueField : "userid",
				displayField : "truename",
				mode : 'remote',
				queryParam : 'name',
				minChars : 0,
				pageSize : 10,
				width : singleselect.width,
				forceSelection : true,
				hiddenName : 'userid',
				editable : true,
				triggerAction : 'all',
				fieldLabel : singleselect.fieldLabel,
				typeAhead : false,
				name : 'userid',
				blankText : '' + getResource('resourceParam570') + '',
				allowBlank : singleselect.allowBlank,
				enableKeyEvents : true,
				disableKeyFilter : true,
				tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">' + '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>' + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>' + '</div></tpl>',
				emptyText : singleselect.emptyText

			});
	singleselect.usersComb.on('select', function(combo, record, index) {
		if (callback) {
			callback(record.get(combo.valueField));
		}
	});
}