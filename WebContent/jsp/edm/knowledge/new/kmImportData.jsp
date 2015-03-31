<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
 response.setHeader("Expires","Sat, 6 May 2015 12:00:00 GMT");
%>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html;charset=GBK">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache,must-revalidate">
<meta http-equiv="Expires" content="0">
<script type="text/javascript" src="<%=basePath%>js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<%=basePath%>seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="<%=basePath%>seam/resource/remoting/interface.js?km_TransferRemote"></script>
</head>

<script type="text/javascript">
Seam.Remoting.displayLoadingMessage = function() {
	$("#load").toggle();
}
Seam.Remoting.hideLoadingMessage = function() {
	$("#load").toggle();
}
$(document).ready(function(){

//    $("#serializeDict").bind("click",function(){Seam.Component.getInstance("km_TransferRemote").serializeDict();})
//    $("#serializeFile").bind("click",function(){Seam.Component.getInstance("km_TransferRemote").serializeFile();})
    $("#reserializeDict").bind("click",function(){Seam.Component.getInstance("km_TransferRemote").deSerializeDict();})
    $("#reserializeFile").bind("click",function(){Seam.Component.getInstance("km_TransferRemote").deSerializeFile();})
//    $("#serializeTree").bind("click",function(){Seam.Component.getInstance("km_TransferRemote").serializeTree();})
     $("#reserializeTree").bind("click",function(){Seam.Component.getInstance("km_TransferRemote").deSerializeTree();})

});
//Seam.Component.getInstance("km_TransferRemote").reIndexDict();
</script>
<body>
 <div>
     <pre>
         数据迁移步骤：
         （1）旧数据迁出
         1.把停止旧版的sysware系统（保留，不要删除）
         2.部署新版的sysware系统  （先不要升级数据库）
         3.修改新版sysware系统数据库连接，连接到旧版的数据库
         4.启动新版的sysware系统
         5.登陆后 进入/jsp/edm/knowledge/new/transferdata.jsp页面
         6.分别点击“序列化词条” “序列化文档” “序列化分类树”按钮
         7.查看C:\sysware_tmp_data 如果此文件夹存在并且下面有dict，file，trees子文件夹说明程序运行成功。
         8.分别查看dict，file，trees三个文件夹，里面的数据为导出的数据

         （2）新数据迁入
         1.建议在迁入新数据前备份旧数据库
         2.部署新系统并连接到新数据库
         3.如果是不同的机器迁移，则在新机器上把旧机器的c盘生成的 sysware_tmp_data拷贝的新机器的c盘
           如果新机器中以前部署过知识库，则删除知识库产生的索引文件。
           把旧机器的文件服务器存放的文件考到新机器。
           把旧sysware安装目录下的upload文件夹与新系统的upload文件夹合并，如果多台机器数据迁移到一台机器，则也是合并文件夹
         4.启动新sysware系统
         5. 登陆后进入进入/jsp/edm/knowledge/new/transferdata.jsp页面
         6.点击按钮导入数据。
         7.进入知识库查看数据迁移是否成功。

     </pre>

 </div>
<div id="main">

    <input type="button" value="导入词条" id="reserializeDict"/>
    <input type="button" value="导入文档" id="reserializeFile"/>
    <input type="button" value="导入分类树" id="reserializeTree"/>
    <div>
        反序列化操作是在新部署的系统下执行<br/>
    </div>
    <div id="load" style="display:none;">操作进行中，请稍后...</div>
	<div style="font-size:20pt;text-align:center;"><span id="title"></span></div>
	<div style="display:none;border-bottom:1px solid #ccc;padding-top:20px;" id="border"></div>
	<div style="" id="content"></div>
</div>
</body>
</html>
