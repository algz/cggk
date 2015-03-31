var systemnewsGrid={}
systemnewsGrid.init=function()
{
  var strurl = "";
	systemnewsGrid.proxy = new Ext.data.HttpProxy({
				url :'../../JSON/messagesystem_MessageSystemRemote.systemNewsBox?a='+new Date(),
				method : 'GET'
			});
	
			
	systemnewsGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'messageid'
			}, 
			[
			  'messageid','messagetitle',
			  'messagebody','messagedate','username',
			  'answer'
			]
			);
			
			

	var ds = new Ext.data.Store({
				proxy : systemnewsGrid.proxy,
				reader : systemnewsGrid.reader
			});

	systemnewsGrid.setcm1();
	
	systemnewsMain.deleteMessage=function()
	{
		var re=systemnewsMain.selectCode();
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
					myGrid.rows = null;
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
		var delBt = {
		//bug:795 删除不在中间 gaoyn 2011-5-24 10:45
		text :''+getResource('resourceParam475') + '', // 删除
	
		handler:systemnewsMain.deleteMessage
		
	};
	var tb = ['-',delBt];
	
	grid = myGrid.initBox(ds, systemnewsGrid.cm, tb, systemnewsGrid.sm,null);
	return grid;
}
systemnewsGrid.setcm1 = function() {
	
	systemnewsGrid.sm = new Ext.grid.CheckboxSelectionModel();
	systemnewsGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
	        new Ext.grid.RowNumberer(),
			systemnewsGrid.sm, 
			{
				header : ""+getResource('resourceParam988')+"",
				dataIndex : 'messagedate',
				width : 40
			}, {
				header : ""+getResource('resourceParam1409')+"",
				width : 30,
				dataIndex : 'username'
			}, {
				header : ""+getResource('resourceParam476')+"",
				width : 110,
				dataIndex : 'messagetitle',
			    renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					var str=record.data.answer;
					if(str=="1")//未读的消息
					{
						return "<a href='javascript:void(0);' onclick='systemnewsDetails.init(&quot;"+record.data.messageid+"&quot;);'><span style='font-weight:bold;'>" + record.data.messagetitle
							+ "</span></a>";
					}
					else
					{
						return "<a href='javascript:void(0);' onclick='systemnewsDetails.init(&quot;"+record.data.messageid+"&quot;);'>" + record.data.messagetitle
							+ "</a>";
					}
				}
			}]
	});

}
