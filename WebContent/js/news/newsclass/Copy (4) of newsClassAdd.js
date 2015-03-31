Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClassAdd = {addDialog:null,addForm:null,topics:null,classPacketList:null,classid:null,rolegrid:null};
newsClassAdd.addNewsClass = function(){
	newsClassAdd.getAddDialog();
};
//Ext.form.Field.prototype.msgTarget = 'side';

newsClassAdd.getRoleGrid = function(){
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
  newsClassAdd.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);
  newsClassAdd.rolegrid.height=300,
  newsClassAdd.rolegrid.width=550,
  newsClassAdd.rolegrid.region= 'center';
 	//return newsClassAdd.rolegrid;
 //newsClassAdd.rolegrid.load();
//  newsClassAdd.rolegrid.doLayout();
};


newsClassAdd.getAddForm = function(){
	if (newsClass.node!=null){ 
		newsClassAdd.classid=newsClass.node.attributes.classid;
	};	
	newsClassAdd.addForm = new Ext.FormPanel({
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
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '栏目'+getResource('resourceParam480')+'',
	                allowBlank:false,
	                name: 'classname',
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '栏目代码',
	                name: 'classCode',
	                anchor:'90%'
	           	 	}]
        	}
        	
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	            	xtype:'combo',
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
							//blankText:'请选择所属父栏目',
							emptyText:''+getResource('resourceParam503')+'所属父栏目',
							hiddenName:'parentId',
							editable: false,
							triggerAction: 'all',
							allowBlank:false,
							fieldLabel: '所属父栏目',
							name: 'parentId',
							anchor:'95%'
	           	 	}]
        	}
        	,{
	            columnWidth:.25,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'推荐栏目',
	                boxLabel:''+getResource('resourceParam512')+'',
	                name: 'sex',
	                checked:true,
	                inputValue:'1',
	                anchor:'95%'
	            	}]
       		 }
       		 ,{
	            columnWidth:.25,
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
	                name: 'sex',
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
	                fieldLabel: '栏目链接'+getResource('resourceParam497')+'',
	                name: 'linkurl',
	                vtype:'url',
	               // allowBlank:false,
	                anchor:'90%'
	            }]
        	}
        	,{
	            columnWidth:.99,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '栏目默认图片',
	                name: 'classpicurl',
	               // vtype:'url',
	                anchor:'90%'
	            }]
        	}
        ]
    	}
    	,{
        xtype:'tabpanel',
        plain:true,
        activeTab: 0,
        height:300,
        defaults:{bodyStyle:'padding:10px'},
        items:[{
            title:'栏目管理'+getResource('resourceParam582')+'',
            layout:'form',
            //defaults: {width:550},
           // autoWidth:true,
           // height:235,
           //autoHeight:true,
            defaultType: 'textfield',
            items: newsClassAdd.rolegrid
        },{
            title:'栏目'+getResource('resourceParam605')+''+getResource('resourceParam582')+'',
            layout:'form',
            defaults: {width: 230},
            defaultType: 'textfield',
 
            items: [{
                       xtype:'numberfield',
                fieldLabel: '数字',
                name: 'number'
            },{
                       xtype:'timefield',
                fieldLabel: ''+getResource('resourceParam988')+'',
                name: 'time'
            },{
                fieldLabel: '纯字母',
                name: 'char',
                vtype:'alpha'
            }]
        },{
            title:'栏目'+getResource('resourceParam473')+''+getResource('resourceParam582')+'',
            layout:'fit',
            items: {
                xtype:'textarea',
                id:'area',
                fieldLabel:''
            }
        }
        ,{
            title:'栏目'+getResource('resourceParam1256')+'',
            layout:'fit',
            items: {
                xtype:'textarea',
                id:'area',
                fieldLabel:''
            }
        }]
    }],
 
   buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(newsClassAdd.addForm.form.isValid()){	
						var newsClassForm = Seam.Remoting.createType("com.luck.itumserv.news.newsclass.NewsClassForm");
						Ext.apply(newsClassForm,newsClassAdd.addForm.form.getValues());
						Seam.Component.getInstance("news_newsclass_NewsClassService").save(newsClassForm,newsClassAdd.addsave); 
					}
				}
			},
			{   text: '取消',
				handler: function(){				
					newsClassAdd.addDialog.hide();	
				}
			}
		]	

	});				
	return newsClassAdd.addForm;
};
newsClassAdd.addsave = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		newsClass.tree.getLoader().load(newsClass.tree.getRootNode());
		//将选中记录置为空
		newsClass.node = null;				
		newsClassAdd.addDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: '栏目'+getResource('resourceParam594')+',请重新'+getResource('resourceParam494')+'！',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
newsClassAdd.getFormPanel= function(){
	newsClassAdd.getAddForm();
	tlework.addHtml(tlework.divHtml,'updataroleform');	
	newsClassAdd.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'updataroleform',
         region:'north',
		 layout:'fit',
        // height:520,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
newsClassAdd.getAddDialog = function(){

	tlework.addHtml(tlework.divHtml,'addNewsClass');	
	newsClassAdd.getRoleGrid();
	newsClassAdd.getFormPanel();
	//newsClassAdd.getAddForm();
	if (!newsClassAdd.addDialog){	
		newsClassAdd.addDialog = new Ext.Window({ 
			el:'addNewsClass',
			title: ''+getResource('resourceParam477')+'栏目'+getResource('resourceParam508')+'',
           	layout:'fit',
			modal:true,
           	width:650,
           	height:490,
           	closeAction:'hide',
           	plain: true,
			items:newsClassAdd.addForm						
		});
		//newsClassAdd.addForm.add(newsClassAdd.rolegrid);
		//newsClassAdd.rolegrid.doLayout();
		newsClassAdd.addDialog.on('hide',newsClassAdd.close);
	}
	//newsClassAdd.addDialog.add(newsClassAdd.addForm);
	//newsClassAdd.addDialog.add(newsClassAdd.roleGrid);
	myGrid.loadvalue(newsClassAdd.rolegrid.store,null,[2]);
	newsClassAdd.addDialog.show();
};
newsClassAdd.close = function(){			
		newsClassAdd.addForm.form.reset();									
		newsClassAdd.addDialog.destroy();
		newsClassAdd.addForm = null;					
		newsClassAdd.addDialog = null;
};
