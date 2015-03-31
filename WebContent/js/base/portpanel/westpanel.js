
/**
 * 布局左部面板
 */
var westpanel = {panelId:new Array(),panel:null,tbar:null};

westpanel.init = function (){ 	
	return westpanel.panel;
  }
/*
var tag = new Ext.Panel({		
                id:'forum-tree1',
                title:'菜 单1',
                split:true,
                iconCls:'west-head',
                collapsible: true,
                margins:'0 0 5 5',
                html:'<div align="center"><tag ><a href="#" name="user" text="用户信息管理" onClick=menu_click(this)>' +
                		'<IMG width="46" height="46" SRC="icons/Xp-G5 004.png" align="middle"><br>用户信息管理</a></tag></div>' +
                	 '<div align="center"><tag ><a href="#" name="menu" text="系统菜单管理" onClick=menu_click(this)>' +
                	 	'<IMG width="46" height="46" SRC="icons/Xp-G5 004.png" align="middle"><br>系统菜单管理</a></tag></div>',
                autoScroll:true
           });
var tag1 = new Ext.Panel({		
                id:'forum-tree2',
                title:'菜 单2',
                split:true,
                iconCls:'west-head',
                collapsible: true,
                margins:'0 0 5 5',
                html:'<div align="center"><tag ><a href="#" name="subsystem" text="子系统管理" onClick=menu_click(this)>' +
                		'<IMG width="46" height="46" SRC="icons/Server.png" align="middle"><br>子系统管理</a></tag></div>' +
                	 '<div align="center"><tag ><a href="#" name="role" text="角色管理" onClick=menu_click(this)>' +
                	 	'<IMG width="46" height="46" SRC="icons/Server.png" align="middle"><br>角色管理</a></tag></div>' +
                	 '<div align="center"><tag ><a href="#" name="priv" text="权限管理" onClick=menu_click(this)>' +
                		'<IMG width="46" height="46" SRC="icons/Server.png" align="middle"><br>权限管理</a></tag></div>' +
                	 '<div align="center"><tag ><a href="#" name="organization" text="机构管理" onClick=menu_click(this)>' +
                	 	'<IMG width="46" height="46" SRC="icons/Server.png" align="middle"><br>机构管理</a></tag></div>' +
                	 '<div align="center"><tag ><a href="#" name="operation" text="业务管理" onClick=menu_click(this)>' +
                	 	'<IMG width="46" height="46" SRC="icons/Server.png" align="middle"><br>业务管理</a></tag></div>',
                
                autoScroll:true
           });
           */
westpanel.tbar = new Ext.Toolbar({
	height:25
});
westpanel.panel = new Ext.Panel({
	id:'menu',
	collapsible:true,
	//collapsed:false,
	title:''+getResource('resourceParam746')+'',
	//collapseFirst:false,
    minSize:175,
    //tbar:westpanel.tbar,
    maxSize:240,
    width:200,
    region:'west',
   // iconCls:'icon-westbg',
    margins:'0 0 5 5',
    cmargins:' 0 5 5 5',
    //bodyStyle:'background:red',
    split:true,
    layoutConfig:{
       	animate:true
    },
	layout:'accordion'
});

westpanel.add = function(comp) {
	westpanel.panel.add(comp);
	var name = comp.getId();
	westpanel.panelId[name]=comp.getId();	
	westpanel.panel.doLayout();
};

westpanel.del = function(name) {
	westpanel.panel.remove(westpanel.panelId[name], true);
	westpanel.panel.doLayout();
};


