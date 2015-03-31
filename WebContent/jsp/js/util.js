$(document).ready(function(){
     var options={
      beforeSubmit:showRequest,
      success:showResponse,
      iframe:true,
      type:'post',
      dataType:'json'    
     }
    
	 $.each(document.forms,function(i,n){
	     $('#'+n.id).submit(function(){
	        $(this).ajaxSubmit(options);
	         return false;
	     });
	 });
	 
     function showRequest(formData,jqForm,options) {
         var queryString=$.param(formData);
     }
     function showResponse(rtt,rtx) {
        var str="";
        var count=$("#all_count"+rtt.count).val();
        count++;
		document.getElementById("file"+rtt.count).outerHTML=document.getElementById("file"+rtt.count).outerHTML;
        if(rtt.jibie=="2")  {
           str+='<div id="log_reply'+rtt.level+'" class="log_reply">';
           str+='<div id="log_reply_box'+rtt.level+'" class="log_reply_box">';
           str+='<div id="log_comment_title'+rtt.level+'" class="log_comment_title">';
           str+='<a href="javascript:void(0);">'+rtt.loginusername+'</a>&nbsp;'+getResource('resourceParam1856')+'：&nbsp;';
           if(rtt.filename!="")
           {
           str+='<a href="javascript:void(0);" onclick="showPatch('+rtt.level+');">'+getResource('resourceParam982')+'</a><img src="images/pin2.png" alt="patch" width="16" height="16" border="0" align="absmiddle"/>';
           }
           str+='</div>';
		   str+='<div id="log_comment_time'+rtt.level+'" class="log_comment_time">';
		   str+=rtt.messagedate;
           str+='</div>';
		   str+='<div class="log_comment_patch_list" id="patch'+rtt.level+'">';
		   str+='<a href="../../MessageFileDownLoadServlet?fileid='+rtt.fileid+'">'+rtt.filename+'</a><img src="images/patch.gif" alt="download" width="16" height="16" align="absmiddle" />&nbsp;&nbsp;&nbsp;&nbsp;';
		   str+='</div>';
		   str+='<div id="log_comment_content'+rtt.level+'" class="log_comment_content">';
		   str+=rtt.messagebody;
		   str+='&nbsp;&nbsp;<span id="morereply'+rtt.level+'"></span>';
		   str+='</div>';
		   str+=' <div id="log_c_reply_box'+rtt.level+'" class="log_c_reply_box">';
		   str+='</div>';
		   str+=' <div id="reply'+rtt.level+'" class="reply"><a href="javascript:void(0);"';
           str+=' onclick="log_conents('+rtt.level+')">'+getResource('resourceParam1415')+'</a>';
           str+='</div>';
		   str+='</div>';
		   str+='</div>';
		 
	       str+='<form id="feedbackform'+rtt.level+'" name="feedbackform'+rtt.level+'" action="../../MessageReceiveServlet" method="POST" enctype="multipart/form-data" target="upload_iframe"> ';
           str+='<div id="log_reply_content'+rtt.level+'" class="log_reply_content">';
           str+='<textarea id="content'+rtt.level+'" name="content'+rtt.level+'" style="width: 400px; height: 100px;" onkeyup="warnMsg(this.value)></textarea>';
           str+='</div>';
           str+='<div id="log_reply_submit'+rtt.level+'" class="log_reply_submit">';
           str+='<div id="log_patch'+rtt.level+'" class="log_patch">';
           str+='<input type="file"';
           str+=' id="file'+rtt.level+'" name="file'+rtt.level+'" contenteditable="false"/>';
           str+='</div>';
           str+='<div id="log_sub'+rtt.level+'" class="log_sub">';
           str+='<a href="javascript:void(0);" onclick="clear_conents('+rtt.level+')">'+getResource('resourceParam557')+'</a>&nbsp;';
           str+='<a href="javascript:void(0);" onclick="add_context('+rtt.level+')">'+getResource('resourceParam1857')+'</a>';
           str+='</div>';
           str+='<input type="hidden" id="messageid'+rtt.level+'" name="messageid'+rtt.level+'" value="'+rtt.messageid+'"/>';
		   str+='<input type="hidden" id="userid'+rtt.level+'" name="userid'+rtt.level+'" value="'+rtt.loginuserid+'"/>';
		   str+='<input type="hidden" id="messagetype'+rtt.level+'" name="messagetype'+rtt.level+'" value="'+rtt.messagetype+'"/>';
           str+='<input type="hidden" id="truename'+rtt.level+'" name="truename'+rtt.level+'" value="'+rtt.truename+'"/>';
           str+='<input type="hidden" id="level'+rtt.level+'" name="level'+rtt.level+'" value="'+rtt.level+'"/>';
           str+='<input type="hidden" id="loginname'+rtt.level+'" name="loginname'+rtt.level+'" value="'+rtt.loginusername+'"/>';
           str+='<input type="hidden" id="loginid'+rtt.level+'" name="loginid'+rtt.level+'" value="'+rtt.loginuserid+'"/>';
           str+='<input type="hidden" id="all_count'+rtt.level+'" name="all_count'+rtt.level+'" value="'+count+'"/>';
           str+='</div>';
           str+='</form>';
           //几条回复信息
           $("#count_all"+rtt.count).text(count);
           //添加回复信息
           $("#reply"+rtt.count).append(str);
           //添加ID值的控制
           $("#all_count"+rtt.count).val(count);
           //提交表单
           $('#feedbackform'+rtt.level).submit(function(){
	             $(this).ajaxSubmit(options);
	             return false;
	        });
	       document.getElementById("allcontent"+rtt.count).value="";
        } else {
        	if(count!=0) {
        	 	var str_a='<a href="javascript:void(0);" onclick="more_message('+rtt.count+')">'+getResource('resourceParam1855')+'</a>';
             	$("#morereply"+rtt.count).html(str_a);
        	}
        	
        	$("#log_c_reply_box"+rtt.count).show();
	        log_c_reply_box = true;
        	var st=$("#log_c_reply_box"+rtt.count).html();
        	 str+='<div id="log_c_reply_title'+rtt.level+'" class="log_c_reply_title">';
		     str+='<a href="javascript:void(0);">'+rtt.loginusername+'</a>&nbsp;'+getResource('resourceParam1415')+'';
             str+=rtt.truename+'&nbsp;';
             if(rtt.filename!="")
             {
			 str+='<a href="javascript:void(0);" onclick="showPatch('+rtt.level+');">'+getResource('resourceParam982')+'</a><img src="images/pin2.png" alt="patch" width="16" height="16" border="0" align="absmiddle"/>';
             }
			 str+='</div>';
			 str+='<div id="log_c_reply_time'+rtt.level+'" class="log_c_reply_time">';
			 str+=rtt.messagedate;
			 str+='</div>';
			 str+='<div class="log_c_reply_patch_list" id="patch'+rtt.level+'">';
             str+='<a href="../../MessageFileDownLoadServlet?fileid='+rtt.fileid+'">'+rtt.filename+'</a><img src="images/patch.gif" alt="download" width="16" height="16" align="absmiddle" />&nbsp;&nbsp;&nbsp;&nbsp;';
             str+='</div>';
             str+='<div id="log_c_reply_content'+rtt.level+'" class="log_c_reply_content">';
             str+=rtt.messagebody;
             str+='</div>';
            
             $("#log_c_reply_box"+rtt.count).html(st+str);
             $("#all_count"+rtt.count).val(count);
              document.getElementById("content"+rtt.count).value="";
        }
     }
   });
	var reply_display = true;
	var patch_display = true;
	var log_reply_content = true;
	var log_reply_submit = true;
	var log_c_reply_box = true;
	var a_showPatch=true;
	var b_showPatch=true;
function showReply(n,messageid) { 
	  if(reply_display)
	  {
	  	$("#reply"+n).show();
	  	$("#log_reply_all_content"+n).show();
	  	$("#log_reply_all_submit"+n).show();
	  	reply_display = false;
	  	Seam.Component.getInstance("messagereceive_MessageReceiveRemote").updateLeafMessageStatus(messageid,function(){});
	  }
	  else  
	  { 
	    $("#reply"+n).hide();
	  	$("#log_reply_all_content"+n).hide();
	  	$("#log_reply_all_submit"+n).hide();
	  	reply_display = true;
	  	//反馈
	  	if(document.getElementById("warnFeedBackOne") == null || document.getElementById("warnFeedBackOne") === "undefined") {
	  	} else {
	  		document.getElementById("warnFeedBackOne").innerHTML = "";
	  		document.getElementById("warnFeedBackOne").value = "";
	  	}
	  	if(document.getElementById("warnFeedBackTwo") == null || document.getElementById("warnFeedBackTwo") === "undefined") {
	  	} else {
	  		document.getElementById("warnFeedBackTwo").innerHTML = "";
	  	}
	  	if(document.getElementById("warnFeedBackReplyOne") == null || document.getElementById("warnFeedBackReplyOne") === "undefined") {
	  	} else {
	  		document.getElementById("warnFeedBackReplyOne").innerHTML = "";
	  	}
	  	if(document.getElementById("warnFeedBackReplyTwo") == null || document.getElementById("warnFeedBackReplyTwo") === "undefined") {
	  	} else {
	  		document.getElementById("warnFeedBackReplyTwo").innerHTML = "";
	  	}
		//提醒	  	
	  	if(document.getElementById("warnThatOne") == null || document.getElementById("warnThatOne") === "undefined") {
	  	} else {
	  		document.getElementById("warnThatOne").innerHTML = "";
	  	}
	  	if(document.getElementById("warnThatTwo") == null || document.getElementById("warnThatTwo") === "undefined") {
	  	} else {
	  		document.getElementById("warnThatTwo").innerHTML = "";
	  	}
	  	if(document.getElementById("warnThatThree") == null || document.getElementById("warnThatThree") === "undefined") {
	  	} else {
	  		document.getElementById("warnThatThree").innerHTML = "";
	  	}
	  	if(document.getElementById("warnThatFour") == null || document.getElementById("warnThatFour") === "undefined") {
	  	} else {
	  		document.getElementById("warnThatFour").innerHTML = "";
	  	}
	  	//调整
	  	if(document.getElementById("warnAdjustOne") == null || document.getElementById("warnAdjustOne") === "undefined") {
	  	} else {
	  		document.getElementById("warnAdjustOne").innerHTML = "";
	  	}
	  	if(document.getElementById("warnAdjustTwo") == null || document.getElementById("warnAdjustTwo") === "undefined") {
	  	} else {
	  		document.getElementById("warnAdjustTwo").innerHTML = "";
	  	}
	  	if(document.getElementById("warnAdjustThree") == null || document.getElementById("warnAdjustThree") === "undefined") {
	  	} else {
	  		document.getElementById("warnAdjustThree").innerHTML = "";
	  	}
	  	if(document.getElementById("warnAdjustFour") == null || document.getElementById("warnAdjustFour") === "undefined") {
	  	} else {
	  		document.getElementById("warnAdjustFour").innerHTML = "";
	  	}
	  	//日志
	  	if(document.getElementById("warnWorkOne") == null || document.getElementById("warnWorkOne") === "undefined") {
	  	} else {
	  		document.getElementById("warnWorkOne").innerHTML = "";
	  	}
	  	if(document.getElementById("warnWorkTwo") == null || document.getElementById("warnWorkTwo") === "undefined") {
	  	} else {
	  		document.getElementById("warnWorkTwo").innerHTML = "";
	  	}
	  }
	  
}

function showPatch(n) { 
	  if(patch_display) { 
	  	$("#patch"+n).show(); patch_display = false;
	  } else {   
	  	$("#patch"+n).hide(); patch_display = true;
	  }
}

function more_message(n)
{
   if(log_c_reply_box)
    { $("#log_c_reply_box"+n).show(); log_c_reply_box = false;}
	  else  
	  { $("#log_c_reply_box"+n).hide(); log_c_reply_box = true;}
	
}

function log_conents(n) {
	if(log_reply_content) {
		$("#log_reply_content"+n).show();
		$("#log_reply_submit"+n).show();
		log_reply_content=false;
        document.getElementById("content"+n).value="";
        if(document.getElementById("file"+n) == null || document.getElementById("file"+n) === 'undefined') {
        } else {
        	document.getElementById("file"+n).outerHTML=document.getElementById("file"+n).outerHTML;	
        }
	} else {
	   $("#log_reply_content"+n).hide();
	   $("#log_reply_submit"+n).hide();
	   log_reply_content = true;
	     /**
		 * bug编号471 wangyf
		 * 2011-05-12
	     */
		/********************************Begin***************************/
	   //反馈回复
	   if(document.getElementById("warnFeedBackThree"+n) == null || document.getElementById("warnFeedBackThree"+n) === "undefined") {
	   } else {
  			document.getElementById("warnFeedBackThree"+n).innerHTML = "";
	   }
	   if(document.getElementById("warnFeedBackFour"+n) == null || document.getElementById("warnFeedBackFour"+n) === "undefined") {
	   } else {
  			document.getElementById("warnFeedBackFour"+n).innerHTML = "";
	   }
	   if(document.getElementById("warnFeedBackReplyThree"+n) == null || document.getElementById("warnFeedBackReplyThree"+n) === "undefined") {
	   } else {
	  		document.getElementById("warnFeedBackReplyThree"+n).innerHTML = "";
	   }
	   if(document.getElementById("warnFeedBackReplyFour"+n) == null || document.getElementById("warnFeedBackReplyFour"+n) === "undefined") {
	   } else {
	    	document.getElementById("warnFeedBackReplyFour"+n).innerHTML = "";
	   }
	   //调整回复
	   if(document.getElementById("warnAdjustReplyOne" + n) == null || document.getElementById("warnAdjustReplyOne" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnAdjustReplyOne" + n).innerHTML = "";
	   }
	   if(document.getElementById("warnAdjustReplyTwo" + n) == null || document.getElementById("warnAdjustReplyTwo" + n) === "undefined") {
	   } else {
	   		document.getElementById("warnAdjustReplyTwo" + n).innerHTML = "";
	   }
	   if(document.getElementById("warnAdjustReplyThree" + n) == null || document.getElementById("warnAdjustReplyThree" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnAdjustReplyThree" + n).innerHTML = "";
	   }
	   if(document.getElementById("warnAdjustReplyFour" + n) == null || document.getElementById("warnAdjustReplyFour" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnAdjustReplyFour").innerHTML = "";
	   }
	   //提醒回复
	   if(document.getElementById("warnThatReplyOne" + n) == null || document.getElementById("warnThatReplyOne" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnThatReplyOne" + n).innerHTML = "";
	   }
	   if(document.getElementById("warnThatReplyTwo" + n) == null || document.getElementById("warnThatReplyTwo" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnThatReplyTwo" + n).innerHTML = "";
	   }
	   if(document.getElementById("warnThatReplyThree" + n) == null || document.getElementById("warnThatReplyThree" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnThatReplyThree" + n).innerHTML = "";
	   }
	   if(document.getElementById("warnThatReplyFour" + n) == null || document.getElementById("warnThatReplyFour" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnThatReplyFour" + n).innerHTML = "";
	   }
	   //日志回复
	   if(document.getElementById("warnWorkReplyOne" + n) == null || document.getElementById("warnWorkReplyOne" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnWorkReplyOne" + n).innerHTML = "";
	   }
	   if(document.getElementById("warnWorkReplyTwo" + n) == null || document.getElementById("warnWorkReplyTwo" + n) === "undefined") {
	   } else {
	  		document.getElementById("warnWorkReplyTwo" + n).innerHTML = "";
	   }
	   /********************************End***************************/
	}
}
function clear_conents(n)
{
    document.getElementById("content"+n).value="";
	document.getElementById("file"+n).outerHTML=document.getElementById("file"+n).outerHTML;
	document.getElementById("content"+n).focus();
	/**
	 * bug编号471 wangyf
	 * 2011-05-12
     */
	/********************************Begin***************************/
	//反馈
//	  	if(document.getElementById("warnFeedBackOne") == null || document.getElementById("warnFeedBackOne") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnFeedBackOne").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnFeedBackTwo") == null || document.getElementById("warnFeedBackTwo") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnFeedBackTwo").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnFeedBackReplyOne") == null || document.getElementById("warnFeedBackReplyOne") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnFeedBackReplyOne").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnFeedBackReplyTwo") == null || document.getElementById("warnFeedBackReplyTwo") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnFeedBackReplyTwo").innerHTML = "";
//	  	}
  	if(document.getElementById("warnFeedBackThree"+n) == null || document.getElementById("warnFeedBackThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackFour"+n) == null || document.getElementById("warnFeedBackFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackFour"+n).innerHTML = "";
  	}
	if(document.getElementById("warnFeedBackReplyThree"+n) == null || document.getElementById("warnFeedBackReplyThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackReplyFour"+n) == null || document.getElementById("warnFeedBackReplyFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyFour"+n).innerHTML = "";
  	}
		//提醒	  	
//	  	if(document.getElementById("warnThatOne") == null || document.getElementById("warnThatOne") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnThatOne").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnThatTwo") == null || document.getElementById("warnThatTwo") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnThatTwo").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnThatThree") == null || document.getElementById("warnThatThree") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnThatThree").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnThatFour") == null || document.getElementById("warnThatFour") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnThatFour").innerHTML = "";
//	  	}
  	if(document.getElementById("warnThatReplyOne"+n) == null || document.getElementById("warnThatReplyOne"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyOne"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnThatReplyTwo"+n) == null || document.getElementById("warnThatReplyTwo"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyTwo"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnThatReplyThree"+n) == null || document.getElementById("warnThatReplyThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnThatReplyFour"+n) == null || document.getElementById("warnThatReplyFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyFour"+n).innerHTML = "";
  	}
	  	//调整
//	  	if(document.getElementById("warnAdjustOne") == null || document.getElementById("warnAdjustOne") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnAdjustOne").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnAdjustTwo") == null || document.getElementById("warnAdjustTwo") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnAdjustTwo").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnAdjustThree") == null || document.getElementById("warnAdjustThree") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnAdjustThree").innerHTML = "";
//	  	}
//	  	if(document.getElementById("warnAdjustFour") == null || document.getElementById("warnAdjustFour") === "undefined") {
//	  	} else {
//	  		document.getElementById("warnAdjustFour").innerHTML = "";
//	  	}
  	if(document.getElementById("warnAdjustReplyOne"+n) == null || document.getElementById("warnAdjustReplyOne"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyOne"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustReplyTwo"+n) == null || document.getElementById("warnAdjustReplyTwo"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyTwo"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustReplyThree"+n) == null || document.getElementById("warnAdjustReplyThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustReplyFour"+n) == null || document.getElementById("warnAdjustReplyFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyFour"+n).innerHTML = "";
  	}
  	//日志
//  	if(document.getElementById("warnWorkOne") == null || document.getElementById("warnWorkOne") === "undefined") {
//  	} else {
//  		document.getElementById("warnWorkOne").innerHTML = "";
//  	}
//  	if(document.getElementById("warnWorkTwo") == null || document.getElementById("warnWorkTwo") === "undefined") {
//  	} else {
//  		document.getElementById("warnWorkTwo").innerHTML = "";
//  	}
  	if(document.getElementById("warnWorkReplyOne"+n) == null || document.getElementById("warnWorkReplyOne"+n) === "undefined") {
  	} else {
  		document.getElementById("warnWorkReplyOne"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnWorkReplyTwo"+n) == null || document.getElementById("warnWorkReplyTwo"+n) === "undefined") {
  	} else {
  		document.getElementById("warnWorkReplyTwo"+n).innerHTML = "";
  	}
  	/********************************Begin***************************/
}

function clear_all_conents(n)
{
	document.getElementById("allcontent"+n).value="";
	document.getElementById("file"+n).outerHTML=document.getElementById("file"+n).outerHTML;
	document.getElementById("allcontent"+n).focus();
	
	/**
	 * bug编号471 wangyf
	 * 2011-05-12
	 */
	/********************************Begin***************************/
	//反馈
  	if(document.getElementById("warnFeedBackOne") == null || document.getElementById("warnFeedBackOne") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackOne").innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackTwo") == null || document.getElementById("warnFeedBackTwo") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackTwo").innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackReplyOne") == null || document.getElementById("warnFeedBackReplyOne") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyOne").innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackReplyTwo") == null || document.getElementById("warnFeedBackReplyTwo") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyTwo").innerHTML = "";
  	}
	//提醒	  	
  	if(document.getElementById("warnThatOne") == null || document.getElementById("warnThatOne") === "undefined") {
  	} else {
  		document.getElementById("warnThatOne").innerHTML = "";
  	}
  	if(document.getElementById("warnThatTwo") == null || document.getElementById("warnThatTwo") === "undefined") {
  	} else {
  		document.getElementById("warnThatTwo").innerHTML = "";
  	}
  	if(document.getElementById("warnThatThree") == null || document.getElementById("warnThatThree") === "undefined") {
  	} else {
  		document.getElementById("warnThatThree").innerHTML = "";
  	}
  	if(document.getElementById("warnThatFour") == null || document.getElementById("warnThatFour") === "undefined") {
  	} else {
  		document.getElementById("warnThatFour").innerHTML = "";
  	}
  	//调整
  	if(document.getElementById("warnAdjustOne") == null || document.getElementById("warnAdjustOne") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustOne").innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustTwo") == null || document.getElementById("warnAdjustTwo") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustTwo").innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustThree") == null || document.getElementById("warnAdjustThree") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustThree").innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustFour") == null || document.getElementById("warnAdjustFour") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustFour").innerHTML = "";
  	}
  	//日志
  	if(document.getElementById("warnWorkOne") == null || document.getElementById("warnWorkOne") === "undefined") {
  	} else {
  		document.getElementById("warnWorkOne").innerHTML = "";
  	}
  	if(document.getElementById("warnWorkTwo") == null || document.getElementById("warnWorkTwo") === "undefined") {
  	} else {
  		document.getElementById("warnWorkTwo").innerHTML = "";
  	}
  	/********************************End***************************/
}

function add_context(n)
{
	
	var cont=$("#content"+n).val().length;
	if(cont<=0)
	{
		alert("请"+getResource('resourceParam494')+"要"+getResource('resourceParam471')+"的内容！");
		return ;
	}else if(cont>500)
	{
       alert(""+getResource('resourceParam1854')+"");	
       return ;
	}
	else{
	$("#feedbackform"+n).submit();
	}
	/**
	 * bug编号471 wangyf
	 * 2011-05-12
	 */
	/********************************Begin***************************/
	//反馈
//  	if(document.getElementById("warnFeedBackOne") == null || document.getElementById("warnFeedBackOne") === "undefined") {
//  	} else {
//  		document.getElementById("warnFeedBackOne").innerHTML = "";
//  	}
//  	if(document.getElementById("warnFeedBackTwo") == null || document.getElementById("warnFeedBackTwo") === "undefined") {
//  	} else {
//  		document.getElementById("warnFeedBackTwo").innerHTML = "";
//  	}
//  	if(document.getElementById("warnFeedBackReplyOne") == null || document.getElementById("warnFeedBackReplyOne") === "undefined") {
//  	} else {
//  		document.getElementById("warnFeedBackReplyOne").innerHTML = "";
//  	}
//  	if(document.getElementById("warnFeedBackReplyTwo") == null || document.getElementById("warnFeedBackReplyTwo") === "undefined") {
//  	} else {
//  		document.getElementById("warnFeedBackReplyTwo").innerHTML = "";
//  	}
  	if(document.getElementById("warnFeedBackThree"+n) == null || document.getElementById("warnFeedBackThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackFour"+n) == null || document.getElementById("warnFeedBackFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackFour"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackReplyThree"+n) == null || document.getElementById("warnFeedBackReplyThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackReplyFour"+n) == null || document.getElementById("warnFeedBackReplyFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyFour"+n).innerHTML = "";
  	}
	//提醒	  	
//  	if(document.getElementById("warnThatOne") == null || document.getElementById("warnThatOne") === "undefined") {
//  	} else {
//  		document.getElementById("warnThatOne").innerHTML = "";
//  	}
//  	if(document.getElementById("warnThatTwo") == null || document.getElementById("warnThatTwo") === "undefined") {
//  	} else {
//  		document.getElementById("warnThatTwo").innerHTML = "";
//  	}
//  	if(document.getElementById("warnThatThree") == null || document.getElementById("warnThatThree") === "undefined") {
//  	} else {
//  		document.getElementById("warnThatThree").innerHTML = "";
//  	}
//  	if(document.getElementById("warnThatFour") == null || document.getElementById("warnThatFour") === "undefined") {
//  	} else {
//  		document.getElementById("warnThatFour").innerHTML = "";
//  	}
  	if(document.getElementById("warnThatReplyOne"+n) == null || document.getElementById("warnThatReplyOne"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyOne"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnThatReplyTwo"+n) == null || document.getElementById("warnThatReplyTwo"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyTwo"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnThatReplyThree"+n) == null || document.getElementById("warnThatReplyThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnThatReplyFour"+n) == null || document.getElementById("warnThatReplyFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnThatReplyFour"+n).innerHTML = "";
  	}
  	//调整
//  	if(document.getElementById("warnAdjustOne") == null || document.getElementById("warnAdjustOne") === "undefined") {
//  	} else {
//  		document.getElementById("warnAdjustOne").innerHTML = "";
//  	}
//  	if(document.getElementById("warnAdjustTwo") == null || document.getElementById("warnAdjustTwo") === "undefined") {
//  	} else {
//  		document.getElementById("warnAdjustTwo").innerHTML = "";
//  	}
//  	if(document.getElementById("warnAdjustThree") == null || document.getElementById("warnAdjustThree") === "undefined") {
//  	} else {
//  		document.getElementById("warnAdjustThree").innerHTML = "";
//  	}
//  	if(document.getElementById("warnAdjustFour") == null || document.getElementById("warnAdjustFour") === "undefined") {
//  	} else {
//  		document.getElementById("warnAdjustFour").innerHTML = "";
//  	}
  	if(document.getElementById("warnAdjustReplyOne"+n) == null || document.getElementById("warnAdjustReplyOne"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyOne"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustReplyTwo"+n) == null || document.getElementById("warnAdjustReplyTwo"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyTwo"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustReplyThree"+n) == null || document.getElementById("warnAdjustReplyThree"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyThree"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustReplyFour"+n) == null || document.getElementById("warnAdjustReplyFour"+n) === "undefined") {
  	} else {
  		document.getElementById("warnAdjustReplyFour"+n).innerHTML = "";
  	}
  	//日志
//  	if(document.getElementById("warnWorkOne") == null || document.getElementById("warnWorkOne") === "undefined") {
//  	} else {
//  		document.getElementById("warnWorkOne").innerHTML = "";
//  	}
//  	if(document.getElementById("warnWorkTwo") == null || document.getElementById("warnWorkTwo") === "undefined") {
//  	} else {
//  		document.getElementById("warnWorkTwo").innerHTML = "";
//  	}
  	if(document.getElementById("warnWorkReplyOne"+n) == null || document.getElementById("warnWorkReplyOne"+n) === "undefined") {
  	} else {
  		document.getElementById("warnWorkReplyOne"+n).innerHTML = "";
  	}
  	if(document.getElementById("warnWorkReplyTwo"+n) == null || document.getElementById("warnWorkReplyTwo"+n) === "undefined") {
  	} else {
  		document.getElementById("warnWorkReplyTwo"+n).innerHTML = "";
  	}
  	/********************************End***************************/
}


function add_all_context(n)
{   
    var cont=$("#allcontent"+n).val().length;
	if(cont<=0)
	{
		alert("请"+getResource('resourceParam494')+"要"+getResource('resourceParam471')+"的内容！");
		return ;
	}else if(cont>500)
	{
       alert(""+getResource('resourceParam1854')+"");	
       return ;
	}else
	{
    $("#feedbackform"+n).submit();
	}
	/**
	 * bug编号471 wangyf
	 * 2011-05-12
	 */
	/********************************Begin***************************/
	//反馈
  	if(document.getElementById("warnFeedBackOne") == null || document.getElementById("warnFeedBackOne") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackOne").innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackTwo") == null || document.getElementById("warnFeedBackTwo") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackTwo").innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackReplyOne") == null || document.getElementById("warnFeedBackReplyOne") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyOne").innerHTML = "";
  	}
  	if(document.getElementById("warnFeedBackReplyTwo") == null || document.getElementById("warnFeedBackReplyTwo") === "undefined") {
  	} else {
  		document.getElementById("warnFeedBackReplyTwo").innerHTML = "";
  	}
	//提醒	  	
  	if(document.getElementById("warnThatOne") == null || document.getElementById("warnThatOne") === "undefined") {
  	} else {
  		document.getElementById("warnThatOne").innerHTML = "";
  	}
  	if(document.getElementById("warnThatTwo") == null || document.getElementById("warnThatTwo") === "undefined") {
  	} else {
  		document.getElementById("warnThatTwo").innerHTML = "";
  	}
  	if(document.getElementById("warnThatThree") == null || document.getElementById("warnThatThree") === "undefined") {
  	} else {
  		document.getElementById("warnThatThree").innerHTML = "";
  	}
  	if(document.getElementById("warnThatFour") == null || document.getElementById("warnThatFour") === "undefined") {
  	} else {
  		document.getElementById("warnThatFour").innerHTML = "";
  	}
  	//调整
  	if(document.getElementById("warnAdjustOne") == null || document.getElementById("warnAdjustOne") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustOne").innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustTwo") == null || document.getElementById("warnAdjustTwo") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustTwo").innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustThree") == null || document.getElementById("warnAdjustThree") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustThree").innerHTML = "";
  	}
  	if(document.getElementById("warnAdjustFour") == null || document.getElementById("warnAdjustFour") === "undefined") {
  	} else {
  		document.getElementById("warnAdjustFour").innerHTML = "";
  	}
  	//日志
  	if(document.getElementById("warnWorkOne") == null || document.getElementById("warnWorkOne") === "undefined") {
  	} else {
  		document.getElementById("warnWorkOne").innerHTML = "";
  	}
  	if(document.getElementById("warnWorkTwo") == null || document.getElementById("warnWorkTwo") === "undefined") {
  	} else {
  		document.getElementById("warnWorkTwo").innerHTML = "";
  	}
  	/********************************End***************************/
}
function showInnertext(){
	  window.alert(document.getElementById("log_patch_list").innerHTML);
}


/**
 * bug编号471 wangyf	
 * 2011-5-12
 * @param {} value
 */
/*****************************Begin************************************/
//反馈回复 —— begin
function warnFeedBackOne(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackOne").innerHTML = alertMsg;
}
function warnFeedBackTwo(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackTwo").innerHTML = alertMsg;
}
function warnFeedBackThree(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackThree"+n).innerHTML = alertMsg;
}
function warnFeedBackFour(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackFour"+n).innerHTML = alertMsg;
}
function warnFeedBackReplyOne(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackReplyOne").innerHTML = alertMsg;
}
function warnFeedBackReplyTwo(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackReplyTwo").innerHTML = alertMsg;
}
function warnFeedBackReplyThree(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackReplyThree"+n).innerHTML = alertMsg;
}
function warnFeedBackReplyFour(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnFeedBackReplyFour"+n).innerHTML = alertMsg;
}
//反馈回复 —— end

//工作日志输入动态提示  —— begin
function warnWorkOne(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnWorkOne").innerHTML = alertMsg;
}
function warnWorkTwo(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnWorkTwo").innerHTML = alertMsg;
}
function warnWorkReplyOne(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnWorkReplyOne"+n).innerHTML = alertMsg;
}
function warnWorkReplyTwo(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnWorkReplyTwo"+n).innerHTML = alertMsg;
}
//工作日志输入动态提示  —— end
//调整任务动态提示 ——　begin
function warnAdjustOne(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustOne").innerHTML = alertMsg;
}
function warnAdjustTwo(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustTwo").innerHTML = alertMsg;
}
function warnAdjustThree(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustThree").innerHTML = alertMsg;
}
function warnAdjustFour(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustFour").innerHTML = alertMsg;
}
function warnAdjustReplyOne(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustReplyOne"+n).innerHTML = alertMsg;
}
function warnAdjustReplyTwo(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustReplyTwo"+n).innerHTML = alertMsg;
}
function warnAdjustReplyThree(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustReplyThree"+n).innerHTML = alertMsg;
}
function warnAdjustReplyFour(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnAdjustReplyFour"+n).innerHTML = alertMsg;
}
//调整任务动态提示 ——　end

//提醒动态提示 ——　begin
function warnThatOne(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatOne").innerHTML = alertMsg;
}
function warnThatTwo(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatTwo").innerHTML = alertMsg;
}
function warnThatThree(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatThree").innerHTML = alertMsg;
}
function warnThatFour(value) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatFour").innerHTML = alertMsg;
}
function warnThatReplyOne(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatReplyOne"+n).innerHTML = alertMsg;
}
function warnThatReplyTwo(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatReplyTwo"+n).innerHTML = alertMsg;
}
function warnThatReplyThree(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatReplyThree"+n).innerHTML = alertMsg;
}
function warnThatReplyFour(value, n) {
	var alertMsg = getWarnMsg(value);
	document.getElementById("warnThatReplyFour"+n).innerHTML = alertMsg;
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
//提醒动态提示 ——　end
/*****************************End************************************/


