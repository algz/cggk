var _bodyHeight=Ext.getBody().getHeight();
function doSearch(){

{
             var condition=document.getElementById("condition").value;
            if(condition==""||condition=="请输入要检索的关键词")return;
            var doctypes=document.getElementsByName("clazz");
            var doctype="all";
            for(var i=0;i<doctypes.length;i++){
                if(doctypes[i].checked){
                    doctype=doctypes[i].value;
                }
            }
            window.open('../js/edm/knowledge/searchResult.jsp?doctype='+doctype+'&query='+condition);
		}

}


/**
 * 词条列表
 * 
 */
 var SelectedTreeNode;
var KnowledgeDictGridView = {
	currentRow:null,
	ini : function() {
		var strurl = '../JSON/km_dictInstanceRemote.getDictsByTreeNode';
		var proxy = new Ext.data.HttpProxy({
					url : strurl
				});
		var reader = new Ext.data.JsonReader({
					root : 'results',
					totalProperty : 'totalProperty'
				}, ['id', 'title', 'alias','summarry','treeNode','treeNodeName','url']);
		var ascid = 'id';
		var ascstr = 'asc';
		var ds = new data.Store(proxy, reader, ascid, ascstr);
		ds.baseParams = {
            start:0, limit:25
        };
		var sm = new Ext.grid.CheckboxSelectionModel({
					listeners : {
							selectionchange : function(sm) {
								if(sm.getCount()>=1){
									Ext.getCmp('delete_dict_button').enable();	
								}else{
									Ext.getCmp('delete_dict_button').disable();
								}
								if (sm.getCount() == 1) {
									Ext.getCmp('modfig_editDict_button').enable();
								} else {
									Ext.getCmp('modfig_editDict_button').disable();
								}
						}
					}
		});
		var cm = new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [sm,new Ext.grid.RowNumberer(), {
				header : "词条名称",
				dataIndex : 'title',
				renderer:function(value,p,r){return "<a style='text-decoration:underline; color:blue;'  href='"+encodeURI(encodeURI(r.get("url")))+"' target=_blank>"+value+"</a>"},
				width : 80
			}, {
				header : "词条别名",
				dataIndex : 'alias',
				width : 120
			}, {
				header : "词条摘要",
				dataIndex : 'summarry',
				width : 120
			}, {
				header : "所属分类",
				dataIndex : 'treeNodeName',
				width : 120
			}]
		});

		var newDictButton = {
			text : '添加词条',
			handler : function() {
				Ext.getCmp("layout0").hide();
				Ext.getCmp("layout1").hide();
				Ext.getCmp("dictForm").show();
//				Ext.getCmp("dictForm").setHeight(_bodyHeight-60);
				Ext.getCmp("panel").doLayout();
				Ext.getCmp('richEditor').load({
					url:'../js/edm/knowledge/richEditor.jsp',
					params:{height:Ext.getCmp('panel').getHeight()}
				});
			}
		};
		var editDictButton = {
			id : 'modfig_editDict_button',
			text : '修改词条',
			handler : function() {
				var record=Ext.getCmp("dictGridPanel").getSelectionModel().getSelected();
				if(record==undefined){
					Ext.Msg.alert("提示","请选择要修改的数据!");
					return;
				};
				
				
				
				Ext.getCmp("layout0").hide();
				Ext.getCmp("layout1").hide();
				Ext.getCmp("dictForm").show();
				Ext.getCmp("dictForm").setHeight(Ext.getCmp("panel").getHeight()-40);
				Ext.getCmp("panel").doLayout();
				
				
				callSeam("km_dictInstanceRemote",
								"getById", [record.get("id")], function(result) {
									Ext.getCmp("dictForm").getForm().setValues(result);
									FCKeditorAPI.GetInstance("dictContent").SetHTML(result.content);
								});
				
				
			}
		};
		var deleteDictButton = {
			id : 'delete_dict_button',
			text : '删除词条',
			handler : function() {
				var record=Ext.getCmp("dictGridPanel").getSelectionModel().getSelected();
				if(record==undefined){
					Ext.Msg.alert("提示","请选择要删除的数据!");
					return;
				};
				if(window.confirm("确实要删除吗？")){
					var records_ar = Ext.getCmp("dictGridPanel").getSelectionModel().getSelections();
					var record_ids = [];
					for(var i=0;i<records_ar.length;i++){
						record_ids.push(records_ar[i].get("id"));
					}
					callSeam("km_dictInstanceRemote",
								"deleteDict", [record_ids.join(",")], function(result) {
									
									var obj=Ext.decode(result);
									if(obj.success==true){
									Ext.getCmp("dictGridPanel").getStore().reload();
									}
									
									
								});
					
				}

			}
		};

		var tb = new Array();
		tb.push(newDictButton);
		tb.push("-");
		tb.push(editDictButton);
		tb.push("-");
		tb.push(deleteDictButton);
		return new Ext.grid.GridPanel({
					title : '词条列表',
					store : ds,
					id:'dictGridPanel',
					cm : cm,
					sm : sm,
					autoScroll : true,
					trackMouseOver : true,
					viewConfig : {
						forceFit : true,
						enableRowBody : true,
						showPreview : true
					},
					tbar : tb,
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : ds,
								displayInfo : true
							}),
					stripeRows : true
//					listeners : {
//						afterrender : function() {
//							Ext.getCmp('delete_dict_button').disable();
//							Ext.getCmp('modfig_editDict_button').disable();
//						}
//					}
				});
	}
};
var KnowledgeFileGridView = {
	ini : function() {
		var strurl = '../JSON/km_fileInstanceRemote.getKmFilesByTreeNode';
		var proxy = new Ext.data.HttpProxy({
					url : strurl
				});
		var reader = new Ext.data.JsonReader({
					root : 'results',
					totalProperty : 'totalProperty'
				}, ['id','fileId','summarry', 'fileName', 'suffix','treeNode','treeNodeName','url']);
		var ascid = 'id';
		var ascstr = 'desc';
		var ds = new data.Store(proxy, reader, ascid, ascstr);
		ds.baseParams = {
			treeNode : "",
			start:0, limit:25
		}
		var sm = new Ext.grid.CheckboxSelectionModel({
			listeners : {
					selectionchange : function(sm) {
						if (sm.getCount() > 0) {
							Ext.getCmp('delete_file_button').enable();
						} else {
							Ext.getCmp('delete_file_button').disable();
						}
				}
			}
		});
		var cm = new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [sm,new Ext.grid.RowNumberer(), {
				header : "文档名称",
				dataIndex : 'fileName',
				renderer:function(value,p,r){return "<a style='text-decoration:underline; color:blue;' href='"+encodeURI(encodeURI(r.get("url")))+"'>"+value+"</a>"},
				width : 80
			}, {
				header : "文档摘要",
				dataIndex : 'summarry',
				width : 120
			}, {
				header : "所属分类",
				dataIndex : 'treeNodeName',
				width : 120
			}]
		});

		var newDictButton = {
			text : '添加文档',
			handler : function() {

				Ext.getCmp("layout0").hide();
				Ext.getCmp("layout1").hide();
				Ext.getCmp("fileForm").show();
				Ext.getCmp("fileForm").setHeight(Ext.getCmp("panel").getHeight()-40);
				Ext.getCmp("panel").doLayout();
			}
		};
		
		var deleteFileButton = {
			id : 'delete_file_button',
			text : '删除文档',
			handler : function() {
				var record=Ext.getCmp("fileGridPanel").getSelectionModel().getSelected();
				if(record==undefined){
					Ext.Msg.alert("提示","请选择要删除的数据!");
					return;
				};
				if(window.confirm("确实要删除吗？")){
					
					var records_ar = Ext.getCmp("fileGridPanel").getSelectionModel().getSelections();
					var record_ids = [];
					for(var i=0;i<records_ar.length;i++){
						record_ids.push(records_ar[i].get("id"));
					}
					callSeam("km_fileInstanceRemote",
								"deleteFile", [record_ids.join(",")], function(result) {
									var obj=Ext.decode(result);
									if(obj.success==true){
									Ext.getCmp("fileGridPanel").getStore().reload();
									}
									
									
								});
					
				}

			
			}
		};

		var tb = new Array();
		tb.push(newDictButton);
		tb.push("-");
	
		tb.push(deleteFileButton);
		return new Ext.grid.GridPanel({
					title : '文档列表',
					store : ds,
					id:'fileGridPanel',
					cm : cm,
					sm : sm,
					autoScroll : true,
					trackMouseOver : true,
					viewConfig : {
						forceFit : true,
						enableRowBody : true,
						showPreview : true
					},
					tbar : tb,
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : ds,
								displayInfo : true
							}),
					stripeRows : true
				});
	}
};
/**
 * 搜索条件
 */
var SearchPanel={
	/**
	 * 创建搜索框
	 * @return {}
	 */
	ini:function(){
		
		return new Ext.Panel({
				 frame:false,
				 height:30,
				 border:false,
				 html:"	 <div id='conditonDiv' style='padding-top:8px;'><span style='padding-left:15px;'><input id='all' value='all' checked='checked' name='clazz'"+
						 "type='radio'/><label style='padding-left:3px;' for='all'>全部</label></span>" +
						 "<span style='padding-left:15px;'><input id='dict' name='clazz' value='dict'"+
						 "type='radio'/><label style='padding-left:3px;' for='dict'>词条</label></span>"+
						 "<span style='padding-left:15px;'><input id='msword' name='clazz' value='msword'"+
						 "type='radio'/><label style='padding-left:3px;' for='msword'>WORD</label></span>"+
						 "<span style='padding-left:15px;'><input id='msxls' name='clazz' value='msxls'"+
						 "type='radio'/><label style='padding-left:3px;' for='msxls'>EXCEL</label></span>"+
						 "<span style='padding-left:15px;'><input id='msppt' name='clazz' value='msppt'"+
						 "type='radio'/><label style='padding-left:3px;' for='msppt'>PPT</label></span>" +
						 "<span style='padding-left:15px;'><input id='pdf' name='clazz' value='pdf'"+
						 "type='radio'/><label style='padding-left:3px;' for='pdf'>PDF</label></span>" +
						 "<span style='padding-left:15px;'><input id='txt' name='clazz' value='txt'"+
						 "type='radio'/><label style='padding-left:3px;' for='txt'>TXT</label></span>" +
						 "<span style='padding-left:15px;'><input style='' id='condition' name='condition' maxlength=70"+
						 "size=30 type='text'/></span>" +
						 "<span style='padding-left:15px;'><input  id='doSearch' onclick='doSearch()'  type='button' name='button'"+
						 "value='搜索'/></span>" +
						 "</div>" +
						 "<div style='height:10px;'></div>"
		})
	}
};

var DictForm={
	ini:function(){
		var dictForm=new Ext.form.FormPanel({
			id:'dictForm',
			frame:true,
			title:'添加词条',
			autoScroll:true,
			hidden:true,
			listeners:{"hide":function(el){

				el.getForm().reset();
				try{
				FCKeditorAPI.GetInstance("dictContent").SetHTML('');
				}catch(e){}


			},'show':function(){

				if(SelectedTreeNode){
					Ext.getCmp('dictTreeNodeId').setValue(SelectedTreeNode.id);
					Ext.getCmp('dictTreeNodeValue').setValue(SelectedTreeNode.text);
				}else{
					Ext.getCmp('dictTreeNodeId').setValue(cateKowleInstancePanel.attributeTree.root.id);
					Ext.getCmp('dictTreeNodeValue').setValue(cateKowleInstancePanel.attributeTree.root.text);
				}

			}},
			labelWidth : 60,
			buttons:[{text:'保存',handler:function(){
				if(dictForm.getForm().isValid()){
					var vo = Seam.Component.newInstance("DictEntity");
					Ext.apply(vo, dictForm.getForm().getValues());
					var content=FCKeditorAPI.GetInstance("dictContent");
					vo.content=content.GetXHTML(true);
					if(vo.content==""){
						Ext.Msg.alert("提示","词条内容不能为空!");
						return;
					}
					callSeam("km_dictInstanceRemote",
								"saveOrUpdate", [vo], function(result) {

									var obj = Ext.util.JSON.decode(result);
									if(true==obj.success){
											Ext.example.msg(
										"" + getResource('resourceParam575')
												+ "",
										"" + getResource('resourceParam1072')
												+ "");
												Ext.getCmp("dictForm").hide();
										 		Ext.getCmp("layout0").show();
										 		Ext.getCmp("layout1").show();
										 		Ext.getCmp("dictGridPanel").getStore().reload();
										 		var height=Ext.getCmp('panel').getHeight();
												Ext.getCmp('layout1').setHeight(height-50);
									}else{
											Ext.Msg.show({
													title : '提示',
													msg : 'error',
													width : 170,
													buttons : Ext.Msg.OK,
													icon : Ext.Msg.ERROR
												});
									}

								});
				}
		 	}},{text:'返回',handler:function(){
		 		Ext.getCmp("dictForm").hide();
		 		Ext.getCmp("layout0").show();
		 		Ext.getCmp("layout1").show();
		 		var height=Ext.getCmp('panel').getHeight();
				Ext.getCmp('layout1').setHeight(height-50);
			 }}],
			 width:"100%",
			 height:_bodyHeight-80,//TODO
			 items:[
			 	{xtype : 'hidden',name:'optVersion'},
			    {xtype : 'hidden',name:'id',style : 'margin-bottom:5px;',anchor:'80%'},
			 	{xtype : 'textfield',fieldLabel:'词条名称',name:'title',maxLength:200,maxLengthText:'最大200个字符',style : 'margin-bottom:5px;',anchor:'80%',allowBlank:false,invalidText:'名称不能为空'},
				{xtype : 'textfield',fieldLabel:'词条别名',name:'alias',maxLength:200,maxLengthText:'最大200个字符',style : 'margin-bottom:5px;',anchor:'80%'},
				{xtype:'hidden',name:'treeNode',id:'dictTreeNodeId'},
				{xtype : 'textfield',fieldLabel:'所属分类',id:'dictTreeNodeValue',name:'treeNodeName',style : 'margin-bottom: 5px;',anchor:'80%',readOnly:true,allowBlank:false,invalidText:'所属分类不能为空',listeners: {render: function(e) {e.getEl().on('click',function(){createTreeWindow('dictTreeNodeId',e.getId());});}}},
				{xtype : 'textarea',fieldLabel:'词条摘要',name:'summarry',maxLength:2000,maxLengthText:'最大2000个字符',style : 'margin-bottom: 5px;',anchor:'80%'},
				{xtype:'label',fieldLabel:'词条内容'},
			    {id:'richEditor'}
			 ]
		});
		return dictForm;
	}
};

function createTreeWindow(dictTreeNodeId, dictTreeNodeValue){
	var currentNode;
	var tree = new Ext.tree.TreePanel({
		height:285,
		rootVisible : true,
		useArrows : false,
		autoShow : true,
		animate : false,
		enableDD : false,
		containerScroll : false,
		autoScroll:true,
		frame : false,
		loader : new Ext.tree.TreeLoader( {
			url : '../JSON/datacenter_DataCenterRemote.getKowleDataInstanceTree',
			baseParams : {
				nodeid : '',
				node : '',
				tempNode : '',
				isref : 0
			}
		}),
		disabled : false,
		rootVisible : true,
		root : new Ext.tree.AsyncTreeNode({
			id : Ext.getCmp('cateKowleInstancePanelId').getRootNode().id,
			text : Ext.getCmp('cateKowleInstancePanelId').getRootNode().text
		}),
		autoScroll : true,
		listeners : {'click' : function(node){
			currentNode=node;
//		   Ext.getCmp(dictTreeNodeId).setValue(node.id);
//		   Ext.getCmp(dictTreeNodeValue).setValue(node.text);
//		   treeWindow.close();
		}}
	});
	var treeWindow = new Ext.Window({
			title:'请选择分类',
			width:300,
			height:350,
			modal:true,
			containerScroll : true,
			buttons:[{text:'确定',handler:function(){
			if(currentNode){
				Ext.getCmp(dictTreeNodeId).setValue(currentNode.id);
			    Ext.getCmp(dictTreeNodeValue).setValue(currentNode.text);
			}
			treeWindow.close();
			}},{text:'取消',handler:function(){treeWindow.close();}}],
			items:[tree]
	});
	treeWindow.show();
}


var FileForm={
	ini:function(){
		var file=new Ext.form.Field({
			 name : 'fileName',
			 id:'fileName',
			 inputType : 'file',
			 autoWidth:false,
			 fieldLabel : '选择文档',
			 allowBlank:false,
			 invalidText:'文档不能为空',
//			 readOnly:true,
			 width:200
			 }); 
		var summarry=new Ext.form.TextField({
			name:'summarry',
			fieldLabel:'文档摘要',
			anchor:'50%'
		
		});
		var clazz=new Ext.form.TextField({
			name:'treeNodeName',
			fieldLabel:'所属分类',
			id:'fileTreeNodeValue',
			readOnly:true,allowBlank:false,
			invalidText:'分类不能为空',
			anchor:'50%',
			listeners: {render: function(e) {e.getEl().on('click',function(){createTreeWindow('kmFileTreeNodeId',e.getId());});}}	
		});
		var clazzId=new Ext.form.Hidden({
			name:'treeNode',
			id:'kmFileTreeNodeId'
		     
		});
		var fileFormPanel=new Ext.form.FormPanel({
			id:'fileForm',
			frame:true,
			hidden:true,
			listeners:{"hide":function(el){
				try{
				document.getElementById("ext-gen6").reset();
				}catch(e){}
				el.getForm().reset();
				
			},'show':function(){
				try{
				document.getElementById("fileName").value="";
				}catch(e){}
				if(SelectedTreeNode){
					Ext.getCmp('kmFileTreeNodeId').setValue(SelectedTreeNode.id);
					Ext.getCmp('fileTreeNodeValue').setValue(SelectedTreeNode.text);
				}else{
					Ext.getCmp('kmFileTreeNodeId').setValue(cateKowleInstancePanel.attributeTree.root.id);
					Ext.getCmp('fileTreeNodeValue').setValue(cateKowleInstancePanel.attributeTree.root.text);
				}
				
			}},
			fileUpload: true,
			width:'100%',
			bodyStyle : 'padding:5px 5px 0;background:transparent;',
			defaultType : 'textfield', 
			buttons:[{text:'保存',handler:function(){
				if(fileFormPanel.getForm().isValid()){
							if(Ext.getCmp('fileName').getValue()==""){
								Ext.Msg.alert("提示","文件名不能为空!");return;
							}
							fileFormPanel.getForm().submit({
								url : "../FILEUP/km_fileInstanceRemote.saveOrUpdate",
								method : 'POST',
								failure : function() {
									Ext.Msg.alert("提示","出错了!");
								},
								success : function(form, action) {
										Ext.example.msg(
										"" + getResource('resourceParam575')
												+ "",
										"" + getResource('resourceParam1072')
												+ "");
									Ext.getCmp("fileForm").hide();
		 							Ext.getCmp("layout0").show();
		 							Ext.getCmp("layout1").show();
		 							Ext.getCmp("fileGridPanel").getStore().reload();
		 							var height=Ext.getCmp('panel').getHeight();
									Ext.getCmp('layout1').setHeight(height-50);
								}
							});
						
				}
				
			}},{text:'返回',handler:function(){
			
				Ext.getCmp("fileForm").hide();
		 		Ext.getCmp("layout0").show();
		 		Ext.getCmp("layout1").show();
		 		var height=Ext.getCmp('panel').getHeight();
				Ext.getCmp('layout1').setHeight(height-50);
				
			}}],
			items:[file,summarry,clazz,clazzId]
		});
		return fileFormPanel;
		
		
	}
	
	
};

var SearchResult={
	ini:function(){
		return new Ext.Panel({
			id:'searchResult',
			border:false,
			bodyStyle:'height:100%;',
			autoScroll:true,
			layout:'fit',
			html:"<div id='searchResultDiv' style='overflow:auto;'></div>"
		})
	}
};


var KmCenterPanel={
	
	
	ini:function(){
		
	var dictGrid =  KnowledgeDictGridView.ini();
	var fileGrid =  KnowledgeFileGridView.ini();
	var searchPanel =SearchPanel.ini();
	var dictForm = DictForm.ini();
	var searchResult=SearchResult.ini();
	var fileForm=FileForm.ini();
	var layout0={
		border:false,
		id:'layout0',
		items:[searchPanel,{border:false,height:20}]
	};
	var gridLayout=new Ext.TabPanel({
	
		activeTab: 0,
		id:'layout1',
		items:[dictGrid,fileGrid]
	
		
	});
	var panel = undefined;
		if(panel==undefined){
           var height=window.parent.document.documentElement.clientHeight-160;
			panel={
			id : 'panel',
			bodyStyle : "height:100%",
			height:height,
			listeners:{'render':function(){
			    var height=Ext.getBody().getHeight();
                Ext.getCmp('gridResult').setHeight(height-85);
			},'resize':function(component){Ext.getCmp('searchResult').setHeight(component.getHeight()-50);Ext.getCmp('layout1').setHeight(component.getHeight()-50);}},
			region : 'center',
			items : [layout0,{id:'gridResult',activeItem: 0,layout:'card',items:[gridLayout,dictForm,fileForm]},searchResult]
			};
		};
		return panel;
		
	}
	
	
}
