//window.error=function(){return true;}
var datacentermain = {};
Ext.QuickTips.init();
onerror=function(){
//	return true;
}

datacentermain.init = function() {
	var dcl = dataCateList.init();
	var vip = cateKowleInstancePanel.init();
	datacentermain.cardpanel = new Ext.Panel({
		border : false,
		layout:'card',
		items : [dcl,vip],
		activeItem : 0
	});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [{
			region : 'center',
			layout : 'fit',
			split : true,
			items : [datacentermain.cardpanel]
		}]

	});
//	viewport.doLayout();
	
};

datacentermain.setActiveItem = function(index, id , text, categoryid ,description) {
//    alert("panel change"+index);
    datacentermain.cardpanel.getLayout().setActiveItem(index);
    cateKowleInstancePanel.loadTree(id, text,categoryid ,description);
//	alert(1);
//	SearchPanel.enablelSearch();
    Ext.getCmp("fileForm").hide();
    Ext.getCmp("dictForm").hide();
    Ext.getCmp("layout0").show();
    Ext.getCmp("layout1").show();
//    alert();
   
    SelectedTreeNode=null;
	var height=Ext.getBody().getHeight();
//	alert(height);
//alert("ok");
	Ext.getCmp('layout1').setHeight(800);
//	Ext.getCmp('searchResult').setHeight(height-50);
//	
		Ext.getCmp("dictGridPanel").getStore().on('beforeload',function(ds){

			if(SelectedTreeNode){
				ds.baseParams.node=SelectedTreeNode.attributes.id;
			}else{
				ds.baseParams.node=id;
			}

		});
		Ext.getCmp("fileGridPanel").getStore().on('beforeload',function(ds){
			if(SelectedTreeNode){
				ds.baseParams.node=SelectedTreeNode.attributes.id;
			}else{
				ds.baseParams.node=id;
			}
		});

	Ext.getCmp('delete_file_button').disable();
	Ext.getCmp('modfig_editDict_button').disable();
	Ext.getCmp('delete_dict_button').disable();
	Ext.getCmp("dictGridPanel").getStore().reload();
	Ext.getCmp("fileGridPanel").getStore().reload();
//	alert("end");
//	Ext.getCmp('richEditor').load({
//
//		url:'../js/edm/knowledge/richEditor.jsp',
//		params:{height:Ext.getCmp('panel').getHeight()}
//
//
//	});

//	Ext.getCmp('dictGridPanel').setHeight((height-75)/2);
//	Ext.getCmp('fileGridPanel').setHeight((height-75)/2);
//	Ext.getDom('condition').value="问题";
//	Ext.getDom("doSearch").click();
};
Ext.onReady(datacentermain.init, datacentermain, true);

