var atemplatedetail = {
	parentId : -1
};
atemplatedetail.init = function(id) {
	// 获取屏幕宽度
	var bwidth = Ext.getBody().getWidth();
	// 创建form面板，包括模板名称和模板说明
	atemplatedetail.form_panel = new Ext.form.FormPanel({
				autoScroll : true,
				width:500,
				heigth:180,
				border : false,
				bodyStyle : 'padding:10px 0px 10px 10px',
				items : [{
					layout : 'column',
					border : false,
					defaults : {
						layout : 'form',
						border : false
					},
					items : [{
								text : '' + getResource('resourceParam5006')// 创建label模板名称
										+ getResource('resourceParam480') + '：',
								style : 'margin-top:20px;',
								xtype : 'label',
								columnWidth : .175,
								name : 'explain'
							}, {
								xtype : 'textfield',
								style : 'margin-top:20px;',
								allowBlank : false,
//								disabled:true,
								/**
								 * bug编号799 wangyf
								 * bug信息：1。进入系统管理-审批模板查看页面，重新点击状态中的下拉列表选项，此时新建按钮没有默认为恢色显示
								 *				应置恢。同时状态按钮也应置恢应不可进行修改操作。
								 *			2。查看页面上的名称与说明内容不应置恢。
								 * 2011-05-24
								 */
								readOnly : true,
								fieldLabel : ''
										+ getResource('resourceParam7088')// 创建文本框
										+ getResource('resourceParam480') + '',
								columnWidth : .825,
								id : 'flowName1',
								invalidText : ''
										+ getResource('resourceParam7054') + ''
							}, {
								text : '' + getResource('resourceParam5006')
										+ getResource('resourceParam467') + '：',// 创建label模板说明
								style : 'margin-top:10px;',
								xtype : 'label',
								columnWidth : .175,
								name : 'explain'
							}, {
								/**
								 * bug编号799 wangyf
								 * bug信息：1。进入系统管理-审批模板查看页面，重新点击状态中的下拉列表选项，此时新建按钮没有默认为恢色显示
								 *				应置恢。同时状态按钮也应置恢应不可进行修改操作。
								 *			2。查看页面上的名称与说明内容不应置恢。
								 * 2011-05-24
								 */
//								disabled:true,
								readOnly : true,
								xtype : 'textarea',
								style : 'margin-top:10px;',
								columnWidth : .825,
								fieldLabel : ''
										+ getResource('resourceParam467') + '',
								id : 'flowDescription1',
								name : 'flowDescription1'
							}, {
								html : '&nbsp;',
								height:'5px',
//								style : 'margin-top:10px;',
								xtype : 'label',
								columnWidth : .3,
								name : 'explain'
							}]
				}]
			});
	// 创建实例
	var approval_step = Ext.data.Record.create([{
				name : 'name'
			}, {
				name : 'username'
			}, {
				name : 'departmentname'
			}, {
				name : 'success'
			}, {
				name : 'flowid'
			}, {
				name : 'flowname'
			}, {
				name : 'flowdescription'
			}]);
	// 调用的后台的具体方法
	var url = '../JSON/approval_templetRemote.getFlowTemplet';
	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'GET'
			});
	// 接值方式
	var reader = new Ext.data.JsonReader({
		root : 'results',
		totalProperty : 'totalProperty'
			// id : 'id'
		}, approval_step);

	var store = new Ext.data.GroupingStore({
				proxy : proxy,
				reader : reader
			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(),{
			id : 'name',
			header : '' + getResource('resourceParam7126')
					+ getResource('resourceParam6096') + '',
			dataIndex : 'name',
			width : 70,
			editor : {
				xtype : 'textfield',
				allowBlank : false
			}
		}, {
			id : 'departmentname',
			header : '' + getResource('resourceParam1045')
					+ getResource('resourceParam4011') + '',
			dataIndex : 'departmentname',
			width : 100
		}, {
			id : 'username',
			width : 70,
			header : '' + getResource('resourceParam1045')
					+ getResource('resourceParam4012') + '',
			dataIndex : 'username'
		}]
	});
	store.load({
				params : {
					flowid : id
				},
				callback : function(r, options, success) {
					Ext.getCmp('flowName1')
							.setValue(this.getAt(0).data.flowname);
					Ext.getCmp('flowDescription1')
							.setValue(this.getAt(0).data.flowdescription);
				}
			});
	atemplatedetail.grid_panel = new Ext.grid.GridPanel({
				columnWidth : .85,
				style : 'margin-left:20px;',
				store : store,
				cm : cm,
				height : 220,
				border : true,
				stripeRows : true,
				autoExpandColumn : 'name',
				margins : '0 5 5 5',
				// plugins : [editor],
				viewConfig : {
					forceFit : true
				}
				/**
				 * bug编号1072 wangyf
				 * bug信息：审批模板管理界面，修改或查看模板显示3页但不能翻页，因为1页显示所有内容
				 * 注：经与caort讨论，把下面的分页bbar去掉
				 * 2011-06-09 9：59
				 */
//				bbar : new Ext.PagingToolbar({
//							pageSize : 10,
//							store : store,
//							displayInfo : true,
//							displayMsg : '' + getResource('resourceParam7074')
//									+ '',
//							emptyMsg : "" + getResource('resourceParam7075')
//									+ ""
//						})
			});
	// 创建column布局面板，放置下部信息
	atemplatedetail.column_panel = new Ext.Panel({
				width:500,
				height:450,
				border : false,
				style : 'margin-left:10px;',
				layout : 'column',
				items : [{
							text : '' + getResource('resourceParam5006')// 创建label模板步骤
									+ getResource('resourceParam7126') + '：',
							// style : 'margin-top:20px;',
							xtype : 'label',
							columnWidth : .13,
							name : 'explain'
						}, atemplatedetail.grid_panel]
			})

	atemplatedetail.panel = new Ext.Panel({
				layout : 'anchor',
				items : [atemplatedetail.form_panel,
						atemplatedetail.column_panel]

			})

	return atemplatedetail.panel;
}