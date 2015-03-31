var collarbCenter ={
};
//tab页第二页的center
collarbCenter.init=function()
{
	collarbCenter.form=collarbViewTaskForm.init();
	collarbCenter.egridpanel1= new Ext.Panel({
		id:'etabpanel1',
		height :800,
		autoWidth:true,
	 	title: '' + getResource('resourceParam9024') + '' , // text : 属性
	 	items:[collarbCenter.form]
	     });
	collarbCenter.egridpanel2= new Ext.Panel({
		id:'etabpanel2',
		height :800,
		autoWidth:true,
	 	title:''+getResource('resourceParam474')+'',
	 	html : '<div id="coopProjectCenterPanel" style="height:618px;overflow:auto;"></div>'
	     });
	     
	collarbCenter.egridpanel2.on("activate", function() {
				if (Ext.get("coopProjectCenterPanel") == undefined){
					return;
				}
				Ext.get("coopProjectCenterPanel").dom.innerHTML = "";
				var node = collarbTabpanel.tasktree.getSelectionModel()
						.getSelectedNode();
				if (node != null && node.id != 0) {
					taskColumnTree.init(node, collarbMain.leafId,
							"coopProjectCenterPanel");
				}
			})
	collarbCenter.egridpanel3= new Ext.Panel({
		id:'etabpanel3',
		height :800,
		autoWidth:true,
	 	title:''+getResource('resourceParam1154')+''
	     });
	collarbCenter.egridpanel4= new Ext.Panel({
		id:'etabpanel4',
		height :800,
		autoWidth:true,
	 	title:''+getResource('resourceParam607')+''
	     });
	collarbCenter.egridpanel5= new Ext.Panel({
		id:'etabpanel5',
		height :800,
		autoWidth:true,
	 	title:''+getResource('resourceParam629')+''
	     });
	collarbCenter.approvalHistoryPanel= new Ext.Panel({
		id:'approvalHistoryPanel',
		height :800,
		autoWidth:true,
	 	title:''+getResource('resourceParam1153')+''
	     });
	
	//TAB面板
	collarbCenter.etabpanel=new Ext.TabPanel({
		id:'etabpanel',
		minTabWidth:300,
		resizeTabs:true,
		items:[
				collarbCenter.egridpanel1,
				collarbCenter.egridpanel2,
				collarbCenter.egridpanel3,
				collarbCenter.egridpanel4,
				collarbCenter.egridpanel5,
				collarbCenter.approvalHistoryPanel
			 ],
		activeTab:0
    });

	//中间面板
	collarbCenter.cpanel = new Ext.Panel({
		id : 'cPanel',
		region :'center',
		layout:'column',
		collapsible : true,
		items:[collarbTabpanel.taskCardFrame,collarbCenter.etabpanel]
	});
	return collarbCenter.cpanel;
}
