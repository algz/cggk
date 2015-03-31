Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsAdd = {addDialog:null,addForm:null,topics:null,classPacketList:null,classid:null,rolegrid:null};
//Ext.form.Field.prototype.msgTarget = 'side';
newsAdd.addNews = function(){
	//Seam.Component.getInstance("news_newsclass_NewsClassService").getNewsClassList(newsAdd.getNewsClassList);
	newsAdd.getAddDialog();
};


newsAdd.getRoleGrid = function(){
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
       header: ""+getResource('resourceParam503')+"",//选择
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
		  	header: ""+getResource('resourceParam809')+"", //角色编号
		  	width: 180, 
		  	dataIndex: 'roleid'
	  	},
	  	{
			header: ""+getResource('resourceParam796')+"",//角色描述
			dataIndex: 'rolename',
			width: 200
		}]
  });
	
 
  var tb=null;
  newsAdd.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);
  newsAdd.rolegrid.height=300,
  newsAdd.rolegrid.width=550,
  newsAdd.rolegrid.region= 'center';
 	//return newsAdd.rolegrid;
 //newsAdd.rolegrid.load();
//  newsAdd.rolegrid.doLayout();
};


newsAdd.getAddForm = function(){
	if (news.node!=null){ 
		newsAdd.classid=news.node.attributes.classid;
	};
	newsAdd.addForm = new Ext.FormPanel({
		 labelAlign: 'left',
    //title: '表单例子',
		 region:'north',
    buttonAlign:'right',
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
	                fieldLabel: ''+getResource('resourceParam504')+'',//关联项目不能粘贴
	                allowBlank:false,
	                name: 'newsTitle',
	                anchor:'90%'
	           	 	}]
        	},{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [
	            		new Ext.form.ComboBox({
		        	 	columnWidth:.5,
			        	 	store: new Ext.data.Store({
									proxy: new Ext.data.HttpProxy({
							            url: '../JSON/news_newsclass_NewsClassService.getNewsClassListJSON'
							        }),
							        reader: new Ext.data.JsonReader({
							            root: 'results',
							            totalProperty: 'totalCount',
							            id: 'classid'
							        }, ['classid','classname'])
							}),	
							valueField :"classid",
							displayField: "classname",
							mode: 'remote',
							forceSelection: true,
							blankText:''+getResource('resourceParam459')+''+getResource('resourceParam1829')+'', //请选择+所属栏目
							emptyText:''+getResource('resourceParam459')+''+getResource('resourceParam1829')+'',
							hiddenName:'classid',
							editable: false,
							triggerAction: 'all',
							allowBlank:false,
							fieldLabel: ''+getResource('resourceParam1829')+'',//所属栏目
							name: 'classid',
							anchor:'95%'
                           })
		                  ]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: ''+getResource('resourceParam1830')+'',//信息来源
	                allowBlank:false,
	                name: 'newsCopyfrom',
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.22,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'包含图片',
	                boxLabel:''+getResource('resourceParam512')+'',
	                name: 'newsIncludepic',
	                checked:true,
	                inputValue:'1',
	                anchor:'95%'
	            	}]
       		 }
       		 ,{
	            columnWidth:.10,
	            layout: 'form',
	            labelWidth:0,
	            labelSeparator:'',
	            hideLabels:true,
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: '',
	                boxLabel:''+getResource('resourceParam510')+'',
	                name: 'newsIncludepic',
	                inputValue:'0',
	                anchor:'95%'
	           		 }]
	        },{
	            columnWidth:.22,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'热点',
	                boxLabel:''+getResource('resourceParam512')+'',
	                name: 'newsIshot',
	                checked:true,
	                inputValue:'1',
	                anchor:'95%'
	            	}]
       		 }
       		 ,{
	            columnWidth:.10,
	            layout: 'form',
	            labelWidth:0,
	            labelSeparator:'',
	            hideLabels:true,
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: '',
	                boxLabel:''+getResource('resourceParam510')+'',
	                name: 'newsIshot',
	                inputValue:'0',
	                anchor:'95%'
	           		 }]
	        }
	        ,{
	            columnWidth:.22,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'推荐',
	                boxLabel:''+getResource('resourceParam512')+'',
	                name: 'newsIstuijian',
	                checked:true,
	                inputValue:'1',
	                anchor:'95%'
	            	}]
       		 }
       		 ,{
	            columnWidth:.10,	
	            layout: 'form',
	            labelWidth:0,
	            labelSeparator:'',
	            hideLabels:true,
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: '',
	                boxLabel:''+getResource('resourceParam510')+'',
	                name: 'newsIstuijian',
	                inputValue:'0',
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
	                name: 'newsKey',
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
	                name: 'newsUrl',
	                anchor:'90%'
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
                fieldLabel:''
            }
        },{
        	title:''+getResource('resourceParam1832')+'',
            layout:'fit',
            items: {
                xtype:'textarea',
                id:'newsContent',
                name:'newsContent',
                fieldLabel:''
            }
        },{
            title:''+getResource('resourceParam1833')+'',
            layout:'fit',
            items: {
                xtype:'textarea',
                id:'newsFujian',
                name:'newsFujian',
                fieldLabel:''
            }
        }
        ,{
            title:''+getResource('resourceParam1828')+'',
            layout:'fit',
           items: newsAdd.rolegrid
        }]
    }],
 
   buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(newsAdd.addForm.form.isValid()){	
						var newsForm = Seam.Remoting.createType("com.luck.itumserv.news.news.NewsForm");
						Ext.apply(newsForm,newsAdd.addForm.form.getValues());
						Seam.Component.getInstance("news_news_NewsService").save(newsForm,newsAdd.addsave); 
					}
				}
			},
			{   text: '取消',
				handler: function(){				
					newsAdd.addDialog.hide();	
				}
			}
		]	

	});				
	return newsAdd.addForm;
};
newsAdd.addsave = function(value){
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
		newsAdd.addDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam1827')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
newsAdd.getFormPanel= function(){
	newsAdd.getAddForm();
	tlework.addHtml(tlework.divHtml,'updataroleform');	
	newsAdd.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'updataroleform',
         region:'north',
		 layout:'fit',
        // height:240,
         autoHeight:true,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
newsAdd.getAddDialog = function(){
	 
	tlework.addHtml(tlework.divHtml,'addnews');	
	newsAdd.getRoleGrid();
	newsAdd.getFormPanel();
	//newsAdd.getAddForm();
	if (!newsAdd.addDialog){	
		newsAdd.addDialog = new Ext.Window({ 
			el:'addnews',
			title: ''+getResource('resourceParam1834')+'',
           	layout:'fit',
			modal:true,
           	width:650,
           	height:520,
           	closeAction:'hide',
           	plain: true,
			items:newsAdd.addForm						
		});
		//newsAdd.addForm.add(newsAdd.rolegrid);
		//newsAdd.rolegrid.doLayout();
		newsAdd.addDialog.on('hide',newsAdd.close);
	}
	myGrid.loadvalue(newsAdd.rolegrid.store,null,[2]);
	newsAdd.addDialog.show();
};
newsAdd.close = function(){			
		newsAdd.addForm.form.reset();									
		newsAdd.addDialog.destroy();
		newsAdd.addForm = null;					
		newsAdd.addDialog = null;
};
