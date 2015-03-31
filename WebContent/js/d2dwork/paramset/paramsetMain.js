//默认空白图片
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var paramsetMain = {updateParamDialog:null,updateParamGrid:null,grid:null,args:{start:0,limit:20},gridpanel:null,showForm:null};
paramsetMain.init = function(){
	paramsetMain.grid = paramsetGrid.getGrid();
	paramsetMain.grid.store.load({params:{start:0,limit:20}});
	
	var status = '<div id="status" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px"   align="left">' +
					' <div id="btn" style="float:left;width:120; padding-top:0px;padding-left:10px;">' +
						'<a style="cursor: hand" onclick="paramsetUpdate.updateTaskType(paramsetMain.grid)">' +
						'<IMG SRC="../images/update_param.jpg" align="middle"></a>' +
					'</div>' +
				 	'</div>';
	paramsetMain.showForm = 
		{
				collapsible: false,
				region:'north',
				height:30,
				split:false,
				html:status	
	};
	
	paramsetMain.gridpanel = new Ext.Panel({
		region:'center',
		layoutConfig: {columns:1},
		layout:'border',
		baseCls:'x-plain',
        //bodyStyle:'padding:5px',
		autoScroll:true,
		defaults: {frame:false, width:850, height: 490},
		items:[paramsetMain.showForm,paramsetMain.grid]
	});
	
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:paramsetMain.gridpanel
    });
	
}

Ext.onReady(paramsetMain.init,paramsetMain,true)
