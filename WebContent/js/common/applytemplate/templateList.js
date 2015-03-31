var templateList = {};

templateList.init = function() {
	var store = new Ext.data.Store( {

		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/wbstemplate_TemplateRemote.getTemplateList'
		}),

		reader : new Ext.data.JsonReader( {

			totalProperty : 'totalProperty',
			root : 'results'
		}, [ {
			name : 'id'
		}, {
			name : 'name'
		}, {
			name : 'issuedManName'
		}, {
			name : 'notes'
		},{
			name : 'published'
		}

		])

	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			header : ''+getResource('resourceParam943')+'模板'+getResource('resourceParam480')+'',
			dataIndex : 'name',
			width : 80,
			renderer : function(value, p, record) {
				return '<a href="javascript:void(0);" onClick="applyTemplateMain.toWBS('
						+ record.data.id
						+ ')"><span style="color:blue;font-weight:bold;" >'
						+ value + '</span></a>';
			}
		},
		{
			header : ""+getResource('resourceParam605')+""+getResource('resourceParam500')+"",
			dataIndex : 'published',
			width : 40,
			renderer : function(value, p, record) {
				if (value == 0) {
					return ''+getResource('resourceParam947')+'';
				} else if (value == 1) {
					return '<span style="color:gray;font-weight:bold;" >'+getResource('resourceParam948')+'</span>';
				} else if (value == 2) {
					return '<span style="color:blue;font-weight:bold;" >'+getResource('resourceParam509')+'入库</span>';
				}
			}
		},{
			header : '创建人',
			dataIndex : 'issuedManName',
			width : 40
		}, {
			header : ""+getResource('resourceParam943')+"模板"+getResource('resourceParam648')+"",
			dataIndex : 'notes',
			width : 200,
			renderer : function(value, p, record) {
				return '<div ext:qtip=' + value + '>' + value
						+ '</div>';
			}
		} ]
	});
	var grid = new Ext.grid.GridPanel( {
		id : 'templateList',
		store : store,
		cm : cm,
		columnLines : true,
		selModel : new Ext.grid.RowSelectionModel( {
			singleSelect : true,
			listeners : {
				rowselect : function(sm, rowIndex, r) {
					applyTemplateMain.templateId = r.data.id;
				}
			}
		}),
		trackMouseOver : true,
		loadMask : {
			msg : ''+getResource('resourceParam579')+''
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		stripeRows : true,
		bbar : new Ext.PagingToolbar( { // 定义下方工作面板
					pageSize : 25,
					store : store,
					displayInfo : true,
					displayMsg : ''+getResource('resourceParam946')+'{0} - {1} '+getResource('resourceParam949')+' {2} 行',
					emptyMsg : ""+getResource('resourceParam945')+""
				})

	});
	return grid;
}
