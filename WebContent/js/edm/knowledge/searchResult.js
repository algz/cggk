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

function init(){
    $("input[name='clazz']").bind("change",function(){
                if(!$(this).attr("checked")){
                    $("#all").attr("checked","");
                }
        if($(this).attr("id")!="all") {
            var allSelected=true;
             $.each($("input[name='clazz']"), function(index, el) {
                 if($(this).attr("id")=="all")return;
                if(!$(this).attr("checked")){
                  allSelected=false;
                }
            }) ;
            if(allSelected){
               $("#all").attr("checked","checked");
            }
            return false;
        };
               $.each($("input[name='clazz']"), function(index, el) {
                if($("#all").attr("checked")){
                 $(el).attr("checked","checked");
                }else{
                    $(el).attr("checked","");
                }
            });
    });
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
            var doctype_ar=[];
            $.each($("input[name='clazz']"), function(index, el) {
                if ($(el).attr("checked")) {
                    doctype_ar.push($(el).attr("id"));
                }
            });
            vo.doctype=doctype_ar.join(",")||"all";
            callSeam("km_searchRemote",
                    "kmSearch", [vo], function(rs) {
                var obj =  eval("(" + rs + ')');
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
        for( var i=0;i<doctypes.length;i++){
           $("#" + doctypes[i]).attr("checked", "checked");
        }
        var ar = queryString.split("\|");
        var condition = [];
        for (i = 0; i < ar.length; i++) {
            condition.push(ar[i]);
        }

        $("#conditions").val(condition.join(" "));
    if ($("#conditions").val() != "") {
        $("#doSearch").trigger("click");
    } else {
        location.href = "searchMain.jsp";
    }
    }
}

$(document).ready(function() {
    init();
});

