var examplesleft ={};

examplesleft.init=function(){
	
	examplesleft.tag = new Ext.tree.TreePanel( {
		id : 'task-tree',
		region :'west',
		split:true,
        autoScroll:true,
        animate:true,
		 height : 800,
		title :""+getResource('resourceParam724')+"",
		margins : '0 5 0 5',
		loader : new Ext.tree.TreeLoader( {
			baseAtts : new Ext.tree.AsyncTreeNode({draggable:false}),
			dataUrl:'../JSON/project_ProjectService.getTree'
		}),
		animate:true,
		lines:true,
		 enableDD:false,
		draggable:false,
		autoScroll : true     
	});
	
	  
              
               
	  // add a tree sorter in folder mode
    new Ext.tree.TreeSorter(examplesleft.tag, {folderSort:true});
    //
	examplesleft.root = new Ext.tree.AsyncTreeNode(
	{
        draggable : false,
		text:''+getResource('resourceParam724')+'',
    	id:'0'
    });
    examplesleft.tag.setRootNode(examplesleft.root);
 
	examplesleft.tag.on('click', function(node) {
				
				});
   
    return examplesleft.tag;
}
