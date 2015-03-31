/**
 * 用户下拉得界面类
 * 游松
 */
var userCombox = {
};

/**
 * 获得下拉列表数据源的方法
 */
userCombox.getDataSource = function() {
	userCombox.ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/GuserSvr.getUserForExt'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty',
			id : 'userCode'
		}, ['userid', 'truename'])
	});
};

/**
 * 创建用户下拉的方法
 */
userCombox.getUserCombox = function(id,fieldLabel,hidden,anchor,allowBlank,isUpdate,value) {
	if(!isUpdate){
		value = "";
	}
	userCombox.inputText = new Ext.form.ComboBox( {
		id : id,
		fieldLabel : fieldLabel,
		store : userCombox.ds,
		displayField : 'truename',
		valueField : 'userid',
		typeAhead : true,
		allowBlank: allowBlank,
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
	userCombox.inputText.on('specialkey', function(field, e) {
		//if (e.getKey()== e.ENTER) {
			userCombox.inputText.doQuery(encodeURIComponent(Ext.get(id).dom.value), true);
		//}
		return false;
	});
	userCombox.inputText.on('select', function(box, newvar, oldvar) {
		if (!parseInt(box.value)) {
			alert(""+getResource('resourceParam1091')+"");
			box.focus();
		} 
	});

	// 下拉框失去焦点时
	userCombox.inputText.on('blur',
			function(box, newvar, oldvar) {
			});

	return userCombox.inputText;
}

//userCombox.checkCallback = function(flag){
//	if(flag){
//		alert('no');
//	}else{
//		alert('yes');
//	}
//}
