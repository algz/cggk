var httpRequest;
var templ3;
var rep_display = new Array();
var repform_display = new Array();
var accory_display = new Array();
var accory3_display = new Array();
var rep_count = 500;
for (var x = 0; x < rep_count; x++) {
	rep_display[x] = false;
}
for (var y = 0; y < rep_count; y++) {
	repform_display[y] = false;
}
for (var z = 0; z < rep_count; z++) {
	accory_display[z] = false;
}
for (var w = 0; w < rep_count; w++) {
	accory3_display[w] = false;
}
function showLevel3Reply(m, n, messageid) { // 控制第 n 条日志回复的回复显示的函数，参数 n
	// 为第n条回复的回复ID号；

	if (!rep_display[n]) {
		getLogLevel3(m, n, messageid);

		document.getElementById("log_c_reply_box" + m + n).style.display = "block";
		rep_display[n] = true;
	} else {
		document.getElementById("log_c_reply_box" + m + n).style.display = "none";
		rep_display[n] = false;

	}

}
function showReplyForm(m, n) { // 控制第 n 条日志回复的回复显示的函数，参数 n 为第n条回复的回复ID号；

	if (!repform_display[n]) {
		// getLogLevel3(m,n,messageid);

		document.getElementById("replyHidden" + m + n).style.display = "block";
		repform_display[n] = true;
	} else {
		document.getElementById("replyHidden" + m + n).style.display = "none";
		repform_display[n] = false;

	}

}
// 二级附件
function showAccory(m, n) { // 控制第 n 条日志回复的回复显示的函数，参数 n 为第n条回复的回复ID号；

	if (!accory_display[n]) {
		// getLogLevel3(m,n,messageid);

		document.getElementById("patch" + m + n).style.display = "block";
		accory_display[n] = true;
	} else {
		document.getElementById("patch" + m + n).style.display = "none";
		accory_display[n] = false;

	}

}
function showAccory3(m, n) { // 控制第 n 条日志回复的回复显示的函数，参数 n 为第n条回复的回复ID号；

	if (!accory3_display[n]) {
		// getLogLevel3(m,n,messageid);

		document.getElementById("patch3" + m + n).style.display = "block";
		accory3_display[n] = true;
	} else {
		document.getElementById("patch3" + m + n).style.display = "none";
		accory3_display[n] = false;

	}

}
function getNewId() {

	// Seam.Component.getInstance("myLog_LogInfoRemote").getNewId(getNewIdCallBack);
	// callSeam("myLog_LogInfoRemote", "getLogBack", updateCallBack);
	var requestURL = "newid?temp=" + new Date();
	httpRequest = getHttpRequestObject();
	// alert(httpRequest);
	httpRequest.onreadystatechange = getNewIdHttpResponse;
	httpRequest.open("GET", requestURL, false);
	httpRequest.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	httpRequest.send(null);
}
function getNewIdHttpResponse() {
	// alert("response");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			parsenNewIdResponse();
		} else if (httpRequest.status == 404) {
			alert("404 error");
		} else {
			alert("error code " + httpRequest.status);
		}
	}
}
function parsenNewIdResponse() {
	// alert(httpRequest.responseText);
	document.getElementById("tempnewid").value = httpRequest.responseText;
}
function getNewFileId() {

	// Seam.Component.getInstance("myLog_LogInfoRemote").getNewId(getNewIdCallBack);
	// callSeam("myLog_LogInfoRemote", "getLogBack", updateCallBack);
	var requestURL = "newid?temp=" + new Date();
	httpRequest = getHttpRequestObject();
	// alert(httpRequest);
	httpRequest.onreadystatechange = getNewFileIdHttpResponse;
	httpRequest.open("GET", requestURL, false);
	httpRequest.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	httpRequest.send(null);
}
function getNewFileIdHttpResponse() {
	// alert("response");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			parsenNewFileIdResponse();
		} else if (httpRequest.status == 404) {
			alert("404 error");
		} else {
			alert("error code " + httpRequest.status);
		}
	}
}
function parsenNewFileIdResponse() {
	// alert(httpRequest.responseText);
	document.getElementById("tempnewfileid").value = httpRequest.responseText;
}
function getNewIdCallBack(result) {

}
function getLogLevel2(messageid) {

	Seam.Component.getInstance("myLog_LogLevel2InfoRemote").getLogLevel2Back(
			messageid, getLogLevel2CallBack);

}
function getHttpRequestObject() {
	var httpRequestObject;
	if (window.XMLHttpRequest) {
		httpRequestObject = new XMLHttpRequest;
	} else if (window.ActiveXObject) {
		try {
			httpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			try {
				httpRequestObject = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				alert("error");
			}
		}
	}
	return httpRequestObject;
}
// 获取三级回复
function getLogLevel3(currMessageId, i, messageid) {
	var vo = Seam.Remoting.createType("com.luck.itumserv.myLog.LogInfoVO");
	vo.setCurrMessageId(currMessageId);
	vo.setI(i);
	vo.setMessageid(messageid);
	Seam.Component.getInstance("myLog_LogLevel3InfoRemote").getLogLevel3Back(
			vo, getLogLevel3CallBack);
}

function getLogLevel3CallBack(result) {
	var currMessageId = result.currMessageId;
	var i = result.i;
	var messageid = result.messageid;
	var htmlLevel3 = "";
	var hl3 = eval('(' + result.result + ')');

	for (var j = 0; j < hl3.results; j++) {
		// alert(hl3.rows[j]['messagebody']);
		var accory = ""
		var accorystr = "";
		// alert(hl3.rows[j]['messageid']);
		for (var x = 0; x < hl3.rows[j]['accessory'].results; x++) {
			accory += "<a href='MessageFileDownLoadServlet?fileid="
					+ hl3.rows[j]['accessory'].rows[x]['fileid']
					+ "'>"
					+ hl3.rows[j]['accessory'].rows[x]['filename']
					+ "</a><img src='images/patch.gif' alt='download' width='16' height='16' align='absmiddle' />";
			// alert(temp.rows[i]['accessory'].rows[x]['filename']);
		}
		if ("" != accory) {
			accorystr = accory;
		}
		var hl3t = "<div id='replylevel3'><div id='log_c_reply_title'><a href='javascript:void(0);'>"
				+ hl3.rows[j]['loginname']
				+ "</a>&nbsp;"
				+ getResource('resourceParam1415')
				+ ": <a href=javaScript:showAccory3('"
				+ hl3.rows[j]['messageid']
				+ "','"
				+ j
				+ "');>"
				+ getResource('resourceParam982')
				+ "</a></div>"
				+ "<div id='log_c_reply_time'>"
				+ hl3.rows[j]['datestr']
				+ "</div>"
				+ "<div class='log_patch_list'  id='patch3"
				+ hl3.rows[j]['messageid']
				+ j
				+ "' >"
				+ accorystr
				+ "</div>"
				+ "<div id='log_c_reply_content'>"
				+ hl3.rows[j]['messagebody']
				+ "</div></div>";

		htmlLevel3 += hl3t;
	}
	document.getElementById("log_c_reply_box" + currMessageId + i).innerHTML = "";
	document.getElementById("log_c_reply_box" + currMessageId + i).innerHTML = htmlLevel3;
}

// 获得三级回复的内容
function getLevel3Reply(currMessageId, i, messageid) {

	getLogLevel3(currMessageId, i, messageid);
	var tl3Str = document.getElementById("templevel3").value;

	// alert(document.getElementById("templevel3").value);
	var htmlLevel3 = "";
	if (tl3Str != null && tl3Str != '') {
		var hl3 = eval('(' + tl3Str + ')');

		for (var j = 0; j < hl3.results; j++) {
			// alert(hl3.rows[j]['messagebody']);
			var hl3t = "<div id='replylevel3'><div id='log_c_reply_title'><a href='javascript:void(0);'>"
					+ hl3.rows[j]['loginname']
					+ "</a>&nbsp;"
					+ getResource('resourceParam1415')
					+ "</div>"
					+ "<div id='log_c_reply_time'>"
					+ hl3.rows[j]['datestr']
					+ "</div>"
					+ "<div id='log_c_reply_content'>"
					+ hl3.rows[j]['messagebody'] + "</div></div>";

			htmlLevel3 += hl3t;
		}
	}
	document.getElementById("log_c_reply_box" + currMessageId + i).innerHTML = "";
	document.getElementById("log_c_reply_box" + currMessageId + i).innerHTML = htmlLevel3;

}
function getLogLevel2CallBack(result) {
	// 当前日志编号
	var currMessageId = document.getElementById("currMessageId").value;
	// 当前回复区通过日志id
	var reply_area = document.getElementById("reply_area" + currMessageId);
	reply_area.innerHTML = "";
	// 二级日志消息
	var temp = eval('(' + result + ')');
	// 回复区内容
	var tempHtml = reply_area.innerHTML;

	for (var i = 0; i < temp.results; i++) {
		// alert(temp.rows[i]['messageid']);
		var htmlLevel3 = "";
		var tempUserName = "";
		// var isleaf = temp.rows[i]['isleaf'];
		// 是否为叶子结点向下查询三级回复
		// if ('' == isleaf) {
		// getLogLevel3();
		// var hl3 = eval('(' + document.getElementById("templevel3").value
		// + ')');
		//
		// for (var j = 0; j < hl3.length; j++) {
		//				
		// var hl3t = "<div id='replylevel3'><div id='log_c_reply_title'><a
		// href='#'>"+ hl3[j]['userid'] + "</a>&nbsp;回复chengbo</div>"
		// + "<div id='log_c_reply_time'>" + hl3[j]['logdate']+ "</div>"
		// + "<div id='log_c_reply_content'>"+ hl3[j]['logbody'] +
		// "</div></div>";
		//						 
		// htmlLevel3 += hl3t;
		// }
		//			
		// }
		// 附件
		var accory = ""
		var accorystr = "";
		for (var x = 0; x < temp.rows[i]['accessory'].results; x++) {
			accory += "<a href='MessageFileDownLoadServlet?fileid="
					+ temp.rows[i]['accessory'].rows[x]['fileid']
					+ "'>"
					+ temp.rows[i]['accessory'].rows[x]['filename']
					+ "</a><img src='images/patch.gif' alt='download' width='16' height='16' align='absmiddle' />&nbsp;|&nbsp;";
		}
		if ("" != accory) {
			accorystr = accory.substring(0, accory.length - 7);
		}
		var ih1 = "<div id='log_reply' name='log_reply" + currMessageId + "'>"
				+ "<div id='log_comment_box' name='log_comment_box"
				+ currMessageId + "'>"
				+ "<div id='log_comment_title' name='log_comment_title"
				+ currMessageId + "' ><a href='#'>" + temp.rows[i]['loginname']
				+ "</a>&nbsp;" + getResource('resourceParam1856')
				+ "：<a href=javaScript:showAccory('" + currMessageId + "','"
				+ i + "');>" + getResource('resourceParam982') + "</a></div>"
				+ "<div id='log_comment_time' name='log_comment_time"
				+ currMessageId + "'>" + temp.rows[i]['datestr'] + "</div>"

				+ "<div class='log_patch_list'  id='patch" + currMessageId + i
				+ "' >" + accorystr + "</div>"

				+ "<div id='log_comment_content' name='log_comment_content"
				+ currMessageId + "' >" + temp.rows[i]['messagebody']
				+ "&nbsp;<a href=javascript:showLevel3Reply('" + currMessageId
				+ "','" + i + "','" + temp.rows[i]['messageid'] + "')>"
				+ getResource('resourceParam1855') + "</a></div></div>"

				+ "<div id='log_c_reply_box' name='log_c_reply_box"
				+ currMessageId + i + "'>" + "<div id='log_c_reply_box"
				+ currMessageId + i + "'  >";
		tempUserName = "'" + temp.rows[i]['loginname'] + "'";

		var ih2 = "</div>"
				+ "</div>"
				+ "<div id='reply'><a href=javascript:showReplyForm('"
				+ currMessageId
				+ "','"
				+ i
				+ "')>"
				+ getResource('resourceParam1415')
				+ "</a></div>"
				+ "<div id ='replyHidden"
				+ currMessageId
				+ i
				+ "' style='display: none' >"
				+ "<form action='logReply' id='replayForm"
				+ temp.rows[i]['messageid']
				+ "'  target='hidden_frame' enctype='multipart/form-data' method='post'>"
				+ "<div id='log_reply_content'>"
				+ "<input type ='hidden' id ='functions' name ='functions' value='3'>"
				+ "<input type ='hidden' id ='parentMessageId' name ='parentMessageId' value='"
				+ temp.rows[i]['messageid']
				+ "'>"
				+ "<input type ='hidden' id ='primarykeys' name ='primarykeys' value='"
				+ document.getElementById('primarykeys').value
				+ "'>"
				+ "<textarea name='replycontent' id='replycontent"
				+ temp.rows[i]['messageid']
				+ i
				+ "' style='width:400px; height:100px;' onkeyup=javascript:warnThree(this.value," + i + "," + tempUserName + ",'" + currMessageId + "','"+ temp.rows[i]['messageid'] + "')>" 
				+ "</textarea></div>"
				+ "<div id='log_reply_submit'>" 
				/**
				 * bug编号471 动态提示
				 * @author wangyf
				 * 2010-05-03
				 */
				+ "<div id='remindMsg"+i+""+currMessageId+""+temp.rows[i]['messageid']+"'></div>"
				
				+"<div id='log_path'>"
				+ getResource('resourceParam1888')
				+ ": <input onkeypress='return false' type='file' id='file"
				+ currMessageId
				+ i
				+ "' name='file'></div><div id='log_sub'><a href=javascript:logReplyLevel3("
				+ i + "," + tempUserName + ",'" + currMessageId + "','"
				+ temp.rows[i]['messageid'] + "')  >"
				+ getResource('resourceParam1857') + "</a></div></div>"
				+ "</form>" + "</div>" + "</div>" + "</div>";
		var ihr = ih1 + htmlLevel3 + ih2;
		
		
		
		
		
		tempHtml += ihr;
	}
	var logBack = "<div id='logReplayArea"
			+ currMessageId
			+ "'>"
			+ "<form action='logReply' id='replayForm"
			+ currMessageId
			+ "'  target='hidden_frame' enctype='multipart/form-data' method='post'>"
			+ "<div id='log_reply_content'  name='log_reply_content"
			+ currMessageId
			+ "'>"
			+ "<input type ='hidden' id ='parentMessageId' name ='parentMessageId' value='"
			+ currMessageId
			+ "'>"
			+ "<input type ='hidden' id ='functions' name ='functions' value='2'>"
			+ "<input type ='hidden' id ='primarykeys' name ='primarykeys' value='"
			+ document.getElementById('primarykeys').value + "'>"
			+ "<textarea name='replycontent' id='replycontent" + currMessageId
			+ "' style='width:400px; height:100px;' onkeyup=javascript:warnTwo(this.value,'" + currMessageId + "')></textarea>" + "</div>"
			+ "<div id='log_reply_submit' name='log_reply_submit"
			+ currMessageId + "'>" 
			/**
			 * bug编号471 动态提示
			 * @author wangyf
			 * 2010-05-03
			 */
			+ "<div id='warnMsg"+currMessageId+"'></div>"
			
			+ "<div id='log_path' name='log_path"
			+ currMessageId + "'>" + getResource('resourceParam1888')
			+ ": <input onkeypress='return false' type='file' id='file"
			+ currMessageId + "' name='file'></div>"
			+ "<div id='log_sub' name='log_sub" + currMessageId
			+ "'>" 
			+"<a href=javascript:logReplySubmit('" + currMessageId + "'); >"
			+ getResource('resourceParam1857') + "</a></div>" + " " + "</div>"
			+ "</form>" + "</div>";

	tempHtml += logBack;
	// alert(tempHtml);
	reply_area.innerHTML = tempHtml;
}

// 二级回复提交
function logReplySubmit(currMessageId) {
	// 回复form
	var temp = document.getElementById("replycontent" + currMessageId).value;
	if (temp.length == 0) {
		alert("" + getResource('resourceParam1886') + "");
		return;
	}
	if (temp.length > 500) {
		alert("" + getResource('resourceParam1885') + "");
		return;
	}
	getNewId();
	getNewFileId();
	var test = document.getElementById("reply_area" + currMessageId);
	// alert(test.childNodes.length);
	// temp.value=test.innerHTML;
	// alert(test.innerHTML);
	var newCode = test.childNodes.length;
	// for(var i =0;i< test.childNodes.length;i++){
	// alert(test.childNodes[i].nodeType);
	// }
	// var newCode=test.getElementsByTagName("div").length;
	// alert(newCode);
	// alert(document.getElementById("tempnewid").value);
	// return;
	var replyForm = document.getElementById("replayForm" + currMessageId);
	var filename = "";
	var accoryStr = "";

	var filepath = document.getElementById('file' + currMessageId).value;
	// alert(filepaths);

	if ("" != filepath && null != filepath) {
		filename = filepath.substring(filepath.lastIndexOf("\\") + 1,
				filepath.length);
		accoryStr += "<a href='MessageFileDownLoadServlet?fileid="
				+ document.getElementById("tempnewfileid").value
				+ "'>"
				+ filename
				+ "</a><img src='images/patch.gif' alt='download' width='16' height='16' align='absmiddle' />";
	}
	// alert(newCode);
	replyForm.action = "logReply?messageid="
			+ document.getElementById("tempnewid").value + "&fileid="
			+ document.getElementById("tempnewfileid").value
			+ "&loglevel=2&divid=" + currMessageId + newCode + "&accoryStr="
			+ accoryStr;
	// 提交

	// alert(accoryStr);
	// alert(filename);
	// return ;

	replyForm.submit();
	// alert("二级");
	addNew2Content(currMessageId, accoryStr, newCode);
	document.getElementById("replycontent" + currMessageId).value = "";
	// var count=countDivByName("log_reply"+currMessageId);
	// alert("count:"+count);
	
	/**
	 * 提交回复后把动态提示信息清除掉
	 */
	if(document.getElementById("warnMsg" + currMessageId) == null || document.getElementById("warnMsg" + currMessageId) === "undefined") {
  	} else {
  		document.getElementById("warnMsg" + currMessageId).innerHTML = "";
  	}
	
	
	
	
}
function addNew2Content(currMessageId, accoryStr, newCode) {
	// alert("a"+newCode);
	var currentDate = new Date();
	// 当前选中日志编号
	// var currMessageId=document.getElementById("currMessageId").value;
	// 回复内容
	var replayContent = document.getElementById("replycontent" + currMessageId).value;

	// 回复区form DIV
	var logReplayArea = document
			.getElementById("logReplayArea" + currMessageId);

	// 当前日志回复区div
	var reply_area = document.getElementById("reply_area" + currMessageId);
	// alert(logReplayArea.outerHTML);
	// 获取回复区 outerHTML
	var logReplayAreaForm = getOuterHtml(logReplayArea);

	// 移除回复区from 所在div
	removeChildDiv(logReplayArea);
	// var reply_area =document.getElementById("reply_area");
	// 原始回复区内容
	var oldReplyArea = reply_area.innerHTML;
	// alert(currMessageId);

	// var
	// lastLevel2ReplyDiv=document.getElementsByName("log_reply"+currMessageId);

	// alert(lastLevel2ReplyDiv.length);

	// alert(lastLevel2ReplyDiv[0]);
	// 获得二级回复的回复有几条

	// alert("新id:"+document.getElementById("tempnewid").value);
	// 新增的回复内容
	var ih1 = "<div id='log_reply' name='log_reply"
			+ currMessageId
			+ "'>"
			+ "<div id='log_comment_box' name='log_comment_box"
			+ currMessageId
			+ "'>"
			+ "<div id='log_comment_title' name='log_comment_title"
			+ currMessageId
			+ "'><a href='javascript:void(0);'>"
			+ document.getElementsByName("loginname")[0].value
			+ "</a>&nbsp;"
			+ getResource('resourceParam1856')
			+ "：<a href=javaScript:showAccory('"
			+ currMessageId
			+ "','"
			+ newCode
			+ "');>"
			+ getResource('resourceParam982')
			+ "</a></div>"
			+ "<div id='log_comment_time' name='log_comment_time"
			+ currMessageId
			+ "'>"
			+ currentDate.toLocaleString()
			+ "</div>"

			// /////////////////////
			+ "<div class='log_patch_list'  id='patch"
			+ currMessageId
			+ newCode
			+ "' >"
			// + accoryStr
			+ ""
			+ getResource('resourceParam1887')
			+ ""
			+ "</div>"

			+ "<div id='log_comment_content' name='log_comment_content"
			+ currMessageId
			+ "'>"
			+ replayContent
			+ "&nbsp;<a href=javascript:showLevel3Reply('"
			+ currMessageId
			+ "','"
			+ newCode
			+ "','"
			+ document.getElementById("tempnewid").value
			+ "')>"
			+ getResource('resourceParam1855')
			+ "</a></div>"
			+ "</div>"
			+ "<div id='log_c_reply_box' name='log_c_reply_box"
			+ currMessageId
			+ newCode
			+ "'>"
			+ "<div id='log_c_reply_box"
			+ currMessageId
			+ newCode
			+ "' >"
			+ "</div>"
			+ "</div>"
			+ "<div id='reply' ><a href=javascript:showReplyForm('"
			+ currMessageId
			+ "','"
			+ newCode
			+ "')>"
			+ getResource('resourceParam1415')
			+ "</a></div>"
			+ "<div id ='replyHidden"
			+ currMessageId
			+ newCode
			+ "' style='display: none' >"
			+ "<form action='logReply' id='replayForm"
			+ document.getElementById("tempnewid").value
			+ "'  target='hidden_frame' enctype='multipart/form-data' method='post'>"
			+ "<div id='log_reply_content' style='padding-left:25px'>"
			+ "<input type ='hidden' id ='functions' name ='functions' value='3'>"
			// +"<input type ='hidden' id ='messageid' name ='messageid'
			// value='3'>"
			+ "<input type ='hidden' id ='parentMessageId' name ='parentMessageId' value='"
			+ document.getElementById("tempnewid").value
			+ "'>"
			+ "<input type ='hidden' id ='primarykeys' name ='primarykeys' value='"
			+ document.getElementById('primarykeys').value
			+ "'>"
			+ "<textarea name='replycontent' id='replycontent"
			+ document.getElementById("tempnewid").value
			+ newCode
			+ "' style='width:400px; height:100px;' onkeyup='warnCode(this.value)'></textarea>"
			+ "</div>"
			+ "<div id='log_reply_submit'>" 
			
			/**
			 * bug编号471 动态提示
			 * @author wangyf
			 * 2010-05-03
			 */
			+ "<div id='alertMsg'></div>"
			
			+"<div id='log_path'>"
			+ getResource('resourceParam1888')
			+ ": <input onkeypress='return false' type='file'  id='file"
			+ currMessageId
			+ newCode
			+ "' name='file'></div><div id='log_sub'><a href=javaScript:logReplyLevel3("
			+ newCode + ",'"
			+ document.getElementsByName("loginname")[0].value.toString()
			+ "','" + currMessageId + "','"
			+ document.getElementById("tempnewid").value + "')  >"
			+ getResource('resourceParam1857') + "</a></div></div>" + "</form>"
			+ "</div>"
			// + "</div>"
			+ "</div>";
	// 回添
	document.getElementById("testarea").value = ih1;

	reply_area.innerHTML = oldReplyArea + ih1 + logReplayAreaForm;
}



//三级回复提交
function logReplyLevel3(i, username, currMessageId, parentMessageId) {
	// alert(userid);
	// 三级回复区 div 名称
	var filename = "";
	var accoryStr = "";
	getNewFileId();
	// alert("1");
	var filepath = document.getElementById('file' + currMessageId + i).value;
	// alert("2");
	if ("" != filepath && null != filepath) {
		filename = filepath.substring(filepath.lastIndexOf("\\") + 1,
				filepath.length);
		accoryStr += "<a href='MessageFileDownLoadServlet?fileid="
				+ document.getElementById("tempnewfileid").value
				+ "'>"
				+ filename
				+ "</a><img src='images/patch.gif' alt='download' width='16' height='16' align='absmiddle' />";
	}

	// return;
	// alert("3");
	var level3ReplyContent = document.getElementById("replycontent"
			+ parentMessageId + i).value;
	// alert("4");
	if (level3ReplyContent.length == 0) {
		alert("" + getResource('resourceParam1886') + "");
		return;
	}
	if (level3ReplyContent.length > 500) {
		alert("" + getResource('resourceParam1885') + "");
		return;
	}
	// alert("4");
	var tempName = "log_c_reply_box" + currMessageId + i;
	var level3AreaHtml = document.getElementById(tempName);
	var newCode = level3AreaHtml.childNodes.length;
	var replyForm = document.getElementById("replayForm" + parentMessageId);
	replyForm.action = "logReply?fileid="
			+ document.getElementById("tempnewfileid").value
			+ "&loglevel=3&divid=" + currMessageId + newCode + "&accoryStr="
			+ accoryStr;
	replyForm.submit();
	document.getElementById("replycontent" + parentMessageId + i).value = "";
	document.getElementById('file' + currMessageId + i).outerHTML=" <input onkeypress='return false' type='file'  id='file"
			+ currMessageId
			+ i
			+ "' name='file'>"
	// 当前时间
	var currentDate = new Date();
	// 回复的内容

	// 回复区dIV 对象
	// alert("4");
	// var level3AreaHtml=document.getElementsByName(tempName)[0];

	// alert(newCode);
	var level3Reply = "<div id='replylevel3'><div id='log_c_reply_title' style=''><a href='javascript:void(0);'>"
			+ document.getElementsByName("loginname")[0].value
			+ "</a>&nbsp;"
			+ getResource('resourceParam1415')
			+ "&nbsp;"
			+ username
			+ "  <a href=javaScript:showAccory3('"
			+ currMessageId
			+ "','"
			+ newCode
			+ "');>"
			+ getResource('resourceParam982')
			+ "</a></div>"
			+ "<div id='log_c_reply_time' >"
			+ currentDate.toLocaleString()
			+ "</div>"
			// ////////
			+ "<div class='log_patch_list'  id='patch3"
			+ currMessageId
			+ newCode
			+ "' >"
			// + accoryStr
			+ ""
			+ getResource('resourceParam1887')
			+ ""
			+ "</div>"
			+ "<div id='log_c_reply_content' style=''>"
			+ level3ReplyContent
			+ "</div></div>";
	// alert(level3AreaHtml.innerHTML);
	// 回添
			
	level3AreaHtml.innerHTML = level3AreaHtml.innerHTML + level3Reply;
	/**
	 * 提交回复后把动态提示信息清除掉
	 */
	if(document.getElementById("remindMsg" + i + currMessageId + parentMessageId) == null || document.getElementById("remindMsg" + i + currMessageId + parentMessageId) === "undefined") {
  	} else {
  		document.getElementById("remindMsg" + i + currMessageId + parentMessageId).innerHTML = "";
  	}
}

function countDivByName(divName) {
	var temp = "'" + divName + "'";
	var i = 0;
	var alldiv = document.getElementsByTagName("div");
	for (var j = 0; j < alldiv.length; j++) {
		// alert(alldiv[j].name);
		if (alldiv[j].name == temp) {
			i = i + 1;
		}
	}
	return i;
}
function showDivObject(divObj) {
	document.getElementById(divObj).style.display = '';
}
function removeChildDiv(divOjb) {
	divOjb.parentNode.removeChild(divOjb);
}
function getOuterHtml(divObj) {
	divObj = divObj.cloneNode(true);
	var outer = document.createElement("DIV");
	outer.appendChild(divObj);
	return outer.innerHTML;
	// return divObj.outerHTML;
}
function replySucces(accoryStr, divid) {
	// var message = eval('(' + outString + ')');
	// alert(accoryStr);
	// alert(divid);
	document.getElementById(divid).innerHTML = accoryStr;
	// alert("后台传回的id"+message['messageid']);
}

/**
 * bug编号471 输入动态提示
 * @author wangyf
 * @param value
 * @return
 */
/********************************我的日志 动态提醒*************************************/
//三级回复
function warnThree(value, i, name, currMessageId, id) {
	var remindMsg = getWarnMsg(value);
	document.getElementById("remindMsg" + i + currMessageId + id).innerHTML = remindMsg;
}
//二级回复
function warnTwo(value, currMessageId) {
	var warnMsg = getWarnMsg(value);
	document.getElementById("warnMsg" + currMessageId).innerHTML = warnMsg;
}
//Common Method
function getWarnMsg(value) {
	var len = value.length;
	var alertMsg = "";
	if(len < 500) {
		alertMsg = "<font color='blue' size='2'>您还可以输入 " + (500 - len) + "字符！</font>";
	} else {
		alertMsg = "<font color='red' size='2'>您输入的字符已超过500，请酌情删减！</font>";
	}
	return alertMsg;
}



