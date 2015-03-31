Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClassAdd = {addDialog:null,addForm:null,topics:null,classPacketList:null,classid:null};
newsClassAdd.addNewsClass = function(){
	newsClassAdd.getAddDialog();
};
newsClassAdd.getAddForm = function(){
	if (newsClass.node!=null){ 
		newsClassAdd.classid=newsClass.node.attributes.classid;
	};	
	newsClassAdd.addForm = new Ext.FormPanel({
		 labelAlign: 'left',
    //title: '表单例子',
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
	                fieldLabel: ''+getResource('resourceParam1829')+'',
	                name: 'classname',
	                anchor:'90%'
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
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '栏目管理员',
	                name: 'classmaster',
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '栏目链接'+getResource('resourceParam497')+'',
	                name: 'linkurl',
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '栏目'+getResource('resourceParam473')+''+getResource('resourceParam582')+'',
	                name: 'browsepurview',
	                anchor:'90%'
	           	 	}]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '栏目'+getResource('resourceParam605')+''+getResource('resourceParam582')+'',
	                name: 'addpruview',
	                anchor:'90%'
	           	 	}]
        	}
	        ,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'datefield',
	                fieldLabel: '出生'+getResource('resourceParam1120')+'',
	                name: 'birthday',
	                anchor:'90%'
	            }]
      		}
     		,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'combo',
	                store: new Ext.data.SimpleStore(
	                                            {
	                                              fields: ["retrunValue", "displayText"],
	                                              data: [[1,'小学'],[2,'初中'],[3,'高中'],[4,'中专'],[5,'大专'],[6,'大学']]
	                                            }),
	                 valueField :"retrunValue",
	                 displayField: "displayText",
	                 mode: 'local',
	                 forceSelection: true,
	                 blankText:''+getResource('resourceParam459')+'学历',
	                 emptyText:''+getResource('resourceParam503')+'学历',
	                 hiddenName:'education',
	               	 editable: false,
	                 triggerAction: 'all',
	                 allowBlank:false,
	                fieldLabel: '学历',
	                name: 'education',
	                anchor:'90%'
	            }]
     		}
     		,{
	            columnWidth:.35,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'checkbox',
	                fieldLabel: ''+getResource('resourceParam582')+'组',
	                boxLabel:''+getResource('resourceParam839')+'员',
	                name: 'popedom',
	                inputValue:'1',
	                anchor:'95%'
	            }]
      		}
      		,{
	            columnWidth:.2,
	            layout: 'form',
	            labelWidth:0,
	            labelSeparator:'',
	            hideLabels:true,
	            border:false,
	            items: [{
	                xtype:'checkbox',
	                fieldLabel: '',
	                boxLabel:'管理员',
	                name: 'pepedom',
	                inputValue:'2',
	                anchor:'95%'
	            }]
        	}
        	,{
	            columnWidth:.2,
	            layout: 'form',
	            labelWidth:0,
	            labelSeparator:'',
	            hideLabels:true,
	            border:false,
	            items: [{
	                xtype:'checkbox',
	                fieldLabel: '',
	                boxLabel:'普通'+getResource('resourceParam1847')+'',
	                name: 'pepedom',
	                inputValue:'3',
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
	                xtype:'checkbox',
	                fieldLabel: '',
	                boxLabel:'访客',
	                name: 'pepedom',
	                inputValue:'4',
	                anchor:'95%'
	            }]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '电子邮件',
	                name: 'email',
	                vtype:'email',
	                allowBlank:false,
	                anchor:'90%'
	            }]
        	}
        	,{
	            columnWidth:.5,
	            layout: 'form',
	            border:false,
	            items: [{
	                xtype:'textfield',
	                fieldLabel: '个人主页',
	                name: 'url',
	                vtype:'url',
	                anchor:'90%'
	            }]
        	}
        ]
    	}
    	,{
        xtype:'tabpanel',
        plain:true,
        activeTab: 0,
        height:235,
        defaults:{bodyStyle:'padding:10px'},
        items:[{
            title:'登录'+getResource('resourceParam508')+'',
            layout:'form',
            defaults: {width: 230},
            defaultType: 'textfield',
 
            items: [{
                fieldLabel: ''+getResource('resourceParam887')+'',
                name: 'loginID',
                allowBlank:false,
                vtype:'alphanum',
                allowBlank:false
            },{
                       inputType:'password',
                fieldLabel: ''+getResource('resourceParam468')+'',
                name: 'password',
                allowBlank:false
            }]
        },{
            title:'数字'+getResource('resourceParam988')+'字母',
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
            title:''+getResource('resourceParam502')+'区域',
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
						var newsClassForm = Seam.Remoting.createType("com.luck.itumserv.news.newsclass.newsClassForm");
						Ext.apply(newsClassForm,addNewsClass.addForm.form.getValues());
						Seam.Component.getInstance("news_newsclass_NewsClassSerivce").save(newsClassForm,addNewsClass.addsave); 
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
			msg: ''+getResource('resourceParam630')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
newsClassAdd.getAddDialog = function(){
	tlework.addHtml(tlework.divHtml,'addNewsClass');	
	newsClassAdd.getAddForm();
	if (!newsClassAdd.addDialog){	
		newsClassAdd.addDialog = new Ext.Window({ 
			el:'addNewsClass',
			title: ''+getResource('resourceParam477')+'类别'+getResource('resourceParam508')+'',
           	layout:'fit',
			modal:true,
           	width:650,
           	height:380,
           	closeAction:'hide',
           	plain: true,
			items:newsClassAdd.addForm						
		});
		newsClassAdd.addDialog.on('hide',newsClassAdd.close);
	}
	newsClassAdd.addDialog.show();
};
newsClassAdd.close = function(){			
		newsClassAdd.addForm.form.reset();									
		newsClassAdd.addDialog.destroy();
		newsClassAdd.addForm = null;					
		newsClassAdd.addDialog = null;
};
