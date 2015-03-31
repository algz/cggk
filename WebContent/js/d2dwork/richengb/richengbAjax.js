/**
 * 日程管理后台通讯类 游松 2008-3-6
 */
var richengbAjax = {};

/**
 * 新增日程 返回ReturnRichengVo对象
 */
richengbAjax.save = function() {
    var richengVo =createType("com.luck.itumserv.d2dwork.richeng.RichengVo");//创建Vo对象
	Ext.apply(richengVo, richengbFormUI.form.form.getValues());// 给Vo对象复制
	callSeam("d2dwork_richengb_richenggl", "save", [richengVo],
			richengbAjax.saveCallback);// 调用远程方法
}

/**
 * 新增日程回调方法
 */
richengbAjax.saveCallback = function(flag) {
	if (flag) {
		richengbGridUI.loadData();
		richengbAjax.confim(''+getResource('resourceParam1660')+'!');
	} else {
		richengbAjax.confim(''+getResource('resourceParam1661')+'!');
	}
}

/**
 * 删除日程的方法 参数:rchenbID 返回:ReturnRichengVo对象的flag属性
 */
richengbAjax.remove = function() {
	Ext.MessageBox.confirm('' + getResource('resourceParam6026'), ''+getResource('resourceParam636')+'', function(btn, text) { // 警告！
		if (btn == 'yes') {
			// 调用远程方法
			callSeam("d2dwork_richengb_richenggl", "remove",
					[myGrid.row.get('rchengId')], richengbAjax.removeCallback);
		}
	})
}

/**
 * 删除日程的回调方法
 */
richengbAjax.removeCallback = function(flag) {
	if (flag) {
		//richengbGridUI.ds.remove(myGrid.row);
		myGrid.row = null;
		richengbFormUI.form.form.reset();
		richengbAjax.confim(''+getResource('resourceParam637')+'!');
		richengbGridUI.loadData();
	} else {
		richengbAjax.confim(''+getResource('resourceParam638')+'!');
	}
}

/**
 * 修改日程
 */
richengbAjax.update = function() {
	var richengbVo = createType("com.luck.itumserv.d2dwork.richeng.RichengVo");// 创建Vo对象
	Ext.apply(richengbVo, richengbFormUI.form.form.getValues());// 给Vo对象复制
	richengbVo.setRchengId(myGrid.row.get('rchengId'));
	callSeam("d2dwork_richengb_richenggl", "update", [richengbVo],richengbAjax.updateCallback);// 调用远程方法
}

/**
 * 修改日程的回调方法 返回ReturnRichengVo对象
 */
richengbAjax.updateCallback = function(flag) {
	if (flag) {
		richengbGridUI.loadData();
		richengbAjax.confim(''+getResource('resourceParam677')+'!');
	} else {
		richengbAjax.confim(''+getResource('resourceParam572')+'!');
	}
}

/**
 * 提示用户操作结果的方法
 */
richengbAjax.confim = function(data) {
	Ext.MessageBox.show( {
		title : ''+getResource('resourceParam663')+'',
		msg : data,
		buttons : Ext.MessageBox.OK,
		icon : Ext.MessageBox.INFO
	});
}
