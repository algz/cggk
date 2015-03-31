Ext.ux.maximgb.tg.sysEditTreeGridPanel = Ext.extend(
		Ext.ux.maximgb.tg.EditorGridPanel, {
			$pnode : function(n) {
				return this.store.getNodeParent(n);
			},
			$isIdSelected : function(n) {
				return this.getSelectionModel().isIdSelected(n.id)
			},
			getSelectNodes : function() {
				var allSelections = this.getSelectionModel().getSelections();
				var selectedNodes = new Array();
				for (var i = 0; i < allSelections.length; i++) {
					if (this.$pnode(allSelections[i]) == undefined) {
						selectedNodes.push(allSelections[i]);
					} else {
						if (!this.$isIdSelected(this.$pnode(allSelections[i]))) {
							selectedNodes.push(allSelections[i]);
						}
					}
				}
				return selectedNodes;
			},
			getEnableCheckNodes : function() {
				var allSelections = this.getSelectionModel().getSelections();
				var enableCheckNodes = new Array();
				for (var i = 0; i < allSelections.length; i++) {
					if (allSelections[i].get("disableCheck") == false) {
						enableCheckNodes.push(allSelections[i]);
					}
				}
				return enableCheckNodes;
			},
			getView : function() {
				if (!this.view) {
					this.view = new Ext.ux.maximgb.tg.sysGridView(this.viewConfig);
				}
				return this.view;
			}
		})
//treegrid的store扩展，用于记录删除的节点记录
Ext.ux.maximgb.tg.sysEditTreeGridStore = Ext.extend(
		Ext.ux.maximgb.tg.AdjacencyListStore, {
			removedRecords : [],
			removeRecord : function(record) {
				var index = this.data.indexOf(record);
				if (index > -1) {
					record.join(null);
					this.data.removeAt(index);
					if (this.pruneModifiedRecords) {
						this.modified.remove(record);
					}
					if (this.snapshot) {
						this.snapshot.remove(record);
					}
					this.removedRecords.push(record);
					this.fireEvent('remove', this, record, index);
				}
			},
			expandNextLevel : function(){
				for(var i=0;i<this.getCount();i++){
					this.expandNode(this.getAt(i));
				}
			},
			hasNotExpandedNode : function(){
				for(var i=0;i<this.getCount();i++){
		           var isExpanded =  this.isExpandedNode(this.getAt(i));
		           var rcs = this.data.getRange();
		           var isLeaf = rcs[i].data[this.leaf_field_name];
		           if(!isExpanded&&!isLeaf){
		           		return true;
		           }
		        };
		        return false;
			},
			expandAll : function(){
				var hasNotExpandedNode = this.hasNotExpandedNode();
				if(hasNotExpandedNode){
					this.expandNextLevel();
				}
			}
		})
//treegrid视图扩展
Ext.ux.maximgb.tg.sysGridView = Ext.extend(Ext.ux.maximgb.tg.GridView,{
	//增加图标和行样式扩展
	initTemplates : function()
    {
        var ts = this.templates || {};
        
        if (!ts.row) {
            ts.row = new Ext.Template(
                '<div class="x-grid3-row ux-maximgb-tg-level-{level} {alt}" style="{tstyle} {display_style}">',
                    '<table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                        '<tbody>',
                            '<tr>{cells}</tr>',
                            (
                            this.enableRowBody ? 
                            '<tr class="x-grid3-row-body-tr" style="{bodyStyle}">' +
                                '<td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on">'+
                                    '<div class="x-grid3-row-body">{body}</div>'+
                                '</td>'+
                            '</tr>' 
                                : 
                            ''
                            ),
                        '</tbody>',
                    '</table>',
                '</div>'
            );
        }
        
        if (!ts.mastercell) {
            ts.mastercell = new Ext.Template(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
                    '<div class="ux-maximgb-tg-mastercell-wrap">', // This is for editor to place itself right
                        '{treeui}',
                        '<div class="x-grid3-cell-inner x-grid3-col-{id}"' + (Ext.isIE6 ? 'style="float:left;clear:right"' : '') + 'unselectable="on" {attr}>{value}</div>',
                    '</div>',
                '</td>'
            );
        }
        
        if (!ts.treeui) {
            ts.treeui = new Ext.Template(
                '<div class="ux-maximgb-tg-uiwrap" style="width: {wrap_width}px">',
                    '{elbow_line}',
                    '<div style="left: {left}px" class="{cls}">&#160;</div>',
                '</div>',
                '{iconCls}'
            );
        }
        
        if (!ts.elbow_line) {
            ts.elbow_line = new Ext.Template(
                '<div style="left: {left}px" class="{cls}">&#160;</div>'
            );
        }
        //图标元素模板
        if(!ts.iconCls){
        	ts.iconCls = new Ext.Template(
	        	'<img unselectable="on" class="x-tree-node-icon {imgCls}" src="{treeIcon}" style="width:16px;height:16px;float:left;"/>'
        	);
        }
        this.templates = ts;
        Ext.ux.maximgb.tg.GridView.superclass.initTemplates.call(this);
    },
	doRender : function(cs, rs, ds, startRow, colCount, stripe)
    {
        var ts = this.templates, ct = ts.cell, rt = ts.row, last = colCount-1;
        var tstyle = 'width:'+this.getTotalWidth()+';';
        // buffers
        var buf = [], cb, c, p = {}, rp = {tstyle: tstyle}, r;
        for (var j = 0, len = rs.length; j < len; j++) {
            r = rs[j]; cb = [];
            var rowIndex = (j+startRow);
            var row_render_res = this.renderRow(r, rowIndex, colCount, ds, this.cm.getTotalWidth());
            
            if (row_render_res === false) {
                for (var i = 0; i < colCount; i++) {
                    c = cs[i];
                    p.id = c.id;
                    p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
                    p.attr = p.cellAttr = "";
                    p.value = c.renderer(r.data[c.name], p, r, rowIndex, i, ds);
                    p.style = c.style;
                    if(Ext.isEmpty(p.value)){
                        p.value = "&#160;";
                    }
                    if(this.markDirty && r.dirty && typeof r.modified[c.name] !== 'undefined'){
                        p.css += ' x-grid3-dirty-cell';
                    }
                    // ----- Modification start
                    if (c.id == this.grid.master_column_id) {
                        p.treeui = this.renderCellTreeUI(r, ds);
                        ct = ts.mastercell;
                    }
                    else {
                        ct = ts.cell;
                    }
                    // ----- End of modification
                    cb[cb.length] = ct.apply(p);
                }
            }
            else {
                cb.push(row_render_res);
            }
            
            var alt = [];
            if (stripe && ((rowIndex+1) % 2 == 0)) {
                alt[0] = "x-grid3-row-alt";
            }
            if (r.dirty) {
                alt[1] = " x-grid3-dirty-row";
            }
            rp.cols = colCount;
            if(this.getRowClass){
                alt[2] = this.getRowClass(r, rowIndex, rp, ds);
            }
            //扩充的列样式
            alt[3] = r.data["rowCls"];
            rp.alt = alt.join(" ");
            rp.cells = cb.join("");
            // ----- Modification start
            if (!ds.isVisibleNode(r)) {
                rp.display_style = 'display: none;';
            }
            else {
                rp.display_style = '';
            }
            rp.level = ds.getNodeDepth(r);
            // ----- End of modification
            buf[buf.length] =  rt.apply(rp);
        }
        return buf.join("");
    },
    renderCellTreeUI : function(record, store)
    {
        var tpl = this.templates.treeui,
            line_tpl = this.templates.elbow_line,
            iconCls = this.templates.iconCls,
            tpl_data = {},
            rec, parent,
            depth = level = store.getNodeDepth(record);
        
        tpl_data.wrap_width = (depth + 1) * 16; 
        if (level > 0) {
            tpl_data.elbow_line = '';
            rec = record;
            left = 0;
            while(level--) {
                parent = store.getNodeParent(rec);
                if (parent) {
                    if (store.hasNextSiblingNode(parent)) {
                        tpl_data.elbow_line = 
                            line_tpl.apply({
                                left : level * 16, 
                                cls : 'ux-maximgb-tg-elbow-line'
                            }) + 
                            tpl_data.elbow_line;
                    }
                    else {
                        tpl_data.elbow_line = 
                            line_tpl.apply({
                                left : level * 16,
                                cls : 'ux-maximgb-tg-elbow-empty'
                            }) +
                            tpl_data.elbow_line;
                    }
                }
                else {
                    throw [
                        "Tree inconsistency can't get level ",
                        level + 1,
                        " node(id=", rec.id, ") parent."
                    ].join("");
                }
                rec = parent;
            }
        }
        if (store.isLeafNode(record)) {
            if (store.hasNextSiblingNode(record)) {
                tpl_data.cls = 'ux-maximgb-tg-elbow';
            }
            else {
                tpl_data.cls = 'ux-maximgb-tg-elbow-end';
            }
        }
        else {
            tpl_data.cls = 'ux-maximgb-tg-elbow-active ';
            if (store.isExpandedNode(record)) {
                if (store.hasNextSiblingNode(record)) {
                    tpl_data.cls += this.expanded_icon_class;
                }
                else {
                    tpl_data.cls += this.last_expanded_icon_class;
                }
            }
            else {
                if (store.hasNextSiblingNode(record)) {
                    tpl_data.cls += this.collapsed_icon_class;
                }
                else {
                    tpl_data.cls += this.last_collapsed_icon_class;
                }
            }
        }
        tpl_data.left = 1 + depth * 16;
        //扩展图标样式
        if(record.data["iconCls"]&&record.data["iconCls"]!=""){
	        tpl_data.iconCls = iconCls.apply({
	        	imgCls : record.data["iconCls"],
	        	treeIcon : '../lib/ext/resources/images/default/s.gif'
	        });
        }else if(record.data["treeIcon"]&&record.data["treeIcon"]!=""){
        	tpl_data.iconCls = iconCls.apply({
	        	imgCls : record.data["iconCls"],
	        	treeIcon : '../base/icons/edm/'+record.data["treeIcon"]
	        });
        }
        return tpl.apply(tpl_data);
    }
})
//扩展TabPanel，添加对包含的Panel的beforedeactivate事件的监听，实现切换tab前的处理
//需要对要监听的tab添加beforedeactivate事件监听：Ext.addEvents('beforedeactivate')，然后对tab添加监听处理函数，tab.on('beforedeactivate',function(){...})
Ext.sysTabPanel = Ext.extend(Ext.TabPanel, {
			setActiveTab : function(item) {
				item = this.getComponent(item);
				if (!item
						|| this.fireEvent('beforetabchange', this, item,
								this.activeTab) === false) {
					return;
				}
				if (!this.rendered) {
					this.activeTab = item;
					return;
				}
				if (this.activeTab != item) {
					if (this.activeTab) {
						var flag = this.activeTab.fireEvent("beforedeactivate",
								this.activeTab);
						if (!flag) {
							return false;
						}
						var oldEl = this.getTabEl(this.activeTab);
						if (oldEl) {
							Ext.fly(oldEl).removeClass('x-tab-strip-active');
						}
						this.activeTab.fireEvent('deactivate', this.activeTab);
					}
					var el = this.getTabEl(item);
					Ext.fly(el).addClass('x-tab-strip-active');
					this.activeTab = item;
					this.stack.add(item);

					this.layout.setActiveItem(item);
					if (this.scrolling) {
						this.scrollToTab(item, this.animScroll);
					}

//					item.fireEvent('activate', item);
					this.fireEvent('tabchange', this, item);
				}
			}
		})