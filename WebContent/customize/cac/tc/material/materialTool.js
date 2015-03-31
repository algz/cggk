Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

//创建窗口对象
var win;
var toolForm;
function CreateWin(title,id){
	this.title = title;
	this.id = id;
	this.width = 500;
	this.height = 400;
	this.items = null;
	this.buttons = null;
}
//设置宽度
CreateWin.prototype.setWidth = function(w){
	this.width = w;
}
//设置高度
CreateWin.prototype.setHeight = function(h){
	this.height = h;
}
//设置items
CreateWin.prototype.setItems = function(i){
	this.items = i;
}
//设置buttons
CreateWin.prototype.setButtons = function(b){
	this.buttons = b;
}

//初始化窗口
CreateWin.prototype.init = function(){
	win = new Ext.Window({
			title : this.title,
			id: this.id,
			width : this.width,
			modal : true,
			height : this.height,
			maximazable : true,
			autoScroll : false,
			plain : true,
			layout : 'fit',
			items : toolForm = new Ext.FormPanel({
						id : this.id+"_form",
						labelWidth : 60,
						frame : true,
						width : this.width,
						labelAlign:'right',
						hidemode : "offsets",
						bodyStyle : 'padding:5px 5px 5,5',
						autoHeight : true,
						items : this.items
			}),
			buttons : this.buttons
		})
	return win;
}

var depUser = {
	departmentCombo : null,
	codeid : null,
	roleId : null,// 对于角色的过滤
	codename : null,
	dbaseparams : null,
	manname : null,
	comboboxStore : null,
	onselectDepart : null,
	pagingUser : null
}

depUser.users = function(u, url,iD) {
	depUser.comboboxStores = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					method : 'POST',
					url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
							+ new Date()
				}),
		reader : new Ext.data.JsonReader({
					id : "userid",
					totalProperty : 'totalProperty',
					root : 'results'
				}, [{
							name : 'truename'
						}, {
							name : 'userid'
						}, {
							name : 'loginname'
						}])
	});
	if(iD == null) {
		iD = 'depUserComb';
	}
	depUser.usersComb = new Ext.form.ComboBox({
		id : iD,
		store : depUser.comboboxStores,
		valueField : "userid",
		displayField : "truename",
		mode : 'remote',
		queryParam : 'truename',
		minChars : 0,
		pageSize : 10,
		forceSelection : true,
		hiddenName : 'userid',
		editable : true,
		triggerAction : 'all',
		fieldLabel : u,
		typeAhead : false,
		name : iD,
		blankText : ''+getResource('resourceParam570')+'',
		allowBlank : false,
		enableKeyEvents : true,
		disableKeyFilter : true,
		tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">'
				+ '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>'
				+ '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
				+ '</div></tpl>',
		emptyText : ''+getResource('resourceParam569')+''
		
	});
	
}

/**
*请求服务器
*@param url 请求服务的地址
*@param param 要处理的参数
*@return reValue 
*/
function Core_Ajax_Text(url,param)
{	
	var http_request = false;
	//开始初始化XMLHttpRequest对象
	if(window.XMLHttpRequest) { //Mozilla 浏览器
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {//设置MiME类别
			http_request.overrideMimeType("text/xml");
		}
	}
	else if (window.ActiveXObject) { // IE浏览器
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) { // 异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	http_request.open("POST", url, false);
	http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	http_request.setRequestHeader("Cache-Control","no-cache");
	http_request.setRequestHeader("If-Modified-Since",0);
	http_request.send(param);
	var reValue = http_request.responseText.trim();
	return reValue;
}

