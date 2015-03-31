/**
 * Extjs namespace km.main
 * 知识库的主界面：界面构成 （1.左侧知识树 2.右侧上面是搜索栏，下方为知识维护的tab选项卡）
 */
Ext.QuickTips.init();
Ext.namespace("km.main");
//=========================================================以下是功能函数================================
/**
 * 从tabPanel中指定的位置删除面板并替换成新的面板，或者仅仅激活面板
 * @param removePanelId 要删除的panelid
 * @param insertPosition 要插入的位置
 * @param activeTabNumber 要激活的tab 编号
 */
function switchTabPanel (removePanelId, insertPanel, insertPosition, activeTabNumber) {
    if (removePanelId) {
             Ext.getCmp(removePanelId).removeAll(true);
             Ext.getCmp(removePanelId).destroy();
    }
    if (insertPanel) {
        Ext.getCmp("km_tabpanel").insert(insertPosition, insertPanel);
    }
    if (activeTabNumber != undefined) {
        Ext.getCmp("km_tabpanel").setActiveTab(activeTabNumber);
    }
}
//====================================================功能函数结束===========================================
/**
 * 下拉分类树  类
 */
var ComBoxTree = {
    init:function() {
        var _tree = new Ext.ux.ComboBoxTree({
            fieldLabel : '所属分类',
            triggerAction : 'all',
            allowBlank:false,
            anchor:'80%',
            treeIds:'',
            treeTexts:'',
            setValue:function(node){
              Ext.form.ComboBox.superclass.setValue.call(this, node.text);
              this.treeIds=node.id;
              this.treeTexts=node.text;
            },
            getValue:function(){
                return {id:this.treeIds||'',text:this.treeTexts||''}
            },
            width : 300,
            height:200,
            tree : new Ext.tree.TreePanel({
                rootVisible : false,
                listeners:{'beforeload':function(loader,node){
                    _tree.tree.loader.baseParams.checkedIds=  _tree.treeIds;
                },load:function(node){
                    if(_tree.treeIds=="")return;
                    node.cascade(function(){
                        if(_tree.treeIds.indexOf(this.id)>=0){
                            this.attributes.checked=true;
                            this.getUI().toggleCheck(true);
                        }
                    });
                } ,'click':function(node){
                    if(node.attributes.checked!=undefined){
                       if(node.attributes.checked==true){
                           node.getUI().toggleCheck(false);
                       }else{
                          node.getUI().toggleCheck(true);
                       }
                    }
                    return false;
                },"checkchange":function(node,checked){
            } },
                buttonAlign:'left',
                buttons:[{text:'确定',handler:function(){
                    var selNodes = _tree.tree.getChecked();
                    var msg="";
                    var ids="";
                    Ext.each(selNodes, function(node){
                        if(node.id==node.getOwnerTree().root.id) return true;//剔除root根
                        if(msg.length > 0){
                            msg += ',';
                            ids+=",";
                        }
                        msg += node.text;
                        ids+=node.id;
                    });
                    var node={id:ids,text:msg};
                   _tree.setValue(node);
                   _tree.collapse();
                }
                },{text:'清除',handler:function(){
                     var selNodes = _tree.tree.getChecked();
                     Ext.each(selNodes, function(node){
                     node.getUI().toggleCheck(false);
                    });
                }
                }],
                loader : new Ext.tree.TreeLoader({dataUrl : basePath + '/JSON/km_ClassifyTreeRemote.loadTreeWithCheckedStatus'}),
                root : new Ext.tree.AsyncTreeNode({id : '0',text : 'tree'})
            }),
            selectNodeModel : 'all'
        })
        return _tree;
    }
};

/**
 * 分类树
 */
var classifyTree = new Ext.tree.TreePanel({
    animate:true,
    autoScroll:true,
    rootVisible: false,
    selectedNode:null,
    fit:true,
    listeners:{'load':function(){
        try{
            setTimeout(function(){
               var item=classifyTree.getRootNode().item(0);
                 item.fireEvent('click',item);
            },50);

        }catch(e){}
    },'click':function(node, event) {
        this.selectedNode = node;
        var itemId1=Ext.getCmp("km_tabpanel").getComponent(0);
        var itemId2=Ext.getCmp("km_tabpanel").getComponent(1);
        if(itemId1.id=="dictForm"){
           switchTabPanel("dictForm", KnowledgeDictGridView.ini(), 0, 0);
        }
        if(itemId2.id=="fileForm"){
          switchTabPanel("fileForm", KnowledgeFileGridView.ini(), 1, 0);
        }
        Ext.getCmp("fileGridPanel").getStore().load();
        Ext.getCmp("dictGridPanel").getStore().load();
    }},
    /**
     * @param title 窗口标题
     * @param modify  标记是不是编辑树节点
     */
    showWindow:function(title, type) {
        var window = new Ext.Window({
            title:title,
            closable:false,
            modal:true,
            width:280,
            height:100,
            items:[
                {
                    xtype:'form',
                    labelWidth:60,
                    frame:true,
                    id:'classifyform',
                    border:false,
                    items:[new Ext.form.Hidden({id:'classifiedId'}),
                        new Ext.form.TextField({fieldLabel:'节点名称',anchor:'90%',id:'classifiedName',maxLength:50,maxLengthText:'节点名称不能超过50个字！'})]
                }
            ],
            /**
             * 编辑树节点
             */
            editNodeFunction:function() {
                if(Ext.getCmp('classifyform').getForm().isValid()==false ){return;}
                var tree = Seam.Component.newInstance("KM_ClassifyTree");
                tree.id = classifyTree.selectedNode.id;
                tree.text = Ext.getCmp('classifiedName').getValue();
                callSeam("km_ClassifyTreeRemote",
                        "updateTreeNode", [tree], function(result) {
                    classifyTree.selectedNode.setText(tree.text);
                    window.close();
                })
            },
            /**
             * 添加树节点
             */
            addNodeFunction:function() {
                if(Ext.getCmp('classifyform').getForm().isValid()==false ){return;}
                var tree = Seam.Component.newInstance("KM_ClassifyTree");
                var treeId = null;
                if (classifyTree.selectedNode && type=="addNode") {
                    treeId = classifyTree.selectedNode.id;
                }
                tree.text = Ext.getCmp('classifiedName').getValue();
                tree.leaf = true;
                callSeam("km_ClassifyTreeRemote",
                        "addTreeNode", [tree,treeId], function(result) {
                    if (result) {
                        if (classifyTree.selectedNode && type=="addNode") {
                            if (classifyTree.selectedNode.leaf) {
                                classifyTree.selectedNode.leaf = false;
                            }
                            classifyTree.selectedNode.appendChild({id:result,text:tree.text,leaf:true});
                            classifyTree.selectedNode.expand();
                            window.close();
                        }else{
                          classifyTree.getRootNode().appendChild({id:result,text:tree.text,leaf:true});
                            window.close();
                        }
                    }
                });
            },
            buttons:[
                {text:'确定',handler:function() {

                    if (Ext.getCmp('classifiedName').getValue().trim() == "") {
                        Ext.Msg.alert("提示", "分类名称不能为空!");
                    } else {
                        if (type=="modify") {
                            //修改
                            window.editNodeFunction();
                        } else {
                            window.addNodeFunction();
                        }
                    }
                }
                },
                {text:'取消',handler:function() {
                    window.close();
                }
                }
            ]
        }).show();
        if (type=="modify") {
            var treeId = this.selectedNode.id;
            var text = this.selectedNode.text;
            Ext.getCmp("classifiedId").setValue(treeId);
            Ext.getCmp("classifiedName").setValue(text);
        }
    },
    /**
     * 删除节点
     */
    removeNode:function() {
        if (!classifyTree.selectedNode) {
            Ext.Msg.alert('提示', '请选择要删除的节点！');
            return;
        }

        Ext.MessageBox.confirm('提示', '确实要删除吗?', function(btn){
           if(btn=="yes"){
               var treeId = classifyTree.selectedNode.id;
               callSeam("km_ClassifyTreeRemote",
                       "deleteTreeNode", [treeId], function(result) {
                   classifyTree.selectedNode.remove();
                   classifyTree.selectedNode=null;
               });
           }
        } );

    },
    modifyOneNode:function() {
        if (!classifyTree.selectedNode) {
            Ext.Msg.alert("提示", "请选择要修改的节点！");
            return;
        }
        this.showWindow("修改知识节点", "modify");
    },
    addRootNode:function(){
      this.showWindow("新建知识分类","addRoot");
    },
    addOneNode:function() {
        if (!classifyTree.selectedNode) {
            Ext.Msg.alert("提示", "请选择父节点！");
            return;
        }
        this.showWindow("新建知识节点","addNode");
    },
    loader: new Ext.tree.TreeLoader({
        dataUrl:basePath + '/JSON/km_ClassifyTreeRemote.loadTree'
    }),
    root:new Ext.tree.AsyncTreeNode({
        text: 'root',
        draggable:false,
        id:'treeRootNode'
    }),
    containerScroll: true,
    border: false
});

/**
 * 添加文档的表单
 */
var FileForm = {
    ini:function() {
         var _comboxTree=ComBoxTree.init();
         _comboxTree.anchor="50%";
        var file = new Ext.form.Field({
            name : 'fileName',
            id:'fileName',
            inputType : 'file',
            autoWidth:false,
            fieldLabel : '选择文档',
            allowBlank:false,
            invalidText:'文档不能为空',
            width:200
        });
        var summarry = new Ext.form.TextField({
            name:'summarry',
            fieldLabel:'文档摘要',
            anchor:'50%'

        });
        var clazz = new Ext.form.Hidden({
            name:'treeNodeName',
            id:'fileTreeNodeValue'
        });
        var clazzId = new Ext.form.Hidden({
            name:'treeNode',
            id:'kmFileTreeNodeId'
        });
        var fileFormPanel = new Ext.form.FormPanel({
            id:'fileForm',
            frame:true,
            title:'添加文档',
            fileUpload: true,
            width:'100%',
            bodyStyle : 'padding:5px 5px 0;background:transparent;',
            defaultType : 'textfield',
            buttons:[
                {text:'保存',handler:function() {
                    if (fileFormPanel.getForm().isValid()) {
                        if (Ext.getCmp('fileName').getValue() == "") {
                            Ext.Msg.alert("提示", "请选择要上传的文档!");
                            return;
                        }
                        var treeNode = _comboxTree.getValue().id;//treeNodeId;
                        var treeNodeName = _comboxTree.getValue().text;//treeNodeText;
                        clazz.setValue(treeNodeName);
                        clazzId.setValue(treeNode);
                        fileFormPanel.getForm().submit({
                            url : basePath+"FILEUP/km_fileInstanceRemote.saveOrUpdate",
                            method : 'POST',
                            failure : function() {
                                Ext.Msg.alert("提示", "出错了!");
                            },
                            success : function(form, action) {
                                Ext.example.msg("提示","文档添加成功！");
                                 switchTabPanel("fileForm", KnowledgeFileGridView.ini(), 1, 1);
                            }
                        });

                    }

                }},
                {text:'返回',handler:function() {
                    switchTabPanel("fileForm", KnowledgeFileGridView.ini(), 1, 1);
                }}
            ],
            items:[file,summarry,_comboxTree,clazz,clazzId]
        });
        return fileFormPanel;
    }
};

/**
 * 添加词条的表单
 */
var DictForm = {
    ini:function(callback) {
        var height = Ext.getBody().getHeight();
        var _cmboxtree = ComBoxTree.init();
        var dictForm = new Ext.form.FormPanel({
            id:'dictForm',
            frame:true,
            title:'添加词条',
            autoScroll:true,
            labelWidth : 60,
            _loadData:callback,
            buttons:[
                {text:'保存',handler:function() {
                    {
                        if (dictForm.getForm().isValid()) {
                            var vo = Seam.Component.newInstance("DictEntity");
                            Ext.apply(vo, dictForm.getForm().getValues());
                            vo.treeNode = _cmboxtree.getValue().id;//treeNodeId;
                            vo.treeNodeName = _cmboxtree.getValue().text;//treeNodeText;
                            var content = FCKeditorAPI.GetInstance("dictContent");
                            vo.content = content.GetXHTML(true);
                            if (vo.content == "") {
                                Ext.Msg.alert("提示", "词条内容不能为空!");
                                return;
                            }
                            callSeam("km_dictInstanceRemote", "saveOrUpdate", [vo], function(result) {
                                var obj = Ext.util.JSON.decode(result);
                                if (true == obj.success) {
                                    Ext.example.msg("提示", "添加成功！");
                                } else {
                                    Ext.Msg.alert("提示","添加出错了！");
                                }
                                switchTabPanel("dictForm", KnowledgeDictGridView.ini(), 0, 0);
                            });
                        }
                    }
                }
                },
                {text:'返回',handler:function() {
                    switchTabPanel("dictForm", KnowledgeDictGridView.ini(), 0, 0);//删除dictForm 并替换成词条列表 并激活当前面板
                }}
            ],
            listeners:{'afterrender':function() {
                dictForm.add({id:'richEditor'});
                dictForm.doLayout();
                if (dictForm._loadData != undefined) {
                    dictForm._loadData(function(rs) {
                        dictForm.getForm().setValues(rs);
                        _cmboxtree.setValue({id:rs.treeNode,text:rs.treeNodeName});
                        Ext.getCmp('richEditor').load({
                            url:'../richEditor.jsp?height=' + (height - 270),
                            params:{content:rs.content}
                        });
                    });
                } else {
                    Ext.getCmp('richEditor').load({
                        url:'../richEditor.jsp?height=' + (height - 270)
                    });
                }
            } },
            items:[
                {xtype : 'hidden',name:'id',style : 'margin-bottom:5px;',anchor:'80%'},
                {xtype : 'textfield',fieldLabel:'词条名称',name:'title',maxLength:200,maxLengthText:'最大200个字符',style : 'margin-bottom:5px;',anchor:'80%',allowBlank:false,invalidText:'名称不能为空'},
                {xtype : 'textfield',fieldLabel:'词条别名',name:'alias',maxLength:200,maxLengthText:'最大200个字符',style : 'margin-bottom:5px;',anchor:'80%'},
                {xtype:'hidden',name:'treeNode',id:'dictTreeNodeId'}, _cmboxtree,
                {xtype : 'textarea',fieldLabel:'词条摘要',name:'summarry',maxLength:2000,maxLengthText:'最大2000个字符',style : 'margin-bottom: 5px;',anchor:'80%'},
                {xtype:'label',fieldLabel:'词条内容'}
            ]
        });
        return dictForm;
    }
};
/**
 * 词条列表
 */
var KnowledgeDictGridView = {
    ini : function() {
        var ds = new Ext.data.JsonStore({
            url:basePath + 'JSON/km_dictInstanceRemote.getDictsByTreeNode',
            fields:['id', 'title', 'alias','summarry','treeNode','treeNodeName','url'],
            root : 'results',
            totalProperty : 'totalProperty',
            listeners:{'beforeload':function(ds,option){
                 ds.removeAll();
               option.params.node=classifyTree.selectedNode?classifyTree.selectedNode.id:'';
            }},
            baseParams: { start:0, limit:25}
        }) ;
        setTimeout(function(){
             ds.load();
            },500) ;

        var sm = new Ext.grid.CheckboxSelectionModel({
            listeners : {
                selectionchange : function(sm) {
                    if (sm.getCount() >= 1) {
                        Ext.getCmp('delete_dict_button').enable();
                    } else {
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
	            renderer:function(value, p, r) {
	                return "<a style='text-decoration:underline; color:blue;'  href='" + basePath + "base/" + encodeURI(encodeURI(r.get("url"))) + "' target=_blank>" + value + "</a>"
	            },
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
                switchTabPanel("dictGridPanel", DictForm.ini(), 0, 0);//添加词条 用添加词条的表单替换此面板
            }
        };
        var editDictButton = {
            id : 'modfig_editDict_button',
            text : '修改词条',
            disabled:true,
            handler : function() {
                var record = Ext.getCmp("dictGridPanel").getSelectionModel().getSelected();
                if (record == undefined) {
                    Ext.Msg.alert("提示", "请选择要修改的数据!");
                    return;
                }
                var _form = DictForm.ini(function(loadBack) {
                    callSeam("km_dictInstanceRemote", "getById", [record.get("id")], loadBack)
                });
                switchTabPanel("dictGridPanel", _form, 0, 0);
            }
        };
        var deleteDictButton = {
            id : 'delete_dict_button',
            text : '删除词条',
             disabled:true,
            handler : function() {
                var record = Ext.getCmp("dictGridPanel").getSelectionModel().getSelected();
                if (record == undefined) {
                    Ext.Msg.alert("提示", "请选择要删除的数据!");
                    return;
                }


             Ext.MessageBox.confirm('提示', '确实要删除吗?', function(btn){
           if(btn=="yes"){
               var records_ar = Ext.getCmp("dictGridPanel").getSelectionModel().getSelections();
               var record_ids = [];
               for (var i = 0; i < records_ar.length; i++) {
                   record_ids.push(records_ar[i].get("id"));
               }
               callSeam("km_dictInstanceRemote",
                       "deleteDict", [record_ids.join(",")], function(result) {
                   var obj = Ext.decode(result);
                   if (obj.success == true) {
                       Ext.getCmp("dictGridPanel").getStore().reload();
                   }
               });


           }        } );
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
        });
    }
};
/**
 * 文档列表
 */
var KnowledgeFileGridView = {
    ini : function() {
        var ds = new Ext.data.JsonStore({
            url:basePath+'JSON/km_fileInstanceRemote.getKmFilesByTreeNode',
            fields:['id','fileId','summarry', 'fileName', 'suffix','treeNode','treeNodeName','url'],
            root : 'results',
			totalProperty : 'totalProperty' ,
            listeners:{
                'beforeload':function(ds,option){
                    ds.removeAll();
//                    alert(classifyTree.selectedNode);
                    option.params.node=classifyTree.selectedNode?classifyTree.selectedNode.id:'';

                }
            },
            baseParams : {
                start:0, limit:25
            }
        });
         setTimeout(function(){
             ds.load();
            },1200) ;
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
	            renderer:function(value, p, r) {
	                return "<a style='text-decoration:underline; color:blue;' href='" + encodeURI(encodeURI(r.get("url"))) + "'>" + value + "</a>"
	            },
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
                switchTabPanel("fileGridPanel", FileForm.ini(), 1, 1);
            }
        };
        var deleteFileButton = {
            id : 'delete_file_button',
            text : '删除文档',
             disabled:true,
            handler : function() {
                var record=Ext.getCmp("fileGridPanel").getSelectionModel().getSelected();
                if(record==undefined){
                    Ext.Msg.alert("提示","请选择要删除的数据!");
                    return;
                };

           Ext.MessageBox.confirm('提示', '确实要删除吗?', function(btn){
           if(btn=="yes"){
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
        } )
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
 * extjs Onready 入口
 */
Ext.onReady(function() {
    bodyHeight = Ext.getBody().getHeight();
    var panel=new Ext.Panel({
        region:'center',
        layout:'border',

        items:[
            {
                region:'west',
                id:'westPanel',
                title: '知识分类',
                split: true,
                fit:true,
                autoScroll: true,
//                height:bodyHeight-10,
                width: 180,
                minSize: 175,
                maxSize: 400,
                collapsible:true,
                window:null,
                tbar:[
                    {text:'新建',menu: [{text: '知识分类',handler:function(){
                         classifyTree.addRootNode();
                    }},{text:'知识节点',handler:function(){
                         classifyTree.addOneNode();
                    } }]},
                    '-',
                    {text:'修改',handler:function() {
                        classifyTree.modifyOneNode();
                    }
                    },
                    '-',
                    {text:'删除',handler:function() {
                        classifyTree.removeNode();
                    }
                    }
                ],
                items:[
                    {tbar:[
                        new Ext.form.TextField({
                            width:130,
                            id:'treeSearchCondition'
                        }),{text:'搜索',style:'padding-left:5px;',handler:function() {
                            var searchCondition = Ext.getCmp('treeSearchCondition').getValue();
                            if (searchCondition == "") {
                                Ext.Msg.alert("提示", "请输入搜索的内容");
                                return;
                            }
                            callSeam("km_ClassifyTreeRemote",
                                    "searchTree", [searchCondition], function(result) {
                                classifyTree.getRootNode().reload();
                                for (var i = 0; i < result.length; i++) {
                                    classifyTree.expandPath("/" + classifyTree.getRootNode().id + result[i]);
                                }
                            });
                        }
                        }
                    ],border:false,items:classifyTree}
                ]
            },
            {
                frame:false,
                region:'center',
                layout:'border',
                items:[
                    new Ext.TabPanel({
                        region: 'center',
                        id:'km_tabpanel',
                        deferredRender: false,
                        activeTab: 0,
                        items: [KnowledgeDictGridView.ini(), KnowledgeFileGridView.ini(),{autoScroll:true,bodyStyle:"padding:0px;margin:0px;", title:'知识搜索',id:'result',autoLoad:{url:basePath+'js/edm/knowledge/searchResult.jsp',scripts:false,callback:function(){
                            $.getScript(basePath+"js/edm/knowledge/searchResult.js",function(){
                                init(); //直接用scripts:true加载js会有冲突，因此在此处调用 searchResult.js中的init方法
                            });
                        }}}]
                    })
                ]
            }
        ]

    });
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: panel
    });
});