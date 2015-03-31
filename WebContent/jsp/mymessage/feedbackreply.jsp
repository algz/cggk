<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>

<%@ taglib uri="http://richfaces.org/a4j" prefix="a4j"%>
<%@ taglib uri="http://richfaces.org/rich" prefix="rich"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script src="../base/basejsp.js" type="text/javascript">
	
</script>
</head>
<body oncontextmenu="self.event.returnValue=false" >
 <div >
   <%=session.getAttribute("resourceParam_1880")%>|
<a href="mymessageMain.seam" style="text-decoration: none"  ><%=session.getAttribute("resourceParam_450")%></a>
   <br/>
   <hr/>
   </div>
<f:view>
	<div id="log_list" class="log_list">
<!--1级<%=session.getAttribute("resourceParam_1863")%>start	-->
      <rich:dataTable var="news" value="#{messageList}">
		<rich:column>
			<div id="log_box<h:outputText value="#{news.level}" />" class="log_box">
                <div id="log_title<h:outputText value="#{news.level}" />" class="log_title">
                   <a href="javascript:void(0);"><h:outputText value="#{news.truename}" /></a> 提出一<%=session.getAttribute("resourceParam_539")%>对<%=session.getAttribute("resourceParam_1864")%>[<font color="red"><h:outputText value="#{news.taskname}" /></font>]的<%=session.getAttribute("resourceParam_1867")%>
                   <a href="feedbackrdetails.seam?messageid=<h:outputText value="#{news.messageid}" />&status=<h:outputText value="#{messageReceiveVo.allstatus}" />"><h:outputText value="#{news.messagetitle}" /></a>&nbsp; 
                   <h:outputText value="#{news.seeAnnex}" escape="false"/>
                </div>
                <div id="log_time<h:outputText value="#{news.level}" />" class="log_time">
                     <h:outputText value="#{news.messagedate}" />
                </div>
			    <div class="log_patch_list" id="patch<h:outputText value="#{news.level}" />">
                     <h:outputText value="#{news.filenames}" escape="false"/>
                </div>
                <div id="log_brief<h:outputText value="#{news.level}" />" class="log_brief">
                    <h:outputText  value="#{news.messagebody}" escape="false"/>
                </div>
			    <div id="log_link1<h:outputText value="#{news.level}" />" class="log_link1">
			        <a href="feedbackrdetails.seam?messageid=<h:outputText value="#{news.messageid}" />&status=<h:outputText value="#{messageReceiveVo.allstatus}" />"><%=session.getAttribute("resourceParam_1860")%>&gt;&gt;</a>
                </div>
			    <div id="log_link2<h:outputText value="#{news.level}" />" class="log_link2">
                    <a href="javascript:void(0);"	onclick="showReply('<h:outputText value="#{news.level}"/>','<h:outputText value="#{news.messageid}"/>');">
                    <span id="count_all<h:outputText value="#{news.level}"/>">
                      <h:outputText value="#{news.all_count}"/></span><%=session.getAttribute("resourceParam_1862")%></a>
                </div>

          
            <!-- 2级文章<%=session.getAttribute("resourceParam_1869")%>区域 start-->
			   <div class="reply_area" id="reply<h:outputText value="#{news.level}"/>">
			         <rich:dataTable id="table2" value="#{news.messageInBoxNewsVo}" var="leafnews">
	                  <rich:column>
                        <div id="log_reply<h:outputText value="#{leafnews.level}"/>" class="log_reply">
                            <div id="log_reply_box<h:outputText value="#{leafnews.level}"/>" class="log_reply_box">
                                 <div id="log_comment_title<h:outputText value="#{leafnews.level}"/>" class="log_comment_title">
                                     <a href="javascript:void(0);"><h:outputText value="#{leafnews.truename}"/></a>&nbsp;<%=session.getAttribute("resourceParam_1861")%>：&nbsp;
                                     <h:outputText value="#{leafnews.seeAnnex}" escape="false"/>
                                 </div>
				                 <div id="log_comment_time<h:outputText value="#{leafnews.level}"/>" class="log_comment_time">
				                     <h:outputText value="#{leafnews.messagedate}"/>
                                 </div>
				                 <div class="log_comment_patch_list" id="patch<h:outputText value="#{leafnews.level}"/>">
				                    <h:outputText value="#{leafnews.filenames}" escape="false"/>
				                </div>
				                <div id="log_comment_content<h:outputText value="#{leafnews.level}"/>" class="log_comment_content">
				                   <h:outputText value="#{leafnews.messagebody}" escape="false"/>
				                   <span id="morereply<h:outputText value="#{leafnews.level}"/>">
		                           <h:panelGroup id="panelgropu" rendered="#{leafnews.all_count>0}">
		                                <a href="javascript:void(0);" onclick="more_message(<h:outputText value="#{leafnews.level}"/>)"><%=session.getAttribute("resourceParam_1858")%></a>
	                               </h:panelGroup>
	                               </span>
                                </div>
				           <!--3级<%=session.getAttribute("resourceParam_1868")%><%=session.getAttribute("resourceParam_1869")%> start-->
				              
				               <div id="log_c_reply_box<h:outputText value="#{leafnews.level}"/>" class="log_c_reply_box">
							   <rich:dataTable id="table3" value="#{leafnews.messageInBoxNewsVo}" var="leafs">
		                           <rich:column>
							         <div id="log_c_reply_title<h:outputText value="#{leafs.level}"/>" class="log_c_reply_title">
							              <a href="javascript:void(0);"><h:outputText value="#{leafs.truename}"/></a>&nbsp;<%=session.getAttribute("resourceParam_1869")%>
                                          <h:outputText value="#{leafnews.truename}"/>&nbsp;
						                  <h:outputText value="#{leafs.seeAnnex}" escape="false"/>
						             </div>
							         <div id="log_c_reply_time<h:outputText value="#{leafs.level}"/>" class="log_c_reply_time">
							              <h:outputText value="#{leafs.messagedate}"/>
							        </div>
                                    <div class="log_c_reply_patch_list" id="patch<h:outputText value="#{leafs.level}"/>">
                                          <h:outputText value="#{leafs.filenames}" escape="false"/>
                                    </div>
                                    <div id="log_c_reply_content<h:outputText value="#{leafs.level}"/>" class="log_c_reply_content">
                                          <h:outputText value="#{leafs.messagebody}" escape="false"/>
                                    </div>
                                 </rich:column>
			                 </rich:dataTable>
								</div>
								   <!--3级<%=session.getAttribute("resourceParam_1868")%><%=session.getAttribute("resourceParam_1869")%>  end-->
                                <div id="reply<h:outputText value="#{leafnews.level}"/>" class="reply"><a href="javascript:void(0);"
                                    onclick="log_conents(<h:outputText value="#{leafnews.level}"/>)"><%=session.getAttribute("resourceParam_1869")%></a>
                                </div>
						  </div>
		  			 </div>
	         <form id="feedbackform<h:outputText value="#{leafnews.level}" />" name="feedbackform<h:outputText value="#{leafnews.level}" />" action="../../MessageReceiveServlet" method="post" enctype="multipart/form-data" target="upload_iframe"> 
                    <div id="log_reply_content<h:outputText value="#{leafnews.level}"/>" class="log_reply_content">
                    	<!-- bug编号471 wangyf 2011-05-12 -->
                       <textarea id="content<h:outputText value="#{leafnews.level}"/>" name="content<h:outputText value="#{leafnews.level}"/>" 
                       		 style="width: 400px; height: 100px;" onkeyup="warnFeedBackReplyFour(this.value, <h:outputText value="#{leafnews.level}"/>)"></textarea>
                    	<div id="warnFeedBackReplyFour<h:outputText value="#{leafnews.level}"/>"></div>
                    </div>
                    <div id="log_reply_submit<h:outputText value="#{leafnews.level}"/>" class="log_reply_submit">
                        
                        <div id="log_patch<h:outputText value="#{leafnews.level}"/>" class="log_patch">
                        <input type='file' contenteditable='false'
                            id='file<h:outputText value="#{leafnews.level}"/>' name='file<h:outputText value="#{leafnews.level}"/>'/>
                        </div>
                        <div id="log_sub<h:outputText value="#{leafnews.level}"/>" class="log_sub">
                        <a href="javascript:void(0);" onclick="clear_conents(<h:outputText value="#{leafnews.level}"/>)"><%=session.getAttribute("resourceParam_1866")%></a>&nbsp;
                        <a href="javascript:void(0);" onclick="add_context(<h:outputText value="#{leafnews.level}"/>)"><%=session.getAttribute("resourceParam_1865")%></a>
                       </div>
                       <input type="hidden" id="messageid<h:outputText value="#{leafnews.level}" />" name="messageid<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{leafnews.messageid}" />"/>
			           <input type="hidden" id="userid<h:outputText value="#{leafnews.level}" />" name="userid<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{leafnews.userid}" />"/>
			           <input type="hidden" id="messagetype<h:outputText value="#{leafnews.level}" />" name="messagetype<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{leafnews.messagetype}" />"/>
                       <input type="hidden" id="truename<h:outputText value="#{leafnews.level}" />" name="truename<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{leafnews.truename}" />"/>
                       <input type="hidden" id="level<h:outputText value="#{leafnews.level}" />" name="level<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{leafnews.level}" />"/>
                       <input type="hidden" id="loginname<h:outputText value="#{leafnews.level}" />" name="loginname<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{guser.truename}" />"/>
                       <input type="hidden" id="loginid<h:outputText value="#{leafnews.level}" />" name="loginid<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{guser.userid}" />"/>
                       <input type="hidden" id="all_count<h:outputText value="#{leafnews.level}" />" name="all_count<h:outputText value="#{leafnews.level}" />" value="<h:outputText value="#{leafnews.all_count}" />"/>
                    </div>
              </form>
				</rich:column>
	          </rich:dataTable>
			</div>
		   <!-- 2级文章<%=session.getAttribute("resourceParam_1869")%>区域 end-->
        <form id="feedbackform<h:outputText value="#{news.level}" />" name="feedbackform<h:outputText value="#{news.level}" />" action="../../MessageReceiveServlet" method="post" enctype="multipart/form-data" target="upload_iframe"> 
			<input type="hidden" id="messageid<h:outputText value="#{news.level}" />" name="messageid<h:outputText value="#{news.level}" />" value="<h:outputText value="#{news.messageid}" />"/>
			<input type="hidden" id="userid<h:outputText value="#{news.level}" />" name="userid<h:outputText value="#{news.level}" />" value="<h:outputText value="#{news.userid}" />"/>
			<input type="hidden" id="messagetype<h:outputText value="#{news.level}" />" name="messagetype<h:outputText value="#{news.level}" />" value="<h:outputText value="#{news.messagetype}" />"/>
            <input type="hidden" id="truename<h:outputText value="#{news.level}" />" name="truename<h:outputText value="#{news.level}" />" value="<h:outputText value="#{news.truename}" />"/>
            <input type="hidden" id="level<h:outputText value="#{news.level}" />" name="level<h:outputText value="#{news.level}" />" value="<h:outputText value="#{news.level}" />"/>
            <input type="hidden" id="loginname<h:outputText value="#{news.level}" />" name="loginname<h:outputText value="#{news.level}" />" value="<h:outputText value="#{guser.truename}" />"/>
            <input type="hidden" id="loginid<h:outputText value="#{news.level}" />" name="loginid<h:outputText value="#{news.level}" />" value="<h:outputText value="#{guser.userid}" />"/>
            <input type="hidden" id="all_count<h:outputText value="#{news.level}" />" name="all_count<h:outputText value="#{news.level}" />" value="<h:outputText value="#{news.all_count}" />"/>
<!--            <div class="log_content"></div>-->
			<div id="log_reply_all_content<h:outputText value="#{news.level}" />" style="display: none">
				<!-- bug编号471 wangyf 2011-05-12 -->
			   <textarea id="allcontent<h:outputText value="#{news.level}" />" name="allcontent<h:outputText value="#{news.level}" />" 
			   		style="width: 400px; height: 100px;margin:20px 0px 0px 0px;" onkeyup="warnFeedBackReplyOne(this.value)"></textarea>
            </div>
            <div id="warnFeedBackReplyOne"></div>
			<div id="log_reply_all_submit<h:outputText value="#{news.level}" />" style="display: none">
                <div id="log_patch" class="log_patch"><%=session.getAttribute("resourceParam_1859")%>：
                  <input type="file" contenteditable='false' id="file<h:outputText value="#{news.level}" />" name="file<h:outputText value="#{news.level}" />"/>
                </div>
                <div id="log_sub" class="log_sub"><a href="javascript:void(0);"
                    onclick="clear_all_conents(<h:outputText value="#{news.level}" />)"><%=session.getAttribute("resourceParam_1866")%></a>&nbsp;
                    <a href="javascript:void(0);" onclick="add_all_context(<h:outputText value="#{news.level}" />)"><%=session.getAttribute("resourceParam_1865")%></a>
                </div>
             </div>
        </form>
			</div>
<!--			<div class="log_content"></div>-->
		</rich:column>
	</rich:dataTable> 
    </div>
<!--1级<%=session.getAttribute("resourceParam_1863")%>end	-->
  
</f:view>
 <iframe name="upload_iframe" style="display: none"></iframe>
</body>
</html>
