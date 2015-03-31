var vendorWinGrid = {};
//指定供应商列表
vendorWinGrid.gridWin = function(materialIDs) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
		{
			proxy : new Ext.data.HttpProxy( {
				url : '../JSON/vendor_VendorRemote.getVendorAppraisalGridData?d='
						+ new Date()+'&selectStatus='+1,
				method : 'post'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'results',
				id : 'vendorID',
				totalProperty : 'totalProperty'
			}, [ 'vendorID', 'vendorName', 'vendorCode', 'accountID',
					'address', 'bank', 'businessScope','simpleName','type','sector',
					'strInitialEvaluationDate', 'vendorLevel', 'phone',
					'reviewResult', 'strReviewDate', 'taxID' ])
		});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
{
				header : '供应商编号 ',
				dataIndex : 'vendorCode',
				width : 100
			},			
			{
				header : '供应商名称',
				dataIndex : 'vendorName',
				sortable : true
			},			
			{
				header : '供应商简称',
				dataIndex : 'simpleName',
				sortable : true
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},
			{
				header : '类别',
				dataIndex : 'type',
				sortable : true,
				renderer:function(value){
					if(value==1){
						return "合格";
					}else if(value==2){
						return "试供";
					}else {
						return value;
					}
				}
			},{
				header : '所属行业',
				dataIndex : 'sector',
				sortable : true
			},
			/*{
				header : '采购产品名称 ',
//				dataIndex : 'materialItemName',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},*/
			{
				header : '经营地址 ',
				dataIndex : 'address',
				width : 300	,
				sortable : true			
			} ]);
	var tbar = [ '-','供应商名称：',{xtype:"textfield",id:'vendorName'},
	             '经营地址：',{xtype:"textfield",id:'address'},'-',
	             {text:'搜索',iconCls : 'search1',handler:function(){
	            	 vendorWinGrid.search();}} ];
	var grid = common.gridPanel('vendorWinGridPanelId', cm, store, tbar, true, sm,
			'供应商信息');
	store.baseParams = {start : 0, limit: 20,vendorByMaterial:'2',materialIds:materialIDs};
	store.load();

	var buttons = [{
		text : ' 确定 ',
		handler : function(){
			var records = common.selectObj;
			if(records == null){
				Ext.Msg.alert('提示','请选择你要指定的供应商！');
				return ;
			}
			Ext.MessageBox.confirm('指定供应商信息', 
					'确认指定供应商信息，是否继续？　', function(btn, text){
				if(btn == 'yes'){
					var vendorIds = new Array();
					for(var i=0;i<records.length;i++){
						vendorIds.push(records[i].get('vendorID'));
					}
					callSeam("vendor_VendorRemote", 
							"setVendorAndMaterial", 
							[vendorIds,materialIDs], 
							function(){
								Ext.Msg.alert("提示","保存成功！");
								 vendorAction.callBack();
							}
							);
							
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

//按条件检索供应商
vendorWinGrid.search = function(){
	var vendorName = $.trim(document.getElementById('vendorName').value);
	var address = $.trim(document.getElementById('address').value);
	var store = Ext.getCmp("vendorWinGridPanelId").getStore();
	var con='"start" : 0, "limit" : 20';
	if(vendorName != ""){
		con += ', "vendorName" : "'+vendorName+'"';
	}
	if(address != ""){
		con += ', "address" : "'+address+'"';
	} 
	con = "{" + con + "}";
	store.baseParams = $.parseJSON(con);
	store.load();
}

