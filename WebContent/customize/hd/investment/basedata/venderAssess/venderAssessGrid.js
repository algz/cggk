var venderAssessGrid = {
		
	getPanel : function(){
		
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/vendor_VendorRemote.getVenderAssessGridData?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['assessId','assessNum','assessName','assessType','editor','editdate'])
		});
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
		}); 
		var cm = new Ext.grid.ColumnModel([
			 new Ext.grid.RowNumberer({
				 header : "序号",
				 width : 40
			 }),{  
			    header : '考核单编号',
				dataIndex : 'assessNum',
				sortable : true,
				width : 100, 
				renderer:function(value,metadata,record,rowIndex){
				 
//				 	var a =  "<a href='javascript:void(0);' " +
//				 			"onclick= 'venderAssessDetail.showVenderDetail("+
//				 			record.data.assessId+","+record.data.assessNum+","+
//				 			record.data.assessType+")'><font color='blue'>"+value+"</font></a>";
				 
				 	return "<a href='javascript:void(0);' onclick=venderAssessDetail.showVenderDetail('"+
				 	record.data.assessId+"','"+record.data.assessNum+"',"+record.data.assessType+")>"+value+"</a>";
				}
			},{ 
				header : '考核单名称',
				dataIndex : 'assessName',
				sortable : true,
				width : 100  
			}, {
				header : '产品类别',
				dataIndex : 'assessType',
				sortable : true,
				width : 100,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,store) {
					if(value == 1){return "成品";
					}else if(value == 2){return "原材料";}
				}
			},{ 
		        header : '制表人',
				dataIndex : 'editor',
				sortable : true,
				width : 100
					 
			},{ 
				header : '编制时间',
			    dataIndex : 'editdate',
				sortable : true,
			    width : 100 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '供应商考核',
			id : 'venderAssessGrid',
			cm : cm, 
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-',{
							iconCls : 'add1',
							text : '创建考核单',
							handler : function(){
								venderAssessGrid.createAssessWin();
							}
						},'-',{
							text : '删除',
							iconCls : 'del1',
							handler : function(){}
						}
				]})
		
		});
	
		grid.on('activate', function() { 
			store.baseParams = {start:0,limit:20};
			store.load();
		});
		return grid;

	},
	
	createAssessWin : function(){
		var combox = new Ext.form.ComboBox({
			name : 'assessType',
			fieldLabel : '产品类别',
			displayField : 'text',
			valueField : 'value',
			hiddenName : 'assessType',
			store : new Ext.data.SimpleStore({
				fields : ['value','text'],
				data : [[ '1', '成品' ], [ '2', '原材料' ]]
			}),
			triggerAction : 'all',
			mode : 'local',
			editable : false,
			width:50,
			allowBlank : false,
			forceSelection : true,
			anchor : '89%',
//			value : ''
			emptyText : '请选择...'
		});
		var items = [{
			xtype : "textfield",
			fieldLabel : '考核单编号',
			lableWidth : 150,
			id : 'assessNum',
			name : 'assessNum',
			anchor : '89%',
			allowBlank : false
		},{
			xtype : "textfield",
			fieldLabel : '考核单名称',
			lableWidth : 150,
			id : 'assessName',
			name : 'assessName',
			allowBlank : false,
			anchor : '89%'
		},combox]; 

		var inform = new Ext.FormPanel( {
			id : 'venderAssessFrom', 
			buttonAlign : 'center',
			labelAlign : 'right', 
			autoHeight : true, 
			border : false,
			items : items,
			width : 300,
			height : 150
		});
		
		var buttons = [ {
			text : ' 确定 ',
			handler : function() { 
				venderAssessGrid.saveVenderAssess();

		}
		}, {
			text : '取消',
			handler : function() {
				win.close();
			}
		} ]

		var win = new Ext.Window( {
			id : "venderAssessWin",
			title : "考核单",
			width : 300,
			layout : 'fit',
			autoScroll : true, 
			modal : true,
			items : inform,
			autoDestory : true,
			buttons : buttons,
			closeAction :'close'
		});
		win.show();
	},
	saveVenderAssess : function(){
		var formPanel = Ext.getCmp('venderAssessFrom');
		if(formPanel.form.isValid()) {
			formPanel.form.doAction('submit',{
				waitMsg:'正在保存数据，请稍候...',
				waitTitle:'提示',
				url : '../JSON/vendor_VendorRemote.saveVendorAssess?d='+ new Date(),
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提示','保存数据成功！');	
					var grid = Ext.getCmp('venderAssessGrid');
					grid.getStore().baseParams = {start:0,limit:20};
					grid.store.reload();
					Ext.getCmp('venderAssessWin').close();
				},
				failure : function(form, action){
					Ext.Msg.alert('提示','保存数据失败,供应商编号或供应商名称重复');
				}
			});
		}
	}
}