<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@ taglib uri="https://ajax4jsf.dev.java.net/ajax" prefix="a4j"%>
<%@ taglib uri="http://jboss.com/products/seam/taglib" prefix="s"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
var idpath = window.parent.document.getElementById("idpathHiddenField").value;
var objectValue = window.parent.document.getElementById("objectHiddenField").value;
//alert(objectValue);
</script>
</head>
<body oncontextmenu="self.event.returnValue=false" >
<f:view>
	<h:form enctype="multipart/form-data" id="fm">
		<s:fileUpload id="data" data="#{dataObject_FileUpload.data}"
			contentType="#{dataObject_FileUpload.contentType}"
			fileName="#{dataObject_FileUpload.fileName}"
			fileSize="#{dataObject_FileUpload.fileSize}" 
			onkeydown="return false"/>
		<input type="hidden" style="display: none;" id="idpath" name="idpath" />
		<h:commandButton value="<%=session.getAttribute("resourceParam_447")%>" action="#{dataObject_FileUpload.doUpload}"
			id="uploadFile" disabled="disabled"/>
	</h:form>
</f:view>
<script type="text/javascript">
	//禁止文件输入框的右键菜单
	document.getElementById('fm:data').oncontextmenu=function(){return false;}
</script>

<script type="text/javascript">
	function test(flag){
		if(flag == "success"){
			alert("<%=session.getAttribute("resourceParam_447")%>成功！");
		}else{
			alert("<%=session.getAttribute("resourceParam_452")%>");
		}
	}
</script>
</body>
<script type="text/javascript">
	document.getElementById("idpath").value = idpath;
	var node;
	//alert(objectValue);
	if ("taskdata" == objectValue) {
		 node = parent.taskdata.columnTree.getSelectionModel()
						.getSelectedNode();
	} else if ("myTaskColunmTree" == objectValue) {
		 node = parent.myTaskColumnTree.columnTree.getSelectionModel()
						.getSelectedNode();
	} else {
		 node = parent.dataObjectColumnTree.columnTree.getSelectionModel()
						.getSelectedNode();
	}
</script>
	${info }
</html>
