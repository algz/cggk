var netWorkMain = {projectid:null}
netWorkMain.init=function()
{

   netWorkMain.lefttree =netWorkProjectTree.init();

    var b = new Ext.Panel({ // 定义panel面板中显示的信息
        id : Ext.id(),
        title : '' + getResource('resourceParam724') + '',
        region : 'west',
        layout : 'fit',
        width : 200,
        split : true,
        collapsible : true,
        items : [netWorkMain.lefttree],
        margins : '0 0 0 0'
    });
    var a= new Ext.Panel({
        id : Ext.id(),
        region:'center',
        title:'网络计划图',
        html : '<input type="button" name='+Ext.id()+' value="启动网络计划图" onclick="netWorkMain.startNetWork()"/>'
        
    });
     var viewport = new Ext.Viewport({ // 页面布局
        layout : 'border',
        items : [b, a]
    });

}
netWorkMain.startNetWork=function()
{
    
      if(netWorkMain.projectid !=null && netWorkMain.projectid != undefined)
      {
      startP2M("P2M", netWorkMain.projectId,
                            0);
      }else
      {
         Ext.MessageBox.alert("信息提示","请点击左边树中的项目!");
      }
}

Ext.onReady(netWorkMain.init,netWorkMain,true);