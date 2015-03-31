/**
 * 任务问题列表
 */
var issueGrid = {tb:null};

issueGrid.grid = function(){
  var btn = function(value,p,record){
		var img = '<div style="width:80px;height:15px" >';
		if(record.data.issuestatus =="2"){
        		img = img + '<a href="javascript:void(0);"  title="'+getResource('resourceParam1592')+'" name="user" onClick="descrShow.init('+ record.data.taskproblemsid +')">' +
        		'<IMG SRC="../images/eye.png" align="middle">&nbsp;&nbsp;</a>';
		}
        if(value == "true"){
        	img = img + '<a href="javascript:void(0);" title="'+getResource('resourceParam1593')+'" name="user" onClick="issueUpdate.init('+ record.data.taskproblemsid +')">' +
        		'<IMG SRC="../images/control_fastforward.png" align="middle">&nbsp;&nbsp;</a>';
        }
        img = img + '</div>';
        return img; 
		};
  var strurl = '../JSON/tasklist_issue_TaskProblemsService.getissueList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'taskproblemsid'
        }, [
            'taskproblemsid','taskproblemsname','chargeddepid','chargeddepname',
            'chargedmanid','chargedmanname','taskproblemsnotes','taskid',
            'issuemanid','issuemanname','issuedatestr','issuestatus','issuedescr',
            'isupdate','isaofo'
            
        ]);
  var ascid = 'taskproblemsid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);


  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'taskproblemsid',
		header: ""+getResource('resourceParam1596')+"",
		dataIndex: 'taskproblemsname',
		width: 100
	},{
		header: ""+getResource('resourceParam731')+"",
		dataIndex: 'chargedmanname',
		width: 60
	},{
		header: ""+getResource('resourceParam986')+"",
		dataIndex: 'chargeddepname',
		width: 100
	},{
		header: ""+getResource('resourceParam1601')+"",
		dataIndex: 'issuemanname',
		width: 60
	},{
		header: ""+getResource('resourceParam1603')+"",
		dataIndex: 'issuedatestr',
		width: 100
	},{
		header: ""+getResource('resourceParam6043'), // 操作
		dataIndex: 'isupdate',
		//fixed:true,
		width: 80,
		renderer:btn
	},{
		header: ""+getResource('resourceParam1579')+"",
		dataIndex: 'issuestatus',
		width: 60,
		renderer:function(value){
			if(value == '1')
				return "<span style='color:red;'>"+getResource('resourceParam1234')+"</span>";
			if(value == '2')
				return "<span style='color:#800000;'>"+getResource('resourceParam1604')+"</span>";
			}
	}]
  });
	issueGrid.zengjia= new Ext.Button({
		text:''+getResource('resourceParam1597')+'',
    	iconCls: 'role-add',
    	tooltip: {title:''+getResource('resourceParam1597')+'',text:''+getResource('resourceParam1591')+''},
    	handler:issueAdd.init
	});
	issueGrid.xiugai=new Ext.Button({
	    text:''+getResource('resourceParam1598')+'',
	    iconCls:'role-edit',
	    tooltip:{title:''+getResource('resourceParam1598')+'',text:''+getResource('resourceParam1594')+''},
	    handler:issueUp.init
		
	});
	issueGrid.shanshu=new Ext.Button({
	    text:''+getResource('resourceParam1599')+'',
	    iconCls:'role-del',
		tooltip:{title:''+getResource('resourceParam1599')+'',text:''+getResource('resourceParam1595')+''},
		handler:issueDelete.init
	});
  issueGrid.tb=[
  	'-',
  	issueGrid.zengjia,
  	'-',
  	issueGrid.xiugai,
  	'-',
  	issueGrid.shanshu,
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam1600')+'',
        tooltip: {title:''+getResource('resourceParam1600')+'',text:''+getResource('resourceParam1590')+''},
        iconCls: 'role-addpriv',
        handler: issueShow.init
  	},
  	'-'];
   
  var grid = myGrid.init(ds,cm,issueGrid.tb,sm);
   grid.viewConfig={
                    forceFit:true,
                    enableRowBody:true,
                    showPreview:true,
                    getRowClass : function(record, rowIndex, p, ds){
                    	 var str=record.data.taskproblemsnotes;
                    	 if(str.length>80)
                    	 {
                    	    str=str.substring(0,80);
                    	    str+="……";
                    	 }
                         p.body = '<div class="p1">&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; <span style="color:red;">'+getResource('resourceParam1602')+'</span>'+str+'</div>';

                            }
                    };
  grid.region = 'center';
  return grid;
}
