Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var menu = {tree:null,tb:null,node:null};
menu.gettb = function(){
	menu.tb=[
	  	'-',
	  	{
	  		text:''+getResource('resourceParam642')+'',
	    	iconCls: 'menu-add',
	    	tooltip: {title:''+getResource('resourceParam642')+'',text:''+getResource('resourceParam639')+''},	    	
    		handler: addmenu.addmenu
	  	},
	  	'-',
	  	{
	  		text:''+getResource('resourceParam643')+'',
	    	iconCls: 'menu-updata',
	    	tooltip: {title:''+getResource('resourceParam643')+'',text:''+getResource('resourceParam640')+''},	    	
    		handler: updatamenu.updatamenu
	  	},
	  	'-',
	  	{
	  		text:''+getResource('resourceParam644')+'',
	    	iconCls: 'menu-delete',
	    	tooltip: {title:''+getResource('resourceParam644')+'',text:''+getResource('resourceParam641')+''},	    	
    		handler: deletemenu.deletemenu
	  	}];
};
menu.gettree = function(){
	menu.gettb();
	menu.tree = new Ext.tree.ColumnTree({
		id:'menutree',
        autoHeight:true,
        rootVisible:false,
        autoScroll:true,
        
        title: '',        
        columns:[{
            header:'ID',
            width:150,
            dataIndex:'menuid'
        },{
            header:''+getResource('resourceParam480')+'',
            width:200,
            dataIndex:'caption'
        },{
            header:''+getResource('resourceParam645')+'',
            width:100,
            dataIndex:'serialno'
        },{
            header:'URI',
            width:350,
            dataIndex:'uri'
        },{
            header:' ',
            width:10,
            dataIndex:' '
        }],
        loader: new Ext.tree.TreeLoader({
            dataUrl:'../JSON/base_menu_MenuSerivce.getTree',
            uiProviders:{
                'col': Ext.tree.ColumnNodeUI
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            text:'menuid'
        })
    });
    var sm = menu.tree.getSelectionModel();
    sm.on('selectionchange', function(sm, node) {
		menu.node = node;
	});
};
menu.getpanel = function(){
	Ext.QuickTips.init();
	menu.gettree();
	menu.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'userpanel',
         region:'center',
		 layout:'fit',
         split:true,
         tbar: menu.tb,
		 collapsible: true,
		 autoScroll:true,
		 border:false,
         margins:'0 5 5 0',
         items:menu.tree
    }); 
    var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	menu.panel
        ]
        
    });
    
    menu.panel.doLayout();
}; 
Ext.onReady(menu.getpanel,menu,true);
