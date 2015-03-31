// 默认空白图片
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var dataCenterPublishMain = {
	tab : null,
	grid : null,
	args : {
		start : 0,
		limit : 8
	},
	baseargs : null,
	egrid : null,
	flag : false,
	onlinegrid : null,
	rightDataObjectID : null,
	rightDataType : null,
	leftDataObjectID : null,
	leftDataType : null,
	leftNodeID : null,
	rightNodeID : null,
	dataCenterID : null,
	fullRightNodeID : null
};

function waitDialog() {
	Ext.MessageBox.show({
		// text 9047--正在    9048--请等待
		msg : '' + getResource('resourceParam9047') + ''+getResource('resourceParam605')+''+getResource('resourceParam474')+', ' + getResource('resourceParam9048') + '...',
		progressText : ''+getResource('resourceParam1251')+'',
		width : 300,
		wait : true,
		waitConfig : {
			interval : 200
		},
		icon : 'save1',
		animEl : 'waitDialog'
	});
}

function datapublish() {
	// 校验挂接到数据中心的逻辑
	if (null == dataCenterPublishMain.leftDataObjectID
			|| dataCenterPublishMain.leftDataType == '_con') {// 没有选择或选择的是根节点，不能发布到数据中心
		Ext.MessageBox.alert(''+getResource('resourceParam575')+'',
				""+getResource('resourceParam459')+""+getResource('resourceParam463')+"、"+getResource('resourceParam733')
				+ '' + getResource('resourceParam9072') + '' +getResource('resourceParam1066')+""+getResource('resourceParam1252')+"。\n"+getResource('resourceParam463')
				+ '' + getResource('resourceParam9073') + '' +getResource('resourceParam561')+"，"+getResource('resourceParam733')
				+ '' + getResource('resourceParam9074') +  '' + getResource('resourceParam9075') + ''  +getResource('resourceParam733')
				+ '' + getResource('resourceParam9076') + '' +getResource('resourceParam1252')+ '' + getResource('resourceParam9073') + '' +getResource('resourceParam474')
				+ '' + getResource('resourceParam9077') +  '' + getResource('resourceParam9076') + ''  +getResource('resourceParam474')
				+ '' + getResource('resourceParam9052') +  '' + getResource('resourceParam9078') + ''  +getResource('resourceParam561')+"。");
		return;
	}

	if (dataCenterPublishMain.leftDataType == '_pro') {// 直接发布到数据中心，不管右边选择的是什么节点，可以过滤一下
		Ext.MessageBox.confirm( '' + getResource('resourceParam1724') + '' ,  '' + getResource('resourceParam9079') + ''
				+getResource('resourceParam512')+''+getResource('resourceParam463')
				+'，' + getResource('resourceParam9080') +  '' + getResource('resourceParam9073') + '' +getResource('resourceParam561')+''+getResource('resourceParam605')+'。'
				+getResource('resourceParam512')+''+getResource('resourceParam510')+ '' + getResource('resourceParam9019') + '?', function(btn,
				text) {
			if (btn == 'yes') {
				// 调用发布方法
				// 在调用方法发布数据之前，先判断节点是不是leaf，是不是要实现展开。
				callSeam("DataCenterPublishService",
						"publishProjectAsDatacenter",
						[dataCenterPublishMain.leftDataObjectID],
						dataCenterPublishMain.publishDataCenterCallBack);// 可能再加上手动刷新
				waitDialog();// 等待对话框
			}
		});
		return;
	}

	if ('_dc' != dataCenterPublishMain.rightDataType
			&& 'dataset' != dataCenterPublishMain.rightDataType) {
		if ('dataitem' == dataCenterPublishMain.rightDataType) {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'',  '' + getResource('resourceParam9027') +  '' + getResource('resourceParam9078') 
					+ '' +getResource('resourceParam474')+ '' + getResource('resourceParam9052') + '' + getResource('resourceParam9081') + '' + '。\n'+getResource('resourceParam459')
					+  '' + getResource('resourceParam9082') + '' +getResource('resourceParam561')+ '' + getResource('resourceParam9072') + '' +getResource('resourceParam474')+ '' + getResource('resourceParam9077') + '。');
		} else {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam459')
					+ '' + getResource('resourceParam9082') + '' +getResource('resourceParam561')+ '' + getResource('resourceParam9072') + '' +getResource('resourceParam474')+ '' + getResource('resourceParam9077') + '。');
		}
		return;
	}

	if (dataCenterPublishMain.leftDataType == '_tsk') {// 右边的数据中心必须选择数据中心或数据集
		Ext.MessageBox.confirm( '' + getResource('resourceParam1724') + '' ,  '' + getResource('resourceParam9079') + '' 
				+getResource('resourceParam512')+''+getResource('resourceParam733')+'，'+getResource('resourceParam733')
				+ '' + getResource('resourceParam9076') + '' + getResource('resourceParam9075') + '' +getResource('resourceParam733')
				+ '' + getResource('resourceParam9080') + '' + getResource('resourceParam9073') + '' +getResource('resourceParam474')
				+ '' + getResource('resourceParam9077') + '' +getResource('resourceParam605')+ '' + getResource('resourceParam9083')
				+ '' +getResource('resourceParam561')+'。'+getResource('resourceParam512')+''+getResource('resourceParam510')+ '' + getResource('resourceParam9019') + '?',
				function(btn, text) {
					if (btn == 'yes') {
						// 调用发布方法
						callSeam(
								"DataCenterPublishService",
								"publishTaskAsDataset",
								[
										dataCenterPublishMain.leftDataObjectID,
										dataCenterPublishMain.rightDataObjectID,
										dataCenterPublishMain.rightDataType,
										dataCenterPublishMain.dataCenterID],
								dataCenterPublishMain.publishCallBack);
						waitDialog();// 等待对话框
					}
				});

		return;
	}
	if (dataCenterPublishMain.leftDataType == '_par') {// 右边的数据中心必须选择数据中心或数据集
		Ext.MessageBox.confirm( '' + getResource('resourceParam1724') + '' ,  '' + getResource('resourceParam9079')
				+ '' +getResource('resourceParam512')+''+getResource('resourceParam1252')
				+'，' + getResource('resourceParam9080') + '' + getResource('resourceParam9073') + '' +getResource('resourceParam474')
				+ '' + getResource('resourceParam9052') + '' +getResource('resourceParam605')+ '' + getResource('resourceParam9083') 
				+ '' +getResource('resourceParam561')+'。'+getResource('resourceParam512')+''+getResource('resourceParam510')+ '' + getResource('resourceParam9019') + '?', function(
				btn, text) {
			if (btn == 'yes') {
				// 调用发布方法
				callSeam("DataCenterPublishService",
						"publishParameterAsDataitem", [
								dataCenterPublishMain.leftDataObjectID,
								dataCenterPublishMain.rightDataObjectID,
								dataCenterPublishMain.rightDataType,
								dataCenterPublishMain.dataCenterID],
						dataCenterPublishMain.publishCallBack);
				waitDialog();// 等待对话框
			}
		});

		return;
	}

}

dataCenterPublishMain.publishDataCenterCallBack = function(result) {
	if (result == true) {
		var dcRightnode = dataCenterPublishRightTree.tag.getNodeById('0');
		dataCenterPublishMain.refreshTreeNode(dcRightnode);
	} else {
		Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1127')+'！');
	}
	Ext.MessageBox.hide();
}

dataCenterPublishMain.publishCallBack = function(result) {
	if (result == true) {
		var Rightnode = dataCenterPublishRightTree.tag
				.getNodeById(dataCenterPublishMain.fullRightNodeID);
		dataCenterPublishMain.refreshTreeNode(Rightnode);
	} else {
		Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1127')+'！');
	}
	Ext.MessageBox.hide();
}
//刷新树节点
dataCenterPublishMain.refreshTreeNode = function(node){
		if (node.isExpanded() || node.isLeaf()) {
			dataCenterPublishRightTree.tag.fireEvent('beforeload', node);
			dataCenterPublishRightTree.tag.loader.load(node);
			if (node.isLeaf())
				node.leaf = false;
			node.expand();
		}
	}

function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);
	if ((version >= 5.5) && (document.body.filters)) {

		for (var j = 0; j < document.images.length; j++) {
			var img = document.images[j];
			var imgName = img.src.toUpperCase();
			if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
				var imgID = (img.id) ? "id='" + img.id + "' " : "";
				var imgClass = (img.className) ? "class='" + img.className
						+ "' " : "";
				var imgTitle = (img.title)
						? "title='" + img.title + "' "
						: "title='" + img.alt + "' ";
				var imgStyle = "display:inline-block;" + img.style.cssText;
				if (img.align == "left")
					imgStyle = "float:left;" + imgStyle;
				if (img.align == "right")
					imgStyle = "float:right;" + imgStyle;
				if (img.parentElement.href)
					imgStyle = "cursor:hand;" + imgStyle;
				var strNewHTML = "<span "
						+ imgID
						+ imgClass
						+ imgTitle
						+ " style=\""
						+ "width:"
						+ img.width
						+ "px; height:"
						+ img.height
						+ "px;"
						+ imgStyle
						+ ";"
						+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
						+ "(src=\'" + img.src
						+ "\', sizingMethod='scale');\"></span>";
				img.outerHTML = strNewHTML;
				alert('imghtml:' + strNewHTML);
				j = j - 1;
			}
		}
	}
}
// window.attachEvent("onload", correctPNG);

function cancel() {
	alert( '' + getResource('resourceParam9002') + '' + getResource('resourceParam9084') + '' +getResource('resourceParam474')+""+getResource('resourceParam605')
			+"，" + getResource('resourceParam9085') + '' +getResource('resourceParam454')+ '' + getResource('resourceParam9086') + '' );// 这里要做成删除按钮
}

dataCenterPublishMain.init = function() {
	// correctPNG();
	dataCenterPublishMain.lefttree = dataCenterPublishLeftTree.init();
	dataCenterPublishMain.righttree = dataCenterPublishRightTree.init();

	var hh = " <div id='temp'><center><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><P>&nbsp;</p><p>&nbsp;</p>"
			+ "<a href='javascript:void(0);' name='leftToRight' onClick='datapublish()'><span style=\"width:100%;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../images/manage/arrow_right.png', sizingMethod='image');\"></span></a>"
			+ "<p>&nbsp;</p></center></div>";
			//<a href='#' name='leftToRight' onClick='cancel()'><span style=\"width:100%;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../images/manage/arrow_left.png', sizingMethod='image');\"></span></a>

	var apppanel = new Ext.Panel({
		id : 'apppanel',
		region : 'center',

		// layout : 'border',

		 height : 800,
		// split : true,
		collapsible : true,
		// minSize:80,
		// maxSize:80,
		//width : 30,
		html : hh
	});

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'column', // 布局模式
		items : [{
		         columnWidth:.4,
		         items:[dataCenterPublishMain.lefttree]
		         },
		         {
		         columnWidth:.2,
		         items:[apppanel]
		         },
		         {
		          columnWidth:.4,
		          items:[dataCenterPublishMain.righttree]
		         }]
	});

		// myGrid.loadvalue(dataCenterPublishMain.onlinegrid.store,
		// {start:0,limit:25},dataCenterPublishMain.onlinegrid.store.baseParams);
		// dataCenterPublishMain.southpanel.hide();
		// dataCenterPublishMain.enpanel.doLayout();
		// dataCenterPublishMain.enpanel.doLayout();

}
Ext.onReady(dataCenterPublishMain.init, dataCenterPublishMain, true)
