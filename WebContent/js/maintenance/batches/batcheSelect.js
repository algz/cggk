
var batcheSelect = {selectDialog:null,batcheform:null};

/**
 * 查询批次
 */
batcheSelect.init = function(){   
	
	if (!batcheSelect.selectDialog){	
		tlework.addHtml(tlework.divHtml,"batcheselect");
		batcheSelect.selectDialog = new Ext.Window({ 
		el:'batcheselect',
		title: ''+getResource('resourceParam652')+'批次'+getResource('resourceParam508')+'',
		modal: true,
		layout:'fit',
		width:300,
		height:140,
		closeAction:'hide',
		plain: false,
		items: batcheSelect.selectbatcheform()						
		});
	}
	batcheSelect.selectDialog.show();
	batcheSelect.selectDialog.on("hide",function(){
		batcheSelect.selectDialog.close();
		batcheSelect.selectDialog.destroy();		
		batcheSelect.selectDialog = null;
		
	});
};

/**
 * 生成查询批次的Form面板
 */
batcheSelect.selectbatcheform = function(){
	batcheSelect.batcheform = new Ext.FormPanel({

		labelWidth: 75, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		items:[
			{	
				xtype:'combo',
				width:175,
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/aofoquery_GongyiwcComboxSvr.getModel"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'model'
						},{
							name : 'modelname'		
						}])
					}),
			
				valueField :"model",
				displayField: "modelname",
				mode: 'remote',
				forceSelection: true,
				hiddenName:'model',
				editable: false,
				triggerAction: 'all',
				fieldLabel: '型号',
				name: 'model'
			},
			{	fieldLabel: '批次'+getResource('resourceParam480')+'',
				name: 'batchname',
				width:175
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam652')+'',
				handler: function()
					{		
						var batcheVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.batches.BatcheVo");
						Ext.apply(batcheVo,batcheSelect.batcheform.getForm().getValues());
						batcheMain.baseargs={
							model:batcheVo.getModel(),
							batchname:batcheVo.getBatchname()
						}
						myGrid.loadvalue(batcheMain.batchegrid.store,batcheMain.args,batcheMain.baseargs);
						batcheSelect.selectDialog.hide();
					}
					
			},
			{   text: '取消',
				handler: function(){
						batcheSelect.selectDialog.hide();
					}
			}]	
		});				
		return batcheSelect.batcheform;
};
