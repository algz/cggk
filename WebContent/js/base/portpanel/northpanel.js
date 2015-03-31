/**
 * 布局上部面板
 */
var northpanel = {panel:null};

northpanel.init = function(){ 
	return northpanel.panel;
}
northpanel.panel = new Ext.BoxComponent({ 			
                region:'north',
                el: 'header',
                height:62,
                style :"padding: 0 0 0 0 "
            });
