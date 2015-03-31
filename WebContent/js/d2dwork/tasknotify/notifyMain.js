Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var notifyMain = {queryForm:null,cenpanel:null,renwugrid:null,daohangHtml:new Array(),
					daohang:null,args:{start:0,limit:25},baseargs:null,taskid:null,
					chargeddepid:null,taskname:null,chargeddepname:null,tablename:null};


notifyMain.init = function(){
	 
	notifyMain.renwugrid  = notifyGrid.grid(1);
	notifyMain.renwuInfogrid = notifyGrid.grid(2);
 	notifyMain.daohang = notifyMain.getDaohang();
 	notifyMain.daohangs = notifyMain.getDaohangs();
//	notifyMain.daohang.hide();
	notifyMain.tabpanel1 = new Ext.Panel({
						region:'center',
						id:'tabpanel1',
						layout:'border',
					 	title:''+getResource('resourceParam1676')+'',
					 	items:[notifyMain.renwugrid
					 	,notifyMain.daohang
					 	]
					 });
    notifyMain.tabpanel2 = new Ext.Panel({
						id:'tabpanel2',
						layout:'border',
					 	title:''+getResource('resourceParam1677')+'',
					 	items:[notifyMain.renwuInfogrid
					 	,notifyMain.daohangs
					 	]
					 });					 
					 
	notifyMain.tab = new Ext.TabPanel({			
		 		region:'center',
		 		minTabWidth:300,
		 		resizeTabs:true,
				 items:[
					 notifyMain.tabpanel1,
					 notifyMain.tabpanel2
//					 {	
//					 	xtype:'panel',
//					 	id:'tabpanel2',
//					 	title:'已查看消息',
//					 	layout:'border',
//					 	items:[notifyMain.renwuInfogrid,notifyMain.getDaohangs]
//					 }
					 

				 ],
				 activeTab:0
     
		    });
	notifyMain.tablename = 'technics';
	notifyMain.tab.on('tabchange',function(tabpanel,panel ){
	 
	//	notifyMain.queryForm.getForm().reset();
		if(panel.id == 'tabpanel1'){
			notifyMain.baseargs = {
 				validityFlag:1
	  		};
			 
		    myGrid.loadvalue(notifyMain.renwugrid.store,notifyMain.args,notifyMain.baseargs);
		}else{
			notifyMain.baseargs = {
 				validityFlag:2
	  		}; 
			myGrid.loadvalue(notifyMain.renwuInfogrid.store,notifyMain.args,notifyMain.baseargs);
		}
	});
	notifyMain.cenpanel = new Ext.Panel({
		region:'center',
		layout:'border',
		items:[
			notifyMain.tab
			]
	});
	
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	notifyMain.cenpanel
        ]
        
    });   
    notifyMain.tabpanel1.doLayout();
	notifyMain.cenpanel.doLayout();
}


notifyMain.getDaohang = function(){
	var status = '<div id="daohangtitle" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px"   align="left">' +
					'<div id="daohang" style="float:left; padding-top:0px;padding-left:5px;"> </div> ' +
					'<div style="float:right; padding-top:0px;">' +
					'</div> ' +
					' <div id="fanhui" style="float:right; padding-top:0px;padding-right:20px;">' +
					'<a style="cursor: hand" onclick="notifyMain.chakan()">' +
						''+getResource('resourceParam1678')+'</a>'
					'</div>' +
				 	'</div>';
	return new Ext.Panel({
		region:'north',
		height:25,
		html:status
	});
}

notifyMain.getDaohangs = function(){
	var status = '<div id="daohangtitle" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px"   align="left">' +
					'<div id="daohang" style="float:left; padding-top:0px;padding-left:5px;"> </div> ' +
					'<div style="float:right; padding-top:0px;">' +
					'</div> ' +
					' <div id="fanhui" style="float:right; padding-top:0px;padding-right:20px;">' +
					'<a style="cursor: hand" onclick="notifyMain.chakans()">' +
						''+getResource('resourceParam1679')+'</a>'
					'</div>' +
				 	'</div>';
	return new Ext.Panel({
		region:'north',
		height:25,
		html:status
	});
}

notifyMain.chakan = function(){
	var privIds = notifyMain.functioncodes();
	Seam.Component.getInstance
		("tasknotify_TaskNotifySvr").chakan(privIds,notifyMain.save);	
}

notifyMain.chakans = function(){
	
	var privIds = notifyMain.ffunctioncodes();
    if(privIds==null){	Ext.MessageBox.show({
			title: ''+getResource('resourceParam587')+'',
			msg: ''+getResource('resourceParam1673')+' !',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		    });}
    if(privIds==undefined)
    {
     Ext.MessageBox.show({
			title: ''+getResource('resourceParam587')+'',
			msg: ''+getResource('resourceParam1673')+' !',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		    });
    }
    
    var isbox = Ext.MessageBox.confirm(''+getResource('resourceParam6026'), ''+getResource('resourceParam636')+'', function( // 6026警告！
			btn, text) {
		if (btn == 'yes') {
				Seam.Component.getInstance
		("tasknotify_TaskNotifySvr").deletemsg(privIds,notifyMain.deletemsg);	
		}
	})
    


}
notifyMain.deletemsg=function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam475')+'',
			msg: ''+getResource('resourceParam1672')+' !',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1674')+'',
			msg: result,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
   notifyMain.baseargs = {
 				validityFlag:2
	}; 		 
	myGrid.loadvalue(notifyMain.renwuInfogrid.store,notifyMain.args,notifyMain.baseargs);
};
/**
 * 根据返回结果进行操作
 */
notifyMain.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1680')+'',
			msg: '' + getResource('resourceParam6027') // 6027你
				 + getResource('resourceParam503')
				 + '' + getResource('resourceParam6028') // 6028的消息
				 + getResource('resourceParam509')
				 + getResource('resourceParam6029') + ' <' // 6029经转移到
				 + getResource('resourceParam1677')
				 + '>  ' + getResource('resourceParam6030') + '!', // 6030面板
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1675')+'',
			msg: result,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
   notifyMain.baseargs = {
 				validityFlag:1
	}; 		 
	myGrid.loadvalue(notifyMain.renwugrid.store,notifyMain.args,notifyMain.baseargs);
};

notifyMain.ffunctioncodes = function(){		//放回选中行id
	var result = new Array();
	if(myGrid.rows != null){
		var size =myGrid.rows.length;
		for(var i = 0; i < size; i++){
			var record = myGrid.rows[i].id;
			result[i] = record;
		}
		myGrid.rows = null;
		return result;
	}
}

notifyMain.functioncodes = function(){		//放回选中行id
	var result = new Array();
	if(myGrid.rows != null){
		var size =myGrid.rows.length;
		for(var i = 0; i < size; i++){
			var record = myGrid.rows[i].id;
			result[i] = record;
		}
		myGrid.rows = null;
		return result;
	}
}

Ext.onReady(notifyMain.init,notifyMain,true);
