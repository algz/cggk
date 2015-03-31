/**
 * 用户下拉得界面类
 * 游松
 */
var instUI = {};

/**
 * 获得下拉列表数据源的方法
 */
instUI.getDataSource = function() {
	instUI.ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/CommonGinstituteSvr.getCombox'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty',
			id : 'instcode'
		}, ['instcode', 'name'])
	})
};

/**
 * 创建用户下拉的方法
 */
instUI.getinstUI = function(id,fieldLabel,hidden,anchor,allowBlank,isUpdate,value) {
	if(!isUpdate){
		value = "";
	}
	instUI.inputText = new Ext.form.ComboBox( {
		id :id,
		fieldLabel : fieldLabel,
		store : instUI.ds,
		displayField : 'name',
		allowBlank: allowBlank,
		valueField : 'instcode',
		typeAhead : true,
		minChars : 100,
		loadingText : ''+getResource('resourceParam889')+'',
		pageSize : 10,
		triggerAction : 'all',
		allQuery : '__all',
		hideTrigger : false,
		selectOnFocus : true,
		anchor:anchor,
		value : value,
		hiddenName : hidden
	});
	instUI.inputText.on('specialkey', function(field, e) {
//		if (e.getKey()== e.ENTER) {
			instUI.inputText.doQuery(encodeURIComponent(Ext.get(id).dom.value), true);
		//}
		//return false;
	});
	instUI.inputText.on('select', function(box, newvar, oldvar) {
		
	});

	// 下拉框失去焦点时
	instUI.inputText.on('blur',
			function(box, newvar, oldvar) {	
				
			});
	return instUI.inputText;
}
