var gongzuoapAjax = {}

gongzuoapAjax.getGridData = function(strurl) {
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
		{name:'chuanjsj'},
		{name:'tixingrq'},
		{name:'kaishisj'},
		{name:'jiesushj'},
		{name:'anpbiaot'},
		{name:'anpnrong'},
		{name:'fankuikj'},
		{name:'chulizht'},
		{name:'zhubanry'},
		{name:'xiebanry'},
		{name:'wanchjdu'},
		{name:'shijkssj'},
		{name:'shijjssj'},
		{name:'anpleix'},
		{name:'instcode'},
		{name:'instname'},
		{name:'fujgeshu'},
		{name:'pinjiakj'},
		{name:'xinfanki'},
		{name:'wenzipj'}
	]);
	var ascid = 'gzuoapId';
	var ascstr = 'asc';
	return new data.Store(proxy, reader, ascid, ascstr);
}

gongzuoapAjax.save = function(form, ds) {
	var gzVo = createType("com.luck.itum.d2dwork.gongzuoap.GongzuoapVo");
	var ryVos = new Array(ds.getCount());
	Ext.apply(gzVo, form.getValues());
	for(var i = 0; i < ds.getCount(); i++) {
		var ryVo = createType("com.luck.itum.common.canyurenyuan.CanyurenyuanVo");
		//Ext.apply(ryVo, ds.getAt(i));
		ryVos[i] = ryVo;
	}
	callSeam("d2dwork_gongzuoap_GongzuoapSvr","saveGongzuoap",[gzVo, ryVos],gongzuoapAjax.callback);
}

gongzuoapAjax.jdUpdate = function(form) {
	var vo = createType("com.luck.itum.d2dwork.gongzuoap.GongzuojdVo");
	Ext.apply(vo, form.getValues());
	callSeam("d2dwork_gongzuoap_GongzuoapSvr","updateGongzuojd",[vo],gongzuoapAjax.callback);
}

gongzuoapAjax.apUpdate = function(form) {
	var vo = createType("com.luck.itum.d2dwork.gongzuoap.GongzuoapVo");
	Ext.apply(vo, form.getValues());
	callSeam("d2dwork_gongzuoap_GongzuoapSvr","updateGongzuoap",[vo],gongzuoapAjax.callback);
}

gongzuoapAjax.remove = function(gzuoapId) {
	callSeam("d2dwork_gongzuoap_GongzuoapSvr","updateGongzuoap",[gzuoapId],gongzuoapAjax.callback);
}

gongzuoapAjax.callback = function(result) {
	alert(result);
}



