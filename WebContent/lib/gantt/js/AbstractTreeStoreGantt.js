/*

Copyright (c) 2010, Maxim G. Bazhenov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this 
 list of conditions and the following disclaimer.

 Redistributions in binary form must reproduce the above copyright notice, this 
 list of conditions and the following disclaimer in the documentation and/or 
 other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE 
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER 
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

Ext.ns('Ext.ux.maximgb.tg');
/**
 * @class Ext.ux.maximgb.tg.AbstractTreeStoreGantt
 * @extends Ext.data.Store
 * This class shouldn't be created directly, use NestedSetStore or AdjacencyListStore instead.
 * @constructor
 * @param {Object} config The object containing the configuration of this model.
 */
Ext.ux.maximgb.tg.AbstractTreeStoreGantt = Ext.extend(Ext.data.Store,
{
    /**
     * @cfg {String} is_leaf_field_name Record leaf flag field name. Defaults to 'IsLeaf'
     */
    leaf_field_name : 'IsLeaf',
    
    /**
     * Current page offset.
     *
     * @access private
     */
    page_offset : 0,
    
    /**
     * Current active node. 
     *
     * @access private
     */
    active_node : null,
    
    defaultExpanded : false,
    
    /**
     * @constructor
     */
    constructor : function(config)
    {
        Ext.ux.maximgb.tg.AbstractTreeStoreGantt.superclass.constructor.call(this, config);
        
        if (!this.paramNames.active_node) {
            this.paramNames.active_node = 'anode';
        }
        
        this.addEvents(
            /**
             * @event beforeexpandnode
             * Fires before node expand. Return false to cancel operation.
             * param {AbstractTreeStore} this
             * param {Record} record
             */
            'beforeexpandnode',
            /**
             * @event expandnode
             * Fires after node expand.
             * param {AbstractTreeStore} this
             * param {Record} record
             * param {Boolean} isAsync
             */
            'expandnode',
            /**
             * @event expandnodefailed
             * Fires when expand node operation is failed.
             * param {AbstractTreeStore} this
             * param {id} Record id
             * param {Record} Record, may be undefined 
             */
            'expandnodefailed',
            /**
             * @event beforecollapsenode
             * Fires before node collapse. Return false to cancel operation.
             * param {AbstractTreeStore} this
             * param {Record} record
             */
            'beforecollapsenode',
            /**
             * @event collapsenode
             * Fires after node collapse.
             * param {AbstractTreeStore} this
             * param {Record} record
             */
            'collapsenode',
            /**
             * @event beforeactivenodechange
             * Fires before active node change. Return false to cancel operation.
             * param {AbstractTreeStore} this
             * param {Record} old active node record
             * param {Record} new active node record
             */
            'beforeactivenodechange',
            /**
             * @event activenodechange
             * Fires after active node change.
             * param {AbstractTreeStore} this
             * param {Record} old active node record
             * param {Record} new active node record
             */
            'activenodechange'
        );
    },  

    // Store methods.
    // -----------------------------------------------------------------------------------------------  
    /**
     * Removes record and all its descendants.
     *
     * @access public
     * @param {Record} record Record to remove.
     */
    remove : function(record)
    {
        // ----- Modification start
        if (record === this.active_node) {
            this.setActiveNode(null);
        }
        this.removeNodeDescendants(record);
        // ----- End of modification        
        Ext.ux.maximgb.tg.AbstractTreeStoreGantt.superclass.remove.call(this, record);
    },
    
    /**
     * Removes node descendants.
     *
     * @access private
     */
    removeNodeDescendants : function(rc)
    {
        var i, len, children = this.getNodeChildren(rc);
        for (i = 0, len = children.length; i < len; i++) {
            this.remove(children[i]);
        }
    },
    
    /**
     * Loads current active record data.
     */
    load : function(options)
    {
        if (options) {
            if (options.params) {
                if (options.params[this.paramNames.active_node] === undefined) {
                    options.params[this.paramNames.active_node] = this.active_node ? this.active_node.id : null;
                }
            }
            else {
                options.params = {};
                options.params[this.paramNames.active_node] = this.active_node ? this.active_node.id : null;
            }
        }
        else {
            options = {params: {}};
            options.params[this.paramNames.active_node] = this.active_node ? this.active_node.id : null;
        }

        if (options.params[this.paramNames.active_node] !== null) {
            options.add = true;
        }

        return Ext.ux.maximgb.tg.AbstractTreeStoreGantt.superclass.load.call(this, options); 
    },
    
    /**
     * Called as a callback by the Reader during load operation.
     *
     * @access private
     */
    loadRecords : function(o, options, success)
    {
        if (!o || success === false) {
            if (success !== false) {
                this.fireEvent("load", this, [], options);
            }
            if (options.callback) {
                options.callback.call(options.scope || this, [], options, false);
            }
            return;
        }
    
        var r = o.records, t = o.totalRecords || r.length,  
            page_offset = this.getPageOffsetFromOptions(options),
            loaded_node_id = this.getLoadedNodeIdFromOptions(options), 
            loaded_node, i, len, record, idx, updated, self = this;
    
        if (!options || options.add !== true/* || loaded_node_id === null*/) {
            if (this.pruneModifiedRecords) {
                this.modified = [];
            }
            for (var i = 0, len = r.length; i < len; i++) {
                r[i].join(this);
            }
            if (this.snapshot) {
                this.data = this.snapshot;
                delete this.snapshot;
            }
            this.data.clear();
            this.data.addAll(r);
            this.page_offset = page_offset;
            this.totalLength = t;
            this.applySort();
            this.fireEvent("datachanged", this);
        } 
        else {
            if (loaded_node_id) {
                loaded_node = this.getById(loaded_node_id);
            }
            if (loaded_node) {
                this.setNodeChildrenOffset(loaded_node, page_offset);
                this.setNodeChildrenTotalCount(loaded_node, Math.max(t, r.length));
                this.removeNodeDescendants(loaded_node);
            }
            this.suspendEvents();
            updated = {};
            for (i = 0, len = r.length; i < len; i++) {
                record = r[i];
                idx = this.indexOfId(record.id);
                if (idx == -1) {
                    updated[record.id] = false;
                }
                else {
                    updated[record.id] = true;
                    this.setNodeExpanded(record, this.isExpandedNode(this.getAt(idx)));
                }
                this.add(record);
            }
            this.applySort();
            this.resumeEvents();
    
            r.sort(function(r1, r2) {
                var idx1 = self.data.indexOf(r1),
                    idx2 = self.data.indexOf(r2),
                    r;
         
                if (idx1 > idx2) {
                   r = 1;
                }
                else {
                   r = -1;
                }
                return r;
            });
            
            var added = [];
            for (i = 0, len = r.length; i < len; i++) {
                record = r[i];
                if (updated[record.id] == true) {
                    this.fireEvent('update',  this, record, Ext.data.Record.COMMIT);
                }
                else {
                    if (loaded_node_id) {
                        added.push(record);
                    } else {
                        this.fireEvent("add", this, [record], this.data.indexOf(record));
                    }
                }
            }
            
            // If this is a node expand, only fire one add event
            if (loaded_node_id && added.length > 0) {
                this.fireEvent("add", this, added, this.data.indexOf(added[0]));
            }
        }
        this.fireEvent("load", this, r, options);
        if (options.callback) {
            options.callback.call(options.scope || this, r, options, true);
        }
    },

   /**
     * Sort the Records.
     *
     * @access public
     */
    sort : function(fieldName, dir)
    {
        if (this.remoteSort) {
            this.setActiveNode(null);
            if (this.lastOptions) {
                this.lastOptions.add = false;
                if (this.lastOptions.params) {
                    this.lastOptions.params[this.paramNames.active_node] = null;
                }
            }
        }

        return Ext.ux.maximgb.tg.AbstractTreeStoreGantt.superclass.sort.call(this, fieldName, dir);         
    },    

    /**
     * Applyes current sort method.
     *
     * @access private
     */
    applySort : function()
    {
        if(this.sortInfo && !this.remoteSort){
            var s = this.sortInfo, f = s.field;
            this.sortData(f, s.direction);
        }
        // ----- Modification start
        else {
            this.applyTreeSort();
        }
        // ----- End of modification
    },
    
    /**
     * Sorts data according to sort params and then applyes tree sorting.
     *
     * @access private
     */
    sortData : function(f, direction) 
    {
        Ext.ux.maximgb.tg.AbstractTreeStoreGantt.superclass.sortData.apply(this, arguments);
        // ----- Modification start
        this.applyTreeSort();
        // ----- End of modification
    },
    
    // Tree support methods.
    // -----------------------------------------------------------------------------------------------

    /**
     * Sorts store data with respect to nodes parent-child relation. Every child node will be 
     * positioned after its parent.
     *
     * @access public
     */
    applyTreeSort : function()
    {
        var i, len, temp,
                rec, records = [],
                roots = this.getRootNodes();
        // Sorting data
        for (i = 0, len = roots.length; i < len; i++) {
            rec = roots[i];
            records.push(rec);
            this.collectNodeChildrenTreeSorted(records, rec); 
        }
        
        if (records.length > 0) {
            this.data.clear();
            this.data.addAll(records);
        }
        
        // Sorting the snapshot if one present.
        if (this.snapshot && this.snapshot !== this.data) {
            temp = this.data;
            this.data = this.snapshot;
            this.snapshot = null; 
            this.applyTreeSort();
            this.snapshot = this.data;
            this.data = temp;
        }
    },
    
    /**
     * Recusively collects rec descendants and adds them to records[] array.
     *
     * @access private
     * @param {Record[]} records
     * @param {Record} rec
     */
    collectNodeChildrenTreeSorted : function(records, rec)
    {
        var i, len,
            child, 
            children = this.getNodeChildren(rec);
        for (i = 0, len = children.length; i < len; i++) {
            child = children[i];
            records.push(child);
            this.collectNodeChildrenTreeSorted(records, child); 
        }
    },
    
    /**
     * Returns current active node.
     * 
     * @access public
     * @return {Record}
     */
    getActiveNode : function()
    {
        return this.active_node;
    },
    
    /**
     * Sets active node.
     * 
     * @access public
     * @param {Record} rc Record to set active. 
     */
    setActiveNode : function(rc)
    {
        if (this.active_node !== rc) {
            if (rc) {
                if (this.data.indexOf(rc) != -1) {
                    if (this.fireEvent('beforeactivenodechange', this, this.active_node, rc) !== false) {
                        this.active_node = rc;
                        this.fireEvent('activenodechange', this, this.active_node, rc);
                    }
                }
                else {
                    throw "Given record is not from the store.";
                }
            }
            else {
                if (this.fireEvent('beforeactivenodechange', this, this.active_node, rc) !== false) {
                    this.active_node = rc;
                    this.fireEvent('activenodechange', this, this.active_node, rc);
                }
            }
        }
    },
     
    /**
     * Returns true if node is expanded.
     *
     * @access public
     * @param {Record} rc
     */
    isExpandedNode : function(rc)
    {
        if (this.defaultExpanded) {
            return rc.ux_maximgb_tg_expanded !== false;
        } else {
            return rc.ux_maximgb_tg_expanded === true;
        }
    },
    
    /**
     * Sets node expanded flag.
     *
     * @access private
     */
    setNodeExpanded : function(rc, value)
    {
        rc.ux_maximgb_tg_expanded = value;
    },
    
    /**
     * Returns true if node's ancestors are all expanded - node is visible.
     *
     * @access public
     * @param {Record} rc
     */
    isVisibleNode : function(rc)
    {
        var i, len,
                ancestors = this.getNodeAncestors(rc),
                result = true;
        
        for (i = 0, len = ancestors.length; i < len; i++) {
            result = result && this.isExpandedNode(ancestors[i]);
            if (!result) {
                break;
            }
        }
        
        return result;
    },
    
    /**
     * Returns true if node is a leaf.
     *
     * @access public
     * @return {Boolean}
     */
    isLeafNode : function(rc)
    {
        return rc.get(this.leaf_field_name) == true;
    },
    
    /**
     * Returns true if node was loaded.
     *
     * @access public
     * @return {Boolean}
     */
    isLoadedNode : function(rc)
    {
        var result = false;
        
        if (rc.ux_maximgb_tg_loaded !== undefined) {
            result = rc.ux_maximgb_tg_loaded;
        }
        else if (this.hasChildNodes(rc) || this.isLeafNode(rc)) {
            result = true;
        }
        
        return result;
    },
    
    /**
     * Sets node loaded state.
     *
     * @access private
     * @param {Record} rc
     * @param {Boolean} value
     */
    setNodeLoaded : function(rc, value)
    {
        rc.ux_maximgb_tg_loaded = value;
    },
    
    /**
     * Returns node's children offset.
     *
     * @access public
     * @param {Record} rc
     * @return {Integer} 
     */
    getNodeChildrenOffset : function(rc)
    {
        return rc.ux_maximgb_tg_offset || 0;
    },
    
    /**
     * Sets node's children offset.
     *
     * @access private
     * @param {Record} rc
     * @parma {Integer} value 
     */
    setNodeChildrenOffset : function(rc, value)
    {
        rc.ux_maximgb_tg_offset = value;
    },
    
    /**
     * Returns node's children total count
     *
     * @access public
     * @param {Record} rc
     * @return {Integer}
     */
    getNodeChildrenTotalCount : function(rc)
    {
        return rc.ux_maximgb_tg_total || 0;
    },
    
    /**
     * Sets node's children total count.
     *
     * @access private
     * @param {Record} rc
     * @param {Integer} value
     */
    setNodeChildrenTotalCount : function(rc, value)
    {
        rc.ux_maximgb_tg_total = value;
    },
    
    /**
     * Collapses node.
     *
     * @access public
     * @param {Record} rc
     * @param {Record} rc Node to collapse. 
     */
    collapseNode : function(rc)
    {
        if (
            this.isExpandedNode(rc) &&
            this.fireEvent('beforecollapsenode', this, rc) !== false 
        ) {
            this.setNodeExpanded(rc, false);
            this.fireEvent('collapsenode', this, rc);
        }
    },
    
    /**
     * Expands node.
     *
     * @access public
     * @param {Record} rc
     */
    expandNode : function(rc)
    {
        var params;
        
        if (!this.isExpandedNode(rc) &&
             this.fireEvent('beforeexpandnode', this, rc) !== false
        ) {
            // If node is already loaded then expanding now.
            if (this.isLoadedNode(rc)) {
                this.setNodeExpanded(rc, true);
                this.fireEvent('expandnode', this, rc, false);
            }
            // If node isn't loaded yet then expanding after load.
            else {
                this.fireEvent('expandingnode', this, rc);
                params = {};
                params[this.paramNames.active_node] = rc.id;
                this.load({
                    add : true,
                    params : params,
                    callback : this.expandNodeCallback,
                    scope : this
                });
            }
        }
    },
    
    /**
     * @access private
     */
    expandNodeCallback : function(r, options, success)
    {
        var rc = this.getById(options.params[this.paramNames.active_node]);
        
        if (success && rc) {
            this.setNodeLoaded(rc, true);
            this.setNodeExpanded(rc, true);
            this.fireEvent('expandnode', this, rc, true);
        }
        else {
            this.fireEvent('expandnodefailed', this, options.params[this.paramNames.active_node], rc);
        }
    },
    
    /**
     * Expands all nodes.
     *
     * @access public
     */
    expandAll : function()
    {
        var r, i, len, records = this.data.getRange();
        this.suspendEvents();
        for (i = 0, len = records.length; i < len; i++) {
            r = records[i];
            if (!this.isExpandedNode(r)) {
                this.expandNode(r);
            }
        }
        this.resumeEvents();
        this.fireEvent('datachanged', this);
    },
    
    /**
     * Collapses all nodes.
     *
     * @access public
     */
    collapseAll : function()
    {
        var r, i, len, records = this.data.getRange();
        
        this.suspendEvents();
        for (i = 0, len = records.length; i < len; i++) {
            r = records[i];
            if (this.isExpandedNode(r)) {
                this.collapseNode(r);
            }
        }
        this.resumeEvents();
        this.fireEvent('datachanged', this);
    },
    
    /**
     * Returns loaded node id from the load options.
     *
     * @access public
     */
    getLoadedNodeIdFromOptions : function(options)
    {
        var result = null;
        if (options && options.params && options.params[this.paramNames.active_node]) {
            result = options.params[this.paramNames.active_node];
        }
        return result;
    },
    
    /**
     * Returns start offset from the load options.
     */
    getPageOffsetFromOptions : function(options)
    {
        var result = 0;
        if (options && options.params && options.params[this.paramNames.start]) {
            result = parseInt(options.params[this.paramNames.start], 10);
            if (isNaN(result)) {
                result = 0;
            }
        }
        return result;
    },
    
    // Public
    hasNextSiblingNode : function(rc)
    {
        return this.getNodeNextSibling(rc) !== null;
    },
    
    // Public
    hasPrevSiblingNode : function(rc)
    {
        return this.getNodePrevSibling(rc) !== null;
    },
    
    // Public
    hasChildNodes : function(rc)
    {
        return this.getNodeChildrenCount(rc) > 0;
    },
    
    // Public
    getNodeAncestors : function(rc)
    {
        var ancestors = [],
            parent;
        
        parent = this.getNodeParent(rc);
        while (parent) {
            ancestors.push(parent);
            parent = this.getNodeParent(parent);    
        }
        
        return ancestors;
    },
    
    // Public
    getNodeChildrenCount : function(rc)
    {
        return this.getNodeChildren(rc).length;
    },
    
    // Public
    getNodeNextSibling : function(rc)
    {
        var siblings,
            parent,
            index,
            result = null;
                
        parent = this.getNodeParent(rc);
        if (parent) {
            siblings = this.getNodeChildren(parent);
        }
        else {
            siblings = this.getRootNodes();
        }
        
        index = siblings.indexOf(rc);
        
        if (index < siblings.length - 1) {
            result = siblings[index + 1];
        }
        
        return result;
    },
    
    // Public
    getNodePrevSibling : function(rc)
    {
        var siblings,
            parent,
            index,
            result = null;
                
        parent = this.getNodeParent(rc);
        if (parent) {
            siblings = this.getNodeChildren(parent);
        }
        else {
            siblings = this.getRootNodes();
        }
        
        index = siblings.indexOf(rc);
        if (index > 0) {
            result = siblings[index - 1];
        }
        
        return result;
    },
    
    // Abstract tree support methods.
    // -----------------------------------------------------------------------------------------------
    
    // Public - Abstract
    getRootNodes : function()
    {
        throw 'Abstract method call';
    },
    
    // Public - Abstract
    getNodeDepth : function(rc)
    {
        throw 'Abstract method call';
    },
    
    // Public - Abstract
    getNodeParent : function(rc)
    {
        throw 'Abstract method call';
    },
    
    // Public - Abstract
    getNodeChildren : function(rc)
    {
        throw 'Abstract method call';
    },
    
    // Public - Abstract
    addToNode : function(parent, child)
    {
        throw 'Abstract method call';
    },
    
    // Public - Abstract
    removeFromNode : function(parent, child)
    {
        throw 'Abstract method call';
    },
    
    // Paging support methods.
    // -----------------------------------------------------------------------------------------------
    /**
     * Returns top level node page offset.
     *
     * @access public
     * @return {Integer}
     */
    getPageOffset : function()
    {
        return this.page_offset;
    },
    
    /**
     * Returns active node page offset.
     *
     * @access public
     * @return {Integer}
     */
    getActiveNodePageOffset : function()
    {
        var result;
        
        if (this.active_node) {
            result = this.getNodeChildrenOffset(this.active_node);
        }
        else {
            result = this.getPageOffset();
        }
        
        return result;
    },
    
    /**
     * Returns active node children count.
     *
     * @access public
     * @return {Integer}
     */
    getActiveNodeCount : function()
    {
        var result;
        
        if (this.active_node) {
            result = this.getNodeChildrenCount(this.active_node);
        }
        else {
            result = this.getRootNodes().length;
        }
        
        return result;
    },
    
    /**
     * Returns active node total children count.
     *
     * @access public
     * @return {Integer}
     */
    getActiveNodeTotalCount : function()
    {
        var result;
        
        if (this.active_node) {
            result = this.getNodeChildrenTotalCount(this.active_node);
        }
        else {
            result = this.getTotalCount();
        }
        
        return result;  
    }
});