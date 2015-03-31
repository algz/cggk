Ext.BLANK_IMAGE_URL = '../../lib/ext/resources/images/default/s.gif';
var systemnewsMain={grid:null,baseargs:null}
systemnewsMain.init=function()
{
	systemnewsMain.grid=systemnewsGrid.init();
    myGrid.loadvalue(systemnewsMain.grid.store,{start:0,limit:25},systemnewsMain.baseargs);
	  var panel=new Ext.Panel({
    	 id:'systemnewsMainpanel',
    	 region : 'center',
    	 layout:'fit',
    	 height:450,
    	 width:800,
    	 items:[systemnewsMain.grid]
    }).show();

  
    panel.render("div_systemnews");
}

systemnewsMain.deleteMessage=function()
{
	var re=systemnewsMain.selectCode()
	if(re=="" || re==undefined)
	{
	   	Ext.MessageBox.show({
			title : ''+getResource('resourceParam587')+'',
			msg : ''+getResource('resourceParam1416')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.INFO
			});
	   return;
	}
		Ext.MessageBox.confirm(''+getResource('resourceParam1422')+'', ''+getResource('resourceParam1425')+'',function(btn, text){
	    if(btn == 'yes'){
	var appVo = Seam.Remoting.createType("com.luck.itumserv.message.messagesystem.MessageSystemVo");
		appVo.setMessageids(re);
		Seam.Component.getInstance("messagesystem_MessageSystemRemote").deleteSystemMessage(appVo,function(reslut){
			if(reslut=="true")
			{
				
				myGrid.loadvalue(systemnewsMain.grid.store,{start:0,limit:25},systemnewsMain.baseargs);
			}
			else
			{
				Ext.MessageBox.show({
							title : ''+getResource('resourceParam587')+'',
							msg : ''+getResource('resourceParam1418')+'',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
					              });
			}
		});		
		    }
		});	
}

systemnewsMain.selectCode=function()
{
   var result = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		for (var i = 0; i < size; i++) {
			var record = myGrid.rows[i].id;
			result[i] = record;
		}
		return result;
	}
}
Ext.onReady(systemnewsMain.init,systemnewsMain,true);
