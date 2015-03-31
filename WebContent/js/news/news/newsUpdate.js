Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsUpdate = {updateDialog:null,updateForm:null,topics:null,classPacketList:null,roleGrid:null};
//Ext.form.Field.prototype.msgTarget = 'side';
newsUpdate.updateNews = function(){
	if (myGrid.row==null){
		Ext.MessageBox.show({
			title: '警告',
			msg: ''+getResource('resourceParam1835')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	newsUpdate.getUpdateDialog();
};


newsUpdate.getRoleGrid = function(){
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
  newsUpdate.roleGrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);
  newsUpdate.roleGrid.height=300,
  newsUpdate.roleGrid.width=550,
  newsUpdate.roleGrid.region= 'center';
 	//return newsUpdate.roleGrid;
 //newsUpdate.roleGrid.load();
//  newsUpdate.roleGrid.doLayout();
};


newsUpdate.getUpdateForm = function(){
	newsUpdate.updateForm = new Ext.FormPanel({
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
	                fieldLabel: ''+getResource('resourceParam504')+'',
	                allowBlank:false,
	                name: 'newsTitle',
	                value:myGrid.row.get('newsTitle'),
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
							blankText:''+getResource('resourceParam459')+''+getResource('resourceParam1829')+'',
							emptyText:''+getResource('resourceParam459')+''+getResource('resourceParam1829')+'',
							hiddenName:'classid',
							editable: false,
							triggerAction: 'all',
							allowBlank:false,
							fieldLabel: ''+getResource('resourceParam1829')+'',
							value:myGrid.row.get('classname'),
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
	                fieldLabel: ''+getResource('resourceParam1830')+'',
	                allowBlank:false,
	                name: 'newsCopyfrom',
	                value:myGrid.row.get('newsCopyfrom'),
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
           items: newsUpdate.roleGrid
        }]
    }],
 
   buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(newsUpdate.updateForm.form.isValid()){	
						var newsForm = Seam.Remoting.createType("com.luck.itumserv.news.news.NewsForm");
						Ext.apply(newsForm,newsUpdate.updateForm.form.getValues());
						Seam.Component.getInstance("news_news_NewsService").save(newsForm,newsUpdate.addsave); 
					}
				}
			},
			{   text: '取消',
				handler: function(){				
					newsUpdate.updateDialog.hide();	
				}
			}
		]	

	});				
	return newsUpdate.updateForm;
};
newsUpdate.addsave = function(value){
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
		newsUpdate.updateDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam1827')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
newsUpdate.getFormPanel= function(){
	newsUpdate.getUpdateForm();
	tlework.addHtml(tlework.divHtml,'updateForm');	
	newsUpdate.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'updateForm',
         region:'north',
		 layout:'fit',
        // height:240,
         autoHeight:true,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
newsUpdate.getUpdateDialog = function(){
	 
	tlework.addHtml(tlework.divHtml,'updateNews');	
	newsUpdate.getRoleGrid();
	newsUpdate.getFormPanel();
	//newsUpdate.getUpdateForm();
	if (!newsUpdate.updateDialog){	
		newsUpdate.updateDialog = new Ext.Window({ 
			el:'updateNews',
			title: ''+getResource('resourceParam1392')+'',
           	layout:'fit',
			modal:true,
           	width:650,
           	height:520,
           	closeAction:'hide',
           	plain: true,
			items:newsUpdate.updateForm						
		});
		//newsUpdate.updateForm.add(newsUpdate.roleGrid);
		//newsUpdate.roleGrid.doLayout();
		newsUpdate.updateDialog.on('hide',newsUpdate.close);
	}
	myGrid.loadvalue(newsUpdate.roleGrid.store,null,[2]);
	newsUpdate.updateDialog.show();
	document.getElementById("classid").value=myGrid.row.get('classid');
};
newsUpdate.close = function(){			
		newsUpdate.updateForm.form.reset();									
		newsUpdate.updateDialog.destroy();
		newsUpdate.updateForm = null;					
		newsUpdate.updateDialog = null;
};
