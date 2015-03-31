var cateKowleInstancePanel = {};
/**
 * 错误提示对话框
 */
function configAlert(){
	Ext.MessageBox.show({
		title : getResource('resourceParam596') + '!',
		msg : getResource('resourceParam9167') + '',
		width : 250,
		buttons : Ext.MessageBox.OK,
		icon : Ext.MessageBox.ERROR
	});
}
cateKowleInstancePanel.para = null;

/**
 * 知识库页面
 */
cateKowleInstancePanel.init = function() {
	cateKowleInstancePanel.mainpanel = new Ext.Panel( {
		id : 'cateKowleInstancePanel',
		frame : true,
		border : false,
		layout : 'border',
		items : [ 
	        cateKowleInstancePanel.form,
//	        {region : 'center',tbar:[{text:'ok'},{text:'dsf'}],html:'d'}
	        KmCenterPanel.ini()
			
		],
		tbar : [{ // 按钮行
			text : getResource('resourceParam483') + '', // 新建
			handler : function(){
			    // 获得选中节点
				var selectNode = cateKowleInstancePanel.attributeTree.getSelectionModel().getSelectedNode();
				if (selectNode) {
					cateKowleInstancePanel.treeinit(selectNode);
				} else {
					configAlert();	
				}
		    }
		}, '-', {
			text : getResource('resourceParam490') + '', // 编辑
			handler : function() {
							// 获得选中节点
					var checkNode = cateKowleInstancePanel.attributeTree.checkinstancenode;
					var rootNode = cateKowleInstancePanel.attributeTree.getRootNode();
						if (checkNode == null) {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam596')
												+ '!',
										msg : '' + getResource('resourceParam1709')
												+ '',
										buttons : Ext.MessageBox.OK,
										width : 250,
										icon : Ext.MessageBox.ERROR
									});
							return;
						}
						var ntext = "";
						if(checkNode == rootNode){
							ntext = cateKowleInstancePanel.attributeTree.checkinstancenode.attributes.text;
						}else{
							ntext = cateKowleInstancePanel.attributeTree.checkinstancenode.attributes.categoryName;
						}
						dataInstanceUpdate
								.init(cateKowleInstancePanel.attributeTree.checkinstancenode.id,ntext,cateKowleInstancePanel.attributeTree.checkinstancenode.attributes.description,2);
			}
		}, '-',	{
			text : getResource('resourceParam475') + '', // 删除
			handler : function() {
	            // ->删除开始
				var selectNode = cateKowleInstancePanel.attributeTree.getSelectionModel().getSelectedNode();
				if (cateKowleInstancePanel.attributeTree.getRootNode() == selectNode) {
					Ext.MessageBox.show({
						title : getResource('resourceParam596') + '!',
						msg : getResource('resourceParam1710') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
					return;
				}
				if (selectNode == null) {
					Ext.MessageBox.show({
						title : getResource('resourceParam596') + '!',
						msg : getResource('resourceParam9167') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
					return;
				}
				if (selectNode.attributes.isref == 1 && selectNode.parentNode.attributes.isref == 1) {
					Ext.example.msg("" + getResource('resourceParam596') + "", "无法册除此引用实例");
					return;
				}
				Ext.Msg.confirm('' + getResource('resourceParam1724') + '', "" + getResource('resourceParam1720') + "?", function(btn) {
					if (btn == 'yes') {
						var checknode = selectNode;
						var count = 0;
						var length = checknode.childNodes.length;
						var conn = synchronize.createXhrObject();
						var url = "../JSON/privilege_DataPrivilegeRemote.getDataCenterDataManipultations?dataId=" + checknode.id;
						conn.open("GET", url, false);
						conn.send(null);
						var respText = conn.responseText;
						var obj = Ext.util.JSON.decode(respText);
						if (obj.del == false) {
							Ext.MessageBox.show({
								title : '' + getResource('resourceParam1724') + '',
								msg : '不能' + getResource('resourceParam475') + '对象，没有子对象的' + getResource('resourceParam475')
									+ '' + getResource('resourceParam582') + '!',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
							return false;
						} else {
							Ext.Ajax.request({
								url : '../JSON/datacenter_DataCenterRemote.delDataCateInstance',
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON.decode(response.responseText);
									if (obj.success == true) {
										cateKowleInstancePanel.attributeTree.updateversionsymble(selectNode);
										var parentnode = selectNode.parentNode;
										parentnode.removeChild(selectNode);
									} else {
										Ext.MessageBox.show({
											title : '' + getResource('resourceParam1724') + '',
											msg : '' + getResource('resourceParam651') + '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
								},
								disableCaching : true,
								autoAbort : true,
								params : {
									idSequence : selectNode.id,
									isref : selectNode.attributes.isref,
									uniqueid : selectNode.attributes.uniqueid
								}
							});
						}
					}
				});
               	// ->end
			}
		}, '-', {
			text : getResource('resourceParam862') + '', // 返回上页
			handler : function() {
				datacentermain.setActiveItem(0);
			}
		}]
	});
	return cateKowleInstancePanel.mainpanel;
}

/**
 * 渲染知识库树
 */
cateKowleInstancePanel.attributeTree = new Ext.tree.TreePanel( {
	id : 'cateKowleInstancePanelId',
	bodyStyle : 'height:100%',
	rootVisible : true,
	useArrows : false,
	autoShow : true,
	tbar : [
	    new Ext.form.TextField({
		    id : 'kowleSeachTextField'
		}), 
		new Ext.Button( {
			text : getResource('resourceParam7016') + '', // 检索
			listeners : {
				'click' : function() {
					var kowleSeachEle = Ext.getCmp("kowleSeachTextField");
					searchData(kowleSeachEle);
				}
			}
		})
	],
	animate : false,
	enableDD : false,
	containerScroll : false,
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
	root : new Ext.tree.AsyncTreeNode({}),
	autoScroll : true
});
cateKowleInstancePanel.attributeTree.on("click", function(node) {
//	alert(node.attributes.id);
//	alert(node.attributes.text);
	Ext.getCmp("dictGridPanel").getStore().reload({params:{node:node.attributes.id}});
	Ext.getCmp("fileGridPanel").getStore().reload({params:{node:node.attributes.id}});
	Ext.getCmp("searchResult").hide();
//	Ext.getCmp("dictForm").hide();
//	Ext.getCmp("fileForm").hide();
	SelectedTreeNode=node;
	Ext.getCmp("gridResult").show();
//	Ext.get('condition').dom.value='请输入要检索的关键词';
//	Ext.get('condition').on('focus',function(){
//		if(Ext.get('condition').dom.value=="请输入要检索的关键词"){
//		Ext.get('condition').dom.style.color="#000";
//		Ext.get('condition').dom.value='';
//		}
//
//	})
//	Ext.get('condition').on('blur',function(){
//		if(Ext.get('condition').dom.value.length<1){
//
//			Ext.get('condition').dom.value='请输入要检索的关键词';
//			Ext.get('condition').dom.style.color="#ccc";
//		};
//
//	})
	cateKowleInstancePanel.attributeTree.checkinstancenode = node;
})


/**
 * 加载知识库节点数据
 */
cateKowleInstancePanel.loadTree = function(id, text,categoryid,description) {
	var treeNode = new Ext.tree.AsyncTreeNode({
		id : id,
		text : text
	});
	treeNode.attributes["description"]=description;
	cateKowleInstancePanel.id = id;
	cateKowleInstancePanel.text = text;
//	cateKowleInstancePanel.attributeTree.getRootNode().setId(id);
//	cateKowleInstancePanel.attributeTree.getRootNode().setText(text);
	cateKowleInstancePanel.attributeTree.setRootNode(treeNode);
	cateKowleInstancePanel.para = categoryid;
	cateKowleInstancePanel.attributeTree.doLayout();
//	cateKowleInstancePanel.attributeTree.getRootNode().select();
	cateKowleInstancePanel.attributeTree.getRootNode().fireEvent("click",cateKowleInstancePanel.attributeTree.getRootNode());
	cateKowleInstancePanel.attributeTree.loader.on("beforeload", function(treeLoader, node) {
		cateKowleInstancePanel.attributeTree.loader.baseParams.node = cateKowleInstancePanel.id;
	});
}

/**
 * 左边的收缩框
 */
cateKowleInstancePanel.form = new Ext.Panel( {
	id : 'cateInsPanel-catetree',
	region : 'west',
	layout : 'fit',
	border : true,
	// minSize : 200,
	width : 200,
	split : true,
	collapsible : true,
	items : [cateKowleInstancePanel.attributeTree]
});

/**
 * 新建知识库节点
 */
cateKowleInstancePanel.treeinit = function(selectNode) {
	var rootNode = cateKowleInstancePanel.attributeTree.getRootNode();
	var categoryid = "";
	if (rootNode == selectNode) {
		categoryid = cateKowleInstancePanel.para;
	} else {
	    categoryid = selectNode.attributes.categoryid;
	}
	
	var conn = synchronize.createXhrObject();
	var url = "../JSON/datacenter_DataCenterRemote.getDataCategoryMetaById?categoryid=" + categoryid;
	conn.open("GET", url, false);
	conn.send(null);
	
	var respText = conn.responseText;
	var obj = Ext.util.JSON.decode(respText);
	if(!obj){
		configAlert();
		return ;
	}
	
	var categoryName = obj.categoryName;
	cateKowleInstancePanel.treeloader = new Ext.tree.TreeLoader({
		url : '../JSON/datacenter_DataCenterRemote.getObjectTree',
		baseParams : {
			nodeid : '',
			insid : selectNode.id
		}
	})

	cateKowleInstancePanel.objectTree = new Ext.tree.TreePanel({
		id : 'objectTree',
		border : false,
		rootVisible : true,
		useArrows : false,
		autoShow : true,
		autoScroll : true,
		animate : false,
		enableDD : false,
		height : 270,
		frame : false,
		disabled : false,
		root : {
			id : categoryid + ',root',
			text : obj.categoryName,
			disabled : true
		},
		loader : cateKowleInstancePanel.treeloader
	});

	function getparent(node, nodeid) {
		if (node.id.split(",")[0] == nodeid) {
			var a = new Date();
			var b = new Date();

			cateKowleInstancePanel.treeloader.baseParams.nodeid = a.toString() + "," + b.toString();
		} else if (node == cateKowleInstancePanel.objectTree.getRootNode()) {
			return node;
		} else {
			return getparent(node.parentNode, nodeid);
		}
	}
	cateKowleInstancePanel.objectTree.on("click", function(node) {
		cateKowleInstancePanel.checkobjectnode = node;

		if (node.attributes.type == '2') {
			cateKowleInstancePanel.objname.setValue(node.text);
			cateKowleInstancePanel.objname.disable();
		} else {
			if (cateKowleInstancePanel.type == '2') {
				cateKowleInstancePanel.objname.setValue('');
			}
			cateKowleInstancePanel.objname.enable();
		}
		cateKowleInstancePanel.type = node.attributes.type;
	});

	cateKowleInstancePanel.treeloader.on("beforeload", function(treeloader, node) {
		cateKowleInstancePanel.treeloader.baseParams.nodeid = "";
		if (node.attributes.type == 1) {
			var realnode = node.id.split(",")[0];
			var depth = node.getDepth();
			getparent(node.parentNode, realnode);
		}
	});
	cateKowleInstancePanel.objectTree.getRootNode().expand(false, true, function(node) {
		var childs = cateKowleInstancePanel.objectTree.getRootNode().childNodes;
		for (var i = 0; i < childs.length; i++) {
			if (childs[i].attributes.type == 1) {
				childs[i].enable();
			}
		}
	});

	cateKowleInstancePanel.objname = new Ext.form.TextField({
		fieldLabel : '' + getResource('resourceParam9165') + '',
		allowBlank : false,
		blankText : '' + getResource('resourceParam9168') + '',
		anchor : '95%',
//		regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
//		regexText : '' + getResource('resourceParam9168') + '!',
		validator : function() {
			var str = Ext.util.Format.trim(cateKowleInstancePanel.objname.getValue());
			var size = 0;
			for (var i = 0; i < str.length; i++) {
				var code = str.charCodeAt(i);
				if (code > 255) {
					size += 2;
				} else {
					size += 1;
				}
			}
			if (size > 30) {
				cateKowleInstancePanel.objname.invalidText = ' '
						+ getResource('resourceParam1378') + '30！';
				cateKowleInstancePanel.objname.focus();
				return false;
			} else {
				return true;
			}
		}
	});
	cateKowleInstancePanel.addform1 = new Ext.FormPanel({
		items : [cateKowleInstancePanel.objname]
	});
	cateKowleInstancePanel.description = new Ext.form.TextField({
		fieldLabel : '' + getResource('resourceParam648') + '',
		anchor : '95%',
		maxLength : 100
	});
	cateKowleInstancePanel.addform2 = new Ext.FormPanel({
		items : [cateKowleInstancePanel.description]
	});
	var win = new Ext.Window({
		bbar : [{
			text : '' + getResource('resourceParam479') + '',
			listeners : {
				'click' : function(button) {
//					cateKowleInstancePanel.checkobjectnode = selectNode;
					button.disable();
					if (null == cateKowleInstancePanel.checkobjectnode) {
						Ext.MessageBox.show({
							title : getResource('resourceParam596') + '!',
							msg : getResource('resourceParam1709') + '',
							buttons : Ext.MessageBox.OK,
							width : 250,
							icon : Ext.MessageBox.ERROR
						});
						button.enable();
						return;
					}
					if (cateKowleInstancePanel.checkobjectnode.attributes.type == '2') {
						var vo = Seam.Component.newInstance("CategoryInstance");
						vo.setCategoryID(cateKowleInstancePanel.checkobjectnode.id.split(",")[0]);
						vo.setCategoryType(2);
						vo.setCategoryInstanceName(cateKowleInstancePanel.objname.getValue());
						vo.setParentInstanceID(cateKowleInstancePanel.attributeTree.checkinstancenode.id);
						vo.setDataCenterID(rootNode.id);
						vo.setDescription(cateKowleInstancePanel.description.getValue());

						callSeam("datacenter_DataCenterRemote", "addCategoryInstanceNode", [vo], function(result) {
							var obj = Ext.util.JSON.decode(result);
							if (true == obj.success) {
								Ext.getCmp("cateInsPanel-catetree").items.get(0).fireEvent( 'click', cateKowleInstancePanel.attributeTree.checkinstancenode);
								
								Ext.Msg.show({
									title : '' + getResource('resourceParam596') + '',
									msg : '' + getResource('resourceParam623') + '',
									width : 170,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
								button.enable();
								win.close();
							} else {
								Ext.Msg.show({
									title : '' + getResource('resourceParam596') + '',
									msg : '' + getResource('resourceParam594') + '!',
									width : 170,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.ERROR
								});
								button.enable();
								win.close();
							}
						});

					} else {

						var objname = cateKowleInstancePanel.objname.getValue();
						if (objname == null || objname == '') {
							cateKowleInstancePanel.objname.markInvalid('' + getResource('resourceParam1715') + '');
							button.enable();
							return;
						}
						var limit = "";
                        if(cateKowleInstancePanel.checkobjectnode == rootNode){
                        	limit = "";
                        }else{
                        	limit= cateKowleInstancePanel.checkobjectnode.attributes.multiplicity;
                        }
						var tempcount = 0;
						for (var i = 0; i < cateKowleInstancePanel.attributeTree.checkinstancenode.childNodes.length; i++) {
							if (cateKowleInstancePanel.checkobjectnode.id.split(",")[0] == cateKowleInstancePanel.attributeTree.checkinstancenode.childNodes[i].attributes.categoryid) {
								tempcount++;
							}
						}
						if (tempcount >= limit.split("-")[1]
								&& limit.split("-")[1] != 'N') {
							Ext.Msg.show({
								title : '' + getResource('resourceParam596') + '',
								msg : '' + getResource('resourceParam1707') + '',
								width : 170,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
							button.enable();
							return;
						}

						var vo = Seam.Component.newInstance("CategoryInstance");
						vo.setCategoryID(cateKowleInstancePanel.checkobjectnode.id.split(",")[0]);
						vo.setCategoryType(1);
						vo.setCategoryInstanceName(cateKowleInstancePanel.objname.getValue());
						vo.setParentInstanceID(cateKowleInstancePanel.attributeTree.checkinstancenode.id);
						vo.setDataCenterID(rootNode.id);
						vo.setDescription(cateKowleInstancePanel.description.getValue());
						var node = new Ext.tree.TreeNode({
							text : cateKowleInstancePanel.objname.getValue(),
							leaf : true
						});
						callSeam("datacenter_DataCenterRemote", "addCategoryInstanceNode", [vo], function(result) {
							var obj = Ext.util.JSON.decode(result);
							if (true == obj.success) {
								Ext.Msg.show({
									title : '' + getResource('resourceParam596') + '',
									msg : '' + getResource('resourceParam623') + '',
									width : 170,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
								var newinstance = new Ext.tree.AsyncTreeNode({
									id : obj.instance.categoryInstanceID,
									text : cateKowleInstancePanel.objname.getValue(),
									leaf : false,
									expandable : true
								});

								Ext.apply(newinstance.attributes, {
									type : '1',
									categoryid : cateKowleInstancePanel.checkobjectnode.id.split(",")[0],
									dataCenterID : obj.instance.dataCenterID,
									fixedRevision : obj.instance.fixedRevision,
									revision : obj.instance.revision
								});
								cateKowleInstancePanel.attributeTree.appendChild(newinstance);

								// 代替 @新增 部分
								// Update by YangJin'gang at 2010-09-07
								// 10:50
								//cateKowleInstancePanel.attributeTree.updateversionsymble(newinstance);

							cateKowleInstancePanel.attributeTree.getLoader().load(cateKowleInstancePanel.attributeTree.checkinstancenode);
								button.enable();
								win.close();
							} else {
								button.enable();
								Ext.Msg.show({
									title : '' + getResource('resourceParam596') + '',
									msg : obj.message,
									width : 170,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.ERROR
								});
							}
						});
					}
				}
			}
		}, {
			text : '' + getResource('resourceParam7007') + '',// 取消
			listeners : {
				'click' : function() {
					win.close();
				}
			}
		}],
		width : 300,
		modal : true,
		items : [cateKowleInstancePanel.addform1, cateKowleInstancePanel.objectTree,
				cateKowleInstancePanel.addform2]

	});
	win.show();
}

cateKowleInstancePanel.attributeTree.appendChild = function(node) {
	var parent_node=cateKowleInstancePanel.attributeTree.checkinstancenode;
	if(parent_node.isLeaf()){
		parent_node.leaf=false;
	}
	parent_node.appendChild(node);
	parent_node.expandChildNodes(false);
}
cateKowleInstancePanel.attributeTree.updatenode = function(ids, texts, desc) {
	var node = cateKowleInstancePanel.attributeTree.getNodeById(ids);
	node.setText(texts);
	Ext.apply(node.attributes, {
		description : desc,
		categoryName : texts
	});
}
/**
 * 搜索功能
 */
function searchData(kowleSeachEle){
	if ('' != kowleSeachEle.getValue()) {
		cateKowleInstancePanel.attributeTree.queryflag = 2;
		var nodeid = "";
		var cnode = null;
		var treeRootNode = cateKowleInstancePanel.attributeTree.getRootNode();
		if (!treeRootNode) {
			cnode = treeRootNode;
			treeRootNode.removeAll();
	        nodeid = treeRootNode.id;
		} else {
			 cnode = treeRootNode;
			 treeRootNode.removeAll();
	         nodeid = treeRootNode.id;
		}
		Ext.Ajax.request({
			url : '../JSON/datacenter_DataCenterRemote.queryKnowledgeDataInstanceTree',
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				for (var i = 0; i < obj.length; i++) {

					var node = new Ext.tree.TreeNode({
						id : obj[i]['id'],
						text : obj[i]['text'],
						leaf : true
					});
					Ext.apply(node.attributes, {
						categoryid : obj[i]['categoryid'],
						type : obj[i]['type'],
						dataCenterID : obj[i]['dataCenterID']
					});
					cnode.appendChild(node);
				}
				cnode.expand();
			},
			disableCaching : true,
			autoAbort : true,
			params : {
				node : nodeid,
				name : kowleSeachEle.getValue()
			}
		});
	} else {
		cateKowleInstancePanel.attributeTree.queryflag = 1;
		cateKowleInstancePanel.attributeTree.getRootNode().reload();
	}
};

cateKowleInstancePanel.attributeTree.reload = function() {
	if (null != cateKowleInstancePanel.attributeTree.checkinstancenode) {

		// 
		cateKowleInstancePanel.attributeTree.checkinstancenode.expand();
		// cateInstanceTree.checkinstancenode.reload();
	}
};
/**
 * 修改节点文本树形，避免重复加载数据
 * 
 * @param String
 *            ids 当前操作节点ID
 * @param String
 *            text 当前节点编辑后的文本
 * @returns void
 * 
 * @author YangJingang
 * @date 2010-09-06
 */
cateKowleInstancePanel.attributeTree.updateversionsymble = function(node,selectNode) {
	// 获取根节点
	var rootNode = cateKowleInstancePanel.attributeTree.root;

	// 临时变量设置为当前节点
	var tmpNode = node;

	// 最多查找50级
	var maxSearch = 0;
	while (tmpNode != null && maxSearch < 50) {
		// 找到当前节点的父节点
		tmpNode = tmpNode.parentNode;

		// 无法确定父节点时结束循环
		if (null == tmpNode)
			break;

		var txt = tmpNode.text;

		// 标记版次时，如果不包含*号则插入*
//		if (txt.indexOf('>*<') == -1) {
//			txt = txt + '<font color=red>*</font>';
//			tmpNode.setText(txt);
//			Ext.apply(node.attributes, {
//						categoryName : txt
//					});
//		}
	}
	maxSearch++;
	cateKowleInstancePanel.attributeTree.reload(selectNode);
}


/**
 * 修改节点文本树形，避免重复加载数据
 * 
 * @param String
 *            ids 当前操作节点ID
 * @param String
 *            text 当前节点编辑后的文本
 * @param String
 *            memo 当前节点编辑后的描述
 * @returns void
 * 
 * @author YangJingang
 * @date 2010-09-06
 */
cateKowleInstancePanel.attributeTree.updatenodetext = function(ids, text, memo) {
	// 确定当前节点
	var node = cateKowleInstancePanel.attributeTree.getNodeById(ids);

	// 获取根节点
	var rootNode = cateKowleInstancePanel.attributeTree.root;

	// 临时变量设置为当前节点
	var tmpNode = node;

	// 最多查找50级
	var maxSearch = 0;
	while (tmpNode != null && maxSearch < 50) {
		var txt = tmpNode.text;

		// 如果是当前节点则需要更新节点文本
//		if (maxSearch == 0) {
//			txt = txt.replace(/(.+?<)/, text + '<');
//		}
//
//		// 标记版次时，如果不包含*号则插入*
//		if (txt.indexOf('>*<') == -1) {
//			txt = txt + '<font color=red>*</font>';
//			tmpNode.setText(txt);
//			Ext.apply(node.attributes, {
//						description : memo,
//						categoryName : txt
//					});
//		} else {
//			// 当前节点已经包含*时
			if (maxSearch == 0) {
				tmpNode.setText(txt);
				Ext.apply(node.attributes, {
							description : memo,
							categoryName : txt
						});
			}
//		}

		// 找到当前节点的父节点
		tmpNode = tmpNode.parentNode;

		// 无法确定父节点时结束循环
		if (null == tmpNode)
			break;
		maxSearch++;
	}
}

