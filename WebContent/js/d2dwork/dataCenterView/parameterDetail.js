var _isIE = Ext.isIE;
var parameterDetail = {grid:null,updategrid:null};
var infostore;

parameterDetail.getGrid = function() {

	var strurl = '../JSON/DataCenterViewService.getParametreDetail';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl,
		method:'get'
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'pid'
	}, ['pid', 'valueID', 'dataObjectID', 'dataObjectName', 'dataObjectType', 'dataTypeEntity.dataTypeName', 'value', 'lowerRange', 'upperRange', 'unit', 'regexExpression',
			'refValue', 'revision', 'description']);
	var ascid = 'pid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader);

	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ""+getResource('resourceParam1258')+"",
			//fixed : true,
			//width : 100,
			dataIndex : 'dataObjectName'
	//		editor:new Ext.form.TextField({disabled : true} )
		}, {
			header : ""+getResource('resourceParam1261')+"",
			//fixed : true,
			//width : 100,
			dataIndex : 'dataTypeEntity.dataTypeName'
	//		editor:new Ext.form.TextField({disabled : true} )
	
		}, {
			header : ""+getResource('resourceParam1262')+"",
			//fixed : true,
			//width : 100,
			dataIndex : 'value'
	//		editor:new Ext.form.TextField({disabled : true} )
		}
		, {
			header : ""+getResource('resourceParam1252')+""+getResource('resourceParam1201')+"",
			//fixed : true,
			//width : 100,
			dataIndex : 'unit'
	//		editor:new Ext.form.TextField({disabled : true} )
		}
		, {
			header :  '' + getResource('resourceParam9069') + '' , // text : 上边界
			//fixed : true,
			//width : 100,
			dataIndex : 'lowerRange',
			editor:new Ext.form.TextField()
		}
		, {
			header :  '' + getResource('resourceParam9070') + '' , // text : 下边界
			//fixed : true,
			//width : 100,
			dataIndex : 'upperRange',
			editor:new Ext.form.TextField()
		}
		, {
			// text : 9071--参考
			header :  '' + getResource('resourceParam9071') + '' +getResource('resourceParam511')+"",
			//fixed : true,
			//width : 100,
			dataIndex : 'refValue',
			editor:new Ext.form.TextField()
		}
		, {
			header : ""+getResource('resourceParam861')+"",
			//fixed : true,
			//width : 100,
			dataIndex : 'description'
	//		editor:new Ext.form.TextField({disabled : true} )
		}]
	});
	parameterDetail.grid = parameterDetail.updategrid(ds, cm, null, sm, 100, false);
	parameterDetail.grid.width = 800;
	parameterDetail.grid.height = 484;
	
	return parameterDetail.grid;
}

parameterDetail.updategrid=function(ds,cm,tb,sm,size,sort){
	var grid=new Ext.grid.EditorGridPanel({			//新建一个EditorGridPanel对象
		
       //region:'center',						//面板位置
       //id:'topic-grid',					
       store: ds,						//绑定数据源
       cm: cm,							//设置列模板
       //sm: sm,
       autoScroll:true,
       width:'100%',
       trackMouseOver:true,				//鼠标放到行上是否有痕迹
       loadMask: {msg:''+getResource('resourceParam579')+''},
       viewConfig: {
          forceFit:true
         // enableRowBody:true,
         // showPreview:true
       },
       renderTo: document.body,
       tbar: tb,
       stripeRows: true,
    //   plugins:checkEditable,  //这里注意 
       clicksToEdit:1
    })
    
	grid.on('afteredit',function(e){
		
		var appVo = Seam.Remoting.createType("com.luck.itumserv.DataCenter.ParameterDetailVo");
		var r=e.record;
		appVo.setDataObjectID(r.get('dataObjectID'));
		appVo.setLowerRange(r.get('lowerRange'));
	    appVo.setUpperRange(r.get('upperRange'));
	    appVo.setRefValue(r.get('refValue'));
	    appVo.setValueID(r.get('valueID'));
	   
	    callSeam("DataCenterViewService", "updateParametterDetail", [appVo], updateDetail); 
	   
	});
	
    return grid;         
}
function updateDetail()
{
   
}
