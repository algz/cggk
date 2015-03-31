<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>基于Ajax的<%=session.getAttribute("resourceParam_447")%><%=session.getAttribute("resourceParam_446")%>显示进度<%=session.getAttribute("resourceParam_539")%></title>  
 <style>  
  .prog-border {   
  height: 15px;   
  width: 205px;   
  background: #fff;   
  border: 1px solid #000;   
  margin: 0;   
  padding: 0;   
  }   
  .prog-bar {   
  height: 11px;   
  margin: 2px;   
  padding: 0px;   
  background: #178399;   
  font-size: 10pt;   
  }   
  body{   
    font-family: Arial, Helvetica, sans-serif;   
    font-size: 10pt;   
  }   
  </style>  
<script language="javascript" type="text/javascript">  
<!--   
    //var userName=document.getElementById("userName").value;   
    //创建跨浏览器的XMLHttpRequest对象   
    var timer;   
function startListener(){   
 var ts=document.getElementById("cancelUploadButton");
 ts.disabled=false;
    var xmlhttp;   
    try{   
    //IE 5.0    
        xmlhttp = new ActiveXObject('Msxm12.XMLHTTP');   
    }catch(e){   
        try{   
        //IE 5.5 及更高版本   
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');   
        }catch(e){   
            try{   
            //其他浏览器   
                xmlhttp = new XMLHttpRequest();   
            }catch(e){}   
        }   
    }   
    var progressStatusText = document.getElementById("progressBar");   
    xmlhttp.open("get","UploadServlet?uploadStatus=true",true);   
    /**此处Header设置非常重要，必须设置Content-type类型，负责会报错误   
    */   
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
   xmlhttp.onreadystatechange = function(){   
        if(xmlhttp.readyState == 4){   
            if(xmlhttp.status == 200){   
            progressStatusText.innerHTML = "";   
            progressStatusText.innerHTML = xmlhttp.responseText;   
            var temp = xmlhttp.responseText.indexOf("<%=session.getAttribute("resourceParam_536")%>");   
            if (  temp > 0 ){   
           
            ts.disabled=true;
            window.clearTimeout(timer);   
            }else{   
            timer = window.setTimeout(startListener,1000);   
            }   
            }   
        }   
    }   
    xmlhttp.send(null);   
}   
function startUpload(){   
    timer = window.setTimeout(startListener,1000);   
    return true;   
}   
function cancelUpload(){   
    var xmlhttp;   
    try{   
    //IE 5.0    
        xmlhttp = new ActiveXObject('Msxm12.XMLHTTP');   
    }catch(e){   
        try{   
        //IE 5.5 及更高版本   
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');   
        }catch(e){   
            try{   
            //其他浏览器   
                xmlhttp = new XMLHttpRequest();   
            }catch(e){}   
        }   
    }   
    var progressStatusText = document.getElementById("progressBar");   
    xmlhttp.open("get","UploadServlet?cancelUpload=true",true);   
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");   
    //xmlhttp.setRequestHeader("Content-type", "multipart/form-data");   
    xmlhttp.onreadystatechange = function(){   
        if(xmlhttp.readyState == 4){   
            if(xmlhttp.status == 200){   
            progressStatusText.innerHTML = "";   
            progressStatusText.innerHTML = xmlhttp.responseText;   
            }   
        }   
    }   
    xmlhttp.send(null);   
    return false;   
}   
//-->  
</script>  
</head>  
<body oncontextmenu="self.event.returnValue=false"  bgcolor="DFE8F6">  
<div id="controlPanel">  
    <!-- 这个<%=session.getAttribute("resourceParam_540")%>隐藏的<iframe>作为表单<%=session.getAttribute("resourceParam_537")%>后处理的后台目标   
        通过表单form的target属性指定该<iframe>将<%=session.getAttribute("resourceParam_450")%><%=session.getAttribute("resourceParam_538")%>显示在<iframe>框架中   
  -->  
  <iframe id='target_upload' name='target_upload' src='' style='display: none'></iframe>  
    <form id="fileUploadForm" name="fileUploadForm" action="UploadServlet?pid= <%=request.getParameter("id1") %>"    
        enctype="multipart/form-data" method="post" onsubmit="return startUpload();" target="target_upload">  
    <input type="file" name="file" id="file" size="40"/><br>
    <input type="hidden" name="cid" value="111"/>  
    <input type="submit" name="uploadButton" id="uploadButton" value="<%=session.getAttribute("resourceParam_534")%>"/>  
    <input type="button" disabled="disabled" name="cancelUploadButton" id="cancelUploadButton" value="<%=session.getAttribute("resourceParam_535")%>" onclick="return cancelUpload();"/><br>  
    </form>      
    <div id="progressBar">
   </div>     
</div>  
</body>  
</html>  
