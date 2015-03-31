Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
// Ext.util.CSS.swapStyleSheet("theme","../lib/ext/resources/css/xtheme-gray.css");

var Index = {
	gotoId : null,
	user : null,
	menuIds : new Array()
};
/**
 * 方法名:init 功能:初始化页面
 */
Index.init = function() {
	// 先检查是否已登陆
	Seam.Component.getInstance("auth").isLogin(function(value) {
				if (!value) {
					window.location = "../news_index.seam";
				}
			});

	Ext.QuickTips.init();
	Index.args = {
		start : 0,
		limit : 25
	};

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [cenpanel.init(), westpanel.init(), northpanel.init(),
				southpanel.init()]

	});
	Seam.Component.getInstance("auth").getindexIfShow(function(reslut) {
		if (reslut == true) {
			/** update by CaoRT at 2011-5-31 将主页面框架修改为tab页形式的代码注释掉，还原为原来的形式
			cenpanel.setUrl("../news/index.seam", getResource('resourceParam617'));
			*/
			cenpanel.setUrl("../news/index.jsp");
			var str = '<div><span style="float:left;"><a style="cursor: hand" onclick="southpanel.gotoNews()">'
					+ getResource('resourceParam617')
					+ '</a></span><span style="float:right;">'
					+ ' <a style="cursor: hand" onclick="Index.onIndex();">'
					+ getResource('resourceParam464') + '</a>' + '</span><div>';
			Ext.getCmp('center_frame').setTitle(str);
		} else {
			/** update by CaoRT at 2011-5-31 将主页面框架修改为tab页形式的代码注释掉，还原为原来的形式
			cenpanel.setUrl('xietong', getResource('resourceParam724'));
			*/
			var str = '<span style="float:left;"><a style="cursor: hand" onclick="southpanel.gotoNews()">'
					+ getResource('resourceParam724') + '</a></span>';
			Ext.getCmp('center_frame').setTitle(str);
			cenpanel.setUrl("center.jsp?xietong");
		}

	});

	var menu = getMenu.init();
	westpanel.tbar.addButton({
				cls : 'x-btn-text-icon menu', // 定义按钮样式表
				text : '' + getResource('resourceParam612') + '',
				menu : menu
			});
	westpanel.tbar.add('->', {
				id : 'shousuo',
				text : '<img src="icons/tool-shou.gif"/>',
				onClick : function(btn, e) {
					// westpanel.panel.collapsible(true);
					westpanel.panel.collapse(true);
				}
			});
	// var btn = new Ext.Button({
	// renderTo:'uppwd',
	// text:'个性化设置',
	// style:'font-size:12',
	// menu: new Ext.menu.Menu({
	// id: 'yhMenu',
	// items: [{
	// text: '用户密码修改', //菜单显示文字
	// cls: 'yhmmxg', //菜单使用的css
	// style:'font-size:12',
	// handler: pwdUpdate.init //定义菜单单击事件
	// }
	// ,
	// new Ext.menu.Item({
	// text: '快捷菜单定制',
	// cls: 'xgkjcd',
	// style:'font-size:12',
	// handler: updatamenu.getkuaijie
	// })]});
			
	/** update by CaoRT at 2011-5-31 将修改密码按钮修改为超链接方式
	var btn = new Ext.Button({
		renderTo : 'uppwd',
		text : '' + getResource('resourceParam608') + '',
		ls : 'yhmmxg', // 菜单使用的css
		style : 'font-size:12',
		handler : pwdUpdate.init
	});
	*/

	// westpanel.tbar.Item('<div id="ext-gen25" class="x-tool x-tool-toggle
	// x-tool-collapse-west"/>');
	/*
	 * var btn = new Ext.Button({ renderTo:'uppwd', text:'修改密码',
	 * onClick:pwdUpdate.init });
	 */

	var list = Ext.select('tag');
	/*
	 * tree.on('append', function(tree, p, node){ if(node.id == 5){
	 * node.select.defer(100, node); } }); sm = tree.getSelectionModel();
	 * sm.on('beforeselect', function(sm, node){ return node.isLeaf(); });
	 */
	// 原有跳转形式
	Index.onIndex = function() {
		Seam.Component.getInstance("auth").getindexIfShow(function(reslut) {
			var indexname = 'xietong';
			if (reslut == true) {
				indexname = 'index';
				Ext
						.getCmp('center_frame')
						.setTitle("<a style='cursor: hand' onclick='Index.onIndex();'>"
								+ getResource('resourceParam609') + "</a>");
			}
			cenpanel.setUrl("center.jsp?" + indexname);
		});
	}
	/** tab页形式
	Index.onIndex = function() {
		Seam.Component.getInstance("auth").getindexIfShow(function(reslut) {
			var indexname = 'xietong';
			var title = getResource('resourceParam724'); // 协同工程
			if (reslut == true) {
				indexname = 'index';
				title = getResource('resourceParam609'); // 主页面设置
			}
			cenpanel.setUrl(indexname, getResource('resourceParam609'));
		});
	}
	*/
	
	Seam.Component.getInstance("auth").getLoginUser(function(user) {

		if (user != null && user != "") {
			Ext.get("showstatus").insertHtml("afterBegin",
					user.getTruename() + "--" + user.getIntstname());
			Index.user = user;
		}

	});

	Seam.Component.getInstance("auth").getMenus(function(menus) {

				if (menus != null && menus != "") {
					var len = menus.length;
					for (var i = 0; i < len; i++) {

						Index.menuIds[i] = menus[i].packetid;
						var tag = new Ext.Panel({
									id : menus[i].packetid,
									title : menus[i].packetname,
									split : true,
									iconCls : menus[i].menuIco,
									collapsible : true,
									margins : '0 0 5 5',
									html : menus[i].menuhtml,
									// html:"<br><div style='margin:0px 10px 0px
									// 30px'><a href='#' name='xietong'
									// text='协同工程' onClick=menu_click(this)><IMG
									// SRC='icons/p2m/project-24.png'/>&nbsp;协同工程</a></div>",
									autoScroll : true
								});

						westpanel.add(tag);
					}
				}
				if (Ext.get('modelDefinition')) {
					var root = new Ext.tree.TreeNode({
								id : 'root',
								text : '' + getResource('resourceParam613')
										+ '',
								iconCls : 'icon-modelDefinition-16',
								disabled : true
							});
					var library = new Ext.tree.TreeNode({
								id : 'library',
								text : '' + getResource('resourceParam618')
										+ '',
								icon : '../base/icons/edm/warehouseObject.png'
							});
				//	root.appendChild(library);
					var baseType = new Ext.tree.TreeNode({
								id : 'baseType',
								text : '' + getResource('resourceParam610')
										+ '',
								iconCls : 'icon-basicType-16'
							});
					var extendType = new Ext.tree.TreeNode({
								id : 'extendType',
								text : '' + getResource('resourceParam614')
										+ '',
								iconCls : 'icon-extendedType-16'
							});
					var enumType = new Ext.tree.TreeNode({
								id : 'enumType',
								text : '枚举' + getResource('resourceParam481')
										+ '',
								iconCls : 'icon-enumType-16'
							});
					var physicsType = new Ext.tree.TreeNode({
								id : 'physicsType',
								text : '' + getResource('resourceParam616')
										+ '',
								iconCls : 'icon-physicalType-16'
							});
					var formType = new Ext.tree.TreeNode({
								id : 'formType',
								text : '' + getResource('resourceParam598')
										+ '',
								iconCls : 'icon-formType-16'
							});
					var dataType = new Ext.tree.TreeNode({
								id : 'dataType',
								text : '' + getResource('resourceParam611')
										+ '',
								iconCls : 'icon-dataType-16',
								disabled : true
							});
					dataType.appendChild(baseType);
					dataType.appendChild(extendType);
					dataType.appendChild(enumType);
					dataType.appendChild(physicsType);
					dataType.appendChild(formType);
					var dataClassification = new Ext.tree.TreeNode({
								id : 'dataClassification',
								text : '' + getResource('resourceParam474')
										+ '标签',
								iconCls : 'icon-dataCategory-16'
							});
					var dataObject = new Ext.tree.TreeNode({
								id : 'dataObject',
								text : '' + getResource('resourceParam615')
										+ '',
								iconCls : 'icon-dataObject-16'
							});
					var warehouseObject = new Ext.tree.TreeNode({
								id : 'warehouseObject',
								text : '' + getResource('resourceParam618')
										+ '',
								icon : '../base/icons/edm/warehouseObject.png'
							});

					root.appendChild(dataType);
					root.appendChild(dataClassification);
					root.appendChild(dataObject);
					root.appendChild(warehouseObject);

					var modeltree = new Ext.tree.TreePanel({
								renderTo : 'modelDefinition',
								id : modeltree,
								root : root,
								border : false,
								rootVisible : true

							});
					modeltree.getRootNode().expand(true);
					Ext.get('modelDefinition').dom.style.cssText = "margin-left:5px;";
					modeltree.on("click", function(node) {
								if ("root" == node.id || "dataType" == node.id) {
									return;
								}
								var temp = {

								};
								temp.name = node.id;
								temp.text = node.text;
								menu_click(temp);
							});
				}
				if (Ext.get('defaultDataCenter')) {
					EDMDataCenterTree.init();
				}
				if (Ext.get('customDataCenter')) {
					customEDMDataCenterTree.init();
				}
			});
	Session.init();
	// menu_click({name:'portal',text:'主界面'});
	setTimeout("taskNotify.ontime();", 10000);
};
Ext.onReady(Index.init, Index, true);
