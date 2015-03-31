//卷内目录
var materialDir = {con:null};
materialDir.gridpanel = function() {
	var checkbox = new Ext.grid.CheckboxSelectionModel();//多选按钮 
	var rowNum = new Ext.grid.RowNumberer();
	var fields = ['guid','fileNum','title','fileNumber','fileType','machineType'];
	var store = new Ext.data.JsonStore({url:'../JSON/material_MaterialRemote.getMaterialList',root:'results',totalProperty:'totalProperty',fields:fields})
	var colM = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [checkbox,rowNum,
 			{header:'图号',dataIndex:'fileNum'},
 			{header:'名称',dataIndex:'title'},
 			{header:'索取号',dataIndex:'fileNumber'},
 			{header:'文件类型',dataIndex:'fileType'},
			// {header:'卷列号',dataIndex:'sort'},
 			{header:'使用机型',dataIndex:'machineType'}
		]
	});

	//底部导航
	var bbar = new Ext.PagingToolbar({
		pageSize:10,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	});
	//卷内目录列表
	var DirGrid = new Ext.grid.GridPanel({
		id:'materialDirGridId',
		title:' 浏 览 ',
		sm:checkbox,
		cm:colM,
		store:store,
		loadMASK:{msg:'数据加载中...'},
		stripeRows:true,
		tbar:[{text:' 查 询 ',id:'searchId',handler:function(){
			materialDir.search();
		}},'-',{text:' 导 出 ',id:'dirReportId',handler:function(){
			materialDir.dirReport();
		}}],
		bbar:bbar
	})
	/*DirGrid.on('activate',function(){
		DirGrid.getStore().load({params:{start:0,limit:20}});
		DirGrid.doLayout();
	})*/
	return DirGrid;
}
//查询
materialDir.search = function() {
	var items = [
	             {fieldLabel:'机型',xtype:'combo',name:'machineType',store:machineTypeStore,anchor:'95%'},
	             {fieldLabel:'有效性',xtype:'combo',name:'liveState',store:liveStateStore,anchor:'95%'}
	             ]
	var buttons = [{
					text : '查询',
	            	handler : function() {
	            		var con = "";
	            		var val = "";
	            		var its = "";
	            		var str = toolForm.getForm().getValues(true);
	            		var items = str.split("&");
	            		for(var i=0;i<items.length;i++){
	            			var s = items[i].split("=");
	            			if(s[1] != ""){
	            				con+=s[0]+"@"+s[1]+",";
	            				val += s[1]+"@";
	            				its += s[0]+"@";
	            			}
	            		}
	            		if(con == ""){
	            			alert("请至少输入一个查询条件！");
	            			return false;
	            		} else {
	            			con = decodeURI(con.substring(0,con.lastIndexOf(",")));
	            			val = decodeURI(val.substring(0,val.lastIndexOf("@"))); 
	            			its = its.substring(0,its.lastIndexOf("@"))
	            		}
	            		materialDir.con = its+","+val;
	            		Ext.getCmp("materialDirGridId").getStore().baseParams={start:0,limit:20,con:con};
	            		Ext.getCmp("materialDirGridId").getStore().load();
	            		win.close();
				}
			}, 
			{
				text : '取消',
				handler : function() {
					toolForm.form.reset();
					win.close();
				}
			}];
	var window = new CreateWin("查询","searchDirWindowId");
	window.setButtons(buttons);
	window.setItems(items);
	window.setWidth(300);
	window.setHeight(150);
	window.init().show();
}
//导出数据
materialDir.dirReport = function(){
	var url = '../JSON/exportDocServlet?tag=1&con='+materialDir.con;
	window.location.href = url;
}



