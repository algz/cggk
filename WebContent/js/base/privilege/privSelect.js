
var privSelect = {selectDialog:null,privform:null,sel:false};

/**
 * 查询权限
 */
privSelect.init = function(){   
	
	if (!privSelect.selectDialog){	
		tlework.addHtml(tlework.divHtml,"privselect");
		privSelect.selectDialog = new Ext.Window({ 
		el:'privselect',
		title: ''+getResource('resourceParam773')+'',
		modal: true,
		layout:'fit',
		width:300,
		height:160,
		closeAction:'hide',
		plain: false,
		items: privSelect.selectprivform()						
		});
	}
	privSelect.selectDialog.show();
	privSelect.selectDialog.on("hide",function(){
		privSelect.selectDialog.close();
		privSelect.selectDialog.destroy();		
		privSelect.selectDialog = null;
		
	});
};

/**
 * 生成查询权限的Form面板
 */
privSelect.selectprivform = function(){
	privSelect.privform = new Ext.FormPanel({

		labelWidth: 75, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		items:[
			{	fieldLabel: ''+getResource('resourceParam756')+'',
				name: 'privilegeid',
				width:175
			},
			{	fieldLabel: ''+getResource('resourceParam674')+'',
				name: 'privilegename',
				width:175
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam652')+'',
				handler: function()
					{		
						var privVo = Seam.Remoting.createType("com.luck.itumserv.base.privilege.PrivVo");
						Ext.apply(privVo,privSelect.privform.getForm().getValues());
						privMain.baseargs = {
								privilegeid:privVo.getPrivilegeid(),
								privilegename:privVo.getPrivilegename()
						}
						
						myGrid.loadvalue(privMain.privgrid.store,privMain.args,privMain.baseargs);
						privSelect.sel=true;
						privSelect.selectDialog.hide();
					}
					
			},
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){
						privSelect.selectDialog.hide();
					}
			}]	
		});				
		return privSelect.privform;
};
