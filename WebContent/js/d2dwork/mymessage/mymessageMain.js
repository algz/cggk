var mymessageMain={panel:null}
mymessageMain.init=function()
{
    mymessageMain.panel=new Ext.Panel({
    	 id:'mymessageMainpanel',
    	 region : 'center',
    	 html:'<iframe src="" width="100%" height="100%" id="ifr" name="ifr" frameborder="0">' +
    	 		'</iframe>'
    }).show();
  
    var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [mymessageMain.panel]
	});
    ifr.location.href='../jsp/mymessage/mymessageMain.seam';
    
//	 mymessageMain.panel=new Ext.Panel({
//    	 id:'mymessageMainpanel',
//    	 region : 'center',
//    	 autoLoad:{
//    	 url:'../jsp/tree/treegrid.jsp',
//    	 scripts:true
//    	 }
//    });
//  
//    var viewport = new Ext.Viewport({ // 页面布局
//		layout : 'border', // 布局模式
//		items : [mymessageMain.panel]
//	});
    
}
Ext.onReady(mymessageMain.init, mymessageMain, true)
