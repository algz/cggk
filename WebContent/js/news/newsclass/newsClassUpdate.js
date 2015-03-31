Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClassUpdate = {
	win:null,
	form:null,
	tabPanel:null,
	rolegrid:null
};
newsClassUpdate.updateNewsClass = function(){
	if (newsClass.node==null){
		Ext.MessageBox.show({
			title: '警告',
			msg: ''+getResource('resourceParam1835')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	newsClassUpdate.getUpdateDialog();
};
newsClassUpdate.getRoleGrid = function(){
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
		}
	]});
	
 
  var tb=null;
  newsClassUpdate.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);
  newsClassUpdate.rolegrid.height=300,
  newsClassUpdate.rolegrid.width=550,
  newsClassUpdate.rolegrid.region= 'center';
};


newsClassUpdate.getUpdateDialog = function(){
	tlework.addHtml(tlework.divHtml,'updateNewsClass');	
	newsClassUpdate.getRoleGrid();
	newsClassUpdate.getFormPanel();
	newsClassUpdate.initTabpanel();
	
	if (!newsClassUpdate.updateDialog){	
		newsClassUpdate.updateDialog = new Ext.Window({ 
			el:'updateNewsClass',
			title: ''+getResource('resourceParam478')+'栏目'+getResource('resourceParam508')+'',
           	layout:'fit',
			modal:true,
           	width:650,
           	height:490,
           	closeAction:'hide',
           	plain: true,
			items:newsClassUpdate.updateForm						
		});
		newsClassUpdate.updateDialog.on('hide',newsClassUpdate.close);
	}
	newsClassUpdate.tabPanel = newsClassUpdate.updateForm.add(newsClassUpdate.tabPanel);
	myGrid.loadvalue(newsClassUpdate.rolegrid.store,null,[2]);

	newsClassUpdate.updateDialog.show();
	document.getElementById("parentId").value=newsClass.node.attributes.parentId;
	//alert(document.getElementById("parentId").value);
	//alert(newsClass.node.attributes.parentId);
};

newsClassUpdate.close = function(){			
		newsClassUpdate.updateForm.form.reset();									
		newsClassUpdate.updateDialog.destroy();
		newsClassUpdate.updateForm = null;					
		newsClassUpdate.updateDialog = null;
};




newsClassUpdate.getupdateForm = function() {
	//Ext.form.Field.prototype.msgTarget='side';
	newsClassUpdate.updateForm = new Ext.FormPanel({
		height:130,
		xtype:'form',
		region:'north',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:90,
		frame:true,	
		bodyStyle:'pupdateing:5px 5px 0;background:transparent',
		items:[
			{
			layout:'column',
			items:[{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目'+getResource('resourceParam480')+'',
					allowBlank:false,
					name:'classname',
					value:newsClass.node.attributes.classname,
					//width:140
					anchor:'90%'
				}]
			}
			,
			{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目代码',
					allowBlank:false,
					value:newsClass.node.attributes.classCode,
					name:'classCode',
					anchor:'90%'
				}]
			}
			,
			{
				columnWidth:.5,
				layout:"form",
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
							value:newsClass.node.attributes.parentName,
							name: 'parentId',
							anchor:'95%'
	           	 	}]
			}
			,
			{
				columnWidth:.25,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'推荐栏目',
	                boxLabel:''+getResource('resourceParam512')+'',
	                name: 'iselite',
	                checked:true,
	                inputValue:'1',
	                anchor:'95%'
	            	}]
			}
			,
			{
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
	                name: 'iselite',
	                inputValue:'0',
	                anchor:'95%'
	           		 }]
			}
			,
			{
				columnWidth:.99,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目链接'+getResource('resourceParam497')+'',
					name:'linkurl',
					value:newsClass.node.attributes.linkurl,
					anchor:'90%'
				}]
			}
			,
			{
				columnWidth:.99,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目默认图片',
					name:'classpicurl',
					value:newsClass.node.attributes.classpicurl,
					anchor:'90%'
				}]
			}
			,{
				columnWidth:.5,
				layout:"form",
				items:[{
						xtype:'hidden',
						id:'classid',
						name: 'classid',
						height:10,
						value:newsClass.node.attributes.classid
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
		}]
		,   buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(newsClassUpdate.updateForm.form.isValid()){	
						var newsClassForm = Seam.Remoting.createType("com.luck.itumserv.news.newsclass.NewsClassForm");
						Ext.apply(newsClassForm,newsClassUpdate.updateForm.form.getValues());
						Seam.Component.getInstance("news_newsclass_NewsClassService").save(newsClassForm,newsClassUpdate.addsave); 
					}
				}
			},
			{   text: '取消',
				handler: function(){				
					newsClassUpdate.updateDialog.hide();	
				}
			}
		]	

	});	
	
	
	return newsClassUpdate.updateForm;
	
}

newsClassUpdate.initTabpanel = function() {
	newsClassUpdate.tabPanel = new Ext.TabPanel({
		region:'center',
		//autoScroll:true,
		activeTab:0,
		height:300,
    	//deferredRender:false,
    	autoTabs:true,
		items:[{
			id:'readme',
			title:'栏目'+getResource('resourceParam1256')+'',
			layout:'border',
			items:[{
				xtype:'htmleditor',
				region:'center',
				value:newsClass.node.attributes.readme,
				name:'readme'
			}]
		}
		,{
			id:'classmaster',
			title:'栏目管理'+getResource('resourceParam582')+'',
			layout:'fit',
			autoScroll:true,
			items:newsClassUpdate.rolegrid
		}
		, {
			id:'addpruview',
			title:'栏目'+getResource('resourceParam605')+''+getResource('resourceParam582')+'',
			layout:'fit',
			autoScroll:true,
			items:newsClassUpdate.rolegrid
		}
		, {
			id:'browsepurview',
			title:'栏目'+getResource('resourceParam473')+''+getResource('resourceParam582')+'',
			layout:'fit',
			autoScroll:true,
			items:newsClassUpdate.rolegrid
		}
		]
	});
};

newsClassUpdate.addsave = function(value){
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
		newsClassUpdate.updateDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: '栏目'+getResource('resourceParam594')+',请重新'+getResource('resourceParam494')+'！',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};

newsClassUpdate.getFormPanel= function(){
	newsClassUpdate.getupdateForm();
	tlework.addHtml(tlework.divHtml,'updataroleform');	
	newsClassUpdate.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'updataroleform',
         region:'north',
		 layout:'fit',
        // height:520,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
