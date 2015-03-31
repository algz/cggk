Ext.ns("hd.investment.purchaseRequest.declare.main");

hd.investment.purchaseRequest.declare.main.onReadPanel = {
	/**
	 * 初始化采购申报页面
	 */
	init : function() {
		Ext.QuickTips.init();
//		表示初始化需要验证的按钮
		privilegeValidate.privilegeValidate(null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,"40000001",
			"40000002","40000003","40000004","40000005",null,
			null,null,null,null,null,
			null,"40000013",null,null,null,
			null,null,null,"40000020","40000021",
			"40000022","40000023");
		privilegeValidate.check();
		var viewport = new Ext.Viewport( { // 页面布局
			layout : 'card', // 布局模式
			activeItem : 0,
			id : 'declareOnReadyPanel',
			items : [ {
				xtype : 'hd.investment.purchaseRequest.declare.main.mainPanel',
				id : 'declareMainPanel'
			},{
				xtype : 'hd.investment.purchaseRequest.declareDetail.grid.gridPanel',
				id : 'declareDetailGridPanel'
			}]
		});
	} 
}

/**
 * 采购申报TAB
 * @class hd.investment.purchaseRequest.declare.main
 * @extends Ext.TabPanel
 */
hd.investment.purchaseRequest.declare.main.mainPanel = Ext.extend(Ext.TabPanel,{
	activeTab : 0,
	initComponent : function(){
		this.items = [{
	   		xtype : 'hd.investment.purchaseRequest.declare.grid.gridPanel',
	   	    id : 'PurchaseRequestDeclareGridPanel',
	   		title : '申报记录',
	   		listeners : {
				'activate' : function() {
					var grid = Ext.getCmp('PurchaseRequestDeclareGridPanel');
					grid.store.baseParams = {start:0,limit:20,declare_type:'1'};
					grid.store.load(); 
					declareGrid.status = null;  
					var bar = grid.getTopToolbar();
					if(bar != null){
//						bar.items.items[1].enable();
//						bar.items.items[3].enable();	
					}
					//declareDetailAction.add();
				}
			}
	   		
	   	}
	   	/*,{
	   		xtype : 'hd.investment.purchaseRequest.declare.grid.gridPanel',
	   	    id : 'PurchaseRequestDeclareNotThroughGridPanel',
	   		title : '未过申报',
	   		listeners : {
	   			'activate' : function(grid){
	   				grid.store.baseParams = {start:0,limit:20,declare_type:'2'};
					grid.store.reload();  
	   				grid.getColumnModel().setHidden(3, true); 
	   				declareGrid.status = "1";  
	   				var bar = grid.getTopToolbar();
	   				if(bar != null){
	   					bar.items.items[1].disable();
						bar.items.items[3].disable();	
	   				}
	   			}
	   		}
	   	}*/
	   	];
		hd.investment.purchaseRequest.declare.main.mainPanel.superclass.initComponent.call(this);
	}   	
});

Ext.reg("hd.investment.purchaseRequest.declare.main.mainPanel", hd.investment.purchaseRequest.declare.main.mainPanel);

Ext.Ajax.timeout = 900000;
Ext.onReady(hd.investment.purchaseRequest.declare.main.onReadPanel.init, 
		hd.investment.purchaseRequest.declare.main.onReadPanel, true);
