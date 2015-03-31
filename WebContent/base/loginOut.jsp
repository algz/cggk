<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
	response.setHeader("Pragma","No-cache"); 
	response.setHeader("Cache-Control","no-cache"); 
	response.setDateHeader("Expires", -10);
	//HttpSession ses = request.getSession(false);
	//if(ses!=null)
	//{
	//		ses.invalidate();
	//}
%> 
<html> 
   <head>
      <title>Start Web Application</title>
      <script>
     	 window.location="../news_index.seam?__cid="+Math.round(Math.random()*10000)+"&lang=<%=session.getAttribute("lang")%>";
      </script>
   </head>
   <body oncontextmenu="self.event.returnValue=false" >
      
 
   </body> 
</html>
