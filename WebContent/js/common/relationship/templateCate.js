templateCate = {
	rootName : '模板分类',
	privilege : false
}
templateCate.init = function(config) {
	if (config == null) {
		config = {
			fieldLabel : '模板分类'
		}
	}
	var root = new Ext.tree.AsyncTreeNode({
				id : '0',
				text : templateCate.rootName
			});
	var loader = new Ext.tree.TreeLoader({
				dataUrl : "../JSON/groups_GroupsRemote.getWBSTemplateContentTree"
			});
	templateCate.treePanel = new Ext.tree.TreePanel({
				rootVisible : false,
				loader : loader,
				root : root
			});
	loader.on('beforeload', function(treeLoader, node) {
				treeLoader.baseParams.privilege = templateCate.privilege;
			});
	templateCate.templateCombo = new Ext.ux.ComboBoxTree({
		width : 250,
		fieldLabel : config.fieldLabel,
		/**
		 * bug编号985 wangyf
		 * bug信息：在WBS子页第2次另存为任务流程模板时系统默认第1次选择的模板分类，完成后检查该模板放在了根目录下
		 * 注：给下拉树一个默认的值：模板分类
		 * 2011-06-03 15：33
		 */
		emptyText : '模板分类',
		tree : templateCate.treePanel,
		selectNodeModel : 'all',
		onViewClick : function(doFocus) {
			var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
					.getAt(index);
			if (r) {
				this.onSelect(r, index);
			} else {
				// this.collapse();
			}
			if (doFocus !== false) {
				this.el.focus();
			}

		}
	});

	templateCate.templateCombo.on('select', function(combo, record, index) {
				templateCate.itemId = record.id;
				templateCate.itemName = record.text;
			});
	templateCate.templateCombo.on('expand', function(combo) {
				templateCate.treePanel.getRootNode().expand(true);
			});
	templateCate.templateCombo.on('beforequery', function(qe) {
	//			alert(111)
	//			delete qe.combo.lastQuery;
			});

	templateCate.setValue = function(v) {
		if (v != null) {
			templateCate.templateCombo.setRawValue(v);
		} else {
			templateCate.templateCombo.setRawValue(templateCate.rootName);
		}
	}
	return templateCate.templateCombo;

}