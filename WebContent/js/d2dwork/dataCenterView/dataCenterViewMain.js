//默认空白图片
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var dataCenterViewMain = {tab:null,grid:null,args:{start:0,limit:8},baseargs:null,fileon:null,
				egrid:null,flag:false,onlinegrid:null,dataid:null,currentNodeID:null,currentNodeType:null,currentFullNodeId:null,currentNodeDatatypeID:null};

dataCenterViewMain.init = function(){



	dataCenterViewMain.onlinegrid = dataCenterViewGrid.grid();
	dataCenterViewMain.dataid=dataGrid.grid();
	
	myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:25},{});  
    myGrid.loadvalue(dataCenterViewMain.dataid.store, {start:0,limit:25},{}); 
//	myGrid.loadvalue(dataCenterViewMain.fileon.store, {start:0,limit:25},{}); 
	dataCenterViewMain.a1=new Ext.Panel(
	{
	  
	  region:'north',
	  height:520,
	  split:true,
	  layout:'fit',
	  items:[
	         dataCenterViewMain.onlinegrid
	        ]
	  
	});
	dataCenterViewMain.a2=new Ext.Panel(
	{
		region:'center',
		layout:'fit',
		split:true,
		items:[
	         dataCenterViewMain.dataid
	        ]
	});
	
	dataCenterViewMain.enpanel = new Ext.Panel({
		
		title:''+getResource('resourceParam474')+ '' + getResource('resourceParam9052') + '' , // text : 项
		//autoScroll:true,
		region:'center',
		layout:'border',
	 		 	items:[
	 	      dataCenterViewMain.a1,
	 	    dataCenterViewMain.a2
	 	      ]
	
		
	});
	
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
        dataCenterViewMain.enpanel,
	       	dataCenterViewWest.init()
        ]
    });
    
    
  //  myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:25},dataCenterViewMain.onlinegrid.store.baseParams);
   // dataCenterViewMain.southpanel.hide();
    dataCenterViewMain.enpanel.doLayout();
    //dataCenterViewMain.enpanel.doLayout();
    
}
Ext.onReady(dataCenterViewMain.init,dataCenterViewMain,true)
