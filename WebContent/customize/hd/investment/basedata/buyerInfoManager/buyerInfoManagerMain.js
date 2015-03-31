Ext.onReady(function() {

			Ext.QuickTips.init();

			new Ext.Viewport({ // 页面布局
				layout : 'fit',
				autoHeight : true,
				items : [new buyerInfoManager.mainGrid()]
			});

		}, this)