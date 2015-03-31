
var taskLogGrid = {
	start : 0,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null

}
taskLogGrid.init = function() {

	var strurl = '../JSON/RecordRemote.getRecordList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'recordid'
			}, ['recordid', 'title', 'content', 'type', "creator", 'depcode',
					'createtime', 'replycount']);
	var ascid = 'recordid';
	var ascstr = 'desc';
	var ds = new Ext.data.Store({

				reader : reader,
				proxy : proxy
			});
	var sm = new Ext.grid.CheckboxSelectionModel({

	});

	var cm = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [sm, {
			header : "日志标题",
			dataIndex : 'title',
			renderer : function(value, p, r) {
				p.attr="ext:qtip='"+value+"'";
				return "<a style='text-decoration:underline; color:blue;'  href='../jsp/record/showrecord.seam?id="
						+ r.get('recordid')
						+ "' target=_blank>"
						+ value
						+ "</a>";
			},
			width : 100
		}, {
			header : "" + '创建时间' + "",
			dataIndex : 'createtime' // ,

		}, {
			header : "创建人",
			width : 100,
			dataIndex : 'creator'
		}, {
			header : "回复数",
			width : 100,
			dataIndex : 'replycount'
		}, {
			header : "修改历史",
			dataIndex : 'title',
			renderer : function(value, p, r) {
				return "<a style='text-decoration:underline; color:blue;'  href='../jsp/record/showRecordHistory.seam?id="
						+ r.get('recordid')
						+ "' target=_blank>"
						+ '查看'
						+ "</a>";
			},
			width : 100
		}]
	});

	var grid = myGrid.init(ds, cm, null, sm);

	return grid;

}