Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClass = {tree:null,tb:null,node:null};
newsClass.gettb = function(){
	newsClass.tb=[
	  	'-',
	  	{
	  		text:''+getResource('resourceParam477')+'栏目',
	    	iconCls: 'menu-add',
	    	tooltip: {title:''+getResource('resourceParam477')+'栏目',text:''+getResource('resourceParam647')+'一'+getResource('resourceParam455')+'栏目'},	    	
    		handler: newsClassAdd.addNewsClass
	    	//handler:updatarole.getdialog
	  	},
	  	'-',
	  	{
	  		text:''+getResource('resourceParam1518')+'',
	    	iconCls: 'menu-add',
	    	tooltip: {title:''+getResource('resourceParam1518')+'',text:''+getResource('resourceParam576')+'该栏目'+getResource('resourceParam857')+''},	    	
    		handler: newsClassView.viewNewsClass
	  	},
	  	'-',
	  	{
	  		text:''+getResource('resourceParam478')+'栏目',
	    	iconCls: 'menu-updata',
	    	tooltip: {title:''+getResource('resourceParam478')+'栏目',text:''+getResource('resourceParam478')+'一'+getResource('resourceParam455')+'栏目'}, 	
    		handler: newsClassUpdate.updateNewsClass
	  	},
	  	'-',
	  	{
	  		text:''+getResource('resourceParam475')+'栏目',
	    	iconCls: 'menu-delete',
	    	tooltip: {title:''+getResource('resourceParam475')+'栏目',text:''+getResource('resourceParam475')+'一'+getResource('resourceParam455')+'栏目'},    	
    		handler: newsClassDelete.deleteNewsClass
	  	},'-',
	  	{
	  		text:'栏目'+getResource('resourceParam1197')+'',
	    	iconCls: 'menu-delete',
	    	tooltip: {title:'栏目'+getResource('resourceParam1197')+'',text:'将源栏目及其子栏目'+getResource('resourceParam1197')+'到目标栏目中'},	    	
    		handler: newsClassRemove.removeNewsClass
	  	},'-',
	  	{
	  		text:'栏目'+getResource('resourceParam507')+'',
	    	iconCls: 'menu-delete',
	    	tooltip: {title:'栏目'+getResource('resourceParam507')+'',text:'将源栏目的内容'+getResource('resourceParam507')+'到目标栏目中'},    	
    		handler: newsClassHebin.hebinNewsClass
	  	}];
};
newsClass.getTree = function(){
	newsClass.gettb();
	newsClass.tree = new Ext.tree.ColumnTree({
		id:'classtree',
       // autoHeight:true,
        rootVisible:false,
       // autoScroll:true,
        title: '',        
        columns:[{
            header:'ID',
            width:100,
            dataIndex:'classid'
        }
         ,{
            header:'栏目'+getResource('resourceParam480')+'',
            width:100,
            dataIndex:'classname'
        }
       ,{
            header:'栏目代码',
            width:100,
            dataIndex:'classCode'
        }
         ,{
            header:'树节点代码',
            width:300,
            sortable:true,
            dataIndex:'treecode'
        }
        ,{
            header:'栏目图片',
            width:100,
            dataIndex:'classpicurl'
        }
        ,{
            header:'栏目'+getResource('resourceParam1256')+'',
            width:100,
            dataIndex:'readme'
        }
        ,{
            header:''+getResource('resourceParam1848')+'',
            width:100,
            dataIndex:'newsCount'
        }
        ,{
            header:' ',
            width:2,
            dataIndex:' '
        }
        ],
        loader: new Ext.tree.TreeLoader({
            dataUrl:'../JSON/news_newsclass_NewsClassService.getTree',
            uiProviders:{
                'col': Ext.tree.ColumnNodeUI
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            text:'classid'
        })
    });
    var sm = newsClass.tree.getSelectionModel();
    sm.on('selectionchange', function(sm, node) {
		newsClass.node = node;
	});
};
newsClass.getPanel = function(){
	Ext.QuickTips.init();
	newsClass.getTree();
	newsClass.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'classpanel',
         region:'center',
		 layout:'fit',
         split:true,
         tbar: newsClass.tb,
		 collapsible: true,
		 autoScroll:true,
		 border:false,
         margins:'0 5 5 0',
         items:newsClass.tree
    }); 
    var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	newsClass.panel
        ]
        
    });
    
    newsClass.panel.doLayout();
   
}; 
Ext.onReady(newsClass.getPanel,newsClass,true);
