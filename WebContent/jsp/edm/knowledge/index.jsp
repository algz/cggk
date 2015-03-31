<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>知识库</title>
    <%@include file="common.jsp" %>
    <style type="text/css">
        #j_win_form div {
            margin: 5px;
            overflow: hidden;
        }

        #j_win_form label {
            float: left;
            height: 20px;
            line-height: 20px;
            margin-left: 5px;
            cursor: pointer;
        }

        #j_win_form input {
            float: left;
            width: 200px;
            margin-left: 5px;
            border: 1px solid #e8e7e1;
        }

        #j_win_form textarea {
            float: left;
            width: 200px;
            margin-left: 5px;
            border: 1px solid #e8e7e1;
        }
    </style>
<script type="text/javascript" src="index.js"></script>
</head>
<body class="easyui-layout">
<div region="west" split="false" title="知识库" style="width:220px;">

    <div style=" height:25px;padding:0px;width:100%; margin:0px;background-image: url(img/tb-bg.gif);">
        <a href="#" id="j_create" class="easyui-linkbutton" plain="true" iconCls="icon-add">新建</a>
        <a href="#" id="j_edit" class="easyui-linkbutton" plain="true" disabled="true" iconCls="icon-reload">编辑</a>
        <a href="#" id="j_delete" class="easyui-linkbutton" plain="true" disabled="true" iconCls="icon-cancel">删除</a>
    </div>
    <div style=" height:25px;padding:0px; margin:0px;background-image: url(img/tb-bg.gif);">
        <input id="serch_input" type="text" style="width:175px;" class="easyui-validatebox">
        <a id="serch" href="#" class="easyui-linkbutton" plain="true">检索</a>
    </div>

    <ul id="tree" class="easyui-tree" url="tree_data.json"></ul>

</div>
<div region="center" title="&nbsp;" id="center">
        <div>
               sdfsdf
        </div>

        <div title="Tab5 with sub tabs" closable="true" iconCls="icon-cut" style="padding:10px;">
			<div id="data_list" class="easyui-tabs" plain="true">
					<div title="词条列表"  style="padding:10px;"><table id="test"></table></div>
					<div title="文档列表"  style="padding:10px;"><table id="tt"></table></div>
			</div>
		</div>
      
</div>

<div id="j_win" style="width:280px;height:210px;" title="新建知识分类">
    <form id="j_win_form" action="" method="post" style="overflow:hidden;">
        <div>
            <label for="j_w_f_name">名称:</label>
            <input class="easyui-validatebox" missingMessage="名称不能为空!" name="name" type="text" id="j_w_f_name" required="true"/>

            <div style="clear:both;"></div>
        </div>
        <div>
            <label style="float:left;"> 描述:</label>
            <textarea id="j_w_f_desc" name="desc" style="height:60px;float:left;"></textarea>

            <div style="clear:both;"></div>
        </div>
        <div border="false" style="text-align:right;height:30px;line-height:30px;margin-right:20px;margin-top:15px;">
            <a id="j_submit" class="easyui-linkbutton" iconCls="icon-ok">确定</a>
            <a id="j_cancel" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
        </div>


    </form>
</div>

</body>
</html>