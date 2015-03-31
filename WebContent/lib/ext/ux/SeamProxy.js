Ext.namespace('Ext.ux');

Ext.ux.SeamProxy = function(component,method){
    Ext.ux.SeamProxy.superclass.constructor.call(this);
    this.component = component;
    this.method = method;
};

Ext.extend(Ext.ux.SeamProxy, Ext.data.DataProxy, {
    
    load : function(params, reader, callback, scope, arg){
        params = params || {};
        var args = new Array();
        for(var p in params){
            args.push(params[p]);
        }
       
        var doResult = this.readData.createDelegate(this,[reader,callback,scope,arg],true);
        var ref = Seam.Component.getInstance(this.component);
        Seam.Remoting.execute(ref, this.method, args, doResult);
        
    },
  
    readData:function(result,conv,reader,callback,scope,arg){
       	var rt;
       	   
    	try {
            rt = reader.readRecords(result);
        }catch(e){
            this.fireEvent("loadexception", this, arg, null, e);
            callback.call(scope, null, arg, false);
            return;
        }
        callback.call(scope, rt, arg, true);
    },
    update : function(params, records){
        
    }
});
