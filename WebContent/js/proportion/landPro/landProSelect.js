
var landProSelect = {selectDialog:null,landProform:null,sel:false};

/**
 * 查询里程碑权重
 */
landProSelect.init = function(){   
	
	if (!landProSelect.selectDialog){	
		tlework.addHtml(tlework.divHtml,"landProselect");
		landProSelect.selectDialog = new Ext.Window({ 
		el:'landProselect',
		title: ''+getResource('resourceParam652')+''+getResource('resourceParam1203')+'权重'+getResource('resourceParam508')+'',
		modal: true,
		layout:'fit',
		width:300,
		height:110,
		closeAction:'hide',
		plain: false,
		items: landProSelect.selectlandProform()						
		});
	}
	landProSelect.selectDialog.show();
	landProSelect.selectDialog.on("hide",function(){
		landProSelect.selectDialog.close();
		landProSelect.selectDialog.destroy();		
		landProSelect.selectDialog = null;
		
	});
};

/**
 * 生成查询里程碑权重的Form面板
 */
landProSelect.selectlandProform = function(){
	landProSelect.landProform = new Ext.FormPanel({

		labelWidth: 75, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		items:[
//			{	
//				xtype:'combo',
//				width:175,
//				store:new Ext.data.Store( {
//						proxy : new Ext.data.HttpProxy( {
//							url : "../JSON/proportion_landPro_LandProService.getSelectCombo"
//						}),
//						reader : new Ext.data.JsonReader( {
//							totalProperty : 'totalProperty',
//							root : 'results'
//						}, [ {
//							name : 'landmarkid'
//						},{
//							name : 'landmarkname'		
//						}])
//					}),
//			
//				valueField :"landmarkid",
//				displayField: "landmarkname",
//				mode: 'remote',
//				forceSelection: true,
//				hiddenName:'landmarkid',
//				editable: false,
//				triggerAction: 'all',
//				fieldLabel: '任务过滤',
//				name: 'landmarkid'
//			},
			{	fieldLabel: ''+getResource('resourceParam1851')+'',
				name: 'projectname',
				width:175
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam652')+'',
				handler: function()
					{		
						var landProVo = Seam.Remoting.createType("com.luck.itumserv.proportion.landPro.LandProVo");
						Ext.apply(landProVo,landProSelect.landProform.getForm().getValues());
						landProMain.baseargs={
							projectname:landProVo.getProjectname()
						}
						myGrid.loadvalue(landProMain.landProgrid.store,landProMain.args,landProMain.baseargs);
						landProSelect.sel=true;
						landProSelect.selectDialog.hide();
					}
					
			},
			{   text: '取消',
				handler: function(){
						landProSelect.selectDialog.hide();
					}
			}]	
		});				
		return landProSelect.landProform;
};
