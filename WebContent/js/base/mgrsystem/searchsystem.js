
var searchsystem = {searchsystem:null,searchsystemform:null};

/**
 * 查询子系统
 */
searchsystem.init = function(){   
	
	if (!searchsystem.selectDialog){	
		tlework.addHtml(tlework.divHtml,"searchsystem");
		searchsystem.selectDialog = new Ext.Window({ 
		el:'searchsystem',
		title: ''+getResource('resourceParam652')+'子'+getResource('resourceParam559')+''+getResource('resourceParam508')+'',
		modal:true,
		layout:'fit',
		width:300,
		height:160,
		closeAction:'hide',
		plain: false,
		items: searchsystem.searchsystemform()						
		});
	}
	searchsystem.selectDialog.show();
};

/**
 * 生成查询角色的Form面板
 */
searchsystem.searchsystemform = function(){
	searchsystem.searchsystemform = new Ext.FormPanel({

		labelWidth: 75,
        frame:true,
        plain: false,
        bodyStyle:'padding:5px 5px 0',
        width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		items:[
			{	fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam461')+'',
				name: 'subSystemId',
				id: 'subSystemId',
				width:175
			},
			{	fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam480')+'',
				name: 'name',
				id: 'name',
				width:175
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam652')+'',
				handler: function()
					{		
						systemgrid.baseargs = {			//设置要传入后台的查询参数
								
								subSystemId:Ext.get('subSystemId').dom.value,
								name:Ext.get('name').dom.value
								};
						
						systemgrid.baseargs = null;
						myGrid.loadvalue(systemgrid.rolegrid.store,systemgrid.args,systemgrid.baseargs);
						searchsystem.selectDialog.close();
						searchsystem.selectDialog.destroy();		
						searchsystem.selectDialog = null;
					}
					
			},
			{   text: getResource("resourceParam3001"),//'取消',
				handler: function(){
						searchsystem.selectDialog.close();
						searchsystem.selectDialog.destroy();		
						searchsystem.selectDialog = null;
					}
			}]	
		});				
		return searchsystem.searchsystemform;
};
