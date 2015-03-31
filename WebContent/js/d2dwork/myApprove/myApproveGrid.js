var myApproveGrid = {};
myApproveGrid.init = function() {

	var strurl = "";

	strurl = '../JSON/approval_ApprovalRemote.getApprovalListByUserId?approveStatus=-1&objectType=-2&approvalType=StepByStep';

	myApproveGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'GET'
			});
	myApproveGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty'
			}, ["approveStatus", "approveNote", "ID", "approveStartTime",
					"approveVeiw", "approveTime", "approvePressName",
					"objectType", "approveStepName", "examinertype",
					"flowinstanceID", "activityInstanceID", "examiner",
					"objectId","objectName","starterName", "approvalType"]);

	var ds = new Ext.data.Store({
				proxy : myApproveGrid.proxy,
				reader : myApproveGrid.reader
			});
	myApproveGrid.setcm();
	var grid = myGrid.initBox(ds, myApproveGrid.cm, null, myApproveGrid.sm);
	ds.load();
	return grid;

}

myApproveGrid.setcm = function() {
	Ext.util.Format.ellipsis = function(str, length) {
		str = Ext.util.Format.trim(str);
		var size = 0;
		var s = "";
		for (var i = 0; i < str.length; i++) {
			var code = str.charCodeAt(i);
			if (code > 255) {
				size += 2;
				if (size <= length) {
					s += str.charAt(i);
				} else {
					break;
				}
			} else {
				size += 1;
				if (size <= length) {
					s += str.charAt(i);
				} else {
					break;
				}
			}
		}
		if (str.length > length) {
			s += "...";
		}
		return s;
	}
	myApproveGrid.sm = new Ext.grid.CheckboxSelectionModel();
	myApproveGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			header : "" + getResource('resourceParam726') + "",//审批步骤
			dataIndex : 'approveStepName',
			width : 100,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				var objectName = '';
				if(record.data.objectName && record.data.objectName != null && record.data.objectName != 'null') {
					objectName = record.data.objectName;
				}
				return '<a href="javascript:myApproveMain.goSubmitApprove('
						+ record.data.examinertype
						+ ',\''
						+ record.data.approveNote
						+ '\',\''
						+ record.data.ID
						+ '\','
						+ record.data.approveStatus
						+ ','
						+ record.data.flowinstanceID
						+ ',\''
						+ record.data.objectType
						+ '\','
						+ record.data.examiner
						+ ','
						+ record.data.activityInstanceID
						+ ',\''
						+ record.data.objectId
						+ '\',\''
						+ record.data.approvalType
						+ '\',\''
						+ record.data.approveVeiw+'\')" style="text-decoration:underline;color:blue;"><span title='
						+ value + '>' + Ext.util.Format.ellipsis('【'+value+'】'+objectName, 20)
						+ '</span></a>';
			}
		}, {
			header : "" + getResource('resourceParam722') + "",//审批流程
			width : 100,
			dataIndex : 'approvePressName',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				return '<span title=' + value + '>'
						+ Ext.util.Format.ellipsis(value, 20) + '</span>';
			}
		}, {
			header : "提交人",
			width : 100,
			dataIndex : 'starterName'
		}, {
			header : "" + getResource('resourceParam728') + "",//审批对象'
			width : 50,
			dataIndex : 'objectType',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				if ("TaskDataType" == value) {
					return "" + getResource('resourceParam733') + "";//任务
				} else if ("ProjectDataType" == value) {
					return "" + getResource('resourceParam463') + "";//项目
				} else if ("DataObjectDataType" == value) {
					return "" + getResource('resourceParam615') + "";//数据对象
				} else if ("DataTagDataType" == value) {
					return getResource('resourceParam1375');//数据分类
				} else if ("DataEntityDataType" == value) {
					return getResource('resourceParam474');//数据
				} else if ("DataTypeDataType" == value) {
					return getResource('resourceParam611');// '数据类型';
				} else if ("SiteMgrDocFormatDataType" == value) {
					return "书面文档";
				} else if ("SiteMgrProblemFormatDataType" == value) {
					return "现场问题";
				} else if ("TemplateDataType" == value) {
					return "任务流程模板";
				} else if ("FileDataType" == value) {
					return "" + getResource('resourceParam469') + "";//'文件
				} else { // 其他扩展类型
					return ApprovalObjectTypeContent[value];
				}
			}
		}, {
			header : "" + getResource('resourceParam716') + "",
			width : 50,
			dataIndex : 'examinertype',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				if ("1" == value) {
					return "" + getResource('resourceParam731') + "";
				} else {
					return "" + getResource('resourceParam732') + "";
				}
			}
		}, {
			header : "" + getResource('resourceParam1145') + "",//审批状态
			width : 80,
			dataIndex : 'approveStatus',
			//添加两个状态修改bug119
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				if ("0" == value) {
					return "" + getResource('resourceParam1363') + "";
				} else if ("1" == value) {
					return "" + getResource('resourceParam1365') + "";
				}else if ("2" == value) {
					return "" + getResource('resourceParam9181') + "";
				} else if("3"==value){
					return "" + getResource('resourceParam9182') + "";
				} else if("100"==value){
					return "" + getResource('resourceParam9794') + "";
				}
				else {
					return "" + getResource('resourceParam1367') + "";
				}
			}
		}, {
			header : "" + getResource('resourceParam723') + "",
			width : 80,
			dataIndex : 'approveStartTime'
		}, {
			header : "" + getResource('resourceParam1144') + "",
			width : 80,
			dataIndex : 'approveTime'
		}, {
			header : "" + getResource('resourceParam727') + "",
			width : 100,
			dataIndex : 'approveVeiw',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				return '<span title='
						+ value.replace(/\n/ig, "").replace(/\r/ig, "") + '>'
						+ Ext.util.Format.ellipsis(value, 20) + '</span>';
			}
		}]
	});
}
