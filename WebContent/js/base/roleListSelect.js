var roleListSelect = {
		
};

roleListSelect.init = function(u) {
	var basePath = "..";
	roleListSelect.comboboxStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			method : 'POST',
			url : "../JSON/base_role_roleSerivce.getPageRole",
			params : {
				start : 0,
				limit : 10
			}
		}),
		reader : new Ext.data.JsonReader({
			id : "roleid",
			totalProperty : 'totalProperty',
			root : 'results'
		}, [{
			name : 'rolename'
		}, {
			name : 'roleid'
		}])
	});
	roleListSelect.roleComb = new Ext.form.ComboBox({
		store : roleListSelect.comboboxStore,
		valueField : "roleid",
		displayField : "rolename",
		mode : 'remote',
		queryParam : 'rolename',
		minChars : 0,
		pageSize : 10,
		forceSelection : true,
		hiddenName : 'role',
		editable : true,
		triggerAction : 'all',
		fieldLabel : u,
		typeAhead : false,
		name : 'role',
		blankText : ''+getResource('resourceParam570')+'',
		allowBlank : true,
		enableKeyEvents : true,
		disableKeyFilter : true,
		tpl : '<tpl for="."><div ext:qtip="{rolename}"  class="x-combo-list-item">'
			+ '<div style="float:left; text-align:left; padding-left:3px">{rolename}</div>'
			// + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
			+ '</div></tpl>',
		emptyText : ''+getResource('resourceParam569')+''
	});
	roleListSelect.roleComb.on('keypress', function(combo) {
        roleListSelect.keypress = true;
    });
    roleListSelect.roleComb.on('beforequery', function(qe) {
        if (roleListSelect.keypress) {
            roleListSelect.comboboxStore.baseParams = {
                pinyinName : roleListSelect.roleComb.getRawValue(),
                start : 0,
                limit : 10
            }
        } else {
            roleListSelect.comboboxStore.baseParams = {
                start : 0,
                limit : 10
            }
        }
        roleListSelect.keypress = false;
        delete qe.combo.lastQuery;
    });
}