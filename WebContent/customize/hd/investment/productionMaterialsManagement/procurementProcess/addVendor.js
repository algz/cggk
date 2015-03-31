//比价或招标指定供应商
var addWinGrid = {};
//供应商列表，弹出窗
addWinGrid.gridWin = function(url,type,vendorId,price) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : url,
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'accountID',
						'address', 'bank', 'businessScope',
						'strInitialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'strReviewDate', 'taxID','price' ])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,		
			{
				header : '供应商名称',
				dataIndex : 'vendorName',
				sortable : true
			},
			{
				header : '单价 ',
				dataIndex : 'price',
				width : 100,
				sortable : true
				,
				editor: new Ext.form.NumberField({ 
      		    }) 　
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},
			{
				header : '经营地址 ',
				dataIndex : 'address',
				width : 300,
				sortable : true
			} ]);
	var tbar = [ '-'];
	var grid;
	if(type==1 || type==4){
		grid = common.gridPanel('vendorWinGridPanelId', cm, store, null, true, sm, 
			'供应商信息');
	}else{
    grid = new Ext.grid.EditorGridPanel({
				id : 'vendorWinGridPanelId',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
				height : 570,
				autoWidth  : true,
				columnLines : true,
				clicksToEdit:1, 
				loadMask : {
					msg : '数据加载中...'
				},
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});  
	}
	store.baseParams = {start : 0, limit: 20, materialId : procurementProcessAction.materialId,selectStatus : '1'};
	store.load();
	store.on('load',function(store, records, options){ 
		  for(i =0; i<records.length;i++){ 
      			if(records[i].get('vendorID')==vendorId){  
      				sm.selectRow(i,true);
      				records[i].set('price',price);
      				records[i].commit()
      				break;
      			} 
		  }
	});
	grid.on({   
            render:{   
                fn: function() {   
                   grid.store.load();   
                }   
            },   
            scope:grid  
    });  
	var buttons = [{
		text : ' 确定 ',
		handler : function(){
			var records = Ext.getCmp("vendorWinGridPanelId").getSelectionModel().getSelections();
			if(records == null || records.length==0){
				Ext.Msg.alert('提示','请选择你要指定的供应商！');
				return ;
			}
			if(records.length>1){
				Ext.Msg.alert('提示','只能选择一个中标供应商！');
				return ;
			}
//			if(records[0].get("price")==""){
//				Ext.Msg.alert('提示','请填写价格！');
//				return ;
//			}
			Ext.MessageBox.confirm('指定供应商信息', 
					'确认指定供应商信息，是否继续？　', function(btn, text){
				if(btn == 'yes'){
					//指定供应商
					Ext.Ajax
							.request( {
								url : '../JSON/parityRemote.asignVendor?d='
										+ new Date(),
								method : 'POST',
								params : {
									"vendorId" : 	records[0].get('vendorID')+'',
									"parityId" : 	procurementProcessAction.parityId,
									"vendorName" : records[0].get('vendorName')+'',
									"price" : records[0].get('price')==""?"0":records[0].get('price')+''
								},
								success : function() {
									Ext.Msg.alert('提示', '保存成功！');
									//根据type值，加载数据
									var grid = Ext.getCmp('productionProcessId2');
									if(procurementProcessAction.type=='1'){
										grid.getStore().baseParams = {start:0,limit:20,type : '1'};
										grid.store.load();
									}
									var grid1 = Ext.getCmp('productionProcessId3');
									if(procurementProcessAction.type=='2'){
										grid1.getStore().baseParams = {start:0,limit:20,type : '2'};
										grid1.store.load();
									}
//									if(procurementProcessAction.type=='3'){
//										grid1=Ext.getCmp('agreementPurchaselGridPanel')
//										grid1.getStore().baseParams = {start:0,limit:20,type : '2'};
//										grid1.store.load();
//									}
									if(procurementProcessAction.type=='4'){
										//协议采购
										grid1=Ext.getCmp('agreementPurchaselGridPanel')
										grid1.getStore().baseParams = {start:0,limit:20,type : '4'};
										grid1.store.load();
									}
									if(procurementProcessAction.type=='5'){
										//直接采购
										grid1=Ext.getCmp('otherPurchaselGridPanel')
//										grid1.getStore().baseParams = {start:0,limit:20,type : '5'};
										grid1.store.reload();
									}
									if(procurementProcessAction.type=='6'){
										//招投标采购
										grid1.getStore().baseParams = {start:0,limit:20,type : '2'};
										grid1.store.load();
									}
								},
								failure : function() {
									Ext.Msg.alert('错误', '保存失败！');
								}
							});
					
					window.close();
				}
			});
			
		}		
	}, {
		text : '取消',
		handler : function() {
			window.close();
		}
	}]

	var window = new Ext.Window({
		id : "vendorChooseWind",
		width : 740,
		height : 440,
		autoScroll : true, 
		layout: 'fit',
		title : '&nbsp;供应商信息列表',
		modal : true,
		items : grid,
		buttons : buttons
	});
	return window;
	
}


