var userSelectAjax = {}

userSelectAjax.getComboData = function() {
	var store =  new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'../JSON/common_user_UserSelectSvr.getComboData'
		}),
		reader:new Ext.data.JsonReader({
			totalProperty:'totalProperty',
			root:'results'
		}, [
			{name:'yonghuId'},
			{name:'yonghuxm'},
			{name:'zhiwu'},
			{name:'instcode'},
			{name:'instname'}
		])
	});
	
	return store;
}
