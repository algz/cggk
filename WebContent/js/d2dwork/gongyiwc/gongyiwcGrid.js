var gongyiwcGrid = {};
gongyiwcGrid.grid = function(){

  //var strurl = '../data/d2dwork/d2dwork_gongyiwc_GongyiwcSvr_getGongyiwcPageList.text';
  var proxy = new Ext.data.HttpProxy({
            url: "../JSON/aofoquery_TechnicsSvr.getGrid",
            method:'GET'
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty' 
          //  id: 'projectid'
        }, [                                    
            'taskid','taskname','chargeddepid','chargeddepname',
            'chargedmanid','chargedmanname','currenttache','taskproblemsnotes',
            'projectid','projectname','taskname','currenttache','taskproblemsnotes',
            {name:'plannedamount',type: 'int'},
            {name:'completedamount',type: 'int'}
        ]);
  var ascid = null;
  var ascstr = null;
  var ds = new data.Store(proxy,reader,ascid,ascstr);



  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  gongyiwcGrid.wcl = function(val,p,record){
  	var plannedamount = record.data.plannedamount;
  	var completedamount = record.data.completedamount;
  	 
  	return gongyiwcGrid.format(completedamount/plannedamount*100) + '%';
  };
  gongyiwcGrid.btn = function(val,p,record){
        var plannedamount = record.data.plannedamount;
  		var completedamount = record.data.completedamount;
  		if(completedamount/plannedamount != 1){
        	return '<a style="cursor: hand" onclick="gongyiwcUtil.Unfinished(' + 
        				record.data.projectid + ',\'' +  record.data.projectname +
        				'\',\'' + record.data.chargeddepid + '\',' + record.data.chargedmanid +
        				',\''+record.data.chargeddepname + '\',\''+record.data.chargedmanname+
        				'\');">' +
						'<IMG SRC="../images/gongyiwc.jpg" align="middle"></a>';
  		}
        
    };
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'projectid',
		header: ""+getResource('resourceParam1035')+"",
		dataIndex: 'projectname',
		//fixed:true,
		width: 240
	},{
		header: ""+getResource('resourceParam1285')+"",
		dataIndex: 'plannedamount',
		fixed:true,
		width: 120
	},{
		header: "完成数量",
		dataIndex: 'completedamount',
		fixed:true,
		width: 100
	},{
		header: "完成率",
		dataIndex: '',
		renderer:gongyiwcGrid.wcl,
		fixed:true,
		align:'center',
		width: 100
	},{
		header: "",
		dataIndex: '',
		renderer:gongyiwcGrid.btn,
		fixed:true,
		align:'center',
		width: 240
	}]
  });
  var grid = myGrid.init(ds,cm,null,sm);
  //行的双击事件，按任务--单位任务--个人任务逐层显示
  grid.on('rowdblclick',function(thisgrid){
		gongyiwcUtil.Stepping(thisgrid); 		
  });
  grid.region='center';
  return grid;
}
//格式化小数到小数点后2位
gongyiwcGrid.format = function(number){
	var result = number.toString();
	
	if (result.indexOf(".") != -1){
		var begin;
		var end;
	
		begin  = result.substring(0, result.indexOf("."));
		end = result.substring(result.indexOf(".") + 1, result.length);
		
		if (result.length > 2){
			end = end.substring(0, 2);
		}
		
		result = begin + "." + end;
	}
	
	return result;
}
