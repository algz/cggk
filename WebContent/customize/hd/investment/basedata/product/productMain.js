var productMain = {panel:null};


productMain.init = function() {
	Ext.QuickTips.init();
	

	//1、左边树布局
		productMain.leftpanel = new Ext.Panel({
		id:'leftTree1',
	  region:'west',
	  width:'240',
	  layout:'fit',//自适应整个高度
	  border:false,
	  split : true,
	  margin:'0 0 5 0',
	  items:[productTree.init()]
	});



	//2、右边列表布局
		productMain.rightpanel = new Ext.Panel({

			id:'rightGrid1',
	  region:'center',
	  width:'300',
	  layout:'fit',//自适应整个高度
	  border:false,
	  margin:'0 0 5 0',
	  items:[productGrid.gridPanel()]
	});


	//3、总布局
	var viewport = new Ext.Viewport({ 
			layout : 'border',
			items :[productMain.rightpanel]//productMain.leftpanel,productMain.rightpanel]
		
	});  

	viewport.doLayout();
	
	};

//加载表格数据
	productMain.loadvalue = function(){
	myGrid.loadvalue(productMain.rightgrid.store,{start:0,limit:25},productMain.baseargs);
	common.gridPanel.refush();
	};


Ext.onReady(productMain.init, productMain,true);
