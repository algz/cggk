Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClassHebin = {
	win:null,
	form:null
};
newsClassHebin.hebinNewsClass = function(){
	if (newsClass.node==null){
		Ext.MessageBox.show({
			title: '警告',
			msg: ''+getResource('resourceParam1835')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	newsClassHebin.getAddDialog();
};



newsClassHebin.getAddDialog = function(){
	tlework.addHtml(tlework.divHtml,'hebinNewsClass');	
	//newsClassHebin.getRoleGrid();
	newsClassHebin.getFormPanel();
	//newsClassHebin.initTabpanel();
	
	if (!newsClassHebin.addDialog){	
		newsClassHebin.addDialog = new Ext.Window({ 
			el:'hebinNewsClass',
			title: '栏目'+getResource('resourceParam507')+'',
           	layout:'fit',
			modal:true,
           	width:350,
           height:150,
           	closeAction:'hide',
           	plain: true,
			items:newsClassHebin.hebinForm						
		});
		newsClassHebin.addDialog.on('hide',newsClassHebin.close);
	}

	newsClassHebin.addDialog.show();
};

newsClassHebin.close = function(){			
		newsClassHebin.hebinForm.form.reset();									
		newsClassHebin.addDialog.destroy();
		newsClassHebin.hebinForm = null;					
		newsClassHebin.addDialog = null;
};




newsClassHebin.getHebinForm = function() {
	//Ext.form.Field.prototype.msgTarget='side';
	newsClassHebin.hebinForm = new Ext.FormPanel({
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
					fieldLabel:'当前栏目',
					style:'border:0px;background:transparent;',
					name:'classname',
					id:'classname',
					readOnly:true,
					grow:true,
					value:newsClass.node.attributes.classname,
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
						inputType:'hidden',
						id:'classid',
						name: 'classid',
						height:10,
						value:newsClass.node.attributes.classid
				}]
			}
			]
		
		,   buttons: [
			{	text: ''+getResource('resourceParam507')+'',
				handler: function(){
					if(newsClassHebin.hebinForm.form.isValid()){	
						var newsClassForm = Seam.Remoting.createType("com.luck.itumserv.news.newsclass.NewsClassForm");
						Ext.apply(newsClassForm,newsClassHebin.hebinForm.form.getValues());
						Seam.Component.getInstance("news_newsclass_NewsClassService").save(newsClassForm,newsClassHebin.hebinSave); 
					}
				}
			},
			{   text: '取消',
				handler: function(){				
					newsClassHebin.addDialog.hide();	
				}
			}
		]	

	});	
	
	return newsClassHebin.hebinForm;
	
}



newsClassHebin.hebinSave = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: '操作成功',
			msg: '该栏目'+getResource('resourceParam507')+'成功!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		newsClass.tree.getLoader().load(newsClass.tree.getRootNode());
		//将选中记录置为空
		newsClass.node = null;				
		newsClassHebin.addDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam651')+'',
			msg: '该栏目'+getResource('resourceParam507')+'失败！',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};

newsClassHebin.getFormPanel= function(){
	newsClassHebin.getHebinForm();
	tlework.addHtml(tlework.divHtml,'hebinForm');	
	newsClassHebin.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'hebinForm',
         region:'north',
		 layout:'fit',
        // height:520,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}


