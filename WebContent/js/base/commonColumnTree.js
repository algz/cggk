/**
 * 异步columnTree 封装公用方法
 * @author qinjie 2009-11-25
 */
function commonColumnsTree(){
	this.columnTree;
	this.loader;
	this.root;
};

//初始化
commonColumnsTree.prototype.init = function(url, rootObj, colModel,
		rootVisible, hasCheckbox,height) {
	var self = this;
	this.columnUI = (hasCheckbox == undefined || !hasCheckbox)
			? Ext.tree.ColumnNodeUI 
			: Ext.tree.ColumnCheckboxNodeUI;
	this.loader = new Ext.tree.TreeLoader({
				dataUrl : url,
				method : 'GET',
				uiProviders : {
					'col' : this.columnUI
				}
			});
	this.root = new Ext.tree.AsyncTreeNode(rootObj[0]);
	this.columnTree = new ((hasCheckbox == undefined || !hasCheckbox)?Ext.tree.ColumnTree:Ext.tree.ColumnCheckboxTree)({
				id : 'columntree',
				animate : true,
				header : false,
				checkModel : 'cascade',
				autoHeight : true,
				autoWidth : true,
				height: height,
				border : false,
				rootVisible : rootVisible != null ? rootVisible : true,
				lines : true,
				split : true,
				autoScroll : true,
				forceFit : true,
				columns : colModel,
				loader : this.loader,
				root : this.root
			});
}
//异步获取字节点数据方法，需要在beforeExpandNode监听方法中调用
commonColumnsTree.prototype.fnBeforeExpandNode = function(node,url,baseparams){
	var self = this;
	if (node.childNodes.length > 0) {
		return;
	}
	var loadingNode = new Ext.tree.AsyncTreeNode({
				text : 'loading...',
				iconCls : 'loading',
				leaf : true
			})
	node.appendChild(loadingNode);
	Ext.Ajax.request({
				url : url,
				method : 'GET',
				success : function(result, request) {
					var myData = Ext.decode(result.responseText);
					if (myData == null
							|| (1 == myData.length && null == myData[0])) {
						node.firstChild.remove();
						return;
					}
					for (var i = 0; i < myData.length; i++) {
						var recordData = myData[i];
						recordData.uiProvider = self.columnUI;
						var cnode = new Ext.tree.AsyncTreeNode(recordData)
						node.appendChild(cnode);
					}
					node.leaf = (myData.length > 0? false:true);
					node.firstChild.remove();
				},
				failure : function(result, request) {
					node.firstChild.remove();
				},
				params : baseparams
			})
}

/**
 * 调用示例
 * 
 */
/*
var url = '../JSON/base_organization_OrganizationService.listOrganization?instcode=';
var url1 = '../JSON/base_organization_OrganizationService.listOrganization?test=1&instcode=';
var root = [{
			text : '机构管理',
			id : '0',
			iconCls : 'top'
		}];

var columnModel = [{
			header : '机构名称',
			width : 250,
			dataIndex : 'name'
		}, {
			header : '机构编号',
			width : 100,
			dataIndex : 'instcode'
		}, {
			header : '机构类型',
			width : 150,
			dataIndex : 'kindname'
		}, {
			header : '机构级别',
			width : 150,
			dataIndex : 'instlevel'
		}, {
			width : 190
		}];
//调用开始
var colTree = new commonColumnsTree();
colTree.init(url, root, columnModel);
//异步取决于此，如果为同步树，此步略去
colTree.columnTree.on("beforeexpandnode", function(node) {
			if (node.id != 0) {
				colTree.fnBeforeExpandNode(node, url1);
			}
		});
		
//添加扩展监听事件
var sm = colTree.columnTree.getSelectionModel();
var nodeInf;
sm.on('selectionchange', function(sm, node) {
			if (node != null) {
				orgManage.nodePath = node.getPath();
				nodeInf = node.attributes;
			}
		});
*/
