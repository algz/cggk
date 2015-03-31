var indexchecktree={}
indexchecktree.init=function()
{
    var tree = new Ext.tree.TreePanel({
       id:'indexchecktreeid',
       width:568,
       height:300,
       checkModel:'cascade',
       onlyLeafCheckable:false,
       rootVisible:false,
       animate:true,
       autoScroll:true,
       loader: new Ext.tree.TreeLoader({
		  // dataUrl:'../JSON/base_role_rolePrivSerivce.updataprivTree?roleid='+roleAddprivtree.rolegrid,
		    dataUrl:'../JSON/base_user_UserSerivce.getMenusTree',
		    requestMethod : 'GET',
	        baseAttrs:{uiProvider:Ext.tree.TreeCheckNodeUI}   
		}),
		root: new Ext.tree.AsyncTreeNode({
	    	text:''+getResource('resourceParam665')+'',
	    	id:'0',
	    	iconCls:'top',
	    	draggable:false
	    })
    });
    tree.expandAll(true);
    return tree;
}
