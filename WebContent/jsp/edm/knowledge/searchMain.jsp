<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";%>

<script type="text/javascript" src="js/jquery.poshytip.min.js"></script>
<link href="<%=basePath %>css/tip-yellowsimple/tip-yellowsimple.css" type="text/css" rel="stylesheet" media="screen" />
    <script type="text/javascript">
        $(document).ready(function(){
         $("#query").poshytip({
                 className: 'tip-yellowsimple',
                 showOn: 'focus',
                 alignTo: 'target',
                 alignX: 'center',
                 alignY: 'bottom',
                 content:'请输入关键词,多个关键词以空格分隔',
                 offsetX: 0,
                 offsetY: 5

    });

            $.each($("#types >span"),function(index,el){
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

                $($(el).children("input")).attr("name","clazz");
                $($(el).children("label")).attr("for",$($(el).children("input")).attr("id"));

            });

            $("#doSearch").bind('click',function(){

            		var queryStr=$("#query").val();
            		if(queryStr==""){
                		$("#query").poshytip('show');
                		return;
                		}
            		var doctype;
            		$.each($("input[name='clazz']"),function(index,el){
    					if($(el).attr("checked")){
    						doctype=$(el).attr("id");
    						return false;
    						}
    				});
            		if(queryStr=="")
            		{
            		location.href="searchResult.jsp?doctype="+doctype;
            		}else{
                		location.href="searchResult.jsp?doctype="+doctype+"&query="+queryStr;
            		}


                });

        });

    </script>
    <style type="text/css">
        body{
            font-size:14px;
            margin:0 auto;
        }
        #main{
            width:550px;
            margin:0 auto;
        }
        #logo{
            padding-top:80px;
        }
        #logo img{
        	padding-left:130px;
        }
        #search{
            padding-top:30px;
            width:550px;
            margin:0 auto;
            text-align:left;
        }
        
        #types span{
            padding-left:5px;
        }
        #condition{
            padding-top:10px;
        }
        .clear{
            clear:both;
            line-height:1px;
        }

    </style>

         <div id="main">

             <div id="logo"><img style="background-color:white;" id="logoImg" src="<%=basePath %>images/sysware.bmp" alt=""></div>
             <div id="search">
             <div id="types">
                 <span><input id="all" name="clazz" type="radio" alt="搜索所有类型" checked="checked"><label>全部</label> </span>
                 <span><input id="dict" name="clazz" type="radio" alt="在词条下搜索"><label>词条</label> </span>
                 <span><input id="msword"  name="clazz"  type="radio" alt="WORD全文搜索"><label>WORD</label> </span>
                 <span><input id="msxls" name="clazz" type="radio" alt="EXCEL全文搜索"><label>EXCEL</label> </span>
                 <span><input id="msppt" name="clazz" type="radio" alt="PPT全文搜索"><label>PPT</label> </span>
                 <span><input id="pdf" name="clazz" type="radio" alt="PDF全文搜索"><label>PDF</label> </span>
                 <span><input id="txt" name="clazz" type="radio" alt="TXT全文搜索"><label>TXT</label> </span>
             </div>
             <div id="condition">
                 <span><input type="text" id="query"  style="width:430px;height:20px;"/></span>
                 <span><input type="button" id="doSearch" value="搜索" style="height:28px;width:50px;"/> </span>
             </div>
             </div>

         <div class="clear"></div>

    
         </div>
