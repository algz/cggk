<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
    import="net.fckeditor.*"
    import="javax.faces.context.ExternalContext,javax.faces.context.FacesContext"%>
<%@ page import="com.sysware.p2m.ganttRelation.GanttRelationService" %>
<%@ page import="org.jboss.seam.Component" %>
<%@ page import="com.sysware.record.RecordService" %>
<%@ page import="com.sysware.record.RecordVO" %>
<%@ page import="com.sysware.record.RecordReply" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.List" %>
<%@   taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@   taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/FCKeditor.tld" prefix="FCK" %>
<%
String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
    String recordid=request.getParameter("id");
    if(recordid==null) return;
    RecordVO vo=new RecordVO();
    vo.setRecordid(recordid);
    RecordService recordService=(RecordService) Component.getInstance("RecordService", true);
    RecordVO recordVO=null;
    try{
    	 recordVO=recordService.getRecordById(vo);
    }catch(Exception ex){
    }
    
    List<RecordReply> replies=recordService.getRecordReply(vo);
    
    SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     response.setHeader("Expires","Sat, 6 May 2008 12:00:00 GMT");
%>
<script type="text/javascript" src="<%=basePath%>lib/jquery/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="<%=basePath %>seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript" src="<%=basePath%>js/base/connection.js"></script>
<script type="text/javascript" src="<%=basePath%>seam/resource/remoting/interface.js?RecordRemote"></script>
<script type="text/javascript">
        var basePath="<%=basePath%>";
        $(document).ready(function(){
             //设置页面信息浏览器居中
             var setDiv2Center=function(){
                   var width=($(window).width()-980);
                   if(width>0){
                   $("#main").css("margin-left",width/2).css("margin-right",width/2);
                   }else{
                   $("#main").css("margin-left",0).css("margin-right",0);
                   }
            }

            $(window).resize(function(){
              setDiv2Center();
            });
            if($.browser.msie){
                var version=$.browser.version;
                if(version=="6.0"){    //解决IE6 css样式与其他版本浏览器不一致问题，IE6单独处理
                   $(".pi").css("height","40px");
                   $(".pbo").css("height","30px");
                    setDiv2Center();
                }
            }
        $("#main").css("display","block");//防止屏幕闪动
        });
    function saveReply(){
        var content = FCKeditorAPI.GetInstance("dictContent");
        var contentValue= content.GetXHTML(true);
        if(contentValue==""){
            alert("请填写回复内容！");
            return;
        }
         var vo = Seam.Remoting.createType("com.sysware.record.RecordVO");
         vo.setRecordid("<%=recordid%>");
         vo.setContent(content.GetXHTML(true));
        callSeam("RecordRemote", "addRecordReply", [vo], function(result) {
             window.location.href= "showrecord.seam?id=<%=recordid%>";
    })
    }
    function  downfile(url){
        var u=encodeURI(encodeURI(url));
        window.location.href=u;
    }   
</script>

<html>
<head><title></title>
    <style>
        a{
            color:#1f3a87;
            text-decoration:none;
        }
        .color{
            color:#1f3a87;
        }
        #main{
            width:960px;
            word-wrap:break-word;
            margin:0 auto;
            display:none;
        }
        #replayText{
            padding-top:10px;
            padding-bottom:10px;
            margin-top:10px;
            border:1px solid #cdcdcd;
        }
        #replays{

        }
        .pi{
            border-bottom:1px dashed #cdcdcd;
            height:20px;
            margin-bottom:10px;
            overflow:hidden;
            padding:10px 0;
            background-color:#ccc;


        }
         .pbo{
            border-top:1px dashed #cdcdcd;
            height:10px;
            margin-bottom:10px;
            overflow:hidden;
            padding:10px 0;
            margin-left:15px;
            font-size:12px;
        }
        .right{
            float:right;
            margin-right:20px;
        }
        .left{
            float:left;
        }
        .pbo span{
            padding-left:15px;
        }
        .plc{
            border-bottom:4px  #E5EDF2 solid;
        }
        .content{
            padding:5px 10px;

        }
        .pti span{
            color:#1f3a87;
            padding-left:15px;
            font-size:12px;
        }
        #title{
            font:bold 16px "Microsoft Yahei",Hei,Tahoma,SimHei,sans-serif;
            margin-left:0px;
            padding-left:12px;
            height:30px;
            background-color:#7096d3;
            padding-top:8px;

        }
        h1,h2,h3,h4,h5,h6{
            font-size:1em;
        }
        .article{
            border:1px solid #cdcdcd;
        }
    </style>

</head>
<body>
<div id="top"></div>
    <div id="main">

        <div id="articles" class="article">
            <div style="">
                <div id="title">
                    <%=recordVO.getTitle()%>
                </div>
            </div>
            <div class="pi" style="background-color:#cce2fb">
                <div class="pti">
                <% if(recordVO.getTasktype()!=null && recordVO.getTasktype()!=3) {%>    <span class="left">任务【<%=recordVO.getTaskname()%>】</span><% }%>
                    <span class="left">发表于 <%=recordVO.getCreatetime()%></span>
                    <span class="left">创建人：<%=recordVO.getUsername()%></span>

                </div>
            </div>
            <div class="content">
                  <div>
                      <%=recordVO.getContent()%>
                      <br/>
                      <div> <% if(null!= recordVO.getFileid()) {%><span><font size=2>附件:</font> <a href='javascript:downfile("<%=basePath%>FILEDOWN/?ID=<%= recordVO.getFileid() %>&ORIGINALNAME=<%= recordVO.getFilename()%>")'> <%= recordVO.getFilename()%></a> </span>  <% } %></div>
                  </div>
            </div>
            <div class="pbo">

                <span><a href="#bottom" class="right" style="color:#1f3a87;"> 回复</a></span>
                <%--<span class="right"><a href=""> 返回顶部</a></span>--%>
                <div style="clear:both;"></div>
            </div>
        </div>
         <div style="height:8px;"></div>
        <div id="replays">

            <% for (RecordReply reaply:replies)
            {
            %>
              <div  class="article">
                    <div class="pi">
                        <div class="pti">
                        <!--<span class="left">任务【协同工程】</span>-->
                            <span class="left">回复于 <%=sdf.format(reaply.getCreatetime())%></span>
                            <span class="left">回复人：<%=reaply.getUsrename()%></span>
                            <span class="right"><a href="#top"> 返回顶层</a></span>
                        </div>
                    </div>
                    <div class="content">
                            <div><%=reaply.getContent().getSubString(1,(int)reaply.getContent().length())%></div>
                    </div>

         </div>
             <div style="height:8px;"></div>
            <%
                }
            %>

        </div>

        <div id="replayText">
            <FCK:editor instanceName="dictContent" height="400" toolbarSet="simple">
				<jsp:attribute name="value">

				</jsp:attribute>
			</FCK:editor>
            <div style="margin-top:10px; margin-right:10px;" id="bottom">
                <span style="float:right;"><input type="button" value="发表回复" onclick="saveReply()"></span>
                <div style="clear:both;"></div>
            </div>
        </div>

    </div>
</body>
</html>