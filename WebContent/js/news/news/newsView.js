Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsView = {viewDialog:null,viewForm:null,topics:null,classPacketList:null,roleGrid:null,setBooleanValue:null};
//Ext.form.Field.prototype.msgTarget = 'side';
newsView.viewNews = function(){
	if (myGrid.row==null){
		Ext.MessageBox.show({
			title: '警告',
			msg: ''+getResource('resourceParam1835')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	newsView.getViewDialog();
};


newsView.getRoleGrid = function(){
var strurl = '../JSON/base_user_UserSerivce.updataRole';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'roleid'
        }, [
            'roleid','rolename','descr','roleType'
        ]);
  var ascid = 'roleid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);
  //ds.baseParams={start:0,limit:25};

 
  var checkColumn = new Ext.grid.CheckColumn({
       header: ""+getResource('resourceParam503')+"",
       dataIndex: 'sign',
       width: 100
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
		  	width: 180, 
		  	dataIndex: 'roleid'
	  	},
	  	{
			header: ""+getResource('resourceParam796')+"",
			dataIndex: 'rolename',
			width: 200
		}]
  });
	
 
  var tb=null;
  newsView.roleGrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);
  newsView.roleGrid.height=300,
  newsView.roleGrid.width=550,
  newsView.roleGrid.region= 'center';
 	//return newsView.roleGrid;
 //newsView.roleGrid.load();
//  newsView.roleGrid.doLayout();
};


newsView.getViewForm = function(){

	newsView.viewForm = new Ext.FormPanel({
		 labelAlign: 'left',
    //title: '表单例子',
		 region:'north',
   // buttonAlign:'right',
    bodyStyle:'padding:5px',
    width: 600,
    frame:true,
    labelWidth:80,
    items: [{
        layout:'column',
        border:false,
        labelSeparator:'：',
        items:[
			{
	            columnWidth:.99,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam504')+'',
	                allowBlank:false,
	                style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                name: 'newsTitle',
	                value:myGrid.row.get('newsTitle'),
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam1829')+'',
	                allowBlank:false,
	                 style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                name: 'classid',
	               value:myGrid.row.get('classname'),
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam1830')+'',
	                allowBlank:false,
	                 style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                name: 'newsCopyfrom',
	                value:myGrid.row.get('newsCopyfrom'),
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.33,
	            layout: 'form',
	            border:false,
	            items: [{
	                style:'margin-top:5px',
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'包含图片',
	                style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                name: 'newsIncludepic',
	                anchor:'95%'
	            	}]
       		 }
       		 ,{
	            columnWidth:.33,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'热点',
	               	style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                boxLabel:''+getResource('resourceParam512')+'',
	                name: 'newsIshot',
	                anchor:'95%'
	            	}]
       		 }
       		
	        ,{
	            columnWidth:.33,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'推荐',
	                style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                id: 'newsIstuijian',
	                name: 'newsIstuijian',
	                anchor:'95%'
	            	}]
       		 }
       		
	        ,{
	            columnWidth:.99,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam458')+'',
	                 style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                name: 'newsKey',
	                 value:myGrid.row.get('newsKey'),
	                anchor:'90%'
	           	 	}]
        	}
        	
        	
        	,{
	            columnWidth:.99,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam1831')+'',
	                 style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
	                name: 'newsUrl',
	                value:myGrid.row.get('newsUrl'),
	                anchor:'90%'
	           	 	}]
        	}
        	,{
				columnWidth:.5,
				layout:"form",
				items:[{
						xtype:'hidden',
						id:'id',
						name: 'id',
						height:10,
						value:myGrid.row.get('id')
				}]
			}
			,{
				columnWidth:.5,
				layout:"form",
				items:[{
						xtype:'hidden',
						id:'updateFlag',
						name: 'updateFlag',
						height:10,
						value:'1'
				}]
			}
        	
			
        	
        ]
    	}
    	,{
        xtype:'tabpanel',
        //plain:true,
        activeTab: 0,
        height:300,
        //autoHeight:true,
        defaults:{bodyStyle:'padding:10px'},
        items:[{
            title:''+getResource('resourceParam508')+'引子',
             layout:'fit',
            items: {
                xtype:'textarea',
                id:'newsNote',
                name:'newsNote',
                value:myGrid.row.get('newsNote'),
                fieldLabel:''
            }
        },{
        	title:''+getResource('resourceParam1832')+'',
            layout:'fit',
            items: {
                xtype:'textarea',
                id:'newsContent',
                name:'newsContent',
                value:myGrid.row.get('newsContent'),
                fieldLabel:''
            }
        },{
            title:''+getResource('resourceParam1833')+'',
            layout:'fit',
            items: {
                xtype:'textarea',
                id:'newsFujian',
                name:'newsFujian',
                 value:myGrid.row.get('newsFujian'),
                fieldLabel:''
            }
        }
        ,{
            title:''+getResource('resourceParam1828')+'',
            layout:'fit',
           items: newsView.roleGrid
        }]
    }],
 
   buttons: [
			{   text: ''+getResource('resourceParam506')+'',
				handler: function(){				
					newsView.viewDialog.hide();	
				}
			}
		]	

	});				
	return newsView.viewForm;
};
newsView.addsave = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		news.ds.reload();
		//news.tree.getLoader().load(news.tree.getRootNode());
		//将选中记录置为空
		news.node = null;				
		newsView.viewDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam1827')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
newsView.getFormPanel= function(){
	newsView.getViewForm();
	tlework.addHtml(tlework.divHtml,'viewForm');	
	newsView.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'viewForm',
         region:'north',
		 layout:'fit',
        // height:240,
         autoHeight:true,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
newsView.getViewDialog = function(){
	 
	tlework.addHtml(tlework.divHtml,'viewNews');	
	newsView.getRoleGrid();
	newsView.getFormPanel();
	//newsView.getViewForm();
	if (!newsView.viewDialog){	
		newsView.viewDialog = new Ext.Window({ 
			el:'viewNews',
			title: ''+getResource('resourceParam1846')+'',
           	layout:'fit',
			modal:true,
           	width:650,
           	height:520,
           	closeAction:'hide',
           	plain: true,
			items:newsView.viewForm						
		});
		//newsView.viewForm.add(newsView.roleGrid);
		//newsView.roleGrid.doLayout();
		newsView.viewDialog.on('hide',newsView.close);
	}
	myGrid.loadvalue(newsView.roleGrid.store,null,[2]);
	newsView.viewDialog.show();
	document.getElementById("classid").value=myGrid.row.get('classid');
	newsView.setBooleanValue('newsIstuijian');
	newsView.setBooleanValue('newsIncludepic');
	newsView.setBooleanValue('newsIshot');
	
};
newsView.close = function(){			
		newsView.viewForm.form.reset();									
		newsView.viewDialog.destroy();
		newsView.viewForm = null;					
		newsView.viewDialog = null;
};
newsView.setBooleanValue=function(field)
	{
		if (myGrid.row.get(field)=="1")
		{
			document.getElementById(field).value=""+getResource('resourceParam512')+"";
		}
		else
			document.getElementById(field).value=""+getResource('resourceParam510')+"";
	};
