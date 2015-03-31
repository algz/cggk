client = {
	type : "P2M",
	taskname : null,
	projectid : null,
	taskid : null
};
function startP2M(st, projectid, taskid, taskname) {
	client.taskname = taskname;
	client.projectid = projectid;
	if (taskid == null) {
		taskid = 0;
	}
	// 启动参数增加了StartPage ，启动页面0甘特图1流程图2网络图
	command = 'syswarep2m:" ProjectID=' + client.projectid + ' "TaskID='
			+ taskid + '" TaskName=' + client.taskname + ' "UserID='
			+ parent.Index.user.getUserid() + '" UserName='
			+ parent.Index.user.getLoginname() + ' "StartPage=1';
	document.getElementById('hiddenPanelframe').src = command;
	// alert(document.getElementById('hiddenPanelframe').src);
}
function starupClient(result, seam, taskid, path) {
	var href = window.location.href;
	last = href.lastIndexOf("/");
	href = href.substring(0, last);
	last = href.lastIndexOf("/");
	href = href.substring(0, last) + "/JSON/client_auth.isLogin?" + result;

	var command = "";
	var appName = "";
	if (client.type == "P2M") {
		if (taskid == null) {
			taskid = 0;
		}
		// "_和_"间隔
		command = 'syswarep2m:" ProjectID=' + client.projectid + ' "TaskID='
				+ taskid + '" TaskName=' + client.taskname + ' "UserID='
				+ parent.Index.user.getUserid() + '" UserName='
				+ parent.Index.user.getLoginname();

		appName = "P2M";
	}
	if (client.type == "IDE") {// 加入项目id和名称
		// command = path+ ' -ProjectID "' + client.projectid + '" -TaskID
		// "'+taskid
		// +'" -TaskName "'+client.taskname+'" -UserName
		// "'+parent.Index.user.getLoginname()+'"';
		command = 'syswareIDE:-ProjectID "' + client.projectid + '" -TaskID "'
				+ taskid + '" -TaskName "' + client.taskname + '" -UserName "'
				+ parent.Index.user.getLoginname() + '"';
		appName = "IDE";
	}
	// alert(command);
	try {
		// WSH = new ActiveXObject("WScript.Shell");
		// var oExec = WSH.exec(command);
		// popwin = window.open(command);窗口的方式启动
		// setTimeout("popwin.close();",1000);
		// popwin.close();
		document.getElementById('hiddenPanelframe').src = command;
	} catch (ex) {
		alert(ex.number);

		if (Ext.isIE) {

			if ((ex.number & 0xFFFF) == 2)
				Ext.MessageBox.alert(appName, "请先正确"
								+ getResource('resourceParam464') + ""
								+ getResource('resourceParam560') + ""
								+ getResource('resourceParam558') + "的路径");
			else
				Ext.MessageBox.alert(appName, "由于安全原因无法创建组件，请将本"
								+ getResource('resourceParam559')
								+ "加入到IE的信任站点中，并"
								+ getResource('resourceParam505') + "进行了正确的"
								+ getResource('resourceParam464') + "安全"
								+ getResource('resourceParam464') + "。");
		} else
			Ext.MessageBox.alert(appName, "必须在IE"
							+ getResource('resourceParam473') + "器中使用该功能!");
	}
}
function doStartup(taskid, path) {
	var ck = starupClient.createDelegate(this, [taskid, path], true);
	callSeam("client_auth", "putClientid", [1], ck);
}
function fileExists(filespec) {

	/*
	 * try { fso = new ActiveXObject("Scripting.FileSystemObject"); if
	 * (fso.FileExists(filespec)) return true; else return false; } catch (ex) {
	 * if (Ext.isIE) { alert("由于安全原因无法创建组件，请将本系统加入到IE的信任站点中，并确认进行了正确的设置安全设置。"); }
	 * else alert("必须在IE浏览器中使用该功能!"); }
	 */
	return true;

}
function exec(result, seam, taskid, path) {
	if (path == '' || path == null) {
		Ext.MessageBox.alert("P2M", "请先正确" + getResource('resourceParam464')
						+ "" + getResource('resourceParam560') + ""
						+ getResource('resourceParam558') + "的路径");
		return;
	}
	var href = window.location.href;
	last = href.lastIndexOf("/");
	href = href.substring(0, last);
	last = href.lastIndexOf("/");
	href = href.substring(0, last) + "/JSON/client_auth.isLogin?" + result;
	try {
		WSH = new ActiveXObject("WScript.Shell");
		if (client.type == "CAPP")
			var oExec = WSH.exec(path + ' "' + parent.Index.user.getLoginname()
					+ ' ' + href + '&2="');
		else
			var oExec = WSH.exec(path + ' ' + parent.Index.user.getLoginname()
					+ ' ' + href + '&2=');
	} catch (ex) {

		if (Ext.isIE) {

			if ((ex.number & 0xFFFF) == 2)
				Ext.MessageBox.alert("P2M", "请先正确"
								+ getResource('resourceParam464') + ""
								+ getResource('resourceParam560') + ""
								+ getResource('resourceParam558') + "的路径");
			else
				Ext.MessageBox.alert("P2M", "由于安全原因无法创建组件，请将本"
								+ getResource('resourceParam559')
								+ "加入到IE的信任站点中，并"
								+ getResource('resourceParam505') + "进行了正确的"
								+ getResource('resourceParam464') + "安全"
								+ getResource('resourceParam464') + "。");
		} else
			Ext.MessageBox.alert("P2M", "必须在IE"
							+ getResource('resourceParam473') + "器中使用该功能!");
	}
}
function doExec(result, seam, st, taskid) {

	if (st == "P2M") {
		client.type = "P2M";
		doStartup(taskid, result);
	} else if (st == "IDE") {
		client.type = "IDE";
		doStartup(taskid, result);
	} else {
		client.type = st;
		var ck = exec.createDelegate(this, [taskid, result], true);
		callSeam("client_auth", "putClientid", [0], ck);
	}
}
function startup(st, projectid, taskid, taskname) {
	// alert('st:'+st+' pid:'+projectid+' taskid:'+taskid+'
	// taskname:'+taskname);
	client.taskname = taskname;
	client.projectid = projectid;
	var fn = doExec.createDelegate(this, [st, taskid], true);
	callSeam("applicationop_tapplicationsvr", "getPath", [st], fn);
}

/*
 * 使用用户定义的工具启动应用程序
 */
function startupApplication(taskId) {
	callSeam("mytask_MyTaskRemote", "startupApplication", [taskId], function(
			result) {
		var obj = Ext.util.JSON.decode(result);
		/**
		 * bug编号315
		 * bug已更改并添加提示
		 * @author wangyf
		 */
		var oo = obj.path
		if((oo == null) || (typeof oo == 'undefined')) {
			Ext.MessageBox.show({
				title : '提示',
				msg : "此任务没有应用程序！",
				buttons : Ext.MessageBox.OK,
				width : 250,
				icon : Ext.MessageBox.WARNING
			});
			return ;
		}
		if (obj.success) {
			var name = obj.name;
			var link = getResource('resourceParam9125')
					+ '<a ext:qtip="'
					+ getResource('resourceParam9124')
					+ '"style="text-decoration:underline;color:blue;padding-bottom:0px;padding-top:2px;"href="../JSON/FileDownloadServlet?type=1&path='
					+ name + '">' + name + '</a>'
					+ getResource('resourceParam9126')+".如果仍不能启动应用程序,请按照如下操作1:将sysware加入受信任站点;2:在IE安全设置中启用关于ActiveX的选项;如果仍不能启动应用程序,可能与IE已有的加载项相关,请禁用IE的部分加载项后再试.";
			if (obj.path.success) {
				try {
					var wsh = new ActiveXObject("WScript.Shell");
					var type=obj.path.type;
					var path =obj.path.name
					if(type==0) {
					} else if(type==1) {
						var ie=wsh.ExpandEnvironmentStrings("%ProgramFiles%")+'\\Internet Explorer\\IEXPLORE.EXE';
						path=ie+" "+path;
					}
					/**
					 * bug编号881 wangyf
					 * bug信息：任务关联word,txt等应用程序，第一次启动时会弹出找不到文件的提示。
					 * 2011-05-30 17：06
					 * 注：下面的"\""必须要加，去空格。
					 */
					var nameWF = obj.nameW;
					wsh.run("\"" + nameWF);
				} catch (ex) {
					if (Ext.isIE) {
						if ((ex.number & 0xFFFF) == 2) {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam587')
												+ '',
										minWidth : 250,
										msg : getResource('resourceParam5031')
												+ ',' + link,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});

						} else {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam587')
												+ '',
										minWidth : 250,
										msg : getResource('resourceParam5030')
												+ ',' + link,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});

						}

					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam587')
											+ '',
									minWidth : 250,
									msg : getResource('resourceParam5032'),
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});

					}
				}
			}
		}
	});
}
