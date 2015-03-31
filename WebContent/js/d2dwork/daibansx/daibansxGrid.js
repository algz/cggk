var daibansxGrid = {};
daibansxGrid.grid = function(){
  var strurl = '../JSON/d2dwork_daibansx_ItumDaibanSXSvr.getGrid';
  var proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'daibsxid'
        }, [
            'daibsxid','daibsxbt','dbsxleix','sfyunxzf',
            'dbsxneir','dbsxfqrh','dbsxzfrh','dbsxjsrh',
            'byjiaose','dbsxztai','dbsxcljg','dbsxjjcd',
            'dbsxcans','dbsxgurl',
            {name:'dbsxscsj',type: 'date'},         
            {name:'dbsxyjjs',type: 'date'},
            {name:'dbsxyjks',type: 'date'},
            {name:'dbsxcksj',type: 'date'},
            {name:'dbsxsjks',type: 'date'},
            {name:'dbsxsjjs',type: 'date'},
            {name:'dbsxxtjs',type: 'date'}
        ]);
  var ascid = 'daibsxid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);



  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  function sxbh(daibsxid, p, record){

  	if(record.data.dbsxjjcd == 'A'){
  		return '<IMG SRC="../images/award_star_add.png" align="middle">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<b>' +record.data.daibsxbt + '</b>'
  	}
  	if(record.data.dbsxjjcd == 'B'){
  		return '<IMG SRC="../images/award_star_gold_3.png" align="middle">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<b>' +record.data.daibsxbt + '</b>'
  	}
  	if(record.data.dbsxjjcd == 'C'){
  		return '<IMG SRC="../images/award_star_silver_2.png" align="middle">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<b>' +record.data.daibsxbt + '</b>'
  	}
  }
  function yjsj(val,p,record){
  	var strztai;
  	if(record.data.dbsxztai == 'A'){
  		strztai = '<span style="color:red;">'+getResource('resourceParam1234')+'</span>';
  	}
  	if(record.data.dbsxztai == 'B'){
  		strztai = '<span style="color:#4000FF;">'+getResource('resourceParam1235')+'</span>';
  	}
  	if(record.data.dbsxztai == 'C'){
  		strztai = '<span style="color:#800000;">'+getResource('resourceParam987')+'</span>';
  	}
  	if(record.data.dbsxztai == 'D'){
  		strztai = '<span style="color:#1AA0A0;">'+getResource('resourceParam1239')+'</span>';
  	}
  	return val.dateFormat('Y-m-d') + "&nbsp;&nbsp;"+getResource('resourceParam514')+"&nbsp;&nbsp;" + record.data.dbsxyjjs.dateFormat('Y-m-d') + '(' + strztai + ')';
  }

  function jiaose(byjiaose){
  	if(byjiaose == 'A'){
  		return ''+getResource('resourceParam962')+'';
  	}
  	if(byjiaose == 'B'){
  		return ''+getResource('resourceParam1237')+'';
  	}
  	if(byjiaose == 'C'){
  		return ''+getResource('resourceParam963')+'';
  	}
  	if(byjiaose == 'D'){
  		return '' + getResource('resourceParam9031') + ''; // text : '参加'
  	}
  	if(byjiaose == 'Z'){
  		return '' + getResource('resourceParam513') + '';
  	}
  }
  function btn(val,p,record){
	  // text : 9032--办理    9033--该
        var img = 
        		'<div style="width:80px;" ><div style="width:25px;float:left;" title="'+getResource('resourceParam1240')+ '' + getResource('resourceParam9032') + '' + '' + getResource('resourceParam9033') + '' +getResource('resourceParam729')+'"><a href="javascript:void(0);" name="user" onClick="">' +
        		'<IMG SRC="../images/control_fastforward.png" align="middle">&nbsp;&nbsp;</a></div>';
        if(record.data.sfyunxzf == 1){
        	img = img + '<div style="width:25px;float:left;" title="'+getResource('resourceParam1240')+''+getResource('resourceParam1238')+'' + getResource('resourceParam9033') + ''+getResource('resourceParam729')+'"><a href="javascript:void(0);" name="user" onClick="daibansxZnfa.init('+record.data.daibsxid+')">' +
        		'<IMG SRC="../images/anchor.png" align="middle">&nbsp;&nbsp;</a></div>';
        }
        img = img + '<div style="width:25px;float:left;" title="'+getResource('resourceParam1240')+''+getResource('resourceParam576')+'' + getResource('resourceParam9033') + ''+getResource('resourceParam729')+'"><a href="javascript:void(0);" name="user" onClick="daibansxView.init('+record.data.daibsxid+')">' +
        		'<IMG SRC="../images/eye.png" align="middle"></a></div></div>';
        return img; 
        
    }
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'daibsxid',
		header: '' + getResource('resourceParam9034') + '', // text : 事项名
		dataIndex: 'dbsxjjcd',
		renderer:sxbh,
		width: 80
	},{
		header: ""+getResource('resourceParam1236')+"",
		dataIndex: 'dbsxfqrh',
		width: 60
	},{
		header: ""+getResource('resourceParam803')+"",
		dataIndex: 'byjiaose',
		renderer:jiaose,
		width: 40
	},{
		header: ""+getResource('resourceParam1233')+"",
		dataIndex: 'dbsxyjks',
		renderer:yjsj,
		width: 100
	},{
		header: '' + getResource('resourceParam9035') + '', // text : 操作
		dataIndex: 'daibsxid',
		renderer:btn,
		width: 40
	}
	]
  });
  var grid = myGrid.init(ds,cm,null,sm);
  grid.viewConfig={
                    forceFit:true,
                    enableRowBody:true,
                    showPreview:true,
                    getRowClass : function(record, rowIndex, p, ds){
                                 p.body = '<div class="p1">&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; '+record.data.dbsxneir+'</div>';

                            }
                    };
  grid.on('rowclick', function(grid, rowIndex, e) {
		myGrid.row = ds.data.items[rowIndex]; //得到选中行的对象
		daibansxMain.showbt.setValue(myGrid.row.get('daibsxbt'));
	});
  grid.region='center';
  return grid;
}
