Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
// 提供公共操作
var base = {
	waitDialog : null,
	clientTimeoutSingleFlag : null,
	timeoutID : null
};


//function fixUnload()
//{
//   if(document.readyState == 'interactive')
//   {
//       function stop()
//       {
//	        if(window.detachEvent)
//	        {
//	          document.detachEvent('onstop',stop);
//	        }else if(window.removeEventListener)
//	        {
//	          document.removeEventListener('onstop',stop);
//	        }
//          base.gbg();
//       };
//       
//        if(window.attachEvent)
//            {
//              document.attachEvent('onstop',stop);
//            }else if(window.addEventListener)
//            {
//              document.addEventListener('onstop',stop);
//            }
//       
//       window.setTimeout(function(){
//           if(window.detachEvent)
//            {
//              document.detachEvent('onstop',stop);
//            }else if(window.removeEventListener)
//            {
//              document.removeEventListener('onstop',stop);
//            }
//       },0);
//   }
//}
//if(window.attachEvent)
//{
// window.attachEvent('onunload',base.gbg);
// window.attachEvent('onbeforeunload',fixUnload);
//}else if(window.addEventListener)
//{
// window.addEventListener('unload',base.gbg);
// window.addEventListener('beforeunload',fixUnload);
//}

base.waitDialog = function(msg, progressText) {
	Ext.MessageBox.show({
				msg : msg,// '正在统计数据, 请等待...',
				progressText : progressText,// '统计中...',
				width : 300,
				wait : true,
				waitConfig : {
					interval : 200
				},
				icon : 'save1',
				animEl : 'waitDialog'
			});
}

base.openCenterWindow = function(url, name, width, height) {
	var left = (window.screen.availWidth - width - 40) / 2;
	var top = (window.screen.availHeight - height - 40) / 2;
	window.open(url, name, 'menubar=no, toolbar=no,resizable=yes, '
					+ 'location=no, height=' + height + ', width=' + width
					+ ', left=' + left + ', top=' + top);

}
base.gbg = function()
{
        if(typeof mxBasePath != 'undefined')
        {
           mxBasePath = null;
        }
        if(typeof mytaskdetails === 'object')
        {
           mytaskdetails.mainpanelAll = null;
           mytaskdetails.panel13=null;
           mytaskdetails.mainTabpanel=null;
           mytaskdetails = null;
        }
        if(typeof data === 'object')
        {
           data.modify = null;
           data = null;
        }
        if(typeof mytasktijiao === 'object')
        {
           mytasktijiao.panel=null;
           mytasktijiao.mainpanel = null;
           mytasktijiao.mydataObjectPanel = null;
           mytasktijiao.tijiaopane = null;
           mytasktijiao.northpanel = null;
           mytasktijiao.centerpanel = null;
           mytasktijiao.dataPanel = null;
           mytasktijiao.ttabpanel = null;
           mytasktijiao.tabpanel = null;
        }
        if(typeof mytaskdesignate === 'object')
        {
           mytaskdesignate.panel=null;
           mytaskdesignate.designatepanel = null;
           mytaskdesignate.mainpanel = null;
           mytaskdesignate.northpanel = null;
           mytaskdesignate.centerpanel = null;
           mytaskdesignate.getdate = null;
           mytaskdesignate.designateform= null;
           mytaskdesignate.form = null;
           mytaskdesignate = null;
        }
        if(typeof mytaskadjustment === 'object')
        {
            mytaskadjustment.mainpanel = null;
            mytaskadjustment.northpanel = null;
            mytaskadjustment.centerpanel = null;
            mytaskadjustment.form = null;
            mytaskadjustment.panel = null;
            mytaskadjustment.designatepanel = null;
            mytaskadjustment = null;
        }
        if(typeof mytaskList === 'object')
        {
           mytaskList.baseargsfz.isPath = null;
           mytaskList.baseargsfz = null;
           mytaskList.grid = null;
           mytaskList.panel = null;
           mytaskList.mytasklistpanel = null;
        }
        if(typeof mytaskGrid === 'object')
        {
            mytaskGrid.init = null;
            mytaskGrid.grid = null;
            mytaskGrid.proxy = null;
            mytaskGrid.percentColumn= null;
            mytaskGrid.rowIndex = null;
            mytaskGrid.columnIndex = null;
            mytaskGrid.ds= null;
            mytaskGrid.reader = null;
            mytaskGrid.setcm1=null;
            mytaskGrid.cm.defaultSortable=null;
            mytaskGrid.cm = null;
            mytaskGrid.percentColumn=null;
            mytaskGrid.showTaskPath=null;
            mytaskGrid.sm=null;
            mytaskGrid.taskPath=null;
            mytaskGrid = null;
        }
        if(typeof mytaskMain === 'object')
        {
           mytaskMain.cenpanel = null;
           mytaskMain.taskid = null;
           mytaskMain.issuedmanid = null;
           mytaskMain.issuedmanname = null;
           mytaskMain.instname = null;
           mytaskMain.chargeddepid = null;
           mytaskMain.hh = null;
           mytaskMain.taskids = null;
           mytaskMain.projectid = null;
           mytaskMain.taskname = null;
           mytaskMain.args = null;
           mytaskMain.detailsOnclick=null;
           mytaskMain.recoverydesignate=null;
           mytaskMain.jieshoudesignate=null;
           mytaskMain.ztai=null;
           mytaskMain.init=null;
           mytaskMain.card1 = null;
           mytaskMain.card2 = null;
           mytaskMain.card3 = null;
           mytaskMain.card4 = null;
           mytaskMain.card5 = null;
           mytaskMain.card6 = null;
           mytaskMain.northpanel = null;
           mytaskMain.grid = null;
           mytaskMain.start2MMask = null;
           mytaskMain.getdialog = null;
           mytaskMain.leixingming = null;
           mytaskMain.leix = null;
           mytaskMain.baseargsfz = null;
           mytaskMain.pros = null;
           mytaskMain.ztaiming = null;
           mytaskMain.combo1 = null;
           mytaskMain.combo2 = null;
           mytaskMain.restart = null;
           mytaskMain.isdesignate = null;
           mytaskMain.designatetaskname = null;
           mytaskMain.approvallist = [];
           mytaskMain.commitObject = null;
           mytaskMain.accept = null;
           mytaskMain.getAcceptSelections = null;
           mytaskMain.commitTaskNames = null;
           mytaskMain.tasktype = null;
           mytaskMain.ptids = null;
           mytaskMain.detailscodes = null;
           mytaskMain.loadtasklist = null;
           mytaskMain.loadtasklists = null;
           mytaskMain.jujuedesignate = null;
           mytaskMain.forcardform = null;
           mytaskMain.createTaskDataTree = null;
           mytaskMain = null;
        }
        if(Ext.isIE)
        {
//            var ifm=window.parent.document.getElementById('center_frame').getElementsByTagName('iframe')[0];
//	        if(ifm)
//	        {
//                ifm.document.write('');
//                ifm.document.clear();
//	        }
            setTimeout(CollectGarbage,1);
        }
}

base.openCenterJsWindow = function(url, name, width, height) {
	var imgPanel = new Ext.Panel({
		id : 'imgPanel',
		region : 'center',
		html : '<iframe src="'
				+ url
				+ '" width="100%" height="100%" id="ifr" name="ifr" frameborder="0">'
				+ '</iframe>'
	});

	if (!base.imgDialog) {
		tlework.addHtml(tlework.divHtml, 'baseImgDialog');// 动态生成需要绑定的div
		base.imgDialog = new Ext.Window({ // 创建对话框
			el : 'baseImgDialog',
			title : name,
			modal : true,
			layout : 'fit',
			width : width,
			height : height,
			closeAction : 'hide',
			plain : false,
			items : [imgPanel]
				// 将面板绑定到对话框
		});
	}
	base.imgDialog.on('click', function() {
				base.imgDialog.hide();
			});

	base.imgDialog.show();
	base.imgDialog.on("hide", function() {
				base.imgDialog.close();
				base.imgDialog.destroy();
				base.imgDialog = null;

			});
}

base.convertNodeId = function(nodeId) {
	return nodeId.indexOf('vp') == 0
			? 'p' + nodeId.substring(nodeId.indexOf('|') + 1)
			: (nodeId.indexOf('v') == 0 ? nodeId.substring(nodeId.indexOf('|')
					+ 1) : nodeId);
}

base.getDataId = function(prifixedNodeId) {
	if(Ext.isNumber(prifixedNodeId)){
		prifixedNodeId=''+prifixedNodeId;
	}
	if (prifixedNodeId.indexOf('p') == 0) {
		return prifixedNodeId.substring(1);
	} else if (prifixedNodeId.indexOf('w') == 0) {
		return prifixedNodeId.substring(1);
	} else if (prifixedNodeId.indexOf('c') == 0) {
		return prifixedNodeId.substring(1);
	} else {
		return prifixedNodeId;
	}
}

base.getDataType = function(prifixedNodeId) {
	if(Ext.isNumber(prifixedNodeId)){
		prifixedNodeId=''+prifixedNodeId;
	}
	if (prifixedNodeId.indexOf('p') == 0) {
		return 'ProjectDataType';
	} else if (prifixedNodeId.indexOf('w') == 0) {
		return 'TemplateDataType';
	} else if (prifixedNodeId.indexOf('c') == 0) {
		return 'ContentDataType';
	} else {
		return 'TaskDataType';
	}
}



base.getObjects = function(){
    
    var c=Ext.ComponentMgr.all;
    var items = c.items;
    var comIds=window.extComIds = window.extComIds || {};
    Seam.Remoting.log("我的任务看板->组件count:" + c.getCount() );
    for(var i=0;i<items.length;i++)
    {
//        Seam.Remoting.log("我的任务看板->组件"+i+":"+ items[i].id);
        comIds[items[i].id] = (comIds[items[i].id] || 0)+1;
    }
    var result = [];
    for(var key in comIds)
    {
       if(comIds[key] > 1)
       {
           result.push(key+"="+comIds[key]);
       }
    }
    Seam.Remoting.log("我的任务看板->两次以上的组件:" + result.concat(","));
}
