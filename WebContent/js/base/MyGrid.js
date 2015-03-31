/**
 * ClassName:myGrid 根据所需要的数据和列模型创建Grid params:row--选中行的对象
 */
var myGrid = {
	row : null,
	rows : null
};

/**
 * 方法:initByPageSize 根据属性创建Grid,带分页功能 属性:ds--数据列表的数据源 :cm--数据列表显示的列模型
 * :tb--数据列表上方的功能菜单 :sm--数据列表的行选择模板 :plugin--定义的插件 返回:grid--构建好的数据列表
 */

myGrid.initByPageSize = function(ds, cm, tb, sm, size, sort) {

	cm.defaultSortable = sort; // 设定能进行排序

	var grid = new Ext.grid.GridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		autoScroll : true,
		width : '100%',
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
//			msg : '正在装载数据...'
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		tbar : tb,
		stripeRows : true
	})

	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});

	return grid;

};

/**
 * 方法:init 根据属性创建Grid,带分页功能 属性:ds--数据列表的数据源 :cm--数据列表显示的列模型 :tb--数据列表上方的功能菜单
 * :sm--数据列表的行选择模板 :plugin--定义的插件 返回:grid--构建好的数据列表
 */

myGrid.init = function(ds, cm, tb, sm, plugin) {

	cm.defaultSortable = true; // 设定能进行排序

	var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
//			msg : '正在装载数据...'
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		tbar : tb,
		stripeRows : true, // 相邻行的颜色是否有差别
		// plugins:checkEditable,
		clicksToEdit : 1, // 设置插件
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板
			pageSize : 25,
			store : ds,
			displayInfo : true//,
//			displayMsg : '当前行数{0} - {1} 共 {2} 行',
//			emptyMsg : "未查询到数据"
		})
	})
	// 定义grid的rowclick事件
	grid.on('rowclick', function(grid, rowIndex, e) {
				myGrid.row = ds.data.items[rowIndex]; // 得到选中行的对象
			});
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	// grid.on('afteredit',function(e){
	// var r=e.record;
	// if(r.get("taskid")!=null || r.get("taskid").length<=0)
	// {
	// var appVo =
	// Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
	// appVo.setTaskid(r.get("taskid"));
	// appVo.setCompletedamount(r.get("completedamount"));
	// callSeam("tasklist_taskService", "updateCompletedamount",
	// [appVo],updateDetail);
	// }
	//    	
	// });
	return grid;

};

myGrid.initNoPaging = function(ds, cm, tb, sm, plugin) {

	cm.defaultSortable = true; // 设定能进行排序

	var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		plugins : plugin,
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
//			msg : '正在装载数据...'
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		tbar : tb,
		view : new Ext.ux.grid.BufferView({
					// custom row height
					rowHeight : 20,
					forceFit : true,
					// render rows as they come into viewable area.
					scrollDelay : false
				}),
		stripeRows : true, // 相邻行的颜色是否有差别
//		columnLines:true,
		// plugins:checkEditable,
		clicksToEdit : 1
			// 设置插件
	})
	// 定义grid的rowclick事件
	grid.on('rowclick', function(grid, rowIndex, e) {
				myGrid.row = ds.data.items[rowIndex]; // 得到选中行的对象
				myGrid.rows = sm.getSelections(); // 得到选中行的对象
			});
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	return grid;

};

// myGrid.init=function(ds,cm,tb,sm,plugin){
//	
// cm.defaultSortable = true; //设定能进行排序
//
// var grid=new Ext.grid.GridPanel({ //新建一个GridPanel对象
//		
// //region:'center', //面板位置
// //id:'topic-grid',
// store: ds, //绑定数据源
// cm: cm, //设置列模板
// sm: sm,
// trackMouseOver:true, //鼠标放到行上是否有痕迹
// loadMask: {msg:'正在装载数据...'},
// viewConfig: {
// forceFit:true,
// enableRowBody:true,
// showPreview:true
// },
// tbar: tb,
// stripeRows: true, //相邻行的颜色是否有差别
// plugins:plugin, //设置插件
// bbar: new Ext.PagingToolbar({ //定义下方工作面板
// pageSize: 25,
// store: ds,
// displayInfo: true,
// displayMsg: '当前行数{0} - {1} 共 {2} 行',
// emptyMsg: "未查询到数据"
// })
// })
// //定义grid的rowclick事件
// grid.on('rowclick', function(grid, rowIndex, e) {
// myGrid.row = ds.data.items[rowIndex]; //得到选中行的对象
//		
// });
// grid.on('beforedestroy',function(e){
// e.store.removeAll();
// });
//	
// return grid;
//                              
// };

/**
 * 方法:initNobr 根据属性创建Grid,不带分页功能 属性:ds--数据列表的数据源 :cm--数据列表显示的列模型
 * :tb--数据列表上方的功能菜单 :sm--数据列表的行选择模板 :plugin--定义的插件 返回:grid--构建好的数据列表
 */
myGrid.initNobr = function(ds, cm, tb, sm, plugin) {

	cm.defaultSortable = false; // 设定能进行排序

	var grid = new Ext.grid.GridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		plugins : plugin,
		trackMouseOver : false,
		loadMask : {
//			msg : '正在装载数据...'
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		tbar : tb
			// 设置上方工作面板
	});
	// 定义grid的rowclick事件
	grid.on('rowclick', function(grid, rowIndex, e) {
				myGrid.row = ds.data.items[rowIndex]; // 得到选中行的对象

			});
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	return grid;

};

myGrid.initArrayEditorGird = function(curveData, curveDataId, innerHtml) {
	var Axis = Ext.data.Record.create([{
				name : 'x',
				mapping : 0,
				type : 'float'
			}, {
				name : 'y',
				mapping : 1,
				type : 'float'
			}]);
	var axisReader = new Ext.data.ArrayReader({
			// id: 0
			}, Axis);
	// var data =
	// [[0.000234,0.001383],[0.000963,0.00302],[0.002191,0.004856],[0.00407,0.006989],[0.006938,0.00956],[0.011378,0.012738]];
	var proxy = new Ext.data.MemoryProxy(curveData);
	var ds = new Ext.data.Store({
				"proxy" : proxy,
				"reader" : axisReader
			});

	var cm = new Ext.grid.ColumnModel([{ // new Ext.grid.RowNumberer(),
		header : "X坐标",
		dataIndex : 'x',
		editor : new Ext.form.TextField({
					allowBlank : false
				}),
		sortable : true

	}, {
		header : "Y坐标",
		dataIndex : 'y',
		editor : new Ext.form.TextField({
					allowBlank : false
				}),
		sortable : true
	}]);
	var sm = new Ext.grid.RowSelectionModel({
				singleSelect : true,
				listeners : {
					rowselect : function(sm, row, rec) {
						sm.rowNumber = row;
					}
				}
			});

	// 创建editor grid
	var grid = new Ext.grid.EditorGridPanel({
		store : ds,
		cm : cm,
		sm : sm,
		// width:600,
		// height:200,
		autoScroll : true,
		autoHeight : true,
		title : '坐标'+getResource('resourceParam490')+'',
		frame : true,
		region : 'east',
		clicksToEdit : 2,

		tbar : [{
					text : ''+getResource('resourceParam466')+'',
					handler : function() {
						var p = new Axis({
									x : 0,
									y : 0
								});
						grid.stopEditing();
						var count = ds.getCount();
						ds.insert(count, p);
						grid.startEditing(count, 0);

					}
				}, {
					text : ''+getResource('resourceParam491')+'',
					handler : function() {
						var p = new Axis({
									x : 0,
									y : 0
								});
						grid.stopEditing();
						if (sm.rowNumber) {
							ds.insert(sm.rowNumber, p);
							grid.startEditing(sm.rowNumber, 0);
						} else {
							ds.insert(0, p);
							grid.startEditing(0, 0);
						}
					}
				}, {
					text : ''+getResource('resourceParam475')+'',
					handler : function() {
						grid.stopEditing();
						var _selectedRow = grid.getSelectionModel()
								.getSelected();
						if (_selectedRow)
							ds.remove(_selectedRow);
						else
							alert(""+getResource('resourceParam657')+"");
					}
				}, {
					text : '保存',
					handler : function() {
						grid.stopEditing();
						Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam658')+'', function(btn,
								text) {
							if (btn == 'yes') {
								var saveData = '[';
								var count = ds.getCount();
								for (i = 0; i < count; i++) {
									saveData += '[' + ds.getAt(i).data.x + ','
											+ ds.getAt(i).data.y + ']';
									if (i != (count - 1))
										saveData += ',';
								}
								saveData += ']';
								var jsonValue = '{' + curveDataId + ';'
										+ saveData + '}';
								callSeam("DataCenterViewService",
										"saveSingleData", [jsonValue],
										function(result) {
											var sign = result;
											if (sign == "false") {
												Ext.MessageBox.show({
													title : ''+getResource('resourceParam659')+'',
													msg : ''+getResource('resourceParam567')+'',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
											} else {
												innerHtml = '<img src="'
														+ result
														+ '" width ="150" height="100" />';
												alert(innerHtml);
											}
										});
							}
						});
					}
				}, {
					text : '预览曲线',
					handler : function() {
						// 在这里调用预览曲线的方法，并把图片地址赋值到src中，需要方法返回曲线图的地址
						// 这种封装方式更好一些
						// var rows = [];
						// ds.each(function(r) {
						// var row = [];
						// ds.fields.each(function(f) {
						// row.push(r.get(f.name));
						// });
						// rows.push(row);
						// });
						// alert(Ext.encode(rows));
						// Ext.getCmp('发动机性能数据与曲线').setValue(Ext.encode(rows));
						var saveData = '[';
						var count = ds.getCount();
						for (i = 0; i < count; i++) {
							saveData += '[' + ds.getAt(i).data.x + ','
									+ ds.getAt(i).data.y + ']';
							if (i != (count - 1))
								saveData += ',';
						}
						saveData += ']';
						var jsonValue = '{' + curveDataId + ';' + saveData
								+ '}';
						alert(saveData);
						// Ext.getCmp('发动机性能数据与曲线').setValue(saveData);

						// 返回的可能是servlet的地址
						// alert(Ext.getDom('engineCurve').innerHTML);
					}
				}]
	});
	ds.load();
	return grid;
}

/**
 * 方法:initBox 根据属性创建含复选框的Grid,带分页功能 属性:ds--数据列表的数据源 :cm--数据列表显示的列模型
 * :tb--数据列表上方的功能菜单 :sm--数据列表的行选择模板 返回:grid--构建好的数据列表
 */
// myGrid.initBox=function(ds,cm,tb,sm){
//	
// cm.defaultSortable = true; //设定能进行排序
//
// var grid=new Ext.grid.GridPanel({ //新建一个GridPanel对象
//		
// //region:'center', //面板位置
// //id:'topic-grid',
// store: ds, //绑定数据源
// cm: cm, //设置列模板
// sm: sm,
// trackMouseOver:false,
// loadMask: {msg:'正在装载数据...'},
// viewConfig: {
// forceFit:true,
// enableRowBody:true,
// showPreview:true
// },
// tbar: tb, //设置上方工作面板
// bbar: new Ext.PagingToolbar({ //定义下方工作面板
// pageSize: 25,
// store: ds,
// displayInfo: true,
// displayMsg: '当前行数{0} - {1} 共 {2} 行',
// emptyMsg: "未查询到数据"
// })
// });
// //定义grid的rowclick事件
// grid.on('click', function(grid, rowIndex, e) {
// myGrid.rows = sm.getSelections(); //得到选中行的对象
//		
// });
// grid.on('beforedestroy',function(e){
// e.store.removeAll();
// });
// return grid;
//                              
// };
/**
 * 方法:initBox 根据属性创建含复选框的Grid,带分页功能 属性:ds--数据列表的数据源 :cm--数据列表显示的列模型
 * :tb--数据列表上方的功能菜单 :sm--数据列表的行选择模板 :plugins--grid的插件 返回:grid--构建好的数据列表
 */
myGrid.initBox = function(ds, cm, tb, sm, plugins,viewConfig) {
	cm.defaultSortable = true; // 设定能进行排序
	//added by suny 2011-1-25 自定义样式
	if(!viewConfig){
		viewConfig={
				forceFit : true,
				enableRowBody : true,
				showPreview : true
		};
	}
	var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象
		// region:'center', //面板位置
		// id:'topic-grid',
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		plugins : plugins,
		trackMouseOver : false,
		loadMask : {
//			msg : '正在装载数据...'
		},
		viewConfig : viewConfig,
		tbar : tb, // 设置上方工作面板
		clicksToEdit : 1,
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板
			pageSize : 25,
			store : ds,
			displayInfo : true//,
//			displayMsg : '当前行数{0} - {1} 共 {2} 行',
//			emptyMsg : "未查询到数据"
		})
	});
	// 定义grid的rowclick事件
	grid.on('click', function(grid, rowIndex, e) {
				myGrid.row = ds.data.items[rowIndex]; // 得到选中行的对象
				myGrid.rows = sm.getSelections(); // 得到选中行的对象
			});
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	return grid;

};

/**
 * 方法:initBoxNobr 根据属性创建含复选框的Grid,不带分页功能 属性:ds--数据列表的数据源 :cm--数据列表显示的列模型
 * :tb--数据列表上方的功能菜单 :sm--数据列表的行选择模板 返回:grid--构建好的数据列表
 */
myGrid.initBoxNobr = function(ds, cm, tb, sm) {

	cm.defaultSortable = false; // 设定能进行排序

	var grid = new Ext.grid.GridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		trackMouseOver : false,
		loadMask : {
//			msg : '正在装载数据...'
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		tbar : tb
			// 设置上方工作面板
	});
	// 定义grid的rowclick事件
	grid.on('click', function(grid, rowIndex, e) {
				myGrid.rows = sm.getSelections(); // 得到选中行的对象

			});
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	return grid;

};

myGrid.gridPageSize=function(ds, cm, tb, sm, plugins,pagesize){

    cm.defaultSortable = true; // 设定能进行排序
    var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象
        // region:'center', //面板位置
        // id:'topic-grid',
        store : ds, // 绑定数据源
        cm : cm, // 设置列模板
        sm : sm,
        plugins : plugins,
        trackMouseOver : false,
        loadMask : {
//          msg : '正在装载数据...'
        },
        viewConfig : {
            forceFit : true,
            enableRowBody : true,
            showPreview : true
        },
        tbar : tb, // 设置上方工作面板
        clicksToEdit : 1,
        bbar : new Ext.PagingToolbar({ // 定义下方工作面板
            pageSize : pagesize,
            store : ds,
            displayInfo : true//,
//          displayMsg : '当前行数{0} - {1} 共 {2} 行',
//          emptyMsg : "未查询到数据"
        })
    });
    // 定义grid的rowclick事件
    grid.on('click', function(grid, rowIndex, e) {
                myGrid.row = ds.data.items[rowIndex]; // 得到选中行的对象
                myGrid.rows = sm.getSelections(); // 得到选中行的对象
            });
    grid.on('beforedestroy', function(e) {
                e.store.removeAll();
            });
    return grid;


}
myGrid.load = function(ds) {
	ds.load();
};

myGrid.loadvalue = function(ds, args, baseargs) { // 带参数的数据加载
	// ds.baseParams = baseargs; // 分页时也能保持的参数
	ds.on('beforeload', function(ds, options) {
				Ext.apply(options.params, baseargs);
				ds.baseParams = options.params;
			});
	ds.load({
				params : args
			}); // 首次加载有效的参数，点分页时参数被覆盖
};
myGrid.postLoad = function(ds, baseargs) { // 带参数的数据加载
	ds.on('beforeload', function(ds, options) {
				Ext.apply(options.params, baseargs);
			});
	ds.load();
};
myGrid.reloadvalue = function(ds, args, baseargs) {
	ds.baseParams = baseargs; // 分页时也能保持的参数
	ds.load({
				params : args
			});
}


myGrid.loadvaluegantt = function(ds, dsa,args, baseargs) { // 带参数的数据加载
	// ds.baseParams = baseargs; // 分页时也能保持的参数
	ds.on('beforeload', function(ds, options) {
				Ext.apply(options.params, baseargs);
				ds.baseParams = options.params;
			});	
	ds.load({
				params : args
			}); // 首次加载有效的参数，点分页时参数被覆盖
	
    dsa.on('beforeload', function(dsa, options) {
						Ext.apply(options.params, baseargs);
						dsa.baseParams = options.params;
				    });
	dsa.load({
			   params : args
			 }); // 首次加载有效的参数，点分页时参数被覆盖		
			
};
