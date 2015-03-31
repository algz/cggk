var enmusEntity = {}
enmusEntity.init = function() {
	enmusEntity.usersCombs = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							method : 'POST',
							url : "../JSON/data_Remote.getSysEnumsVos?type=1"
						}),
				reader : new Ext.data.JsonReader({
							id : "id",
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'enumsname'
								}, {
									name : 'id'
								}])
			});
	enmusEntity.usersComb = new Ext.form.ComboBox({
				store : enmusEntity.usersCombs,
				valueField : "id",
				displayField : "enumsname",
				mode : 'remote',
				queryParam : 'enumsname',
				minChars : 0,
				pageSize : 10,
				forceSelection : true,
				hiddenName : 'id',
				editable : false,
				triggerAction : 'all',
				fieldLabel : getResource('resourceParam3019'),//'理由',
				typeAhead : true,
				name : 'id',
				enableKeyEvents : true,
				disableKeyFilter : true,
				emptyText : '' + getResource('resourceParam569') + ''
			});

	enmusEntity.usersComb.on('select', function(combo, record, index) {
				// 下拉列表文本值
				enmusEntity.enumsname = record.get(combo.displayField);
				enmusEntity.id = record.get(combo.valueField);
			});
}
