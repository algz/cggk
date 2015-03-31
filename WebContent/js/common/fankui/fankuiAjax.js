var fankuiAjax = {
	
}

fankuiAjax.getGridData = function(strurl) {
	var proxy = new Ext.data.HttpProxy({
	    url: strurl
	});
	var reader = new Ext.data.JsonReader({
		totalProperty:'totalProperty',
		root:'results'
	}, [
		{name:'fankuiId'},
		{name:'gzuoapId'},
		{name:'yonghuId'},
		{name:'yonghuxm'},
		{name:'fankuisj'},
		{name:'fankuibt'},
		{name:'fankuinr'},
		{name:'shifliul'},
		{name:'fujgeshu'}
	]);
	var ascid = 'fankuiId';
	var ascstr = 'asc';
	return new data.Store(proxy, reader, ascid, ascstr);
}

fankuiAjax.getWeifankuiGridData = function(strurl) {
	var proxy = new Ext.data.HttpProxy({
	    url: strurl
	});
	var reader = new Ext.data.JsonReader({
		totalProperty:'totalProperty',
		root:'results'
	}, [
		{name:'gzuoapId'},
		{name:'yonghuId'},
		{name:'yonghuxm'},
		{name:'instname'},
		{name:'renyleix'}
	]);
	var ascid = 'yonghuId';
	var ascstr = 'asc';
	return new data.Store(proxy, reader, ascid, ascstr);
}

fankuiAjax.sava = function(form) {
	var vo = createType("com.luck.itum.common.fankui.FankuiVo");
	Ext.apply(vo, form.getValues());
	callSeam("common_fankui_FankuiSvr","saveFankui",[vo],fankuiAjax.callback);
}

fankuiAjax.update = function(form) {
	var vo = createType("com.luck.itum.common.fankui.FankuiVo");
	Ext.apply(vo, form.getValues());
	callSeam("common_fankui_FankuiSvr","updateFankui",[vo],fankuiAjax.callback);
}

fankuiAjax.remove = function(fankuiId) {
	callSeam("common_fankui_FankuiSvr","removeFankui",[fankuiId],fankuiAjax.callback);
}

fankuiAjax.updateState = function(fankuiId) {
	callSeam("common_fankui_FankuiSvr","updateChakanzhtai",[fankuiId],fankuiAjax.callback);
}

fankuiAjax.callback = function(result) {
	alert(result);
}
