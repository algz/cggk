Ext.ns('Sysware.P2M')
Sysware.P2M.SunyStore = function(config) {
	var config = config ? config : {};
	Ext.applyIf(config, {
		proxy : new Ext.data.HttpProxy( {
			method : 'POST',
			url : '../JSON/wbstemplate_TemplateRemote.getSunyTree'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty'
		},
				[ 'id', 'name', 'dataType', 'status', 'deepLevel', 'itemId',
						'description', 'issuedManId', 'issuedManName',
						'createTime', 'plannedStartTime', 'plannedEndTime',
						'innerOrder', 'parentId','iconCls' ])
	})
	Sysware.P2M.SunyStore.superclass.constructor.call(this, config);
}
Ext.extend(Sysware.P2M.SunyStore, Ext.data.Store);
Sysware.P2M.SunyTree = Ext.extend(Ext.grid.GridPanel, {
	nodeId : 0,// 选中的节点
	start : 0,
	limit : 500,
	sm : new Ext.grid.CheckboxSelectionModel(),
	store : new Sysware.P2M.SunyStore( {
		storeId : 'sunystore'
	}),
	initComponent : function() {
		Ext.apply(this, {
			trackMouseOver : true,
			autoScroll : true,
			loadMask : {
				msg : '正在加载数据...'
			},
			stripeRows : true,
			viewConfig : {
				forceFit : true,
				enableRowBody : true,
				showPreview : true
			},
			view : new Ext.ux.grid.BufferView({
				rowHeight : 20,
				forceFit : true,
				scrollDelay : true
			}),
			bbar : new Ext.PagingToolbar( {
				pageSize : this.limit,
				store : this.store,
				displayInfo : true
			}),
			cm : new Ext.grid.ColumnModel({
				defaults: {
			        sortable: false,
			        menuDisabled: true
			    },
				columns : [ this.sm, {
					header : getResource('resourceParam480'),
					width : 100,
					dataIndex : 'name',
					renderer : function(v, meta, r,rowIndex,colIndex,store) {
					    var level=r.data.deepLevel;
					    var iconCls=r.data.iconCls;
					    var width=16;
					    var cls='<div style="width: '+(level*width)+'px;" class="ux-maximgb-tg-uiwrap">';
					    for(i=0;i<level;i++){
					    	if(i<level-1){
					    		cls+='<div class="ux-maximgb-tg-elbow-line" style="left: '+(width*i)+'px;">&nbsp;</div>';
					    	}else{
					    		cls+='<div class="ux-maximgb-tg-elbow" style="left: '+(width*i+1)+'px;">&nbsp;</div>';
					    	}
					    }
					    cls+='</div>';
					    cls+='<img style="width: 16px; height: 16px; float: left;" src="../lib/ext/resources/images/default/s.gif" class="'+iconCls+'" unselectable="on">';
						
	//				    overflow:hidden;
	//					-o-text-overflow: ellipsis;
	//					text-overflow: ellipsis;
	//				    padding:3px 3px 3px 5px;
	//				    white-space: nowrap;			  
					    cls+='<div unselectable="on" style="float: left ! important;" class="x-grid3-cell-inner x-grid3-col-'+rowIndex+'">'+
						  '<div ext:qtip="'+v+'" style="position: absolute;padding: 1px 0 0 0 !important;">'+v+'</div>'+
						  '</div>';
	//				  if (r.data.dataType == 'WBSTemplate') {
	//						
	//						return '<span ext:qtip='+v+' style="color:blue;font-weight:bold;" >'
	//								+v + '</span>';
	//					}
						return cls;
					}
				}, {
					header : getResource('resourceParam500'),// 状态
					width : 100,
					dataIndex : 'status',
					renderer : function(value, p, record) {
						if (value == 0) {
							return '' + getResource('resourceParam947') + '';
						} else if (value == 1) {
							return '<span style="color:gray;font-weight:bold;" >'
									+ getResource('resourceParam948') + '</span>';
						} else if (value == 2) {
							return '<span style="color:blue;font-weight:bold;" >'
									+ getResource('resourceParam509') + '入库</span>';
						} else {
							return '';
						}
					}
				}, {
					header : getResource('resourceParam5007'),// 创建人
					width : 100,
					dataIndex : 'issuedManName'
				}, {
					header : getResource('resourceParam981'),// 创建时间
					width : 100,
					dataIndex : 'createTime'
	
				}, {
					header : getResource('resourceParam648'),// 描述
					width : 100,
					dataIndex : 'description'
	
				} ]
			}),
			sm : this.sm,
			store : this.store,
			refresh : function() {
				var node = this.nodeId;
				var lastOptions = this.store.lastOptions;
				var start = this.start;
				var limit = this.limit;
				if (lastOptions && lastOptions.params) {// 设置刷新当前页
				start = lastOptions.params.start;
				limit = lastOptions.params.limit;
			}
			this.store.baseParams = {
				start : start,
				limit : limit,
				node : node
			};
			this.store.reload();

		}
		});
		Sysware.P2M.SunyTree.superclass.initComponent.call(this);
	}
});
Ext.reg('sysware.p2m.sunytree', Sysware.P2M.SunyTree);