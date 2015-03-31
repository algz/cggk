//该类完成与后台通讯功能
var pingjiaryAjax = {}
//获取表格数据
pingjiaryAjax.getGridData = function(strurl) {
	var proxy = new Ext.data.HttpProxy({
	    url: strurl
	});
	var reader = new Ext.data.JsonReader({
		totalProperty:'totalProperty',
		root:'results'
	}, [
		{name:'pinjiaId'},
		{name:'glianId'},
		{name:'yonghuId'},
		{name:'yonghuxm'},
		{name:'instname'},
		{name:'zhiwu'},
		{name:'shuzhipj'},
		{name:'wenzipj'},
		{name:'pinjiazt'}
	]);
	var ascid = 'pinjiaId';
	var ascstr = 'asc';
	return new data.Store(proxy, reader, ascid, ascstr);
}
