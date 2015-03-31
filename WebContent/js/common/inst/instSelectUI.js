Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var instSelectUI = {
	dataUrl:null
} 

instSelectUI.getCombo = function(fieldLabel, name) {
	dataUrl = '../JSON/common_inst_InstSelectSvr.getMenuDatas';
	function createTree(el){
		return new Ext.tree.TreePanel({
			el:el,
			autoScroll:true,
			animate:true,
			containerScroll: true, 
			dropConfig: {appendOnly:true},
			rootVisible: false,
			loader: new Ext.tree.TreeLoader({
				dataUrl: this.dataUrl,
				baseParams: this.baseParams
			}),
			root:new Ext.tree.AsyncTreeNode()
		});
	};
	return new Ext.form.myTreeField({
		fieldLabel: fieldLabel,
		name:name,
		emptyText:''+getResource('resourceParam890')+'',
		valueField :'instcode',
		hiddenName :'instcode',
		listWidth : 164,
		layerHeight : 300,
//		anchor:'95%',
		dataUrl : dataUrl,
		allowBlank : false
//		createTree : createTree
    });
}


instSelectUI.getComboUser = function(fieldLabel, name) {
	dataUrl = '../JSON/common_inst_InstSelectSvr.getMenuDatas';
	function createTree(el){
		return new Ext.tree.TreePanel({
			el:el,
			autoScroll:true,
			animate:true,
			containerScroll: true, 
			dropConfig: {appendOnly:true},
			rootVisible: false,
			loader: new Ext.tree.TreeLoader({
				dataUrl: this.dataUrl,
				baseParams: this.baseParams
			}),
			root:new Ext.tree.AsyncTreeNode()
		});
	};
	return new Ext.form.myTreeField({
		fieldLabel: fieldLabel,
		name:name,
		emptyText:''+getResource('resourceParam890')+'',
		valueField :'instcode',
		hiddenName :'instcode',
		listWidth : 164,
		layerHeight : 300,
		anchor:'95%',
		dataUrl : dataUrl,
		allowBlank : false,
		createTree : createTree
    });
}

instSelectUI.getCombos = function(fieldLabel, name) {
	dataUrl = '../JSON/common_inst_InstSelectSvr.getDepartment';
	function createTree(el){
		return new Ext.tree.TreePanel({
			el:el,
			autoScroll:true,
			animate:true,
			containerScroll: true, 
			dropConfig: {appendOnly:true},
			rootVisible: false,
			loader: new Ext.tree.TreeLoader({
				dataUrl: this.dataUrl,
				baseParams: this.baseParams
			}),
			root:new Ext.tree.AsyncTreeNode()
		});
	};
	
	
	return new Ext.form.myTreeField({
		fieldLabel: fieldLabel,
		name:name,
		emptyText:''+getResource('resourceParam989')+'',
		valueField :'instcode',
		hiddenName :'instcode',
		listWidth : 164,
		layerHeight : 300,
		anchor:'95%',
		dataUrl : dataUrl,
		allowBlank : false,
		createTree : createTree
    });
}
