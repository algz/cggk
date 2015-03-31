var _isIE = (navigator.appName == "Microsoft Internet Explorer");
var processinfoGrid = {};

processinfoGrid.getGrid = function(){

  var strurl = '';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'taskname'
        }, [
            'tid','taskname','startmonth','cycle',
            'completeratiov','startdate','cyclecolor','plannedComplete',
            'months','days','completeratiovlen'
        ]);
  var ascid = 'taskname';
  var ascstr = 'desc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);

  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});

  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
  		header: ""+getResource('resourceParam998')+"",
  		fixed:true,
  		width:120,
  		dataIndex: ''
  	},{
		header: "",
		fixed:true,
		width: 100,
		dataIndex: ''
	},{
		header: "",
		width: "auto",
		dataIndex: ''
	}]
  });
  var grid = myGrid.initNobr(ds,cm,null,sm);
  grid.on('click',function(thisgrid){
		processMain.southpanel.hide(); 	
		processMain.cenpanel.doLayout();
		
  })
  //var test=      {"totalProperty":5,"results":[{"limit":8,"cycle":19.466666666666665,"completeratiov":100,"taskid":0,"startmonth":0.06666667014360428,"partsnum":"","fathertaskid":0,"plannedComplete":"100","months":"19","startdate":"2006年1月2日","days":"14","start":0,"cyclecolor":"#000FFF","tid":"_tsk1","taskname":"工艺准备任务"},{"limit":8,"cycle":19.466666666666665,"completeratiov":100,"taskid":0,"startmonth":0.06666667014360428,"partsnum":"","fathertaskid":0,"plannedComplete":"100","months":"19","startdate":"2006年1月2日","days":"14","start":0,"cyclecolor":"#000FFF","tid":"_tsk2","taskname":"原材料采购配送任务"},{"limit":8,"cycle":18.433333333333334,"completeratiov":100,"taskid":0,"startmonth":1.100000023841858,"partsnum":"","fathertaskid":0,"plannedComplete":"100","months":"18","startdate":"2006年2月3日","days":"13","start":0,"cyclecolor":"#000FFF","tid":"_tsk3","taskname":"成品采购配送任务"},{"limit":8,"cycle":19.466666666666665,"completeratiov":100,"taskid":0,"startmonth":0.06666667014360428,"partsnum":"","fathertaskid":0,"plannedComplete":"100","months":"19","startdate":"2006年1月2日","days":"14","start":0,"cyclecolor":"#000FFF","tid":"_tsk4","taskname":"生产准备任务"},{"limit":8,"cycle":18.433333333333334,"completeratiov":100,"taskid":0,"startmonth":1.100000023841858,"partsnum":"","fathertaskid":0,"plannedComplete":"100","months":"18","startdate":"2006年2月3日","days":"13","start":0,"cyclecolor":"#000FFF","tid":"_tsk5","taskname":"生产任务"}]};
  grid.width = 1750;
  grid.height = 310;
  grid.viewConfig={
                    forceFit:true,
                    enableRowBody:true,
                    showPreview:true,
                    getRowClass : function(record, rowIndex, p, ds){
                    				var color;
//                    				if(record.data.taskname == '工艺准备任务'){
//                    					color = "#FF6600";
//                    				}else if(record.data.taskname == '原材料采购配送任务'){
//                    					color = "#FFFF00";
//                    				}else if(record.data.taskname == '成品采购配送任务'){
                    					color = "#00FFFF";
//                    				}else if(record.data.taskname == '生产准备任务'){
//                    					color = "#333300";
//                    				}else if(record.data.taskname == '生产任务'){
//                    					color = "#993300";
//                    				}else{
//                    					color = "#000FFF";
//                    				}
                    				var cm = processMain.infogrid.getColumnModel();
                    				var len = record.data.cycle;
                    				var tag = record.data.startmonth;
                    				var completeratiov = record.data.completeratiov;
                    				var completeratiovlen = record.data.completeratiovlen;
                    				len = 4;
                    				var title = ""+getResource('resourceParam995')+"" + record.data.startdate + "   "+getResource('resourceParam996')+"" + record.data.months + "个月 "+　record.data.days +"天  完成率：" + completeratiov + "%";
                    				//alert(cm.config[0].width);
                    				//alert(cm.config[1].width);
                    				//alert(tag);
                                 	p.body = '<div style="min-height:20px;height:30px;position:relative;top:-6px;margin: 0px;padding:0px;">' +
                                 				'<div style="width:' + (120 + (processGrid.basewidth * 1)) +'px; min-height:11px;height:11px;float: left;">' + record.data.taskname + '</div>' +
                                 				'<div title="' + title + '" style="width:' + (processGrid.basewidth * len) +'px; min-height:11px; border:1px  solid #000000;height:11px;float: left;">' +
                                 				'<div title="' + title + '" style="width:' + ((processGrid.basewidth * len)*completeratiovlen/100) +'px; min-height:11px; background-color:'+color+';height:11px;float: left;"></div>' +
                                 		  	 '</div>';
                                 	if (_isIE) {
										p.body += '<div style="position:relative; top:2px; left:'
											+ ((completeratiovlen / 100 - 1) * (processGrid.basewidth * len))
											+ 'px; min-height:10px;height:10px;z-index:1000;">'
											+ completeratiov + ' %</div>';
									} else {
										p.body += '<div style="position:relative; top:-1px; left:'
												+ ((completeratiovlen / 100 - 1) * (processGrid.basewidth * len))
												+ 'px; min-height:9px;height:9px;z-index:1000;">'
												+ completeratiov + ' %</div>';
									}
                                 		  	 
                                 		p.body += '</div>';

                            }
                    };
  grid.region='center';
  return grid;
}
