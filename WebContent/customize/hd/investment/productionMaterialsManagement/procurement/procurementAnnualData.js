MyGridView = Ext.extend(Ext.grid.GridView, {
            renderHeaders : function() {
                var cm = this.cm, ts = this.templates;
                var ct = ts.hcell, ct2 = ts.mhcell;
                var cb = [], sb = [], p = {}, mcb = [];
                for (var i = 0, len = cm.getColumnCount(); i < len; i++) {
                    p.id = cm.getColumnId(i);
                    p.value = cm.getColumnHeader(i) || "";
                    p.style = this.getColumnStyle(i, true);
                    if (cm.config[i].align == 'right') {
                        p.istyle = 'padding-right:16px';
                    }
                    cb[cb.length] = ct.apply(p);
                    if (cm.config[i].mtext)
                        mcb[mcb.length] = ct2.apply({
                                    value : cm.config[i].mtext,
                                    mcols : cm.config[i].mcol,
                                    mwidth : cm.config[i].mwidth
                                });
                }
                var s = ts.header.apply({
                            cells : cb.join(""),
                            tstyle : 'width:' + this.getTotalWidth() + ';',
                            mergecells : mcb.join("")
                        });
                return s;
            }
        });

viewConfig = {
    templates : {
        header : new Ext.Template(
                ' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                ' <thead> <tr class="x-grid3-hd-row">{mergecells} </tr>'
                        + ' <tr class="x-grid3-hd-row">{cells} </tr> </thead>',
                " </table>"),
        mhcell : new Ext.Template(
                ' <td class="x-grid3-header" colspan="{mcols}" style="width:{mwidth}px;"> <div align="center">{value}</div>',
                " </td>")
    }
};

var procurementAnnualData = {
	procurementId : null	
};

procurementAnnualData.rightPanel = function() {

	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridData?d=' + new Date(),
			method : 'post',
			params : {type:'1'}
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'procurementDetailId',
			totalProperty : 'totalProperty'
		}, [ 'procurementDetailId', 'buinessPlanDetailsId', 'materialQuotaId', 'materialTypeName', 'vendorId',
				'materialCounts', 'jan', 'feb', 'mar', 'apr', 'may', 'june','july','aug','sept','oct',
				'nov','dect','materialItemName','desingnation','technicCondition','materialStandard', 'productCode','totalRequired',
				'materialCount','remark','demension','procurementId','vendorName','optLock','materialId'])
	});
		
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
	    	mtext : " ",
	        mcol : 1,
	        mwidth : 40,
	        width : 40,
	        header : "序号"
     	}),
		 {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "器材名称",
		  width : 80,
		  dataIndex : "materialItemName",
			sortable : true	
		 }, {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "牌号",
		  width : 80,
		  dataIndex : "desingnation",
			sortable : true	
		 }, {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "规格/型号",
		  width : 80,
		  dataIndex : "materialStandard",
			sortable : true	
		 }, {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "技术条件",
		  width : 80,
		  dataIndex : "technicCondition",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "机型",
		  width : 80,
		  dataIndex : "productCode",
		  sortable : true, 
		  renderer : function(value, cellmeta, record, rowIndex) {
			  if (value != '详细') {
				  return value;
			  }
			  var materialId = record.get("materialId"); 		
	 		  return "<a href='javascript:void(0);' onclick=procurementAction.showDetail('"+materialId
							+"')>&nbsp;<font color=blue>"+value+"</font></a>";
		  }
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "需求数量",
		  width : 80,
		  dataIndex : "totalRequired",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "需用量",
		  width : 80,
		  dataIndex : "materialCount",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "需用总量",
		  width : 80,
		  dataIndex : "materialCounts",
			sortable : true			
		 }, {
	 	mtext:"&nbsp",
		  mcol:1,
		  mwidth:80,
		  header : "单位",
		  width : 80,
		  dataIndex : "demension",
			sortable : true			
/*		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "供应商",
		  width : 80,
		  dataIndex : "vendorName"	*/	
		 }, {
		  mtext:"交付时间",
		  mcol:12,
		  mwidth:600,
		  header : "1月",
		  width : 50,
		  dataIndex : "jan",
			sortable : true	
		 }, {
		  header : "2月",
		  width : 50,
		  dataIndex : "feb",
			sortable : true	
		 }, {
		  header : "3月",
		  width : 50,
		  dataIndex : "mar",
			sortable : true	
		 }, {
		  header : "4月",
		  width : 50,
		  dataIndex : "apr",
			sortable : true	
		 }, {
		  header : "5月",
		  width : 50,
		  dataIndex : "may",
			sortable : true	
		 }, {
		  header : "6月",
		  width : 50,
		  dataIndex : "june",
			sortable : true	
		 }, {
		  header : "7月",
		  width : 50,
		  dataIndex : "july",
			sortable : true	
		 }, {
		  header : "8月",
		  width : 50,
		  dataIndex : "aug",
			sortable : true	
		 }, {
		  header : "9月",
		  width : 50,
		  dataIndex : "sept",
			sortable : true	
		 }, {
		  header : "10月",
		  width : 50,
		  dataIndex : "oct",
			sortable : true	
		 }, {
		  header : "11月",
		  width : 50,
		  dataIndex : "nov",
			sortable : true	
		 }, {
		  header : "12月",
		  width : 50,
		  dataIndex : "dect",
			sortable : true							  
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "类别",
		  width : 80,
		  dataIndex : "materialTypeName",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "备注",
		  width : 80,
		  align : "left",
		  dataIndex : "remark",
		  renderer : function(value) {
			return value.replace(new RegExp(/</g), '&lt;');
		  }	,
			sortable : true		
		 }]);
	
	var planStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurement_ProcurementRemote.getAnnualGridData?d='+new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
		root : 'results',
		id : 'procurementId',
		totalProperty : 'totalProperty'
		}, ['procurementId','procurementCode'])
		});

	planStore.reload();

	var pCombo = new Ext.form.ComboBox( {
		store : planStore,
		typeAhead : true,
		mode : 'local',
		triggerAction : 'all',
		selectOnFocus : true,
		valueField : 'procurementId',
		displayField : 'procurementCode',
		appltTo : 'local-states'
	});
	
	pCombo.on('select', function(combo, record, index) { 
		procurementAnnualData.procurementId = combo.value; 
	});
	
	var tbar = [ '-', pCombo , '-', {
		text : '更新',
		iconCls : 'Update',
		handler : function() {
			if(procurementAnnualDetailTree.selectedMC == null){
				store.baseParams = {start : 0, limit: 20, 
						procurementId: procurementAnnualData.procurementId,
						type : '1',materialBuyType:'1'};
			}else{
				store.baseParams = {start : 0, limit: 20, 
						procurementId: procurementAnnualData.procurementId,
						nodeId : procurementAnnualDetailTree.selectedMC.id,
						type : '1',materialBuyType:'1'};
			}			
			store.load();
		}
	}];
	
	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
		
	var grid = new Ext.grid.GridPanel({
	     region : "center",
	     renderTo : Ext.getBody(),
	     store : store,
	     tbar : tbar,
	     bbar : bb,
	     cm : cm,
	     sm : sm,
	     id : "procurementAnnualDataGrid",
	     view : new MyGridView(viewConfig),
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
	     columnLines : true,
	     stripeRows : true,
	     viewConfig : {
			enableRowBody : true
	     }
	    });
	
	return grid;

}

procurementAnnualData.Panel = function() {

	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridData?d=' + new Date(),
			method : 'post' 
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'procurementDetailId',
			totalProperty : 'totalProperty'
		}, [ 'procurementDetailId', 'buinessPlanDetailsId', 'materialQuotaId', 'materialTypeName', 'vendorId',
				'materialCounts', 'jan', 'feb', 'mar', 'apr', 'may', 'june','july','aug','sept','oct',
				'nov','dect','materialItemName','desingnation','technicCondition','materialStandard', 'productCode','totalRequired',
				'materialCount','remark','demension','procurementId','vendorName','optLock','materialId'])
	});
		
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
	    	mtext : " ",
	        mcol : 1,
	        mwidth : 40,
	        width : 40,
	        header : "序号"
     	}),
		 {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "器材名称",
		  width : 80,
		  dataIndex : "materialItemName",
			sortable : true	
		 }, {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "牌号",
		  width : 80,
		  dataIndex : "desingnation",
			sortable : true	
		 }, {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "规格/型号",
		  width : 80,
		  dataIndex : "materialStandard",
			sortable : true	
		 }, {
		  mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "技术条件",
		  width : 80,
		  dataIndex : "technicCondition",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "机型",
		  width : 80,
		  dataIndex : "productCode",
		  sortable : true, 
		  renderer : function(value, cellmeta, record, rowIndex) {
			  if (value != '详细') {
				  return value;
			  }
			  var materialId = record.get("materialId"); 		
	 		  return "<a href='javascript:void(0);' onclick=procurementAction.showDetail('"+materialId
							+"')>&nbsp;<font color=blue>"+value+"</font></a>";
		  }
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "需求数量",
		  width : 80,
		  dataIndex : "totalRequired",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "需用量",
		  width : 80,
		  dataIndex : "materialCount",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "需用总量",
		  width : 80,
		  dataIndex : "materialCounts",
			sortable : true			
		 }, {
	 	mtext:"&nbsp",
		  mcol:1,
		  mwidth:80,
		  header : "单位",
		  width : 80,
		  dataIndex : "demension",
			sortable : true			
/*		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "供应商",
		  width : 80,
		  dataIndex : "vendorName"	*/	
		 }, {
		  mtext:"交付时间",
		  mcol:12,
		  mwidth:600,
		  header : "1月",
		  width : 50,
		  dataIndex : "jan",
			sortable : true	
		 }, {
		  header : "2月",
		  width : 50,
		  dataIndex : "feb",
			sortable : true	
		 }, {
		  header : "3月",
		  width : 50,
		  dataIndex : "mar",
			sortable : true	
		 }, {
		  header : "4月",
		  width : 50,
		  dataIndex : "apr",
			sortable : true	
		 }, {
		  header : "5月",
		  width : 50,
		  dataIndex : "may",
			sortable : true	
		 }, {
		  header : "6月",
		  width : 50,
		  dataIndex : "june",
			sortable : true	
		 }, {
		  header : "7月",
		  width : 50,
		  dataIndex : "july",
			sortable : true	
		 }, {
		  header : "8月",
		  width : 50,
		  dataIndex : "aug",
			sortable : true	
		 }, {
		  header : "9月",
		  width : 50,
		  dataIndex : "sept",
			sortable : true	
		 }, {
		  header : "10月",
		  width : 50,
		  dataIndex : "oct",
			sortable : true	
		 }, {
		  header : "11月",
		  width : 50,
		  dataIndex : "nov",
			sortable : true	
		 }, {
		  header : "12月",
		  width : 50,
		  dataIndex : "dect",
			sortable : true							  
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "类别",
		  width : 80,
		  dataIndex : "materialTypeName",
			sortable : true			
		 }, {
		 mtext:" ",
		  mcol:1,
		  mwidth:80,
		  header : "备注",
		  width : 80,
		  align : "left",
		  dataIndex : "remark",
		  renderer : function(value) {
			return value.replace(new RegExp(/</g), '&lt;');
		  }	,
			sortable : true		
		 }]); 
 
	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
		
	var grid = new Ext.grid.GridPanel({
	     height : 300,
	     renderTo : Ext.getBody(),
	     store : store, 
	     bbar : bb,
	     cm : cm,
	     sm : sm,
	     id : "procurementAnnualDataGrid1",
	     view : new MyGridView(viewConfig),
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
	     columnLines : true,
	     stripeRows : true,
	     viewConfig : {
			enableRowBody : true
	     }
	    });
	
	return grid;

}
procurementAnnualData.tabPanel = function() {
	
	// 1、左边树布局
	procurementAnnualData.leftpanel = new Ext.Panel( {
		id : 'annualLeftTree',
		region : 'west',
		width : '240',
		layout : 'fit',// 自适应整个高度
		border : false,
		split : true,
		margin : '0 0 5 0',
		items : [ procurementAnnualDetailTree.init() ]
	}); 

	// 2、右边列表布局
	procurementAnnualData.rightpanel = new Ext.Panel( {

		id : 'annualRightGrid1',
		region : 'center',
		width : '300',
		layout : 'fit',// 自适应整个高度
		border : false,
		margin : '0 0 5 0',
		items : [ procurementAnnualData.rightPanel() ]
	});

	var tab = new Ext.Panel( {
		title : '年度物资需求列表',
		id : 'procurementAnnualTab',
		layout : 'border',
		items : [ procurementAnnualData.leftpanel,
				procurementAnnualData.rightpanel ],
		listeners : {
			'activate' : function() {
				procurementMain.activeTabId = this.id;
			}
		}
	});

	return tab;
};
