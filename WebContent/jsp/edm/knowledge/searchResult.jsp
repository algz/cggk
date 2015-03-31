<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<head>
<script type="text/javascript" src="<%=basePath %>js/base/languagesResource/JsResource_zh.js"></script>
<script type="text/javascript" src="<%=basePath %>lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=basePath %>lib/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=basePath %>js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="jquery.poshytip.min.js"></script>
<link href="<%=basePath %>css/tip-yellowsimple/tip-yellowsimple.css" type="text/css" rel="stylesheet" media="screen"/>
<script type="text/javascript"
        src="<%=basePath %>seam/resource/remoting/resource/remote.js"></script>
<script type="text/javascript"
        src="<%=basePath %>seam/resource/remoting/interface.js?km_searchRemote"></script>
<script type="text/javascript" src="<%=basePath %>js/base/connection.js"></script>
<script type="text/javascript">

    function toPage(pagenumber) {
        $("#doSearch").trigger("click", [pagenumber]);
    }
    function showPages(currentPage, totalPage) {
        var showCount = 5;
        var ret = [];
        var mid = parseInt(showCount / 2);
        var start = currentPage - mid;
        var end = start + showCount - 1;
        if (start < 1) {
            start = 1;
            end = start + showCount - 1;
        }
        if (totalPage > 0 && end > totalPage) {
            end = totalPage;
            start = totalPage - showCount + 1;
        }
        if (start < 1)start = 1;
        var pos = 0;
        for (var i = start; i <= end; i++) {
            ret[pos++] = i;
        }
        return ret;
    }

    $(document).ready(function() {
        $("#conditions").poshytip({
            className: 'tip-yellowsimple',
            showOn: 'focus',
            alignTo: 'target',
            alignX: 'center',
            alignY: 'bottom',
            content:'请输入关键词,多个关键词以空格分隔',
            offsetX: 0,
            offsetY: 5

        });
        $("#logoImg").bind('click', function() {

            location.href = 'searchMain.jsp';

        });
        $.each($("#types >span"), function(index, el) {
            $(el).poshytip({
                className: 'tip-yellowsimple',
                showOn: 'none',
                alignTo: 'target',
                alignX: 'center',
                alignY: 'bottom',
                content:$(el).children('input').attr('alt'),
                offsetX: 0,
                offsetY: 5
            });

            $($(el).children("input")).attr("name", "clazz");
            $($(el).children("label")).attr("for", $($(el).children("input")).attr("id"));

        });

        $("#doSearch").bind("click", function(event, requestPage) {
            var condition = $("#conditions").val();
            if (condition == "") {
                $("#conditions").poshytip('show');
                return;
            }
            if (condition != "") {
                var vo = Seam.Component.newInstance("Km_SearchCondition");
                vo.keyword = condition;
                vo.currentPage = requestPage || 1;
                vo.pageSize = 10;
                $.each($("input[name='clazz']"), function(index, el) {
                    if ($(el).attr("checked")) {
                        vo.doctype = $(el).attr("id");
                    }
                });
                callSeam("km_searchRemote",
                        "kmSearch", [vo], function(rs) {
                    var obj = Ext.util.JSON.decode(rs);
                    if (obj.result) {
                        var list = obj.result;
                        $("#searchResultDiv").empty();
                        $("#page").empty();
                        if (list.length == 0) {
                            $("#searchResultDiv").append("<div>没有检索到相关数据。</div>");
                            return;
                        }
                        if(obj.totalPage>1){
                        var pages = showPages(obj.currentPage, obj.totalPage);
                        if (obj.currentPage > 1) {
                            var lastPage = obj.currentPage - 1;
                            $("#page").append("<span><a href='javascript:;' onclick='toPage(" + lastPage + ")'>上一页</a></span>");
                        }
                        for (var p = 0; p < pages.length; p++) {
                            if (pages[p] == obj.currentPage) {
                                $("#page").append("<span>" + pages[p] + "</span>");
                            } else {
                                $("#page").append("<span><a href='javascript:;' onclick='toPage(" + pages[p] + ")'>[" + pages[p] + "]</a></span>");
                            }


                        }
                        if (obj.currentPage < obj.totalPage) {
                            var nextPage = obj.currentPage + 1;
                            $("#page").append("<span><a href='javascript:;' onclick='toPage(" + nextPage + ")'>下一页</a></span>");
                        }
                        }
                        for (var i = 0; i < list.length; i++) {
                            list[i]["index"] = i + 1;
                            list[i].url = encodeURI(encodeURI(list[i].url));
                            $("#searchResultDiv").append('<div style="padding-top:15;"><span>' + '</span><span style="padding-left:10px;"><a style="color:blue;text-decoration:underline;" target="_blank"  href=' + list[i].url + '>' + list[i]["fileDisplayName"] + '</a></span></div>');
                            $("#searchResultDiv").append('<div style="padding-top:10px;"><span><span><span style="padding-left:20px;">' + list[i]["snap"] + '</span></div>');
                        }
                    }
                });


            }

        });

        var urls = location.href;
        if (urls.indexOf("?") > 0) {
            var t = urls.substring(urls.indexOf("?") + 1);
            var obj = Ext.urlDecode(t);
            var doctype = obj.doctype;
            $("#" + doctype).attr("checked", "checked");
            var ar = obj.query.split("\|");
            var condition = [];
            for (i = 0; i < ar.length; i++) {
                condition.push(ar[i]);
            }


        }
        $("#conditions").val(condition.join(" "));
        if ($("#conditions").val() != "") {
            $("#doSearch").trigger("click");
        } else {
            location.href = "searchMain.jsp";
        }

    });

</script>
<style type="text/css">
    body {
        font-size: 14px;
    }

    #main {
        padding-top: 10px;
        min-width: 600px;
    }

    #logo {
        padding-top: 10px;
        float: left;
        width: 185px;
        cursor: pointer;
    }

    #logo img {
    }

    #search {
        padding-top: 0px;
        padding-left: 10px; /*border:1px solid;*/
        width: 550px;
        float: left;
        vertical-align: top;
        text-align: left;
    }

    #types {
        padding-top: 0px;
    }

    #types span {
        padding-left: 5px;
    }

    #condition {
        padding-top: 10px;
    }

    .clear {
        clear: both;
        line-height: 1px;
    }

    #page {
        margin: 20px;
    }

    #page span {
        padding-left: 10px;
    }

    #result {
        padding-left: 20px;
        padding-top: 30px;
    }

    #searchResultDiv {
        padding-right: 20px;
        line-height: 2em;
    }

</style>
</head>
<body>
<div id="main" style="padding-top:30px;">
    <div id="logo"><img style="background-color:white;border:0px solid;" id="logoImg"
                        src="<%=basePath %>images/sysware.bmp" alt=""></div>
    <div id="search">
        <div id="types">
            <span><input id="all" type="radio" name="clazz" alt="搜索所有类型" checked="checked"><label>全部</label> </span>
            <span><input id="dict" type="radio" name="clazz" alt="在词条下搜索"><label>词条</label> </span>
            <span><input id="msword" type="radio" name="clazz" alt="WORD全文搜索"><label>WORD</label> </span>
            <span><input id="msxls" type="radio" name="clazz" alt="EXCEL全文搜索"><label>EXCEL</label> </span>
            <span><input id="msppt" type="radio" name="clazz" alt="PPT全文搜索"><label>PPT</label> </span>
            <span><input id="pdf" type="radio" name="clazz" alt="PDF全文搜索"><label>PDF</label> </span>
            <span><input id="txt" type="radio" name="clazz" alt="TXT全文搜索"><label>TXT</label> </span>
        </div>
        <div id="condition">
            <span><input type="text" id="conditions" style="width:410px;height:20px;"/></span>
            <span><input type="button" id="doSearch" value="搜索" style="height:28px;width:50px;"/> </span>
        </div>
    </div>

    <div class="clear"></div>

    <div style="background-color:#bbb;width:100%;height:20px;margin-top:10px;">
        <span style="float:right; padding-right:10px;"><a style="color:blue;font-weight:bolder;"
                                                          href="<%=basePath %>base/center.jsp?knowledge"
                                                          target="_blank"></a></span>
    </div>
    <div id="result">
        <div id="searchResultDiv"></div>
    </div>

    <!-- 分页栏-->
    <div id="page"></div>

</div>
</body>
</html>
