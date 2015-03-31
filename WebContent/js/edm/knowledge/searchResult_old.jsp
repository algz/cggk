<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<script type="text/javascript" src="<%=basePath %>js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="<%=basePath %>lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=basePath %>lib/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=basePath %>js/jquery-1.4.2.min.js"></script>
<script type="text/javascript"
	src="<%=basePath %>seam/resource/remoting/resource/remote.js"></script>
	<script type="text/javascript"
        src="<%=basePath %>seam/resource/remoting/interface.js?km_searchRemote"></script>
 <script type="text/javascript" src="<%=basePath %>js/base/connection.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath %>lib/ext/resources/css/ext-all.css">
<%
	String query=request.getParameter("query");

%>
<style type="text/css">
body{

}
#conditionDiv{
	padding-top:15px;
}
#conditionDiv span{
	padding-left:20px;
}
#result {
	padding-left:20px;
	padding-top:30px;
}
#searchResultDiv{
	padding-right:20px;
	line-height:2em;
}
</style>
<script>

$(document).ready(function(){
	var spans=$("#conditionDiv > span");
	$.each(spans,function(index,el){
		$($(el).children("label")).attr("for",$($(el).children("input")).attr("id"))
	});
	$("#doSearch").bind("click",function(){
		var condition=$("#condition").val();
		if(condition==""){Ext.Msg.alert("提示","请输入检索条件！");$("#condition").focus();return;}
		if(condition!=""){
			var vo = Seam.Component.newInstance("Km_SearchCondition");
			vo.keyword=condition;
			$.each($("input[name='clazz']"),function(index,el){
					if($(el).attr("checked")){
						vo.doctype=$(el).val();
						}
				});
			callSeam("km_searchRemote",
					"kmSearch", [vo], function(result) {
						var obj = Ext.util.JSON.decode(result);
						if(obj.success){
							var list=obj.results;
							if(list.length==0){
								tpl=new Ext.XTemplate("<div>没有检索到相关数据。</div>");
								tpl.overwrite("searchResultDiv");
							}
							for(i=0;i<list.length;i++){
								list[i]["index"]=i+1;
								list[i].url=encodeURI(encodeURI(list[i].url));
								var tpl=new Ext.XTemplate(
								'<div style="padding-top:15;"><span>{index}</span><span style="padding-left:10px;"><a style="color:blue;text-decoration:underline;"  href="{url}">{fileDisplayName}</a><span></div>',
								'<div style="padding-top:10px;"><span><span><span style="padding-left:20px;">{snap}<span></div>'
								);
								if(i==0){
									tpl.overwrite("searchResultDiv",list[i]);
								}else{
									tpl.append("searchResultDiv",list[i]);
								}
							}
						}
					});

			
		}
			
		});
	Ext.Panel.prototype.border=false;
	var panel=new Ext.Panel({
		title:'<a href="<%=basePath%>base/center.jsp?knowledge">知识库</a>',
		layout:'fit',
		renderTo:Ext.getBody(),
		items:[{el:'top',autoHeight:true},{el:'result'}]
		});

	<%
		if(query!=null && !query.equalsIgnoreCase("")){
	%>
	var urls=location.href;
	if(urls.indexOf("?")>0)
	{
		var t=urls.substring(urls.indexOf("?")+1);
		var obj=Ext.urlDecode(t);
		var ar=obj.query.split("\|");
		var condition=[];
		for(i=0;i<ar.length;i++){
			condition.push(ar[i]);
			}
				
		
	}
	$("#condition").val(condition.join(" "));
	$("#doSearch").trigger("click");
	<%}%>
});
</script>
</head>
<body>
	<div id="top">
		<div id="conditionDiv" style="">
			<span><input type="radio" id="all" checked="checked" name="clazz" value="all"/><label>全部</label></span>
			<span><input type="radio" id='dict' name='clazz' value='dict'/><label>词条</label></span>
			<span><input type="radio" id='msword' name='clazz' value='msword'/><label>WORD</label></span>
			<span><input type="radio" id='msxls' name='clazz' value='msxls'/><label>EXCEL</label></span>
			<span><input type="radio" id='msppt' name='clazz' value='msppt'/><label>PPT</label></span>
			<span><input type="radio" id='pdf' name='clazz' value='pdf'/><label>PDF</label></span>
			<span><input type="radio" id='txt' name='clazz' value='txt'/><label>TXT</label></span>
			<span><input id='condition' name='condition' maxlength=70 size=30 type='text'></input></span>
			<span><input id='doSearch' type='button' name='button' value='搜索'></input></span>
		</div>
	</div>
	<div id="result">
		<div id="searchResultDiv"></div>
	</div>
	
</body>
</html>