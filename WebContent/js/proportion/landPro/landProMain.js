
/**
 * 里程碑权重列表
 */
var landProMain = {landPropanel:null,landProgrid:null,
				args:{start:0,limit:25},baseargs:null};

landProMain.grid = function(){
  var strurl = '../JSON/proportion_landPro_LandProService.getLandproList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'weightid'
        }, [
            'weightid','projectid','projectname',
            'landmarkid','landmarkname',
            'weight'
        ]);
  var ascid = null;
  var ascstr = null;
  var ds = new data.Store(proxy,reader,ascid,ascstr);
 	ds.on('datachanged',function(ds){
   	if(landProSelect.sel && ds.getCount()==0){
   		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam765')+"");
   	}	 
  });

  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'weightid',
		header: ""+getResource('resourceParam1203')+"权重"+getResource('resourceParam461')+"",
		dataIndex: 'weightid',
		width: 80
	},{
		header: ""+getResource('resourceParam1851')+"",
		dataIndex: 'projectname',
		width: 200
	},{
		header: ""+getResource('resourceParam1203')+""+getResource('resourceParam480')+"",
		dataIndex: 'landmarkname',
		width: 200
	},{
		header: ""+getResource('resourceParam1203')+"权重",
		dataIndex: 'weight',
		width: 100
	}]
  });

  var tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam478')+''+getResource('resourceParam1203')+'权重',
    	iconCls: 'priv-edit',
    	tooltip: {title:''+getResource('resourceParam478')+''+getResource('resourceParam1203')+'权重',text:''+getResource('resourceParam478')+'选中的'+getResource('resourceParam1203')+'权重'},
    	handler:landProUpdate.init
    	
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam652')+''+getResource('resourceParam1203')+'权重',
        
        iconCls: 'priv-select',
        tooltip: {title:''+getResource('resourceParam652')+''+getResource('resourceParam1203')+'权重',text:''+getResource('resourceParam1780')+''},
        handler: landProSelect.init
        
  	},
  	'-',{
  		//enableToggle:true,
        text:''+getResource('resourceParam1203')+'权重列表',
        
        iconCls: 'priv-select',
        tooltip: {title:'显示'+getResource('resourceParam1203')+'权重列表',text:'显示所有的'+getResource('resourceParam1203')+'权重'},
        handler: function(){
	        landProMain.baseargs={
				projectname:null
			}
			myGrid.loadvalue(landProMain.landProgrid.store,landProMain.args,landProMain.baseargs);
						
        }
        
  	},
  	'-'];
  var grid = myGrid.init(ds,cm,tb,sm);
  return grid;
}
landProMain.init = function(){
	Ext.QuickTips.init();
	
	landProMain.landPropanel = new Ext.Panel({
		 id:'landPropanel',
		 layout:'fit',
		 border:false,
		 region:'center',
		 titlebar: false,
		 autoScroll:true,
         margins:'0 5 5 0'
	
	});
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	landProMain.landPropanel
        ]
        
    });
	landProMain.landProgrid = landProMain.landPropanel.add(landProMain.grid());
	landProMain.landPropanel.doLayout();
	myGrid.loadvalue(landProMain.landProgrid.store,landProMain.args,landProMain.baseargs);
}
Ext.onReady(landProMain.init,landProMain,true);
