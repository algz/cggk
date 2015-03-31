var getMenu = {
	menuPacket : null,
	menu : null,
    title_taskid : null,
    title_projectid :null,
    title_taskname :null,
    jump_type:null,
    title_record:null,
    title_id:null
};

getMenu.initMenuPacket = function() {
	getMenu.menu = new Ext.menu.Menu({
				id : 'status_Menu'
			});
	Seam.Component.getInstance("base_menu_MenuSerivce")
			.getMenu(getMenu.getPacketData);
}

getMenu.getItemData = function(itemRoot, result) {
	if (typeof result == "string") {
		if (result[4] == 'false')
			return;
		var item = new Ext.menu.Item({
					id : result[0],
					cls : 'menu-ye',
					text : result[1],
					name : result[2],
					style : 'font-size:12',
					handler : menu_click
				});
		itemRoot.menu.addItem(item);
	} else {
		for (var i = 0; i < result.length; i++) {
			if (result[i][4] == 'false')
				continue;
			var item;
			if (result[i][3] == 'false') {
				item = new Ext.menu.Item({
							id : result[i][0],
							cls : 'menu-root',
							style : 'font-size:12',
							text : result[i][1],
							menu : {
								items : []
							}
						});
				getMenu.getItemData(item, result[i][2]);
			} else {
				item = new Ext.menu.Item({
							id : result[i][0],
							cls : 'menu-ye',
							text : result[i][1],
							name : result[i][2],
							style : 'font-size:12',
							handler : menu_click
						});
			}
			itemRoot.menu.addItem(item);
		}
	}
}

getMenu.getPacketData = function(result) {
	getMenu.getItemData(getMenu, result);
	/*
	 * for(var i = 0; i < result.length; i++) { // ',,,'或null表示无菜单数据
	 * if(result[i][4] == 'false')continue; var item1; if(result[i][3]=='false') {
	 * item1 = new Ext.menu.Item({ id:result[i][0], cls:'menu-root',
	 * text:result[i][1], menu:{ items:[] } }); for(var j = 0; j <
	 * result[i][2].length; j++) { if(result[i][2][j][4] == 'false')continue;
	 * var item2; if(result[i][2][j][3]=='false') { item2 = new Ext.menu.Item({
	 * id:result[i][2][j][0], cls:'menu-root', text:result[i][2][j][1], menu:{
	 * itums:[] } }); for(var k = 0; k < result[i][2][j][2].length; k++) {
	 * if(result[i][2][j][2][k][4] == 'false')continue; var item3;
	 * if(result[i][2][j][2][k][3]=='false') { item3 = new Ext.menu.Item({
	 * id:result[i][2][j][2][k][0], cls:'menu-ye',
	 * text:result[i][2][j][2][k][1], menu:{ itums:[] } }); for(var m = 0; m <
	 * result[i][2][j][2][k][2].length; m++) { if(result[i][2][j][2][k][2][m][4] ==
	 * 'false')continue; var item4; if(result[i][2][j][2][k][2][m][3]=='false') {
	 * item4 = new Ext.menu.Item({ id:result[i][2][j][2][k][2][m][0],
	 * cls:'menu-ye', text:result[i][2][j][2][k][2][m][1], menu:{ itums:[] } });
	 * for(var n = 0; n < result[i][2][j][2][k][2][m][2].length; n++) { var
	 * item5 = new Ext.menu.Item({ id:result[i][2][j][2][k][2][m][2][n][0],
	 * cls:'menu-ye', text:result[i][2][j][2][k][2][m][2][n][1],
	 * name:result[i][2][j][2][k][2][m][2][n][2], handler:menu_click });
	 * item4.menu.addItem(item5); } } else { item4 = new Ext.menu.Item({
	 * id:result[i][2][j][2][k][2][m][0], cls:'menu-ye',
	 * text:result[i][2][j][2][k][2][m][1], name:result[i][2][j][2][k][2][m][2],
	 * handler:menu_click }); } item3.menu.addItem(item4); } } else { item3 =
	 * new Ext.menu.Item({ id:result[i][2][j][2][k][0], cls:'menu-ye',
	 * text:result[i][2][j][2][k][1], name:result[i][2][j][2][k][2],
	 * handler:menu_click }); } item2.menu.addItem(item3); } } else { item2 =
	 * new Ext.menu.Item({ id:result[i][2][j][0], cls:'menu-ye',
	 * text:result[i][2][j][1], name:result[i][2][j][2], handler:menu_click }); }
	 * item1.menu.addItem(item2); } } else { item1 = new Ext.menu.Item({
	 * id:result[i][0], cls:'menu-ye', text:result[i][1], name:result[i][2],
	 * handler:menu_click }); } getMenu.menu.addItem(item1); }
	 */
}

getMenu.init = function() {
	getMenu.initMenuPacket();
	return getMenu.menu;
}
//在类型管理中，用户在右侧标题栏，点击title返回第一页
function back(id,name) {
	document.getElementById('center_frame').getElementsByTagName('iframe')[0].contentWindow.window
			.back(id,name);
}

function back1(id,name) {
	document.getElementById('center_frame').getElementsByTagName('iframe')[0].contentWindow.window
			.back1(id,name);
}

function menu_click(item) {
	var name = item.name;
	Ext.getCmp('center_frame').enable();
	myGrid.row = null;
	myGrid.rows = null;
	Index.args = {
		start : 0,
		limit : 25
	};
	Index.baseargs = null;
	Index.gotoId = item.name;
	if (item.name.indexOf('/') > -1) {
		cenpanel.setUrl(item.name);
	} else {
		cenpanel.setUrl("center.jsp?" + item.name);
	}
	var html_url = "<a style='cursor: hand' onclick=menu_base('"
		+ item.name + "','" + escapeHTML(item.text) + "');>" + item.text + "</a>";
	Ext.getCmp('center_frame').setTitle(html_url);
}

/** 将主页面框架tab页形式还原
function menu_click(item) {
	var name = item.name;
	myGrid.row = null;
	myGrid.rows = null;
	Index.args = {
		start : 0,
		limit : 25
	};
	Index.baseargs = null;
	Index.gotoId = name;
	cenpanel.setUrl(name, item.text);
}
*/

function escapeHTML(text){
	var reg = /<(font)\s*[^<>]*>([^<>]*)<\/\1\s*>/;
	while(reg.exec(text)){
		text = text.replace(reg,"$2");
	}
	return text;
}
function menu_base(name,text)
{
    cenpanel.setUrl("center.jsp?"+name); 
    Ext.getCmp('center_frame').setTitle("<a style='cursor: hand' onclick=menu_base('"+name+"','"+text+"');>"+text+"</a>");
}