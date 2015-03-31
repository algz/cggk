var gongzrizQuery = {
	queryDialog : null,
	gongzrizform : null
};

/**
 * 查询日志
 */
gongzrizQuery.init = function() {
	if (!gongzrizQuery.queryDialog) {
		tlework.addHtml(tlework.divHtml, "gongzrizQuery");
		gongzrizQuery.queryDialog = new Ext.Window( {
			el : 'gongzrizQuery',
			title : ''+getResource('resourceParam1319')+'',
			modal : true,
			layout : 'border',
			width : 355,
			height : 200,
			closeAction : 'hide',
			plain : false,
			items : gongzrizQuery.querygongzrizform()
		});
	}
	gongzrizQuery.queryDialog.show();
	gongzrizQuery.queryDialog.on("hide", function() {
		gongzrizQuery.queryDialog.close();
		gongzrizQuery.queryDialog.destroy();
		gongzrizQuery.queryDialog = null;

	});
};

/**
 * 生成查询日志的Form面板
 */
gongzrizQuery.querygongzrizform = function() {

	gongzrizQuery.gongzrizform = new Ext.FormPanel( {

		labelWidth : 75, // label settings here cascade unless overridden
		frame:true,
		region:'center',
		plain:false,
		bodyStyle:'padding:5px 5px 0',
		width : 355,
		items : [ 
		{
			layout:'form',
			items:[
				userMain.init('yonghuIdForriz',''+getResource('resourceParam878')+'','yonghuId','100%',true)
			]
		}
		, {
			defaultType : 'textfield',
			fieldLabel : ''+getResource('resourceParam1301')+'',
			xtype : 'datefield',
			format : 'Y-m-d',
			name : 'rizhisj',
			width : 235
		}, {
			defaultType : 'textfield',
			fieldLabel : ''+getResource('resourceParam1320')+'',
			xtype : 'datefield',
			format : 'Y-m-d',
			name : 'updatetime',
			width : 235
		}, {
			defaultType : 'textfield',
			fieldLabel : ''+getResource('resourceParam1321')+'',
			xtype : 'datefield',
			format : 'Y-m-d',
			name : 'addtime',
			width : 235
		}],
		buttons : [
				{
					text : ''+getResource('resourceParam652')+'',
					handler : function() {
						gongzrizMain.baseargs = {
							rizhidId : gongzrizQuery.gongzrizform.getForm()
									.getValues().rizhidId,
							yonghuId : gongzrizQuery.gongzrizform.getForm()
									.getValues().yonghuId,
							tianrurq : gongzrizQuery.gongzrizform.getForm()
									.getValues().tianrurq,
							xiugairq : gongzrizQuery.gongzrizform.getForm()
									.getValues().xiugairq
						};

						myGrid.loadvalue(gongzrizMain.gongzrizgrid.store,
								gongzrizMain.args, gongzrizMain.baseargs);
						gongzrizQuery.queryDialog.hide();
					}

				}, {
					text : '取消',
					handler : function() {
						gongzrizQuery.queryDialog.hide();
					}
				}]
	});
	return gongzrizQuery.gongzrizform;
};
