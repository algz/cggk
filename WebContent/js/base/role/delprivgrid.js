/**
 * 删除权限列表
 */

var delprivgrid = {};

delprivgrid.init = function(){
  var strurl = '../JSON/base_role_rolePrivSerivce.roleDelprivgrid';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'roleprivid'
        }, [
            'roleprivid','privilegeid','privilegename'
        ]);
  var ascid = 'privilegeid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);
  //ds.baseParams={start:0,limit:25};
  var boxsm = new Ext.grid.CheckboxSelectionModel();
  var cm = new Ext.grid.ColumnModel({
	defaults: {
	    sortable: false,
	    menuDisabled: true
	},
	columns : [
    new Ext.grid.RowNumberer(),
  	boxsm,
	
  	{
		id: 'privilegeid',
		header: ""+getResource('resourceParam756')+"",
		dataIndex: 'privilegeid',
		width: 80
	},{
		header: ""+getResource('resourceParam674')+"",
		dataIndex: 'privilegename',
		width: 120
	}
	]
  });
	
    var tb=[
  		''+getResource('resourceParam791')+'', ''+getResource('resourceParam674')+' ',
            new Ext.app.SearchField({
                store: ds,
                width:160
            })];
  var grid = myGrid.initBoxNobr(ds,cm,tb,boxsm);
  return grid;
}
