<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Customizing ComboBoxTree</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath() %>/lib/ext/resources/css/ext-all.css" />
<script
	src="<%=request.getContextPath() %>/lib/ext/adapter/ext/ext-base.js"></script>
<script src="<%=request.getContextPath() %>/lib/ext/ext-all.js"></script>
<script src="<%=request.getContextPath() %>/ComboBoxTree.js"></script>

<script type="text/javascript">
			var comboBoxTree;
		//	Ext.BLANK_IMAGE_URL = '../../images/default/s.gif';
			Ext.onReady(function(){
				comboBoxTree = new Ext.ux.ComboBoxTree({
					renderTo : 'comboBoxTree',
					width : 250,
					tree : {
						xtype:'treepanel',
						//bbar: ['名称：',{xtype:'trigger',id: 'searchName',width:200,triggerClass:'x-form-search-trigger',onTriggerClick:search}],
						loader: new Ext.tree.TreeLoader({dataUrl:'getNodes.jsp'}),
			       	 	root : new Ext.tree.AsyncTreeNode({id:'0',text:'<%=session.getAttribute("resourceParam_543")%>'})
			    	},
			    	
					//all:所有结点都可选中
					//exceptRoot：除<%=session.getAttribute("resourceParam_543")%>，其它结点都可选(默认)
					//folder:只有目录（非叶子和非<%=session.getAttribute("resourceParam_543")%>）可选
					//leaf：只有叶子结点可选
					selectNodeModel:'all'
				});
			});
			function showValue(){
				alert("<%=session.getAttribute("resourceParam_544")%>="+comboBoxTree.getRawValue()+"  <%=session.getAttribute("resourceParam_545")%>="+comboBoxTree.getValue());
			}
			function search(){
				var searchName = Ext.getDom('searchName').value;
				alert("<%=session.getAttribute("resourceParam_542")%>："+searchName);
			}
		</script>
</head>
<body oncontextmenu="self.event.returnValue=false" >
<table>
	<tr>
		<td>&nbsp;</td>
		<td>
		<div id="comboBoxTree"></div>
		</td>
		<td><input type='button' value='<%=session.getAttribute("resourceParam_546")%>' onclick='showValue()'>
		</td>
	</tr>
</table>
</body>
</html>
