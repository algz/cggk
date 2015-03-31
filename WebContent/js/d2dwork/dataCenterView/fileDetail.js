var _isIE = Ext.isIE;
var fileDetail = {grid:null,doId:null,updategrid:null};
var infostore;

fileDetail.getGrid = function() {

	var strurl = '../JSON/DataCenterViewService.getFileDetail?dataObjectID';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl,
		method:'get'
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'pid'
	}, ['pid', 'fileID', 'dataObjectID', 'value', 'subject', 'filePath',
			'fileType', 'department', 'modelID', 'pageNumber', 'keyWord', 'docID', 'description', 'memo', 'createTime', 'fileSize'],
			'suffix', 'fileType');
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
			header : ""+getResource('resourceParam469')+ '' + getResource('resourceParam9056') + '' , // text : 名
			dataIndex : 'filePath'//应该是value
		}, {
			header :  '' + getResource('resourceParam9057') + '' , // text : 专业
			dataIndex : 'subject',
			editor:new Ext.form.TextField()
		}, {
			header : ""+getResource('resourceParam481')+"",
			dataIndex : 'fileType',
			editor:new Ext.form.TextField()
		}
		, {
			// text : 9058专业
			header :  '' + getResource('resourceParam9058') + '' +getResource('resourceParam1201')+"",
			dataIndex : 'department',
			editor:new Ext.form.TextField()
		}
		, {
			// text : 9059--所属型号
			header :  '' + getResource('resourceParam9059') + '' ,
			dataIndex : 'modelID',
			editor:new Ext.form.TextField()
		}
		, {
			header :  '' + getResource('resourceParam9060') + '' , // text : 页数
			dataIndex : 'pageNumber',
			editor:new Ext.form.TextField()
		}
		, {
			header : ""+getResource('resourceParam476')+ '' + getResource('resourceParam9061') + '' , // text : 词
			dataIndex : 'keyWord',
			editor:new Ext.form.TextField()
		}
		, {
			// text 9062--文档
			header :  '' + getResource('resourceParam9062') + '' +getResource('resourceParam461')+"",
			dataIndex : 'docID',
			editor:new Ext.form.TextField()
		}
		, {
			header : ""+getResource('resourceParam648')+"",
			dataIndex : 'description'
		}
		, {
			header : ""+getResource('resourceParam1256')+"",
			dataIndex : 'memo',
			editor:new Ext.form.TextField()
		}, {
			header : ""+getResource('resourceParam470')+"/" + getResource('resourceParam9059') + '' ,//可能是更新文件 text:9059--更新
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store){
				var _name = "";
				if (record.data.createTime!='')//文件实体已经存在
					_name =  '' + getResource('resourceParam9063') + '' ; // text : 更新
				else
					_name = ""+getResource('resourceParam470')+"";
				var str ="<a href=\"javascript:void(0);\" onClick=\"fileUpload.upload('" + record.data.fileID + "','" + dataCenterViewGrid.doId + "')\"><b>"
				+ _name +"</b></a>";
				return str;
			}//按钮
		}, {
			header : ""+getResource('resourceParam492')+"",
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store){
				var str = '';
				if (record.data.createTime!='')//通过什么来判断文件实体存在?
				    str ="<a href=\"../svr/centerdatedownload?path=" + record.data.fileID + "\" name=\"user\" ><b>"+getResource('resourceParam492')+"</b></a>";
				return str;
			}//按钮
		}]
	});
	fileDetail.grid = fileDetail.updategrid(ds, cm, null, sm, 100, false);
//	fileDetail.grid.width = 1000;
//	fileDetail.grid.height = 484;
	
	return fileDetail.grid;
}


fileDetail.updategrid=function(ds,cm,tb,sm,size,sort){
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
		
		var appVo = Seam.Remoting.createType("com.luck.itumserv.DataCenter.FileDetailVo");
		var r=e.record;
		appVo.setDataObjectID(r.get('dataObjectID'));
		appVo.setSubject(r.get('subject'));
	    appVo.setFileType(r.get('fileType'));
	    appVo.setDepartment(r.get('department'));
	    appVo.setModelID(r.get('modelID'));
	    appVo.setPageNumber(r.get('pageNumber'));
	    appVo.setKeyWord(r.get('keyWord'));
	    appVo.setDocID(r.get('docID'));
	    appVo.setMemo(r.get('memo'));
	   
	    callSeam("DataCenterViewService", "updateFileDetail", [appVo], updateDetail); 
	   
	});
	
    return grid;         
}
function updateDetail()
{
   
}
