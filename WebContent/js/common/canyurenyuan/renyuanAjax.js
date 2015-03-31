//该类完成与后台通讯功能
var renyuanAjax = {}
//获取表格数据
renyuanAjax.getGridData = function(strurl) {
	var proxy = new Ext.data.HttpProxy({
	    url: strurl
	});
	var reader = new Ext.data.JsonReader({
		totalProperty:'totalProperty',
		root:'results'
	}, [
		{name:'guanlId'},
		{name:'guanllx'},
		{name:'yonghuId'},
		{name:'yonghuxm'},
		{name:'instcode'},
		{name:'instname'},
		{name:'kind'},
		{name:'instlevel'},
		{name:'zhiwu'},
		{name:'jiaose'},
		{name:'renyleix'},
		{name:'sign',type:'bool'}
	]);
	var ascid = 'yonghuId';
	var ascstr = 'asc';
	return new data.Store(proxy, reader, ascid, ascstr);
}
