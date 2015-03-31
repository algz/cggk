package com.sysware.customize.approvalObject;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.namespace.QName;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.apache.xerces.impl.dv.util.Base64;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import com.sysware.common.approval.ApprovalComment;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;

@Name("engine_ApprovalTaskListener")
public class ApprovalTaskListener {
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm");
	private String wsdl = "http://129.1.120.40:9081/webService/pendService";
	private String singlelogin = "http://129.1.121.132:8082/cggk/base/single_login.seam";
	
	@In(value="approvalInfoServiceImpl" ,create = true)
	ApprovalInfoService approvalInfoServiceImpl;
//	推送数据到门户表中，调用接口insertPending和updatetePendingsStateByUID
//	其中insertPending接口中，参数pendingType为20表示采购管控系统
//	参数pendingLevel为0表示普通，为1表示重要
//	创建新审批
    public void onCreateApprovalTask(ApprovalComment comment) {
        String method = "insertPending"; 
        String username = Base64.encode(String.valueOf(comment.getExaminer()).getBytes());
        Object[] flow = null;
        Object[] sender = null;
        int returnint = 0;
        
        try {
        	flow = approvalInfoServiceImpl.getApprovalFlowsById(comment.getFlowInstanceID());
            sender = approvalInfoServiceImpl.getSenderById(comment.getExaminer());
        	
        	Service service = new Service();
            Call call = (Call)service.createCall();
            
            call.setTargetEndpointAddress(this.wsdl);
//            call.setOperationName(method);
            call.setOperationName(new QName(this.wsdl,method));
            
            call.addParameter("pendingCode", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingTitle", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingDate", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingSender", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingSenderCN", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingReceiver", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingURL", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingStatus", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingLevel", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingType", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingNote", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            
            call.setReturnType(XMLType.XSD_INT);
            call.setUseSOAPAction(true);
            call.setEncodingStyle(this.wsdl+"?wsdl");
            
//            returnint = (Integer)call.invoke(new Object[] { comment.getId(),
//            		String.valueOf(flow[0]) ,
//    				df.format(comment.getApprovalTime()==null?new Date():comment.getApprovalTime()),
//    				String.valueOf(sender[0]),
//    				String.valueOf(sender[1]),
//    				String.valueOf(flow[1]),
//    				this.singlelogin,
//    				0,
//    				1,
//    				20,
//    				""});
            if(returnint == 1){
            	System.out.println("添加新待办审批失败!");
            }else{
            	System.out.println("添加新新待办审批成功!");
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
//    审批通过
    public void onPassApprovalTask(ApprovalComment comment) {
        String method = "updatePendingsStateByUID"; 
        int returnint = 0;
    	try {
            Service service = new Service();
            Call call = (Call)service.createCall();
            
            call.setTargetEndpointAddress(wsdl);
//            call.setOperationName(method);
            call.setOperationName(new QName(this.wsdl,method));
            
            call.addParameter("pendingCode", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingType", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingStatus", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingDate", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            
            call.setReturnType(XMLType.XSD_INT);
            call.setUseSOAPAction(true);
            call.setEncodingStyle(this.wsdl+"?wsdl");
            
//    		returnint = (Integer)call.invoke(new Object[] { comment.getId(),
//    				20,1,
//    				df.format(comment.getApprovalTime()==null?new Date():comment.getApprovalTime())});
    		if(returnint == 1){
            	System.out.println("更新待办审批成功!");
            }else{
            	System.out.println("更新待办审批失败!");
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
//    审批不通过
    public void onUnPassApprovalTask(ApprovalComment comment) {
        String method = "updatePendingsStateByUID";
        int returnint = 0;
        try {
            Service service = new Service();
            Call call = (Call)service.createCall();
            
            call.setTargetEndpointAddress(wsdl);
//            call.setOperationName(method);
            call.setOperationName(new QName(this.wsdl,method));
            
            call.addParameter("pendingCode", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingType", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingStatus", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingDate", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            
            call.setReturnType(XMLType.XSD_INT);
            call.setUseSOAPAction(true);
            call.setEncodingStyle(this.wsdl+"?wsdl");
            
//            returnint = (Integer)call.invoke(new Object[] { comment.getId(),
//    				20,1,
//    				df.format(comment.getApprovalTime()==null?new Date():comment.getApprovalTime())});
    		if(returnint == 1){
            	System.out.println("更新待办审批成功!");
            }else{
            	System.out.println("更新待办审批失败!");
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
//    审批终止
    public void onTerminateApprovalTask(ApprovalComment comment) {
        String method = "updatePendingsStateByUID";
        int returnint = 0;
        try {
            Service service = new Service();
            Call call = (Call)service.createCall();
            
            call.setTargetEndpointAddress(wsdl);
//            call.setOperationName(method);
            call.setOperationName(new QName(this.wsdl,method));
            
            call.addParameter("pendingCode", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingType", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingStatus", 
            		XMLType.XSD_INT, javax.xml.rpc.ParameterMode.IN);
            call.addParameter("pendingDate", 
            		XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);
            
            call.setReturnType(XMLType.XSD_INT);
            call.setUseSOAPAction(true);
            call.setEncodingStyle(this.wsdl+"?wsdl");
//            
//            returnint = (Integer)call.invoke(new Object[] { comment.getId(),
//    				20,1,
//    				df.format(comment.getApprovalTime()==null?new Date():comment.getApprovalTime())});
    		if(returnint == 1){
            	System.out.println("更新待办审批成功!");
            }else{
            	System.out.println("更新待办审批失败!");
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
}
