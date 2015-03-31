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

var contractExecuteGrid = {
	selectRow:null,
	selectObj:null
};

// 数据列表
contractExecuteGrid.gridPanel = function() {
	var sm = new Ext.grid.CheckboxSelectionModel({
		mtext : " ",
        mcol : 1,
        mwidth : 20,
        width : 20
	});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/contractExecute_ContractExecuteRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'contractExecuteId',
					totalProperty : 'totalProperty'
				}, [ 'contractExecuteId','acceptance','batchNo','certificate',
				     'createDate','equipmentNumber','procurementContractId',
				     'remark','storageDate','storageNo','storageNumber','arrivalDate',
				     'testDate','testNo','transportDate','transportMode','transportNo'])
			});
	var cm = new Ext.grid.ColumnModel([sm, 
	  new Ext.grid.RowNumberer({
    	mtext : " ",
        mcol : 1,
        mwidth : 40,
        width : 40,
        header : "序号"
 	}),
	 {
	  mtext:"&nbsp;",
	  mcol:1,
	  mwidth:80,
	  header : "时间",
	  width : 80,
	  dataIndex : "createDate",
		sortable : true
	 }, {
	  mtext:"运输情况",
	  mcol:3,
	  mwidth:240,
	  header : "日期",
	  width : 80,
	  dataIndex : "transportDate",
		sortable : true
	 }, {
	  header : "方式",
	  width : 80,
	  dataIndex : "transportMode",
		sortable : true
	 }, {
	  header : "运单号",
	  width : 80,
	  dataIndex : "transportNo",
		sortable : true		
	 }, {
	 mtext:"材料到厂",
	  mcol:3,
	  mwidth:240,
	  header : "日期",
	  width : 80,
	  dataIndex : "arrivalDate",
		sortable : true	
	 }, {
	  header : "件数",
	  width : 80,
	  dataIndex : "equipmentNumber",
	  renderer : function(value){
		 if(value == '0') return '';
		 else return value;
	 },
		sortable : true		
	 }, {
	  header : "批次号",
	  width : 80,
	  dataIndex : "batchNo"	,
		sortable : true	
	 }, {
	 mtext:"提交请验",
	  mcol:3,
	  mwidth:240,
	  header : "日期",
	  width : 80,
	  dataIndex : "testDate",
		sortable : true		
	 }, {
	  header : "单号",
	  width : 80,
	  dataIndex : "testNo",
		sortable : true			
	 }, {
	  header : "技术证明",
	  width : 80,
	  dataIndex : "certificate",
		sortable : true		
	 }, {
	  mtext:"合格入库",
	  mcol:4,
	  mwidth:320,
	  header : "日期",
	  width : 80,
	  dataIndex : "storageDate",
		sortable : true	
	 }, {
	  header : "单号",
	  width : 80,
	  dataIndex : "storageNo",
		sortable : true	
	 }, {
	  header : "数量",
	  width : 80,
	  dataIndex : "storageNumber",
	  renderer : function(value){
		 if(value == '0') return '';
		 else return value;
	 },
		sortable : true	
	 }, {
	  header : "保管验收",
	  width : 80,
	  dataIndex : "acceptance",
	  renderer : function(value){
		 if(value == '0') return '未验收';
		 else if(value == '1') return '已验收';
	 },
		sortable : true	
	 }, {
	 mtext:" ",
	  mcol:1,
	  mwidth:100,
	  header : "备注",
	  width : 100,
	  align : "left",
	  dataIndex : "remark",
	  renderer : function(value) {
		return value.replace(new RegExp(/</g), '&lt;');
	  }	,
		sortable : true		
	 }]);
	var tbar = [ '-', {
		text : '新增',
		iconCls : 'add1',
		handler : function() {
			contractExecuteAction.addView();
		}
	}, '-', {
		text : '编辑',
		iconCls : 'edit1',
		handler : function() {
			contractExecuteAction.editView();
		}
	}, '-', {
		text : '删除',
		iconCls : 'del1',
		handler : function() {
			contractExecuteAction.del();
		}
	}, '-', {
		text : '返回',
		handler : function() {
			contractExecuteMain.window.close();
		}
	} ];
	
	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
		
	var grid = new Ext.grid.GridPanel({
	     renderTo : Ext.getBody(),
	     store : store,
	     tbar : tbar,
	     bbar : bb,
	     cm : cm,
	     sm : sm,
	     id : "contractExecuteGridId",
	     view : new MyGridView(viewConfig),
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     }
	    });
	
	sm.on('rowselect', function(sm, rowIndex, record) {
		contractExecuteGrid.selectRow = record;
	});
	sm.on('selectionchange', function(sm, t) {
		contractExecuteGrid.selectObj = sm.getSelections();
		if(!sm.getSelections() || sm.getSelections().length<1){
			contractExecuteGrid.selectRow = null;
		}
	});
	
	store.baseParams = {start : 0, limit: 20, procurementContractId: contractExecuteMain.contractId};
	store.load();
	return grid;
}

