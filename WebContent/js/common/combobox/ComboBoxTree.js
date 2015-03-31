Ext.ux.ComboBoxTree = function() {
    this.treeId = Ext.id() + '-tree';
    this.maxHeight = arguments[0].maxHeight || arguments[0].height
            || this.maxHeight;
    this.tpl = new Ext.Template('<tpl for="."><div style="height:'
            + this.maxHeight + 'px;"><div id="' + this.treeId
            + '"></div></div></tpl>');
    this.store = new Ext.data.SimpleStore({
                fields : [],
                data : [[]]
            });
    this.selectedClass = '';
    this.mode = 'local';
    this.triggerAction = 'all';
    this.onSelect = Ext.emptyFn;
    this.editable = false;
    this.beforeBlur = Ext.emptyFn;
    this.autoExpand = false;
    // all:所有结点都可选中
    // exceptRoot：除根结点，其它结点都可选（默认）
    // folder:只有目录（非叶子和非根结点）可选
    // leaf：只有叶子结点可选
    this.selectNodeModel = arguments[0].selectNodeModel || 'exceptRoot';

    this.addEvents('afterchange');

    Ext.ux.ComboBoxTree.superclass.constructor.apply(this, arguments);

}

Ext.extend(Ext.ux.ComboBoxTree, Ext.form.ComboBox, {
    treeWidth : function(iew,ffw)
    {
       var d=Ext.get(this.treeId).dom;
       var d1=d.firstChild;
       var d3=d1.firstChild.firstChild;
       if(Ext.isIE)
       {
           d1.style.width=iew;
           d3.style.width=iew;
        }else
         {
            d1.style.width=ffw;
            d3.style.width=ffw;
          }
     
    },
    expand : function() {
        Ext.ux.ComboBoxTree.superclass.expand.call(this);
        if (this.tree.rendered) {
            return;
        }

        Ext.apply(this.tree, {
                    height : this.maxHeight,
                    width : (this.listWidth || this.width - (Ext.isIE ? 3 : 0))
                            - 2,
                    border : false,
                    autoScroll : true
                });
        if (this.tree.xtype) {
            this.tree = Ext.ComponentMgr.create(this.tree, this.tree.xtype);
        }
        this.tree.render(this.treeId);
        var root = this.tree.getRootNode();
        if (!root.isLoaded())
            root.reload();
        if (this.autoExpand){
            root.expand(true);
        }
        var w=Ext.get(this.treeId).dom.parentNode.parentNode.parentNode.style.width;
        this.treeWidth(w,w);
        this.tree.on('click', function(node) {
                    var selModel = this.selectNodeModel;
                    var isLeaf = node.isLeaf();

                    if ((node == root) && selModel != 'all') {
                        return;
                    } else if (selModel == 'folder' && isLeaf) {
                        return;
                    } else if (selModel == 'leaf' && !isLeaf) {
                        return;
                    }

                    var oldNode = this.getNode();
                    if (this.fireEvent('beforeselect', this, node, oldNode) !== false) {
                        this.setValue(node);
                        this.collapse();

                        this.fireEvent('select', this, node, oldNode);
                        (oldNode !== node) ? this.fireEvent('afterchange',
                                this, node, oldNode) : '';
                    }
                }, this);
    },

    setValue : function(node) {
    	/*
    	 * edited by suny
    	 * 针对bug189
    	 * 修改任务模板时无法修改
    	 */
    	if(!node)return;
        this.node = node;
        var text = node.text;
        this.lastSelectionText = text;
        if (this.hiddenField) {
            this.hiddenField.value = node.id;
        }
        Ext.form.ComboBox.superclass.setValue.call(this, text);
        this.value = node.id;
    },
    setTextValue : function(v) {
        Ext.form.ComboBox.superclass.setValue.call(this, v);
    },

    getValue : function() {
        return typeof this.value != 'undefined' ? this.value : '';
    },

    getNode : function() {
        return this.node;
    },

    clearValue : function() {
        Ext.ux.ComboBoxTree.superclass.clearValue.call(this);
        this.node = null;
    },

    // private
    destroy : function() {
        Ext.ux.ComboBoxTree.superclass.destroy.call(this);
        Ext.destroy([this.node, this.tree]);
        delete this.node;
    },
    restrictHeight : function(){
        this.innerList.dom.style.height = '';
        var inner = this.innerList.dom;
        var pad = this.list.getFrameWidth('tb')+(this.resizable?this.handleHeight:0)+this.assetHeight;
        var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
        var ha = this.getPosition()[1]-Ext.getBody().getScroll().top;
        var hb = Ext.lib.Dom.getViewHeight()-ha-this.getSize().height;
        var space = Math.max(ha, hb, this.minHeight || 0)-this.list.shadow.offset-pad-2;
        h = Math.min(h, space, this.maxHeight);
        
        this.innerList.setHeight(h);
        this.list.beginUpdate();
        this.list.setHeight(h+pad);
        if(this.isExpanded()) {
        	this.list.alignTo(this.el, this.listAlign);	
        }
        this.list.endUpdate();
    },
    
     initList : function(){
        if(!this.list){
            var cls = 'x-combo-list';

            this.list = new Ext.Layer({
                shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
            });

            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
            this.list.setWidth(lw);
            this.list.swallowEvent('mousewheel');
            this.assetHeight = 0;

            if(this.title){
                this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
                this.assetHeight += this.header.getHeight();
            }

            this.innerList = this.list.createChild({cls:cls+'-inner'});
            this.innerList.on('mouseover', this.onViewOver, this);
            this.innerList.on('mousemove', this.onViewMove, this);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));

            if(this.pageSize){
                this.footer = this.list.createChild({cls:cls+'-ft'});
                this.pageTb = new Ext.PagingToolbar({
                    store:this.store,
                    pageSize: this.pageSize,
                    renderTo:this.footer
                });
                this.assetHeight += this.footer.getHeight();
            }

            if(!this.tpl){
                /**
                * @cfg {String/Ext.XTemplate} tpl The template string, or {@link Ext.XTemplate}
                * instance to use to display each item in the dropdown list. Use
                * this to create custom UI layouts for items in the list.
                * <p>
                * If you wish to preserve the default visual look of list items, add the CSS
                * class name <pre>x-combo-list-item</pre> to the template's container element.
                * <p>
                * <b>The template must contain one or more substitution parameters using field
                * names from the Combo's</b> {@link #store Store}. An example of a custom template
                * would be adding an <pre>ext:qtip</pre> attribute which might display other fields
                * from the Store.
                * <p>
                * The dropdown list is displayed in a DataView. See {@link Ext.DataView} for details.
                */
                this.tpl = '<tpl for="."><div class="'+cls+'-item">{' + this.displayField + '}</div></tpl>';
            }

            /**
            * The {@link Ext.DataView DataView} used to display the ComboBox's options.
            * @type Ext.DataView
            */
            this.view = new Ext.DataView({
                applyTo: this.innerList,
                tpl: this.tpl,
                singleSelect: true,
                selectedClass: this.selectedClass,
                itemSelector: this.itemSelector || '.' + cls + '-item'
            });

            this.view.on('click', this.onViewClick, this);

            this.bindStore(this.store, true);

            if(this.resizable){
                this.resizer = new Ext.Resizable(this.list,  {
                   pinned:true, handles:'se'
                });
                this.resizer.on('resize', function(r, w, h){
                    this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                    this.listWidth = w;
                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                    this.restrictHeight();
                    this.treeWidth(w,w+'px');
                }, this);
                this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
            }
        }
    }
});

Ext.reg('combotree', Ext.ux.ComboBoxTree);
