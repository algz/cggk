var zongheGrid = {};
zongheGrid.grid = function(){
  var proxy = new Ext.data.HttpProxy({
            url: "../JSON/aofoquery_zongheChaxunSvr.getProjectGrid",
            method:"POST"
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'projectid'
        }, [
            'projectid','projectname','chargeddepid','chargedmanid','projectnotes','projectcategoryid','model','completedamount',
            'plannedstartstr','plannedendstr','actualstartstr','actualendstr','batchs','sorties','chargedmanname',
            'issuedmanid','issuedmanname','projectStatusId','projectstatusname','projectcategoryname','projectnotes'
        ]);
  var ascid = 'projectid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);
	ds.on('datachanged',function(ds){
   	if(zongheUtil.sel && ds.getCount()==0){
   		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam765')+"");
   	}	
   	zongheUtil.sel=false;
  });
  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'projectid',
		header: ""+getResource('resourceParam1035')+"",
		dataIndex: 'projectname',
		width: 60,
		renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					var str = record.data.projectname;
					var strs = "<a href='javascript:void(0);' tag='" + record.data.projectid
								+ "' onclick='zongheMain.detailsOnclick(&quot;"
								+ str + "&quot;," 
								+ record.data.projectid
								+","+2
								+ ");'>"
								+ record.data.projectname
								+ "</a>";
					return strs;
				}
	},
	{
		header: ""+getResource('resourceParam1037')+"",
		dataIndex: 'projectcategoryname',
		width: 60
	},{
		header: ""+getResource('resourceParam1038')+"",
		dataIndex: 'projectstatusname',
		width: 60
	},new Ext.ux.grid.ProgressColumn({
				header : ""+getResource('resourceParam1286')+"",
				dataIndex : 'completedamount',
				width : 100,
				renderer : function(v, p, record) {
					var style = '';
					var textClass = (v < 55)
							? 'x-progress-text-back'
							: 'x-progress-text-front'
									+ (Ext.isIE6 ? '-ie6' : '');
					var text = String
							.format(
									'</div><div class="x-progress-text {0}" style="width:100%;" id="{1}">{2}</div></div>',
									textClass, Ext.id(), v + this.textPst);
					text = (v < 96) ? text.substring(0, text.length - 6) : text
							.substr(6);

					if (record.data.color == 'red') {
						style = '-red';
					} else {
						style = '-green';
					}
					p.css += ' x-grid3-progresscol';
					return String
							.format(
									'<div class="x-progress-wrap"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>'
											+ '</div>', style, v, text);
				},
				textPst : '%'
			}),
		{
		header: ""+getResource('resourceParam991')+"",
		dataIndex: 'plannedstartstr',
		width: 60
	},{
		header: ""+getResource('resourceParam1032')+"",
		dataIndex: 'plannedendstr',
		width: 60
	},{
		header: ""+getResource('resourceParam856')+"",
		dataIndex: 'actualstartstr',
		width: 60
	},{
		header: ""+getResource('resourceParam1033')+"",
		dataIndex: 'actualendstr',
		width: 60
	},{
		header: ""+getResource('resourceParam731')+"",
		dataIndex: 'chargedmanname',
		width: 60
	},{
		header: ""+getResource('resourceParam1039')+"",
		dataIndex: 'projectnotes',
		width: 60
	}
	]
  });
  var grid = myGrid.init(ds,cm,null,sm);
  grid.region='center';
  return grid;
}
