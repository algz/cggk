Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClassAdd = {rolegrid:null,panel:null,roleform:null,gridpanel:null,formpanel:null,baseargs:null,initNobr:null};
newsClassAdd.getRolegrid = function(){
  var strurl = '../JSON/news_newsclass_NewsClassSerivce.getTree';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'roleid'
        }, [
            'roleid','rolename',{name:'sign',type:'bool'}
        ]);
  var ascid = 'roleid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);
  //ds.baseParams={start:0,limit:25};

 
  var checkColumn = new Ext.grid.CheckColumn({
       header: ""+getResource('resourceParam503')+"",
       dataIndex: 'sign',
       width: 40
    });
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [
	  	checkColumn,	
	  	{
		  	id:'id',
		  	header: ""+getResource('resourceParam809')+"", 
		  	width: 80, 
		  	dataIndex: 'roleid'
	  	},
	  	{
			header: ""+getResource('resourceParam796')+"",
			dataIndex: 'rolename',
			width: 200
		}]
  });
	
 
  var tb=null;
 newsClassAdd.rolegrid = newsClassAdd.initNobr(ds,cm,tb,null,checkColumn);

     newsClassAdd.rolegrid.region= 'center';
	
	
 

};

newsClassAdd.getroleform = function(){
	newsClassAdd.roleform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        region:'north',
        plain: false,
		frame:false,
		bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 300,
        height:80,
		defaults: {width: 230},
		defaultType: 'textfield',
		labelWidth:80,
		items:[
		{   
			fieldLabel: ''+getResource('resourceParam887')+'',
			width:175,
			disabled:true,
			value:'',
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam872')+'',
			width:175,
			disabled:true,
			value:'',
			anchor:'95%'
		}]
	});				
};
newsClassAdd.getformpanel= function(){
	newsClassAdd.getroleform();
	tlework.addHtml(tlework.divHtml,'newsClassAddform');	
	newsClassAdd.formpanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'newsClassAddform',
         region:'north',
		 layout:'fit',
         height:160,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}

newsClassAdd.addNewsClass = function(){
	///if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	//  	return false;
	//}
	tlework.addHtml(tlework.divHtml,'newsClassAddDialog');	
	newsClassAdd.getRolegrid();
	newsClassAdd.getformpanel();
	if (!newsClassAdd.newsClassAddDialog){		
		newsClassAdd.newsClassAddDialog = new Ext.Window({ 
			el:'newsClassAddDialog',
			title: ''+getResource('resourceParam909')+'',
           	layout:'border',
			modal:true,
           	width:300,
           	height:400,
           	closeAction:'hide',
           	plain: false,
			 buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(newsClassAdd.addForm.form.isValid()){	
						var newsClassForm = Seam.Remoting.createType("com.luck.itumserv.news.newsclass.newsClassForm");
						Ext.apply(newsClassForm,newsClassAdd.addForm.form.getValues());
						Seam.Component.getInstance("news_newsclass_NewsClassSerivce").save(newsClassForm,newsClassAdd.addsave); 
					}
				}
			},
			{   text: '取消',
				handler: function(){				
					newsClassAdd.newsClassAddDialog.hide();	
				}
			}
		]	
		});
		newsClassAdd.newsClassAddDialog.on('hide',newsClassAdd.close);
	}
	
	newsClassAdd.newsClassAddDialog.add(newsClassAdd.roleform);
	newsClassAdd.newsClassAddDialog.add(newsClassAdd.rolegrid);
	myGrid.loadvalue(newsClassAdd.rolegrid.store,null,2);
	newsClassAdd.newsClassAddDialog.show();
	newsClassAdd.newsClassAddDialog.doLayout();
	newsClassAdd.rolegrid.doLayout();
};
newsClassAdd.close = function(){
	newsClassAdd.newsClassAddDialog.destroy();					
	newsClassAdd.newsClassAddDialog = null;	
};
newsClassAdd.getroles = function(){
		var colId = "sign";
		var returnId = "roleid";
		var data = newsClassAdd.rolegrid.store;	
		var result = "";
		var size = data.getCount();
		for(var i = 0; i < size; i++){
			var record = data.getAt(i);
			if(record.data[colId])
				if(result==""){					
			 		result=result+record.data[returnId];
				}else{
			   		result=result+"|"+record.data[returnId];
				}	
		}
		return result;
};
newsClassAdd.saveroles = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});				
		user.loadvalue();	
		newsClassAdd.newsClassAddDialog.hide();		
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam804')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
};
