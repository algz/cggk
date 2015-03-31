var materialCatalogMain = {panel:null};

materialCatalogMain.init = function() {
	Ext.QuickTips.init();
	materialCatalogMain.leftTree = materialCatalogTree.init();//左边树
	materialCatalogMain.rightgrid = materialCatalogGrid.gridPanel();//右边列表
	//1、左边树布局
		materialCatalogMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
	  region:'west',
	  width:'240',
	  layout:'fit',//自适应整个高度
	  border:false,
	  split : true,
	  margin:'0 0 5 0',
	  items:[materialCatalogTree.init()]
	});

	//2、右边列表布局
		materialCatalogMain.rightpanel = new Ext.Panel({

			id:'rightGrid1',
	  region:'center',
	  width:'200',
	  layout:'fit',//自适应整个高度
	  border:false,
	  margin:'0 0 5 0',
	  items:[materialCatalogGrid.gridPanel()]
	});

	//3、总布局
	var viewport = new Ext.Viewport({ 
			layout : 'border',
			items : [materialCatalogMain.leftpanel,materialCatalogMain.rightpanel]
		
	});

	viewport.doLayout();

	};


Ext.onReady(materialCatalogMain.init, materialCatalogMain,true);
