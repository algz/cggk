var LibraryPanel = function(config) {
	LibraryPanel.superclass.constructor.call(this, config);
};

Ext.extend(LibraryPanel, Ext.tree.TreePanel, {
    addItem : function(name, icon, width, height, image, graph, nodeType) {
        var funct = function(graph, evt, target) {
	    	var value = {
	    		name : name,
	    		icon : icon,
	    		nodetypeid : nodeType
	    	};
	    	var nodeCells = [new mxCell(value, new mxGeometry(0, 0, width, height), 'shape=image;image=' + image + ';verticalLabelPosition=bottom;verticalAlign=top')];
	        nodeCells[0].vertex = true;
            nodeCells = graph.getImportableCells(nodeCells);
	        if (nodeCells.length > 0) {
	            var validDropTarget = (target != null) ?  graph.isValidDropTarget(target, nodeCells, evt) : false;
	            var select = null;
	            if (target != null && !validDropTarget &&
	                graph.getModel().getChildCount(target) == 0 &&
	                graph.getModel().isVertex(target) == nodeCells[0].vertex) {
	                graph.getModel().setStyle(target, style);
	                select = [target];
	            } else {
	                if (target != null && !validDropTarget) {
	                    target = null;
	                }
	                var pt = graph.getPointForEvent(evt);
	                
	                // Splits the target edge or inserts into target group
	                if (graph.isSplitEnabled() && graph.isSplitTarget(target, nodeCells, evt)) {
	                    graph.splitEdge(target, nodeCells, null, pt.x, pt.y);
	                    select = nodeCells;
	                } else {
	                    nodeCells = graph.getImportableCells(nodeCells);
	                    
	                    if (nodeCells.length > 0) {
	                        select = graph.importCells(nodeCells, pt.x, pt.y, target);
	                    }
	                }
	            }
	            if (select != null && select.length > 0) {
	                graph.scrollCellToVisible(select[0]);
	                graph.setSelectionCells(select);
	            }
	        }
        };
        var newNode = new Ext.tree.TreeNode({
	    	text: name,
            icon : icon
	    });
        this.root.appendChild(newNode);
        
        var dragPreview = document.createElement('div');
        dragPreview.style.border = 'dashed black 1px';
        dragPreview.style.width = '50px';
        dragPreview.style.height = '50px';
        mxUtils.makeDraggable(newNode.ui.elNode, graph, funct, dragPreview, 0, 0, graph.autoscroll, true);
        return newNode;
    }
});