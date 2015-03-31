var baobiaoGrid={};
baobiaoGrid.grid = function() {
	
	var today=new Date();
	today.setMonth(0);
	baobiaoMain.getMonth(today);
    
	//Date.patterns.YearMonth
	var strurl = "../JSON/mytask_MyTaskRemote.getTaskByProjectId";
	var proxy = new Ext.data.HttpProxy( {
		url : strurl ,
		method:'POST'
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'id'
	}, ['id', 'taskname','allcount','montha','monthb','monthc','monthd','monthf','monthg'
	   ,'monthpage','datapage','dataAllpage','start','limit','dataAllRows']);

	
 	var ds = new Ext.data.Store({
        proxy: proxy,
        reader: reader
    });
	
    ds.on('load',function(stroe,records,options){
      	    if(records.length>0)
      	    {
      	    	var datapage=records[0].get('datapage');
      	    	var datAllpage=records[0].get('dataAllpage');
      	    	if(datapage == "1")
      	    	{
      	    		//x-btn-text x-item-disabled x-tbar-page-first
					//x-btn-text x-item-disabled x-tbar-page-last
					//x-btn-text x-item-disabled x-tbar-page-next
					//x-btn-text x-item-disabled x-tbar-page-prev
      	    		
      	    		Ext.get('firstpage').dom.className='x-btn-text x-item-disabled x-tbar-page-first';
      	    		Ext.get('prevpage').dom.className='x-btn-text x-item-disabled x-tbar-page-prev';
      	    		
      	    		Ext.get('nextpage').dom.className='x-btn-text x-tbar-page-next';
      	    		Ext.get('lastpage').dom.className='x-btn-text x-tbar-page-last';
      	    	
//      	    		x-btn-text x-tbar-page-first
//      	    		Ext.get('prevpage').dom.setTarget("x-btn-text x-tbar-page-prev");
//      	    		Ext.get('nextpage').dom.setTarget("x-btn-text x-tbar-page-next");
//      	    		Ext.get('lastpage').dom.setTarget("x-btn-text x-tbar-page-last");
      	    	}else if(datapage == datAllpage)
      	    	{
      	    		Ext.get('firstpage').dom.className='x-btn-text x-tbar-page-first';
      	    		Ext.get('prevpage').dom.className='x-btn-text x-tbar-page-prev';
      	    		Ext.get('nextpage').dom.className='x-btn-text x-item-disabled x-tbar-page-next';
      	    		Ext.get('lastpage').dom.className='x-btn-text x-item-disabled x-tbar-page-last';
      	    	}else{
      	    		
                    Ext.get('firstpage').dom.className='x-btn-text x-tbar-page-first';
      	    		Ext.get('prevpage').dom.className='x-btn-text x-tbar-page-prev';
      	    		Ext.get('nextpage').dom.className='x-btn-text x-tbar-page-next';
      	    		Ext.get('lastpage').dom.className='x-btn-text x-tbar-page-last';
      	    	}
	      	        Ext.get('pcountid').dom.innerHTML=datapage;
	      	        Ext.get('allcountid').dom.innerHTML=datAllpage;
	      	        
//	      	        alert(datapage);
//	      	        alert(datAllpage);
	      	        
	      	        baobiaoMain.allRow=datapage;
	      	        baobiaoMain.allRows=datAllpage;
	      	        
	      	        
//	      	        Ext.get('currpage').dom.innerHTML='当前行数'+records[0].get('start')+'-'+records[0].get('limit')+' 共'+records[0].get('dataAllRows')+'行';
      	     }else
      	     {
      	     	
	      	        Ext.get('pcountid').dom.innerHTML="0";
	      	        Ext.get('allcountid').dom.innerHTML="0";
//	      	        Ext.get('currpage').dom.innerHTML='未查到数据';
	      	        
	      	       	Ext.get('firstpage').dom.className='x-btn-text x-item-disabled x-tbar-page-first';
      	    		Ext.get('prevpage').dom.className='x-btn-text x-item-disabled x-tbar-page-prev';
      	    	     Ext.get('nextpage').dom.className='x-btn-text x-item-disabled x-tbar-page-next';
      	    		 Ext.get('lastpage').dom.className='x-btn-text x-item-disabled x-tbar-page-last';
      	     }
    	  	
      	     
//           项目的计划开始时间-后6个月
      	     baobiaoMain.setColumnHeader(grid);

      	     
    	  });
    
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				//bulletinMain.row =  rec;
			}
		}
	});	
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [ {
			id: 'id',
			header : "",
			dataIndex : 'taskname'
		}, {
			header : ''+getResource('resourceParam9101')+'', //text : "总计"
			dataIndex : 'allcount'
		}, {
			header : baobiaoMain.monthaa,
			dataIndex : 'montha'
		}, {
			header : baobiaoMain.monthbb,
			dataIndex : 'monthb'
		}, {
			header : baobiaoMain.monthcc,
			dataIndex : 'monthc'
		}, {
			header : baobiaoMain.monthdd,
			dataIndex : 'monthd'
		}, {
			header : baobiaoMain.monthff,
			dataIndex : 'monthf'
		}, {
			header : baobiaoMain.monthgg,
			dataIndex : 'monthg',
			disabled:true
		}
	//	, {
	//		header : "翻页的月份页数",
	//		dataIndex : 'monthpage',
	//		sortable : true,
	//		hidden:true
	//	},{
	//	    header:'数据翻页的页数',
	//	    dataIndex:'datapage',
	//	    sortable:true,
	////	    header:false//标题名称隐藏
	//	    hidden:true
	//	},{
	//		header:'数据总页数',
	//		dataIndex:'dataAllpage',
	//		sortable:true,
	//		hidden:true
	//	}
		]
	});
	
	var grid = myGrid.initNoPaging(ds, cm, null, sm);
	grid.columnLines=true;
	grid.border=true;
	return grid;
}
