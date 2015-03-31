<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
        response.setHeader("Pragma","No-cache");
        response.setHeader("Cache-Control","no-cache");
        response.setDateHeader("Expires", 0);
        String rep = request.getParameter("rep");
%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@ taglib uri="https://ajax4jsf.dev.java.net/ajax" prefix="a4j"%>
<%@ taglib uri="http://jboss.com/products/seam/taglib" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="lib/ext/ext-all.js"></script>
<script type="text/javascript" src="lib/ext/source/locale/<%=session.getAttribute("extLang")%>.js"></script>
<script language="JavaScript">
var rep = '<%=rep%>';
Ext.onReady(function(){
  var isUpdate = Ext.get("fm:isUpdate").dom.value;
  
  if(isUpdate=='2'){
   if(parent.Files.FileList.upwin!==null)
     parent.Files.FileList.upwin.close();
   else
     parent.Itum.rep.FileMgr.upwin.close();  
    return;
  }else{
    if(rep=='true')
    {
       Ext.get("fm:path").dom.value=encodeURIComponent(parent.Itum.rep.FileMgr.currentNode.id);
    }else{
      Ext.get("fm:path").dom.value=encodeURIComponent(parent.Files.FileList.path);
      parent.Files.FileList.grid.store.load( {
					params : {
						node : parent.Files.FileList.path
					}
				});
	}	
	 
  }				
});
function check(){
	var lujing=window.location;
	
	Ext.get("fm:cid").dom.value=lujing;
	 
  if(Ext.get("fm:data").dom.value==""||Ext.get("fm:data").dom.value==null)
    return false;
  else
    return true;
}
function openerClose(){
 if(parent.Files.FileList.upwin!=null) 
  parent.Files.FileList.upwin.close();
 else
  parent.Itum.rep.FileMgr.upwin.close();
}

 
</script>

<link rel="stylesheet" type="text/css" href="lib/ext/resources/css/ext-all.css"/>
<style>  
  html  
    {  
  overflow:hidden;  
  }  
  </style>   	
</head>
<body oncontextmenu="self.event.returnValue=false"  style="background: #c3daf9;padding:10px 20px;margin:0px 0px 0px 0px;"  >
<div style="overflow:hidden;position:relative;top:0px;left:0px;width:260px;height:100px">
 
<f:view >
  	<h:form enctype="multipart/form-data" id="fm"  onsubmit="javaScript:return check();">
	    <%=session.getAttribute("resourceParam_446")%>：<s:fileUpload id="data" 
                                 data="#{img_FileUpload.data}" 
                                 contentType="#{img_FileUpload.contentType}" 
		     accept="images/png,images/jpg,images/*"  
                               fileName="#{img_FileUpload.fileName}"
							fileSize="#{img_FileUpload.fileSize}"/>
	<h:inputHidden id='cid' value="#{img_FileUpload.cid}"/>					
	 <h:commandButton value="<%=session.getAttribute("resourceParam_541")%>" action="#{img_FileUpload.doUpload}" id="uploadFile"/>
           </h:form>
           
           
             <c:if test="${temp != null}">    
       
     
    
      <h:inputHidden value="#{temp}" id="lujing"/> 
         <script type="text/javascript">
         	function tt(){
         		var c= document.getElementById("lujing").value;
         		alert(c);
         		window.opener.imageURL=c;
         		window.opener.cha();
         		//让打开这个窗口的父窗口刷新，然后本子窗口关闭！
         		//window.opener.parent.location.reload();self.close()
         	}
         	tt();
         </script>
  
</c:if>
           
</f:view>



</div>



 
</body>
</html>
