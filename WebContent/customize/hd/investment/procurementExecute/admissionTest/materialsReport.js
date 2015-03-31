/**
*物资报表
**/
var materialsReport = {
	startDate : '',
	endDate : '',
	desingnation : '',
	itemName :'',
	applyNum : ''
} 
 
MyGridView = Ext.extend(Ext.grid.GridView, {

			renderHeaders : function() {

				var cm = this.cm, ts = this.templates;

				var ct = ts.hcell, ct2 = ts.mhcell,ctm=ts.mhcellm;

				var cb = [], sb = [], p = {}, mcb = [],mcbm=[];

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
				   if (cm.config[i].mtext)

						mcbm[mcbm.length] = ctm.apply({
								
									
									valuem : cm.config[i].mtextm,							
									
									mcolsm : cm.config[i].mcolm,
									
									mwidthm : cm.config[i].mwidthm


								});				

				}

				var s = ts.header.apply({

							cells : cb.join(""),//显示字段

							tstyle : 'width:' + this.getTotalWidth() + ';',

							mergecells : mcb.join("")//,
						 	
//						    mergecellsm : mcbm.join("")

						});
			   var ss = ts.headerm.apply({

//							cells : cb.join(""),//显示字段

							tstyle : 'width:' + this.getTotalWidth() + ';',

//							mergecells : mcb.join(""),
						 	
						    mergecellsm : mcbm.join("")

						});		

				return ss+s;

			}

		});

viewConfig = {

	templates : {
		headerm : new Ext.Template(

				' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',

				' <thead> <tr class="x-grid3-hd-row">{mergecellsm} </tr>'

				+ '  </thead>',

				" </table>"),


		header : new Ext.Template(

				' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',

				' <thead> <tr class="x-grid3-hd-row">{mergecells} </tr>'

				+ ' <tr class="x-grid3-hd-row">{cells} </tr> </thead>',

				" </table>"),

		mhcellm : new Ext.Template(
		        	' <td class="x-grid3-header" colspan="{mcolsm}" style="width:{mwidthm}px;"> <div align="center">{valuem}</div>',

				" </td>"),
				
		mhcell : new Ext.Template(
		        	' <td class="x-grid3-header" colspan="{mcols}" style="width:{mwidth}px;"> <div align="center">{value}</div>',

				" </td>")
		

	}

};



materialsReport.gridPanel = function() {

	   
     var firstGroupRow= [
          {header: '中航工业洪都', colspan: 9, align: 'center'},
          {header: '物资检验登记', colspan: 13, align: 'center'}
      ]
      
      var secondGroupRow=[
          {header: '', colspan: 9, align: 'center'},
          {header: '发票', colspan: 2, align: 'center'},
          {header: '运输情况', colspan: 2, align: 'center'},
          {header: '', colspan: 4, align: 'center'},
          {header: '入库', colspan: 3, align: 'center'},
          {header: '', colspan: 2, align: 'center'}
      ]
     	
    var group = new Ext.ux.grid.ColumnHeaderGroup({
        rows: [firstGroupRow, secondGroupRow]
    });
    
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/admissionTestRemote.getMaterialsReportGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'arrivalCheckId',
					totalProperty : 'totalProperty'
				}, [ 'vendorName', 'itemName', 'desingnation','registrationcode','itemCode',
					 'materialstandard','techniccondition','demension','invoiceNo','invoiceNum',
					 'transportDate','transportNo','arrivalNum','lupiNo','quyang','arrivalCheckId',
					 'testReport','ynStamped','inDate','inNum','applyNum','arrivalDate','inNo',
					 'contractCode','contractName','deliveryStatus','lotNo','price','supplyCertifica',
					 'createdate','checkStatus','materialstate','note','createname','departmentName',
					 'checkResult'
					 ])
			});

	 
	var columns=new Ext.grid.ColumnModel( [new Ext.grid.RowNumberer({
            width : 40,
            header : "<div align='center'>序号</div>",
            dataIndex : ""
 	}), {
            width : 100,
            align:'center',
            header : "<div align='center'>合同编号</div>",
            dataIndex : "contractCode"
 	}, {
            width : 100,
            align:'center',
            header : "<div align='center'>合同名称</div>",
            dataIndex : "contractName"
 	},{ 
            width : 100,
            align:'center',
            header : "<div align='center'>登记编号</div>",
            dataIndex : "registrationcode"

	}, {
 		  	 align:'center',
            width : 100,
            header : "<div align='center'>物资编号</div>",
            dataIndex : "itemCode"
	}, {
 		  	 align:'center',
            width : 100,
            header : "<div align='center'>物资名称</div>",
            dataIndex : "itemName"
	}, {
 			 align:'center',
            width : 100,
            header : "<div align='center'>牌号/型号</div>",
            dataIndex : "desingnation"
	}, {
 			 align:'center',
            width : 100,
            header : "<div align='center'>规格</div>",
            dataIndex : "materialstandard"
	}, {
 			 align:'center',
            width : 100,
            header : "<div align='center'>技术条件</div>",
            dataIndex : "techniccondition"
	}, {
 			 align:'center',
            width : 100,
            header : "<div align='center'>交货状态</div>",
            dataIndex : "deliveryStatus"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>到货数量</div>",
            dataIndex : "arrivalNum"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>计量单位</div>",
            dataIndex : "demension"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>到货批次</div>",
            dataIndex : "lotNo"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>入厂价格</div>",
            dataIndex : "price"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>发票号</div>",
            dataIndex : "invoiceNo"
	}, {
 			 align:'center',
            width : 100,
            header : "<div align='center'>运单号</div>",
            dataIndex : "transportNo"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>合格证</div>",
            dataIndex : "supplyCertifica"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>炉批号</div>",
            dataIndex : "lupiNo"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>入厂复验</div>",
            dataIndex : "checkResult"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>到货日期</div>",
            dataIndex : "arrivalDate"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>生产厂商</div>",
            dataIndex : "vendorName"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>物资状态</div>",
            dataIndex : "materialstate",
            renderer : function(value, cellmeta, record, rowIndex){
				if (value == 1){
					return "正常入库";
				}else if(value == 2){
					return "委托加工";
				}else if(value ==3){
					return "返修品";
				}else{
					return "";
				}
			}
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>当前状态</div>",
            dataIndex : "checkStatus",
            renderer : function(value, cellmeta, record, rowIndex){
				if(value=='0'){return '登记';}
				else if(value=='1'){return '理化';}
				else if(value=='2'){return '检测报告合格';}
				else if(value=='3'){return '检测报告不合格';}
				else if(value=='4'){return '意见书重检';}
				else if(value=='5'){return '意见书退货';}
				else if(value=='6'){return '已退货';}
				else if(value=='7'){return '已入库';}
				else if(value=='8'){return '意见书-降级使用';}
				else if(value=='9'){return '';}
				else if(value=='10'){return '确认登记:已确认';}
				else if(value=='-10'){return '确认登记:退回';}
				else if(value=='11'){return '开箱检查:合格';}
				else if(value=='-11'){return '开箱检查:不合格';}
				else if(value=='12'){return '请检:完成';}
				else if(value=='-12'){return '请检:未完成';}
				else if(value=='13'){return '表面初检:合格';}
				else if(value=='-13'){return '表面初检:不合格';}
				else if(value=='14'){return '委托试验:完成';}
				else if(value=='-14'){return '委托试验:未完成';}
				else if(value=='+14'){return '委托试验:无需';}
				else if(value=='15'){return '取样:完成';}
				else if(value=='-15'){return '取样:未完成';}
				else if(value=='+15'){return '取样:无需';}
				else if(value=='16'){return '送样:完成';}
				else if(value=='-16'){return '送样:未完成';}
				else if(value=='+16'){return '送样:无需';}
				else if(value=='17'){return '试验报告:完成';}
				else if(value=='-17'){return '试验报告:未完成';}
				else if(value=='+17'){return '试验报告:无需';}
				else if(value=='18'){return '打钢印:完成';}
				else if(value=='-18'){return '打钢印:未完成';}
				else if(value=='+18'){return '打钢印:无需';}
				else if(value=='19'){return '分光/磨火花:完成';}
				else if(value=='-19'){return '分光/磨火花:未完成';}
				else if(value=='+19'){return '分光/磨火花:无需';}
				else if(value=='20'){return '表面检查:完成';}
				else if(value=='-20'){return '表面检查:未完成';}
				else if(value=='+20'){return '表面检查:无需';}
				else if(value=='21'){return '喷字:完成';}
				else if(value=='-21'){return '喷字:未完成';}
				else if(value=='+21'){return '喷字:无需';}
				else if(value=='22'){return '油封:完成';}
				else if(value=='-22'){return '油封:未完成';}
				else if(value=='+22'){return '油封:无需';}
				else if(value=='24'){return '不合格处理:退货';}
				else if(value=='-24'){return '不合格处理:返修';}
				else{
					return value;//'已登记';
				}
			}
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>登记时间</div>",
            dataIndex : "createdate"
	},
	{
 			 align:'center',
            width : 100,
            header : "<div align='center'>登记单位</div>",
            dataIndex : "departmentName"
	},
	{
 			 align:'center',
            width : 100,
            header : "<div align='center'>登记人</div>",
            dataIndex : "createname"
	},{
 			 align:'center',
            width : 100,
            header : "<div align='center'>备注</div>",
            dataIndex : "note"
	}
	/*,{
			header : '待入库数量',
			align : "center",
			dataIndex : 'applyNum',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {  
					var arrivalNum = record.get('arrivalNum');
					var inNum = record.get('inNum');
					if(arrivalNum==null || arrivalNum=="")
						return "";
					if(inNum==null || inNum=="")
						return arrivalNum;
					return Subtr(parseFloat(arrivalNum) , parseFloat(inNum));
				}
	}*/
	]);
	
	var cm = new Ext.grid.ColumnModel( [new Ext.grid.RowNumberer({
    		mtextm :" <div align='center'>中航工业洪都</div> ",
            mtext : " &nbsp; ",            
            mcolm : 9,
            mcol : 1,            
            mwidthm : 840,
            mwidth : 40,
            width : 40,
            header : "<div align='center'>序号</div>",
            dataIndex : ""
 	}), { 
 		 	mtext : " &nbsp; ",
 			mcol : 1,     
 		  	mwidth : 100,
            width : 100,
            align:'center',
            header : "<div align='center'>登记编号</div>",
            dataIndex : "registrationcode"

	}, { 
 		 	mtext : " &nbsp; ",
 			mcol : 1,     
 		  	mwidth : 100,
            width : 100,
            align:'center',
            header : "<div align='center'>供应商</div>",
            dataIndex : "vendorName"

	}, {
			mtext : " &nbsp; ",
 			mcol : 1,     
 		  	mwidth : 100,
 		  	 align:'center',
            width : 100,
            header : "<div align='center'>编码</div>",
            dataIndex : "itemCode"
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,     
 		  	mwidth : 100,
 		  	 align:'center',
            width : 100,
            header : "<div align='center'>名称</div>",
            dataIndex : "itemName"
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,  
 			mwidth:100,
 			 align:'center',
            width : 100,
            header : "<div align='center'>牌号</div>",
            dataIndex : "desingnation"
	}, {
			mtext : " &nbsp; ",
 			mcol : 1, 
 			mwidth:100,
 			 align:'center',
            width : 100,
            header : "<div align='center'>规格</div>",
            dataIndex : "materialstandard"
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,  
 			mwidth:100,
 			 align:'center',
            width : 100,
            header : "<div align='center'>技术条件</div>",
            dataIndex : "techniccondition"
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,  
 			mwidth:100,
 			 align:'center',
            width : 100,
            header : "<div align='center'>单位</div>",
            dataIndex : "demension"
	}, {
			mtextm :" <div align='center'>物资检验登记</div> ",
	        mtext : " <div align='center'>发票</div> ",            
	        mcolm : 11,
	        mcol : 2,            
	        mwidthm : 1600,
	        mwidth : 200,
	         align:'center',
	        width : 100,
	        header : "<div align='center'>号码</div>",
            dataIndex : "invoiceNo"
	}, { 
	        mtext : " &nbsp; ",
 			mcol : 2,  
 			mwidth:100,
			header : '数量',
			align : "center",
			 align:'center',
			dataIndex : 'invoiceNum',
			width : 100,
			sortable : true
	}, {
		    mtextm : " &nbsp; ",
		    mcolm : 1,
		    mwidthm : 300, 
			mtext : "运输情况",
			mcol : 3, 
			mwidth : 200,
			header : '运单号',
			width : 100,
			align : "center",
			dataIndex : 'transportNo',
			sortable : true
	} , {
	       	mtext : " &nbsp; ",
 			mcol : 3,  
 			mwidth:100,
			header : '件数', 
			align : "center",
			dataIndex : 'arrivalNum',
			width : 100,
			sortable : true
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,  
			mwidth:100,
			align : "center",
			header : '炉批号',
			dataIndex : 'lupiNo',
			width : 100,
			sortable : true
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,  
 			mwidth:100,
			align : "center",
			header : '取样',
			dataIndex : 'quyang',
			width : 100,
			sortable : true
	}, {
			  mtext : " &nbsp; ",
 			mcol : 2,  
 			mwidth:100,
			align : "center",
			header : '试验报告',
			dataIndex : 'testReport',
			width : 100,
			sortable : true
	}, {  mtext : " &nbsp; ",
 			mcol : 2,  
 			mwidth:100,
			align : "center",
			header : '打钢印',
			dataIndex : 'ynStamped',
			width : 100,
			sortable : true
	}, {
			mtext : "入库",
			mcol : 3,
			mwidth : 300,
			header : '日期',
			width : 100,
			align : "center",
			dataIndex : 'inDate',
			sortable : true
	}, {
       		mtext : " &nbsp; ",
 			mcol : 1,    
			mwidth:100,
			header : '单号',
			align : "center",
			dataIndex : 'inNo',
			width : 100,
			sortable : true
	}, {
      		mtext : " &nbsp; ",
 			mcol : 1,    
			mwidth:100,
			header : '数量',
			align : "center",
			dataIndex : 'inNum',
			width : 100,
			sortable : true
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,    
			mwidth:100,
			header : '待入库数量',
			align : "center",
			dataIndex : 'applyNum',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {  
					var arrivalNum = record.get('arrivalNum');
					var inNum = record.get('inNum');
					if(arrivalNum==null || arrivalNum=="")
						return "";
					if(inNum==null || inNum=="")
						return arrivalNum;
					return Subtr(parseFloat(arrivalNum) , parseFloat(inNum));
				}
	}, {
			mtext : " &nbsp; ",
 			mcol : 1,    
			mwidth:100,
			header : '到货时间',
			align : "center",
			dataIndex : 'arrivalDate',
			width : 100,
			sortable : true
			
	}]);
	var tbar = [{
		text : '导出',
		iconCls : 'icon-exportTasks',
		handler:function(){
//							tenderAction.searchFixView(); 
			 var inputs = '<input type="hidden" name="className" value="admissionTestRemote"/>'
				+ '<input type="hidden" name="startDate" value="'+materialsReport.startDate+'"/>' 
				+ '<input type="hidden" name="endDate"  value="'+materialsReport.endDate+'"/>' 
				+ '<input type="hidden" name="desingnation" value="'+materialsReport.desingnation+'"/>' 
				+ '<input type="hidden" name="itemName" value="'+materialsReport.itemName+'"/>'
				+ '<input type="hidden" name="applyNum" value="'+materialsReport.applyNum+'"/>' 
				+ '<input type="hidden" name="methodName" value="exportMaterialsReportGridData"/>' 
				+ '<input type="hidden" name="fileName" value="物资报表"/>';
				$('<form action="../exportExcelServlet" method="post">'+inputs+'</form>')
					.appendTo('body').submit().remove();
		}
	}
//	,
//	'-',{
//		text : '打印',
//		iconCls : 'Print',
//		handler : function() {
//			  var c = window.body.first().dom.innerHTML;
//				           var printer = window.body.last().dom.contentWindow;
//				           printer.document.body.innerHTML = c;
//				           printer.print();
//		}
//	}
	,'-',{
		text : '查询',
		iconCls : 'search1',
		handler:function(){
					materialsReportQuery.getSearchForm().show();
		}
	}];

	var grid = new Ext.grid.GridPanel({
	     region : "center",
	     store : store,
	     tbar : tbar,
	     width : 800,
	     height : 400,
	     cm : columns,//
	     sm : sm,
	     id : "materialsReportoryOnePanelId",
//	     view : new MyGridView(viewConfig), 
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
//	     plugins: group,
//	     plugins: new Ext.ux.grid.ColumnHeaderGroup({// 注:数组元素也为数组类型
//				rows : [[{
//							header : '',
//							colspan : 8
//						}, {
//							header : '签定单位',
//							colspan : 4,
//							align : 'center'
//						}, {
//							header : '',
//							colspan : 4
//						}]]
//			}),
	     bbar:new Ext.PagingToolbar({
	    	 pageSize:20,
	    	 store:store,
	    	 displayInfo:true,
	    	 displayMsg:'显示第  {0}条 到 {1}条记录，一共{2}条',
	    	 emptyMsg:"没有记录"
	     })
	    });  
	    return grid
}
materialsReport.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '物资报表',
		id : 'materialsReportGridTab',
		layout : 'fit',
		items : [ materialsReport.gridPanel() ],
		listeners : {
			'activate' : function() {
			 
				var grid = Ext.getCmp('materialsReportoryOnePanelId'); 
				grid.store.baseParams = {start : 0 ,limit :20};
				grid.store.load();
			}
		}
	});

	return tab;
};
function Subtr(arg1,arg2){
    var r1,r2,m,n;
    try{
    	r1=arg1.toString().split(".")[1].length;
    }catch(e){
    	r1=0;
    }
    try{
    	r2=arg2.toString().split(".")[1].length;
    }catch(e){
    	r2=0;
    }
    m=Math.pow(10,Math.max(r1,r2));
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}
