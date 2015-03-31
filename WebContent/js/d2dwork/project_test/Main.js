Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
Ext.onReady(function() {
	new Ext.Viewport({
		layout : 'border', // 布局模式
		items:[{ 
			xtype:'sysware.p2m.collaborateproject',
			region:'center'
		}]
	});
}, this, true);