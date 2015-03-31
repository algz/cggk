var gongzrizAjax = {};
//获取用户名称列表
gongzrizAjax.init_user = function(strurl) {
	gongzrizAjax.yonghudata = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : strurl
		}),
		reader : new Ext.data.JsonReader( {}, [ {
			name : 'yonghuId'
		}, {
			name : 'yonghum'
		}])
	});
	gongzrizAjax.yonghudata.load();
};
// 获取系统日志
gongzrizAjax.init_rizhi = function() {
	gongzrizAjax.rizhi = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : strurl
		}),
		reader : new Ext.data.JsonReader( {
			id : 'riqi'
		}, [ {
			name : 'xitongrz'
		}, {
			name : 'riqi'
		}])
	});
	gongzrizAjax.rizhi.load();
};
