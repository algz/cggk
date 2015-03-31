// 添加参与人员类
var zyryadd = {
	deptid : null,
	win : null,
	form : null,
	grid : null,
	ds : null,
	noticeId : null,
	warnMsg : null
}
zyryadd.initWin = function(title, ds) {
	zyryadd.win = new Ext.Window({
				title : title,
				width : 400,
				height : 350,
				closeAction : 'hide',
				layout : 'border',
				modal : true,
				resizable : false,
				plain : false,
				autoScroll : true,
				buttons : [
						/**
						 * bug编号1191,1483 wangyf
						 * 注：bug第二次修改。bug注释请修改为附图中的方式，已和振华确认
						 * 2011-06-20 11:20
						 */
						{   
							xtype : 'label',
							html : '<font size=2>添加机构：选择机构—>勾选—>保存</font> <br> ' +
								   '<font style="margin-left : -47px" size=2>删除机构：取消勾选—>保存</font>',
							labelStyle : 'margin-left : -200px'
						}, {
							text : '保存',
							handler : function() {
//							var value =	departmentUser.departmentCombo.getValue(); //@chenw添加不选择部门的判断
//								if(value){
									zyryadd.submit(ds);
//								}else{
//									Ext.Msg.show({
//										title : '提示信息',
//										msg : '请选择机构下的部门！',
//										width : 200,
//										buttons : Ext.Msg.OK,
//										icon : Ext.Msg.INFO
//									});
//								}
							}
						}, {
							text : '退出', // text
							// :
							// '取消'
							handler : zyryadd.closeWin
						}]
			});
	zyryadd.win.on('hide', zyryadd.closeWin);
}




zyryadd.initForm = function() {
	departmentUser.department(getResource('resourceParam873') + '');
	departmentUser.departmentCombo.setWidth(200);
	//@chenw 添加用户机构反选
		var deptID = null;
		departmentUser.departmentCombo.on('afterrender',function(){
		       Seam.Component.getInstance("common_inst_InstSelectSvr").getDepartmentID('all',
					function(dept){
						deptID = dept;
					});
		});
		var ff = function(arrId, pos, dest){
				var node = departmentUser.treePanel.getNodeById(arrId[pos]);
				if (node) {
					node.expand(false, false, function(node){
						var tmpNode = departmentUser.treePanel.getNodeById(dest);
						if (tmpNode) {
							tmpNode.select();
						} else {
							ff(arrId, (pos + 1), dest);
						}
					});
				}
			}
		departmentUser.departmentCombo.on('expand', function() {
			       departmentUser.treePanel.on('expandnode', function(node) {
						var arr = deptID.split('/');
						var dest = arr[arr.length - 1];
						arr.length = arr.length - 1;
						ff(arr, 0, dest);
				       });
				});
	
	var userCombo = departmentUser.departmentCombo;// instSelectUI.getCombo('所属机构',
	// 'instcode');
	Ext.form.Field.prototype.msgTarget = 'qtip';
	userCombo.on('select', function(combo, record, index) {
				zyryadd.deptid = record.id;
				baseargs = {
					deptid : record.id,
					/**
					 * bug编号1191 wangyf
					 * 同下
					 */
//					noticeid : zyryMain.noticeid
					noticeid : zyryadd.noticeId
				};
				zyryadd.ds.on('beforeload', function(ds, options) {
					Ext.apply(options.params, baseargs);
				});
				zyryadd.ds.load();
			});
	zyryadd.form = {
		xtype : 'form',
		region : 'north',
		labelSeparator : ':',
		frame : true,
		height : 42,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		items : userCombo
	}
	
	return zyryadd.form
}

zyryadd.closeWin = function() {
	if (zyryadd.win != null) {
		zyryadd.win.close();
	}
}

zyryadd.submit = function(ds) {
	var temp = zyryadd.getdeps();
	/**
	  * bug编号1191 wangyf
	  * bug信息：西飞项目提出-公告中，通知机构选择以后，出现机构列表，用户担心关闭窗口未能保存。
	  * 2011-06-14 16：52
	  */
//	Seam.Component.getInstance("noticeDeptsSvr").saveDep(zyryMain.noticeid,
//			temp, zyryadd.savedep);
	Seam.Component.getInstance("noticeDeptsSvr").saveDep(zyryadd.noticeId,
			temp, zyryadd.savedep);
	//注：bug编号1191 请修改为附图中的方式，已和振华确认 mds
//	zyryadd.closeWin();
	/**
	 * bug编号1191 wangyf
	 * 同上
	 */
	myGrid.postLoad(ds, {
//				noticeid : zyryMain.noticeid
				noticeid : zyryadd.noticeId
			});
}

zyryadd.initGrid = function() {
	var strurl = '../JSON/noticeDeptsSvr.getdepList';
	zyryadd.ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : strurl,
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, [{
									name : 'deptid'
								}, {
									name : 'depname'
								}, {
									name : 'flag'
								}]),
				sortInfo : {
					field : 'deptid',
					direction : 'ASC'
				}
			});
	var sm=new Ext.grid.CheckboxSelectionModel(); 
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, {
			header : getResource('resourceParam697') + "",
			dataIndex : 'deptid'
		}, {
			header : getResource('resourceParam685') + "",
			dataIndex : 'depname'
		}]
	});
	var tb = null;
	zyryadd.grid = myGrid.initNobr(zyryadd.ds, cm, tb, sm,null);
		zyryadd.ds.on('beforeload', function(ds, options) {
				Ext.apply(options.params, {
				/**
				 * bug编号1191
				 */
//				noticeid : zyryMain.noticeid
				noticeid : zyryadd.noticeId
			});
			});
	zyryadd.ds.load();
	zyryadd.ds.on('load', function(store, records, options) {

	var aa=new Array();
			for (i = 0; i < records.length; i++) {
				if (records[i].get('flag') == "true") {
					aa.push(records[i]);
				} 
			}
			zyryadd.grid.getSelectionModel().selectRecords (aa,true);
		},this,{delay:50})

	return new Ext.Panel({
				region : 'center',
				layout : 'fit',
				items : zyryadd.grid
			})
}
/**
 * bug编号1191 wangyf
 * 同上
 */
//zyryadd.init = function(title, ds) {
zyryadd.init = function(title, noticeId) {
	zyryadd.noticeId = noticeId;
	var url = '../JSON/noticeDeptsSvr.getList';
	zyryadd.ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : url,
			method : 'POST'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty'
		}, [ {
			name : 'noticeid'
		}, {
			name : 'deptid'
		}, {
			name : 'depname'
		}, {
			name : 'id'
		}, {
			name : 'flag'
		} ]),
		sortInfo : {
			field : 'id',
			direction : 'ASC'
		}
	});
	
	zyryadd.initWin(title, zyryadd.ds);
	zyryadd.win.add(zyryadd.initGrid());
	zyryadd.form = zyryadd.win.add(zyryadd.initForm());
	if(Ext.isReady) {
		zyryadd.win.show();
	}
}

zyryadd.getdeps = function() {
	var returnId = "deptid";
	var result = "";
	var ids=zyryadd.grid.getSelectionModel().getSelections();
	for (var i = 0, record; record = ids[i]; i++) {
			if (result == "") {
				result = result + record.data[returnId];
			} else {
				result = result + "|" + record.data[returnId];
			}
	}
	return result;
};

zyryadd.savedep = function(value) {
	if (value) {
		Ext.example.msg("提示信息","通知机构设置成功！");
//		myGrid.postLoad(zyryGridUI.ds, zyryMain.baseargs);
	} else {
		Ext.MessageBox.show({
					title : getResource('resourceParam634') + '',
					msg : getResource('resourceParam804') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
};

