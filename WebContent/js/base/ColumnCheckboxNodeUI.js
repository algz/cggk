/*
 * Ext JS Library 2.0 RC 1 Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */
Ext.tree.ColumnCheckboxTree = Ext.extend(Ext.tree.TreePanel, {
	lines : false,
	borderWidth : Ext.isBorderBox ? 0 : 2, // the combined left/right
	// border for each cell
	cls : 'x-column-tree',

	onRender : function() {
		Ext.tree.ColumnCheckboxTree.superclass.onRender.apply(this, arguments);
		this.headers = this.body.createChild({
					cls : 'x-tree-headers'
				}, this.innerCt.dom);
		this.pinnerCt = this.body.createChild({tag:"div",
              style:"margin-top:-16px;height:"+this.height+"px;overflow-y:scroll;" });
		this.innerCt = this.pinnerCt.createChild({tag:"ul",
               cls:"x-tree-root-ct " +
               (this.useArrows ? 'x-tree-arrows' : this.lines ? "x-tree-lines" : "x-tree-no-lines")});
		var cols = this.columns, c;
		var totalWidth = 0;

		for (var i = 0, len = cols.length; i < len; i++) {
			c = cols[i];
			totalWidth += c.width;
			this.headers.createChild({
						cls : 'x-tree-hd ' + (c.cls ? c.cls + '-hd' : ''),
						cn : {
							cls : 'x-tree-hd-text',
							html : c.header
						},
						style : 'width:' + (c.width - this.borderWidth) + 'px;'
					});
		}
		this.headers.createChild({
					cls : 'x-clear'
				});
		// prevent floats from wrapping when clipped
		this.headers.setWidth(totalWidth);
		this.innerCt.setWidth(totalWidth-20);
		this.pinnerCt.setWidth(totalWidth);
	},
	/**
	 * 重写superClass中的getChecked方法
	 * 
	 * @param {}
	 *            a
	 * @param {}
	 *            startNode
	 * @return {}
	 * 
	 * @description 规则：1.checkbox为disabled的node不返回；2.若某节点选中（也就是其子节点都选中），只返回此节点，其子节点不返回
	 */
	getSelectedValue : function(a, startNode) {
		Ext.tree.ColumnCheckboxTree.superclass.getChecked.apply(this);
		startNode = startNode || this.root;
		var r = [];
		var f = function() {
			if (this.attributes.checked && this.attributes.disabled) {
				if (!(this.parentNode != null
						&& this.parentNode.attributes.checked && this.parentNode.attributes.disabled)) {
					r.push(!a ? this : (a == 'id'
							? this.id
							: this.attributes[a]));
				}
			}
		};
		startNode.cascade(f);
		return r;
	},
	/**
	 * 获得当前选中节点
	 * @return {TreeNode}
	 */
	getSelectedNode : function(){
		return this.selectNode;
	}
});
/**
 * 扩展ColumnTree插件为ColumnCheckboxTree
 * 
 * @class Ext.tree.ColumnNodeUI
 * @extends Ext.tree.TreeNodeUI
 * @description 注意:
 *              1.外部对Tree的click事件监听失效，可利用beforeclick事件代替;2.对选中节点结果集的改变监听可以用checkchange事件;3.selectionModel失效，需要通过getChecked()获得选中的节点;
 */
Ext.tree.ColumnCheckboxNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
	focus : Ext.emptyFn, // prevent odd scrolling behavior

	renderElements : function(n, a, targetNode, bulkRender) {
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var t = n.getOwnerTree();
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];
        //设置checkbox是否可用的规则
		var isRef = n.attributes.isRef!=undefined?n.attributes.isRef.indexOf("Parent") >= 0:false;
        var ablCheckbox = n.id.indexOf("io")>=0?isRef:true;
        n.attributes.disabled = ablCheckbox;
        //初始化选中状态跟随父节点
        var checkboxCheckd = false;
        if (n.parentNode != null) {
			checkboxCheckd = n.parentNode.attributes.checked == undefined
					? false
					: n.parentNode.attributes.checked
		}
        n.attributes.checked = checkboxCheckd;
        //end
        var buf = [
             '<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
            	 '<div class="x-tree-col" style="width:',c.width-bw,'px;">',
            	 //添加checkbox
            	 	ablCheckbox?'<input type="checkbox" class="x-tree-node-cb" />':'<input type="checkbox" class="x-tree-node-cb" disabled/>',
                 //end
            	 	'<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
                    '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
                    '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
                    '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "javascript:void(0);",'" tabIndex="1" ',
                    a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
                    '<span unselectable="on">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
                "</div>"];
         for(var i = 1, len = cols.length; i < len; i++){
             c = cols[i];

             buf.push('<div class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                        '<div class="x-tree-col-text">',(c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</div>",
                      "</div>");
         }
         buf.push(
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");

        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.firstChild.childNodes;
        this.checkbox = cs[0];
        this.indentNode = cs[1];
        this.ecNode = cs[2];
        this.iconNode = cs[3];
        this.anchor = cs[4];
        this.textNode = cs[4].firstChild;
        //设置checkbox是否可用
        this.checkbox.checked = checkboxCheckd;
        //对checkbox设置监听方法
        Ext.fly(this.checkbox).on("click",this.check.createDelegate(this,[null,n,false]));
        //设置选中样式
        if(checkboxCheckd){
			n.getUI().addClass("x-tree-selected");
		}else{
			n.getUI().removeClass("x-tree-selected");
		}
		//对点击tree Node 设置与checkbox的关联方法
		n.on('click',this.singleClickNode.createDelegate(this,[n]));
    },
	/**
	 * 设置node的click事件与checkbox的check事件关联
	 * 
	 * @param {TreeNode}
	 *            node
	 * @return {Boolean}
	 */
	singleClickNode : function(node) {// 单击tree node事件关联checkbox的check方法
		this.check(false, node.getOwnerTree().getRootNode(), false,true);// 清空tree的选中状态
		this.check(true, node, false,false);// 重置选中状态
		this.node.getOwnerTree().selectNode = node;
		return false;// 屏蔽默认单击事件后续处理（否则会出现上次选择的node节点样式出错，这是由于extTree单击node为单选原因），然而会引起外部对Tree的click事件监听失效，待解决！！！！！
	},
	/**
	 * 处理checkbox的check事件方法
	 * 
	 * @param {Boolean}
	 *            checked
	 * @param {TreeNode}
	 *            node
	 * @param {Boolean}
	 *            isSCN--是否Single Check Node
	 * @param {Boolean}
	 * 			  isClear
	 */
	check : function(checked, node, isSCN,isClear) {
		if (checked === null) {
			checked = node.getUI().checkbox.checked;
		} else {
			node.getUI().checkbox.checked = checked;
		}
		node.attributes.checked = checked;
		if (!isSCN) {
			this.childNodeCheck(node, checked);
			var pNode = node.parentNode;
			if (pNode != null) {
				if (!checked || !this.childHasIsOrUnChecked(pNode, false)) {// 取消当前节点的选中状态，或者其父节点的子节点无未选中节点
					this.parentNodeCheck(pNode, checked);
				}
			}
		}
		if (checked) {
			node.getUI().addClass("x-tree-selected");
			this.node.getOwnerTree().selectNode = node;
		} else {
			node.getUI().removeClass("x-tree-selected");
			var selectedNodes = this.node.getOwnerTree().getChecked()
			if(selectedNodes.length >0){
				this.node.getOwnerTree().selectNode = selectedNodes[0];
			}else{
				this.node.getOwnerTree().selectNode = null;
			}
		}
		if(isClear) return;
		node.getOwnerTree().fireEvent("checkchange", node, checked);
	},
	/**
	 * 迭代设置parentNode状态
	 * 
	 * @param {TreeNode}
	 *            node
	 * @param {Boolean}
	 *            checked
	 */
	parentNodeCheck : function(node, checked) {
		var checkbox = node.getUI().checkbox;
		if (typeof checkbox == 'undefined')
			return;
		checkbox.checked = checked;
		node.attributes.checked = checked;
		if (checked) {
			node.getUI().addClass("x-tree-selected");
		} else {
			node.getUI().removeClass("x-tree-selected");
		}
		var pNode = node.parentNode;
		if (pNode != null) {
			if (!checked || !this.childHasIsOrUnChecked(pNode, false)) {
				this.parentNodeCheck(pNode, checked);
			}
		}
	},
	/**
	 * 迭代设置childNodes状态
	 * 
	 * @param {TreeNode}
	 *            node
	 * @param {Boolean}
	 *            checked
	 */
	childNodeCheck : function(node, checked) {
		var cn = node.childNodes;
		for (var i = 0; i < cn.length; i++) {
			var cnui = cn[i].getUI();
			if (checked) {
				cnui.addClass("x-tree-selected");
			} else {
				cnui.removeClass("x-tree-selected");
			}
			cn[i].attributes.checked = checked;
			cnui.checkbox.checked = checked;
			this.childNodeCheck(cn[i], checked);
		}
	},
	/**
	 * 判断节点的childNodes中是否有(未)选中节点
	 * 
	 * @param {TreeNode}
	 *            node
	 * @param {Boolean}
	 *            isChecked:true--判断是否有选中节点;false--判断是否有未选中节点
	 * @return {Boolean}
	 */
	childHasIsOrUnChecked : function(node, isChecked) {
		var cn = node.childNodes;
		if (cn || cn.length > 0) {
			for (var i = 0; i < cn.length; i++) {
				var cnui = cn[i].getUI();
				if (cnui.checkbox.checked == isChecked)
					return true;
			}
		}
		return false;
	}
});
