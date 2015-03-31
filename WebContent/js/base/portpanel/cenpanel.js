/**
 * 布局中部面板
 */
var cenpanel = {panel:null,taskid:null,taskname:null,projectid:null};

cenpanel.init = function(){	
	return cenpanel.panel;
}
  
cenpanel.panel = new  Ext.ux.ManagedIframePanel({
         defaultSrc:'about:blank',	
         id:'center_frame',
         region:'center',
		 layout:'fit',
		 title:''+getResource('resourceParam741')+'',
         margins:'0 5 5 0'

});
cenpanel.setUrl = function(url){
  	cenpanel.panel.setSrc("javascript:false"); 
  	cenpanel.panel.setSrc(url); 
}

/** tab页形式调用方式
cenpanel.panel = new Ext.TabPanel({
    resizeTabs:true, // turn on tab resizing
    region : 'center',
    minTabWidth : 80,
    tabWidth : 120,
    enableTabScroll : true,
    width : 600,
    height : 250,
    defaults : {autoScroll:true},
    plugins : new Ext.ux.TabCloseMenu(),
    items : []
});
cenpanel.setUrl = function(uri, title) {
	var panel = new  Ext.ux.ManagedIframePanel({
		defaultSrc:'about:blank',	
		id:'center_tab_' + uri + '_' + title, // 特别针对数据中心，如果点击两个同种类型的数据中心对象，它的uri是相同的，不同的只是id
		layout : 'fit',
		title : title,
		uri : uri,
		title : title,
		margins : '0 5 5 0',
		closable : uri.indexOf('/') == -1,
		listeners : {
			'close' : function() {
				if(this.uri == 'mytask') {
					delete window.onMyTaskDetails;
				}
				if(this.uri == 'myapproval') {
					delete window.onMyApproveDetails;
				}
			}
		}
	});
	cenpanel.panel.add(panel).show();
	panel.enable();
	if (uri.indexOf('/') > -1) { // 表资产设备的，需要跳转
		panel.setSrc(uri);
	} else {
		if(uri == 'mytask') {
			if(window.onMyTaskDetails) {
				window.onMyTaskDetails();
			}
		}
		if(uri == 'myapproval') {
			if(window.onMyApproveDetails) {
				window.onMyApproveDetails();
			}
		}
		panel.setSrc("center.jsp?" + uri);
	}
}
*/