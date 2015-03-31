Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsQuery = {queryDialog:null,queryForm:null};
newsQuery.queryNews = function(){
	newsQuery.getQueryDialog();
}
newsQuery.getQueryDialog = function(){
	tlework.addHtml(tlework.divHtml,'newsQuery');	
	if (!newsQuery.queryDialog){		
		newsQuery.queryDialog = new Ext.Window({ 
			el:'newsQuery',
			title: ''+getResource('resourceParam652')+'',
           	layout:'fit',
			modal:true,
           	width:300,
           	height:390,
           	closeAction:'hide',
           	plain: false,
			items:newsQuery.getqueryForm()						
		});
		newsQuery.queryDialog.on('hide',newsQuery.close);
	}
	newsQuery.queryDialog.show();
};
newsQuery.close = function(){
	newsQuery.queryForm.form.reset();
	newsQuery.queryDialog.destroy();	
	newsQuery.queryForm = null;					
	newsQuery.queryDialog = null;	
};
newsQuery.getqueryForm = function(){
	newsQuery.queryForm = new Ext.FormPanel({
		 labelAlign: 'left',
		 region:'north',
    buttonAlign:'right',
    bodyStyle:'padding:5px',
    width: 600,
    frame:true,
    labelWidth:80,
		items:[
		{   
			xtype:'textfield',
			fieldLabel: ''+getResource('resourceParam504')+'',
			name: 'newsTitle',
			id:'newsTitle',
			anchor:'95%',
			minLength:1,
			maxLength:20
		}
		,{
	            layout: 'form',
	            border:false,
	            items: [
	            		new Ext.form.ComboBox({
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
							blankText:''+getResource('resourceParam459')+'栏目',
							emptyText:''+getResource('resourceParam459')+'栏目',
							hiddenName:'classid',
							editable: false,
							triggerAction: 'all',
							allowBlank:false,
							fieldLabel: '栏目',
							name: 'classid',
							anchor:'95%'
                           })
		                  ]
        	}
        ,{   
			xtype:'datefield',
			fieldLabel: ''+getResource('resourceParam1842')+'',
			name: 'newsUpdatetime',
			id:'newsUpdatetime',
			anchor:'95%',
			minLength:1,
			maxLength:20
		}
		],								
		buttons: [
			{	text: ''+getResource('resourceParam652')+'',
				handler: function()
					{	
						news.baseargs = {
							newsTitle:Ext.get('newsTitle').dom.value,
							classid:Ext.get('classid').dom.value
							//newsUpdatetime:Ext.get('newsUpdatetime').dom.value
						}							
						news.loadvalue();	
						newsQuery.queryDialog.hide();				
					}
			},
			{   text: '取消',
				handler: function(){					
						newsQuery.queryDialog.hide();	
				}
			}
		]	
	});				
	return newsQuery.queryForm;
};
