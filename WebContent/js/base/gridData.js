var data = {};
/**
 * 根据条件得到数据源
 * 方法名:TopicStore
 * 属性名:proxy--得到数据源的路径
 * 		:reader--返回数据源的模板
 * 		:ascid--要排序的列
 * 		:ascstr--排序的方式（asc:正序，desc:逆序）
 */
data.Store = function(proxy,reader,ascid,ascstr){
    data.Store.superclass.constructor.call(this, {
        
        proxy: proxy
		/*new Ext.data.HttpProxy({
            url: strurl
        })*/,

        reader: reader
        /*new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'yhhao'
        }, [
            'yhhao', 'dlmma','zwenm','javaClass'
        ])*/
    });
	if(ascid != null){
    	this.setDefaultSort(ascid, ascstr);
	}
};
Ext.extend(data.Store, Ext.data.Store, {
    loadData : function(zwenm){
        this.baseParams = {
            zwenm: zwenm
        };
        this.load({
            params: {
                start:0,
                limit:25
            }
        });
    }
});
//菜单生成的数据
data.TreeLoader = function(url){
    data.TreeLoader.superclass.constructor.call(this);
    this.proxy = new Ext.data.ScriptTagProxy({
        url : url
    });
};
Ext.extend(data.TreeLoader, Ext.tree.TreeLoader, {
    dataUrl: '../testx.jsp',
    requestData : function(node, cb){
        this.proxy.load({}, {
            readRecords : function(o){
			     return o;
            }
        }, this.addNodes, this, {node:node, cb:cb});
    },

    addNodes : function(o, arg){
	
	  
	  	var node = arg.node;
	  	for (var i = 0, len = o.length; i < len; i++) {
	  		var n = this.createNode(o[i]);
	  		if (n) {
	  			node.appendChild(n);
	  		}
	  	}
	  	arg.cb(this, node);
	  }	
    
});
