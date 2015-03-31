Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClassRemove = {
	win:null,
	form:null
};
newsClassRemove.removeNewsClass = function(){
	if (newsClass.node==null){
		Ext.MessageBox.show({
			title: '警告',
			msg: ''+getResource('resourceParam1835')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	newsClassRemove.getAddDialog();
};



newsClassRemove.getAddDialog = function(){
	tlework.addHtml(tlework.divHtml,'removeNewsClass');	
	//newsClassRemove.getRoleGrid();
	newsClassRemove.getFormPanel();
	//newsClassRemove.initTabpanel();
	
	if (!newsClassRemove.addDialog){	
		newsClassRemove.addDialog = new Ext.Window({ 
			el:'removeNewsClass',
			title: '栏目'+getResource('resourceParam1197')+'',
           	layout:'fit',
			modal:true,
           	width:350,
           height:150,
           	closeAction:'hide',
           	plain: true,
			items:newsClassRemove.removeForm						
		});
		newsClassRemove.addDialog.on('hide',newsClassRemove.close);
	}

	newsClassRemove.addDialog.show();
};

newsClassRemove.close = function(){			
		newsClassRemove.removeForm.form.reset();									
		newsClassRemove.addDialog.destroy();
		newsClassRemove.removeForm = null;					
		newsClassRemove.addDialog = null;
};




newsClassRemove.getRemoveForm = function() {
	//Ext.form.Field.prototype.msgTarget='side';
	newsClassRemove.removeForm = new Ext.FormPanel({
		height:150,
		xtype:'form',
		region:'north',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:100,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:[
			
			{
				//columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'当前'+getResource('resourceParam1829')+'',
					style:'border:0px;background:transparent;',
					name:'classname',
					id:'classname',
					readOnly:true,
					grow:true,
					value:newsClass.node.attributes.parentName,
					//width:140
					anchor:'90%'
				}]
			}
			,
			{
				//columnWidth:.5,
				layout:"form",
				items: [{
	            	xtype:'combo',
	                //columnWidth:.5,
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
							emptyText:''+getResource('resourceParam503')+'目标栏目',
							hiddenName:'parentId',
							editable: false,
							triggerAction: 'all',
							allowBlank:false,
							fieldLabel: '目标栏目',
							name: 'parentId',
							anchor:'95%'
	           	 	}]
			}
			,{
				//columnWidth:.5,
				layout:"form",
				items:[{
						xtype:'hidden',
						id:'classid',
						name: 'classid',
						height:10,
						value:newsClass.node.attributes.classid
				}]
			}
			]
		
		,   buttons: [
			{	text: ''+getResource('resourceParam1197')+'',
				handler: function(){
					if(newsClassRemove.removeForm.form.isValid()){	
						var newsClassForm = Seam.Remoting.createType("com.luck.itumserv.news.newsclass.NewsClassForm");
						Ext.apply(newsClassForm,newsClassRemove.removeForm.form.getValues());
						Seam.Component.getInstance("news_newsclass_NewsClassService").remove(newsClassForm,newsClassRemove.removeSave); 
					}
				}
			},
			{   text: '取消',
				handler: function(){				
					newsClassRemove.addDialog.hide();	
				}
			}
		]	

	});	
	
	return newsClassRemove.removeForm;
	
}



newsClassRemove.removeSave = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: '操作成功',
			msg: '该栏目'+getResource('resourceParam1197')+'成功!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		newsClass.tree.getLoader().load(newsClass.tree.getRootNode());
		//将选中记录置为空
		newsClass.node = null;				
		newsClassRemove.addDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam651')+'',
			msg: '该栏目'+getResource('resourceParam1197')+'失败！',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};

newsClassRemove.getFormPanel= function(){
	newsClassRemove.getRemoveForm();
	tlework.addHtml(tlework.divHtml,'removeForm');	
	newsClassRemove.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'removeForm',
         region:'north',
		 layout:'fit',
        // height:520,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}


