$(document).ready(function() {
//     $("#knowledge_tree").css("display","");
//	 $("#serch_input").poshytip({
//                 className: 'tip-yellowsimple',
//                 showOn: 'focus',
//                 alignTo: 'target',
//                 alignX: 'center',
//                 alignY: 'bottom',
//                 content:'请输入关键词!',
//                 offsetX: 0,
//                 offsetY: 5
//   				 });
   				 
     $('#j_win').window({
            modal:true,
            collapsible:false,
            minimizable:false,
            maximizable:false,
            resizable:false,
            closed:true,
            type:"",
            onOpen:function(){
                alert($('#j_win').window("options").type);
            }
        });
    //使灰色按钮禁用
    $(".easyui-linkbutton").bind("click",function(){
        if($(this).attr("class").indexOf("l-btn-disabled")>0){
            $(this).disabled();
        }
    });
    //加载中间主页面 默认加载搜索页面
    //新建知识分类
    $("#j_create").bind("click", function() {
        $("#j_win_form").trigger("reset");
        $('#j_win').window({type:'create'});
        $('#j_win').panel("open");

    });
    //编辑树
    $("#j_edit").bind("click",function(){
        $('#j_win').window({type:'edit'});
         $('#j_win').panel("open");
        var node=$("#tree").tree("getSelected");
        $('#j_win_form').form('load',{
                        name:node.text||'',
                        desc:node.desc||''

                    });

    });
    $("#tree").tree({"onClick":function(node){
        $("#j_edit").linkbutton({"disabled":false});
        $("#j_delete").linkbutton({"disabled":false});
    }});
    $("#j_submit").bind("click", function() {
        $('#j_win_form').form('submit', {
            url:"www.baidu.com",
            onSubmit: function() {
                if(!$("#j_win_form").form("validate")){
                    return false;
                }
            },
            success:function(data) {
                var node = $('#tree').tree('getSelected');
                $("#tree").tree("append",{
                    parent:node?node.target:null,
                    data:[{id:'2',text:$("#j_w_f_name").val()}]
                });
                $('#j_win').window("close");
            }
        });
    })
    //取消按钮 关闭窗口
    $("#j_cancel").bind("click", function() {
        $('#j_win').window("close");
    })
    
    //搜索框判断
    $("#serch").bind("click",function(){
          var inputVal = $("#serch_input").val();
          if(inputVal){
          	    alert(1);
          }else{
          	   $("#serch_input").poshytip('show');
          }
    })
    //词条列表
    $('#test').datagrid({
				title:'词条列表',
				iconCls:'icon-save',
//				width:600,
//				height:610,
				nowrap: false,
				striped: true,
//				collapsible:true,
				url:'datagrid_data.json',
				sortName: 'code',
				sortOrder: 'desc',
				remoteSort: false,
				idField:'code',
				frozenColumns:[[
	                {field:'ck',checkbox:true},
	                {title:'code',field:'code',width:80,sortable:true}
				]],
				columns:[[
					{field:'name',title:'Name',width:120},
					{field:'addr',title:'Address',width:120,rowspan:2,sortable:true,
						sorter:function(a,b){
							return (a>b?1:-1);
						}
					},
					{field:'col4',title:'Col41',width:150,rowspan:2}
				]],
				pagination:true,
				rownumbers:true,
				toolbar:[{
					id:'btnadd',
					text:'Add',
					iconCls:'icon-add',
					handler:function(){
						$('#btnsave').linkbutton('enable');
						alert('add')
					}
				},{
					id:'btncut',
					text:'Cut',
					iconCls:'icon-cut',
					handler:function(){
						$('#btnsave').linkbutton('enable');
						alert('cut')
					}
				},'-',{
					id:'btnsave',
					text:'Save',
					disabled:true,
					iconCls:'icon-save',
					handler:function(){
						$('#btnsave').linkbutton('disable');
						alert('save')
					}
				}]
		});
			var p = $('#test').datagrid('getPager');
			if (p){
				$(p).pagination({
					onBeforeRefresh:function(){
						alert('before refresh');
					}
				});
			}
			
			
			$('#tt').datagrid({
				url: 'datagrid_data2.json',
				title: 'DataGrid - ContextMenu',
//				width: 600,
//				height: 300,
				fitColumns: true,
				columns:[[
					{field:'itemid',title:'Item ID',width:80},
					{field:'productid',title:'Product ID',width:100},
					{field:'listprice',title:'List Price',width:80,align:'right'},
					{field:'unitcost',title:'Unit Cost',width:80,align:'right'},
					{field:'attr1',title:'Attribute',width:150},
					{field:'status',title:'Status',width:60,align:'center'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (!$('#tmenu').length){
						createColumnMenu();
					}
					$('#tmenu').menu('show', {
						left:e.pageX,
						top:e.pageY
					});
				}
			});
		$("data_list")
});


function buildUrl(){
	 var qs = "?debug=true";
	 with(location){
	 	var url = href + qs ;
	 }
	 return url
}