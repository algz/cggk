/**
 * 布局下部面板
 */
var southpanel = {panel:null,status:null,gotoNews:null,gotoBack:null};
southpanel.gotoNews=function() {
	Seam.Component.getInstance("auth").getindexIfShow(function(reslut) {
		var indexname='xietong';
		var str='';
		if(reslut == true) {
			/** tab页形式
			cenpanel.setUrl("../news/index.seam", getResource('resourceParam617'));
			*/
			cenpanel.setUrl("../news/index.seam");
			var str='<div><span style="float:left;"><a style="cursor: hand" onclick="southpanel.gotoNews()">'+getResource('resourceParam617')+'</a></span><span style="float:right;">' + //主页面
				' <a style="cursor: hand" onclick="Index.onIndex();">'+getResource('resourceParam464')+'</a>' +  //设置
				'</span><div>';
			Ext.getCmp('center_frame').setTitle(str);
		} else {
			/** tab页形式
			cenpanel.setUrl(indexname, getResource('resourceParam724'));
			*/
			cenpanel.setUrl(indexname);
			var str='<span style="float:left;"><a style="cursor:hand" onclick="southpanel.gotoNews()">'+getResource('resourceParam724')+'</a></span>'; //协同工程
			Ext.getCmp('center_frame').setTitle(str);
		}
	});
}
southpanel.gotoBack=function()
{
	var isbox = Ext.MessageBox.confirm(''+getResource('resourceParam744')+'', ''+getResource('resourceParam742')+'', function( //提示 + 你确定要退出吗，是否继续?
			btn, text) {
		if (btn == 'yes') {
			 window.location="loginOut.seam";
		}
	}).getDialog().setWidth(250);
}
southpanel.status ='';
if(hideButton){
	southpanel.status = returnHtmlStr();
}else{
	southpanel.status = returnHtmlStr22();
}

function returnHtmlStr(){
	return '<div id="status" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px" align="left">' +

	' <div id="newindex" style="float:right; padding-top:0px;padding-right:10px;">' +
	' <a style="cursor: hand" onclick="southpanel.gotoNews()">'+getResource('resourceParam743')+'</a>' + // 信息主页
	// ' <a style="cursor: hand" onclick="Index.onIndex()">'+getResource('resourceParam609')+'</a>' + // 主页面设置
	'</div>' +
	' <div id="uppwd" style="float:right; padding-top:0px;padding-right:10px;">' +
		' <a style="cursor: hand" onclick="pwdUpdate.init()">'+getResource('resourceParam608')+'</a>' + // 修改密码
	'</div>' +
	'<div id="showstatus" >' +

	'</div>' +
 	'</div>';
}
function returnHtmlStr22(){
	return '<div id="status" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px" align="left">' +
		'<div id="fanh" style="float:right; padding-top:0px;padding-right:10px;">' +
		' <a style="cursor: hand" onclick="southpanel.gotoBack()">'+getResource('resourceParam745')+'</a>' + // 退出
		'</div> ' +
		' <div id="newindex" style="float:right; padding-top:0px;padding-right:10px;">' +
		' <a style="cursor: hand" onclick="southpanel.gotoNews()">'+getResource('resourceParam743')+'</a>' + // 信息主页
		// ' <a style="cursor: hand" onclick="Index.onIndex()">'+getResource('resourceParam609')+'</a>' + // 主页面设置
		'</div>' +
		' <div id="uppwd" style="float:right; padding-top:0px;padding-right:10px;">' +
		' <a style="cursor: hand" onclick="pwdUpdate.init()">'+getResource('resourceParam608')+'</a>' + // 修改密码
		'</div>' +
		'<div id="showstatus" >' +
		'</div>' +
	 	'</div>';
}

southpanel.panel = {
					collapsible: false,
					region:'south',
					height:30,
					split:false,
					html:southpanel.status
					};
southpanel.init = function(){
	return southpanel.panel;
		               
}


